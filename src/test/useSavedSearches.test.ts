import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSavedSearches } from '../useSavedSearches';

describe('useSavedSearches', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with an empty list', () => {
    const { result } = renderHook(() => useSavedSearches());
    expect(result.current.saves).toEqual([]);
  });

  it('saves a search and persists to localStorage', () => {
    const { result } = renderHook(() => useSavedSearches());

    act(() => {
      result.current.save('Test', '4*&shiny', [
        { id: '1', label: 'Perfect', token: '4*', category: 'Appraisal', description: '', excluded: false, joiner: '&' },
      ]);
    });

    expect(result.current.saves).toHaveLength(1);
    expect(result.current.saves[0].name).toBe('Test');
    expect(result.current.saves[0].string).toBe('4*&shiny');

    // Verify localStorage
    const stored = JSON.parse(localStorage.getItem('pogo-saved-searches')!);
    expect(stored).toHaveLength(1);
  });

  it('removes a saved search', () => {
    const { result } = renderHook(() => useSavedSearches());

    act(() => {
      result.current.save('A', 'shiny', []);
      result.current.save('B', 'lucky', []);
    });

    expect(result.current.saves).toHaveLength(2);

    act(() => {
      result.current.remove(result.current.saves[0].id);
    });

    expect(result.current.saves).toHaveLength(1);
  });

  it('renames a saved search', () => {
    const { result } = renderHook(() => useSavedSearches());

    act(() => {
      result.current.save('Original', '4*', []);
    });

    const id = result.current.saves[0].id;

    act(() => {
      result.current.rename(id, 'Renamed');
    });

    expect(result.current.saves[0].name).toBe('Renamed');
  });

  it('defaults name to Untitled for empty string', () => {
    const { result } = renderHook(() => useSavedSearches());

    act(() => {
      result.current.save('', '4*', []);
    });

    expect(result.current.saves[0].name).toBe('Untitled');
  });
});
