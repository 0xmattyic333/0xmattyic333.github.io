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

// Like mockMedia, but lets a test change the answers later (e.g. a trackpad gets
// attached), notifying anything listening for 'change' the way a browser would.
export function mockLiveMedia(initial: { reduceMotion?: boolean; canHover?: boolean } = {}) {
  const state = { reduceMotion: false, canHover: false, ...initial }
  const listeners = new Set<() => void>()
  const answer = (query: string) =>
    (query === '(prefers-reduced-motion: reduce)' && state.reduceMotion) ||
    (query === '(hover: hover) and (pointer: fine)' && state.canHover)
  window.matchMedia = vi.fn((query: string) => {
    const list = {
      get matches() {
        return answer(query)
      },
      addEventListener: (_: string, fn: () => void) => listeners.add(fn),
      removeEventListener: (_: string, fn: () => void) => listeners.delete(fn),
    }
    return list
  }) as unknown as typeof window.matchMedia
  return (next: Partial<typeof state>) => {
    Object.assign(state, next)
    listeners.forEach((fn) => fn())
  }
}

// A stand-in IntersectionObserver whose "is it on screen?" answer the test controls.
export function mockIntersection() {
  const callbacks: IntersectionObserverCallback[] = []
  window.IntersectionObserver = class {
    constructor(cb: IntersectionObserverCallback) {
      callbacks.push(cb)
    }
    observe() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver
  return (isIntersecting: boolean) =>
    callbacks.forEach((cb) =>
      cb([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver),
    )
}

export function resetIntersection() {
  // @ts-expect-error removing the test-only mock
  delete window.IntersectionObserver
}
