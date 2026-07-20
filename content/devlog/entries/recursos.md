---
title: recursos
date: '2026-07-20'
section: mecanicas/criacao de personagem
sourceNote: mecanicas/criacao de personagem/recursos.md
---
#criacao_de_personagem #combate

> [!info] Sobre esta página
> Recursos são os valores derivados do personagem, calculados a partir de [Traços](#/devlog/entry/tracos), [Linhagem](#/devlog/entry/linhagem), [Domínio](#/devlog/entry/dominio) e [Arsenal](#/devlog/entry/equipamentos) — é a etapa 9 (Recursos Iniciais) de [Ordem de Criação](#/devlog/entry/criacao-de-personagem). Cada recurso é só resumido aqui; a explicação completa mora na página específica linkada em cada seção.
>
> A maioria dos valores abaixo ainda usa a [Escala de Efeito](#/devlog/entry/combate-regras-gerais) (Baixo/Médio/Alto/Extremo) em vez de números fixos. Veja TODO para o estado geral de tudo que falta fechar.

---

# Pontos de Vida (PV)

Representa a saúde física do personagem. Ao chegar a **0 PV**, ele passa a sofrer Ferimentos (ver [ferimentos](#/devlog/entry/ferimentos)).

O **PV inicial** vem do **Domínio** escolhido no Despertar (Bastião, Suporte, Executor ou Especialista) — as duas especializações de um mesmo Domínio compartilham o mesmo valor, e esse valor só é ganho **uma vez**, do Domínio com que o personagem começou.

O **PV por nível** também vem de Domínio, mas depende de qual trilha o jogador escolhe em cada nível de Domínio — veja [Multiclasse de Domínio](#/devlog/entry/dominio). Continuar no Domínio inicial concede o PV por nível dele; multiclassar para um Domínio diferente concede o PV por nível *daquele* Domínio a partir dali, não o do Domínio inicial.

> [!todo] Ganho por Rank
> [progressao de personagem](#/devlog/entry/progressao-de-personagem) confirma que toda subida de Rank também aumenta PV, mas ainda não define quanto — só a parte que já vem do Domínio está (parcialmente) fechada. #todo

---

# Pontos de Ação (PA)

O recurso gasto para agir em combate. Atacar custa **2 PA**, Defender custa **1 PA**, Esquivar custa **2 PA** (ver [tipos de acoes](#/devlog/entry/tipos-de-acoes)), e a maioria das habilidades de Linhagem e Domínio também custa PA.

Todo personagem tem **4 PA por turno**, valor fixo que não varia por Traço, Linhagem ou Domínio — só por Rank (veja abaixo). O pool volta cheio no início de cada turno do próprio personagem; o que sobra fica disponível para Reações (como Esquivar) até lá.

Repetir a mesma ação no mesmo turno dobra seu custo — o Ritmo de Combate — voltando ao valor normal no início do turno seguinte (ver [Ritmo de Combate](#/devlog/entry/combate-regras-gerais)). Com Atacar custando 2 PA e um pool de 4, um segundo ataque no mesmo turno custaria 4 PA (o dobro) — ou seja, **atacar duas vezes no mesmo turno consome o pool inteiro**, e três vezes é matematicamente impossível com 4 PA. Essa é a intenção: um personagem recém-Despertado não deveria conseguir atacar duas vezes e ainda sobrar folga.

> [!todo] Crescimento por Rank
> A ideia atual é manter 4 PA por boa parte da escada e só aumentar em raros ranks-chave (não em todo rank, pra não inflar o número de ataques repetidos que o Ritmo de Combate permite) — por exemplo, +1 em algum rank do meio e +1 no Rank S, chegando a uns 6 PA no topo. Ainda não decidido em quais ranks exatamente isso aconteceria. #todo

> [!info] Pontos de Essência (PE) foram removidos
> Existia um segundo recurso, PE, gasto por habilidades de Domínio ligadas à Essência. Foi cortado do sistema — essas habilidades hoje custam apenas PA, normalmente limitadas por uso (1x por cena, 1x por descanso curto/longo, etc.) em vez de por um pool separado. Ver os avisos "Redesenhada sem PE" espalhados em [domínio](#/devlog/entry/dominio).

---

# Redução de Dano (RD)

Reduz passivamente o dano físico recebido. Vem principalmente de [Armaduras](#/devlog/entry/armaduras) (Baixa/Média/Alta, conforme o peso da armadura) e pode receber bônus de habilidades — por exemplo, Corpo Inabalável (Bruto) concede RD 5 enquanto o personagem tiver ao menos 1 Ferimento.

A RD total é a soma de todas as fontes ativas no momento.

> [!todo] Converter em número
> As categorias de RD de armadura ainda precisam virar um valor fixo — ver [armaduras](#/devlog/entry/armaduras). #todo

---

# Defesa e Evasão

Não existe mais Defesa passiva: um ataque acerta automaticamente se o alvo não reagir (ver [Atacar](#/devlog/entry/tipos-de-acoes)). "Defesa" e "Evasão" hoje são as duas formas de reagir a um ataque, não valores fixos que o atacante precisa superar:

- **Defender** — exclusivo de quem tem [Escudo](#/devlog/entry/escudos) equipado. Teste Oposto usando a Perícia e o Traço do próprio escudo, que variam de escudo para escudo (ver [escudos](#/devlog/entry/escudos) e [Defender](#/devlog/entry/tipos-de-acoes)).
- **Esquivar** — para quem não tem escudo (ou não quer gastar um Uso dele). Teste Oposto usando a nova Perícia [Evasão](#/devlog/entry/pericias) (Graça) contra o teste de ataque do inimigo (ver [Esquivar](#/devlog/entry/tipos-de-acoes)).

Como cada arma já indica sua própria Perícia e Traço de ataque (ver [Perícia e Traço](#/devlog/entry/equipamentos)), e agora Defender e Esquivar também têm os seus, todo Teste Oposto de combate tem seus dois lados bem definidos.

---

# Deslocamento (Velocidade)

Distância que o personagem pode percorrer em uma ação de [Mover-se](#/devlog/entry/tipos-de-acoes), medida em **quadrados**.

Vem do **Domínio inicial** escolhido no Despertar — as duas especializações de um mesmo Domínio compartilham o mesmo valor (ver [domínio](#/devlog/entry/dominio)). Diferente do PV por nível, o Deslocamento **nunca muda por [multiclasse](#/devlog/entry/dominio)**: mesmo que o personagem treine outros Domínios depois, o Deslocamento permanece o do Domínio com que ele começou.

| Domínio | Deslocamento |
| --- | --- |
| Bastião | 4 quadrados |
| Suporte | 5 quadrados |
| Especialista | 5 quadrados |
| Executor | 6 quadrados |

É reduzido por [Penalidade de Peso](#/devlog/entry/combate-regras-gerais) (penalidade **Média** sob Penalidade Severa — ainda em label, precisa virar um número de quadrados) e pode ser aumentado por habilidades de Linhagem ou Domínio, usando a [Escala de Efeito](#/devlog/entry/combate-regras-gerais).

---

# Subespaço (Capacidade de Carga)

O personagem não carrega peso "solto" de forma abstrata: ele tem 4 slots de acesso rápido (ver [Tamanho](#/devlog/entry/equipamentos)) e um **Subespaço** — um bolso fora da realidade que comporta até **Essência × 5** em espaços de item (ver [Subespaço](#/devlog/entry/equipamentos)).

Puxar um item do Subespaço em combate custa 2 PA; fora de combate, é de graça.

A única penalidade por "carga" no sistema atual é a [Penalidade de Peso](#/devlog/entry/combate-regras-gerais) do item mais pesado equipado ou nos slots de acesso rápido — não existe uma penalidade separada por excesso de itens guardados no Subespaço.
