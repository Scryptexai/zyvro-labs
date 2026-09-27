import React from 'react';

export type ZVLogoVariant = 'symbol' | 'wordmark' | 'full' | 'monolith' | 'kinetic' | 'shield';
export type ZVLogoState = 'normal' | 'active' | 'loading' | 'inactive';

interface ZyvroLogoProps {
  variant?: ZVLogoVariant;
  state?: ZVLogoState;
  size?: number;
  className?: string;
  showText?: boolean;
}

export const ZyvroLogo: React.FC<ZyvroLogoProps> = ({
  variant = 'symbol',
  state = 'normal',
  size = 36,
  className = '',
  showText = false
}) => {
  // Brand color mapping based on dynamic system state
  // normal: Primary Off-White vectors + Luminous Lime core
  // active: Luminous Lime vectors + Intense Lime glow core
  // loading: Pulsing state
  // inactive: Muted gray vectors + Dim core
  const getColors = () => {
    switch (state) {
      case 'active':
        return {
          vectorFill: '#D7FF3F',
          coreFill: '#FFFFFF',
          textBrand: '#FFFFFF',
          textSub: '#D7FF3F',
          glow: 'drop-shadow(0 0 8px rgba(215,255,63,0.8))'
        };
      case 'loading':
        return {
          vectorFill: '#A0A0A0',
          coreFill: '#D7FF3F',
          textBrand: '#F1F1EA',
          textSub: '#D7FF3F',
          glow: 'drop-shadow(0 0 12px rgba(215,255,63,0.6))'
        };
      case 'inactive':
        return {
          vectorFill: '#3F3F46',
          coreFill: '#71717A',
          textBrand: '#71717A',
          textSub: '#52525B',
          glow: 'none'
        };
      case 'normal':
      default:
        return {
          vectorFill: '#F1F1EA',
          coreFill: '#D7FF3F',
          textBrand: '#FFFFFF',
          textSub: '#D7FF3F',
          glow: 'drop-shadow(0 0 6px rgba(215,255,63,0.4))'
        };
    }
  };

  const colors = getColors();
  const isOnlyWordmark = variant === 'wordmark';
  const isFullLockup = variant === 'full' || showText;

  return (
    <div className={`inline-flex items-center space-x-3 select-none ${className}`}>
      {/* Symbol Vector (1:1 Square) */}
      {!isOnlyWordmark && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 transition-all duration-300 ${state === 'loading' ? 'animate-pulse' : ''}`}
          style={{ filter: colors.glow }}
        >
          {/* 4 Convergent Vectors (Inward Arrowheads) */}
          {/* North Vector */}
          <polygon points="50,6 64,28 50,38 36,28" fill={colors.vectorFill} />
          {/* South Vector */}
          <polygon points="50,94 36,72 50,62 64,72" fill={colors.vectorFill} />
          {/* West Vector */}
          <polygon points="6,50 28,36 38,50 28,64" fill={colors.vectorFill} />
          {/* East Vector */}
          <polygon points="94,50 72,64 62,50 72,36" fill={colors.vectorFill} />

          {/* Central Diamond Core `◆` */}
          <polygon points="50,38 62,50 50,62 38,50" fill={colors.coreFill} />
        </svg>
      )}

      {/* Typography: ZYVRO LABS */}
      {isFullLockup && (
        <div className="text-left flex flex-col justify-center leading-none">
          <div className="flex items-baseline space-x-1.5">
            <span 
              className="font-display font-black tracking-widest uppercase transition-colors"
              style={{ color: colors.textBrand, fontSize: Math.max(14, Math.round(size * 0.45)) }}
            >
              ZYVRO
            </span>
            <span 
              className="font-mono font-bold tracking-widest uppercase transition-colors"
              style={{ color: colors.textSub, fontSize: Math.max(9, Math.round(size * 0.28)) }}
            >
              LABS
            </span>
          </div>
          <span 
            className="font-mono tracking-[0.25em] text-[#71717A] uppercase mt-0.5 block"
            style={{ fontSize: Math.max(7, Math.round(size * 0.18)) }}
          >
            SYS // OS · CORE
          </span>
        </div>
      )}
    </div>
  );
};
