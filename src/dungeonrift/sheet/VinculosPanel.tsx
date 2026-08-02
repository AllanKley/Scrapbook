import { EMOCAO_SUGESTOES, MAX_VINCULOS_ORGANIZACIONAL, MAX_VINCULOS_PESSOAL } from '../rules';
import type { Character, Vinculo } from '../types';

interface VinculosPanelProps {
  character: Character;
  onChange: (patch: Partial<Character>) => void;
}

function generateId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `vinculo-${Date.now()}`;
}

export function VinculosPanel({ character, onChange }: VinculosPanelProps) {
  function addVinculo(tipo: Vinculo['tipo']) {
    onChange({ vinculos: [...character.vinculos, { id: generateId(), tipo, nome: '' }] });
  }

  function updateVinculo(id: string, patch: Partial<Vinculo>) {
    onChange({ vinculos: character.vinculos.map((v) => (v.id === id ? { ...v, ...patch } : v)) });
  }

  function removeVinculo(id: string) {
    onChange({ vinculos: character.vinculos.filter((v) => v.id !== id) });
  }

  const pessoais = character.vinculos.filter((v) => v.tipo === 'pessoal');
  const organizacionais = character.vinculos.filter((v) => v.tipo === 'organizacional');

  function renderRow(v: Vinculo) {
    return (
      <div key={v.id} className="dr-equipment-row" style={{ flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="nome"
          value={v.nome}
          onChange={(e) => updateVinculo(v.id, { nome: e.target.value })}
          style={{ flex: '2 1 180px' }}
        />
        <input
          type="text"
          placeholder={`emoções (ex: ${EMOCAO_SUGESTOES.slice(0, 2).join(', ')})`}
          value={(v.emocoes ?? []).join(', ')}
          onChange={(e) =>
            updateVinculo(v.id, { emocoes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })
          }
          style={{ flex: '2 1 180px' }}
        />
        <button type="button" className="dr-btn danger" onClick={() => removeVinculo(v.id)}>
          remover
        </button>
      </div>
    );
  }

  return (
    <div className="dr-panel">
      <h3>vínculos</h3>
      <h4>
        pessoais ({pessoais.length} / {MAX_VINCULOS_PESSOAL})
      </h4>
      {pessoais.map(renderRow)}
      {pessoais.length < MAX_VINCULOS_PESSOAL && (
        <button type="button" className="dr-btn ghost" onClick={() => addVinculo('pessoal')}>
          + adicionar vínculo pessoal
        </button>
      )}

      <h4 style={{ marginTop: '16px' }}>
        organizacional ({organizacionais.length} / {MAX_VINCULOS_ORGANIZACIONAL})
      </h4>
      {organizacionais.map(renderRow)}
      {organizacionais.length < MAX_VINCULOS_ORGANIZACIONAL && (
        <button type="button" className="dr-btn ghost" onClick={() => addVinculo('organizacional')}>
          + adicionar vínculo organizacional
        </button>
      )}
    </div>
  );
}
