// src/components/Achievements.tsx
import { motion } from 'framer-motion';

const Achievements = () => {
  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-6xl md:text-8xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 mb-20"
        >
          Milestones
        </motion.h2>

        <div className="flex flex-col gap-16 border-l-2 border-orange-500/30 pl-8 md:pl-12 relative">
          {[1, 2, 3, 4].map((item, i) => (
            <motion.div
              key={i}
              // Alternating start positions: left or right
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1, type: "spring", bounce: 0.2 }}
              className="relative"
            >
              {/* Glowing Timeline Dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-2 w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
              
              <h3 className="text-3xl font-bold text-white mb-2">Achievement 0{item}</h3>
              <p className="text-neutral-400 max-w-xl text-lg">
                Dominated the sector by delivering a massive, high-performance architecture. Scaled systems seamlessly while keeping the UI buttery smooth.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;