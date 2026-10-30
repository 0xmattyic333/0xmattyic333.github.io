// Test helper: pretend the device answers media queries a certain way.
export function mockMedia({ reduceMotion = false, canHover = false } = {}) {
  window.matchMedia = vi.fn((query: string) => ({
    matches:
      (query === '(prefers-reduced-motion: reduce)' && reduceMotion) ||
      (query === '(hover: hover) and (pointer: fine)' && canHover),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

export function resetMedia() {
  // @ts-expect-error removing the test-only mock
  delete window.matchMedia
}
