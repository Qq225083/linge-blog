<template>
  <canvas ref="canvas" id="particle-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let animationId = null
let particles = []
let mouse = { x: null, y: null, radius: 150 }

const PARTICLE_COUNT = 80
const COLORS = [
  'rgba(255, 45, 120, 0.6)',   // neon pink
  'rgba(0, 229, 255, 0.6)',    // neon cyan
  'rgba(179, 71, 234, 0.5)',   // purple
  'rgba(255, 215, 0, 0.4)',    // gold
  'rgba(255, 255, 255, 0.5)',  // white
]

class Particle {
  constructor(w, h) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.size = Math.random() * 2.5 + 0.8
    this.speedX = (Math.random() - 0.5) * 0.4
    this.speedY = (Math.random() - 0.5) * 0.4
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.opacity = Math.random() * 0.6 + 0.2
  }

  update(w, h, mouse) {
    this.x += this.speedX
    this.y += this.speedY

    // Wrap around edges
    if (this.x > w + 10) this.x = -10
    if (this.x < -10) this.x = w + 10
    if (this.y > h + 10) this.y = -10
    if (this.y < -10) this.y = h + 10

    // Mouse interaction — slight attraction
    if (mouse.x != null && mouse.y != null) {
      const dx = this.x - mouse.x
      const dy = this.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius
        this.x += (dx / dist) * force * 0.3
        this.y += (dy / dist) * force * 0.3
      }
    }
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.shadowBlur = 6
    ctx.shadowColor = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

function connectParticles(ctx, particles, w, h) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 100) {
        ctx.save()
        ctx.globalAlpha = (1 - dist / 100) * 0.15
        ctx.strokeStyle = '#ff2d78'
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
        ctx.restore()
      }
    }
  }
}

let w, h

function resize() {
  if (!canvas.value) return
  w = canvas.value.width = window.innerWidth
  h = canvas.value.height = window.innerHeight
}

function animate() {
  if (!canvas.value) return
  const ctx = canvas.value.getContext('2d')
  ctx.clearRect(0, 0, w, h)

  for (const p of particles) {
    p.update(w, h, mouse)
    p.draw(ctx)
  }

  connectParticles(ctx, particles, w, h)
  animationId = requestAnimationFrame(animate)
}

function onMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function onMouseLeave() {
  mouse.x = null
  mouse.y = null
}

onMounted(() => {
  resize()
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(w, h))
  animate()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseleave', onMouseLeave)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseleave', onMouseLeave)
})
</script>
