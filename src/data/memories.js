/**
 * ============================================================
 *  MEMORIES — every unlockable memory in the game
 *
 *  Each memory gives the player 1 🔑 Memory Key.
 *  Replace ALL placeholder content with your real memories.
 *
 *  Fields:
 *   - id          unique string
 *   - chapter     1 (map) or 2 (timeline)
 *   - title       memory title
 *   - date        the date — use any format you like
 *   - image       "/memories/your-photo.jpg" or null for art
 *   - audio       "/audio/clip.mp3" or null
 *   - description the story to show in the memory card
 *   - emoji       small icon shown on the map/timeline
 *   - location    { x, y } as % — position on the Ch1 map
 *   - caption     one-line caption under the map label
 * ============================================================
 */

export const memories = [
  /* ---------------- CHAPTER 1 · HOW IT STARTED ---------------- */
  {
    id: 'first-message',
    chapter: 1,
    title: 'The First Message',
    date: 'PLACEHOLDER DATE',
    image: null,
    audio: null,
    emoji: '📱',
    location: { x: 18, y: 22 },
    caption: 'The one that started everything.',
    description:
      'PLACEHOLDER — Describe the first message you ever sent her here. What made you hit send? What did she reply? Write it like you remember it.'
  },
  {
    id: 'first-conversation',
    chapter: 1,
    title: 'The First Conversation',
    date: 'PLACEHOLDER DATE',
    image: null,
    audio: null,
    emoji: '💬',
    location: { x: 42, y: 14 },
    caption: 'It went on way longer than it should have.',
    description:
      'PLACEHOLDER — Describe your first real conversation. The one where you stayed up too late, and neither of you wanted to say goodnight.'
  },
  {
    id: 'first-game',
    chapter: 1,
    title: 'The First Game',
    date: 'PLACEHOLDER DATE',
    image: null,
    audio: null,
    emoji: '🎮',
    location: { x: 66, y: 24 },
    caption: 'The competition was fierce.',
    description:
      'PLACEHOLDER — Describe the first game you two played together. Who won? Who definitely cheated? Be specific — she’ll know.'
  },
  {
    id: 'first-moment',
    chapter: 1,
    title: 'The First Special Moment',
    date: 'PLACEHOLDER DATE',
    image: null,
    audio: null,
    emoji: '❤️',
    location: { x: 80, y: 62 },
    caption: 'The moment everything quietly changed.',
    description:
      'PLACEHOLDER — Describe the moment you first knew it wasn’t just a game or a chat anymore. Where were you? What happened?'
  },
  {
    id: 'first-picture',
    chapter: 1,
    title: 'The First Picture',
    date: 'PLACEHOLDER DATE',
    image: null,
    audio: null,
    emoji: '📸',
    location: { x: 46, y: 78 },
    caption: 'Proof we existed.',
    description:
      'PLACEHOLDER — Describe the first picture you ever took together. Add the real photo later by setting image: "/memories/your-photo.jpg".'
  },

  /* ---------------- CHAPTER 2 · US. (timeline milestones) ----- */
  {
    id: 'we-met',
    chapter: 2,
    title: 'We Met',
    date: 'PLACEHOLDER DATE',
    image: null,
    audio: null,
    emoji: '🌱',
    location: null,
    caption: 'Chapter one of two strangers.',
    description:
      'PLACEHOLDER — How did you two meet? Write the real version here. The unpolished, true version.'
  },
  {
    id: 'started-talking',
    chapter: 2,
    title: 'We Started Talking',
    date: 'PLACEHOLDER DATE',
    image: null,
    audio: null,
    emoji: '💬',
    location: null,
    caption: 'And then we couldn’t stop.',
    description:
      'PLACEHOLDER — What did you talk about for hours on end? What inside jokes were born in those early days?'
  },
  {
    id: 'idiots-together',
    chapter: 2,
    title: 'We Became Idiots Together',
    date: 'PLACEHOLDER DATE',
    image: null,
    audio: null,
    emoji: '😂',
    location: null,
    caption: 'The friendship that became everything.',
    description:
      'PLACEHOLDER — Describe the moment you realized you could be your absolute dumbest selves around each other and it was the best feeling.'
  },
  {
    id: 'fell-in-love',
    chapter: 2,
    title: 'We Fell In Love',
    date: 'PLACEHOLDER DATE',
    image: null,
    audio: null,
    emoji: '❤️',
    location: null,
    caption: 'It wasn’t a single moment. It was everything.',
    description:
      'PLACEHOLDER — Describe when you knew. Or admit you never actually knew — it just quietly became true.'
  },
  {
    id: 'favorite-games',
    chapter: 2,
    title: 'Our Favorite Games',
    date: 'PLACEHOLDER DATE',
    image: null,
    audio: null,
    emoji: '🎮',
    location: null,
    caption: 'We played a lot. We lost track of time more.',
    description:
      'PLACEHOLDER — List your favorite games to play together and why they’re yours.'
  },
  {
    id: 'long-distance',
    chapter: 2,
    title: 'Long Distance',
    date: 'PLACEHOLDER DATE',
    image: null,
    audio: null,
    emoji: '🌎',
    location: null,
    caption: 'Miles apart, still us.',
    description:
      'PLACEHOLDER — If you did long distance, describe what it felt like, and what kept you going. If you never did — delete this memory.'
  },
  {
    id: 'today',
    chapter: 2,
    title: 'Today',
    date: 'PLACEHOLDER DATE',
    image: null,
    audio: null,
    emoji: '💍',
    location: null,
    caption: 'Right here. Right now.',
    description:
      'PLACEHOLDER — Describe what “us” looks like today. The small routines, the silly traditions, the way you still text each other random thoughts.'
  }
]

/* ---------- helpers ---------- */

export const getMemoriesByChapter = (chapter) =>
  memories.filter((m) => m.chapter === chapter).sort((a, b) => (a.order ?? a.id.localeCompare(b.id)))

export const getMemoryById = (id) => memories.find((m) => m.id === id)

export const memoryIndex = (id) => memories.findIndex((m) => m.id === id) + 1

export const TOTAL_MEMORIES = memories.length
