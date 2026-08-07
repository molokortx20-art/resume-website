import React, { useState, useEffect } from 'react';
import { ResumeData, ContactMessage } from '../types';
import { X, Lock, LogOut, Plus, Trash2, Save, Mail, Code, Briefcase, FolderGit2, UserCheck } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onRefresh: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  resumeData,
  onRefresh,
  onShowToast
}) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [password, setPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'info' | 'skills' | 'experience' | 'projects' | 'messages'>('info');

  // Form states
  const [infoForm, setInfoForm] = useState(resumeData.info);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // New Skill Form
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend', percentage: 85, icon: 'Code2' });

  // New Experience Form
  const [newExp, setNewExp] = useState({ company: '', position: '', period: '', description: '', technologies: '' });

  // New Project Form
  const [newProj, setNewProj] = useState({ title: '', category: 'Fullstack', description: '', tech_stack: '', github_url: '', badge: '' });

  useEffect(() => {
    setInfoForm(resumeData.info);
  }, [resumeData.info]);

  useEffect(() => {
    if (token && activeTab === 'messages') {
      fetchMessages();
    }
  }, [token, activeTab]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('adminToken', data.token);
        onShowToast('Успешный вход в Админ-панель!');
      } else {
        setAuthError(data.error || 'Неверный пароль!');
      }
    } catch (err) {
      setAuthError('Ошибка подключения к бэкенду REST API');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('adminToken');
    onShowToast('Вы вышли из Админ-панели');
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(infoForm),
      });
      if (res.ok) {
        onShowToast('Персональная информация сохранена в БД!');
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSkill),
      });
      if (res.ok) {
        onShowToast('Новый навык добавлен!');
        setNewSkill({ name: '', category: 'Frontend', percentage: 85, icon: 'Code2' });
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        onShowToast('Навык удален из БД');
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddExp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newExp),
      });
      if (res.ok) {
        onShowToast('Опыт работы добавлен!');
        setNewExp({ company: '', position: '', period: '', description: '', technologies: '' });
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteExp = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/experience/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        onShowToast('Запись удалена');
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProj),
      });
      if (res.ok) {
        onShowToast('Проект добавлен в портфолио!');
        setNewProj({ title: '', category: 'Fullstack', description: '', tech_stack: '', github_url: '', badge: '' });
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        onShowToast('Проект удален');
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        onShowToast('Сообщение удалено из БД');
        fetchMessages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {!token ? (
          // Login Form
          <div style={{ maxWidth: '400px', margin: '20px auto', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white' }}>
              <Lock size={28} />
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Вход в Админ-панель</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
              Пароль по умолчанию: <code style={{ color: 'var(--primary)' }}>admin123</code>
            </p>

            {authError && (
              <div style={{ padding: '10px', background: 'rgba(239,68,68,0.2)', color: '#ef4444', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem' }}>
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label className="form-label">Пароль администратора</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
                Авторизоваться
              </button>
            </form>
          </div>
        ) : (
          // Admin Dashboard
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Lock size={22} className="text-accent" />
                  <span>Управление данными резюме (REST API)</span>
                </h2>
              </div>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                <LogOut size={16} />
                <span>Выйти</span>
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="skills-tabs" style={{ marginBottom: '24px' }}>
              <button className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
                <UserCheck size={16} style={{ display: 'inline', marginRight: '6px' }} /> Инфо
              </button>
              <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
                <Code size={16} style={{ display: 'inline', marginRight: '6px' }} /> Навыки
              </button>
              <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
                <Briefcase size={16} style={{ display: 'inline', marginRight: '6px' }} /> Опыт
              </button>
              <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
                <FolderGit2 size={16} style={{ display: 'inline', marginRight: '6px' }} /> Проекты
              </button>
              <button className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
                <Mail size={16} style={{ display: 'inline', marginRight: '6px' }} /> Сообщения ({messages.length})
              </button>
            </div>

            {/* TAB 1: Personal Info */}
            {activeTab === 'info' && (
              <form onSubmit={handleSaveInfo}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">ФИО</label>
                    <input type="text" value={infoForm.name || ''} onChange={e => setInfoForm({...infoForm, name: e.target.value})} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Должность / Специализация</label>
                    <input type="text" value={infoForm.title || ''} onChange={e => setInfoForm({...infoForm, title: e.target.value})} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="text" value={infoForm.email || ''} onChange={e => setInfoForm({...infoForm, email: e.target.value})} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telegram</label>
                    <input type="text" value={infoForm.telegram || ''} onChange={e => setInfoForm({...infoForm, telegram: e.target.value})} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">GitHub</label>
                    <input type="text" value={infoForm.github || ''} onChange={e => setInfoForm({...infoForm, github: e.target.value})} className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Локация</label>
                    <input type="text" value={infoForm.location || ''} onChange={e => setInfoForm({...infoForm, location: e.target.value})} className="form-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Образование</label>
                  <input type="text" value={infoForm.education || ''} onChange={e => setInfoForm({...infoForm, education: e.target.value})} className="form-input" />
                </div>

                <div className="form-group">
                  <label className="form-label">О себе (Bio)</label>
                  <textarea value={infoForm.bio || ''} onChange={e => setInfoForm({...infoForm, bio: e.target.value})} className="form-textarea"></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  <Save size={18} />
                  <span>Сохранить в базу данных</span>
                </button>
              </form>
            )}

            {/* TAB 2: Skills */}
            {activeTab === 'skills' && (
              <div>
                <h4 style={{ marginBottom: '16px' }}>Добавить навык в БД</h4>
                <form onSubmit={handleAddSkill} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr auto', gap: '12px', marginBottom: '24px' }}>
                  <input type="text" placeholder="Название (напр. React)" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} className="form-input" required />
                  <select value={newSkill.category} onChange={e => setNewSkill({...newSkill, category: e.target.value})} className="form-input">
                    <option value="Frontend">Frontend</option>
                    <option value="Backend & DB">Backend & DB</option>
                    <option value="System & Game Dev">System & Game Dev</option>
                  </select>
                  <input type="number" min="1" max="100" placeholder="%" value={newSkill.percentage} onChange={e => setNewSkill({...newSkill, percentage: Number(e.target.value)})} className="form-input" required />
                  <button type="submit" className="btn btn-primary">
                    <Plus size={18} />
                  </button>
                </form>

                <h4>Существующие навыки в БД</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                  {resumeData.skills.map(s => (
                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                      <div>
                        <strong>{s.name}</strong> <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>({s.category} — {s.percentage}%)</span>
                      </div>
                      <button onClick={() => handleDeleteSkill(s.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Experience */}
            {activeTab === 'experience' && (
              <div>
                <h4 style={{ marginBottom: '16px' }}>Добавить запись опыта</h4>
                <form onSubmit={handleAddExp} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <input type="text" placeholder="Должность" value={newExp.position} onChange={e => setNewExp({...newExp, position: e.target.value})} className="form-input" required />
                    <input type="text" placeholder="Компания / Проект" value={newExp.company} onChange={e => setNewExp({...newExp, company: e.target.value})} className="form-input" required />
                    <input type="text" placeholder="Период (2023 - Наст.)" value={newExp.period} onChange={e => setNewExp({...newExp, period: e.target.value})} className="form-input" required />
                  </div>
                  <input type="text" placeholder="Технологии (через запятую)" value={newExp.technologies} onChange={e => setNewExp({...newExp, technologies: e.target.value})} className="form-input" />
                  <textarea placeholder="Описание обязанностей и достижений..." value={newExp.description} onChange={e => setNewExp({...newExp, description: e.target.value})} className="form-textarea" required></textarea>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                    <Plus size={18} /> Добавить опыт
                  </button>
                </form>

                <h4>Существующий опыт в БД</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                  {resumeData.experience.map(e => (
                    <div key={e.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                      <div>
                        <strong>{e.position}</strong> — <span style={{ color: 'var(--primary)' }}>{e.company}</span> ({e.period})
                      </div>
                      <button onClick={() => handleDeleteExp(e.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Projects */}
            {activeTab === 'projects' && (
              <div>
                <h4 style={{ marginBottom: '16px' }}>Добавить проект</h4>
                <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <input type="text" placeholder="Название проекта" value={newProj.title} onChange={e => setNewProj({...newProj, title: e.target.value})} className="form-input" required />
                    <select value={newProj.category} onChange={e => setNewProj({...newProj, category: e.target.value})} className="form-input">
                      <option value="Game Dev / Lua">Game Dev / Lua</option>
                      <option value="Fullstack">Fullstack</option>
                      <option value="System / Backend">System / Backend</option>
                    </select>
                    <input type="text" placeholder="Метка (Badge)" value={newProj.badge} onChange={e => setNewProj({...newProj, badge: e.target.value})} className="form-input" />
                  </div>
                  <input type="text" placeholder="Ссылка GitHub" value={newProj.github_url} onChange={e => setNewProj({...newProj, github_url: e.target.value})} className="form-input" />
                  <input type="text" placeholder="Стек (напр. React, Lua, SQL)" value={newProj.tech_stack} onChange={e => setNewProj({...newProj, tech_stack: e.target.value})} className="form-input" />
                  <textarea placeholder="Описание проекта..." value={newProj.description} onChange={e => setNewProj({...newProj, description: e.target.value})} className="form-textarea" required></textarea>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                    <Plus size={18} /> Добавить проект
                  </button>
                </form>

                <h4>Проекты в БД</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                  {resumeData.projects.map(p => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                      <div>
                        <strong>{p.title}</strong> <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>({p.category})</span>
                      </div>
                      <button onClick={() => handleDeleteProject(p.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: Messages */}
            {activeTab === 'messages' && (
              <div>
                <h4 style={{ marginBottom: '16px' }}>Входящие сообщения из формы контактов</h4>
                {messages.length === 0 ? (
                  <p style={{ color: 'var(--text-dim)' }}>Сообщений пока нет</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {messages.map(msg => (
                      <div key={msg.id} style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div>
                            <strong>{msg.name}</strong> <span style={{ color: 'var(--primary)' }}>({msg.email})</span>
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{new Date(msg.created_at).toLocaleString()}</span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '12px' }}>{msg.message}</p>
                        <button onClick={() => handleDeleteMessage(msg.id)} className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                          <Trash2 size={14} /> Удалить
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
