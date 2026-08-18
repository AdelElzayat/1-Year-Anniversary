import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { finalTimeline, futureItems } from '../data/timeline'
import { storyConfig } from '../config/storyConfig'
import { sfx } from '../audio/audio'
import GlowButton from '../components/GlowButton'

/**
 * Final Chapter — "Our Story Isn’t Finished."
 * Phase 1: a cinematic "You made it." reveal.
 * Phase 2: the journey into an intentionally-empty future.
 */
export default function FinalChapter({ onComplete }) {
  const [phase, setPhase] = useState('intro')
  const [step, setStep] = useState(0)
  const c = storyConfig.copy.final

  // Phase 1: timed reveal sequence
  useEffect(() => {
    if (phase !== 'intro') return
    const timers = []
    const schedule = (fn, ms) => timers.push(setTimeout(fn, ms))
    schedule(() => setStep(1), 800) // "You made it."
    schedule(() => setStep(2), 3200) // "But there's something..."
    schedule(() => setStep(3), 6200) // "The future."
    schedule(() => setStep(4), 9200) // show continue
    return () => timers.forEach(clearTimeout)
  }, [phase])

  const toMap = () => {
    sfx.achievement()
    setPhase('map')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {phase === 'intro' ? (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(8px)' }} className="text-center w-full max-w-lg">
            <div className="min-h-[40vh] flex flex-col items-center justify-center gap-6">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 1 ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="font-display text-4xl sm:text-6xl text-cream-50 text-glow"
              >
                {c.youMadeIt}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 10 }}
                transition={{ duration: 1 }}
                className="font-display italic text-cream-200/75 text-xl sm:text-2xl"
              >
                {c.somethingMore}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, filter: 'blur(14px)' }}
                animate={{ opacity: step >= 3 ? 1 : 0, filter: step >= 3 ? 'blur(0px)' : 'blur(14px)' }}
                transition={{ duration: 1.6 }}
                className="shimmer-text font-display text-5xl sm:text-7xl mt-4"
              >
                {c.theFuture}
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: step >= 4 ? 1 : 0 }} transition={{ duration: 0.8 }} className="mt-6">
                <GlowButton variant="ghost" onClick={toMap}>Show me</GlowButton>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="map" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl text-center pt-16 pb-20">
            <h2 className="font-display text-3xl sm:text-4xl text-cream-50 text-glow mb-2">Our Story Isn’t Finished</h2>
            <p className="text-cream-200/60 font-display italic text-base mb-10">The whole road, from the very start to right now.</p>

            {/* journey */}
            <div className="flex flex-col items-center gap-0">
              {finalTimeline.map((item, i) => (
                <div key={item.id} className="flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.12 }}
                    className="rounded-full border border-gold-300/30 bg-midnight-850/70 px-5 py-2.5 text-sm text-cream-100/85"
                  >
                    {item.label}
                  </motion.div>
                  {i < finalTimeline.length - 1 && (
                    <span className="text-gold-400/50 text-lg my-1" aria-hidden="true">↓</span>
                  )}
                </div>
              ))}
            </div>

            {/* tomorrow — big empty section */}
            <div className="mt-10 mb-2">
              <span className="text-gold-400/50 text-lg" aria-hidden="true">↓</span>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="relative border-2 border-dashed border-gold-300/30 rounded-3xl py-12 px-6"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-midnight-900 px-4 text-gold-300 tracking-[0.3em] uppercase text-xs">
                {c.tomorrow}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {futureItems.map((f, i) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.12 }}
                    className="rounded-2xl border border-cream-100/10 bg-midnight-850/40 px-3 py-5 flex flex-col items-center gap-2"
                  >
                    <span className="text-2xl opacity-60">{f.emoji}</span>
                    <span className="text-xs text-cream-200/50 leading-tight text-center">{f.label}</span>
                  </motion.div>
                ))}
              </div>
              <p className="font-hand text-2xl text-gold-200/70 mt-6">empty, for now…</p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="font-display italic text-cream-200/80 text-xl mt-10"
            >
              {c.notFinished}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="mt-8">
              <GlowButton variant="gold" onClick={onComplete}>Continue ❤️</GlowButton>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
