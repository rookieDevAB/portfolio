'use client';
import { useRef } from 'react';
import { IconBrandLinkedin, IconBrandGithub, IconMail, IconDownload } from '@tabler/icons-react';

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const spotlightRef = useRef(null);
  const resumeBtnRef = useRef(null);

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

  // Resume Button Magnetic Effect
  const handleResumeMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const btn = resumeBtnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleResumeMouseEnter = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (resumeBtnRef.current) {
      resumeBtnRef.current.style.transition = 'transform 0.1s, background 0.2s';
    }
  };

  const handleResumeMouseLeave = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const btn = resumeBtnRef.current;
    if (btn) {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s';
    }
  };

  return (
    <section
      className="s-exp"
      id="experience"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="spotlight" ref={spotlightRef}></div>

      <div className="sec-label reveal">004 — Experience</div>
      <h2 className="exp-title reveal" style={{ transitionDelay: '.05s' }}>
        Where I've<br /><span>Worked</span>
      </h2>

      <div className="exp-block reveal" style={{ transitionDelay: '.1s' }}>
        <div>
          <div className="exp-company">TechForce</div>
          <div className="exp-date">Jun 2025 – Aug 2025<br />Remote</div>
        </div>
        <div>
          <div className="exp-role">Game Programming Intern</div>
          <ul className="exp-points">
            <li>Engineered 3 interactive game modules in Unity 3D and C# — improved code reusability 40%, cut bug frequency 30%.</li>
            <li>Developed gameplay systems: player controls, collision handling, UI interactions, and scene management across multiple environments.</li>
            <li>Delivered all sprint milestones on schedule in an 8-week agile cycle using Git workflows and code reviews.</li>
          </ul>
        </div>
      </div>

      <div className="contact-strip reveal" id="contact" style={{ transitionDelay: '.15s' }}>
        <div className="contact-cta">
          Let's build<br />something <span>real</span>
        </div>
        <div className="contact-links-row">
          <a className="clink" href="https://linkedin.com/in/abhaysoni" target="_blank" rel="noopener noreferrer">
            <IconBrandLinkedin size={14} />LinkedIn
          </a>
          <a className="clink" href="https://github.com/rookieDevAB" target="_blank" rel="noopener noreferrer">
            <IconBrandGithub size={14} />GitHub
          </a>
          <a className="clink" href="mailto:devabhaysoni@gmail.com">
            <IconMail size={14} />Email
          </a>
          <a
            className="clink clink-primary"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            id="res-btn"
            ref={resumeBtnRef}
            onMouseMove={handleResumeMouseMove}
            onMouseEnter={handleResumeMouseEnter}
            onMouseLeave={handleResumeMouseLeave}
          >
            Resume →
          </a>
          <a
            className="clink clink-primary"
            href="/resume.pdf"
            download="Abhay-Soni-Resume.pdf"
            aria-label="Download resume as PDF"
            title="Download resume"
          >
            <IconDownload size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
