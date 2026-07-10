# scrapbook

my personal corner of the internet — top 10 lists and a devlog for the ttrpg
system i'm building. fully static, hosted free on GitHub Pages.

## how this works

- **normal view** is whatever's on the live site. no login, nothing hidden —
  it's just the built static site.
- **admin view** only exists on my own machine. running `npm run dev` starts
  a local dev server with a `/admin` route where I can edit top 10 lists and
  the color palette right in the browser; changes write straight to the JSON
  files in `content/`. That admin code and the local file-write API are both
  compiled out of the production build entirely — see
  `vite-plugins/admin-fs-plugin.ts` and the `import.meta.env.DEV` gate in
  `src/App.tsx`.
- content lives as files in `content/` (JSON for top 10 lists + the theme
  palette, Markdown for devlog entries/changelog), versioned by git.

## commands

```bash
npm run dev       # local dev server + admin editing UI at /admin
npm run build     # production build to dist/ (no admin code included)
npm run preview   # serve the production build locally to sanity-check it
npm run sync-devlog -- <path-to-obsidian-vault-subfolder> [--dry-run]
```

## day-to-day workflow

1. `npm run dev`, go to `/admin`, edit top 10 lists or the palette.
2. Or edit `content/*.json` / `content/devlog/**/*.md` directly by hand.
3. `git add`, commit, push to `main` — GitHub Actions builds and deploys
   automatically (see `.github/workflows/deploy.yml`).

## syncing the ttrpg devlog from Obsidian

```bash
npm run sync-devlog -- "C:\path\to\vault\Devlog" --dry-run   # preview first
npm run sync-devlog -- "C:\path\to\vault\Devlog"              # then for real
```

This copies every `.md` file in that vault folder into
`content/devlog/entries/`, converting Obsidian syntax into portable Markdown
as it goes:

- `[[Note]]` / `[[Note|Display]]` → a real link to the synced entry, or
  plain text if that note wasn't part of this sync.
- `![[image.png]]` → copies the image into
  `public/content/devlog/attachments/` and rewrites it as a normal Markdown
  image.

It never deletes previously-synced entries whose source disappeared from the
vault folder — it just warns about them so nothing gets lost by accident.

After syncing, `git diff` shows exactly what changed. Ask Claude to draft
`content/devlog/changelog/vX.Y.Z.md` — a "what changed since last version"
writeup — from that diff, then commit the synced entries and the changelog
entry together.

## one-time setup

- Repo Settings → Pages → Source: **GitHub Actions**.
- `vite.config.ts` has `base: '/Scrapbook/'` for GitHub Pages project-page
  hosting — update this if the repo is ever renamed.
