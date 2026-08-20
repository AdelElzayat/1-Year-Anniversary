import { storyConfig } from '../config/storyConfig'

/** Total time "we've been together" as a human string, e.g. "1 year, 1 day" */
export const formatTogether = (ms) => {
  if (!ms || ms < 0) return 'forever'
  const s = Math.floor(ms / 1000)
  const d = Math.floor(s / 86400)
  const years = Math.floor(d / 365)
  const days = d % 365
  if (years > 0) return `${years} ${years === 1 ? 'year' : 'years'}, ${days} ${days === 1 ? 'day' : 'days'}`
  if (days > 0) return `${days} ${days === 1 ? 'day' : 'days'}`
  return 'a very new adventure'
}

export const getTogetherMs = (now = Date.now()) =>
  now - new Date(storyConfig.relationshipStartDate).getTime()

/** Break a duration into { days, hours, minutes, seconds } */
export const breakDuration = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60
  }
}

export const pad2 = (n) => String(n).padStart(2, '0')
