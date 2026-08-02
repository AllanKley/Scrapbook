export type TraitKey = 'impeto' | 'graca' | 'encanto' | 'astucia' | 'instinto' | 'essencia';

/** The dice-ladder a Traço climbs: d4 -> d6 -> d8 -> d10 -> d12. */
export type TraitDie = 4 | 6 | 8 | 10 | 12;

export type LinhagemKey =
  | 'ceifador'
  | 'espectro'
  | 'selvagem'
  | 'oraculo'
  | 'aprimorado'
  | 'malandro'
  | 'apotecario'
  | 'iluminado'
  | 'forjador'
  | 'conduite';

export type DomainKey = 'protetor' | 'bruto' | 'curandeiro' | 'estudioso' | 'ofensivo' | 'assassino' | 'social' | 'tatico';
export type DomainGroup = 'bastiao' | 'suporte' | 'executor' | 'especialista';

/** Independent per-Domínio-track progress — a character can hold more than one via Multiclasse. */
export type DomainTrackRank = 'despertar' | 'e' | 'c' | 'a' | 's';

export interface DomainTrack {
  domainKey: DomainKey;
  rank: DomainTrackRank;
}

/** Trimmed from 14 to the 6 real conditions per the condicoes.md rework (Corrupção is new). */
export type ConditionKey = 'sangramento' | 'corrosao' | 'corrupcao' | 'lentidao' | 'exposicao' | 'medo';

export type WoundOutcome =
  | 'desestabilizado'
  | 'atordoado'
  | 'ferimentoLeve'
  | 'apagado'
  | 'mutilado'
  | 'abeiraDaMorte'
  | 'ferimentoFatal'
  | 'morteSubita';

/**
 * Full Rank ladder per progressao-de-personagem.md: a full rank (Despertar, F, E, D, C, B, A, S,
 * SS) alternating with an intermediate "-" rank before each (F-, E-, ...) that grants a Patrono
 * and either an Experiência or a Grau de Treinamento. Replaces the old 5-step invented placeholder.
 */
export type RankKey =
  | 'despertar'
  | 'f-'
  | 'f'
  | 'e-'
  | 'e'
  | 'd-'
  | 'd'
  | 'c-'
  | 'c'
  | 'b-'
  | 'b'
  | 'a-'
  | 'a'
  | 's-'
  | 's'
  | 'ss-'
  | 'ss';

export type PatronoTier = 'menor' | 'maior' | 'supremo';

export interface PatronoGrant {
  name: string;
  tier: PatronoTier;
}

/** Slot cost within the 4 quick-access equipped slots (and, at the same rate, Subespaço capacity): pequeno=1, medio=1, grande=2. */
export type Tamanho = 'pequeno' | 'medio' | 'grande';

export type EquipmentKind = 'weapon' | 'armor' | 'shield' | 'general';

export interface EquipmentItem {
  id: string;
  name: string;
  kind: EquipmentKind;
  /** Free text — curated suggestions come from rules/equipment.ts, not enforced here. */
  category: string;
  tamanho: Tamanho;
  location: 'equipped' | 'subespaco';
  notes?: string;
}

export interface ResourcePool {
  current: number;
  max: number;
}

export interface ActiveCondition {
  key: ConditionKey;
  stacks: number;
  notes?: string;
}

export interface WoundRollLogEntry {
  id: string;
  timestamp: string;
  roll: number;
  outcome: WoundOutcome;
}

export type EcoTier = 'tenue' | 'manifesto' | 'ancestral' | 'primordial';

/** A bond to a specific person (Pessoal, up to 4) or institution (Organizacional, exactly 1). Replaces Conexões. */
export interface Vinculo {
  id: string;
  tipo: 'pessoal' | 'organizacional';
  nome: string;
  /** Purely narrative flavor tags (Admiração/Lealdade/Afeto/etc.) — no mechanical effect. */
  emocoes?: string[];
}

/** A short player-authored phrase granting a test bonus and free background knowledge. Replaces trained Perícias. */
export interface Experiencia {
  id: string;
  texto: string;
  bonus: number;
}

export interface Character {
  id: string;
  schemaVersion: 2;
  name: string;
  concept: string;
  createdAt: string;
  updatedAt: string;

  traits: Record<TraitKey, TraitDie>;
  linhagemKey: LinhagemKey | null;
  /** Index 0 is the starting Domínio (grants initial PV + Deslocamento); later entries come from Multiclasse. */
  domains: DomainTrack[];
  vinculos: Vinculo[];
  experiencias: Experiencia[];
  patronos: PatronoGrant[];

  rank: RankKey;

  equipment: EquipmentItem[];

  resources: {
    pv: ResourcePool;
    pa: ResourcePool;
    /** Redução de Dano — manual number; armor RD is still a qualitative label upstream (Baixa/Média/Alta). */
    rd: number;
    /** Derived by default from domains[0], but stored and freely editable on the Sheet. */
    deslocamento: number;
  };

  woundCount: number;
  woundLog: WoundRollLogEntry[];
  conditions: ActiveCondition[];

  ecos: Record<EcoTier, number>;

  /** Free-text escape hatch for anything not modeled yet (Defesa/Evasão, homebrew notes). */
  notes?: string;
}
