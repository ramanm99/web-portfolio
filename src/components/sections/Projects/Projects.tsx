import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, LayoutGroup } from 'framer-motion'
import gsap from 'gsap'
import { experiences } from '@/constants/data'
import styles from './Projects.module.scss'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

interface ProjectCardProps {
  exp: (typeof experiences)[number]
  index: number
  isExpanded: boolean
  onClick: () => void
}

function ProjectCard({ exp, index, isExpanded, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el || isExpanded) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(el, {
      rotateX: -y * 6,
      rotateY: x * 6,
      scale: 1.02,
      duration: 0.15,
      ease: 'power2.out',
      transformPerspective: 600,
    })
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  return (
    <motion.div
      layout
      layoutId={`card-${exp.id}`}
      className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
      onClick={onClick}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor
    >
      <motion.div layout="position" className={styles.cardInner}>
        <div className={styles.cardHeader}>
          <span className={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</span>
          {exp.industry && <span className={styles.cardIndustry}>{exp.industry}</span>}
          <motion.span
            className={styles.cardToggle}
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            +
          </motion.span>
        </div>

        <motion.h3 layout="position" className={styles.cardTitle}>{exp.title}</motion.h3>
        <motion.p layout="position" className={styles.cardPeriod}>{exp.period}</motion.p>
        <motion.p layout="position" className={styles.cardRole}>{exp.role}</motion.p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={styles.cardDetails}
            >
              <p className={styles.cardDesc}>{exp.description}</p>
              <ul className={styles.achievements}>
                {exp.achievements.map((a, i) => (
                  <motion.li
                    key={i}
                    className={styles.achievement}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {a}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.stack}>
          {exp.stack.map(s => (
            <span key={s} className={styles.stackTag}>{s}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggle = (id: string) => setExpandedId(prev => prev === id ? null : id)

  return (
    <section ref={sectionRef} id="projects" className={`${styles.projects} section`}>
      <div className="container">
        <span className="section-label">Portfolio</span>
        <h2 className="section-heading">Featured projects</h2>

        <LayoutGroup>
          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {experiences.map((exp, i) => (
              <motion.div key={exp.id} variants={cardVariants}>
                <ProjectCard
                  exp={exp}
                  index={i}
                  isExpanded={expandedId === exp.id}
                  onClick={() => toggle(exp.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}
