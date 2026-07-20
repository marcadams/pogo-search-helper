import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';
import { I18nProvider } from '../i18n';

function renderApp() {
  return render(<I18nProvider><App /></I18nProvider>);
}

/**
 * Helper: adds a specific option by finding its card via aria-label and clicking
 * the first available add button (Add, AND, OR, or NOT).
 */
function addOptionByLabel(label: string, mode: 'Add' | 'AND' | 'OR' | 'NOT' = 'Add') {
  const card = screen.getByLabelText(label);
  let btn: HTMLElement;
  if (mode === 'NOT') {
    btn = within(card).getByRole('button', { name: new RegExp(`Add ${label} as NOT`, 'i') });
  } else if (mode === 'AND') {
    btn = within(card).getByRole('button', { name: new RegExp(`^Add ${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} with AND$`, 'i') });
  } else if (mode === 'OR') {
    btn = within(card).getByRole('button', { name: new RegExp(`^Add ${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} with OR$`, 'i') });
  } else {
    // "Add" mode - use the exact aria-label which is "Add <label>"
    btn = within(card).getByRole('button', { name: new RegExp(`^Add ${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') });
  }
  fireEvent.click(btn);
}

describe('Mutual exclusivity', () => {
  beforeEach(() => { localStorage.clear(); window.location.hash = ''; });

  it('disables AND for 3★ after 4★ is selected', () => {
    renderApp();
    // Add 4* first
    addOptionByLabel('Perfect IV (4★)');
    // Now find 3★ card - its AND button should be disabled
    const card = screen.getByLabelText('3★ (82–98% IV)');
    const andBtn = within(card).getByRole('button', { name: /AND/i });
    expect(andBtn).toBeDisabled();
  });

  it('allows OR for 3★ after 4★ is selected', () => {
    renderApp();
    addOptionByLabel('Perfect IV (4★)');
    const card = screen.getByLabelText('3★ (82–98% IV)');
    const orBtn = within(card).getByRole('button', { name: /OR/i });
    expect(orBtn).not.toBeDisabled();
  });

  it('disables AND for Purified after Shadow is selected', () => {
    renderApp();
    addOptionByLabel('Shadow');
    const card = screen.getByLabelText('Purified');
    const andBtn = within(card).getByRole('button', { name: /AND/i });
    expect(andBtn).toBeDisabled();
  });

  it('disables AND for Female after Male is selected', () => {
    renderApp();
    addOptionByLabel('Male');
    const card = screen.getByLabelText('Female');
    const andBtn = within(card).getByRole('button', { name: /AND/i });
    expect(andBtn).toBeDisabled();
  });

  it('disables AND for XL after XXS is selected (size exclusivity)', () => {
    renderApp();
    addOptionByLabel('XXS (Extra Small)');
    const card = screen.getByLabelText('XL (Large)');
    const andBtn = within(card).getByRole('button', { name: /AND/i });
    expect(andBtn).toBeDisabled();
  });

  it('disables AND for Johto after Kanto is selected (region exclusivity)', () => {
    renderApp();
    addOptionByLabel('Kanto (Gen 1)');
    const card = screen.getByLabelText('Johto (Gen 2)');
    const andBtn = within(card).getByRole('button', { name: /AND/i });
    expect(andBtn).toBeDisabled();
  });

  it('does NOT disable AND between different groups (e.g. 4★ and Shiny)', () => {
    renderApp();
    addOptionByLabel('Perfect IV (4★)');
    const card = screen.getByLabelText('Shiny');
    const andBtn = within(card).getByRole('button', { name: /AND/i });
    expect(andBtn).not.toBeDisabled();
  });

  it('does NOT disable AND for Perfect Attack IV after Perfect Defense IV (different groups)', () => {
    renderApp();
    addOptionByLabel('Perfect Defense IV');
    const card = screen.getByLabelText('Perfect Attack IV');
    const andBtn = within(card).getByRole('button', { name: /AND/i });
    expect(andBtn).not.toBeDisabled();
  });
});

describe('Search string generation', () => {
  beforeEach(() => { localStorage.clear(); window.location.hash = ''; });

  it('generates correct string for a single filter', () => {
    renderApp();
    addOptionByLabel('Shiny');
    // The result code element in the result-header should contain "shiny"
    const resultCode = document.querySelector('.result-header code');
    expect(resultCode?.textContent).toBe('shiny');
  });

  it('generates AND-joined string for two filters', () => {
    renderApp();
    addOptionByLabel('Perfect IV (4★)');
    addOptionByLabel('Shiny', 'AND');
    // The result code should contain 4*&shiny
    const code = screen.getAllByRole('code').find(el => el.textContent === '4*&shiny');
    expect(code).toBeTruthy();
  });

  it('generates OR-joined string for same-group filters (forced by exclusivity)', () => {
    renderApp();
    // Use non-same-group items to test OR directly
    addOptionByLabel('Shiny');
    // Now add Lucky with OR - these are not in the same group
    const card = screen.getByLabelText('Lucky');
    const orBtn = card.querySelector('.add-btn--or') as HTMLElement;
    fireEvent.click(orBtn);
    const resultCode = document.querySelector('.result-header code');
    expect(resultCode?.textContent).toBe('shiny,lucky');
  });

  it('generates NOT-prefixed string', () => {
    renderApp();
    addOptionByLabel('Shadow', 'NOT');
    const code = screen.getAllByRole('code').find(el => el.textContent === '!shadow');
    expect(code).toBeTruthy();
  });

  it('generates mixed AND/OR/NOT string', () => {
    renderApp();
    addOptionByLabel('Perfect IV (4★)');
    addOptionByLabel('Shiny', 'AND');
    addOptionByLabel('Shadow', 'NOT');
    // Should be 4*&shiny&!shadow
    const code = screen.getAllByRole('code').find(el => el.textContent === '4*&shiny&!shadow');
    expect(code).toBeTruthy();
  });
});

describe('Exclude toggle on chips', () => {
  beforeEach(() => { localStorage.clear(); window.location.hash = ''; });

  it('toggles a chip to excluded state', () => {
    renderApp();
    addOptionByLabel('Shiny');
    // Click the chip label to toggle exclude
    const excludeBtn = screen.getByRole('button', { name: /Include Shiny/i });
    fireEvent.click(excludeBtn);
    // Should now show !shiny in the result
    const code = screen.getAllByRole('code').find(el => el.textContent === '!shiny');
    expect(code).toBeTruthy();
  });

  it('toggles back from excluded to included', () => {
    renderApp();
    addOptionByLabel('Shiny');
    const excludeBtn = screen.getByRole('button', { name: /Include Shiny/i });
    fireEvent.click(excludeBtn); // exclude
    fireEvent.click(screen.getByRole('button', { name: /Exclude Shiny/i })); // include again
    const code = screen.getAllByRole('code').find(el => el.textContent === 'shiny');
    expect(code).toBeTruthy();
  });
});

describe('Sticky bar', () => {
  beforeEach(() => { localStorage.clear(); window.location.hash = ''; });

  it('does not render sticky bar when no search string', () => {
    renderApp();
    expect(screen.queryByRole('region', { name: /quick copy/i })).not.toBeInTheDocument();
  });

  it('renders sticky bar when a search string exists', () => {
    renderApp();
    addOptionByLabel('Shiny');
    expect(screen.getByRole('region', { name: /quick copy/i })).toBeInTheDocument();
  });

  it('sticky bar shows the search string', () => {
    renderApp();
    addOptionByLabel('Lucky');
    const bar = screen.getByRole('region', { name: /quick copy/i });
    expect(within(bar).getByText('lucky')).toBeInTheDocument();
  });

  it('sticky bar clear button resets the search', () => {
    renderApp();
    addOptionByLabel('Lucky');
    const bar = screen.getByRole('region', { name: /quick copy/i });
    const clearBtn = within(bar).getByRole('button', { name: /clear search/i });
    fireEvent.click(clearBtn);
    expect(screen.getByText('Choose one or more filters below')).toBeInTheDocument();
  });
});

describe('Saved searches', () => {
  beforeEach(() => { localStorage.clear(); window.location.hash = ''; });

  it('saved search drawer opens when bookmark button is clicked', () => {
    renderApp();
    const savedBtn = screen.getByRole('button', { name: /saved searches/i });
    fireEvent.click(savedBtn);
    expect(screen.getByPlaceholderText(/name this search/i)).toBeInTheDocument();
  });

  it('shows empty state message when no saves exist', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: /saved searches/i }));
    expect(screen.getByText(/no saved searches yet/i)).toBeInTheDocument();
  });

  it('saves a search and shows it in the drawer', () => {
    renderApp();
    addOptionByLabel('Shiny');
    fireEvent.click(screen.getByRole('button', { name: /saved searches/i }));
    const input = screen.getByPlaceholderText(/name this search/i);
    fireEvent.change(input, { target: { value: 'My shinies' } });
    fireEvent.click(screen.getByRole('button', { name: /save$/i }));
    expect(screen.getByText('My shinies')).toBeInTheDocument();
  });

  it('quick-save from sticky bar creates a saved search', () => {
    renderApp();
    addOptionByLabel('Lucky');
    const bar = screen.getByRole('region', { name: /quick copy/i });
    const saveBtn = within(bar).getByRole('button', { name: /save search/i });
    fireEvent.click(saveBtn);
    // Open drawer to verify
    fireEvent.click(screen.getByRole('button', { name: /saved searches/i }));
    expect(screen.getByText('Search 1')).toBeInTheDocument();
  });
});

describe('Joiner badge toggling', () => {
  beforeEach(() => { localStorage.clear(); window.location.hash = ''; });

  it('toggles joiner badge from AND to OR', () => {
    renderApp();
    addOptionByLabel('Perfect IV (4★)');
    addOptionByLabel('Shiny', 'AND');
    // Find the AND joiner badge
    const badge = screen.getByRole('button', { name: /joiner.*AND/i });
    fireEvent.click(badge);
    // Should now be OR, and the string should change
    const code = screen.getAllByRole('code').find(el => el.textContent === '4*,shiny');
    expect(code).toBeTruthy();
  });

  it('locked joiner badge cannot be toggled (same group items)', () => {
    renderApp();
    addOptionByLabel('Perfect IV (4★)');
    addOptionByLabel('3★ (82–98% IV)', 'OR');
    // The joiner between these should be locked to OR
    const badge = screen.getByRole('button', { name: /OR only/i });
    expect(badge).toHaveAttribute('aria-disabled', 'true');
  });
});

describe('Remove filter', () => {
  beforeEach(() => { localStorage.clear(); window.location.hash = ''; });

  it('removes a filter from the chips', () => {
    renderApp();
    addOptionByLabel('Shiny');
    // Two "Remove Shiny" exist (chip + card), get the one on the chip
    const removeBtn = document.querySelector('.chip-remove[aria-label="Remove Shiny"]') as HTMLElement;
    fireEvent.click(removeBtn);
    expect(screen.getByText('Choose one or more filters below')).toBeInTheDocument();
  });

  it('removes a filter from the option card when active', () => {
    renderApp();
    addOptionByLabel('Shiny');
    // The shiny card should now show "Added" and a remove button
    const card = screen.getByLabelText('Shiny');
    const removeBtn = within(card).getByRole('button', { name: /remove shiny/i });
    fireEvent.click(removeBtn);
    expect(screen.getByText('Choose one or more filters below')).toBeInTheDocument();
  });
});

describe('Custom term input', () => {
  beforeEach(() => { localStorage.clear(); window.location.hash = ''; });

  it('adds a custom term with Add button', () => {
    renderApp();
    const input = screen.getByPlaceholderText(/add a custom term/i);
    fireEvent.change(input, { target: { value: 'cp1500' } });
    // Custom row Add button has title "Add cp1500"
    const addBtn = screen.getByTitle('Add cp1500');
    fireEvent.click(addBtn);
    expect(screen.getByRole('list', { name: /selected filters/i })).toBeInTheDocument();
    const code = screen.getAllByRole('code').find(el => el.textContent === 'cp1500');
    expect(code).toBeTruthy();
  });

  it('adds a custom term with Enter key', () => {
    renderApp();
    const input = screen.getByPlaceholderText(/add a custom term/i);
    fireEvent.change(input, { target: { value: 'hp100' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    const code = screen.getAllByRole('code').find(el => el.textContent === 'hp100');
    expect(code).toBeTruthy();
  });

  it('clears input after adding a custom term', () => {
    renderApp();
    const input = screen.getByPlaceholderText(/add a custom term/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'cp2000' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input.value).toBe('');
  });

  it('does not add empty custom terms', () => {
    renderApp();
    const input = screen.getByPlaceholderText(/add a custom term/i);
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('Choose one or more filters below')).toBeInTheDocument();
  });
});
