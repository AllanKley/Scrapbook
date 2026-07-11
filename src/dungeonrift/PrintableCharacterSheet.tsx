import { ATTRIBUTES, CLASSES, CONDITIONS, CONEXOES, DOMAINS, RANKS, rankIndex, SKILLS, TRAINING_TIER_DICE } from './rules';
import type { Character } from './types';

export function PrintableCharacterSheet({ character }: { character: Character }) {
  const classDef = CLASSES.find((c) => c.key === character.classKey);
  const domainDef = DOMAINS.find((d) => d.key === character.domainKey);
  const conexoesDef = CONEXOES.find((c) => c.tier === character.conexoesTier);
  const rankDef = RANKS[rankIndex(character.rank)];

  return (
    <div className="dr-print-sheet">
      <header className="dr-print-header">
        <h1>{character.name}</h1>
        <p className="dr-print-subtitle">
          {classDef?.label ?? 'sem classe'} · {domainDef?.label ?? 'sem domínio'} · {rankDef?.label ?? ''}
        </p>
        {character.concept && <p className="dr-print-concept">{character.concept}</p>}
      </header>

      <section className="dr-print-section">
        <h2>atributos</h2>
        <div className="dr-print-attribute-grid">
          {ATTRIBUTES.map((attr) => (
            <div key={attr.key} className="dr-print-attribute-box">
              <span className="dr-print-attribute-value">{character.attributes[attr.key]}</span>
              <span className="dr-print-attribute-label">{attr.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="dr-print-section">
        <h2>recursos</h2>
        <div className="dr-print-resource-row">
          <div className="dr-print-resource-box">
            <span className="dr-print-attribute-label">PV</span>
            <span className="dr-print-attribute-value">
              {character.resources.pv.current} / {character.resources.pv.max}
            </span>
          </div>
          <div className="dr-print-resource-box">
            <span className="dr-print-attribute-label">PA</span>
            <span className="dr-print-attribute-value">
              {character.resources.pa.current} / {character.resources.pa.max}
            </span>
          </div>
          <div className="dr-print-resource-box">
            <span className="dr-print-attribute-label">PE</span>
            <span className="dr-print-attribute-value">
              {character.resources.pe.current} / {character.resources.pe.max}
            </span>
          </div>
          <div className="dr-print-resource-box">
            <span className="dr-print-attribute-label">Ferimentos</span>
            <span className="dr-print-attribute-value">{character.woundCount}</span>
          </div>
        </div>
      </section>

      <section className="dr-print-section">
        <h2>perícias</h2>
        <div className="dr-print-skill-columns">
          {ATTRIBUTES.map((attr) => (
            <div key={attr.key} className="dr-print-skill-column">
              <h3>{attr.label}</h3>
              {SKILLS.filter((s) => s.attribute === attr.key).map((skill) => (
                <div key={skill.key} className="dr-print-skill-row">
                  <span>{skill.label}</span>
                  <span>{TRAINING_TIER_DICE[character.skills[skill.key]]}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="dr-print-section">
        <h2>conexões &amp; patronos</h2>
        <p>conexões: {conexoesDef?.label ?? '—'}</p>
        <p>patronos: {character.patronos.map((p) => `${p.name} (${p.tier})`).join(', ') || '—'}</p>
      </section>

      <section className="dr-print-section">
        <h2>equipamentos</h2>
        {character.equipment.length === 0 ? (
          <p>—</p>
        ) : (
          <table className="dr-print-table">
            <thead>
              <tr>
                <th>item</th>
                <th>tipo</th>
                <th>categoria</th>
                <th>local</th>
              </tr>
            </thead>
            <tbody>
              {character.equipment.map((item) => (
                <tr key={item.id}>
                  <td>{item.name || '(sem nome)'}</td>
                  <td>{item.kind}</td>
                  <td>{item.category}</td>
                  <td>{item.location === 'equipped' ? 'equipado' : 'subespaço'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="dr-print-section">
        <h2>condições ativas</h2>
        <p>
          {character.conditions
            .map((c) => `${CONDITIONS.find((def) => def.key === c.key)?.label ?? c.key} (${c.stacks}x)`)
            .join(', ') || '—'}
        </p>
      </section>

      <section className="dr-print-section">
        <h2>ecos</h2>
        <p>
          Tênue {character.ecos.tenue} · Manifesto {character.ecos.manifesto} · Ancestral {character.ecos.ancestral} · Primordial{' '}
          {character.ecos.primordial}
        </p>
      </section>

      {character.notes && (
        <section className="dr-print-section">
          <h2>notas</h2>
          <p>{character.notes}</p>
        </section>
      )}
    </div>
  );
}
