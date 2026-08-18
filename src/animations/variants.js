import { useReducedMotion } from 'framer-motion'

/** Shared cinematic variants — tight, purposeful, never gimmicky. */
export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } }
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(14px)', scale: 1.02 },
  show: { opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 1.1, ease: 'easeOut' } }
}

export const screenVariants = {
  initial: { opacity: 0, filter: 'blur(8px)' },
  enter: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, filter: 'blur(8px)', transition: { duration: 0.55, ease: 'easeIn' } }
}

export const stagger = (delay = 0.08, duration = 0.7) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0.1, duration } }
})

export const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

/** Hook that returns a reduced-motion-safe variant set. */
export const useSafeMotion = () => {
  const reduced = useReducedMotion()
  if (reduced) {
    return { fadeUp: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } } }
  }
  return { fadeUp }
}