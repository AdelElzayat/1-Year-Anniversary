/**
 * Chapter metadata — titles, subtitles and intro lines.
 * `music` maps to a key in storyConfig.music.tracks.
 */

export const chapters = [
  {
    id: 'ch1',
    number: 1,
    title: 'How It Started',
    subtitle: 'Every story has a beginning. Ours just happened to be ours.',
    music: 'chapter1',
    intro: ['It started quietly.', 'A message. A game. A laugh.', 'And suddenly… there was an “us.”']
  },
  {
    id: 'ch2',
    number: 2,
    title: 'Us.',
    subtitle: 'Somewhere along the way, it stopped being a story about two people.',
    music: 'chapter2',
    intro: ['Two people.', 'Then two idiots.', 'Then us.']
  },
  {
    id: 'ch3',
    number: 3,
    title: 'Do You Remember?',
    subtitle: 'Okay… let’s see how well you actually remember us.',
    music: 'chapter3',
    intro: ['No pressure.', 'Okay, a little pressure.', 'Just kidding. There’s no wrong answers. Only funny ones.']
  },
  {
    id: 'ch4',
    number: 4,
    title: 'The Memory Vault',
    subtitle: 'Some memories deserve to be kept somewhere safe.',
    music: 'chapter4',
    intro: ['Every memory we made.', 'Every photo. Every message.', 'Locked away… just for you.']
  },
  {
    id: 'final',
    number: 5,
    title: 'Our Story Isn’t Finished',
    subtitle: 'The best part about a story like ours? It keeps writing itself.',
    music: 'final',
    intro: []
  }
]
