'use client';
import { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { IconMail, IconMapPin, IconBrandGithub } from '@tabler/icons-react';

export default function AboutSection() {
  const [headline, setHeadline] = useState('FULL\nSTACK\nAI\nBUILDER');
  const [bio, setBio] = useState('');
  const [stats, setStats] = useState([
    { label: 'AI projects live', target: 3, value: 0, suffix: '+' },
    { label: 'SGPA · 5 sems', target: 9, value: 0, suffix: '.0' },
    { label: 'Hack Arya Verse', target: 2, value: 0, prefix: '#' },
    { label: 'Code-e-Manipal', target: 10, value: 0, prefix: 'T' },
  ]);

  const headlineInterval = useRef(null);
  const spotlightRef = useRef(null);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  // Spotlight Effect
  const handleMouseMove = (e) => {
    if (!spotlightRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    spotlightRef.current.style.display = 'block';
    spotlightRef.current.style.left = `${e.clientX - rect.left}px`;
    spotlightRef.current.style.top = `${e.clientY - rect.top}px`;
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) spotlightRef.current.style.display = 'none';
  };

  // Headline Scramble
  const handleScramble = () => {
    clearInterval(headlineInterval.current);
    const orig = 'FULL\nSTACK\nAI\nBUILDER';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
    const plain = orig.replace(/\n/g, ' ').toUpperCase();
    const joint = orig.split('\n').join('');
    let f = 0;
    const total = Math.floor(700 / 16);

    headlineInterval.current = setInterval(() => {
      let o = '';
      let jointIdx = 0;
      for (let i = 0; i < plain.length; i++) {
        if (plain[i] === ' ') {
          o += '\n';
          continue;
        }
        o += f / total > i / plain.length ? joint[jointIdx] : chars[Math.floor(Math.random() * chars.length)];
        jointIdx++;
      }
      setHeadline(o);
      f++;
      if (f > total) {
        setHeadline(orig);
        clearInterval(headlineInterval.current);
      }
    }, 16);
  };

  // Accent rule draw-in (anime.js) — scaleX so it won't clash with the
  // CSS width hover effect.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const anim = animate('.about-rule', {
      scaleX: [0, 1],
      opacity: [0, 1],
      duration: 900,
      delay: 600,
      ease: 'outExpo',
    });
    return () => anim && anim.revert && anim.revert();
  }, []);

  // Typing Bio — slice-based so it's idempotent (safe under StrictMode
  // double-invoke) and never appends an undefined trailing character.
  useEffect(() => {
    const bioText = "CS undergrad at Arya College, Jaipur — SGPA 9.0. I build software that thinks: voice agents, adaptive EdTech platforms, browser automation. Hackathon-tested across 250+ national teams.";
    let ti = 0;
    let timer;
    const tw = () => {
      ti++;
      setBio(bioText.slice(0, ti));
      if (ti < bioText.length) {
        timer = setTimeout(tw, ti < 3 ? 80 : 20 + Math.random() * 20);
      }
    };
    const startTimer = setTimeout(tw, 700);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, []);

  // Stats Count Up Observer
  useEffect(() => {
    let done = false;
    let statsTimer;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done) {
          done = true;
          statsTimer = setInterval(() => {
            setStats((prev) => {
              const next = prev.map((s) => {
                if (s.value >= s.target) return s;
                return { ...s, value: Math.min(s.value + s.target / 40, s.target) };
              });
              if (next.every((s) => s.value >= s.target)) {
                clearInterval(statsTimer);
              }
              return next;
            });
          }, 30);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => {
      observer.disconnect();
      clearInterval(statsTimer);
    };
  }, []);

  const renderHeadline = () => {
    if (headline !== 'FULL\nSTACK\nAI\nBUILDER') {
      return headline.split('\n').map((line, idx) => (
        <span key={idx}>
          {line}
          {idx < 3 && <br />}
        </span>
      ));
    }
    return (
      <>
        FULL<br />STACK<br /><span>AI</span><br />BUILDER
      </>
    );
  };

  return (
    <section
      className="s-about"
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="spotlight" ref={spotlightRef}></div>
      <div className="about-grid">
        <div>
          <div className="sec-label reveal">001 — About</div>
          <h1
            className="about-headline reveal"
            id="hero-hl"
            style={{ transitionDelay: '.08s' }}
            onMouseEnter={handleScramble}
          >
            {renderHeadline()}
          </h1>
          <div className="about-rule"></div>
          <p className="about-bio reveal" id="bio-el" style={{ transitionDelay: '.16s' }} aria-hidden="true">
            {bio}
            <span className="tw-cursor" id="twc"></span>
          </p>
          <span className="sr-only">
            CS undergrad at Arya College, Jaipur — SGPA 9.0. I build software that thinks: voice agents, adaptive EdTech platforms, browser automation. Hackathon-tested across 250+ national teams.
          </span>
        </div>
        <div className="reveal" style={{ transitionDelay: '.12s' }}>
          <div className="about-stats" ref={statsRef}>
            {stats.map((s, idx) => (
              <div className="stat-box" key={idx}>
                <div className="stat-n">
                  {s.prefix || ''}
                  {s.target % 1 === 0 ? Math.round(s.value) : s.value.toFixed(1)}
                  {s.suffix || ''}
                </div>
                <div className="stat-d">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="about-contacts">
            <a className="contact-row-item" href="mailto:devabhaysoni@gmail.com">
              <IconMail className="contact-icon" size={15} />
              <span className="contact-val">devabhaysoni@gmail.com</span>
            </a>
            <div className="contact-row-item">
              <IconMapPin className="contact-icon" size={15} />
              <span className="contact-val">Jaipur, Rajasthan, IN</span>
            </div>
            <a
              className="contact-row-item"
              href="https://github.com/rookieDevAB"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub className="contact-icon" size={15} />
              <span className="contact-val">github.com/rookieDevAB</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
