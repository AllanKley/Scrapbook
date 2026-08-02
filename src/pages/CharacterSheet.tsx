import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { PageHeading } from '../components/shared/PageHeading';
import { deleteCharacter, exportCharacterToFile, getCharacter, updateCharacter } from '../dungeonrift/characterStorage';
import type { Character } from '../dungeonrift/types';
import { AbilitiesPanel } from '../dungeonrift/sheet/AbilitiesPanel';
import { EcosPanel } from '../dungeonrift/sheet/EcosPanel';
import { EquipmentPanel } from '../dungeonrift/sheet/EquipmentPanel';
import { ExperienciasPanel } from '../dungeonrift/sheet/ExperienciasPanel';
import { HeroStats } from '../dungeonrift/sheet/HeroStats';
import { SheetHeader } from '../dungeonrift/sheet/SheetHeader';
import { TraitBlocks } from '../dungeonrift/sheet/TraitBlocks';
import { VinculosPanel } from '../dungeonrift/sheet/VinculosPanel';
import { WoundsConditionsPanel } from '../dungeonrift/sheet/WoundsConditionsPanel';
import { PrintableCharacterSheet } from '../dungeonrift/PrintableCharacterSheet';

type SheetTab = 'habilidades' | 'combate' | 'perfil';

const TABS: { key: SheetTab; label: string }[] = [
  { key: 'habilidades', label: 'habilidades' },
  { key: 'combate', label: 'combate' },
  { key: 'perfil', label: 'perfil' },
];

export function CharacterSheet() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | undefined>(() => (id ? getCharacter(id) : undefined));
  const [savedFlash, setSavedFlash] = useState(false);
  const [tab, setTab] = useState<SheetTab>('habilidades');

  useEffect(() => {
    if (id) setCharacter(getCharacter(id));
  }, [id]);

  function save(patch: Partial<Character>) {
    if (!character) return;
    const updated = updateCharacter(character.id, patch);
    setCharacter(updated);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1200);
  }

  function handlePrint() {
    if (!character) return;
    // window.print() opens an async dialog on modern browsers — reverting the title
    // immediately after calling it (rather than on 'afterprint') would undo it before
    // the print/save-as-PDF dialog ever captures it as the suggested filename.
    const previousTitle = document.title;
    document.title = character.name || 'personagem';
    const restoreTitle = () => {
      document.title = previousTitle;
      window.removeEventListener('afterprint', restoreTitle);
    };
    window.addEventListener('afterprint', restoreTitle);
    window.print();
  }

  function handleDelete() {
    if (!character) return;
    if (!confirm(`excluir "${character.name}"? isso não pode ser desfeito.`)) return;
    deleteCharacter(character.id);
    navigate('/devlog/personagens');
  }

  if (!character) {
    return (
      <AnimatedSection direction="top">
        <PageHeading backTo="/devlog/personagens" backLabel="back to personagens">
          personagem não encontrado
        </PageHeading>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection direction="top">
      <PageHeading backTo="/devlog/personagens" backLabel="back to personagens">
        ficha
      </PageHeading>

      <SheetHeader
        character={character}
        onChange={save}
        onPrint={handlePrint}
        onExportJson={() => exportCharacterToFile(character.id)}
        onDelete={handleDelete}
      />
      {savedFlash && <span className="dr-save-indicator">salvo ✓</span>}

      <HeroStats character={character} onChange={save} />
      <TraitBlocks character={character} />

      <div className="dr-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            className={`dr-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'habilidades' && <AbilitiesPanel character={character} />}

      {tab === 'combate' && (
        <>
          <WoundsConditionsPanel character={character} onChange={save} />
          <EquipmentPanel character={character} onChange={save} />
          <InvocaveisReference character={character} />
        </>
      )}

      {tab === 'perfil' && (
        <>
          <div className="dr-panel">
            <h3>conceito</h3>
            <div className="dr-field">
              <label>história / motivação / papel no grupo</label>
              <textarea rows={4} value={character.concept} onChange={(e) => save({ concept: e.target.value })} />
            </div>
            <div className="dr-field">
              <label>notas livres</label>
              <textarea
                rows={4}
                value={character.notes ?? ''}
                onChange={(e) => save({ notes: e.target.value })}
                placeholder="qualquer coisa que as regras ainda não modelam (Defesa/Evasão, homebrew...)"
              />
            </div>
          </div>
          <ExperienciasPanel character={character} onChange={save} />
          <VinculosPanel character={character} onChange={save} />
          <EcosPanel character={character} onChange={save} />
        </>
      )}

      <PrintableCharacterSheet character={character} />
    </AnimatedSection>
  );
}

/**
 * Read-only reminder of what can be invoked on a roll. Experiências (+bônus) and Vínculos
 * (+1 Fortuna) are edited on the Perfil tab, but they're spent during tests — repeating them
 * here saves tabbing away mid-roll.
 */
function InvocaveisReference({ character }: { character: Character }) {
  const experiencias = character.experiencias.filter((e) => e.texto.trim());
  const vinculos = character.vinculos.filter((v) => v.nome.trim());
  if (experiencias.length === 0 && vinculos.length === 0) return null;

  return (
    <div className="dr-panel">
      <h3>invocáveis em testes</h3>
      <p style={{ opacity: 0.7, marginTop: 0 }}>1 experiência e 1 vínculo por teste. edite na aba perfil.</p>
      {experiencias.map((exp) => (
        <div key={exp.id} className="dr-attribute-row">
          <span className="dr-label">{exp.texto}</span>
          <span>+{exp.bonus}</span>
        </div>
      ))}
      {vinculos.map((v) => (
        <div key={v.id} className="dr-attribute-row">
          <span className="dr-label">
            {v.nome} <span style={{ opacity: 0.6 }}>({v.tipo})</span>
          </span>
          <span>+1 Fortuna</span>
        </div>
      ))}
    </div>
  );
}
