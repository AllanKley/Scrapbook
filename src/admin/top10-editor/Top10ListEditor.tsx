import { useState } from 'react';
import type { Top10List } from '../../content-loaders/top10.types';
import { ItemEditorForm } from './ItemEditorForm';

interface Top10ListEditorProps {
  list: Top10List;
  onChange: (list: Top10List) => void;
  onSave: () => void;
  onDelete: () => void;
  saving: boolean;
  status: string | null;
}

function renumber(items: Top10List['items']): Top10List['items'] {
  return items.map((item, i) => ({ ...item, rank: i + 1 }));
}

export function Top10ListEditor({ list, onChange, onSave, onDelete, saving, status }: Top10ListEditorProps) {
  const [collapsed, setCollapsed] = useState(true);
  const items = list.items.slice().sort((a, b) => a.rank - b.rank);

  function updateItem(index: number, item: Top10List['items'][number]) {
    const next = items.slice();
    next[index] = item;
    onChange({ ...list, items: next });
  }

  function moveItem(index: number, direction: -1 | 1) {
    const next = items.slice();
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange({ ...list, items: renumber(next) });
  }

  function deleteItem(index: number) {
    const next = items.slice();
    next.splice(index, 1);
    onChange({ ...list, items: renumber(next) });
  }

  function addItem() {
    onChange({
      ...list,
      items: [...items, { rank: items.length + 1, title: '', note: '', image: null, link: null }],
    });
  }

  return (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 onClick={() => setCollapsed((c) => !c)} style={{ cursor: 'pointer' }}>
          {collapsed ? '▸' : '▾'} {list.title || list.slug}
        </h2>
        <button type="button" className="admin-btn danger" onClick={onDelete}>
          delete list
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="admin-field">
            <label>title</label>
            <input
              type="text"
              value={list.title}
              onChange={(e) => onChange({ ...list, title: e.target.value })}
            />
          </div>
          <div className="admin-field">
            <label>description</label>
            <textarea
              value={list.description ?? ''}
              onChange={(e) => onChange({ ...list, description: e.target.value })}
              rows={2}
            />
          </div>

          {items.map((item, i) => (
            <ItemEditorForm
              key={i}
              item={item}
              index={i}
              total={items.length}
              onChange={(updated) => updateItem(i, updated)}
              onMove={(dir) => moveItem(i, dir)}
              onDelete={() => deleteItem(i)}
            />
          ))}

          <button type="button" className="admin-btn ghost" onClick={addItem}>
            + add item
          </button>

          <div style={{ marginTop: '16px' }}>
            <button type="button" className="admin-btn primary" onClick={onSave} disabled={saving}>
              {saving ? 'saving…' : 'save list'}
            </button>
            {status && <span className="status-text">{status}</span>}
          </div>
        </>
      )}
    </div>
  );
}
