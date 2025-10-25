import React from 'react';
import './Logo.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  return (
    <div className={`logo logo-${size}`}>
      <span className="logo-m">M</span>
      <span className="logo-text">y</span>
      <span className="logo-c">C</span>
      <span className="logo-text">ontrol</span>
    </div>
  );
};
