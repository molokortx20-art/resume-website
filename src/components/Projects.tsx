// projects component
import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { FolderGit2, Github, ExternalLink, Code, Server, Gamepad2 } from 'lucide-react';
import { PixelCard, TerminalText } from './TerminalComponents';

interface ProjectsProps {
  projects: ProjectItem[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [filter, setFilter] = useState<string>('Все');

  // filter categories
  const categories = ['Все', 'Fullstack / Backend', 'Frontend', 'Game Dev / Systems'];

  const filteredProjects = filter === 'Все'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(p.category.toLowerCase()));

  // category icon
  const getProjectIcon = (category: string) => {
    if (category.includes('Game') || category.includes('Lua')) return <Gamepad2 size={24} className="text-accent" />;
    if (category.includes('Fullstack')) return <Code size={24} className="text-accent" />;
    return <Server size={24} className="text-accent" />;
  };

  return (
    <section id="projects" style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
      <div className="container">
        {/* title */}
        <h2 className="section-title">
          <FolderGit2 className="text-accent" size={32} />
          <span>Реальный Код & <span className="text-gradient">Репозитории</span></span>
        </h2>
        <div style={{ marginBottom: '24px' }}>
          <TerminalText text="gh repo list molokortx20-art --type=public" prefix="$ " />
        </div>

        {/* filter buttons */}
        <div className="skills-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`tab-btn ${filter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* projects grid with pixel perfect equalized height */}
        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
          {filteredProjects.map(project => {
            const techList = project.tech_stack ? project.tech_stack.split(',').map(t => t.trim()) : [];

            return (
              <PixelCard key={project.id} style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                {/* top section */}
                <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                  {/* badge & icon */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '4px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {getProjectIcon(project.category)}
                    </div>
                    {project.badge && <span className="project-badge">{project.badge}</span>}
                  </div>

                  {/* clean title without dash or extra text */}
                  <h3 className="project-title font-mono" style={{ fontSize: '1.35rem', marginBottom: '12px', height: '36px', display: 'flex', alignItems: 'center' }}>
                    {project.title}
                  </h3>

                  {/* description */}
                  <p className="project-desc" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.6', minHeight: '90px' }}>
                    {project.description}
                  </p>

                  {/* tech stack tags with fixed 80px height container for 100% horizontal alignment */}
                  <div className="tech-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', height: '80px', alignContent: 'flex-start', overflow: 'hidden' }}>
                    {techList.map((tech, idx) => (
                      <span key={idx} className="tag">{tech}</span>
                    ))}
                  </div>
                </div>

                {/* footer links pinned to exact same bottom pixel */}
                <div className="project-footer font-mono" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: 'auto' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    {project.category}
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-btn"
                        title="GitHub Repository"
                        style={{ width: '36px', height: '36px' }}
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-btn"
                        title="Live Link"
                        style={{ width: '36px', height: '36px' }}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </PixelCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
