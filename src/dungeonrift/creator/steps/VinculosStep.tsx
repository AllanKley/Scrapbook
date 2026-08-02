import type { Dispatch } from 'react';
import { EMOCAO_SUGESTOES, MAX_VINCULOS_ORGANIZACIONAL, MAX_VINCULOS_PESSOAL } from '../../rules';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

function generateId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `vinculo-${Date.now()}`;
}

export function VinculosStep({ draft, dispatch }: StepProps) {
  const pessoais = draft.vinculos.filter((v) => v.tipo === 'pessoal');
  const organizacionais = draft.vinculos.filter((v) => v.tipo === 'organizacional');

  return (
    <div className="dr-panel">
      <h3>vínculos</h3>
      <p>
        até {MAX_VINCULOS_PESSOAL} Vínculos Pessoais (uma pessoa específica) e {MAX_VINCULOS_ORGANIZACIONAL} Vínculo
        Organizacional (uma instituição). cada um concede +1 Fortuna quando invocado. nenhum é obrigatório agora —
        também dá pra definir depois.
      </p>

      <h4>pessoais ({pessoais.length} / {MAX_VINCULOS_PESSOAL})</h4>
      {pessoais.map((v) => (
        <div key={v.id} className="dr-equipment-row" style={{ flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="nome (NPC, aliado, mentor, rival...)"
            value={v.nome}
            onChange={(e) => dispatch({ type: 'UPDATE_VINCULO', id: v.id, patch: { nome: e.target.value } })}
            style={{ flex: '2 1 180px' }}
          />
          <input
            type="text"
            placeholder={`emoções (ex: ${EMOCAO_SUGESTOES.slice(0, 2).join(', ')})`}
            value={(v.emocoes ?? []).join(', ')}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_VINCULO',
                id: v.id,
                patch: { emocoes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) },
              })
            }
            style={{ flex: '2 1 180px' }}
          />
          <button type="button" className="dr-btn danger" onClick={() => dispatch({ type: 'REMOVE_VINCULO', id: v.id })}>
            remover
          </button>
        </div>
      ))}
      {pessoais.length < MAX_VINCULOS_PESSOAL && (
        <button
          type="button"
          className="dr-btn ghost"
          onClick={() => dispatch({ type: 'ADD_VINCULO', vinculo: { id: generateId(), tipo: 'pessoal', nome: '' } })}
        >
          + adicionar vínculo pessoal
        </button>
      )}

      <h4 style={{ marginTop: '20px' }}>
        organizacional ({organizacionais.length} / {MAX_VINCULOS_ORGANIZACIONAL})
      </h4>
      {organizacionais.map((v) => (
        <div key={v.id} className="dr-equipment-row" style={{ flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="instituição (guilda, federação, casa, seita...)"
            value={v.nome}
            onChange={(e) => dispatch({ type: 'UPDATE_VINCULO', id: v.id, patch: { nome: e.target.value } })}
            style={{ flex: '2 1 180px' }}
          />
          <input
            type="text"
            placeholder="emoções"
            value={(v.emocoes ?? []).join(', ')}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_VINCULO',
                id: v.id,
                patch: { emocoes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) },
              })
            }
            style={{ flex: '2 1 180px' }}
          />
          <button type="button" className="dr-btn danger" onClick={() => dispatch({ type: 'REMOVE_VINCULO', id: v.id })}>
            remover
          </button>
        </div>
      ))}
      {organizacionais.length < MAX_VINCULOS_ORGANIZACIONAL && (
        <button
          type="button"
          className="dr-btn ghost"
          onClick={() => dispatch({ type: 'ADD_VINCULO', vinculo: { id: generateId(), tipo: 'organizacional', nome: '' } })}
        >
          + adicionar vínculo organizacional
        </button>
      )}
    </div>
  );
}

// The source doesn't state a creation-time minimum ("up to 5 total"), so none is enforced here —
// consistent with how Experiências/Equipamento also aren't force-filled before proceeding.
export function isVinculosStepValid(): boolean {
  return true;
}
