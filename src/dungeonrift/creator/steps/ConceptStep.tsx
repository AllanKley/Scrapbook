import type { Dispatch } from 'react';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

export function ConceptStep({ draft, dispatch }: StepProps) {
  return (
    <div className="dr-panel">
      <h3>conceito</h3>
      <p>quem é esse personagem antes de qualquer escolha mecânica?</p>
      <div className="dr-field">
        <label>nome</label>
        <input type="text" value={draft.name} onChange={(e) => dispatch({ type: 'SET_NAME', name: e.target.value })} />
      </div>
      <div className="dr-field">
        <label>história / motivação / papel no grupo</label>
        <textarea
          rows={5}
          value={draft.concept}
          onChange={(e) => dispatch({ type: 'SET_CONCEPT', concept: e.target.value })}
        />
      </div>
    </div>
  );
}

export function isConceptStepValid(draft: CreatorDraft): boolean {
  return draft.name.trim().length > 0;
}
