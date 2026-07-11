import type { Dispatch } from 'react';
import { PATRONOS_MENOR } from '../../rules';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

export function PatronoStep({ draft, dispatch }: StepProps) {
  return (
    <div className="dr-panel">
      <h3>patrono</h3>
      <p>um personagem recém-Despertado ganha exatamente 1 Patrono Menor.</p>
      <div className="dr-option-grid">
        {PATRONOS_MENOR.map((p) => (
          <div
            key={p.name}
            className={`dr-option-card ${draft.patronoName === p.name ? 'selected' : ''}`}
            onClick={() => dispatch({ type: 'SET_PATRONO', name: p.name })}
          >
            <h4>{p.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export function isPatronoStepValid(draft: CreatorDraft): boolean {
  return draft.patronoName.trim().length > 0;
}
