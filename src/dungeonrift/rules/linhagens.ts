import type { LinhagemKey } from '../types';

/** Ranks at which a Linhagem unlocks an ability, per linhagem.md. */
export type LinhagemAbilityRank = 'despertar' | 'f' | 'd' | 'b' | 's';

export const LINHAGEM_ABILITY_RANKS: LinhagemAbilityRank[] = ['despertar', 'f', 'd', 'b', 's'];

export const LINHAGEM_ABILITY_RANK_LABELS: Record<LinhagemAbilityRank, string> = {
  despertar: 'Despertar',
  f: 'Rank F',
  d: 'Rank D',
  b: 'Rank B',
  s: 'Rank S',
};

export interface LinhagemAbility {
  rank: LinhagemAbilityRank;
  name: string;
  /** Short paraphrase — the full text lives in the linked devlog entry. */
  summary: string;
}

export interface LinhagemDef {
  key: LinhagemKey;
  label: string;
  concept: string;
  /** Slug of the full write-up in content/devlog/entries/ — link out rather than duplicating ability text here. */
  devlogSlug: string;
  status: 'completa' | 'revisar';
  abilities: LinhagemAbility[];
}

export const LINHAGENS: LinhagemDef[] = [
  {
    key: 'ceifador',
    label: 'Ceifador',
    concept: 'senhor da morte e das almas, transforma corpos e energia vital em poder',
    devlogSlug: 'ceifador',
    status: 'completa',
    abilities: [
      { rank: 'despertar', name: 'Cortejo Fúnebre', summary: 'invoca Almas que bloqueiam ataques contra você ou aliados ao serem sacrificadas.' },
      { rank: 'f', name: 'Memórias Póstumas', summary: 'ao tocar uma criatura morta, vê um fragmento de seus últimos momentos e descobre como ela morreu.' },
      { rank: 'd', name: 'Absorção de Energia', summary: '1 PA: absorve uma Alma invocada em alcance de toque para recuperar PV Baixo.' },
      { rank: 'b', name: 'Alimentado pela Dor', summary: 'a cada Ferimento sofrido, seu próximo ataque causa dano Baixo adicional, cumulativo.' },
      { rank: 's', name: 'Sacrifício Aproveitado', summary: 'contra-ataca sem gastar PA um inimigo que destruiu uma de suas Almas.' },
    ],
  },
  {
    key: 'espectro',
    label: 'Espectro',
    concept: 'predador tático que caça um único alvo por vez',
    devlogSlug: 'espectro',
    status: 'completa',
    abilities: [
      { rank: 'despertar', name: 'Sombra Viva', summary: 'controla sua própria sombra para diversos efeitos táticos em alcance curto.' },
      { rank: 'f', name: 'Aura de Terror', summary: '+1 Fortuna em testes para intimidar alguém.' },
      { rank: 'd', name: 'Filho da Noite', summary: 'enxerga na escuridão natural e causa dano Médio adicional enquanto estiver nela.' },
      { rank: 'b', name: 'Presença Errante', summary: 'Redução de Dano físico Média; recebe o ritmo de exploração furtivo mesmo em outro ritmo.' },
      { rank: 's', name: 'Bicho-Papão', summary: 'gasta uma alavanca social para mergulhar o alvo num sono profundo com pesadelos.' },
    ],
  },
  {
    key: 'selvagem',
    label: 'Selvagem',
    concept: 'vínculo espiritual com a fauna e totens',
    devlogSlug: 'selvagem',
    status: 'completa',
    abilities: [
      { rank: 'despertar', name: 'Companheiro Animal', summary: 'um companheiro espiritual que se funde a você em combate, concedendo bônus.' },
      { rank: 'f', name: 'Sentidos Apurados', summary: '+1 Fortuna em todos os testes de Instinto.' },
      { rank: 'd', name: 'Compreensão Total', summary: 'o companheiro se comunica mentalmente em alcance médio e executa tarefas complexas.' },
      { rank: 'b', name: 'Instinto Predador', summary: 'seus ataques melhoram contra criaturas de tamanho enorme ou colossal.' },
      { rank: 's', name: 'Vínculo de Alma', summary: 'funde-se com o companheiro quantas vezes quiser, sem limite.' },
    ],
  },
  {
    key: 'oraculo',
    label: 'Oráculo',
    concept: 'domínio da mente e das emoções, guerra psicológica',
    devlogSlug: 'oraculo',
    status: 'completa',
    abilities: [
      { rank: 'despertar', name: 'Cartas do Destino', summary: 'sorteia cartas de efeito a cada descanso longo, cada uma usável uma vez.' },
      { rank: 'f', name: 'Barreira Mental', summary: 'barreira psíquica que conta como um escudo leve usando Essência como traço base.' },
      { rank: 'd', name: 'Pressentimento', summary: 'com ao menos 1 carta em mãos, +1 Fortuna contra emboscadas, armadilhas e surpresa.' },
      { rank: 'b', name: 'Manipular a Sorte', summary: 'a cada rodada, concede +1 Fortuna ou +1 Ruína a um ser à sua escolha.' },
      { rank: 's', name: 'Sabedoria Intuitiva', summary: 'pode usar Instinto no lugar de Astúcia em qualquer teste — você simplesmente sabe.' },
    ],
  },
  {
    key: 'aprimorado',
    label: 'Aprimorado',
    concept: 'controla o ritmo da luta, o que não cai',
    devlogSlug: 'aprimorado',
    status: 'completa',
    abilities: [
      { rank: 'despertar', name: 'Além do Limite', summary: 'gasta PA para acumular dano, deslocamento e RD extras ao custo da própria integridade.' },
      { rank: 'f', name: 'Sexto Sentido', summary: 'seu instinto reage ao perigo antes da sua mente compreendê-lo.' },
      { rank: 'd', name: 'Surto de Energia', summary: 'a dor desperta seu instinto de sobrevivência.' },
      { rank: 'b', name: 'Corpo Blindado', summary: '+1 Fortuna para resistir a efeitos mentais e a condições que afetem seu corpo.' },
      { rank: 's', name: 'Foco Brutal', summary: 'o primeiro ataque que realizar em cada rodada custa 0 PA.' },
    ],
  },
  {
    key: 'malandro',
    label: 'Malandro',
    concept: 'quebra as regras da realidade — caos, ilusão e trapaças',
    devlogSlug: 'malandro',
    status: 'revisar',
    abilities: [
      { rank: 'despertar', name: 'Cartas na Manga', summary: 'rola dados no descanso longo para substituir uma rolagem de teste depois.' },
      { rank: 'f', name: 'Disfarce Perfeito', summary: 'assume a aparência de alguém que observou de perto — rosto, voz e postura.' },
      { rank: 'd', name: 'Ilusão de Bolso', summary: 'cria uma ilusão sensorial do tamanho de uma criatura Média em alcance curto.' },
      { rank: 'b', name: 'Ás na Manga', summary: 'inimigo cujo ataque você anulou com uma Carta recebe +1 Ruína no próximo ataque.' },
      { rank: 's', name: 'Mão Final', summary: 'força uma criatura em alcance médio a repetir um teste e usar o pior resultado.' },
    ],
  },
  {
    key: 'apotecario',
    label: 'Apotecário',
    concept: 'alquimista de campo de batalha (vida/toxinas/flora)',
    devlogSlug: 'apotecario',
    status: 'revisar',
    abilities: [
      { rank: 'despertar', name: 'Bolsa de Poções', summary: 'produz Elixires no descanso longo com efeitos variados (cura, dano ácido).' },
      { rank: 'f', name: 'Imunidade Cáustica', summary: 'imune a dano de veneno e ácido.' },
      { rank: 'd', name: 'Boneca Vodu', summary: 'vincula-se a um alvo por um objeto dele, com efeito sustentado em alcance médio.' },
      { rank: 'b', name: 'Toxina Reversa', summary: 'ao aplicar uma condição num inimigo, pode sofrer metade do efeito para potencializá-la.' },
      { rank: 's', name: 'Detonação Alquímica', summary: 'gasta todos os Elixires de uma vez, distribuindo seus efeitos entre vários alvos.' },
    ],
  },
  {
    key: 'iluminado',
    label: 'Iluminado',
    concept: 'canalizador de luz vital — suporte, restauração e proteção',
    devlogSlug: 'iluminado',
    status: 'revisar',
    abilities: [
      { rank: 'despertar', name: 'Prisma Interior', summary: 'emite um Feixe de luz colorido com efeito à escolha (dano, cura, remover condição, Fortuna).' },
      { rank: 'f', name: 'Extração Cromática', summary: 'suga uma cor da presença de uma criatura, causando um efeito temático até o fim da cena.' },
      { rank: 'd', name: 'Limpeza de Alma', summary: 'remove até 2 condições de um aliado, ou ignora um efeito de Ferimento dele.' },
      { rank: 'b', name: 'Halo Protetor', summary: 'aliados em alcance curto ganham RD Baixa contra dano sobrenatural ou de Essência.' },
      { rank: 's', name: 'Voo de Socorro', summary: 'manifesta asas e move-se instantaneamente até um aliado, estabilizando-o e curando.' },
    ],
  },
  {
    key: 'forjador',
    label: 'Forjador',
    concept: 'engenheiro místico, runas em armas/armaduras',
    devlogSlug: 'forjador',
    status: 'revisar',
    abilities: [
      { rank: 'despertar', name: 'Criação Perfeita', summary: 'grava uma Runa temporária num item com efeito à escolha (dano, alcance, retorno, escuta).' },
      { rank: 'f', name: 'Olhos de Ferreiro', summary: 'identifica material, origem, encantamentos e Infusões de qualquer equipamento.' },
      { rank: 'd', name: 'Reforço Instantâneo', summary: 'restaura 1 Uso de uma armadura ou escudo, ou concede RD Baixa a ele.' },
      { rank: 'b', name: 'Arsenal Vivo', summary: 'mantém Runas ativas simultâneas iguais ao seu Grau de Essência.' },
      { rank: 's', name: 'Golem Provisório', summary: 'transforma um item num Golem Médio que luta ao seu lado até o fim da cena.' },
    ],
  },
  {
    key: 'conduite',
    label: 'Conduíte',
    concept: 'avatar das forças naturais/climáticas',
    devlogSlug: 'conduite',
    status: 'revisar',
    abilities: [
      { rank: 'despertar', name: 'Convergência Elemental', summary: 'monta um efeito elemental customizado combinando elemento, forma, duração e efeito.' },
      { rank: 'f', name: 'Leitura do Tempo', summary: '+1 Fortuna em testes de clima ou terreno; nunca é pego de surpresa por eles.' },
      { rank: 'd', name: 'Presença Tempestuosa', summary: 'altera sutilmente temperatura, umidade, luminosidade ou pressão em alcance curto.' },
      { rank: 'b', name: 'Ressonância Selvagem', summary: 'usar Convergência no máximo concede +2 Pontos de Convergência no uso seguinte.' },
      { rank: 's', name: 'Fúria da Natureza', summary: 'uma vez por descanso longo, desata um fenômeno em escala total em alcance longo.' },
    ],
  },
];
