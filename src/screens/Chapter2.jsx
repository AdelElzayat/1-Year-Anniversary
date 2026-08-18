import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { memories } from '../data/memories'
import { memoryProgressLabel } from '../game/progression'
import { sfx } from '../audio/audio'
import MemoryCard from '../components/MemoryCard'
import GlowButton from '../components/GlowButton'
import ConfettiBurst from '../components/ConfettiBurst'
import { useAnniversaryTimer } from '../hooks/useAnniversaryTimer'

/**
 * Chapter 2 — "Soulmates."
 * A vertical relationship path / timeline. The connecting line
 * fills in as milestones are unlocked, like a little game map.
 */
export default function Chapter2({ onComplete }) {
  const { state, unlockMemory } = useGame()
  const [active, setActive] = useState(null)
  const [burst, setBurst] = useState(0)
  const timer = useAnniversaryTimer(1000)

  const list = useMemo(() => memories.filter((m) => m.chapter === 2), [])
  const unlocked = state.unlockedMemories
  const complete = list.every((m) => unlocked.includes(m.id))
  const unlockedHere = list.filter((m) => unlocked.includes(m.id)).length
  const fillPct = (unlockedHere / list.length) * 100

  const openMemory = (m) => {
    sfx.click()
    setActive(m)
  }
  const handleRemember = () => {
    setBurst((b) => b + 1)
    unlockMemory(active.id)
  }

  return (
    <div className="relative min-h-screen pt-20 pb-20 px-5">
      <ConfettiBurst trigger={burst} count={12} />

      <div className="text-center mb-10">
        <p className="text-gold-300 tracking-[0.5em] uppercase text-[11px] mb-1">Chapter 2</p>
        <h1 className="font-display text-4xl sm:text-5xl text-cream-50 text-glow">Soulmates.</h1>
        <p className="mt-2 text-cream-200/60 font-display italic text-base max-w-md mx-auto">
          Somewhere along the way, it stopped being a story about two people.
        </p>
        <p className="mt-3 text-[11px] tracking-[0.25em] uppercase text-cream-200/40">
          {memoryProgressLabel(unlocked)} memories
        </p>
      </div>

      {/* timeline */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-[26px] sm:left-1/2 sm:-translate-x-[1px] top-0 bottom-0 w-[2px] bg-midnight-700/60 rounded-full" aria-hidden="true" />
        <div
          className="absolute left-[26px] sm:left-1/2 sm:-translate-x-[1px] top-0 w-[2px] rounded-full bg-gradient-to-b from-gold-400 to-rose-400 shadow-glow transition-[height] duration-700"
          style={{ height: `${fillPct}%` }}
          aria-hidden="true"
        />

        <div className="space-y-6">
          {list.map((m, i) => {
            const isUnlocked = unlocked.includes(m.id)
            const onLeft = i % 2 === 0
            return (
              <div key={m.id} className={`relative flex items-start gap-4 sm:gap-0 ${onLeft ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                <div className="absolute left-[7px] sm:left-1/2 sm:-translate-x-1/2 top-4 flex items-center justify-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-500 ${
                      isUnlocked ? 'border-gold-300 bg-gold-400/25 shadow-glow' : 'border-cream-100/20 bg-midnight-800/60'
                    }`}
                  >
                    {m.emoji}
                  </div>
                </div>

                <div className={`ml-16 sm:ml-0 sm:w-1/2 ${onLeft ? 'sm:pr-10 sm:text-right' : 'sm:pl-10'}`}>
                  <button
                    onClick={() => (isUnlocked ? null : openMemory(m))}
                    disabled={isUnlocked}
                    aria-label={isUnlocked ? `${m.title} (unlocked)` : m.title}
                    className={`group w-full text-left rounded-2xl p-4 hairline transition-all duration-500 cursor-pointer ${
                      isUnlocked
                        ? 'bg-gold-400/10 border-gold-300/30 shadow-glow'
                        : 'bg-midnight-850/70 hover:border-rose-300/50 hover:shadow-glow-rose'
                    } ${onLeft ? 'sm:text-right' : ''}`}
                  >
                    <div className={`flex items-center gap-2 mb-1 ${onLeft ? 'sm:flex-row-reverse' : ''}`}>
                      <span className={`text-[10px] tracking-[0.2em] uppercase ${isUnlocked ? 'text-gold-300' : 'text-cream-200/40'}`}>
                        {isUnlocked ? 'unlocked' : 'tap to remember'}
                      </span>
                      <span className="text-cream-100/40 text-[10px] -mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className={`font-display text-xl ${isUnlocked ? 'text-cream-50' : 'text-cream-100/70'}`}>{m.title}</h3>
                    <p className="text-sm text-cream-200/50 mt-0.5">{m.caption}</p>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* subtle anniversary timer */}
      <div className="text-center mt-12">
        <div className="inline-block glass rounded-full px-5 py-2.5">
          <p className="text-[11px] tracking-[0.25em] uppercase text-cream-200/50">We’ve been us for…</p>
          <p className="font-display text-cream-100 text-lg mt-0.5">
            {timer.days.toLocaleString()} days · {String(timer.hours).padStart(2, '0')}:{String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}
          </p>
        </div>
      </div>

      {/* continue */}
      <div className="text-center mt-8">
        <AnimatePresence>
          {complete && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <p className="font-display italic text-cream-200/70 mb-4">That’s us. All of us.</p>
              <GlowButton variant="gold" onClick={onComplete}>Continue ❤️</GlowButton>
            </motion.div>
          )}
        </AnimatePresence>
        {!complete && (
          <p className="text-cream-200/35 text-xs italic">Unlock all {list.length} milestones to continue.</p>
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
