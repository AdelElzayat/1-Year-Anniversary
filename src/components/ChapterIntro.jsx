import { motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { sfx } from '../audio/audio'
import GlowButton from './GlowButton'

/**
 * Cinematic chapter title card: chapter number → title → subtitle → begin.
 */
export default function ChapterIntro({ chapter, onBegin }) {
  const reduced = useReducedMotion()
  const selected = { text: `Chapter ${chapter.number}`, stop: 0.0 }

  useEffect(() => {
    sfx.chapter()
    // mark the chapter as unlocked/completed-start point
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen px-6">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.3 : 0.8, delay: 0.2 }}
        className="text-gold-300 tracking-[0.5em] uppercase text-xs mb-4"
      >
        {selected.text}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, filter: 'blur(16px)', scale: 1.04 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: reduced ? 0.3 : 1.2, delay: 0.5 }}
        className="font-display text-5xl sm:text-6xl md:text-7xl font-medium text-cream-50 text-glow mb-6"
      >
        {chapter.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.3 : 0.9, delay: 1.2 }}
        className="max-w-md text-cream-200/75 font-display text-xl italic leading-relaxed"
      >
        {chapter.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.0 }}
        className="mt-10"
      >
        <GlowButton variant="ghost" onClick={onBegin}>
          {chapter.number === 5 ? 'Continue ❤️' : 'Begin'}
        </GlowButton>
      </motion.div>
    </div>
  )
}
