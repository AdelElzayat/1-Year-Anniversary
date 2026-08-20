/**
 * ============================================================
 *  QUIZ — "Do You Remember?"  (Chapter 3)
 *
 *  Replace the placeholder questions with real ones about your
 *  relationship. Keep them specific and playful.
 *  correctAnswer is the 0-based index of the right option.
 * ============================================================
 */

export const quizQuestions = [
  {
    question: 'What was the first game we spent way too much time playing together?',
    options: ['Mafia', 'Plato', 'Roblox', 'Fortnite'],
    correctAnswer: 0,
    correctMessage: 'Wow baby u still remember 😏😏😍',
    wrongMessage: 'TANISHA… we’ve been together this long and you forgot this? 💀'
  },
  {
    question: 'When did we get on discord?',
    options: ['12/2/2024', '12/1/2024', '13/2/2024', '13/2/2025'],
    correctAnswer: 2,
    correctMessage: 'YES. u got the date right u turn me on always. 🫦',
    wrongMessage: 'Kk, I’ll forgive you. But it 13/2/2024 just so you know tata. 😌'
  },
  {
    question: 'What’s our inside joke that makes zero sense to anyone else?',
    options: ['Pizza', 'Bowling', 'VY 😁', 'Red Dress'],
    correctAnswer: 3,
    correctMessage: 'Still waiting for that sexy red dress baby 😏',
    wrongMessage: 'baby u gay'
  },
  {
    question: 'What was the first thing I ever said that made you blush?',
    options: ['I zoomed in to check the panda belly', 'Dont need that rav called me hot already', 'Me rav and u are always a team bish', 'All of the above'],
    correctAnswer: 3,
    correctMessage: 'All of the above. Honestly you should blush at everything I say, right babygirl? 😏😏😉',
    wrongMessage: 'It was all of the above and U KNOW IT BITCH. 😒'
  },
  {
    question: 'Who is the better player in bowling plato?',
    options: ['Dodo', 'Tata', 'Nemo the cat', 'Tatas hacks'],
    correctAnswer: 0,
    correctMessage: '…okay you got that one right. This time. 😤🎮',
    wrongMessage: 'Wrong. Wrong. Wrong. Fuck u baby (This message was written by the best player.)'
  },
  {
    question: 'What’s the one food we could never agree on?',
    options: ['Pizza', 'Pasta', 'Sushi', 'We agree on everything. Obviously.'],
    correctAnswer: 2,
    correctMessage: 'I DONT FUCKING KNOW HOW U LIKE RAW FISH',
    wrongMessage: 'Dont talk to me, u like raw fish. 🤮🤮🤮'
  }
]

/**
 * Positive endings regardless of score.
 * Each entry: minimum correct count (0-based inclusive).
 */
export const quizResults = [
  {
    min: 4,
    title: 'Apparently you remember us pretty well. 😌',
    sub: 'Most of it, at least. That’s more than enough to call it love.'
  },
  {
    min: 2,
    title: 'Okay, so you might need a tiny refresher. 🙈',
    sub: 'That’s fine. We have forever to make new memories and re-tell the old ones.'
  },
  {
    min: 0,
    title: 'You scored a 0 and I still chose you. 🥹',
    sub: 'Clearly I’m in this for the long game. And also to remind you of every one of these forever.'
  }
]
