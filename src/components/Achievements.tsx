import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Trophy, MapPin, Calendar, Terminal, Crosshair, Award, ChevronUp, ChevronDown } from 'lucide-react';

// Glitch Text Component
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

// --- DATA PAYLOAD (Now with varying amounts of images to test the dynamic logic!) ---
const ACHIEVEMENTS = [
  {
    id: "01",
    category: "Hackathon / Presentation",
    title: "IBPAP: Can You HackIT",
    date: "July 15, 2025",
    place: "Cebu Institute of Technology - University",
    description: "Selected as one of only 28 presentations out of 100+ entries. Led Team D4rkbyte in showcasing an application that harnesses AI to transform everyday observations into meaningful learning experiences.",
    icon: <Trophy className="w-6 h-6" />,
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
    icon: <Crosshair className="w-6 h-6" />,
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
    icon: <Terminal className="w-6 h-6" />,
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
    icon: <Award className="w-6 h-6" />,
    images: [
      "/ach-4-1.jpg",
      "/ach-4-2.jpg",
      "/ach-4-3.jpg",
      "/ach-4-4.jpg",
      "/ach-4-5.jpg",
      "/ach-4-6.jpg",
    ]
  }
];

// --- UPGRADED CAROUSEL COMPONENT ---
const ImageVault = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackpadRef = useRef<HTMLDivElement>(null);

  // Dynamic Logic: Determine if we actually need a carousel
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    // If there's only 1 image, don't bother attaching the scroll listener!
    if (!hasMultipleImages) return;

    const trackpad = trackpadRef.current;
    if (!trackpad) return;

    let lastScrollTime = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); 
      
      const now = new Date().getTime();
      if (now - lastScrollTime < 150) return; 
      
      if (e.deltaY > 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      
      lastScrollTime = now;
    };

    trackpad.addEventListener('wheel', handleWheel, { passive: false });
    return () => trackpad.removeEventListener('wheel', handleWheel);
  }, [images.length, hasMultipleImages]);

  // Fallback if somehow 0 images are passed
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full h-full relative group overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/10 shadow-2xl bg-black/50">
      
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

      {/* FIXED: Conditionally render the scroll trackpad ONLY if there are 2 or more images */}
      {hasMultipleImages && (
        <div 
          ref={trackpadRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 bg-black/80 backdrop-blur-md border border-[#ff5500]/30 hover:border-[#ff5500] px-6 py-3 rounded-full flex items-center gap-4 cursor-ns-resize shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(255,85,0,0.4)] transition-all duration-300"
        >
          <div className="flex flex-col items-center gap-0.5 opacity-70">
            <ChevronUp className="w-3 h-3 text-[#ff5500]" />
            <ChevronDown className="w-3 h-3 text-[#ff5500]" />
          </div>
          <span className="font-orbitron text-[#ff5500] text-xs uppercase tracking-widest whitespace-nowrap">
            Hover & Scroll [{currentIndex + 1}/{images.length}]
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
        
        <div className="absolute bottom-8 md:bottom-10 right-6 md:right-12 flex flex-col items-end gap-2 z-50 mix-blend-difference pointer-events-none">
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
            <div key={achievement.id} className="w-[100vw] h-screen flex flex-col justify-center shrink-0 px-6 md:px-20 pt-24 md:pt-32 pb-24 relative">
              
              <div className="w-full max-w-[90rem] mx-auto z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20 h-full">
                
                <div className="w-full md:w-5/12 flex flex-col justify-center relative z-20">
                  
                  <div 
                    className="font-orbitron absolute -top-20 -left-10 text-[12rem] md:text-[18rem] font-black pointer-events-none select-none z-[-1] opacity-50"
                    style={{ WebkitTextStroke: '2px rgba(255, 85, 0, 0.1)', color: 'transparent' }}
                  >
                    {achievement.id}
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full border border-[#ff5500]/30 bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500]">
                      {achievement.icon}
                    </div>
                    <span className="font-orbitron text-[#ff5500] text-sm tracking-widest uppercase">
                      <HackerText text={achievement.category} triggerOnHover={true} />
                    </span>
                  </div>
                  
                  <h2 className="font-montserrat text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.85] drop-shadow-2xl hover:text-[#ff5500] hover:translate-x-4 transition-all duration-500 cursor-default">
                    {achievement.title}
                  </h2>

                  <div className="flex flex-col gap-3 mb-8">
                    <div className="font-orbitron flex items-center gap-3 text-neutral-300 text-sm uppercase tracking-wider">
                      <Calendar className="w-4 h-4 text-[#ff5500]" />
                      {achievement.date}
                    </div>
                    
                    {achievement.place === "Various Venues & Workshops" ? (
                      <div className="font-orbitron group flex items-center gap-3 text-neutral-300 text-sm uppercase tracking-wider w-fit">
                        <MapPin className="w-4 h-4 text-[#ff5500]" />
                        <span className="border-b border-transparent">{achievement.place}</span>
                      </div>
                    ) : (
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(achievement.place)}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="font-orbitron group flex items-center gap-3 text-neutral-300 text-sm uppercase tracking-wider hover:text-[#ff5500] hover:translate-x-2 transition-all duration-300 cursor-pointer w-fit"
                      >
                        <MapPin className="w-4 h-4 text-[#ff5500]" />
                        <span className="border-b border-transparent group-hover:border-[#ff5500] transition-colors">{achievement.place}</span>
                      </a>
                    )}
                  </div>
                  
                  <p className="text-neutral-400 text-lg md:text-xl font-light tracking-wide border-l-2 border-[#ff5500] pl-4 py-2 rounded-r-lg hover:border-l-8 hover:pl-6 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-default">
                    {achievement.description}
                  </p>
                  
                </div>
                
                <div className="w-full md:w-7/12 h-[40vh] md:h-[65vh]">
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