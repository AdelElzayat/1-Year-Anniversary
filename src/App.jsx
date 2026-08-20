import { useEffect, useState } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { useGame } from './context/GameContext'
import { useAudio, CHAPTER_MUSIC_KEYS } from './context/AudioContext'
import { useSettings } from './context/SettingsContext'
import { chapters } from './data/chapters'
import { screenVariants } from './animations/variants'
import LoadingScreen from './components/Loading'
import ParticleField from './components/ParticleField'
import MusicControl from './components/MusicControl'
import SettingsMenu from './components/SettingsMenu'
import SecretGate from './components/SecretGate'
import ChapterIntro from './components/ChapterIntro'
import Opening from './screens/Opening'
import Chapter1 from './screens/Chapter1'
import Chapter2 from './screens/Chapter2'
import Chapter3 from './screens/Chapter3'
import Chapter4 from './screens/Chapter4'
import Ending from './screens/Ending'
import SecretChapter from './screens/SecretChapter'

const chapterMap = { ch1: chapters[0], ch2: chapters[1], ch3: chapters[2], ch4: chapters[3] }

export default function App() {
  const { state, setScreen, completeChapter } = useGame()
  const { setChapter } = useAudio()
  const { reduceMotion } = useSettings()
  const [loading, setLoading] = useState(true)
  const [introDone, setIntroDone] = useState(false)

  const screen = state.screen

  // music follows the scene
  useEffect(() => {
    setChapter(CHAPTER_MUSIC_KEYS[screen] || 'opening')
  }, [screen, setChapter])

  // each new scene starts at its intro card
  useEffect(() => {
    setIntroDone(false)
  }, [screen])

  const advance = (chapterId, next) => () => {
    completeChapter(chapterId)
    setScreen(next)
  }

  const go = () => setScreen('ch1')

  let body
  switch (screen) {
    case 'ch1':
      body = !introDone ? (
        <ChapterIntro chapter={chapterMap.ch1} onBegin={() => setIntroDone(true)} />
      ) : (
        <Chapter1 onComplete={advance('ch1', 'ch2')} />
      )
      break
    case 'ch2':
      body = !introDone ? (
        <ChapterIntro chapter={chapterMap.ch2} onBegin={() => setIntroDone(true)} />
      ) : (
        <Chapter2 onComplete={advance('ch2', 'ch3')} />
      )
      break
    case 'ch3':
      body = !introDone ? (
        <ChapterIntro chapter={chapterMap.ch3} onBegin={() => setIntroDone(true)} />
      ) : (
        <Chapter3 onComplete={advance('ch3', 'ch4')} />
      )
      break
    case 'ch4':
      body = !introDone ? (
        <ChapterIntro chapter={chapterMap.ch4} onBegin={() => setIntroDone(true)} />
      ) : (
        <Chapter4 onComplete={advance('ch4', 'ending')} />
      )
      break
    case 'ending':
      body = <Ending />
      break
    case 'final':
      // Legacy save games that were mid-way through the removed final chapter
      // (ch5) go straight to the ending instead of getting stuck.
      body = <Ending />
      break
    case 'secret':
      body = state.secretUnlocked ? <SecretChapter /> : <Opening onBegin={go} />
      break
    case 'opening':
    default:
      body = <Opening onBegin={go} />
      break
  }

  return (
    <MotionConfig reducedMotion={reduceMotion ? 'always' : 'user'}>
      <div className="grain romantic-bg relative min-h-screen text-cream-100 overflow-x-hidden">
        <ParticleField />

        <main className="relative z-[2]">
          <AnimatePresence mode="wait">
            <motion.div key={screen} variants={screenVariants} initial="initial" animate="enter" exit="exit">
              {body}
            </motion.div>
          </AnimatePresence>
        </main>

        <MusicControl />
        <SettingsMenu />
        <SecretGate />

        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </div>
    </MotionConfig>
  )
}
