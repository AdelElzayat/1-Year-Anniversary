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
    options: ['Game A', 'Game B', 'Game C', 'Game D'],
    correctAnswer: 0,
    correctMessage: 'HOW DO YOU STILL REMEMBER THAT? 😭❤️',
    wrongMessage: 'Girl… we’ve been together this long and you forgot this? 💀'
  },
  {
    question: 'Where were we when we had our first real conversation?',
    options: ['Place A', 'Place B', 'Place C', 'Place D'],
    correctAnswer: 2,
    correctMessage: 'YES. That exact spot. I still think about that night. 🌙',
    wrongMessage: 'Okay okay, I’ll forgive you. But it was Place C… just so you know. 😌'
  },
  {
    question: 'What’s our inside joke that makes zero sense to anyone else?',
    options: ['The one about the thing', 'The thing about the one', 'The whatever thing', 'You know… THE thing'],
    correctAnswer: 3,
    correctMessage: 'YES. THE thing. Anyone who sees this is so confused. That’s what makes it ours. 😂',
    wrongMessage: '…we’re going to have to practice this one. You know… THE thing. 😤'
  },
  {
    question: 'What was the first thing I ever said that made you laugh?',
    options: ['A terrible joke', 'A terrible pickup line', 'Something dumb on purpose', 'All of the above'],
    correctAnswer: 3,
    correctMessage: 'All of the above. Honestly you laughed at everything I said. 😭❤️',
    wrongMessage: 'It was all of the above and you know it. 😏'
  },
  {
    question: 'Who is the better player in our favorite game?',
    options: ['Obviously me', 'Obviously you', 'The cat', 'The game itself'],
    correctAnswer: 0,
    correctMessage: '…okay you got that one right. This time. 😤🎮',
    wrongMessage: 'Wrong. Wrong. Wrong. (This message was written by the better player.) 💅'
  },
  {
    question: 'What’s the one food we could never agree on?',
    options: ['Food X', 'Food Y', 'Food Z', 'We agree on everything. Obviously.'],
    correctAnswer: 3,
    correctMessage: 'Correct. We agree on everything. (This is the correct answer for peace.) 💛',
    wrongMessage: '…we’re not addressing this. Next question. 🍕'
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
