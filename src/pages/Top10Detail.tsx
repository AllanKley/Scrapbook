import { useParams } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { PageHeading } from '../components/shared/PageHeading';
import { RankedItemCard } from '../components/top10/RankedItemCard';
import { getTop10ListBySlug } from '../content-loaders/loadTop10Lists';

export function Top10Detail() {
  const { slug } = useParams<{ slug: string }>();
  const list = slug ? getTop10ListBySlug(slug) : undefined;

  if (!list) {
    return (
      <AnimatedSection direction="top">
        <PageHeading backTo="/top10" backLabel="back to top 10s">
          list not found
        </PageHeading>
        <p>this one doesn't exist (yet?).</p>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection direction="top">
      <PageHeading backTo="/top10" backLabel="back to top 10s">
        {list.title}
      </PageHeading>
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
