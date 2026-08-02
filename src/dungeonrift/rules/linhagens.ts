import type { LinhagemKey } from '../types';
import type { AbilityPreview } from './domains';

export interface LinhagemDef {
  key: LinhagemKey;
  label: string;
  concept: string;
  /** Slug of the full write-up in content/devlog/entries/ — link out rather than duplicating ability text here. */
  devlogSlug: string;
  status: 'completa' | 'revisar';
  /** Short paraphrase of the Despertar (first) ability — full text lives in the devlog entry. */
  despertarAbility: AbilityPreview;
}

export const LINHAGENS: LinhagemDef[] = [
  {
    key: 'ceifador',
    label: 'Ceifador',
    concept: 'senhor da morte e das almas, transforma corpos e energia vital em poder',
    devlogSlug: 'ceifador',
    status: 'completa',
    despertarAbility: {
      name: 'Cortejo Fúnebre',
      summary: 'invoca Almas (criaturas Médias) que bloqueiam ataques contra você ou aliados ao serem sacrificadas.',
    },
  },
  {
    key: 'espectro',
    label: 'Espectro',
    concept: 'predador tático que caça um único alvo por vez',
    devlogSlug: 'espectro',
    status: 'completa',
    despertarAbility: {
      name: 'Sombra Viva',
      summary: 'controla sua própria sombra para diversos efeitos táticos em alcance curto.',
    },
  },
  {
    key: 'selvagem',
    label: 'Selvagem',
    concept: 'vínculo espiritual com a fauna e totens',
    devlogSlug: 'selvagem',
    status: 'completa',
    despertarAbility: {
      name: 'Companheiro Animal',
      summary: 'um companheiro espiritual que se funde a você em combate, concedendo bônus.',
    },
  },
  {
    key: 'oraculo',
    label: 'Oráculo',
    concept: 'domínio da mente e das emoções, guerra psicológica',
    devlogSlug: 'oraculo',
    status: 'completa',
    despertarAbility: {
      name: 'Cartas do Destino',
      summary: 'sorteia cartas de efeito a cada descanso longo, cada uma usável uma vez.',
    },
  },
  {
    key: 'aprimorado',
    label: 'Aprimorado',
    concept: 'controla o ritmo da luta, o que não cai',
    devlogSlug: 'aprimorado',
    status: 'completa',
    despertarAbility: {
      name: 'Além do Limite',
      summary: 'gasta PA para acumular dano, deslocamento e Redução de Dano extras ao custo da própria integridade.',
    },
  },
  {
    key: 'malandro',
    label: 'Malandro',
    concept: 'quebra as regras da realidade — caos, ilusão e trapaças',
    devlogSlug: 'malandro',
    status: 'revisar',
    despertarAbility: {
      name: 'Cartas na Manga',
      summary: 'rola dados no descanso longo para substituir uma rolagem de teste depois.',
    },
  },
  {
    key: 'apotecario',
    label: 'Apotecário',
    concept: 'alquimista de campo de batalha (vida/toxinas/flora)',
    devlogSlug: 'apotecario',
    status: 'revisar',
    despertarAbility: {
      name: 'Bolsa de Poções',
      summary: 'produz Elixires no descanso longo com efeitos variados (cura, dano ácido).',
    },
  },
  {
    key: 'iluminado',
    label: 'Iluminado',
    concept: 'canalizador de luz vital — suporte, restauração e proteção',
    devlogSlug: 'iluminado',
    status: 'revisar',
    despertarAbility: {
      name: 'Prisma Interior',
      summary: 'emite um Feixe de luz colorido com efeito à escolha (dano, cura, remover condição, Fortuna).',
    },
  },
  {
    key: 'forjador',
    label: 'Forjador',
    concept: 'engenheiro místico, runas em armas/armaduras',
    devlogSlug: 'forjador',
    status: 'revisar',
    despertarAbility: {
      name: 'Criação Perfeita',
      summary: 'grava uma Runa temporária num item com efeito à escolha (dano, alcance, retorno, escuta).',
    },
  },
  {
    key: 'conduite',
    label: 'Conduíte',
    concept: 'avatar das forças naturais/climáticas',
    devlogSlug: 'conduite',
    status: 'revisar',
    despertarAbility: {
      name: 'Convergência Elemental',
      summary: 'monta um efeito elemental customizado combinando elemento, forma, duração e efeito.',
    },
  },
];
