import type { AttributeKey } from '../types';

export interface AttributeDef {
  key: AttributeKey;
  label: string;
  description: string;
}

export const ATTRIBUTES: AttributeDef[] = [
  { key: 'impeto', label: 'Ímpeto', description: 'força bruta, coragem impulsiva, resolução inabalável — agir agora' },
  { key: 'graca', label: 'Graça', description: 'agilidade, coordenação, reflexos, precisão de movimento' },
  { key: 'encanto', label: 'Encanto', description: 'carisma, influência, persuasão/manipulação, presença social' },
  { key: 'astucia', label: 'Astúcia', description: 'inteligência, raciocínio rápido, planejamento, resolução de problemas' },
  { key: 'instinto', label: 'Instinto', description: 'percepção, sensibilidade ao ambiente, reação a perigo — sentir, não pensar' },
  { key: 'essencia', label: 'Essência', description: 'conexão com o mundo mágico, capacidade de canalizar/resistir energia sobrenatural' },
];

/** Point-buy creation rules per atributos.md. */
export const ATTRIBUTE_CREATION_RULES = {
  base: 1,
  pointPool: 5,
  maxAtCreation: 4,
  /** Dropping one attribute to 0 grants this many extra points to spend elsewhere. */
  zeroOutBonus: 1,
} as const;
