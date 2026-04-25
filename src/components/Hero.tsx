// src/components/Hero.tsx
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef } from 'react';

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const Hero = () => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const lineVariants: Variants = {
    hidden: { y: 100, opacity: 0, rotate: 2 },
    show: { 
      y: 0, 
      opacity: 1, 
      rotate: 0,
      transition: { type: "spring", bounce: 0.4, duration: 1 } 
    }
  };

  return (
    <section ref={ref} className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      
      <motion.div style={{ y, opacity }} className="w-full max-w-6xl z-10 flex flex-col items-start md:items-center text-left md:text-center mt-20">
        
        {/* 1. Refined Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-4 mb-6 cursor-default group"
        >
          <div className="w-8 md:w-12 h-[2px] bg-orange-500 group-hover:bg-orange-400 transition-colors duration-500" />
          <span className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-neutral-400 group-hover:text-orange-500 transition-colors duration-500 z-1">
            John Michael A. Nave
          </span>
          <div className="w-8 md:w-12 h-[2px] bg-orange-500 group-hover:bg-orange-400 transition-colors duration-500 hidden md:block" />
        </motion.div>

        {/* 2. Frosted Glass Headline */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col mb-8"
        >
          {/* COMPUTER - Orange Glass Hover */}
          <motion.div 
            variants={lineVariants} 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative group overflow-visible origin-left md:origin-center"
          >
            {/* Solid State (Fades out on hover) */}
            <h1 className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85] text-white transition-opacity duration-500 group-hover:opacity-0 cursor-default">
              Computer
            </h1>
            {/* Orange Glass State (Fades in on hover) */}
            <h1 className="absolute inset-0 text-[12vw] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85] text-orange-500/40 blur-[2px] drop-shadow-[0_0_30px_rgba(249,115,22,0.8)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
              Computer
            </h1>
          </motion.div>

          {/* ENGINEER - White Glass Hover */}
          <motion.div 
            variants={lineVariants} 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative group overflow-visible origin-left md:origin-center"
          >
            {/* Solid Gradient State (Fades out on hover) */}
            <h1 className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 transition-opacity duration-500 group-hover:opacity-0 cursor-default">
              Engineer
            </h1>
            {/* White Glass State (Fades in on hover) */}
            <h1 className="absolute inset-0 text-[12vw] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85] text-white/40 blur-[2px] drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
              Engineer
            </h1>
          </motion.div>
        </motion.div>

        {/* 3. Refined Hook */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-lg md:text-2xl text-neutral-400 max-w-2xl font-light leading-relaxed mb-12 cursor-default border-l-2 border-transparent hover:border-orange-500/50 hover:text-white pl-4 md:pl-0 md:border-none transition-all duration-500"
        >
          3rd-year BS Computer Engineering @ CIT-U. <br className="hidden md:block" />
          I build high-performance logic, scalable systems, and flawlessly choreographed digital experiences.
        </motion.p>

        {/* The Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a 
            href="#about" 
            onClick={(e) => handleScroll(e, '#about')}
            className="group px-8 py-4 rounded-full text-white font-bold uppercase tracking-widest text-sm transition-all duration-300 hover:text-orange-500 flex items-center gap-2 cursor-pointer"
          >
            More About JM
            <div className="w-2 h-2 rounded-full bg-orange-500 group-hover:scale-150 transition-transform duration-300" />
          </a>

          <a 
            href="#projects" 
            onClick={(e) => handleScroll(e, '#projects')}
            className="group relative overflow-hidden px-8 py-4 rounded-full bg-orange-500 text-black font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center cursor-pointer"
          >
            <span className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full origin-center" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Work
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;