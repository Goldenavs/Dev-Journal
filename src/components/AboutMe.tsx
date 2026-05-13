// src/components/AboutMe.tsx
import { motion, useScroll, useTransform, useInView, type Variants } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// --- HELPER COMPONENT: HackerText ---
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
        text.split("").map((_, index) => {
          if (index < iteration) return text[index];
          return letters[Math.floor(Math.random() * letters.length)];
        }).join("")
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

// --- HELPER COMPONENT: Architecture UI Photo Frame ---
const PhotoFrame = ({ 
  src, 
  alt, 
  className, 
  scrollYProgress, 
  yOffset,
  sysId
}: { 
  src?: string, 
  alt: string, 
  className: string,
  scrollYProgress: any,
  yOffset: number[],
  sysId: string
}) => {
  const y = useTransform(scrollYProgress, [0, 1], yOffset);

  return (
    <motion.div 
      style={{ y }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group absolute flex flex-col bg-[#050505]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] p-2 ${className}`}
    >
      {/* Structural Crosshairs (Activate on Hover) */}
      <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-orange-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-orange-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-orange-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-orange-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      {/* Schematic Top Bar */}
      <div className="flex-none flex items-center justify-between px-2 pb-2 mb-2 border-b border-white/10 w-full group-hover:border-orange-500/30 transition-colors duration-500">
        <span className="font-orbitron text-[9px] text-neutral-500 uppercase tracking-[0.2em] group-hover:text-orange-500 transition-colors">
          {sysId}
        </span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-neutral-700 group-hover:bg-orange-500 transition-colors duration-500 animate-pulse" />
          <div className="w-1.5 h-1.5 bg-neutral-800 group-hover:bg-orange-500/40 transition-colors duration-500" />
        </div>
      </div>

      {/* Image Container with Architectural Grid Overlay */}
      <div className="flex-1 w-full relative overflow-hidden rounded-sm bg-black group-hover:ring-1 ring-inset ring-orange-500/20 transition-all duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-10" />
        
        {src ? (
          <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover opacity-60 filter grayscale group-hover:grayscale-[20%] group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out z-0" />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center p-6 text-center">
            <span className="font-orbitron text-neutral-700 font-bold uppercase tracking-widest text-xs group-hover:text-orange-500/50 transition-colors duration-300">
              [ NO_SIGNAL ]
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AboutMe = () => {
  const containerRef = useRef(null);
  
  // --- EASTER EGG ENGINE ---
  const [clickCount, setClickCount] = useState(0);
  const [showWolf, setShowWolf] = useState(false);

  const handleNameClick = () => {
    if (clickCount === 0) {
      setShowWolf(true);
      setClickCount(0); 
      setTimeout(() => setShowWolf(false), 3000);
    } else {
      setClickCount((prev) => prev + 1);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // --- Cinematic Entry Focus ---
  const { scrollYProgress: enterProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 20%"] 
  });
  const sectionOpacity = useTransform(enterProgress, [0, 1], [0, 1]);
  const sectionFilter = useTransform(enterProgress, [0, 1], ["blur(20px)", "blur(0px)"]);
  const sectionScale = useTransform(enterProgress, [0, 1], [0.95, 1]);

  // --- UPGRADE: Seamless Background Transition into Projects ---
  // Starts fading in the dark background when the user is halfway through AboutMe,
  // finishing exactly as the bottom of AboutMe touches the bottom of the screen.
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["center center", "end end"] 
  });
  const matchProjectsBgOpacity = useTransform(exitProgress, [0, 1], [0, 1]);

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4, duration: 1 } }
  };

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center py-32 px-6 relative z-10">
      
      {/* SEAMLESS TRANSITION OVERLAY */}
      {/* This layer slowly materializes to perfectly match the upcoming Projects section */}
      <motion.div 
        style={{ opacity: matchProjectsBgOpacity }}
        className="absolute inset-0 bg-black/40 backdrop-blur-[4px] pointer-events-none -z-10"
      />

      {/* STYLES: Text-Clipped Shine Effect */}
      <style>{`
        @keyframes text-shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .text-shine-fx {
          background-size: 200% auto;
          color: white; 
          transition: all 0.3s ease;
        }

        .group:hover .text-shine-fx {
          background-image: linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 35%, #ff5500 50%, rgba(255,255,255,1) 65%, rgba(255,255,255,1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: text-shine 2s linear infinite;
        }
      `}</style>

      {/* Massive Professional Background Watermark */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [150, -150]) }}
        className="font-montserrat absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-black uppercase text-white/[0.02] tracking-tighter pointer-events-none -z-20 whitespace-nowrap"
      >
        ENGINEER
      </motion.div>

      {/* Cinematic focus transition wrapper */}
      <motion.div 
        style={{ opacity: sectionOpacity, filter: sectionFilter, scale: sectionScale }}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
      >
        
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
          {/* Subtitle with Hacker Glitch */}
          <motion.div variants={textVariants} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-orange-500" />
            <span className="font-orbitron text-sm font-bold uppercase tracking-[0.3em] text-orange-500 cursor-default">
              <HackerText text="FULL-STACK ENGINEER" triggerOnHover={true} />
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

            {/* Reverted Original Quote */}
            <motion.blockquote 
              variants={textVariants} 
              className="relative p-6 mt-4 border-l-2 border-orange-500 bg-gradient-to-r from-orange-500/10 to-transparent overflow-hidden group cursor-default"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:200%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] group-hover:bg-[position:-100%_0,0_0] group-hover:duration-[1500ms]" />
              <p className="relative z-10 italic text-neutral-300 font-light leading-relaxed text-base">
                "I don't have a prime, I grow and learn every day."
              </p>
            </motion.blockquote>
          </div>

          {/* UPGRADED STATS ROW - Text-based shine effects */}
          <motion.div variants={textVariants} className="mt-12 flex items-center justify-between max-w-lg">
             
             {/* Stat 1 */}
             <div className="flex flex-col items-center justify-center group cursor-default px-2">
               <span className="font-orbitron text-4xl md:text-5xl font-black text-shine-fx group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] transition-all duration-500">
                 3rd
               </span>
               <span className="font-orbitron text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 group-hover:text-orange-500 font-bold mt-2 transition-colors duration-500">Year Student</span>
             </div>
             
             <div className="w-[1px] h-12 bg-white/10" />
             
             {/* Stat 2 */}
             <div className="flex flex-col items-center justify-center group cursor-default px-2">
               <span className="font-orbitron text-4xl md:text-5xl font-black text-shine-fx group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] transition-all duration-500">
                 ∞
               </span>
               <span className="font-orbitron text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 group-hover:text-orange-500 font-bold mt-2 transition-colors duration-500">Lines of Code</span>
             </div>
             
             <div className="w-[1px] h-12 bg-white/10" />
             
             {/* Stat 3 */}
             <div className="flex flex-col items-center justify-center group cursor-default px-2">
               <span className="font-orbitron text-4xl md:text-5xl font-black text-shine-fx group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] transition-all duration-500">
                 404
               </span>
               <span className="font-orbitron text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 group-hover:text-orange-500 font-bold mt-2 transition-colors duration-500">Sleep Not Found</span>
             </div>

          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: The Kinetic Architectural Gallery */}
        <div className="relative w-full h-[600px] hidden md:block perspective-1000">
          <PhotoFrame 
            src="/me-1.jpg"
            alt="Main Portrait"
            sysId="SYS.IMG.01 // MAIN_VIEW"
            className="w-[300px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rotate-[-2deg]"
            scrollYProgress={scrollYProgress}
            yOffset={[50, -50]} 
          />
          <PhotoFrame 
            src="/me-2.jpg"
            alt="Workspace"
            sysId="SYS.IMG.02 // TACTICAL"
            className="w-[220px] h-[280px] top-[5%] right-[5%] z-10 rotate-[6deg]"
            scrollYProgress={scrollYProgress}
            yOffset={[100, -100]} 
          />
          <PhotoFrame 
            src="/me-3.jpg"
            alt="Companion"
            sysId="SYS.IMG.03 // SUPPORT"
            className="w-[200px] h-[250px] bottom-[5%] left-[5%] z-30 rotate-[-8deg]"
            scrollYProgress={scrollYProgress}
            yOffset={[-50, 100]} 
          />
        </div>

      </motion.div>
    </section>
  );
};

export default AboutMe;