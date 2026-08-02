import type { RankKey } from '../types';

export interface RankDef {
  key: RankKey;
  label: string;
  /** What this rank grants, per the real table in progressao-de-personagem.md. */
  grants: string;
}

/**
 * Full Rank ladder per progressao-de-personagem.md — replaces the old 5-step invented placeholder
 * now that the real progression table exists. Full ranks (Despertar/F/E/D/C/B/A/S/SS) alternate
 * with intermediate "-" ranks that grant a Patrono plus either an Experiência or a Grau de
 * Treinamento (trait die +1 rung).
 */
export const RANKS: RankDef[] = [
  { key: 'despertar', label: 'Despertar', grants: 'Habilidade de Linhagem · Habilidade de Domínio · Padrão de Vida — Modesto · PV Iniciais · Definição de Deslocamento' },
  { key: 'f-', label: 'Rank F-', grants: '+1 Patrono Menor · Nova Experiência ou melhoria' },
  { key: 'f', label: 'Rank F', grants: 'Habilidade de Linhagem · Padrão de Vida — Confortável · Aumento de Acesso' },
  { key: 'e-', label: 'Rank E-', grants: '+1 Patrono Menor · Grau de Treinamento (+1 traço)' },
  { key: 'e', label: 'Rank E', grants: 'Habilidade de Domínio · Aumento de PV · Aumento de Acesso' },
  { key: 'd-', label: 'Rank D-', grants: '+1 Patrono Menor · Nova Experiência ou melhoria' },
  { key: 'd', label: 'Rank D', grants: 'Habilidade de Linhagem · Padrão de Vida — Abastado · Aumento de Acesso' },
  { key: 'c-', label: 'Rank C-', grants: '+1 Patrono Maior · Grau de Treinamento (+1 traço)' },
  { key: 'c', label: 'Rank C', grants: 'Habilidade de Domínio · Aumento de PV · Aumento de Acesso' },
  { key: 'b-', label: 'Rank B-', grants: '+1 Patrono Maior · Nova Experiência ou melhoria' },
  { key: 'b', label: 'Rank B', grants: 'Habilidade de Linhagem · Padrão de Vida — Luxuoso · Aumento de Acesso' },
  { key: 'a-', label: 'Rank A-', grants: '+1 Patrono Maior · Grau de Treinamento (+1 traço)' },
  { key: 'a', label: 'Rank A', grants: 'Habilidade de Domínio · Aumento de PV · Aumento de Acesso' },
  { key: 's-', label: 'Rank S-', grants: '+1 Patrono Supremo · Nova Experiência ou melhoria' },
  { key: 's', label: 'Rank S', grants: 'Habilidade de Linhagem · Padrão de Vida — Milionário · Aumento de Acesso' },
  { key: 'ss-', label: 'Rank SS-', grants: '+1 Patrono Supremo · Grau de Treinamento (+1 traço)' },
  { key: 'ss', label: 'Rank SS', grants: 'Habilidade de Domínio · Aumento de PV · Aumento de Acesso' },
];

export function rankIndex(rank: RankKey): number {
  return RANKS.findIndex((r) => r.key === rank);
}

export function isIntermediateRank(rank: RankKey): boolean {
  return rank.endsWith('-');
}

/** Padrão de Vida (Benefícios Sociais wealth tier) unlocked at each full rank, per progressao-de-personagem.md. */
export const PADRAO_DE_VIDA_BY_RANK: Partial<Record<RankKey, string>> = {
  despertar: 'Modesto',
  f: 'Confortável',
  d: 'Abastado',
  b: 'Luxuoso',
  s: 'Milionário',
};

/** Looks up the highest Padrão de Vida tier reached at or before the given rank. */
export function padraoDeVidaAt(rank: RankKey): string {
  const idx = rankIndex(rank);
  for (let i = idx; i >= 0; i--) {
    const tier = PADRAO_DE_VIDA_BY_RANK[RANKS[i].key];
    if (tier) return tier;
  }
  return 'Modesto';
}
