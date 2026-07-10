import type { Top10Item } from '../../content-loaders/top10.types';

export function RankedItemCard({ item }: { item: Top10Item }) {
  const title = item.link ? (
    <a href={item.link} target="_blank" rel="noreferrer">
      {item.title}
    </a>
  ) : (
    item.title
  );

  return (
    <li className="ranked-item">
      <span className="rank">{item.rank}</span>
      <div>
        <p className="title">{title}</p>
        {item.note && <p className="note">{item.note}</p>}
      </div>
    </li>
  );
}
