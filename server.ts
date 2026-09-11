import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { INITIAL_GIFTS } from './src/data/initialGifts';
import { Gift, GiftReservation, RegistryStats, ReservationPayload } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Database persistence file setup
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'wedding_database.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DatabaseSchema {
  gifts: Gift[];
  reservations: GiftReservation[];
  photos: { id: string; title: string; subtitle: string; url: string; caption?: string }[];
}

function initDefaultDatabase(): DatabaseSchema {
  const initialGifts: Gift[] = INITIAL_GIFTS.map(item => ({
    ...item,
    status: item.quantity_available > 0 ? 'disponivel' : 'esgotado',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }));

  return {
    gifts: initialGifts,
    reservations: [],
    photos: [
      {
        id: 'photo-1',
        title: 'Nossa Jornada de Amor',
        subtitle: 'Bruna & Riclaube',
        url: '',
        caption: 'Cada passo ao seu lado fortaleceu a nossa certeza de querer construir uma vida inteira juntos.'
      },
      {
        id: 'photo-2',
        title: 'Cumplicidade e Carinho',
        subtitle: 'Sorrisos que iluminam nossos dias',
        url: '',
        caption: 'O amor é feito de pequenos instantes de ternura e alegria compartilhada.'
      },
      {
        id: 'photo-3',
        title: 'Rumo ao Altar',
        subtitle: '05 de Dezembro de 2026',
        url: '',
        caption: 'O início do nosso para sempre celebrado com quem mais amamos.'
      }
    ]
  };
}

let db: DatabaseSchema = initDefaultDatabase();

if (fs.existsSync(DB_FILE)) {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    db = JSON.parse(raw);
    // Ensure all initial gifts exist even if older version was saved
    if (!db.gifts || db.gifts.length === 0) {
      db = initDefaultDatabase();
      saveDatabase();
    }
  } catch (err) {
    console.error('Erro ao ler wedding_database.json, recriando padrão:', err);
    db = initDefaultDatabase();
    saveDatabase();
  }
} else {
  saveDatabase();
}

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Falha ao salvar dados no disco:', err);
  }
}

// Mutex lock implementation to guarantee atomic concurrency
class AsyncMutex {
  private queue: (() => void)[] = [];
  private locked = false;

  async acquire(): Promise<() => void> {
    return new Promise((resolve) => {
      const execute = () => {
        this.locked = true;
        resolve(() => {
          this.locked = false;
          const next = this.queue.shift();
          if (next) {
            next();
          }
        });
      };

      if (this.locked) {
        this.queue.push(execute);
      } else {
        execute();
      }
    });
  }
}

const reservationMutex = new AsyncMutex();

// ============================================================
// NOTIFICATION SERVICES ARCHITECTURE
// ============================================================

export class EmailNotificationService {
  static async sendReservationEmail(reservation: GiftReservation, gift: Gift): Promise<boolean> {
    const targetEmail = process.env.WEDDING_EMAIL || 'brunarochele905@gmail.com';
    const emailApiKey = process.env.EMAIL_API_KEY;

    const formattedDate = new Date(reservation.reserved_at).toLocaleString('pt-BR', {
      timeZone: 'America/Fortaleza',
      dateStyle: 'short',
      timeStyle: 'short',
    });

    const subject = '🎁 Novo presente escolhido para o casamento';
    const contentText = `
Um novo presente foi escolhido na lista de casamento.

Nome: ${reservation.guest_name}
E-mail: ${reservation.guest_email}
WhatsApp: ${reservation.guest_phone}
Presente escolhido: ${gift.name}
Categoria: ${gift.category}
Data e hora: ${formattedDate}
Status: RESERVADO
${reservation.message ? `\nMensagem do convidado:\n"${reservation.message}"` : ''}
    `.trim();

    console.log(`[EmailNotificationService] Enviando e-mail para ${targetEmail}:`);
    console.log(`Assunto: ${subject}`);
    console.log(contentText);

    if (emailApiKey) {
      try {
        // Production Resend API integration (if key configured)
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${emailApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || 'casamento@brunadericlaube.com.br',
            to: targetEmail,
            subject,
            text: contentText,
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          console.warn('[EmailNotificationService] Resend API retornou status não-200:', errText);
          return false;
        }
        return true;
      } catch (err) {
        console.error('[EmailNotificationService] Erro na requisição HTTP para o provedor de e-mail:', err);
        return false;
      }
    }

    // In dev / sandbox without API key, notification is logged securely without crashing
    return true;
  }
}

export class WhatsAppNotificationService {
  static async sendWhatsAppNotification(reservation: GiftReservation, gift: Gift): Promise<boolean> {
    const targetPhone = process.env.WHATSAPP_PHONE || '558589103367';
    const token = process.env.WHATSAPP_API_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    const formattedDate = new Date(reservation.reserved_at).toLocaleString('pt-BR', {
      timeZone: 'America/Fortaleza',
      dateStyle: 'short',
      timeStyle: 'short',
    });

    const message = `🎁 Novo presente escolhido para o casamento!

👤 Nome: ${reservation.guest_name}
📧 E-mail: ${reservation.guest_email}
📱 WhatsApp: ${reservation.guest_phone}

🎁 Presente:
${gift.name}

📂 Categoria:
${gift.category}

📅 Data:
${formattedDate}

O presente foi reservado com sucesso. 💙`;

    console.log(`[WhatsAppNotificationService] Disparando notificação para +${targetPhone}:`);
    console.log(message);

    if (token && phoneNumberId) {
      try {
        // Official WhatsApp Cloud API integration
        const response = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: targetPhone,
            type: 'text',
            text: { body: message },
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          console.warn('[WhatsAppNotificationService] WhatsApp Cloud API erro:', errText);
          return false;
        }
        return true;
      } catch (err) {
        console.error('[WhatsAppNotificationService] Erro ao conectar com WhatsApp Cloud API:', err);
        return false;
      }
    }

    return true;
  }
}

// ============================================================
// API ROUTES
// ============================================================

// Public: Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Public: List all gifts with current real-time availability
app.get('/api/gifts', (req: Request, res: Response) => {
  res.json(db.gifts);
});

// Public: Registry statistics
app.get('/api/stats', (req: Request, res: Response) => {
  const totalUnits = db.gifts.reduce((sum, g) => sum + g.quantity_total, 0);
  const availableUnits = db.gifts.reduce((sum, g) => sum + g.quantity_available, 0);
  const reservedUnits = totalUnits - availableUnits;
  const uniqueGuests = new Set(db.reservations.map(r => r.guest_email.toLowerCase().trim())).size;

  const stats: RegistryStats = {
    total_gifts: totalUnits,
    available_gifts: availableUnits,
    reserved_gifts: reservedUnits,
    total_guests: uniqueGuests,
  };

  res.json(stats);
});

// Public: Photos list and retrieval
app.get('/api/photos', (req: Request, res: Response) => {
  res.json(db.photos || []);
});

// Public: Transactional Gift Reservation with Mutex Lock
app.post('/api/reservations', async (req: Request, res: Response) => {
  const payload: ReservationPayload = req.body;

  if (!payload.gift_id || !payload.guest_name?.trim() || !payload.guest_email?.trim() || !payload.guest_phone?.trim()) {
    res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios.' });
    return;
  }

  if (!payload.confirmation) {
    res.status(400).json({ error: 'É necessário confirmar a escolha do presente.' });
    return;
  }

  // Acquire Mutex Lock for atomic database operation
  const release = await reservationMutex.acquire();

  try {
    const giftIndex = db.gifts.findIndex(g => g.id === payload.gift_id);
    if (giftIndex === -1) {
      res.status(404).json({ error: 'Presente não encontrado em nossa lista.' });
      return;
    }

    const gift = db.gifts[giftIndex];

    // Concurrency Rule: Validate availability
    if (gift.quantity_available <= 0) {
      res.status(409).json({
        error: 'Esse presente acabou de ser escolhido por outra pessoa. 💙',
        gift_status: 'esgotado',
      });
      return;
    }

    // Atomic decrement
    gift.quantity_available -= 1;
    if (gift.quantity_available === 0) {
      gift.status = 'esgotado';
    }
    gift.updated_at = new Date().toISOString();

    const reservation: GiftReservation = {
      id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      gift_id: gift.id,
      gift_name: gift.name,
      gift_category: gift.category,
      guest_name: payload.guest_name.trim(),
      guest_email: payload.guest_email.trim(),
      guest_phone: payload.guest_phone.trim(),
      message: payload.message?.trim(),
      reserved_at: new Date().toISOString(),
      status: 'RESERVADO',
    };

    db.reservations.unshift(reservation);
    saveDatabase();

    // Fire notifications asynchronously without blocking reservation response
    EmailNotificationService.sendReservationEmail(reservation, gift).catch(err => {
      console.error('Falha silenciosa no envio de e-mail:', err);
    });

    WhatsAppNotificationService.sendWhatsAppNotification(reservation, gift).catch(err => {
      console.error('Falha silenciosa no envio de WhatsApp:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Presente reservado com carinho! 💙',
      reservation,
      updated_gift: gift,
    });
  } catch (error) {
    console.error('Erro na transação de reserva:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao registrar sua reserva. Tente novamente.' });
  } finally {
    release();
  }
});

// ============================================================
// ADMIN PROTECTED ROUTES
// ============================================================

const ADMIN_PASSWORD = process.env.ADMIN_SECRET || 'brunaericlaube2026';

function verifyAdminAuth(req: Request, res: Response, next: () => void) {
  const token = req.headers['x-admin-token'] || req.headers.authorization?.replace('Bearer ', '');
  if (token === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: 'Acesso não autorizado. Senha de administração inválida.' });
  }
}

// Admin: Login verification
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: ADMIN_PASSWORD, message: 'Autenticado com sucesso.' });
  } else {
    res.status(401).json({ success: false, error: 'Senha incorreta.' });
  }
});

// Admin: List all reservations
app.get('/api/admin/reservations', verifyAdminAuth, (req: Request, res: Response) => {
  res.json(db.reservations);
});

// Admin: Cancel/Delete a reservation (and restore gift stock)
app.delete('/api/admin/reservations/:id', verifyAdminAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const release = await reservationMutex.acquire();

  try {
    const resIndex = db.reservations.findIndex(r => r.id === id);
    if (resIndex === -1) {
      res.status(404).json({ error: 'Reserva não encontrada.' });
      return;
    }

    const reservation = db.reservations[resIndex];
    const giftIndex = db.gifts.findIndex(g => g.id === reservation.gift_id);

    if (giftIndex !== -1) {
      const gift = db.gifts[giftIndex];
      gift.quantity_available = Math.min(gift.quantity_total, gift.quantity_available + 1);
      gift.status = gift.quantity_available > 0 ? 'disponivel' : 'esgotado';
      gift.updated_at = new Date().toISOString();
    }

    db.reservations.splice(resIndex, 1);
    saveDatabase();

    res.json({ success: true, message: 'Reserva cancelada e unidade devolvida ao estoque.' });
  } finally {
    release();
  }
});

// Admin: Update couple photos
app.post('/api/admin/photos', verifyAdminAuth, (req: Request, res: Response) => {
  const { photos } = req.body;
  if (Array.isArray(photos)) {
    db.photos = photos;
    saveDatabase();
    res.json({ success: true, photos: db.photos });
  } else {
    res.status(400).json({ error: 'Formato inválido de fotos.' });
  }
});

// Admin: Reset database to initial items
app.post('/api/admin/reset', verifyAdminAuth, (req: Request, res: Response) => {
  db = initDefaultDatabase();
  saveDatabase();
  res.json({ success: true, message: 'Banco de dados restaurado com a lista completa original.' });
});

// Admin: Export reservations to CSV with UTF-8 BOM
app.get('/api/admin/export-csv', verifyAdminAuth, (req: Request, res: Response) => {
  const header = ['ID Reserva', 'Presente', 'Categoria', 'Convidado', 'E-mail', 'WhatsApp', 'Data e Hora', 'Status', 'Mensagem'];
  
  const rows = db.reservations.map(r => [
    r.id,
    `"${r.gift_name.replace(/"/g, '""')}"`,
    `"${r.gift_category.replace(/"/g, '""')}"`,
    `"${r.guest_name.replace(/"/g, '""')}"`,
    `"${r.guest_email.replace(/"/g, '""')}"`,
    `"${r.guest_phone.replace(/"/g, '""')}"`,
    `"${new Date(r.reserved_at).toLocaleString('pt-BR')}"`,
    r.status,
    `"${(r.message || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [header.join(';'), ...rows.map(row => row.join(';'))].join('\r\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="reservas_casamento_bruna_riclaube.csv"');
  res.send(csvContent);
});

// ============================================================
// VITE MIDDLEWARE & SERVER STARTUP
// ============================================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Servidor Bruna & Riclaube rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Falha ao iniciar servidor:', err);
});
