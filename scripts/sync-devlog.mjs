#!/usr/bin/env node
// Syncs markdown notes from an Obsidian vault folder into content/devlog/entries,
// converting Obsidian wikilinks/embeds into portable Markdown at sync time so the
// site never needs Obsidian-specific render plugins.
//
// Usage:
//   npm run sync-devlog -- <path-to-vault-subfolder> [--dry-run]

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const ENTRIES_DIR = path.join(REPO_ROOT, 'content', 'devlog', 'entries');
// Lives under public/ (not content/) so Vite serves it as a static asset at
// /content/devlog/attachments/* in dev and copies it verbatim into dist/ on build.
const ATTACHMENTS_DIR = path.join(REPO_ROOT, 'public', 'content', 'devlog', 'attachments');

const EMBED_RE = /!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
const WIKILINK_RE = /\[\[([^\]|#]+)(?:\|([^\]]+))?\]\]/g;

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function stripDatePrefix(name) {
  return name.replace(/^\d{4}-\d{2}-\d{2}[-_ ]*/, '');
}

function titleFromFilename(name) {
  const stripped = stripDatePrefix(name);
  return stripped.replace(/[-_]+/g, ' ').trim();
}

// js-yaml (via gray-matter) auto-parses bare YYYY-MM-DD scalars into JS Date
// objects, which then re-stringify as full ISO timestamps. Force plain dates
// back to a YYYY-MM-DD string so re-synced frontmatter stays stable.
function normalizeDate(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value;
}

async function walkMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true, recursive: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      const base = entry.parentPath ?? entry.path ?? dir;
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
      return path.join(base, entry.name);
    }
  }
  return null;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const vaultArg = args.find((a) => !a.startsWith('--'));

  if (!vaultArg) {
    console.error('Usage: npm run sync-devlog -- <path-to-vault-subfolder> [--dry-run]');
    process.exit(1);
  }

  const vaultDir = path.resolve(vaultArg);
  const vaultStat = await fs.stat(vaultDir).catch(() => null);
  if (!vaultStat?.isDirectory()) {
    console.error(`Not a directory: ${vaultDir}`);
    process.exit(1);
  }

  const mdFiles = await walkMarkdownFiles(vaultDir);
  if (mdFiles.length === 0) {
    console.log('No markdown files found in', vaultDir);
    return;
  }

  // Build the slug set up front so wikilinks between synced notes resolve correctly
  // regardless of file processing order.
  const slugByFilename = new Map();
  for (const filePath of mdFiles) {
    const filename = path.basename(filePath, '.md');
    slugByFilename.set(filename.toLowerCase(), slugify(titleFromFilename(filename)));
  }

  if (!dryRun) {
    await fs.mkdir(ENTRIES_DIR, { recursive: true });
    await fs.mkdir(ATTACHMENTS_DIR, { recursive: true });
  }

  const syncedSlugs = new Set();
  let resolvedLinks = 0;
  let unresolvedLinks = 0;
  let copiedAttachments = 0;

  for (const filePath of mdFiles) {
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const filename = path.basename(filePath, '.md');
    const slug = slugByFilename.get(filename.toLowerCase());
    const relSource = path.relative(vaultDir, filePath).replace(/\\/g, '/');

    let body = content;

    // Embeds first: `![[image.png]]` is a superset pattern of `[[note]]`, so it
    // must be handled before the plain wikilink pass or the `!` gets orphaned.
    const embedTargets = [];
    body = body.replace(EMBED_RE, (_match, target) => {
      embedTargets.push(target.trim());
      return `__EMBED_PLACEHOLDER_${embedTargets.length - 1}__`;
    });

    for (let i = 0; i < embedTargets.length; i++) {
      const target = embedTargets[i];
      const attachmentName = path.basename(target);
      const found = await findFileInVault(vaultDir, attachmentName);
      const placeholder = `__EMBED_PLACEHOLDER_${i}__`;
      if (found) {
        if (!dryRun) {
          await fs.copyFile(found, path.join(ATTACHMENTS_DIR, attachmentName));
        }
        copiedAttachments++;
        // No leading slash: resolves relative to the deployed base path
        // (e.g. /Scrapbook/) instead of the domain root.
        body = body.replace(placeholder, `![${attachmentName}](content/devlog/attachments/${attachmentName})`);
      } else {
        console.warn(`  ! attachment not found for embed "${target}" in ${relSource}`);
        body = body.replace(placeholder, `*(missing attachment: ${attachmentName})*`);
      }
    }

    body = body.replace(WIKILINK_RE, (_match, noteName, display) => {
      const key = noteName.trim().toLowerCase();
      const label = (display ?? noteName).trim();
      const targetSlug = slugByFilename.get(key);
      if (targetSlug) {
        resolvedLinks++;
        // No leading slash before the hash, for the same base-path reason as above.
        return `[${label}](#/devlog/entry/${targetSlug})`;
      }
      unresolvedLinks++;
      return label;
    });

    const frontmatter = {
      title: data.title ?? titleFromFilename(filename),
      date: normalizeDate(data.date) ?? new Date().toISOString().slice(0, 10),
      ...(data.version ? { version: data.version } : {}),
      ...(data.tags ? { tags: data.tags } : {}),
      ...(data.summary ? { summary: data.summary } : {}),
      sourceNote: relSource,
    };

    const output = matter.stringify(body.trim() + '\n', frontmatter);
    const outPath = path.join(ENTRIES_DIR, `${slug}.md`);
    syncedSlugs.add(slug);

    if (dryRun) {
      console.log(`would write ${path.relative(REPO_ROOT, outPath)} (from ${relSource})`);
    } else {
      await fs.writeFile(outPath, output, 'utf-8');
      console.log(`synced ${path.relative(REPO_ROOT, outPath)} (from ${relSource})`);
    }
  }

  if (!dryRun) {
    const existing = await fs.readdir(ENTRIES_DIR).catch(() => []);
    const orphaned = existing
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))
      .filter((s) => !syncedSlugs.has(s));
    if (orphaned.length > 0) {
      console.warn('\nNote: these previously-synced entries have no matching source in this vault folder run:');
      for (const slug of orphaned) console.warn(`  - content/devlog/entries/${slug}.md`);
      console.warn('They were left untouched. Delete manually if they should go away.');
    }
  }

  const copyVerb = dryRun ? 'would be copied' : 'copied';
  console.log(
    `\nDone. ${mdFiles.length} note(s) processed, ${copiedAttachments} attachment(s) ${copyVerb}, ` +
      `${resolvedLinks} wikilink(s) resolved, ${unresolvedLinks} left as plain text.`,
  );
  if (dryRun) console.log('(dry run — nothing was written)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
