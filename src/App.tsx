// main application component
import React, { useState, useEffect } from 'react';
import { ResumeData } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Terminal, Heart } from 'lucide-react';

// default resume dataset strictly for molokortx20-art
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
      period: '2021 — Настоящее время',
      description: 'Проектирование и программирование игровых серверов Garry\'s Mod, CS2, Minecraft и Rust. Написание интерфейса HermessUI, CoordHud, приватных режимов и плагинов на GLua, Java и C++. Настройка сетевой инфраструктуры Linux & Nginx.',
      technologies: 'Lua/GLua, HermessUI, CoordHud, Java, C++, Linux, Nginx, MySQL, SQLite, Bash'
    },
    {
      id: 2,
      company: 'Web Ecosystem & Services',
      position: 'Fullstack Web Developer',
      period: '2023 — Настоящее время',
      description: 'Создание личных кабинетов, систем авторизации и автоматической синхронизации данных по REST API в реальном времени.',
      technologies: 'React, TypeScript, Node.js, Express, REST API, PHP, SQL'
    }
  ],
  // target projects from github.com/molokortx20-art
  projects: [
    {
      id: 1,
      title: 'HermessUI — Modular Game Interface',
      category: 'Game Dev / Lua',
      description: 'Кастомный интерфейс пользователя для игровых серверов Garry\'s Mod. Включает графические виджеты, HUD, интерфейс дуэлей, инвентарей и оптимизированную систему отрисовки.',
      tech_stack: 'GLua, Lua, Web UI, SQL',
      github_url: 'https://github.com/molokortx20-art/HermessUI',
      badge: 'Core UI Framework'
    },
    {
      id: 2,
      title: 'wallpaper — Interactive Visuals & Shader Engine',
      category: 'Frontend',
      description: 'Система динамических интерактивных обоев и визуальных эффектов для веб-клиентов и рабочих столов. Пиксельные эффекты, шейдеры и интерактивные анимации.',
      tech_stack: 'React, TypeScript, CSS Animations, Canvas',
      github_url: 'https://github.com/molokortx20-art/wallpaper',
      badge: 'Visual Engine'
    },
    {
      id: 3,
      title: 'CoordHud — Navigation & Coordinate HUD',
      category: 'Game Dev / Lua',
      description: 'Кастомный модуль отображения координат, компаса и навигационного худа для игровых серверов Garry\'s Mod.',
      tech_stack: 'GLua, Lua, Math API',
      github_url: 'https://github.com/molokortx20-art/CoordHud',
      badge: 'HUD Extension'
    }
  ]
};

export const App: React.FC = () => {
  // theme state
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // toggle theme
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.body.className = `${nextTheme}-theme`;
  };

  // fetch data from rest api
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
      console.log('Using local initial dataset...');
    }
  };

  useEffect(() => {
    fetchResumeData();
  }, []);

  // toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // pdf print export
  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <div className="app-wrapper">
      {/* header */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onDownloadPdf={handleDownloadPdf}
      />

      {/* main content */}
      <main>
        <Hero info={resumeData.info} theme={theme} />
        <About info={resumeData.info} />
        <Skills skills={resumeData.skills} />
        <Experience experience={resumeData.experience} />
        <Projects projects={resumeData.projects} />
        <Contact info={resumeData.info} onShowToast={showToast} />
      </main>

      {/* footer */}
      <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '32px 0', marginTop: '60px' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-badge" style={{ width: '32px', height: '32px' }}>
              <Terminal size={16} />
            </div>
            <span style={{ fontWeight: 700 }} className="font-mono">
              Ковалёв Николай <span className="text-accent">© 2026</span>
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }} className="font-mono">
            Bespoke Production Engine • molokortx20-art
          </p>
        </div>
      </footer>

      {/* toast */}
      {toastMessage && (
        <div className="toast">
          <Heart size={20} className="text-accent" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;
