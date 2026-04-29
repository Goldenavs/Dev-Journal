// src/components/AboutMe.tsx
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';

// --- HELPER COMPONENT: Kinetic Photo Frame ---
const PhotoFrame = ({ 
  src, 
  alt, 
  className, 
  scrollYProgress, 
  yOffset 
}: { 
  src?: string, 
  alt: string, 
  className: string,
  scrollYProgress: any,
  yOffset: number[]
}) => {
  const y = useTransform(scrollYProgress, [0, 1], yOffset);

  return (
    <motion.div 
      style={{ y }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`absolute overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-2xl transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-500" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center p-6 text-center group">
          <span className="font-orbitron text-neutral-600 font-bold uppercase tracking-widest text-xs group-hover:text-orange-500 transition-colors duration-300">
            [ {alt} ]
          </span>
        </div>
      )}
    </motion.div>
  );
};

const AboutMe = () => {
  const containerRef = useRef(null);
  
  // --- EASTER EGG ENGINE ---
  const [clickCount, setClickCount] = useState(0);
  const [showWolf, setShowWolf] = useState(false);

  const handleNameClick = () => {
    // FIXED: Requires exactly 1 click (0 trigger!)
    if (clickCount === 0) {
      setShowWolf(true);
      setClickCount(0); 
      
      setTimeout(() => {
        setShowWolf(false);
      }, 3000);
    } else {
      setClickCount((prev) => prev + 1);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }
  };

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center py-32 px-6 relative z-10">
      
      {/* Massive Background Watermark */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [150, -150]) }}
        className="font-montserrat absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black uppercase text-white/[0.02] tracking-tighter pointer-events-none -z-10 whitespace-nowrap"
      >
        Vibe Coder
      </motion.div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT COLUMN: Editorial Typography */}
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            show: { transition: { staggerChildren: 0.2 } }
          }}
          className="flex flex-col"
        >
          <motion.div variants={textVariants} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-orange-500" />
            <span className="font-orbitron text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
              Nonchalant Coder
            </span>
          </motion.div>

          <motion.h2 variants={textVariants} className="font-montserrat text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
            Hello, I am <br/>
            <span className="relative inline-block mt-2">
              <span 
                onClick={handleNameClick}
                className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 cursor-pointer select-none relative z-10"
              >
                JM Nave
              </span>
              
              {/* THE ALPHA WOLF EASTER EGG */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={showWolf ? { opacity: 1, y: -40, scale: 1 } : { opacity: 0, y: 10, scale: 0.8 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="font-orbitron absolute left-1/2 -translate-x-1/2 top-0 whitespace-nowrap bg-neutral-900 border border-orange-500/30 text-orange-500 text-xs md:text-sm font-bold uppercase tracking-widest py-2 px-4 rounded-full pointer-events-none z-20 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
              >
                🐺 Do not disturb the alpha wolf
              </motion.div>
            </span>
          </motion.h2>

          <div className="space-y-6 text-lg md:text-xl text-neutral-400 font-light leading-relaxed mt-4">
            <motion.p variants={textVariants}>
              I am currently a 3rd-year <strong className="text-white font-bold">BS Computer Engineering</strong> student at the <strong className="text-white font-bold">Cebu Institute of Technology - University</strong>. 
            </motion.p>
            
            <motion.p variants={textVariants}>
              My ultimate goal is to bridge the gap between heavy-duty backend logic and flawless frontend execution. I don't just write code; I architect systems that are highly scalable, strictly typed, and aesthetically unapologetic.
            </motion.p>

            <motion.p variants={textVariants} className="pl-6 border-l-2 border-orange-500 italic text-neutral-300">
              "I don't have a prime, I grow and learn every day."
            </motion.p>
          </div>

          {/* THE STATS ROW */}
          <motion.div variants={textVariants} className="mt-12 flex flex-wrap items-center gap-6 md:gap-8">
             <div className="flex flex-col">
               <span className="font-orbitron text-4xl font-black text-white">3rd</span>
               <span className="font-orbitron text-xs uppercase tracking-widest text-orange-500 font-bold mt-1">Year Student</span>
             </div>
             <div className="w-[1px] h-12 bg-white/10 hidden sm:block" />
             
             <div className="flex flex-col">
               <span className="font-orbitron text-4xl font-black text-white">∞</span>
               <span className="font-orbitron text-xs uppercase tracking-widest text-orange-500 font-bold mt-1">Lines of Code</span>
             </div>
             <div className="w-[1px] h-12 bg-white/10 hidden sm:block" />
             
             {/* THE HUMOROUS 3RD STAT */}
             <div className="flex flex-col">
               <span className="font-orbitron text-4xl font-black text-white">404</span>
               <span className="font-orbitron text-xs uppercase tracking-widest text-orange-500 font-bold mt-1">Sleep Not Found</span>
             </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: The Kinetic Collage */}
        <div className="relative w-full h-[600px] hidden md:block perspective-1000">
          <PhotoFrame 
            src="/portrait.jpg"
            alt="Main Portrait Placeholder"
            className="w-[300px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rotate-[-2deg]"
            scrollYProgress={scrollYProgress}
            yOffset={[50, -50]} 
          />
          <PhotoFrame 
            src="/cit.jpg"
            alt="Workspace Placeholder"
            className="w-[220px] h-[280px] top-[5%] right-[5%] z-10 rotate-[6deg]"
            scrollYProgress={scrollYProgress}
            yOffset={[100, -100]} 
          />
          <PhotoFrame 
            src="/catto.jpg"
            alt="Candid Placeholder"
            className="w-[200px] h-[250px] bottom-[5%] left-[5%] z-30 rotate-[-8deg]"
            scrollYProgress={scrollYProgress}
            yOffset={[-50, 100]} 
          />
        </div>

      </div>
    </section>
  );
};

export default AboutMe;