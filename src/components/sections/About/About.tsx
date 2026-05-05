import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { person } from '@/constants/data'
import styles from './About.module.scss'

gsap.registerPlugin(ScrollTrigger, SplitText)

const MARQUEE_ITEMS = [
  'React', 'TypeScript', 'Next.js', 'Redux', 'GSAP',
  'Framer Motion', 'GraphQL', 'Node.js', 'WebSocket', 'Firebase',
  'Tailwind', 'SCSS', 'Docker', 'PostgreSQL', 'Stripe',
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const marqueeRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading line-by-line reveal
      if (headingRef.current) {
        const split = new SplitText(headingRef.current, { type: 'lines', linesClass: styles.line })
        split.lines.forEach(line => {
          const wrapper = document.createElement('div')
          wrapper.style.overflow = 'hidden'
          line.parentNode?.insertBefore(wrapper, line)
          wrapper.appendChild(line)
        })
        gsap.fromTo(split.lines,
          { y: '100%' },
          {
            y: '0%',
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      // Paragraph reveals
      paraRefs.current.forEach((p, i) => {
        if (!p) return
        gsap.fromTo(p,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 85%',
            },
            delay: i * 0.1,
          }
        )
      })

      // Stats reveal
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      // Label reveal
      if (labelRef.current) {
        gsap.fromTo(labelRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
          }
        )
      }

      // Blob parallax
      if (blobRef.current) {
        gsap.to(blobRef.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Infinite marquee
      if (marqueeRef.current) {
        const track = marqueeRef.current.querySelector(`.${styles.marqueeTrack}`) as HTMLElement
        if (track) {
          const totalWidth = track.scrollWidth / 2
          gsap.to(track, {
            x: -totalWidth,
            duration: 30,
            ease: 'none',
            repeat: -1,
          })
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className={`${styles.about} section`}>
      {/* Blob */}
      <div ref={blobRef} className={styles.blob} aria-hidden />

      <div className="container">
        <span ref={labelRef} className="section-label">About me</span>

        <div className={styles.grid}>
          <div className={styles.left}>
            <h2 ref={headingRef} className={`section-heading ${styles.heading}`}>
              Crafting digital<br />
              experiences that<br />
              <em className={styles.italic}>actually work</em>
            </h2>
          </div>

          <div className={styles.right}>
            {person.bio.map((para, i) => (
              <p
                key={i}
                ref={el => { paraRefs.current[i] = el }}
                className={styles.para}
              >
                {para}
              </p>
            ))}

            <div ref={statsRef} className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>5+</span>
                <span className={styles.statLabel}>Years experience</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>5</span>
                <span className={styles.statLabel}>Major projects</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>3</span>
                <span className={styles.statLabel}>Industries</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>B2</span>
                <span className={styles.statLabel}>English level</span>
              </div>
            </div>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Education</span>
                <span className={styles.metaValue}>{person.education}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Location</span>
                <span className={styles.metaValue}>{person.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div ref={marqueeRef} className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              {item} <span className={styles.marqueeDot}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
