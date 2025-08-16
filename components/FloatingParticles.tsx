'use client'

import { useEffect, useRef } from 'react'

export function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's'
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString()
      
      container.appendChild(particle)

      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle)
        }
      }, 5000)
    }

    const interval = setInterval(createParticle, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div ref={containerRef} className="particles" />
}