import { describe, it, expect } from 'vitest';
import { recipes } from '../recipeData';

describe('recipeData', () => {
  it('has no duplicate IDs', () => {
    const ids = recipes.map(r => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every recipe has a non-empty name, string, description, and category', () => {
    for (const r of recipes) {
      expect(r.name.length).toBeGreaterThan(0);
      expect(r.string.length).toBeGreaterThan(0);
      expect(r.description.length).toBeGreaterThan(0);
      expect(r.category.length).toBeGreaterThan(0);
    }
  });

  it('no recipe string contains curly quotes or non-ASCII', () => {
    for (const r of recipes) {
      // search strings should only contain ASCII printable characters
      expect(r.string).toMatch(/^[\x20-\x7E]+$/);
    }
  });

  it('has at least 15 recipes', () => {
    expect(recipes.length).toBeGreaterThanOrEqual(15);
  });

  it('has multiple categories', () => {
    const categories = new Set(recipes.map(r => r.category));
    expect(categories.size).toBeGreaterThanOrEqual(5);
  });
});
