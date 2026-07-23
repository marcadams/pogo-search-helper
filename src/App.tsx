import { useMemo, useState, useRef, useEffect } from 'react';
import { searchOptions, orOnlyGroups, type SearchOption } from './searchOptions';
import { useSavedSearches } from './useSavedSearches';
import { useI18n, LANGUAGES } from './i18n';
import RecipesPage from './RecipesPage';
import RaidsPage from './RaidsPage';
import TypesPage from './TypesPage';
import PvpPage from './PvpPage';
import TipsPage from './TipsPage';

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

function IconNot() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.6" />
      <line x1="3" y1="10" x2="10" y2="3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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

function IconBookmark({ filled }: { filled?: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M3 2.5A1.5 1.5 0 0 1 4.5 1h6A1.5 1.5 0 0 1 12 2.5v11l-4.5-3-4.5 3V2.5Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
        fill={filled ? 'currentColor' : 'none'}
      />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
         style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────

function App() {
  const { t, lang, setLang } = useI18n();
  const validViews = ['builder', 'recipes', 'raids', 'types', 'pvp', 'tips'] as const;
  type View = typeof validViews[number];

  const [view, setView] = useState<View>(() => {
    const hash = window.location.hash.replace('#', '') as View;
    return validViews.includes(hash) ? hash : 'builder';
  });
  const [selected, setSelected] = useState<Selection[]>(() => {
    // Pre-populate with a useful example so new users immediately see value
    // Skip in test environments, when arriving via deep link, or for returning users
    if (import.meta.env.MODE === 'test') return [];
    if (typeof window === 'undefined' || window.location.hash) return [];
    try {
      const saved = localStorage.getItem('pogo-saved-searches');
      if (saved && JSON.parse(saved).length > 0) return [];
    } catch { /* ignore */ }
    const exampleIds = ['three-star', 'perfect'];
    const exampleOptions = exampleIds
      .map(id => searchOptions.find(o => o.id === id))
      .filter(Boolean) as SearchOption[];
    if (exampleOptions.length === 2) {
      return [
        { ...exampleOptions[0], excluded: false, joiner: ',' as const },
        { ...exampleOptions[1], excluded: false, joiner: '&' as const },
      ];
    }
    return [];
  });
  const [customTerm, setCustomTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [stickycopied, setStickyCopied] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [resultVisible, setResultVisible] = useState(true);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(() => {
    // Start collapsed on mobile for faster navigation
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return new Set(categoryOrder as unknown as string[]);
    }
    return new Set();
  });
  const [helpDismissed, setHelpDismissed] = useState(() => localStorage.getItem('pogo-help-dismissed') === '1');
  const [activeHelpTip, setActiveHelpTip] = useState<string | null>(null);
  const saveInputRef = useRef<HTMLInputElement>(null);
  const resultPanelRef = useRef<HTMLDivElement>(null);
  const tabNavRef = useRef<HTMLDivElement>(null);
  const { saves, save, remove } = useSavedSearches();

  // Show sticky bar when the result panel scrolls out of view
  useEffect(() => {
    const el = resultPanelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setResultVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Handle browser back/forward for hash navigation
  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash.replace('#', '') as typeof view;
      if (validViews.includes(hash)) setView(hash);
      else if (!window.location.hash) setView('builder');
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Auto-scroll to content when arriving via deep link
  useEffect(() => {
    if (window.location.hash) {
      requestAnimationFrame(() => {
        tabNavRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
    }
  }, []);

  // Close help tooltip when tapping outside
  useEffect(() => {
    if (!activeHelpTip) return;
    function dismiss(e: Event) {
      // Don't dismiss if tapping a help button (let onClick handle toggle)
      if ((e.target as HTMLElement).closest('.card-help-btn')) return;
      setActiveHelpTip(null);
    }
    document.addEventListener('touchstart', dismiss);
    document.addEventListener('mousedown', dismiss);
    return () => {
      document.removeEventListener('touchstart', dismiss);
      document.removeEventListener('mousedown', dismiss);
    };
  }, [activeHelpTip]);

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

  function addOption(option: SearchOption, joiner: '&' | ',', excluded = false) {
    setSelected(current => {
      if (current.some(item => item.id === option.id)) return current;
      // Force OR if AND would be a logical contradiction
      const effectiveJoiner = joiner === '&' && andConflictReason(option, current) ? ',' : joiner;
      // The joiner connects the PREVIOUS item to this one.
      // Set it on the last existing item, not on the new item.
      if (current.length === 0) {
        return [{ ...option, excluded, joiner: '&' }];
      }
      const updated = current.map((item, i) =>
        i === current.length - 1 ? { ...item, joiner: effectiveJoiner } : item,
      );
      return [...updated, { ...option, excluded, joiner: '&' }];
    });
  }

  function addCustom(joiner: '&' | ',', excluded = false) {
    const token = customTerm.trim();
    if (!token) return;
    setSelected(current => {
      const newItem = {
        id: `custom-${crypto.randomUUID()}`,
        label: token,
        token,
        category: 'Other' as const,
        description: 'Custom search term.',
        excluded,
        joiner: '&' as const,
      };
      if (current.length === 0) {
        return [newItem];
      }
      const updated = current.map((item, i) =>
        i === current.length - 1 ? { ...item, joiner } : item,
      );
      return [...updated, newItem];
    });
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

  function toggleGroup(category: string) {
    setCollapsedGroups(current => {
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  function saveSearch() {
    if (!searchString) return;
    save(saveName, searchString, selected as import('./useSavedSearches').SavedSelection[]);
    setSaveName('');
    // keep drawer open so user sees their save appear
  }

  function loadSearch(savedSelections: Selection[]) {
    setSelected(savedSelections);
    setDrawerOpen(false);
  }

  // Focus save input when drawer opens
  useEffect(() => {
    if (drawerOpen) saveInputRef.current?.focus();
  }, [drawerOpen]);

  async function copySearch() {
    if (!searchString) return;
    await navigator.clipboard.writeText(searchString);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function switchTab(tab: typeof view) {
    setView(tab);
    window.location.hash = tab === 'builder' ? '' : tab;
    requestAnimationFrame(() => {
      tabNavRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    window.gtag?.('event', 'page_view', { page_title: tab.charAt(0).toUpperCase() + tab.slice(1), page_location: window.location.href });
  }

  async function stickyCopy() {
    if (!searchString) return;
    await navigator.clipboard.writeText(searchString);
    setStickyCopied(true);
    window.setTimeout(() => setStickyCopied(false), 1400);
  }

  return (
    <main className="app-shell">
      <header className="hero hero-compact">
        <div className="hero-text">
          <div className="hero-top-row">
            <div className="hero-brand">
              <svg className="hero-mini-ball" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M2 20 A18 18 0 0 1 38 20 Z" fill="#ef4444" />
                <path d="M2 20 A18 18 0 0 0 38 20 Z" fill="#e2e8f0" />
                <line x1="2" y1="20" x2="38" y2="20" stroke="#1e293b" strokeWidth="3" />
                <circle cx="20" cy="20" r="5" fill="#1e293b" />
                <circle cx="20" cy="20" r="3" fill="#f8fafc" />
              </svg>
              <h1>{t('hero.title').replace('\n', ' ')}</h1>
            </div>
            <select
              className="lang-picker"
              value={lang}
              onChange={e => setLang(e.target.value as typeof lang)}
              aria-label="Language"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.flag} {l.label}</option>
              ))}
            </select>
          </div>
          <p className="hero-sub">{t(`hero.sub.${view}`) || t('hero.sub')}</p>
        </div>
      </header>

      {/* ── Quick actions ── */}
      <div className="quick-actions" aria-label="Quick navigation">
        <button className={`quick-action-pill${view === 'raids' ? ' active' : ''}`} onClick={() => switchTab('raids')}>
          🗡️ {t('quick.raids')}
        </button>
        <button className={`quick-action-pill${view === 'pvp' ? ' active' : ''}`} onClick={() => switchTab('pvp')}>
          ⚔️ {t('quick.pvp')}
        </button>
        <button className={`quick-action-pill${view === 'builder' ? ' active' : ''}`} onClick={() => switchTab('builder')}>
          🔍 {t('quick.builder')}
        </button>
        <button className={`quick-action-pill${view === 'types' ? ' active' : ''}`} onClick={() => switchTab('types')}>
          💎 {t('quick.types')}
        </button>
      </div>

      {/* ── Tab navigation ── */}
      {/* Scroll anchor - sits in normal flow above the sticky nav */}
      <div ref={tabNavRef} style={{ height: 0, overflow: 'hidden' }} aria-hidden="true" />
      <div className="tab-nav-wrap" ref={(el) => {
        if (!el) return;
        const nav = el.querySelector('.tab-nav');
        if (!nav) return;
        const checkScroll = () => {
          const atEnd = nav.scrollLeft + nav.clientWidth >= nav.scrollWidth - 4;
          el.classList.toggle('scrolled-end', atEnd);
        };
        nav.addEventListener('scroll', checkScroll);
        checkScroll();
      }}>
      <nav className="tab-nav" aria-label="Main navigation">
        <button
          className={`tab-btn${view === 'builder' ? ' active' : ''}`}
          onClick={() => switchTab('builder')}
        >
          {t('nav.builder')}
        </button>
        <button
          className={`tab-btn${view === 'recipes' ? ' active' : ''}`}
          onClick={() => switchTab('recipes')}
        >
          {t('nav.recipes')}
        </button>
        <button
          className={`tab-btn${view === 'raids' ? ' active' : ''}`}
          onClick={() => switchTab('raids')}
        >
          {t('nav.raids')}
        </button>
        <button
          className={`tab-btn${view === 'types' ? ' active' : ''}`}
          onClick={() => switchTab('types')}
        >
          {t('nav.types')}
        </button>
        <button
          className={`tab-btn${view === 'pvp' ? ' active' : ''}`}
          onClick={() => switchTab('pvp')}
        >
          {t('nav.pvp')}
        </button>
        <button
          className={`tab-btn${view === 'tips' ? ' active' : ''}`}
          onClick={() => switchTab('tips')}
        >
          {t('nav.tips')}
        </button>
      </nav>
      </div>

      {view === 'builder' ? (
      <section className="builder" aria-label="Search builder">
        {/* ── Result panel ── */}
        <div className="result-panel" ref={resultPanelRef}>
          <div className="result-header">
            <div className="result-string-wrap">
              <span className="field-label">{t('builder.generated')}</span>
              <code>{searchString || t('builder.placeholder')}</code>
            </div>
            <div className="result-actions">
              <button
                className={`saved-btn${saves.length > 0 ? ' has-saves' : ''}`}
                onClick={() => setDrawerOpen(o => !o)}
                aria-expanded={drawerOpen}
                aria-label={`Saved searches${saves.length > 0 ? ` (${saves.length})` : ''}`}
                title="Saved searches"
              >
                <IconBookmark filled={saves.length > 0} />
                {saves.length > 0 && <span className="saves-count">{saves.length}</span>}
                <IconChevron open={drawerOpen} />
              </button>
              <button className="primary" onClick={copySearch} disabled={!searchString}>
                {copied ? t('builder.copied') : t('builder.copy')}
              </button>
            </div>
          </div>

          {/* ── Saved searches drawer ── */}
          <div className={`saves-drawer${drawerOpen ? ' open' : ''}`} aria-hidden={!drawerOpen}>
            <div className="saves-drawer-inner">
              {/* Save current search */}
              <div className="saves-save-row">
                <input
                  ref={saveInputRef}
                  className="saves-name-input"
                  value={saveName}
                  onChange={e => setSaveName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveSearch()}
                  placeholder={t('saved.namePlaceholder')}
                  disabled={!searchString}
                  aria-label="Name for saved search"
                />
                <button
                  className="saves-save-btn"
                  onClick={saveSearch}
                  disabled={!searchString}
                  title={searchString ? t('saved.saveSearch') : ''}
                >
                  {t('btn.save')}
                </button>
              </div>

              {/* Saved list */}
              {saves.length === 0 ? (
                <p className="saves-empty">{t('saved.empty')}</p>
              ) : (
                <ul className="saves-list" role="list">
                  {saves.map(s => (
                    <li key={s.id} className="saves-item">
                      <button
                        className="saves-load-btn"
                        onClick={() => loadSearch(s.selections as Selection[])}
                        title={s.string}
                      >
                        <span className="saves-item-name">{s.name}</span>
                        <code className="saves-item-preview">{s.string}</code>
                      </button>
                      <button
                        className="saves-delete-btn"
                        onClick={() => remove(s.id)}
                        aria-label={`Delete ${s.name}`}
                        title="Delete"
                      >
                        <IconClose />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
                      title={item.excluded ? 'Currently excluded - click to include' : 'Currently included - click to exclude'}
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
                        aria-label={lockedReason ? `OR only: ${lockedReason}` : `Joiner: ${isAnd ? 'AND' : 'OR'} - click to toggle`}
                        aria-disabled={!!lockedReason}
                      >
                        {displayJoiner === '&' ? <><code className="joiner-char">&amp;</code> AND</> : <><code className="joiner-char">,</code> OR</>}
                        {lockedReason && <span className="joiner-lock">🔒</span>}
                      </button>
                    );
                  })()}
                </div>
              ))}

              <button className="text-button" onClick={() => setSelected([])}>
                {t('builder.clearAll')}
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
            placeholder={t('builder.custom')}
          />
          <div className="add-buttons">
            {selected.length === 0 ? (
              <>
                <button
                  className="add-btn add-btn--and"
                  onClick={() => addCustom('&')}
                  disabled={!customTerm.trim()}
                  title={customTerm.trim() ? `Add ${customTerm.trim()}` : 'Enter a term first'}
                >
                  <IconAnd />
                  <span className="add-btn-inner">
                    <span className="add-btn-label">Add</span>
                    {customTerm.trim() && <code className="add-btn-preview">{customTerm.trim()}</code>}
                  </span>
                </button>
                <span className="add-btn-divider" aria-hidden="true" />
                <button
                  className="add-btn add-btn--not"
                  onClick={() => addCustom('&', true)}
                  disabled={!customTerm.trim()}
                  title={customTerm.trim() ? `Add as !${customTerm.trim()}` : 'Enter a term first'}
                >
                  <IconNot />
                  <span className="add-btn-inner">
                    <span className="add-btn-label">NOT</span>
                    {customTerm.trim() && <code className="add-btn-preview">!{customTerm.trim()}</code>}
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="add-btn add-btn--and"
                  onClick={() => addCustom('&')}
                  disabled={!customTerm.trim()}
                  title={customTerm.trim() ? `Add as &${customTerm.trim()}` : 'Enter a term first'}
                >
                  <IconAnd />
                  <span className="add-btn-inner">
                    <span className="add-btn-label">AND</span>
                    {customTerm.trim() && <code className="add-btn-preview">&amp;{customTerm.trim()}</code>}
                  </span>
                </button>
                <button
                  className="add-btn add-btn--or"
                  onClick={() => addCustom(',')}
                  disabled={!customTerm.trim()}
                  title={customTerm.trim() ? `Add as ,${customTerm.trim()}` : 'Enter a term first'}
                >
                  <IconOr />
                  <span className="add-btn-inner">
                    <span className="add-btn-label">OR</span>
                    {customTerm.trim() && <code className="add-btn-preview">,{customTerm.trim()}</code>}
                  </span>
                </button>
                <span className="add-btn-divider" aria-hidden="true" />
                <button
                  className="add-btn add-btn--not"
                  onClick={() => addCustom('&', true)}
                  disabled={!customTerm.trim()}
                  title={customTerm.trim() ? `Add as !${customTerm.trim()}` : 'Enter a term first'}
                >
                  <IconNot />
                  <span className="add-btn-inner">
                    <span className="add-btn-label">NOT</span>
                    {customTerm.trim() && <code className="add-btn-preview">!{customTerm.trim()}</code>}
                  </span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── Inline help ── */}
        {!helpDismissed ? (
          <div className="help-panel">
            <div className="help-panel-header">
              <strong>{t('help.title')}</strong>
              <button className="help-dismiss" onClick={() => { setHelpDismissed(true); localStorage.setItem('pogo-help-dismissed', '1'); }} aria-label="Dismiss help">{t('help.dismiss')}</button>
            </div>
            <div className="help-panel-body">
              <div className="help-item">
                <span className="help-badge help-badge--and">AND</span>
                <p>Must have this filter. Narrows results.<br /><code>shiny&amp;4*</code> = shiny AND perfect IV</p>
              </div>
              <div className="help-item">
                <span className="help-badge help-badge--or">OR</span>
                <p>Could be either. Broadens results.<br /><code>3*,4*</code> = 3-star OR 4-star</p>
              </div>
              <div className="help-item">
                <span className="help-badge help-badge--not">NOT</span>
                <p>Exclude matches. Removes from results.<br /><code>!shadow</code> = hide all shadows</p>
              </div>
            </div>
            <p className="help-tip">Combine them: <code>4*,3*&amp;!shadow&amp;!purified</code> = high IV, not shadow, not purified</p>
          </div>
        ) : (
          <button className="help-reopen" onClick={() => { setHelpDismissed(false); localStorage.removeItem('pogo-help-dismissed'); }}>
            {t('help.reopen')}
          </button>
        )}

        {/* ── Option groups ── */}
        <div className="option-groups">
          <div className="groups-toolbar">
            <button
              className="groups-toolbar-btn"
              onClick={() => setCollapsedGroups(new Set(grouped.map(g => g.category)))}
            >
              {t('builder.collapseAll')}
            </button>
            <button
              className="groups-toolbar-btn"
              onClick={() => setCollapsedGroups(new Set())}
            >
              {t('builder.expandAll')}
            </button>
          </div>
          {grouped.map(group => {
            const isCollapsed = collapsedGroups.has(group.category);
            const activeCount = group.options.filter(o => selected.some(s => s.id === o.id)).length;
            return (
            <section key={group.category} className={isCollapsed ? 'collapsed' : ''}>
              <button
                className="group-header"
                onClick={() => toggleGroup(group.category)}
                aria-expanded={!isCollapsed}
              >
                <h2>
                  {group.category}
                  <span className="group-count">{group.options.length}</span>
                  {activeCount > 0 && <span className="group-active-count">{activeCount} selected</span>}
                </h2>
                <IconChevron open={!isCollapsed} />
              </button>
              {!isCollapsed && (
              <div className="option-grid">
                {group.options.map(option => {
                  const active = selected.some(item => item.id === option.id);
                  return (
                    <div
                      key={option.id}
                      className={`option-card${active ? ' active' : ''}`}
                      aria-label={option.label}
                    >
                      <span className="card-help-wrap">
                        <button className="card-help-btn" type="button" aria-label="Help"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHelpTip(activeHelpTip === option.id ? null : option.id);
                          }}
                        >?</button>
                        {activeHelpTip === option.id && (
                          <span className="card-help-tooltip" role="tooltip">
                            <b>AND</b> narrows — must also match<br />
                            <b>OR</b> broadens — match either<br />
                            <b>NOT</b> excludes — hide matches
                          </span>
                        )}
                      </span>
                      <div className="option-card-body">
                        <strong>{option.label}</strong>
                        <code>{option.token}</code>
                        <span>{option.description}</span>
                      </div>
                      {active ? (
                        <div className="option-card-actions option-card-actions--active">
                          <span className="added-label">{t('builder.added')}</span>
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
                            const isEmpty = selected.length === 0;
                            const reason = andConflictReason(option, selected);
                            if (isEmpty) {
                              return (
                                <>
                                  <button
                                    className="add-btn add-btn--and"
                                    onClick={() => addOption(option, '&')}
                                    aria-label={`Add ${option.label}`}
                                    title={`Add ${option.token}`}
                                  >
                                    <IconAnd />
                                    <span className="add-btn-inner">
                                      <span className="add-btn-label">Add</span>
                                      <code className="add-btn-preview">{option.token}</code>
                                    </span>
                                  </button>
                                  <span className="add-btn-divider" aria-hidden="true" />
                                  <button
                                    className="add-btn add-btn--not"
                                    onClick={() => addOption(option, '&', true)}
                                    aria-label={`Add ${option.label} as NOT`}
                                    title={`Add as !${option.token}`}
                                  >
                                    <IconNot />
                                    <span className="add-btn-inner">
                                      <span className="add-btn-label">NOT</span>
                                      <code className="add-btn-preview">!{option.token}</code>
                                    </span>
                                  </button>
                                </>
                              );
                            }
                            return (
                              <>
                                <button
                                  className="add-btn add-btn--and"
                                  onClick={() => addOption(option, '&')}
                                  disabled={!!reason}
                                  title={reason ?? `Add as &${option.token}`}
                                  aria-label={`Add ${option.label} with AND`}
                                >
                                  <IconAnd />
                                  <span className="add-btn-inner">
                                    <span className="add-btn-label">AND</span>
                                    <code className="add-btn-preview">&amp;{option.token}</code>
                                  </span>
                                </button>
                                <button
                                  className="add-btn add-btn--or"
                                  onClick={() => addOption(option, ',')}
                                  aria-label={`Add ${option.label} with OR`}
                                  title={`Add as ,${option.token}`}
                                >
                                  <IconOr />
                                  <span className="add-btn-inner">
                                    <span className="add-btn-label">OR</span>
                                    <code className="add-btn-preview">,{option.token}</code>
                                  </span>
                                </button>
                                <span className="add-btn-divider" aria-hidden="true" />
                                <button
                                  className="add-btn add-btn--not"
                                  onClick={() => addOption(option, '&', true)}
                                  aria-label={`Add ${option.label} as NOT`}
                                  title={`Add as !${option.token}`}
                                >
                                  <IconNot />
                                  <span className="add-btn-inner">
                                    <span className="add-btn-label">NOT</span>
                                    <code className="add-btn-preview">!{option.token}</code>
                                  </span>
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
              )}
            </section>
            );
          })}
        </div>
      </section>
      ) : view === 'recipes' ? (
      <RecipesPage />
      ) : view === 'raids' ? (
      <RaidsPage />
      ) : view === 'types' ? (
      <TypesPage />
      ) : view === 'pvp' ? (
      <PvpPage />
      ) : (
      <TipsPage />
      )}

      <footer>
        <p className="footer-disclaimer">{t('footer.disclaimer')}</p>
        <p>{t('footer.trademark')}</p>
      </footer>

      {/* ── Sticky copy bar ── */}
      {searchString && (
        <div className={`sticky-bar${resultVisible ? ' result-visible' : ''}`} role="region" aria-label="Quick copy">
          <code className="sticky-string">{searchString}</code>
          <div className="sticky-actions">
            <button
              className="sticky-icon-btn"
              onClick={() => setSelected([])}
              title="Clear search"
              aria-label="Clear search"
            >
              <IconClose />
            </button>
            <button
              className="sticky-icon-btn"
              onClick={() => {
                const name = `Search ${saves.length + 1}`;
                save(name, searchString, selected as import('./useSavedSearches').SavedSelection[]);
              }}
              title="Quick-save (rename from the saved drawer)"
              aria-label="Save search"
            >
              <IconBookmark />
            </button>
            <button className="sticky-copy-btn" onClick={stickyCopy}>
              {stickycopied ? '✓' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
