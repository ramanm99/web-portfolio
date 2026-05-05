import { useEffect, useRef } from 'react'
import styles from './Noise.module.scss'

const GRAIN_SIZE = 200

export default function Noise() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const offsetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = GRAIN_SIZE
      canvas.height = GRAIN_SIZE
    }
    resize()

    const generateGrain = () => {
      const imageData = ctx.createImageData(GRAIN_SIZE, GRAIN_SIZE)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 18 // subtle alpha
      }
      ctx.putImageData(imageData, 0, 0)
    }

    const animate = () => {
      generateGrain()
      offsetRef.current = {
        x: Math.random() * GRAIN_SIZE,
        y: Math.random() * GRAIN_SIZE,
      }
      if (canvas.style) {
        canvas.style.backgroundPosition = `${offsetRef.current.x}px ${offsetRef.current.y}px`
      }
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return <canvas ref={canvasRef} className={styles.noise} aria-hidden />
}
