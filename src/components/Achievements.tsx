// src/components/Achievements.tsx
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Trophy, MapPin, Calendar, Terminal, Crosshair, Award } from 'lucide-react';

const HackerText = ({ text, triggerOnHover = false }: { text: string, triggerOnHover?: boolean }) => {
  const [displayText, setDisplayText] = useState(triggerOnHover ? text : "");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (triggerOnHover && !isHovered) {
      setDisplayText(text);
      return;
    }
    
    let iteration = 0;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$><[]{}";
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((_, index) => {
          if (index < iteration) return text[index];
          return letters[Math.floor(Math.random() * letters.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3; 
    }, 30);
    return () => clearInterval(interval);
  }, [isHovered, text, triggerOnHover]);

  return (
    <span 
      className="font-orbitron inline-block cursor-default"
      onMouseEnter={() => triggerOnHover && setIsHovered(true)}
      onMouseLeave={() => triggerOnHover && setIsHovered(false)}
    >
      {displayText || text}
    </span>
  );
};

const ACHIEVEMENTS = [
  {
    id: "01",
    category: "Hackathon / Presentation",
    title: "IBPAP: Can You HackIT",
    date: "July 15, 2025",
    place: "Cebu Institute of Technology - University",
    description: "Selected as one of only 28 presentations out of 100+ entries. Led Team D4rkbyte in showcasing an application that harnesses AI to transform everyday observations into meaningful learning experiences.",
    icon: <Trophy className="w-5 h-5 md:w-6 md:h-6" />,
    images: [
      "/ach-1-1.jpg",
      "/ach-1-2.jpg",
      "/ach-1-3.jpg",
    ]
  },
  {
    id: "02",
    category: "Innovation Challenge",
    title: "CEB-i Hacks",
    date: "Oct 2025 - Jan 2026",
    place: "Mactan-Cebu International Airport",
    description: "Top 10 Finalist out of 78 teams in a grueling 6-week challenge. Designed student-led innovations aimed at reimagining how people travel to, from, and around Cebu.",
    icon: <Crosshair className="w-5 h-5 md:w-6 md:h-6" />,
    images: [
      "/ach-2-1.jpeg",
      "/ach-2-2.jpg",
      "/ach-2-3.jpg",
    ]
  },
  {
    id: "03",
    category: "Competitive Programming",
    title: "C++ CPE Challenge",
    date: "April 11, 2026",
    place: "UC Main",
    description: "Placed 2nd overall against top computer engineering participants from various schools across Region 7. Demonstrated extreme algorithmic efficiency and C++ mastery under strict time constraints.",
    icon: <Terminal className="w-5 h-5 md:w-6 md:h-6" />,
    images: [
      "/ach-3-1.jpg",
      "/ach-3-2.jpg",
    ]
  },
  {
    id: "04",
    category: "General Milestones",
    title: "Arsenal Expansion",
    date: "2024 - Present",
    place: "Various Venues & Workshops",
    description: "A continuous culmination of technical workshops, professional certifications, and notable organizational events. Focused on relentless upskilling and expanding my software engineering domains.",
    icon: <Award className="w-5 h-5 md:w-6 md:h-6" />,
    images: [
      "/ach-4-1.jpg",
      "/ach-4-2.jpg",
      "/ach-4-3.jpg",
      "/ach-4-4.jpg",
      "/ach-4-5.jpg",
      "/ach-4-6.jpg",
      "/ach-4-7.jpg",
    ]
  }
];

const ImageVault = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackpadRef = useRef<HTMLDivElement>(null);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const hasMultipleImages = images.length > 1;

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  useEffect(() => {
    if (!hasMultipleImages) return;

    const trackpad = trackpadRef.current;
    if (!trackpad) return;

    let lastScrollTime = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); 
      
      const now = new Date().getTime();
      if (now - lastScrollTime < 150) return; 
      
      if (e.deltaY > 0) nextImage();
      else prevImage();
      
      lastScrollTime = now;
    };

    trackpad.addEventListener('wheel', handleWheel, { passive: false });
    return () => trackpad.removeEventListener('wheel', handleWheel);
  }, [images.length, hasMultipleImages]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    // We only trigger swipe if it's a distinct drag, otherwise the onClick handles normal taps
    if (distance > minSwipeDistance) nextImage(); 
    else if (distance < -minSwipeDistance) prevImage(); 
    
    setTouchStart(null);
  };

  if (!images || images.length === 0) return null;

  return (
    // FIX 3: Added cursor-pointer and onClick to make the whole pill cycle images seamlessly
    <div 
      className="w-full h-full relative group overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/10 shadow-2xl bg-black/50 cursor-pointer"
      onClick={hasMultipleImages ? nextImage : undefined}
      onTouchStart={hasMultipleImages ? handleTouchStart : undefined}
      onTouchEnd={hasMultipleImages ? handleTouchEnd : undefined}
    >
      <div className="absolute inset-0 bg-[#ff5500]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        <motion.img 
          key={currentIndex}
          initial={{ opacity: 0.5, scale: 1.05, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0.5, scale: 0.95, filter: "blur(4px)" }}
          transition={{ duration: 0.2 }}
          src={images[currentIndex]} 
          alt={`Vault Image ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
        />
      </AnimatePresence>

      {/* FIX 3: Simplified the indicator to a clean, non-interfering text badge */}
      {hasMultipleImages && (
        <div 
          ref={trackpadRef}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 bg-black/80 backdrop-blur-md border border-[#ff5500]/30 px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 pointer-events-none"
        >
          <span className="font-orbitron text-[#ff5500] text-[9px] md:text-xs uppercase tracking-widest whitespace-nowrap select-none">
            <span className="hidden md:inline">Scroll / Click</span>
            <span className="md:hidden">Tap to Cycle</span>
            {' '}[{currentIndex + 1}/{images.length}]
          </span>
        </div>
      )}

    </div>
  );
};


const Achievements = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 250, damping: 30, mass: 0.5 });
  
  const totalSlides = ACHIEVEMENTS.length;
  const x = useTransform(smoothProgress, [0, 1], [`-${(totalSlides - 1) * 100}vw`, "0vw"]);

  return (
    <section id="achievements" ref={targetRef} className="relative bg-black/40 backdrop-blur-[4px]" style={{ height: `${totalSlides * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute bottom-4 md:bottom-10 right-6 md:right-12 flex flex-col items-end gap-2 z-50 mix-blend-difference pointer-events-none">
           <span className="font-orbitron text-white text-xs uppercase tracking-[0.3em]">Glory Log</span>
           <div className="w-32 md:w-64 h-[1px] bg-white/20 relative flex justify-end">
              <motion.div 
                className="absolute top-0 right-0 h-full bg-[#ff5500] shadow-[0_0_10px_#ff5500]" 
                style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
              />
           </div>
        </div>

        <motion.div style={{ x, width: `${totalSlides * 100}vw` }} className="flex flex-row-reverse h-full">
          
          {ACHIEVEMENTS.map((achievement) => (
            // FIX 1: Swapped `h-[100dvh]` to `h-full` to prevent height-jumping during scrolling
            <div key={achievement.id} className="w-[100vw] h-full flex flex-col justify-center shrink-0 px-6 md:px-20 pt-20 md:pt-32 pb-16 md:pb-24 relative">
              
              <div className="w-full max-w-[90rem] mx-auto z-10 flex flex-col md:flex-row items-center gap-4 md:gap-20 h-full min-h-0">
                
                <div className="w-full md:w-5/12 flex flex-col justify-center relative z-20 shrink-0">
                  
                  <div 
                    className="font-orbitron absolute -top-12 -left-6 md:-top-20 md:-left-10 text-[8rem] md:text-[18rem] font-black pointer-events-none select-none z-[-1] opacity-50"
                    style={{ WebkitTextStroke: '2px rgba(255, 85, 0, 0.1)', color: 'transparent' }}
                  >
                    {achievement.id}
                  </div>

                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-8">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#ff5500]/30 bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500] shrink-0">
                      {achievement.icon}
                    </div>
                    <span className="font-orbitron text-[#ff5500] text-xs md:text-sm tracking-widest uppercase line-clamp-2 md:line-clamp-none">
                      <HackerText text={achievement.category} triggerOnHover={true} />
                    </span>
                  </div>
                  
                  <h2 className="font-montserrat text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-2 md:mb-6 leading-[0.85] drop-shadow-2xl hover:text-[#ff5500] hover:translate-x-4 transition-all duration-500 cursor-default">
                    {achievement.title}
                  </h2>

                  <div className="flex flex-col gap-1.5 md:gap-3 mb-3 md:mb-8">
                    <div className="font-orbitron flex items-center gap-2 md:gap-3 text-neutral-300 text-[10px] md:text-sm uppercase tracking-wider">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-[#ff5500]" />
                      {achievement.date}
                    </div>
                    
                    {achievement.place === "Various Venues & Workshops" ? (
                      <div className="font-orbitron group flex items-center gap-2 md:gap-3 text-neutral-300 text-[10px] md:text-sm uppercase tracking-wider w-fit">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 text-[#ff5500]" />
                        <span className="border-b border-transparent">{achievement.place}</span>
                      </div>
                    ) : (
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(achievement.place)}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="font-orbitron group flex items-center gap-2 md:gap-3 text-neutral-300 text-[10px] md:text-sm uppercase tracking-wider hover:text-[#ff5500] hover:translate-x-2 transition-all duration-300 cursor-pointer w-fit"
                      >
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 text-[#ff5500]" />
                        <span className="border-b border-transparent group-hover:border-[#ff5500] transition-colors">{achievement.place}</span>
                      </a>
                    )}
                  </div>
                  
                  <p className="text-neutral-400 text-xs sm:text-sm md:text-xl font-light tracking-wide border-l-2 border-[#ff5500] pl-3 md:pl-4 py-1 md:py-2 rounded-r-lg hover:border-l-4 md:hover:border-l-8 hover:pl-4 md:hover:pl-6 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-default line-clamp-3 md:line-clamp-none">
                    {achievement.description}
                  </p>
                  
                </div>
                
                {/* FIX 2: min-h-0 prevents the flexbox from forcefully overlapping the text when screen height shrinks */}
                <div className="w-full md:w-7/12 flex-1 min-h-0 md:h-[65vh]">
                   <ImageVault images={achievement.images} />
                </div>

              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;