'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  IconBrandPython, 
  IconBrandJavascript, 
  IconBrandReact, 
  IconBrandNextjs, 
  IconBrandTailwind, 
  IconBrandNodejs, 
  IconBrandGit, 
  IconBrandGithub, 
  IconDatabase, 
  IconBrandTypescript,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandDocker,
  IconBrandMongodb,
  IconBrandPrisma,
  IconBrandVercel,
  IconBrandFramer
} from '@tabler/icons-react';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const containerRef = useRef(null);
  const [title, setTitle] = useState('TECHNICAL ARSENAL');
  const [isRevealed, setIsRevealed] = useState(false);
  const titleInterval = useRef(null);

  // Safe fallback timeout to guarantee visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const row1 = ['Python', 'JavaScript', 'Java', 'C#', 'C++', 'SQL', 'TypeScript'];
  const row2 = ['LLM APIs', 'NLP', 'Voice AI', 'OpenCV', 'NumPy', 'Pandas', 'LangChain', 'AI Agents'];
  const row3 = ['React', 'Node.js', 'Express.js', 'Git', 'REST APIs', 'JWT', 'Postman', 'Prisma ORM'];
  
  const iconsRow = [
    IconBrandPython,
    IconBrandJavascript,
    IconBrandReact,
    IconBrandNextjs,
    IconBrandTailwind,
    IconBrandNodejs,
    IconBrandGit,
    IconBrandGithub,
    IconDatabase,
    IconBrandTypescript,
    IconBrandHtml5,
    IconBrandCss3,
    IconBrandDocker,
    IconBrandMongodb,
    IconBrandPrisma,
    IconBrandVercel,
    IconBrandFramer
  ];

  // Scramble header title on hover
  const handleScrambleTitle = () => {
    clearInterval(titleInterval.current);
    const orig = 'TECHNICAL ARSENAL';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    let f = 0;
    const total = 25;

    titleInterval.current = setInterval(() => {
      let o = '';
      for (let i = 0; i < orig.length; i++) {
        if (orig[i] === ' ') {
          o += ' ';
          continue;
        }
        o += f / total > i / orig.length ? orig[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      setTitle(o);
      f++;
      if (f > total) {
        setTitle(orig);
        clearInterval(titleInterval.current);
      }
    }, 20);
  };

  useGSAP(() => {
    // Scroll reveal controller inside component to protect React virtual DOM reconciliation
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 88%',
      onEnter: () => setIsRevealed(true),
      once: true,
    });

    // 1. Setup infinite translation tweens
    const loop1 = gsap.to('.track-1', {
      xPercent: -50,
      ease: 'none',
      duration: 18,
      repeat: -1,
    });

    const loop3 = gsap.to('.track-3', {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1,
    });

    // Right drifting loops (-50% to 0%)
    const loop2 = gsap.fromTo('.track-2', 
      { xPercent: -50 }, 
      { xPercent: 0, ease: 'none', duration: 22, repeat: -1 }
    );

    const loop4 = gsap.fromTo('.track-4', 
      { xPercent: -50 }, 
      { xPercent: 0, ease: 'none', duration: 25, repeat: -1 }
    );

    // 2. Velocity tracker using ScrollTrigger
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity() * 0.0035); // Scale velocity
        const targetScale = 1 + velocity;
        
        gsap.to([loop1, loop2, loop3, loop4], {
          timeScale: targetScale,
          duration: 0.25,
          overwrite: 'auto',
        });
      },
      onLeave: () => {
        gsap.to([loop1, loop2, loop3, loop4], { timeScale: 1, duration: 0.25 });
      },
      onEnterBack: () => {
        gsap.to([loop1, loop2, loop3, loop4], { timeScale: 1, duration: 0.25 });
      }
    });
  }, { scope: containerRef });

  const renderTrack = (items) => (
    <div className="marquee-content">
      {items.map((item, idx) => (
        <span className="marquee-item" key={idx}>
          {item} <span className="marquee-star">★</span>
        </span>
      ))}
    </div>
  );

  const renderIconTrack = (icons) => (
    <div className="marquee-content">
      {icons.map((Icon, idx) => (
        <span className="marquee-icon-item" key={idx}>
          <Icon className="brand-logo-icon" />
          <span className="marquee-star">★</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="s-skills" id="skills" ref={containerRef}>
      <div className="skills-header">
        <div className={`sec-label reveal ${isRevealed ? 'visible' : ''}`}>// 003 — Skills</div>
        <h2 
          className={`skills-title reveal ${isRevealed ? 'visible' : ''}`}
          onMouseEnter={handleScrambleTitle}
        >
          {title}
        </h2>
      </div>

      <div className="skills-marquee-container">
        {/* Row 1: Left drift */}
        <div className="marquee-row marquee-left">
          <div className="marquee-track track-1">
            {renderTrack(row1)}
            {renderTrack(row1)}
          </div>
        </div>

        {/* Row 2: Right drift */}
        <div className="marquee-row marquee-right">
          <div className="marquee-track track-2">
            {renderTrack(row2)}
            {renderTrack(row2)}
          </div>
        </div>

        {/* Row 3: Left drift */}
        <div className="marquee-row marquee-left">
          <div className="marquee-track track-3">
            {renderTrack(row3)}
            {renderTrack(row3)}
          </div>
        </div>

        {/* Row 4: Logo Loop (Right drift) */}
        <div className="marquee-row marquee-right logo-loop-row">
          <div className="marquee-track track-4">
            {renderIconTrack(iconsRow)}
            {renderIconTrack(iconsRow)}
          </div>
        </div>
      </div>
    </section>
  );
}
