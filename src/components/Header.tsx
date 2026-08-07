import React, { useState } from 'react';
import { Sun, Moon, FileDown, Menu, X, Send, Github } from 'lucide-react';

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
    <header className="sticky top-0 z-50 w-full border-b theme-header backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight hover:opacity-90 transition whitespace-nowrap theme-text-main">
          <span className="text-emerald-500 text-xl font-bold">✦</span>
          <span>Николай Ковалёв</span>
          <span className="theme-text-dim font-mono text-xs font-normal hidden sm:inline">/ molokortx20</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium theme-text-muted">
          <a href="#about" className="px-3.5 py-1.5 rounded-full hover:theme-text-main hover:bg-[#10b981]/10 transition whitespace-nowrap">О себе</a>
          <a href="#skills" className="px-3.5 py-1.5 rounded-full hover:theme-text-main hover:bg-[#10b981]/10 transition whitespace-nowrap">Навыки</a>
          <a href="#experience" className="px-3.5 py-1.5 rounded-full hover:theme-text-main hover:bg-[#10b981]/10 transition whitespace-nowrap">Опыт</a>
          <a href="#projects" className="px-3.5 py-1.5 rounded-full hover:theme-text-main hover:bg-[#10b981]/10 transition whitespace-nowrap">Проекты</a>
          <a href="#contact" className="px-3.5 py-1.5 rounded-full hover:theme-text-main hover:bg-[#10b981]/10 transition whitespace-nowrap">Контакты</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a href="https://t.me/fivvcdd" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full theme-card hidden sm:flex items-center justify-center theme-text-muted hover:theme-text-main hover:border-emerald-500 transition" title="Telegram">
            <Send size={15} />
          </a>
          <a href="https://github.com/molokortx20-art" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full theme-card hidden sm:flex items-center justify-center theme-text-muted hover:theme-text-main hover:border-emerald-500 transition" title="GitHub">
            <Github size={15} />
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full theme-card flex items-center justify-center theme-text-main hover:border-emerald-500 transition"
            title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
          >
            {theme === 'dark' ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-blue-500" />}
          </button>

          {/* PDF Download button */}
          <button onClick={onDownloadPdf} className="theme-btn-primary font-semibold text-xs px-4 py-2 rounded-full transition flex items-center gap-1.5 shadow-lg">
            <FileDown size={14} />
            <span>PDF</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-full theme-card md:hidden flex items-center justify-center theme-text-main"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden theme-card border-b px-4 py-3 flex flex-col gap-2">
          <a href="#about" onClick={closeMenu} className="px-4 py-2 text-sm rounded-lg hover:bg-[#10b981]/10">О себе</a>
          <a href="#skills" onClick={closeMenu} className="px-4 py-2 text-sm rounded-lg hover:bg-[#10b981]/10">Навыки</a>
          <a href="#experience" onClick={closeMenu} className="px-4 py-2 text-sm rounded-lg hover:bg-[#10b981]/10">Опыт</a>
          <a href="#projects" onClick={closeMenu} className="px-4 py-2 text-sm rounded-lg hover:bg-[#10b981]/10">Проекты</a>
          <a href="#contact" onClick={closeMenu} className="px-4 py-2 text-sm rounded-lg hover:bg-[#10b981]/10">Контакты</a>
        </div>
      )}
    </header>
  );
};
