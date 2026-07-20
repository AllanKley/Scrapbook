---
title: domínio
date: '2026-07-20'
section: mecanicas/criacao de personagem
sourceNote: mecanicas/criacao de personagem/domínio.md
---
Os Domínios definem o papel do seu personagem dentro do grupo. Cada um oferece duas especializações, que concedem habilidades únicas ao longo da progressão.

As habilidades de Domínio são desbloqueadas em **Despertar, Rank E, Rank C, Rank A e Rank S** — ranks diferentes dos de Linhagem (que usam F, D e B), intercalados na mesma escada. Veja [Ranks](#/devlog/entry/progressao-de-personagem) para a progressão completa.

> [!todo] Rank provisório
> Os ranks abaixo foram distribuídos de forma provisória, só para que cada habilidade tenha um marcador — a posição exata de cada uma ainda pode mudar.

> [!info] PV e Deslocamento são por Domínio, não por especialização
> As duas especializações de um mesmo Domínio compartilham o mesmo PV inicial/por nível e o mesmo Deslocamento — só as habilidades mudam entre elas. Veja [recursos](#/devlog/entry/recursos) para como esses dois recursos se encaixam no resto da ficha.

---

# Origem (lore)

Diferente da [Linhagem](#/devlog/entry/linhagem), nada no Domínio é inato ou único ao personagem: toda habilidade de Domínio representa dedicação e treino — o resultado direto de alguém se esforçando para controlar melhor a própria Essência, não um dom com que já nasceu. As quatro categorias (Bastião, Suporte, Executor, Especialista) e suas oito especializações são um sistema de classificação da **Associação**, criado para organizar e ensinar esse treino de forma consistente — não uma força mística ou uma marca da alma.

É justamente por ser treino, e não fundação, que o Domínio pode ser expandido: um personagem pode se dedicar a treinar um Domínio diferente do seu principal, algo impensável para a Linhagem, que é fixa desde o Despertar.

---

# Multiclasse de Domínio

Toda vez que o personagem ganha um **nível de Domínio** (Despertar, Rank E, Rank C, Rank A ou Rank S), ele escolhe uma das duas opções abaixo:

- **Continuar uma trilha existente** — pegar a próxima habilidade não desbloqueada de um Domínio (e especialização) em que já tenha investido antes, seja o principal ou um secundário.
- **Multiclassar** — pegar a habilidade de **Despertar** de um Domínio que o personagem ainda não tenha treinado, escolhendo uma das suas duas especializações. Esse Domínio passa a ser uma trilha própria: da próxima vez que o jogador quiser continuar treinando nele, pega a habilidade seguinte dessa mesma trilha (Rank E → C → A → S, nessa ordem, não importa quantos níveis de personagem se passem entre uma escolha e a outra).

Cada trilha de Domínio avança na sua própria ordem interna, independente do restante da ficha — só não é possível pular uma habilidade da trilha sem antes ter pego a anterior.

**Recursos ganhos ao multiclassar:**

- **PV:** ao pegar uma habilidade de um Domínio diferente do inicial, o personagem ganha o **PV por nível** daquele Domínio — nunca o **PV inicial**, que só é concedido uma vez, pelo Domínio com que o personagem começou.
- **Deslocamento:** nunca muda por multiclasse. Permanece sempre o valor do Domínio inicial, não importa quantos outros Domínios o personagem treine depois.

> [!todo] Especialização ao multiclassar
> Assumindo que, ao multiclassar num Domínio novo, o jogador escolhe uma das duas especializações dele (como faria normalmente) e segue só nessa daí em diante — não é possível alternar entre as duas especializações do mesmo Domínio secundário. Confirmar se é essa mesma a intenção. #todo #duvida

---

# Bastião

Os Bastiões são especialistas em proteger seus aliados e resistir ao perigo. Enquanto outros se concentram em derrotar os inimigos, eles garantem que ninguém fique para trás.

**Pontos de Vida:** inicial **Alto**, **Alto** por nível.
**Deslocamento:** 4 quadrados.

## Protetor

Você é o escudo da equipe, colocando-se entre seus aliados e qualquer ameaça.

### Habilidades

#### Despertar — *Mártir* (1 PA • Reação)

Quando um aliado em [alcance adjacente](#/devlog/entry/alcances) for alvo de um ataque, você pode redirecioná-lo para si.

Reduza o dano recebido em uma quantidade **Alta**.

---

#### Rank E — *Instinto Defensivo* (Passivo)

Enquanto houver pelo menos um aliado em [alcance estendido](#/devlog/entry/alcances), você recebe **+2 em testes de ataque**.

---

#### Rank C — *Defensor Veloz* (1 PA)

Mova-se até um aliado em [alcance curto](#/devlog/entry/alcances).

Você ocupa o espaço dele e move esse aliado para qualquer espaço em [alcance estendido](#/devlog/entry/alcances).

---

#### Rank A — *Controle de Área* (Passivo)

Sempre que um inimigo tentar sair voluntariamente de um espaço em [alcance de toque](#/devlog/entry/alcances) de você, faça um teste de Intimidação.

Em caso de sucesso, ele permanece onde está.

---

#### Rank S — *Escudo Protetor* (1 PA • Reação)

Sua Essência toma forma como uma barreira sólida.

Ela se estende em linha até [alcance curto](#/devlog/entry/alcances), impedindo que qualquer dano — inclusive dano em área — atravesse para o outro lado.

---

## Bruto

Seu papel é permanecer de pé até o fim do combate, suportando danos que derrubariam qualquer outro.

### Habilidades

#### Despertar — *Ponto Focal* (1 PA)

Até o início do seu próximo turno, todos os inimigos em [alcance curto](#/devlog/entry/alcances) devem focar seus ataques em você.

Para atacar outro alvo ou se afastar, precisam passar em um teste de **Estabilidade**. A tentativa consome sua ação, mesmo em caso de falha.

---

#### Rank E — *Recusa em Cair* (Passivo)

Se iniciar seu turno com **0 PV**, recupere **1 PV**.

---

#### Rank C — *Corpo Inabalável* (Passivo)

Enquanto possuir pelo menos **1 Ferimento**, você recebe **Redução de Dano 5**.

---

#### Rank A — *Pressão Constante* (Passivo)

Você causa dano **Baixo** adicional para cada inimigo adjacente a você.

---

#### Rank S — *Inquebrável* (1 PA • Reação)

Ao sofrer dano, reduza esse dano pela metade.

---

# Suporte

Especialistas em manter o grupo funcionando. Seja restaurando aliados ou oferecendo conhecimento, sua presença fortalece toda a equipe.

**Pontos de Vida:** inicial **Médio**, **Médio** por nível.
**Deslocamento:** 5 quadrados.

## Curandeiro

Você canaliza a Essência para restaurar o equilíbrio físico e espiritual dos seus aliados.

### Habilidades

#### Despertar — *Transferência de Vitalidade* (1 PA)

Transfira Pontos de Vida entre criaturas em [alcance estendido](#/devlog/entry/alcances), incluindo você.

Caso retire vida de um inimigo, o máximo transferido por ação é uma quantidade **Alta** de PV.

---

#### Rank E — *Resgate Veloz* (Passivo)

Quando um aliado em [alcance curto](#/devlog/entry/alcances) chegar a **0 PV**, você pode mover-se até um espaço adjacente sem gastar PA e fazê-lo retornar com **1 PV**.

---

#### Rank C — *Flutuações de Essência* (1 PA)

Analise o fluxo de Essência de uma criatura.

Enquanto mantiver essa análise, receba um bônus **Baixo** em testes de **Intuição** e **Persuasão** contra ela.

---

#### Rank A — *Instinto Protetor* (Passivo)

Enquanto estiver em [alcance estendido](#/devlog/entry/alcances) de um aliado que possua [Ferimentos](#/devlog/entry/ferimentos), seus ataques recebem dano **Baixo** adicional.

---

#### Rank S — *Infusão Vital* (1 PA • 1x por descanso curto)

> [!todo] Redesenhada sem PE
> Original escalava com PE gasto ("cure uma quantidade Baixa de PV para cada PE gasto"). Sem PE, virou uma cura fixa com frequência limitada — ajuste a magnitude/frequência quando os números reais forem fechados. #todo

Injete sua Essência em um aliado. Cure uma quantidade **Alta** de PV, ou remova **1 Ferimento**.

---

## Estudioso

Seu maior poder é o conhecimento. Você identifica padrões, resolve problemas e encontra respostas onde ninguém mais consegue.

### Habilidades

#### Despertar — *Conhecimento Paralelo* (1 PA)

Realize um teste utilizando uma perícia na qual você não é treinado como se fosse treinado.

---

#### Rank E — *(A definir)* #todo

---

#### Rank C — *(A definir)* #todo

---

#### Rank A — *(A definir)* #todo

---

#### Rank S — *(A definir)* #todo

---

# Executor

Os Executores existem para eliminar ameaças rapidamente. Quanto mais tempo permanecem atacando, mais perigosos se tornam.

**Pontos de Vida:** inicial **Alto**, **Médio** por nível.
**Deslocamento:** 6 quadrados.

## Ofensivo

Sua presença em combate significa pressão constante e muito dano.

### Habilidades

#### Despertar — *Retribuição* (Passivo)

Sempre que atacar um inimigo que tenha causado dano a você desde seu último turno, receba dano **Baixo** adicional.

---

#### Rank E — *Reposicionar* (Passivo)

Uma vez por turno, você pode realizar uma ação de Movimento e uma ação de Ataque gastando apenas **1 PA**.

Escolha a ordem das ações.

> [!todo] Ficou mais forte com o novo custo de Ataque
> Quando Atacar custava 1 PA, isso não era desconto nenhum (Movimento já é de graça). Agora que Atacar custa 2 PA, esta habilidade economiza 1 PA de verdade — revisar se ainda faz sentido no Rank E ou se deveria subir de rank. #todo

---

#### Rank C — *Surto de Energia* (0 PA • 1x por cena)

> [!todo] Redesenhada sem PE
> Original convertia PE em PA ("0 PA • 2 PE"). Sem PE, virou uma explosão de ação gratuita limitada por cena. #todo

Até o fim da rodada, você recebe **+1 PA**.

---

#### Rank A — *Foco Letal* (Passivo)

Sempre que atingir o mesmo alvo em ataques consecutivos, receba dano **Baixo** adicional, cumulativo.

O bônus termina ao errar um ataque ou trocar de alvo.

**Máximo:** dano **Alto**.

---

#### Rank S — *Guerreiro Imparável* (1 PA)

Até o fim da rodada, você recupera Pontos de Vida iguais à metade do dano causado por seus ataques.

---

## Assassino

Você escolhe um alvo — e ele não escapa.

Seu poder cresce quando elimina inimigos isolados com rapidez e precisão.

### Habilidades

#### Despertar — *Duelista* (Passivo)

Ao atacar um inimigo que não possua aliados em [alcance curto](#/devlog/entry/alcances), adicione dano **Médio** ao ataque.

---

#### Rank E — *Ponto de Vantagem* (Passivo)

Na primeira rodada de cada combate, você recebe uma ação de Movimento gratuita.

---

#### Rank C — *Marca do Assassino* (1 PA)

Marque um inimigo em [alcance médio](#/devlog/entry/alcances).

Enquanto permanecer marcado, todos os ataques contra ele recebem um bônus **Baixo** no teste de ataque.

---

#### Rank A — *Fantasma* (Passivo)

Receba um bônus **Médio** em Furtividade.

Além disso, você pode repetir sua primeira tentativa de se esconder em cada cena.

---

#### Rank S — *Finalizador* (1 PA)

Até o fim da rodada, seus ataques:

- ignoram Armadura;
- não podem ser bloqueados.

---

# Especialista

Especialistas controlam situações através de inteligência, influência e estratégia.

**Pontos de Vida:** inicial **Médio**, **Baixo** por nível.
**Deslocamento:** 5 quadrados.

## Social

Você é a voz do grupo. Resolve conflitos através da influência, manipulação e presença.

### Habilidades

#### Despertar — *Discurso Persuasivo* (1 PA)

Você pode reutilizar uma Alavanca Social.

---

#### Rank E — *Rosto Confiável* (Passivo)

NPCs tendem a confiar mais em você.

Em testes de convencimento, você sempre pode cometer **1 falha adicional** antes de fracassar.

---

#### Rank C — *Influência Forçada* (1 PA)

Influencie um inimigo, alterando seu estilo de combate para um de sua escolha.

---

#### Rank A — *(A definir)* #todo

---

#### Rank S — *(A definir)* #todo

---

## Tático

Você controla o ritmo da batalha.

Movimentos, posicionamentos e oportunidades passam pelas suas mãos.

### Habilidades

#### Despertar — *Olhar Analítico* (1 PA)

Faça um teste para analisar um inimigo em [alcance médio](#/devlog/entry/alcances).

Em caso de sucesso, descubra **1** das seguintes informações:

- Uma habilidade (na ordem em que será utilizada).
- Uma fraqueza.
- Uma resistência.
- Seu estilo de combate.

Se usar esta habilidade na primeira rodada do combate, descubra **2 informações** em vez de 1.

---

#### Rank E — *Estrategista de Campo* (Passivo)

Aliados em [alcance curto](#/devlog/entry/alcances) recebem **+1 PA por rodada**.

---

#### Rank C — *(A definir)* #todo

---

#### Rank A — *(A definir)* #todo

---

#### Rank S — *(A definir)* #todo
