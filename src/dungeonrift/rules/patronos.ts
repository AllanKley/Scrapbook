export interface PatronoOption {
  name: string;
}

/**
 * Only the Menor tier roster exists in the source rules — Maior and Supremo tiers aren't
 * researched/written yet. This is fine for character creation: a freshly-Awakened character
 * only gets the Despertar milestone, which grants exactly 1 Menor Patrono.
 */
export const PATRONOS_MENOR: PatronoOption[] = [
  { name: 'Hércules' },
  { name: 'Cú Chulainn' },
  { name: 'Beowulf' },
  { name: 'Enkidu' },
  { name: 'Kumbhakarna' },
  { name: 'Sun Wukong' },
  { name: 'Coyote' },
  { name: 'Anansi' },
  { name: 'Curupira' },
  { name: 'Saci-Pererê' },
  { name: 'Iara' },
  { name: 'A Esfinge de Tebas' },
  { name: 'Eco' },
  { name: 'Puck' },
  { name: 'Baba Yaga' },
  { name: 'Cérbero' },
];

/** Not yet defined in the source rules — left empty on purpose. */
export const PATRONOS_MAIOR: PatronoOption[] = [];
export const PATRONOS_SUPREMO: PatronoOption[] = [];
