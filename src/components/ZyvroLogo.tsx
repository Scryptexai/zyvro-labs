import React from 'react';

export type ZVLogoVariant = 'symbol' | 'wordmark' | 'horizontal' | 'vertical' | 'full' | 'monolith' | 'kinetic' | 'shield';
export type ZVLogoState = 'normal' | 'active' | 'loading' | 'inactive';
export type ZVColorMode = 'full-color' | 'monochrome-white' | 'monochrome-dark' | 'toxic-lime';

interface ZyvroLogoProps {
  variant?: ZVLogoVariant;
  state?: ZVLogoState;
  colorMode?: ZVColorMode;
  size?: number;
  className?: string;
  showText?: boolean;
}

export const ZyvroLogo: React.FC<ZyvroLogoProps> = ({
  variant = 'symbol',
  state = 'normal',
  colorMode = 'full-color',
  size = 36,
  className = '',
  showText = false
}) => {
  // Brand color mapping based on dynamic system state and colorMode
  const getTheme = () => {
    if (colorMode === 'monochrome-white') {
      return {
        zFill: '#FFFFFF',
        vFill: '#FFFFFF',
        textBrand: '#FFFFFF',
        textSub: '#E2E8F0',
        glow: 'drop-shadow(0 0 6px rgba(255,255,255,0.4))'
      };
    }
    if (colorMode === 'monochrome-dark') {
      return {
        zFill: '#09090B',
        vFill: '#27272A',
        textBrand: '#09090B',
        textSub: '#52525B',
        glow: 'none'
      };
    }
    if (colorMode === 'toxic-lime') {
      return {
        zFill: '#D7FF3F',
        vFill: '#E5FF66',
        textBrand: '#D7FF3F',
        textSub: '#D7FF3F',
        glow: 'drop-shadow(0 0 10px rgba(215,255,63,0.7))'
      };
    }

    // Default Full-Color Dynamic State System
    switch (state) {
      case 'active':
        return {
          zFill: '#FFFFFF',
          vFill: '#E5FF66',
          textBrand: '#FFFFFF',
          textSub: '#D7FF3F',
          glow: 'drop-shadow(0 0 10px rgba(215,255,63,0.85))'
        };
      case 'loading':
        return {
          zFill: '#CBD5E1',
          vFill: '#D7FF3F',
          textBrand: '#E2E8F0',
          textSub: '#D7FF3F',
          glow: 'drop-shadow(0 0 12px rgba(215,255,63,0.6))'
        };
      case 'inactive':
        return {
          zFill: '#4B5563',
          vFill: '#6B7280',
          textBrand: '#6B7280',
          textSub: '#4B5563',
          glow: 'none'
        };
      case 'normal':
      default:
        return {
          zFill: 'url(#zv-titanium-grad-comp)',
          vFill: '#D7FF3F',
          textBrand: '#FFFFFF',
          textSub: '#D7FF3F',
          glow: 'drop-shadow(0 0 6px rgba(215,255,63,0.4))'
        };
    }
  };

  const theme = getTheme();
  const isOnlyWordmark = variant === 'wordmark';
  const isVertical = variant === 'vertical';
  const isHorizontal = variant === 'horizontal' || variant === 'full' || showText;

  return (
    <div 
      className={`inline-flex ${isVertical ? 'flex-col items-center space-y-2' : 'items-center space-x-3'} select-none ${className}`}
    >
      {/* Interlocking ZV Monogram Master Vector (1:1 Square) */}
      {!isOnlyWordmark && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`flex-shrink-0 transition-all duration-300 ${state === 'loading' ? 'animate-pulse' : ''}`}
          style={{ filter: theme.glow }}
        >
          <defs>
            <linearGradient id="zv-titanium-grad-comp" x1="10%" y1="20%" x2="90%" y2="80%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="35%" stop-color="#E2E8F0" />
              <stop offset="70%" stop-color="#94A3B8" />
              <stop offset="100%" stop-color="#64748B" />
            </linearGradient>
            <linearGradient id="zv-lime-grad-comp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F4FFA8" />
              <stop offset="100%" stop-color="#D7FF3F" />
            </linearGradient>
          </defs>

          {/* Right 'V' Arm (Radiant Toxic Lime #D7FF3F) */}
          <polygon 
            points="44,56 60,86 86,26 72,26 58,64 48,46" 
            fill={theme.vFill === '#D7FF3F' ? 'url(#zv-lime-grad-comp)' : theme.vFill} 
          />

          {/* Left 'Z' Monogram (Heavy Brushed Titanium Steel) with Chamfered Edges */}
          <polygon 
            points="14,26 58,26 68,38 38,38 52,66 52,78 14,78 24,66 38,66 24,38 14,38" 
            fill={theme.zFill} 
          />
        </svg>
      )}

      {/* Typography: ZYVRO — LABS — */}
      {(isHorizontal || isVertical) && (
        <div className={`flex flex-col ${isVertical ? 'items-center text-center' : 'text-left justify-center'} leading-none`}>
          <div className="flex items-center space-x-1.5">
            <span 
              className="font-display font-black tracking-widest uppercase transition-colors"
              style={{ color: theme.textBrand, fontSize: Math.max(14, Math.round(size * 0.48)) }}
            >
              ZYVRO
            </span>
            <span 
              className="font-mono font-bold tracking-widest uppercase transition-colors"
              style={{ color: theme.textSub, fontSize: Math.max(9, Math.round(size * 0.28)) }}
            >
              LABS
            </span>
          </div>
          <span 
            className="font-mono tracking-[0.25em] text-[#71717A] uppercase mt-1 block"
            style={{ fontSize: Math.max(7, Math.round(size * 0.18)) }}
          >
            PLAY BEYOND LIMITS
          </span>
        </div>
      )}
    </div>
  );
};
