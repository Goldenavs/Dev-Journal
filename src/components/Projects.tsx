// src/components/Projects.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Projects = () => {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // Adjust "-66.66%" if you add or remove project cards
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#050505]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[300vw]">
          
          {[1, 2, 3].map((project) => (
            <div key={project} className="w-[100vw] h-screen flex flex-col justify-center items-center shrink-0 px-6 md:px-32 relative">
              
              {/* Massive background typography */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.02] pointer-events-none z-0">
                0{project}
              </div>
              
              <div className="w-full max-w-6xl z-10">
                <h2 className="text-5xl md:text-8xl font-black uppercase text-white mb-6 flex items-center gap-6">
                  Project <span className="text-orange-500">0{project}</span>
                </h2>
                
                {/* Project Frame */}
                <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-900 border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden group relative shadow-2xl">
                   {/* Hover Overlay */}
                   <div className="absolute inset-0 bg-orange-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-md">
                     <span className="text-black text-xl md:text-3xl font-black tracking-widest uppercase border-4 border-black px-8 py-4 rounded-full hover:bg-black hover:text-orange-500 transition-all cursor-pointer scale-90 group-hover:scale-100 duration-500">
                       Explore
                     </span>
                   </div>
                </div>
              </div>
              
            </div>
          ))}
          
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;