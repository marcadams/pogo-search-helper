import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    window.location.hash = '';
  });

  it('renders the hero title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('shows placeholder text when no filters selected', () => {
    render(<App />);
    expect(screen.getByText('Choose one or more filters below')).toBeInTheDocument();
  });

  it('shows Builder and Recipes tabs', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /builder/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /recipes/i })).toBeInTheDocument();
  });

  it('switches to Recipes view when tab is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /recipes/i }));
    expect(screen.getByText('Cleanup Recipes')).toBeInTheDocument();
  });

  it('Copy button is disabled when no search string', () => {
    render(<App />);
    const copyBtn = screen.getAllByRole('button', { name: /copy/i })[0];
    expect(copyBtn).toBeDisabled();
  });

  it('shows option categories', () => {
    render(<App />);
    expect(screen.getByText('Appraisal')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
  });

  it('adds a filter when Add button is clicked', () => {
    render(<App />);
    // Find the first "Add" button (empty state shows "Add" label)
    const addButtons = screen.getAllByRole('button', { name: /^Add / });
    fireEvent.click(addButtons[0]);
    // After adding, chips should appear
    expect(screen.getByRole('list', { name: /selected filters/i })).toBeInTheDocument();
  });

  it('shows AND/OR/NOT buttons after first filter is added', () => {
    render(<App />);
    const addButtons = screen.getAllByRole('button', { name: /^Add / });
    fireEvent.click(addButtons[0]);
    // Now other cards should show AND/OR/NOT
    expect(screen.getAllByText('AND').length).toBeGreaterThan(0);
    expect(screen.getAllByText('OR').length).toBeGreaterThan(0);
    expect(screen.getAllByText('NOT').length).toBeGreaterThan(0);
  });

  it('clears all filters with Clear all button', () => {
    render(<App />);
    const addButtons = screen.getAllByRole('button', { name: /^Add / });
    fireEvent.click(addButtons[0]);
    const clearBtn = screen.getByText('Clear all');
    fireEvent.click(clearBtn);
    expect(screen.getByText('Choose one or more filters below')).toBeInTheDocument();
  });
});
