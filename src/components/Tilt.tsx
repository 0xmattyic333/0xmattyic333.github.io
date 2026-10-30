import { useState, type PointerEvent, type ReactNode } from 'react'
import { useCanHover, usePrefersReducedMotion } from '../lib/motion'

type TiltProps = {
  children: ReactNode
  max?: number // biggest lean, in degrees
}

// Leans its content toward the mouse pointer in 3D. Mouse/trackpad only:
// on touchscreens or with reduced motion it simply renders its children.
function Tilt({ children, max = 6 }: TiltProps) {
  const enabled = useCanHover() && !usePrefersReducedMotion()
  const [transform, setTransform] = useState('')

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled) return
    const box = event.currentTarget.getBoundingClientRect()
    // -0.5 (left/top edge) ... 0.5 (right/bottom edge)
    const px = (event.clientX - box.left) / box.width - 0.5
    const py = (event.clientY - box.top) / box.height - 0.5
    setTransform(
      `perspective(800px) rotateX(${(-py * max * 2).toFixed(2)}deg) rotateY(${(px * max * 2).toFixed(2)}deg)`,
    )
  }

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTransform('')}
      style={{ transform }}
      className="h-full transition-transform duration-200 ease-out"
    >
      {children}
    </div>
  )
}

export default Tilt
