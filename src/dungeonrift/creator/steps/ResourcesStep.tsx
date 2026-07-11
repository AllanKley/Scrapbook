import type { Dispatch } from 'react';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

const LABELS = { pv: 'PV (Pontos de Vida)', pa: 'PA (Pontos de Ação)', pe: 'PE (Pontos de Essência)' } as const;

export function ResourcesStep({ draft, dispatch }: StepProps) {
  return (
    <div className="dr-panel">
      <h3>recursos iniciais</h3>
      <p>o livro de regras ainda não define uma fórmula para esses valores — combine com o mestre.</p>
      {(Object.keys(LABELS) as (keyof typeof LABELS)[]).map((key) => (
        <div key={key} className="dr-attribute-row">
          <span className="dr-label">{LABELS[key]}</span>
          <input
            type="number"
            value={draft.resources[key].max}
            onChange={(e) => {
              const max = Number(e.target.value);
              dispatch({ type: 'SET_RESOURCE', key, patch: { max, current: max } });
            }}
            style={{ width: '80px' }}
          />
        </div>
      ))}
    </div>
  );
}

export function isResourcesStepValid(): boolean {
  return true;
}
