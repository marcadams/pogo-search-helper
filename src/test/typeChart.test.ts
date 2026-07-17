import { describe, it, expect } from 'vitest';
import { TYPES, effectiveness, getEffectiveness } from '../typeChart';

describe('typeChart', () => {
  it('has exactly 18 types', () => {
    expect(TYPES.length).toBe(18);
  });

  it('every type in effectiveness map is a valid type', () => {
    for (const atk of Object.keys(effectiveness)) {
      expect(TYPES).toContain(atk);
      for (const def of Object.keys(effectiveness[atk])) {
        expect(TYPES).toContain(def);
      }
    }
  });

  it('effectiveness values are only 2, 0.5, or 0', () => {
    for (const atk of Object.keys(effectiveness)) {
      for (const val of Object.values(effectiveness[atk])) {
        expect([2, 0.5, 0]).toContain(val);
      }
    }
  });

  it('getEffectiveness returns 1 for neutral matchups', () => {
    // Normal vs Normal is neutral
    expect(getEffectiveness('Normal', 'Normal')).toBe(1);
    // Fire vs Normal is neutral
    expect(getEffectiveness('Fire', 'Normal')).toBe(1);
  });

  it('Fire is super effective against Grass', () => {
    expect(getEffectiveness('Fire', 'Grass')).toBe(2);
  });

  it('Water is not very effective against Water', () => {
    expect(getEffectiveness('Water', 'Water')).toBe(0.5);
  });

  it('Normal has no effect on Ghost', () => {
    expect(getEffectiveness('Normal', 'Ghost')).toBe(0);
  });

  it('Electric has no effect on Ground', () => {
    expect(getEffectiveness('Electric', 'Ground')).toBe(0);
  });

  it('Dragon has no effect on Fairy', () => {
    expect(getEffectiveness('Dragon', 'Fairy')).toBe(0);
  });

  it('Ghost has no effect on Normal', () => {
    expect(getEffectiveness('Ghost', 'Normal')).toBe(0);
  });

  it('Fighting is super effective against Normal, Ice, Rock, Dark, Steel', () => {
    expect(getEffectiveness('Fighting', 'Normal')).toBe(2);
    expect(getEffectiveness('Fighting', 'Ice')).toBe(2);
    expect(getEffectiveness('Fighting', 'Rock')).toBe(2);
    expect(getEffectiveness('Fighting', 'Dark')).toBe(2);
    expect(getEffectiveness('Fighting', 'Steel')).toBe(2);
  });

  it('Fairy is super effective against Fighting, Dragon, Dark', () => {
    expect(getEffectiveness('Fairy', 'Fighting')).toBe(2);
    expect(getEffectiveness('Fairy', 'Dragon')).toBe(2);
    expect(getEffectiveness('Fairy', 'Dark')).toBe(2);
  });
});
