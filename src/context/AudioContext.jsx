import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { storyConfig } from '../config/storyConfig'
import { ambient, unlockAudio, setMuted, setVolume } from '../audio/audio'

const Ctx = createContext(null)

const PREF_KEY = 'us.audio.v1'

const loadPref = () => {
  try {
    return JSON.parse(localStorage.getItem(PREF_KEY)) || {}
  } catch {
    return {}
  }
}

export const CHAPTER_MUSIC_KEYS = {
  loading: 'loading',
  opening: 'opening',
  ch1: 'chapter1',
  ch2: 'chapter2',
  ch3: 'chapter3',
  ch4: 'chapter4',
  final: 'final',
  ending: 'ending',
  secret: 'secret'
}

export function AudioProvider({ children }) {
  const prefs = loadPref()
  const [enabled, setEnabled] = useState(prefs.enabled !== undefined ? prefs.enabled : storyConfig.music.enabledByDefault)
  const [muted, setMutedState] = useState(prefs.muted || false)
  const [volume, setVolumeState] = useState(prefs.volume ?? storyConfig.music.volume ?? 0.5)
  const [chapter, setChapterState] = useState(prefs.chapter || 'opening')
  const [trackLabel, setTrackLabel] = useState('Ambient')
  const [nowPlaying, setNowPlaying] = useState(false)
  const audioRef = useRef(null)

  // persist preferences
  useEffect(() => {
    try {
      localStorage.setItem(PREF_KEY, JSON.stringify({ enabled, muted, volume, chapter }))
    } catch {
      /* ignore */
    }
  }, [enabled, muted, volume, chapter])

  // apply volume + muted to the engine
  useEffect(() => {
    setVolume(volume)
    setMuted(muted)
  }, [volume, muted])

  // first-gesture unlock (autoplay policies)
  useEffect(() => {
    const handler = () => unlockAudio()
    window.addEventListener('pointerdown', handler)
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('pointerdown', handler)
      window.removeEventListener('keydown', handler)
    }
  }, [])

  const setChapter = useCallback((key) => setChapterState(key), [])

  // drive music whenever anything relevant changes
  useEffect(() => {
    const src = storyConfig.music.tracks[chapter]
    const el = audioRef.current
    if (!el) return

    const shouldPlay = enabled && !muted
    if (src) {
      // real track file
      ambient.stop()
      if (el.src !== new URL(src, window.location.origin).href) {
        el.src = src
        el.loop = true
      }
      el.volume = volume
      if (shouldPlay) {
        el.play().catch(() => {})
        setTrackLabel('Track')
        setNowPlaying(true)
      } else {
        el.pause()
        setNowPlaying(false)
      }
    } else {
      // procedural score
      el.pause()
      if (shouldPlay) {
        ambient.start(chapter)
        setTrackLabel('Ambient')
        setNowPlaying(true)
      } else {
        ambient.stop()
        setNowPlaying(false)
      }
    }
  }, [chapter, enabled, muted, volume])

  const togglePlay = useCallback(() => setEnabled((v) => !v), [])
  const toggleMute = useCallback(() => setMutedState((v) => !v), [])
  const changeVolume = useCallback((v) => setVolumeState(Math.max(0, Math.min(1, v))), [])

  return (
    <Ctx.Provider
      value={{
        enabled,
        muted,
        volume,
        chapter,
        trackLabel,
        nowPlaying,
        setChapter,
        togglePlay,
        toggleMute,
        changeVolume
      }}
    >
      {children}
      <audio ref={audioRef} preload="auto" />
    </Ctx.Provider>
  )
}

export const useAudio = () => useContext(Ctx)
