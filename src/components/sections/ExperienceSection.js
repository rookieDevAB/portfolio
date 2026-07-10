'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  IconBrandLinkedin, 
  IconBrandGithub, 
  IconMail, 
  IconBriefcase,
  IconSchool,
  IconAward,
  IconBrain,
  IconCode,
  IconSparkles,
  IconTerminal,
  IconPrompt,
  IconX,
  IconExternalLink,
  IconDownload
} from '@tabler/icons-react';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const spotlightRef = useRef(null);
  const resumeBtnRef = useRef(null);
  const timelineRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hoveredCert, setHoveredCert] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  // Safe fallback timeout to guarantee visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

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

  useGSAP(() => {
    // Scroll reveal controller inside component
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 88%',
      onEnter: () => setIsRevealed(true),
      once: true,
    });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = timelineRef.current;
    if (!container) return;

    const setupTimeline = () => {
      const bgPath = container.querySelector('.timeline-path-bg');
      const progressPath = container.querySelector('.timeline-path-progress');
      const items = gsap.utils.toArray('.timeline-item');
      if (items.length === 0) return;

      const firstNode = items[0].querySelector('.timeline-node');
      const lastNode = items[items.length - 1].querySelector('.timeline-node');
      
      const containerRect = container.getBoundingClientRect();
      const firstRect = firstNode.getBoundingClientRect();
      const lastRect = lastNode.getBoundingClientRect();
      
      // Calculate top relative to container top (taking current scroll into account)
      const yFirst = firstRect.top - containerRect.top + 14;
      const yLast = lastRect.top - containerRect.top + 14;
      const totalLength = yLast - yFirst;

      bgPath?.setAttribute('d', `M 15 ${yFirst} L 15 ${yLast}`);
      progressPath?.setAttribute('d', `M 15 ${yFirst} L 15 ${yLast}`);

      // Clear all ScrollTriggers for the timeline container and items to prevent duplicates
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container || items.includes(st.trigger)) {
          st.kill();
        }
      });

      if (reduce) {
        gsap.set(progressPath, { strokeDasharray: totalLength, strokeDashoffset: 0 });
        items.forEach((item) => {
          const node = item.querySelector('.timeline-node');
          node?.classList.add('active');
          item.classList.add('active');
        });
        return;
      }

      // Precompute each node's relative position along the line (0–1)
      const nodePositions = items.map((item) => {
        const node = item.querySelector('.timeline-node');
        const nodeRect = node.getBoundingClientRect();
        const yNode = nodeRect.top - containerRect.top + 14;
        return { item, node, pos: (yNode - yFirst) / totalLength };
      });

      // Set initial state — line fully hidden
      gsap.set(progressPath, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });

      // Single ScrollTrigger drives BOTH the line AND the node highlights
      ScrollTrigger.create({
        trigger: container,
        start: `top+=${yFirst} 50%`,
        end: `top+=${yLast} 50%`,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress; // 0 → 1

          // Draw the line to exactly this progress
          gsap.set(progressPath, {
            strokeDashoffset: totalLength * (1 - progress),
          });

          // Toggle each node based on whether the line has reached it
          nodePositions.forEach(({ item, node, pos }) => {
            if (progress >= pos) {
              node?.classList.add('active');
              item.classList.add('active');
            } else {
              node?.classList.remove('active');
              item.classList.remove('active');
            }
          });
        },
      });
    };

    // Run setup after component mount
    setupTimeline();

    // Recalculate on resize
    window.addEventListener('resize', setupTimeline);
    return () => {
      window.removeEventListener('resize', setupTimeline);
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) st.kill();
      });
    };

  }, { scope: sectionRef });

  const innerCerts = [
    { 
      title: 'AI for Beginners', 
      issuer: 'HP LIFE', 
      year: '2025', 
      icon: IconBrain, 
      pdfPath: '/certificates/ai-beginners.pdf',
      description: 'Acquired core knowledge in Artificial Intelligence fundamentals, history, practical business use cases, and ethical considerations for automated processes.'
    },
    { 
      title: 'Full Stack Bootcamp', 
      issuer: 'GeeksForGeeks', 
      year: '2025', 
      icon: IconCode, 
      pdfPath: '/certificates/fullstack-bootcamp.pdf',
      description: 'Comprehensive bootcamp covering advanced front-end development, backend service integration, databases, server routing, and scalable architecture.'
    }
  ];

  const outerCerts = [
    { 
      title: 'Generative AI and ChatGPT', 
      issuer: 'GeeksForGeeks', 
      year: '2025', 
      icon: IconSparkles, 
      pdfPath: '/certificates/generative-ai.pdf',
      description: 'Specialized focus on Generative AI architectures, prompt construction, large language models (LLMs), and developing customized chatbot integrations.'
    },
    { 
      title: 'Problem Solving through Programming using C', 
      issuer: 'IIT KHARAGPUR (NPTEL)', 
      year: '2023', 
      icon: IconTerminal, 
      pdfPath: '/certificates/problem-solving-c.pdf',
      description: 'Rigorous academic program covering problem-solving logic, structured programming algorithms, data structures, pointer memory, and file standard libraries.'
    },
    { 
      title: 'Prompt Design in Vertex AI', 
      issuer: 'Google Cloud', 
      year: '2025', 
      icon: IconPrompt, 
      pdfPath: '/certificates/vertex-ai-badge.pdf',
      description: 'Earned the official Google Cloud skill badge for prompt engineering templates, hyperparameter tuning, model response evaluations, and multi-modal integration.'
    }
  ];

  const allCerts = [...innerCerts, ...outerCerts];

  return (
    <section
      className="s-exp"
      id="experience"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="spotlight" ref={spotlightRef}></div>

      <div className={`sec-label reveal ${isRevealed ? 'visible' : ''}`}>004 — Experience & Certs</div>
      <h2 className={`exp-title reveal ${isRevealed ? 'visible' : ''}`}>
        History & <em>Credentials</em>
      </h2>

      <div className="exp-cert-grid">
        {/* Left Column: Timeline */}
        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-track-wrapper">
            <svg className="timeline-svg">
              {/* Dynamic Background Line path */}
              <path className="timeline-path-bg" stroke="rgba(255,255,255,0.08)" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none" />
              {/* Dynamic Active Drawing Line path */}
              <path 
                className="timeline-path-progress" 
                stroke="var(--color-accent)" 
                strokeWidth="2" 
                vectorEffect="non-scaling-stroke"
                fill="none"
              />
            </svg>
          </div>

          {/* Item 1: Class X (CBSE) */}
          <div className={`timeline-item reveal ${isRevealed ? 'visible' : ''}`}>
            <div className="timeline-node">
              <IconSchool size={16} />
            </div>
            <div className="timeline-content">
              <span className="timeline-date">2020 – 2021 • Jaipur, India</span>
              <h3 className="timeline-title">Class X (CBSE)</h3>
              <h4 className="timeline-subtitle">EVOLUTION INTERNATION SCHOOL</h4>
              <ul className="exp-points">
                <li>Completed secondary board education with a strong foundation in science, mathematics, and basic computing.</li>
              </ul>
            </div>
          </div>

          {/* Item 2: Class XII (CBSE) */}
          <div className={`timeline-item reveal ${isRevealed ? 'visible' : ''}`}>
            <div className="timeline-node">
              <IconSchool size={16} />
            </div>
            <div className="timeline-content">
              <span className="timeline-date">2022 – 2023 • Jaipur, India</span>
              <h3 className="timeline-title">Class XII (CBSE)</h3>
              <h4 className="timeline-subtitle">EVOLUTION INTERNATION SCHOOL</h4>
              <ul className="exp-points">
                <li>Completed senior secondary education focusing on Physics, Chemistry, Mathematics, and Computer Science studies.</li>
              </ul>
            </div>
          </div>

          {/* Item 3: College */}
          <div className={`timeline-item reveal ${isRevealed ? 'visible' : ''}`}>
            <div className="timeline-node">
              <IconSchool size={16} />
            </div>
            <div className="timeline-content">
              <span className="timeline-date">2023 – 2027 • Jaipur, India</span>
              <h3 className="timeline-title">B.Tech in Computer Science</h3>
              <h4 className="timeline-subtitle">Arya College of Engineering & IT</h4>
              <div className="education-gpa-tag">9.0 SGPA (till 5th sem)</div>
              <ul className="exp-points">
                <li>Focus on Software Engineering, Data Structures & Algorithms, Artificial Intelligence, and Database Management Systems.</li>
                <li>Developed cloud-based projects and participated in academic tech exhibitions.</li>
              </ul>
            </div>
          </div>

          {/* Item 4: Internship */}
          <div className={`timeline-item reveal ${isRevealed ? 'visible' : ''}`}>
            <div className="timeline-node">
              <IconBriefcase size={16} />
            </div>
            <div className="timeline-content">
              <span className="timeline-date">Jun 2025 – Aug 2025 • Remote</span>
              <h3 className="timeline-title">Game Programming Intern</h3>
              <h4 className="timeline-subtitle">TechForce</h4>
              <ul className="exp-points">
                <li>Engineered 3 interactive game modules using Unity 3D and C#, applying OOP principles and modular architecture to improve code reusability by 40% and reduce bug frequency by 30%.</li>
                <li>Developed gameplay systems including player controls, collision handling, UI interactions, and scene management while optimizing runtime performance and frame stability across multiple environments.</li>
                <li>Collaborated within an agile remote team during an 8-week sprint cycle, using Git-based workflows, debugging practices, and code reviews to deliver all milestones on schedule.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Right Column: Orbiting Certifications & Tooltip */}
        <div className={`certs-column-wrapper reveal ${isRevealed ? 'visible' : ''}`}>
          <h3 className="certs-section-title">Certifications</h3>
          
          {/* Orbit Dashboard */}
          <div className="orbit-certs-container">
            {/* Pulsing center hub */}
            <div className="orbit-center">
              <div className="orbit-center-glow"></div>
              <div className="orbit-center-badge">
                <IconAward size={28} />
              </div>
            </div>

            {/* Inner Ring (Radius: 90px, rotating CCW) */}
            <div className="orbit-ring orbit-ring-inner">
              {innerCerts.map((cert, idx) => {
                const angle = idx * 180;
                return (
                  <div 
                    key={idx}
                    className="orbit-node"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translate(90px)`
                    }}
                    onMouseEnter={() => setHoveredCert(cert)}
                    onMouseLeave={() => setHoveredCert(null)}
                    onClick={() => setSelectedCert(cert)}
                  >
                    <div className="orbit-connector-line"></div>
                    <div 
                      className="orbit-badge"
                      style={{
                        transform: `rotate(${-angle}deg)`
                      }}
                    >
                      <cert.icon size={20} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Outer Ring (Radius: 160px, rotating CW) */}
            <div className="orbit-ring orbit-ring-outer">
              {outerCerts.map((cert, idx) => {
                const angle = idx * 120;
                return (
                  <div 
                    key={idx}
                    className="orbit-node"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translate(160px)`
                    }}
                    onMouseEnter={() => setHoveredCert(cert)}
                    onMouseLeave={() => setHoveredCert(null)}
                    onClick={() => setSelectedCert(cert)}
                  >
                    <div className="orbit-connector-line"></div>
                    <div 
                      className="orbit-badge"
                      style={{
                        transform: `rotate(${-angle}deg)`
                      }}
                    >
                      <cert.icon size={20} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Orbit Tooltip overlay */}
            <div className={`orbit-tooltip ${hoveredCert ? 'visible' : ''}`}>
              {hoveredCert && (
                <>
                  <h4 className="orbit-tooltip-title">{hoveredCert.title}</h4>
                  <p className="orbit-tooltip-issuer">{hoveredCert.issuer} ({hoveredCert.year})</p>
                  <span className="orbit-tooltip-hint">Click to inspect credential</span>
                </>
              )}
            </div>
          </div>

          {/* Touchscreen/Mobile fallback grid list */}
          <div className="mobile-certs-grid">
            {allCerts.map((cert, idx) => (
              <div 
                className="mobile-cert-card" 
                key={idx}
                onClick={() => setSelectedCert(cert)}
              >
                <div className="mobile-cert-header">
                  <cert.icon className="mobile-cert-icon" size={24} />
                  <span className="mobile-cert-year">{cert.year}</span>
                </div>
                <h4 className="mobile-cert-title">{cert.title}</h4>
                <p className="mobile-cert-issuer">{cert.issuer}</p>
                <span className="mobile-cert-action">View Certificate →</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* High-Fidelity PDF Modal Viewer */}
      {selectedCert && (
        <div className="cert-modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" aria-label="Close modal" onClick={() => setSelectedCert(null)}>
              <IconX size={20} />
            </button>
            
            <div className="cert-modal-grid">
              {/* Left Column: Metadata details */}
              <div className="cert-modal-meta">
                <span className="cert-modal-label">{selectedCert.issuer} • {selectedCert.year}</span>
                <h3 className="cert-modal-title">{selectedCert.title}</h3>
                <p className="cert-modal-desc">{selectedCert.description}</p>
                
                <div className="cert-modal-actions">
                  <a 
                    className="cert-btn-primary" 
                    href={selectedCert.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconExternalLink size={16} /> Open in New Tab
                  </a>
                  <a 
                    className="cert-btn-secondary" 
                    href={selectedCert.pdfPath}
                    download
                  >
                    <IconDownload size={16} /> Download PDF
                  </a>
                </div>
              </div>
              
              {/* Right Column: Embedded PDF iframe */}
              <div className="cert-modal-viewer">
                <iframe 
                  src={`${selectedCert.pdfPath}#toolbar=0&navpanes=0&view=Fit`}
                  title={selectedCert.title}
                  width="100%"
                  height="100%"
                  className="cert-iframe"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
