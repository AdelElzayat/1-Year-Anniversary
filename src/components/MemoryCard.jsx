import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { KeyRound, X } from 'lucide-react'
import { storyConfig } from '../config/storyConfig'
import { sfx } from '../audio/audio'
import AudioPlayer from './AudioPlayer'

/**
 * The memory card — scrapbook / Polaroid / diary hybrid.
 * Opens over a dimmed scene, reveals date, image, story.
 * "I remember ❤️" unlocks the memory (+1 key).
 */
export default function MemoryCard({ memory, open, onClose, unlocked, onRemember }) {
  const [revealed, setRevealed] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (open) {
      setRevealed(false)
      setClosing(false)
    }
  }, [open])

  if (!memory) return null

  const handleRemember = () => {
    sfx.unlock()
    setRevealed(true)
    onRemember?.()
  }

  const handleClose = () => {
    sfx.click()
    onClose?.()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={memory.title}
        >
          <motion.button
            aria-label="Close memory"
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotate: 1.5, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="relative w-full max-w-md bg-cream-100 text-midnight-900 rounded-2xl shadow-card overflow-hidden"
          >
            {/* tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-gold-300/50 rotate-2 rounded-sm shadow-sm" aria-hidden="true" />

            {/* date stamp */}
            <div className="pt-6 px-6">
              <div className="inline-block border-2 border-rose-500/40 text-rose-600 font-hand text-lg px-3 py-0.5 rounded -rotate-2 tracking-wide">
                {memory.date || 'someday'}
              </div>
            </div>

            <div className="px-6 pt-3 pb-6 space-y-4">
              <h3 className="font-display text-3xl font-semibold leading-tight">{memory.title}</h3>

              {/* image / placeholder art */}
              {memory.image ? (
                <div className="overflow-hidden rounded-xl bg-midnight-900">
                  <img
                    src={memory.image}
                    alt={memory.title}
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-midnight-800 via-midnight-700 to-rose-900/60 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2">{memory.emoji || '💭'}</div>
                    <p className="text-cream-100/50 text-xs tracking-[0.25em] uppercase">placeholder</p>
                    <p className="text-gold-200/70 font-hand text-xl">your memory goes here</p>
                  </div>
                  <div className="absolute inset-0 bg-radial-glow opacity-60" aria-hidden="true" />
                </div>
              )}

              <p className="text-midnight-800/85 text-[15px] leading-relaxed">{memory.description}</p>

              {memory.audio && (
                <div className="bg-midnight-900/5 border border-midnight-900/10 rounded-xl p-3">
                  <AudioPlayer src={memory.audio} label={`${memory.title} — audio memory`} />
                </div>
              )}

              {/* footer action */}
              {!revealed ? (
                <div className="pt-1">
                  <p className="text-xs text-midnight-900/50 mb-3 italic">Do you remember?</p>
                  <button
                    onClick={handleRemember}
                    className="w-full rounded-full bg-gradient-to-b from-rose-500/90 to-rose-600/90 text-cream-50 py-3.5 text-sm font-semibold tracking-[0.14em] uppercase shadow-lg hover:from-rose-400 hover:to-rose-600 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    {storyConfig.copy.memoryCard.remember}
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between gap-2 pt-1"
                >
                  <div className="flex items-center gap-2 text-emerald-700">
                    <KeyRound size={16} className="text-gold-600" />
                    <span className="text-sm font-medium">
                      {storyConfig.copy.memoryCard.unlockTitle} · {storyConfig.copy.memoryCard.keyAdded}
                    </span>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-midnight-900/60 hover:text-midnight-900 text-sm underline underline-offset-4 cursor-pointer"
                  >
                    Continue
                  </button>
                </motion.div>
              )}
            </div>

            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-3 right-3 text-midnight-900/50 hover:text-midnight-900 p-1 cursor-pointer"
            >
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
