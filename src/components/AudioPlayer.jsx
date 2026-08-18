import { useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

/**
 * Beautiful mini audio player. Never autoplays — the user
 * explicitly starts playback. Falls back gracefully if the
 * file is missing.
 */
export default function AudioPlayer({ src, label = 'audio memory' }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0)

  const toggle = () => {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      el.play().catch(() => setError(true))
    }
  }

  const onTime = () => {
    const el = audioRef.current
    if (el && el.duration) setProgress((el.currentTime / el.duration) * 100)
  }

  const onEnded = () => {
    setPlaying(false)
    setProgress(0)
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggle}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        className="shrink-0 w-11 h-11 rounded-full bg-midnight-900 text-gold-300 flex items-center justify-center hover:bg-midnight-800 active:scale-95 transition-all cursor-pointer"
      >
        {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-midnight-900/70 truncate">
            {error ? 'audio coming soon ✨' : '🎙️ Listen to this memory'}
          </span>
          {error && <VolumeX size={14} className="text-midnight-900/40" />}
        </div>
        <div className="h-1.5 rounded-full bg-midnight-900/15 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-gold-500 to-rose-500 transition-[width] duration-200" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <Volume2 size={16} className="text-midnight-900/40 shrink-0" />
      <audio ref={audioRef} src={src} preload="none" onTimeUpdate={onTime} onEnded={onEnded} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setError(true)} />
    </div>
  )
}
