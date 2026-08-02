---
title: recursos
date: '2026-08-02'
section: mecanicas/criacao de personagem
sourceNote: mecanicas/criacao de personagem/recursos.md
---
#criacao_de_personagem #combate

> [!info] Sobre esta página
> Recursos são os valores derivados do personagem, calculados a partir de [Traços](#/devlog/entry/tracos), [Linhagem](#/devlog/entry/linhagem), [Domínio](#/devlog/entry/dominio) e [Arsenal](#/devlog/entry/equipamentos) — é a etapa 9 (Recursos Iniciais) de [Ordem de Criação](#/devlog/entry/criacao-de-personagem). Cada recurso é só resumido aqui; a explicação completa mora na página específica linkada em cada seção.
>
> A maioria dos valores abaixo ainda usa a [Escala de Efeito](#/devlog/entry/combate-regras-gerais) (Baixo/Médio/Alto/Extremo) em vez de números fixos. Procure pela tag #todo no vault para o estado geral de tudo que falta fechar.

---

# Pontos de Vida (PV)

Representa a saúde física do personagem. Ao chegar a **0 PV**, ele passa a sofrer Ferimentos (ver [ferimentos](#/devlog/entry/ferimentos)).

O **PV inicial** vem do **Domínio** escolhido no Despertar (Bastião, Suporte, Executor ou Especialista) — as duas especializações de um mesmo Domínio compartilham o mesmo valor, e esse valor só é ganho **uma vez**, do Domínio com que o personagem começou.

O **PV por avanço** também vem do Domínio, mas depende de qual trilha o jogador escolhe em cada avanço de Domínio — veja [Multiclasse de Domínio](#/devlog/entry/dominio). Continuar no Domínio inicial concede o PV por nível dele; multiclassar para um Domínio diferente concede o PV por nível *daquele* Domínio.

---

# Pontos de Ação (PA)

O recurso gasto para agir em combate. Atacar custa **2 PA**, Defender custa **1 PA**, Esquivar custa **2 PA** (ver [tipos de acoes](#/devlog/entry/tipos-de-acoes)), e a maioria das habilidades de Linhagem e Domínio também custa PA.

Todo personagem tem **4 PA por turno**, valor fixo que não varia por Traço, Linhagem ou Domínio. O pool volta cheio no início de cada turno do próprio personagem; o que sobra fica disponível para Reações (como Esquivar) até lá.

Repetir a mesma ação no mesmo turno dobra seu custo — o Ritmo de Combate — voltando ao valor normal no início do turno seguinte (ver [Ritmo de Combate](#/devlog/entry/combate-regras-gerais)). 

---

# Deslocamento (Velocidade)

Distância que o personagem pode percorrer em uma ação de [Mover-se](#/devlog/entry/tipos-de-acoes), medida em **quadrados**.

Vem do **Domínio inicial** escolhido no Despertar — as duas especializações de um mesmo Domínio compartilham o mesmo valor (ver [domínio](#/devlog/entry/dominio)). Diferente do PV por nível, o Deslocamento **nunca muda por [multiclasse](#/devlog/entry/dominio)**: mesmo que o personagem treine outros Domínios depois, o Deslocamento permanece o do Domínio com que ele começou.

| Domínio | Deslocamento |
| --- | --- |
| Bastião | 6 quadrados |
| Suporte | 7 quadrados |
| Especialista | 5 quadrados |
| Executor | 8 quadrados |

É reduzido por [Penalidade de Peso](#/devlog/entry/combate-regras-gerais) (penalidade **Média** sob Penalidade Severa — ainda em label, precisa virar um número de quadrados) e pode ser aumentado por habilidades de Linhagem ou Domínio, usando a [Escala de Efeito](#/devlog/entry/combate-regras-gerais).

---

# Redução de Dano (RD)

Reduz passivamente o dano físico recebido. Vem principalmente de [Armaduras](#/devlog/entry/armaduras) (Baixa/Média/Alta, conforme o peso da armadura) e pode receber bônus de habilidades — por exemplo, Corpo Inabalável (Bruto) concede RD 5 enquanto o personagem tiver ao menos 1 Ferimento.

A RD total é a soma de todas as fontes ativas no momento.

---

# Subespaço (Capacidade de Carga)

O personagem não carrega peso "solto" de forma abstrata: ele tem 4 slots de acesso rápido (ver [Tamanho](#/devlog/entry/equipamentos)) e um **Subespaço** — um bolso fora da realidade que comporta até **o número do dado de Essência × 5** em espaços de item (ex: Essência d8 comporta 40 espaços) — ver [Subespaço](#/devlog/entry/equipamentos).

Puxar um item do Subespaço em combate custa 2 PA; fora de combate, é de graça.

A única penalidade por "carga" no sistema atual é a [Penalidade de Peso](#/devlog/entry/combate-regras-gerais) do item mais pesado equipado ou nos slots de acesso rápido — não existe uma penalidade separada por excesso de itens guardados no Subespaço.
