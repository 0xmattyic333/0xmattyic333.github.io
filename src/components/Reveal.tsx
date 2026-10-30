import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
}

// Should content just appear, with no animation? Yes when the visitor asked
// for reduced motion, or when the browser can't tell us what's on screen.
// Either way the content is never left invisible.
function shouldSkipAnimation() {
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  return reducedMotion || !('IntersectionObserver' in window)
}

// Fades and slides its children in the first time they scroll into view.
function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(shouldSkipAnimation)

  useEffect(() => {
    if (visible || !ref.current) return
    // IntersectionObserver tells us when the element enters the viewport.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
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
