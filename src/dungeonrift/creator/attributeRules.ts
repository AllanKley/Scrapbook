import { ATTRIBUTE_CREATION_RULES } from '../rules';
import type { AttributeKey } from '../types';

export interface AttributeBudget {
  pointsAvailable: number;
  pointsUsed: number;
  remaining: number;
  zeroedCount: number;
  isValid: boolean;
}

export function computeAttributeBudget(attributes: Record<AttributeKey, number>): AttributeBudget {
  const values = Object.values(attributes);
  const zeroedCount = values.filter((v) => v === 0).length;
  const bonusPoints = zeroedCount >= 1 ? ATTRIBUTE_CREATION_RULES.zeroOutBonus : 0;
  const pointsAvailable = ATTRIBUTE_CREATION_RULES.pointPool + bonusPoints;
  const pointsUsed = values.reduce((sum, v) => sum + Math.max(0, v - ATTRIBUTE_CREATION_RULES.base), 0);
  const remaining = pointsAvailable - pointsUsed;
  const withinMax = values.every((v) => v <= ATTRIBUTE_CREATION_RULES.maxAtCreation);
  const isValid = remaining === 0 && zeroedCount <= 1 && withinMax;
  return { pointsAvailable, pointsUsed, remaining, zeroedCount, isValid };
}
