import React from 'react';
import { Experience as ExpType } from '../types';
import { Briefcase } from 'lucide-react';

interface ExperienceProps {
  experience: ExpType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-emerald-500 uppercase">ОПЫТ РАБОТЫ</span>
          <h2 className="text-3xl font-extrabold flex items-center gap-3 theme-text-main">
            <Briefcase className="text-emerald-500" size={32} />
            <span>Инфраструктура & Разработка</span>
          </h2>
          <p className="theme-text-muted text-sm">Опыт создания сетевых панелей, администрирования серверов и fullstack-разработки.</p>
        </div>

        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id} className="theme-card rounded-3xl p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-main)] pb-4">
                <div>
                  <h3 className="text-xl font-bold theme-text-main">{exp.position}</h3>
                  <div className="text-emerald-500 font-mono text-sm font-semibold pt-1">{exp.company}</div>
                </div>
                <span className="px-3.5 py-1 rounded-full theme-inner-box font-mono text-xs text-emerald-500 self-start sm:self-auto font-semibold">{exp.period}</span>
              </div>

              <p className="theme-text-muted leading-relaxed text-sm sm:text-base">
                {exp.description}
              </p>

              {exp.technologies && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.technologies.split(',').map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full theme-inner-box text-xs font-mono theme-text-muted">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
