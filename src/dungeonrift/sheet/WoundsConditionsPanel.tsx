import { useState } from 'react';
import { CONDITIONS } from '../rules';
import type { ActiveCondition, Character, ConditionKey } from '../types';
import { WoundRollDialog } from '../wounds/WoundRollDialog';

interface WoundsConditionsPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

export function WoundsConditionsPanel({ character, onChange }: WoundsConditionsPanelProps) {
  const [rollDialogOpen, setRollDialogOpen] = useState(false);

  function updateCondition(index: number, patch: Partial<ActiveCondition>) {
    const next = character.conditions.slice();
    next[index] = { ...next[index], ...patch };
    onChange({ conditions: next });
  }

  function addCondition() {
    onChange({ conditions: [...character.conditions, { key: CONDITIONS[0].key, stacks: 1 }] });
  }

  function removeCondition(index: number) {
    onChange({ conditions: character.conditions.filter((_, i) => i !== index) });
  }

  return (
    <div className="dr-panel">
      <h3>ferimentos &amp; condições</h3>

      <div className="dr-attribute-row">
        <span className="dr-label">total de ferimentos</span>
        <div className="dr-stepper">
          <button
            type="button"
            onClick={() => onChange({ woundCount: Math.max(0, character.woundCount - 1) })}
            disabled={character.woundCount <= 0}
          >
            −
          </button>
          <span className="dr-value">{character.woundCount}</span>
          <button type="button" onClick={() => onChange({ woundCount: character.woundCount + 1 })}>
            +
          </button>
        </div>
        <button
          type="button"
          className={`dr-btn ${character.resources.pv.current <= 0 ? 'primary' : 'ghost'}`}
          onClick={() => setRollDialogOpen(true)}
        >
          rolar ferimento
        </button>
      </div>

      {character.woundLog.length > 0 && (
        <details style={{ marginTop: '8px' }}>
          <summary>histórico de rolagens ({character.woundLog.length})</summary>
          <ul>
            {character.woundLog
              .slice()
              .reverse()
              .map((entry) => (
                <li key={entry.id}>
                  {new Date(entry.timestamp).toLocaleString()}: rolou {entry.roll} → {entry.outcome}
                </li>
              ))}
          </ul>
        </details>
      )}

      {rollDialogOpen && (
        <WoundRollDialog
          character={character}
          onChange={onChange}
          onClose={() => setRollDialogOpen(false)}
        />
      )}

      <h4 style={{ marginTop: '20px' }}>condições ativas</h4>
      {character.conditions.map((condition, index) => (
        <div key={index} className="dr-equipment-row">
          <select value={condition.key} onChange={(e) => updateCondition(index, { key: e.target.value as ConditionKey })}>
            {CONDITIONS.map((c) => (
              <option key={c.key} value={c.key} title={c.description}>
                {c.label}
              </option>
            ))}
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            estágios
            <input
              type="number"
              min={1}
              value={condition.stacks}
              onChange={(e) => updateCondition(index, { stacks: Number(e.target.value) })}
              style={{ width: '60px' }}
            />
          </label>
          <button type="button" className="dr-btn danger" onClick={() => removeCondition(index)}>
            remover
          </button>
        </div>
      ))}
      <button type="button" className="dr-btn ghost" onClick={addCondition} style={{ marginTop: '8px' }}>
        + adicionar condição
      </button>
    </div>
  );
}
