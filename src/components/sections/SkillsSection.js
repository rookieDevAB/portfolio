'use client';
import { useState, useEffect, useRef } from 'react';

export default function SkillsSection() {
  const [showSkills, setShowSkills] = useState(false);
  const sectionRef = useRef(null);

  const skillsData = [
    {
      cat: 'Languages',
      items: [
        { name: 'Python', delay: 0 },
        { name: 'JavaScript', delay: 55 },
        { name: 'Java', delay: 110 },
        { name: 'C#', delay: 165 },
        { name: 'C', delay: 220, dim: true },
        { name: 'C++', delay: 275, dim: true },
        { name: 'SQL', delay: 330, dim: true },
      ],
    },
    {
      cat: 'Frameworks',
      items: [
        { name: 'React', delay: 0 },
        { name: 'Node.js', delay: 55 },
        { name: 'Express.js', delay: 110 },
        { name: 'Unity 3D', delay: 165 },
        { name: 'JavaFX', delay: 220, dim: true },
      ],
    },
    {
      cat: 'AI / ML',
      items: [
        { name: 'LLM APIs', delay: 0 },
        { name: 'NLP', delay: 55 },
        { name: 'Voice AI', delay: 110 },
        { name: 'OpenCV', delay: 165 },
        { name: 'NumPy', delay: 220, dim: true },
        { name: 'Pandas', delay: 275, dim: true },
      ],
    },
    {
      cat: 'Tooling',
      items: [
        { name: 'Git', delay: 0 },
        { name: 'REST APIs', delay: 55 },
        { name: 'JWT', delay: 110 },
        { name: 'Postman', delay: 165 },
        { name: 'Prisma ORM', delay: 220, dim: true },
        { name: 'Jest', delay: 275, dim: true },
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowSkills(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="s-skills" id="skills">
      <div className="sec-label reveal">003 — Skills</div>
      <h2 className="skills-title reveal" style={{ transitionDelay: '.05s' }}>
        Technical<br /><em>Arsenal</em>
      </h2>
      <div className="skills-grid reveal" style={{ transitionDelay: '.1s' }} ref={sectionRef}>
        {skillsData.map((cat, idx) => (
          <div className="skill-cat" key={idx}>
            <div className="skill-cat-label">{cat.cat}</div>
            <div className="skill-items">
              {cat.items.map((s, sIdx) => (
                <span
                  key={sIdx}
                  className={`skill-chip ${s.dim ? 'dim' : ''} ${showSkills ? 'in' : ''}`}
                  style={{ transitionDelay: showSkills ? `${s.delay}ms` : '0ms' }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="edu-row">
          <div>
            <div className="edu-name">Arya College of Engineering &amp; IT</div>
            <div className="edu-detail">B.Tech — Computer Science · Aug 2023 – May 2027 · Jaipur</div>
          </div>
          <div className="edu-gpa">
            9.0 <span style={{ fontSize: '14px', fontWeight: 300, opacity: .5 }}>SGPA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
