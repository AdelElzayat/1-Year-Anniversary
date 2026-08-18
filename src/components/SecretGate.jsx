import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { storyConfig } from '../config/storyConfig'
import { easterEggs, secretChapter } from '../data/easterEggs'
import { sfx } from '../audio/audio'

/**
 * Global listener that:
 *   1. Detects typed words (easter egg "love" typeword, and the secret word).
 *   2. Opens the secret-word entry dialog via the "us:open-secret" event.
 * Unlocks the SECRET CHAPTER when the secret word is entered/typed.
 * The word is never displayed anywhere in the UI.
 */
export default function SecretGate() {
  const { state, findEgg, unlockSecret, showToast, setScreen } = useGame()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const buffer = useRef('')

  const doUnlockSecret = useCallback(() => {
    sfx.achievement()
    unlockSecret()
    showToast('You found the secret chapter. ❤️', { icon: '🔐', duration: 5000 })
    setOpen(false)
    setScreen('secret')
  }, [unlockSecret, showToast, setScreen])

  // open dialog event from settings
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('us:open-secret', handler)
    return () => window.removeEventListener('us:open-secret', handler)
  }, [])

  // global typing detection (easter eggs + secret word)
  useEffect(() => {
    const handler = (e) => {
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key && e.key.length === 1) {
        buffer.current = (buffer.current + e.key.toLowerCase()).slice(-14)
        const typed = buffer.current

        // secret word?
        const sw = storyConfig.secretWord.toLowerCase()
        if (sw && sw.length >= 4 && typed.includes(sw) && !state.secretUnlocked) {
          doUnlockSecret()
          return
        }
        // typeword easter eggs
        for (const egg of easterEggs) {
          if (egg.type === 'typeword' && typed.includes(egg.word.toLowerCase())) {
            if (!state.easterEggs.includes(egg.id)) {
              findEgg(egg.id)
              sfx.egg()
              showToast(`“${egg.title}” — ${egg.message}`, { icon: '✨' })
            }
            return
          }
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [state.secretUnlocked, state.easterEggs, findEgg, showToast, doUnlockSecret])

  const submit = (e) => {
    e.preventDefault()
    if (value.trim().toLowerCase() === storyConfig.secretWord.toLowerCase()) {
      doUnlockSecret()
    } else {
      setError(true)
      sfx.wrong()
      setTimeout(() => setError(false), 1600)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" aria-label="Close" onClick={() => { setOpen(false); setValue(''); }} />
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="relative bg-midnight-850 border border-gold-300/15 rounded-3xl p-7 w-full max-w-xs text-center shadow-card"
          >
            <div className="text-gold-300 text-3xl mb-3">❦</div>
            <h3 className="font-display text-2xl text-cream-50 mb-1">Do you know our word?</h3>
            <p className="text-cream-200/55 text-xs mb-5">A word only the two of us would know.</p>

            <input
              type="password"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="…"
              className={`w-full bg-midnight-900/70 border rounded-xl px-4 py-3 text-center text-cream-100 outline-none focus:border-gold-400/60 transition-colors ${error ? 'border-rose-500/70' : 'border-gold-300/20'}`}
              aria-label="Secret word"
            />
            {error && <p className="text-rose-400 text-xs mt-2">Hmm, that’s not it… try again? 😉</p>}

            <button type="submit" className="mt-5 w-full rounded-full bg-gradient-to-b from-gold-400/90 to-gold-600 text-midnight-900 py-3 text-sm font-semibold tracking-[0.15em] uppercase hover:from-gold-300 active:scale-[0.98] transition-all cursor-pointer">
              Unlock
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}