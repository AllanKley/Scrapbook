import type { Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { CLASSES } from '../../rules';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

export function ClassStep({ draft, dispatch }: StepProps) {
  return (
    <div className="dr-panel">
      <h3>classe</h3>
      <p>como esse personagem luta.</p>
      <div className="dr-option-grid">
        {CLASSES.map((c) => (
          <div
            key={c.key}
            className={`dr-option-card ${draft.classKey === c.key ? 'selected' : ''}`}
            onClick={() => dispatch({ type: 'SET_CLASS', classKey: c.key })}
          >
            <h4>
              {c.label}
              <span className={`dr-badge ${c.status}`}>{c.status === 'completa' ? 'completa' : 'revisar'}</span>
            </h4>
            <p>{c.concept}</p>
            <Link
              to={`/devlog/entry/${c.devlogSlug}`}
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

export function isClassStepValid(draft: CreatorDraft): boolean {
  return draft.classKey !== null;
}
