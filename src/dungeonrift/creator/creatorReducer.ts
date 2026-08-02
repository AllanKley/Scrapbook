import { DESLOCAMENTO_BY_GROUP, DOMAINS, STARTING_BONUS, TRAIT_CREATION_RULES } from '../rules';
import type {
  DomainKey,
  EquipmentItem,
  Experiencia,
  LinhagemKey,
  ResourcePool,
  TraitDie,
  TraitKey,
  Vinculo,
} from '../types';

function generateId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export interface CreatorDraft {
  name: string;
  concept: string;
  traits: Record<TraitKey, TraitDie>;
  linhagemKey: LinhagemKey | null;
  domainKey: DomainKey | null;
  patronoName: string;
  vinculos: Vinculo[];
  /** Fixed at exactly 2 entries during creation — growth happens later via Patrono ranks. */
  experiencias: Experiencia[];
  equipment: EquipmentItem[];
  resources: { pv: ResourcePool; pa: ResourcePool; rd: number; deslocamento: number };
}

export function createInitialDraft(): CreatorDraft {
  return {
    name: '',
    concept: '',
    traits: {
      impeto: TRAIT_CREATION_RULES.baseDie,
      graca: TRAIT_CREATION_RULES.baseDie,
      encanto: TRAIT_CREATION_RULES.baseDie,
      astucia: TRAIT_CREATION_RULES.baseDie,
      instinto: TRAIT_CREATION_RULES.baseDie,
      essencia: TRAIT_CREATION_RULES.baseDie,
    },
    linhagemKey: null,
    domainKey: null,
    patronoName: '',
    vinculos: [],
    experiencias: [
      { id: generateId(), texto: '', bonus: STARTING_BONUS },
      { id: generateId(), texto: '', bonus: STARTING_BONUS },
    ],
    equipment: [],
    resources: {
      pv: { current: 10, max: 10 },
      pa: { current: 4, max: 4 },
      rd: 0,
      deslocamento: 0,
    },
  };
}

export type CreatorAction =
  | { type: 'SET_NAME'; name: string }
  | { type: 'SET_CONCEPT'; concept: string }
  | { type: 'SET_TRAIT'; key: TraitKey; die: TraitDie }
  | { type: 'SET_LINHAGEM'; linhagemKey: LinhagemKey | null }
  | { type: 'SET_DOMAIN'; domainKey: DomainKey | null }
  | { type: 'SET_PATRONO'; name: string }
  | { type: 'ADD_VINCULO'; vinculo: Vinculo }
  | { type: 'UPDATE_VINCULO'; id: string; patch: Partial<Vinculo> }
  | { type: 'REMOVE_VINCULO'; id: string }
  | { type: 'SET_EXPERIENCIA_TEXT'; index: number; texto: string }
  | { type: 'ADD_EQUIPMENT'; item: EquipmentItem }
  | { type: 'UPDATE_EQUIPMENT'; id: string; patch: Partial<EquipmentItem> }
  | { type: 'REMOVE_EQUIPMENT'; id: string };

export function creatorReducer(state: CreatorDraft, action: CreatorAction): CreatorDraft {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.name };
    case 'SET_CONCEPT':
      return { ...state, concept: action.concept };
    case 'SET_TRAIT':
      return { ...state, traits: { ...state.traits, [action.key]: action.die } };
    case 'SET_LINHAGEM':
      return { ...state, linhagemKey: action.linhagemKey };
    case 'SET_DOMAIN': {
      // Deslocamento comes from the starting Domínio's group — auto-populate it here so the
      // Recursos step can show a real derived value instead of asking the player to look it up.
      const group = DOMAINS.find((d) => d.key === action.domainKey)?.group;
      const deslocamento = group ? DESLOCAMENTO_BY_GROUP[group] : 0;
      return { ...state, domainKey: action.domainKey, resources: { ...state.resources, deslocamento } };
    }
    case 'SET_PATRONO':
      return { ...state, patronoName: action.name };
    case 'ADD_VINCULO':
      return { ...state, vinculos: [...state.vinculos, action.vinculo] };
    case 'UPDATE_VINCULO':
      return {
        ...state,
        vinculos: state.vinculos.map((v) => (v.id === action.id ? { ...v, ...action.patch } : v)),
      };
    case 'REMOVE_VINCULO':
      return { ...state, vinculos: state.vinculos.filter((v) => v.id !== action.id) };
    case 'SET_EXPERIENCIA_TEXT':
      return {
        ...state,
        experiencias: state.experiencias.map((e, i) => (i === action.index ? { ...e, texto: action.texto } : e)),
      };
    case 'ADD_EQUIPMENT':
      return { ...state, equipment: [...state.equipment, action.item] };
    case 'UPDATE_EQUIPMENT':
      return {
        ...state,
        equipment: state.equipment.map((item) => (item.id === action.id ? { ...item, ...action.patch } : item)),
      };
    case 'REMOVE_EQUIPMENT':
      return { ...state, equipment: state.equipment.filter((item) => item.id !== action.id) };
    default:
      return state;
  }
}
