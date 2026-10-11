import React, { useState } from 'react';

interface LattisLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  src?: string;
}

export const LattisLogo: React.FC<LattisLogoProps> = ({
  variant = 'dark',
  className = '',
  size = 'md',
  src
}) => {
  const [imageError, setImageError] = useState(false);
  const isLight = variant === 'light';

  // Default to Footer_logo.png for light/footer variant, Lattis-Logo(5).png for header/dark
  const defaultSrc = isLight ? '/Footer_logo.png' : '/Lattis-Logo(5).png';
  const initialSrc = src || defaultSrc;

  // Responsive sizing configurations
  const sizeClasses = {
    sm: 'h-6 sm:h-7 max-w-[120px] sm:max-w-[140px]',
    md: 'h-7 sm:h-8 lg:h-9 max-w-[130px] sm:max-w-[160px] lg:max-w-[180px]',
    lg: 'h-8 sm:h-9 lg:h-10 max-w-[150px] sm:max-w-[180px] lg:max-w-[200px]'
  };

  return (
    <div
      className={`relative inline-flex items-center justify-start select-none shrink-0 min-w-0 ${sizeClasses[size]} ${className}`}
    >
      {!imageError ? (
        <img
          src={initialSrc}
          alt="LATTIS"
          className="w-full h-full object-contain object-left block"
          style={{ objectFit: 'contain' }}
          onError={(e) => {
            const target = e.currentTarget;
            const current = target.getAttribute('src') || '';
            if (current.startsWith('/')) {
              target.setAttribute('src', current.slice(1));
            } else {
              setImageError(true);
            }
          }}
        />
      ) : (
        <div
          className={`h-full flex items-center px-2 border font-display font-black tracking-wider text-sm sm:text-base transition-colors ${
            isLight
              ? 'text-white border-slate-700 bg-slate-800/60'
              : 'text-slate-900 border-slate-300 bg-slate-100/80'
          }`}
          title="LATTIS Logo"
        >
          <span>LATTIS</span>
        </div>
      )}
    </div>
  );
};
