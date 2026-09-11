# Bruna & Riclaube — Lista de Casamento 💙

> Site oficial de casamento e lista de presentes digital para **Bruna & Riclaube** (05/12/2026).
>
> Desenvolvido com uma linguagem visual editorial e delicada inspirada nas flores aquareladas em tons de azul e cinza-ardósia do convite físico oficial (`B | R`).

---

## 1. Visão Geral do Projeto (Project Overview)

O site de casamento de **Bruna & Riclaube** não se comporta como uma loja virtual comum. Ele foi concebido como **um convite digital sofisticado e uma narrativa de amor**, no qual a lista de presentes é parte da história do novo lar que o casal está construindo.

Toda a interface pública do usuário está 100% em **Português do Brasil (pt-BR)**, com tipografia serifada elegante, animações fluidas, pétalas flutuantes, contagem regressiva em tempo real, galeria com lightbox, e um sistema transacional de reserva de presentes que impede reservas duplicadas e notifica automaticamente os noivos via e-mail e WhatsApp.

---

## 2. Funcionalidades Principais (Features)

* **Identidade Visual Floral Aquarelada**: Motivos botânicos inspirados no convite em tons de azul pastel, centros em azul-marinho e folhagens cinza-ardósia.
* **Hero Cinemático**: Monograma `B | R`, data `05/12/2026`, ornamentos florais e transições suaves de entrada.
* **Nossa História**: Seção editorial apresentando a trajetória e os votos do casal.
* **Galeria "Dois caminhos, uma nova história"**: Grade fotográfica com suporte a Lightbox, navegação por setas/ESC e mecanismo para upload e substituição das fotos do casal.
* **Contagem Regressiva Interativa**: Contador em tempo real calculando dias, horas, minutos e segundos até 05/12/2026.
* **Lista de Presentes Inteligente**:
  * Itens com múltiplas unidades (ex.: Jogo de panelas × 2, Jogo de talheres × 3, etc.).
  * Controle de disponibilidade em tempo real.
  * Tag especial para "Última unidade disponível".
  * Frase acolhedora para itens esgotados: *"Este presente já encontrou um lugar na nossa nova casa 💙"*.
  * Filtros por 8 categorias (Utensílios de cozinha, Cama, Banho, Mesa, Lavanderia, Eletroportáteis, Outros itens para casa).
  * Busca instantânea por nome ou categoria e filtro de presentes disponíveis.
  * Estatísticas dinâmicas calculadas via backend.
* **Fluxo Seguro de Reserva**:
  * Modal de confirmação com nome, e-mail e WhatsApp do convidado.
  * Transações atômicas com Mutex locking para impedir concorrência e reservas duplicadas.
  * Notificação de privacidade de dados.
* **Notificações Automáticas**:
  * **E-mail**: Disparo para `brunarochele905@gmail.com` com os dados do convidado e presente escolhido.
  * **WhatsApp**: Disparo estruturado para `+55 85 8910-3367` via WhatsApp Cloud API / Business Platform.
* **Informações de Entrega**:
  * Prazo: **03 de dezembro de 2026**.
  * Endereço: Rua da Placidez, Conjunto Tatumunde, Quadra A, Bloco 30, Apto 01 - Siqueira, Fortaleza - CE.
  * Botão de cópia rápida com feedback *"Endereço copiado! 💙"* e link para o Google Maps.
* **Música Ambiente Opcional**: Botão flutuante *"♫ Música"* que toca uma melodia suave sem reprodução automática indesejada.
* **Painel Administrativo Protegido**:
  * Autenticação com senha (`brunaericlaube2026`).
  * Indicadores de desempenho (Total de presentes, disponíveis, escolhidos e convidados).
  * Tabela completa de reservas com busca e cancelamento de reserva com restauração de estoque.
  * Exportação de dados em **CSV com codificação UTF-8 BOM** para visualização no Excel.

---

## 3. Arquitetura do Sistema (Architecture)

```
├── client (React 19 + TypeScript + Tailwind CSS + motion)
│   ├── src/components/
│   │   ├── Navbar.tsx
│   │   ├── WeddingHero.tsx
│   │   ├── WeddingStory.tsx
│   │   ├── CoupleGallery.tsx
│   │   ├── Countdown.tsx
│   │   ├── StoryToRegistryTransition.tsx
│   │   ├── GiftRegistry.tsx
│   │   ├── GiftReservationModal.tsx
│   │   ├── ConfirmationSuccessModal.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── DeliveryInformation.tsx
│   │   ├── FinalThankYou.tsx
│   │   ├── FloralDecorations.tsx
│   │   ├── AmbientAudio.tsx
│   │   └── AdminDashboard.tsx
│   └── src/types.ts
│
└── server (Node.js + Express + TypeScript)
    ├── server.ts (Express API, Mutex transactions, Vite middleware)
    ├── data/wedding_database.json (Persistência dos dados)
    └── Services:
        ├── EmailNotificationService
        └── WhatsAppNotificationService
```

---

## 4. Tecnologias Utilizadas (Technology Stack)

* **Frontend**: React 19, TypeScript, Tailwind CSS, Motion (`motion/react`), Lucide React, Canvas Confetti.
* **Backend**: Node.js, Express, TSX, esbuild.
* **Banco de Dados**: Armazenamento JSON em disco com controle transacional via Mutex assíncrono (ou PostgreSQL compatível via `DATABASE_URL`).
* **Notificações**: Integrações preparadas para Resend / Brevo (E-mail) e Meta WhatsApp Cloud API.

---

## 5. Estrutura do Banco de Dados (Database Structure)

### Tabela / Coleção: `gifts`
* `id` (String): Identificador único do presente.
* `name` (String): Nome do item.
* `category` (String): Categoria à qual pertence.
* `quantity_total` (Number): Quantidade total solicitada.
* `quantity_available` (Number): Quantidade ainda disponível.
* `status` (String): `'disponivel'` ou `'esgotado'`.
* `created_at` / `updated_at` (ISO Datetime).

### Tabela / Coleção: `gift_reservations`
* `id` (String): Identificador da reserva (`res-<timestamp>-<hash>`).
* `gift_id` (String): Chave estrangeira referenciando `gifts.id`.
* `gift_name` (String): Nome histórico do presente.
* `guest_name` (String): Nome completo do convidado.
* `guest_email` (String): E-mail do convidado.
* `guest_phone` (String): WhatsApp do convidado.
* `message` (String, opcional): Mensagem deixada aos noivos.
* `reserved_at` (ISO Datetime): Momento exato da reserva.
* `status` (String): `'RESERVADO'` ou `'CANCELADO'`.

---

## 6. Variáveis de Ambiente (.env.example)

Configure o arquivo `.env` na raiz do projeto:

```env
# URL da aplicação
APP_URL="http://localhost:3000"

# Banco de Dados (Opcional se conectar PostgreSQL externo)
DATABASE_URL=

# Configurações de Notificação por E-mail (Resend, SendGrid ou Brevo)
EMAIL_API_KEY=
EMAIL_FROM="casamento@brunadericlaube.com.br"
WEDDING_EMAIL="brunarochele905@gmail.com"

# Configurações do WhatsApp Cloud API
WHATSAPP_PHONE="558589103367"
WHATSAPP_API_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=

# Senha de Acesso ao Painel de Administração
ADMIN_SECRET="brunaericlaube2026"
```

---

## 7. Instalação e Execução Local

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento (Porta 3000)
npm run dev

# 3. Compilar para produção
npm run build

# 4. Iniciar em produção
npm run start
```

---

## 8. Regras de Negócio e Segurança de Reserva (Reservation Rules)

1. **Atomicidade e Concorrência**: O frontend nunca valida disponibilidade sozinho. O endpoint `/api/reservations` bloqueia a fila via Mutex, verifica se `quantity_available > 0`, decrementa o estoque e gera a reserva em uma única etapa atômica.
2. **Conflito Simultâneo**: Se duas pessoas clicarem no último item ao mesmo tempo, a primeira é confirmada e a segunda recebe a resposta amigável:
   > *"Esse presente acabou de ser escolhido por outra pessoa. 💙"*
3. **Resiliência de Notificações**: Caso a API de e-mail ou WhatsApp apresente instabilidade temporária, a reserva do convidado permanece confirmada e o erro é logado sem impactar o usuário.
4. **Privacidade**: Dados sensíveis (telefones, e-mails e mensagens) não são expostos na API pública de presentes. Somente usuários autenticados com o `ADMIN_SECRET` têm acesso à listagem no painel `/admin`.

---

## 9. Lista de Presentes Cadastrada

Contém todos os itens solicitados pelo casal distribuídos nas categorias:
- **Utensílios de Cozinha**: Jogos de panelas, cuscuzeiras, frigideiras, faqueiros, copos, pratos, potes herméticos, moedores, travessas.
- **Cama**: Jogos de cama casal, edredons, lençóis, travesseiros, protetores e rede.
- **Banho**: Jogos de toalhas, toalhas avulsas e roupões de casal.
- **Mesa**: Jogos americanos, sousplats, toalhas de mesa, saladeiras e bowls.
- **Lavanderia**: Varal de chão, cestos para roupas, mop e lixeira de pedal.
- **Eletroportáteis**: Liquidificador, Air Fryer, sanduicheira, cafeteira, mixer, processador, espremedor, ventilador e pipoqueira.
- **Outros itens para casa**: Cortinas blackout, caixas térmicas, tapetes, bandejas de café, relógio de parede e cadeiras de praia.

---

Feliz casamento para **Bruna & Riclaube**! 💙
05 de Dezembro de 2026
