/**
 * ============================================================
 *  AUDIO ENGINE — WebAudio synthesized sound + generative music
 *  No audio files required. Real files (mp3) can override the
 *  per-chapter procedural score via storyConfig.music.tracks.
 * ============================================================
 */

let ctx = null
let master = null // global output (volume)
let ambGate = null // ambient-only gain (for clean mute)
let muted = false
let volume = 0.5

const midi = (n) => 440 * Math.pow(2, (n - 69) / 12)

function ensure() {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  if (!ctx) {
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = volume
    master.connect(ctx.destination)
    ambGate = ctx.createGain()
    ambGate.gain.value = muted ? 0 : 0.22
    ambGate.connect(master)
  }
  if (ctx.state === 'suspended') {
    try {
      ctx.resume().catch(() => {})
    } catch {
      /* ignore */
    }
  }
  return ctx
}

/** Call on first user gesture to satisfy autoplay policies. */
export function unlockAudio() {
  if (ctx && ctx.state === 'suspended') {
    try {
      ctx.resume().catch(() => {})
    } catch {
      /* ignore */
    }
  }
}

export function setVolume(v) {
  volume = v
  if (master && ctx) master.gain.setTargetAtTime(v, ctx.currentTime, 0.05)
}

export function setMuted(m) {
  muted = m
  if (ambGate && ctx) ambGate.gain.setTargetAtTime(m ? 0 : 0.22, ctx.currentTime, 0.05)
}

/* -------------------- SOUND EFFECTS -------------------- */
function tone({ freq, time = 0, dur = 0.3, type = 'sine', peak = 0.2, glide = null }) {
  if (!ctx || !master) return
  const t0 = ctx.currentTime + time
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (glide) osc.frequency.exponentialRampToValueAtTime(glide, t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(peak, t0 + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g)
  g.connect(master)
  osc.start(t0)
  osc.stop(t0 + dur + 0.06)
}

export const sfx = {
  click() {
    ensure()
    tone({ freq: 480, dur: 0.07, type: 'triangle', peak: 0.11 })
  },
  unlock() {
    ensure()
    tone({ freq: 660, dur: 0.18, type: 'triangle', peak: 0.14 })
    tone({ freq: 880, dur: 0.26, type: 'triangle', peak: 0.14, time: 0.1 })
    tone({ freq: 1174, dur: 0.42, type: 'sine', peak: 0.1, time: 0.2 })
  },
  correct() {
    ensure()
    ;[523, 659, 784, 1046].forEach((f, i) => tone({ freq: f, dur: 0.26, type: 'triangle', peak: 0.13, time: i * 0.09 }))
  },
  wrong() {
    ensure()
    tone({ freq: 340, dur: 0.16, type: 'square', peak: 0.05 })
    tone({ freq: 220, dur: 0.28, type: 'square', peak: 0.05, time: 0.17 })
  },
  vault() {
    ensure()
    tone({ freq: 90, dur: 1.1, type: 'sine', peak: 0.28, glide: 58 })
    ;[880, 1108, 1318, 1568].forEach((f, i) => tone({ freq: f, dur: 0.8, type: 'sine', peak: 0.09, time: 0.35 + i * 0.14 }))
  },
  chapter() {
    ensure()
    ;[392, 523, 659].forEach((f, i) => tone({ freq: f, dur: 0.9, type: 'sine', peak: 0.07, time: i * 0.28 }))
  },
  achievement() {
    ensure()
    ;[659, 784, 988, 1318].forEach((f, i) => tone({ freq: f, dur: 0.3, type: 'triangle', peak: 0.13, time: i * 0.11 }))
  },
  egg() {
    ensure()
    ;[880, 1108, 1318, 1760].forEach((f, i) => tone({ freq: f, dur: 0.18, type: 'sine', peak: 0.09, time: i * 0.06 }))
  }
}

/* -------------------- AMBIENT SCORE -------------------- */
const SCORES = {
  loading: { chords: [[57, 60, 64, 67], [55, 59, 62, 67], [53, 57, 60, 64], [50, 54, 57, 62]], step: 4.2 },
  opening: { chords: [[60, 64, 67, 71], [58, 62, 65, 69], [56, 60, 63, 67], [55, 59, 62, 67]], step: 5 },
  chapter1: { chords: [[57, 60, 62, 64], [57, 60, 62, 67], [55, 59, 62, 65], [59, 63, 66, 71]], step: 4.6 },
  chapter2: { chords: [[60, 64, 67], [64, 67, 71], [65, 69, 72], [67, 71, 74]], step: 5 },
  chapter3: { chords: [[55, 59, 62, 65], [57, 60, 64], [55, 59, 62], [57, 60, 64, 67]], step: 4.2 },
  chapter4: { chords: [[57, 60, 64], [60, 64, 67], [62, 65, 69], [60, 64, 67]], step: 5.4 },
  final: { chords: [[64, 67, 71, 74], [69, 73, 76], [67, 71, 74], [64, 67, 71]], step: 6 },
  ending: { chords: [[60, 64, 67, 71], [64, 67, 71], [67, 71, 74], [65, 69, 72]], step: 6 },
  secret: { chords: [[62, 65, 69], [64, 67, 71], [60, 64, 67], [67, 71, 74]], step: 5 }
}

let score = null
let stepTimer = null
let chordIndex = 0

function playChord(notes) {
  if (!ctx || !ambGate) return
  const t0 = ctx.currentTime
  const dur = 7
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 850
  filter.Q.value = 1
  filter.connect(ambGate)
  notes.forEach((n, idx) => {
    const osc = ctx.createOscillator()
    osc.type = idx % 2 ? 'sine' : 'triangle'
    osc.frequency.value = midi(n)
    osc.detune.value = Math.random() * 6 - 3
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t0)
    g.gain.exponentialRampToValueAtTime(0.05, t0 + 2.6)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
    osc.connect(g)
    g.connect(filter)
    osc.start(t0)
    osc.stop(t0 + dur + 0.1)
  })
  if (Math.random() > 0.45) {
    const sp = ctx.createOscillator()
    sp.type = 'sine'
    sp.frequency.value = midi(notes[0] + 12 + Math.floor(Math.random() * 6))
    const sg = ctx.createGain()
    sg.gain.setValueAtTime(0.0001, t0 + 1)
    sg.gain.exponentialRampToValueAtTime(0.02, t0 + 2)
    sg.gain.exponentialRampToValueAtTime(0.0001, t0 + 3)
    sp.connect(sg)
    sg.connect(ambGate)
    sp.start(t0 + 1)
    sp.stop(t0 + 3.2)
  }
}

function scheduleLoop() {
  if (!score) return
  const loop = () => {
    playChord(score.chords[chordIndex % score.chords.length])
    chordIndex++
  }
  loop()
  stepTimer = setInterval(loop, score.step * 1000)
}

export const ambient = {
  start(chapter) {
    if (!ensure()) return
    this.stop()
    score = SCORES[chapter] || SCORES.opening
    chordIndex = Math.floor(Math.random() * 8)
    scheduleLoop()
  },
  stop() {
    if (stepTimer) clearInterval(stepTimer)
    stepTimer = null
  },
  suspend() {
    this.stop()
    if (ctx) ctx.suspend()
  },
  resume() {
    ensure()
    if (score && !stepTimer) scheduleLoop()
  }
}
