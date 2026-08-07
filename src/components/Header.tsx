// header navigation component with mobile drawer
import React, { useState } from 'react';
import { Sun, Moon, FileDown, Terminal, Menu, X } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onDownloadPdf: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  toggleTheme,
  onDownloadPdf,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="header">
      <div className="container header-content">
        {/* logo */}
        <a href="#hero" className="logo" onClick={closeMenu}>
          <div className="logo-badge">
            <Terminal size={20} />
          </div>
          <span>
            molokortx20<span className="text-accent">.art</span>
          </span>
        </a>

        {/* desktop nav links */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><a href="#about" className="nav-link">О себе</a></li>
            <li><a href="#skills" className="nav-link">Навыки</a></li>
            <li><a href="#experience" className="nav-link">Опыт работы</a></li>
            <li><a href="#projects" className="nav-link">Проекты</a></li>
            <li><a href="#contact" className="nav-link">Контакты</a></li>
          </ul>
        </nav>

        {/* header actions: theme & pdf */}
        <div className="header-actions">
          {/* theme toggle */}
          <button
            onClick={toggleTheme}
            className="icon-btn"
            title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#2563eb" />}
          </button>

          {/* pdf download */}
          <button onClick={onDownloadPdf} className="btn btn-outline btn-sm">
            <FileDown size={15} />
            <span>PDF</span>
          </button>

          {/* mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="icon-btn mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer font-mono">
          <a href="#about" onClick={closeMenu} className="mobile-nav-link">О себе</a>
          <a href="#skills" onClick={closeMenu} className="mobile-nav-link">Навыки</a>
          <a href="#experience" onClick={closeMenu} className="mobile-nav-link">Опыт работы</a>
          <a href="#projects" onClick={closeMenu} className="mobile-nav-link">Проекты</a>
          <a href="#contact" onClick={closeMenu} className="mobile-nav-link">Контакты</a>
        </div>
      )}
    </header>
  );
};
