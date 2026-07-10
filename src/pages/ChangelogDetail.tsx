import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { getChangelogEntryBySlug } from '../content-loaders/loadDevlogEntries';

export function ChangelogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? getChangelogEntryBySlug(slug) : undefined;

  if (!entry) {
    return (
      <AnimatedSection direction="top">
        <Link to="/devlog" className="back-link">
          &larr; back to devlog
        </Link>
        <h2 className="section-heading">version not found</h2>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection direction="top">
      <Link to="/devlog" className="back-link">
        &larr; back to devlog
      </Link>
      <h2 className="section-heading">v{entry.frontmatter.version}</h2>
      <p style={{ opacity: 0.7 }}>
        {entry.frontmatter.date}
        {entry.frontmatter.previousVersion ? ` · since v${entry.frontmatter.previousVersion}` : ''}
      </p>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.body}</ReactMarkdown>
      </div>
    </AnimatedSection>
  );
}
