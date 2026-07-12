import { ATTRIBUTES, SKILLS, TRAINING_TIER_DICE } from '../rules';
import type { Character, SkillKey, TrainingTier } from '../types';

interface SkillsPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

const TIERS: TrainingTier[] = ['iniciante', 'intermediario', 'avancado', 'elite'];

export function SkillsPanel({ character, onChange }: SkillsPanelProps) {
  function setSkill(key: SkillKey, tier: TrainingTier) {
    onChange({ skills: { ...character.skills, [key]: tier } });
  }

  return (
    <div className="dr-panel">
      <h3>perícias</h3>
      {ATTRIBUTES.map((attr) => (
        <div key={attr.key} style={{ marginBottom: '12px' }}>
          <p style={{ fontWeight: 700, margin: '0 0 4px', color: 'var(--color-primary)' }}>{attr.label}</p>
          {SKILLS.filter((s) => s.attribute === attr.key).map((skill) => (
            <div key={skill.key} className="dr-skill-row">
              <span className="dr-label">{skill.label}</span>
              <select value={character.skills[skill.key]} onChange={(e) => setSkill(skill.key, e.target.value as TrainingTier)}>
                {TIERS.map((tier) => (
                  <option key={tier} value={tier}>
                    {tier} ({TRAINING_TIER_DICE[tier]})
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
