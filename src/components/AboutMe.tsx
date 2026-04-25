// src/components/AboutMe.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const AboutMe = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden py-32">
      <motion.div style={{ scale, opacity, y }} className="max-w-5xl text-center px-6 relative z-10">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-10">
          The <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-orange-500">Architect</span>
        </h2>
        
        {/* Animated Orange Divider */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "6rem" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-1 bg-orange-500 mx-auto mb-10" 
        />
        
        <p className="text-2xl md:text-4xl text-neutral-300 font-light leading-tight">
          I am a software engineer obsessed with bridging the gap between heavy-duty backend systems and flawlessly choreographed frontend experiences.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutMe;