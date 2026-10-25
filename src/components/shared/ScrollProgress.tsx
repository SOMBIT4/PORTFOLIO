import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 125,
    damping: 28,
    mass: 0.22,
  })

  return <motion.div className="scroll-progress" aria-hidden="true" style={{ scaleX: reduceMotion ? scrollYProgress : smoothProgress }}/>
}
