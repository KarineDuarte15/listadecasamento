import { Gift } from '../types';

// Exportamos a lista completa de presentes com as categorias e quantidades definidas.
// Utilizamos Partial<Gift> para evitar erros caso a sua interface Gift original 
// não possua as propriedades de quantidade (quantity_total).
export const INITIAL_GIFTS: Partial<Gift>[] = [
  // UTENSÍLIOS DE COZINHA
  { id: 'ut-1', name: 'Jogo de panelas', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-2', name: 'Panela de pressão', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-3', name: 'Banho Maria', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-4', name: 'Cuscuzeira grande', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-5', name: 'Mini cuscuzeira', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-6', name: 'Pipoqueira', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-7', name: 'Chaleira', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-8', name: 'Frigideira antiaderente pequena', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-9', name: 'Frigideira antiaderente média', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-10', name: 'Frigideira antiaderente grande', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-11', name: 'Frigideira wok antiaderente', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-12', name: 'Conjunto de frigideiras antiaderente', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-13', name: 'Frigideira quatro ovos antiaderente', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-14', name: 'Jogo de facas para churrasco', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-15', name: 'Jogo de talheres', category: 'Utensílios de cozinha', quantity_total: 3, quantity_available: 3 },
  { id: 'ut-16', name: 'Conjunto de conchas e espátulas', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-17', name: 'Conjunto de colheres de pau silicone', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-18', name: 'Conjunto de potes com tampa de vidro', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-19', name: 'Conjunto de potes hermético', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-20', name: 'Conjunto de jarra mais copos de vidro', category: 'Utensílios de cozinha', quantity_total: 3, quantity_available: 3 },
  { id: 'ut-21', name: 'Conjunto de pratos de vidro', category: 'Utensílios de cozinha', quantity_total: 3, quantity_available: 3 },
  { id: 'ut-22', name: 'Jogo de copos de vidro', category: 'Utensílios de cozinha', quantity_total: 3, quantity_available: 3 },
  { id: 'ut-23', name: 'Jogo de xícaras', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-24', name: 'Porta temperos', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-25', name: 'Conjunto de galheteiro', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-26', name: 'Garrafa de café', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-27', name: 'Aparelho de jantar', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-28', name: 'Conjunto de sobremesa', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-29', name: 'Conjunto de taças', category: 'Utensílios de cozinha', quantity_total: 3, quantity_available: 3 },
  { id: 'ut-30', name: 'Suqueira de vidro', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-31', name: 'Petisqueira de vidro', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-32', name: 'Moedor de tempero', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-33', name: 'Moedor de pimenta', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-34', name: 'Forma de silicone para Air Fryer', category: 'Utensílios de cozinha', quantity_total: 3, quantity_available: 3 },
  { id: 'ut-35', name: 'Prato bolo de vidro', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },
  { id: 'ut-36', name: 'Porta bolo de vidro', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-37', name: 'Copo térmico', category: 'Utensílios de cozinha', quantity_total: 2, quantity_available: 2 },
  { id: 'ut-38', name: 'Porta condimentos', category: 'Utensílios de cozinha', quantity_total: 1, quantity_available: 1 },

  // CAMA
  { id: 'cam-1', name: 'Jogo de cama casal', category: 'Cama', quantity_total: 2, quantity_available: 2 },
  { id: 'cam-2', name: 'Lençóis', category: 'Cama', quantity_total: 2, quantity_available: 2 },
  { id: 'cam-3', name: 'Kit edredom casal', category: 'Cama', quantity_total: 3, quantity_available: 3 },
  { id: 'cam-4', name: 'Conjunto de travesseiro', category: 'Cama', quantity_total: 2, quantity_available: 2 },
  { id: 'cam-5', name: 'Cobertor casal', category: 'Cama', quantity_total: 2, quantity_available: 2 },
  { id: 'cam-6', name: 'Manta casal', category: 'Cama', quantity_total: 2, quantity_available: 2 },
  { id: 'cam-7', name: 'Protetor de colchão casal', category: 'Cama', quantity_total: 3, quantity_available: 3 },
  { id: 'cam-8', name: 'Rede', category: 'Cama', quantity_total: 2, quantity_available: 2 },

  // BANHO
  { id: 'ban-1', name: 'Jogo de toalhas', category: 'Banho', quantity_total: 2, quantity_available: 2 },
  { id: 'ban-2', name: 'Toalha de banho', category: 'Banho', quantity_total: 2, quantity_available: 2 },
  { id: 'ban-3', name: 'Roupão casal', category: 'Banho', quantity_total: 2, quantity_available: 2 },

  // MESA
  { id: 'mes-1', name: 'Jogo americano 6 lugares', category: 'Mesa', quantity_total: 2, quantity_available: 2 },
  { id: 'mes-2', name: 'Conjunto sousplat 6 lugares', category: 'Mesa', quantity_total: 2, quantity_available: 2 },
  { id: 'mes-3', name: 'Toalha de mesa 6 lugares', category: 'Mesa', quantity_total: 3, quantity_available: 3 },
  { id: 'mes-4', name: 'Travessa de vidro', category: 'Mesa', quantity_total: 3, quantity_available: 3 },
  { id: 'mes-5', name: 'Saladeira', category: 'Mesa', quantity_total: 3, quantity_available: 3 },
  { id: 'mes-6', name: 'Conjunto de bowls', category: 'Mesa', quantity_total: 2, quantity_available: 2 },

  // LAVANDERIA
  { id: 'lav-1', name: 'Varal de chão', category: 'Lavanderia', quantity_total: 1, quantity_available: 1 },
  { id: 'lav-2', name: 'Cesto para roupas', category: 'Lavanderia', quantity_total: 2, quantity_available: 2 },
  { id: 'lav-3', name: 'Mop', category: 'Lavanderia', quantity_total: 2, quantity_available: 2 },
  { id: 'lav-4', name: 'Organizador para produtos de limpeza', category: 'Lavanderia', quantity_total: 2, quantity_available: 2 },
  { id: 'lav-5', name: 'Lixeira com pedal', category: 'Lavanderia', quantity_total: 1, quantity_available: 1 },

  // ELETROPORTÁTEIS
  { id: 'elet-1', name: 'Liquidificador', category: 'Eletroportáteis', quantity_total: 1, quantity_available: 1 },
  { id: 'elet-2', name: 'Air Fryer', category: 'Eletroportáteis', quantity_total: 1, quantity_available: 1 },
  { id: 'elet-3', name: 'Sanduicheira', category: 'Eletroportáteis', quantity_total: 1, quantity_available: 1 },
  { id: 'elet-4', name: 'Cafeteira', category: 'Eletroportáteis', quantity_total: 1, quantity_available: 1 },
  { id: 'elet-5', name: 'Mixer', category: 'Eletroportáteis', quantity_total: 1, quantity_available: 1 },
  { id: 'elet-6', name: 'Processador de alimentos', category: 'Eletroportáteis', quantity_total: 1, quantity_available: 1 },
  { id: 'elet-7', name: 'Espremedor de frutas', category: 'Eletroportáteis', quantity_total: 1, quantity_available: 1 },
  { id: 'elet-8', name: 'Ventilador', category: 'Eletroportáteis', quantity_total: 1, quantity_available: 1 },
  { id: 'elet-9', name: 'Pipoqueira elétrica', category: 'Eletroportáteis', quantity_total: 1, quantity_available: 1 },

  // OUTROS ITENS PARA CASA
  { id: 'out-1', name: 'Caixa térmica', category: 'Outros itens para casa', quantity_total: 1, quantity_available: 1 },
  { id: 'out-2', name: 'Caixa organizadora', category: 'Outros itens para casa', quantity_total: 1, quantity_available: 1 },
  { id: 'out-3', name: 'Jogo de tapetes', category: 'Outros itens para casa', quantity_total: 2, quantity_available: 2 },
  { id: 'out-4', name: 'Cortina blackout', category: 'Outros itens para casa', quantity_total: 2, quantity_available: 2 },
  { id: 'out-5', name: 'Bandeja de café da manhã', category: 'Outros itens para casa', quantity_total: 2, quantity_available: 2 },
  { id: 'out-6', name: 'Relógio de parede', category: 'Outros itens para casa', quantity_total: 1, quantity_available: 1 },
  { id: 'out-7', name: 'Capa para sofá', category: 'Outros itens para casa', quantity_total: 2, quantity_available: 2 },
  { id: 'out-8', name: 'Cadeira de praia', category: 'Outros itens para casa', quantity_total: 2, quantity_available: 2 },
  { id: 'out-9', name: 'Colchão inflável solteiro', category: 'Outros itens para casa', quantity_total: 1, quantity_available: 1 },
  { id: 'out-10', name: 'Gaveteiro 3 gavetas', category: 'Outros itens para casa', quantity_total: 1, quantity_available: 1 }
];

// Função que calcula o status dinamicamente com base na quantidade disponível
export function getInitialGiftsWithStatus(): Partial<Gift>[] {
  return INITIAL_GIFTS.map(item => ({
    ...item,
    // Se a quantidade disponível for maior que 0, está disponível, senão esgotado.
    // O operador '?? 0' protege o código caso a variável venha vazia.
    status: (item.quantity_available ?? 0) > 0 ? 'disponivel' : 'esgotado'
  }));
}