// src/components/Background.tsx
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- 1. The Upgraded Spotlight Engine ---
  // We dropped the mass to 0.1 and jacked up the stiffness. 
  // This removes the "laggy" drag but keeps the buttery smooth interpolation.
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // --- 2. The Neural Matrix Engine (HTML5 Canvas) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      // 400px offset because the new gradient orb is 800x800 wide
      mouseX.set(e.clientX - 400);
      mouseY.set(e.clientY - 400);
      
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Forcefield Repulsion
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const forceX = (dx / distance) * force * 3;
          const forceY = (dy / distance) * force * 3;
          
          this.x -= forceX;
          this.y -= forceY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Particles are a subtle grey by default
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; 
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000);
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            
            // --- THE LIVE WIRE UPGRADE ---
            // Calculate how close this line is to the mouse cursor
            const mouseDist = Math.sqrt(Math.pow(mouse.x - particles[i].x, 2) + Math.pow(mouse.y - particles[i].y, 2));
            
            if (mouseDist < 250) {
              // Lines light up neon orange when near the spotlight
              ctx.strokeStyle = `rgba(249, 115, 22, ${0.6 - distance / 200})`;
              ctx.lineWidth = 1.5;
            } else {
              // Standard ghost-white lines in the background
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1200})`;
              ctx.lineWidth = 1;
            }

            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
      {/* 1. The Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* 2. The Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-screen" 
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
      />
      
      {/* 3. The Flawless Radial Gradient Spotlight */}
      <motion.div
        style={{ 
          x: smoothX, 
          y: smoothY,
          // Replaced CSS Blur with a mathematically perfect GPU radial gradient
          background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.05) 30%, rgba(0,0,0,0) 70%)'
        }}
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full will-change-transform"
      />
    </div>
  );
};

export default Background;