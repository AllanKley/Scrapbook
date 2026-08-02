import type { Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { DESLOCAMENTO_BY_GROUP, DOMAINS, DOMAIN_DEVLOG_SLUG, DOMAIN_GROUPS, PV_TIER_BY_GROUP } from '../../rules';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

export function DomainStep({ draft, dispatch }: StepProps) {
  return (
    <div className="dr-panel">
      <h3>domínio</h3>
      <p>o papel desse personagem no grupo — independente da linhagem.</p>
      {DOMAIN_GROUPS.map((group) => (
        <div key={group.key} style={{ marginBottom: '12px' }}>
          <p style={{ fontWeight: 700, margin: '0 0 4px' }}>{group.label}</p>
          <div className="dr-option-grid">
            {DOMAINS.filter((d) => d.group === group.key).map((d) => {
              const selected = draft.domainKey === d.key;
              return (
                <div
                  key={d.key}
                  className={`dr-option-card ${selected ? 'selected' : ''}`}
                  onClick={() => dispatch({ type: 'SET_DOMAIN', domainKey: d.key })}
                >
                  <h4>{d.label}</h4>
                  <p>{d.concept}</p>
                  {selected && (
                    <>
                      <p className="dr-ability-preview">
                        <strong>{d.abilities[0].name}</strong> (Despertar) — {d.abilities[0].summary}
                      </p>
                      <p className="dr-ability-preview">
                        PV {PV_TIER_BY_GROUP[d.group].initial} · Deslocamento {DESLOCAMENTO_BY_GROUP[d.group]}
                      </p>
                    </>
                  )}
                  <Link to={`/devlog/entry/${DOMAIN_DEVLOG_SLUG}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                    ver regras
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function isDomainStepValid(draft: CreatorDraft): boolean {
  return draft.domainKey !== null;
}
