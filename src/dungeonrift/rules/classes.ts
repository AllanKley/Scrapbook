import type { ClassKey } from '../types';

export interface ClassDef {
  key: ClassKey;
  label: string;
  concept: string;
  /** Slug of the full write-up in content/devlog/entries/ — link out rather than duplicating ability text here. */
  devlogSlug: string;
  status: 'completa' | 'revisar';
}

export const CLASSES: ClassDef[] = [
  { key: 'ceifador', label: 'Ceifador', concept: 'senhor da morte e das almas, transforma corpos e energia vital em poder', devlogSlug: 'ceifador', status: 'completa' },
  { key: 'espectro', label: 'Espectro', concept: 'predador tático que caça um único alvo por vez', devlogSlug: 'espectro', status: 'completa' },
  { key: 'selvagem', label: 'Selvagem', concept: 'vínculo espiritual com a fauna e totens', devlogSlug: 'selvagem', status: 'completa' },
  { key: 'oraculo', label: 'Oráculo', concept: 'domínio da mente e das emoções, guerra psicológica', devlogSlug: 'oraculo', status: 'completa' },
  { key: 'aprimorado', label: 'Aprimorado', concept: 'controla o ritmo da luta, o que não cai', devlogSlug: 'aprimorado', status: 'completa' },
  { key: 'malandro', label: 'Malandro', concept: 'quebra as regras da realidade — caos, ilusão e trapaças', devlogSlug: 'malandro', status: 'revisar' },
  { key: 'apotecario', label: 'Apotecário', concept: 'alquimista de campo de batalha (vida/toxinas/flora)', devlogSlug: 'apotecario', status: 'revisar' },
  { key: 'iluminado', label: 'Iluminado', concept: 'canalizador de luz vital — suporte, restauração e proteção', devlogSlug: 'iluminado', status: 'revisar' },
  { key: 'forjador', label: 'Forjador', concept: 'engenheiro místico, runas em armas/armaduras', devlogSlug: 'forjador', status: 'revisar' },
  { key: 'conduite', label: 'Conduíte', concept: 'avatar das forças naturais/climáticas', devlogSlug: 'conduite', status: 'revisar' },
];
