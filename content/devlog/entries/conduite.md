---
title: conduite
date: '2026-07-12'
section: mecanicas/criacao de personagem/classes
sourceNote: mecanicas/criacao de personagem/classes/conduite.md
---
Avatares das forças naturais, capazes de moldar o campo de batalha como um fenômeno climático vivo.

![classes_conduite.webp](content/devlog/attachments/classes_conduite.webp)

# Habilidades

> [!info] Sugestão de habilidades (rascunho, revisar)
> Habilidades propostas a partir do conceito da classe e do quadro (Excalidraw) abaixo. Removi "Magia Maleável" e "Sintonia Elemental" — pelo texto, elas parecem ter sido coladas da página do Apotecário por engano (mesmo template de elixires e de efígie/boneca vodu, sem nenhuma ligação com clima ou elementos). O quadro original do Conduíte já tinha um esboço de sistema de magia por pontos (elemento + forma + duração + efeito), então usei isso como base da habilidade central. Ajuste nomes, custos e valores numéricos (X) conforme o restante do sistema for fechado. #todo

## Convergência Elemental

#despertar

1 PA. Você canaliza um fenômeno natural, montando-o na hora a partir de quatro escolhas. Você possui um total de Pontos de Convergência por uso igual ao maior entre seu Ímpeto e sua Essência (mínimo 3). Distribua esses pontos entre as categorias abaixo:

**Elemento** (escolha 1)
- 1p — Fogo: causa dano.
- 1p — Terra: concede Redução de Dano temporária a um alvo.
- 1p — Ar: concede deslocamento extra a um alvo.
- 2p — Água: cura um alvo.
- 2p — Raio: concede PA extra a um alvo.
- 2p — Areia: aplica Ruína ao próximo teste do alvo.
- 2p — Gelo: aplica um stack de Lentidão.
- 3p — Lava: causa dano e cria uma área de Terreno Difícil que continua causando dano de Fogo.

**Forma** (escolha 1)
- 1p — Tiro: atinge 1 alvo em [alcance médio](#/devlog/entry/alcances).
- 2p — Cone: atinge todos os alvos em uma área em cone de [alcance curto](#/devlog/entry/alcances).

**Duração** (escolha 1)
- 1p — Instantâneo: o efeito se resolve imediatamente.
- 2p — Cena: o efeito persiste, como uma condição ou uma zona, até o fim da cena.

**Efeito adicional** (opcional)
- 2p — Cria Terreno Difícil na área.
- 3p — Cria uma explosão que empurra as criaturas atingidas uma distância **Baixa**.

Você não pode repetir a mesma combinação de Elemento + Forma na mesma cena — a segunda tentativa falha automaticamente. Isso representa a natureza instável e irrepetível dos fenômenos que você canaliza.

---

## Leitura do Tempo

#rank_f

Passivo. Você sente mudanças climáticas e fenômenos naturais antes que aconteçam. Receba +1 Fortuna em testes de Natural, Percepção e Rastreamento relacionados a clima ou terreno, e nunca é pego de surpresa por fenômenos naturais — tempestades, terremotos, avalanches e afins.

---

## Presença Tempestuosa

#rank_d

Passivo. Você pode alterar sutilmente a temperatura, a umidade, a luminosidade ou a pressão do ar em [alcance curto](#/devlog/entry/alcances) — o suficiente para um trovão distante, um vento repentino ou uma garoa fina, sem efeito mecânico direto.

Uma vez por cena, use esse efeito a seu favor: você ou um aliado em alcance curto recebe +1 Fortuna em um teste de [Intimidação](#/devlog/entry/pericias) ou [Performance](#/devlog/entry/pericias).

---

## Ressonância Selvagem

#rank_b

Passivo. Sempre que usar Convergência Elemental gastando o número máximo de Pontos de Convergência disponíveis, receba +2 Pontos de Convergência na próxima vez que usar a habilidade nesta cena.

---

## Fúria da Natureza

#rank_s

1 PA • 2 PE. Uma vez por descanso longo, desate um fenômeno em escala total, afetando toda a área em [alcance longo](#/devlog/entry/alcances). Escolha uma opção:

- **Incêndio Florestal:** a área pega fogo. Toda criatura nela sofre dano de [Fogo](#/devlog/entry/condicoes) **Médio** e recebe 1 stack de [Sangramento](#/devlog/entry/condicoes) a cada rodada em que permanecer dentro.
- **Terremoto:** todas as criaturas na área são derrubadas e recebem 1 stack de [Lentidão](#/devlog/entry/condicoes).
- **Furacão:** todas as criaturas na área são empurradas uma distância **Média** na direção que você escolher e sofrem Desvantagem em testes de Percepção até o fim da cena.
- **Nevasca:** a área se torna Terreno Difícil e todas as criaturas nela recebem 1 stack de [Congelamento](#/devlog/entry/condicoes).

---

![conduite-1782599615953.webp](content/devlog/attachments/conduite-1782599615953.webp)

> [!note] Transcrição do quadro (Excalidraw)
> **Fenômenos:** forest fire, tsunami, earthquake, hurricane, tempest, volcano, sandstorm, snow.
>
> **Elemento → papel:** fire – damage · water – healing · earth – defense · air – mobility · lightning – speed · lava – (?) · sand – debuff · ice – (?)
>
> **Magia — custo em pontos:**
> - Elemento: 1p fogo · 2p gelo
> - Forma: 1p tiro · 2p cone
> - Duração: 1p instantâneo · 2p cena
> - Efeito: 3p cria explosão · 2p cria terreno difícil
>
> Nota solta no quadro: "pensar em jeito de evitar spam da mesma magia sempre (Clair Obscur)".
