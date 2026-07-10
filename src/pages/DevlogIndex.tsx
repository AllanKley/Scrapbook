import { AnimatedSection } from '../components/shared/AnimatedSection';
import { ChangelogEntryCard } from '../components/devlog/ChangelogEntryCard';
import { DevlogSectionGroup } from '../components/devlog/DevlogSectionGroup';
import { changelogEntries, devlogSections } from '../content-loaders/loadDevlogEntries';

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
