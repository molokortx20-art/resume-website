import React, { useState } from 'react';
import { Skill } from '../types';
import { Cpu } from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend & DB', 'System & Game Dev'];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-emerald-500 uppercase">НАВЫКИ & СТЕК</span>
          <h2 className="text-3xl font-extrabold flex items-center gap-3 theme-text-main">
            <Cpu className="text-emerald-500" size={32} />
            <span>Технологический Стек</span>
          </h2>
          <p className="theme-text-muted text-sm">Технологии и фреймворки, используемые в коммерческих и инфраструктурных проектах.</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-xs transition border ${
                activeCategory === cat 
                  ? 'bg-emerald-500 text-black border-emerald-500 font-bold' 
                  : 'theme-card theme-text-muted hover:theme-text-main'
              }`}
            >
              {cat === 'All' ? 'Все технологии' : cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="theme-card rounded-2xl p-6 group">
              <div className="flex items-center justify-between font-mono">
                <span className="font-bold text-sm theme-text-main group-hover:text-emerald-500 transition">{skill.name}</span>
                <span className="text-emerald-500 font-extrabold text-xs">{skill.percentage}%</span>
              </div>
              
              <div className="text-xs theme-text-dim font-mono mt-1">{skill.category}</div>

              <div className="w-full h-1.5 theme-inner-box rounded-full overflow-hidden mt-3">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
