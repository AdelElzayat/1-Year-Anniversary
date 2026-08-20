/**
 * ============================================================
 *  SOULMATES. — STORY CONFIGURATION
 *  Personalize the ENTIRE experience from this one file.
 *  Change names, dates, the secret word, the final mode, and
 *  custom copy. Nothing else needs to be touched to customize.
 * ============================================================
 */

export const storyConfig = {
  /* ---- Names (used for dynamic copy) -------------------- */
  me: {
    name: 'Your Husband', // ← your name (what she calls you, ideally)
    initials: 'YH'
  },
  her: {
    name: 'My Love', // ← her name
    initials: 'ML'
  },

  /* ---- Dates -------------------------------------------- */
  // Used by the subtle "We've been together for..." timer (ch 2)
  relationshipStartDate: '2025-08-20T18:30:00', // ← the exact moment it all started (20 Aug 2025, 6:30pm)
  // Used by the ending stats
  anniversaryDate: '2026-08-17',

  /* ---- Secret word (THE hidden easter egg) -------------- */
  // Typing this anywhere (or entering it in the ❦ dialog)
  // unlocks the SECRET CHAPTER. Never shown in the UI.
  secretWord: 'moonlight',

  /* ---- Final mode ---------------------------------------- */
  // "TOGETHER"        → "Look beside you. ❤️"
  // "LONG_DISTANCE"   → "So call me." + a CALL button
  finalMode: 'LONG_DISTANCE',
  finalContact: {
    label: 'CALL ME ❤️',
    href: 'tel:+201022558885' // ← change to your real number
  },

  /* ---- Vault ---------------------------------------------- */
  vault: {
    keysRequired: 10 // keys to open the vault (5 from Ch1 + 7 from Ch2 = 12 max)
  },

  /* ---- Music ----------------------------------------------- */
  // Leave a track as null → a soft procedural ambient score is
  // generated live for that chapter (no files needed).
  // Add "/audio/yourfile.mp3" in /public/audio to use a real file.
  music: {
    enabledByDefault: true,
    volume: 0.3,
    tracks: {
      loading: null,
      opening: null,
      chapter1: null,
      chapter2: null,
      chapter3: null,
      chapter4: null,
      final: null,
      ending: null,
      secret: null
    }
  },

  /* ---- Custom copy ---------------------------------------- */
  copy: {
    opening: {
      headline: 'Soulmates.',
      sub: 'A story written by a special guy. ❤️',
      promptBefore: 'Before you continue…',
      prompt: 'Are you ready to relive our story?',
      yes: 'YES ❤️',
      obviously: 'Obviously.'
    },
    memoryCard: {
      remember: 'I remember ❤️',
      remembered: 'Remembered ❤️',
      unlockTitle: 'Memory Unlocked',
      keyAdded: '+1 Key'
    },
    quiz: {
      title: 'Relationship Memory Score',
      retry: 'Try Again?',
      continue: 'Continue the Story ❤️'
    },
    vault: {
      locked: 'The Memory Vault',
      lockedSub: 'Some memories deserve to be kept somewhere safe.',
      keysHeld: 'keys held',
      unlock: 'Unlock the Vault',
      continue: 'I’ve seen enough ❤️'
    },
    ending: {
      thanks: 'Thank you for playing.',
      continue: 'Continue?',
      yes: 'YES ❤️',
      always: 'ALWAYS.',
      stats: {
        memories: 'Memories unlocked',
        laughs: 'Laughs shared',
        arguments: 'Arguments survived',
        time: 'Time together'
      },
      achievement: 'Achievement Unlocked',
      achievementName: 'Found My Person ❤️'
    }
  }
}
