import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import ScrollIndicator from '@/components/ui/ScrollIndicator'
import { person } from '@/constants/data'
import { handleAnchorClick } from '@/utils/scrollTo'
import styles from './Hero.module.scss'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // SVG path draw
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll('path, circle, ellipse')
        paths.forEach(path => {
          const length = (path as SVGGeometryElement).getTotalLength?.() ?? 300
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        })
        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          stagger: 0.15,
        }, 0)
      }

      // Name split text reveal
      if (nameRef.current) {
        const split = new SplitText(nameRef.current, { type: 'chars' })
        tl.fromTo(split.chars,
          { y: 120, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            ease: 'power4.out',
            stagger: 0.03,
          },
          0.2
        )
      }

      // Title reveal
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: 'words' })
        tl.fromTo(split.words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06 },
          0.7
        )
      }

      // Bio line reveal
      if (bioRef.current) {
        tl.fromTo(bioRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          1
        )
      }

      // Badge + counter animation
      if (badgeRef.current && counterRef.current) {
        tl.fromTo(badgeRef.current,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
          1
        )
        tl.to({ val: 0 }, {
          val: person.yearsExp,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: function () {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(this.targets()[0].val).toString()
            }
          },
        }, 1)
      }

      // CTA buttons
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.1 },
          1.2
        )
      }

      // Scroll indicator
      if (indicatorRef.current) {
        tl.fromTo(indicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          1.6
        )
      }

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: self => {
          if (nameRef.current) {
            gsap.set(nameRef.current, { y: self.progress * -80 })
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hero" className={styles.hero}>
      {/* Background SVG geometry */}
      <svg ref={svgRef} className={styles.bg} viewBox="0 0 1200 700" aria-hidden>
        <ellipse cx="900" cy="200" rx="300" ry="300" stroke="rgba(200,241,53,0.08)" strokeWidth="1" fill="none" />
        <ellipse cx="900" cy="200" rx="200" ry="200" stroke="rgba(200,241,53,0.05)" strokeWidth="1" fill="none" />
        <path
          d="M 50 600 Q 300 100 600 350 T 1150 100"
          stroke="rgba(200,241,53,0.12)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M 0 500 Q 200 300 400 400 T 800 200 T 1200 300"
          stroke="rgba(99,102,241,0.1)"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="120" cy="120" r="60" stroke="rgba(200,241,53,0.06)" strokeWidth="1" fill="none" />
        <circle cx="120" cy="120" r="30" stroke="rgba(200,241,53,0.04)" strokeWidth="1" fill="none" />
      </svg>

      <div className={styles.inner}>
        <div className={styles.content}>
          {/* Badge */}
          <div ref={badgeRef} className={styles.badge}>
            <span className={styles.badgeCounter}>
              <span ref={counterRef}>0</span>+
            </span>
            <span>years of experience</span>
          </div>

          {/* Name */}
          <h1 ref={nameRef} className={styles.name}>
            {person.firstName}
            <br />
            {person.lastName}
          </h1>

          {/* Title */}
          <p ref={titleRef} className={styles.title}>
            {person.subtitle} <span className={styles.accent}>{person.title}</span>
          </p>

          {/* Short bio */}
          <p ref={bioRef} className={styles.bio}>
            Specializing in React ecosystems across HealthTech, EduTech & IoT —<br />
            building fast, accessible, production-ready interfaces.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className={styles.cta}>
            <a
              href="#projects"
              className={styles.ctaPrimary}
              onClick={e => handleAnchorClick(e, '#projects')}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className={styles.ctaSecondary}
              onClick={e => handleAnchorClick(e, '#contact')}
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Industries tags */}
        <div className={styles.tags}>
          {['HealthTech', 'EduTech', 'IoT', 'E-commerce', 'SaaS'].map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={indicatorRef} className={styles.indicator}>
        <ScrollIndicator />
      </div>
    </section>
  )
}
