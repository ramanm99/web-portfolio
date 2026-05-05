import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillCategories } from '@/constants/data'
import styles from './Skills.module.scss'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

function TiltCard({ children, className }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease' }}
    >
      {children}
    </div>
  )
}

interface SkillBarProps {
  name: string
  level: number
  delay: number
}

function SkillBar({ name, level, delay }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className={styles.skillRow}>
      <div className={styles.skillMeta}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.skillBar}>
        <motion.div
          className={styles.skillFill}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: level / 100 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} id="skills" className={`${styles.skills} section`}>
      <div className="container">
        <span className="section-label">Tech Stack</span>
        <h2 className="section-heading">Skills & tools</h2>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillCategories.map((category, ci) => (
            <motion.div key={category.title} variants={cardVariants}>
              <TiltCard className={styles.card}>
                <h3 className={styles.cardTitle}>{category.title}</h3>
                <div className={styles.bars}>
                  {category.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={ci * 0.1 + si * 0.08}
                    />
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional pill tags */}
        <motion.div
          className={styles.pills}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {['WebRTC', 'LiveKit', 'Playwright', 'Cypress', 'Azure', 'Supabase', 'Sequelize', 'NestJS', 'Express', 'Babel', 'ESLint'].map(tag => (
            <span key={tag} className={styles.pill}>{tag}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
