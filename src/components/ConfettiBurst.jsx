import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

const HEARTS = ['❤️', '💛', '✨', '🌸', '💫']

/**
 * Short-lived celebration burst — a handful of hearts/stars
 * that rise and fade. Cheap, purposeful, never constant.
 */
export default function ConfettiBurst({ trigger = 0, count = 18 }) {
  const reduced = useReducedMotion()
  const pieces = useMemo(() => {
    if (!trigger) return []
    return Array.from({ length: count }, (_, i) => ({
      id: `${trigger}-${i}`,
      x: (Math.random() - 0.5) * 220,
      y: -(Math.random() * 160 + 40),
      r: Math.random() * 180 - 90,
      emoji: HEARTS[i % HEARTS.length],
      size: 14 + Math.random() * 14,
      dur: 1.4 + Math.random() * 1.2
    }))
  }, [trigger, count])

  if (!trigger) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
            rotate: p.r,
            scale: 1.15
          }}
          transition={{ duration: reduced ? 0.2 : p.dur, ease: 'easeOut' }}
          style={{ fontSize: p.size, position: 'absolute' }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  )
}
