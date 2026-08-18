import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { memories } from '../data/memories'
import { memoryProgressLabel } from '../game/progression'
import { sfx } from '../audio/audio'
import MemoryCard from '../components/MemoryCard'
import GlowButton from '../components/GlowButton'
import ConfettiBurst from '../components/ConfettiBurst'

/** Catmull-Rom → smooth cubic path through the memory points. */
function buildPath(pts) {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`
  }
  return d
}

export default function Chapter1({ onComplete }) {
  const { state, unlockMemory } = useGame()
  const [active, setActive] = useState(null)
  const [burst, setBurst] = useState(0)

  const list = useMemo(() => memories.filter((m) => m.chapter === 1), [])
  const pathD = useMemo(() => buildPath(list.map((m) => m.location)), [list])
  const unlocked = state.unlockedMemories
  const complete = list.every((m) => unlocked.includes(m.id))

  const openMemory = (m) => {
    sfx.click()
    setActive(m)
  }
  const handleRemember = () => {
    setBurst((b) => b + 1)
    unlockMemory(active.id)
  }

  return (
    <div className="relative min-h-screen flex flex-col pt-20 pb-16 px-4">
      <ConfettiBurst trigger={burst} count={14} />

      <div className="text-center mb-6">
        <p className="text-gold-300 tracking-[0.5em] uppercase text-[11px] mb-1">Chapter 1</p>
        <h1 className="font-display text-4xl sm:text-5xl text-cream-50 text-glow">How It Started</h1>
        <p className="mt-2 text-cream-200/60 font-display italic text-base max-w-md mx-auto">
          Tap the glowing spots. That’s where it all began.
        </p>
        <p className="mt-3 text-[11px] tracking-[0.25em] uppercase text-cream-200/40">
          {memoryProgressLabel(unlocked)} memories
        </p>
      </div>

      {/* the map */}
      <div className="relative flex-1 min-h-[62vh] w-full max-w-xl mx-auto rounded-3xl overflow-hidden hairline">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-850 via-midnight-800 to-rose-950/40" />
        <div className="absolute inset-0 bg-radial-glow opacity-70" aria-hidden="true" />
        <div className="absolute top-6 right-6 text-3xl text-gold-200/40 animate-pulse-glow" aria-hidden="true">🌙</div>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            d={pathD}
            fill="none"
            stroke="rgba(236,217,166,0.16)"
            strokeWidth="0.4"
            strokeDasharray="0.8 1.4"
            strokeLinecap="round"
          />
        </svg>

        {list.map((m) => {
          const isUnlocked = unlocked.includes(m.id)
          return (
            <div
              key={m.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${m.location.x}%`, top: `${m.location.y}%` }}
            >
              <button
                onClick={() => (isUnlocked ? null : openMemory(m))}
                aria-label={isUnlocked ? `${m.title} (unlocked)` : m.title}
                disabled={isUnlocked}
                className="group relative flex items-center justify-center outline-none"
              >
                {!isUnlocked && <span className="absolute inset-0 rounded-full animate-ping bg-rose-400/20" />}
                <span
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl border-2 backdrop-blur-sm transition-all duration-500 ${
                    isUnlocked
                      ? 'border-gold-300 bg-gold-400/25 shadow-glow'
                      : 'border-cream-100/25 bg-midnight-800/50 group-hover:border-rose-300/70 group-hover:shadow-glow-rose scale-100'
                  }`}
                >
                  {isUnlocked ? (
                    <Check size={22} className="text-gold-200" />
                  ) : (
                    <span className="group-hover:scale-110 transition-transform">{m.emoji}</span>
                  )}
                </span>
              </button>
              <span
                className={`mt-2 max-w-[90px] text-center text-[10px] leading-tight tracking-wide transition-colors ${
                  isUnlocked ? 'text-gold-200/90' : 'text-cream-100/55'
                }`}
              >
                {m.caption}
              </span>
            </div>
          )
        })}
      </div>
      {/* continue */}
      <div className="text-center mt-8">
        <AnimatePresence>
          {complete && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <p className="font-display italic text-cream-200/70 mb-4">I think that’s where it all started…</p>
              <GlowButton variant="gold" onClick={onComplete}>Continue ❤️</GlowButton>
            </motion.div>
          )}
        </AnimatePresence>
        {!complete && (
          <p className="text-cream-200/35 text-xs italic">Find all {list.length} memories to continue.</p>
        )}
      </div>

      <MemoryCard
        memory={active}
        open={Boolean(active)}
        unlocked={active ? unlocked.includes(active.id) : false}
        onRemember={handleRemember}
        onClose={() => setActive(null)}
      />
    </div>
  )
}
