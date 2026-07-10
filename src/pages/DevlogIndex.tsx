import { AnimatedSection } from '../components/shared/AnimatedSection';
import { ChangelogEntryCard } from '../components/devlog/ChangelogEntryCard';
import { DevlogEntryCard } from '../components/devlog/DevlogEntryCard';
import { changelogEntries, devlogEntries } from '../content-loaders/loadDevlogEntries';

export function DevlogIndex() {
  return (
    <AnimatedSection direction="top">
      <h2 className="section-heading">ttrpg devlog</h2>
      <p>progress notes and changelogs for the tabletop system i'm designing, synced from my obsidian vault.</p>

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

      <h3>entries</h3>
      {devlogEntries.length === 0 ? (
        <p>nothing synced yet.</p>
      ) : (
        <div className="card-grid">
          {devlogEntries.map((entry) => (
            <DevlogEntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}
    </AnimatedSection>
  );
}
