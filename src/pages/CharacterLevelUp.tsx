import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { PageHeading } from '../components/shared/PageHeading';
import { getCharacter, updateCharacter } from '../dungeonrift/characterStorage';
import {
  DIE_LADDER,
  DOMAINS,
  DOMAIN_GROUPS,
  DOMAIN_TRACK_RANKS,
  DOMAIN_TRACK_RANK_LABELS,
  LINHAGENS,
  MAX_EXPERIENCES,
  PATRONOS_MAIOR,
  PATRONOS_MENOR,
  PATRONOS_SUPREMO,
  RANKS,
  TRAITS,
  nextRank,
  rankIndex,
  traitGrau,
} from '../dungeonrift/rules';
import type { PatronoOption } from '../dungeonrift/rules/patronos';
import type { Character, DomainKey, PatronoTier, TraitDie, TraitKey } from '../dungeonrift/types';

function generateId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `id-${Date.now()}`;
}

function rosterFor(tier: PatronoTier): PatronoOption[] {
  if (tier === 'menor') return PATRONOS_MENOR;
  if (tier === 'maior') return PATRONOS_MAIOR;
  return PATRONOS_SUPREMO;
}

/** Choices collected across the wizard, applied to the character only on the final step. */
interface LevelUpChoices {
  patronoName: string;
  traitKey: TraitKey | null;
  /** Either improve an existing Experiência by +1, or add a new one at +1. */
  experienciaMode: 'improve' | 'add';
  experienciaId: string;
  experienciaTexto: string;
  /** Index into character.domains to advance, or 'new' to multiclass. */
  domainChoice: string;
  newDomainKey: DomainKey;
  pvMax: number;
  /** Vínculo swap is optional on every rank-up. */
  vinculoSwapId: string;
  vinculoNewName: string;
}

export function CharacterLevelUp() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | undefined>(() => (id ? getCharacter(id) : undefined));

  useEffect(() => {
    if (id) setCharacter(getCharacter(id));
  }, [id]);

  const target = character ? nextRank(character.rank) : undefined;

  const [choices, setChoices] = useState<LevelUpChoices>({
    patronoName: '',
    traitKey: null,
    experienciaMode: 'add',
    experienciaId: '',
    experienciaTexto: '',
    domainChoice: '0',
    newDomainKey: DOMAINS[0].key,
    pvMax: 0,
    vinculoSwapId: '',
    vinculoNewName: '',
  });
  const [stepIndex, setStepIndex] = useState(0);

  // Seed PV from the character once it loads.
  useEffect(() => {
    if (character) setChoices((c) => (c.pvMax === 0 ? { ...c, pvMax: character.resources.pv.max } : c));
  }, [character]);

  /** Only the steps this particular rank actually grants. */
  const steps = useMemo(() => {
    if (!target) return [];
    const list: { key: string; label: string }[] = [{ key: 'overview', label: 'visão geral' }];
    if (target.linhagemAbility) list.push({ key: 'linhagem', label: 'linhagem' });
    if (target.dominioAbility) list.push({ key: 'dominio', label: 'domínio' });
    if (target.patronoTier) list.push({ key: 'patrono', label: 'patrono' });
    if (target.grauDeTreinamento) list.push({ key: 'traco', label: 'traço' });
    if (target.experiencia) list.push({ key: 'experiencia', label: 'experiência' });
    if (target.pvIncrease) list.push({ key: 'pv', label: 'PV' });
    list.push({ key: 'vinculos', label: 'vínculos' });
    list.push({ key: 'review', label: 'confirmar' });
    return list;
  }, [target]);

  if (!character) {
    return (
      <AnimatedSection direction="top">
        <PageHeading backTo="/devlog/personagens" backLabel="back to personagens">
          personagem não encontrado
        </PageHeading>
      </AnimatedSection>
    );
  }

  if (!target) {
    return (
      <AnimatedSection direction="top">
        <PageHeading backTo={`/devlog/personagens/${character.id}`} backLabel="voltar para a ficha">
          rank máximo
        </PageHeading>
        <div className="dr-panel">
          <p>{character.name} já está no topo da escada de Ranks.</p>
        </div>
      </AnimatedSection>
    );
  }

  const stepKey = steps[stepIndex]?.key ?? 'overview';
  const linhagem = LINHAGENS.find((l) => l.key === character.linhagemKey);
  const takenPatronos = new Set(character.patronos.map((p) => p.name));
  const roster = target.patronoTier ? rosterFor(target.patronoTier).filter((p) => !takenPatronos.has(p.name)) : [];
  /** Domínios not already trained — you can't multiclass into a track you already have. */
  const availableDomains = DOMAINS.filter((d) => !character.domains.some((t) => t.domainKey === d.key));
  const selectedNewDomain = availableDomains.find((d) => d.key === choices.newDomainKey) ?? availableDomains[0];

  function set<K extends keyof LevelUpChoices>(key: K, value: LevelUpChoices[K]) {
    setChoices((c) => ({ ...c, [key]: value }));
  }

  /** Switching to multiclass must land on an actually-available Domínio, not the default first-in-list. */
  function chooseMulticlass() {
    setChoices((c) => ({
      ...c,
      domainChoice: 'new',
      newDomainKey: availableDomains.some((d) => d.key === c.newDomainKey)
        ? c.newDomainKey
        : (availableDomains[0]?.key ?? c.newDomainKey),
    }));
  }

  function stepValid(key: string): boolean {
    switch (key) {
      case 'patrono':
        return choices.patronoName.trim().length > 0;
      case 'traco':
        return choices.traitKey !== null;
      case 'experiencia':
        return choices.experienciaMode === 'add'
          ? choices.experienciaTexto.trim().length > 0
          : choices.experienciaId.length > 0;
      case 'pv':
        return choices.pvMax > 0;
      default:
        return true;
    }
  }

  const currentValid = stepValid(stepKey);

  /** Builds the patch that applies every choice at once, so a half-finished wizard changes nothing. */
  function apply() {
    if (!character || !target) return;
    const patch: Partial<Character> = { rank: target.key };

    if (target.patronoTier && choices.patronoName) {
      patch.patronos = [...character.patronos, { name: choices.patronoName, tier: target.patronoTier }];
    }

    if (target.grauDeTreinamento && choices.traitKey) {
      const currentDie = character.traits[choices.traitKey];
      const idx = DIE_LADDER.indexOf(currentDie);
      const raised = DIE_LADDER[Math.min(idx + 1, DIE_LADDER.length - 1)];
      patch.traits = { ...character.traits, [choices.traitKey]: raised };
    }

    if (target.experiencia) {
      if (choices.experienciaMode === 'add') {
        patch.experiencias = [
          ...character.experiencias,
          { id: generateId(), texto: choices.experienciaTexto.trim(), bonus: 1 },
        ];
      } else {
        patch.experiencias = character.experiencias.map((e) =>
          e.id === choices.experienciaId ? { ...e, bonus: e.bonus + 1 } : e,
        );
      }
    }

    if (target.dominioAbility) {
      if (choices.domainChoice === 'new' && selectedNewDomain) {
        patch.domains = [...character.domains, { domainKey: selectedNewDomain.key, rank: 'despertar' }];
      } else {
        const i = Number(choices.domainChoice);
        patch.domains = character.domains.map((track, ti) => {
          if (ti !== i) return track;
          const ri = DOMAIN_TRACK_RANKS.indexOf(track.rank);
          return { ...track, rank: DOMAIN_TRACK_RANKS[Math.min(ri + 1, DOMAIN_TRACK_RANKS.length - 1)] };
        });
      }
    }

    if (target.pvIncrease) {
      patch.resources = { ...character.resources, pv: { current: choices.pvMax, max: choices.pvMax } };
    }

    if (choices.vinculoSwapId && choices.vinculoNewName.trim()) {
      patch.vinculos = character.vinculos.map((v) =>
        v.id === choices.vinculoSwapId ? { ...v, nome: choices.vinculoNewName.trim(), emocoes: [] } : v,
      );
    }

    updateCharacter(character.id, patch);
    navigate(`/devlog/personagens/${character.id}`);
  }

  return (
    <AnimatedSection direction="top">
      <PageHeading backTo={`/devlog/personagens/${character.id}`} backLabel="voltar para a ficha">
        subir de rank
      </PageHeading>

      <div className="dr-creator-layout">
        <nav className="dr-step-nav" aria-label="etapas da subida de rank">
          {steps.map((step, i) => (
            <button
              key={step.key}
              type="button"
              className={`dr-step-nav-item ${i === stepIndex ? 'current' : ''} ${i < stepIndex ? 'done' : ''}`}
              onClick={() => setStepIndex(i)}
              disabled={i > stepIndex && !currentValid}
            >
              <span className="dr-step-nav-num">{i < stepIndex ? '✓' : i + 1}</span>
              <span className="dr-step-nav-label">{step.label}</span>
            </button>
          ))}
        </nav>

        <div className="dr-creator-content">
          {stepKey === 'overview' && (
            <div className="dr-panel">
              <h3>
                {RANKS[rankIndex(character.rank)].label} → {target.label}
              </h3>
              <p>ao concluir, {character.name} recebe:</p>
              <p className="dr-ability-preview">{target.grants}</p>
              <p style={{ opacity: 0.7 }}>
                nada é salvo até a última etapa — dá pra voltar atrás a qualquer momento.
              </p>
            </div>
          )}

          {stepKey === 'linhagem' && (
            <div className="dr-panel">
              <h3>habilidade de linhagem</h3>
              {linhagem ? (
                <>
                  <p>
                    {linhagem.label} desbloqueia automaticamente a próxima habilidade — Linhagem é fixa, não há
                    escolha aqui.
                  </p>
                  {(() => {
                    const unlockedSoFar = RANKS.slice(0, rankIndex(target.key) + 1).filter((r) => r.linhagemAbility).length;
                    const ability = linhagem.abilities[unlockedSoFar - 1];
                    return ability ? (
                      <p className="dr-ability-preview">
                        <strong>{ability.name}</strong> — {ability.summary}
                      </p>
                    ) : null;
                  })()}
                </>
              ) : (
                <p>este personagem não tem Linhagem definida.</p>
              )}
            </div>
          )}

          {stepKey === 'dominio' && (
            <div className="dr-panel">
              <h3>habilidade de domínio</h3>
              <p>continue uma trilha que você já tem, ou multiclasse para um novo Domínio no Despertar.</p>
              {character.domains.map((track, i) => {
                const def = DOMAINS.find((d) => d.key === track.domainKey);
                const ri = DOMAIN_TRACK_RANKS.indexOf(track.rank);
                const nextTrackRank = DOMAIN_TRACK_RANKS[ri + 1];
                const nextAbility = def?.abilities[ri + 1];
                const maxed = !nextTrackRank;
                return (
                  <label
                    key={i}
                    className={`dr-option-card ${choices.domainChoice === String(i) ? 'selected' : ''}`}
                    style={{ display: 'block', marginBottom: '8px', opacity: maxed ? 0.5 : 1 }}
                  >
                    <input
                      type="radio"
                      name="domain-choice"
                      checked={choices.domainChoice === String(i)}
                      disabled={maxed}
                      onChange={() => set('domainChoice', String(i))}
                    />{' '}
                    <strong>{def?.label}</strong> — {DOMAIN_TRACK_RANK_LABELS[track.rank]}
                    {maxed ? ' (trilha completa)' : ` → ${DOMAIN_TRACK_RANK_LABELS[nextTrackRank]}`}
                    {nextAbility && (
                      <p className="dr-ability-preview">
                        <strong>{nextAbility.name}</strong> — {nextAbility.summary}
                      </p>
                    )}
                  </label>
                );
              })}
              <label
                className={`dr-option-card ${choices.domainChoice === 'new' ? 'selected' : ''}`}
                style={{ display: 'block' }}
              >
                <input
                  type="radio"
                  name="domain-choice"
                  checked={choices.domainChoice === 'new'}
                  onChange={chooseMulticlass}
                />{' '}
                <strong>multiclassar</strong> — novo Domínio no Despertar
                {choices.domainChoice === 'new' && selectedNewDomain && (
                  <>
                    <select
                      value={selectedNewDomain.key}
                      onChange={(e) => set('newDomainKey', e.target.value as DomainKey)}
                      style={{ marginTop: '8px', width: '100%' }}
                    >
                      {DOMAIN_GROUPS.map((group) => {
                        const options = availableDomains.filter((d) => d.group === group.key);
                        if (options.length === 0) return null;
                        return (
                          <optgroup key={group.key} label={group.label}>
                            {options.map((d) => (
                              <option key={d.key} value={d.key}>
                                {d.label}
                              </option>
                            ))}
                          </optgroup>
                        );
                      })}
                    </select>
                    <p className="dr-ability-preview">
                      <strong>{selectedNewDomain.abilities[0].name}</strong> — {selectedNewDomain.abilities[0].summary}
                    </p>
                  </>
                )}
              </label>
            </div>
          )}

          {stepKey === 'patrono' && (
            <div className="dr-panel">
              <h3>novo patrono {target.patronoTier}</h3>
              {roster.length === 0 ? (
                <p>não há mais Patronos deste tier disponíveis.</p>
              ) : (
                <div className="dr-option-grid">
                  {roster.map((p) => (
                    <div
                      key={p.name}
                      className={`dr-option-card ${choices.patronoName === p.name ? 'selected' : ''}`}
                      onClick={() => set('patronoName', p.name)}
                    >
                      <h4>{p.name}</h4>
                      {choices.patronoName === p.name && <p className="dr-ability-preview">{p.effect}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {stepKey === 'traco' && (
            <div className="dr-panel">
              <h3>grau de treinamento</h3>
              <p>suba 1 traço um degrau na escada de dados (teto absoluto: d12).</p>
              {TRAITS.map((trait) => {
                const die = character.traits[trait.key];
                const idx = DIE_LADDER.indexOf(die);
                const raised = DIE_LADDER[Math.min(idx + 1, DIE_LADDER.length - 1)] as TraitDie;
                const maxed = die >= 12;
                return (
                  <label
                    key={trait.key}
                    className={`dr-option-card ${choices.traitKey === trait.key ? 'selected' : ''}`}
                    style={{ display: 'block', marginBottom: '6px', opacity: maxed ? 0.5 : 1 }}
                  >
                    <input
                      type="radio"
                      name="trait-choice"
                      checked={choices.traitKey === trait.key}
                      disabled={maxed}
                      onChange={() => set('traitKey', trait.key)}
                    />{' '}
                    <strong>{trait.label}</strong> — d{die}
                    {maxed ? ' (no máximo)' : ` → d${raised} (Grau ${traitGrau(raised)})`}
                  </label>
                );
              })}
            </div>
          )}

          {stepKey === 'experiencia' && (
            <div className="dr-panel">
              <h3>experiência</h3>
              <p>adicione uma nova Experiência (+1) ou melhore uma existente em +1. limite de {MAX_EXPERIENCES}.</p>
              <label className={`dr-option-card ${choices.experienciaMode === 'add' ? 'selected' : ''}`} style={{ display: 'block', marginBottom: '8px' }}>
                <input
                  type="radio"
                  name="exp-mode"
                  checked={choices.experienciaMode === 'add'}
                  disabled={character.experiencias.length >= MAX_EXPERIENCES}
                  onChange={() => set('experienciaMode', 'add')}
                />{' '}
                <strong>nova experiência</strong>
                {character.experiencias.length >= MAX_EXPERIENCES && ' (limite atingido)'}
                {choices.experienciaMode === 'add' && (
                  <input
                    type="text"
                    placeholder="frase da nova experiência"
                    value={choices.experienciaTexto}
                    onChange={(e) => set('experienciaTexto', e.target.value)}
                    style={{ marginTop: '8px', width: '100%' }}
                  />
                )}
              </label>
              <label className={`dr-option-card ${choices.experienciaMode === 'improve' ? 'selected' : ''}`} style={{ display: 'block' }}>
                <input
                  type="radio"
                  name="exp-mode"
                  checked={choices.experienciaMode === 'improve'}
                  onChange={() => set('experienciaMode', 'improve')}
                />{' '}
                <strong>melhorar existente</strong>
                {choices.experienciaMode === 'improve' && (
                  <select
                    value={choices.experienciaId}
                    onChange={(e) => set('experienciaId', e.target.value)}
                    style={{ marginTop: '8px', width: '100%' }}
                  >
                    <option value="">(escolha uma)</option>
                    {character.experiencias.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.texto || '(sem texto)'} — +{e.bonus} → +{e.bonus + 1}
                      </option>
                    ))}
                  </select>
                )}
              </label>
            </div>
          )}

          {stepKey === 'pv' && (
            <div className="dr-panel">
              <h3>aumento de PV</h3>
              <p>
                as regras ainda não definem números exatos de PV por rank — combine com o mestre e registre o novo
                PV máximo.
              </p>
              <div className="dr-attribute-row">
                <span className="dr-label">PV máximo</span>
                <input
                  type="number"
                  min={1}
                  value={choices.pvMax}
                  onChange={(e) => set('pvMax', Number(e.target.value))}
                  style={{ width: '90px' }}
                />
              </div>
            </div>
          )}

          {stepKey === 'vinculos' && (
            <div className="dr-panel">
              <h3>vínculos (opcional)</h3>
              <p>toda subida de rank permite trocar 1 Vínculo. deixe em branco para manter todos.</p>
              {character.vinculos.length === 0 ? (
                <p style={{ opacity: 0.7 }}>este personagem ainda não tem Vínculos.</p>
              ) : (
                <>
                  <div className="dr-field">
                    <label>trocar qual</label>
                    <select value={choices.vinculoSwapId} onChange={(e) => set('vinculoSwapId', e.target.value)}>
                      <option value="">(não trocar nenhum)</option>
                      {character.vinculos.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.nome} ({v.tipo})
                        </option>
                      ))}
                    </select>
                  </div>
                  {choices.vinculoSwapId && (
                    <div className="dr-field">
                      <label>novo vínculo</label>
                      <input
                        type="text"
                        value={choices.vinculoNewName}
                        onChange={(e) => set('vinculoNewName', e.target.value)}
                        placeholder="nome do novo vínculo"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {stepKey === 'review' && (
            <div className="dr-panel">
              <h3>confirmar subida para {target.label}</h3>
              <ul>
                <li>Rank: {RANKS[rankIndex(character.rank)].label} → <strong>{target.label}</strong></li>
                {target.padraoDeVida && <li>Padrão de Vida: {target.padraoDeVida}</li>}
                {target.patronoTier && <li>Patrono {target.patronoTier}: {choices.patronoName || '—'}</li>}
                {target.grauDeTreinamento && choices.traitKey && (
                  <li>
                    Traço: {TRAITS.find((t) => t.key === choices.traitKey)?.label} d{character.traits[choices.traitKey]} → d
                    {DIE_LADDER[Math.min(DIE_LADDER.indexOf(character.traits[choices.traitKey]) + 1, DIE_LADDER.length - 1)]}
                  </li>
                )}
                {target.experiencia && (
                  <li>
                    Experiência:{' '}
                    {choices.experienciaMode === 'add'
                      ? `nova — "${choices.experienciaTexto}" (+1)`
                      : `melhorar "${character.experiencias.find((e) => e.id === choices.experienciaId)?.texto ?? '—'}"`}
                  </li>
                )}
                {target.dominioAbility && (
                  <li>
                    Domínio:{' '}
                    {choices.domainChoice === 'new'
                      ? `multiclasse em ${selectedNewDomain?.label ?? '—'}`
                      : `avançar ${DOMAINS.find((d) => d.key === character.domains[Number(choices.domainChoice)]?.domainKey)?.label ?? '—'}`}
                  </li>
                )}
                {target.pvIncrease && <li>PV máximo: {choices.pvMax}</li>}
                {choices.vinculoSwapId && choices.vinculoNewName.trim() && (
                  <li>Vínculo trocado por "{choices.vinculoNewName.trim()}"</li>
                )}
              </ul>
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button
              type="button"
              className="dr-btn ghost"
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              disabled={stepIndex === 0}
            >
              voltar
            </button>
            {stepIndex < steps.length - 1 ? (
              <button
                type="button"
                className="dr-btn primary"
                onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
                disabled={!currentValid}
              >
                próximo
              </button>
            ) : (
              <button type="button" className="dr-btn primary" onClick={apply}>
                confirmar subida de rank
              </button>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
