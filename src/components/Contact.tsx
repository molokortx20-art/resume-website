// contact component
import React, { useState } from 'react';
import { PersonalInfo } from '../types';
import { Mail, Send, MapPin, Github, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PixelCard } from './TerminalComponents';

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
        setStatus({ type: 'success', msg: 'Сообщение успешно отправлено!' });
        setFormData({ name: '', email: '', message: '' });
        onShowToast('Сообщение отправлено!');

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Ошибка отправки сообщения' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Не удалось отправить сообщение.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '80px 0' }}>
      <div className="container">
        {/* clean section title */}
        <h2 className="section-title" style={{ marginBottom: '32px' }}>
          <MessageSquare className="text-accent" size={32} />
          <span>Связаться <span className="text-gradient">со мной</span></span>
        </h2>

        {/* clean grid */}
        <div className="contact-grid">
          {/* contact details */}
          <PixelCard style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '24px' }} className="font-mono">Контактные данные</h3>

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

          {/* clean contact form */}
          <PixelCard style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '24px' }} className="font-mono">Написать сообщение</h3>

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
                <label className="form-label">Ваше имя / Компания</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Имя или Название компании"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email или Telegram</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com или @username"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Сообщение</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Текст вашего сообщения..."
                  className="form-textarea"
                  required
                ></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
                {loading ? 'Отправка...' : 'ОТПРАВИТЬ СООБЩЕНИЕ'}
              </button>
            </form>
          </PixelCard>
        </div>
      </div>
    </section>
  );
};
