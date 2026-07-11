import type { ConditionKey } from '../types';

export interface ConditionDef {
  key: ConditionKey;
  label: string;
  description: string;
}

export const CONDITIONS: ConditionDef[] = [
  { key: 'sangramento', label: 'Sangramento', description: 'cada estágio causa dano Baixo em qualquer ação; +1 estágio por acerto que sangra; cura com qualquer cura ou a ação "Estancar" (1 PA)' },
  { key: 'fogo', label: 'Fogo', description: 'dano Baixo por estágio no início do turno; apaga sozinho após 3 rounds, ou instantaneamente com água/Congelamento' },
  { key: 'congelamento', label: 'Congelamento', description: 'a cada round, ganha 1 estágio de Lentidão + dano Baixo; só termina com magia de purificação ou descanso curto perto de calor intenso' },
  { key: 'veneno', label: 'Veneno', description: 'cura não funciona enquanto envenenado; dano Baixo/round por estágio; removido só por antídoto ou magia de purificação' },
  { key: 'vulnerabilidade', label: 'Vulnerabilidade', description: 'qualquer acerto sofrido inflige 1 Ferimento, independente do PV restante' },
  { key: 'atordoamento', label: 'Atordoamento', description: 'perde o próximo round' },
  { key: 'fraqueza', label: 'Fraqueza', description: 'não estagia (renova duração); metade do dano causado; +1 Ruína em testes baseados em Ímpeto' },
  { key: 'cegueira', label: 'Cegueira', description: 'todos os ataques contra você contam como ataques surpresa; seus ataques em Desvantagem' },
  { key: 'lentidao', label: 'Lentidão', description: 'cada estágio = –1 PA/round; chegar a 0 PA causa Imobilização' },
  { key: 'imobilizacao', label: 'Imobilização', description: 'perde a ação de movimento' },
  { key: 'silencio', label: 'Silêncio', description: 'não pode falar/gritar/vocalizar — bloqueia a maioria das habilidades de Canalização e Performance; habilidades físicas/passivas/gestuais continuam funcionando' },
  { key: 'corrosao', label: 'Corrosão', description: 'cada estágio reduz os Usos restantes de um escudo ou a RD de uma armadura em Baixo (mín. 0) no próximo acerto sofrido; consumido ao ativar' },
  { key: 'exposicao', label: 'Exposição', description: 'não pode usar reações para Bloquear/Esquivar/Aparar' },
  { key: 'medo', label: 'Medo', description: 'não pode atacar a fonte; não pode permanecer dentro do Alcance Curto dela (deve se afastar se já estiver dentro)' },
];
