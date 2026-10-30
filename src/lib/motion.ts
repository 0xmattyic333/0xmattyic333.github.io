import { useEffect, useState } from 'react'

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
