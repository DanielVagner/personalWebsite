import { motion } from 'motion/react';

const LOGOS: Record<string, React.ReactNode> = {
  react: (
    <g>
      <circle r="18" fill="#20232a" />
      <g stroke="#61DAFB" strokeWidth="1.5" fill="none">
        <ellipse rx="14" ry="5.5" />
        <ellipse rx="14" ry="5.5" transform="rotate(60)" />
        <ellipse rx="14" ry="5.5" transform="rotate(120)" />
      </g>
      <circle r="2.5" fill="#61DAFB" />
    </g>
  ),
  ts: (
    <g>
      <rect x="-18" y="-18" width="36" height="36" rx="5" fill="#3178C6" />
      <text fill="white" fontSize="13" fontWeight="bold" textAnchor="middle" y="6" fontFamily="monospace">TS</text>
    </g>
  ),
  angular: (
    <g>
      <defs>
        <linearGradient id="ng-g" x1="0" y1="-18" x2="2" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF1744" />
          <stop offset="100%" stopColor="#C837AB" />
        </linearGradient>
      </defs>
      {/* Shield */}
      <polygon
        points="0,-18 -16.7,-12 -14.2,10.1 0,18 14.2,10.1 16.7,-12"
        fill="url(#ng-g)"
      />
      {/* White A with inner triangle cutout (evenodd) */}
      <path
        fillRule="evenodd"
        fill="white"
        d="M0,-13.9 L-10.5,9.5 L-6.6,9.5 L-4.5,4.2 L4.5,4.2 L6.6,9.5 L10.5,9.5 Z M3.1,1 L-3.1,1 L0,-6.4 Z"
      />
    </g>
  ),
  git: (
    <g>
      <circle r="18" fill="#F05032" />
      <circle cx="6" cy="-6" r="3" fill="white" />
      <circle cx="-6" cy="2" r="3" fill="white" />
      <circle cx="6" cy="10" r="3" fill="white" />
      <path d="M 6 -3 L 6 7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M -6 5 C -6 0 6 4 6 -3" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  ),
  figma: (
    <g>
      <circle r="18" fill="#1E1E1E" />
      <rect x="-9" y="-16" width="9" height="10" rx="4.5" fill="#F24E1E" />
      <rect x="0"  y="-16" width="9" height="10" rx="4.5" fill="#FF7262" />
      <rect x="-9" y="-6"  width="9" height="10" rx="4.5" fill="#A259FF" />
      <rect x="-9" y="4"   width="9" height="10" rx="4.5" fill="#0ACF83" />
      <circle cx="4.5" cy="1" r="4.5" fill="#1ABCFE" />
    </g>
  ),
  ionic: (
    <g>
      <circle r="18" fill="#3880FF" />
      <text fill="white" fontSize="13" fontWeight="bold" textAnchor="middle" y="6" fontFamily="sans-serif">Io</text>
    </g>
  ),
  vue: (
    <g>
      <circle r="18" fill="#42B883" />
      <path d="M -10 -7 L 0 9 L 10 -7 L 6.5 -7 L 0 4 L -6.5 -7 Z" fill="white" />
      <path d="M -6 -7 L 0 3 L 6 -7 L 3.5 -7 L 0 1 L -3.5 -7 Z" fill="#42B883" />
    </g>
  ),
  dotnet: (
    <g>
      <circle r="18" fill="#512BD4" />
      <text fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" y="4" fontFamily="monospace">.NET</text>
    </g>
  ),
};

const ITEMS = [
  // Left edge
  { id: 'react',   top: '5%',  left: '2%',  size: 52, opacity: 0.28, blur: 0,   dur: 14, x: [0, 18, -8, 14, 0],  y: [0, 40, -20, 55, 0],  rot: [0, 10, -6, 4, 0]  },
  { id: 'git',     top: '38%', left: '1%',  size: 44, opacity: 0.22, blur: 0.5, dur: 18, x: [0, 20, -10, 16, 0], y: [0, -35, 50, -25, 0], rot: [0, -8, 6, -4, 0]  },
  { id: 'ionic',   top: '72%', left: '3%',  size: 40, opacity: 0.20, blur: 0.5, dur: 13, x: [0, 16, -12, 20, 0], y: [0, -40, 20, -30, 0], rot: [0, 7, -9, 5, 0]   },
  // Right edge
  { id: 'angular', top: '8%',  left: '94%', size: 48, opacity: 0.24, blur: 0,   dur: 16, x: [0, -20, 8, -14, 0], y: [0, 45, -25, 60, 0],  rot: [0, -10, 8, -5, 0] },
  { id: 'ts',      top: '42%', left: '95%', size: 42, opacity: 0.20, blur: 0.5, dur: 20, x: [0, -16, 10, -20, 0], y: [0, -30, 45, -20, 0], rot: [0, 6, -10, 4, 0]  },
  { id: 'vue',     top: '75%', left: '93%', size: 38, opacity: 0.18, blur: 1,   dur: 15, x: [0, -14, 10, -18, 0], y: [0, -35, 18, -28, 0], rot: [0, 9, -7, 6, 0]   },
  // Top & bottom (outside grid)
  { id: 'figma',   top: '2%',  left: '46%', size: 34, opacity: 0.15, blur: 1.5, dur: 22, x: [0, 20, -15, 25, 0], y: [0, 20, -10, 30, 0],  rot: [0, 12, -8, 10, 0] },
  { id: 'dotnet',  top: '88%', left: '44%', size: 46, opacity: 0.22, blur: 0,   dur: 17, x: [0, 22, -18, 16, 0], y: [0, -20, 10, -28, 0], rot: [0, -11, 7, -6, 0] },
];

import React from 'react';

export function TechParade() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {ITEMS.map((item) => (
        <motion.div
          key={item.id}
          style={{
            position: 'absolute',
            top: item.top,
            left: item.left,
            opacity: item.opacity,
            filter: item.blur > 0 ? `blur(${item.blur}px)` : undefined,
          }}
          animate={{
            x: item.x,
            y: item.y,
            rotate: item.rot,
          }}
          transition={{
            duration: item.dur,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={item.size}
            height={item.size}
            viewBox="-18 -18 36 36"
            style={{ display: 'block' }}
          >
            {LOGOS[item.id]}
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
