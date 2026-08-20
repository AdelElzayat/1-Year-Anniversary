/**
 * ============================================================
 *  THE MEMORY VAULT (Chapter 4) — the personal museum
 *
 *  Each category holds items. Item types:
 *   - photo    → Polaroid viewer with caption + message
 *   - message  → animated conversation replay
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
  }
]

export const getAllVaultItems = () => vaultCategories.flatMap((c) => c.items)

export const getVaultCategory = (id) => vaultCategories.find((c) => c.id === id)
