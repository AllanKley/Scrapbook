import { useParams } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { BackLink } from '../components/shared/BackLink';
import { InPageMarkdown } from '../components/shared/InPageMarkdown';
import { getChangelogEntryBySlug } from '../content-loaders/loadDevlogEntries';

export function ChangelogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? getChangelogEntryBySlug(slug) : undefined;

  if (!entry) {
    return (
      <AnimatedSection direction="top">
        <BackLink to="/devlog" label="back to devlog" />
        <h2 className="section-heading">version not found</h2>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection direction="top">
      <BackLink to="/devlog" label="back to devlog" />
      <h2 className="section-heading">v{entry.frontmatter.version}</h2>
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
