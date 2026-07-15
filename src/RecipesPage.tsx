import { useState, useMemo } from 'react';
import { recipes } from './recipeData';

export default function RecipesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof recipes>();
    for (const r of recipes) {
      const list = map.get(r.category) ?? [];
      list.push(r);
      map.set(r.category, list);
    }
    return [...map.entries()];
  }, []);

  async function copyRecipe(id: string, str: string) {
    await navigator.clipboard.writeText(str);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1400);
  }

  return (
    <section className="recipes-page" aria-label="Pre-made search recipes">
      <div className="recipes-intro">
        <h2>Cleanup Recipes</h2>
        <p>Ready-to-use searches for common Pokémon storage tasks. Tap copy and paste straight into the game.</p>
      </div>

      {grouped.map(([category, items]) => (
        <div key={category} className="recipes-group">
          <h3>{category}</h3>
          <div className="recipes-grid">
            {items.map(recipe => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-card-body">
                  <strong>{recipe.name}</strong>
                  <code>{recipe.string}</code>
                  <span>{recipe.description}</span>
                </div>
                <button
                  className="recipe-copy-btn"
                  onClick={() => copyRecipe(recipe.id, recipe.string)}
                >
                  {copiedId === recipe.id ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
