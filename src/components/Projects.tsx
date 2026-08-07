import React from 'react';
import { Project } from '../types';
import { Layers, Github, ExternalLink } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-emerald-500 uppercase">ПОРТФОЛИО</span>
          <h2 className="text-3xl font-extrabold flex items-center gap-3 theme-text-main">
            <Layers className="text-emerald-500" size={32} />
            <span>Ключевые Проекты</span>
          </h2>
          <p className="theme-text-muted text-sm">Полноценные веб-сервисы, оверлеи и веб-системы управления.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="theme-card rounded-3xl p-6 flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-mono font-bold">
                    {project.badge || project.category}
                  </span>
                  <span className="text-xs font-mono theme-text-dim">{project.category}</span>
                </div>

                <h3 className="text-2xl font-bold theme-text-main group-hover:text-emerald-500 transition">
                  {project.title}
                </h3>

                <p className="theme-text-muted text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[var(--border-main)]">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech_stack.split(',').map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-md theme-inner-box text-[11px] font-mono theme-text-muted">
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {project.github_url && (
                  <a 
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="theme-btn-outline text-xs w-full py-2.5 rounded-full flex items-center justify-center gap-2 font-semibold"
                  >
                    <Github size={15} />
                    <span>Исходный код в GitHub</span>
                    <ExternalLink size={14} className="theme-text-dim" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
