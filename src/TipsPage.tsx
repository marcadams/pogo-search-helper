import { useI18n } from './i18n';

const tips = [
  {
    category: 'Catching',
    icon: (
      <svg viewBox="0 0 40 40" className="tip-icon"><circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" /><path d="M4 20 A16 16 0 0 1 36 20 Z" fill="#ef4444" opacity=".8" /><path d="M4 20 A16 16 0 0 0 36 20 Z" fill="#e2e8f0" opacity=".8" /><line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="2" /><circle cx="20" cy="20" r="4" fill="currentColor" /></svg>
    ),
    tips: [
      { title: 'Excellent throws = massive XP', text: 'An Excellent throw awards 1,000 bonus XP (100 for Great, 20 for Nice). A Lucky Egg doubles those bonuses, making consistent Excellent throws one of the fastest ways to level up—especially during Catch XP events.' },
      { title: 'Circle lock trick', text: 'Hold the ball, wait for the circle to shrink to your target size, then release. Wait for the Pokemon to attack, then throw during the animation — the circle stays locked at your chosen size.' },
      { title: 'Quick catch technique', text: 'Drag the item menu slightly with one finger, throw with the other, then tap the flee button after the ball hits. This skips the catch animation and still processes the catch in the background. Confirmed still working in 2026 and NOT bannable.' },
      { title: 'Nanab for aggressive Pokemon', text: 'Nanab Berries calm the Pokemon, reducing its attack/jump frequency. Perfect for Pokemon that move constantly (like Zubat).' },
      { title: 'Always throw curve balls', text: 'Curve balls give a 1.7x catch rate multiplier AND a bonus 20 XP per catch. That might seem small, but over thousands of catches it adds up to tens of thousands of extra XP — and significantly fewer Pokemon fleeing.' },
    ],
  },
  {
    category: 'XP & Leveling',
    icon: (
      <svg viewBox="0 0 40 40" className="tip-icon"><rect x="8" y="22" width="6" height="12" rx="2" fill="currentColor" opacity=".5" /><rect x="17" y="16" width="6" height="18" rx="2" fill="currentColor" opacity=".7" /><rect x="26" y="8" width="6" height="26" rx="2" fill="currentColor" /><path d="M18 6 l2 -4 l2 4 l-1.5-1 v3 h-1 v-3 z" fill="#facc15" /></svg>
    ),
    tips: [
      { title: 'Lucky Egg + mass evolve', text: 'Save up 60+ Pokemon that need only 12 candy to evolve (Pidgey, Wurmple, etc). Pop a Lucky Egg, then evolve them all for 2x XP. Each evolution = 2,000 XP.' },
      { title: 'Stack friendship level-ups', text: 'Coordinate with multiple friends to all hit Best Friends on the same day. Pop one Lucky Egg to double those 100,000 XP friendship bonuses. Opening gifts counts as the daily interaction — send gifts strategically.' },
      { title: 'Raid XP stacking', text: 'Lucky Egg during a raid gives double raid XP. Combine with a Raid Hour (many raids in a row) for maximum efficiency.' },
      { title: 'Daily streaks matter', text: 'The 7-day catch streak gives 2,500 XP + 2,500 Stardust. The 7-day spin streak gives 2,500 XP + a guaranteed evolution item. Never miss day 7.' },
    ],
  },
  {
    category: 'PvP & Battles',
    icon: (
      <svg viewBox="0 0 40 40" className="tip-icon"><path d="M10 30 L20 8 L30 30 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><line x1="14" y1="23" x2="26" y2="23" stroke="currentColor" strokeWidth="2" /><circle cx="20" cy="16" r="2.5" fill="currentColor" /></svg>
    ),
    tips: [
      { title: 'Fast move timing', text: 'The 2026 battle system overhaul made timing more consistent — single-turn fast attacks now tie when used on the same turn, and swaps resolve before damage. Learn your fast move turn counts to optimize energy generation.' },
      { title: 'Switch clock pressure', text: 'After switching Pokemon, your opponent has a 45-second cooldown on their own switch. Use this window to farm energy or force them to burn shields in a bad matchup.' },
      { title: 'Charged move priority (CMP)', text: 'When both players use a charged move on the same turn, the Pokemon with higher Attack stat goes first (CMP tie). In the 2026 system, charged attacks start on the following turn — so timing your switch or shield is more predictable.' },
      { title: 'Save shields wisely', text: 'Don\'t shield low-energy charged moves in the early game. It\'s often better to take a Aqua Tail/Body Slam and save shields for the high-damage closers.' },
    ],
  },
  {
    category: 'Stardust & Resources',
    icon: (
      <svg viewBox="0 0 40 40" className="tip-icon"><polygon points="20,4 24,15 36,15 26,22 30,34 20,27 10,34 14,22 4,15 16,15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><polygon points="20,10 22,17 30,17 24,22 26,30 20,25 14,30 16,22 10,17 18,17" fill="currentColor" opacity=".3" /></svg>
    ),
    tips: [
      { title: 'Star Piece during Community Day', text: 'Star Pieces boost Stardust by 50% for 30 min. Pop one during Community Day when you\'re catching hundreds of Pokemon with already-boosted Stardust.' },
      { title: 'Weather boost = more dust', text: 'Weather-boosted Pokemon give 25% more Stardust when caught (125 instead of 100). Prioritize catching boosted spawns.' },
      { title: 'Hatch eggs for big dust payouts', text: '10km eggs give 1,600-3,200 Stardust. 12km eggs give 3,200-6,400. Use Star Pieces when you have multiple eggs close to hatching.' },
      { title: 'Don\'t power up until you need to', text: 'Stardust is the scarcest resource. Only invest in Pokemon you\'re actively using for raids or PvP. Powering to Level 50 requires XL candy which is hard to farm — be selective about what you max out.' },
    ],
  },
  {
    category: 'Trading & Friends',
    icon: (
      <svg viewBox="0 0 40 40" className="tip-icon"><path d="M8 20 L18 20 L18 12 L26 20 L18 28 L18 20" fill="currentColor" opacity=".6" /><path d="M32 20 L22 20 L22 28 L14 20 L22 12 L22 20" fill="currentColor" opacity=".4" /><circle cx="8" cy="20" r="3" fill="currentColor" /><circle cx="32" cy="20" r="3" fill="currentColor" /></svg>
    ),
    tips: [
      { title: 'Lucky trade guarantee', text: 'Trading a Pokémon caught in 2020 or earlier guarantees a Lucky Trade if the trainer sending it has participated in fewer than 45 age-based guaranteed Lucky Trades. Lucky Friend and random Lucky Trades do not count toward this limit.' },
      { title: 'Distance trading for candy', text: 'Trading Pokemon caught 100+ km apart gives 3 candy (instead of 1). Use this for rare candy-hungry Pokemon.' },
      { title: 'Mirror trades for XL candy', text: 'Trading same-species Pokemon gives a chance at XL candy (guaranteed if both are caught 100+ km apart). This is one of the fastest ways to farm XL candy for PvP Pokemon.' },
      { title: 'Build friendship before special trades', text: 'The Stardust cost for Legendary/Shiny trades drops dramatically with friendship level. Best Friends pay 80,000 instead of 1,000,000 for a new Shiny dex entry.' },
    ],
  },
  {
    category: 'Hidden Mechanics',
    icon: (
      <svg viewBox="0 0 40 40" className="tip-icon"><circle cx="20" cy="18" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" /><line x1="20" y1="28" x2="20" y2="36" stroke="currentColor" strokeWidth="2.5" /><line x1="15" y1="33" x2="25" y2="33" stroke="currentColor" strokeWidth="2.5" /><circle cx="20" cy="18" r="3" fill="currentColor" /><path d="M20 10 v-3 M26 18 h3 M14 18 h-3" stroke="currentColor" strokeWidth="1.5" /></svg>
    ),
    tips: [
      { title: 'Mega boost in raids', text: 'A Mega-Evolved Pokémon actively battling in a raid boosts every trainer’s damage, with an even larger boost for attacks matching one of its types. Mega bonuses do not stack, so one well-chosen Mega is all your group needs.' },
      { title: 'Catch rate after raid', text: 'Golden Razz + curveball Excellent throws give you the best chance to catch a raid boss, but consistency matters more than perfection. A Great throw is far better than missing an Excellent attempt.' },
      { title: 'Buddy perks stack up', text: 'Great Buddies unlock Catch Assist and can bring presents. Ultra Buddies can bring souvenirs and point out interesting locations. Best Buddies receive a one-level CP boost while they are currently assigned as your buddy.' },
      { title: 'Egg pool is set at pickup', text: 'The Pokemon inside an egg is determined when you receive it, NOT when it hatches. So saving old eggs doesn\'t help get new Pokemon — spin fresh stops during events.' },
    ],
  },
];

export default function TipsPage() {
  const { t } = useI18n();
  return (
    <section className="tips-page" aria-label="Tips and tricks">
      <div className="tips-intro">
        <h2>{t('tips.title')}</h2>
        <p>{t('tips.sub')}</p>
      </div>

      {/* Catch multipliers reference */}
      <div className="catch-ref">
        <h3 className="catch-ref-title">{t('tips.catchRef.title')}</h3>
        <p className="catch-ref-sub">{t('tips.catchRef.sub')}</p>

        <div className="catch-ref-section">
          <h4>
            <svg viewBox="0 0 24 24" className="catch-ref-icon"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M2 12 A10 10 0 0 1 22 12 Z" fill="#ef4444" /><path d="M2 12 A10 10 0 0 0 22 12 Z" fill="#e2e8f0" /><line x1="2" y1="12" x2="22" y2="12" stroke="#333" strokeWidth="1.5" /><circle cx="12" cy="12" r="2.5" fill="#333" /></svg>
            {t('tips.catchRef.balls')}
          </h4>
          <div className="catch-ref-grid">
            <div className="catch-ref-item">
              <div className="catch-ref-ball" style={{ background: '#ef4444' }}></div>
              <span className="catch-ref-name">Poke Ball</span>
              <span className="catch-ref-mult">1.0×</span>
            </div>
            <div className="catch-ref-item">
              <div className="catch-ref-ball" style={{ background: '#3b82f6' }}></div>
              <span className="catch-ref-name">Great Ball</span>
              <span className="catch-ref-mult">1.5×</span>
            </div>
            <div className="catch-ref-item">
              <div className="catch-ref-ball" style={{ background: '#eab308' }}></div>
              <span className="catch-ref-name">Ultra Ball</span>
              <span className="catch-ref-mult">2.0×</span>
            </div>
          </div>
        </div>

        <div className="catch-ref-section">
          <h4>
            <svg viewBox="0 0 24 24" className="catch-ref-icon"><ellipse cx="12" cy="14" rx="8" ry="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M8 8 Q12 2 16 8" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="14" r="2" fill="currentColor" /></svg>
            {t('tips.catchRef.berries')}
          </h4>
          <div className="catch-ref-grid">
            <div className="catch-ref-item">
              <div className="catch-ref-berry" style={{ background: '#f97316' }}></div>
              <span className="catch-ref-name">Razz Berry</span>
              <span className="catch-ref-mult">1.5×</span>
            </div>
            <div className="catch-ref-item">
              <div className="catch-ref-berry" style={{ background: '#eab308' }}></div>
              <span className="catch-ref-name">Golden Razz</span>
              <span className="catch-ref-mult">2.5×</span>
            </div>
            <div className="catch-ref-item">
              <div className="catch-ref-berry" style={{ background: '#d4d4d8' }}></div>
              <span className="catch-ref-name">Silver Pinap</span>
              <span className="catch-ref-mult">1.8× <span className="catch-ref-note">(+2.33× candy)</span></span>
            </div>
            <div className="catch-ref-item">
              <div className="catch-ref-berry" style={{ background: '#fbbf24' }}></div>
              <span className="catch-ref-name">Pinap Berry</span>
              <span className="catch-ref-mult">1.0× <span className="catch-ref-note">(2× candy)</span></span>
            </div>
            <div className="catch-ref-item">
              <div className="catch-ref-berry" style={{ background: '#a3e635' }}></div>
              <span className="catch-ref-name">Nanab Berry</span>
              <span className="catch-ref-mult">1.0× <span className="catch-ref-note">(calms)</span></span>
            </div>
          </div>
        </div>

        <div className="catch-ref-section">
          <h4>
            <svg viewBox="0 0 24 24" className="catch-ref-icon"><path d="M12 3 C8 3 4 7 4 12 C4 18 12 22 12 22 C12 22 20 18 20 12 C20 7 16 3 12 3Z" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="11" r="3" fill="currentColor" opacity=".5" /></svg>
            {t('tips.catchRef.throws')}
          </h4>
          <div className="catch-ref-grid">
            <div className="catch-ref-item">
              <div className="catch-ref-ring" style={{ borderColor: '#4ade80' }}></div>
              <span className="catch-ref-name">Nice</span>
              <span className="catch-ref-mult">1.0–1.3×</span>
            </div>
            <div className="catch-ref-item">
              <div className="catch-ref-ring" style={{ borderColor: '#facc15' }}></div>
              <span className="catch-ref-name">Great</span>
              <span className="catch-ref-mult">1.3–1.7×</span>
            </div>
            <div className="catch-ref-item">
              <div className="catch-ref-ring" style={{ borderColor: '#ef4444' }}></div>
              <span className="catch-ref-name">Excellent</span>
              <span className="catch-ref-mult">1.7–2.0×</span>
            </div>
            <div className="catch-ref-item">
              <div className="catch-ref-ring catch-ref-ring--curve"></div>
              <span className="catch-ref-name">Curve Ball</span>
              <span className="catch-ref-mult">1.7×</span>
            </div>
          </div>
        </div>

        <p className="catch-ref-example">
          <strong>{t('tips.catchRef.bestCase')}</strong> Ultra Ball (2.0×) + Golden Razz (2.5×) + Excellent (2.0×) + Curve (1.7×) = <strong>{t('tips.catchRef.bestResult')}</strong>
        </p>
      </div>

      <div className="tips-grid">
        {tips.map(group => (
          <div key={group.category} className="tips-category">
            <div className="tips-category-header">
              {group.icon}
              <h3>{group.category}</h3>
            </div>
            <div className="tips-list">
              {group.tips.map(tip => (
                <div key={tip.title} className="tip-card">
                  <strong>{tip.title}</strong>
                  <p>{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
