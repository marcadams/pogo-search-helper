import { useState, useMemo, useRef, useEffect } from 'react';
import { pvpMons, type PvpMon } from './pvpData';
import { rankIvs, getTopRank } from './pvpCalc';
import { useI18n } from './i18n';

const LEAGUES = [
  { key: 'pvp.league.great', cap: 1500 },
  { key: 'pvp.league.ultra', cap: 2500 },
  { key: 'pvp.league.master', cap: 99999 },
] as const;

function spriteUrl(name: string): string {
  // Use PokeAPI sprites by matching name to dex number from our data
  const mon = pvpMons.find(m => m.name === name);
  if (!mon) return '';
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.dexNumber}.png`;
}

export default function PvpPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [selectedMon, setSelectedMon] = useState<PvpMon>(pvpMons[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [league, setLeague] = useState<{ key: string; cap: number }>(LEAGUES[0]);
  const [ivAtk, setIvAtk] = useState(0);
  const [ivDef, setIvDef] = useState(15);
  const [ivHp, setIvHp] = useState(15);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return pvpMons;
    const q = search.toLowerCase();
    return pvpMons.filter(m => m.name.toLowerCase().includes(q));
  }, [search]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function selectMon(mon: PvpMon) {
    setSelectedMon(mon);
    setSearch('');
    setDropdownOpen(false);
  }

  const result = useMemo(() => {
    return rankIvs(selectedMon, ivAtk, ivDef, ivHp, league.cap);
  }, [selectedMon, ivAtk, ivDef, ivHp, league]);

  const topRank = useMemo(() => {
    return getTopRank(selectedMon, league.cap);
  }, [selectedMon, league]);

  function rankColor(rank: number): string {
    if (rank <= 10) return 'pvp-rank--elite';
    if (rank <= 100) return 'pvp-rank--great';
    if (rank <= 500) return 'pvp-rank--good';
    return 'pvp-rank--ok';
  }

  return (
    <section className="pvp-page" aria-label="PvP IV Rank Checker">
      <div className="pvp-intro">
        <h2>{t('pvp.title')}</h2>
        <p>{t('pvp.sub')}</p>
      </div>

      {/* Pokemon selector - searchable dropdown */}
      <div className="pvp-selector" ref={dropdownRef}>
        <div className="pvp-selected-display" onClick={() => setDropdownOpen(true)}>
          <img
            src={spriteUrl(selectedMon.name)}
            alt={selectedMon.name}
            className="pvp-selected-sprite"
            width="40"
            height="40"
          />
          <span className="pvp-selected-name">{selectedMon.name}</span>
          <span className="pvp-selected-arrow">▾</span>
        </div>
        {dropdownOpen && (
          <div className="pvp-dropdown">
            <input
              className="pvp-dropdown-search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Type to search..."
              autoFocus
              aria-label="Search Pokemon"
            />
            <ul className="pvp-dropdown-list">
              {filtered.map(mon => (
                <li key={mon.id}>
                  <button className="pvp-dropdown-item" onClick={() => selectMon(mon)}>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.dexNumber}.png`}
                      alt={mon.name}
                      width="32"
                      height="32"
                      loading="lazy"
                    />
                    <span>{mon.name}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="pvp-dropdown-empty">{t('pvp.noResults')}</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* League picker */}
      <div className="pvp-leagues">
        {LEAGUES.map(l => (
          <button
            key={l.key}
            className={`pvp-league-btn${league.key === l.key ? ' active' : ''}`}
            onClick={() => setLeague(l)}
          >
            {t(l.key)}
          </button>
        ))}
      </div>

      {/* IV inputs */}
      <div className="pvp-iv-inputs">
        <div className="pvp-iv-field">
          <label>{t('pvp.iv.attack')}</label>
          <input
            type="number" min={0} max={15}
            value={ivAtk}
            onChange={e => setIvAtk(Math.min(15, Math.max(0, parseInt(e.target.value) || 0)))}
          />
          <input
            type="range" min={0} max={15}
            value={ivAtk}
            onChange={e => setIvAtk(parseInt(e.target.value))}
            className="pvp-slider"
          />
        </div>
        <div className="pvp-iv-field">
          <label>{t('pvp.iv.defense')}</label>
          <input
            type="number" min={0} max={15}
            value={ivDef}
            onChange={e => setIvDef(Math.min(15, Math.max(0, parseInt(e.target.value) || 0)))}
          />
          <input
            type="range" min={0} max={15}
            value={ivDef}
            onChange={e => setIvDef(parseInt(e.target.value))}
            className="pvp-slider"
          />
        </div>
        <div className="pvp-iv-field">
          <label>{t('pvp.iv.hp')}</label>
          <input
            type="number" min={0} max={15}
            value={ivHp}
            onChange={e => setIvHp(Math.min(15, Math.max(0, parseInt(e.target.value) || 0)))}
          />
          <input
            type="range" min={0} max={15}
            value={ivHp}
            onChange={e => setIvHp(parseInt(e.target.value))}
            className="pvp-slider"
          />
        </div>
      </div>

      {/* Results */}
      <div className="pvp-result">
        <div className="pvp-result-mon">
          <img
            src={spriteUrl(selectedMon.name)}
            alt={selectedMon.name}
            className="pvp-result-sprite"
            width="64"
            height="64"
          />
          <div className={`pvp-rank-badge ${rankColor(result.rank)}`}>
            <span className="pvp-rank-number">#{result.rank}</span>
            <span className="pvp-rank-total">/ 4,096</span>
          </div>
        </div>
        <div className="pvp-result-details">
          <div className="pvp-result-row">
            <span className="pvp-result-label">{t('pvp.statProduct')}</span>
            <span className="pvp-result-value">{result.percentile.toFixed(2)}%</span>
          </div>
          <div className="pvp-result-row">
            <span className="pvp-result-label">{t('pvp.bestLevel')}</span>
            <span className="pvp-result-value">{result.level}</span>
          </div>
          <div className="pvp-result-row">
            <span className="pvp-result-label">{t('pvp.cpAtLevel')}</span>
            <span className="pvp-result-value">{result.cp}</span>
          </div>
          <div className="pvp-result-row">
            <span className="pvp-result-label">{t('pvp.statProductRaw')}</span>
            <span className="pvp-result-value">{Math.round(result.statProduct).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Ideal comparison */}
      <div className="pvp-ideal">
        <h3>{t('pvp.ideal')} {selectedMon.name} {t('pvp.in')} {t(league.key)}:</h3>
        <p>
          <strong>{topRank.atk}/{topRank.def}/{topRank.hp}</strong> at Level {topRank.level} - CP {topRank.cp}
        </p>
      </div>

      {/* Explainer */}
      <details className="pvp-explainer">
        <summary>{t('pvp.whyTitle')}</summary>
        <div className="pvp-explainer-body">
          <h4>The CP Formula</h4>
          <p>Pokémon GO calculates CP using this formula:</p>
          <code className="pvp-formula">
            CP = (Attack × √Defense × √HP) ÷ 10
          </code>
          <p>Where each stat = <code>(Base + IV) × CPM</code> and CPM is a level-based multiplier.</p>

          <h4>The Key Insight</h4>
          <p>Notice that <strong>Attack has more weight</strong> in the CP formula than Defense or HP - it's multiplied directly, while Defense and HP are under a square root. This means:</p>
          <ul>
            <li>+1 Attack IV raises CP <em>more</em> than +1 Defense or HP IV</li>
            <li>Higher CP = lower max level under the league cap</li>
            <li>Lower max level = less total stats overall</li>
          </ul>

          <h4>{t('pvp.statProduct')}</h4>
          <p>What actually matters in battle is your <strong>total stat product</strong>:</p>
          <code className="pvp-formula">
            Stat Product = Attack × Defense × HP
          </code>
          <p>This represents your overall combat effectiveness - how hard you hit × how much damage you absorb × how long you survive.</p>

          <h4>Why 0/15/15 is Often Ideal</h4>
          <p>By lowering Attack IV, your CP stays low enough to <strong>power up to a higher level</strong>. Higher level means a bigger CPM multiplier applied to ALL stats (including Attack). The net result:</p>
          <ul>
            <li>You lose a tiny bit of Attack from the lower IV</li>
            <li>You gain more Defense, HP, AND Attack from the higher level's CPM</li>
            <li>Total stat product ends up higher than a 15/15/15 at lower level</li>
          </ul>

          <h4>Example: {selectedMon.name} in {t(league.key)}</h4>
          <p>
            A <strong>15/15/15</strong> hits the {league.cap} CP cap at a lower level, while a <strong>{topRank.atk}/{topRank.def}/{topRank.hp}</strong> can reach Level {topRank.level} and squeeze out more total stats under the same cap.
          </p>

          <h4>When This Doesn't Apply</h4>
          <ul>
            <li><strong>Master League</strong> - no CP cap, so 15/15/15 is always best</li>
            <li><strong>Pokémon that max below the cap</strong> - if a Pokémon can't reach 1500 CP even at Level 50 with 15/15/15 (like Chansey in GL), then 15/15/15 is best since you're maxing it anyway</li>
            <li><strong>Breakpoints/bulkpoints</strong> - sometimes a specific Attack IV hits a damage breakpoint against a common opponent, making a higher Attack IV worth the tradeoff</li>
          </ul>

          <h4>What This Calculator Does</h4>
          <p>For all 4,096 possible IV combinations (0-15 for each of Attack, Defense, HP), it:</p>
          <ol>
            <li>Finds the highest level where CP stays ≤ {league.cap}</li>
            <li>Calculates the stat product at that level</li>
            <li>Ranks all combos by stat product (highest = Rank #1)</li>
            <li>Shows where your specific IVs fall in that ranking</li>
          </ol>
        </div>
      </details>
    </section>
  );
}
