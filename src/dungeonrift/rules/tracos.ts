import type { TraitDie, TraitKey } from '../types';

export interface TraitDef {
  key: TraitKey;
  label: string;
  description: string;
}

export const TRAITS: TraitDef[] = [
  { key: 'impeto', label: 'Ímpeto', description: 'força bruta, coragem impulsiva, resolução inabalável — agir agora' },
  { key: 'graca', label: 'Graça', description: 'agilidade, coordenação, reflexos, precisão de movimento' },
  { key: 'encanto', label: 'Encanto', description: 'carisma, influência, persuasão/manipulação, presença social' },
  { key: 'astucia', label: 'Astúcia', description: 'inteligência, raciocínio rápido, planejamento, resolução de problemas' },
  { key: 'instinto', label: 'Instinto', description: 'percepção, sensibilidade ao ambiente, reação a perigo — sentir, não pensar' },
  { key: 'essencia', label: 'Essência', description: 'conexão com o mundo mágico, capacidade de canalizar/resistir energia sobrenatural' },
];

/** The full dice ladder a Traço can climb, low to high. */
export const DIE_LADDER: TraitDie[] = [4, 6, 8, 10, 12];

/** Maps a Traço's die to its Grau (1-5) per tracos.md, used when an ability says "Grau de X" instead of rolling. */
const GRAU_BY_DIE: Record<TraitDie, 1 | 2 | 3 | 4 | 5> = { 4: 1, 6: 2, 8: 3, 10: 4, 12: 5 };

export function traitGrau(die: TraitDie): 1 | 2 | 3 | 4 | 5 {
  return GRAU_BY_DIE[die];
}

/** Creation distribution rules per tracos.md: everyone starts at d4 with 5 points to raise (1 point = 1 rung), capped at d10 until post-creation progression. */
export const TRAIT_CREATION_RULES = {
  baseDie: 4 as TraitDie,
  pointPool: 5,
  maxAtCreation: 10 as TraitDie,
} as const;
