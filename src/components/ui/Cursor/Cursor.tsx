import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Cursor.module.scss'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // quickTo for sub-frame latency
    const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' })
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' })
    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' })
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' })

    const onMouseMove = (e: MouseEvent) => {
      moveDotX(e.clientX)
      moveDotY(e.clientY)
      moveRingX(e.clientX)
      moveRingY(e.clientY)
    }

    const onMouseEnterLink = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.4, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }

    const onMouseLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.1 })
      gsap.to(dot, { scale: 1.5, duration: 0.1 })
    }

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    // Attach hover to interactive elements
    const bindLinks = () => {
      const interactives = document.querySelectorAll<HTMLElement>('a, button, [data-cursor]')
      interactives.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
      return interactives
    }

    let interactives = bindLinks()

    // Re-bind on DOM changes (sections load)
    const observer = new MutationObserver(() => {
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink)
        el.removeEventListener('mouseleave', onMouseLeaveLink)
      })
      interactives = bindLinks()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    // Show cursor after first move
    gsap.set([dot, ring], { opacity: 0 })
    const onFirstMove = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      window.removeEventListener('mousemove', onFirstMove)
    }
    window.addEventListener('mousemove', onFirstMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  )
}
