import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { storyConfig } from '../config/storyConfig'
import { easterEggs } from '../data/easterEggs'
import { sfx } from '../audio/audio'
import GlowButton from '../components/GlowButton'

/**
 * Opening screen — almost pitch black, gently fills with life,
 * then: "Soulmates." → tagline → the two yes buttons.
 * Also hosts two hidden easter eggs (a star, and the title).
 */
export default function Opening({ onBegin }) {
  const { findEgg, showToast, state } = useGame()
  const [titleClicks, setTitleClicks] = useState(0)
  const [starClicks, setStarClicks] = useState(0)
  const titleEgg = easterEggs.find((e) => e.type === 'title')
  const starEgg = easterEggs.find((e) => e.type === 'star')
  const c = storyConfig.copy.opening

  const handleTitleClick = () => {
    const n = titleClicks + 1
    setTitleClicks(n)
    if (n >= titleEgg.taps) {
      setTitleClicks(0)
      if (!state.easterEggs.includes(titleEgg.id)) {
        findEgg(titleEgg.id)
        sfx.egg()
        showToast(`“${titleEgg.title}” — ${titleEgg.message}`, { icon: '✨' })
      }
    }
  }

  const handleStarClick = () => {
    sfx.click()
    const n = starClicks + 1
    setStarClicks(n)
    if (n >= starEgg.taps) {
      setStarClicks(0)
      if (!state.easterEggs.includes(starEgg.id)) {
        findEgg(starEgg.id)
        sfx.egg()
        showToast(`“${starEgg.title}” — ${starEgg.message}`, { icon: '⭐' })
      }
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 pb-24">
      {/* hidden star easter egg (top right, hard to spot) */}
      <button
        onClick={handleStarClick}
        aria-label="A tiny star"
        className="absolute top-[12%] right-[18%] text-gold-300/25 hover:text-gold-300/70 transition-colors cursor-pointer text-lg"
      >
        ✦
      </button>

      <motion.h1
        onClick={handleTitleClick}
        initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.06 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="font-display font-light text-[22vw] sm:text-8xl md:text-9xl leading-none text-cream-50 text-glow select-none cursor-default"
      >
        Soulmates.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.8 }}
        className="mt-4 font-display italic text-cream-200/70 text-base sm:text-lg"
      >
        {c.sub}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 3.0 }}
        className="mt-14"
      >
        <p className="text-cream-200/50 text-[11px] tracking-[0.35em] uppercase mb-3">{c.promptBefore}</p>
        <p className="font-display text-xl sm:text-2xl text-cream-100 mb-8">{c.prompt}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <GlowButton variant="primary" onClick={onBegin}>{c.yes}</GlowButton>
          <GlowButton variant="ghost" onClick={onBegin}>{c.obviously}</GlowButton>
        </div>
      </motion.div>
    </div>
  )
}
