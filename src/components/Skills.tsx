// skills component
import React, { useState } from 'react';
import { Skill } from '../types';
import { Cpu, Code2, Server, Terminal, Database, FileCode, Layout, Zap, Gamepad2, Globe, Layers } from 'lucide-react';
import { PixelCard, TerminalText } from './TerminalComponents';

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeTab, setActiveTab] = useState<string>('Все');

  // categories
  const categories = ['Все', 'Frontend', 'Backend & DB', 'System & Game Dev'];

  const filteredSkills = activeTab === 'Все'
    ? skills
    : skills.filter(s => s.category.toLowerCase().includes(activeTab.toLowerCase()) || activeTab.toLowerCase().includes(s.category.toLowerCase()));

  // skill icon helper
  const getSkillIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('react')) return <Code2 size={20} className="text-accent" />;
    if (n.includes('typescript') || n.includes('javascript')) return <FileCode size={20} className="text-accent" />;
    if (n.includes('html') || n.includes('css')) return <Layout size={20} className="text-accent" />;
    if (n.includes('vite')) return <Zap size={20} className="text-accent" />;
    if (n.includes('node') || n.includes('express')) return <Server size={20} className="text-accent" />;
    if (n.includes('sql') || n.includes('db')) return <Database size={20} className="text-accent" />;
    if (n.includes('linux') || n.includes('bash')) return <Terminal size={20} className="text-accent" />;
    if (n.includes('nginx')) return <Cpu size={20} className="text-accent" />;
    if (n.includes('garry') || n.includes('lua')) return <Gamepad2 size={20} className="text-accent" />;
    if (n.includes('php')) return <Globe size={20} className="text-accent" />;
    return <Layers size={20} className="text-accent" />;
  };

  return (
    <section id="skills" style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* header */}
        <h2 className="section-title">
          <Cpu className="text-accent" size={32} />
          <span>Технические <span className="text-gradient">Навыки & Стек</span></span>
        </h2>
        <div style={{ marginBottom: '24px' }}>
          <TerminalText text="fetch --stack-metrics --all-categories" prefix="$ " />
        </div>

        {/* tab buttons */}
        <div className="skills-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* skills grid */}
        <div className="skills-grid">
          {filteredSkills.map(skill => (
            <PixelCard key={skill.id} style={{ padding: '20px' }}>
              <div className="skill-header">
                <div className="skill-title font-mono">
                  {getSkillIcon(skill.name)}
                  <span>{skill.name}</span>
                </div>
                <span className="skill-percent">{skill.percentage}%</span>
              </div>

              {/* progress bar */}
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
            </PixelCard>
          ))}
        </div>
      </div>
    </section>
  );
};
