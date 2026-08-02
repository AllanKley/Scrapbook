export interface PatronoOption {
  name: string;
}

/**
 * A freshly-Awakened character only gets the Despertar milestone, which grants exactly 1 Menor
 * Patrono — Maior/Supremo only come later via Rank progression (C-/B-/A- and S-/SS- respectively),
 * so only Menor is offered during creation even though all 3 rosters are populated now.
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

export const PATRONOS_MAIOR: PatronoOption[] = [
  { name: 'Zeus' },
  { name: 'Ísis' },
  { name: 'Odin' },
  { name: 'Amaterasu' },
  { name: 'Indra' },
  { name: 'Marduk' },
  { name: 'Shangó' },
  { name: 'Perun' },
  { name: 'Huitzilopochtli' },
  { name: 'Inti' },
  { name: 'Tangaroa' },
  { name: 'Anu' },
  { name: 'Ra' },
  { name: 'Tlaloc' },
];

export const PATRONOS_SUPREMO: PatronoOption[] = [
  { name: 'Caos' },
  { name: 'Ymir' },
  { name: 'Pangu' },
  { name: 'Purusha' },
  { name: 'Atum' },
  { name: 'Tiamat' },
  { name: 'Izanagi' },
  { name: 'Ometeotl' },
  { name: 'Olodumare' },
  { name: 'Papatūānuku' },
];
