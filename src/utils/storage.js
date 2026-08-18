/**
 * localStorage persistence for save progress.
 * Stores: completed chapters, unlocked memories, quiz progress,
 * vault progress, easter eggs, secret unlock, completion, timers.
 */

const KEY = 'us.experience.v1'

export const defaultProgress = () => ({
  screen: 'opening',
  completedChapters: [],
  unlockedMemories: [],
  quiz: { answered: [], score: 0, finished: false },
  vault: { opened: false, viewed: [] },
  easterEggs: [],
  secretUnlocked: false,
  finished: false,
  startedAt: Date.now(),
  totalUnlocks: 0
})

export const loadProgress = () => {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultProgress()
    const parsed = JSON.parse(raw)
    return { ...defaultProgress(), ...parsed }
  } catch {
    return defaultProgress()
  }
}

export const saveProgress = (progress) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress))
  } catch {
    /* storage unavailable — play without saving */
  }
}

export const clearProgress = () => {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

export const hasProgress = () => {
  try {
    return Boolean(localStorage.getItem(KEY))
  } catch {
    return false
  }
}
