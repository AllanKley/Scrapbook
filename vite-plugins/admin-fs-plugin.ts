import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Connect, Plugin } from 'vite';
import type { ServerResponse } from 'node:http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = path.resolve(__dirname, '../content');
const TOP10_DIR = path.join(CONTENT_ROOT, 'top10');
const THEME_FILE = path.join(CONTENT_ROOT, 'theme.json');

function safeJoin(base: string, ...segments: string[]) {
  const target = path.resolve(base, ...segments);
  const normalizedBase = path.resolve(base);
  if (target !== normalizedBase && !target.startsWith(normalizedBase + path.sep)) {
    throw new Error('Path escape blocked');
  }
  return target;
}

function readBody(req: Connect.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

async function withErrorHandling(
  res: ServerResponse,
  handler: () => Promise<void>,
) {
  try {
    await handler();
  } catch (err) {
    sendJson(res, 400, { error: err instanceof Error ? err.message : String(err) });
  }
}

export default function adminFsPlugin(): Plugin {
  return {
    name: 'admin-fs-plugin',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__admin-api/top10', async (req, res) => {
        await withErrorHandling(res, async () => {
          if (req.method === 'GET') {
            const files = (await fs.readdir(TOP10_DIR)).filter((f) => f.endsWith('.json'));
            const lists = await Promise.all(
              files.map(async (f) => JSON.parse(await fs.readFile(safeJoin(TOP10_DIR, f), 'utf-8'))),
            );
            sendJson(res, 200, lists);
            return;
          }
          if (req.method === 'PUT') {
            const body = JSON.parse(await readBody(req));
            if (!body.slug || typeof body.slug !== 'string') throw new Error('Missing slug');
            const filePath = safeJoin(TOP10_DIR, `${body.slug}.json`);
            await fs.writeFile(filePath, JSON.stringify(body, null, 2) + '\n', 'utf-8');
            sendJson(res, 200, { ok: true });
            return;
          }
          if (req.method === 'DELETE') {
            const url = new URL(req.url ?? '/', 'http://localhost');
            const slug = url.searchParams.get('slug');
            if (!slug) throw new Error('Missing slug');
            await fs.unlink(safeJoin(TOP10_DIR, `${slug}.json`));
            sendJson(res, 200, { ok: true });
            return;
          }
          res.statusCode = 405;
          res.end();
        });
      });

      server.middlewares.use('/__admin-api/theme', async (req, res) => {
        await withErrorHandling(res, async () => {
          if (req.method === 'GET') {
            const raw = await fs.readFile(THEME_FILE, 'utf-8');
            sendJson(res, 200, JSON.parse(raw));
            return;
          }
          if (req.method === 'PUT') {
            const body = JSON.parse(await readBody(req));
            await fs.writeFile(THEME_FILE, JSON.stringify(body, null, 2) + '\n', 'utf-8');
            sendJson(res, 200, { ok: true });
            return;
          }
          res.statusCode = 405;
          res.end();
        });
      });
    },
  };
}
