// hero section component
import React, { useState, useEffect } from 'react';
import { PersonalInfo } from '../types';
import { Mail, Send, Github, ChevronRight, Server, Code, GraduationCap, Terminal } from 'lucide-react';
import { PixelCard } from './TerminalComponents';

interface HeroProps {
  info: PersonalInfo;
  theme: 'dark' | 'light';
}

// role titles
const ROLES = [
  'Fullstack Developer (React/TS/Node.js/SQL)',
  'Game Server Engineer (CS2/C++/Java)',
  'wallpaper & CoordHud Creator',
  'Linux Sysadmin & Nginx Architect'
];

export const Hero: React.FC<HeroProps> = ({ info }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // typing effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const updateSpeed = isDeleting ? 30 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, updateSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="hero">
      <div className="hero-overlay-mask"></div>

      <div className="container hero-content">
        <div className="hero-grid">
          <div>
            {/* status */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '4px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginBottom: '20px' }}>
              <Terminal size={14} className="text-accent" />
              <span>STATUS: {info.status || 'AVAILABLE FOR CORE PROJECTS'}</span>
            </div>

            {/* title */}
            <h1 style={{ fontSize: '3.4rem', lineHeight: '1.1', marginBottom: '16px' }}>
              {info.name || 'Ковалёв Николай Николаевич'}
            </h1>

            {/* typing role */}
            <div style={{ fontSize: '1.2rem', marginBottom: '24px', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>$ exec --role:</span>
              <span className="text-accent">{displayText}</span>
              <span className="terminal-cursor"></span>
            </div>

            {/* bio */}
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '620px', lineHeight: '1.7' }}>
              {info.bio}
            </p>

            {/* cta buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-primary">
                <span>Связаться</span>
                <ChevronRight size={18} />
              </a>

              <a href="#projects" className="btn btn-outline">
                <span>Проекты & Исходный код</span>
              </a>

              {/* socials */}
              <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
                <a href={`mailto:${info.email}`} className="icon-btn" title="Email" target="_blank" rel="noreferrer">
                  <Mail size={18} />
                </a>
                <a href={`https://t.me/${info.telegram?.replace('@', '')}`} className="icon-btn" title="Telegram" target="_blank" rel="noreferrer">
                  <Send size={18} />
                </a>
                <a href={info.github || 'https://github.com/molokortx20-art'} className="icon-btn" title="GitHub Profile" target="_blank" rel="noreferrer">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* terminal code window */}
          <div>
            <PixelCard style={{ padding: '24px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: '1.8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', color: 'var(--text-dim)' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>profile.json</span>
              </div>

              <div>
                <span style={{ color: 'var(--text-dim)' }}>// developer profile</span><br />
                <span style={{ color: 'var(--primary)' }}>const</span> developer = &#123;<br />
                &nbsp;&nbsp;name: <span style={{ color: '#10b981' }}>"Ковалёв Николай"</span>,<br />
                &nbsp;&nbsp;github: <span style={{ color: '#10b981' }}>"@molokortx20-art"</span>,<br />
                &nbsp;&nbsp;core_projects: [<span style={{ color: '#10b981' }}>"wallpaper"</span>, <span style={{ color: '#10b981' }}>"CoordHud"</span>],<br />
                &nbsp;&nbsp;specialization: <span style={{ color: '#10b981' }}>"Fullstack & Game Systems"</span>,<br />
                &nbsp;&nbsp;stack: [<span style={{ color: '#10b981' }}>"React"</span>, <span style={{ color: '#10b981' }}>"TS"</span>, <span style={{ color: '#10b981' }}>"Node"</span>, <span style={{ color: '#10b981' }}>"C++"</span>, <span style={{ color: '#10b981' }}>"SQL"</span>],<br />
                &nbsp;&nbsp;fast_learner: <span style={{ color: 'var(--primary)' }}>true</span><br />
                &#125;;
              </div>
            </PixelCard>
          </div>
        </div>

        {/* stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '50px' }}>
          <PixelCard style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Server size={32} className="text-accent" />
              <div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }} className="font-mono">GAME SERVERS</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Garry's Mod, CS2, Rust, Minecraft</div>
              </div>
            </div>
          </PixelCard>

          <PixelCard style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Code size={32} className="text-accent" />
              <div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }} className="font-mono">FULLSTACK</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>React, TypeScript, Node.js, SQL</div>
              </div>
            </div>
          </PixelCard>

          <PixelCard style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <GraduationCap size={32} className="text-accent" />
              <div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }} className="font-mono">УНИВЕРСИТЕТ</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Информ. системы и технологии</div>
              </div>
            </div>
          </PixelCard>
        </div>
      </div>
    </section>
  );
};
