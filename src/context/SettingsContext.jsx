import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const Ctx = createContext(null)
const KEY = 'us.settings.v1'

export function SettingsProvider({ children }) {
  const [reduceMotion, setReduceMotion] = useState(() => {
    try {
      const p = JSON.parse(localStorage.getItem(KEY) || '{}')
      return p.reduceMotion === true
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem(KEY) || '{}')
      p.reduceMotion = reduceMotion
      localStorage.setItem(KEY, JSON.stringify(p))
    } catch {
      /* ignore */
    }
  }, [reduceMotion])

  const toggleReduceMotion = useCallback(() => setReduceMotion((v) => !v), [])

  return <Ctx.Provider value={{ reduceMotion, toggleReduceMotion }}>{children}</Ctx.Provider>
}

export const useSettings = () => useContext(Ctx)
