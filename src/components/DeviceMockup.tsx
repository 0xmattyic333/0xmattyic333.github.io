import { useEffect, useRef } from 'react'
import type { ProjectMedia } from '../data/types'
import { usePrefersReducedMotion } from '../lib/motion'

type DeviceMockupProps = {
  media: ProjectMedia
  alt: string // what the project is, e.g. "TEMPR Esports site"
}

// A laptop showing a looping scroll-through of the site, with a phone
// overlapping its corner showing the mobile view. The frames are pure CSS,
// so the captured media stays plain and reusable.
function DeviceMockup({ media, alt }: DeviceMockupProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (reducedMotion || !video || !('IntersectionObserver' in window)) return
    // Only play while the card is on screen: saves battery and data on phones.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {}) // autoplay can be refused; the poster stays
      else video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <div className="relative px-5 pt-6 pb-8">
      {/* Laptop: screen with a dark bezel, sitting on a thin base. */}
      <div className="rounded-t-xl border-[6px] border-b-[10px] border-slate-800 bg-slate-900 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={media.laptopPoster}
          aria-label={`${alt} on a laptop`}
          className="aspect-[16/10] w-full object-cover object-top"
        >
          <source src={media.laptopVideo} type="video/webm" />
          <source src={media.laptopVideoMp4} type="video/mp4" />
        </video>
      </div>
      <div className="mx-auto h-2 w-[112%] -translate-x-[5.4%] rounded-b-lg bg-gradient-to-b from-slate-600 to-slate-800" />

      {/* Phone: overlaps the laptop's bottom-right corner. */}
      <div className="absolute right-2 bottom-3 w-[26%] rounded-[1.4rem] border-[5px] border-slate-800 bg-slate-800 shadow-[0_0_24px_rgba(124,58,237,0.45)]">
        <div className="absolute top-1.5 left-1/2 z-10 h-1.5 w-1/3 -translate-x-1/2 rounded-full bg-slate-900" />
        <img
          src={media.phone}
          alt={`${alt} on a phone`}
          loading="lazy"
          className="w-full rounded-[1rem]"
        />
      </div>
    </div>
  )
}

export default DeviceMockup
