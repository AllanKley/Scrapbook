import type { ConditionKey } from '../types';

export interface ConditionDef {
  key: ConditionKey;
  label: string;
  description: string;
}

/** Trimmed from 14 to these 6 real conditions per condicoes.md — Corrupção is new, the other 8 were cut. */
export const CONDITIONS: ConditionDef[] = [
  { key: 'sangramento', label: 'Sangramento', description: 'cada stack causa dano Baixo sempre que você realizar uma ação' },
  { key: 'corrosao', label: 'Corrosão', description: 'cada stack causa dano Baixo no início do turno da criatura afetada' },
  { key: 'corrupcao', label: 'Corrupção', description: 'enquanto Corrompido, efeitos de cura não funcionam em você; não acumula' },
  { key: 'lentidao', label: 'Lentidão', description: 'cada stack reduz seus PA por rodada em 1 (mín. 1)' },
  { key: 'exposicao', label: 'Exposição', description: 'não pode usar reações para Defender ou Esquivar' },
  { key: 'medo', label: 'Medo', description: 'não pode atacar a fonte nem permanecer em alcance Curto dela — deve se afastar se já estiver dentro' },
];
