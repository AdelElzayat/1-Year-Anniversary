import { useEffect, useState } from 'react'
import { getTogetherMs, breakDuration, pad2 } from '../utils/dates'

/** Live "We've been together for…" timer. Returns [days, hours, minutes, seconds]. */
export const useAnniversaryTimer = (intervalMs = 1000) => {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(t)
  }, [intervalMs])

  const ms = getTogetherMs(now)
  const { days, hours, minutes, seconds } = breakDuration(ms)

  return { days, hours, minutes, seconds, timeString: `${pad2(days)} : ${pad2(hours)} : ${pad2(minutes)} : ${pad2(seconds)}` }
}
