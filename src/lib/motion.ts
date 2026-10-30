import { useEffect, useState, type RefObject } from 'react'

// Media queries the browser answers for us:
//  - reduced motion: the visitor asked their device for less animation.
//  - hover: they have a mouse or trackpad (not just a touchscreen).
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const CAN_HOVER = '(hover: hover) and (pointer: fine)'

// Returns whether a media query currently matches, and stays in sync if it changes.
// Falls back to false when matchMedia doesn't exist (old browsers, tests).
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia?.(query).matches ?? false)

  useEffect(() => {
    const list = window.matchMedia?.(query)
    if (!list) return
    const onChange = () => setMatches(list.matches)
    list.addEventListener?.('change', onChange)
    return () => list.removeEventListener?.('change', onChange)
  }, [query])

  return matches
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery(REDUCED_MOTION)
}

export function useCanHover(): boolean {
  return useMediaQuery(CAN_HOVER)
}

// True while `ref`'s element is on screen AND the browser tab is visible.
// Animations use it to stop doing work nobody can see (saves battery on phones).
// Assumes visible when the browser can't tell us (no IntersectionObserver).
export function useIsVisible(ref: RefObject<Element | null>): boolean {
  const [onScreen, setOnScreen] = useState(true)
  const [tabVisible, setTabVisible] = useState(() => !document.hidden)

  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])

  useEffect(() => {
    const onChange = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  return onScreen && tabVisible
}
