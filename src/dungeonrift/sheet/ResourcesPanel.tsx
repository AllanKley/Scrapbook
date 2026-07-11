import type { Character, ResourcePool } from '../types';

interface ResourcesPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

const RESOURCE_LABELS = {
  pv: 'PV (Pontos de Vida)',
  pa: 'PA (Pontos de Ação)',
  pe: 'PE (Pontos de Essência)',
} as const;

export function ResourcesPanel({ character, onChange }: ResourcesPanelProps) {
  function setPool(key: keyof Character['resources'], patch: Partial<ResourcePool>) {
    onChange({ resources: { ...character.resources, [key]: { ...character.resources[key], ...patch } } });
  }

  return (
    <div className="dr-panel">
      <h3>recursos</h3>
      {(Object.keys(RESOURCE_LABELS) as (keyof Character['resources'])[]).map((key) => (
        <div key={key} className="dr-attribute-row">
          <span className="dr-label">{RESOURCE_LABELS[key]}</span>
          <input
            type="number"
            value={character.resources[key].current}
            onChange={(e) => setPool(key, { current: Number(e.target.value) })}
            style={{ width: '70px' }}
          />
          <span>/</span>
          <input
            type="number"
            value={character.resources[key].max}
            onChange={(e) => setPool(key, { max: Number(e.target.value) })}
            style={{ width: '70px' }}
          />
        </div>
      ))}
    </div>
  );
}
