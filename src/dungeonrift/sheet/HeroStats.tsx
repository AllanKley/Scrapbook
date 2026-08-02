import type { Character } from '../types';

interface HeroStatsProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

export function HeroStats({ character, onChange }: HeroStatsProps) {
  const { pv, pa, rd, deslocamento } = character.resources;
  const down = pv.current <= 0;

  function setPv(current: number) {
    onChange({ resources: { ...character.resources, pv: { ...pv, current } } });
  }

  return (
    <div className="dr-hero-stats">
      <div className={`dr-hero-stat pv ${down ? 'danger' : ''}`}>
        <span className="dr-hero-stat-label">PV</span>
        <div className="dr-hero-pv-controls">
          <button type="button" onClick={() => setPv(pv.current - 1)} aria-label="reduzir PV">
            −
          </button>
          <span className="dr-hero-stat-value">
            {pv.current}
            <span className="dr-hero-stat-max">/{pv.max}</span>
          </span>
          <button type="button" onClick={() => setPv(Math.min(pv.max, pv.current + 1))} aria-label="aumentar PV">
            +
          </button>
        </div>
      </div>

      <div className="dr-hero-stat">
        <span className="dr-hero-stat-label">PA</span>
        <span className="dr-hero-stat-value">
          {pa.current}
          <span className="dr-hero-stat-max">/{pa.max}</span>
        </span>
      </div>

      <div className="dr-hero-stat">
        <span className="dr-hero-stat-label">RD</span>
        <span className="dr-hero-stat-value">{rd}</span>
      </div>

      <div className="dr-hero-stat">
        <span className="dr-hero-stat-label">Deslocamento</span>
        <span className="dr-hero-stat-value">{deslocamento}</span>
      </div>

      <div className={`dr-hero-stat ${character.woundCount > 0 ? 'danger' : ''}`}>
        <span className="dr-hero-stat-label">Ferimentos</span>
        <span className="dr-hero-stat-value">{character.woundCount}</span>
      </div>
    </div>
  );
}
