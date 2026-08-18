import { useEffect, useState } from 'react'

/**
 * Typewriter effect for short, emotionally-timed text.
 * `text` typed out character by character; `speed` ms per char.
 * Returns the visible string plus whether it's done.
 */
export const useTypewriter = (text, { speed = 55, start = true, delay = 0 } = {}) => {
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!start) return
    setOut('')
    setDone(false)
    let i = 0
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setOut(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, delay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, start, delay])

  return [out, done]
}
