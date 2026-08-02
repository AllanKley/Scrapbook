import type { Dispatch } from 'react';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

export function ResourcesStep({ draft, dispatch }: StepProps) {
  return (
    <div className="dr-panel">
      <h3>recursos iniciais</h3>
      <p>PV e Redução de Dano ainda não têm fórmula fixa nas regras — combine com o mestre. PA é sempre 4 por turno.</p>

      <div className="dr-attribute-row">
        <span className="dr-label">PV (Pontos de Vida)</span>
        <input
          type="number"
          value={draft.resources.pv.max}
          onChange={(e) => {
            const max = Number(e.target.value);
            dispatch({ type: 'SET_RESOURCE', key: 'pv', patch: { max, current: max } });
          }}
          style={{ width: '80px' }}
        />
      </div>

      <div className="dr-attribute-row">
        <span className="dr-label">PA (Pontos de Ação)</span>
        <input type="number" value={draft.resources.pa.max} readOnly style={{ width: '80px' }} />
      </div>

      <div className="dr-attribute-row">
        <span className="dr-label">RD (Redução de Dano)</span>
        <input
          type="number"
          value={draft.resources.rd}
          onChange={(e) => dispatch({ type: 'SET_RD', rd: Number(e.target.value) })}
          style={{ width: '80px' }}
        />
      </div>

      <div className="dr-attribute-row">
        <span className="dr-label">Deslocamento</span>
        <input
          type="number"
          value={draft.resources.deslocamento}
          onChange={(e) => dispatch({ type: 'SET_DESLOCAMENTO', value: Number(e.target.value) })}
          style={{ width: '80px' }}
        />
      </div>
      {draft.resources.deslocamento === 0 && <p style={{ opacity: 0.7 }}>escolha um Domínio para preencher automaticamente.</p>}
    </div>
  );
}

export function isResourcesStepValid(): boolean {
  return true;
}
