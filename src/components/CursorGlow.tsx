import { useEffect, useRef } from 'react'
import { useCanHover, usePrefersReducedMotion } from '../lib/motion'

const SIZE = 480 // px, the glow's diameter

// A soft blue light that follows the mouse across the page.
// - Mouse/trackpad: follows the pointer.
// - Touchscreens: drifts slowly on its own (CSS animation "glow-drift").
// - Reduced motion: sits still ("glow-static").
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const canHover = useCanHover()
  const follows = canHover && !reducedMotion

  useEffect(() => {
    if (!follows) return
    let frame = 0
    let x = 0
    let y = 0

    function onPointerMove(event: PointerEvent) {
      x = event.clientX
      y = event.clientY
      // Batch updates into at most one per screen refresh, and do nothing in a hidden tab.
      if (frame || document.hidden) return
      frame = requestAnimationFrame(() => {
        frame = 0
        if (ref.current) {
          ref.current.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`
        }
      })
    }

    window.addEventListener('pointermove', onPointerMove)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(frame)
    }
  }, [follows])

  const mode = reducedMotion ? 'glow-static' : canHover ? '' : 'glow-drift'

  return (
    // A fixed, clipped frame: the light can wander past the screen edge without
    // ever making the page scroll sideways (iOS Safari can count it as overflow).
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        ref={ref}
        data-glow
        style={{ width: SIZE, height: SIZE }}
        // The CSS transition smooths the movement, so the glow eases after the pointer.
        className={`absolute top-0 left-0 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_65%)] transition-transform duration-300 ease-out ${mode}`}
      />
    </div>
  )
}

export default CursorGlow
