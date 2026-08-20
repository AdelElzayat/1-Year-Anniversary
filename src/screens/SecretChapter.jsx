import { motion } from 'framer-motion'
import { secretChapter } from '../data/easterEggs'
import { useGame } from '../context/GameContext'
import { sfx } from '../audio/audio'
import GlowButton from '../components/GlowButton'

/**
 * ❤️ SECRET CHAPTER — the extra memory only reachable by
 * typing the secret word from storyConfig.secretWord.
 */
export default function SecretChapter() {
  const { setScreen } = useGame()
  const s = secretChapter

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-8"
      >
        <p className="text-gold-300 tracking-[0.5em] uppercase text-[11px] mb-3">❤️ Secret Chapter</p>
        <h1 className="font-display text-4xl sm:text-5xl text-cream-50 text-glow">{s.title}</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="relative w-full max-w-md bg-cream-100 text-midnight-900 rounded-2xl shadow-card overflow-hidden"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-gold-300/50 -rotate-2 rounded-sm shadow-sm" aria-hidden="true" />
        <div className="pt-6 px-6 pb-6 space-y-4">
          <div className="inline-block border-2 border-rose-500/40 text-rose-600 font-hand text-lg px-3 py-0.5 rounded -rotate-2 tracking-wide">
            {s.date || 'a date only we remember'}
          </div>
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-midnight-800 via-midnight-700 to-rose-900/60 flex items-center justify-center">
            {s.image ? (
              <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-2">{s.emoji}</div>
                <p className="text-cream-100/50 text-xs tracking-[0.25em] uppercase">placeholder</p>
                <p className="text-gold-200/70 font-hand text-xl">your secret memory goes here</p>
              </div>
            )}
          </div>
          <p className="text-midnight-800/85 text-[15px] leading-relaxed">{s.text}</p>
          <p className="font-display italic text-midnight-900/70 border-t border-midnight-900/10 pt-3">{s.note}</p>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-cream-200/40 text-xs italic mt-8"
      >
        You found our secret. Only you could. ❤️
      </motion.p>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-6">
        <GlowButton variant="ghost" onClick={() => { sfx.click(); setScreen('ending') }}>
          Back to the story
        </GlowButton>
      </motion.div>
    </div>
  )
}
