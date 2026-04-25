// src/components/Projects.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Projects = () => {
  const targetRef = useRef(null);
  
  // Track scroll progress within the 300vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll (0 to 1) to horizontal movement (0% to -66%)
  // Adjust the "-66%" based on how many horizontal cards you have
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      {/* Sticky container that stays in view while we scroll past the 300vh */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <motion.div style={{ x }} className="flex gap-12 px-20 w-[300vw]">
          {/* Skeleton Project Cards */}
          <div className="w-[100vw] flex flex-col justify-center shrink-0">
            <h2 className="text-8xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600 mb-4">Project 01</h2>
            <div className="w-full max-w-3xl h-[400px] bg-neutral-800 rounded-3xl" />
          </div>
          
          <div className="w-[100vw] flex flex-col justify-center shrink-0">
            <h2 className="text-8xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600 mb-4">Project 02</h2>
            <div className="w-full max-w-3xl h-[400px] bg-neutral-800 rounded-3xl" />
          </div>

          <div className="w-[100vw] flex flex-col justify-center shrink-0">
            <h2 className="text-8xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600 mb-4">Project 03</h2>
            <div className="w-full max-w-3xl h-[400px] bg-neutral-800 rounded-3xl" />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Projects;