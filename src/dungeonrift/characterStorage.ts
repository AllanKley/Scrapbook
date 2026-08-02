import type { Character } from './types';

const STORAGE_KEY = 'dungeonrift.characters.v1';

interface CharacterStore {
  version: 1;
  characters: Record<string, Character>;
}

function emptyStore(): CharacterStore {
  return { version: 1, characters: {} };
}

function loadStore(): CharacterStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.characters) return emptyStore();
    return parsed as CharacterStore;
  } catch {
    return emptyStore();
  }
}

function saveStore(store: CharacterStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

/**
 * schemaVersion 2 is a hard break from v1 (Atributos/Perícias/Classe/Conexões replaced by
 * Traços/Experiências/Linhagem/Vínculos) — no real characters existed under v1 yet, so there's
 * no migration path. A v1-shaped object simply fails this check and is silently omitted by
 * listCharacters()/getCharacter() rather than crashing.
 */
function isValidCharacter(value: unknown): value is Character {
  if (!value || typeof value !== 'object') return false;
  const c = value as Record<string, unknown>;
  return (
    typeof c.id === 'string' &&
    c.schemaVersion === 2 &&
    typeof c.name === 'string' &&
    typeof c.traits === 'object' &&
    typeof c.linhagemKey !== 'undefined' &&
    Array.isArray(c.experiencias) &&
    typeof c.resources === 'object'
  );
}

function generateId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `char-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'personagem'
  );
}

export function listCharacters(): Character[] {
  const store = loadStore();
  return Object.values(store.characters)
    .filter(isValidCharacter)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getCharacter(id: string): Character | undefined {
  const store = loadStore();
  const character = store.characters[id];
  return character && isValidCharacter(character) ? character : undefined;
}

export function createCharacter(
  draft: Omit<Character, 'id' | 'schemaVersion' | 'createdAt' | 'updatedAt'>,
): Character {
  const now = new Date().toISOString();
  const character: Character = {
    ...draft,
    id: generateId(),
    schemaVersion: 2,
    createdAt: now,
    updatedAt: now,
  };
  const store = loadStore();
  store.characters[character.id] = character;
  saveStore(store);
  return character;
}

export function updateCharacter(id: string, patch: Partial<Character>): Character {
  const store = loadStore();
  const existing = store.characters[id];
  if (!existing) throw new Error(`Character not found: ${id}`);
  const updated: Character = { ...existing, ...patch, id: existing.id, updatedAt: new Date().toISOString() };
  store.characters[id] = updated;
  saveStore(store);
  return updated;
}

export function deleteCharacter(id: string): void {
  const store = loadStore();
  delete store.characters[id];
  saveStore(store);
}

export function exportCharacterToFile(id: string): void {
  const character = getCharacter(id);
  if (!character) throw new Error(`Character not found: ${id}`);
  const blob = new Blob([JSON.stringify(character, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${slugify(character.name)}-${character.id.slice(0, 8)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importCharacterFromFile(file: File): Promise<Character> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (!isValidCharacter(parsed)) {
          reject(new Error('Arquivo inválido: não parece ser uma ficha de personagem do Dungeon Rift.'));
          return;
        }
        // Never overwrite an existing character by id — always a fresh record, renamed on
        // name collision, so a bad/duplicate file can't clobber something already saved.
        const store = loadStore();
        const nameTaken = Object.values(store.characters).some((c) => c.name === parsed.name);
        const now = new Date().toISOString();
        const imported: Character = {
          ...parsed,
          id: generateId(),
          name: nameTaken ? `${parsed.name} (importado)` : parsed.name,
          createdAt: now,
          updatedAt: now,
        };
        store.characters[imported.id] = imported;
        saveStore(store);
        resolve(imported);
      } catch {
        reject(new Error('Arquivo inválido: não foi possível ler o JSON.'));
      }
    };
    reader.onerror = () => reject(reader.error ?? new Error('Falha ao ler o arquivo.'));
    reader.readAsText(file);
  });
}
