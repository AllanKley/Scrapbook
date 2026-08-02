import { DIE_LADDER, TRAITS, traitGrau } from '../rules';
import type { Character, TraitDie, TraitKey } from '../types';

interface TraitBlocksProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

/**
 * Traços as DDB-style ability blocks. Shows the Grau (1-5) alongside the die because abilities
 * constantly read "igual ao seu Grau de X" — without it you'd convert d10 -> 4 in your head.
 */
export function TraitBlocks({ character, onChange }: TraitBlocksProps) {
  function setTrait(key: TraitKey, die: TraitDie) {
    onChange({ traits: { ...character.traits, [key]: die } });
  }

  return (
    <div className="dr-trait-grid">
      {TRAITS.map((trait) => {
        const die = character.traits[trait.key];
        return (
          <div key={trait.key} className="dr-trait-block" title={trait.description}>
            <span className="dr-trait-name">{trait.label}</span>
            <span className="dr-trait-die">d{die}</span>
            <span className="dr-trait-grau">Grau {traitGrau(die)}</span>
            <select
              className="dr-trait-select"
              value={die}
              onChange={(e) => setTrait(trait.key, Number(e.target.value) as TraitDie)}
              aria-label={`dado de ${trait.label}`}
            >
              {DIE_LADDER.map((d) => (
                <option key={d} value={d}>
                  d{d}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
