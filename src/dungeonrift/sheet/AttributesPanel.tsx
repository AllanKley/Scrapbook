import { ATTRIBUTES } from '../rules';
import type { AttributeKey, Character } from '../types';

interface AttributesPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

export function AttributesPanel({ character, onChange }: AttributesPanelProps) {
  function setAttribute(key: AttributeKey, value: number) {
    onChange({ attributes: { ...character.attributes, [key]: value } });
  }

  return (
    <div className="dr-panel">
      <h3>atributos</h3>
      {ATTRIBUTES.map((attr) => (
        <div key={attr.key} className="dr-attribute-row">
          <span className="dr-label" title={attr.description}>
            {attr.label}
          </span>
          <div className="dr-stepper">
            <button
              type="button"
              onClick={() => setAttribute(attr.key, Math.max(0, character.attributes[attr.key] - 1))}
              disabled={character.attributes[attr.key] <= 0}
            >
              −
            </button>
            <span className="dr-value">{character.attributes[attr.key]}</span>
            <button type="button" onClick={() => setAttribute(attr.key, character.attributes[attr.key] + 1)}>
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
