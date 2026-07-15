import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import RaidsPage from '../RaidsPage';

describe('RaidsPage', () => {
  beforeEach(() => {
    render(<RaidsPage />);
  });

  it('renders the page title', () => {
    expect(screen.getByText('Raid Counters')).toBeInTheDocument();
  });

  it('shows category headings', () => {
    expect(screen.getByText('Legendary')).toBeInTheDocument();
    expect(screen.getByText('Mega')).toBeInTheDocument();
    expect(screen.getByText('Dynamax')).toBeInTheDocument();
  });

  it('renders raid boss cards with names', () => {
    expect(screen.getAllByText('Kyogre').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Articuno').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Mega Salamence').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Dynamax Deino').length).toBeGreaterThan(0);
  });

  it('shows weakness pills on cards', () => {
    // Kyogre is weak to Electric
    expect(screen.getAllByText('Electric').length).toBeGreaterThan(0);
  });

  it('shows counter search strings on cards', () => {
    // Should find at least one code element with @1 syntax
    const codes = screen.getAllByRole('code');
    const hasCounterString = codes.some(el => el.textContent?.includes('@1'));
    expect(hasCounterString).toBe(true);
  });

  it('renders Pokemon sprites', () => {
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute('src');
    expect(images[0].getAttribute('src')).toContain('raw.githubusercontent.com');
  });

  it('shows type filter pills', () => {
    const filterGroup = screen.getByRole('group', { name: /filter by type/i });
    expect(filterGroup).toBeInTheDocument();
    expect(within(filterGroup).getByText('All')).toBeInTheDocument();
    expect(within(filterGroup).getByText('Fire')).toBeInTheDocument();
    expect(within(filterGroup).getByText('Dragon')).toBeInTheDocument();
  });

  it('filters by type when a type pill is clicked', () => {
    const filterGroup = screen.getByRole('group', { name: /filter by type/i });
    fireEvent.click(within(filterGroup).getByText('Ground'));
    // Pikachu is weak to Ground
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    // Articuno is NOT weak to Ground
    expect(screen.queryByText('Articuno')).not.toBeInTheDocument();
  });

  it('clicking All resets the type filter', () => {
    const filterGroup = screen.getByRole('group', { name: /filter by type/i });
    fireEvent.click(within(filterGroup).getByText('Ground'));
    fireEvent.click(within(filterGroup).getByText('All'));
    expect(screen.getAllByText('Articuno').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Kyogre').length).toBeGreaterThan(0);
  });

  it('search input filters bosses by name', () => {
    const input = screen.getByPlaceholderText(/search for a raid boss/i);
    fireEvent.change(input, { target: { value: 'kyogre' } });
    expect(screen.getByText('Kyogre')).toBeInTheDocument();
    expect(screen.queryByText('Articuno')).not.toBeInTheDocument();
  });

  it('shows empty message when no results match', () => {
    const input = screen.getByPlaceholderText(/search for a raid boss/i);
    fireEvent.change(input, { target: { value: 'xyznonexistent' } });
    expect(screen.getByText(/no raid bosses match/i)).toBeInTheDocument();
  });

  it('copy button exists on each card', () => {
    const copyButtons = screen.getAllByText('Copy');
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  it('double-weak bosses show higher multiplier', () => {
    // Articuno is double-weak to Rock (2.56x)
    expect(screen.getAllByText('2.56x').length).toBeGreaterThan(0);
  });
});
