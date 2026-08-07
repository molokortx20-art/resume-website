import React, { useState, useEffect } from 'react';
import { PersonalInfo } from '../types';
import { Send, Github, ChevronRight, Server, Code, GraduationCap } from 'lucide-react';

interface HeroProps {
  info: PersonalInfo;
  theme: 'dark' | 'light';
}

const ROLES = [
  'Fullstack Developer (React / TS / Node.js / SQL)',
  'Game Server Engineer (CS2 / GMod / Rust / C++)',
  'GameCore-Panel, wallpaper & CoordHud Creator',
  'Linux Sysadmin & Network Engineer'
];

export const Hero: React.FC<HeroProps> = ({ info }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const updateSpeed = isDeleting ? 25 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2200);
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
    <section id="hero" className="pt-12 pb-16 relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Upper Status Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-card text-xs font-mono theme-text-muted shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500"></span>
            <span className="text-emerald-500 font-bold">STATUS:</span>
            <span>{info.status || 'Открыт к предложениям'}</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full theme-card text-xs font-mono theme-text-muted">
            <span>FULLSTACK</span>
            <span>·</span>
            <span>GAME ENGINE</span>
            <span>·</span>
            <span>SYSADMIN</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight theme-text-main">
              {info.name || 'Ковалёв Николай Николаевич'}
            </h1>

            {/* Typing Role Banner */}
            <div className="text-sm sm:text-base font-mono flex items-center gap-2 theme-card p-3.5 rounded-2xl shadow-inner">
              <span className="theme-text-dim">$</span>
              <span className="text-emerald-500 font-semibold">{displayText}</span>
              <span className="w-2 h-4 bg-emerald-500 inline-block animate-pulse"></span>
            </div>

            <p className="theme-text-muted text-base sm:text-lg leading-relaxed max-w-2xl">
              {info.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href={`https://t.me/${info.telegram?.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="theme-btn-primary font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-xl"
              >
                <Send size={16} />
                <span>Связаться в Telegram</span>
              </a>

              <a 
                href="#projects" 
                className="theme-btn-outline font-semibold px-6 py-3 rounded-full flex items-center gap-2"
              >
                <span>Смотреть проекты</span>
                <ChevronRight size={16} />
              </a>

              <a 
                href={info.github || 'https://github.com/molokortx20-art'}
                target="_blank"
                rel="noreferrer"
                className="theme-btn-outline font-semibold px-5 py-3 rounded-full flex items-center gap-2"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right Profile Code Card */}
          <div className="lg:col-span-5 theme-card rounded-3xl p-6 font-mono text-xs leading-relaxed space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-main)] theme-text-dim">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="text-[11px] theme-text-dim">developer_profile.json</span>
            </div>

            <div className="space-y-1.5 font-mono">
              <div><span className="theme-text-dim">// Personal developer manifesto</span></div>
              <div><span className="text-emerald-500">const</span> developer = &#123;</div>
              <div className="pl-4">name: <span className="text-emerald-600 dark:text-emerald-300">"{info.name}"</span>,</div>
              <div className="pl-4">handle: <span className="text-emerald-600 dark:text-emerald-300">"@molokortx20-art"</span>,</div>
              <div className="pl-4">core_projects: [<span className="text-emerald-600 dark:text-emerald-300">"GameCore-Panel"</span>, <span className="text-emerald-600 dark:text-emerald-300">"wallpaper"</span>, <span className="text-emerald-600 dark:text-emerald-300">"CoordHud"</span>],</div>
              <div className="pl-4">specialization: <span className="text-emerald-600 dark:text-emerald-300">"Fullstack Web & Game Systems"</span>,</div>
              <div className="pl-4">tech_stack: [<span className="text-emerald-600 dark:text-emerald-300">"React"</span>, <span className="text-emerald-600 dark:text-emerald-300">"TypeScript"</span>, <span className="text-emerald-600 dark:text-emerald-300">"Node.js"</span>, <span className="text-emerald-600 dark:text-emerald-300">"C++"</span>, <span className="text-emerald-600 dark:text-emerald-300">"Linux"</span>],</div>
              <div className="pl-4">fast_learner: <span className="text-emerald-500">true</span></div>
              <div>&#125;;</div>
            </div>
          </div>

        </div>

        {/* 3 Stats Cards in Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="theme-card rounded-2xl p-6 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
              <Server size={24} />
            </div>
            <div>
              <div className="text-base font-extrabold tracking-wide theme-text-main">GAME SERVERS</div>
              <div className="text-xs theme-text-muted">CS2, Garry's Mod, Rust, Minecraft</div>
            </div>
          </div>

          <div className="theme-card rounded-2xl p-6 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
              <Code size={24} />
            </div>
            <div>
              <div className="text-base font-extrabold tracking-wide theme-text-main">FULLSTACK WEB</div>
              <div className="text-xs theme-text-muted">React, TypeScript, Node.js, REST API</div>
            </div>
          </div>

          <div className="theme-card rounded-2xl p-6 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
              <GraduationCap size={24} />
            </div>
            <div>
              <div className="text-base font-extrabold tracking-wide theme-text-main">ВУЗ ОБУЧЕНИЕ</div>
              <div className="text-xs theme-text-muted">Информационные системы и технологии</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
