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

export interface DomainAbility {
  rank: DomainTrackRank;
  name: string;
  /** Short paraphrase — full text lives in the shared "dominio" devlog entry. */
  summary: string;
  /** True where the source rules literally say "(A definir)" — shown greyed out rather than invented. */
  undefined?: boolean;
}

export interface DomainDef {
  key: DomainKey;
  label: string;
  group: DomainGroup;
  concept: string;
  abilities: DomainAbility[];
}

/** Placeholder for abilities the rules haven't written yet — never invent numbers for these. */
function todo(rank: DomainTrackRank): DomainAbility {
  return { rank, name: 'A definir', summary: 'ainda não escrita nas regras.', undefined: true };
}

export const DOMAINS: DomainDef[] = [
  {
    key: 'protetor',
    label: 'Protetor',
    group: 'bastiao',
    concept: 'redireciona ataques para si, foco em redução de dano',
    abilities: [
      { rank: 'despertar', name: 'Mártir', summary: '1 PA (reação): redireciona um ataque de um aliado adjacente para si, reduzindo o dano em Alto.' },
      { rank: 'e', name: 'Instinto Defensivo', summary: 'passivo: +1 Fortuna em testes de ataque enquanto houver um aliado em alcance estendido.' },
      { rank: 'c', name: 'Defensor Veloz', summary: '1 PA: troca de lugar com um aliado em alcance curto, movendo-o para alcance estendido.' },
      { rank: 'a', name: 'Controle de Área', summary: 'passivo: inimigos que tentam sair do seu alcance de toque enfrentam um teste de Intimidação.' },
      { rank: 's', name: 'Escudo Protetor', summary: '1 PA (reação): ergue uma barreira em linha até alcance curto que bloqueia todo o dano, inclusive em área.' },
    ],
  },
  {
    key: 'bruto',
    label: 'Bruto',
    group: 'bastiao',
    concept: 'se recusa a cair, auto-cura a 0 PV, RD enquanto ferido',
    abilities: [
      { rank: 'despertar', name: 'Ponto Focal', summary: '1 PA: força inimigos em alcance curto a focarem em você.' },
      { rank: 'e', name: 'Recusa em Cair', summary: 'passivo: se iniciar seu turno com 0 PV, recupera 1 PV.' },
      { rank: 'c', name: 'Corpo Inabalável', summary: 'passivo: Redução de Dano 5 enquanto possuir ao menos 1 Ferimento.' },
      { rank: 'a', name: 'Pressão Constante', summary: 'passivo: causa dano Baixo adicional para cada inimigo adjacente a você.' },
      { rank: 's', name: 'Inquebrável', summary: '1 PA (reação): reduz pela metade o dano recebido.' },
    ],
  },
  {
    key: 'curandeiro',
    label: 'Curandeiro',
    group: 'suporte',
    concept: 'transferência/cura de PV, pode puxar PV de inimigos',
    abilities: [
      { rank: 'despertar', name: 'Transferência de Vitalidade', summary: '1 PA: transfere PV entre criaturas em alcance estendido (máx. Alto se drenar de um inimigo).' },
      { rank: 'e', name: 'Resgate Veloz', summary: 'passivo: quando um aliado em alcance curto chega a 0 PV, move-se até ele de graça e o traz de volta com 1 PV.' },
      { rank: 'c', name: 'Flutuações de Essência', summary: '1 PA: analisa um alvo e ganha bônus Baixo em testes de Instinto/Encanto contra ele.' },
      { rank: 'a', name: 'Instinto Protetor', summary: 'passivo: dano Baixo adicional enquanto estiver em alcance estendido de um aliado ferido.' },
      { rank: 's', name: 'Infusão Vital', summary: '1 PA, 1x por descanso curto: cura PV Alto ou remove 1 Ferimento.' },
    ],
  },
  {
    key: 'estudioso',
    label: 'Estudioso',
    group: 'suporte',
    concept: 'conhecimento, troca um dos dois Traços escolhidos num teste por outro à sua escolha',
    abilities: [
      { rank: 'despertar', name: 'Conhecimento Paralelo', summary: '1 PA: troca um dos dois Traços escolhidos num teste por outro à sua escolha.' },
      todo('e'),
      todo('c'),
      todo('a'),
      todo('s'),
    ],
  },
  {
    key: 'ofensivo',
    label: 'Ofensivo',
    group: 'executor',
    concept: 'pressão sustentada / dano de retaliação',
    abilities: [
      { rank: 'despertar', name: 'Retribuição', summary: 'passivo: dano Baixo adicional contra um inimigo que te feriu desde seu último turno.' },
      { rank: 'e', name: 'Reposicionar', summary: 'passivo: uma vez por turno, Mover + Atacar por 1 PA total, na ordem que quiser.' },
      { rank: 'c', name: 'Surto de Energia', summary: '0 PA, 1x por cena: +1 PA até o fim da rodada.' },
      { rank: 'a', name: 'Foco Letal', summary: 'passivo: dano extra cumulativo em acertos consecutivos no mesmo alvo, até Alto.' },
      { rank: 's', name: 'Guerreiro Imparável', summary: '1 PA: cura PV igual à metade do dano causado, até o fim da rodada.' },
    ],
  },
  {
    key: 'assassino',
    label: 'Assassino',
    group: 'executor',
    concept: 'dano explosivo em alvo único, marcação, finalização que ignora armadura',
    abilities: [
      { rank: 'despertar', name: 'Duelista', summary: 'passivo: +Médio de dano contra inimigos isolados, sem aliados em alcance curto.' },
      { rank: 'e', name: 'Ponto de Vantagem', summary: 'passivo: ação de Movimento gratuita na primeira rodada de combate.' },
      { rank: 'c', name: 'Marca do Assassino', summary: '1 PA: marca um inimigo em alcance médio; ataques contra ele ganham bônus Baixo.' },
      { rank: 'a', name: 'Fantasma', summary: 'passivo: bônus Médio em testes de furtividade e repete a primeira tentativa de se esconder por cena.' },
      { rank: 's', name: 'Finalizador', summary: '1 PA: até o fim da rodada, seus ataques ignoram Armadura e não podem ser bloqueados.' },
    ],
  },
  {
    key: 'social',
    label: 'Social',
    group: 'especialista',
    concept: 'alavancagem social reutilizável, confiança de NPCs',
    abilities: [
      { rank: 'despertar', name: 'Discurso Persuasivo', summary: '1 PA: reutiliza uma Alavanca Social já usada.' },
      { rank: 'e', name: 'Rosto Confiável', summary: 'passivo: 1 falha extra permitida antes de falhar em testes para convencer.' },
      { rank: 'c', name: 'Influência Forçada', summary: '1 PA: força um inimigo a mudar seu estilo de combate.' },
      todo('a'),
      todo('s'),
    ],
  },
  {
    key: 'tatico',
    label: 'Tático',
    group: 'especialista',
    concept: 'análise de campo de batalha/coleta de informação, bônus de PA a aliados',
    abilities: [
      { rank: 'despertar', name: 'Olhar Analítico', summary: '1 PA: analisa um inimigo em alcance médio e descobre ordem de habilidades, fraqueza, resistência ou estilo (2 na primeira rodada).' },
      { rank: 'e', name: 'Estrategista de Campo', summary: 'passivo: aliados em alcance curto recebem +1 PA por rodada.' },
      todo('c'),
      todo('a'),
      todo('s'),
    ],
  },
];

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

/** Qualitative PV tier labels by Domínio group — real numbers aren't defined in the rules yet. */
export const PV_TIER_BY_GROUP: Record<DomainGroup, { initial: string; perLevel: string }> = {
  bastiao: { initial: 'Alto', perLevel: 'Alto' },
  suporte: { initial: 'Médio', perLevel: 'Médio' },
  executor: { initial: 'Alto', perLevel: 'Médio' },
  especialista: { initial: 'Médio', perLevel: 'Baixo' },
};

export const DOMAIN_TRACK_RANKS: DomainTrackRank[] = ['despertar', 'e', 'c', 'a', 's'];

export const DOMAIN_TRACK_RANK_LABELS: Record<DomainTrackRank, string> = {
  despertar: 'Despertar',
  e: 'Rank E',
  c: 'Rank C',
  a: 'Rank A',
  s: 'Rank S',
};

export function domainTrackRankIndex(rank: DomainTrackRank): number {
  return DOMAIN_TRACK_RANKS.indexOf(rank);
}
