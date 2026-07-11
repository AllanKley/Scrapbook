import type { Tamanho } from '../types';

export const WEAPON_CATEGORIES: string[] = [
  'Ágeis',
  'Versáteis',
  'Brutas',
  'Dominantes',
  'Rápidas',
  'Precisas',
  'Devastadoras',
  'Combate',
  'Canalização',
  'Ritualísticas',
];

export const ARMOR_CATEGORIES: string[] = ['Leves', 'Médias', 'Pesadas'];

export const SHIELD_CATEGORIES: string[] = ['Leves', 'Táticos', 'Grandes'];

/** Slot cost for both the 4 equipped quick-access slots and Subespaço capacity. */
export const SLOT_COST: Record<Tamanho, number> = {
  pequeno: 1,
  medio: 1,
  grande: 2,
};

export const EQUIPPED_SLOT_CAPACITY = 4;

/** Subespaço capacity = Essência attribute score × this multiplier. */
export const SUBESPACO_CAPACITY_PER_ESSENCIA = 5;
