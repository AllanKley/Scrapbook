import { AnimatedSection } from '../components/shared/AnimatedSection';
import { Top10Card } from '../components/top10/Top10Card';
import { top10Lists } from '../content-loaders/loadTop10Lists';

export function Top10Index() {
  return (
    <AnimatedSection direction="top">
      <h2 className="section-heading">top 10s</h2>
      <p>rankings of things, defended with the confidence of someone who will never be asked to justify them.</p>
      <div className="card-grid">
        {top10Lists.map((list) => (
          <Top10Card key={list.slug} list={list} />
        ))}
      </div>
    </AnimatedSection>
  );
}
