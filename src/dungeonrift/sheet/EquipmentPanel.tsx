import { ARMOR_CATEGORIES, EQUIPPED_SLOT_CAPACITY, SHIELD_CATEGORIES, SLOT_COST, SUBESPACO_CAPACITY_PER_ESSENCIA, WEAPON_CATEGORIES } from '../rules';
import type { Character, EquipmentItem, EquipmentKind, Tamanho } from '../types';

interface EquipmentPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

function categoriesFor(kind: EquipmentKind): string[] {
  if (kind === 'weapon') return WEAPON_CATEGORIES;
  if (kind === 'armor') return ARMOR_CATEGORIES;
  if (kind === 'shield') return SHIELD_CATEGORIES;
  return [];
}

function generateId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `item-${Date.now()}`;
}

export function EquipmentPanel({ character, onChange }: EquipmentPanelProps) {
  const equippedUsed = character.equipment
    .filter((i) => i.location === 'equipped')
    .reduce((sum, i) => sum + SLOT_COST[i.tamanho], 0);
  const subespacoUsed = character.equipment
    .filter((i) => i.location === 'subespaco')
    .reduce((sum, i) => sum + SLOT_COST[i.tamanho], 0);
  const subespacoCapacity = character.attributes.essencia * SUBESPACO_CAPACITY_PER_ESSENCIA;

  function updateItem(id: string, patch: Partial<EquipmentItem>) {
    onChange({ equipment: character.equipment.map((item) => (item.id === id ? { ...item, ...patch } : item)) });
  }

  function addItem() {
    const newItem: EquipmentItem = {
      id: generateId(),
      name: '',
      kind: 'weapon',
      category: WEAPON_CATEGORIES[0],
      tamanho: 'pequeno',
      location: 'equipped',
    };
    onChange({ equipment: [...character.equipment, newItem] });
  }

  function removeItem(id: string) {
    onChange({ equipment: character.equipment.filter((item) => item.id !== id) });
  }

  return (
    <div className="dr-panel">
      <h3>equipamentos</h3>

      <p style={{ margin: '0 0 4px' }}>
        equipado: {equippedUsed} / {EQUIPPED_SLOT_CAPACITY} espaços
      </p>
      <div className="dr-slot-bar">
        <div
          className={`dr-slot-bar-fill ${equippedUsed > EQUIPPED_SLOT_CAPACITY ? 'over' : ''}`}
          style={{ width: `${Math.min(100, (equippedUsed / EQUIPPED_SLOT_CAPACITY) * 100)}%` }}
        />
      </div>

      <p style={{ margin: '0 0 4px' }}>
        subespaço: {subespacoUsed} / {subespacoCapacity} espaços (essência × {SUBESPACO_CAPACITY_PER_ESSENCIA})
      </p>
      <div className="dr-slot-bar">
        <div
          className={`dr-slot-bar-fill ${subespacoUsed > subespacoCapacity ? 'over' : ''}`}
          style={{ width: `${subespacoCapacity > 0 ? Math.min(100, (subespacoUsed / subespacoCapacity) * 100) : 0}%` }}
        />
      </div>

      {character.equipment.map((item) => (
        <div key={item.id} className="dr-equipment-row" style={{ flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="nome do item"
            value={item.name}
            onChange={(e) => updateItem(item.id, { name: e.target.value })}
            style={{ flex: '2 1 140px' }}
          />
          <select
            value={item.kind}
            onChange={(e) => {
              const kind = e.target.value as EquipmentKind;
              updateItem(item.id, { kind, category: categoriesFor(kind)[0] ?? '' });
            }}
          >
            <option value="weapon">arma</option>
            <option value="armor">armadura</option>
            <option value="shield">escudo</option>
            <option value="general">geral</option>
          </select>
          {categoriesFor(item.kind).length > 0 ? (
            <select value={item.category} onChange={(e) => updateItem(item.id, { category: e.target.value })}>
              {categoriesFor(item.kind).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder="categoria"
              value={item.category}
              onChange={(e) => updateItem(item.id, { category: e.target.value })}
            />
          )}
          <select value={item.tamanho} onChange={(e) => updateItem(item.id, { tamanho: e.target.value as Tamanho })}>
            <option value="pequeno">pequeno (1)</option>
            <option value="medio">médio (1)</option>
            <option value="grande">grande (2)</option>
          </select>
          <select
            value={item.location}
            onChange={(e) => updateItem(item.id, { location: e.target.value as 'equipped' | 'subespaco' })}
          >
            <option value="equipped">equipado</option>
            <option value="subespaco">subespaço</option>
          </select>
          <button type="button" className="dr-btn danger" onClick={() => removeItem(item.id)}>
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
