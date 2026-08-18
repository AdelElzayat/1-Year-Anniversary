import { motion, AnimatePresence } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'

/** Elegant typewriter line with a soft cursor. */
export default function Typewriter({ text, className = '', speed = 55, delay = 0, onDone }) {
  const [out, done] = useTypewriter(text, { speed, delay })
  return (
    <span className={`font-display ${className}`}>
      {out}
      {!done && <span className="inline-block w-[2px] h-[1em] align-middle bg-gold-300/70 animate-pulse-glow" />}
    </span>
  )
}

/** Sequential typewriter lines that reveal one after another. */
export function TypewriterSequence({ lines, speed, onComplete, className = '' }) {
  return (
    <div className={className}>
      <AnimatePresence>
        {lines.map((line, i) => (
          <motion.div
            key={`${line}-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * (speed / 1000 + 0.5), duration: 0.4 }}
          >
            <Typewriter text={line} speed={speed} delay={i * (speed / 1000 + 0.5)} onDone={i === lines.length - 1 ? onComplete : undefined} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}