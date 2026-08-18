import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music, Music2, Pause, Volume2, VolumeX, Play } from 'lucide-react'
import { useAudio } from '../context/AudioContext'
import { sfx } from '../audio/audio'

/**
 * Floating, thumb-friendly music control (bottom-right).
 * Play/pause, mute, and a subtle volume slider.
 */
export default function MusicControl() {
  const { enabled, muted, volume, trackLabel, togglePlay, toggleMute, changeVolume } = useAudio()
  const [open, setOpen] = useState(false)

  const icon = muted || !enabled ? VolumeX : enabled ? Music2 : Music
  const Icon = icon

  return (
    <div className="fixed bottom-5 right-4 z-[80] flex flex-col items-end gap-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-2xl p-4 w-56 shadow-card space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-gold-300 tracking-[0.2em] uppercase">Music</span>
              <span className="text-[11px] text-cream-100/50">{trackLabel}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { sfx.click(); togglePlay() }}
                className="flex flex-col items-center gap-1 py-2 rounded-xl bg-midnight-700/60 hover:bg-midnight-700 text-cream-100/80 transition-colors cursor-pointer"
                aria-label={enabled ? 'Pause music' : 'Play music'}
              >
                {enabled ? <Pause size={16} /> : <Play size={16} />}
                <span className="text-[10px]">{enabled ? 'Pause' : 'Play'}</span>
              </button>
              <button
                onClick={() => { sfx.click(); toggleMute() }}
                className="flex flex-col items-center gap-1 py-2 rounded-xl bg-midnight-700/60 hover:bg-midnight-700 text-cream-100/80 transition-colors cursor-pointer"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                <Volume2 size={16} className={muted ? 'opacity-40' : ''} />
                <span className="text-[10px]">{muted ? 'Muted' : 'Sound'}</span>
              </button>
              <div className="flex flex-col items-center gap-1 py-2 rounded-xl bg-midnight-700/60 text-cream-100/60">
                <VolumeX size={14} />
                <span className="text-[10px]">{Math.round(volume * 100)}%</span>
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              aria-label="Volume"
              className="w-full accent-gold-400 cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => { sfx.click(); setOpen((v) => !v) }}
        aria-label="Music controls"
        aria-expanded={open}
        className="w-12 h-12 rounded-full glass flex items-center justify-center text-gold-300 shadow-glow hover:scale-105 active:scale-95 transition-transform cursor-pointer"
      >
        <Icon size={20} />
      </button>
    </div>
  )
}
