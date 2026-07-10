import { useParams } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { BackLink } from '../components/shared/BackLink';
import { InPageMarkdown } from '../components/shared/InPageMarkdown';
import { getDevlogEntryBySlug } from '../content-loaders/loadDevlogEntries';

export function DevlogEntryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? getDevlogEntryBySlug(slug) : undefined;

  if (!entry) {
    return (
      <AnimatedSection direction="top">
        <BackLink to="/devlog" label="back to devlog" />
        <h2 className="section-heading">entry not found</h2>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection direction="top">
      <BackLink to="/devlog" label="back to devlog" />
      <h2 className="section-heading">{entry.frontmatter.title}</h2>
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
