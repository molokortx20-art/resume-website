import React from 'react';
import { PersonalInfo } from '../types';
import { UserCheck, Sparkles, BookOpen, Mail, Send, MapPin, Terminal } from 'lucide-react';

interface AboutProps {
  info: PersonalInfo;
}

export const About: React.FC<AboutProps> = ({ info }) => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-emerald-500 uppercase">ОБО МНЕ</span>
          <h2 className="text-3xl font-extrabold flex items-center gap-3 theme-text-main">
            <UserCheck className="text-emerald-500" size={32} />
            <span>О себе & Ключевые компетенции</span>
          </h2>
          <p className="theme-text-muted text-sm">Проектирование веб-сервисов, системное администрирование и сетевая инженерия.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Bio Card */}
          <div className="theme-card rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3 theme-text-main">
              <Sparkles className="text-emerald-500" size={22} />
              <span>Ключевая Специализация</span>
            </h3>
            <p className="theme-text-muted leading-relaxed text-sm sm:text-base">
              Студент университета по направлению <strong>«Информационные системы и технологии»</strong>. Свободно настраиваю и оптимизирую высоконагруженную инфраструктуру (Linux/Nginx), пишу сложные сетевые сервисы и гейммоды (GLua, C++, Java, Node.js, SQL), а также разрабатываю клиентский веб-фронтенд (React, TypeScript).
            </p>
            <p className="theme-text-muted leading-relaxed text-sm">
              <strong className="text-emerald-500">Быстрая обучаемость</strong> — моё главное преимущество. Мгновенно разбираюсь в чужом коде любого уровня сложности, осваиваю фреймворки и применяю лучшие архитектурные практики.
            </p>
          </div>

          {/* Quick Info Grid Card */}
          <div className="theme-card rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3 theme-text-main">
              <BookOpen className="text-emerald-500" size={22} />
              <span>Прямые Данные</span>
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center gap-4 p-3.5 theme-inner-box rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="theme-text-dim text-[11px]">EMAIL</div>
                  <a href={`mailto:${info.email}`} className="theme-text-main font-semibold hover:text-emerald-500 transition">{info.email || 'kkovalev939@gmail.com'}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 theme-inner-box rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
                  <Send size={18} />
                </div>
                <div>
                  <div className="theme-text-dim text-[11px]">TELEGRAM</div>
                  <a href={`https://t.me/${info.telegram?.replace('@', '')}`} target="_blank" rel="noreferrer" className="theme-text-main font-semibold hover:text-emerald-500 transition">{info.telegram || '@fivvcdd'}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 theme-inner-box rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="theme-text-dim text-[11px]">LOCATION</div>
                  <div className="theme-text-main font-semibold">{info.location || 'Россия'}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 theme-inner-box rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
                  <Terminal size={18} />
                </div>
                <div>
                  <div className="theme-text-dim text-[11px]">EDUCATION</div>
                  <div className="theme-text-main font-semibold">{info.education}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
