import { motion } from 'framer-motion'
import { sfx } from '../audio/audio'

/**
 * The primary CTA button. Glows softly, lifts on hover,
 * has a satisfying click sound.
 */
export default function GlowButton({ children, onClick, variant = 'primary', className = '', ...rest }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-[0.18em] uppercase transition-all duration-300 focus-visible:outline-gold-300/80 cursor-pointer select-none touch-manipulation'
  const variants = {
    primary:
      'bg-gradient-to-b from-rose-400/25 to-rose-600/10 text-rose-200 hairline shadow-glow-rose hover:shadow-glow hover:-translate-y-0.5 hover:from-rose-400/35 active:translate-y-0',
    gold:
      'bg-gradient-to-b from-gold-400/20 to-gold-600/10 text-gold-200 hairline shadow-glow hover:shadow-glow hover:-translate-y-0.5 hover:from-gold-400/30 active:translate-y-0',
    ghost:
      'text-cream-100/80 hairline hover:text-cream-100 hover:border-cream-100/30 hover:-translate-y-0.5 active:translate-y-0'
  }
  const handle = (e) => {
    sfx.click()
    onClick?.(e)
  }
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={handle}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}