// src/components/AboutMe.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AboutMe = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress strictly within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Choreography: Scale from 0.8 to 1, fade from 0 to 1
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="h-screen flex items-center justify-center border-b border-white/10 relative overflow-hidden">
      <motion.div style={{ scale, opacity }} className="max-w-4xl text-center px-6">
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
          The <span className="text-neutral-500">Architect</span>
        </h2>
        <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed">
          I am a software engineer obsessed with bridging the gap between heavy-duty backend systems and flawlessly choreographed frontend experiences.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutMe;