import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../lib/motion'

const TYPE_MS = 60
const HOLD_MS = 1400
const ERASE_MS = 30

type TypingLineProps = {
  phrases: string[]
}

// Types a phrase, holds it, erases it, then moves to the next one, forever.
function TypingLine({ phrases }: TypingLineProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [text, setText] = useState('')

  useEffect(() => {
    if (reducedMotion) return
    let timer: ReturnType<typeof setTimeout>
    let index = 0 // which phrase
    let length = 0 // how many of its characters are showing
    let erasing = false

    function tick() {
      const phrase = phrases[index]
      if (!erasing && length < phrase.length) {
        length += 1
        timer = setTimeout(tick, TYPE_MS)
      } else if (!erasing) {
        erasing = true
        timer = setTimeout(tick, HOLD_MS)
      } else if (length > 0) {
        length -= 1
        timer = setTimeout(tick, ERASE_MS)
      } else {
        erasing = false
        index = (index + 1) % phrases.length
        timer = setTimeout(tick, TYPE_MS)
      }
      setText(phrases[index].slice(0, length))
    }

    tick()
    return () => clearTimeout(timer)
  }, [reducedMotion, phrases])

  return (
    <p className="mt-3 font-mono text-sm text-indigo-200 sm:text-base">
      {/* The animated text is hidden from screen readers so they don't read every keystroke. */}
      <span aria-hidden="true">
        <span className="text-neon-violet">&gt; </span>
        {reducedMotion ? phrases[0] : text}
        <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-neon-sky motion-safe:animate-pulse" />
      </span>
      {phrases.map((phrase) => (
        <span key={phrase} className="sr-only">
          {phrase}
        </span>
      ))}
    </p>
  )
}

export default TypingLine
