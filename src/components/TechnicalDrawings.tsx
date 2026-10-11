import React from 'react';

// Reticle crosshair with concentric circle
export const CrosshairReticle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = '#94A3B8',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="1.2" strokeDasharray="3 3" />
    <circle cx="20" cy="20" r="9" stroke={color} strokeWidth="1.2" />
    <circle cx="20" cy="20" r="2.5" fill={color} />
    <line x1="20" y1="2" x2="20" y2="38" stroke={color} strokeWidth="1.2" strokeLinecap="square" />
    <line x1="2" y1="20" x2="38" y2="20" stroke={color} strokeWidth="1.2" strokeLinecap="square" />
  </svg>
);

// Plus mark reticle
export const PlusReticle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 14,
  color = 'rgba(255,255,255,0.4)',
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="square" />
    <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="square" />
  </svg>
);

// Vertical Ruler Scale
export const VerticalRuler: React.FC<{ height?: number; ticks?: number; className?: string }> = ({
  height = 200,
  ticks = 24,
  className = ''
}) => (
  <svg
    width="12"
    height={height}
    viewBox={`0 0 12 ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 select-none ${className}`}
    aria-hidden="true"
  >
    <line x1="11" y1="0" x2="11" y2={height} stroke="#475569" strokeWidth="1.2" />
    {Array.from({ length: ticks }).map((_, i) => {
      const y = (i * (height - 4)) / (ticks - 1) + 2;
      const isMajor = i % 4 === 0;
      const x1 = isMajor ? 2 : 6;
      return (
        <line
          key={i}
          x1={x1}
          y1={y}
          x2="11"
          y2={y}
          stroke="#475569"
          strokeWidth={isMajor ? 1.2 : 0.8}
        />
      );
    })}
  </svg>
);

// Hazard Warning Triangle
export const HazardWarningIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 28,
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path
      d="M24 4 L44 42 H4 Z"
      fill="#FFFFFF"
      stroke="#DC2626"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path
      d="M24 16 V28"
      stroke="#1E293B"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <circle cx="24" cy="35" r="2.2" fill="#1E293B" />
  </svg>
);

// Compact, Sleek Precision Mechanical Bolt Illustration for TL-513
export const BoltFastenerDiagram: React.FC<{ className?: string; animated?: boolean }> = ({
  className = '',
  animated = false
}) => (
  <div className={`relative flex items-center justify-center p-2 ${className}`}>
    <svg
      viewBox="0 0 280 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[210px] h-auto drop-shadow-xs"
    >
      <defs>
        <linearGradient id="boltSteelCompact" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        <linearGradient id="tlFluidCompact" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      {/* Blueprint grid lines */}
      <line x1="15" y1="80" x2="265" y2="80" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="140" y1="15" x2="140" y2="145" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

      {/* Hex Bolt Head */}
      <path
        d="M25 45 L50 35 L75 45 L75 115 L50 125 L25 115 Z"
        fill="url(#boltSteelCompact)"
        stroke="#334155"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line x1="50" y1="35" x2="50" y2="125" stroke="#475569" strokeWidth="1.5" />

      {/* Unthreaded Shank */}
      <rect
        x="75"
        y="55"
        width="35"
        height="50"
        fill="url(#boltSteelCompact)"
        stroke="#334155"
        strokeWidth="1.5"
      />

      {/* Threaded Section */}
      <g>
        {Array.from({ length: 7 }).map((_, i) => {
          const x = 110 + i * 14;
          return (
            <polygon
              key={i}
              points={`${x},55 ${x + 10},50 ${x + 14},55 ${x + 14},105 ${x + 10},110 ${x},105`}
              fill="url(#boltSteelCompact)"
              stroke="#334155"
              strokeWidth="1.2"
            />
          );
        })}
      </g>

      {/* Tip Chamfer */}
      <path
        d="M208 55 L218 62 L218 98 L208 105 Z"
        fill="url(#boltSteelCompact)"
        stroke="#334155"
        strokeWidth="1.5"
      />

      {/* Anaerobic Active Adhesion Area */}
      <rect
        x="142"
        y="53"
        width="50"
        height="54"
        fill="#0284C7"
        fillOpacity="0.22"
        stroke="#0284C7"
        strokeWidth="1.5"
        strokeDasharray="3 2"
        rx="3"
      />

      {/* Adhesive Bead */}
      <path
        d="M165 35 C165 35 156 48 156 54 C156 58.5 160 62 165 62 C170 62 174 58.5 174 54 C174 48 165 35 165 35 Z"
        fill="url(#tlFluidCompact)"
        stroke="#0B2545"
        strokeWidth="1.2"
        className={animated ? 'animate-bounce' : ''}
      />

      <text x="165" y="24" fill="#0B2545" fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fontWeight="600" textAnchor="middle">
        TL-513 ADHESION
      </text>

      {/* Fine Reticle */}
      <circle cx="167" cy="80" r="22" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="2 2" />
      <line x1="167" y1="54" x2="167" y2="106" stroke="#0284C7" strokeWidth="0.8" />
      <line x1="141" y1="80" x2="193" y2="80" stroke="#0284C7" strokeWidth="0.8" />
    </svg>
  </div>
);

// Compact, Sleek Precision Mechanical Pipe Fitting Illustration for TS-523
export const PipeFittingDiagram: React.FC<{ className?: string; animated?: boolean }> = ({
  className = '',
  animated = false
}) => (
  <div className={`relative flex items-center justify-center p-2 ${className}`}>
    <svg
      viewBox="0 0 280 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[210px] h-auto drop-shadow-xs"
    >
      <defs>
        <linearGradient id="fittingSteelCompact" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="tsFluidCompact" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A66A3F" />
          <stop offset="100%" stopColor="#784421" />
        </linearGradient>
      </defs>

      {/* Centerlines */}
      <line x1="20" y1="115" x2="250" y2="115" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="175" y1="15" x2="175" y2="145" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

      {/* 90-Degree Pipe Elbow Body */}
      <path
        d="M 50 92 
           L 130 92 
           A 28 28 0 0 0 158 64 
           L 158 22 
           L 192 22 
           L 192 72 
           A 62 62 0 0 1 130 134 
           L 50 134 
           Z"
        fill="url(#fittingSteelCompact)"
        stroke="#475569"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Male Threaded Joint Entering Port */}
      <rect x="22" y="99" width="40" height="28" fill="#94A3B8" stroke="#334155" strokeWidth="1.5" />
      {Array.from({ length: 4 }).map((_, i) => (
        <line
          key={i}
          x1={30 + i * 7}
          y1="96"
          x2={30 + i * 7}
          y2="130"
          stroke="#475569"
          strokeWidth="1.5"
        />
      ))}

      {/* Upper Threaded Joint Port */}
      <rect x="154" y="10" width="42" height="18" fill="#94A3B8" stroke="#334155" strokeWidth="1.5" />

      {/* Sealant Boundary */}
      <rect
        x="46"
        y="94"
        width="30"
        height="38"
        fill="#784421"
        fillOpacity="0.22"
        stroke="#A66A3F"
        strokeWidth="1.2"
        strokeDasharray="3 2"
        rx="2"
      />

      {/* Sealant Bead Droplet */}
      <path
        d="M61 74 C61 74 53 85 53 89 C53 93.5 56.5 97 61 97 C65.5 97 69 93.5 69 89 C69 85 61 74 61 74 Z"
        fill="url(#tsFluidCompact)"
        stroke="#784421"
        strokeWidth="1.2"
        className={animated ? 'animate-bounce' : ''}
      />

      <text x="61" y="66" fill="#784421" fontSize="8.5" fontFamily="'JetBrains Mono', monospace" fontWeight="600" textAnchor="middle">
        TS-523 SEAL
      </text>

      {/* Reticle */}
      <circle cx="61" cy="113" r="20" stroke="#A66A3F" strokeWidth="0.8" strokeDasharray="2 2" />
      <line x1="61" y1="90" x2="61" y2="136" stroke="#A66A3F" strokeWidth="0.8" />
      <line x1="38" y1="113" x2="84" y2="113" stroke="#A66A3F" strokeWidth="0.8" />
    </svg>
  </div>
);

// 4-Step Technical Icons
export const StepCleanIcon: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = '#0B2545' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="12" y="18" width="16" height="18" rx="2" stroke={color} strokeWidth="2" fill="none" />
    <line x1="16" y1="24" x2="24" y2="24" stroke={color} strokeWidth="1.5" />
    <line x1="16" y1="28" x2="24" y2="28" stroke={color} strokeWidth="1.5" />
    <line x1="16" y1="32" x2="24" y2="32" stroke={color} strokeWidth="1.5" />
    <path d="M28 8 L32 12 M25 15 L29 11 M35 15 L31 19" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const StepApplyIcon: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = '#0B2545' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 6 L28 6 L23 20 L17 20 Z" stroke={color} strokeWidth="2" fill="none" />
    <path d="M20 22 C20 22 16 27 16 30 C16 32.2 17.8 34 20 34 C22.2 34 24 32.2 24 30 C24 27 20 22 20 22 Z" fill="#0284C7" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const StepAssembleIcon: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = '#0B2545' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="20,8 32,15 32,29 20,36 8,29 8,15" stroke={color} strokeWidth="2" fill="none" />
    <circle cx="20" cy="22" r="6" stroke={color} strokeWidth="1.5" />
    <path d="M20 4 A 18 18 0 0 1 37 20" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 2" fill="none" />
    <polygon points="38,20 34,14 40,14" fill="#0284C7" />
  </svg>
);

export const StepCureIcon: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = '#0B2545' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="2" />
    <polyline points="20,12 20,20 26,20" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
