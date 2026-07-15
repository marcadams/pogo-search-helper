import { describe, it, expect } from 'vitest';
import { searchOptions, orOnlyGroups } from '../searchOptions';

describe('searchOptions', () => {
  it('has no duplicate IDs', () => {
    const ids = searchOptions.map(o => o.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('has no duplicate tokens', () => {
    const tokens = searchOptions.map(o => o.token);
    const unique = new Set(tokens);
    expect(unique.size).toBe(tokens.length);
  });

  it('every option has a non-empty label, token, and description', () => {
    for (const opt of searchOptions) {
      expect(opt.label.length).toBeGreaterThan(0);
      expect(opt.token.length).toBeGreaterThan(0);
      expect(opt.description.length).toBeGreaterThan(0);
    }
  });

  it('every option with a group references a valid orOnlyGroups key', () => {
    for (const opt of searchOptions) {
      if (opt.group) {
        expect(orOnlyGroups).toHaveProperty(opt.group);
      }
    }
  });

  it('each orOnlyGroups key has at least 2 options using it', () => {
    for (const groupKey of Object.keys(orOnlyGroups)) {
      const count = searchOptions.filter(o => o.group === groupKey).length;
      expect(count).toBeGreaterThanOrEqual(2);
    }
  });

  it('contains all 18 Pokemon types', () => {
    const types = [
      'normal', 'fire', 'water', 'grass', 'electric', 'ice',
      'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
      'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
    ];
    const tokens = searchOptions.map(o => o.token);
    for (const t of types) {
      expect(tokens).toContain(t);
    }
  });

  it('has all star ratings 0-4', () => {
    for (let i = 0; i <= 4; i++) {
      expect(searchOptions.some(o => o.token === `${i}*`)).toBe(true);
    }
  });
});
