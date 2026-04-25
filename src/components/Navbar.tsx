// src/components/Navbar.tsx
import { motion } from 'framer-motion';

const Navbar = () => {
  const links = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-[#0a0a0a]/70 border-b border-white/10"
    >
      <a href="#hero" className="text-xl font-bold tracking-tighter uppercase cursor-pointer">
        Dev<span className="text-neutral-500">Journal.</span>
      </a>
      <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
        {links.map((link) => (
          <a key={link.name} href={link.href} className="hover:text-white transition-colors">
            {link.name}
          </a>
        ))}
      </div>
      <a href="#contact" className="px-5 py-2.5 text-sm font-semibold bg-white text-black rounded-full hover:bg-neutral-200 transition-colors">
        Let's Talk
      </a>
    </motion.nav>
  );
};

export default Navbar;