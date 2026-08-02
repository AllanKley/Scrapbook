import type { DomainGroup, DomainKey, DomainTrackRank } from '../types';

export interface DomainGroupDef {
  key: DomainGroup;
  label: string;
}

export const DOMAIN_GROUPS: DomainGroupDef[] = [
  { key: 'bastiao', label: 'Bastião (defensor)' },
  { key: 'suporte', label: 'Suporte' },
  { key: 'executor', label: 'Executor (ofensivo)' },
  { key: 'especialista', label: 'Especialista (controle/social)' },
];

export interface AbilityPreview {
  name: string;
  summary: string;
}

export interface DomainDef {
  key: DomainKey;
  label: string;
  group: DomainGroup;
  concept: string;
  /** Short paraphrase of the Despertar (first) ability — full text lives in the shared "dominio" devlog entry. */
  despertarAbility: AbilityPreview;
}

export const DOMAINS: DomainDef[] = [
  {
    key: 'protetor',
    label: 'Protetor',
    group: 'bastiao',
    concept: 'redireciona ataques para si, foco em redução de dano',
    despertarAbility: { name: 'Mártir', summary: 'redireciona um ataque de um aliado adjacente para si, reduzindo o dano em Alto.' },
  },
  {
    key: 'bruto',
    label: 'Bruto',
    group: 'bastiao',
    concept: 'se recusa a cair, auto-cura a 0 PV, RD enquanto ferido',
    despertarAbility: { name: 'Ponto Focal', summary: 'força inimigos em alcance curto a focarem em você.' },
  },
  {
    key: 'curandeiro',
    label: 'Curandeiro',
    group: 'suporte',
    concept: 'transferência/cura de PV, pode puxar PV de inimigos',
    despertarAbility: { name: 'Transferência de Vitalidade', summary: 'transfere PV entre criaturas em alcance estendido.' },
  },
  {
    key: 'estudioso',
    label: 'Estudioso',
    group: 'suporte',
    concept: 'conhecimento, troca um dos dois Traços escolhidos num teste por outro à sua escolha',
    despertarAbility: { name: 'Conhecimento Paralelo', summary: 'troca um dos dois Traços escolhidos num teste por outro à sua escolha.' },
  },
  {
    key: 'ofensivo',
    label: 'Ofensivo',
    group: 'executor',
    concept: 'pressão sustentada / dano de retaliação',
    despertarAbility: { name: 'Retribuição', summary: 'dano extra contra um inimigo que te feriu desde seu último turno.' },
  },
  {
    key: 'assassino',
    label: 'Assassino',
    group: 'executor',
    concept: 'dano explosivo em alvo único, marcação, finalização que ignora armadura',
    despertarAbility: { name: 'Duelista', summary: 'dano extra contra inimigos isolados, sem aliados por perto.' },
  },
  {
    key: 'social',
    label: 'Social',
    group: 'especialista',
    concept: 'alavancagem social reutilizável, confiança de NPCs',
    despertarAbility: { name: 'Discurso Persuasivo', summary: 'reutiliza uma Alavanca Social já usada.' },
  },
  {
    key: 'tatico',
    label: 'Tático',
    group: 'especialista',
    concept: 'análise de campo de batalha/coleta de informação, bônus de PA a aliados',
    despertarAbility: { name: 'Olhar Analítico', summary: 'analisa um inimigo para descobrir uma fraqueza ou padrão de combate.' },
  },
];

/** Qualitative PV tier labels by Domínio group — real numbers aren't defined in the rules yet. */
export const PV_TIER_BY_GROUP: Record<DomainGroup, { initial: string; perLevel: string }> = {
  bastiao: { initial: 'Alto', perLevel: 'Alto' },
  suporte: { initial: 'Médio', perLevel: 'Médio' },
  executor: { initial: 'Alto', perLevel: 'Médio' },
  especialista: { initial: 'Médio', perLevel: 'Baixo' },
};

/** Domínio write-ups currently live inside the single shared "dominio" devlog entry, not one page per domain. */
export const DOMAIN_DEVLOG_SLUG = 'dominio';

/**
 * Deslocamento (squares/turn) granted by the starting Domínio, shared by both specializations.
 * Sourced from recursos.md's explicit table. Note: dominio.md's inline text states different
 * numbers (Bastião 4 / Suporte 5 / Executor 6, no Especialista figure given) — treating
 * recursos.md as canonical since it's explicitly the derived-resources reference page, but this
 * is an unreconciled discrepancy in the source itself, not a settled call.
 */
export const DESLOCAMENTO_BY_GROUP: Record<DomainGroup, number> = {
  bastiao: 6,
  suporte: 7,
  executor: 8,
  especialista: 5,
};

export const DOMAIN_TRACK_RANKS: DomainTrackRank[] = ['despertar', 'e', 'c', 'a', 's'];

export function domainTrackRankIndex(rank: DomainTrackRank): number {
  return DOMAIN_TRACK_RANKS.indexOf(rank);
}
