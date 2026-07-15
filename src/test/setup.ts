import '@testing-library/jest-dom';

// Mock IntersectionObserver (not available in jsdom)
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: () => Promise.resolve(),
  },
});
