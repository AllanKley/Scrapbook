---
title: tipos de acoes
date: '2026-07-20'
section: mecanicas
sourceNote: mecanicas/tipos de acoes.md
---
Este documento reúne dois jeitos diferentes de classificar uma ação: **por função** (o que ela faz — atacar, defender, esquivar, mover-se) e **por circunstância** (planejada ou reativa — se dá tempo de receber ajuda). São eixos independentes: um Ataque, por exemplo, normalmente é uma Ação Reativa dentro de combate, mas pode virar Planejada em uma emboscada bem preparada.

---
# Ações Planejadas e Reativas

Nem todas as ações acontecem nas mesmas circunstâncias. Algumas podem ser cuidadosamente preparadas, enquanto outras exigem decisões instantâneas.

Essa diferença determina se os aliados podem ou não ajudar na ação.

---

## Ação Planejada

Uma **Ação Planejada** acontece quando o personagem possui tempo para pensar, se preparar ou coordenar seus esforços com o grupo.

Nessas situações, cada aliado presente que ajudar de forma significativa concede **1 Fortuna** ao teste do personagem que realiza a ação (até um limite a critério do mestre).

> [!info] Sem Pontos de Superação
> Este bônus antes passava por um recurso chamado "Pontos de Superação", cortado do sistema. Ajuda em Ações Planejadas agora concede Fortuna diretamente, sem pool de pontos.

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

# Ações Básicas

Toda ficha depende de um punhado de ações que aparecem em praticamente qualquer cena — combate, exploração ou não. Em vez de repetir a explicação de cada uma em toda página que a menciona (arma, escudo, etc.), elas estão centralizadas aqui.

## Atacar
#combate

Realizar um **Ataque** é uma ação que custa **2 PA**.

Para atacar, gaste o custo acima e realize um [Teste Simples](#/devlog/entry/testes-de-pericias) usando a Perícia e o Traço indicados na sua arma (veja [Perícia e Traço](#/devlog/entry/equipamentos)).

> [!info] Não existe mais Defesa passiva
> Um ataque não precisa superar nenhum valor fixo do alvo. Se o alvo não reagir de nenhuma forma, o ataque **acerta automaticamente** — pule direto para a rolagem de dano. A única forma de evitar um ataque é o próprio alvo gastar uma reação para isso, usando [Defender](#defender) (com escudo) ou [Esquivar](#esquivar) (sem escudo). Só quando o alvo reage é que o teste de ataque acima passa a valer, como um dos lados de um [Teste Oposto](#/devlog/entry/testes-de-pericias).

### Acerto Crítico (dado explosivo)
#duvida #rascunho

> [!todo] Ainda não validado em mesa
> Ideia nova, marcada para análise: pode se provar forte ou fraca demais dependendo do tipo de dado usado no dano de cada arma. Revisar depois de alguns combates de teste. #duvida #todo

Sempre que um dado de dano rolar seu valor máximo, role-o novamente e some o resultado ao total — o dado **"explode"**. Caso a nova rolagem também role o valor máximo, ele explode de novo, sem limite teórico de repetições.

## Defender
#combate

Ação **exclusiva de quem estiver com um [Escudo](#/devlog/entry/escudos) equipado**: gaste **1 PA** para tentar bloquear um ataque contra você.

Para isso, faça um [Teste Oposto](#/devlog/entry/testes-de-pericias) contra o teste de ataque do inimigo, usando a **Perícia e o Traço do seu escudo** — cada escudo define os seus próprios, e eles variam de escudo para escudo (um escudo pesado pode usar Resistência e Ímpeto, um escudo mágico pode usar Estabilidade e Essência, etc.). Veja [escudos](#/devlog/entry/escudos) para os valores de cada categoria.

- **Sucesso:** o dano do ataque é reduzido a **0**.
- **Falha:** o ataque causa dano normalmente.
- O **1 PA** é gasto independentemente do resultado, e a decisão de defender deve ser tomada **antes de saber quanto dano o ataque causaria**.

Cada escudo possui um número limitado de **Usos** antes de quebrar — veja [escudos](#/devlog/entry/escudos).

## Esquivar
#combate

Alternativa ao [Bloqueio](#defender) para quem não está com um escudo equipado (ou não quer gastar um Uso dele): uma **Reação** que custa **2 PA**.

Faça um [Teste Oposto](#/devlog/entry/testes-de-pericias) de [Evasão](#/devlog/entry/pericias) contra o teste de ataque do inimigo.

- **Sucesso:** o ataque erra completamente.
- **Falha:** o ataque causa dano normalmente.

## Mover-se
#combate

Deslocar-se pelo campo de batalha usando seu Deslocamento não custa PA por si só, mas pode ser limitado por [Penalidade de Peso](#/devlog/entry/combate-regras-gerais) ou por condições como [Imobilização](#/devlog/entry/condicoes) e [Lentidão](#/devlog/entry/condicoes).

Interromper o movimento pra fazer qualquer outra coisa (atacar, usar uma habilidade) é permitido livremente, contanto que o personagem ainda tenha Deslocamento e PA disponíveis para a ação seguinte.
