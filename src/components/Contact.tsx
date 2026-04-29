import { motion, useMotionValue, useSpring, useInView, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, type MouseEvent } from 'react'; // Added 'type' here!
import { Code2, MessageSquare, Terminal, Map, Radio } from 'lucide-react'; // Removed brand icons

// --- CUSTOM BRAND ICONS (Bypassing Lucide v1.0 restrictions) ---
const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);


// Custom Glitch Text Component
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

// --- CONTACT NODES PAYLOAD ---
const SOCIAL_NODES = [
  { id: "NODE_01", name: "GitHub", url: "https://github.com/Goldenavs", icon: <GithubIcon className="w-6 h-6" />, category: "Version Control" },
  { id: "NODE_02", name: "LinkedIn", url: "https://www.linkedin.com/in/john-michael-nave-967342395/", icon: <LinkedinIcon className="w-6 h-6" />, category: "Professional Net" },
  { id: "NODE_03", name: "LeetCode", url: "https://leetcode.com/u/Goldenavsss/", icon: <Code2 className="w-6 h-6" />, category: "Algorithmic Combat" },
  { id: "NODE_04", name: "Discord", url: "https://discord.com/users/546196480143392768", icon: <MessageSquare className="w-6 h-6" />, category: "Comms Hub" },
  { id: "NODE_05", name: "Instagram", url: "https://www.instagram.com/jmnavsss", icon: <InstagramIcon className="w-6 h-6" />, category: "Visual Feeds" },
  { id: "NODE_06", name: "Facebook", url: "https://www.facebook.com/jmnavsss", icon: <FacebookIcon className="w-6 h-6" />, category: "Legacy Net" },
];

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Mouse tracking for the Interactive Topography
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth trailing effect
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Convert the spring values into a CSS string for the interactive background
  const backgroundStyle = useTransform(
    [springX, springY],
    ([x, y]) => `
      radial-gradient(circle at ${x}px ${y}px, rgba(255, 85, 0, 0.15) 0%, transparent 40%),
      repeating-radial-gradient(circle at ${x}px ${y}px, transparent 0, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 41px)
    `
  );

  return (
    <section 
      id="contact" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#030303] overflow-hidden flex flex-col justify-center pt-32 pb-24 px-6 md:px-20 cursor-crosshair"
    >
      
      {/* THE INTERACTIVE TOPOGRAPHIC FIELD */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-80"
        style={{ background: backgroundStyle }}
      />
      
      {/* Static Grid Overlay to maintain the hacker aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* LEFT: Massive Typography & Directives */}
        <div className="w-full lg:w-5/12 flex flex-col">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="p-2 bg-white/5 border border-[#ff5500]/30 rounded-lg">
              <Radio className="w-5 h-5 text-[#ff5500] animate-pulse" />
            </div>
            <span className="font-orbitron text-[#ff5500] tracking-[0.3em] uppercase text-sm">
              <HackerText text="ESTABLISH_CONNECTION" />
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-montserrat text-6xl md:text-[6rem] font-black uppercase tracking-tighter text-white mb-8 leading-[0.85] drop-shadow-2xl"
          >
            Ping The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-700 pr-4">Network</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-neutral-400 text-lg md:text-xl font-light tracking-wide border-l-2 border-[#ff5500] pl-6 py-2 mb-12"
          >
            My coordinates are constantly shifting across the digital frontier. Execute a handshake request through any of the active nodes to establish direct comms.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="font-orbitron flex items-center gap-4 text-neutral-500 text-xs uppercase tracking-widest"
          >
            <Map className="w-4 h-4" />
            <span>Terminal Location: Talisay, Central Visayas, PH</span>
          </motion.div>
        </div>

        {/* RIGHT: The Node Grid */}
        <div className="w-full lg:w-7/12 relative">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {SOCIAL_NODES.map((node, i) => (
              <motion.a
                key={node.id}
                href={node.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 200 }}
                className="group relative bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col overflow-hidden transition-all duration-500 hover:border-[#ff5500]/50 hover:bg-black/80 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,85,0,0.1)]"
              >
                {/* Active Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff5500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:text-[#ff5500] group-hover:border-[#ff5500]/30 transition-colors duration-500">
                    {node.icon}
                  </div>
                  <span className="font-orbitron text-neutral-600 text-[10px] font-bold tracking-widest uppercase">
                    {node.id}
                  </span>
                </div>

                <div className="relative z-10 mt-auto">
                  <p className="font-orbitron text-[#ff5500] text-xs tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                    [{node.category}]
                  </p>
                  <h3 className="font-montserrat text-2xl font-black text-white uppercase tracking-wider group-hover:text-[#ff5500] transition-colors duration-300">
                    {node.name}
                  </h3>
                </div>

                {/* Laser line effect */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff5500] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left ease-out" />
              </motion.a>
            ))}
          </div>

        </div>

      </div>
      
      {/* FINAL FOOTER / COPYRIGHT */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-6 md:px-20 flex justify-between items-center z-10"
      >
        <span className="font-orbitron text-neutral-600 text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} John Michael Nave
        </span>
        <div className="font-orbitron flex items-center gap-2 text-neutral-600 text-[10px] uppercase tracking-widest">
          <Terminal className="w-3 h-3" />
          <span>System_Online</span>
        </div>
      </motion.div>

    </section>
  );
};

export default Contact;