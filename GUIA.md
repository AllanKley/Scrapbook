# Guia do site

Esse arquivo explica **cada arquivo do repo** e **o passo a passo pra adicionar
coisa nova**. O README é o resumo; aqui é o detalhe.

---

## A ideia geral

Todo arquivo do site cai em uma de três categorias. Se você entender essa
separação, o resto é consequência:

| Categoria | O que é | Você edita? |
|---|---|---|
| **Páginas** (`*.html`) | A moldura: cabeçalho, rodapé, e um espaço vazio | Raramente |
| **Conteúdo** (`content/`) | O texto de verdade: `.md` e `.json` | **Sempre** |
| **Manifestos** (`index.json`) | A lista de que conteúdo existe | Nunca à mão |

O ponto central: **as páginas não sabem o que existe.** `entry.html` não conhece
nenhuma entrada. Ela lê `?slug=` da URL, busca o arquivo com aquele nome e mostra.
Uma página serve pras 45 entradas.

Por isso o manifesto existe. Hospedagem estática **não lista pasta** — o navegador
não tem como perguntar "quais `.md` existem aí?". Então o `index.json` é essa lista,
e é o que a página do índice lê pra montar os cards. É a única engrenagem que a
simplicidade custou.

**Consequência prática:** todo arquivo novo de conteúdo precisa entrar no manifesto,
senão ele existe mas ninguém acha. É literalmente o único passo fácil de esquecer.

O manifesto é um JSON comum — **dá pra editar na mão**, e nada valida ele. O script
de sync só digita por você. Veja [editar o manifesto na mão](#editar-o-manifesto-na-mão).

---

## Os arquivos, um por um

### Páginas

Todas têm a mesma estrutura: `<head>` com as fontes e o CSS, `<header>` de
navegação, um `<main>`, `<footer>`, e no fim uma chamada de função do `site.js`.

| Arquivo | O que mostra | Como sabe o que mostrar |
|---|---|---|
| `index.html` | Home (o "hey, i'm allan" e os 2 cards) | Está escrito no HTML mesmo |
| `top10.html` | Grade com todas as listas | Lê `content/top10/index.json` |
| `lista.html` | Uma lista | `?slug=` → `content/top10/<slug>.json` |
| `dungeon-rift.html` | Índice do devlog, agrupado por seção | Lê `content/devlog/index.json` |
| `entry.html` | Uma entrada | `?slug=` → `content/devlog/entries/<slug>.md` |
| `changelog.html` | Uma versão | `?slug=` → `content/devlog/changelog/<slug>.md` |
| `not_found.html` | Erro 404 no Neocities | — |
| `404.html` | Erro 404 no GitHub Pages | Cópia idêntica da de cima |

**`index.html` é a única página com texto escrito direto nela.** Pra mudar a
apresentação da home, você edita o HTML. As outras cinco são moldura vazia.

**As duas páginas de erro são cópias.** Os dois hosts procuram nomes diferentes.
Se mexer numa, copia por cima da outra:

```bash
cp not_found.html 404.html
```

### `css/style.css` — 389 linhas, todo o visual

As **cores ficam nas primeiras linhas**, no `:root`. Trocar um hex ali muda o site
inteiro, porque nenhuma regra usa cor literal:

```css
--primary: #9c48ae;    /* roxo: títulos, bordas, sombra */
--secondary: #c2cce7;  /* fundo da página */
--accent: #86c6be;     /* teal: destaques, botão principal */
--highlight: #76a2c9;
--card: #fcfaf8;       /* fundo dos cards */
--radius: 0px;         /* cantos. o visual todo depende de ser 0 */
--shadow: 6px 6px 0 var(--primary);  /* a sombra dura */
```

O resto está dividido em blocos comentados, na ordem em que aparecem na tela:
cabeçalho → home → cards → listas top 10 → títulos → texto do devlog → callouts →
animação → mobile. Procure o comentário do bloco, mexa lá dentro.

O bloco `mobile` no fim é um `@media` — é ele que empilha tudo em tela estreita.

### `js/site.js` — 309 linhas, todo o comportamento

Funções curtas e independentes; cada página chama a sua. Nenhum framework.

- `renderDoc()` — busca um `.md`, separa o frontmatter, converte pra HTML
- `renderDevlogIndex()` / `renderTop10Index()` — leem o manifesto, montam os cards
- `renderTop10List()` — monta os itens ranqueados
- `upgradeCallouts()` — transforma `> [!info]` na caixinha estilizada
- `wrapTables()` — faz tabela larga rolar em vez de estourar a página
- `initReveal()` — a animação de aparecer ao rolar
- `redirectLegacyHash()` — manda links antigos (`#/devlog/entry/x`) pro lugar certo

### `js/marked.min.js`

Biblioteca que converte markdown em HTML. **Nunca abra esse arquivo.** Está aqui
dentro de propósito, pra não depender de internet nem de `npm install`.

### `scripts/sync-devlog.mjs` — a ponte com o Obsidian

Traz os `.md` do vault e **gera os dois manifestos**. Não tem dependência: só
precisa do `node`. Detalhes de uso mais abaixo.

---

## Adicionar uma entrada nova no Dungeon Rift

### Caminho normal: escreveu no Obsidian

Escreve a nota no vault como sempre, e roda:

```bash
node scripts/sync-devlog.mjs "C:\caminho\do\vault" --dry-run
```

O `--dry-run` só mostra o que mudaria, sem escrever nada. Se estiver certo, roda
de novo sem ele:

```bash
node scripts/sync-devlog.mjs "C:\caminho\do\vault"
```

O script converte wikilinks (`[[nota]]`) e embeds (`![[img.png]]`) pra markdown
comum, copia os anexos, e regenera os manifestos. Pastas chamadas `ignorar` ou
`ignore` são puladas.

**A pasta vira a seção.** Uma nota em `mecanicas/criacao de personagem/linhagens/`
ganha `section: mecanicas/criacao de personagem/linhagens` e aparece agrupada
assim no índice. Nota na raiz do vault cai no grupo "Geral".

**O nome do arquivo perde o acento** (`condições.md` → `condicoes.md`), porque é
ele que vira a URL. Mas **âncora de título mantém acento** (`#ímpeto`), porque os
links já escritos nos textos são assim. São duas regras diferentes de propósito —
está comentado no código dos dois lados.

### Caminho manual: escrever direto no repo

Cria o arquivo em `content/devlog/entries/`. **O nome do arquivo é o slug** — é o
que vai pra URL, então: minúsculo, sem acento, sem espaço (use hífen).

`content/devlog/entries/minha-entrada.md`:

```markdown
---
title: minha entrada
date: '2026-08-13'
section: mecanicas
---

# Minha entrada

Texto normal. **Negrito** vira o destaque roxo do site.

> [!info] Título da caixa
> Isso vira a caixinha estilizada, igual no Obsidian.

| coluna | outra |
|---|---|
| tabela | funciona |
```

Sobre o frontmatter (o bloco entre `---`):

- `title` — o que aparece no card e no topo da página
- `date` — **entre aspas simples**, formato `AAAA-MM-DD`
- `section` — o grupo no índice. Deixe vazio pra cair em "Geral". Escreva igual a
  uma seção que já existe pra entrar no mesmo grupo.

Falta registrar o arquivo no manifesto. Duas opções — **as duas valem igual**:

```bash
node scripts/sync-devlog.mjs
```

Sem vault ele só relê `content/` e regenera os dois `index.json`. Ou então edita o
`content/devlog/index.json` na mão, acrescentando um objeto ao array `entries`.
Veja a seção abaixo.

### Escrevendo o conteúdo

**Link pra outra entrada** — aponte pra página com o slug:

```markdown
veja [ferimentos](entry.html?slug=ferimentos)
```

**Link pra uma seção específica** — o `#` usa o título em minúsculo, espaço vira
hífen, **acento fica**:

```markdown
[à beira da morte](entry.html?slug=ferimentos#à-beira-da-morte)
```

**Imagem** — coloque o arquivo em `content/devlog/attachments/` e escreva o
caminho completo a partir da raiz do site:

```markdown
![descrição](content/devlog/attachments/minha-imagem.png)
```

**Callouts** — qualquer tipo funciona (`info`, `tip`, `warning`…). Vira uma caixa
com o título em cima:

```markdown
> [!info] Sugestão
> O texto da caixa.
```

---

## Adicionar uma lista top 10 nova

Cria um `.json` em `content/top10/`. **O nome do arquivo tem que ser igual ao
campo `slug` de dentro** — o arquivo é o que a URL busca, o campo é o que o
manifesto guarda; se divergirem, o card leva pra uma página quebrada.

`content/top10/top-10-filmes.json`:

```json
{
  "slug": "top-10-filmes",
  "title": "Top 10 Filmes",
  "description": "os que eu recomendo sem pensar",
  "updatedAt": "2026-08-13",
  "items": [
    {
      "rank": 1,
      "title": "nome do filme",
      "note": "por que ele tá aqui",
      "image": "content/top10/images/filme.jpg",
      "tags": ["ficção", "anos 80"]
    },
    {
      "rank": 2,
      "title": "outro filme",
      "note": ""
    }
  ]
}
```

Campos do item — só `rank` e `title` são obrigatórios:

| Campo | Obrigatório | O que faz |
|---|---|---|
| `rank` | sim | O número. Ordena a lista |
| `title` | sim | O nome |
| `note` | não | O comentário embaixo. `""` some |
| `image` | não | Caminho a partir da raiz do site |
| `tags` | não | As etiquetas. Sem o campo, não aparece nada |

O `description` da lista aparece no card lá no `top10.html`; deixar `""` é ok.

> **Nota:** algumas listas antigas têm um campo `"link"` nos itens. Ele **não faz
> nada** — sobrou do site antigo. Pode ignorar ou apagar.

Imagens vão em `content/top10/images/`. Nome pode ser o que você quiser (as
antigas têm número na frente porque foram enviadas pela UI antiga).

E registra no manifesto — ou rodando `node scripts/sync-devlog.mjs`, ou
acrescentando na mão em `content/top10/index.json`:

```json
{ "slug": "top-10-filmes", "title": "Top 10 Filmes", "description": "os que eu recomendo sem pensar" }
```

**A posição no array é a posição na tela** — o site não reordena as listas.

### Só adicionar um item numa lista que já existe

Edita o `.json` direto e pronto. **Não precisa rodar o sync** — o manifesto guarda
só título e descrição da lista, não os itens. A página lê o arquivo inteiro.

Só cuidado com o JSON: vírgula entre itens, mas **não depois do último**. Se a
lista aparecer vazia com erro, é quase sempre isso.

---

## Editar o manifesto na mão

O script de sync é conveniência, não obrigação. **Você só precisa dele pra importar
do Obsidian** — porque aí ele faz coisa que não é só listar: converte `[[wikilink]]`
e `![[imagem]]` pra markdown normal, e copia os anexos do vault. Pra arquivo que
você escreveu direto no repo não existe nada disso pra converter, então é só somar
uma linha na lista.

`content/devlog/index.json`:

```json
{
  "entries": [
    { "slug": "minha-entrada", "title": "minha entrada", "date": "2026-08-13", "section": "mecanicas" }
  ],
  "changelog": [
    { "slug": "v0.3.0", "version": "0.3.0", "date": "2026-08-02" }
  ]
}
```

`content/top10/index.json` é mais simples — um array direto:

```json
[
  { "slug": "top-10-comidas", "title": "Top 10 Comidas", "description": "" }
]
```

O `slug` tem que bater com o nome do arquivo (sem o `.md`, sem o `.json`). É a
única coisa que quebra de verdade se errar.

### O título aparece em dois lugares, vindo de duas fontes

Isso pega quem edita na mão:

- O **card no índice** usa o `title` do `index.json`
- O **cabeçalho dentro da página** usa o `title` do frontmatter do `.md`

Editar só um deixa o card dizendo uma coisa e a página dizendo outra. E se o `.md`
não tiver frontmatter nenhum, a página mostra o slug cru. Mantenha os dois iguais.

### Onde a ordem importa

O site reordena algumas coisas sozinho e outras não:

| | A ordem no arquivo importa? |
|---|---|
| Entradas do devlog | **Não** — o site reordena por título dentro de cada seção |
| Changelog | **Sim** — sai na ordem do JSON (deixe a mais nova em cima) |
| Listas top 10 | **Sim** — sai na ordem do JSON |
| Itens de uma lista | **Não** — o site ordena pelo `rank` |

Ou seja: entrada de devlog você joga em qualquer posição do array. Lista top 10
nova, a posição no arquivo é a posição na tela.

### Quando o script ainda vale a pena

Rodar `node scripts/sync-devlog.mjs` (sem argumento) reescreve os dois manifestos
a partir do que existe em `content/`. Serve pra:

- adicionar vários arquivos de uma vez sem digitar tudo
- consertar o manifesto se ele dessincronizar do que tem na pasta
- conferir: rode com `--dry-run` e ele diz quantas entradas achou, sem escrever nada

Ele lê o frontmatter dos `.md`, então o `title`/`date`/`section` que ele grava vêm
de lá — mais um motivo pra manter o frontmatter certo.

---

## Publicar

Duas coisas separadas, e a segunda é manual:

**1. GitHub Pages** (`allankley.is-a.dev`) — automático:

```bash
git add -A && git commit -m "nova entrada" && git push
```

Um minuto depois está no ar.

**2. Neocities** — upload manual no painel. Sobe os arquivos que mudaram. Não
precisa subir `scripts/`, `design/`, `.github/`, `README.md` nem este guia.

> Se você adicionou conteúdo, **os manifestos mudaram** — precisa subir
> `content/devlog/index.json` e/ou `content/top10/index.json` junto. Esquecer isso
> é o motivo nº 1 de "adicionei mas não aparece".

---

## Quando der errado

| Sintoma | Causa quase certa |
|---|---|
| Adicionei mas não aparece no índice | O arquivo não entrou no `index.json` |
| O card diz um nome, a página diz outro | `title` do `index.json` ≠ `title` do frontmatter |
| Aparece no Pages mas não no Neocities | Faltou subir o `index.json` no upload |
| Card leva pra página de erro | Nome do arquivo ≠ campo `slug` |
| Lista top 10 vazia | Vírgula sobrando no fim do JSON |
| Página em branco abrindo o `.html` com 2 cliques | Precisa de servidor: `python -m http.server 8000` |
| Link com acento não pula pra seção | Âncora **mantém** acento: `#ímpeto`, não `#impeto` |
| Um link `.html` some da URL no Neocities | Normal — ele redireciona `/x.html` → `/x` sempre |

Pra testar antes de publicar, sobe o servidor local e abre
<http://localhost:8000>:

```bash
python -m http.server 8000
```
