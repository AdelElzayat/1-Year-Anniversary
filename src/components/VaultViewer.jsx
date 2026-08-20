import { motion, AnimatePresence } from 'framer-motion'
import { X, Play } from 'lucide-react'
import { storyConfig } from '../config/storyConfig'
import AudioPlayer from './AudioPlayer'

/**
 * Immersive viewer for vault items. Different experiences by
 * category type: photo (Polaroid), message (chat replay),
 * audio (player), video (poster), text (elegant card).
 */
export default function VaultViewer({ item, category, open, onClose }) {
  const me = storyConfig.me.name
  const her = storyConfig.her.name
  if (!open || !item) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[75] overflow-y-auto overscroll-contain"
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.button className="fixed inset-0 bg-black/80 backdrop-blur-lg cursor-pointer" onClick={onClose} aria-label="Close viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        <button onClick={onClose} aria-label="Close" className="fixed top-4 right-4 z-10 text-cream-100/60 hover:text-cream-100 p-2 cursor-pointer"><X size={22} /></button>

        <div className="min-h-full flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', damping: 24, stiffness: 240 }}
            className="relative w-full max-w-md bg-cream-100 text-midnight-900 rounded-2xl shadow-card overflow-hidden my-6"
          >
          <div className="pt-6 px-5 pb-6">
            <p className="text-[10px] tracking-[0.3em] uppercase text-midnight-900/45 mb-1">{category.emoji} {category.label}</p>
            <h3 className="font-display text-3xl font-semibold leading-tight">{item.title}</h3>
            {item.date && <p className="font-hand text-lg text-midnight-900/55 mt-1">{item.date}</p>}

            <div className="mt-4">
              {category.type === 'photo' && (
                <div>
                  <div className="overflow-hidden rounded-xl bg-midnight-900">
                    {item.image ? (
                      <img src={item.image} alt={item.title} loading="lazy" className="block w-full h-auto max-h-[68vh] object-contain mx-auto" />
                    ) : (
                      <div className="w-full h-60 bg-gradient-to-br from-midnight-800 via-midnight-700 to-rose-900/50 flex items-center justify-center">
                        <p className="text-cream-100/40 text-xs tracking-[0.3em] uppercase">placeholder photo</p>
                      </div>
                    )}
                  </div>
                  {item.caption && <p className="font-hand text-xl text-midnight-900/80 mt-3 text-center">{item.caption}</p>}
                </div>
              )}

              {category.type === 'message' && (
                <div className="space-y-2.5">
                  {(item.lines || []).map((line, i) => {
                    const fromMe = line.from === 'ME' || line.from === 'Me'
                    const label = fromMe ? me : her
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.7, duration: 0.4 }}
                        className={`flex ${fromMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${fromMe ? 'bg-gold-400 text-midnight-900 rounded-br-sm' : 'bg-cream-200 text-midnight-900 rounded-bl-sm'}`}>
                          <span className="block text-[10px] uppercase tracking-widest text-midnight-900/40 mb-0.5">{label}</span>
                          {line.text}
                        </div>
                      </motion.div>
                    )
                  })}
                  {item.note && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (item.lines?.length || 0) * 0.7 + 0.4 }}
                      className="text-center font-display italic text-midnight-900/60 text-base mt-4"
                    >
                      {item.note}
                    </motion.p>
                  )}
                </div>
              )}
              {category.type === 'audio' && (
                <div className="space-y-3">
                  <div className="border border-midnight-900/10 rounded-xl p-3">
                    <AudioPlayer src={item.audio} label={item.title} />
                  </div>
                  {item.text && <p className="text-midnight-900/75 text-sm leading-relaxed">{item.text}</p>}
                </div>
              )}

              {category.type === 'video' && (
                <div>
                  <button onClick={() => {}} className="w-full rounded-xl bg-midnight-900/90 h-48 flex flex-col items-center justify-center gap-2 text-cream-100/70 cursor-pointer">
                    <Play size={26} className="text-gold-300" />
                    <span className="text-xs tracking-[0.25em] uppercase">video comes here</span>
                  </button>
                  {item.text && <p className="text-midnight-900/75 text-sm leading-relaxed mt-3">{item.text}</p>}
                </div>
              )}

              {category.type === 'text' && <p className="text-midnight-900/80 leading-relaxed">{item.text}</p>}

              {item.message && (
                <p className="mt-4 font-display italic text-midnight-900/70 border-t border-midnight-900/10 pt-3">{item.message}</p>
              )}
            </div>

            <button onClick={onClose} className="mt-5 w-full rounded-full bg-midnight-900 text-cream-50 py-3 text-sm tracking-[0.15em] uppercase hover:bg-midnight-800 active:scale-[0.98] transition-all cursor-pointer">
              Close
            </button>
          </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
