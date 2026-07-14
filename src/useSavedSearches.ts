import { useState, useEffect, useCallback } from 'react';
import type { SearchOption } from './searchOptions';

export type SavedSelection = SearchOption & { excluded: boolean; joiner: '&' | ',' };

export type SavedSearch = {
  id: string;
  name: string;
  string: string;          // pre-rendered for display
  selections: SavedSelection[];
  savedAt: number;
};

const STORAGE_KEY = 'pogo-saved-searches';

function load(): SavedSearch[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedSearch[];
  } catch {
    return [];
  }
}

function persist(saves: SavedSearch[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saves));
}

export function useSavedSearches() {
  const [saves, setSaves] = useState<SavedSearch[]>(load);

  // Keep state in sync if another tab modifies storage
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setSaves(load());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const save = useCallback((name: string, string: string, selections: SavedSelection[]) => {
    setSaves(current => {
      const next = [
        { id: crypto.randomUUID(), name: name.trim() || 'Untitled', string, selections, savedAt: Date.now() },
        ...current,
      ];
      persist(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setSaves(current => {
      const next = current.filter(s => s.id !== id);
      persist(next);
      return next;
    });
  }, []);

  const rename = useCallback((id: string, name: string) => {
    setSaves(current => {
      const next = current.map(s => s.id === id ? { ...s, name: name.trim() || 'Untitled' } : s);
      persist(next);
      return next;
    });
  }, []);

  return { saves, save, remove, rename };
}
