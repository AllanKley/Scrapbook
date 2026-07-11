import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { ChangelogEntryCard } from '../components/devlog/ChangelogEntryCard';
import { DevlogSectionGroup } from '../components/devlog/DevlogSectionGroup';
import { changelogEntries, devlogSections } from '../content-loaders/loadDevlogEntries';

export function DevlogIndex() {
  return (
    <AnimatedSection direction="top">
      <h2 className="section-heading">Dungeon Rift</h2>
      <p>the tabletop system i'm designing &mdash; devlog entries synced from my obsidian vault, plus a character sheet and creator.</p>

      <div className="card-grid" style={{ marginBottom: '32px' }}>
        <Link to="/devlog/personagens" className="card">
          <h3>personagens</h3>
          <p>crie e edite fichas de personagem para o Dungeon Rift.</p>
        </Link>
      </div>

      <h3>changelog</h3>
      {changelogEntries.length === 0 ? (
        <p>no versions released yet.</p>
      ) : (
        <div className="card-grid">
          {changelogEntries.map((entry) => (
            <ChangelogEntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}

      {devlogSections.length === 0 ? (
        <>
          <h3>entries</h3>
          <p>nothing synced yet.</p>
        </>
      ) : (
        devlogSections.map((section) => <DevlogSectionGroup key={section.key || 'main'} section={section} />)
      )}
    </AnimatedSection>
  );
}
