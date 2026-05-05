import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { navItems, person } from '@/constants/data'
import { scrollToSection, handleAnchorClick } from '@/utils/scrollTo'
import styles from './Header.module.scss'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('#hero')

  useEffect(() => {
    const header = headerRef.current
    const progress = progressRef.current
    if (!header || !progress) return

    // Entrance animation
    gsap.fromTo(header,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2 }
    )

    // Scroll progress bar
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        gsap.set(progress, { scaleX: self.progress })
      },
    })

    // Hide/show header on scroll direction
    let lastY = 0
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        const currentY = self.scroll()
        const isNearBottom = self.progress > 0.88

        if (currentY <= 100 || isNearBottom) {
          gsap.to(header, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
        } else if (currentY > lastY) {
          gsap.to(header, { y: -80, duration: 0.3, ease: 'power2.in', overwrite: 'auto' })
        } else {
          gsap.to(header, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
        }

        lastY = currentY
      },
    })

    // Active section tracking + URL hash sync
    const allSections = [
      { href: '#hero' },
      ...navItems,
    ]
    allSections.forEach(item => {
      const section = document.querySelector(item.href)
      if (!section) return
      ScrollTrigger.create({
        trigger: section,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => {
          setActiveSection(item.href)
          const hash = item.href === '#hero' ? location.pathname : item.href
          history.replaceState(null, '', hash)
        },
        onEnterBack: () => {
          setActiveSection(item.href)
          const hash = item.href === '#hero' ? location.pathname : item.href
          history.replaceState(null, '', hash)
        },
      })
    })

    // Scroll to hash on load (e.g. opening /#about)
    const initialHash = location.hash
    if (initialHash) {
      setTimeout(() => scrollToSection(initialHash), 400)
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.progressBar} ref={progressRef} />
      <div className={styles.inner}>
        <a href="/" className={styles.logo} onClick={e => handleAnchorClick(e, '#')}>
          <span className={styles.logoName}>{person.firstName}</span>
          <span className={styles.logoDot} />
        </a>
        <nav className={styles.nav}>
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${activeSection === item.href ? styles.active : ''}`}
              onClick={e => handleAnchorClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href="mailto:raman.milash@gmail.com" className={styles.cta}>
          Hire me
        </a>
      </div>
    </header>
  )
}
