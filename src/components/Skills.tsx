// src/components/Skills.tsx (Use similar structure for Achievements, Others, Contact)
import { motion } from 'framer-motion';

const Skills = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }} // Triggers slightly before it hits center
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl"
      >
        <h2 className="text-6xl font-bold uppercase mb-12 border-b border-neutral-800 pb-4">System Arsenal</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {/* Skeleton Skill Boxes */}
           {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
             <div key={i} className="h-32 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center">
               <span className="text-neutral-500 font-mono">Skill {i}</span>
             </div>
           ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;