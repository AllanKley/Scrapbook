import type {
  AttributeKey,
  ClassKey,
  ConexoesTier,
  DomainKey,
  EquipmentItem,
  ResourcePool,
  SkillKey,
} from '../types';

export interface CreatorDraft {
  name: string;
  concept: string;
  attributes: Record<AttributeKey, number>;
  classKey: ClassKey | null;
  domainKey: DomainKey | null;
  conexoesTier: ConexoesTier | null;
  patronoName: string;
  promotedSkills: SkillKey[];
  equipment: EquipmentItem[];
  resources: { pv: ResourcePool; pa: ResourcePool; pe: ResourcePool };
}

export function createInitialDraft(): CreatorDraft {
  return {
    name: '',
    concept: '',
    attributes: { impeto: 1, graca: 1, encanto: 1, astucia: 1, instinto: 1, essencia: 1 },
    classKey: null,
    domainKey: null,
    conexoesTier: null,
    patronoName: '',
    promotedSkills: [],
    equipment: [],
    resources: {
      pv: { current: 10, max: 10 },
      pa: { current: 3, max: 3 },
      pe: { current: 3, max: 3 },
    },
  };
}

export type CreatorAction =
  | { type: 'SET_NAME'; name: string }
  | { type: 'SET_CONCEPT'; concept: string }
  | { type: 'SET_ATTRIBUTE'; key: AttributeKey; value: number }
  | { type: 'SET_CLASS'; classKey: ClassKey | null }
  | { type: 'SET_DOMAIN'; domainKey: DomainKey | null }
  | { type: 'SET_CONEXOES'; tier: ConexoesTier | null }
  | { type: 'SET_PATRONO'; name: string }
  | { type: 'TOGGLE_SKILL_PROMOTION'; key: SkillKey }
  | { type: 'ADD_EQUIPMENT'; item: EquipmentItem }
  | { type: 'UPDATE_EQUIPMENT'; id: string; patch: Partial<EquipmentItem> }
  | { type: 'REMOVE_EQUIPMENT'; id: string }
  | { type: 'SET_RESOURCE'; key: 'pv' | 'pa' | 'pe'; patch: Partial<ResourcePool> };

export function creatorReducer(state: CreatorDraft, action: CreatorAction): CreatorDraft {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.name };
    case 'SET_CONCEPT':
      return { ...state, concept: action.concept };
    case 'SET_ATTRIBUTE':
      return { ...state, attributes: { ...state.attributes, [action.key]: action.value } };
    case 'SET_CLASS':
      return { ...state, classKey: action.classKey };
    case 'SET_DOMAIN':
      return { ...state, domainKey: action.domainKey };
    case 'SET_CONEXOES':
      return { ...state, conexoesTier: action.tier };
    case 'SET_PATRONO':
      return { ...state, patronoName: action.name };
    case 'TOGGLE_SKILL_PROMOTION': {
      const already = state.promotedSkills.includes(action.key);
      return {
        ...state,
        promotedSkills: already
          ? state.promotedSkills.filter((k) => k !== action.key)
          : [...state.promotedSkills, action.key],
      };
    }
    case 'ADD_EQUIPMENT':
      return { ...state, equipment: [...state.equipment, action.item] };
    case 'UPDATE_EQUIPMENT':
      return {
        ...state,
        equipment: state.equipment.map((item) => (item.id === action.id ? { ...item, ...action.patch } : item)),
      };
    case 'REMOVE_EQUIPMENT':
      return { ...state, equipment: state.equipment.filter((item) => item.id !== action.id) };
    case 'SET_RESOURCE':
      return { ...state, resources: { ...state.resources, [action.key]: { ...state.resources[action.key], ...action.patch } } };
    default:
      return state;
  }
}
