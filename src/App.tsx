import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/ui/Cursor'
import Noise from '@/components/ui/Noise'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'

import '@/styles/global.scss'
import styles from './App.module.scss'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function App() {
  const curtainRef = useRef<HTMLDivElement>(null)
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useEffect(() => {
    // ScrollSmoother setup
    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.4,
      effects: true,
      normalizeScroll: true,
    })

    // Page-load curtain reveal
    const curtain = curtainRef.current
    if (curtain) {
      const tl = gsap.timeline()
      tl.to(curtain, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.1,
      })
      .set(curtain, { display: 'none' })
    }

    return () => {
      smootherRef.current?.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      {/* Page-load curtain */}
      <div ref={curtainRef} className={styles.curtain} aria-hidden />

      {/* Noise overlay */}
      <Noise />

      {/* Custom cursor */}
      <Cursor />

      {/* Header */}
      <Header />

      {/* Smooth scroll wrapper */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
