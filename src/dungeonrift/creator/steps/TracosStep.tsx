import type { Dispatch } from 'react';
import { TRAITS, TRAIT_CREATION_RULES } from '../../rules';
import { computeTraitBudget, nextDie, prevDie } from '../tracoRules';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

export function TracosStep({ draft, dispatch }: StepProps) {
  const budget = computeTraitBudget(draft.traits);

  return (
    <div className="dr-panel">
      <h3>traços</h3>
      <p>
        todos começam em d{TRAIT_CREATION_RULES.baseDie}. você tem {TRAIT_CREATION_RULES.pointPool} pontos para
        subir a escada de dados (máximo d{TRAIT_CREATION_RULES.maxAtCreation} na criação — d12 só com progressão
        pós-criação).
      </p>
      <div className={`dr-budget-banner ${budget.remaining !== 0 ? 'over' : ''}`}>
        {budget.remaining === 0
          ? 'todos os pontos distribuídos ✓'
          : budget.remaining > 0
            ? `${budget.remaining} ponto(s) restante(s)`
            : `${-budget.remaining} ponto(s) além do permitido`}
      </div>
      {TRAITS.map((trait) => {
        const die = draft.traits[trait.key];
        return (
          <div key={trait.key} className="dr-attribute-row">
            <span className="dr-label" title={trait.description}>
              {trait.label}
            </span>
            <div className="dr-stepper">
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_TRAIT', key: trait.key, die: prevDie(die) })}
                disabled={die === TRAIT_CREATION_RULES.baseDie}
              >
                −
              </button>
              <span className="dr-value">d{die}</span>
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_TRAIT', key: trait.key, die: nextDie(die) })}
                disabled={die >= TRAIT_CREATION_RULES.maxAtCreation}
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function isTracosStepValid(draft: CreatorDraft): boolean {
  return computeTraitBudget(draft.traits).isValid;
}
