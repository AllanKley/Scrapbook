import { Link } from 'react-router-dom';
import {
  DOMAINS,
  DOMAIN_DEVLOG_SLUG,
  DOMAIN_TRACK_RANK_LABELS,
  LINHAGENS,
  LINHAGEM_ABILITY_RANK_LABELS,
  PATRONOS_MAIOR,
  PATRONOS_MENOR,
  PATRONOS_SUPREMO,
  domainTrackRankIndex,
  linhagemAbilityCountAt,
} from '../rules';
import type { PatronoOption } from '../rules/patronos';
import type { Character } from '../types';

const ALL_PATRONOS: PatronoOption[] = [...PATRONOS_MENOR, ...PATRONOS_MAIOR, ...PATRONOS_SUPREMO];

/**
 * Read-only view of everything the character can actually do. Abilities unlock through the
 * level-up wizard, so nothing here is editable — locked entries are shown greyed so you can see
 * what's coming.
 */
export function AbilitiesPanel({ character }: { character: Character }) {
  const linhagem = LINHAGENS.find((l) => l.key === character.linhagemKey);
  const unlockedLinhagem = linhagemAbilityCountAt(character.rank);

  return (
    <>
      <div className="dr-panel">
        <h3>
          linhagem{linhagem ? ` — ${linhagem.label}` : ''}
          {linhagem && (
            <Link
              to={`/devlog/entry/${linhagem.devlogSlug}`}
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: '10px', fontSize: '0.8rem', fontWeight: 400 }}
            >
              ver regras
            </Link>
          )}
        </h3>
        {!linhagem ? (
          <p style={{ opacity: 0.7 }}>nenhuma linhagem definida.</p>
        ) : (
          linhagem.abilities.map((ability, i) => (
            <div key={ability.rank} className={`dr-ability-row ${i < unlockedLinhagem ? '' : 'locked'}`}>
              <span className="dr-ability-rank">{LINHAGEM_ABILITY_RANK_LABELS[ability.rank]}</span>
              <div className="dr-ability-body">
                <strong>{ability.name}</strong>
                <p>{ability.summary}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="dr-panel">
        <h3>
          domínio
          <Link
            to={`/devlog/entry/${DOMAIN_DEVLOG_SLUG}`}
            target="_blank"
            rel="noreferrer"
            style={{ marginLeft: '10px', fontSize: '0.8rem', fontWeight: 400 }}
          >
            ver regras
          </Link>
        </h3>
        {character.domains.length === 0 ? (
          <p style={{ opacity: 0.7 }}>nenhum domínio definido.</p>
        ) : (
          character.domains.map((track, ti) => {
            const def = DOMAINS.find((d) => d.key === track.domainKey);
            if (!def) return null;
            const unlocked = domainTrackRankIndex(track.rank) + 1;
            return (
              <div key={ti} style={{ marginBottom: '16px' }}>
                <h4 style={{ margin: '0 0 8px' }}>
                  {def.label}
                  <span style={{ opacity: 0.6, fontWeight: 400, fontSize: '0.85rem' }}>
                    {' '}
                    · {DOMAIN_TRACK_RANK_LABELS[track.rank]}
                    {ti === 0 ? ' · trilha inicial' : ' · multiclasse'}
                  </span>
                </h4>
                {def.abilities.map((ability, i) => (
                  <div
                    key={ability.rank}
                    className={`dr-ability-row ${i < unlocked && !ability.undefined ? '' : 'locked'}`}
                  >
                    <span className="dr-ability-rank">{DOMAIN_TRACK_RANK_LABELS[ability.rank]}</span>
                    <div className="dr-ability-body">
                      <strong>{ability.name}</strong>
                      <p>{ability.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>

      <div className="dr-panel">
        <h3>patronos</h3>
        {character.patronos.length === 0 ? (
          <p style={{ opacity: 0.7 }}>nenhum patrono ainda.</p>
        ) : (
          character.patronos.map((granted, i) => {
            const def = ALL_PATRONOS.find((p) => p.name === granted.name);
            return (
              <div key={i} className="dr-ability-row">
                <span className="dr-ability-rank">{granted.tier}</span>
                <div className="dr-ability-body">
                  <strong>{granted.name}</strong>
                  <p>{def?.effect ?? 'efeito não catalogado.'}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
