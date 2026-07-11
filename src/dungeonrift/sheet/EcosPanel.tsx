import type { Character, EcoTier } from '../types';

interface EcosPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

const ECO_LABELS: Record<EcoTier, string> = {
  tenue: 'Tênue',
  manifesto: 'Manifesto',
  ancestral: 'Ancestral',
  primordial: 'Primordial',
};

export function EcosPanel({ character, onChange }: EcosPanelProps) {
  function setEco(tier: EcoTier, value: number) {
    onChange({ ecos: { ...character.ecos, [tier]: Math.max(0, value) } });
  }

  return (
    <div className="dr-panel">
      <h3>ecos</h3>
      {(Object.keys(ECO_LABELS) as EcoTier[]).map((tier) => (
        <div key={tier} className="dr-attribute-row">
          <span className="dr-label">{ECO_LABELS[tier]}</span>
          <input
            type="number"
            min={0}
            value={character.ecos[tier]}
            onChange={(e) => setEco(tier, Number(e.target.value))}
            style={{ width: '70px' }}
          />
        </div>
      ))}
    </div>
  );
}
