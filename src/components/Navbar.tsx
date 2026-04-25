import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-[#0a0a0a]/70 border-b border-white/10"
    >
      <div className="text-xl font-bold tracking-tighter uppercase">
        Dev<span className="text-neutral-500">Journal.</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
        <a href="#work" className="hover:text-white transition-colors">Work</a>
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </div>
      <button className="px-5 py-2.5 text-sm font-semibold bg-white text-black rounded-full hover:bg-neutral-200 transition-colors">
        Let's Talk
      </button>
    </motion.nav>
  );
};

export default Navbar;