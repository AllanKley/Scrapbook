import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { PageHeading } from '../components/shared/PageHeading';
import { createCharacter } from '../dungeonrift/characterStorage';
import { createInitialDraft, creatorReducer } from '../dungeonrift/creator/creatorReducer';
import { EquipmentStep, isEquipmentStepValid } from '../dungeonrift/creator/steps/EquipmentStep';
import { ConceptStep, isConceptStepValid } from '../dungeonrift/creator/steps/ConceptStep';
import { DomainStep, isDomainStepValid } from '../dungeonrift/creator/steps/DomainStep';
import { ExperienciasStep, isExperienciasStepValid } from '../dungeonrift/creator/steps/ExperienciasStep';
import { LinhagemStep, isLinhagemStepValid } from '../dungeonrift/creator/steps/LinhagemStep';
import { PatronoStep, isPatronoStepValid } from '../dungeonrift/creator/steps/PatronoStep';
import { ResourcesStep, isResourcesStepValid } from '../dungeonrift/creator/steps/ResourcesStep';
import { ReviewStep } from '../dungeonrift/creator/steps/ReviewStep';
import { TracosStep, isTracosStepValid } from '../dungeonrift/creator/steps/TracosStep';
import { VinculosStep, isVinculosStepValid } from '../dungeonrift/creator/steps/VinculosStep';

// Follows criacao-de-personagem.md's stated order exactly — no reordering hack needed here (the
// old Perícias system needed Conexões picked first to size its promotion budget; Vínculos has no
// such interaction with Experiências).
const STEPS = [
  { key: 'concept', label: 'conceito' },
  { key: 'tracos', label: 'traços' },
  { key: 'linhagem', label: 'linhagem' },
  { key: 'domain', label: 'domínio' },
  { key: 'patrono', label: 'patrono' },
  { key: 'vinculos', label: 'vínculos' },
  { key: 'experiencias', label: 'experiências' },
  { key: 'equipment', label: 'equipamentos' },
  { key: 'resources', label: 'recursos' },
  { key: 'review', label: 'revisão' },
] as const;

export function CharacterCreator() {
  const [draft, dispatch] = useReducer(creatorReducer, undefined, createInitialDraft);
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();

  const stepKey = STEPS[stepIndex].key;

  const validators: Record<string, () => boolean> = {
    concept: () => isConceptStepValid(draft),
    tracos: () => isTracosStepValid(draft),
    linhagem: () => isLinhagemStepValid(draft),
    domain: () => isDomainStepValid(draft),
    patrono: () => isPatronoStepValid(draft),
    vinculos: () => isVinculosStepValid(),
    experiencias: () => isExperienciasStepValid(draft),
    equipment: () => isEquipmentStepValid(),
    resources: () => isResourcesStepValid(),
    review: () => true,
  };

  const currentStepValid = validators[stepKey]();

  function handleCreate() {
    const character = createCharacter({
      name: draft.name.trim() || 'Personagem sem nome',
      concept: draft.concept,
      rank: 'despertar',
      traits: draft.traits,
      linhagemKey: draft.linhagemKey,
      domains: draft.domainKey ? [{ domainKey: draft.domainKey, rank: 'despertar' }] : [],
      vinculos: draft.vinculos,
      experiencias: draft.experiencias,
      patronos: draft.patronoName ? [{ name: draft.patronoName, tier: 'menor' }] : [],
      equipment: draft.equipment,
      resources: draft.resources,
      woundCount: 0,
      woundLog: [],
      conditions: [],
      ecos: { tenue: 0, manifesto: 0, ancestral: 0, primordial: 0 },
    });
    navigate(`/devlog/personagens/${character.id}`);
  }

  return (
    <AnimatedSection direction="top">
      <PageHeading backTo="/devlog/personagens" backLabel="back to personagens">
        criar personagem
      </PageHeading>

      <div className="dr-wizard-steps">
        {STEPS.map((step, i) => (
          <span key={step.key} className={i === stepIndex ? 'current' : i < stepIndex ? 'done' : ''}>
            {i + 1}. {step.label}
          </span>
        ))}
      </div>

      {stepKey === 'concept' && <ConceptStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'tracos' && <TracosStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'linhagem' && <LinhagemStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'domain' && <DomainStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'patrono' && <PatronoStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'vinculos' && <VinculosStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'experiencias' && <ExperienciasStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'equipment' && <EquipmentStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'resources' && <ResourcesStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'review' && <ReviewStep draft={draft} />}

      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <button type="button" className="dr-btn ghost" onClick={() => setStepIndex((i) => Math.max(0, i - 1))} disabled={stepIndex === 0}>
          voltar
        </button>
        {stepIndex < STEPS.length - 1 ? (
          <button
            type="button"
            className="dr-btn primary"
            onClick={() => setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))}
            disabled={!currentStepValid}
          >
            próximo
          </button>
        ) : (
          <button type="button" className="dr-btn primary" onClick={handleCreate}>
            criar personagem
          </button>
        )}
      </div>
    </AnimatedSection>
  );
}
