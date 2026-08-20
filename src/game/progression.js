import { memories } from '../data/memories'
import { storyConfig } from '../config/storyConfig'

/** Number of 🔑 keys collected = memories unlocked */
export const countKeys = (unlockedMemories) => unlockedMemories.length

export const isMemoryUnlocked = (unlockedMemories, id) => unlockedMemories.includes(id)

/** All memories for a chapter */
export const chapterMemories = (chapter) => memories.filter((m) => m.chapter === chapter)

/** True when every memory of a chapter is unlocked */
export const isChapterMemoryComplete = (chapter, unlockedMemories) =>
  chapterMemories(chapter).every((m) => unlockedMemories.includes(m.id))

/** True when the chapter itself is completed (per progress) */
export const isChapterComplete = (completedChapters, chapter) =>
  completedChapters.includes(chapter)

/** Sequential unlock order: ch1 → ch2 → ch3 → ch4 → ending */
export const isScreenUnlocked = (progress, screen) => {
  const { completedChapters } = progress
  switch (screen) {
    case 'opening':
      return true
    case 'ch1':
      return true
    case 'ch2':
      return isChapterComplete(completedChapters, 'ch1')
    case 'ch3':
      return isChapterComplete(completedChapters, 'ch2')
    case 'ch4':
      return isChapterComplete(completedChapters, 'ch3')
    case 'ending':
      return isChapterComplete(completedChapters, 'ch4')
    case 'secret':
      return progress.secretUnlocked
    default:
      return false
  }
}

export const vaultReady = (progress) => countKeys(progress.unlockedMemories) >= storyConfig.vault.keysRequired

export const memoryProgressLabel = (unlockedMemories) => {
  const total = memories.length
  return `${String(unlockedMemories.length).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
}
