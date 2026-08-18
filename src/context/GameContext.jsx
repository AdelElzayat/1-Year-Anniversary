import { createContext, useContext, useEffect, useMemo, useReducer, useCallback, useRef, useState } from 'react'
import { loadProgress, saveProgress, clearProgress, defaultProgress } from '../utils/storage'
import { sfx } from '../audio/audio'

const Ctx = createContext(null)

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.screen }
    case 'UNLOCK_MEMORY': {
      if (state.unlockedMemories.includes(action.id)) return state
      return {
        ...state,
        unlockedMemories: [...state.unlockedMemories, action.id],
        totalUnlocks: state.totalUnlocks + 1
      }
    }
    case 'COMPLETE_CHAPTER': {
      if (state.completedChapters.includes(action.chapter)) return state
      return { ...state, completedChapters: [...state.completedChapters, action.chapter] }
    }
    case 'QUIZ_ANSWER': {
      if (state.quiz.answered.includes(action.question)) return state
      const answered = [...state.quiz.answered, action.question]
      const score = action.correct ? state.quiz.score + 1 : state.quiz.score
      return { ...state, quiz: { ...state.quiz, answered, score, finished: answered.length >= 6 } }
    }
    case 'QUIZ_FINISH':
      return { ...state, quiz: { ...state.quiz, finished: true } }
    case 'QUIZ_RESET':
      return { ...state, quiz: { answered: [], score: 0, finished: false } }
    case 'VAULT_OPEN':
      return { ...state, vault: { ...state.vault, opened: true } }
    case 'VAULT_VIEW':
      if (state.vault.viewed.includes(action.id)) return state
      return { ...state, vault: { ...state.vault, viewed: [...state.vault.viewed, action.id] } }
    case 'FIND_EGG': {
      if (state.easterEggs.includes(action.id)) return state
      return { ...state, easterEggs: [...state.easterEggs, action.id] }
    }
    case 'UNLOCK_SECRET':
      return { ...state, secretUnlocked: true }
    case 'FINISH':
      return { ...state, finished: true }
    case 'RESET':
      return { ...defaultProgress(), screen: 'opening' }
    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadProgress)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  // persist on every change
  useEffect(() => {
    saveProgress(state)
  }, [state])

  const showToast = useCallback((message, { icon = '✨', duration = 4200 } = {}) => {
    setToast({ message, icon, id: Date.now() })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), duration)
  }, [])

  const actions = useMemo(
    () => ({
      setScreen: (screen) => dispatch({ type: 'SET_SCREEN', screen }),
      unlockMemory: (id) => {
        dispatch({ type: 'UNLOCK_MEMORY', id })
        sfx.unlock()
      },
      completeChapter: (chapter) => dispatch({ type: 'COMPLETE_CHAPTER', chapter }),
      answerQuiz: (question, correct) => dispatch({ type: 'QUIZ_ANSWER', question, correct }),
      finishQuiz: () => dispatch({ type: 'QUIZ_FINISH' }),
      resetQuiz: () => dispatch({ type: 'QUIZ_RESET' }),
      openVault: () => dispatch({ type: 'VAULT_OPEN' }),
      viewVaultItem: (id) => dispatch({ type: 'VAULT_VIEW', id }),
      findEgg: (id) => dispatch({ type: 'FIND_EGG', id }),
      unlockSecret: () => dispatch({ type: 'UNLOCK_SECRET' }),
      finish: () => dispatch({ type: 'FINISH' }),
      resetAll: () => {
        clearProgress()
        dispatch({ type: 'RESET' })
      },
      showToast,
      hideToast: () => setToast(null)
    }),
    [showToast]
  )

  return (
    <Ctx.Provider value={{ state, ...actions }}>
      {children}
      {toast && (
        <div
          key={toast.id}
          aria-live="polite"
          className="fixed bottom-24 left-1/2 z-[90] -translate-x-1/2"
        >
          <div className="glass rounded-2xl px-5 py-3.5 shadow-card text-center max-w-[85vw] animate-pulse-glow">
            <div className="text-2xl leading-none mb-1">{toast.icon}</div>
            <p className="text-sm text-cream-100">{toast.message}</p>
          </div>
        </div>
      )}
    </Ctx.Provider>
  )
}

export const useGame = () => useContext(Ctx)
