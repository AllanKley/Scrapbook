import { DIE_LADDER, TRAIT_CREATION_RULES } from '../rules';
import type { TraitDie, TraitKey } from '../types';

export interface TraitBudget {
  pointsAvailable: number;
  pointsUsed: number;
  remaining: number;
  isValid: boolean;
}

function rungIndex(die: TraitDie): number {
  return DIE_LADDER.indexOf(die);
}

export function computeTraitBudget(traits: Record<TraitKey, TraitDie>): TraitBudget {
  const values = Object.values(traits);
  const baseRung = rungIndex(TRAIT_CREATION_RULES.baseDie);
  const pointsUsed = values.reduce((sum, die) => sum + (rungIndex(die) - baseRung), 0);
  const pointsAvailable = TRAIT_CREATION_RULES.pointPool;
  const remaining = pointsAvailable - pointsUsed;
  const withinMax = values.every((die) => rungIndex(die) <= rungIndex(TRAIT_CREATION_RULES.maxAtCreation));
  const isValid = remaining === 0 && withinMax;
  return { pointsAvailable, pointsUsed, remaining, isValid };
}

export function nextDie(die: TraitDie): TraitDie {
  const idx = rungIndex(die);
  return DIE_LADDER[Math.min(idx + 1, DIE_LADDER.length - 1)];
}

export function prevDie(die: TraitDie): TraitDie {
  const idx = rungIndex(die);
  return DIE_LADDER[Math.max(idx - 1, 0)];
}
