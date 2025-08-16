'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeroSection } from '@/components/landing/HeroSection'
import { LoreSection } from '@/components/landing/LoreSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { ArtworkSection } from '@/components/landing/ArtworkSection'
import { JoinSection } from '@/components/landing/JoinSection'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize GSAP animations
      const ctx = gsap.context(() => {
        // Smooth scrolling animations
        gsap.utils.toArray('.scroll-section').forEach((section: any, i) => {
          gsap.fromTo(section, 
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              }
            }
          )
        })
      }, containerRef)

      return () => ctx.revert()
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen">
      <HeroSection />
      <LoreSection />
      <FeaturesSection />
      <ArtworkSection />
      <JoinSection />
    </div>
  )
}