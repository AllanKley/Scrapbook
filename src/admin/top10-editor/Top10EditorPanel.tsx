import { useEffect, useState } from 'react';
import type { Top10List } from '../../content-loaders/top10.types';
import { adminApi } from '../adminApi';
import { Top10ListEditor } from './Top10ListEditor';

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function Top10EditorPanel() {
  const [lists, setLists] = useState<Top10List[] | null>(null);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [statusBySlug, setStatusBySlug] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [newListTitle, setNewListTitle] = useState('');

  useEffect(() => {
    adminApi
      .getTop10Lists()
      .then(setLists)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  function updateList(slug: string, updated: Top10List) {
    setLists((prev) => prev?.map((l) => (l.slug === slug ? updated : l)) ?? prev);
  }

  async function saveList(list: Top10List) {
    setSavingSlug(list.slug);
    try {
      const toSave = { ...list, updatedAt: new Date().toISOString().slice(0, 10) };
      await adminApi.saveTop10List(toSave);
      updateList(list.slug, toSave);
      setStatusBySlug((s) => ({ ...s, [list.slug]: 'saved' }));
    } catch (err) {
      setStatusBySlug((s) => ({
        ...s,
        [list.slug]: `failed: ${err instanceof Error ? err.message : String(err)}`,
      }));
    } finally {
      setSavingSlug(null);
    }
  }

  async function deleteList(slug: string) {
    if (!confirm(`delete "${slug}" for good?`)) return;
    await adminApi.deleteTop10List(slug);
    setLists((prev) => prev?.filter((l) => l.slug !== slug) ?? prev);
  }

  function addList() {
    const title = newListTitle.trim();
    if (!title) return;
    const slug = slugify(title);
    if (lists?.some((l) => l.slug === slug)) {
      setError(`a list with slug "${slug}" already exists`);
      return;
    }
    const newList: Top10List = {
      slug,
      title,
      description: '',
      updatedAt: new Date().toISOString().slice(0, 10),
      items: [],
    };
    setLists((prev) => [...(prev ?? []), newList]);
    setNewListTitle('');
  }

  if (error && !lists) {
    return (
      <div className="admin-section">
        <p>couldn't load top 10 lists: {error}</p>
      </div>
    );
  }

  if (!lists) {
    return (
      <div className="admin-section">
        <p>loading…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-section">
        <h2>new list</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="e.g. Top 10 Board Games"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <button type="button" className="admin-btn primary" onClick={addList}>
            + add list
          </button>
        </div>
        {error && <p className="status-text">{error}</p>}
      </div>

      {lists.map((list) => (
        <Top10ListEditor
          key={list.slug}
          list={list}
          onChange={(updated) => updateList(list.slug, updated)}
          onSave={() => saveList(list)}
          onDelete={() => deleteList(list.slug)}
          saving={savingSlug === list.slug}
          status={statusBySlug[list.slug] ?? null}
        />
      ))}
    </div>
  );
}
