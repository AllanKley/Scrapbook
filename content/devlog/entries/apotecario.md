---
title: apotecario
date: '2026-07-12'
section: mecanicas/criacao de personagem/classes
sourceNote: mecanicas/criacao de personagem/classes/apotecario.md
---
Alquimistas do campo de batalha que manipulam vida, toxinas e flora, sempre equilibrando poder com instabilidade.

![classes_apotecario.webp](content/devlog/attachments/classes_apotecario.webp)

# Habilidades

> [!info] Sugestão de habilidades (rascunho, revisar)
> Habilidades propostas a partir das ideias já listadas na página (Bolsa de Poções, Boneca Voodoo e Imunidade Cáustica). Preenchi os efeitos que estavam em aberto e encaixei cada ideia num rank. Ajuste nomes, custos e valores numéricos (X) conforme o restante do sistema for fechado. #todo

## Bolsa de Poções

#despertar

Ao concluir um descanso longo, ou gastando 10 minutos de preparo, você produz uma quantidade de Elixires Voláteis igual ao seu atributo de Astúcia (mínimo 2), escolhidos livremente entre os tipos abaixo. Elixires não utilizados perdem o efeito ao final do dia.

Consumir ou aplicar um Elixir custa 1 PA. Podem ser bebidos por você, administrados em um aliado em [alcance de toque](#/devlog/entry/alcances), ou arremessados em um inimigo em [alcance curto](#/devlog/entry/alcances).

- **Elixir de Vigor:** cura PV em uma quantidade **Média**.
- **Elixir Corrosivo:** causa dano de ácido **Médio**; se arremessado contra uma armadura ou escudo, causa dano adicional a ele.
- **Elixir Estabilizante:** remove 1 condição.
- **Elixir Selvagem:** concede um bônus **Baixo** no próximo teste ou rolagem de dano do alvo.
- **Elixir Tóxico:** aplica 1 stack de Veneno.

Elixires Voláteis não utilizados também podem ser vendidos: cada um vale metade do custo em Ecos de uma poção equivalente.

---

## Imunidade Cáustica

#rank_f

Passivo. Você é imune a dano de veneno e ácido.

---

## Boneca Vodu

#rank_d

1 PA • 1 PE. Preparação: 10 minutos. Alcance: médio. Alvo: 1 pessoa. Duração: sustentada. Requisito: 1 objeto que pertence ao alvo.

Usando um objeto que pertence ao alvo, você produz uma efígie com a qual, enquanto estiver em alcance dele, pode exercer uma das influências abaixo a cada rodada. O alvo pode fazer um teste de Intuição ou Ressonância (o que for maior) contra a sua Sutileza para perceber a influência — caso perceba, saberá que você o estava manipulando.

- **Dor Simpática:** o alvo sofre dano **Médio**.
- **Pavor Repentino:** o alvo recebe 1 Ruína no próximo teste que realizar.
- **Língua Presa:** o alvo não consegue dizer mais que poucas palavras até o início do seu próximo turno.

---

## Toxina Reversa

#rank_b

Passivo. Sempre que aplicar uma condição (Veneno, Sangramento, Congelamento etc.) em um inimigo através de uma de suas habilidades, você pode optar por sofrer metade do efeito daquela condição você mesmo. Se fizer isso, o inimigo sofre o dobro do efeito normal.

---

## Detonação Alquímica

#rank_s

1 PA • 2 PE. Gaste todos os Elixires Voláteis que ainda possui. Para cada um, escolha um dos efeitos da Bolsa de Poções e aplique-o imediatamente, distribuindo os efeitos entre até 3 alvos em [alcance médio](#/devlog/entry/alcances).
