import React from 'react';

export type ZVLogoVariant = 'monolith' | 'kinetic' | 'shield';

interface ZyvroLogoProps {
  variant?: ZVLogoVariant;
  size?: number;
  className?: string;
  showText?: boolean;
}

export const ZyvroLogo: React.FC<ZyvroLogoProps> = ({
  variant = 'monolith',
  size = 32,
  className = '',
  showText = false
}) => {
  // Merged Z + V Master Vector (1:1 Ratio)
  return (
    <div className={`inline-flex items-center space-x-2.5 select-none ${className}`}>
      {/* 1:1 Vector Icon */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {variant === 'kinetic' ? (
          <>
            {/* Top Z bar */}
            <path d="M22,18 L78,18 L60,34 L22,34 Z" fill="#E8E8E8" />
            {/* Diagonal Z cutting through V */}
            <polygon points="56,34 78,18 36,82 18,82" fill="#D7FF3F" />
            {/* V Right Wing */}
            <polygon points="36,82 62,44 82,44 48,92 28,92" fill="#D7FF3F" />
            {/* Status Diode */}
            <rect x="80" y="24" width="6" height="6" fill="#D7FF3F" />
          </>
        ) : variant === 'shield' ? (
          <>
            {/* Outer Shield Frame */}
            <polygon points="50,8 92,86 8,86" stroke="#D7FF3F" strokeWidth="6" fill="#080808" />
            {/* Converging Z Beam */}
            <path d="M28,30 L72,30 L40,66 L72,66" stroke="#F2F2F2" strokeWidth="6" strokeLinecap="square" />
            {/* Central V Core */}
            <polygon points="50,44 68,78 32,78" fill="#D7FF3F" opacity="0.9" />
          </>
        ) : (
          /* Default Monolith ZV Fusion */
          <>
            {/* Top Z stroke */}
            <path d="M16,18 L72,18 L52,38 L16,38 Z" fill="#F0F0F0" />
            {/* Diagonal Z Slash with Neon Acid Lime Glow */}
            <polygon points="52,38 74,18 38,82 16,82" fill="#D7FF3F" />
            {/* Right V Arm branching up */}
            <polygon points="38,82 58,46 82,46 50,92 30,92" fill="#D7FF3F" />
            {/* Precision Optical Diode */}
            <circle cx="82" cy="26" r="4" fill="#D7FF3F" />
          </>
        )}
      </svg>

      {/* Optional Wordmark */}
      {showText && (
        <div className="text-left">
          <span className="font-display font-black text-white tracking-wider text-sm block leading-none">
            ZYVRO<span className="text-[#D7FF3F] text-[10px] ml-0.5 font-mono font-bold">LABS</span>
          </span>
          <span className="text-[9px] font-mono text-[#A0A0A0] tracking-widest block leading-tight">
            SYS // 001 · ONLINE
          </span>
        </div>
      )}
    </div>
  );
};
