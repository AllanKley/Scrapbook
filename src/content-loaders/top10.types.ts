export interface Top10Item {
  rank: number;
  title: string;
  note?: string;
  image?: string | null;
  link?: string | null;
}

export interface Top10List {
  slug: string;
  title: string;
  description?: string;
  updatedAt: string;
  items: Top10Item[];
}
