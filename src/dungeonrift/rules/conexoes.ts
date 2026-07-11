import type { ConexoesTier } from '../types';

export interface ConexoesDef {
  tier: ConexoesTier;
  label: string;
  yearsLabel: string;
  /**
   * Bonus skills promotable to Intermediário, granted by guild tenure.
   * Source lists "1/3/4/5/5" against the 5 tiers in this same order (Externo..Formado) —
   * mapped positionally here. Treat as a documented assumption, not settled rule text:
   * the Conexões system itself is flagged "#adaptado #revisar" in the source vault.
   */
  bonusSkillPromotions: number;
}

export const CONEXOES: ConexoesDef[] = [
  { tier: 'externo', label: 'Externo', yearsLabel: 'nunca entrou na guilda', bonusSkillPromotions: 1 },
  { tier: 'novato', label: 'Novato', yearsLabel: '1–2 anos', bonusSkillPromotions: 3 },
  { tier: 'membro', label: 'Membro', yearsLabel: '3–4 anos', bonusSkillPromotions: 4 },
  { tier: 'veterano', label: 'Veterano', yearsLabel: '5–7 anos', bonusSkillPromotions: 5 },
  { tier: 'formado', label: 'Formado', yearsLabel: '8+ anos', bonusSkillPromotions: 5 },
];
