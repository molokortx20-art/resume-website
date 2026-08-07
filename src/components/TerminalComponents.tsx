import React, { useState, useEffect } from 'react';

interface TerminalTextProps {
  text: string;
  speed?: number;
  prefix?: string;
  className?: string;
}

export const TerminalText: React.FC<TerminalTextProps> = ({
  text,
  speed = 30,
  prefix = '> ',
  className = ''
}) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={`terminal-prompt ${className}`}>
      <span>{prefix}{displayed}</span>
      <span className="terminal-cursor"></span>
    </span>
  );
};

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  children,
  className = '',
  style,
  onClick
}) => {
  return (
    <div
      className={`prod-card pixel-grid-container ${className}`}
      style={style}
      onClick={onClick}
    >
      <div className="pixel-grid-overlay">
        {Array.from({ length: 144 }).map((_, idx) => (
          <div
            key={idx}
            className="pixel-square"
            style={{ animationDelay: `${(idx % 12) * 30 + Math.floor(idx / 12) * 25}ms` }}
          />
        ))}
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};
