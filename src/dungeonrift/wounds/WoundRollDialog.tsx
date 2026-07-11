import { useState } from 'react';
import { rollFerimento, WOUND_OUTCOME_DESCRIPTIONS, WOUND_OUTCOME_LABELS } from '../rules';
import type { Character, WoundRollLogEntry } from '../types';

interface WoundRollDialogProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
  onClose: () => void;
}

function generateId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `wound-${Date.now()}`;
}

export function WoundRollDialog({ character, onChange, onClose }: WoundRollDialogProps) {
  const [result, setResult] = useState<{ roll: number; outcome: ReturnType<typeof rollFerimento>['outcome'] } | null>(null);

  function roll() {
    setResult(rollFerimento(character.woundCount));
  }

  function confirm() {
    if (!result) return;
    const entry: WoundRollLogEntry = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      roll: result.roll,
      outcome: result.outcome,
    };
    onChange({ woundCount: character.woundCount + 1, woundLog: [...character.woundLog, entry] });
    onClose();
  }

  return (
    <div className="dr-panel" style={{ border: '2px solid var(--color-highlight)' }}>
      <h4 style={{ marginTop: 0 }}>rolar ferimento (personagem já tem {character.woundCount})</h4>
      {!result ? (
        <button type="button" className="dr-btn primary" onClick={roll}>
          rolar 1d20
        </button>
      ) : (
        <div>
          <p>
            rolou <strong>{result.roll}</strong> → <strong>{WOUND_OUTCOME_LABELS[result.outcome]}</strong>
          </p>
          <p style={{ opacity: 0.8 }}>{WOUND_OUTCOME_DESCRIPTIONS[result.outcome]}</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="button" className="dr-btn primary" onClick={confirm}>
              confirmar
            </button>
            <button type="button" className="dr-btn ghost" onClick={roll}>
              rerolar
            </button>
          </div>
        </div>
      )}
      <button type="button" className="dr-btn ghost" onClick={onClose} style={{ marginTop: '12px' }}>
        cancelar
      </button>
    </div>
  );
}
