// experience component
import React, { useState } from 'react';
import { ExperienceItem } from '../types';
import { Briefcase, ChevronDown, ChevronUp, Calendar, Layers } from 'lucide-react';
import { PixelCard, TerminalText } from './TerminalComponents';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  // accordion state
  const [openIds, setOpenIds] = useState<number[]>([experience[0]?.id || 1]);

  const toggleAccordion = (id: number) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="experience" style={{ padding: '80px 0' }}>
      <div className="container">
        {/* title */}
        <h2 className="section-title">
          <Briefcase className="text-accent" size={32} />
          <span>Опыт <span className="text-gradient">Разработки & Администрирования</span></span>
        </h2>
        <div style={{ marginBottom: '24px' }}>
          <TerminalText text="git log --experience-history --author='molokortx20-art'" prefix="$ " />
        </div>

        {/* list */}
        <div className="experience-list">
          {experience.map(exp => {
            const isOpen = openIds.includes(exp.id);
            const techList = exp.technologies ? exp.technologies.split(',').map(t => t.trim()) : [];

            return (
              <PixelCard
                key={exp.id}
                style={{ padding: '24px', cursor: 'pointer' }}
                onClick={() => toggleAccordion(exp.id)}
              >
                {/* header */}
                <div className="exp-header">
                  <div>
                    <h3 className="exp-title font-mono">{exp.position}</h3>
                    <div className="exp-company font-mono">{exp.company}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="exp-period">
                      <Calendar size={13} style={{ display: 'inline', marginRight: '6px' }} />
                      {exp.period}
                    </div>

                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {/* details */}
                {isOpen && (
                  <div className="exp-details">
                    <p style={{ lineHeight: '1.7', marginBottom: '16px' }}>{exp.description}</p>

                    {/* tags */}
                    {techList.length > 0 && (
                      <div className="tech-tags">
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '4px' }} className="font-mono">
                          <Layers size={14} /> Стек:
                        </span>
                        {techList.map((t, idx) => (
                          <span key={idx} className="tag">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </PixelCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
