import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { BackLink } from '../components/shared/BackLink';
import { deleteCharacter, exportCharacterToFile, getCharacter, updateCharacter } from '../dungeonrift/characterStorage';
import type { Character } from '../dungeonrift/types';
import { AttributesPanel } from '../dungeonrift/sheet/AttributesPanel';
import { ClassDomainPanel } from '../dungeonrift/sheet/ClassDomainPanel';
import { ConexoesPanel } from '../dungeonrift/sheet/ConexoesPanel';
import { EcosPanel } from '../dungeonrift/sheet/EcosPanel';
import { EquipmentPanel } from '../dungeonrift/sheet/EquipmentPanel';
import { PatronosPanel } from '../dungeonrift/sheet/PatronosPanel';
import { RankPanel } from '../dungeonrift/sheet/RankPanel';
import { ResourcesPanel } from '../dungeonrift/sheet/ResourcesPanel';
import { SkillsPanel } from '../dungeonrift/sheet/SkillsPanel';
import { WoundsConditionsPanel } from '../dungeonrift/sheet/WoundsConditionsPanel';
import { PrintableCharacterSheet } from '../dungeonrift/PrintableCharacterSheet';

export function CharacterSheet() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | undefined>(() => (id ? getCharacter(id) : undefined));
  const [savedFlash, setSavedFlash] = useState(false);

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
        <BackLink to="/devlog/personagens" label="back to personagens" />
        <h2 className="section-heading">personagem não encontrado</h2>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection direction="top">
      <BackLink to="/devlog/personagens" label="back to personagens" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <h2 className="section-heading">{character.name}</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="button" className="dr-btn ghost" onClick={handlePrint}>
            exportar PDF
          </button>
          <button type="button" className="dr-btn ghost" onClick={() => exportCharacterToFile(character.id)}>
            exportar JSON
          </button>
          <button type="button" className="dr-btn danger" onClick={handleDelete}>
            excluir
          </button>
        </div>
      </div>
      {savedFlash && <span className="dr-save-indicator">salvo ✓</span>}

      <div className="dr-panel">
        <div className="dr-field">
          <label>nome</label>
          <input type="text" value={character.name} onChange={(e) => save({ name: e.target.value })} />
        </div>
        <div className="dr-field">
          <label>conceito / história</label>
          <textarea rows={3} value={character.concept} onChange={(e) => save({ concept: e.target.value })} />
        </div>
      </div>

      <RankPanel character={character} onChange={save} />
      <ClassDomainPanel character={character} onChange={save} />
      <AttributesPanel character={character} onChange={save} />
      <SkillsPanel character={character} onChange={save} />
      <ConexoesPanel character={character} onChange={save} />
      <PatronosPanel character={character} onChange={save} />
      <EquipmentPanel character={character} onChange={save} />
      <ResourcesPanel character={character} onChange={save} />
      <WoundsConditionsPanel character={character} onChange={save} />
      <EcosPanel character={character} onChange={save} />

      <PrintableCharacterSheet character={character} />
    </AnimatedSection>
  );
}
