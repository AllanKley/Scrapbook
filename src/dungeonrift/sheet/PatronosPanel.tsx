import { PATRONOS_MAIOR, PATRONOS_MENOR, PATRONOS_SUPREMO } from '../rules';
import type { Character, PatronoGrant, PatronoTier } from '../types';

interface PatronosPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

const TIER_OPTIONS: { tier: PatronoTier; label: string; roster: { name: string }[] }[] = [
  { tier: 'menor', label: 'Menor', roster: PATRONOS_MENOR },
  { tier: 'maior', label: 'Maior', roster: PATRONOS_MAIOR },
  { tier: 'supremo', label: 'Supremo', roster: PATRONOS_SUPREMO },
];

export function PatronosPanel({ character, onChange }: PatronosPanelProps) {
  function updatePatrono(index: number, patch: Partial<PatronoGrant>) {
    const next = character.patronos.slice();
    next[index] = { ...next[index], ...patch };
    onChange({ patronos: next });
  }

  function addPatrono() {
    onChange({ patronos: [...character.patronos, { name: PATRONOS_MENOR[0]?.name ?? '', tier: 'menor' }] });
  }

  function removePatrono(index: number) {
    onChange({ patronos: character.patronos.filter((_, i) => i !== index) });
  }

  return (
    <div className="dr-panel">
      <h3>patronos</h3>
      <p style={{ opacity: 0.75 }}>
        um personagem recém-Despertado normalmente começa com 1 Patrono Menor. os rosters de Maior e Supremo
        ainda não existem nas regras — use texto livre se precisar.
      </p>
      {character.patronos.map((patrono, index) => {
        const roster = TIER_OPTIONS.find((t) => t.tier === patrono.tier)?.roster ?? [];
        return (
          <div key={index} className="dr-equipment-row">
            <select
              value={patrono.tier}
              onChange={(e) => updatePatrono(index, { tier: e.target.value as PatronoTier })}
            >
              {TIER_OPTIONS.map((t) => (
                <option key={t.tier} value={t.tier}>
                  {t.label}
                </option>
              ))}
            </select>
            {roster.length > 0 ? (
              <select value={patrono.name} onChange={(e) => updatePatrono(index, { name: e.target.value })}>
                {roster.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                placeholder="nome do patrono"
                value={patrono.name}
                onChange={(e) => updatePatrono(index, { name: e.target.value })}
              />
            )}
            <button type="button" className="dr-btn danger" onClick={() => removePatrono(index)}>
              remover
            </button>
          </div>
        );
      })}
      <button type="button" className="dr-btn ghost" onClick={addPatrono} style={{ marginTop: '8px' }}>
        + adicionar patrono
      </button>
    </div>
  );
}
