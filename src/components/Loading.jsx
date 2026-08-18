import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { hasProgress } from '../utils/storage'

/**
 * Cinematic loading screen — "Preparing our memories…"
 * with a glowing progress line (not a generic spinner).
 */
export default function LoadingScreen({ onDone }) {
  const done = useRef(false)

  useEffect(() => {
    const total = 2400
    const start = performance.now()
    const id = setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / total)
      const eased = 1 - Math.pow(1 - t, 2)
      const el = document.getElementById('load-progress')
      const pct = document.getElementById('load-pct')
      if (el) el.style.width = `${Math.round(eased * 100)}%`
      if (pct) pct.textContent = `${Math.round(eased * 80)}%`
      if (t >= 1 && !done.current) {
        done.current = true
        clearInterval(id)
        setTimeout(onDone, 400)
      }
    }, 40)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <div className="fixed inset-0 z-[100] bg-midnight-950 flex flex-col items-center justify-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="font-display italic text-cream-200/70 text-sm tracking-wide px-6 text-center"
      >
        {hasProgress() ? 'Welcome back… preparing your memories.' : 'Preparing our memories…'}
      </motion.p>

      <div className="w-56 h-[2px] bg-midnight-700 rounded-full mt-6 overflow-hidden relative">
        <div id="load-progress" className="h-full w-0 rounded-full bg-gradient-to-r from-gold-500 via-cream-200 to-rose-500 shadow-glow transition-[width] duration-100" />
      </div>

      {/* drifting faint stars */}
      <div className="flex gap-6 mt-8 opacity-30 text-gold-300 animate-pulse-glow" aria-hidden="true">
        <span className="text-lg animate-floaty">✦</span>
        <span className="text-sm animate-floaty" style={{ animationDelay: '0.8s' }}>✧</span>
        <span className="text-lg animate-floaty" style={{ animationDelay: '1.5s' }}>✦</span>
      </div>

      <p id="load-pct" className="sr-only">Loading</p>
    </div>
  )
}