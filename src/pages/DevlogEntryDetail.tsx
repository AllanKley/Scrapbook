import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { getDevlogEntryBySlug } from '../content-loaders/loadDevlogEntries';

export function DevlogEntryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? getDevlogEntryBySlug(slug) : undefined;

  if (!entry) {
    return (
      <AnimatedSection direction="top">
        <Link to="/devlog" className="back-link">
          &larr; back to devlog
        </Link>
        <h2 className="section-heading">entry not found</h2>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection direction="top">
      <Link to="/devlog" className="back-link">
        &larr; back to devlog
      </Link>
      <h2 className="section-heading">{entry.frontmatter.title}</h2>
      <p style={{ opacity: 0.7 }}>
        {entry.frontmatter.date}
        {entry.frontmatter.version ? ` · v${entry.frontmatter.version}` : ''}
        {entry.frontmatter.tags?.length ? ` · ${entry.frontmatter.tags.join(', ')}` : ''}
      </p>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.body}</ReactMarkdown>
      </div>
    </AnimatedSection>
  );
}
