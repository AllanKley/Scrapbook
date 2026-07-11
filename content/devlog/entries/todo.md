---
title: TODO
date: '2026-07-11'
sourceNote: TODO.md
---
#índice

> [!info] Sobre este documento
> Esta página puxa automaticamente tudo que está marcado com `#todo` (e tags relacionadas) em qualquer arquivo do vault, usando a busca embutida nativa do Obsidian — não precisa de nenhum plugin extra. A lista é sempre ao vivo: adicione um `#todo` em qualquer nota e ele aparece aqui; resolva e remova a tag e ele some. **Só funciona dentro do Obsidian** (não renderiza num leitor de markdown comum).
>
> Convenção de tags usada no vault:
> - `#todo` — algo que falta escrever, decidir ou converter em número. É o que a busca principal abaixo mostra.
> - `#duvida` — pergunta de design em aberto (também recebe `#todo`).
> - `#adaptado` / `#revisar` — conteúdo herdado do sistema anterior que precisa de uma segunda leitura (também recebem `#todo`).
> - `#rascunho` — texto novo, ainda não validado.
> - `#não_gosto_nome` / `#não_gosto_efeito` — o próprio autor já sinalizou que quer trocar isso (também recebem `#todo`).
>
> Marquei todos os pontos pendentes que encontrei nas revisões anteriores com essas tags direto nos arquivos de origem — veja [Comece Aqui](#/devlog/entry/comece-aqui) para navegar até eles a partir daqui.

---

# Maior impacto agora

A lista de `#todo` abaixo é grande e mistura coisas pequenas com coisas grandes. Esta seção é curada à mão com o que mais trava o sistema hoje, em ordem de impacto:

1. **Os números centrais agora têm um padrão provisório, mas ainda não têm valor final.** Adotamos a [Escala de Efeito](#/devlog/entry/combate-regras-gerais) (Baixo/Médio/Alto/Extremo) como label única para qualquer dano, cura, bônus, penalidade, RD, PV concedido ou distância ainda não fechado — e já aplicamos isso em todas as classes, [Domínio](#/devlog/entry/dominio), [Patrono](#/devlog/entry/patrono), [Infusões](#/devlog/entry/infusoes), [condições](#/devlog/entry/condicoes) e [ferimentos](#/devlog/entry/ferimentos). O que falta agora não é mais "que label usar", e sim **atribuir um valor numérico real a cada label** (quanto é "dano Médio" em dados, quanto PV é "PV Alto", etc.) — esse é o gargalo antes de qualquer combate poder ser testado de verdade. Além disso, dois números continuam genuinamente indefinidos (nem label, nem valor): o dado de **Sobrecarga** (mencionado em [Ritmo de Combate](#/devlog/entry/combate-regras-gerais), mas nunca definido como sua própria regra) e os valores de **Penalidade de Peso**.

2. **5 das 9 classes são sugestão de IA, ainda não regra jogada.** Malandro, Apotecário, Iluminado, Forjador e Conduíte ganharam habilidades nesta sessão, mas ninguém testou em mesa. O mesmo vale para [Patrono](#/devlog/entry/patrono) e [Infusões](#/devlog/entry/infusoes) inteiros, e para as habilidades ainda incompletas de Estudioso, Social e Tático em [domínio](#/devlog/entry/dominio). Procure o aviso `[!info] Sugestão` no topo de cada página.

3. **Defesa e Evasão são citadas como se fossem testes, mas nunca foram formalmente definidas.** [Atacar](#/devlog/entry/tipos-de-acoes) e [Esquivar](#/devlog/entry/tipos-de-acoes) já centralizam a mecânica (teste oposto/defesa passiva), mas o próprio valor de "Defesa" de uma criatura — e um possível atributo separado de "Evasão" — ainda não tem fórmula. Aparecem citadas também em Aprimorado e Espectro (ver nota em [criacao de personagem](#/devlog/entry/criacao-de-personagem)).

4. **Ecos não têm tabela de preços.** [ecos](#/devlog/entry/ecos) e [comércio](#/devlog/entry/comercio) explicam bem o conceito, mas não dá pra saber quantos Ecos custam uma poção, uma arma ou um serviço de artesão — o que deixa o custo de uma [Infusão](#/devlog/entry/infusoes) correto na regra ("1 Eco") mas impossível de planejar na prática. Os preços em label (Baixo/Médio/Alto/Muito Alto) de [Itens Gerais](#/devlog/entry/itens-gerais) têm o mesmo problema: falta o valor real em Ecos por trás de cada label.

---

# Tudo marcado com #todo

```query
tag:#todo
```

---

# Conteúdo adaptado do RPG anterior

```query
tag:#adaptado
```

---

# Dúvidas de design em aberto

```query
tag:#duvida
```

---

# O autor já disse que não gosta disso

```query
tag:#não_gosto_nome OR tag:#não_gosto_efeito
```

---

> [!tip] Quer uma checklist de verdade, com caixinhas clicáveis?
> A busca embutida acima mostra os trechos encontrados, mas não é interativa. Se quiser marcar itens como concluídos direto numa lista, dá pra instalar o plugin comunitário **Dataview** e trocar os blocos acima por uma query `TASK`/`LIST` filtrando por tag. Não instalei nada sozinho porque isso muda a configuração do seu vault — avisa se quiser que eu monte isso.
