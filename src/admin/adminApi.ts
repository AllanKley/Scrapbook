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

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the "data:<mime>;base64," prefix FileReader adds.
      resolve(result.slice(result.indexOf(',') + 1));
    };
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
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
  uploadTop10Image: (file: File) => uploadMedia('/__admin-api/top10-image', file),
};

async function uploadMedia(endpoint: string, file: File): Promise<string> {
  const dataBase64 = await fileToBase64(file);
  const { path } = await request<{ path: string }>(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: file.name, dataBase64 }),
  });
  return path;
}
