import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { storyConfig } from '../config/storyConfig'
import { getTogetherMs, formatTogether } from '../utils/dates'
import { sfx } from '../audio/audio'
import GlowButton from '../components/GlowButton'

/**
 * Ending — stats + achievement, then the FINAL SURPRISE,
 * which adapts to storyConfig.finalMode (TOGETHER | LONG_DISTANCE).
 */
export default function Ending() {
  const { finish } = useGame()
  const [phase, setPhase] = useState('stats')
  const [step, setStep] = useState(0)
  const c = storyConfig.copy.ending
  const finalMode = storyConfig.finalMode
  const stats = c.stats

  useEffect(() => {
    finish()
  }, [finish])

  useEffect(() => {
    if (phase !== 'finale') return
    const timers = []
    timers.push(setTimeout(() => setStep(1), 2600))
    timers.push(setTimeout(() => setStep(2), 6200))
    timers.push(setTimeout(() => setStep(3), finalMode === 'LONG_DISTANCE' ? 9500 : 8800))
    return () => timers.forEach(clearTimeout)
  }, [phase, finalMode])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <AnimatePresence mode="wait">
        {phase === 'stats' ? (
          <motion.div key="stats" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, filter: 'blur(8px)' }} className="w-full max-w-md text-center">
            <p className="font-display italic text-cream-200/70 text-xl mb-2">Thank you for playing.</p>
            <h2 className="font-display text-3xl text-cream-50 text-glow mb-10">Soulmates. — the recap</h2>

            <div className="space-y-3">
              <StatRow label={stats.memories} value="∞" accent />
              <StatRow label={stats.laughs} value="Too many" />
              <StatRow label={stats.arguments} value="Classified" />
              <StatRow label={stats.time} value={formatTogether(getTogetherMs())} />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-10 rounded-3xl hairline bg-gradient-to-b from-gold-400/15 to-transparent p-6 shadow-glow"
            >
              <div className="flex items-center justify-center gap-2 text-gold-300 mb-1">
                <Trophy size={18} />
                <span className="text-[11px] tracking-[0.3em] uppercase">{c.achievement}</span>
              </div>
              <p className="font-display text-2xl text-cream-50 mt-1">{c.achievementName}</p>
            </motion.div>

            <p className="text-cream-200/50 text-sm mt-10 mb-4">{c.continue}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <GlowButton variant="primary" onClick={() => { sfx.click(); setPhase('finale') }}>{c.yes}</GlowButton>
              <GlowButton variant="gold" onClick={() => { sfx.click(); setPhase('finale') }}>{c.always}</GlowButton>
            </div>
          </motion.div>
        ) : (
          <motion.div key="finale" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black flex flex-col items-center justify-center px-8 text-center">
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-6 max-w-lg">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 1 ? 1 : 0 }}
                transition={{ duration: 1.4 }}
                className="font-display italic text-cream-200/80 text-xl sm:text-2xl leading-relaxed"
              >
                “There is one memory I couldn’t put on this website.”
              </motion.p>

              {finalMode === 'TOGETHER' ? (
                <>
                  <motion.p
                    initial={{ opacity: 0, filter: 'blur(12px)' }}
                    animate={{ opacity: step >= 2 ? 1 : 0, filter: step >= 2 ? 'blur(0px)' : 'blur(12px)' }}
                    transition={{ duration: 1.6 }}
                    className="font-display text-4xl sm:text-6xl text-cream-50 text-glow mt-4"
                  >
                    “Look beside you.” ❤️
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: step >= 3 ? 1 : 0 }}
                    transition={{ duration: 1.4 }}
                    className="font-display italic text-gold-200/80 text-xl mt-4"
                  >
                    I love you. Happy anniversary, {storyConfig.her.name}.
                  </motion.p>
                </>
              ) : (
                <>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: step >= 2 ? 1 : 0 }}
                    transition={{ duration: 1.4 }}
                    className="font-display italic text-cream-200/80 text-xl sm:text-2xl mt-2"
                  >
                    “There’s one thing this website can’t recreate.”
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: step >= 3 ? 1 : 0, filter: step >= 3 ? 'blur(0px)' : 'blur(10px)' }}
                    transition={{ duration: 1.4 }}
                    className="font-display text-3xl sm:text-5xl text-cream-50 text-glow mt-2"
                  >
                    “So call me.”
                  </motion.p>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: step >= 3 ? 1 : 0 }} transition={{ duration: 1 }} className="mt-6">
                    <a
                      href={storyConfig.finalContact.href}
                      onClick={() => sfx.achievement()}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-rose-400 to-rose-600 text-cream-50 px-8 py-4 font-semibold tracking-[0.14em] uppercase shadow-glow-rose hover:scale-105 active:scale-95 transition-all"
                    >
                      {storyConfig.finalContact.label}
                    </a>
                  </motion.div>
                </>
              )}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 3 ? 1 : 0 }}
                transition={{ duration: 1.4, delay: 1.2 }}
                className="font-display italic text-cream-200/50 text-lg mt-8"
              >
                — Soulmates.
              </motion.p>
            </div>
          </motion.div>

        )}
      </AnimatePresence>
    </div>
  )
}

function StatRow({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 rounded-2xl hairline bg-midnight-850/50">
      <span className="text-sm text-cream-200/60">{label}</span>
      <span className={`font-display text-lg ${accent ? 'text-gold-300 text-glow' : 'text-cream-100'}`}>{value}</span>
    </div>
  )
}
