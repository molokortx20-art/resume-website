import React, { useState, useEffect } from 'react';
import { ResumeData } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Heart, Send, Github } from 'lucide-react';

const defaultResumeData: ResumeData = {
  info: {
    name: 'Ковалёв Николай Николаевич',
    title: 'Fullstack Developer & Game Server Engineer',
    bio: 'Разработчик с опытом построения игровых серверов (Garry\'s Mod, CS2, Minecraft, Rust) и современных веб-приложений (React, Node.js, REST API, SQL). Учусь в университете по специальности «Информационные системы и технологии». Быстро обучаюсь, администрирую Linux & Nginx.',
    email: 'kkovalev939@gmail.com',
    telegram: '@fivvcdd',
    github: 'https://github.com/molokortx20-art',
    location: 'Россия',
    education: 'Студент ВУЗа — Информационные системы и технологии',
    status: 'Открыт к предложениям и новым проектам'
  },
  skills: [
    { id: 1, name: 'React', category: 'Frontend', percentage: 90 },
    { id: 2, name: 'TypeScript / JavaScript', category: 'Frontend', percentage: 92 },
    { id: 3, name: 'HTML5 & CSS3 / SCSS', category: 'Frontend', percentage: 95 },
    { id: 4, name: 'Vite & Frontend Tools', category: 'Frontend', percentage: 88 },
    { id: 5, name: 'Node.js & Express REST API', category: 'Backend & DB', percentage: 90 },
    { id: 6, name: 'SQL (SQLite, PostgreSQL, MySQL)', category: 'Backend & DB', percentage: 88 },
    { id: 7, name: 'PHP & Web Services', category: 'Backend & DB', percentage: 80 },
    { id: 8, name: 'Linux Sysadmin & Bash', category: 'System & Game Dev', percentage: 92 },
    { id: 9, name: 'Nginx Web Server', category: 'System & Game Dev', percentage: 90 },
    { id: 10, name: 'Garry\'s Mod (Lua / GLua)', category: 'System & Game Dev', percentage: 95 },
    { id: 11, name: 'C++ / Java', category: 'System & Game Dev', percentage: 82 },
    { id: 12, name: 'Игровые серверы (CS2, Minecraft, Rust)', category: 'System & Game Dev', percentage: 94 }
  ],
  experience: [
    {
      id: 1,
      company: 'Game Server Infrastructure & Development',
      position: 'Lead Game Server Engineer & Linux Sysadmin',
      period: '2025 — 2026',
      description: 'Проектирование и программирование игровых серверов Garry\'s Mod, CS2, Minecraft и Rust. Написание GameCore Panel, CoordHud, плагинов на C++, Java, Lua. Настройка сетевой инфраструктуры Linux & Nginx.',
      technologies: 'React, Node.js, Express REST API, CoordHud, Java, C++, Linux, Nginx, MySQL, SQLite, Bash'
    },
    {
      id: 2,
      company: 'Web Ecosystem & Services',
      position: 'Fullstack Web Developer',
      period: '2025 — 2026',
      description: 'Создание сервисов, личных кабинетов, систем авторизации и автоматической синхронизации данных по REST API в реальном времени.',
      technologies: 'React, TypeScript, Node.js, Express, REST API, PHP, SQL'
    }
  ],
  projects: [
    {
      id: 1,
      title: 'GameCore Panel',
      category: 'Fullstack / Backend',
      description: 'Веб-панель управления и REST API для администрирования игровых серверов (Garry\'s Mod, CS2, Rust). Web-RCON консоль в реальном времени, мониторинг нагрузки CPU/RAM и Steam OAuth 2.0.',
      tech_stack: 'React, TypeScript, Node.js, Express, REST API, SQL',
      github_url: 'https://github.com/molokortx20-art/GameCore-Panel',
      badge: 'Fullstack Engine'
    },
    {
      id: 2,
      title: 'wallpaper',
      category: 'Frontend',
      description: 'Система динамических интерактивных обоев и визуальных эффектов для веб-клиентов и рабочих столов. Пиксельные эффекты, шейдеры и интерактивные анимации.',
      tech_stack: 'React, TypeScript, CSS Animations, Canvas',
      github_url: 'https://github.com/molokortx20-art/wallpaper',
      badge: 'Visual Engine'
    },
    {
      id: 3,
      title: 'CoordHud',
      category: 'Game Dev / Systems',
      description: 'Кастомный оверлей модуль отображения координат, компаса и навигационного худа для Counter-Strike 2 (C++ / Direct3D).',
      tech_stack: 'C++, DirectX, WinAPI',
      github_url: 'https://github.com/molokortx20-art/CoordHud',
      badge: 'HUD Engine'
    }
  ]
};

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.className = nextTheme;
    document.body.className = `${nextTheme}-theme`;
  };

  useEffect(() => {
    document.documentElement.className = theme;
    document.body.className = `${theme}-theme`;
  }, [theme]);

  const fetchResumeData = async () => {
    try {
      const res = await fetch('/api/resume');
      if (res.ok) {
        const data = await res.json();
        if (data.info) {
          setResumeData({
            info: data.info,
            skills: data.skills || [],
            experience: data.experience || [],
            projects: data.projects || [],
          });
        }
      }
    } catch (err) {
      console.log('Using local dataset...');
    }
  };

  useEffect(() => {
    fetchResumeData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onDownloadPdf={handleDownloadPdf}
      />

      <main className="flex-1">
        <Hero info={resumeData.info} theme={theme} />
        <About info={resumeData.info} />
        <Skills skills={resumeData.skills} />
        <Experience experience={resumeData.experience} />
        <Projects projects={resumeData.projects} />
        <Contact info={resumeData.info} onShowToast={showToast} />
      </main>

      {/* Floating Socials (Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
        <a 
          href={`https://t.me/${resumeData.info.telegram?.replace('@', '')}`}
          target="_blank" 
          rel="noreferrer"
          className="w-11 h-11 rounded-full theme-card flex items-center justify-center theme-text-main hover:border-emerald-500 hover:scale-110 transition duration-300 shadow-xl"
          title="Telegram"
        >
          <Send size={18} />
        </a>
        <a 
          href={resumeData.info.github || 'https://github.com/molokortx20-art'} 
          target="_blank" 
          rel="noreferrer"
          className="w-11 h-11 rounded-full theme-card flex items-center justify-center theme-text-main hover:border-emerald-500 hover:scale-110 transition duration-300 shadow-xl"
          title="GitHub"
        >
          <Github size={18} />
        </a>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border-main)] py-12 mt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm theme-text-muted">
          <div className="flex items-center gap-3">
            <span className="theme-text-main font-bold">✦ Ковалёв Николай</span>
            <span className="theme-text-dim font-mono text-xs">© 2026</span>
          </div>

          <p className="font-mono text-xs theme-text-dim">
            Bespoke Production Engine • molokortx20-art
          </p>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast">
          <Heart size={18} className="text-emerald-500 fill-emerald-500/20" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;
