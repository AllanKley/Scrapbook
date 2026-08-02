import type { Dispatch } from 'react';
import { STARTING_BONUS } from '../../rules';
import type { CreatorAction, CreatorDraft } from '../creatorReducer';

interface StepProps {
  draft: CreatorDraft;
  dispatch: Dispatch<CreatorAction>;
}

export function ExperienciasStep({ draft, dispatch }: StepProps) {
  return (
    <div className="dr-panel">
      <h3>experiências</h3>
      <p>
        escreva 2 frases curtas que resumam pedaços da vida desse personagem antes (ou à margem) da carreira de
        Caçador — uma origem, um ofício, uma marca de personalidade, um evento que deixou cicatriz. cada uma começa
        valendo +{STARTING_BONUS} e também responde "meu personagem sabe disso?" sem precisar de teste.
      </p>
      {draft.experiencias.map((exp, i) => (
        <div key={exp.id} className="dr-field">
          <label>experiência {i + 1}</label>
          <input
            type="text"
            placeholder='ex: "Contrabandista de Ecos do Mercado Cinza"'
            value={exp.texto}
            onChange={(e) => dispatch({ type: 'SET_EXPERIENCIA_TEXT', index: i, texto: e.target.value })}
          />
        </div>
      ))}
    </div>
  );
}

export function isExperienciasStepValid(draft: CreatorDraft): boolean {
  return draft.experiencias.every((e) => e.texto.trim().length > 0);
}
