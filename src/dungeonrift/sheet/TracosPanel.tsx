import { DIE_LADDER, TRAITS } from '../rules';
import type { Character, TraitDie, TraitKey } from '../types';

interface TracosPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

export function TracosPanel({ character, onChange }: TracosPanelProps) {
  function setTrait(key: TraitKey, die: TraitDie) {
    onChange({ traits: { ...character.traits, [key]: die } });
  }

  return (
    <div className="dr-panel">
      <h3>traços</h3>
      {TRAITS.map((trait) => (
        <div key={trait.key} className="dr-attribute-row">
          <span className="dr-label" title={trait.description}>
            {trait.label}
          </span>
          <select value={character.traits[trait.key]} onChange={(e) => setTrait(trait.key, Number(e.target.value) as TraitDie)}>
            {DIE_LADDER.map((die) => (
              <option key={die} value={die}>
                d{die}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
