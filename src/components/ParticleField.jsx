import { useEffect, useRef } from 'react'

/**
 * Ambient particle field — tiny drifting stars/dust on a canvas.
 * Honors prefers-reduced-motion (static, fewer particles).
 * Renders a fixed full-screen layer, never intercepts input.
 */
export default function ParticleField({ density = 0.00009 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let particles = []
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(Math.round((w * h) / (15000 / density)), 80)
      particles = Array.from({ length: Math.floor(count) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.25,
        a: Math.random() * 0.5 + 0.12,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.06 + 0.02),
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.004 + 0.001,
        hue: Math.random() > 0.82 ? '224, 167, 174' : Math.random() > 0.5 ? '236, 217, 166' : '179, 162, 216'
      }))
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          p.tw += p.tws
          if (p.y < -4) p.y = h + 4
          if (p.x < -4) p.x = w + 4
          if (p.x > w + 4) p.x = -4
        }
        const alpha = p.a * (0.55 + 0.45 * Math.sin(p.tw))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.hue}, ${alpha})`
        ctx.shadowColor = 'rgba(236,217,166,0.5)'
        ctx.shadowBlur = p.r * 6
        ctx.fill()
        ctx.shadowBlur = 0
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [density])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]" />
}