import { useState } from 'react';
import './admin.css';
import { Top10EditorPanel } from './top10-editor/Top10EditorPanel';
import { ThemeEditor } from './theme-editor/ThemeEditor';

type Tab = 'top10' | 'theme';

export function AdminApp() {
  const [tab, setTab] = useState<Tab>('top10');

  return (
    <div className="admin-shell">
      <span className="admin-banner">admin view — local only, never shipped to production</span>
      <div className="admin-tabs">
        <button type="button" className={tab === 'top10' ? 'active' : ''} onClick={() => setTab('top10')}>
          top 10 lists
        </button>
        <button type="button" className={tab === 'theme' ? 'active' : ''} onClick={() => setTab('theme')}>
          theme / palette
        </button>
      </div>

      {tab === 'top10' && <Top10EditorPanel />}
      {tab === 'theme' && <ThemeEditor />}
    </div>
  );
}
