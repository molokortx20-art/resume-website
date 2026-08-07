// about component
import React from 'react';
import { PersonalInfo } from '../types';
import { UserCheck, BookOpen, Terminal, Sparkles, MapPin, Mail, Send } from 'lucide-react';
import { PixelCard, TerminalText } from './TerminalComponents';

interface AboutProps {
  info: PersonalInfo;
}

export const About: React.FC<AboutProps> = ({ info }) => {
  return (
    <section id="about" style={{ padding: '80px 0' }}>
      <div className="container">
        {/* title */}
        <h2 className="section-title">
          <UserCheck className="text-accent" size={32} />
          <span>Обо <span className="text-gradient">мне & Направлении</span></span>
        </h2>
        <div style={{ marginBottom: '32px' }}>
          <TerminalText text="system.getProfileInfo() --loading university & dev experience..." prefix="$ " />
        </div>

        {/* content grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {/* bio card */}
          <PixelCard style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles className="text-accent" size={22} />
              <span className="font-mono">Ключевая Специализация</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.7' }}>
              Студент университета по направлению <strong>«Информационные системы и технологии»</strong>. Свободно настраиваю и оптимизирую высоконагруженную инфраструктуру (Linux/Nginx), пишу сложные сетевые сервисы и гейммоды (GLua, HermessUI, C++, Java, Node.js, SQL), а также разрабатываю клиентский веб-фронтенд (React, TypeScript).
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
              <strong>Быстрая обучаемость</strong> — моё главное преимущество. Мгновенно разбираюсь в чужом коде любого уровня сложности, осваиваю фреймворки и применяю лучшие практики в архитектуре.
            </p>
          </PixelCard>

          {/* info card */}
          <PixelCard style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen className="text-accent" size={22} />
              <span className="font-mono">Прямые Данные</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>EMAIL</div>
                  <a href={`mailto:${info.email}`} style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{info.email || 'kkovalev939@gmail.com'}</a>
                </div>
              </div>

              {/* telegram */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Send size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>TELEGRAM</div>
                  <a href={`https://t.me/${info.telegram?.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{info.telegram || '@fivvcdd'}</a>
                </div>
              </div>

              {/* location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>LOCATION</div>
                  <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{info.location || 'Россия'}</div>
                </div>
              </div>

              {/* university */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Terminal size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>EDUCATION</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>{info.education}</div>
                </div>
              </div>
            </div>
          </PixelCard>
        </div>
      </div>
    </section>
  );
};
