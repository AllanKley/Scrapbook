import type { Tamanho } from '../types';

export type WeaponRangeGroup = 'corpo-a-corpo' | 'distancia' | 'magica';

export const WEAPON_RANGE_GROUP_LABELS: Record<WeaponRangeGroup, string> = {
  'corpo-a-corpo': 'corpo a corpo',
  distancia: 'distância',
  magica: 'mágica',
};

export interface WeaponCategoryDef {
  category: string;
  group: WeaponRangeGroup;
}

export const WEAPON_CATEGORIES: WeaponCategoryDef[] = [
  { category: 'Ágeis', group: 'corpo-a-corpo' },
  { category: 'Versáteis', group: 'corpo-a-corpo' },
  { category: 'Brutas', group: 'corpo-a-corpo' },
  { category: 'Dominantes', group: 'corpo-a-corpo' },
  { category: 'Rápidas', group: 'distancia' },
  { category: 'Precisas', group: 'distancia' },
  { category: 'Devastadoras', group: 'distancia' },
  { category: 'Combate', group: 'magica' },
  { category: 'Canalização', group: 'magica' },
  { category: 'Ritualísticas', group: 'magica' },
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
