'use client';
import { useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="p-nav">
        <button 
          className="p-nav-pill" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open Navigation Menu"
        >
          {/* Custom Safety Orange Logo Icon (Spherical Lines) */}
          <svg className="p-nav-icon" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5">
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="3" x2="12" y2="21" />
            <line x1="8" y1="4" x2="8" y2="20" />
            <line x1="16" y1="4" x2="16" y2="20" />
          </svg>
          <span className="p-nav-name">Abhay</span>
          <span className="p-nav-divider"></span>
          <IconMenu2 className="p-nav-hamburger" size={16} />
        </button>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <div className={`p-menu-overlay ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <button 
          className="p-menu-close" 
          onClick={() => setMenuOpen(false)}
          aria-label="Close Navigation Menu"
        >
          <IconX size={32} />
        </button>
        <ul className="p-menu-links">
          <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
          <li><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a></li>
        </ul>
      </div>
    </>
  );
}
