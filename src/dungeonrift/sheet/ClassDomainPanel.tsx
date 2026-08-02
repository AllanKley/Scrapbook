import { Link } from 'react-router-dom';
import { DOMAINS, DOMAIN_DEVLOG_SLUG, DOMAIN_GROUPS, DOMAIN_TRACK_RANKS, LINHAGENS } from '../rules';
import type { Character, DomainKey, DomainTrackRank, LinhagemKey } from '../types';

interface ClassDomainPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

const TRACK_RANK_LABELS: Record<DomainTrackRank, string> = {
  despertar: 'Despertar',
  e: 'Rank E',
  c: 'Rank C',
  a: 'Rank A',
  s: 'Rank S',
};

export function ClassDomainPanel({ character, onChange }: ClassDomainPanelProps) {
  const selectedLinhagem = LINHAGENS.find((l) => l.key === character.linhagemKey);

  function setDomainTrack(index: number, domainKey: DomainKey) {
    const domains = character.domains.map((track, i) => (i === index ? { ...track, domainKey } : track));
    onChange({ domains });
  }

  function setDomainTrackRank(index: number, rank: DomainTrackRank) {
    const domains = character.domains.map((track, i) => (i === index ? { ...track, rank } : track));
    onChange({ domains });
  }

  function addDomainTrack() {
    const firstUnused = DOMAINS.find((d) => !character.domains.some((t) => t.domainKey === d.key));
    onChange({ domains: [...character.domains, { domainKey: firstUnused?.key ?? DOMAINS[0].key, rank: 'despertar' }] });
  }

  function removeDomainTrack(index: number) {
    onChange({ domains: character.domains.filter((_, i) => i !== index) });
  }

  return (
    <div className="dr-panel">
      <h3>linhagem &amp; domínio</h3>
      <div className="dr-field">
        <label>linhagem</label>
        <select
          value={character.linhagemKey ?? ''}
          onChange={(e) => onChange({ linhagemKey: (e.target.value || null) as LinhagemKey | null })}
        >
          <option value="">(nenhuma)</option>
          {LINHAGENS.map((l) => (
            <option key={l.key} value={l.key}>
              {l.label} {l.status === 'revisar' ? '(rascunho)' : ''}
            </option>
          ))}
        </select>
        {selectedLinhagem && (
          <p style={{ margin: '4px 0 0' }}>
            <Link to={`/devlog/entry/${selectedLinhagem.devlogSlug}`} target="_blank" rel="noreferrer">
              ver regras de {selectedLinhagem.label}
            </Link>
            <span className={`dr-badge ${selectedLinhagem.status}`}>
              {selectedLinhagem.status === 'completa' ? 'completa' : 'revisar'}
            </span>
          </p>
        )}
      </div>

      <div className="dr-field">
        <label>domínio{character.domains.length > 1 ? ' (multiclasse)' : ''}</label>
        {character.domains.map((track, i) => (
          <div key={i} className="dr-equipment-row" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ opacity: 0.7, minWidth: '70px' }}>{i === 0 ? 'inicial' : `trilha ${i + 1}`}</span>
            <select value={track.domainKey} onChange={(e) => setDomainTrack(i, e.target.value as DomainKey)}>
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
            <select value={track.rank} onChange={(e) => setDomainTrackRank(i, e.target.value as DomainTrackRank)}>
              {DOMAIN_TRACK_RANKS.map((rank) => (
                <option key={rank} value={rank}>
                  {TRACK_RANK_LABELS[rank]}
                </option>
              ))}
            </select>
            <Link to={`/devlog/entry/${DOMAIN_DEVLOG_SLUG}`} target="_blank" rel="noreferrer">
              ver regras
            </Link>
            {character.domains.length > 1 && (
              <button type="button" className="dr-btn danger" onClick={() => removeDomainTrack(i)}>
                remover
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="dr-btn ghost"
          onClick={addDomainTrack}
          style={{ marginTop: '8px' }}
          title="Só a trilha inicial concede PV inicial e Deslocamento — trilhas extras só concedem PV por nível ao avançar."
        >
          + multiclassar
        </button>
      </div>
    </div>
  );
}
