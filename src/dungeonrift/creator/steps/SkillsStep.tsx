import type { Dispatch } from 'react';
import { ATTRIBUTES, BASE_SKILL_PROMOTIONS_AT_CREATION, CONEXOES, SKILLS } from '../../rules';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

export function skillBudgetFor(draft: CreatorDraft): number {
  const bonus = CONEXOES.find((c) => c.tier === draft.conexoesTier)?.bonusSkillPromotions ?? 0;
  return BASE_SKILL_PROMOTIONS_AT_CREATION + bonus;
}

export function SkillsStep({ draft, dispatch }: StepProps) {
  const budget = skillBudgetFor(draft);
  const used = draft.promotedSkills.length;

  return (
    <div className="dr-panel">
      <h3>perícias</h3>
      <p>promova perícias de iniciante para intermediário. orçamento: {budget} (5 base + bônus de conexões).</p>
      <div className={`dr-budget-banner ${used > budget ? 'over' : ''}`}>
        {used} / {budget} promovidas
      </div>
      {ATTRIBUTES.map((attr) => (
        <div key={attr.key} style={{ marginBottom: '12px' }}>
          <p style={{ fontWeight: 700, margin: '0 0 4px' }}>{attr.label}</p>
          {SKILLS.filter((s) => s.attribute === attr.key).map((skill) => {
            const checked = draft.promotedSkills.includes(skill.key);
            return (
              <label key={skill.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={!checked && used >= budget}
                  onChange={() => dispatch({ type: 'TOGGLE_SKILL_PROMOTION', key: skill.key })}
                />
                {skill.label}
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function isSkillsStepValid(draft: CreatorDraft): boolean {
  return draft.promotedSkills.length === skillBudgetFor(draft);
}
