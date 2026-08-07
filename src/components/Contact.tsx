// contact component
import React from 'react';
import { PersonalInfo } from '../types';
import { Mail, Send, MapPin, Github, MessageSquare } from 'lucide-react';
import { PixelCard } from './TerminalComponents';

interface ContactProps {
  info: PersonalInfo;
  onShowToast?: (msg: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ info }) => {
  return (
    <section id="contact" style={{ padding: '80px 0' }}>
      <div className="container">
        {/* clean section title */}
        <h2 className="section-title" style={{ marginBottom: '36px', justifyContent: 'center' }}>
          <MessageSquare className="text-accent" size={32} />
          <span>Контакты</span>
        </h2>

        {/* clean direct contacts cards without forms */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
          {/* email */}
          <a href={`mailto:${info.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <PixelCard style={{ padding: '24px', height: '100%', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                <Mail size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }} className="font-mono">EMAIL</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }} className="font-mono">{info.email || 'kkovalev939@gmail.com'}</div>
              </div>
            </PixelCard>
          </a>

          {/* telegram */}
          <a href={`https://t.me/${info.telegram?.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <PixelCard style={{ padding: '24px', height: '100%', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                <Send size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }} className="font-mono">TELEGRAM</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }} className="font-mono">{info.telegram || '@fivvcdd'}</div>
              </div>
            </PixelCard>
          </a>

          {/* github */}
          <a href={info.github || 'https://github.com/molokortx20-art'} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <PixelCard style={{ padding: '24px', height: '100%', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                <Github size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }} className="font-mono">GITHUB</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }} className="font-mono">@molokortx20-art</div>
              </div>
            </PixelCard>
          </a>

          {/* location */}
          <PixelCard style={{ padding: '24px', height: '100%', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '6px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
              <MapPin size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }} className="font-mono">LOCATION</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }} className="font-mono">{info.location || 'Россия'}</div>
            </div>
          </PixelCard>
        </div>
      </div>
    </section>
  );
};
