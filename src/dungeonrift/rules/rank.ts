import type { RankKey } from '../types';

export interface RankDef {
  key: RankKey;
  label: string;
  /** Placeholder — the rulebook doesn't define rank-up requirements yet. Invented for now, easy to replace later. */
  description: string;
}

/**
 * Placeholder progression track. The rulebook confirms classes/domains each have 5 abilities
 * at these rank names (Despertar/F/D/B/S) but never defines what triggers advancing between
 * them — these descriptions are invented so the rank track has something to show, not settled
 * rules text.
 */
export const RANKS: RankDef[] = [
  { key: 'despertar', label: 'Despertar', description: 'o primeiro despertar de poder — início da jornada.' },
  { key: 'f', label: 'Rank F', description: 'já provou sobreviver ao básico do Despertar.' },
  { key: 'd', label: 'Rank D', description: 'competente o bastante para missões de guilda de baixo risco.' },
  { key: 'b', label: 'Rank B', description: 'reconhecido como ameaça/recurso sério dentro da guilda.' },
  { key: 's', label: 'Rank S', description: 'topo da progressão — poucos chegam até aqui.' },
];

export function rankIndex(rank: RankKey): number {
  return RANKS.findIndex((r) => r.key === rank);
}
