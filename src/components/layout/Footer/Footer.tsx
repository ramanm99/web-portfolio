import { person } from '@/constants/data'
import styles from './Footer.module.scss'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          © {year} {person.name} — All rights reserved
        </p>
        <p className={styles.built}>
          Built with React + Vite + GSAP
        </p>
      </div>
    </footer>
  )
}
