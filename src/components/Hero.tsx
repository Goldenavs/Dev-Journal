import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Cool background glowing effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-800/30 rounded-full blur-[120px] -z-10" />

      <div className="text-center px-6 max-w-5xl">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter uppercase leading-[0.9]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
            Creative
          </span>
          <br />
          Engineer
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light"
        >
          I build high-performance digital experiences with a focus on motion, design, and bulletproof architecture.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;