import { Link } from 'react-router-dom';
import type { DevlogEntry } from '../../content-loaders/devlog.types';

export function DevlogEntryCard({ entry }: { entry: DevlogEntry }) {
  return (
    <Link to={`/devlog/entry/${entry.slug}`} className="card">
      <h3>{entry.frontmatter.title}</h3>
      <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
        {entry.frontmatter.date}
        {entry.frontmatter.version ? ` · v${entry.frontmatter.version}` : ''}
      </p>
      {entry.frontmatter.summary && <p>{entry.frontmatter.summary}</p>}
    </Link>
  );
}
