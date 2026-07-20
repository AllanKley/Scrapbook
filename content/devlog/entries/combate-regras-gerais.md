---
title: combate   regras gerais
date: '2026-07-20'
section: mecanicas
sourceNote: mecanicas/combate - regras gerais.md
---
#combate

A maior parte das regras de combate segue as regras de D&D, com algumas modificações e adições. Sempre que uma regra não for mencionada neste documento, utilize a regra correspondente de D&D sem alterações.

---

# Escala de Efeito (valores em aberto)
#todo

> [!info] Por que labels em vez de números
> Praticamente nenhum número de dano, cura, bônus ou penalidade neste sistema foi balanceado e finalizado ainda — nem os que já aparecem escritos como um valor específico (ex: "+2 RD", "1d6 de dano"). Pra deixar isso visualmente claro e fácil de ajustar depois, todo efeito ainda não-finalizado usa uma das labels abaixo em vez de um número ou de um "X" solto.
>
> Essa é a mesma convenção que [Dano](#/devlog/entry/armas) de arma, [Redução de Dano](#/devlog/entry/armaduras) e [Usos](#/devlog/entry/escudos) de escudo já usavam — só está sendo estendida pro resto do sistema (habilidades de Linhagem, Domínio, Patrono, Infusões, Condições) pra tudo ficar consistente.

Use sempre uma destas quatro labels para qualquer dano, cura, bônus, penalidade, Redução de Dano, Pontos de Vida concedidos ou distância de deslocamento que ainda não tenha um número final:

| Label | Uso típico |
| --- | --- |
| **Baixo** | Um efeito coadjuvante — um empurrão pequeno, um bônus discreto, dano incidental. |
| **Médio** | O efeito padrão de uma habilidade — o "meio de tabela" na maioria dos casos. |
| **Alto** | Um efeito que define a habilidade — o motivo pelo qual alguém escolheria essa opção. |
| **Extremo** | Reservado para habilidades de Rank S, Primordial, ou capstones — o teto do sistema. |

**O que continua com números reais, sem virar label:**
- **[Alcances](#/devlog/entry/alcances)** — as categorias de alcance já vieram de medição direta e não mudam.
- **Custos ou ganhos de PA** — já são pequenos e estruturais (interagem com [Ritmo de Combate](#ritmo-de-combate) diretamente), então continuam como números fixos.
- **Bônus e penalidades em Fortuna/Ruína** — já são valores discretos definidos pela própria mecânica de [Agouro](#/devlog/entry/testes-de-pericias) (rolar 1 dado extra por ponto), não uma questão de balanceamento de poder.
- **Frequência de uso** ("1x por cena", "2x por descanso longo") — é uma decisão de estrutura da habilidade, não uma questão de balanceamento de poder.

---

# Iniciativa

A forma como a primeira rodada de combate se organiza depende de como o combate começou. Existem duas situações possíveis: **Combate Planejado** e **Emboscada**.

Em ambos os casos, assim que a ordem entre os personagens dos jogadores é definida pela primeira vez, ela se mantém fixa até o fim do combate.

## Combate Planejado

Quando são os próprios jogadores que decidem iniciar o combate — atacando de propósito, fechando o cerco, entrando em uma sala já sabendo o que vão enfrentar — **os personagens dos jogadores sempre agem primeiro**.

A ordem de ação entre eles é de escolha livre do grupo. As criaturas controladas pelo mestre agem depois, na ordem que ele preferir.

## Emboscada

Quando o grupo é pego de surpresa, **as criaturas do mestre agem primeiro**.

Antes de qualquer ação dos jogadores, cada personagem realiza um teste de [Reflexo](#/devlog/entry/pericias):

- **Sucesso:** o personagem age normalmente na primeira rodada, depois das criaturas.
- **Falha:** o personagem perde a primeira rodada de combate.

A partir da **segunda rodada**, todos os personagens passam a agir na ordem que preferirem.

---

# Penalidade de Peso

> [!todo] Valores em aberto
> As labels abaixo (veja [Escala de Efeito](#escala-de-efeito-valores-em-aberto)) ainda precisam virar números reais de penalidade. #todo

Diversos fatores podem impor **Penalidade de Peso**, como armaduras, escudos, mochilas carregadas ou até mesmo certos efeitos mágicos. Cada item que impõe penalidade já vem marcado com um dos dois níveis abaixo — **Leve** ou **Severa** — ou com **Nenhuma**, se não impuser penalidade alguma.

Existem apenas dois níveis de Penalidade de Peso. Para saber qual afeta seu personagem a qualquer momento, olhe para o item mais pesado entre tudo que está carregando (equipado ou nos slots de acesso rápido) e aplique **apenas** a penalidade dele.

> As penalidades **não se somam**. Carregar um item de penalidade Severa junto com um de penalidade Leve? Vale a Severa. Dois itens de penalidade Leve? Vale a Leve. Só a pior penalidade entre os itens carregados conta.

## Penalidade Leve

- Penalidade **Baixa** em todos os testes baseados em [Graça](#/devlog/entry/tracos).

## Penalidade Severa

- `-1 PA` por turno.
- Penalidade **Média** em todos os testes baseados em [Graça](#/devlog/entry/tracos).
- Penalidade **Média** de Movimento por turno.

---

# Ritmo de Combate

Repetir a mesma ação diversas vezes no mesmo turno exige um esforço crescente.

Toda ação possui um **custo inicial em PA**. Sempre que a mesma ação for utilizada novamente durante o mesmo turno, seu custo **dobra**.

Essa regra se aplica a qualquer ação ou habilidade, exceto quando sua descrição indicar o contrário.

No início do próximo turno, todos os custos retornam ao valor inicial.

> Essa regra incentiva o uso de diferentes ações e torna o combate mais dinâmico.

---

# Ações de Combate

As ações básicas de combate (Atacar, Defender, Esquivar, Mover-se) foram centralizadas em [tipos de acoes](#/devlog/entry/tipos-de-acoes), já que também eram referenciadas espalhadas em [armas](#/devlog/entry/armas) e [escudos](#/devlog/entry/escudos).
