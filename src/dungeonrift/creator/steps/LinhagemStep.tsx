import type { Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { LINHAGENS } from '../../rules';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

export function LinhagemStep({ draft, dispatch }: StepProps) {
  return (
    <div className="dr-panel">
      <h3>linhagem</h3>
      <p>como esse personagem luta.</p>
      <div className="dr-option-grid">
        {LINHAGENS.map((l) => (
          <div
            key={l.key}
            className={`dr-option-card ${draft.linhagemKey === l.key ? 'selected' : ''}`}
            onClick={() => dispatch({ type: 'SET_LINHAGEM', linhagemKey: l.key })}
          >
            <h4>
              {l.label}
              <span className={`dr-badge ${l.status}`}>{l.status === 'completa' ? 'completa' : 'revisar'}</span>
            </h4>
            <p>{l.concept}</p>
            <Link
              to={`/devlog/entry/${l.devlogSlug}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              ver regras (abre em nova aba)
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export function isLinhagemStepValid(draft: CreatorDraft): boolean {
  return draft.linhagemKey !== null;
}
