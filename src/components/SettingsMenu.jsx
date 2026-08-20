import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Settings, Music2, Wind, Clock3, RotateCcw, KeyRound, Lock } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { useAudio } from '../context/AudioContext'
import { useSettings } from '../context/SettingsContext'
import { useAnniversaryTimer } from '../hooks/useAnniversaryTimer'
import { sfx } from '../audio/audio'
import { chapters } from '../data/chapters'

export default function SettingsMenu() {
  const { state, resetAll, setScreen } = useGame()
  const { togglePlay, enabled } = useAudio()
  const { reduceMotion, toggleReduceMotion } = useSettings()
  const { days, hours, minutes, seconds } = useAnniversaryTimer(1000)
  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const pad = (n) => String(n).padStart(2, '0')

  const openSecret = () => {
    sfx.click()
    setOpen(false)
    window.dispatchEvent(new Event('us:open-secret'))
  }
  const gotoSecret = () => {
    sfx.click()
    setOpen(false)
    setScreen('secret')
  }
  const doReset = () => {
    sfx.click()
    resetAll()
    setConfirming(false)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => { sfx.click(); setOpen((v) => !v) }}
        aria-label="Settings"
        aria-expanded={open}
        className="fixed top-4 right-4 z-[80] w-11 h-11 rounded-full glass flex items-center justify-center text-cream-100/60 hover:text-cream-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        style={{ marginTop: 'env(safe-area-inset-top)' }}
      >
        <Settings size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-label="Close settings"
            />
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="fixed top-0 right-0 z-[85] h-full w-[86vw] max-w-sm bg-midnight-900/95 backdrop-blur-xl border-l border-gold-300/10 p-6 overflow-y-auto shadow-card"
              style={{ paddingTop: 'calc(1.5rem + env(safe-area-inset-top))' }}
            >
              <h2 className="font-display text-2xl text-cream-50 mb-1">Settings</h2>
              <p className="text-cream-200/50 text-xs mb-6">Quiet controls. The story stays loud.</p>

              <div className="space-y-2.5">
                <MenuItem icon={<Music2 size={16} />} label="Music" value={enabled ? 'On' : 'Off'} onClick={() => { sfx.click(); togglePlay() }} />
                <MenuItem icon={<Wind size={16} />} label="Reduce motion" value={reduceMotion ? 'On' : 'Off'} onClick={() => { sfx.click(); toggleReduceMotion() }} />
                {/* anniversary timer */}
                <div className="hairline rounded-2xl p-4 my-3">
                  <div className="flex items-center gap-2 text-gold-300 mb-2">
                    <Clock3 size={15} />
                    <span className="text-[11px] tracking-[0.2em] uppercase">We’ve been together for…</span>
                  </div>
                  <div className="flex items-end justify-between font-display text-cream-100">
                    <div className="text-center">
                      <div className="text-2xl leading-none">{days.toLocaleString()}</div>
                      <div className="text-[10px] text-cream-200/50 mt-1">days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl leading-none">{pad(hours)}</div>
                      <div className="text-[10px] text-cream-200/50 mt-1">hrs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl leading-none">{pad(minutes)}</div>
                      <div className="text-[10px] text-cream-200/50 mt-1">min</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl leading-none text-gold-300">{pad(seconds)}</div>
                      <div className="text-[10px] text-cream-200/50 mt-1">sec</div>
                    </div>
                  </div>
                </div>

                {/* progress */}
                <div className="hairline rounded-2xl p-4">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-cream-200/50 mb-3">Your journey</div>
                  {chapters.map((c) => {
                    const done = state.completedChapters.includes(c.id)
                    return (
                      <div key={c.id} className="flex items-center justify-between py-1.5 border-b border-cream-100/5 last:border-0">
                        <span className={done ? 'text-rose-300' : 'text-cream-200/50'}>
                          {done ? '✓ ' : ''}Chapter {c.number} · {c.title}
                        </span>
                      </div>
                    )
                  })}
                  {state.secretUnlocked && (
                    <button onClick={gotoSecret} className="mt-2 flex items-center gap-2 text-gold-300 hover:text-gold-200 text-sm cursor-pointer">
                      <Lock size={14} /> ❤️ SECRET CHAPTER →
                    </button>
                  )}
                  <div className="flex items-center gap-2 mt-2 text-cream-200/60 text-xs">
                    <KeyRound size={13} className="text-gold-400" />
                    {state.unlockedMemories.length} memories unlocked
                  </div>
                </div>
                {/* secret entry */}
                <button onClick={openSecret} className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-full hairline text-cream-200/60 hover:text-gold-300 hover:border-gold-300/30 transition-colors cursor-pointer">
                  ❦ Do you know our word?
                </button>

                {/* start over */}
                <button onClick={() => { sfx.click(); setConfirming(true) }} className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-cream-200/40 hover:text-rose-300 text-xs tracking-widest uppercase transition-colors cursor-pointer">
                  <RotateCcw size={13} /> Start Over
                </button>
              </div>

              <AnimatePresence>
                {confirming && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[95] flex items-center justify-center p-6"
                  >
                    <div className="glass rounded-2xl p-6 max-w-xs text-center shadow-card">
                      <p className="font-display text-xl text-cream-50 mb-2">Start over?</p>
                      <p className="text-sm text-cream-200/60 mb-5">This will erase all progress and unlock every memory again from the beginning.</p>
                      <div className="flex gap-3 justify-center">
                        <button onClick={() => setConfirming(false)} className="px-4 py-2 rounded-full hairline text-cream-100 text-sm cursor-pointer">Cancel</button>
                        <button onClick={doReset} className="px-4 py-2 rounded-full bg-rose-600/80 text-cream-50 text-sm cursor-pointer">Reset</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function MenuItem({ icon, label, value, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between py-3 px-4 rounded-2xl hairline bg-midnight-800/40 hover:bg-midnight-800/70 transition-colors cursor-pointer group">
      <span className="flex items-center gap-3 text-cream-100/80 group-hover:text-cream-100">
        <span className="text-gold-400">{icon}</span>
        <span className="text-sm">{label}</span>
      </span>
      <span className="text-xs text-rose-300">{value}</span>
    </button>
  )
}
