# scrapbook

Meu canto da internet — listas de top 10 e as anotações do Dungeon Rift, o sistema
de mesa que eu tô desenhando.

**Site estático puro.** Sem build, sem framework, sem `npm install`. É HTML, CSS e
um pouco de JavaScript. Dá pra abrir qualquer arquivo num editor e mexer.

## Como rodar localmente

Não dá pra abrir os `.html` com duplo clique — as páginas usam `fetch()` pra ler os
arquivos de conteúdo, e o navegador bloqueia isso em `file://`. Sobe um servidor
qualquer na pasta:

```bash
python -m http.server 8000
```

Depois abre <http://localhost:8000>.

## Estrutura

```
index.html          home
top10.html          índice das listas
lista.html          uma lista          → lista.html?slug=top-10-comidas
dungeon-rift.html   índice do devlog
entry.html          uma entrada        → entry.html?slug=ferimentos
changelog.html      uma versão         → changelog.html?slug=v0.3.0

not_found.html      página de erro do Neocities  ┐ cópias idênticas: se mexer
404.html            página de erro do Pages      ┘ numa, copia pra outra

css/style.css       todo o estilo. as cores ficam no :root, lá em cima.
js/site.js          todo o JavaScript. funções curtas, uma por página.
js/marked.min.js    biblioteca que transforma markdown em HTML (não precisa mexer)

content/
  devlog/index.json     lista das entradas ← gerada, não edite à mão
  devlog/entries/*.md   as 45 entradas
  devlog/changelog/*.md as versões
  devlog/attachments/   imagens do devlog
  top10/index.json      lista das listas ← gerada, não edite à mão
  top10/*.json          as listas
  top10/images/         imagens das listas

images/             imagens do site
scripts/            o sync do Obsidian
```

## Como editar

**Trocar as cores:** `css/style.css`, primeiras linhas, no `:root`. Um hex por cor,
o site inteiro acompanha.

**Mexer num texto do Dungeon Rift:** edita o `.md` em `content/devlog/entries/`.
Markdown normal — títulos, listas, tabelas, `**negrito**`. Callouts do Obsidian
(`> [!info] Título`) também funcionam.

**Adicionar/editar uma lista top 10:** edita o `.json` em `content/top10/`. Cada item
aceita `rank`, `title`, `note`, `image`, `link` e `tags`.

**Criar uma entrada ou lista nova:** cria o arquivo e depois roda:

```bash
node scripts/sync-devlog.mjs
```

Sem argumento nenhum ele só relê o que tem em `content/` e regenera os dois
`index.json`. É preciso porque hospedagem estática não lista pasta — o navegador
não tem como descobrir os arquivos sozinho, então essa lista é o índice dele.

**Trazer as regras do Obsidian:**

```bash
node scripts/sync-devlog.mjs "C:\caminho\do\vault" --dry-run   # ver o que mudaria
node scripts/sync-devlog.mjs "C:\caminho\do\vault"             # aplicar
```

Converte wikilinks (`[[nota]]`) e embeds (`![[img.png]]`) em markdown comum, copia
os anexos, e regenera os manifestos. Pastas chamadas `ignorar` ou `ignore` são
puladas. Só precisa de `node` — nenhuma dependência.

## Onde fica hospedado

**GitHub Pages** em <https://allankley.is-a.dev> — atualiza sozinho a cada push na
`main` (`.github/workflows/deploy.yml`, que só empacota e publica, sem build). O
`CNAME` na raiz é o que segura o domínio.

**Neocities** — upload manual. Sobe o conteúdo da raiz do repo; dá pra pular
`scripts/`, `design/`, `.github/` e este README, que não fazem diferença pro site.

> Sobe **todos** os `.html`, inclusive `entry.html` e `changelog.html`. Eles não
> aparecem no menu, mas são as páginas que abrem o devlog — sem eles todo link de
> entrada cai no 404. E vale saber: o Neocities redireciona `/entry.html` pra
> `/entry` mesmo quando o arquivo não existe, então o endereço parece certo e o
> erro fica difícil de enxergar.
