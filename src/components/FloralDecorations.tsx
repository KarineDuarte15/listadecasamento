import React from 'react';

/**
 * Watercolor floral corners and flourishes modeled directly after Bruna & Riclaube's wedding invitation:
 * - Soft powder blue flowers (#8BB4D9, #A8C8E6, #C5DCF0)
 * - Navy/charcoal centers (#1E2E4A, #283E58)
 * - Muted slate-gray leaves (#7D8B99, #9DAEBF)
 * - Delicate sprigs & baby's breath (#A0B4C8)
 * - Translucent watercolor washes
 */

export const FloralCornerTopRight: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
    <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="trWash" cx="80%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#CBE2F7" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#E6F0FA" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="flowerBlueGrad1" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#BFDBFE" />
          <stop offset="60%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#60A5FA" />
        </radialGradient>
        <radialGradient id="flowerBlueGrad2" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="70%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </radialGradient>
      </defs>

      {/* Soft watercolor splash */}
      <circle cx="250" cy="70" r="140" fill="url(#trWash)" />
      <path d="M180,40 Q240,10 290,60 T310,180 Q250,190 190,120 Z" fill="#E0EFFE" opacity="0.35" filter="blur(8px)" />

      {/* Slate gray leaves & sprigs */}
      <g stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
        <path d="M220,120 Q190,145 165,180" />
        <circle cx="165" cy="180" r="2.5" fill="#64748B" />
        <path d="M185,135 Q170,140 160,150" />
        <circle cx="160" cy="150" r="2" fill="#64748B" />
        <path d="M240,90 Q200,95 170,105" />
        <circle cx="170" cy="105" r="2.5" fill="#64748B" />
        <path d="M260,140 Q250,190 230,225" />
        <circle cx="230" cy="225" r="3" fill="#64748B" />
        <path d="M245,175 Q235,185 220,190" />
        <circle cx="220" cy="190" r="2" fill="#64748B" />
      </g>

      {/* Watercolor soft leaves */}
      <path d="M210,100 C190,80 180,105 195,125 C210,140 225,115 210,100 Z" fill="#94A3B8" opacity="0.5" />
      <path d="M270,150 C265,180 285,195 295,175 C305,155 285,140 270,150 Z" fill="#94A3B8" opacity="0.55" />
      <path d="M245,55 C220,40 205,60 225,80 C245,95 260,70 245,55 Z" fill="#64748B" opacity="0.4" />

      {/* Main Large Blue Anemone Flower */}
      <g transform="translate(240, 75)">
        {/* Petals */}
        <path d="M0,0 C-15,-45 20,-55 15,-20 Z" fill="url(#flowerBlueGrad1)" opacity="0.85" />
        <path d="M0,0 C25,-40 60,-20 30,0 Z" fill="url(#flowerBlueGrad2)" opacity="0.85" />
        <path d="M0,0 C45,-15 55,25 20,20 Z" fill="url(#flowerBlueGrad1)" opacity="0.85" />
        <path d="M0,0 C30,25 10,60 -10,30 Z" fill="url(#flowerBlueGrad2)" opacity="0.85" />
        <path d="M0,0 C-15,45 -50,20 -25,0 Z" fill="url(#flowerBlueGrad1)" opacity="0.85" />
        <path d="M0,0 C-40,10 -50,-30 -20,-20 Z" fill="url(#flowerBlueGrad2)" opacity="0.85" />
        {/* Inner petals layer */}
        <circle cx="2" cy="2" r="18" fill="#93C5FD" opacity="0.75" />
        {/* Dark Navy / Indigo Center */}
        <circle cx="2" cy="2" r="10" fill="#1E293B" />
        <circle cx="2" cy="2" r="6" fill="#0F172A" />
        {/* Tiny stamens */}
        <g stroke="#94A3B8" strokeWidth="1">
          <line x1="2" y1="-12" x2="2" y2="-9" />
          <line x1="12" y1="2" x2="9" y2="2" />
          <line x1="2" y1="14" x2="2" y2="10" />
          <line x1="-10" y1="2" x2="-6" y2="2" />
          <line x1="8" y1="-8" x2="6" y2="-6" />
          <line x1="-7" y1="9" x2="-5" y2="6" />
        </g>
      </g>

      {/* Secondary Companion Blue Flower */}
      <g transform="translate(285, 125) scale(0.75)">
        <path d="M0,0 C-12,-35 15,-45 12,-15 Z" fill="url(#flowerBlueGrad2)" opacity="0.9" />
        <path d="M0,0 C20,-30 45,-15 25,0 Z" fill="url(#flowerBlueGrad1)" opacity="0.9" />
        <path d="M0,0 C35,-10 40,20 15,15 Z" fill="url(#flowerBlueGrad2)" opacity="0.9" />
        <path d="M0,0 C20,20 5,45 -8,22 Z" fill="url(#flowerBlueGrad1)" opacity="0.9" />
        <path d="M0,0 C-12,35 -40,15 -20,0 Z" fill="url(#flowerBlueGrad2)" opacity="0.9" />
        <circle cx="0" cy="0" r="7" fill="#1E293B" />
      </g>

      {/* Small Hydrangea florets */}
      <g fill="#BFDBFE" opacity="0.8">
        <circle cx="210" cy="65" r="5" />
        <circle cx="218" cy="73" r="4.5" />
        <circle cx="205" cy="76" r="4" />
        <circle cx="265" cy="170" r="4" />
        <circle cx="272" cy="178" r="4.5" />
        <circle cx="260" cy="184" r="3.5" />
      </g>
    </svg>
  </div>
);

export const FloralCornerBottomLeft: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
    <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform scale-x-[-1] scale-y-[-1]">
      <defs>
        <radialGradient id="blWash" cx="80%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#CBE2F7" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#E6F0FA" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="blGrad1" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#BFDBFE" />
          <stop offset="60%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#60A5FA" />
        </radialGradient>
        <radialGradient id="blGrad2" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="70%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </radialGradient>
      </defs>

      <circle cx="250" cy="70" r="140" fill="url(#blWash)" />
      <path d="M180,40 Q240,10 290,60 T310,180 Q250,190 190,120 Z" fill="#E0EFFE" opacity="0.35" filter="blur(8px)" />

      <g stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
        <path d="M220,120 Q190,145 165,180" />
        <circle cx="165" cy="180" r="2.5" fill="#64748B" />
        <path d="M185,135 Q170,140 160,150" />
        <circle cx="160" cy="150" r="2" fill="#64748B" />
        <path d="M240,90 Q200,95 170,105" />
        <circle cx="170" cy="105" r="2.5" fill="#64748B" />
        <path d="M260,140 Q250,190 230,225" />
        <circle cx="230" cy="225" r="3" fill="#64748B" />
      </g>

      <path d="M210,100 C190,80 180,105 195,125 C210,140 225,115 210,100 Z" fill="#94A3B8" opacity="0.5" />
      <path d="M270,150 C265,180 285,195 295,175 C305,155 285,140 270,150 Z" fill="#94A3B8" opacity="0.55" />

      {/* Main Flower */}
      <g transform="translate(240, 75)">
        <path d="M0,0 C-15,-45 20,-55 15,-20 Z" fill="url(#blGrad1)" opacity="0.85" />
        <path d="M0,0 C25,-40 60,-20 30,0 Z" fill="url(#blGrad2)" opacity="0.85" />
        <path d="M0,0 C45,-15 55,25 20,20 Z" fill="url(#blGrad1)" opacity="0.85" />
        <path d="M0,0 C30,25 10,60 -10,30 Z" fill="url(#blGrad2)" opacity="0.85" />
        <path d="M0,0 C-15,45 -50,20 -25,0 Z" fill="url(#blGrad1)" opacity="0.85" />
        <path d="M0,0 C-40,10 -50,-30 -20,-20 Z" fill="url(#blGrad2)" opacity="0.85" />
        <circle cx="2" cy="2" r="18" fill="#93C5FD" opacity="0.75" />
        <circle cx="2" cy="2" r="10" fill="#1E293B" />
        <circle cx="2" cy="2" r="6" fill="#0F172A" />
      </g>

      {/* Secondary Companion Flower */}
      <g transform="translate(285, 125) scale(0.75)">
        <path d="M0,0 C-12,-35 15,-45 12,-15 Z" fill="url(#blGrad2)" opacity="0.9" />
        <path d="M0,0 C20,-30 45,-15 25,0 Z" fill="url(#blGrad1)" opacity="0.9" />
        <path d="M0,0 C35,-10 40,20 15,15 Z" fill="url(#blGrad2)" opacity="0.9" />
        <path d="M0,0 C20,20 5,45 -8,22 Z" fill="url(#blGrad1)" opacity="0.9" />
        <circle cx="0" cy="0" r="7" fill="#1E293B" />
      </g>
    </svg>
  </div>
);

/**
 * The delicate heart flourish from the wedding invitation
 */
export const InvitationHeartFlourish: React.FC<{ className?: string }> = ({ className = 'w-48 sm:w-64 h-8' }) => (
  <svg
    viewBox="0 0 240 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`mx-auto select-none ${className}`}
    aria-hidden="true"
  >
    {/* Left flourish */}
    <path
      d="M10,16 C25,10 35,24 50,16 C65,8 85,16 100,16"
      stroke="#5A789A"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="8" cy="16" r="2.5" fill="#5A789A" />
    <path d="M22,12 C20,8 14,9 15,13 C16,16 20,15 22,12 Z" fill="#8AA8C7" opacity="0.6" />
    <path d="M26,18 C28,22 34,21 33,17 C32,14 28,15 26,18 Z" fill="#8AA8C7" opacity="0.6" />

    {/* Center Heart */}
    <path
      d="M120,22 C120,22 108,16 108,10 C108,6 113,4 116.5,7 C118.5,8.7 120,10.5 120,10.5 C120,10.5 121.5,8.7 123.5,7 C127,4 132,6 132,10 C132,16 120,22 120,22 Z"
      stroke="#5A789A"
      strokeWidth="1.3"
      fill="#E8F1FA"
      strokeLinejoin="round"
    />

    {/* Right flourish */}
    <path
      d="M140,16 C155,16 175,8 190,16 C205,24 215,10 230,16"
      stroke="#5A789A"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="232" cy="16" r="2.5" fill="#5A789A" />
    <path d="M218,12 C220,8 226,9 225,13 C224,16 220,15 218,12 Z" fill="#8AA8C7" opacity="0.6" />
    <path d="M214,18 C212,22 206,21 207,17 C208,14 212,15 214,18 Z" fill="#8AA8C7" opacity="0.6" />
  </svg>
);

/**
 * Floating petals background animation with graceful drift
 */
export const FloatingPetals: React.FC = () => {
  const petals = [
    { left: '8%', delay: '0s', duration: '19s', size: '14px', opacity: 0.55 },
    { left: '22%', delay: '4s', duration: '22s', size: '18px', opacity: 0.4 },
    { left: '38%', delay: '2s', duration: '17s', size: '12px', opacity: 0.5 },
    { left: '55%', delay: '6s', duration: '24s', size: '16px', opacity: 0.35 },
    { left: '72%', delay: '1s', duration: '18s', size: '15px', opacity: 0.45 },
    { left: '88%', delay: '5s', duration: '21s', size: '13px', opacity: 0.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {petals.map((petal, index) => (
        <div
          key={index}
          className="absolute animate-petal"
          style={{
            left: petal.left,
            top: '-20px',
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8 6 3 11 4 17C5 21 9 22 12 22C15 22 19 21 20 17C21 11 16 6 12 2Z"
              fill="#BFDBFE"
              stroke="#93C5FD"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
