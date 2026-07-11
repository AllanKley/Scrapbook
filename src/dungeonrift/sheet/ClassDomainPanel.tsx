import { Link } from 'react-router-dom';
import { CLASSES, DOMAINS, DOMAIN_DEVLOG_SLUG, DOMAIN_GROUPS } from '../rules';
import type { Character, ClassKey, DomainKey } from '../types';

interface ClassDomainPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

export function ClassDomainPanel({ character, onChange }: ClassDomainPanelProps) {
  const selectedClass = CLASSES.find((c) => c.key === character.classKey);
  const selectedDomain = DOMAINS.find((d) => d.key === character.domainKey);

  return (
    <div className="dr-panel">
      <h3>classe &amp; domínio</h3>
      <div className="dr-field">
        <label>classe</label>
        <select
          value={character.classKey ?? ''}
          onChange={(e) => onChange({ classKey: (e.target.value || null) as ClassKey | null })}
        >
          <option value="">(nenhuma)</option>
          {CLASSES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label} {c.status === 'revisar' ? '(rascunho)' : ''}
            </option>
          ))}
        </select>
        {selectedClass && (
          <p style={{ margin: '4px 0 0' }}>
            <Link to={`/devlog/entry/${selectedClass.devlogSlug}`}>ver regras de {selectedClass.label}</Link>
            <span className={`dr-badge ${selectedClass.status}`}>
              {selectedClass.status === 'completa' ? 'completa' : 'revisar'}
            </span>
          </p>
        )}
      </div>

      <div className="dr-field">
        <label>domínio</label>
        <select
          value={character.domainKey ?? ''}
          onChange={(e) => onChange({ domainKey: (e.target.value || null) as DomainKey | null })}
        >
          <option value="">(nenhum)</option>
          {DOMAIN_GROUPS.map((group) => (
            <optgroup key={group.key} label={group.label}>
              {DOMAINS.filter((d) => d.group === group.key).map((d) => (
                <option key={d.key} value={d.key}>
                  {d.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {selectedDomain && (
          <p style={{ margin: '4px 0 0' }}>
            <Link to={`/devlog/entry/${DOMAIN_DEVLOG_SLUG}`}>ver regras de domínio</Link>
          </p>
        )}
      </div>
    </div>
  );
}
