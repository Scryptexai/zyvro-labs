import React, { useState } from 'react';
import { sound } from '../utils/soundManager';
import { 
  X, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  Maximize2, 
  Layers, 
  ShieldCheck,
  Grid,
  Tv
} from 'lucide-react';

export type LogoOptionId = 'zv-master' | 'zv-kinetic' | 'zv-shield' | 'delta';

export interface ZVLogoAsset {
  id: LogoOptionId;
  name: string;
  tagline: string;
  image1x1: string;
  ratio: string;
  type: string;
  description: string;
  geometry: string;
}

export const ZV_LOGO_COLLECTION: ZVLogoAsset[] = [
  {
    id: 'zv-master',
    name: 'ZV // 01: MONOLITH VECTOR LOCKUP',
    tagline: 'OFFICIAL 1:1 SQUARE MASTER EMBLEM',
    image1x1: '/assets/brandkit/zyvro-zv-logo-1x1-monolith.jpg',
    ratio: '1:1 SQUARE (MASTER)',
    type: 'PRIMARY BRAND ICON',
    description: 'The definitive Z+V typographic fusion. Brushed dark titanium body with vibrant toxic lime (#D7FF3F) backlighting and sharp industrial chamfers.',
    geometry: '45° Parallel Vector Sweep + Integrated Forward Apex'
  },
  {
    id: 'zv-kinetic',
    name: 'ZV // 02: KINETIC INTERLOCKING',
    tagline: 'RAZOR-SHARP Z CUTTING THROUGH V CHEVRON',
    image1x1: '/assets/brandkit/zyvro-zv-logo-1x1-kinetic.jpg',
    ratio: '1:1 SQUARE (TACTICAL)',
    type: 'TACTICAL IN-GAME EMBLEM',
    description: 'High-velocity interlocking Z cutting diagonally through a downward V chevron blade with bright green conduit channels on pitch black.',
    geometry: 'Interlocking Razor Geometry + Dual Diagonal Wings'
  },
  {
    id: 'zv-shield',
    name: 'ZV // 03: CONVERGENT DELTA SHIELD',
    tagline: 'CONVERGING Z-TOP & V-APEX SHIELD CREST',
    image1x1: '/assets/brandkit/zyvro-zv-logo-1x1-master.jpg',
    ratio: '1:1 SQUARE (CREST)',
    type: 'STUDIO PRODUCTION CREST',
    description: 'Symmetrical delta frame where the upper Z beam merges seamlessly into the lower V convergence with an internal luminescent plasma core.',
    geometry: 'Equilateral Triangular Shield + Central Luminescent Core'
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
  const [selectedTab, setSelectedTab] = useState<'logos-1x1' | 'brandkit-board' | 'game-splash'>('logos-1x1');
  const [selectedPreviewId, setSelectedPreviewId] = useState<LogoOptionId>(activeLogoId);
  const [inspectModalImage, setInspectModalImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOption = ZV_LOGO_COLLECTION.find(l => l.id === selectedPreviewId) || ZV_LOGO_COLLECTION[0];

  const handleApply = (id: LogoOptionId) => {
    sound.playAccessGranted();
    onSelectLogo(id);
    setSelectedPreviewId(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-2xl p-2 sm:p-4 md:p-6 overflow-y-auto select-none">
      
      <div className="relative w-full max-w-6xl max-h-[94vh] bg-[#0c0c0c] border border-[#2a2a2a] shadow-[0_0_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col my-auto">
        
        {/* Top Edge Neon Accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent" />

        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#121212] border-b border-[#202020] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-4 h-4 text-[#D7FF3F]" />
            <div>
              <span className="font-mono text-xs md:text-sm font-bold text-white tracking-widest uppercase block">
                ZYVRO LABS // OFFICIAL BRANDKIT &amp; LOGO SYSTEM (ZV MERGED)
              </span>
              <span className="text-[10px] font-mono text-[#888888]">
                CONSISTENT 1:1 MASTER LOGOS · BRAND PRESENTATION BOARD · IN-GAME PRODUCTION SPLASH
              </span>
            </div>
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

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 bg-[#0e0e0e] border-b border-[#1f1f1f] flex flex-wrap gap-2 text-xs font-mono">
          <button
            onClick={() => {
              sound.playHover();
              setSelectedTab('logos-1x1');
            }}
            className={`px-4 py-1.5 border transition-all uppercase font-bold flex items-center gap-2 ${
              selectedTab === 'logos-1x1'
                ? 'bg-[#D7FF3F] text-[#080808] border-[#D7FF3F] shadow-[0_0_12px_rgba(215,255,63,0.3)]'
                : 'bg-[#141414] text-[#888888] border-[#262626] hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>1:1 MASTER LOGOS (ZV GABUNG)</span>
          </button>

          <button
            onClick={() => {
              sound.playHover();
              setSelectedTab('brandkit-board');
            }}
            className={`px-4 py-1.5 border transition-all uppercase font-bold flex items-center gap-2 ${
              selectedTab === 'brandkit-board'
                ? 'bg-[#D7FF3F] text-[#080808] border-[#D7FF3F] shadow-[0_0_12px_rgba(215,255,63,0.3)]'
                : 'bg-[#141414] text-[#888888] border-[#262626] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4K BRAND IDENTITY BOARD</span>
          </button>

          <button
            onClick={() => {
              sound.playHover();
              setSelectedTab('game-splash');
            }}
            className={`px-4 py-1.5 border transition-all uppercase font-bold flex items-center gap-2 ${
              selectedTab === 'game-splash'
                ? 'bg-[#D7FF3F] text-[#080808] border-[#D7FF3F] shadow-[0_0_12px_rgba(215,255,63,0.3)]'
                : 'bg-[#141414] text-[#888888] border-[#262626] hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>GAME BOOT SPLASH SCREEN</span>
          </button>
        </div>

        {/* Modal Tab Content */}
        <div className="overflow-y-auto max-h-[calc(94vh-125px)] p-6 md:p-8 space-y-6">
          
          {/* ========================================================
              TAB 1: 1:1 SQUARE MASTER LOGO RENDERS & OPTIONS (ZV GABUNG)
          ======================================================== */}
          {selectedTab === 'logos-1x1' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#202020] pb-3 gap-2">
                <div>
                  <h3 className="text-xl font-black font-display text-white uppercase">
                    1:1 RATIO MASTER EMBLEMS (MERGED Z + V)
                  </h3>
                  <p className="text-xs font-mono text-[#A0A0A0]">
                    Pilih variasi 1:1 ZV favorit Anda untuk dijadikan logo utama studio di seluruh game dan media.
                  </p>
                </div>
                <div className="px-3 py-1 bg-[#171717] border border-[#2a2a2a] text-[10px] font-mono text-[#D7FF3F]">
                  RATIO: 1:1 SQUARE · ULTRA HD 4K
                </div>
              </div>

              {/* 3 Square Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ZV_LOGO_COLLECTION.map((item) => {
                  const isCurrent = activeLogoId === item.id;
                  const isSelected = selectedPreviewId === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedPreviewId(item.id);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      data-cursor="select"
                      data-cursor-label={item.name.split(':')[0]}
                      className={`p-4 border transition-all cursor-pointer relative flex flex-col justify-between bg-[#0e0e0e] ${
                        isSelected
                          ? 'border-[#D7FF3F] shadow-[0_0_30px_rgba(215,255,63,0.25)] ring-1 ring-[#D7FF3F]'
                          : 'border-[#222222] hover:border-[#444444]'
                      }`}
                    >
                      {/* Active Global Badge */}
                      {isCurrent && (
                        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 bg-[#D7FF3F] text-[#080808] text-[9px] font-mono font-black uppercase flex items-center gap-1 shadow-md">
                          <Check className="w-3 h-3" />
                          ACTIVE LOGO
                        </div>
                      )}

                      {/* 1:1 Ratio Photo Image Preview */}
                      <div className="relative aspect-square w-full bg-[#050505] border border-[#1f1f1f] overflow-hidden group">
                        <img 
                          src={item.image1x1} 
                          alt={item.name}
                          className="w-full h-full object-cover filter contrast-105 transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playClick();
                            setInspectModalImage(item.image1x1);
                          }}
                          data-cursor="interact"
                          data-cursor-label="FULL 4K"
                          className="absolute bottom-2 right-2 p-1.5 bg-[#080808]/85 text-[#D7FF3F] hover:bg-[#D7FF3F] hover:text-[#080808] border border-[#333333] transition-colors"
                          title="Zoom 4K Image"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Meta Information */}
                      <div className="space-y-1.5 pt-3">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#D7FF3F] font-bold">
                          <span>{item.type}</span>
                          <span className="text-[#666666]">{item.ratio}</span>
                        </div>
                        <h4 className="font-display font-bold text-white text-sm uppercase leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] font-mono text-[#888888] line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Select Action */}
                      <div className="pt-3 mt-3 border-t border-[#1c1c1c] flex items-center justify-between">
                        <span className="text-[9px] font-mono text-[#666666]">{item.geometry.split('+')[0]}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApply(item.id);
                          }}
                          className={`px-3 py-1 text-[10px] font-mono font-bold uppercase transition-all ${
                            isCurrent
                              ? 'bg-[#D7FF3F]/20 text-[#D7FF3F] border border-[#D7FF3F]/40'
                              : 'bg-[#1a1a1a] hover:bg-[#D7FF3F] text-[#A0A0A0] hover:text-[#080808]'
                          }`}
                        >
                          {isCurrent ? 'ACTIVE' : 'SELECT LOGO'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Set Active Confirmation Bar */}
              <div className="p-4 bg-[#111111] border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-4 h-4 text-[#D7FF3F]" />
                  <span className="text-[#CCCCCC]">
                    SELECTED FOR ACTIVE ENGINE: <span className="text-white font-bold">{currentOption.name}</span>
                  </span>
                </div>

                <button
                  onClick={() => handleApply(currentOption.id)}
                  onMouseEnter={() => sound.playHover()}
                  data-cursor="interact"
                  data-cursor-label="APPLY"
                  className="px-6 py-2.5 bg-[#D7FF3F] hover:bg-white text-[#080808] font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>SET AS ACTIVE BRAND LOGO</span>
                </button>
              </div>

            </div>
          )}

          {/* ========================================================
              TAB 2: 4K COMPLETE BRANDKIT PRESENTATION BOARD
          ======================================================== */}
          {selectedTab === 'brandkit-board' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#202020] pb-3">
                <div>
                  <h3 className="text-xl font-black font-display text-white uppercase">
                    OFFICIAL ZYVRO LABS BRAND IDENTITY PRESENTATION BOARD
                  </h3>
                  <p className="text-xs font-mono text-[#A0A0A0]">
                    Pedoman brandkit visual resmi: Master Logo 1:1, Horizontal Lockup, Color Palette Swatches, Safe Space, dan Vector Grid.
                  </p>
                </div>

                <button
                  onClick={() => setInspectModalImage('/assets/brandkit/zyvro-zv-brandkit-overview.jpg')}
                  className="px-3 py-1.5 bg-[#171717] hover:bg-[#D7FF3F] text-[#D7FF3F] hover:text-[#080808] border border-[#333333] text-xs font-mono transition-all flex items-center gap-1.5"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>FULLSCREEN 4K</span>
                </button>
              </div>

              {/* 4K Board Showcase */}
              <div className="relative border-2 border-[#262626] bg-[#080808] overflow-hidden group">
                <img 
                  src="/assets/brandkit/zyvro-zv-brandkit-overview.jpg" 
                  alt="ZYVRO LABS Official Brandkit Board"
                  className="w-full h-auto object-cover filter contrast-105"
                />
              </div>

              {/* Specs Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono pt-2">
                <div className="p-3 bg-[#111111] border border-[#202020] space-y-1">
                  <div className="text-[#D7FF3F] font-bold">PRIMARY MONOGRAM:</div>
                  <div className="text-[#A0A0A0]">Merged Z+V Titanium Vector with Acid Lime Highlight</div>
                </div>

                <div className="p-3 bg-[#111111] border border-[#202020] space-y-1">
                  <div className="text-[#D7FF3F] font-bold">COLOR SYSTEM:</div>
                  <div className="text-[#A0A0A0]">#080808 Dark · #202020 Surface · #D7FF3F Toxic Lime</div>
                </div>

                <div className="p-3 bg-[#111111] border border-[#202020] space-y-1">
                  <div className="text-[#D7FF3F] font-bold">TYPOGRAPHY SPEC:</div>
                  <div className="text-[#A0A0A0]">Display: Chakra Petch / Syne · Technical: JetBrains Mono</div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: IN-GAME PRODUCTION SPLASH SCREEN (4K)
          ======================================================== */}
          {selectedTab === 'game-splash' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#202020] pb-3">
                <div>
                  <h3 className="text-xl font-black font-display text-white uppercase">
                    IN-GAME PRODUCTION BOOT SPLASH CARD (4K)
                  </h3>
                  <p className="text-xs font-mono text-[#A0A0A0]">
                    Splash screen resmi yang konsisten digunakan pada opening boot seluruh judul game ZYVRO LABS.
                  </p>
                </div>

                <button
                  onClick={() => setInspectModalImage('/assets/brandkit/zyvro-game-boot-splash.jpg')}
                  className="px-3 py-1.5 bg-[#171717] hover:bg-[#D7FF3F] text-[#D7FF3F] hover:text-[#080808] border border-[#333333] text-xs font-mono transition-all flex items-center gap-1.5"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>FULLSCREEN 4K</span>
                </button>
              </div>

              {/* 4K Game Splash Showcase */}
              <div className="relative border-2 border-[#262626] bg-[#080808] overflow-hidden">
                <img 
                  src="/assets/brandkit/zyvro-game-boot-splash.jpg" 
                  alt="ZYVRO LABS Official Game Splash Card"
                  className="w-full h-auto object-cover filter contrast-105"
                />
              </div>

              <div className="p-3 bg-[#111111] border border-[#202020] text-xs font-mono text-[#888888] flex items-center justify-between">
                <span>USAGE: 16:9 4K CINEMATIC TITLE CARD FOR UNREAL ENGINE 5 &amp; CUSTOM Z-CORE ENGINES</span>
                <span className="text-[#D7FF3F]">ASSET PATH: /assets/brandkit/zyvro-game-boot-splash.jpg</span>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Fullscreen 4K Image Zoom Lightbox Modal */}
      {inspectModalImage && (
        <div 
          onClick={() => setInspectModalImage(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden border-2 border-[#D7FF3F]">
            <img src={inspectModalImage} alt="4K Master Zoom" className="w-full h-full object-contain" />
            <button
              onClick={() => setInspectModalImage(null)}
              className="absolute top-3 right-3 p-2 bg-[#080808]/80 text-[#D7FF3F] hover:bg-[#D7FF3F] hover:text-[#080808] border border-[#333333]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

/* ========================================================
   HIGH-PRECISION SVG LOGO VECTOR RENDERER (MERGED ZV)
======================================================== */
export const LogoIconRenderer: React.FC<{ id: LogoOptionId; size?: number; className?: string }> = ({
  id,
  size = 32,
  className = ''
}) => {
  switch (id) {
    case 'zv-master':
    case 'zv-kinetic':
    case 'zv-shield':
    default:
      // Merged Z + V Monogram Vector
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          {/* Top Z bar */}
          <path d="M18,18 L68,18 L50,38 L18,38 Z" fill="#E8E8E8" />
          {/* Diagonal Z slash merging into V */}
          <polygon points="48,38 72,18 36,82 18,82" fill="#D7FF3F" />
          {/* Right V arm extending up */}
          <polygon points="36,82 54,48 76,48 48,92 32,92" fill="#D7FF3F" />
          {/* Status Pip */}
          <circle cx="82" cy="28" r="4" fill="#D7FF3F" />
        </svg>
      );

    case 'delta':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <polygon points="50,10 90,88 10,88" stroke="#D7FF3F" strokeWidth="7" fill="#080808" />
          <polygon points="50,42 72,82 28,82" fill="#D7FF3F" opacity="0.8" />
          <circle cx="50" cy="62" r="7" fill="#080808" stroke="#F2F2F2" strokeWidth="3" />
        </svg>
      );
  }
};
