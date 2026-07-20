import { useState } from 'react';
import { TYPES, getEffectiveness, type PokemonType } from './typeChart';
import { useI18n } from './i18n';

function effClass(val: number): string {
  if (val >= 2) return 'eff-se';
  if (val > 0 && val < 1) return 'eff-nve';
  if (val === 0) return 'eff-immune';
  return '';
}

function effLabel(val: number): string {
  if (val >= 2) return '1.6×';
  if (val > 0 && val < 1) return '.625×';
  if (val === 0) return '×';
  return '';
}

export default function TypesPage() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<PokemonType | null>(null);

  return (
    <section className="types-page" aria-label="Type effectiveness chart">
      <div className="types-intro">
        <h2>{t('types.title')}</h2>
        <p>{t('types.sub')}</p>
      </div>

      {/* Type selector pills */}
      <div className="types-pills">
        {TYPES.map(t => (
          <button
            key={t}
            className={`types-pill${selected === t ? ' active' : ''}`}
            onClick={() => setSelected(selected === t ? null : t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Quick view for selected type */}
      {selected && (
        <div className="types-detail">
          <div className="types-detail-col">
            <h3>{selected} {t('types.attacks.se')}</h3>
            <div className="types-detail-list">
              {TYPES.filter(d => getEffectiveness(selected, d) >= 2).map(d => (
                <span key={d} className="types-tag types-tag--se">{d}</span>
              ))}
              {TYPES.filter(d => getEffectiveness(selected, d) >= 2).length === 0 && (
                <span className="types-none">None</span>
              )}
            </div>
          </div>
          <div className="types-detail-col">
            <h3>{selected} {t('types.attacks.nve')}</h3>
            <div className="types-detail-list">
              {TYPES.filter(d => { const e = getEffectiveness(selected, d); return e > 0 && e < 1; }).map(d => (
                <span key={d} className="types-tag types-tag--nve">{d}</span>
              ))}
            </div>
          </div>
          <div className="types-detail-col">
            <h3>{selected} {t('types.attacks.none')}</h3>
            <div className="types-detail-list">
              {TYPES.filter(d => getEffectiveness(selected, d) === 0).map(d => (
                <span key={d} className="types-tag types-tag--immune">{d}</span>
              ))}
              {TYPES.filter(d => getEffectiveness(selected, d) === 0).length === 0 && (
                <span className="types-none">None</span>
              )}
            </div>
          </div>
          <div className="types-detail-col">
            <h3>{selected} {t('types.weakTo')}</h3>
            <div className="types-detail-list">
              {TYPES.filter(a => getEffectiveness(a, selected) >= 2).map(a => (
                <span key={a} className="types-tag types-tag--se">{a}</span>
              ))}
            </div>
          </div>
          <div className="types-detail-col">
            <h3>{selected} {t('types.resists')}</h3>
            <div className="types-detail-list">
              {TYPES.filter(a => { const e = getEffectiveness(a, selected); return e > 0 && e < 1; }).map(a => (
                <span key={a} className="types-tag types-tag--nve">{a}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full matrix */}
      <div className="types-legend">
        <span className="types-legend-item"><span className="types-legend-swatch eff-se"></span> {t('types.legend.se')}</span>
        <span className="types-legend-item"><span className="types-legend-swatch eff-nve"></span> {t('types.legend.nve')}</span>
        <span className="types-legend-item"><span className="types-legend-swatch eff-immune"></span> {t('types.legend.immune')}</span>
        <span className="types-legend-item"><span className="types-legend-swatch eff-neutral"></span> {t('types.legend.neutral')}</span>
      </div>
      <div className="types-matrix-wrap">
        <table className="types-matrix">
          <thead>
            <tr>
              <th className="types-matrix-corner">{t('types.matrixHeader')}</th>
              {TYPES.map(t => (
                <th key={t} className="types-matrix-th">{t.slice(0, 3)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TYPES.map(atk => (
              <tr key={atk} className={selected === atk ? 'types-matrix-row--active' : ''}>
                <td className="types-matrix-label">{atk}</td>
                {TYPES.map(def => {
                  const val = getEffectiveness(atk, def);
                  return (
                    <td key={def} className={`types-matrix-cell ${effClass(val)}`}>
                      {effLabel(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
