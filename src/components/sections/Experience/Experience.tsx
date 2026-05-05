import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experiences } from '@/constants/data'
import styles from './Experience.module.scss'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      const totalWidth = track.scrollWidth - window.innerWidth

      // Horizontal scroll pinning
      const hScroll = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: self => {
            const idx = Math.round(self.progress * (experiences.length - 1))
            setActiveIndex(idx)

            // SVG timeline line progress
            if (lineRef.current) {
              const totalLen = lineRef.current.getTotalLength?.() ?? 1000
              gsap.set(lineRef.current, {
                strokeDashoffset: totalLen * (1 - self.progress),
              })
            }
          },
        },
      })

      // Cards slide-up as they come into view
      const cards = track.querySelectorAll(`.${styles.card}`)
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'left 90%',
              containerAnimation: hScroll,
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Header reveal
      gsap.fromTo(`.${styles.header}`,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className={styles.experience}>
      <div ref={pinRef} className={styles.pin}>
        {/* Static header */}
        <div className={styles.header}>
          <div className="container">
            <span className="section-label">Career</span>
            <h2 className="section-heading">Work experience</h2>
          </div>
        </div>

        {/* Timeline SVG */}
        <div className={styles.timelineSvgWrap} aria-hidden>
          <svg className={styles.timelineSvg} preserveAspectRatio="none">
            <line
              ref={lineRef}
              x1="0" y1="50%" x2="100%" y2="50%"
              stroke="rgba(200,241,53,0.3)"
              strokeWidth="1"
              strokeDasharray="9999"
              strokeDashoffset="9999"
            />
          </svg>
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className={styles.track}>
          {experiences.map((exp, i) => (
            <article
              key={exp.id}
              className={`${styles.card} ${activeIndex === i ? styles.cardActive : ''}`}
            >
              <div className={styles.cardNumber}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className={styles.cardPeriod}>{exp.period}</div>
              <h3 className={styles.cardTitle}>{exp.title}</h3>
              <p className={styles.cardRole}>{exp.role}</p>
              <p className={styles.cardDesc}>{exp.description}</p>
              <ul className={styles.achievements}>
                {exp.achievements.slice(0, 3).map((a, ai) => (
                  <li key={ai} className={styles.achievement}>{a}</li>
                ))}
              </ul>
              <div className={styles.stack}>
                {exp.stack.map(s => (
                  <span key={s} className={styles.stackTag}>{s}</span>
                ))}
              </div>
              {exp.industry && (
                <span className={styles.industry}>{exp.industry}</span>
              )}
            </article>
          ))}
        </div>

        {/* Progress indicator */}
        <div className={styles.progress}>
          {experiences.map((_, i) => (
            <div
              key={i}
              className={`${styles.dot} ${activeIndex === i ? styles.dotActive : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
