// contact component
import React, { useState } from 'react';
import { PersonalInfo } from '../types';
import { Mail, Send, MapPin, Github, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PixelCard, TerminalText } from './TerminalComponents';

interface ContactProps {
  info: PersonalInfo;
  onShowToast: (msg: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ info, onShowToast }) => {
  // form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; msg: string }>({ type: null, msg: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', msg: 'Заполните все поля!' });
      return;
    }

    setLoading(true);
    setStatus({ type: null, msg: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ type: 'success', msg: 'Сообщение сохранено в базе данных!' });
        setFormData({ name: '', email: '', message: '' });
        onShowToast('Сообщение успешно отправлено и записано в БД!');

        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Ошибка отправки сообщения' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Не удалось связаться с REST API бэкендом.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '80px 0' }}>
      <div className="container">
        {/* title */}
        <h2 className="section-title">
          <MessageSquare className="text-accent" size={32} />
          <span>Прямая <span className="text-gradient">Связь & Сообщение в БД</span></span>
        </h2>
        <div style={{ marginBottom: '24px' }}>
          <TerminalText text="net.connect --recipient='Nikolai Kovalev'" prefix="$ " />
        </div>

        {/* grid */}
        <div className="contact-grid">
          {/* info */}
          <PixelCard style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '24px' }} className="font-mono">Контакты</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href={`mailto:${info.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                  <Mail size={22} className="text-accent" />
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }} className="font-mono">EMAIL</div>
                    <div style={{ fontWeight: 600 }} className="font-mono">{info.email}</div>
                  </div>
                </div>
              </a>

              <a href={`https://t.me/${info.telegram?.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                  <Send size={22} className="text-accent" />
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }} className="font-mono">TELEGRAM</div>
                    <div style={{ fontWeight: 600 }} className="font-mono">{info.telegram}</div>
                  </div>
                </div>
              </a>

              <a href={info.github} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                  <Github size={22} className="text-accent" />
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }} className="font-mono">GITHUB</div>
                    <div style={{ fontWeight: 600 }} className="font-mono">@molokortx20-art</div>
                  </div>
                </div>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                <MapPin size={22} className="text-accent" />
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }} className="font-mono">LOCATION</div>
                  <div style={{ fontWeight: 600 }} className="font-mono">{info.location}</div>
                </div>
              </div>
            </div>
          </PixelCard>

          {/* form */}
          <PixelCard style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '24px' }} className="font-mono">Форма Отправки</h3>

            {status.msg && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '4px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: status.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: status.type === 'success' ? '#10b981' : '#ef4444',
                border: `1px solid ${status.type === 'success' ? '#10b981' : '#ef4444'}`,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem'
              }}>
                {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{status.msg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">$ INPUT_NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Имя / Компания"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">$ INPUT_CONTACT</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email или @telegram"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">$ INPUT_MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Текст сообщения..."
                  className="form-textarea"
                  required
                ></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
                {loading ? 'ЗАПИСЬ В БД...' : 'ОТПРАВИТЬ В БД'}
              </button>
            </form>
          </PixelCard>
        </div>
      </div>
    </section>
  );
};
