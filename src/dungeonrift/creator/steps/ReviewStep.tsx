import { DOMAINS, LINHAGENS, TRAITS } from '../../rules';
import type { CreatorDraft } from '../creatorReducer';

interface ReviewStepProps {
  draft: CreatorDraft;
}

export function ReviewStep({ draft }: ReviewStepProps) {
  const linhagemLabel = LINHAGENS.find((l) => l.key === draft.linhagemKey)?.label ?? '—';
  const domainLabel = DOMAINS.find((d) => d.key === draft.domainKey)?.label ?? '—';

  return (
    <div className="dr-panel">
      <h3>revisão</h3>
      <p>
        <strong>{draft.name || '(sem nome)'}</strong> — {linhagemLabel} / {domainLabel}
      </p>
      {draft.concept && <p style={{ opacity: 0.8 }}>{draft.concept}</p>}

      <h4>traços</h4>
      <p>{TRAITS.map((t) => `${t.label} d${draft.traits[t.key]}`).join(' · ')}</p>

      <h4>vínculos ({draft.vinculos.length})</h4>
      <p>{draft.vinculos.map((v) => v.nome || '(sem nome)').join(', ') || '—'}</p>

      <h4>experiências</h4>
      <p>{draft.experiencias.map((e) => e.texto || '(vazia)').join(' · ')}</p>

      <h4>patrono</h4>
      <p>{draft.patronoName || '—'}</p>

      <h4>equipamentos</h4>
      <p>{draft.equipment.map((i) => i.name || '(sem nome)').join(', ') || '—'}</p>

      <h4>recursos</h4>
      <p>
        PV {draft.resources.pv.max} · PA {draft.resources.pa.max} · RD {draft.resources.rd} · Deslocamento{' '}
        {draft.resources.deslocamento}
      </p>
    </div>
  );
}
