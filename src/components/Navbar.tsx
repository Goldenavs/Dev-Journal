// src/components/Navbar.tsx
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// AnimatedLink now accepts an onClick handler so the parent can manage the routing logic
const AnimatedLink = ({ 
  title, 
  href, 
  isActive, 
  onClick 
}: { 
  title: string, 
  href: string, 
  isActive: boolean,
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void 
}) => {
  return (
    <a 
      href={href} 
      onClick={(e) => onClick(e, href)}
      className="font-orbitron relative overflow-hidden group cursor-pointer text-sm font-bold uppercase tracking-widest text-neutral-400 block"
    >
      <span className={`block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isActive ? '-translate-y-full' : 'group-hover:-translate-y-full'}`}>
        {title}
      </span>
      <span className={`absolute inset-0 block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] text-orange-500 ${isActive ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}>
        {title}
      </span>
    </a>
  );
};

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  
  // THE SCROLL LOCK REFS
  // isClickScrolling acts as our blindfold. scrollTimeout determines when we stopped moving.
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const links = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Achievements', href: '#achievements', id: 'achievements' },
    { name: 'Fun Facts', href: '#others', id: 'others' },
  ];

  // --- THE NEW SCROLL HANDLER ---
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetHref: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetHref);
    
    if (targetElement) {
      // 1. Immediately highlight the target destination so there's no delay
      const sectionId = targetHref.replace('#', '');
      setActiveSection(sectionId);
      
      // 2. Put the blindfold on the scroll spy
      isClickScrolling.current = true;
      
      // 3. Execute the smooth scroll
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- THE UPGRADED SCROLL SPY ENGINE ---
  useEffect(() => {
    const handleScrollSpy = () => {
      // Reset our "stopped scrolling" timer every time a micro-scroll happens
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      // If the scroll stops for 100ms, assume we reached the destination and take the blindfold off
      scrollTimeout.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 100);

      // If the blindfold is on (because we clicked a link), ignore the rest of this function
      if (isClickScrolling.current) return;

      const sections = ['hero', ...links.map(link => link.id), 'contact'];
      let currentSection = 'hero';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); 

    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-center px-4 md:px-8 py-6 pointer-events-none"
    >
      <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 rounded-full px-6 py-4 shadow-[0_10px_40px_rgba(249,115,22,0.05)] transition-all duration-500 hover:border-white/10 hover:shadow-[0_10px_40px_rgba(249,115,22,0.1)]">
        
        {/* Bulletproof Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          className="font-montserrat relative overflow-hidden text-xl font-black tracking-tighter uppercase group block"
        >
          <span className={`block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${activeSection === 'hero' ? '-translate-y-full text-white' : 'group-hover:-translate-y-full text-white'}`}>
            Dev<span className="text-orange-500"> Journal</span>
          </span>
          <span className={`absolute inset-0 block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${activeSection === 'hero' ? 'translate-y-0 text-orange-500' : 'translate-y-full group-hover:translate-y-0 text-orange-500'}`}>
            JM<span className="text-white"> Nave</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <AnimatedLink 
              key={link.name} 
              title={link.name} 
              href={link.href} 
              isActive={activeSection === link.id} 
              onClick={handleNavClick}
            />
          ))}
        </div>

        {/* Let's Talk Button */}
        <a 
          href="#contact" 
          onClick={(e) => handleNavClick(e, '#contact')}
          className={`font-orbitron group relative overflow-hidden px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs transition-all duration-300 block ${activeSection === 'contact' ? 'bg-white text-orange-500 scale-105' : 'bg-orange-500 text-black hover:scale-105'}`}
        >
          <span className={`absolute inset-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${activeSection === 'contact' ? 'bg-white scale-100' : 'bg-white scale-0 group-hover:scale-100'}`}></span>
          
          <span className="relative z-10 flex items-center gap-2">
            <span>Let's Talk</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ease-out ${activeSection === 'contact' ? 'translate-x-1.5' : 'group-hover:translate-x-1.5'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </a>
        
      </div>
    </motion.nav>
  );
};

export default Navbar;