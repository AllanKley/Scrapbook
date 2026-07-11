export type AttributeKey = 'impeto' | 'graca' | 'encanto' | 'astucia' | 'instinto' | 'essencia';

export type SkillKey =
  | 'atletismo'
  | 'forca'
  | 'intimidacao'
  | 'luta'
  | 'resistencia'
  | 'furtividade'
  | 'acrobacia'
  | 'manejo'
  | 'precisao'
  | 'persuasao'
  | 'enganacao'
  | 'adestramento'
  | 'performance'
  | 'conduta'
  | 'natural'
  | 'ilegal'
  | 'tecnologico'
  | 'historico'
  | 'investigacao'
  | 'percepcao'
  | 'reflexo'
  | 'rastreamento'
  | 'intuicao'
  | 'canalizacao'
  | 'ressonancia'
  | 'sutileza'
  | 'estabilidade';

export type TrainingTier = 'iniciante' | 'intermediario' | 'avancado' | 'elite';

export type ClassKey =
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

export type ConexoesTier = 'externo' | 'novato' | 'membro' | 'veterano' | 'formado';

export type ConditionKey =
  | 'sangramento'
  | 'fogo'
  | 'congelamento'
  | 'veneno'
  | 'vulnerabilidade'
  | 'atordoamento'
  | 'fraqueza'
  | 'cegueira'
  | 'lentidao'
  | 'imobilizacao'
  | 'silencio'
  | 'corrosao'
  | 'exposicao'
  | 'medo';

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
 * Rank progression track (Despertar -> F -> D -> B -> S). The rulebook only defines this as
 * "5 abilities at these progression ranks" per class/domain — it doesn't yet specify what
 * unlocks each rank-up, so this is a placeholder progression track, not settled rule text.
 */
export type RankKey = 'despertar' | 'f' | 'd' | 'b' | 's';

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

export interface Character {
  id: string;
  schemaVersion: 1;
  name: string;
  concept: string;
  createdAt: string;
  updatedAt: string;

  attributes: Record<AttributeKey, number>;
  skills: Record<SkillKey, TrainingTier>;

  rank: RankKey;
  classKey: ClassKey | null;
  domainKey: DomainKey | null;
  patronos: PatronoGrant[];
  conexoesTier: ConexoesTier | null;

  equipment: EquipmentItem[];

  resources: {
    pv: ResourcePool;
    pa: ResourcePool;
    pe: ResourcePool;
  };

  woundCount: number;
  woundLog: WoundRollLogEntry[];
  conditions: ActiveCondition[];

  ecos: Record<EcoTier, number>;

  /** Free-text escape hatch for anything not modeled yet (Defesa/Evasão, rank, homebrew notes). */
  notes?: string;
}
