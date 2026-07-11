---
title: infusoes
date: '2026-07-11'
section: mecanicas
sourceNote: mecanicas/infusoes.md
---
#combate #economia

> [!info] Sugestão de sistema (rascunho, revisar)
> Construído em cima da ideia original: cada [Eco](#/devlog/entry/ecos) carrega um Elemento, refletido na criatura ou local de onde veio. Esses Elementos podem ser usados para Infundir armas (corpo a corpo, à distância e mágicas), armaduras e escudos, e a força da melhoria escala com o tier do Eco gasto (Tênue → Manifesto → Ancestral → Primordial), no mesmo espírito de uma melhoria de ritual Discente/Verdadeiro. Ajuste nomes, números e efeitos conforme o restante do sistema for fechado. #todo

Uma Infusão é o que acontece quando um Eco é consumido para gravar permanentemente um Elemento dentro de um equipamento. Diferente das Runas temporárias do Forjador (veja Forjador), uma Infusão não desaparece — ela se torna parte do item.

---

# Regras Gerais

## Um equipamento, uma Infusão

Um equipamento nunca pode carregar mais de uma Infusão ao mesmo tempo. Para trocar o Elemento ou subir o tier, o item precisa ser **re-infundido**: a Infusão anterior é destruída (o Eco usado nela não é recuperado, refinado ou reembolsado de qualquer forma) e um novo Eco é consumido no processo.

## Processo de Infusão

Infundir um equipamento exige:

- **1 Eco** do Elemento e do tier escolhidos (ele é consumido no processo).
- Um artesão especializado — geralmente ligado a uma Guilda — ou a habilidade **Criação Perfeita** do Forjador, que permite ao próprio personagem realizar Infusões permanentes.
- Tempo de trabalho dedicado (referência: 1 dia por tier de Eco usado).

Artesãos independentes podem exigir mais do que apenas o Eco em troca do serviço — veja [comércio](#/devlog/entry/comercio).

## Requisito para usar um item infundido

Quanto mais forte o Eco usado na Infusão, mais preparado o corpo do usuário precisa estar para sustentá-la sem sofrer as consequências de um contato próximo demais com Essência concentrada.

| Tier do Eco | Requisito mínimo |
| --- | --- |
| Tênue | Ser Despertado (qualquer Despertar) |
| Manifesto | Rank D |
| Ancestral | Rank B |
| Primordial | Rank S |

- **Não-Despertados** que tentem usar um item com qualquer Infusão simplesmente não conseguem ativá-la — a Infusão fica inerte, e o item funciona normalmente, só que sem o efeito do Elemento.
- **Despertados abaixo do Rank exigido** podem usar o item normalmente, mas toda vez que a Infusão seria ativada (mesmo que o efeito específico não dispare por falha na condição de chance), o usuário sofre imediatamente **1 rolagem de Sobrecarga** (veja [Sobrecarga](#/devlog/entry/combate-regras-gerais)), como se tivesse ultrapassado seu Limite de Essência.

Esse requisito e o custo em Ecos são os mesmos para qualquer combinação de Elemento e tipo de item abaixo — só o efeito muda.

---

# Elementos

Cada Eco carrega um dos Elementos abaixo, refletido na criatura ou no local de onde ele foi retirado (veja [Fontes de Ecos](#/devlog/entry/ecos)). A lista foi mantida em 10 Elementos de propósito, cobrindo o essencial sem virar um catálogo infinito.

Cada Elemento oferece uma Infusão diferente para cada tipo de item — **Arma Corpo a Corpo**, **Arma à Distância**, **Arma Mágica**, **Armadura** e **Escudo**. Dentro de cada uma, os quatro tiers de Eco funcionam como camadas de melhoria: **Tênue** é o efeito base, e **Manifesto**, **Ancestral** e **Primordial** vão empilhando efeitos acima dela — cada tier inclui tudo dos tiers anteriores.

---

## Fogo

*Combustão, fúria, destruição total.* **Onde encontrar:** criaturas ígneas, Dungeons vulcânicas, Fraturas como Roma ou o Vale do Nilo.

### Lâmina em Brasa
*Fogo · Arma Corpo a Corpo*

- **Tênue:** acerto tem chance de aplicar 1 stack de [Fogo](#/devlog/entry/condicoes).
- **Manifesto:** causa dano **Médio** de Fogo direto a cada acerto.
- **Ancestral:** a lâmina ilumina em [alcance curto](#/devlog/entry/alcances) e nunca esfria; quem te acerta corpo a corpo sofre dano **Alto** de Fogo.
- **Primordial:** inimigos incendiados por você só apagam as chamas com magia.

### Munição Incendiária
*Fogo · Arma à Distância*

- **Tênue:** acerto tem chance de aplicar 1 stack de Fogo.
- **Manifesto:** a munição perfura e incendeia 1 inimigo atrás do alvo.
- **Ancestral:** os tiros deixam um rastro de fogo no chão (Terreno Difícil por 1 rodada).
- **Primordial:** o rastro de fogo dura até o fim da cena.

### Combustão Arcana
*Fogo · Arma Mágica*

- **Tênue:** seus ataques mágicos que causam dano ignoram Redução de Dano contra Fogo.
- **Manifesto:** dano **Médio** de Fogo adicional, e o próximo ataque mágico após um acerto custa 1 PE a menos.
- **Ancestral:** sempre que sofrer Sobrecarga usando esta arma, receba 1 Fortuna nessa rolagem.
- **Primordial:** uma vez por cena, transforme um ataque mágico em uma explosão de Fogo que atinge todos em [alcance curto](#/devlog/entry/alcances) do alvo.

### Couraça Ígnea
*Fogo · Armadura*

- **Tênue:** reduz à metade o dano de Fogo recebido.
- **Manifesto:** imune ao dano contínuo de Fogo.
- **Ancestral:** quem te acerta corpo a corpo sofre dano **Alto** de Fogo.
- **Primordial:** você e aliados em [alcance de toque](#/devlog/entry/alcances) são imunes a Fogo.

### Escudo em Chamas
*Fogo · Escudo*

- **Tênue:** bloqueio aplica 1 stack de Fogo no atacante.
- **Manifesto:** o bloqueio também causa dano **Médio** de Fogo.
- **Ancestral:** reflete metade do dano bloqueado como dano de Fogo.
- **Primordial:** o reflexo também aplica 2 stacks de Fogo.

---

## Gelo

*Controle, imobilidade, frio absoluto.* **Onde encontrar:** a Antártida, criaturas de nevasca, Dungeons congeladas.

### Fio de Gelo
*Gelo · Arma Corpo a Corpo*

- **Tênue:** acerto tem chance de aplicar 1 stack de [Lentidão](#/devlog/entry/condicoes).
- **Manifesto:** também aplica 1 stack de [Congelamento](#/devlog/entry/condicoes).
- **Ancestral:** acertos críticos Imobilizam o alvo por 1 rodada.
- **Primordial:** o alvo Imobilizado sofre dano **Extremo** ao tentar se mover à força.

### Ponta Congelante
*Gelo · Arma à Distância*

- **Tênue:** acerto tem chance de aplicar 1 stack de Lentidão.
- **Manifesto:** também aplica Congelamento.
- **Ancestral:** cria uma poça de gelo (Terreno Difícil) sob o alvo.
- **Primordial:** a poça de gelo se espalha uma distância **Baixa** por rodada enquanto alguém estiver nela.

### Glacial
*Gelo · Arma Mágica*

- **Tênue:** seus ataques mágicos de Gelo não podem ser resistidos por criaturas com Estabilidade menor que 3.
- **Manifesto:** +1 stack de Congelamento adicional, e o próximo ataque mágico custa 1 PE a menos.
- **Ancestral:** sempre que sofrer Sobrecarga usando esta arma, receba 1 Fortuna nessa rolagem.
- **Primordial:** uma vez por cena, congele instantaneamente um alvo em [alcance médio](#/devlog/entry/alcances) — ele fica Imobilizado e recebe 1 stack de Lentidão, sem teste.

### Manto de Inverno
*Gelo · Armadura*

- **Tênue:** reduz à metade o dano de Gelo recebido.
- **Manifesto:** imune a Lentidão.
- **Ancestral:** quem te acerta corpo a corpo recebe 1 stack de Congelamento.
- **Primordial:** você é imune a Congelamento e Lentidão.

### Muralha de Gelo
*Gelo · Escudo*

- **Tênue:** bloqueio aplica 1 stack de Lentidão no atacante.
- **Manifesto:** o bloqueio também aplica Congelamento.
- **Ancestral:** o atacante fica Imobilizado por 1 rodada em vez de Lento.
- **Primordial:** o atacante Imobilizado também sofre dano **Extremo** de Gelo.

---

## Raio

*Velocidade, choque, reflexos.* **Onde encontrar:** criaturas aladas, tempestades constantes, torres em ruínas.

### Golpe Fulminante
*Raio · Arma Corpo a Corpo*

- **Tênue:** acerto tem chance de aplicar 1 Ruína no próximo teste de Reflexo do alvo.
- **Manifesto:** causa dano **Médio** de Raio direto.
- **Ancestral:** uma vez por turno, seu primeiro ataque não gasta PA.
- **Primordial:** seus ataques sempre agem antes de qualquer outro na rodada.

### Disparo Elétrico
*Raio · Arma à Distância*

- **Tênue:** acerto tem chance de aplicar 1 Ruína no próximo teste de Reflexo do alvo.
- **Manifesto:** o disparo atravessa cobertura leve sem perder força.
- **Ancestral:** o dano salta para 1 inimigo adicional em [alcance curto](#/devlog/entry/alcances) do alvo.
- **Primordial:** o salto entre inimigos não tem limite de alvos.

### Descarga Arcana
*Raio · Arma Mágica*

- **Tênue:** seus ataques mágicos que causam dano recebem um bônus **Baixo** no teste de ataque contra criaturas com armadura ou escudo metálico.
- **Manifesto:** dano **Médio** de Raio adicional, e você recupera 1 PA se o ataque eliminar o alvo.
- **Ancestral:** sempre que sofrer Sobrecarga usando esta arma, receba 1 Fortuna nessa rolagem.
- **Primordial:** uma vez por cena, encadeie um ataque mágico para atingir até 3 alvos em [alcance curto](#/devlog/entry/alcances) entre si.

### Pele Condutora
*Raio · Armadura*

- **Tênue:** reduz à metade o dano de Raio recebido.
- **Manifesto:** imune a [Atordoamento](#/devlog/entry/condicoes) causado por Raio.
- **Ancestral:** você ganha uma Reação adicional por rodada.
- **Primordial:** você ganha uma ação extra na primeira rodada de cada combate.

### Para-raios
*Raio · Escudo*

- **Tênue:** bloqueio concede +1 PA no início do seu próximo turno.
- **Manifesto:** o bloqueio também tenta Atordoar o atacante (teste de Estabilidade).
- **Ancestral:** ao bloquear, você pode se mover instantaneamente uma distância **Alta**.
- **Primordial:** o teste de Estabilidade do atacante sofre uma penalidade **Extrema**.

---

## Terra

*Solidez, resistência, peso.* **Onde encontrar:** cavernas ancestrais, golems, ruínas de impérios de pedra.

### Peso da Montanha
*Terra · Arma Corpo a Corpo*

- **Tênue:** acerto reduz o Movimento do alvo em uma quantidade **Baixa** até o fim do turno dele.
- **Manifesto:** a cada 3 acertos consecutivos no mesmo alvo, [Imobilize](#/devlog/entry/condicoes)-o por 1 rodada.
- **Ancestral:** você não pode ser movido contra sua vontade enquanto empunhar a arma.
- **Primordial:** seus ataques ignoram Redução de Dano de Armadura e Escudo.

### Impacto Sísmico
*Terra · Arma à Distância*

- **Tênue:** acerto reduz o Movimento do alvo em uma quantidade **Baixa** até o fim do turno dele.
- **Manifesto:** o impacto derruba o alvo.
- **Ancestral:** cria uma rachadura permanente no chão (Terreno Difícil).
- **Primordial:** a rachadura pode virar uma fenda que bloqueia passagem até ser destruída.

### Punho de Pedra
*Terra · Arma Mágica*

- **Tênue:** seus ataques mágicos que causam dano ignoram Redução de Dano de Terreno Difícil ou cobertura.
- **Manifesto:** dano **Médio** físico adicional, e o alvo tem o Movimento reduzido em uma quantidade **Baixa** até o fim do turno dele.
- **Ancestral:** sempre que sofrer Sobrecarga usando esta arma, receba 1 Fortuna nessa rolagem.
- **Primordial:** uma vez por cena, erga uma parede de pedra com largura **Extrema**, em [alcance curto](#/devlog/entry/alcances), bloqueando linha de visão e movimento.

### Couraça de Pedra
*Terra · Armadura*

- **Tênue:** concede Redução de Dano físico **Baixa**.
- **Manifesto:** a Redução de Dano físico sobe para **Média**.
- **Ancestral:** você é imune a ser derrubado.
- **Primordial:** ataques contra você têm Desvantagem enquanto você não se mover.

### Bastião Rochoso
*Terra · Escudo*

- **Tênue:** bloqueio impede que você seja empurrado até seu próximo turno.
- **Manifesto:** o atacante é empurrado uma distância **Baixa** ao ser bloqueado.
- **Ancestral:** o empurrão sobe para uma distância **Alta** e aplica 1 stack de Lentidão.
- **Primordial:** o escudo nunca perde Usos ao bloquear dano físico.

---

## Vento

*Mobilidade, evasão, leveza.* **Onde encontrar:** picos de montanha, criaturas aladas, zonas de tempestades constantes.

### Corte do Vendaval
*Vento · Arma Corpo a Corpo*

- **Tênue:** acerto empurra o alvo uma distância **Baixa**.
- **Manifesto:** você pode se mover uma distância **Baixa** de graça após acertar.
- **Ancestral:** uma vez por cena, ignore completamente um ataque de oportunidade.
- **Primordial:** você pode se mover antes e depois de cada ataque sem gastar PA extra.

### Flecha Levada pelo Vento
*Vento · Arma à Distância*

- **Tênue:** acerto empurra o alvo uma distância **Baixa**.
- **Manifesto:** o projétil ignora cobertura leve.
- **Ancestral:** o disparo pode contornar um obstáculo em linha reta.
- **Primordial:** você pode disparar em qualquer direção, mesmo sem linha reta.

### Rajada Arcana
*Vento · Arma Mágica*

- **Tênue:** seus ataques mágicos podem ser feitos a partir de 1 categoria de alcance a mais do que o normal.
- **Manifesto:** acertar um alvo o empurra uma distância **Baixa**, e você pode se mover a mesma distância de graça depois.
- **Ancestral:** sempre que sofrer Sobrecarga usando esta arma, receba 1 Fortuna nessa rolagem.
- **Primordial:** uma vez por cena, um ataque mágico pode ser desviado para atingir um segundo alvo em qualquer lugar do alcance, ignorando obstáculos.

### Manto Etéreo
*Vento · Armadura*

- **Tênue:** remove a Penalidade de Peso desta peça.
- **Manifesto:** deslocamento **Baixo** adicional por rodada.
- **Ancestral:** você ignora Terreno Difícil.
- **Primordial:** uma vez por cena, ganhe uma esquiva total como reação.

### Escudo Aéreo
*Vento · Escudo*

- **Tênue:** bloqueio concede movimento gratuito de distância **Baixa**.
- **Manifesto:** o movimento gratuito sobe para distância **Média**.
- **Ancestral:** você pode trocar de lugar com um aliado adjacente ao bloquear.
- **Primordial:** o movimento gratuito pode ser usado para tirar um aliado do lugar dele.

---

## Veneno

*Decomposição lenta, instabilidade, corrosão.* **Onde encontrar:** pântanos, criaturas tóxicas, mercado negro de Ecos instáveis.

### Lâmina Envenenada
*Veneno · Arma Corpo a Corpo*

- **Tênue:** acerto tem chance de aplicar 1 stack de [Veneno](#/devlog/entry/condicoes).
- **Manifesto:** enquanto o alvo tiver Veneno, curas nele funcionam pela metade.
- **Ancestral:** cada stack de Veneno no alvo também aplica 1 stack de [Corrosão](#/devlog/entry/condicoes) nos equipamentos dele.
- **Primordial:** o alvo com 5 ou mais stacks de Veneno sofre 1 Ferimento automático.

### Ferrão Tóxico
*Veneno · Arma à Distância*

- **Tênue:** acerto tem chance de aplicar 1 stack de Veneno.
- **Manifesto:** o Veneno se espalha para 1 aliado do alvo em [alcance de toque](#/devlog/entry/alcances) dele.
- **Ancestral:** o Veneno só perde stacks por cura ou antídoto, nunca sozinho.
- **Primordial:** o Veneno se espalha em [alcance curto](#/devlog/entry/alcances) ao redor do alvo.

### Praga Arcana
*Veneno · Arma Mágica*

- **Tênue:** seus ataques mágicos que causam dano têm chance de aplicar 1 stack de Veneno.
- **Manifesto:** o Veneno aplicado ignora curas normais enquanto ativo.
- **Ancestral:** sempre que sofrer Sobrecarga usando esta arma, receba 1 Fortuna nessa rolagem.
- **Primordial:** uma vez por cena, transforme um ataque mágico em uma nuvem tóxica que aplica Veneno em todos os inimigos em [alcance curto](#/devlog/entry/alcances) do alvo.

### Pele Curtida
*Veneno · Armadura*

- **Tênue:** reduz à metade o dano de Veneno recebido.
- **Manifesto:** imune a Veneno.
- **Ancestral:** você é imune a Corrosão.
- **Primordial:** criaturas que tentam te envenenar sofrem o próprio veneno de volta.

### Escudo Corrosivo
*Veneno · Escudo*

- **Tênue:** bloqueio aplica 1 stack de Veneno no atacante.
- **Manifesto:** também aplica 1 stack de [Corrosão](#/devlog/entry/condicoes) no equipamento do atacante.
- **Ancestral:** a Corrosão aplicada afeta o dobro (2 Usos ou 2 RD em vez de 1).
- **Primordial:** o atacante sofre o dobro do Veneno que tentou te aplicar.

---

## Sombra

*Medo, escuridão, o que se esconde nela.* **Onde encontrar:** criptas, Zonas sem controle, criaturas noturnas.

### Corte Sombrio
*Sombra · Arma Corpo a Corpo*

- **Tênue:** acerto tem chance de aplicar 1 Ruína no próximo teste de Intimidação ou Medo do alvo contra você.
- **Manifesto:** acerto crítico aplica [Medo](#/devlog/entry/condicoes) no alvo.
- **Ancestral:** enquanto o alvo tiver Medo, empates em testes de ataque contra ele viram sucesso.
- **Primordial:** o Medo aplicado só termina com o fim do combate.

### Tiro nas Trevas
*Sombra · Arma à Distância*

- **Tênue:** acerto tem chance de aplicar 1 Ruína no próximo teste de Intimidação ou Medo do alvo contra você.
- **Manifesto:** o disparo pode ser feito de dentro da escuridão sem revelar sua posição.
- **Ancestral:** inimigos no escuro têm Desvantagem para te notar mesmo após o disparo.
- **Primordial:** você pode atacar a partir de qualquer sombra visível, ignorando alcance normal.

### Véu Negro
*Sombra · Arma Mágica*

- **Tênue:** seus ataques mágicos não revelam sua posição para quem não te enxerga.
- **Manifesto:** acerto crítico aplica Medo no alvo.
- **Ancestral:** sempre que sofrer Sobrecarga usando esta arma, receba 1 Fortuna nessa rolagem.
- **Primordial:** uma vez por cena, desapareça em sombras logo após atacar, ficando oculto até seu próximo ataque.

### Manto das Sombras
*Sombra · Armadura*

- **Tênue:** +1 Fortuna em testes de Furtividade enquanto vestida.
- **Manifesto:** você enxerga no escuro como se fosse luz plena.
- **Ancestral:** uma vez por cena, torne-se invisível por 1 rodada ao entrar em uma sombra.
- **Primordial:** a invisibilidade pode ser mantida enquanto você permanecer parado.

### Escudo Úmbrio
*Sombra · Escudo*

- **Tênue:** bloqueio deixa você oculto até seu próximo ataque.
- **Manifesto:** o oculto dura até o fim da cena ou até você atacar.
- **Ancestral:** o oculto também esconde 1 aliado adjacente.
- **Primordial:** você e o aliado ficam ocultos até qualquer um dos dois atacar.

---

## Luz

*Cura, revelação, verdade.* **Onde encontrar:** templos e santuários intactos, Fraturas ligadas a antigos cultos solares.

### Golpe Radiante
*Luz · Arma Corpo a Corpo*

- **Tênue:** acerto tem chance de remover 1 condição negativa (se o alvo for aliado) ou aplicar [Exposição](#/devlog/entry/condicoes) (se for inimigo).
- **Manifesto:** cura uma quantidade **Média** de PV ao acertar um aliado, ou aplica [Cegueira](#/devlog/entry/condicoes) ao acertar um inimigo.
- **Ancestral:** você pode escolher curar em vez de causar dano ao acertar um aliado adjacente por engano.
- **Primordial:** seus ataques contra criaturas ligadas à Sombra causam o dobro de dano.

### Flecha Solar
*Luz · Arma à Distância*

- **Tênue:** acerto tem chance de remover 1 condição negativa (se o alvo for aliado) ou aplicar Exposição (se for inimigo).
- **Manifesto:** o disparo revela criaturas invisíveis ou ocultas na trajetória.
- **Ancestral:** a revelação dura até o fim da cena para os alvos atingidos.
- **Primordial:** a revelação impede qualquer criatura atingida de ficar invisível ou oculta pelo resto da cena.

### Prece Arcana
*Luz · Arma Mágica*

- **Tênue:** você pode escolher curar em vez de causar dano ao usar esta arma contra um aliado.
- **Manifesto:** cura uma quantidade **Média** de PV extra ao acertar um aliado, ou aplica Cegueira ao acertar um inimigo.
- **Ancestral:** sempre que sofrer Sobrecarga usando esta arma, receba 1 Fortuna nessa rolagem.
- **Primordial:** uma vez por cena, um único ataque mágico pode curar todos os aliados e ferir todos os inimigos em [alcance curto](#/devlog/entry/alcances) simultaneamente.

### Couraça Sagrada
*Luz · Armadura*

- **Tênue:** reduz à metade o dano de origem sobrenatural.
- **Manifesto:** imune a Cegueira e Exposição.
- **Ancestral:** você emite luz em [alcance curto](#/devlog/entry/alcances), cancelando efeitos de Sombra próximos.
- **Primordial:** você e aliados em [alcance curto](#/devlog/entry/alcances) são imunes a Medo e Cegueira.

### Escudo Consagrado
*Luz · Escudo*

- **Tênue:** bloqueio cura uma quantidade **Baixa** de PV de um aliado em [alcance de toque](#/devlog/entry/alcances).
- **Manifesto:** a cura sobe para uma quantidade **Alta** e também remove 1 condição.
- **Ancestral:** a cura também remove 1 Ferimento Leve temporariamente, uma vez por cena.
- **Primordial:** você pode usar o bloqueio como uma cura mesmo sem ser atacado.

---

## Sangue

*Vida, sacrifício, drenagem.* **Onde encontrar:** campos de batalha antigos, criaturas necróticas, Dungeons ligadas a rituais.

### Lâmina Sanguessuga
*Sangue · Arma Corpo a Corpo*

- **Tênue:** acerto tem chance de aplicar 1 stack de [Sangramento](#/devlog/entry/condicoes).
- **Manifesto:** você cura PV igual à metade do dano causado.
- **Ancestral:** matar um inimigo com este ataque reduz em 1 a penalidade de um Ferimento Leve seu.
- **Primordial:** você não pode morrer por Sangramento enquanto empunhar esta arma.

### Ferrão Vital
*Sangue · Arma à Distância*

- **Tênue:** acerto tem chance de aplicar 1 stack de Sangramento.
- **Manifesto:** o Sangramento aplicado se espalha para 1 inimigo adjacente ao alvo.
- **Ancestral:** inimigos sangrando por sua causa recebem Ruína em testes de Resistência.
- **Primordial:** criaturas mortas por este ataque explodem em sangue, causando dano **Extremo** a inimigos em [alcance de toque](#/devlog/entry/alcances).

### Pacto de Sangue
*Sangue · Arma Mágica*

- **Tênue:** você cura PV igual a 1/4 do dano mágico causado por esta arma.
- **Manifesto:** a cura sobe para metade do dano causado.
- **Ancestral:** sempre que sofrer Sobrecarga usando esta arma, receba 1 Fortuna nessa rolagem.
- **Primordial:** uma vez por cena, sacrifique PV seu (até a metade do seu máximo) para causar o dobro desse valor em dano com um único ataque mágico.

### Couraça Viva
*Sangue · Armadura*

- **Tênue:** cura uma quantidade **Baixa** de PV sempre que você sofrer Sangramento.
- **Manifesto:** a cura por Sangramento sobe para uma quantidade **Média**.
- **Ancestral:** uma vez por turno, sofra 1 stack de Sangramento propositalmente para curar uma quantidade **Alta** de PV.
- **Primordial:** a cura por Sangramento proposital não tem limite de vezes por turno.

### Escudo Vermelho
*Sangue · Escudo*

- **Tênue:** bloqueio cura uma quantidade **Baixa** de PV para cada stack de Sangramento que você possuir.
- **Manifesto:** o bloqueio também remove 1 stack de Sangramento de você.
- **Ancestral:** ao bloquear, redirecione 1 stack de Sangramento seu para o atacante.
- **Primordial:** o escudo nunca quebra enquanto você tiver ao menos 1 stack de Sangramento.

---

## Natureza

*Crescimento, ciclo, vida selvagem.* **Onde encontrar:** florestas antigas, territórios do Selvagem, ruínas tomadas pela vegetação.

### Raízes da Lâmina
*Natureza · Arma Corpo a Corpo*

- **Tênue:** acerto tem chance de [Imobilizar](#/devlog/entry/condicoes) o alvo com raízes até ele se soltar (teste de Força ou Atletismo).
- **Manifesto:** o alvo Imobilizado sofre dano **Médio** por rodada preso.
- **Ancestral:** você pode redirecionar as raízes para prender um aliado que esteja caindo ou sendo empurrado, anulando o efeito.
- **Primordial:** inimigos presos por suas raízes não podem ser curados enquanto permanecerem presos.

### Semente Perfurante
*Natureza · Arma à Distância*

- **Tênue:** acerto tem chance de Imobilizar o alvo com raízes até ele se soltar (teste de Força ou Atletismo).
- **Manifesto:** a munição pode germinar, criando Terreno Difícil onde caiu.
- **Ancestral:** o Terreno Difícil se espalha uma distância **Alta** por rodada enquanto ninguém o queimar.
- **Primordial:** o Terreno Difícil vira uma pequena floresta que bloqueia linha de visão.

### Chamado Selvagem
*Natureza · Arma Mágica*

- **Tênue:** seus ataques mágicos podem crescer vinhas que Imobilizam o alvo até ele se soltar (teste de Força ou Atletismo).
- **Manifesto:** o alvo Imobilizado sofre dano **Médio** por rodada preso.
- **Ancestral:** sempre que sofrer Sobrecarga usando esta arma, receba 1 Fortuna nessa rolagem.
- **Primordial:** uma vez por cena, invoque um emaranhado de raízes que Imobiliza todos os inimigos em [alcance curto](#/devlog/entry/alcances) por 1 rodada.

### Casca Viva
*Natureza · Armadura*

- **Tênue:** recupere uma quantidade **Baixa** de PV extra ao final de um Descanso Curto.
- **Manifesto:** a recuperação do Descanso Curto dobra.
- **Ancestral:** uma vez por cena, ignore completamente um Ferimento Leve recém-recebido.
- **Primordial:** você regenera 1 Ferimento Leve por descanso longo, mesmo sem Recuperar Corpo.

### Escudo Vivo
*Natureza · Escudo*

- **Tênue:** bloqueio cria um emaranhado que Imobiliza o atacante até ele se soltar.
- **Manifesto:** o emaranhado dura até o fim da cena ou até ser destruído.
- **Ancestral:** o emaranhado também prende qualquer inimigo que entre em [alcance de toque](#/devlog/entry/alcances) dele.
- **Primordial:** o emaranhado se torna permanente até alguém gastar uma ação inteira destruindo-o.
