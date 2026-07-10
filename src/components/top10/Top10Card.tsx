import { Link } from 'react-router-dom';
import type { Top10List } from '../../content-loaders/top10.types';

export function Top10Card({ list }: { list: Top10List }) {
  return (
    <Link to={`/top10/${list.slug}`} className="card">
      <h3>{list.title}</h3>
      {list.description && <p>{list.description}</p>}
    </Link>
  );
}
