// db storage
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'database.json');

// initial dataset strictly for molokortx20-art
const initialData = {
  personal_info: [{
    id: 1,
    name: 'Ковалёв Николай Николаевич',
    title: 'Fullstack Developer & Game Server Engineer',
    bio: 'Разработчик с опытом построения высоконагруженных игровых серверов (Garry\'s Mod, CS2, Minecraft, Rust) и современных веб-приложений (React, Node.js, REST API, SQL). Учусь в университете по специальности «Информационные системы и технологии». Быстро обучаюсь, администрирую Linux & Nginx.',
    email: 'kkovalev939@gmail.com',
    telegram: '@fivvcdd',
    github: 'https://github.com/molokortx20-art',
    location: 'Россия',
    education: 'Студент ВУЗа — Информационные системы и технологии',
    status: 'Открыт к предложениям и новым проектам'
  }],
  skills: [
    { id: 1, name: 'React', category: 'Frontend', percentage: 90, icon: 'Code2' },
    { id: 2, name: 'TypeScript / JavaScript', category: 'Frontend', percentage: 92, icon: 'FileCode' },
    { id: 3, name: 'HTML5 & CSS3 / SCSS', category: 'Frontend', percentage: 95, icon: 'Layout' },
    { id: 4, name: 'Vite & Frontend Tools', category: 'Frontend', percentage: 88, icon: 'Zap' },
    { id: 5, name: 'Node.js & Express REST API', category: 'Backend & DB', percentage: 90, icon: 'Server' },
    { id: 6, name: 'SQL (SQLite, PostgreSQL, MySQL)', category: 'Backend & DB', percentage: 88, icon: 'Database' },
    { id: 7, name: 'PHP & Web Services', category: 'Backend & DB', percentage: 80, icon: 'Globe' },
    { id: 8, name: 'Linux Sysadmin & Bash', category: 'System & Game Dev', percentage: 92, icon: 'Terminal' },
    { id: 9, name: 'Nginx Web Server', category: 'System & Game Dev', percentage: 90, icon: 'Cpu' },
    { id: 10, name: 'Garry\'s Mod (Lua / GLua)', category: 'System & Game Dev', percentage: 95, icon: 'Gamepad2' },
    { id: 11, name: 'C++ / Java', category: 'System & Game Dev', percentage: 82, icon: 'Code' },
    { id: 12, name: 'Игровые серверы (CS2, Minecraft, Rust)', category: 'System & Game Dev', percentage: 94, icon: 'Layers' }
  ],
  experience: [
    {
      id: 1,
      company: 'Game Server Infrastructure & Development',
      position: 'Lead Game Server Engineer & Linux Sysadmin',
      period: '2021 — Настоящее время',
      description: 'Проектирование и программирование игровых серверов Garry\'s Mod, CS2, Minecraft и Rust. Написание GameCore Panel, CoordHud, плагинов на C++, Java, Lua. Настройка сетевой инфраструктуры Linux & Nginx.',
      technologies: 'React, Node.js, Express REST API, CoordHud, Java, C++, Linux, Nginx, MySQL, SQLite, Bash'
    },
    {
      id: 2,
      company: 'Web Ecosystem & Services',
      position: 'Fullstack Web Developer',
      period: '2023 — Настоящее время',
      description: 'Создание сервисов, личных кабинетов, систем авторизации и автоматической синхронизации данных по REST API в реальном времени.',
      technologies: 'React, TypeScript, Node.js, Express, REST API, PHP, SQL'
    }
  ],
  // target projects from github.com/molokortx20-art (strictly GameCore-Panel, wallpaper, CoordHud)
  projects: [
    {
      id: 1,
      title: 'GameCore Panel — Server Management & REST API',
      category: 'Fullstack / Backend',
      description: 'Единая веб-панель управления и REST API для администрирования игровых серверов (Garry\'s Mod, CS2, Rust). Web-RCON консоль в реальном времени, мониторинг нагрузки CPU/RAM и Steam OAuth 2.0.',
      tech_stack: 'React, TypeScript, Node.js, Express, REST API, SQL',
      github_url: 'https://github.com/molokortx20-art/GameCore-Panel',
      badge: 'Fullstack Engine'
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
      category: 'Game Dev / Systems',
      description: 'Кастомный оверлей модуль отображения координат, компаса и навигационного худа для Counter-Strike 2 (C++ / Direct3D).',
      tech_stack: 'C++, DirectX, WinAPI',
      github_url: 'https://github.com/molokortx20-art/CoordHud',
      badge: 'HUD Engine'
    }
  ],
  messages: []
};

// json db manager
class JSONDatabase {
  constructor() {
    this.init();
  }

  init() {
    // force write initialData to database.json
    this.save(initialData);
  }

  read() {
    try {
      const raw = fs.readFileSync(dbPath, 'utf8');
      return JSON.parse(raw);
    } catch (e) {
      return initialData;
    }
  }

  save(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  }

  // resume getters
  getResumeData() {
    const data = this.read();
    return {
      info: data.personal_info[0] || initialData.personal_info[0],
      skills: data.skills || [],
      experience: data.experience || [],
      projects: data.projects || []
    };
  }

  // contact messages
  addMessage(msg) {
    const data = this.read();
    const id = Date.now();
    const newMsg = { id, ...msg, created_at: new Date().toISOString() };
    data.messages.unshift(newMsg);
    this.save(data);
    return newMsg;
  }
}

export const db = new JSONDatabase();
export default db;
