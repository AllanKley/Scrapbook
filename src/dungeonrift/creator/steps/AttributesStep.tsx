import type { Dispatch } from 'react';
import { ATTRIBUTES, ATTRIBUTE_CREATION_RULES } from '../../rules';
import { computeAttributeBudget } from '../attributeRules';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

export function AttributesStep({ draft, dispatch }: StepProps) {
  const budget = computeAttributeBudget(draft.attributes);

  return (
    <div className="dr-panel">
      <h3>atributos</h3>
      <p>
        todos começam em {ATTRIBUTE_CREATION_RULES.base}. você tem {ATTRIBUTE_CREATION_RULES.pointPool} pontos para
        distribuir (máximo {ATTRIBUTE_CREATION_RULES.maxAtCreation} por atributo). pode zerar um atributo para
        ganhar +{ATTRIBUTE_CREATION_RULES.zeroOutBonus} ponto extra.
      </p>
      <div className={`dr-budget-banner ${budget.remaining !== 0 ? 'over' : ''}`}>
        {budget.remaining === 0
          ? 'todos os pontos distribuídos ✓'
          : budget.remaining > 0
            ? `${budget.remaining} ponto(s) restante(s)`
            : `${-budget.remaining} ponto(s) além do permitido`}
        {budget.zeroedCount > 1 && ' — só é permitido zerar 1 atributo'}
      </div>
      {ATTRIBUTES.map((attr) => (
        <div key={attr.key} className="dr-attribute-row">
          <span className="dr-label" title={attr.description}>
            {attr.label}
          </span>
          <div className="dr-stepper">
            <button
              type="button"
              onClick={() => dispatch({ type: 'SET_ATTRIBUTE', key: attr.key, value: Math.max(0, draft.attributes[attr.key] - 1) })}
              disabled={draft.attributes[attr.key] <= 0}
            >
              −
            </button>
            <span className="dr-value">{draft.attributes[attr.key]}</span>
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: 'SET_ATTRIBUTE',
                  key: attr.key,
                  value: Math.min(ATTRIBUTE_CREATION_RULES.maxAtCreation, draft.attributes[attr.key] + 1),
                })
              }
              disabled={draft.attributes[attr.key] >= ATTRIBUTE_CREATION_RULES.maxAtCreation}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function isAttributesStepValid(draft: CreatorDraft): boolean {
  return computeAttributeBudget(draft.attributes).isValid;
}
