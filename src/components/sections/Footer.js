'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Scoped GSAP ScrollTrigger to fire the reveal once when footer is scrolled into view
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top 92%', // Triggers when the top of the footer is 92% from the top of viewport
      onEnter: () => setIsRevealed(true),
      once: true,
    });
  }, { scope: footerRef });

  // Safe fallback timeout to guarantee visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="p-footer" ref={footerRef}>
      {/* Top Editorial Row */}
      <div className="footer-top">
        <div className="footer-left">
          <span className="p-footer-copy">© 2026 ABHAY SONI</span>
          <span className="p-footer-copy" style={{ color: '#4b5563', fontSize: '11px', textTransform: 'uppercase' }}>
            Full Stack &amp; AI Developer
          </span>
        </div>

        <div className="footer-center">
          <a href="#home" className="footer-link">Home</a>
          <a href="#about" className="footer-link">About</a>
          <a href="#projects" className="footer-link">Projects</a>
          <a href="#skills" className="footer-link">Skills</a>
          <a href="#experience" className="footer-link">Experience</a>
        </div>

        <div className="footer-right">
          <a 
            href="https://www.linkedin.com/in/contact-abhay/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/rookieDevAB" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            GitHub
          </a>
          <a href="mailto:devabhaysoni@gmail.com" className="footer-link">
            Email
          </a>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
            style={{ color: 'var(--color-accent)' }}
          >
            Resume →
          </a>
        </div>
      </div>

      {/* Bottom Giant Typographic Reveal Row */}
      <div className={`footer-title-wrap ${isRevealed ? 'visible' : ''}`}>
        <a 
          href="mailto:devabhaysoni@gmail.com" 
          className="footer-display-title-link"
          aria-label="Mail to devabhaysoni@gmail.com: Let's Build"
        >
          <span className="sr-only">Let's Build</span>
          <h2 className="footer-display-title">
            LET'S BUILD
          </h2>
        </a>
      </div>
    </footer>
  );
}
