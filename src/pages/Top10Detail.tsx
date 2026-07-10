import { Link, useParams } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { RankedItemCard } from '../components/top10/RankedItemCard';
import { getTop10ListBySlug } from '../content-loaders/loadTop10Lists';

export function Top10Detail() {
  const { slug } = useParams<{ slug: string }>();
  const list = slug ? getTop10ListBySlug(slug) : undefined;

  if (!list) {
    return (
      <AnimatedSection direction="top">
        <Link to="/top10" className="back-link">
          &larr; back to top 10s
        </Link>
        <h2 className="section-heading">list not found</h2>
        <p>this one doesn't exist (yet?).</p>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection direction="top">
      <Link to="/top10" className="back-link">
        &larr; back to top 10s
      </Link>
      <h2 className="section-heading">{list.title}</h2>
      {list.description && <p>{list.description}</p>}
      <ol className="ranked-list">
        {list.items
          .slice()
          .sort((a, b) => a.rank - b.rank)
          .map((item) => (
            <RankedItemCard key={item.rank} item={item} />
          ))}
      </ol>
    </AnimatedSection>
  );
}
