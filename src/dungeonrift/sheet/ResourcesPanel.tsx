import { SUBESPACO_CAPACITY_PER_ESSENCIA, traitGrau } from '../rules';
import type { Character, ResourcePool } from '../types';

interface ResourcesPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

const POOL_LABELS = {
  pv: 'PV (Pontos de Vida)',
  pa: 'PA (Pontos de Ação)',
} as const;

export function ResourcesPanel({ character, onChange }: ResourcesPanelProps) {
  function setPool(key: 'pv' | 'pa', patch: Partial<ResourcePool>) {
    onChange({ resources: { ...character.resources, [key]: { ...character.resources[key], ...patch } } });
  }

  const subespacoCapacity = traitGrau(character.traits.essencia) * SUBESPACO_CAPACITY_PER_ESSENCIA;

  return (
    <div className="dr-panel">
      <h3>recursos</h3>
      {(Object.keys(POOL_LABELS) as (keyof typeof POOL_LABELS)[]).map((key) => (
        <div key={key} className="dr-attribute-row">
          <span className="dr-label">{POOL_LABELS[key]}</span>
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

      <div className="dr-attribute-row">
        <span className="dr-label">RD (Redução de Dano)</span>
        <input
          type="number"
          value={character.resources.rd}
          onChange={(e) => onChange({ resources: { ...character.resources, rd: Number(e.target.value) } })}
          style={{ width: '70px' }}
        />
      </div>

      <div className="dr-attribute-row">
        <span className="dr-label">Deslocamento</span>
        <input
          type="number"
          value={character.resources.deslocamento}
          onChange={(e) => onChange({ resources: { ...character.resources, deslocamento: Number(e.target.value) } })}
          style={{ width: '70px' }}
        />
      </div>

      <div className="dr-attribute-row">
        <span className="dr-label">Subespaço</span>
        <span>{subespacoCapacity} espaços (Grau de Essência × {SUBESPACO_CAPACITY_PER_ESSENCIA})</span>
      </div>
    </div>
  );
}
