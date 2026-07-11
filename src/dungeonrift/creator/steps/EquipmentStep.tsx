import type { Dispatch } from 'react';
import { CategorySelect, defaultCategoryFor } from '../../CategorySelect';
import { EQUIPPED_SLOT_CAPACITY, SLOT_COST, SUBESPACO_CAPACITY_PER_ESSENCIA } from '../../rules';
import type { EquipmentKind, Tamanho } from '../../types';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

function generateId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `item-${Date.now()}`;
}

export function EquipmentStep({ draft, dispatch }: StepProps) {
  const equippedUsed = draft.equipment.filter((i) => i.location === 'equipped').reduce((sum, i) => sum + SLOT_COST[i.tamanho], 0);
  const subespacoUsed = draft.equipment.filter((i) => i.location === 'subespaco').reduce((sum, i) => sum + SLOT_COST[i.tamanho], 0);
  const subespacoCapacity = draft.attributes.essencia * SUBESPACO_CAPACITY_PER_ESSENCIA;

  function addItem() {
    dispatch({
      type: 'ADD_EQUIPMENT',
      item: { id: generateId(), name: '', kind: 'weapon', category: defaultCategoryFor('weapon'), tamanho: 'pequeno', location: 'equipped' },
    });
  }

  return (
    <div className="dr-panel">
      <h3>equipamentos iniciais</h3>
      <p>
        equipado: {equippedUsed} / {EQUIPPED_SLOT_CAPACITY} · subespaço: {subespacoUsed} / {subespacoCapacity}
      </p>
      {draft.equipment.map((item) => (
        <div key={item.id} className="dr-equipment-row" style={{ flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="nome do item"
            value={item.name}
            onChange={(e) => dispatch({ type: 'UPDATE_EQUIPMENT', id: item.id, patch: { name: e.target.value } })}
            style={{ flex: '2 1 140px' }}
          />
          <select
            value={item.kind}
            onChange={(e) => {
              const kind = e.target.value as EquipmentKind;
              dispatch({ type: 'UPDATE_EQUIPMENT', id: item.id, patch: { kind, category: defaultCategoryFor(kind) } });
            }}
          >
            <option value="weapon">arma</option>
            <option value="armor">armadura</option>
            <option value="shield">escudo</option>
            <option value="general">geral</option>
          </select>
          <CategorySelect
            kind={item.kind}
            value={item.category}
            onChange={(category) => dispatch({ type: 'UPDATE_EQUIPMENT', id: item.id, patch: { category } })}
          />
          <select
            value={item.tamanho}
            onChange={(e) => dispatch({ type: 'UPDATE_EQUIPMENT', id: item.id, patch: { tamanho: e.target.value as Tamanho } })}
          >
            <option value="pequeno">pequeno (1)</option>
            <option value="medio">médio (1)</option>
            <option value="grande">grande (2)</option>
          </select>
          <select
            value={item.location}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_EQUIPMENT', id: item.id, patch: { location: e.target.value as 'equipped' | 'subespaco' } })
            }
          >
            <option value="equipped">equipado</option>
            <option value="subespaco">subespaço</option>
          </select>
          <button type="button" className="dr-btn danger" onClick={() => dispatch({ type: 'REMOVE_EQUIPMENT', id: item.id })}>
            remover
          </button>
        </div>
      ))}
      <button type="button" className="dr-btn ghost" onClick={addItem} style={{ marginTop: '8px' }}>
        + adicionar item
      </button>
    </div>
  );
}

export function isEquipmentStepValid(): boolean {
  return true; // starting gear is optional/GM-adjudicated, no hard requirement
}
