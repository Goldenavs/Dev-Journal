import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Terminal, Cpu, Layout, Database, Wrench, Trophy, ChevronRight } from 'lucide-react';

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
      className="font-orbitron inline-block cursor-crosshair"
      onMouseEnter={() => triggerOnHover && setIsHovered(true)}
      onMouseLeave={() => triggerOnHover && setIsHovered(false)}
    >
      {displayText || text}
    </span>
  );
};

const SKILL_CATEGORIES = [
  {
    title: "Core Executables",
    icon: <Cpu className="w-5 h-5 text-[#ff5500]" />,
    skills: [
      { name: "C", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", url: "https://devdocs.io/c/" },
      { name: "C++", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", url: "https://cplusplus.com/" },
      { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", url: "https://docs.python.org/3/" },
      { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", url: "https://www.typescriptlang.org/docs/" },
      { name: "C#", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", url: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
    ]
  },
  {
    title: "Client Interfaces",
    icon: <Layout className="w-5 h-5 text-[#ff5500]" />,
    skills: [
      { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://react.dev/" },
      { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", url: "https://nextjs.org/docs" },
      { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg", url: "https://tailwindcss.com/docs" },
      { name: "Flutter", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", url: "https://docs.flutter.dev/" },
      { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", url: "https://help.figma.com/" },
    ]
  },
  {
    title: "Server & Data Processing",
    icon: <Database className="w-5 h-5 text-[#ff5500]" />,
    skills: [
      { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", url: "https://nodejs.org/en/docs/" },
      { name: "FastAPI", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", url: "https://fastapi.tiangolo.com/" },
      { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", url: "https://www.postgresql.org/docs/" },
      { name: "PyTorch", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", url: "https://pytorch.org/docs/stable/index.html" },
      { name: "TensorFlow", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", url: "https://www.tensorflow.org/api_docs" },
    ]
  },
  {
    title: "System Environments",
    icon: <Wrench className="w-5 h-5 text-[#ff5500]" />,
    skills: [
      { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", url: "https://git-scm.com/doc" },
      { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", url: "https://docs.github.com/" },
      { name: "Firebase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", url: "https://firebase.google.com/docs" },
      { name: "VS Code", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", url: "https://code.visualstudio.com/docs" },
      { name: "Android Studio", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg", url: "https://developer.android.com/studio/intro" },
    ]
  }
];

// UPGRADE: Added blur filters for that camera-lens focus effect on scroll
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.8, filter: "blur(10px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    filter: "blur(0px)", 
    transition: { type: "spring", stiffness: 200, damping: 20 } 
  }
};

const Skills = () => {
  return (
    <section id="skills" className="relative min-h-screen bg-black/40 backdrop-blur-[4px] pt-32 pb-24 px-6 md:px-20 overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.3 }} // UPGRADE: Triggers in and out
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#ff5500]" />
            <span className="font-orbitron text-[#ff5500] tracking-[0.3em] uppercase text-sm">
              <HackerText text="SYSTEM_CAPABILITIES" />
            </span>
          </div>
          
          {/* UPGRADE: Seamless group hover effect across the entire phrase! */}
          <h2 className="font-montserrat group text-5xl md:text-7xl font-black uppercase tracking-tighter cursor-default flex flex-wrap gap-x-4 items-center">
            <span className="text-white group-hover:text-[#ff5500] transition-colors duration-500 drop-shadow-lg">Skills &</span>
            
            <span className="relative inline-block pr-4">
              {/* This fades OUT on hover */}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-500 to-neutral-800 transition-opacity duration-500 group-hover:opacity-0">
                Arsenal
              </span>
              {/* This fades IN on hover perfectly aligned */}
              <span className="absolute left-0 top-0 text-[#ff5500] opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-[0_0_15px_rgba(255,85,0,0.5)] pr-4 pointer-events-none">
                Arsenal
              </span>
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILL_CATEGORIES.map((category, idx) => (
              <motion.div 
                key={idx}
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.1 }} // Animates out when scrolled away
                className="bg-black/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                  {category.icon}
                  <h3 className="font-orbitron text-white uppercase tracking-widest text-sm">{category.title}</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {category.skills.map((skill, sIdx) => (
                    <motion.a 
                      key={sIdx}
                      variants={itemVariants}
                      href={skill.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[#ff5500] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                        <img 
                          src={skill.src} 
                          alt={skill.name} 
                          className="w-full h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 relative z-10"
                        />
                      </div>
                      <span className="font-orbitron text-neutral-500 text-[10px] uppercase tracking-wider group-hover:text-[#ff5500] transition-colors text-center">
                        {skill.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* UPGRADE: Slides in heavily from the right side, unfocusing blur */}
          <motion.div 
            initial={{ opacity: 0, x: 100, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="lg:col-span-4 h-full"
          >
            <div className="h-full bg-black/60 backdrop-blur-md border border-[#ff5500]/20 rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden group">
              
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#ff5500]/50 shadow-[0_0_15px_#ff5500] animate-[scan_3s_ease-in-out_infinite]" />

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-[#ff5500]" />
                  <span className="font-orbitron text-[#ff5500] text-xs uppercase tracking-widest animate-pulse">Running Execution...</span>
                </div>
                <Trophy className="w-6 h-6 text-neutral-600 group-hover:text-[#ff5500] transition-colors duration-500" />
              </div>

              <h3 className="font-montserrat text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none group-hover:text-[#ff5500] transition-colors duration-500">
                Algorithmic <br /> Warfare
              </h3>
              
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Beyond building applications, I thrive in high-pressure algorithmic problem-solving. Extensive background in competitive programming utilizing C and C++ to optimize execution time and memory complexity.
              </p>

              {/* UPGRADE: Changed from fixed height to flex-1! It now stretches dynamically to fill the gap. */}
              <div className="w-full flex-1 min-h-[150px] md:min-h-[200px] rounded-xl overflow-hidden mb-8 border border-white/10 relative">
                <div className="absolute inset-0 bg-[#ff5500]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                <img 
                  src="/code-1.png" 
                  alt="Algorithmic Code Matrix" 
                  className="w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
              </div>

              <div className="font-orbitron mt-auto bg-black/80 rounded-lg p-4 text-xs text-neutral-500 space-y-2 border border-white/5 shadow-inner shrink-0">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-[#ff5500]" />
                  <span>Compiling logic... <span className="text-green-500">SUCCESS</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-[#ff5500]" />
                  <span>Optimizing Big O... <span className="text-[#ff5500] drop-shadow-[0_0_8px_rgba(255,85,0,0.8)]">O(log n)</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-[#ff5500]" />
                  <span>Status: <span className="text-white">TOP CODER</span></span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Skills;