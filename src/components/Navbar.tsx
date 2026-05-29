// src/components/Navbar.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

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
      <span className={`block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isActive ? '-translate-y-full text-orange-500' : 'group-hover:-translate-y-full'}`}>
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const links = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Achievements', href: '#achievements', id: 'achievements' },
    { name: 'Fun Facts', href: '#others', id: 'others' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetHref: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetHref);
    
    if (targetElement) {
      const sectionId = targetHref.replace('#', '');
      setActiveSection(sectionId);
      
      isClickScrolling.current = true;
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScrollSpy = () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 100);

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
      className="fixed top-0 left-0 w-full z-50 flex flex-col items-center px-3 md:px-8 py-4 sm:py-6 pointer-events-none"
    >
      <div className="w-full max-w-7xl relative pointer-events-none">
        
        {/* Main Navbar Pill - Slimmer padding on mobile */}
        <div className="w-full flex items-center justify-between pointer-events-auto bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 rounded-full px-3 sm:px-6 py-2.5 sm:py-4 shadow-[0_10px_40px_rgba(249,115,22,0.05)] transition-all duration-500 hover:border-white/10 hover:shadow-[0_10px_40px_rgba(249,115,22,0.1)]">
          
          {/* Logo - Adjusted text size for mobile */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-montserrat relative overflow-hidden text-base sm:text-xl font-black tracking-tighter uppercase group block shrink-0"
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

          {/* Right Controls Container - Tighter gaps on mobile */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Let's Talk Button - Extremely compact on mobile, hides SVG until sm breakpoint */}
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`font-orbitron group relative overflow-hidden px-3 sm:px-8 py-2 sm:py-3 rounded-full font-black uppercase tracking-widest text-[9px] sm:text-xs transition-all duration-300 block shrink-0 ${activeSection === 'contact' ? 'bg-white text-orange-500 scale-105' : 'bg-orange-500 text-black hover:scale-105'}`}
            >
              <span className={`absolute inset-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${activeSection === 'contact' ? 'bg-white scale-100' : 'bg-white scale-0 group-hover:scale-100'}`}></span>
              
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <span>Let's Talk</span>
                {/* Icon hidden on extra small screens to save space */}
                <svg 
                  className={`hidden sm:block w-4 h-4 transition-transform duration-300 ease-out ${activeSection === 'contact' ? 'translate-x-1.5' : 'group-hover:translate-x-1.5'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>

            {/* Mobile Menu Toggle Button - Forced shrink-0 so it never clips */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-1 sm:p-2 text-neutral-400 hover:text-orange-500 transition-colors pointer-events-auto shrink-0"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-full mt-4 left-0 w-full pointer-events-auto md:hidden px-3"
            >
              <div className="bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                {links.map((link) => (
                  <div key={link.name} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <AnimatedLink 
                      title={link.name} 
                      href={link.href} 
                      isActive={activeSection === link.id} 
                      onClick={handleNavClick}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.nav>
  );
};

export default Navbar;