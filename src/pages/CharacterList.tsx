import { useRef, useState, type ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatedSection } from '../components/shared/AnimatedSection';
import { PageHeading } from '../components/shared/PageHeading';
import { CLASSES } from '../dungeonrift/rules';
import {
  deleteCharacter,
  importCharacterFromFile,
  listCharacters,
} from '../dungeonrift/characterStorage';

export function CharacterList() {
  const [characters, setCharacters] = useState(() => listCharacters());
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function refresh() {
    setCharacters(listCharacters());
  }

  function handleDelete(id: string, name: string) {
    if (!confirm(`excluir "${name}"? isso não pode ser desfeito.`)) return;
    deleteCharacter(id);
    refresh();
  }

  async function handleImport(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setImportError(null);
    try {
      const imported = await importCharacterFromFile(file);
      navigate(`/devlog/personagens/${imported.id}`);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : String(err));
    }
  }

  function classLabel(classKey: string | null) {
    return CLASSES.find((c) => c.key === classKey)?.label ?? 'sem classe';
  }

  return (
    <AnimatedSection direction="top">
      <PageHeading backTo="/devlog" backLabel="back to Dungeon Rift">
        personagens
      </PageHeading>
      <p>
        fichas ficam salvas só neste navegador. exporte para um arquivo se quiser fazer backup ou mandar pro
        mestre.
      </p>

      <div style={{ display: 'flex', gap: '12px', margin: '16px 0', flexWrap: 'wrap' }}>
        <Link to="/devlog/personagens/novo" className="dr-btn primary" style={{ textDecoration: 'none' }}>
          + novo personagem
        </Link>
        <button type="button" className="dr-btn ghost" onClick={() => fileInputRef.current?.click()}>
          importar de um arquivo
        </button>
        <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImport} hidden />
      </div>
      {importError && <p className="dr-status-text">{importError}</p>}

      {characters.length === 0 ? (
        <p>nenhum personagem ainda.</p>
      ) : (
        <div className="card-grid">
          {characters.map((character) => (
            <div key={character.id} className="card" style={{ position: 'relative' }}>
              <Link to={`/devlog/personagens/${character.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{character.name}</h3>
                <p>{classLabel(character.classKey)}</p>
                {character.concept && <p style={{ opacity: 0.7 }}>{character.concept.slice(0, 80)}</p>}
              </Link>
              <button
                type="button"
                className="dr-btn danger"
                style={{ marginTop: '12px' }}
                onClick={() => handleDelete(character.id, character.name)}
              >
                excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </AnimatedSection>
  );
}
