import { Link } from 'react-router-dom';
import type { ChangelogEntry } from '../../content-loaders/devlog.types';

export function ChangelogEntryCard({ entry }: { entry: ChangelogEntry }) {
  return (
    <Link to={`/devlog/changelog/${entry.slug}`} className="card">
      <h3>v{entry.frontmatter.version}</h3>
      <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{entry.frontmatter.date}</p>
    </Link>
  );
}
