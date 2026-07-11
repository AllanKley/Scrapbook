import type { Dispatch } from 'react';
import { CONEXOES } from '../../rules';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

export function ConexoesStep({ draft, dispatch }: StepProps) {
  return (
    <div className="dr-panel">
      <h3>conexões (guilda)</h3>
      <p>quanto tempo esse personagem tem de casa em uma guilda — isso concede perícias bônus promovíveis mais adiante.</p>
      <div className="dr-option-grid">
        {CONEXOES.map((c) => (
          <div
            key={c.tier}
            className={`dr-option-card ${draft.conexoesTier === c.tier ? 'selected' : ''}`}
            onClick={() => dispatch({ type: 'SET_CONEXOES', tier: c.tier })}
          >
            <h4>{c.label}</h4>
            <p>{c.yearsLabel}</p>
            <p>{c.bonusSkillPromotions} perícia(s) bônus promovíveis</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function isConexoesStepValid(draft: CreatorDraft): boolean {
  return draft.conexoesTier !== null;
}
