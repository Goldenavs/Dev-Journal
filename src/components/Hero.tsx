// src/components/Hero.tsx
import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { MapPin, Download } from 'lucide-react';

// Added HackerText for the glitch effect on the name
const HackerText = ({ text, triggerOnHover = false }: { text: string, triggerOnHover?: boolean }) => {
  const [displayText, setDisplayText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    const shouldTrigger = triggerOnHover ? isHovered : isInView;
    if (!shouldTrigger) {
      setDisplayText(""); 
      return;
    }
    
    let iteration = 0;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$><[]{}";
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((_letter, index) => {
            if (index < iteration) return text[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3; 
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, isHovered, text, triggerOnHover]);

  return (
    <span 
      ref={ref} 
      className="inline-block cursor-default"
      onMouseEnter={() => triggerOnHover && setIsHovered(true)}
      onMouseLeave={() => triggerOnHover && setIsHovered(false)}
    >
      {displayText || text}
    </span>
  );
};

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
  
  // --- UPGRADED: Cinematic dissolve effect ---
  // The Hero now shrinks slightly, fades out faster (by 70% of the scroll), and blurs heavily
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);
  const filter = useTransform(scrollYProgress, [0, 0.7], ["blur(0px)", "blur(20px)"]);

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
      
      {/* Applied the new scale and filter transforms here */}
      <motion.div style={{ y, opacity, scale, filter }} className="w-full max-w-6xl z-10 flex flex-col items-start md:items-center text-left md:text-center mt-20">
        
        {/* 1. Refined Eyebrow with HackerText */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-4 mb-8 cursor-default group"
        >
          <div className="w-8 md:w-12 h-[2px] bg-orange-500 group-hover:bg-orange-400 transition-colors duration-500" />
          <span className="font-orbitron text-sm md:text-base font-bold uppercase tracking-[0.3em] text-orange-500 z-1">
            <HackerText text="JOHN MICHAEL A. NAVE" />
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
            <h1 className="font-montserrat text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white transition-opacity duration-500 group-hover:opacity-0 cursor-default">
              Computer
            </h1>
            {/* Orange Glass State (Fades in on hover) */}
            <h1 className="font-montserrat absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-orange-500/40 blur-[2px] drop-shadow-[0_0_30px_rgba(249,115,22,0.8)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
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
            <h1 className="font-montserrat text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 transition-opacity duration-500 group-hover:opacity-0 cursor-default mt-2">
              Engineer
            </h1>
            {/* White Glass State (Fades in on hover) */}
            <h1 className="font-montserrat absolute inset-0 text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white/40 blur-[2px] drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none mt-2">
              Engineer
            </h1>
          </motion.div>
        </motion.div>

        {/* 3. Refined Hook with Clickable Map Link & Better UX */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-base md:text-xl text-neutral-400 max-w-4xl font-light leading-relaxed mb-12 cursor-default border-l-2 border-transparent hover:border-orange-500/50 hover:bg-white/5 pl-4 py-2 rounded-r-lg md:px-6 md:border-none md:hover:bg-transparent transition-all duration-500"
        >
          Computer Engineering student at{' '}
          <a 
            href="https://www.google.com/maps/search/Cebu+Institute+of+Technology+-+University" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white hover:text-orange-500 font-medium underline decoration-orange-500/30 hover:decoration-orange-500 transition-colors whitespace-nowrap"
          >
            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
            Cebu Institute of Technology - University
          </a>
          <br />
          Specializing in fullstack mobile & web development and project management.
          <br />
          Seeking for an opportunity to apply my skills and expertise in a professional environment.
        </motion.p>

        {/* 4. The Action Buttons (Balanced Layout) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full"
        >
          {/* Left: More About JM */}
          <a 
            href="#about" 
            onClick={(e) => handleScroll(e, '#about')}
            className="font-orbitron group text-neutral-300 hover:text-orange-500 font-bold uppercase tracking-widest text-xs md:text-sm transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            More About JM
          </a>

          {/* Center: Explore Work (The primary focal point) */}
          <a 
            href="#projects" 
            onClick={(e) => handleScroll(e, '#projects')}
            className="font-orbitron group relative overflow-hidden px-10 py-4 rounded-full bg-orange-500 text-black font-black uppercase tracking-widest text-xs md:text-sm transition-all duration-300 hover:scale-105 w-full md:w-auto text-center cursor-pointer shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
          >
            <span className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full origin-center" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Explore Work
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>

          {/* Right: View Resume */}
          <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="font-orbitron group text-neutral-300 hover:text-orange-500 font-bold uppercase tracking-widest text-xs md:text-sm transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            View Resume
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;