import { useState, type ChangeEvent } from 'react';
import type { Top10Item } from '../../content-loaders/top10.types';
import { adminApi } from '../adminApi';

interface ItemEditorFormProps {
  item: Top10Item;
  index: number;
  total: number;
  onChange: (item: Top10Item) => void;
  onMove: (direction: -1 | 1) => void;
  onDelete: () => void;
}

export function ItemEditorForm({ item, index, total, onChange, onMove, onDelete }: ItemEditorFormProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const path = await adminApi.uploadTop10Image(file);
      onChange({ ...item, image: path });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : String(err));
    } finally {
      setUploading(false);
    }
  }

  function handleTagsChange(value: string) {
    const tags = value
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    onChange({ ...item, tags: tags.length > 0 ? tags : undefined });
  }

  return (
    <div className="admin-item-row">
      <div className="admin-item-row-main">
        <span style={{ fontWeight: 700, width: '24px' }}>{item.rank}</span>
        <div className="admin-field">
          <input
            type="text"
            placeholder="title"
            value={item.title}
            onChange={(e) => onChange({ ...item, title: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <input
            type="text"
            placeholder="note"
            value={item.note ?? ''}
            onChange={(e) => onChange({ ...item, note: e.target.value })}
          />
        </div>
        <div className="admin-field">
          <input
            type="url"
            placeholder="link (optional)"
            value={item.link ?? ''}
            onChange={(e) => onChange({ ...item, link: e.target.value || null })}
          />
        </div>
        <button type="button" className="admin-btn ghost" disabled={index === 0} onClick={() => onMove(-1)}>
          ↑
        </button>
        <button
          type="button"
          className="admin-btn ghost"
          disabled={index === total - 1}
          onClick={() => onMove(1)}
        >
          ↓
        </button>
        <button type="button" className="admin-btn danger" onClick={onDelete}>
          delete
        </button>
      </div>

      <div className="admin-item-row-extra">
        <div className="admin-field">
          <label>tags (optional, comma separated — e.g. author name)</label>
          <input type="text" value={(item.tags ?? []).join(', ')} onChange={(e) => handleTagsChange(e.target.value)} />
        </div>
        <div className="admin-field">
          <label>illustrative image (optional)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {item.image && <img src={item.image} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />}
            <input type="file" accept="image/*" onChange={handleImageChange} disabled={uploading} />
            {uploading && <span className="status-text">uploading…</span>}
            {item.image && (
              <button type="button" className="admin-btn ghost" onClick={() => onChange({ ...item, image: null })}>
                remove
              </button>
            )}
          </div>
          {uploadError && <span className="status-text">{uploadError}</span>}
        </div>
      </div>
    </div>
  );
}
