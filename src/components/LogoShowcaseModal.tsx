import React, { useState } from 'react';
import { sound } from '../utils/soundManager';
import { 
  X, 
  Check, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';

export type LogoOptionId = 'monolith' | 'kinetic' | 'delta' | 'aperture';

export interface LogoOption {
  id: LogoOptionId;
  name: string;
  tagline: string;
  description: string;
  systemIdentifier: string;
  geometry: string;
  personality: string;
}

export const LOGO_OPTIONS: LogoOption[] = [
  {
    id: 'monolith',
    name: 'OPTION 01: MONOLITH RETICLE',
    tagline: 'TACTICAL HEXAGONAL APERTURE & KERNEL Z',
    description: 'Precision industrial hex prism with an embedded geometric Z-vector and targeting crosshair reticle. Represents stability, technical rigor, and military-grade simulation engines.',
    systemIdentifier: 'ZYVRO // SYS.001',
    geometry: 'Hexagonal Prism + 60° Precision Vectors + 4-Point Targeting Calipers',
    personality: 'Tactical · Industrial · AAA Engine Architecture'
  },
  {
    id: 'kinetic',
    name: 'OPTION 02: KINETIC CHEVRON GLYPH',
    tagline: 'RAZOR-SHARP Z-V KINETIC VECTOR',
    description: 'Minimalist dual-chevron linking Z and V into a continuous forward-thrust lightning silhouette with a toxic lime status diode. Fast, confident, and unmistakable at 16px favicon scale.',
    systemIdentifier: 'ZYVRO® // LABS.64x',
    geometry: 'Dual 45° Kinetic Chevrons + Integral Optical Telemetry Diode',
    personality: 'Experimental · Agile · Futuristic Speed'
  },
  {
    id: 'delta',
    name: 'OPTION 03: QUANTUM DELTA CORE',
    tagline: 'BRUTALIST VOID PRISM & ORBITAL PULSE',
    description: 'Brutalist triangular delta prism enclosing a hollowed event horizon and orbital particle ring. Evokes dark void exploration, deep space physics, and anomalous laboratories.',
    systemIdentifier: 'ZYVRO // SECTOR-Z',
    geometry: 'Equilateral Delta Hull + Centered Negative Space Vortex',
    personality: 'Mysterious · Deep Void · Atmospheric Dread'
  },
  {
    id: 'aperture',
    name: 'OPTION 04: NEURAL APERTURE',
    tagline: 'BIOMECHANICAL SHUTTER & SYNAPTIC EYE',
    description: 'Segmented mechatronic iris with 8 interlocking teeth and a glowing central neural core. Represents artificial intelligence, psychoacoustics, and living virtual organisms.',
    systemIdentifier: 'ZYVRO // SYNAPSE.OS',
    geometry: '8-Blade Mechatronic Iris Ring + Synaptic Focal Coordinate',
    personality: 'Organic · Psychoacoustic · Biomechanical Horror'
  }
];

interface LogoShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLogoId: LogoOptionId;
  onSelectLogo: (id: LogoOptionId) => void;
}

export const LogoShowcaseModal: React.FC<LogoShowcaseModalProps> = ({
  isOpen,
  onClose,
  activeLogoId,
  onSelectLogo
}) => {
  const [selectedPreview, setSelectedPreview] = useState<LogoOptionId>(activeLogoId);

  if (!isOpen) return null;

  const currentOption = LOGO_OPTIONS.find(l => l.id === selectedPreview) || LOGO_OPTIONS[0];

  const handleApplyLogo = (id: LogoOptionId) => {
    sound.playAccessGranted();
    onSelectLogo(id);
    setSelectedPreview(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-2xl p-3 sm:p-6 overflow-y-auto select-none">
      
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#0c0c0c] border border-[#2a2a2a] shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col my-auto">
        
        {/* Top Edge Neon Accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent" />

        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#121212] border-b border-[#202020] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-4 h-4 text-[#D7FF3F]" />
            <span className="font-mono text-xs md:text-sm font-bold text-white tracking-widest uppercase">
              ZYVRO LABS // BRAND IDENTITY &amp; LOGO SYSTEM SELECTION
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#1a1a1a] border border-[#333333] text-[10px] font-mono text-[#D7FF3F]">
              4 BESPOKE CONCEPTS
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            onMouseEnter={() => sound.playHover()}
            data-cursor="interact"
            data-cursor-label="CLOSE"
            className="p-1.5 bg-[#171717] hover:bg-[#D7FF3F] hover:text-[#080808] border border-[#292929] text-[#A0A0A0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto max-h-[calc(92vh-70px)] p-6 md:p-8 space-y-8">
          
          {/* Top 4 Logo Concept Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LOGO_OPTIONS.map((opt) => {
              const isCurrent = activeLogoId === opt.id;
              const isSelected = selectedPreview === opt.id;

              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedPreview(opt.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="select"
                  data-cursor-label={opt.name.split(':')[0]}
                  className={`p-4 border transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#141414] border-[#D7FF3F] shadow-[0_0_25px_rgba(215,255,63,0.25)]'
                      : 'bg-[#0e0e0e] border-[#222222] hover:border-[#383838] hover:bg-[#111111]'
                  }`}
                >
                  {/* Active Badge */}
                  {isCurrent && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#D7FF3F] text-[#080808] text-[9px] font-mono font-black uppercase flex items-center gap-1 shadow-md">
                      <Check className="w-3 h-3" />
                      ACTIVE LOGO
                    </div>
                  )}

                  {/* Icon Render Chamber */}
                  <div className="h-32 bg-[#080808] border border-[#1e1e1e] flex items-center justify-center p-4 my-2 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
                    <LogoIconRenderer id={opt.id} size={54} />
                  </div>

                  {/* Text Spec */}
                  <div className="space-y-1 pt-2">
                    <div className="text-[10px] font-mono font-bold text-[#D7FF3F] tracking-widest uppercase">
                      {opt.name.split(':')[0]}
                    </div>
                    <div className="font-display font-bold text-white text-sm uppercase">
                      {opt.name.split(':')[1]?.trim() || opt.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#777777] line-clamp-2 pt-0.5">
                      {opt.tagline}
                    </div>
                  </div>

                  {/* Select Trigger */}
                  <div className="pt-3 mt-3 border-t border-[#1c1c1c] flex items-center justify-between">
                    <span className="text-[9px] font-mono text-[#555555]">{opt.systemIdentifier}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyLogo(opt.id);
                      }}
                      className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase transition-all ${
                        isCurrent
                          ? 'bg-[#D7FF3F]/20 text-[#D7FF3F] border border-[#D7FF3F]/40'
                          : 'bg-[#1a1a1a] hover:bg-[#D7FF3F] text-[#A0A0A0] hover:text-[#080808]'
                      }`}
                    >
                      {isCurrent ? 'SELECTED' : 'APPLY LOGO'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Inspection of Selected Concept (Lockups, Grid, Spec) */}
          <div className="bg-[#0e0e0e] border border-[#262626] p-6 md:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#202020] pb-4 gap-3">
              <div>
                <span className="text-xs font-mono text-[#D7FF3F] font-bold tracking-widest block uppercase mb-1">
                  DETAILED SPECIFICATION &amp; LOCKUPS
                </span>
                <h3 className="text-2xl font-black font-display text-white uppercase">
                  {currentOption.name}
                </h3>
                <p className="text-xs font-mono text-[#A0A0A0] mt-0.5">
                  {currentOption.tagline}
                </p>
              </div>

              {/* Action: Set as Global Active Logo */}
              <button
                onClick={() => handleApplyLogo(currentOption.id)}
                onMouseEnter={() => sound.playHover()}
                data-cursor="interact"
                data-cursor-label="APPLY"
                className={`px-6 py-3 font-mono font-bold tracking-widest text-xs uppercase transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(215,255,63,0.3)] ${
                  activeLogoId === currentOption.id
                    ? 'bg-[#D7FF3F] text-[#080808]'
                    : 'bg-[#181818] hover:bg-[#D7FF3F] text-white hover:text-[#080808] border border-[#333333]'
                }`}
              >
                {activeLogoId === currentOption.id ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CURRENT ACTIVE BRAND LOGO</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>SET AS ACTIVE BRAND LOGO</span>
                  </>
                )}
              </button>
            </div>

            {/* Lockup Variations Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Lockup 1: Primary Horizontal Wordmark */}
              <div className="p-5 bg-[#080808] border border-[#202020] space-y-3 flex flex-col justify-between">
                <div className="text-[10px] font-mono text-[#666666] tracking-widest uppercase">
                  LOCKUP 01 // PRIMARY HORIZONTAL
                </div>
                <div className="h-24 flex items-center justify-center p-3 border border-[#161616] bg-[#0c0c0c]">
                  <div className="flex items-center space-x-3">
                    <LogoIconRenderer id={currentOption.id} size={36} />
                    <div>
                      <div className="font-display font-black text-xl text-white tracking-wider flex items-center">
                        ZYVRO<span className="text-[#D7FF3F] text-xs font-mono ml-1">LABS</span>
                      </div>
                      <div className="text-[9px] font-mono text-[#666666] tracking-widest">
                        SYS // 001 · ONLINE
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-[#555555]">
                  Used for Global Header, HUD status strip &amp; digital navbars.
                </div>
              </div>

              {/* Lockup 2: Vertical Stack / Game Splash */}
              <div className="p-5 bg-[#080808] border border-[#202020] space-y-3 flex flex-col justify-between">
                <div className="text-[10px] font-mono text-[#666666] tracking-widest uppercase">
                  LOCKUP 02 // VERTICAL SPLASH STACK
                </div>
                <div className="h-24 flex items-center justify-center p-3 border border-[#161616] bg-[#0c0c0c]">
                  <div className="flex flex-col items-center text-center">
                    <LogoIconRenderer id={currentOption.id} size={34} />
                    <div className="font-display font-black text-sm text-white tracking-widest mt-1">
                      ZYVRO
                    </div>
                    <div className="text-[8px] font-mono tracking-[0.25em] text-[#D7FF3F] uppercase">
                      LABORATORIES
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-[#555555]">
                  Used for Game Boot sequence, physical packaging &amp; splash intro.
                </div>
              </div>

              {/* Lockup 3: Monogram / HUD Caliper (16px / Favicon / App) */}
              <div className="p-5 bg-[#080808] border border-[#202020] space-y-3 flex flex-col justify-between">
                <div className="text-[10px] font-mono text-[#666666] tracking-widest uppercase">
                  LOCKUP 03 // HUD MONOGRAM &amp; FAVICON
                </div>
                <div className="h-24 flex items-center justify-center gap-6 p-3 border border-[#161616] bg-[#0c0c0c]">
                  <div className="flex flex-col items-center gap-1">
                    <LogoIconRenderer id={currentOption.id} size={32} />
                    <span className="text-[9px] font-mono text-[#666666]">32px</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <LogoIconRenderer id={currentOption.id} size={20} />
                    <span className="text-[9px] font-mono text-[#666666]">20px</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <LogoIconRenderer id={currentOption.id} size={14} />
                    <span className="text-[9px] font-mono text-[#666666]">14px</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-[#555555]">
                  Ultra-sharp clarity at micro scale and in-game crosshairs.
                </div>
              </div>

            </div>

            {/* Geometry & Design System Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs font-mono border-t border-[#1e1e1e]">
              <div className="space-y-2">
                <div className="text-[#D7FF3F] font-bold">GEOMETRY MATRIX &amp; GRID:</div>
                <p className="text-[#A0A0A0] leading-relaxed">
                  {currentOption.geometry}
                </p>
                <div className="text-[#666666] text-[11px]">
                  COLOR SYSTEM: Base #080808 · Surface #202020 · Signature Accent #D7FF3F
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[#D7FF3F] font-bold">BRAND IDENTITY DNA:</div>
                <p className="text-[#A0A0A0] leading-relaxed">
                  {currentOption.description}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

/* ========================================================
   HIGH-PRECISION SVG LOGO VECTOR RENDERER
======================================================== */
export const LogoIconRenderer: React.FC<{ id: LogoOptionId; size?: number; className?: string }> = ({
  id,
  size = 32,
  className = ''
}) => {
  switch (id) {
    case 'monolith':
      // Option 01: Monolith Reticle Hexagon + Z Vector
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Hexagon Outer Hull */}
          <polygon 
            points="50,6 88,28 88,72 50,94 12,72 12,28" 
            stroke="#D7FF3F" 
            strokeWidth="5" 
            fill="#080808" 
          />
          {/* Corner tick marks */}
          <line x1="50" y1="6" x2="50" y2="18" stroke="#D7FF3F" strokeWidth="4" />
          <line x1="50" y1="82" x2="50" y2="94" stroke="#D7FF3F" strokeWidth="4" />
          <line x1="12" y1="50" x2="22" y2="50" stroke="#D7FF3F" strokeWidth="4" />
          <line x1="78" y1="50" x2="88" y2="50" stroke="#D7FF3F" strokeWidth="4" />
          {/* Central Bold Kinetic Z */}
          <path 
            d="M28,32 L72,32 L36,68 L72,68" 
            stroke="#F2F2F2" 
            strokeWidth="7" 
            strokeLinecap="square" 
            strokeLinejoin="miter" 
          />
          {/* Center Diode */}
          <circle cx="50" cy="50" r="4" fill="#D7FF3F" />
        </svg>
      );

    case 'kinetic':
      // Option 02: Kinetic Chevron Razor Z-V Glyph
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Top Dynamic Bar */}
          <path d="M16,22 L84,22 L66,42 L16,42 Z" fill="#D7FF3F" />
          {/* Diagonal Kinetic Slice */}
          <polygon points="56,42 84,22 44,78 16,78" fill="#F2F2F2" />
          {/* Bottom Anchor Bar */}
          <path d="M34,58 L84,58 L66,78 L16,78 Z" fill="#D7FF3F" />
          {/* Status Pip */}
          <rect x="80" y="46" width="8" height="8" fill="#D7FF3F" />
        </svg>
      );

    case 'delta':
      // Option 03: Quantum Delta Void Prism
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Heavy Delta Outer Frame */}
          <polygon 
            points="50,10 90,88 10,88" 
            stroke="#D7FF3F" 
            strokeWidth="7" 
            fill="#080808" 
          />
          {/* Inverted Inner Core Prism */}
          <polygon 
            points="50,42 72,82 28,82" 
            fill="#D7FF3F" 
            opacity="0.8" 
          />
          {/* Singularity Void Core */}
          <circle cx="50" cy="62" r="7" fill="#080808" stroke="#F2F2F2" strokeWidth="3" />
        </svg>
      );

    case 'aperture':
      // Option 04: Neural Aperture Biomechanic Eye
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Outer Segmented Reticle Ring */}
          <circle cx="50" cy="50" r="42" stroke="#D7FF3F" strokeWidth="4" strokeDasharray="18 8" />
          {/* Inner Shutter Blades */}
          <polygon points="50,22 66,38 50,44" fill="#F2F2F2" />
          <polygon points="78,50 62,66 56,50" fill="#F2F2F2" />
          <polygon points="50,78 34,62 50,56" fill="#F2F2F2" />
          <polygon points="22,50 38,34 44,50" fill="#F2F2F2" />
          {/* Glowing Neural Center */}
          <circle cx="50" cy="50" r="8" fill="#D7FF3F" />
          <circle cx="50" cy="50" r="3" fill="#080808" />
        </svg>
      );
  }
};
