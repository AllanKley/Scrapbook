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
        {LINHAGENS.map((l) => {
          const selected = draft.linhagemKey === l.key;
          return (
            <div
              key={l.key}
              className={`dr-option-card ${selected ? 'selected' : ''}`}
              onClick={() => dispatch({ type: 'SET_LINHAGEM', linhagemKey: l.key })}
            >
              <h4>
                {l.label}
                <span className={`dr-badge ${l.status}`}>{l.status === 'completa' ? 'completa' : 'revisar'}</span>
              </h4>
              <p>{l.concept}</p>
              {selected && (
                <p className="dr-ability-preview">
                  <strong>{l.abilities[0].name}</strong> (Despertar) — {l.abilities[0].summary}
                </p>
              )}
              <Link to={`/devlog/entry/${l.devlogSlug}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                ver regras
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function isLinhagemStepValid(draft: CreatorDraft): boolean {
  return draft.linhagemKey !== null;
}
