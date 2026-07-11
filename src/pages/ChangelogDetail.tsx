import { useParams } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { PageHeading } from '../components/shared/PageHeading';
import { InPageMarkdown } from '../components/shared/InPageMarkdown';
import { getChangelogEntryBySlug } from '../content-loaders/loadDevlogEntries';

export function ChangelogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? getChangelogEntryBySlug(slug) : undefined;

  if (!entry) {
    return (
      <AnimatedSection direction="top">
        <PageHeading backTo="/devlog" backLabel="back to devlog">
          version not found
        </PageHeading>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection direction="top">
      <PageHeading backTo="/devlog" backLabel="back to devlog">
        v{entry.frontmatter.version}
      </PageHeading>
      <p style={{ opacity: 0.7 }}>
        {entry.frontmatter.date}
        {entry.frontmatter.previousVersion ? ` · since v${entry.frontmatter.previousVersion}` : ''}
      </p>
      <div className="markdown-body">
        <InPageMarkdown>{entry.body}</InPageMarkdown>
      </div>
    </AnimatedSection>
  );
}
