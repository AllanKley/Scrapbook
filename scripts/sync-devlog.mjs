#!/usr/bin/env node
// Traz as notas do vault do Obsidian pra content/devlog/entries/, convertendo
// a sintaxe do Obsidian (wikilinks e embeds) em markdown comum, pra que o site
// não precise entender nada de Obsidian na hora de renderizar.
//
// Não tem dependência nenhuma — é só `node`, sem npm install.
//
// Uso:
//   node scripts/sync-devlog.mjs "C:\caminho\do\vault" [--dry-run]

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(REPO_ROOT, 'content');
const ENTRIES_DIR = path.join(CONTENT_DIR, 'devlog', 'entries');
const CHANGELOG_DIR = path.join(CONTENT_DIR, 'devlog', 'changelog');
const ATTACHMENTS_DIR = path.join(CONTENT_DIR, 'devlog', 'attachments');
const TOP10_DIR = path.join(CONTENT_DIR, 'top10');

const EMBED_RE = /!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
// Grupo 1: nome da nota (vazio num link de heading tipo [[#Título]])
// Grupo 2: heading, quando o link aponta pra uma seção
// Grupo 3: texto alternativo, quando existe |Texto
const WIKILINK_RE = /\[\[([^\]|#]*)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g;
const HEADING_RE = /^#{1,6}[ \t]+(.+)$/gm;

/**
 * Slug de nome de arquivo: acento SAI, porque vira "condicoes.md" e
 * "entry.html?slug=condicoes" — sem caractere estranho na URL.
 */
function slugifyFilename(input) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Slug de heading (as âncoras `](#ímpeto)`): acento FICA.
 * Tem que bater exatamente com slugifyHeading() do js/site.js — se as duas
 * divergirem, todo link de seção aponta pra um id que não existe.
 */
function slugifyHeading(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/(^-|-$)/g, '');
}

function stripDatePrefix(name) {
  return name.replace(/^\d{4}-\d{2}-\d{2}[-_ ]*/, '');
}

function titleFromFilename(name) {
  return stripDatePrefix(name).replace(/[-_]+/g, ' ').trim();
}

/** Aproxima o texto renderizado de um heading, pra slugificar igual ao browser. */
function stripInlineMarkdown(text) {
  return text
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]|]+)\]\]/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

function buildHeadingSlugMap(body) {
  const map = new Map();
  for (const match of body.matchAll(HEADING_RE)) {
    const rawText = match[1].trim();
    const cleanText = stripInlineMarkdown(rawText);
    const slug = slugifyHeading(cleanText);
    map.set(rawText, slug);
    map.set(cleanText, slug);
  }
  return map;
}

/**
 * Frontmatter aqui é sempre `chave: valor` — não precisa de parser de YAML.
 * Devolve { data, body }.
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line
      .slice(i + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');
  }
  return { data, body: match[2] };
}

/** Datas são escritas com aspas pra não virarem outra coisa quando relidas. */
function stringifyFrontmatter(data, body) {
  const lines = Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}: ${key === 'date' ? `'${value}'` : value}`);
  return `---\n${lines.join('\n')}\n---\n${body.trim()}\n`;
}

// Pastas que o dono do vault usa pra guardar rascunho — nunca são publicadas.
const IGNORED_DIR_NAMES = new Set(['ignorar', 'ignore']);

function isUnderIgnoredDir(relPath) {
  return relPath
    .split(path.sep)
    .slice(0, -1)
    .some((segment) => IGNORED_DIR_NAMES.has(segment.toLowerCase()));
}

async function walkMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true, recursive: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      const base = entry.parentPath ?? entry.path ?? dir;
      const relPath = path.relative(dir, path.join(base, entry.name));
      if (isUnderIgnoredDir(relPath)) continue;
      files.push(path.join(base, entry.name));
    }
  }
  return files;
}

async function findFileInVault(vaultDir, filename) {
  const entries = await fs.readdir(vaultDir, { withFileTypes: true, recursive: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name === filename) {
      const base = entry.parentPath ?? entry.path ?? vaultDir;
      const relPath = path.relative(vaultDir, path.join(base, entry.name));
      if (isUnderIgnoredDir(relPath)) continue;
      return path.join(base, entry.name);
    }
  }
  return null;
}

/**
 * Hospedagem estática não lista diretório, então o browser não tem como
 * descobrir as entradas sozinho — esse manifesto é a lista dele.
 */
async function writeDevlogManifest(entries, dryRun) {
  const changelogFiles = await fs.readdir(CHANGELOG_DIR).catch(() => []);
  const changelog = [];
  for (const file of changelogFiles.filter((f) => f.endsWith('.md'))) {
    const raw = await fs.readFile(path.join(CHANGELOG_DIR, file), 'utf-8');
    const { data } = parseFrontmatter(raw);
    changelog.push({ slug: file.replace(/\.md$/, ''), version: data.version ?? '', date: data.date ?? '' });
  }
  changelog.sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }));

  const manifest = {
    entries: entries.sort((a, b) => a.title.localeCompare(b.title)),
    changelog,
  };
  const out = path.join(CONTENT_DIR, 'devlog', 'index.json');
  if (dryRun) {
    console.log(`would write ${path.relative(REPO_ROOT, out)} (${entries.length} entradas, ${changelog.length} versões)`);
  } else {
    await fs.writeFile(out, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
    console.log(`manifesto: ${entries.length} entradas, ${changelog.length} versões`);
  }
}

/** Mesma ideia pro top 10 — lê os .json que existem e monta o índice. */
async function writeTop10Manifest(dryRun) {
  const files = (await fs.readdir(TOP10_DIR).catch(() => []))
    .filter((f) => f.endsWith('.json') && f !== 'index.json');

  const lists = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(TOP10_DIR, file), 'utf-8');
    const list = JSON.parse(raw);
    lists.push({ slug: list.slug, title: list.title, description: list.description ?? '' });
  }
  lists.sort((a, b) => a.title.localeCompare(b.title));

  const out = path.join(TOP10_DIR, 'index.json');
  if (dryRun) {
    console.log(`would write ${path.relative(REPO_ROOT, out)} (${lists.length} listas)`);
  } else {
    await fs.writeFile(out, JSON.stringify(lists, null, 2) + '\n', 'utf-8');
    console.log(`manifesto top10: ${lists.length} listas`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const vaultArg = args.find((a) => !a.startsWith('--'));

  // Sem vault: só regenera os manifestos a partir do que já está em content/.
  if (!vaultArg) {
    console.log('Nenhum vault informado — regenerando só os manifestos.\n');
    const files = await fs.readdir(ENTRIES_DIR).catch(() => []);
    const entries = [];
    for (const file of files.filter((f) => f.endsWith('.md'))) {
      const raw = await fs.readFile(path.join(ENTRIES_DIR, file), 'utf-8');
      const { data } = parseFrontmatter(raw);
      entries.push({
        slug: file.replace(/\.md$/, ''),
        title: data.title ?? file.replace(/\.md$/, ''),
        date: data.date ?? '',
        section: data.section ?? '',
      });
    }
    await writeDevlogManifest(entries, dryRun);
    await writeTop10Manifest(dryRun);
    return;
  }

  const vaultDir = path.resolve(vaultArg);
  const vaultStat = await fs.stat(vaultDir).catch(() => null);
  if (!vaultStat?.isDirectory()) {
    console.error(`Não é uma pasta: ${vaultDir}`);
    process.exit(1);
  }

  const mdFiles = await walkMarkdownFiles(vaultDir);
  if (mdFiles.length === 0) {
    console.log('Nenhum markdown encontrado em', vaultDir);
    return;
  }

  // Monta o mapa de slugs antes, pra que links entre notas resolvam
  // independente da ordem em que os arquivos são processados.
  const slugByFilename = new Map();
  for (const filePath of mdFiles) {
    const filename = path.basename(filePath, '.md');
    slugByFilename.set(filename.toLowerCase(), slugifyFilename(titleFromFilename(filename)));
  }

  if (!dryRun) {
    await fs.mkdir(ENTRIES_DIR, { recursive: true });
    await fs.mkdir(ATTACHMENTS_DIR, { recursive: true });
  }

  const syncedSlugs = new Set();
  const manifestEntries = [];
  let resolvedLinks = 0;
  let unresolvedLinks = 0;
  let copiedAttachments = 0;

  for (const filePath of mdFiles) {
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, body: content } = parseFrontmatter(raw);
    const filename = path.basename(filePath, '.md');
    const slug = slugByFilename.get(filename.toLowerCase());
    const relSource = path.relative(vaultDir, filePath).replace(/\\/g, '/');

    // A pasta relativa à raiz do vault vira a seção. Nota na raiz não tem seção.
    const relDir = path.dirname(relSource);
    const section = relDir === '.' ? undefined : relDir;

    const headingSlugMap = buildHeadingSlugMap(content);
    let body = content;

    // Embeds primeiro: ![[img.png]] contém [[img.png]], então se os wikilinks
    // rodassem antes, o "!" ficaria órfão.
    const embedTargets = [];
    body = body.replace(EMBED_RE, (_match, target) => {
      embedTargets.push(target.trim());
      return `__EMBED_${embedTargets.length - 1}__`;
    });

    for (let i = 0; i < embedTargets.length; i++) {
      const attachmentName = path.basename(embedTargets[i]);
      const found = await findFileInVault(vaultDir, attachmentName);
      const placeholder = `__EMBED_${i}__`;
      if (found) {
        if (!dryRun) await fs.copyFile(found, path.join(ATTACHMENTS_DIR, attachmentName));
        copiedAttachments++;
        body = body.replace(placeholder, `![${attachmentName}](content/devlog/attachments/${attachmentName})`);
      } else {
        console.warn(`  ! anexo não encontrado: "${embedTargets[i]}" em ${relSource}`);
        body = body.replace(placeholder, `*(anexo faltando: ${attachmentName})*`);
      }
    }

    body = body.replace(WIKILINK_RE, (_match, notePart, headingPart, display) => {
      const noteName = notePart.trim();
      const heading = headingPart?.trim();
      const label = (display ?? (noteName || heading)).trim();

      // [[#Título]] — link pra uma seção da própria página.
      if (!noteName && heading) {
        const headingSlug = headingSlugMap.get(heading);
        if (headingSlug) {
          resolvedLinks++;
          return `[${label}](#${headingSlug})`;
        }
        unresolvedLinks++;
        return label;
      }

      const targetSlug = slugByFilename.get(noteName.toLowerCase());
      if (targetSlug) {
        resolvedLinks++;
        // Link pra outra nota. Heading de outra página não dá pra combinar com
        // ?slug=, então cai na entrada inteira.
        return `[${label}](entry.html?slug=${targetSlug})`;
      }
      unresolvedLinks++;
      return label;
    });

    const frontmatter = {
      title: data.title ?? titleFromFilename(filename),
      date: data.date ?? new Date().toISOString().slice(0, 10),
      ...(section ? { section } : {}),
      ...(data.version ? { version: data.version } : {}),
      sourceNote: relSource,
    };

    const outPath = path.join(ENTRIES_DIR, `${slug}.md`);
    syncedSlugs.add(slug);
    manifestEntries.push({
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      section: section ?? '',
    });

    if (dryRun) {
      console.log(`would write ${path.relative(REPO_ROOT, outPath)} (de ${relSource})`);
    } else {
      await fs.writeFile(outPath, stringifyFrontmatter(frontmatter, body), 'utf-8');
      console.log(`ok ${path.relative(REPO_ROOT, outPath)} (de ${relSource})`);
    }
  }

  if (!dryRun) {
    const existing = await fs.readdir(ENTRIES_DIR).catch(() => []);
    const orphaned = existing
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))
      .filter((s) => !syncedSlugs.has(s));
    if (orphaned.length > 0) {
      console.warn('\nEstas entradas não têm mais origem no vault:');
      for (const slug of orphaned) console.warn(`  - content/devlog/entries/${slug}.md`);
      console.warn('Ficaram intactas. Apague à mão se não forem mais usadas.');
    }
  }

  await writeDevlogManifest(manifestEntries, dryRun);
  await writeTop10Manifest(dryRun);

  console.log(
    `\nPronto. ${mdFiles.length} nota(s), ${copiedAttachments} anexo(s), ` +
      `${resolvedLinks} link(s) resolvido(s), ${unresolvedLinks} viraram texto.`,
  );
  if (dryRun) console.log('(dry run — nada foi escrito)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
