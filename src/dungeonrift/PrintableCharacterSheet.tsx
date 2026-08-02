import { CONDITIONS, DOMAINS, LINHAGENS, RANKS, rankIndex, TRAITS } from './rules';
import type { Character } from './types';

export function PrintableCharacterSheet({ character }: { character: Character }) {
  const linhagemDef = LINHAGENS.find((l) => l.key === character.linhagemKey);
  const domainLabels = character.domains.map((track) => DOMAINS.find((d) => d.key === track.domainKey)?.label ?? track.domainKey);
  const rankDef = RANKS[rankIndex(character.rank)];

  return (
    <div className="dr-print-sheet">
      <header className="dr-print-header">
        <h1>{character.name}</h1>
        <p className="dr-print-subtitle">
          {linhagemDef?.label ?? 'sem linhagem'} · {domainLabels.join(' + ') || 'sem domínio'} · {rankDef?.label ?? ''}
        </p>
        {character.concept && <p className="dr-print-concept">{character.concept}</p>}
      </header>

      <section className="dr-print-section">
        <h2>traços</h2>
        <div className="dr-print-attribute-grid">
          {TRAITS.map((trait) => (
            <div key={trait.key} className="dr-print-attribute-box">
              <span className="dr-print-attribute-value">d{character.traits[trait.key]}</span>
              <span className="dr-print-attribute-label">{trait.label}</span>
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
            <span className="dr-print-attribute-label">RD</span>
            <span className="dr-print-attribute-value">{character.resources.rd}</span>
          </div>
          <div className="dr-print-resource-box">
            <span className="dr-print-attribute-label">Deslocamento</span>
            <span className="dr-print-attribute-value">{character.resources.deslocamento}</span>
          </div>
          <div className="dr-print-resource-box">
            <span className="dr-print-attribute-label">Ferimentos</span>
            <span className="dr-print-attribute-value">{character.woundCount}</span>
          </div>
        </div>
      </section>

      <section className="dr-print-section">
        <h2>experiências</h2>
        {character.experiencias.map((exp) => (
          <div key={exp.id} className="dr-print-skill-row">
            <span>{exp.texto || '(vazia)'}</span>
            <span>+{exp.bonus}</span>
          </div>
        ))}
      </section>

      <section className="dr-print-section">
        <h2>vínculos &amp; patronos</h2>
        <p>
          vínculos: {character.vinculos.map((v) => `${v.nome} (${v.tipo === 'pessoal' ? 'pessoal' : 'organizacional'})`).join(', ') || '—'}
        </p>
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
