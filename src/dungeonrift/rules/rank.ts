import type { PatronoTier, RankKey } from '../types';

export interface RankDef {
  key: RankKey;
  label: string;
  /** Human-readable summary of everything this rank grants, per progressao-de-personagem.md. */
  grants: string;

  // --- Structured grants, used to build the level-up wizard's steps ---
  /** Unlocks the next Linhagem ability (no choice — Linhagem is fixed for life). */
  linhagemAbility?: boolean;
  /** Unlocks a Domínio ability: continue an existing track or multiclass into a new one. */
  dominioAbility?: boolean;
  /** Grants a new Patrono of this tier. */
  patronoTier?: PatronoTier;
  /** Raise one Traço one rung up the dice ladder (cap d12). */
  grauDeTreinamento?: boolean;
  /** Add a new Experiência at +1, or improve an existing one by +1 (max 5 total). */
  experiencia?: boolean;
  /** Padrão de Vida tier unlocked at this rank. */
  padraoDeVida?: string;
  /** PV maximum goes up (the rules only give a qualitative tier, so the value is entered manually). */
  pvIncrease?: boolean;
}

/**
 * Full Rank ladder per progressao-de-personagem.md. Full ranks (Despertar/F/E/D/C/B/A/S/SS)
 * alternate with intermediate "-" ranks that grant a Patrono plus either an Experiência or a
 * Grau de Treinamento. Every rank-up — full or intermediate — also lets you swap 1 Vínculo.
 */
export const RANKS: RankDef[] = [
  {
    key: 'despertar',
    label: 'Despertar',
    grants: 'Habilidade de Linhagem · Habilidade de Domínio · Padrão de Vida — Modesto · PV Iniciais · Definição de Deslocamento',
    linhagemAbility: true,
    dominioAbility: true,
    padraoDeVida: 'Modesto',
  },
  { key: 'f-', label: 'Rank F-', grants: '+1 Patrono Menor · Nova Experiência ou melhoria', patronoTier: 'menor', experiencia: true },
  { key: 'f', label: 'Rank F', grants: 'Habilidade de Linhagem · Padrão de Vida — Confortável · Aumento de Acesso', linhagemAbility: true, padraoDeVida: 'Confortável' },
  { key: 'e-', label: 'Rank E-', grants: '+1 Patrono Menor · Grau de Treinamento (+1 traço)', patronoTier: 'menor', grauDeTreinamento: true },
  { key: 'e', label: 'Rank E', grants: 'Habilidade de Domínio · Aumento de PV · Aumento de Acesso', dominioAbility: true, pvIncrease: true },
  { key: 'd-', label: 'Rank D-', grants: '+1 Patrono Menor · Nova Experiência ou melhoria', patronoTier: 'menor', experiencia: true },
  { key: 'd', label: 'Rank D', grants: 'Habilidade de Linhagem · Padrão de Vida — Abastado · Aumento de Acesso', linhagemAbility: true, padraoDeVida: 'Abastado' },
  { key: 'c-', label: 'Rank C-', grants: '+1 Patrono Maior · Grau de Treinamento (+1 traço)', patronoTier: 'maior', grauDeTreinamento: true },
  { key: 'c', label: 'Rank C', grants: 'Habilidade de Domínio · Aumento de PV · Aumento de Acesso', dominioAbility: true, pvIncrease: true },
  { key: 'b-', label: 'Rank B-', grants: '+1 Patrono Maior · Nova Experiência ou melhoria', patronoTier: 'maior', experiencia: true },
  { key: 'b', label: 'Rank B', grants: 'Habilidade de Linhagem · Padrão de Vida — Luxuoso · Aumento de Acesso', linhagemAbility: true, padraoDeVida: 'Luxuoso' },
  { key: 'a-', label: 'Rank A-', grants: '+1 Patrono Maior · Grau de Treinamento (+1 traço)', patronoTier: 'maior', grauDeTreinamento: true },
  { key: 'a', label: 'Rank A', grants: 'Habilidade de Domínio · Aumento de PV · Aumento de Acesso', dominioAbility: true, pvIncrease: true },
  { key: 's-', label: 'Rank S-', grants: '+1 Patrono Supremo · Nova Experiência ou melhoria', patronoTier: 'supremo', experiencia: true },
  { key: 's', label: 'Rank S', grants: 'Habilidade de Linhagem · Padrão de Vida — Milionário · Aumento de Acesso', linhagemAbility: true, padraoDeVida: 'Milionário' },
  { key: 'ss-', label: 'Rank SS-', grants: '+1 Patrono Supremo · Grau de Treinamento (+1 traço)', patronoTier: 'supremo', grauDeTreinamento: true },
  { key: 'ss', label: 'Rank SS', grants: 'Habilidade de Domínio · Aumento de PV · Aumento de Acesso', dominioAbility: true, pvIncrease: true },
];

export function rankIndex(rank: RankKey): number {
  return RANKS.findIndex((r) => r.key === rank);
}

export function isIntermediateRank(rank: RankKey): boolean {
  return rank.endsWith('-');
}

/** The rank a character would advance into next, or undefined at the top of the ladder. */
export function nextRank(rank: RankKey): RankDef | undefined {
  return RANKS[rankIndex(rank) + 1];
}

/** Padrão de Vida (Benefícios Sociais wealth tier) unlocked at each full rank. */
export const PADRAO_DE_VIDA_BY_RANK: Partial<Record<RankKey, string>> = Object.fromEntries(
  RANKS.filter((r) => r.padraoDeVida).map((r) => [r.key, r.padraoDeVida as string]),
);

/** Looks up the highest Padrão de Vida tier reached at or before the given rank. */
export function padraoDeVidaAt(rank: RankKey): string {
  const idx = rankIndex(rank);
  for (let i = idx; i >= 0; i--) {
    const tier = RANKS[i].padraoDeVida;
    if (tier) return tier;
  }
  return 'Modesto';
}

/**
 * How many Linhagem abilities are unlocked at a given rank. Linhagem unlocks at
 * Despertar/F/D/B/S, so this counts those milestones at or below the character's rank.
 */
export function linhagemAbilityCountAt(rank: RankKey): number {
  const idx = rankIndex(rank);
  return RANKS.slice(0, idx + 1).filter((r) => r.linhagemAbility).length;
}
