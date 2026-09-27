import React, { useState, useEffect, useRef } from 'react';
import { GameProject, SystemSection } from '../types';
import { GAME_PROJECTS, SYSTEM_METADATA } from '../utils/constants';
import { sound } from '../utils/soundManager';
import { 
  Play, 
  ChevronRight, 
  Layers, 
  FlaskConical, 
  BookOpen, 
  ShieldAlert, 
  Cpu, 
  Sparkles,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';

interface MainHubProps {
  onSelectProject: (project: GameProject) => void;
  onNavigate: (section: SystemSection) => void;
}

export const MainHub: React.FC<MainHubProps> = ({ onSelectProject, onNavigate }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeProject = GAME_PROJECTS[selectedIdx];

  const handleNextProject = () => {
    sound.playHover();
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIdx((prev) => (prev + 1) % GAME_PROJECTS.length);
      setIsTransitioning(false);
    }, 150);
  };

  const handlePrevProject = () => {
    sound.playHover();
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIdx((prev) => (prev - 1 + GAME_PROJECTS.length) % GAME_PROJECTS.length);
      setIsTransitioning(false);
    }, 150);
  };

  const handleEnterWorld = () => {
    sound.playAccessGranted();
    onSelectProject(activeProject);
  };

  // Interactive 3D Particle Matrix Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const nodeCount = 45;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid
      ctx.strokeStyle = 'rgba(215, 255, 63, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & Draw Nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node
        ctx.fillStyle = `rgba(215, 255, 63, ${node.alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(215, 255, 63, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Mouse gravity pull line
        const mouseDist = Math.hypot(node.x - mouseX, node.y - mouseY);
        if (mouseDist < 160) {
          ctx.strokeStyle = `rgba(215, 255, 63, ${0.3 * (1 - mouseDist / 160)})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen pt-16 pb-24 md:pl-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-between select-none">
      
      {/* Background Interactive Particle Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full opacity-60" />
      </div>

      {/* ========================================================
          HERO MAIN COMMAND HEADER
      ======================================================== */}
      <div className="relative z-10 pt-4 md:pt-6">
        
        {/* State Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#202020] pb-3 mb-6">
          <div className="flex items-center space-x-3">
            <span className="px-2 py-0.5 bg-[#171717] border border-[#292929] text-[10px] font-mono tracking-widest text-[#D7FF3F] uppercase">
              COMMAND CENTER // ROOT_SYS
            </span>
            <span className="text-xs text-[#A0A0A0] font-mono hidden sm:inline">
              ZYVRO LABS DIGITAL WORLD
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-[#666666]">
            <span className="flex items-center gap-1.5 text-[#D7FF3F]">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              <span>KERNEL: ACTIVE</span>
            </span>
            <span>BUILD: {SYSTEM_METADATA.build}</span>
          </div>
        </div>

        {/* Hero World Showcase Container */}
        <div className="relative rounded-none border border-[#262626] bg-[#101010]/90 backdrop-blur-md overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.6)]">
          
          {/* Top Edge Indicator */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D7FF3F] to-transparent z-20" />

          {/* Corner Brackets */}
          <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#D7FF3F] z-20" />
          <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#D7FF3F] z-20" />
          <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#D7FF3F] z-20" />
          <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#D7FF3F] z-20" />

          {/* 4K Hero Visual Media Backdrop */}
          <div className="relative h-[340px] md:h-[460px] lg:h-[520px] w-full overflow-hidden">
            <img 
              src={activeProject.images.hero} 
              alt={activeProject.title}
              className={`w-full h-full object-cover object-center transition-all duration-700 filter brightness-60 contrast-110 ${
                isTransitioning ? 'scale-110 opacity-30 blur-sm' : 'scale-100 opacity-90 blur-0'
              }`}
            />

            {/* Dark Industrial Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-transparent to-[#080808]/80" />

            {/* HUD Reticle Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-64 h-64 border border-[#D7FF3F]/30 rounded-full animate-spin-slow flex items-center justify-center">
                <div className="w-48 h-48 border border-dashed border-[#D7FF3F]/20 rounded-full" />
              </div>
            </div>

            {/* In-Hero Project Content Info */}
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-10">
              
              {/* Top Hero Specs */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-[#080808]/80 border border-[#262626] px-3 py-1">
                  <span className="w-2 h-2 bg-[#D7FF3F] rounded-full animate-ping" />
                  <span className="text-[11px] font-mono text-[#D7FF3F] font-bold tracking-widest">
                    {activeProject.code}
                  </span>
                  <span className="text-[#666666] text-[10px]">|</span>
                  <span className="text-[#A0A0A0] text-[11px] font-mono uppercase">
                    {activeProject.status}
                  </span>
                </div>

                <div className="flex items-center space-x-2 bg-[#080808]/80 border border-[#262626] px-3 py-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span className="text-[10px] font-mono text-[#FFB800] tracking-widest font-bold">
                    THREAT: {activeProject.threatLevel}
                  </span>
                </div>
              </div>

              {/* Main Title & Action Bar */}
              <div className="max-w-2xl space-y-4">
                
                <div>
                  <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-[#D7FF3F] uppercase mb-1">
                    {activeProject.genre}
                  </p>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-display tracking-tight text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                    {activeProject.title}
                  </h2>
                </div>

                <p className="text-sm md:text-base text-[#D0D0D0] font-mono line-clamp-2 max-w-xl leading-relaxed">
                  {activeProject.tagline}
                </p>

                {/* Primary Action Button */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleEnterWorld}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="interact"
                    data-cursor-label="ENTER WORLD"
                    className="group relative px-6 md:px-8 py-3.5 bg-[#D7FF3F] text-[#080808] font-mono font-bold tracking-widest text-xs md:text-sm uppercase transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(215,255,63,0.4)] flex items-center gap-3"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>[ ENTER WORLD ]</span>
                    <span className="text-[10px] bg-[#080808] text-[#D7FF3F] px-1.5 py-0.5 rounded">
                      {activeProject.build}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onNavigate('projects');
                    }}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="select"
                    data-cursor-label="ALL WORLDS"
                    className="px-5 py-3.5 bg-[#171717]/80 hover:bg-[#202020] text-white border border-[#292929] hover:border-[#D7FF3F]/50 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <span>BROWSE ALL WORLDS</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D7FF3F]" />
                  </button>
                </div>

              </div>

              {/* Bottom Carousel Switcher Controls */}
              <div className="flex items-center justify-between border-t border-[#262626]/80 pt-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono text-[#A0A0A0]">
                    SECTOR {selectedIdx + 1} / {GAME_PROJECTS.length}
                  </span>
                  <div className="flex space-x-1">
                    {GAME_PROJECTS.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          sound.playHover();
                          setSelectedIdx(idx);
                        }}
                        className={`w-5 h-1 transition-all ${
                          idx === selectedIdx ? 'bg-[#D7FF3F] w-8' : 'bg-[#292929] hover:bg-[#666666]'
                        }`}
                        title={p.title}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevProject}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="interact"
                    data-cursor-label="PREV"
                    className="p-2 bg-[#080808]/80 hover:bg-[#1a1a1a] border border-[#292929] text-[#A0A0A0] hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextProject}
                    onMouseEnter={() => sound.playHover()}
                    data-cursor="interact"
                    data-cursor-label="NEXT"
                    className="p-2 bg-[#080808]/80 hover:bg-[#1a1a1a] border border-[#292929] text-[#A0A0A0] hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          THREE KEY INTERACTIVE HUBS (Projects, Lab, Archive)
      ======================================================== */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        
        {/* Card 1: Projects / Worlds */}
        <div 
          onClick={() => {
            sound.playClick();
            onNavigate('projects');
          }}
          onMouseEnter={() => sound.playHover()}
          data-cursor="select"
          data-cursor-label="GAME SECTOR"
          className="group relative p-6 bg-[#101010] border border-[#202020] hover:border-[#D7FF3F]/60 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(215,255,63,0.15)] flex flex-col justify-between"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D7FF3F] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-[#A0A0A0] tracking-widest uppercase">
                SECTOR // 01
              </span>
              <Layers className="w-5 h-5 text-[#D7FF3F] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold font-display text-white tracking-wider mb-2 group-hover:text-[#D7FF3F] transition-colors">
              PROJECT WORLDS
            </h3>
            <p className="text-xs text-[#A0A0A0] font-mono leading-relaxed">
              Explore 4 high-tension tactical simulations, survival horror complexes, and void exploration engines.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#D7FF3F]">
            <span className="font-bold tracking-wider">[ 4 ACTIVE BUILDS ]</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Zyvro Lab */}
        <div 
          onClick={() => {
            sound.playClick();
            onNavigate('lab');
          }}
          onMouseEnter={() => sound.playHover()}
          data-cursor="select"
          data-cursor-label="OPEN LAB"
          className="group relative p-6 bg-[#101010] border border-[#202020] hover:border-[#D7FF3F]/60 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(215,255,63,0.15)] flex flex-col justify-between"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D7FF3F] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-[#A0A0A0] tracking-widest uppercase">
                SECTOR // 02
              </span>
              <FlaskConical className="w-5 h-5 text-[#D7FF3F] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold font-display text-white tracking-wider mb-2 group-hover:text-[#D7FF3F] transition-colors">
              ZYVRO LAB R&amp;D
            </h3>
            <p className="text-xs text-[#A0A0A0] font-mono leading-relaxed">
              Interact with live experimental prototypes: AI creature kinematics, 3D terrain matrices, and gravity singularity solvers.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#D7FF3F]">
            <span className="font-bold tracking-wider">[ INTERACTIVE PROTOTYPES ]</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Archive */}
        <div 
          onClick={() => {
            sound.playClick();
            onNavigate('archive');
          }}
          onMouseEnter={() => sound.playHover()}
          data-cursor="select"
          data-cursor-label="READ LOGS"
          className="group relative p-6 bg-[#101010] border border-[#202020] hover:border-[#D7FF3F]/60 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(215,255,63,0.15)] flex flex-col justify-between"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D7FF3F] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-[#A0A0A0] tracking-widest uppercase">
                SECTOR // 03
              </span>
              <BookOpen className="w-5 h-5 text-[#D7FF3F] group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold font-display text-white tracking-wider mb-2 group-hover:text-[#D7FF3F] transition-colors">
              DEV ARCHIVE &amp; LORE
            </h3>
            <p className="text-xs text-[#A0A0A0] font-mono leading-relaxed">
              Technical design documents, binaural audio research, classified declassified post-mortems, and patch logs.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#D7FF3F]">
            <span className="font-bold tracking-wider">[ ACCESS DATABASE ]</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* ========================================================
          BOTTOM SYSTEM MANIFESTO STRIP
      ======================================================== */}
      <div className="relative z-10 border border-[#202020] bg-[#0c0c0c] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A0A0A0]">
        <div className="flex items-center space-x-3">
          <span className="text-[#D7FF3F] font-bold">SYS // IDENTIFIER:</span>
          <span>ZYVRO LABS IS A DIGITAL WORLD. NOT A CORPORATE HOMEPAGE.</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('origin');
            }}
            className="text-white hover:text-[#D7FF3F] underline underline-offset-4 tracking-wider"
          >
            VIEW ORIGIN MANIFESTO →
          </button>
        </div>
      </div>

    </div>
  );
};
