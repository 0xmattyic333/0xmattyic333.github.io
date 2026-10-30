import { useEffect, useState } from 'react'
import { terminalScript, type TerminalLine } from '../data/terminal'
import { usePrefersReducedMotion } from '../lib/motion'

const TYPE_MS = 45 // per character, for typed lines
const LINE_MS = 420 // pause before each output line appears
const LOOP_PAUSE_MS = 2500 // how long the finished job stays on screen

const toneClass: Record<TerminalLine['tone'], string> = {
  prompt: 'text-neon-violet',
  input: 'text-white',
  jcl: 'text-neon-sky',
  output: 'text-indigo-200',
  success: 'text-green-400',
}

// Where the animation is: `done` full lines are shown, plus `typing`
// characters of the next line when that line is being typed.
type Progress = { done: number; typing: number }

function Terminal() {
  const reducedMotion = usePrefersReducedMotion()
  const [progress, setProgress] = useState<Progress>({ done: 0, typing: 0 })

  useEffect(() => {
    if (reducedMotion) return
    // Each step schedules the next with setTimeout; cleanup cancels whichever is pending.
    let timer: ReturnType<typeof setTimeout>
    let done = 0
    let typing = 0

    function step() {
      if (done >= terminalScript.length) {
        timer = setTimeout(() => {
          done = 0
          typing = 0
          setProgress({ done, typing })
          step()
        }, LOOP_PAUSE_MS)
        return
      }
      const line = terminalScript[done]
      if (line.typed && typing < line.text.length) {
        typing += 1
        setProgress({ done, typing })
        timer = setTimeout(step, TYPE_MS)
        return
      }
      timer = setTimeout(() => {
        done += 1
        typing = 0
        setProgress({ done, typing })
        step()
      }, LINE_MS)
    }

    step()
    return () => clearTimeout(timer)
  }, [reducedMotion])

  // With reduced motion, skip straight to the finished job.
  const { done, typing } = reducedMotion ? { done: terminalScript.length, typing: 0 } : progress
  const current = terminalScript[done]

  return (
    <figure
      aria-label="Mainframe terminal demo"
      className="w-full overflow-hidden rounded-xl border border-neon-sky/45 bg-[#05060f] text-left shadow-[0_0_32px_rgba(124,58,237,0.35)]"
    >
      <div className="flex items-center gap-1.5 bg-[#11132b] px-3 py-2 text-xs text-muted">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2">z/OS · TSO</span>
      </div>

      {/* The animated screen is hidden from screen readers; they get the transcript below instead. */}
      <pre
        aria-hidden="true"
        // 11px fits the longest line on a 360px phone; break-words is a safety net for narrower screens.
        className="min-h-64 px-4 py-3 font-mono text-[11px] leading-relaxed break-words whitespace-pre-wrap sm:text-sm"
      >
        {terminalScript.slice(0, done).map((line, i) => (
          <div key={i} className={toneClass[line.tone]}>
            {line.text}
          </div>
        ))}
        {current?.typed && typing > 0 && (
          <span className={toneClass[current.tone]}>{current.text.slice(0, typing)}</span>
        )}
        <span className="inline-block h-4 w-2 translate-y-0.5 bg-neon-sky motion-safe:animate-pulse" />
      </pre>

      <figcaption className="sr-only">
        {terminalScript.map((line) => line.text).join('\n')}
      </figcaption>
    </figure>
  )
}

export default Terminal
