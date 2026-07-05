'use client';
import { useState, useRef, useEffect } from 'react';
import { animate, stagger, createScope } from 'animejs';

export default function Navbar() {
  const [logoText, setLogoText] = useState('ABHAY SONI');
  const logoInterval = useRef(null);
  const navRef = useRef(null);
  const scope = useRef(null);

  // Entrance: stagger the logo + nav links in on mount (anime.js).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    scope.current = createScope({ root: navRef.current }).add(() => {
      animate('.p-nav-logo, .p-nav-links li', {
        opacity: [0, 1],
        translateY: [-14, 0],
        delay: stagger(70, { start: 150 }),
        duration: 650,
        ease: 'outExpo',
      });
    });
    return () => scope.current && scope.current.revert();
  }, []);

  const handleScramble = (orig, setter, intervalRef, ms = 500) => {
    clearInterval(intervalRef.current);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
    const plain = orig.toUpperCase();
    let f = 0;
    const total = Math.floor(ms / 16);

    intervalRef.current = setInterval(() => {
      let o = '';
      for (let i = 0; i < plain.length; i++) {
        if (plain[i] === ' ' || plain[i] === '\n') {
          o += plain[i];
          continue;
        }
        o += f / total > i / plain.length ? plain[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      setter(o);
      f++;
      if (f > total) {
        setter(orig);
        clearInterval(intervalRef.current);
      }
    }, 16);
  };

  return (
    <nav className="p-nav" ref={navRef}>
      <span
        className="p-nav-logo"
        id="logo"
        onMouseEnter={() => handleScramble('ABHAY SONI', setLogoText, logoInterval)}
      >
        {logoText}
      </span>
      <ul className="p-nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}
