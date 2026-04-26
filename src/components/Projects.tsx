import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, ArrowRight, Code2, Cpu, Zap, Terminal } from 'lucide-react';

// Custom Github Icon to bypass Lucide v1.0 removals
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

// UPGRADED: HackerText now supports triggering on Scroll (isInView) OR on Hover
const HackerText = ({ text, triggerOnHover = false }: { text: string, triggerOnHover?: boolean }) => {
  const [displayText, setDisplayText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  
  // Only track view state if we aren't using hover mode
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    // Determine the trigger based on mode
    const shouldTrigger = triggerOnHover ? isHovered : isInView;

    if (!shouldTrigger) {
      setDisplayText(""); // Reset immediately when trigger stops
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
      className="font-mono inline-block cursor-default"
      onMouseEnter={() => triggerOnHover && setIsHovered(true)}
      onMouseLeave={() => triggerOnHover && setIsHovered(false)}
    >
      {displayText || text}
    </span>
  );
};

const PROJECTS = [
  {
    id: "01",
    title: "GesturiX",
    tagline: "Sign Language Learning Companion",
    role: ["Lead Developer", "Frontend Designer"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", 
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
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    links: { github: "https://github.com/Goldenavs/Tuklascope", live: "#" },
    description: "An educational app transforming everyday environments into interactive classrooms using a multi-layered AI object detection architecture.",
    techStack: ["React.js", "FastAPI", "Gemini API", "PostgreSQL", "Google Vision"],
    features: ["Interdisciplinary scanning", "Dynamic skill tree", "Conversational AI Tutor"],
    architecture: "React frontend orchestrated by FastAPI, utilizing Google Vision for object detection and Gemini for context-aware localized tutoring.",
  },
  {
    id: "03",
    title: "CampuSee",
    tagline: "Student-Exclusive Digital Hub",
    role: ["Backend Developer", "Database Design"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    links: { github: "https://github.com/Goldenavs/CampuSee", live: "#" },
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
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Progress Bar (Bottom) */}
        <div className="absolute bottom-8 md:bottom-10 left-6 md:left-12 flex items-center gap-6 z-50 mix-blend-difference pointer-events-none">
           <span className="text-white font-mono text-xs uppercase tracking-[0.3em]">Projects</span>
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
                    className="absolute -top-10 -left-10 text-[15rem] md:text-[20rem] font-black pointer-events-none select-none z-[-1]"
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
                    <span className="text-[#ff5500] font-mono text-sm tracking-widest px-3 py-1 border border-[#ff5500]/30 bg-[#ff5500]/10 rounded-full">
                      {project.year}
                    </span>
                    <div className="flex gap-2">
                      {project.role.map(r => (
                        // UPGRADE APPLIED HERE: The brackets stay static, the text inside decrypts on hover!
                        <span key={r} className="text-neutral-300 font-mono text-xs uppercase tracking-wider hidden md:flex items-center hover:text-[#ff5500] transition-colors">
                          [<HackerText text={r} triggerOnHover={true} />]
                        </span>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-2 leading-[0.85] drop-shadow-2xl hover:text-[#ff5500] hover:translate-x-4 transition-all duration-500 cursor-default"
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
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="group flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:border-[#ff5500] group-hover:bg-[#ff5500]/20 transition-all duration-300">
                        <GithubIcon className="w-5 h-5 text-white group-hover:text-[#ff5500]" />
                      </div>
                      <span className="text-white font-mono text-xs uppercase tracking-widest group-hover:text-[#ff5500] transition-colors">Repository</span>
                    </a>
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="group flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:bg-[#ff5500] transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <ExternalLink className="w-5 h-5 text-black" />
                      </div>
                      <span className="text-white font-mono text-xs uppercase tracking-widest group-hover:text-[#ff5500] transition-colors">Live Demo</span>
                    </a>
                  </motion.div>
                </div>
                
                {/* RIGHT: The Vault (Image + Hover Data) */}
                <div className="w-full md:w-7/12 h-[45vh] md:h-[65vh] relative group overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/10 shadow-2xl bg-black/50">
                  
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 group-hover:opacity-10 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  
                  <div className="absolute inset-0 p-6 md:p-12 flex flex-col items-center justify-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    
                    <div className="w-full max-w-2xl bg-black/80 backdrop-blur-2xl p-6 md:p-8 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-y-auto max-h-full scrollbar-hide">
                      <div className="flex items-center gap-2 mb-4 text-[#ff5500]">
                        <Code2 className="w-5 h-5" />
                        <h3 className="font-mono text-sm uppercase tracking-widest">Project Brief</h3>
                      </div>
                      
                      <p className="text-neutral-200 text-sm md:text-base leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 border-y border-white/10 py-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3 text-white/50">
                            <Zap className="w-4 h-4" />
                            <span className="font-mono text-xs uppercase tracking-wider">Key Features</span>
                          </div>
                          <ul className="space-y-2">
                            {project.features.map((feat, i) => (
                              <li key={i} className="text-white text-sm flex items-center gap-2">
                                <div className="w-1 h-1 bg-[#ff5500] rounded-full shrink-0" />
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3 text-white/50">
                            <Cpu className="w-4 h-4" />
                            <span className="font-mono text-xs uppercase tracking-wider">Architecture</span>
                          </div>
                          <p className="text-white text-sm leading-relaxed">
                            {project.architecture}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-white/70 font-mono text-xs hover:bg-[#ff5500]/20 hover:border-[#ff5500]/50 hover:text-[#ff5500] transition-colors cursor-default">
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
            
            <div className="z-10 flex flex-col items-center text-center">
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex items-center gap-4 bg-black/50 px-6 py-2 rounded-full border border-[#ff5500]/30 shadow-[0_0_15px_rgba(255,85,0,0.2)]"
              >
                <Terminal className="w-4 h-4 text-[#ff5500]" />
                <span className="text-[#ff5500] tracking-[0.2em] uppercase text-xs md:text-sm">
                  {/* DEFAULT BEHAVIOR: Glitches when it scrolls into view */}
                  <HackerText text="/// ROOT_ACCESS_GRANTED : JOHN MICHAEL NAVE" />
                </span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-6xl md:text-[9rem] font-black uppercase tracking-tighter text-white leading-[0.85] mb-12 drop-shadow-2xl"
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
                href="https://github.com/Goldenavs" target="_blank" rel="noreferrer" className="group relative inline-flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-[#ff5500] rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-500" />
                
                <div className="relative bg-[#ff5500] hover:bg-white text-black px-10 py-5 rounded-full flex items-center gap-4 transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(255,85,0,0.3)] group-hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]">
                  <GithubIcon className="w-6 h-6" />
                  <span className="font-black uppercase tracking-[0.2em] text-sm mt-0.5">My GitHub</span>
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