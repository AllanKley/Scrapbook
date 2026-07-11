import type { WoundOutcome } from '../types';

interface WoundRange {
  min: number;
  max: number;
  outcome: WoundOutcome;
}

/**
 * Column is keyed by "which wound-roll this is" (1st, 2nd, 3rd-or-later) rather than by
 * pre-existing wound count directly, since the source table has no dedicated "0 wounds"
 * column — this is the only internally-consistent reading of ferimentos.md's three tables.
 */
const WOUND_TABLE: Record<1 | 2 | 3, WoundRange[]> = {
  1: [
    { min: 13, max: 20, outcome: 'desestabilizado' },
    { min: 7, max: 12, outcome: 'atordoado' },
    { min: 3, max: 6, outcome: 'ferimentoLeve' },
    { min: 1, max: 2, outcome: 'apagado' },
  ],
  2: [
    { min: 16, max: 20, outcome: 'desestabilizado' },
    { min: 11, max: 15, outcome: 'atordoado' },
    { min: 7, max: 10, outcome: 'ferimentoLeve' },
    { min: 4, max: 6, outcome: 'apagado' },
    { min: 2, max: 3, outcome: 'mutilado' },
    { min: 1, max: 1, outcome: 'abeiraDaMorte' },
  ],
  3: [
    { min: 15, max: 20, outcome: 'ferimentoLeve' },
    { min: 11, max: 14, outcome: 'apagado' },
    { min: 7, max: 10, outcome: 'mutilado' },
    { min: 4, max: 6, outcome: 'abeiraDaMorte' },
    { min: 2, max: 3, outcome: 'ferimentoFatal' },
    { min: 1, max: 1, outcome: 'morteSubita' },
  ],
};

export const WOUND_OUTCOME_LABELS: Record<WoundOutcome, string> = {
  desestabilizado: 'Desestabilizado',
  atordoado: 'Atordoado',
  ferimentoLeve: 'Ferimento Leve',
  apagado: 'Apagado',
  mutilado: 'Mutilado',
  abeiraDaMorte: 'À Beira da Morte',
  ferimentoFatal: 'Ferimento Fatal',
  morteSubita: 'Morte Súbita',
};

export const WOUND_OUTCOME_DESCRIPTIONS: Record<WoundOutcome, string> = {
  desestabilizado: 'Desvantagem em ataques até o seu próximo turno.',
  atordoado: 'Perde o próximo turno.',
  ferimentoLeve: '–1 PV Máximo permanente, removido apenas com "Recuperar-se" em um descanso longo; se o PV Máximo chegar a 0, vira Ferimento Fatal.',
  apagado: 'Inconsciente até o fim do combate; acordar antes da hora (por cura) também causa Atordoamento + um novo Ferimento Leve.',
  mutilado: 'Todos os efeitos de Ferimento Leve, além de reduzir um atributo em 1 passo de dado; todos os atributos em d4 conta como Ferimento Fatal.',
  abeiraDaMorte: 'Todos os testes em Desvantagem; morre em 2 rounds sem ajuda, ou reduz para Ferimento Leve se ajudado a tempo.',
  ferimentoFatal: 'Morre ao final do próximo round; esse round final concede Vantagem em tudo + 2 PA bônus.',
  morteSubita: 'Morte instantânea.',
};

function lookupWoundTable(column: 1 | 2 | 3, roll: number): WoundOutcome {
  const range = WOUND_TABLE[column].find((r) => roll >= r.min && roll <= r.max);
  if (!range) throw new Error(`No wound table entry for column ${column}, roll ${roll}`);
  return range.outcome;
}

/**
 * Rolls on the Ferimentos table. `woundCountBeforeRoll` is how many wounds the character
 * already has going into this roll (0 for their very first wound this table ever triggers).
 */
export function rollFerimento(woundCountBeforeRoll: number, rng: () => number = Math.random): { roll: number; outcome: WoundOutcome } {
  const column: 1 | 2 | 3 = woundCountBeforeRoll === 0 ? 1 : woundCountBeforeRoll === 1 ? 2 : 3;
  const roll = Math.floor(rng() * 20) + 1;
  return { roll, outcome: lookupWoundTable(column, roll) };
}
