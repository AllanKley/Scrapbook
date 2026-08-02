import { DOMAINS, PV_TIER_BY_GROUP, SUBESPACO_CAPACITY_PER_ESSENCIA, traitGrau } from '../../rules';
import type { CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
}

export function ResourcesStep({ draft }: StepProps) {
  const domain = DOMAINS.find((d) => d.key === draft.domainKey);
  const pvTier = domain ? PV_TIER_BY_GROUP[domain.group].initial : null;
  const subespaco = traitGrau(draft.traits.essencia) * SUBESPACO_CAPACITY_PER_ESSENCIA;

  return (
    <div className="dr-panel">
      <h3>recursos iniciais</h3>
      <p style={{ opacity: 0.75 }}>resumo — ajuste os valores exatos na ficha depois de criar o personagem.</p>

      <div className="dr-attribute-row">
        <span className="dr-label">PV (Pontos de Vida)</span>
        <span>{pvTier ? `${pvTier} (escolha um valor exato na ficha)` : 'escolha um Domínio primeiro'}</span>
      </div>
      <div className="dr-attribute-row">
        <span className="dr-label">PA (Pontos de Ação)</span>
        <span>4 (fixo, por regra)</span>
      </div>
      <div className="dr-attribute-row">
        <span className="dr-label">RD (Redução de Dano)</span>
        <span>ainda não definida pelas regras — ajuste na ficha</span>
      </div>
      <div className="dr-attribute-row">
        <span className="dr-label">Deslocamento</span>
        <span>{domain ? `${draft.resources.deslocamento} quadrados` : 'escolha um Domínio primeiro'}</span>
      </div>
      <div className="dr-attribute-row">
        <span className="dr-label">Subespaço</span>
        <span>{subespaco} espaços (Grau de Essência × {SUBESPACO_CAPACITY_PER_ESSENCIA})</span>
      </div>
    </div>
  );
}

export function isResourcesStepValid(): boolean {
  return true;
}
