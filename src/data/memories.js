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
    date: '13/2/2024',
    image: '/memories/first-message.png',
    audio: null,
    emoji: '📱',
    location: { x: 18, y: 22 },
    caption: 'How we met?.',
    description:
      'Early February 2024, i met a girl called raven on mafia and we kinda had chemistry and always teamed up together in that game, even we sometimes tease each other joyfully so from that day we became bestfriends and decided to move to discord to continue chatting and playing together, we moved to discord on 13th feb a day b4 valentine.'
  },
  {
    id: 'first-conversation',
    chapter: 1,
    title: 'The First Conversation',
    date: '16/2/2024',
    image: '/memories/first-convo.png',
    audio: null,
    emoji: '💬',
    location: { x: 42, y: 14 },
    caption: 'It went on way longer than it should have.',
    description:
      'That was our first conversation, it didnt go well at all we even barely dm"ed each other still tho always acted as bffs. From that day everything happens i always go tell her cause i trusted her more than anyone.'
  },
  {
    id: 'favorite-game',
    chapter: 1,
    title: 'Our Favorite Game',
    // date: 'PLACEHOLDER DATE',
    image: '/memories/fav-game.png',
    audio: null,
    emoji: '🎮',
    location: { x: 66, y: 24 },
    caption: 'The competition was fierce.',
    description:
      'Our favorite games was plato and mafia, we always used to be a team always together wether its on plato or mafia and we liked bowling and uno sooo much on plato we used to compete against each other in a flirty fun way and on mafia we used to let each other win if we were not on same team always on each others side.'
  },
  {
    id: 'first-moment',
    chapter: 1,
    title: 'The First Special Moment',
    date: '22/5/2024',
    image: '/memories/special-moment.png',
    audio: null,
    emoji: '❤️',
    location: { x: 80, y: 62 },
    caption: 'The moment everything quietly changed.',
    description:
      'On a normal wednesday, our friend nelli told me that someone likes me and ngl that time i had strong feelings for raven, i thought its someone else from our gc i didnt know who it would be till nelli told me its raven, i got sooo excited and have then she said "used to love" so i thought that raven lost her feelings and that this is the end of our love story that didnt even get to begin.'
  },
  {
    id: 'first-picture',
    chapter: 1,
    title: 'The First Picture',
    date: 'October 2024',
    image: '/memories/first-pic.JPG',
    audio: null,
    emoji: '📸',
    location: { x: 46, y: 78 },
    caption: 'How i fell in love more.',
    description:
      'Around late october, i was in my university during a lecture and was texting raven on discord then she decided she will send me a pic of her on snapchat and damn i fell in love soooo fucking hard shes the prettiest girl i have ever seen couldnt stop smiling during my lecture, and thats how we both keep getting closer and closer.'
  },

  /* ---------------- CHAPTER 2 · US. (timeline milestones) ----- */
  {
    id: 'we-met',
    chapter: 2,
    title: 'The Confession',
    date: '9/9/2024',
    image: '/memories/confession.jpg',
    audio: null,
    emoji: '🌱',
    location: null,
    caption: 'Chapter one of getting closer.',
    description:
      'On a monday night, me and raven were talking together on my alt and finally confessed to each other about our feelings but stayed as friends still cause we were not ready for a relationship, it felt super good tho and from that day we got soo close that we spend whole day together just talking.'
  },
  {
    id: 'started-talking',
    chapter: 2,
    title: 'We Started Talking',
    // date: 'PLACEHOLDER DATE',
    image: '/memories/flirty.jpg',
    audio: null,
    emoji: '💬',
    location: null,
    caption: 'And then we couldn’t stop.',
    description:
      'We started talking together for hours and getting along plus more flirty and funny stuff fr these are all the memories we have together.'
  },
  {
    id: 'idiots-together',
    chapter: 2,
    title: 'We Became Idiots Together',
    // date: 'PLACEHOLDER DATE',
    image: '/memories/funny.jpg',
    audio: null,
    emoji: '😂',
    location: null,
    caption: 'The friendship that became everything.',
    description:
      'I even started to depend on her more and more and get sad if she suddnly disappears for a day or two, we got soo funny together and always understand each other.'
  },
  {
    id: 'fell-in-love',
    chapter: 2,
    title: 'We Fell In Love',
    date: '20/8/2025',
    image: 'memories/best-day.png',
    audio: null,
    emoji: '❤️',
    location: null,
    caption: 'It wasn’t a single moment. It was everything.',
    description:
      'On a wendesday night, we were talking together and dared each other to say i love you, then we both said it fr and it felt soooo soooo goood then from that day we got together and started dating even got soo attached to each other, thats my fav day ever.'
  },
  {
    id: 'favorite-games',
    chapter: 2,
    title: 'Our First Call',
    date: '24/9/2025',
    image: '/memories/first-vid-call.JPG',
    audio: null,
    emoji: '🎮',
    location: null,
    caption: 'We didnt do much. We enjoyed every second of it tho.',
    description:
      'We started vid calling after a month of dating and it was hella fun even tho we didnt show our face still it felt soooo soooo special.'
  },
  {
    id: 'long-distance',
    chapter: 2,
    title: 'Long Distance',
    // date: 'PLACEHOLDER DATE',
    image: '/memories/long-distance.png',
    audio: null,
    emoji: '🌎',
    location: null,
    caption: 'Miles apart, still us.',
    description:
      'Even tho its a long distance relationship and its soo hard to live without her we still make it sooo special and soo loving, we fill each day with memories and love.'
  },
]

/* ---------- helpers ---------- */

export const getMemoriesByChapter = (chapter) =>
  memories.filter((m) => m.chapter === chapter).sort((a, b) => (a.order ?? a.id.localeCompare(b.id)))

export const getMemoryById = (id) => memories.find((m) => m.id === id)

export const memoryIndex = (id) => memories.findIndex((m) => m.id === id) + 1

export const TOTAL_MEMORIES = memories.length
