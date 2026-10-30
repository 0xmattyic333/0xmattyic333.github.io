import { useEffect, useRef, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../lib/motion'

type RevealProps = {
  children: ReactNode
}

// Fades and slides its children in the first time they scroll into view.
function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Content just appears (no animation) when the visitor asked for reduced motion,
  // or when the browser can't tell us what's on screen. It's never left invisible.
  const skipAnimation = usePrefersReducedMotion() || !('IntersectionObserver' in window)
  const [revealed, setRevealed] = useState(false)
  const visible = skipAnimation || revealed

  useEffect(() => {
    if (visible || !ref.current) return
    // IntersectionObserver tells us when the element enters the viewport.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true)
        observer.disconnect() // only animate once
      }
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [visible])

  return (
    <div
      ref={ref}
      className={`transition duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {children}
    </div>
  )
}

export default Reveal
