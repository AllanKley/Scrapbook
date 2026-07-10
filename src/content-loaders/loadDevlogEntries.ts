import matter from 'gray-matter';
import type {
  ChangelogEntry,
  ChangelogFrontmatter,
  DevlogEntry,
  DevlogEntryFrontmatter,
} from './devlog.types';

function slugFromPath(filePath: string): string {
  const fileName = filePath.split('/').pop() ?? filePath;
  return fileName.replace(/\.md$/, '');
}

// js-yaml (via gray-matter) auto-parses bare YYYY-MM-DD frontmatter scalars
// into JS Date objects, which breaks string sorting/rendering downstream.
function normalizeFrontmatterDate<T extends { date: unknown }>(data: T): T & { date: string } {
  const date = data.date;
  return {
    ...data,
    date: date instanceof Date ? date.toISOString().slice(0, 10) : (date as string),
  };
}

const entryModules = import.meta.glob<string>('../../content/devlog/entries/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const changelogModules = import.meta.glob<string>('../../content/devlog/changelog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const devlogEntries: DevlogEntry[] = Object.entries(entryModules)
  .map(([filePath, raw]) => {
    const { data, content } = matter(raw);
    return {
      slug: slugFromPath(filePath),
      frontmatter: normalizeFrontmatterDate(data as DevlogEntryFrontmatter),
      body: content,
    };
  })
  .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));

export const changelogEntries: ChangelogEntry[] = Object.entries(changelogModules)
  .map(([filePath, raw]) => {
    const { data, content } = matter(raw);
    return {
      slug: slugFromPath(filePath),
      frontmatter: normalizeFrontmatterDate(data as ChangelogFrontmatter),
      body: content,
    };
  })
  .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));

export function getDevlogEntryBySlug(slug: string): DevlogEntry | undefined {
  return devlogEntries.find((e) => e.slug === slug);
}

export function getChangelogEntryBySlug(slug: string): ChangelogEntry | undefined {
  return changelogEntries.find((e) => e.slug === slug);
}
