// src/components/Skills.tsx
import { motion, type Variants } from 'framer-motion';

const Skills = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4 } }
  };

  const skillsList = [
    "React & Next.js", "TypeScript", "Node & Express", "PostgreSQL",
    "AWS & Docker", "GraphQL", "Framer Motion", "Tailwind CSS"
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center py-32 px-6 bg-[#0a0a0a]">
      <div className="w-full max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-black uppercase mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-600"
        >
          System <span className="text-orange-500">Arsenal</span>
        </motion.h2>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
           {skillsList.map((skill, i) => (
             <motion.div 
               key={i} 
               variants={item}
               whileHover={{ scale: 1.05, y: -5 }}
               className="h-32 md:h-40 bg-neutral-900 border border-white/5 rounded-2xl flex items-center justify-center group hover:border-orange-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] transition-all duration-300 cursor-default"
             >
               <span className="text-neutral-400 font-bold tracking-wide text-sm md:text-lg group-hover:text-orange-400 transition-colors duration-300">
                 {skill}
               </span>
             </motion.div>
           ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;