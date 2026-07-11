import { ATTRIBUTES, CLASSES, CONEXOES, DOMAINS, SKILLS } from '../../rules';
import type { CreatorDraft } from '../creatorReducer';

interface ReviewStepProps {
  draft: CreatorDraft;
}

export function ReviewStep({ draft }: ReviewStepProps) {
  const classLabel = CLASSES.find((c) => c.key === draft.classKey)?.label ?? '—';
  const domainLabel = DOMAINS.find((d) => d.key === draft.domainKey)?.label ?? '—';
  const conexoesLabel = CONEXOES.find((c) => c.tier === draft.conexoesTier)?.label ?? '—';
  const promotedLabels = draft.promotedSkills.map((key) => SKILLS.find((s) => s.key === key)?.label ?? key);

  return (
    <div className="dr-panel">
      <h3>revisão</h3>
      <p>
        <strong>{draft.name || '(sem nome)'}</strong> — {classLabel} / {domainLabel}
      </p>
      {draft.concept && <p style={{ opacity: 0.8 }}>{draft.concept}</p>}

      <h4>atributos</h4>
      <p>{ATTRIBUTES.map((a) => `${a.label} ${draft.attributes[a.key]}`).join(' · ')}</p>

      <h4>perícias promovidas ({promotedLabels.length})</h4>
      <p>{promotedLabels.join(', ') || '—'}</p>

      <h4>conexões</h4>
      <p>{conexoesLabel}</p>

      <h4>patrono</h4>
      <p>{draft.patronoName || '—'}</p>

      <h4>equipamentos</h4>
      <p>{draft.equipment.map((i) => i.name || '(sem nome)').join(', ') || '—'}</p>

      <h4>recursos</h4>
      <p>
        PV {draft.resources.pv.max} · PA {draft.resources.pa.max} · PE {draft.resources.pe.max}
      </p>
    </div>
  );
}
