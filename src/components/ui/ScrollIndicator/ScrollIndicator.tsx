import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './ScrollIndicator.module.scss'

export default function ScrollIndicator() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    gsap.to(el, {
      y: 10,
      duration: 1.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }, [])

  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden>
      <div className={styles.mouse}>
        <div className={styles.wheel} />
      </div>
      <span className={styles.label}>Scroll</span>
    </div>
  )
}
