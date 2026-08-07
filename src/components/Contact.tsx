import React, { useState } from 'react';
import { PersonalInfo } from '../types';
import { Mail, Send, Github, MessageSquare, SendHorizontal } from 'lucide-react';

interface ContactProps {
  info: PersonalInfo;
  onShowToast: (msg: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ info, onShowToast }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Спасибо за сообщение! Ковалёв Николай скоро свяжется с вами.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-emerald-500 uppercase">КОНТАКТЫ</span>
          <h2 className="text-3xl font-extrabold flex items-center gap-3 theme-text-main">
            <MessageSquare className="text-emerald-500" size={32} />
            <span>Связаться Со Мной</span>
          </h2>
          <p className="theme-text-muted text-sm">Открыт к предложениям работы, фрилансу и командной разработке.</p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contacts Info */}
          <div className="md:col-span-5 theme-card rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold theme-text-main">Прямые Каналы Связи</h3>

            <div className="space-y-4 font-mono text-sm">
              <a 
                href={`https://t.me/${info.telegram?.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 theme-inner-box rounded-2xl hover:border-emerald-500 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition shrink-0">
                  <Send size={20} />
                </div>
                <div>
                  <div className="text-xs theme-text-dim">TELEGRAM</div>
                  <div className="font-bold theme-text-main group-hover:text-emerald-500 transition">{info.telegram || '@fivvcdd'}</div>
                </div>
              </a>

              <a 
                href={`mailto:${info.email}`}
                className="flex items-center gap-4 p-4 theme-inner-box rounded-2xl hover:border-emerald-500 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs theme-text-dim">EMAIL</div>
                  <div className="font-bold theme-text-main group-hover:text-emerald-500 transition">{info.email || 'kkovalev939@gmail.com'}</div>
                </div>
              </a>

              <a 
                href={info.github || 'https://github.com/molokortx20-art'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 theme-inner-box rounded-2xl hover:border-emerald-500 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition shrink-0">
                  <Github size={20} />
                </div>
                <div>
                  <div className="text-xs theme-text-dim">GITHUB</div>
                  <div className="font-bold theme-text-main group-hover:text-emerald-500 transition">molokortx20-art</div>
                </div>
              </a>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="md:col-span-7 theme-card rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold theme-text-main">Быстрое Сообщение</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold theme-text-muted">Ваше Имя</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Алексей"
                    className="w-full px-4 py-3 rounded-xl theme-inner-box font-mono text-sm focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold theme-text-muted">Ваш Email или Telegram</label>
                  <input 
                    type="text" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="@telegram или email"
                    className="w-full px-4 py-3 rounded-xl theme-inner-box font-mono text-sm focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold theme-text-muted">Сообщение / Детали Проекта</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Здравствуйте! Хотим предложить вам участие в проекте..."
                  className="w-full px-4 py-3 rounded-xl theme-inner-box font-mono text-sm focus:outline-none focus:border-emerald-500 transition resize-none"
                />
              </div>

              <button 
                type="submit"
                className="theme-btn-primary w-full py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2"
              >
                <SendHorizontal size={16} />
                <span>Отправить сообщение</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
