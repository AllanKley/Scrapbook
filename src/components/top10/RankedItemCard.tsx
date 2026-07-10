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
      <div className="ranked-item-body">
        <p className="title">{title}</p>
        {item.note && <p className="note">{item.note}</p>}
        {item.tags && item.tags.length > 0 && (
          <ul className="tag-list">
            {item.tags.map((tag) => (
              <li key={tag} className="tag-chip">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
      {item.image && <img className="ranked-item-image" src={item.image} alt="" />}
    </li>
  );
}
