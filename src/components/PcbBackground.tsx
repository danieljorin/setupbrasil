'use client'
import { useEffect, useRef } from 'react'

// Motor de "placa-mãe viva": nós conectados por trilhas com curvas de 45°
// (como uma PCB de verdade) e pulsos de energia que viajam pelas trilhas.
// Portado do protótipo HTML de referência, com pausa automática quando a
// aba não está visível e respeito a prefers-reduced-motion.

type Node = { x: number; y: number; radius: number; isJunction: boolean }
type Connection = { a: Node; b: Node; points: { x: number; y: number }[] }
type Pulse = { conn: Connection; dir: 1 | -1; progress: number; speed: number; size: number }

const PCB_COLOR = '#00555e'
const GLOW_COLOR = '#00f0ff'

export default function PcbBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    let nodes: Node[] = []
    let connections: Connection[] = []
    let pulses: Pulse[] = []

    function calcPath(a: Node, b: Node) {
      const dx = b.x - a.x
      const dy = b.y - a.y
      const points = [{ x: a.x, y: a.y }]
      if (Math.abs(dx) > Math.abs(dy)) {
        points.push({ x: a.x + Math.sign(dx) * Math.abs(dy), y: b.y })
      } else {
        points.push({ x: b.x, y: a.y + Math.sign(dy) * Math.abs(dx) })
      }
      points.push({ x: b.x, y: b.y })
      return points
    }

    function initPCB() {
      nodes = []
      connections = []
      pulses = []

      const cols = Math.max(5, Math.round(width / 230))
      const rows = Math.max(3, Math.round(height / 230))
      const colW = width / cols
      const rowH = height / rows

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * colW + Math.random() * colW * 0.6 + colW * 0.2
          const y = j * rowH + Math.random() * rowH * 0.6 + rowH * 0.2
          nodes.push({ x, y, radius: Math.random() * 2 + 1.5, isJunction: Math.random() > 0.6 })
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        const targets = nodes
          .map((n, idx) => ({ n, idx, dist: Math.hypot(n.x - a.x, n.y - a.y) }))
          .filter((t) => t.idx !== i)
          .sort((p, q) => p.dist - q.dist)
          .slice(0, 2)

        targets.forEach((t) => {
          const exists = connections.some((c) => (c.a === a && c.b === t.n) || (c.a === t.n && c.b === a))
          if (!exists && t.dist < Math.max(width, height) * 0.32) {
            connections.push({ a, b: t.n, points: calcPath(a, t.n) })
          }
        })
      }
    }

    function pointAt(conn: Connection, dir: 1 | -1, prog: number) {
      const pts = dir === 1 ? conn.points : [...conn.points].reverse()
      const segs = pts.length - 1
      const segProg = prog * segs
      const idx = Math.floor(segProg)
      if (idx >= segs) return pts[pts.length - 1]
      const local = segProg - idx
      const p1 = pts[idx]
      const p2 = pts[idx + 1]
      return { x: p1.x + (p2.x - p1.x) * local, y: p1.y + (p2.y - p1.y) * local }
    }

    function spawnPulse(conn: Connection, dir: 1 | -1) {
      pulses.push({ conn, dir, progress: 0, speed: Math.random() * 0.005 + 0.0035, size: Math.random() * 3 + 2 })
    }

    function triggerFrom(clientX: number, clientY: number) {
      let closest: Node | null = null
      let minDist = 220
      for (const n of nodes) {
        const d = Math.hypot(n.x - clientX, n.y - clientY)
        if (d < minDist) { minDist = d; closest = n }
      }
      if (!closest) return
      connections.forEach((c) => {
        if (c.a === closest) spawnPulse(c, 1)
        else if (c.b === closest) spawnPulse(c, -1)
      })
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = width + 'px'
      canvas!.style.height = height + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      initPCB()
    }
    resize()
    window.addEventListener('resize', resize)

    function drawStaticFrame() {
      ctx!.clearRect(0, 0, width, height)
      connections.forEach((c) => {
        ctx!.beginPath()
        ctx!.moveTo(c.points[0].x, c.points[0].y)
        for (let i = 1; i < c.points.length; i++) ctx!.lineTo(c.points[i].x, c.points[i].y)
        ctx!.strokeStyle = PCB_COLOR
        ctx!.lineWidth = 0.8
        ctx!.stroke()
      })
      nodes.forEach((n) => {
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx!.fillStyle = n.isJunction ? PCB_COLOR : '#102e3b'
        ctx!.fill()
        if (n.isJunction) {
          ctx!.beginPath()
          ctx!.arc(n.x, n.y, n.radius * 2, 0, Math.PI * 2)
          ctx!.strokeStyle = GLOW_COLOR
          ctx!.lineWidth = 0.5
          ctx!.stroke()
        }
      })
    }

    let raf = 0
    let running = true

    function animate() {
      if (!running) return
      drawStaticFrame()

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.progress += p.speed
        if (p.progress >= 1) { pulses.splice(i, 1); continue }
        const pt = pointAt(p.conn, p.dir, p.progress)
        ctx!.beginPath()
        ctx!.arc(pt.x, pt.y, p.size, 0, Math.PI * 2)
        ctx!.fillStyle = GLOW_COLOR
        ctx!.shadowColor = GLOW_COLOR
        ctx!.shadowBlur = 12
        ctx!.fill()
        ctx!.shadowBlur = 0
      }

      if (Math.random() < 0.04 && pulses.length < 25 && connections.length > 0) {
        const c = connections[Math.floor(Math.random() * connections.length)]
        spawnPulse(c, Math.random() > 0.5 ? 1 : -1)
      }

      raf = requestAnimationFrame(animate)
    }

    if (prefersReduced) {
      drawStaticFrame()
    } else {
      animate()
    }

    function onVisibility() {
      if (document.hidden) {
        running = false
        if (raf) cancelAnimationFrame(raf)
      } else if (!prefersReduced) {
        running = true
        animate()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    function onClick(e: MouseEvent) {
      if (!prefersReduced) triggerFrom(e.clientX, e.clientY)
    }
    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('click', onClick)
      running = false
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

