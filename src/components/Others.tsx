// src/components/Others.tsx
import { motion, type Variants } from 'framer-motion';

const Others = () => {
  // Explicitly type these as Framer Motion Variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { type: "spring", bounce: 0.4 } 
    }
  };

  return (
    <section className="py-32 px-6 bg-neutral-900/40 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">
            Fun <span className="text-orange-500">Facts</span>
          </h2>
        </div>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[1, 2, 3].map((fact) => (
            <motion.div 
              key={fact} 
              variants={item} 
              className="bg-[#0a0a0a] p-10 rounded-3xl border border-white/5 hover:border-orange-500/50 transition-colors duration-500 group relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-colors duration-500" />
              
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-800 mb-6 opacity-50 group-hover:opacity-100 transition-opacity">
                0{fact}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Random Fact</h3>
              <p className="text-neutral-400">
                I survive primarily on iced coffee and ungodly amounts of screen time. My mechanical keyboard switches are loud enough to wake the dead.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Others;