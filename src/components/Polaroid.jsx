import { motion } from 'framer-motion'

/**
 * A physical Polaroid: cream frame, slight rotation, handwritten
 * caption + date at the bottom. Used in the Memory Vault.
 */
export default function Polaroid({ item, index = 0, onClick, caption }) {
  const rotations = [-2.5, 1.8, -1.2, 2.2, -1.8, 0.9]
  const rotate = rotations[index % rotations.length]
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 24, rotate: rotate * 2 }}
      animate={{ opacity: 1, y: 0, rotate }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      onClick={onClick}
      className="bg-cream-100 text-midnight-900 rounded-md p-2.5 pb-3 shadow-card cursor-pointer text-left group"
    >
      <div className="overflow-hidden bg-midnight-900 rounded-sm">
        {item.image ? (
          <img src={item.image} alt={item.title} loading="lazy" className="w-full aspect-square object-cover group-hover:scale-[1.03] transition-transform duration-700" />
        ) : (
          <div className="w-full aspect-square bg-gradient-to-br from-midnight-800 via-midnight-700 to-rose-900/50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-1">{caption || '📷'}</div>
              <p className="text-cream-100/40 text-[10px] tracking-[0.3em] uppercase">placeholder</p>
            </div>
          </div>
        )}
      </div>
      <div className="pt-2.5 px-1">
        <p className="font-hand text-xl leading-none">{item.title}</p>
        <p className="font-hand text-midnight-900/55 text-base mt-0.5">{item.date || ''}</p>
      </div>
    </motion.button>
  )
}
