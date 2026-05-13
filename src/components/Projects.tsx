// src/components/Projects.tsx
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, ArrowRight, Code2, Cpu, Zap, Terminal } from 'lucide-react';

// Custom Github Icon
const GithubIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

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
      className="font-orbitron inline-block cursor-default"
      onMouseEnter={() => triggerOnHover && setIsHovered(true)}
      onMouseLeave={() => triggerOnHover && setIsHovered(false)}
    >
      {displayText || text}
    </span>
  );
};

// DYNAMIC DATA
const PROJECTS = [
  {
    id: "01",
    title: "GesturiX",
    tagline: "Sign Language Learning Companion",
    role: ["Lead Developer", "Frontend Designer"],
    year: "2024",
    images: [
      "/proj-1-1.jpg",
      "/proj-1-2.jpg",
      "/proj-1-3.jpg",
      "/proj-1-4.jpg",
      "/proj-1-5.jpg",
      "/proj-1-6.jpg",
      "/proj-1-7.jpg",
      "/proj-1-8.jpg",
    ],
    links: { github: "https://github.com/Goldenavs/GesturiX", live: "#" }, 
    description: "A modern educational tool that uses real-time AI computer vision to translate and teach sign language interactively to make learning accessible.",
    techStack: ["React Native", "FastAPI", "MediaPipe", "PyTorch", "Supabase"],
    features: ["Real-time gesture detection", "Video learning modules", "Custom profiles"],
    architecture: "React Native frontend interfacing with a Python/FastAPI backend running Google MediaPipe & PyTorch for deep learning inference.",
  },
  {
    id: "02",
    title: "TuklaScope",
    tagline: "AI-Powered Holistic Discovery",
    role: ["Full-Stack", "AI Integration"],
    year: "2024",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607252654015-504cb8470a10?q=80&w=600&auto=format&fit=crop"
    ],
    links: { github: "https://github.com/Goldenavs/Tuklascope", live: "https://tuklascope-demo.com" },
    description: "An educational app transforming everyday environments into interactive classrooms using a multi-layered AI object detection architecture.",
    techStack: ["Flutter", "Dart", "FastAPI", "Gemini API", "PostgreSQL", "Google Vision"],
    features: ["Interdisciplinary scanning", "Dynamic skill tree", "Conversational AI Tutor"],
    architecture: "Flutter frontend orchestrated by FastAPI, utilizing Google Vision for object detection and Gemini for context-aware localized tutoring.",
  },
  {
    id: "03",
    title: "CampuSee",
    tagline: "Student-Exclusive Digital Hub",
    role: ["Backend Developer", "Database Design"],
    year: "2024",
    images: [
      "/proj-3-1.jpg",
      "/proj-3-2.jpg",
      "/proj-3-3.jpg",
      "/proj-3-4.jpg",
      "/proj-3-5.jpg",
      "/proj-3-6.jpg",
    ],
    links: { github: "https://github.com/Goldenavs/CampuSee", live: "" },
    description: "A secure networking platform designed specifically for university students to share resources, find lost items, and collaborate efficiently.",
    techStack: ["React Native", "Expo", "TypeScript", "Supabase"],
    features: ["Categorized campus feed", "Real-time notifications", "Resource exchange"],
    architecture: "Serverless mobile architecture leveraging Supabase for rapid database provisioning, authentication, and real-time data subscriptions.",
  }
];

const Projects = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 250, damping: 30, mass: 0.5 });
  
  const totalSlides = PROJECTS.length + 1;
  const x = useTransform(smoothProgress, [0, 1], ["0%", `-${(totalSlides - 1) * (100 / totalSlides)}%`]);

  return (
    <section ref={targetRef} className="relative bg-black/40 backdrop-blur-[4px]" style={{ height: `${totalSlides * 100}vh` }}>
      
      {/* CSS For Infinite Mobile Carousel */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          display: flex;
          width: max-content;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Progress Bar (Bottom) */}
        <div className="absolute bottom-8 md:bottom-10 left-6 md:left-12 flex items-center gap-6 z-50 mix-blend-difference pointer-events-none">
           <span className="font-orbitron text-white text-xs uppercase tracking-[0.3em]">Projects</span>
           <div className="w-32 md:w-64 h-[1px] bg-white/20 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#ff5500] shadow-[0_0_10px_#ff5500]" 
                style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
              />
           </div>
        </div>

        {/* The Sliding Track */}
        <motion.div style={{ x, width: `${totalSlides * 100}vw` }} className="flex h-full">
          
          {/* MAP THROUGH PROJECTS */}
          {PROJECTS.map((project) => (
            <div key={project.id} className="w-[100vw] h-screen flex flex-col justify-center shrink-0 px-6 md:px-20 pt-24 md:pt-32 pb-24 relative">
              
              <div className="w-full max-w-[90rem] mx-auto z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
                
                {/* LEFT: Typography & Core Info */}
                <div className="w-full md:w-5/12 flex flex-col justify-center relative z-20">
                  
                  <div 
                    className="font-orbitron absolute -top-10 -left-10 text-[15rem] md:text-[20rem] font-black pointer-events-none select-none z-[-1]"
                    style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.05)', color: 'transparent' }}
                  >
                    {project.id}
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <span className="font-orbitron text-[#ff5500] text-sm tracking-widest px-3 py-1 border border-[#ff5500]/30 bg-[#ff5500]/10 rounded-full">
                      {project.year}
                    </span>
                    <div className="flex gap-2">
                      {project.role.map(r => (
                        <span key={r} className="font-orbitron text-neutral-300 text-xs uppercase tracking-wider hidden md:flex items-center hover:text-[#ff5500] transition-colors">
                          [<HackerText text={r} triggerOnHover={true} />]
                        </span>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="font-montserrat text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-2 leading-[0.85] drop-shadow-2xl hover:text-[#ff5500] hover:translate-x-4 transition-all duration-500 cursor-default"
                  >
                    {project.title}
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="text-neutral-400 text-lg md:text-2xl font-light tracking-wide mb-6 border-l-2 border-[#ff5500] pl-4 mt-6 py-2 rounded-r-lg hover:border-l-8 hover:pl-6 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-default"
                  >
                    {project.tagline}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    className="flex flex-wrap items-center gap-6 mt-8"
                  >
                    {/* Repository Button */}
                    {project.links.github && project.links.github !== "#" && (
                      <a href={project.links.github} target="_blank" rel="noreferrer" className="group/btn flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover/btn:border-[#ff5500] group-hover/btn:bg-[#ff5500]/20 transition-all duration-300">
                          <GithubIcon className="w-5 h-5 text-white group-hover/btn:text-[#ff5500]" />
                        </div>
                        <span className="font-orbitron text-white text-xs uppercase tracking-widest group-hover/btn:text-[#ff5500] transition-colors">Repository</span>
                      </a>
                    )}
                    
                    {/* Dynamic Live Demo Button */}
                    {project.links.live && project.links.live !== "#" && (
                      <a href={project.links.live} target="_blank" rel="noreferrer" className="group/btn flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover/btn:bg-[#ff5500] transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                          <ExternalLink className="w-5 h-5 text-black" />
                        </div>
                        <span className="font-orbitron text-white text-xs uppercase tracking-widest group-hover/btn:text-[#ff5500] transition-colors">Live Demo</span>
                      </a>
                    )}
                  </motion.div>
                </div>
                
                {/* RIGHT: Pure Invisible Container */}
                <div className="w-full md:w-7/12 h-[45vh] md:h-[65vh] relative group overflow-hidden">
                  
                  {/* --- MASKED Auto-scrolling Mobile Screens Carousel --- */}
                  <div className="absolute inset-0 w-full flex items-center group-hover:blur-[10px] group-hover:opacity-20 transition-all duration-700 ease-out z-0 [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">
                    <div className="animate-marquee gap-6 pr-6 pl-6">
                      {[...project.images, ...project.images].map((img, i) => (
                        <div 
                          key={i} 
                          className="w-[160px] md:w-[220px] aspect-[9/19] rounded-xl p-[4px] bg-[#1a1a1a]/80 backdrop-blur-sm shrink-0 shadow-2xl relative shadow-black/50 border border-white/10"
                        >
                          <div className="w-full h-full rounded-lg overflow-hidden bg-black">
                            <img src={img} alt={`App screen ${i}`} className="w-full h-full object-cover opacity-80" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* --- THE VAULT: Hidden on default, appears on hover --- */}
                  <div className="absolute inset-0 p-6 md:p-12 flex flex-col items-center justify-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-10 pointer-events-none group-hover:pointer-events-auto">
                    
                    <div className="w-full max-w-2xl bg-black/70 backdrop-blur-3xl p-6 md:p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-y-auto max-h-full scrollbar-hide">
                      <div className="flex items-center gap-2 mb-4 text-[#ff5500]">
                        <Code2 className="w-5 h-5" />
                        <h3 className="font-orbitron text-sm uppercase tracking-widest">Project Brief</h3>
                      </div>
                      
                      <p className="text-neutral-200 text-sm md:text-base leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 border-y border-white/10 py-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3 text-white/50">
                            <Zap className="w-4 h-4" />
                            <span className="font-orbitron text-xs uppercase tracking-wider">Key Features</span>
                          </div>
                          <ul className="space-y-2">
                            {project.features.map((feat, i) => (
                              <li key={i} className="text-white text-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-[#ff5500] rounded-full shrink-0 shadow-[0_0_8px_#ff5500]" />
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3 text-white/50">
                            <Cpu className="w-4 h-4" />
                            <span className="font-orbitron text-xs uppercase tracking-wider">Architecture</span>
                          </div>
                          <p className="text-white text-sm leading-relaxed">
                            {project.architecture}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="font-orbitron px-3 py-1 bg-white/5 border border-white/10 rounded-md text-white/80 text-xs hover:bg-[#ff5500]/20 hover:border-[#ff5500]/50 hover:text-[#ff5500] transition-colors cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* FINAL SLIDE: THE HACKER CTA */}
          <div className="w-[100vw] h-screen flex flex-col items-center justify-center shrink-0 px-6 pt-24 md:pt-32 pb-24 relative bg-black/60 backdrop-blur-sm">
            
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            
            <div className="z-10 relative w-full max-w-5xl mx-auto flex flex-col items-center text-center">

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex items-center gap-4 bg-black/50 px-6 py-2 rounded-full border border-[#ff5500]/30 shadow-[0_0_15px_rgba(255,85,0,0.2)]"
              >
                <Terminal className="w-4 h-4 text-[#ff5500]" />
                <span className="font-orbitron text-[#ff5500] tracking-[0.2em] uppercase text-xs md:text-sm">
                  <HackerText text="/// ROOT_ACCESS_GRANTED : JOHN MICHAEL NAVE" />
                </span>
              </motion.div>

              {/* FIXED: Reduced font sizes from 6xl/9rem to 5xl/7rem for a cleaner layout */}
              <motion.h2 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="font-montserrat text-5xl md:text-[7rem] font-black uppercase tracking-tighter text-white leading-[0.85] mb-12 drop-shadow-2xl relative z-10"
              >
                ACCESS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600 pr-4">
                  ARCHIVES
                </span>
              </motion.h2>

              <motion.a 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                href="https://github.com/Goldenavs" target="_blank" rel="noreferrer" className="group relative inline-flex items-center justify-center z-30"
              >
                <div className="absolute inset-0 bg-[#ff5500] rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-500" />
                
                <div className="relative bg-[#ff5500] hover:bg-white text-black px-10 py-5 rounded-full flex items-center gap-4 transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(255,85,0,0.3)] group-hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]">
                  <GithubIcon className="w-6 h-6" />
                  <span className="font-orbitron font-black uppercase tracking-[0.2em] text-sm mt-0.5">My GitHub</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </motion.a>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Projects;