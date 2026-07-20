import { describe, it, expect } from 'vitest';
import { raidBosses, spriteUrl } from '../raidData';

describe('raidData', () => {
  it('has no duplicate IDs', () => {
    const ids = raidBosses.map(b => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every boss has required fields populated', () => {
    for (const boss of raidBosses) {
      expect(boss.name.length).toBeGreaterThan(0);
      expect(boss.dexNumber).toBeGreaterThan(0);
      expect(boss.types.length).toBeGreaterThanOrEqual(1);
      expect(boss.weaknesses.length).toBeGreaterThanOrEqual(1);
      expect(boss.counterSearch.length).toBeGreaterThan(0);
      expect(boss.category).toBeTruthy();
    }
  });

  it('counter search strings only contain valid characters', () => {
    for (const boss of raidBosses) {
      // Should only have ASCII printable, no curly quotes
      expect(boss.counterSearch).toMatch(/^[\x20-\x7E]+$/);
    }
  });

  it('counter search strings reference move types with @1, @2, and @3 syntax', () => {
    for (const boss of raidBosses) {
      expect(boss.counterSearch).toMatch(/@1\w+/);
      expect(boss.counterSearch).toMatch(/@2\w+/);
      expect(boss.counterSearch).toMatch(/@3\w+/);
    }
  });

  it('counter search strings use only OR (commas) between terms', () => {
    for (const boss of raidBosses) {
      // Should not contain & operator
      expect(boss.counterSearch).not.toContain('&');
    }
  });

  it('every weakness type is a valid Pokemon type', () => {
    const validTypes = [
      'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
      'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
      'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy',
    ];
    for (const boss of raidBosses) {
      for (const w of boss.weaknesses) {
        expect(validTypes).toContain(w.type);
      }
    }
  });

  it('every weakness has a valid multiplier format', () => {
    for (const boss of raidBosses) {
      for (const w of boss.weaknesses) {
        expect(w.multiplier).toMatch(/^\d+\.\d+x$/);
      }
    }
  });

  it('has at least one boss per key category', () => {
    const categories = new Set(raidBosses.map(b => b.category));
    expect(categories.has('Legendary')).toBe(true);
    expect(categories.has('Mega')).toBe(true);
    expect(categories.has('Dynamax')).toBe(true);
  });

  it('spriteUrl generates valid PokeAPI URLs', () => {
    const url = spriteUrl(25);
    expect(url).toContain('raw.githubusercontent.com');
    expect(url).toContain('/25.png');
  });

  it('has all July 2025 tier 5 bosses', () => {
    const names = raidBosses.map(b => b.name.toLowerCase());
    expect(names).toContain('articuno');
    expect(names).toContain('zapdos');
    expect(names).toContain('moltres');
    expect(names).toContain('kyogre');
    expect(names).toContain('solgaleo');
    expect(names).toContain('kyurem');
  });

  it('has all July 2025 mega bosses', () => {
    const names = raidBosses.map(b => b.name.toLowerCase());
    expect(names).toContain('mega lucario');
    expect(names).toContain('mega sceptile');
    expect(names).toContain('mega salamence');
    expect(names).toContain('mega aggron');
  });

  it('has all July 2025 dynamax bosses', () => {
    const names = raidBosses.map(b => b.name.toLowerCase());
    expect(names).toContain('dynamax chansey');
    expect(names).toContain('dynamax deino');
    expect(names).toContain('dynamax trubbish');
    expect(names).toContain('dynamax feebas');
  });
});
