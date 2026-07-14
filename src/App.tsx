import { useMemo, useState } from 'react';
import { searchOptions, orOnlyGroups, type SearchOption } from './searchOptions';

// ── Hero graphic ─────────────────────────────────────────────────────────────

const TYPE_PILLS = [
  { label: 'shiny',     color: '#facc15', text: '#1a1200' },
  { label: '4★',        color: '#38bdf8', text: '#031526' },
  { label: 'shadow',    color: '#a78bfa', text: '#150d2e' },
  { label: 'legendary', color: '#fb923c', text: '#1f0a00' },
  { label: 'lucky',     color: '#34d399', text: '#002012' },
  { label: 'purified',  color: '#e879f9', text: '#220033' },
  { label: 'dragon',    color: '#818cf8', text: '#0d0f33' },
  { label: 'raid',      color: '#f87171', text: '#2d0000' },
];

function HeroGraphic() {
  return (
    <div className="hero-graphic" aria-hidden="true">
      <svg
        className="hero-svg"
        viewBox="0 0 800 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial glow for the ball */}
          <radialGradient id="ballGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          {/* Top-half fill */}
          <linearGradient id="ballTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          {/* Bottom-half fill */}
          <linearGradient id="ballBottom" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          {/* Radar ring mask — fade out at edges */}
          <radialGradient id="radarFade" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="radarMask">
            <rect x="0" y="0" width="800" height="220" fill="url(#radarFade)" />
          </mask>
          {/* Clip for pill labels */}
          <clipPath id="pillClip0"><rect rx="12" ry="12" width="72" height="26" /></clipPath>

          {/* Subtle scanline texture */}
          <pattern id="scanlines" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="0" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Background fill + scanlines */}
        <rect x="0" y="0" width="800" height="220" fill="url(#scanlines)" />

        {/* ── Radar rings centred on the Pokéball ── */}
        <g mask="url(#radarMask)" opacity="0.18">
          {[60, 100, 145, 195, 250, 310].map((r, i) => (
            <circle key={i} cx="400" cy="110" r={r} fill="none" stroke="#38bdf8" strokeWidth="1" />
          ))}
          {/* Cross-hairs */}
          <line x1="400" y1="0"   x2="400" y2="220" stroke="#38bdf8" strokeWidth="0.6" />
          <line x1="150" y1="110" x2="650" y2="110" stroke="#38bdf8" strokeWidth="0.6" />
        </g>

        {/* ── Pokéball shadow glow ── */}
        <circle cx="400" cy="110" r="88" fill="url(#ballGlow)" />

        {/* ── Pokéball body ── */}
        {/* top half */}
        <path d="M 342 110 A 58 58 0 0 1 458 110 Z" fill="url(#ballTop)" />
        {/* bottom half */}
        <path d="M 342 110 A 58 58 0 0 0 458 110 Z" fill="url(#ballBottom)" />
        {/* outer ring */}
        <circle cx="400" cy="110" r="58" fill="none" stroke="#1e293b" strokeWidth="3.5" />
        {/* centre band */}
        <line x1="342" y1="110" x2="458" y2="110" stroke="#1e293b" strokeWidth="7" />
        {/* button ring */}
        <circle cx="400" cy="110" r="14" fill="#1e293b" />
        <circle cx="400" cy="110" r="9"  fill="#f8fafc" />
        {/* button shine */}
        <circle cx="397" cy="107" r="3"  fill="white" opacity="0.55" />

        {/* ── Search-bar graphic below ball ── */}
        <rect x="268" y="178" width="264" height="30" rx="15" fill="rgba(15,30,50,0.85)" stroke="rgba(56,189,248,0.35)" strokeWidth="1.2" />
        <circle cx="287" cy="193" r="7" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />
        <line x1="292" y1="198" x2="297" y2="203" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        {/* fake text cursor */}
        <rect x="304" y="186" width="80" height="2.5" rx="1.25" fill="#38bdf8" opacity="0.25" />
        <rect x="304" y="191" width="52" height="2.5" rx="1.25" fill="#38bdf8" opacity="0.18" />
        <rect x="358" y="186" width="2" height="14" rx="1" fill="#38bdf8" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0;0.7" dur="1.1s" repeatCount="indefinite" />
        </rect>

        {/* ── Floating type pills ── */}
        {TYPE_PILLS.map((pill, i) => {
          const side = i < 4 ? -1 : 1;
          const idx  = i < 4 ? i : i - 4;
          const x    = 400 + side * (160 + idx * 8) - 36; // 36 = half of w:72
          const y    = 44  + idx * 44 - 13;               // 13 = half of h:26
          const w = 72; const h = 26;
          const dur = `${2.4 + idx * 0.4}s`;
          const begin = `${idx * 0.3}s`;
          return (
            <g key={pill.label} transform={`translate(${x}, ${y})`} opacity={0.88 - idx * 0.06}>
              <animateTransform
                attributeName="transform"
                type="translate"
                additive="sum"
                values={`0 0; 0 -7; 0 0`}
                dur={dur}
                begin={begin}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
                keyTimes="0;0.5;1"
              />
              <rect width={w} height={h} rx="13" fill={pill.color} />
              <text
                x={w / 2} y={h / 2 + 4.5}
                textAnchor="middle"
                fontSize="11" fontWeight="800" fontFamily="inherit"
                fill={pill.text} letterSpacing="0.04em"
              >
                {pill.label}
              </text>
            </g>
          );
        })}

        {/* ── Stars / sparkles ── */}
        {[
          [120, 35], [680, 28], [90, 155], [710, 165], [210, 190], [590, 185],
        ].map(([x, y], i) => (
          <g key={i} opacity={0.5 + (i % 3) * 0.15}>
            <circle cx={x} cy={y} r="1.5" fill="white">
              <animate attributeName="opacity" values="0.9;0.2;0.9"
                       dur={`${1.8 + i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

type Selection = SearchOption & { excluded: boolean; joiner: '&' | ',' };

const categoryOrder = [
  'Appraisal',
  'Status',
  'Collection',
  'Catch Source',
  'Type',
  'Move',
  'Evolution',
  'Battle',
  'Gender',
  'Size',
  'Region',
  'Buddy',
  'Age & Year',
  'Other',
] as const;

// ── Group conflict helpers ────────────────────────────────────────────────────

/**
 * Returns the reason AND is blocked if adding `option` with AND would conflict
 * with an already-selected item in the same or-only group, otherwise null.
 */
function andConflictReason(option: SearchOption, selected: Selection[]): string | null {
  if (!option.group) return null;
  const conflict = selected.find(s => s.group === option.group && s.id !== option.id);
  if (!conflict) return null;
  return orOnlyGroups[option.group] ?? 'These filters are mutually exclusive';
}

/**
 * Returns whether the joiner between item at index i and item at i+1
 * must be OR (cannot be AND).
 */
function joinerMustBeOr(selected: Selection[], i: number): string | null {
  const a = selected[i];
  const b = selected[i + 1];
  if (!a.group || !b.group || a.group !== b.group) return null;
  return orOnlyGroups[a.group] ?? 'These filters are mutually exclusive';
}

// ── Icons ────────────────────────────────────────────────────────────────────

function IconAnd() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2 6.5h9M6.5 2v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconOr() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <circle cx="4" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="9" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconExclude() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <line x1="1" y1="1" x2="10" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="10" y1="1" x2="1" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [selected, setSelected] = useState<Selection[]>([]);
  const [customTerm, setCustomTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const searchString = useMemo(() => {
    if (selected.length === 0) return '';
    return selected
      .map(({ token, excluded }, i) => {
        const prefix = excluded ? '!' : '';
        const suffix = i < selected.length - 1 ? selected[i].joiner : '';
        return `${prefix}${token}${suffix}`;
      })
      .join('');
  }, [selected]);

  const grouped = useMemo(
    () =>
      categoryOrder
        .map(category => ({ category, options: searchOptions.filter(o => o.category === category) }))
        .filter(g => g.options.length > 0),
    [],
  );

  function addOption(option: SearchOption, joiner: '&' | ',') {
    setSelected(current => {
      if (current.some(item => item.id === option.id)) return current;
      // Force OR if AND would be a logical contradiction
      const effectiveJoiner = joiner === '&' && andConflictReason(option, current) ? ',' : joiner;
      return [...current, { ...option, excluded: false, joiner: effectiveJoiner }];
    });
  }

  function addCustom(joiner: '&' | ',') {
    const token = customTerm.trim();
    if (!token) return;
    setSelected(current => [
      ...current,
      {
        id: `custom-${crypto.randomUUID()}`,
        label: token,
        token,
        category: 'Other',
        description: 'Custom search term.',
        excluded: false,
        joiner,
      },
    ]);
    setCustomTerm('');
  }

  function toggleExcluded(id: string) {
    setSelected(current =>
      current.map(item => (item.id === id ? { ...item, excluded: !item.excluded } : item)),
    );
  }

  function toggleJoiner(id: string) {
    setSelected(current => {
      const idx = current.findIndex(item => item.id === id);
      if (idx === -1) return current;
      const next = current[idx + 1];
      // If the next item is in the same or-only group, block switching to AND
      if (next && current[idx].group && current[idx].group === next.group) return current;
      return current.map(item =>
        item.id === id ? { ...item, joiner: item.joiner === '&' ? ',' : '&' } : item,
      );
    });
  }

  function removeItem(id: string) {
    setSelected(current => current.filter(x => x.id !== id));
  }

  async function copySearch() {
    if (!searchString) return;
    await navigator.clipboard.writeText(searchString);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <HeroGraphic />
        <div className="hero-text">
          <p className="eyebrow">Pokémon GO utility</p>
          <h1>Search String<br />Helper</h1>
          <p className="hero-sub">Build search strings visually, then copy them straight into Pokémon GO.</p>
        </div>
      </header>

      <section className="builder" aria-label="Search builder">
        {/* ── Result panel ── */}
        <div className="result-panel">
          <div className="result-header">
            <div className="result-string-wrap">
              <span className="field-label">Generated search</span>
              <code>{searchString || 'Choose one or more filters below'}</code>
            </div>
            <button className="primary" onClick={copySearch} disabled={!searchString}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          {selected.length > 0 && (
            <div className="selected-list" role="list" aria-label="Selected filters">
              {selected.map((item, i) => (
                <div className="chip-row" key={item.id} role="listitem">
                  {/* Chip */}
                  <div className={`selected-chip${item.excluded ? ' excluded' : ''}`}>
                    <button
                      className="chip-exclude"
                      onClick={() => toggleExcluded(item.id)}
                      title={item.excluded ? 'Currently excluded — click to include' : 'Currently included — click to exclude'}
                      aria-label={`${item.excluded ? 'Exclude' : 'Include'} ${item.label}`}
                    >
                      {item.excluded ? <IconExclude /> : null}
                      <span className="chip-label">{item.label}</span>
                    </button>
                    <button
                      className="chip-remove"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.label}`}
                    >
                      <IconClose />
                    </button>
                  </div>

                  {/* Joiner badge between chips (not after the last one) */}
                  {i < selected.length - 1 && (() => {
                    const lockedReason = joinerMustBeOr(selected, i);
                    const isAnd = item.joiner === '&';
                    // If locked and currently AND (shouldn't happen but guard anyway), treat as OR
                    const displayJoiner = lockedReason ? ',' : item.joiner;
                    return (
                      <button
                        className={`joiner-badge joiner-badge--${displayJoiner === '&' ? 'and' : 'or'}${lockedReason ? ' joiner-badge--locked' : ''}`}
                        onClick={() => !lockedReason && toggleJoiner(item.id)}
                        title={lockedReason ?? `Click to switch to ${isAnd ? 'OR' : 'AND'}`}
                        aria-label={lockedReason ? `OR only: ${lockedReason}` : `Joiner: ${isAnd ? 'AND' : 'OR'} — click to toggle`}
                        aria-disabled={!!lockedReason}
                      >
                        {displayJoiner === '&' ? 'AND' : 'OR'}
                        {lockedReason && <span className="joiner-lock">🔒</span>}
                      </button>
                    );
                  })()}
                </div>
              ))}

              <button className="text-button" onClick={() => setSelected([])}>
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* ── Custom term ── */}
        <div className="custom-row">
          <input
            value={customTerm}
            onChange={e => setCustomTerm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCustom('&')}
            placeholder="Add a custom term, e.g. cp1500"
          />
          <div className="add-buttons">
            <button
              className="add-btn add-btn--and"
              onClick={() => addCustom('&')}
              disabled={!customTerm.trim()}
              title="Add with AND"
            >
              <IconAnd /> AND
            </button>
            <button
              className="add-btn add-btn--or"
              onClick={() => addCustom(',')}
              disabled={!customTerm.trim()}
              title="Add with OR"
            >
              <IconOr /> OR
            </button>
          </div>
        </div>

        {/* ── Option groups ── */}
        <div className="option-groups">
          {grouped.map(group => (
            <section key={group.category}>
              <h2>{group.category}</h2>
              <div className="option-grid">
                {group.options.map(option => {
                  const active = selected.some(item => item.id === option.id);
                  return (
                    <div
                      key={option.id}
                      className={`option-card${active ? ' active' : ''}`}
                      aria-label={option.label}
                    >
                      <div className="option-card-body">
                        <strong>{option.label}</strong>
                        <code>{option.token}</code>
                        <span>{option.description}</span>
                      </div>
                      {active ? (
                        <div className="option-card-actions option-card-actions--active">
                          <span className="added-label">Added</span>
                          <button
                            className="remove-option-btn"
                            onClick={() => removeItem(selected.find(s => s.id === option.id)!.id)}
                            aria-label={`Remove ${option.label}`}
                          >
                            <IconClose /> Remove
                          </button>
                        </div>
                      ) : (
                        <div className="option-card-actions">
                          {(() => {
                            const reason = andConflictReason(option, selected);
                            return (
                              <>
                                <button
                                  className="add-btn add-btn--and"
                                  onClick={() => addOption(option, '&')}
                                  disabled={!!reason}
                                  title={reason ?? 'Add with AND'}
                                  aria-label={`Add ${option.label} with AND`}
                                >
                                  <IconAnd /> AND
                                </button>
                                <button
                                  className="add-btn add-btn--or"
                                  onClick={() => addOption(option, ',')}
                                  aria-label={`Add ${option.label} with OR`}
                                  title="Add with OR"
                                >
                                  <IconOr /> OR
                                </button>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      <footer>
        Fan-made utility. Pokémon and Pokémon GO are trademarks of their respective owners.
      </footer>
    </main>
  );
}

export default App;
