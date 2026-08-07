export interface PersonalInfo {
  id?: number;
  name: string;
  title: string;
  bio: string;
  email: string;
  telegram: string;
  github: string;
  location: string;
  education: string;
  status: string;
}

export interface Skill {
  id: number;
  name: string;
  category: 'Frontend' | 'Backend & DB' | 'System & Game Dev' | string;
  percentage: number;
  icon?: string;
}

export interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  tech_stack: string;
  github_url?: string;
  demo_url?: string;
  badge?: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface ResumeData {
  info: PersonalInfo;
  skills: Skill[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
}
