import type { Top10List } from '../content-loaders/top10.types';
import type { SiteTheme } from '../theme/theme.types';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

export const adminApi = {
  getTop10Lists: () => request<Top10List[]>('/__admin-api/top10'),
  saveTop10List: (list: Top10List) =>
    request<{ ok: true }>('/__admin-api/top10', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list),
    }),
  deleteTop10List: (slug: string) =>
    request<{ ok: true }>(`/__admin-api/top10?slug=${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    }),
  getTheme: () => request<SiteTheme>('/__admin-api/theme'),
  saveTheme: (theme: SiteTheme) =>
    request<{ ok: true }>('/__admin-api/theme', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(theme),
    }),
};
