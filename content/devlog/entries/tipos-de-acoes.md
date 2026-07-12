---
title: tipos de acoes
date: '2026-07-12'
section: mecanicas
sourceNote: mecanicas/tipos de acoes.md
---
Este documento reúne dois jeitos diferentes de classificar uma ação: **por função** (o que ela faz — atacar, defender, esquivar, mover-se) e **por circunstância** (planejada ou reativa — se dá tempo de receber ajuda). São eixos independentes: um Ataque, por exemplo, normalmente é uma Ação Reativa dentro de combate, mas pode virar Planejada em uma emboscada bem preparada.

---

# Ações Básicas

Toda ficha depende de um punhado de ações que aparecem em praticamente qualquer cena — combate, exploração ou não. Em vez de repetir a explicação de cada uma em toda página que a menciona (arma, escudo, etc.), elas estão centralizadas aqui.

## Atacar
#combate

Realizar um **Ataque** é uma ação que custa **1 PA**.

Para atacar, gaste o custo acima e realize um [Teste Simples](#/devlog/entry/testes-de-pericias) usando a Perícia e o Atributo indicados na sua arma (veja [Perícia e Atributo](#/devlog/entry/equipamentos)). O resultado precisa **superar a Defesa passiva do alvo** para o ataque acertar.

> [!todo] Defesa ainda não foi definida
> "Defesa passiva" é usada aqui como o valor que o teste de ataque precisa superar, mas nenhuma página define como calculá-la — veja a nota equivalente em [Recursos Iniciais](#/devlog/entry/criacao-de-personagem). #todo

Se o ataque acertar, o alvo ainda pode tentar evitar o dano antes que ele seja aplicado — veja [Defender](#defender) e [Esquivar](#esquivar) abaixo.

## Defender
#combate

Se estiver com um [Escudo](#/devlog/entry/escudos) equipado, você pode gastar **1 PA** para tentar **bloquear** um ataque contra você.

Para isso, faça um **teste do atributo do escudo** contra o **teste de ataque do inimigo** ([Teste Oposto](#/devlog/entry/testes-de-pericias)).

- **Sucesso:** o dano do ataque é reduzido a **0**.
- **Falha:** o ataque causa dano normalmente.
- O **1 PA** é gasto independentemente do resultado, e a decisão de defender deve ser tomada **antes de saber quanto dano o ataque causaria**.

Cada escudo possui um número limitado de **Usos** antes de quebrar — veja [escudos](#/devlog/entry/escudos).

## Esquivar
#combate

Alternativa ao [Bloqueio](#defender) para quem não está com um escudo equipado (ou não quer gastar um Uso dele): uma **Reação** que custa **2 PA**.

Faça um [Teste Oposto](#/devlog/entry/testes-de-pericias) de [Reflexo](#/devlog/entry/pericias) contra o teste de ataque do inimigo.

- **Sucesso:** o ataque erra completamente.
- **Falha:** o ataque causa dano normalmente.

> [!todo] Relação com Evasão/Defesa
> Isso cobre a ação de esquivar em si, mas o sistema ainda não define um valor de "Evasão" calculável separadamente — veja a mesma pendência em [Atacar](#atacar). #todo

## Mover-se
#combate

Deslocar-se pelo campo de batalha usando seu Movimento não custa PA por si só, mas pode ser limitado por [Penalidade de Peso](#/devlog/entry/combate-regras-gerais) ou por condições como [Imobilização](#/devlog/entry/condicoes) e [Lentidão](#/devlog/entry/condicoes).

Interromper o movimento pra fazer qualquer outra coisa (atacar, usar uma habilidade) é permitido livremente, contanto que o personagem ainda tenha Movimento e PA disponíveis para a ação seguinte.

---

# Ações Planejadas e Reativas

Nem todas as ações acontecem nas mesmas circunstâncias. Algumas podem ser cuidadosamente preparadas, enquanto outras exigem decisões instantâneas.

Essa diferença determina se os aliados podem ou não ajudar na ação.

---

## Ação Planejada

Uma **Ação Planejada** acontece quando o personagem possui tempo para pensar, se preparar ou coordenar seus esforços com o grupo.

Nessas situações, aliados presentes podem contribuir utilizando seus **Pontos de Superação**.

Cada **Ponto de Superação** gasto por um aliado concede **+1** ao teste do personagem que realiza a ação.

Esse bônus representa planejamento, cooperação e preparação antes da execução da tarefa.

### Exemplos
- Arrombar uma porta enquanto os aliados ajudam.
- Convencer um nobre após o grupo reunir argumentos.
- Preparar uma emboscada.
- Investigar uma biblioteca durante várias horas.
- Construir um acampamento seguro.

---

## Ação Reativa

Uma **Ação Reativa** acontece quando o personagem precisa agir imediatamente em resposta a um acontecimento inesperado.

Nessas situações, não há tempo para planejamento nem para receber ajuda dos aliados.

O personagem resolve a ação utilizando apenas seus próprios recursos.

### Exemplos

- Desviar de uma armadilha.
- Agarrar alguém que está caindo.
- Saltar para evitar uma explosão.
- Reagir a uma emboscada.
- Defender-se de um ataque inesperado.
