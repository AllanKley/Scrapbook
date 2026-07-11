import type { Dispatch } from 'react';
import { DOMAINS, DOMAIN_GROUPS } from '../../rules';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

export function DomainStep({ draft, dispatch }: StepProps) {
  return (
    <div className="dr-panel">
      <h3>domínio</h3>
      <p>o papel desse personagem no grupo — independente da classe.</p>
      {DOMAIN_GROUPS.map((group) => (
        <div key={group.key} style={{ marginBottom: '12px' }}>
          <p style={{ fontWeight: 700, margin: '0 0 4px' }}>{group.label}</p>
          <div className="dr-option-grid">
            {DOMAINS.filter((d) => d.group === group.key).map((d) => (
              <div
                key={d.key}
                className={`dr-option-card ${draft.domainKey === d.key ? 'selected' : ''}`}
                onClick={() => dispatch({ type: 'SET_DOMAIN', domainKey: d.key })}
              >
                <h4>{d.label}</h4>
                <p>{d.concept}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function isDomainStepValid(draft: CreatorDraft): boolean {
  return draft.domainKey !== null;
}
