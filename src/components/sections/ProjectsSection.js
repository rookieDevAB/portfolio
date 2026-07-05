export default function ProjectsSection() {
  const projects = [
    {
      num: '01',
      name: 'AI-Powered IVR Replacement',
      sub: 'Python · LLM APIs · Voice AI · NLP · Automation',
      award: '2nd Runner-Up\nHack Arya Verse 2.0',
      marquee: ['AI VOICE AGENT', 'IVR REPLACEMENT', 'BANKING & HEALTHCARE', 'NLP PIPELINES'],
      tags: ['Hallucination guardrails', 'Intent validation', 'Real-time speech'],
      link: 'https://github.com/rookieDevAB/arya-hackverse',
      className: 'r1',
    },
    {
      num: '02',
      name: 'AscendX — AI EdTech Platform',
      sub: 'React · Node.js · REST APIs · NLP · TTS',
      award: 'Full-Stack\nAI Platform',
      marquee: ['ASCENDX EDTECH', 'MULTILINGUAL AI', '5+ LANGUAGES', '85% ACCURACY'],
      tags: ['Quiz generation engine', 'Voice narration', 'Adaptive roadmaps'],
      link: 'https://github.com/rookieDevAB/AscendX-main',
      className: 'r2',
    },
    {
      num: '03',
      name: 'Voice Vista — Browser Assistant',
      sub: 'Python · Speech Recognition · NLP · Automation',
      award: 'Top 10 / 250+\nCode-e-Manipal',
      marquee: ['VOICE VISTA', 'BROWSER ASSISTANT', 'SUB-200MS LATENCY', 'TOP 10 NATIONAL'],
      tags: ['Sub-200ms parsing', 'Tab management', 'Hands-free nav'],
      link: 'https://github.com/rookieDevAB/VoiceVista',
      className: 'r3',
    },
  ];

  return (
    <section className="s-projects" id="projects">
      <div className="sec-label reveal">002 — Projects</div>
      <h2 className="proj-heading reveal" style={{ transitionDelay: '.05s' }}>
        Selected<br /><span>Work</span>
      </h2>

      <div className="proj-list">
      {projects.map((proj, idx) => (
        <a
          key={idx}
          className={`proj-row ${proj.className} reveal`}
          style={{ transitionDelay: `${(idx + 1) * 0.07 + 0.03}s` }}
          href={proj.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${proj.name} — view on GitHub`}
        >
          <div className="proj-reveal">
            <div className="proj-marquee">
              {/* Render twice for seamless infinite loop */}
              {proj.marquee.concat(proj.marquee).map((item, mIdx) => (
                <span key={mIdx}>
                  <span className="marquee-item">{item}</span>
                  <span className="marquee-sep">✦</span>
                </span>
              ))}
            </div>
          </div>
          <div className="proj-front">
            <div className="proj-num">{proj.num}</div>
            <div>
              <div className="proj-name">{proj.name}</div>
              <div className="proj-sub">{proj.sub}</div>
              <div className="tags-row">
                {proj.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="ptag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="proj-right">
              <div className="proj-award" style={{ whiteSpace: 'pre-line' }}>{proj.award}</div>
              <div className="proj-arrow">→</div>
            </div>
          </div>
        </a>
      ))}
      </div>
    </section>
  );
}
