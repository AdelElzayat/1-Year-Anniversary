/**
 * ============================================================
 *  THE MEMORY VAULT (Chapter 4) — the personal museum
 *
 *  Each category holds items. Item types:
 *   - photo    → Polaroid viewer with caption + message
 *   - message  → animated conversation replay
 *   - audio    → audio memory with player
 *   - text     → elegant card memory
 *   - video    → poster + "video coming soon" placeholder
 *
 *  Set `image` to "/memories/your-photo.jpg" to use a real file,
 *  or leave null for generated placeholder art.
 * ============================================================
 */

export const vaultCategories = [
  {
    id: 'photos',
    label: 'Pictures',
    emoji: '📸',
    type: 'photo',
    tagline: 'Proof it all happened.',
    items: [
      {
        id: 'vault-photo-1',
        title: 'YOUR FIRST PHOTO',
        date: '31/8/2025',
        image: '/memories/ur-first-pic.JPG',
        caption: 'TOOK HALF A MONTH TO SEND WITH NO HEART',
        message:
          '1 of my favorite pics ever cause thats the first thing i got to see after getting married to u.',
        audio: null
      },
      {
        id: 'vault-photo-2',
        title: 'MY FAVORITE PHOTO',
        date: '26/9/2025',
        image: '/memories/fav-pic.png',
        caption: 'Forever ny fav :))',
        message:
          'This pic so far will be top 1 for me even i got waaay too many new sexy pics and i swear they all are my fav, but this 1 has a place in my heart.',
        audio: null
      }
    ]
  },
  {
    id: 'messages',
    label: 'Messages',
    emoji: '💬',
    type: 'message',
    tagline: 'Where it all started.',
    items: [
      {
        id: 'vault-msg-1',
        title: 'YOUR FIRST MESSAGE',
        date: '13/2/2024',
        image: null,
        lines: [
          { from: 'ME', text: 'Sup' },
          { from: 'Her', text: 'Hi' },
        ],
        note: 'Most gay convo ever.',
        audio: null
      },
      {
        id: 'vault-msg-2',
        title: 'FAV CONVO',
        date: '20/8/2025',
        image: null,
        lines: [
          { from: 'HER', text: 'Vyy u wanna date me???' },
          { from: 'ME', text: 'U SAID IT 💀' },
          { from: 'HER', text: '😭😭😭' },
          { from: 'ME', text: 'I would love to date u :))' },
          { from: 'ME', text: 'SEE ITS EZ' },
          { from: 'HER', text: 'NOO ITS NOT' }
        ],
        note: 'Best day of my life.',
        audio: null
      }
    ]
  },
  {
    id: 'games',
    label: 'Games',
    emoji: '🎮',
    type: 'text',
    tagline: 'The arena of our love.',
    items: [
      {
        id: 'vault-game-1',
        title: 'YOUR FAVORITE GAME',
        date: 'PLACEHOLDER DATE',
        image: null,
        text: 'PLACEHOLDER — The game we played for way too long. The rage. The rematches. The absolute joy of it.',
        audio: null
      },
      {
        id: 'vault-game-2',
        title: 'THE GAME WE NEVER FINISHED',
        date: 'PLACEHOLDER DATE',
        image: null,
        text: 'PLACEHOLDER — We should probably finish it together someday. Add it to the future list. 🎮',
        audio: null
      }
    ]
  },
  {
    id: 'funny',
    label: 'Funny Moments',
    emoji: '😂',
    type: 'text',
    tagline: 'The stuff nobody else gets.',
    items: [
      {
        id: 'vault-funny-1',
        title: 'YOUR FUNNIEST MEMORY',
        date: 'PLACEHOLDER DATE',
        image: null,
        text: 'PLACEHOLDER — The time we laughed so hard we cried. The inside joke that still gets us. The thing we still bring up at least once a month.',
        audio: null
      },
      {
        id: 'vault-funny-2',
        title: 'THE INSIDE JOKE',
        date: 'PLACEHOLDER DATE',
        image: null,
        text: 'PLACEHOLDER — If anyone else read this they’d be so confused. That’s exactly the point.',
        audio: null
      }
    ]
  },
  {
    id: 'audio',
    label: 'Voice Messages',
    emoji: '🎙️',
    type: 'audio',
    tagline: 'Your voice, saved.',
    items: [
      {
        id: 'vault-audio-1',
        title: 'YOUR VOICE MESSAGE',
        date: 'PLACEHOLDER DATE',
        image: null,
        text: 'PLACEHOLDER — Add "/audio/your-voicenote.mp3" and I can hear your voice right here.',
        audio: '/audio/placeholder.mp3'
      },
      {
        id: 'vault-audio-2',
        title: 'THE ONE I KEEP REPLAYING',
        date: 'PLACEHOLDER DATE',
        image: null,
        text: 'PLACEHOLDER — You know the one. The one that makes me smile every single time.',
        audio: null
      }
    ]
  },
  {
    id: 'videos',
    label: 'Videos',
    emoji: '🎥',
    type: 'video',
    tagline: 'Us, moving.',
    items: [
      {
        id: 'vault-video-1',
        title: 'YOUR VIDEO MEMORY',
        date: 'PLACEHOLDER DATE',
        image: null,
        text: 'PLACEHOLDER — Drop an mp4 into /public/memories/ and reference it here to play it in the viewer.',
        audio: null
      }
    ]
  },
  {
    id: 'favorites',
    label: 'Favorite Memories',
    emoji: '❤️',
    type: 'text',
    tagline: 'The ones that made us.',
    items: [
      {
        id: 'vault-fav-1',
        title: 'THE MOMENT I KNEW',
        date: 'PLACEHOLDER DATE',
        image: null,
        text: 'PLACEHOLDER — Write the exact moment you knew you wanted to spend the rest of your life with her. Get specific.',
        audio: null
      },
      {
        id: 'vault-fav-2',
        title: 'THE LITTLE THING',
        date: 'PLACEHOLDER DATE',
        image: null,
        text: 'PLACEHOLDER — The small thing she does that you never get tired of. The thing that is secretly your favorite part of the day.',
        audio: null
      }
    ]
  }
]

export const getAllVaultItems = () => vaultCategories.flatMap((c) => c.items)

export const getVaultCategory = (id) => vaultCategories.find((c) => c.id === id)
