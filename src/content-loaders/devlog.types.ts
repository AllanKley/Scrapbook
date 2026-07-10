export interface DevlogEntryFrontmatter {
  title: string;
  date: string;
  section?: string;
  version?: string;
  tags?: string[];
  summary?: string;
  sourceNote?: string;
}

export interface DevlogEntry {
  slug: string;
  frontmatter: DevlogEntryFrontmatter;
  body: string;
}

export interface ChangelogFrontmatter {
  version: string;
  date: string;
  previousVersion?: string;
}

export interface ChangelogEntry {
  slug: string;
  frontmatter: ChangelogFrontmatter;
  body: string;
}
