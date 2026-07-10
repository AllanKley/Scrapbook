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

export interface DevlogSection {
  /** Raw folder path relative to the vault root ("" for root-level notes). */
  key: string;
  label: string;
  entries: DevlogEntry[];
}

// Groups entries by their synced Obsidian folder so adding a new vault
// folder and re-syncing automatically produces a new section here — nothing
// hardcoded. Root-level notes (no section) form the "Main" group, always first.
export const devlogSections: DevlogSection[] = (() => {
  const groups = new Map<string, DevlogEntry[]>();
  for (const entry of devlogEntries) {
    const key = entry.frontmatter.section ?? '';
    const group = groups.get(key);
    if (group) group.push(entry);
    else groups.set(key, [entry]);
  }
  const otherKeys = Array.from(groups.keys())
    .filter((k) => k !== '')
    .sort((a, b) => a.localeCompare(b));
  const orderedKeys = groups.has('') ? ['', ...otherKeys] : otherKeys;
  return orderedKeys.map((key) => ({
    key,
    label: key === '' ? 'Main' : key.replace(/\//g, ' / '),
    entries: groups.get(key) ?? [],
  }));
})();

export function getDevlogEntryBySlug(slug: string): DevlogEntry | undefined {
  return devlogEntries.find((e) => e.slug === slug);
}

export function getChangelogEntryBySlug(slug: string): ChangelogEntry | undefined {
  return changelogEntries.find((e) => e.slug === slug);
}
