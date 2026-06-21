'use client'
import { useEffect, useRef } from 'react'

// Fundo animado estilo "trilhas de placa-mãe" — leve, sem áudio, sem
// interação obrigatória. Roda em canvas para não pesar no DOM.
export default function PcbBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = width + 'px'
      canvas!.style.height = height + 'px'
      ctx!.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Grade de pontos com trilhas a 45/90 graus, pulsando lentamente.
    const spacing = 64
    const cols = Math.ceil(width / spacing) + 2
    const rows = Math.ceil(height / spacing) + 2

    type Node = { x: number; y: number; phase: number; active: boolean }
    const nodes: Node[] = []
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        nodes.push({
          x: i * spacing,
          y: j * spacing,
          phase: Math.random() * Math.PI * 2,
          active: Math.random() > 0.85,
        })
      }
    }

    let frame = 0
    let raf = 0
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      ctx!.strokeStyle = 'rgba(0, 130, 138, 0.18)'
      ctx!.lineWidth = 1

      // Trilhas horizontais/verticais sutis
      for (let i = 0; i < cols; i++) {
        ctx!.beginPath()
        ctx!.moveTo(i * spacing, 0)
        ctx!.lineTo(i * spacing, height)
        ctx!.stroke()
      }
      for (let j = 0; j < rows; j++) {
        ctx!.beginPath()
        ctx!.moveTo(0, j * spacing)
        ctx!.lineTo(width, j * spacing)
        ctx!.stroke()
      }

      // Nós pulsantes nas intersecções marcadas como "ativas"
      nodes.forEach((n) => {
        if (!n.active) return
        const t = prefersReduced ? 0 : frame * 0.01 + n.phase
        const alpha = 0.15 + Math.abs(Math.sin(t)) * 0.35
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, 2.2, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(0, 240, 255, ${alpha})`
        ctx!.fill()
      })

      frame++
      if (!prefersReduced) raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70 pointer-events-none"
      aria-hidden="true"
    />
  )
}
