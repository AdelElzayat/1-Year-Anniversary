import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { vaultCategories, getVaultCategory } from '../data/vault'
import { vaultReady } from '../game/progression'
import { storyConfig } from '../config/storyConfig'
import { sfx } from '../audio/audio'
import GlowButton from '../components/GlowButton'
import Polaroid from '../components/Polaroid'
import VaultViewer from '../components/VaultViewer'
import ConfettiBurst from '../components/ConfettiBurst'

function VaultDoor({ keys, required, ready, onUnlock }) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-gold-300 tracking-[0.5em] uppercase text-[11px] mb-1">Chapter 4</p>
      <h1 className="font-display text-4xl sm:text-5xl text-cream-50 text-glow mb-2">The Memory Vault</h1>
      <p className="text-cream-200/60 font-display italic text-base max-w-md mb-10">
        {storyConfig.copy.vault.lockedSub}
      </p>

      <div className="relative w-56 h-56 sm:w-64 sm:h-64">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-midnight-700 to-midnight-900 shadow-inner border border-gold-300/20" />
        <div className="absolute inset-4 rounded-full border-2 border-midnight-600/80 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-midnight-850 border-2 border-gold-300/40 flex items-center justify-center shadow-glow">
            <span className="text-2xl">{ready ? '🔓' : '🔒'}</span>
          </div>
          {/* dial ticks */}
          <div className="absolute inset-0 rounded-full opacity-50" style={{ background: 'repeating-conic-gradient(rgba(224,198,152,0.22) 0deg 4deg, transparent 4deg 15deg)' }} />
        </div>
      </div>

      <div className="mt-8 mb-6">
        <div className="flex items-center gap-2 text-cream-200/70 justify-center">
          <span className="text-xl">🔑</span>
          <span className="font-display text-2xl text-gold-300">{keys} / {required}</span>
          <span className="text-sm text-cream-200/50">{storyConfig.copy.vault.keysHeld}</span>
        </div>
      </div>

      {ready ? (
        <GlowButton variant="gold" onClick={onUnlock}>{storyConfig.copy.vault.unlock}</GlowButton>
      ) : (
        <div className="text-center">
          <p className="text-cream-200/50 text-sm italic mb-1">
            The vault needs {required - keys} more {required - keys === 1 ? 'key' : 'keys'} from the earlier chapters.
          </p>
          <p className="text-cream-200/30 text-xs">Unlock memories to collect each one. 🔑</p>
        </div>
      )}
    </div>
  )
}

/**
 * Chapter 4 — The Memory Vault.
 * Locked door requiring collected keys; then a museum gallery.
 */
export default function Chapter4({ onComplete }) {
  const { state, openVault, viewVaultItem } = useGame()
  const [cat, setCat] = useState(vaultCategories[0].id)
  const [viewing, setViewing] = useState(null)
  const keys = state.unlockedMemories.length
  const required = storyConfig.vault.keysRequired
  const ready = vaultReady(state)
  const opened = state.vault.opened
  const category = getVaultCategory(cat)
  const viewedCount = state.vault.viewed.length

  const handleUnlock = () => {
    sfx.vault()
    openVault()
  }

  const openItem = (item) => {
    sfx.click()
    setViewing({ item, category })
    viewVaultItem(item.id)
  }

  return (
    <div className="relative min-h-screen pt-16 pb-20 px-4 flex flex-col items-center">
      <ConfettiBurst trigger={opened ? 1 : 0} count={18} />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div key="door" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.06, filter: 'blur(6px)' }} className="w-full flex flex-col items-center pt-10">
            <VaultDoor keys={keys} required={required} ready={ready} onUnlock={handleUnlock} />
          </motion.div>
        ) : (
          <motion.div key="gallery" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl">
            <div className="text-center mb-8">
                <p className="text-gold-300 tracking-[0.5em] uppercase text-[11px] mb-1">Unlocked</p>
                <h1 className="font-display text-4xl sm:text-5xl text-cream-50 text-glow">The Memory Vault</h1>
                <p className="text-cream-200/60 font-display italic text-base max-w-md mx-auto mt-2">
                  {category.tagline} Tap anything. It’s all ours.
                </p>
              </div>

              {/* category chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 -mx-1 px-1">
                {vaultCategories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { sfx.click(); setCat(c.id) }}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm transition-all cursor-pointer ${
                      cat === c.id
                        ? 'bg-gold-400/20 border border-gold-300/40 text-gold-200'
                        : 'bg-midnight-850/60 border border-cream-100/10 text-cream-200/60 hover:border-cream-100/30'
                    }`}
                  >
                    {c.emoji} {c.label}
                  </button>
                ))}
              </div>

              {/* items */}
              <div className={category.type === 'photo' ? 'grid grid-cols-2 sm:grid-cols-3 gap-4' : 'space-y-3'}>
                {category.items.map((it, i) =>
                  category.type === 'photo' ? (
                    <Polaroid key={it.id} item={it} index={i} caption={it.emoji || '📷'} onClick={() => openItem(it)} />
                  ) : (
                    <motion.button
                      key={it.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => openItem(it)}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left rounded-2xl p-4 hairline bg-midnight-850/70 hover:border-gold-300/40 hover:shadow-glow transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.emoji}</span>
                        <div>
                          <h3 className="font-display text-lg text-cream-50">{it.title}</h3>
                          <p className="text-xs text-cream-200/45">{it.date}</p>
                        </div>
                      </div>
                    </motion.button>
                  )
                )}
              </div>

              {/* continue after exploring */}
              <div className="text-center mt-12">
                {viewedCount >= 1 ? (
                  <>
                    <p className="font-display italic text-cream-200/70 mb-4">Every memory in here is real. And there are still more being made.</p>
                    <GlowButton variant="gold" onClick={onComplete}>{storyConfig.copy.vault.continue}</GlowButton>
                  </>
                ) : (
                  <p className="text-cream-200/35 text-xs italic">Open at least one memory to continue.</p>
                )}
              </div>

          </motion.div>
        )}
      </AnimatePresence>

      <VaultViewer
        item={viewing?.item}
        category={viewing?.category}
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
      />
    </div>
  )
}
