import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { quizQuestions, quizResults } from '../data/quiz'
import { sfx } from '../audio/audio'
import { storyConfig } from '../config/storyConfig'
import GlowButton from '../components/GlowButton'
import ConfettiBurst from '../components/ConfettiBurst'

/**
 * Chapter 3 — "Do You Remember?"
 * A playful, romantic quiz. No harsh penalties, always a warm ending.
 */
export default function Chapter3({ onComplete }) {
  const { state, answerQuiz, finishQuiz, resetQuiz } = useGame()
  const [q, setQ] = useState(() => Math.min(state.quiz.answered.length, quizQuestions.length - 1))
  const [picked, setPicked] = useState(null)
  const [burst, setBurst] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const total = quizQuestions.length
  const score = state.quiz.score
  const finished = state.quiz.finished || showResults

  const select = (idx) => {
    if (picked !== null) return
    const correct = idx === quizQuestions[q].correctAnswer
    setPicked(idx)
    if (correct) {
      sfx.correct()
      setBurst((b) => b + 1)
    } else {
      sfx.wrong()
    }
    answerQuiz(q, correct)
  }

  const next = () => {
    sfx.click()
    if (q + 1 < total) {
      setQ((v) => v + 1)
      setPicked(null)
    } else {
      finishQuiz()
      setShowResults(true)
    }
  }

  const retry = () => {
    sfx.click()
    resetQuiz()
    setQ(0)
    setPicked(null)
    setShowResults(false)
    setBurst(0)
  }

  const result = quizResults.find((r) => score >= r.min) || quizResults[quizResults.length - 1]
  const c = storyConfig.copy.quiz

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-5 py-16">
      <ConfettiBurst trigger={burst} count={16} />

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div key={`q-${q}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} className="w-full max-w-lg">
            <div className="text-center mb-6">
              <p className="text-gold-300 tracking-[0.5em] uppercase text-[11px] mb-1">Chapter 3 · Do You Remember?</p>
            </div>

            <div className="flex items-center justify-center gap-3 mb-6">
              {quizQuestions.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i < q ? 'w-4 bg-gold-400' : i === q ? 'w-6 bg-rose-400' : 'w-4 bg-midnight-700'}`}
                />
              ))}
            </div>

            <p className="text-[11px] tracking-[0.25em] uppercase text-cream-200/40 text-center mb-3">
              Question {q + 1} of {total}
            </p>

            <h2 className="font-display text-2xl sm:text-3xl text-cream-50 text-center leading-snug mb-8 min-h-[3.5rem]">
              {quizQuestions[q].question}
            </h2>

            <div className="space-y-3">
              {quizQuestions[q].options.map((opt, i) => {
                const isPicked = picked === i
                const isCorrect = i === quizQuestions[q].correctAnswer
                const showState = picked !== null
                return (
                  <motion.button
                    key={i}
                    onClick={() => select(i)}
                    whileTap={{ scale: showState ? 1 : 0.98 }}
                    disabled={showState}
                    className={`w-full text-left rounded-2xl px-5 py-4 hairline transition-all duration-300 cursor-pointer ${
                      !showState
                        ? 'bg-midnight-850/70 hover:border-rose-300/60 hover:bg-midnight-800/70 hover:shadow-glow-rose'
                        : isCorrect
                          ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-200'
                          : isPicked
                            ? 'bg-rose-600/15 border-rose-400/50 text-rose-200'
                            : 'bg-midnight-850/70 opacity-40'
                    }`}
                  >
                    <span className="text-sm">{opt}</span>
                    {showState && isCorrect && <span className="float-right">✓</span>}
                    {showState && isPicked && !isCorrect && <span className="float-right">✗</span>}
                  </motion.button>
                )
              })}
            </div>
            <AnimatePresence>
              {picked !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-center">
                  <p className={`font-display italic text-lg mb-4 ${picked === quizQuestions[q].correctAnswer ? 'text-gold-200' : 'text-rose-300'}`}>
                    {picked === quizQuestions[q].correctAnswer
                      ? quizQuestions[q].correctMessage
                      : quizQuestions[q].wrongMessage}
                  </p>
                  {picked !== quizQuestions[q].correctAnswer && (
                    <p className="text-cream-200/50 text-sm italic mb-3">Okay okay, I’ll forgive you.</p>
                  )}
                  <GlowButton variant={picked === quizQuestions[q].correctAnswer ? 'gold' : 'ghost'} onClick={next}>
                    {q + 1 < total ? 'Next' : 'See my score'}
                  </GlowButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
            <p className="text-gold-300 tracking-[0.4em] uppercase text-[11px] mb-3">Relationship Memory Score</p>
            <div className="font-display text-6xl text-cream-50 text-glow mb-1">
              {score} <span className="text-3xl text-cream-200/40">/ {total}</span>
            </div>
            <div className="flex justify-center gap-1.5 my-4">
              {quizQuestions.map((_, i) => (
                <span key={i} className={`w-3 h-3 rounded-full ${i < score ? 'bg-gold-400' : 'bg-midnight-600'}`} />
              ))}
            </div>
            <h3 className="font-display text-2xl text-cream-50 leading-snug">{result.title}</h3>
            <p className="text-cream-200/60 mt-3 font-display italic text-lg">{result.sub}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <GlowButton variant="ghost" onClick={retry}>{c.retry}</GlowButton>
              <GlowButton variant="gold" onClick={onComplete}>{c.continue}</GlowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}