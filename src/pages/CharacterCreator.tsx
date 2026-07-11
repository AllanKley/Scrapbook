import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { BackLink } from '../components/shared/BackLink';
import { createCharacter } from '../dungeonrift/characterStorage';
import { SKILLS } from '../dungeonrift/rules';
import { createInitialDraft, creatorReducer } from '../dungeonrift/creator/creatorReducer';
import { AttributesStep, isAttributesStepValid } from '../dungeonrift/creator/steps/AttributesStep';
import { ClassStep, isClassStepValid } from '../dungeonrift/creator/steps/ClassStep';
import { ConceptStep, isConceptStepValid } from '../dungeonrift/creator/steps/ConceptStep';
import { ConexoesStep, isConexoesStepValid } from '../dungeonrift/creator/steps/ConexoesStep';
import { DomainStep, isDomainStepValid } from '../dungeonrift/creator/steps/DomainStep';
import { EquipmentStep, isEquipmentStepValid } from '../dungeonrift/creator/steps/EquipmentStep';
import { PatronoStep, isPatronoStepValid } from '../dungeonrift/creator/steps/PatronoStep';
import { ResourcesStep, isResourcesStepValid } from '../dungeonrift/creator/steps/ResourcesStep';
import { ReviewStep } from '../dungeonrift/creator/steps/ReviewStep';
import { isSkillsStepValid, SkillsStep } from '../dungeonrift/creator/steps/SkillsStep';
import type { SkillKey, TrainingTier } from '../dungeonrift/types';

const STEPS = [
  { key: 'concept', label: 'conceito' },
  { key: 'attributes', label: 'atributos' },
  { key: 'class', label: 'classe' },
  { key: 'domain', label: 'domínio' },
  { key: 'conexoes', label: 'conexões' },
  { key: 'patrono', label: 'patrono' },
  { key: 'skills', label: 'perícias' },
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
    attributes: () => isAttributesStepValid(draft),
    class: () => isClassStepValid(draft),
    domain: () => isDomainStepValid(draft),
    conexoes: () => isConexoesStepValid(draft),
    patrono: () => isPatronoStepValid(draft),
    skills: () => isSkillsStepValid(draft),
    equipment: () => isEquipmentStepValid(),
    resources: () => isResourcesStepValid(),
    review: () => true,
  };

  const currentStepValid = validators[stepKey]();

  function handleCreate() {
    const skills = Object.fromEntries(
      SKILLS.map((s) => [s.key, draft.promotedSkills.includes(s.key) ? 'intermediario' : 'iniciante'] as [SkillKey, TrainingTier]),
    ) as Record<SkillKey, TrainingTier>;

    const character = createCharacter({
      name: draft.name.trim() || 'Personagem sem nome',
      concept: draft.concept,
      attributes: draft.attributes,
      skills,
      classKey: draft.classKey,
      domainKey: draft.domainKey,
      patronos: draft.patronoName ? [{ name: draft.patronoName, tier: 'menor' }] : [],
      conexoesTier: draft.conexoesTier,
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
      <BackLink to="/devlog/personagens" label="back to personagens" />
      <h2 className="section-heading">criar personagem</h2>

      <div className="dr-wizard-steps">
        {STEPS.map((step, i) => (
          <span key={step.key} className={i === stepIndex ? 'current' : i < stepIndex ? 'done' : ''}>
            {i + 1}. {step.label}
          </span>
        ))}
      </div>

      {stepKey === 'concept' && <ConceptStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'attributes' && <AttributesStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'class' && <ClassStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'domain' && <DomainStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'conexoes' && <ConexoesStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'patrono' && <PatronoStep draft={draft} dispatch={dispatch} />}
      {stepKey === 'skills' && <SkillsStep draft={draft} dispatch={dispatch} />}
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
