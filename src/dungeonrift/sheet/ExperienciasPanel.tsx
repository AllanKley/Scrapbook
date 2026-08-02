import { MAX_EXPERIENCES, STARTING_BONUS } from '../rules';
import type { Character } from '../types';

interface ExperienciasPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

function generateId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `exp-${Date.now()}`;
}

export function ExperienciasPanel({ character, onChange }: ExperienciasPanelProps) {
  function addExperiencia() {
    onChange({ experiencias: [...character.experiencias, { id: generateId(), texto: '', bonus: STARTING_BONUS }] });
  }

  function updateExperiencia(id: string, patch: Partial<Character['experiencias'][number]>) {
    onChange({ experiencias: character.experiencias.map((e) => (e.id === id ? { ...e, ...patch } : e)) });
  }

  function removeExperiencia(id: string) {
    onChange({ experiencias: character.experiencias.filter((e) => e.id !== id) });
  }

  return (
    <div className="dr-panel">
      <h3>experiências</h3>
      <p style={{ opacity: 0.7 }}>
        {character.experiencias.length} / {MAX_EXPERIENCES} (limite sugerido pelas regras, não travado aqui)
      </p>
      {character.experiencias.map((exp) => (
        <div key={exp.id} className="dr-equipment-row" style={{ flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="frase da experiência"
            value={exp.texto}
            onChange={(e) => updateExperiencia(exp.id, { texto: e.target.value })}
            style={{ flex: '3 1 200px' }}
          />
          <input
            type="number"
            value={exp.bonus}
            onChange={(e) => updateExperiencia(exp.id, { bonus: Number(e.target.value) })}
            style={{ width: '70px' }}
          />
          <button type="button" className="dr-btn danger" onClick={() => removeExperiencia(exp.id)}>
            remover
          </button>
        </div>
      ))}
      <button type="button" className="dr-btn ghost" onClick={addExperiencia} style={{ marginTop: '8px' }}>
        + adicionar experiência
      </button>
    </div>
  );
}
