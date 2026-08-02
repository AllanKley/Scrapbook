import { DOMAINS, LINHAGENS, RANKS, rankIndex } from '../rules';
import type { Character } from '../types';

interface SheetHeaderProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
  onPrint: () => void;
  onExportJson: () => void;
  onDelete: () => void;
}

export function SheetHeader({ character, onChange, onPrint, onExportJson, onDelete }: SheetHeaderProps) {
  const linhagem = LINHAGENS.find((l) => l.key === character.linhagemKey)?.label;
  const domains = character.domains
    .map((track) => DOMAINS.find((d) => d.key === track.domainKey)?.label)
    .filter(Boolean)
    .join(' + ');
  const rank = RANKS[rankIndex(character.rank)]?.label;

  const subtitle = [linhagem ?? 'sem linhagem', domains || 'sem domínio', rank].filter(Boolean).join(' · ');

  return (
    <div className="dr-sheet-header">
      <div className="dr-sheet-identity">
        <input
          className="dr-sheet-name"
          type="text"
          value={character.name}
          onChange={(e) => onChange({ name: e.target.value })}
          aria-label="nome do personagem"
        />
        <p className="dr-sheet-subtitle">{subtitle}</p>
      </div>
      <div className="dr-sheet-actions">
        <button type="button" className="dr-btn ghost" onClick={onPrint}>
          exportar PDF
        </button>
        <button type="button" className="dr-btn ghost" onClick={onExportJson}>
          exportar JSON
        </button>
        <button type="button" className="dr-btn danger" onClick={onDelete}>
          excluir
        </button>
      </div>
    </div>
  );
}
