import { TRAITS, traitGrau } from '../rules';
import type { Character } from '../types';

/**
 * Traços as DDB-style ability blocks. Read-only: dice only move on a Grau de Treinamento, which
 * happens inside the level-up wizard. Shows the Grau alongside the die because abilities
 * constantly read "igual ao seu Grau de X".
 */
export function TraitBlocks({ character }: { character: Character }) {
  return (
    <div className="dr-trait-grid">
      {TRAITS.map((trait) => {
        const die = character.traits[trait.key];
        return (
          <div key={trait.key} className="dr-trait-block" title={trait.description}>
            <span className="dr-trait-name">{trait.label}</span>
            <span className="dr-trait-die">d{die}</span>
            <span className="dr-trait-grau">Grau {traitGrau(die)}</span>
          </div>
        );
      })}
    </div>
  );
}
