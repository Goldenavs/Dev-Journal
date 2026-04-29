import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Sparkles, Heart, Gamepad2, Shuffle, Terminal, Flame, Radar } from 'lucide-react';

// Reusable Glitch Text Component
const HackerText = ({ text, triggerOnHover = false }: { text: string, triggerOnHover?: boolean }) => {
  const [displayText, setDisplayText] = useState(triggerOnHover ? text : "");
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    const shouldTrigger = triggerOnHover ? isHovered : isInView;
    if (!shouldTrigger) {
      setDisplayText(triggerOnHover ? text : ""); 
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
      className="font-orbitron inline-block cursor-crosshair"
      onMouseEnter={() => triggerOnHover && setIsHovered(true)}
      onMouseLeave={() => triggerOnHover && setIsHovered(false)}
    >
      {displayText || text}
    </span>
  );
};

// --- HACKER LORE (FUN FACTS) ---
const INTEL_LOGS = [
  {
    id: "LOG_01",
    title: "Zero-Day Exploit",
    value: "Null Knowledge",
    description: "Entered college with absolute zero coding experience. I brute-forced my way through syntax errors and dense documentation to become a Lead Developer.",
    icon: <Terminal className="w-8 h-8 text-[#ff5500]" />,
    delay: 0.1
  },
  {
    id: "LOG_02",
    title: "Pack Dynamics",
    value: "Alpha Wolf",
    description: "Operating strictly on nonchalant alpha wolf energy. I don't panic when the production server breaks; I just howl at the moon and push a hotfix.",
    icon: <Flame className="w-8 h-8 text-[#ff5500]" />,
    delay: 0.3
  },
  {
    id: "LOG_03",
    title: "Visual Interface",
    value: "100% Cute",
    description: "Despite writing aggressive backend logic and staring at terminal windows all day, my physical UI is canonically certified as cute.",
    icon: <Sparkles className="w-8 h-8 text-[#ff5500]" />,
    delay: 0.5
  },
  {
    id: "LOG_04",
    title: "Downtime Protocols",
    value: "Gaming & Anime",
    description: "When not optimizing code execution time, I optimize my gaming backlog and binge top-tier anime. High-octane visuals fuel my UI inspirations.",
    icon: <Gamepad2 className="w-8 h-8 text-[#ff5500]" />,
    delay: 0.2
  },
  {
    id: "LOG_05",
    title: "Biological Companions",
    value: "Canines & Felines",
    description: "Fluent in both dog and cat. They act as my primary debugging rubber ducks when the compiler throws inexplicable errors.",
    icon: <Heart className="w-8 h-8 text-[#ff5500]" />,
    delay: 0.4
  },
  {
    id: "LOG_06",
    title: "Unexpected Repository",
    value: "CpE Shift",
    description: "Initially targeted other engineering branches. A slight calculation error led me to Computer Engineering, and compiling software turned out to be way more fun.",
    icon: <Shuffle className="w-8 h-8 text-[#ff5500]" />,
    delay: 0.6
  }
];

const Others = () => {
  const containerRef = useRef(null);
  
  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Massive background text moves counter to your scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section 
      id="intel" 
      ref={containerRef}
      className="relative min-h-screen bg-black/40 backdrop-blur-[4px] pt-32 pb-32 px-6 md:px-20 overflow-hidden flex flex-col items-center justify-center"
    >
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Massive Parallax Background Text */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 opacity-40"
      >
        <span 
          className="font-montserrat text-[20vw] font-black uppercase leading-none tracking-tighter"
          style={{ WebkitTextStroke: '3px rgba(255, 85, 0, 0.1)', color: 'transparent' }}
        >
          LORE
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="flex items-center gap-4 mb-4 bg-black/50 px-6 py-2 rounded-full border border-[#ff5500]/30 shadow-[0_0_15px_rgba(255,85,0,0.2)]">
            <Radar className="w-4 h-4 text-[#ff5500] animate-spin-slow" />
            <span className="font-orbitron text-[#ff5500] tracking-[0.2em] uppercase text-xs md:text-sm">
              <HackerText text="/// UNCLASSIFIED_LOGS" />
            </span>
          </div>
          
          {/* UPGRADE: The Seamless "Fun Facts" Hover effect with clipping fix */}
          <h2 className="font-montserrat group text-5xl md:text-7xl font-black uppercase tracking-tighter cursor-default flex flex-wrap gap-x-4 items-center justify-center drop-shadow-2xl">
            <span className="text-white group-hover:text-[#ff5500] transition-colors duration-500">Fun</span>
            
            {/* FIX: Added -mr-4 (negative margin) to perfectly balance the pr-4 padding! */}
            <span className="relative inline-block -mr-4">
              
              {/* White Gradient (Fades out on hover) */}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-700 transition-opacity duration-500 group-hover:opacity-0 pr-4">
                Facts
              </span>
              
              {/* Neon Orange (Fades in on hover) */}
              <span className="absolute left-0 top-0 text-[#ff5500] opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-[0_0_15px_rgba(255,85,0,0.5)] pr-4 pointer-events-none">
                Facts
              </span>
              
            </span>
          </h2>
        </motion.div>

        {/* Masonry-Style Grid for Intel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {INTEL_LOGS.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(15px)", y: 50 }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: log.delay, type: "spring", bounce: 0.4 }}
              className="relative group"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: log.delay 
                }}
                className="h-full"
              >
                <div className="h-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-[#ff5500]/50 transition-colors duration-500 shadow-2xl relative overflow-hidden flex flex-col">
                  
                  <div className="absolute inset-0 bg-[#ff5500]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                      {log.icon}
                    </div>
                    <span className="font-orbitron text-neutral-600 text-xs font-bold tracking-widest uppercase">
                      {log.id}
                    </span>
                  </div>

                  <div className="relative z-10 flex-grow">
                    <h3 className="font-montserrat text-xl font-black text-white uppercase tracking-wider mb-1 group-hover:text-[#ff5500] transition-colors duration-300">
                      {log.title}
                    </h3>
                    <div className="font-orbitron text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500 mb-4">
                      {log.value}
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed font-light">
                      {log.description}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff5500] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Others;