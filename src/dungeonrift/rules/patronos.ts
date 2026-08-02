export interface PatronoOption {
  name: string;
  /** Paraphrased "Efeito:" text from patrono.md, links/formatting stripped. */
  effect: string;
}

/**
 * A freshly-Awakened character only gets the Despertar milestone, which grants exactly 1 Menor
 * Patrono — Maior/Supremo only come later via Rank progression (C-/B-/A- and S-/SS- respectively),
 * so only Menor is offered during creation even though all 3 rosters are populated now.
 */
export const PATRONOS_MENOR: PatronoOption[] = [
  { name: 'Hércules', effect: 'Uma vez por cena, ao acertar um ataque corpo a corpo, cause dano adicional igual ao seu Grau de Ímpeto.' },
  { name: 'Cú Chulainn', effect: 'Enquanto possuir 1 ou mais Ferimentos, seus ataques causam dano Baixo adicional.' },
  { name: 'Beowulf', effect: '+1 Fortuna em testes de ataque contra criaturas de tamanho Grande ou maior.' },
  { name: 'Enkidu', effect: '+1 Fortuna em testes semi-estáticos de Ímpeto; uma vez por cena, ignore completamente a primeira condição que sofreria na cena.' },
  { name: 'Kumbhakarna', effect: 'PV Máximo Baixo adicional; 2 Fortunas em testes para resistir a sono ou exaustão forçados.' },
  { name: 'Sun Wukong', effect: 'Uma vez por cena, transforme-se brevemente: até o fim do turno, receba deslocamento Baixo adicional e 2 Fortunas em testes de Graça.' },
  { name: 'Coyote', effect: 'Uma vez por cena, trate uma falha em um teste como um sucesso com uma complicação (o mestre define a complicação).' },
  { name: 'Anansi', effect: 'Uma vez por cena, repita um teste de Encanto que tenha acabado de falhar.' },
  { name: 'Curupira', effect: 'Uma vez por cena, prenda um inimigo em alcance curto com raízes, aplicando uma quantidade Alta de stacks de Lentidão.' },
  { name: 'Saci-Pererê', effect: 'Uma vez por cena, desapareça de vista por 1 rodada ao se mover, reaparecendo em qualquer ponto do seu deslocamento.' },
  { name: 'Iara', effect: 'Uma vez por cena, force um inimigo em alcance curto a um teste de Essência ou ele não pode atacar você até o fim do turno dele.' },
  { name: 'A Esfinge de Tebas', effect: 'Uma vez por cena, force um inimigo a um teste de Astúcia ou ele recebe 1 Ruína em todos os testes até o fim do turno dele.' },
  { name: 'Eco', effect: 'Uma vez por cena, repita um som fazendo-o parecer vir de qualquer ponto em alcance médio.' },
  { name: 'Puck', effect: 'Uma vez por cena, force um inimigo em alcance curto a uma risada incontrolável — ele perde a próxima Reação disponível.' },
  { name: 'Baba Yaga', effect: 'Uma vez por cena, escolha um Traço; se um inimigo falhar num teste que use esse Traço, ele recebe 1 Ruína no próximo teste.' },
  { name: 'Cérbero', effect: 'Enquanto vigiar uma passagem ou porta, você nunca é pego de surpresa ali, e recebe +1 Fortuna em testes de Instinto.' },
];

export const PATRONOS_MAIOR: PatronoOption[] = [
  { name: 'Zeus', effect: 'Uma vez por cena, cause dano Alto de Raio adicional em um ataque.' },
  { name: 'Ísis', effect: 'Uma vez por cena, repita uma cura já realizada nesta cena, sem gastar recursos adicionais.' },
  { name: 'Odin', effect: 'Uma vez por sessão, sacrifique PV à sua escolha para obrigar o mestre a responder com sinceridade sobre a cena atual.' },
  { name: 'Amaterasu', effect: 'Você e aliados em alcance curto recebem +1 Fortuna contra Medo ou escuridão sobrenatural; uma vez por cena, dissipe escuridão sobrenatural em alcance médio.' },
  { name: 'Indra', effect: 'Seus ataques mágicos à distância causam dano Médio de Raio adicional.' },
  { name: 'Marduk', effect: 'Uma vez por cena, contra uma criatura Enorme ou maior, seu ataque ignora Redução de Dano completamente.' },
  { name: 'Shangó', effect: 'Uma vez por cena, ao acertar um ataque, force o alvo a um teste de Ímpeto ou receba 2 Ruínas no próximo teste.' },
  { name: 'Perun', effect: '+1 Fortuna em testes de ataque sempre que estiver chovendo ou houver tempestade na cena.' },
  { name: 'Huitzilopochtli', effect: 'Sempre que reduzir um inimigo a 0 PV, recupere 1 PA imediatamente.' },
  { name: 'Inti', effect: 'Ao concluir um descanso curto, cure PV adicionais num aliado iguais ao dobro do seu Rank atual.' },
  { name: 'Tangaroa', effect: 'Uma vez por cena, force uma criatura em alcance médio a um teste de Ímpeto ou seja puxada uma distância Baixa em sua direção.' },
  { name: 'Anu', effect: 'Uma vez por sessão, pergunte ao mestre as verdadeiras intenções de um NPC presente na cena.' },
  { name: 'Ra', effect: 'Uma vez por descanso longo, ganhe todos os benefícios de um descanso longo mesmo sem descansar de fato.' },
  { name: 'Tlaloc', effect: 'Uma vez por cena, crie uma chuva torrencial em alcance curto que aplica 1 stack de Lentidão em todos os inimigos dentro dela.' },
];

export const PATRONOS_SUPREMO: PatronoOption[] = [
  { name: 'Caos', effect: 'Uma vez por sessão, force o mestre a conceder uma mudança pequena e razoável nas circunstâncias atuais da cena.' },
  { name: 'Ymir', effect: 'PV Máximo Médio permanente adicional; ao sofrer um Ferimento Fatal, deixe uma marca permanente à sua escolha na área ao redor.' },
  { name: 'Pangu', effect: 'Uma vez por sessão, crie uma divisão física instantânea em qualquer ponto até alcance longo.' },
  { name: 'Purusha', effect: 'Uma vez por sessão, ao ser reduzido a 0 PV, distribua PV iguais ao dano que sofreria entre até 3 aliados em alcance longo.' },
  { name: 'Atum', effect: 'Uma vez por sessão, crie um item mundano (não mágico) do nada, de qualquer tamanho que caiba em suas mãos.' },
  { name: 'Tiamat', effect: 'Uma vez por cena, assuma um aspecto draconiano: dano Alto adicional em ataques, mas 1 Ruína em testes de Defesa até o fim do turno.' },
  { name: 'Izanagi', effect: 'Uma vez por sessão, remova todas as condições e Ferimentos temporários de si mesmo instantaneamente.' },
  { name: 'Ometeotl', effect: 'Uma vez por cena, escolha entre dano Alto adicional ou Redução de Dano Média até o início do seu próximo turno.' },
  { name: 'Olodumare', effect: 'Uma vez por sessão, repita qualquer habilidade de um Patrono Menor ou Maior já usada nesta cena, sem gastar seu uso novamente.' },
  { name: 'Papatūānuku', effect: 'Uma vez por cena, cure a si mesmo ou um aliado em contato com o solo em quantidade igual ao dobro do seu Rank, e remova 1 stack de condição.' },
];
