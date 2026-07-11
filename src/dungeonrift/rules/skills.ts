import type { AttributeKey, SkillKey } from '../types';

export interface SkillDef {
  key: SkillKey;
  label: string;
  attribute: AttributeKey;
}

export const SKILLS: SkillDef[] = [
  // Ímpeto
  { key: 'atletismo', label: 'Atletismo', attribute: 'impeto' },
  { key: 'forca', label: 'Força', attribute: 'impeto' },
  { key: 'intimidacao', label: 'Intimidação', attribute: 'impeto' },
  { key: 'luta', label: 'Luta', attribute: 'impeto' },
  { key: 'resistencia', label: 'Resistência', attribute: 'impeto' },
  // Graça
  { key: 'furtividade', label: 'Furtividade', attribute: 'graca' },
  { key: 'acrobacia', label: 'Acrobacia', attribute: 'graca' },
  { key: 'manejo', label: 'Manejo', attribute: 'graca' },
  { key: 'precisao', label: 'Precisão', attribute: 'graca' },
  // Encanto
  { key: 'persuasao', label: 'Persuasão', attribute: 'encanto' },
  { key: 'enganacao', label: 'Enganação', attribute: 'encanto' },
  { key: 'adestramento', label: 'Adestramento', attribute: 'encanto' },
  { key: 'performance', label: 'Performance', attribute: 'encanto' },
  { key: 'conduta', label: 'Conduta', attribute: 'encanto' },
  // Astúcia
  { key: 'natural', label: 'Natural', attribute: 'astucia' },
  { key: 'ilegal', label: 'Ilegal', attribute: 'astucia' },
  { key: 'tecnologico', label: 'Tecnológico', attribute: 'astucia' },
  { key: 'historico', label: 'Histórico', attribute: 'astucia' },
  { key: 'investigacao', label: 'Investigação', attribute: 'astucia' },
  // Instinto
  { key: 'percepcao', label: 'Percepção', attribute: 'instinto' },
  { key: 'reflexo', label: 'Reflexo', attribute: 'instinto' },
  { key: 'rastreamento', label: 'Rastreamento', attribute: 'instinto' },
  { key: 'intuicao', label: 'Intuição', attribute: 'instinto' },
  // Essência
  { key: 'canalizacao', label: 'Canalização', attribute: 'essencia' },
  { key: 'ressonancia', label: 'Ressonância', attribute: 'essencia' },
  { key: 'sutileza', label: 'Sutileza', attribute: 'essencia' },
  { key: 'estabilidade', label: 'Estabilidade', attribute: 'essencia' },
];

export const TRAINING_TIER_DICE: Record<'iniciante' | 'intermediario' | 'avancado' | 'elite', string> = {
  iniciante: 'd4',
  intermediario: 'd6',
  avancado: 'd8',
  elite: 'd10',
};

/** All skills start at iniciante; this many get promoted to intermediário at creation (before Conexões bonuses). */
export const BASE_SKILL_PROMOTIONS_AT_CREATION = 5;
