import { describe, it, expect } from 'vitest';
import { pvpMons } from '../pvpData';
import { rankIvs, getTopRank } from '../pvpCalc';

describe('pvpData', () => {
  it('has no duplicate IDs', () => {
    const ids = pvpMons.map(m => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every mon has valid base stats', () => {
    for (const mon of pvpMons) {
      expect(mon.baseAtk).toBeGreaterThan(0);
      expect(mon.baseDef).toBeGreaterThan(0);
      expect(mon.baseHp).toBeGreaterThan(0);
      expect(mon.dexNumber).toBeGreaterThan(0);
      expect(mon.name.length).toBeGreaterThan(0);
    }
  });

  it('has at least 100 Pokemon', () => {
    expect(pvpMons.length).toBeGreaterThanOrEqual(100);
  });

  it('list is sorted alphabetically', () => {
    for (let i = 1; i < pvpMons.length; i++) {
      expect(pvpMons[i].name.localeCompare(pvpMons[i - 1].name)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('pvpCalc - rankIvs', () => {
  const azumarill = pvpMons.find(m => m.id === 'azumarill')!;

  it('returns rank 1 for the best IV combo', () => {
    const top = getTopRank(azumarill, 1500);
    const result = rankIvs(azumarill, top.atk, top.def, top.hp, 1500);
    expect(result.rank).toBe(1);
    expect(result.percentile).toBe(100);
  });

  it('15/15/15 is NOT rank 1 in Great League for Azumarill', () => {
    const result = rankIvs(azumarill, 15, 15, 15, 1500);
    expect(result.rank).toBeGreaterThan(1);
  });

  it('15/15/15 IS rank 1 in Master League (no cap)', () => {
    const result = rankIvs(azumarill, 15, 15, 15, 99999);
    expect(result.rank).toBe(1);
  });

  it('rank is between 1 and 4096', () => {
    const result = rankIvs(azumarill, 5, 10, 8, 1500);
    expect(result.rank).toBeGreaterThanOrEqual(1);
    expect(result.rank).toBeLessThanOrEqual(4096);
  });

  it('percentile is between 0 and 100', () => {
    const result = rankIvs(azumarill, 5, 10, 8, 1500);
    expect(result.percentile).toBeGreaterThan(0);
    expect(result.percentile).toBeLessThanOrEqual(100);
  });

  it('CP does not exceed the league cap', () => {
    const result = rankIvs(azumarill, 0, 15, 15, 1500);
    expect(result.cp).toBeLessThanOrEqual(1500);
  });

  it('level is a valid half-level', () => {
    const result = rankIvs(azumarill, 0, 15, 15, 1500);
    expect(result.level).toBeGreaterThanOrEqual(1);
    expect(result.level % 0.5).toBe(0);
  });
});

describe('pvpCalc - getTopRank', () => {
  const medicham = pvpMons.find(m => m.id === 'medicham')!;

  it('returns rank 1', () => {
    const top = getTopRank(medicham, 1500);
    expect(top.rank).toBe(1);
    expect(top.percentile).toBe(100);
  });

  it('top rank CP does not exceed cap', () => {
    const top = getTopRank(medicham, 1500);
    expect(top.cp).toBeLessThanOrEqual(1500);
  });

  it('top rank for ML is always 15/15/15', () => {
    const top = getTopRank(medicham, 99999);
    expect(top.atk).toBe(15);
    expect(top.def).toBe(15);
    expect(top.hp).toBe(15);
  });

  it('top rank for GL typically has low attack IV', () => {
    const top = getTopRank(medicham, 1500);
    // Most GL Pokemon have optimal attack IV below 5
    expect(top.atk).toBeLessThanOrEqual(8);
  });
});
