'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Parallax translation on the centered image
      gsap.fromTo(
        '.hero-img',
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Parallax translation on the massive background display name overlay
      gsap.fromTo(
        '.hero-display-name',
        { yPercent: 4 },
        {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="s-hero" ref={containerRef} id="home">
      {/* Background Image Container */}
      <div className="hero-img-container">
        <img
          src="/profile.png"
          alt="Abhay Soni"
          className="hero-img"
        />
      </div>

      {/* Grid Content Overlay */}
      <div className="hero-content-overlay">
        {/* Left Column */}
        <div className="hero-col hero-left">
          <div className="hero-status">
            <span className="status-dot"></span>
            <span className="status-text">Available for Work</span>
          </div>
          <p className="hero-subtitle">
            Full Stack &amp; AI Developer based in Jaipur
          </p>
        </div>

        {/* Center Space (Empty to let photo shine) */}
        <div className="hero-center-spacer"></div>

        {/* Right Column */}
        <div className="hero-col hero-right">
          <p className="hero-intro">
            I am Abhay Soni — a Full Stack and AI Developer passionate about creating high-performance digital experiences, voice agents, and browser automation systems that think.
          </p>
          <a href="#projects" className="hero-cta">
            <span className="cta-arrow">→</span>
            <span>See my works</span>
          </a>
        </div>
      </div>

      {/* Massive Typographic Display Name (placed below overlay for proper mobile flow) */}
      <h1 className="hero-display-name">ABHAY</h1>
    </section>
  );
}
