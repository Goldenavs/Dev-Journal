// src/components/Contact.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Contact = () => {
  const containerRef = useRef(null);
  
  // Track scroll strictly for the footer
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"] // Animation plays as the footer enters the viewport
  });

  // Choreography: Content slides up from -50% to 0% and scales from 0.8 to 1
  const y = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-orange-500 rounded-t-[3rem] md:rounded-t-[6rem]"
    >
      <motion.div style={{ y, scale, opacity }} className="text-center z-10 px-6">
        <h2 className="text-[12vw] font-black uppercase tracking-tighter text-black leading-[0.8] mb-8">
          Let's Talk
        </h2>
        <a 
          href="mailto:hello@devjournal.com" 
          className="text-2xl md:text-4xl text-black hover:text-white transition-colors duration-300 font-bold underline decoration-4 underline-offset-8"
        >
          hello@devjournal.com
        </a>
      </motion.div>

      {/* Decorative spinning background artifact */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 90]) }} 
          className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] bg-black/10 rounded-full blur-[100px]" 
        />
      </div>
      
      <div className="absolute bottom-8 left-0 w-full text-center text-black/50 font-medium text-sm">
        © {new Date().getFullYear()} DevJournal. All Rights Reserved.
      </div>
    </section>
  );
};

export default Contact;