import { useParams } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { PageHeading } from '../components/shared/PageHeading';
import { InPageMarkdown } from '../components/shared/InPageMarkdown';
import { getDevlogEntryBySlug } from '../content-loaders/loadDevlogEntries';

export function DevlogEntryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? getDevlogEntryBySlug(slug) : undefined;

  if (!entry) {
    return (
      <AnimatedSection direction="top">
        <PageHeading backTo="/devlog" backLabel="back to devlog">
          entry not found
        </PageHeading>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection direction="top">
      <PageHeading backTo="/devlog" backLabel="back to devlog">
        {entry.frontmatter.title}
      </PageHeading>
      <p style={{ opacity: 0.7 }}>
        {entry.frontmatter.date}
        {entry.frontmatter.version ? ` · v${entry.frontmatter.version}` : ''}
        {entry.frontmatter.tags?.length ? ` · ${entry.frontmatter.tags.join(', ')}` : ''}
      </p>
      <div className="markdown-body">
        <InPageMarkdown>{entry.body}</InPageMarkdown>
      </div>
    </AnimatedSection>
  );
}
