import type { Top10List } from './top10.types';

const modules = import.meta.glob<{ default: Top10List }>('../../content/top10/*.json', {
  eager: true,
});

export const top10Lists: Top10List[] = Object.values(modules)
  .map((mod) => mod.default)
  .sort((a, b) => a.title.localeCompare(b.title));

export function getTop10ListBySlug(slug: string): Top10List | undefined {
  return top10Lists.find((list) => list.slug === slug);
}
