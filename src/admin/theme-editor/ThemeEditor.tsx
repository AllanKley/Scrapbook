import { useState } from 'react';
import { adminApi } from '../adminApi';
import { useTheme } from '../../theme/ThemeProvider';
import { ColorPickerField } from './ColorPickerField';
import { PalettePreview } from './PalettePreview';
import type { ThemeColors } from '../../theme/theme.types';

const COLOR_LABELS: Record<keyof ThemeColors, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  accent: 'Accent',
  highlight: 'Highlight',
  cardBackground: 'Card background',
};

export function ThemeEditor() {
  const { theme, setTheme } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function updateColor(role: keyof ThemeColors, value: string) {
    setTheme({ ...theme, colors: { ...theme.colors, [role]: value } });
    setStatus(null);
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    try {
      await adminApi.saveTheme(theme);
      setStatus('saved to content/theme.json');
    } catch (err) {
      setStatus(`failed to save: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-section">
      <h2>theme / palette</h2>
      <p>colors update live across the whole site as you pick them. hit save to write them to disk.</p>

      {(Object.keys(COLOR_LABELS) as (keyof ThemeColors)[]).map((role) => (
        <ColorPickerField
          key={role}
          label={COLOR_LABELS[role]}
          value={theme.colors[role]}
          onChange={(value) => updateColor(role, value)}
        />
      ))}

      <h3>preview</h3>
      <PalettePreview />

      <div style={{ marginTop: '16px' }}>
        <button type="button" className="admin-btn primary" onClick={handleSave} disabled={saving}>
          {saving ? 'saving…' : 'save palette'}
        </button>
        {status && <span className="status-text">{status}</span>}
      </div>
    </div>
  );
}
