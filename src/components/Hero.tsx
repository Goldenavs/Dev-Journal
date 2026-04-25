// src/components/Hero.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const ref = useRef(null);
  
  // Parallax effect: moves down and fades out as user scrolls
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Pulsing Orange Engine Core */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600 rounded-full blur-[150px] -z-10 pointer-events-none" 
      />

      <motion.div style={{ y, opacity }} className="text-center px-6 max-w-5xl z-10">
        <motion.h1 
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Custom springy easing
          className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85]"
        >
          Creative
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
            Engineer
          </span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="mt-8 text-lg md:text-2xl text-neutral-400 max-w-2xl mx-auto font-light"
        >
          I build high-performance digital experiences with a focus on motion, design, and bulletproof architecture.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;