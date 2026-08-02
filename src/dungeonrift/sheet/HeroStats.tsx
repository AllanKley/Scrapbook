import { SUBESPACO_CAPACITY_PER_ESSENCIA, traitGrau } from '../rules';
import type { Character } from '../types';

interface HeroStatsProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

/**
 * The numbers checked constantly at the table. PV/PA current are play state; PV max and RD are
 * manual because the rules still express them as qualitative tiers. Deslocamento and Subespaço
 * are derived (Domínio and Essência respectively) and therefore read-only.
 */
export function HeroStats({ character, onChange }: HeroStatsProps) {
  const { pv, pa, rd, deslocamento } = character.resources;
  const down = pv.current <= 0;
  const subespaco = traitGrau(character.traits.essencia) * SUBESPACO_CAPACITY_PER_ESSENCIA;

  function patchResources(next: Partial<Character['resources']>) {
    onChange({ resources: { ...character.resources, ...next } });
  }

  return (
    <div className="dr-hero-stats">
      <div className={`dr-hero-stat pv ${down ? 'danger' : ''}`}>
        <span className="dr-hero-stat-label">PV</span>
        <div className="dr-hero-pv-controls">
          <button type="button" onClick={() => patchResources({ pv: { ...pv, current: pv.current - 1 } })} aria-label="reduzir PV">
            −
          </button>
          <span className="dr-hero-stat-value">{pv.current}</span>
          <button
            type="button"
            onClick={() => patchResources({ pv: { ...pv, current: Math.min(pv.max, pv.current + 1) } })}
            aria-label="aumentar PV"
          >
            +
          </button>
        </div>
        <label className="dr-hero-stat-sub">
          máx
          <input
            type="number"
            min={1}
            value={pv.max}
            onChange={(e) => patchResources({ pv: { ...pv, max: Number(e.target.value) } })}
          />
        </label>
      </div>

      <div className="dr-hero-stat">
        <span className="dr-hero-stat-label">PA</span>
        <div className="dr-hero-pv-controls">
          <button
            type="button"
            onClick={() => patchResources({ pa: { ...pa, current: Math.max(0, pa.current - 1) } })}
            aria-label="reduzir PA"
          >
            −
          </button>
          <span className="dr-hero-stat-value">{pa.current}</span>
          <button
            type="button"
            onClick={() => patchResources({ pa: { ...pa, current: Math.min(pa.max, pa.current + 1) } })}
            aria-label="aumentar PA"
          >
            +
          </button>
        </div>
        <span className="dr-hero-stat-sub">de {pa.max}</span>
      </div>

      <div className="dr-hero-stat">
        <span className="dr-hero-stat-label">RD</span>
        <input
          className="dr-hero-stat-input"
          type="number"
          min={0}
          value={rd}
          onChange={(e) => patchResources({ rd: Number(e.target.value) })}
          aria-label="redução de dano"
        />
      </div>

      <div className="dr-hero-stat">
        <span className="dr-hero-stat-label">Deslocamento</span>
        <span className="dr-hero-stat-value">{deslocamento}</span>
        <span className="dr-hero-stat-sub">do domínio</span>
      </div>

      <div className={`dr-hero-stat ${character.woundCount > 0 ? 'danger' : ''}`}>
        <span className="dr-hero-stat-label">Ferimentos</span>
        <span className="dr-hero-stat-value">{character.woundCount}</span>
      </div>

      <div className="dr-hero-stat">
        <span className="dr-hero-stat-label">Subespaço</span>
        <span className="dr-hero-stat-value">{subespaco}</span>
        <span className="dr-hero-stat-sub">Grau Essência × {SUBESPACO_CAPACITY_PER_ESSENCIA}</span>
      </div>
    </div>
  );
}
