import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { person } from '@/constants/data'
import styles from './Contact.module.scss'

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function scrambleText(el: HTMLElement, text: string, duration = 1.2) {
  let frame = 0
  const totalFrames = Math.round(duration * 60)
  const id = setInterval(() => {
    const progress = frame / totalFrames
    const revealed = Math.floor(progress * text.length)
    const scrambled = text
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' '
        if (i < revealed) return text[i]
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      .join('')
    el.textContent = scrambled
    frame++
    if (frame > totalFrames) {
      el.textContent = text
      clearInterval(id)
    }
  }, 1000 / 60)
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const emailRef = useRef<HTMLAnchorElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section enter glitch + scramble
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          // Glitch entrance for section
          const tl = gsap.timeline()
          tl.fromTo(contentRef.current,
            { skewX: 0, opacity: 0 },
            { opacity: 1, duration: 0.1 }
          )
          .to(contentRef.current, { skewX: 3, duration: 0.05 })
          .to(contentRef.current, { skewX: -2, duration: 0.05 })
          .to(contentRef.current, { skewX: 0, duration: 0.1 })

          // Children stagger
          tl.fromTo(
            [headingRef.current, emailRef.current, btnRef.current],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12 },
            0.1
          )

          // Scramble email
          if (emailRef.current) {
            const email = person.email
            setTimeout(() => {
              if (emailRef.current) scrambleText(emailRef.current, email, 1.5)
            }, 400)
          }
        },
      })

      // Magnetic button
      const btn = btnRef.current
      if (btn) {
        const moveX = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power2.out' })
        const moveY = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power2.out' })

        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = e.clientX - cx
          const dy = e.clientY - cy
          const dist = Math.sqrt(dx * dx + dy * dy)
          const threshold = 100

          if (dist < threshold) {
            moveX(dx * 0.35)
            moveY(dy * 0.35)
          }
        }

        const onLeave = () => {
          moveX(0)
          moveY(0)
        }

        window.addEventListener('mousemove', onMove)
        btn.addEventListener('mouseleave', onLeave)

        return () => {
          window.removeEventListener('mousemove', onMove)
          btn.removeEventListener('mouseleave', onLeave)
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className={`${styles.contact} section`}>
      <div className="container">
        <span className="section-label">Contact</span>

        <div ref={contentRef} className={styles.content}>
          <h2 ref={headingRef} className={styles.heading}>
            Let's build<br />
            something<br />
            <span className={styles.accent}>great together</span>
          </h2>

          <div className={styles.right}>
            <p className={styles.sub}>
              Open to new opportunities, freelance projects and interesting challenges.
              Drop me a line — I usually respond within 24 hours.
            </p>

            <a
              ref={emailRef}
              href={`mailto:${person.email}`}
              className={styles.email}
            >
              {person.email}
            </a>

            <a
              ref={btnRef}
              href={`mailto:${person.email}`}
              className={styles.btn}
            >
              <span>Send a message</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Availability</span>
                <span className={styles.metaValue}>
                  <span className={styles.dot} /> Open to work
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Location</span>
                <span className={styles.metaValue}>{person.location}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>English</span>
                <span className={styles.metaValue}>{person.languages[0].level}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
