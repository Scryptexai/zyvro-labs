import React from 'react';
import { ORIGIN_MANIFESTO, SYSTEM_METADATA } from '../utils/constants';
import { sound } from '../utils/soundManager';
import { 
  Globe, 
  Terminal, 
  Code2, 
  Layers
} from 'lucide-react';

export const OriginSystem: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-20 pb-28 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none">
      
      {/* Top Header */}
      <div className="border-b border-[#202020] pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#D7FF3F] tracking-widest uppercase mb-1">
            <Globe className="w-3.5 h-3.5 text-[#D7FF3F]" />
            <span>ORIGIN SPECIFICATION &amp; PHILOSOPHY</span>
            <span className="text-[#666666]">|</span>
            <span className="text-[#A0A0A0]">CORE IDENTIFIER</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            SYSTEM // ORIGIN
          </h1>
        </div>

        <div className="flex items-center space-x-2 bg-[#101010] border border-[#262626] px-3 py-1.5 text-xs font-mono text-[#A0A0A0]">
          <span className="w-2 h-2 rounded-full bg-[#D7FF3F] animate-pulse" />
          <span>ESTABLISHED: {ORIGIN_MANIFESTO.origin}</span>
        </div>
      </div>

      {/* Main Studio System Manifest (Card Grid & Specs) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        
        {/* Left Column: Core System Identifier Specification (5 cols) */}
        <div className="lg:col-span-5 bg-[#0f0f0f] border border-[#262626] p-6 space-y-6 shadow-[0_0_35px_rgba(0,0,0,0.8)] relative">
          
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent" />

          {/* System Spec Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#202020] pb-2">
              <span className="text-[11px] font-mono text-[#666666] tracking-widest uppercase">ENTITY</span>
              <span className="text-sm font-bold font-display text-white">{ORIGIN_MANIFESTO.entity}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#202020] pb-2">
              <span className="text-[11px] font-mono text-[#666666] tracking-widest uppercase">TYPE</span>
              <span className="text-xs font-mono text-[#D7FF3F] font-bold">INDEPENDENT GAME STUDIO</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#202020] pb-2">
              <span className="text-[11px] font-mono text-[#666666] tracking-widest uppercase">ORIGIN YEAR</span>
              <span className="text-xs font-mono text-white">{ORIGIN_MANIFESTO.origin}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#202020] pb-2">
              <span className="text-[11px] font-mono text-[#666666] tracking-widest uppercase">STATUS</span>
              <span className="text-xs font-mono text-[#D7FF3F] font-bold">SOVEREIGN // ACTIVE</span>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-[#666666] tracking-widest uppercase block">
                CORE FOCUS DOMAINS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ORIGIN_MANIFESTO.focus.map((f, idx) => (
                  <span key={idx} className="px-2 py-1 bg-[#171717] border border-[#282828] text-[10px] font-mono text-[#D0D0D0]">
                    ◈ {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bold Core Statement */}
          <div className="p-4 bg-[#141414] border-l-2 border-[#D7FF3F] space-y-2">
            <div className="text-xs font-mono text-[#A0A0A0] uppercase tracking-widest">DIRECTIVE // 01</div>
            <p className="text-sm md:text-base font-display font-bold text-white tracking-wide leading-snug">
              WE BUILD GAMES, INTERACTIVE WORLDS, AND EXPERIMENTAL DIGITAL EXPERIENCES.
            </p>
          </div>

          {/* Technical Telemetry */}
          <div className="text-[10px] font-mono text-[#666666] space-y-1">
            <div>KERNEL: {SYSTEM_METADATA.kernel}</div>
            <div>COORDINATES: {SYSTEM_METADATA.coordinates}</div>
          </div>

        </div>

        {/* Right Column: Studio Manifesto & 3 Pillars (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Manifesto Box */}
          <div className="bg-[#0b0b0b] border border-[#202020] p-6 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#D7FF3F] tracking-widest uppercase">
              <Terminal className="w-4 h-4 text-[#D7FF3F]" />
              <span>THE ZYVRO MANIFESTO</span>
            </div>

            <div className="space-y-3 text-xs md:text-sm font-mono text-[#B0B0B0] leading-relaxed">
              {ORIGIN_MANIFESTO.manifesto.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* 3 Core Pillars */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#666666] uppercase tracking-widest">
              SYSTEM PILLARS // THREE TENETS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ORIGIN_MANIFESTO.pillars.map((pillar) => (
                <div 
                  key={pillar.code}
                  onMouseEnter={() => sound.playHover()}
                  className="p-4 bg-[#0e0e0e] border border-[#222222] hover:border-[#D7FF3F]/50 transition-colors space-y-2 group"
                >
                  <div className="text-[10px] font-mono text-[#D7FF3F] font-bold">
                    TENET // {pillar.code}
                  </div>
                  <h3 className="text-xs font-bold font-display text-white uppercase group-hover:text-[#D7FF3F] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] font-mono text-[#888888] leading-normal">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Technical Architecture Footer */}
      <div className="border-t border-[#202020] pt-6 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777777]">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1 text-[#D7FF3F] font-bold"><Code2 className="w-4 h-4" /> ENGINE: Z-CORE 64-BIT</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1"><Layers className="w-4 h-4" /> RENDER: VULKAN &amp; DIRECTX 12 HDR</span>
        </div>
        <div>
          <span>ALL SIMULATIONS HOSTED LOCALLY &amp; EXECUTED IN BROWSER KERNEL</span>
        </div>
      </div>

    </div>
  );
};
