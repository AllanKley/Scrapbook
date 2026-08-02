import { padraoDeVidaAt, RANKS, rankIndex } from '../rules';
import type { Character, RankKey } from '../types';

interface RankPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

export function RankPanel({ character, onChange }: RankPanelProps) {
  const currentIndex = rankIndex(character.rank);

  return (
    <div className="dr-panel">
      <h3>rank</h3>
      <p style={{ opacity: 0.75 }}>
        Despertar → F- → F → E- → E → D- → D → C- → C → B- → B → A- → A → S- → S → SS- → SS. clique em um estágio
        para mudar. Padrão de Vida atual: <strong>{padraoDeVidaAt(character.rank)}</strong>.
      </p>
      <div className="dr-rank-track">
        {RANKS.map((rank, index) => (
          <div key={rank.key} className="dr-rank-node-wrapper">
            <button
              type="button"
              className={`dr-rank-node ${index < currentIndex ? 'done' : ''} ${index === currentIndex ? 'current' : ''}`}
              onClick={() => onChange({ rank: rank.key as RankKey })}
              title={rank.grants}
            >
              <span className="dr-rank-node-circle">{index + 1}</span>
              <span className="dr-rank-node-label">{rank.label}</span>
            </button>
            {index < RANKS.length - 1 && <div className={`dr-rank-connector ${index < currentIndex ? 'done' : ''}`} />}
          </div>
        ))}
      </div>
      <p style={{ opacity: 0.8 }}>{RANKS[currentIndex]?.grants}</p>
    </div>
  );
}
