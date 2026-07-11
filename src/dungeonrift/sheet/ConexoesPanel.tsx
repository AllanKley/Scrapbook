import { CONEXOES } from '../rules';
import type { Character, ConexoesTier } from '../types';

interface ConexoesPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

export function ConexoesPanel({ character, onChange }: ConexoesPanelProps) {
  return (
    <div className="dr-panel">
      <h3>conexões (guilda)</h3>
      <div className="dr-field">
        <label>tempo de guilda</label>
        <select
          value={character.conexoesTier ?? ''}
          onChange={(e) => onChange({ conexoesTier: (e.target.value || null) as ConexoesTier | null })}
        >
          <option value="">(nenhum)</option>
          {CONEXOES.map((c) => (
            <option key={c.tier} value={c.tier}>
              {c.label} ({c.yearsLabel}) — {c.bonusSkillPromotions} perícia(s) bônus
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
