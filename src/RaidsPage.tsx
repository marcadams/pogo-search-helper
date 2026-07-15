import { useState, useMemo } from 'react';
import { raidBosses, spriteUrl, type RaidBoss } from './raidData';

const ALL_TYPES = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy',
];

const CATEGORIES: RaidBoss['category'][] = ['Legendary', 'Mythical', 'Mega', 'Dynamax', 'Regular'];

export default function RaidsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = raidBosses;
    if (typeFilter) {
      list = list.filter(m =>
        m.types.includes(typeFilter) ||
        m.weaknesses.some(w => w.type === typeFilter)
      );
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(m => m.name.toLowerCase().includes(q));
    }
    return list;
  }, [search, typeFilter]);

  const grouped = useMemo(() => {
    return CATEGORIES
      .map(cat => ({ category: cat, bosses: filtered.filter(m => m.category === cat) }))
      .filter(g => g.bosses.length > 0);
  }, [filtered]);

  async function copyString(id: string, str: string) {
    await navigator.clipboard.writeText(str);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1400);
    window.gtag?.('event', 'copy_raid_counter', { raid_id: id, counter_string: str });
  }

  return (
    <section className="raids-page" aria-label="Raid counter search strings">
      <div className="raids-intro">
        <h2>Raid Counters</h2>
        <p>Find counters to raid bosses. Each search string filters your storage for Pokemon with the best super-effective moves against that boss.</p>
      </div>

      {/* Search box */}
      <div className="raids-search-row">
        <input
          className="raids-search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for a raid boss..."
          aria-label="Search raid bosses"
        />
      </div>

      {/* Type filter pills */}
      <div className="raids-type-filters" role="group" aria-label="Filter by type">
        <button
          className={`raids-type-pill${typeFilter === null ? ' active' : ''}`}
          onClick={() => setTypeFilter(null)}
        >
          All
        </button>
        {ALL_TYPES.map(t => (
          <button
            key={t}
            className={`raids-type-pill${typeFilter === t ? ' active' : ''}`}
            onClick={() => setTypeFilter(typeFilter === t ? null : t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Results */}
      {grouped.length === 0 ? (
        <p className="raids-empty">No raid bosses match your filters.</p>
      ) : (
        grouped.map(({ category, bosses }) => (
          <div key={category} className="raids-group">
            <h3>{category}</h3>
            <div className="raids-grid">
              {bosses.map(boss => (
                <div key={boss.id} className="raid-card">
                  <div className="raid-card-header">
                    <img
                      className="raid-card-sprite"
                      src={spriteUrl(boss.dexNumber)}
                      alt={boss.name}
                      loading="lazy"
                      width="64"
                      height="64"
                    />
                    <div className="raid-card-info">
                      <strong>{boss.name}</strong>
                      <span className="raid-card-types">{boss.types.join(' / ')}</span>
                    </div>
                  </div>

                  <div className="raid-card-weaknesses">
                    <span className="raid-weakness-label">Weak to:</span>
                    {boss.weaknesses.map(w => (
                      <span key={w.type} className="raid-weakness-pill">
                        {w.type} <span className="raid-weakness-mult">{w.multiplier}</span>
                      </span>
                    ))}
                  </div>

                  {boss.note && <p className="raid-card-note">{boss.note}</p>}

                  <div className="raid-card-footer">
                    <code className="raid-card-string">{boss.counterSearch}</code>
                    <button
                      className="raid-copy-btn"
                      onClick={() => copyString(boss.id, boss.counterSearch)}
                    >
                      {copiedId === boss.id ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
