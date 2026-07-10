import { useState } from 'react';
import { DevlogEntryCard } from './DevlogEntryCard';
import type { DevlogSection } from '../../content-loaders/loadDevlogEntries';

export function DevlogSectionGroup({ section }: { section: DevlogSection }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <button type="button" className="section-toggle" onClick={() => setExpanded((e) => !e)}>
        <span className="section-toggle-arrow">{expanded ? '▾' : '▸'}</span>
        <h3>{section.label}</h3>
        <span className="section-toggle-count">{section.entries.length}</span>
      </button>
      {expanded && (
        <div className="card-grid">
          {section.entries.map((entry) => (
            <DevlogEntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
