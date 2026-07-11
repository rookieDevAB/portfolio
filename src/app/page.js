'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/sections/Navbar';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import SkillsSection from '../components/sections/SkillsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import Footer from '../components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const rootRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduced motion: reveal everything instantly, no ScrollTrigger.
    if (reduce) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
      return;
    }

    const ctx = gsap.context(() => {
      // Subtle parallax on the accent words (safe: these are child spans, so
      // they don't fight the parent's reveal transform).
      gsap.utils
        .toArray('.proj-heading span, .skills-title em, .exp-title span, .contact-cta span')
        .forEach((el) => {
          const section = el.closest('section');
          if (!section) return;
          gsap.fromTo(
            el,
            { yPercent: 14 },
            {
              yPercent: -14,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
    }, rootRef);

    // Recalculate once fonts/layout settle so trigger positions are correct.
    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 350);

    return () => {
      clearTimeout(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <div className="port" id="port" ref={rootRef}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
      </main>
      <Footer />
    </div>
  );
}
