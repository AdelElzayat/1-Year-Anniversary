/**
 * ============================================================
 *  EASTER EGGS + SECRET CHAPTER
 *  Customize each egg here. Trigger types:
 *   - star    : a hidden star in the sky (tap it several times)
 *   - typeword: type a word anywhere on the page
 *   - title   : tap the "Soulmates." title on the opening screen
 *  The secret chapter is unlocked by typing the secret word
 *  from storyConfig.secretWord (never shown in the UI).
 * ============================================================
 */

export const easterEggs = [
  {
    id: 'egg-star',
    type: 'star',
    title: 'The Lonely Star',
    message: 'You found one of our secrets. ❤️ That star only shows itself to people who look closely.',
    taps: 5
  },
  {
    id: 'egg-typeword',
    type: 'typeword',
    word: 'love',
    title: 'You Said It',
    message: 'You found one of our secrets. ❤️ And no, it never gets old hearing it.',
    taps: 1
  },
  {
    id: 'egg-title',
    type: 'title',
    title: 'The Title',
    message: 'You found one of our secrets. ❤️ Our story started with just these two letters. “Us.”',
    taps: 3
  }
]

/**
 * The SECRET CHAPTER content — an extra memory only she can unlock.
 */
export const secretChapter = {
  id: 'secret',
  title: 'Our Secret',
  date: 'PLACEHOLDER DATE',
  image: null,
  emoji: '🔐',
  text: 'PLACEHOLDER — This is your extra memory. The one you didn’t need a key for. The one only the two of you know about.',
  note: 'If you’re reading this… you’re the only one in the world who could.'
}
