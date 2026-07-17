import { cpmByLevel, type PvpMon } from './pvpData';

export type IvCombo = {
  atk: number;
  def: number;
  hp: number;
  level: number;
  cp: number;
  statProduct: number;
  rank: number;
  percentile: number;
};

function calcCp(baseAtk: number, baseDef: number, baseHp: number, ivAtk: number, ivDef: number, ivHp: number, cpm: number): number {
  const atk = (baseAtk + ivAtk) * cpm;
  const def = (baseDef + ivDef) * cpm;
  const hp = Math.max(10, Math.floor((baseHp + ivHp) * cpm));
  const cp = Math.max(10, Math.floor((atk * Math.sqrt(def) * Math.sqrt(hp)) / 10));
  return cp;
}

function calcStats(baseAtk: number, baseDef: number, baseHp: number, ivAtk: number, ivDef: number, ivHp: number, cpm: number) {
  const atk = (baseAtk + ivAtk) * cpm;
  const def = (baseDef + ivDef) * cpm;
  const hp = Math.max(10, Math.floor((baseHp + ivHp) * cpm));
  return { atk, def, hp, statProduct: atk * def * hp };
}

/**
 * Find the best level for a given IV combo under a CP cap.
 * Returns the highest level where CP <= cap.
 */
function bestLevel(mon: PvpMon, ivAtk: number, ivDef: number, ivHp: number, cpCap: number): number {
  let best = 0;
  for (let i = 0; i < cpmByLevel.length; i++) {
    const cp = calcCp(mon.baseAtk, mon.baseDef, mon.baseHp, ivAtk, ivDef, ivHp, cpmByLevel[i]);
    if (cp <= cpCap) {
      best = i;
    } else {
      break;
    }
  }
  return best;
}

/**
 * Calculate all 4096 IV combinations, rank them by stat product, and return
 * the rank info for the specified IVs.
 */
export function rankIvs(mon: PvpMon, ivAtk: number, ivDef: number, ivHp: number, cpCap: number): IvCombo {
  const allCombos: { atk: number; def: number; hp: number; level: number; statProduct: number; cp: number }[] = [];

  for (let a = 0; a <= 15; a++) {
    for (let d = 0; d <= 15; d++) {
      for (let h = 0; h <= 15; h++) {
        const lvlIdx = bestLevel(mon, a, d, h, cpCap);
        const cpm = cpmByLevel[lvlIdx];
        const cp = calcCp(mon.baseAtk, mon.baseDef, mon.baseHp, a, d, h, cpm);
        const stats = calcStats(mon.baseAtk, mon.baseDef, mon.baseHp, a, d, h, cpm);
        allCombos.push({ atk: a, def: d, hp: h, level: lvlIdx, statProduct: stats.statProduct, cp });
      }
    }
  }

  // Sort by stat product descending
  allCombos.sort((a, b) => b.statProduct - a.statProduct);

  const best = allCombos[0].statProduct;
  const targetIdx = allCombos.findIndex(c => c.atk === ivAtk && c.def === ivDef && c.hp === ivHp);
  const target = allCombos[targetIdx];
  const rank = targetIdx + 1;
  const percentile = (target.statProduct / best) * 100;
  const level = (target.level / 2) + 1; // Convert index to actual level

  return {
    atk: ivAtk,
    def: ivDef,
    hp: ivHp,
    level,
    cp: target.cp,
    statProduct: target.statProduct,
    rank,
    percentile,
  };
}

/**
 * Get the #1 ranked IV combo for a mon/league.
 */
export function getTopRank(mon: PvpMon, cpCap: number): IvCombo {
  let bestProduct = 0;
  let bestCombo = { atk: 0, def: 0, hp: 0, level: 0, cp: 0 };

  for (let a = 0; a <= 15; a++) {
    for (let d = 0; d <= 15; d++) {
      for (let h = 0; h <= 15; h++) {
        const lvlIdx = bestLevel(mon, a, d, h, cpCap);
        const cpm = cpmByLevel[lvlIdx];
        const cp = calcCp(mon.baseAtk, mon.baseDef, mon.baseHp, a, d, h, cpm);
        const stats = calcStats(mon.baseAtk, mon.baseDef, mon.baseHp, a, d, h, cpm);
        if (stats.statProduct > bestProduct) {
          bestProduct = stats.statProduct;
          bestCombo = { atk: a, def: d, hp: h, level: lvlIdx, cp };
        }
      }
    }
  }

  return {
    ...bestCombo,
    level: (bestCombo.level / 2) + 1,
    statProduct: bestProduct,
    rank: 1,
    percentile: 100,
  };
}
