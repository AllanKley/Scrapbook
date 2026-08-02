import { padraoDeVidaAt, RANKS, rankIndex } from '../rules';
import type { Character } from '../types';

interface RankPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

export function RankPanel({ character, onChange }: RankPanelProps) {
  const currentIndex = rankIndex(character.rank);
  const current = RANKS[currentIndex];

  return (
    <div className="dr-panel">
      <h3>rank</h3>
      <div className="dr-attribute-row">
        <span className="dr-label">rank atual</span>
        <div className="dr-stepper">
          <button
            type="button"
            onClick={() => onChange({ rank: RANKS[Math.max(0, currentIndex - 1)].key })}
            disabled={currentIndex <= 0}
          >
            −
          </button>
          <span className="dr-value">{current.label}</span>
          <button
            type="button"
            onClick={() => onChange({ rank: RANKS[Math.min(RANKS.length - 1, currentIndex + 1)].key })}
            disabled={currentIndex >= RANKS.length - 1}
          >
            +
          </button>
        </div>
      </div>
      <p style={{ opacity: 0.8, margin: '8px 0 0' }}>
        concede: {current.grants} · Padrão de Vida: <strong>{padraoDeVidaAt(character.rank)}</strong>
      </p>
    </div>
  );
}
