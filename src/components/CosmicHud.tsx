import React from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
  Sparkles,
  Maximize2,
  Minimize2,
  Heart,
  Type,
} from 'lucide-react';
import { AnimationPhase } from './LoveUniverseCanvas';
import { FormationShape } from '../utils/typographyLayout';

interface CosmicHudProps {
  currentPhase: AnimationPhase;
  onJumpToPhase: (phase: AnimationPhase) => void;
  onReplay: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenLanguages: () => void;
  onReturnIntro: () => void;
  speedMultiplier: number;
  onChangeSpeed: (spd: number) => void;
  activeShape: FormationShape;
  onChangeShape: (shape: FormationShape) => void;
}

export const CosmicHud: React.FC<CosmicHudProps> = ({
  currentPhase,
  onJumpToPhase,
  onReplay,
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleReducedMotion,
  onOpenLanguages,
  onReturnIntro,
  speedMultiplier,
  onChangeSpeed,
  activeShape,
  onChangeShape,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <>
      {/* ================= TOP BAR (CONSTITUTION CONTRACT) ================= */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-8 px-5 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-b from-[#08020c]/90 via-[#08020c]/60 to-transparent backdrop-blur-[6px] border-b border-pink-500/10">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={onReturnIntro}
          className="font-display text-lg sm:text-xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-purple-200 hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
          <span>Celestial LOVE</span>
        </button>

        {/* Zone 2: 4-5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-medium text-pink-200/70">
          <button
            onClick={() => onJumpToPhase('phase1')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPhase === 'phase1' ? 'text-white font-semibold underline decoration-pink-400 underline-offset-4' : 'hover:text-pink-100'
            }`}
          >
            01. Cosmic Drift
          </button>
          <button
            onClick={() => onJumpToPhase('phase2')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPhase === 'phase2' ? 'text-white font-semibold underline decoration-pink-400 underline-offset-4' : 'hover:text-pink-100'
            }`}
          >
            02. Gathering
          </button>
          <button
            onClick={() => onJumpToPhase('phase3')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPhase === 'phase3' ? 'text-white font-semibold underline decoration-pink-400 underline-offset-4' : 'hover:text-pink-100'
            }`}
          >
            03. Grand Reveal
          </button>
          
          {/* Shape Selector in Navigation */}
          <div className="flex items-center bg-white/5 rounded-full p-0.5 border border-pink-500/20">
            <button
              onClick={() => onChangeShape('heart')}
              className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                activeShape === 'heart'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white font-semibold shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                  : 'text-pink-200/60 hover:text-white'
              }`}
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Heart Love ♡</span>
            </button>
            <button
              onClick={() => onChangeShape('love')}
              className={`px-3 py-1 rounded-full text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                activeShape === 'love'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'text-pink-200/60 hover:text-white'
              }`}
            >
              <Type className="w-3 h-3" />
              <span>LOVE Letters</span>
            </button>
          </div>

          <button
            onClick={onOpenLanguages}
            className="hover:text-pink-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 text-pink-300"
          >
            <BookOpen className="w-3.5 h-3.5 text-pink-400" />
            <span>25 Languages</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action / controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onToggleMute}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-pink-200/80 hover:text-white transition-colors cursor-pointer border border-pink-500/15"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-pink-400" /> : <Volume2 className="w-4 h-4 text-pink-300" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 rounded-full bg-white/5 hover:bg-white/10 text-pink-200/80 hover:text-white transition-colors cursor-pointer border border-pink-500/15"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onReplay}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:from-pink-500 hover:to-purple-500 transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)] cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Formation</span>
          </button>
        </div>
      </header>

      {/* ================= BOTTOM CINEMATIC DOCK ================= */}
      <footer className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-2xl px-4 py-2.5 rounded-2xl bg-[#14061a]/85 backdrop-blur-xl border border-pink-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3 text-xs text-pink-100">
        
        {/* Phase Narrative & Status Indicator */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-ping shrink-0" />
          <div className="truncate">
            <span className="font-semibold text-pink-200">
              {currentPhase === 'phase1' && 'Phase 1 · Cosmic Drift'}
              {currentPhase === 'phase2' && (activeShape === 'heart' ? 'Phase 2 · Words Gathering into Giant Heart ♡' : 'Phase 2 · Words Gathering into L-O-V-E')}
              {currentPhase === 'phase3' && (activeShape === 'heart' ? 'Phase 3 · Radiant Heart Love Reveal ♡' : 'Phase 3 · Giant LOVE Letters Reveal')}
            </span>
            <span className="hidden sm:inline text-pink-300/50 ml-2">
              {currentPhase === 'phase1' && '— Romantic phrases twinkle like celestial stars'}
              {currentPhase === 'phase2' && '— Following curved starlight paths into formation'}
              {currentPhase === 'phase3' && '— Hover or tap anywhere to burst hearts & sparkles ♡'}
            </span>
          </div>
        </div>

        {/* Quick Dock Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Shape Switch */}
          <button
            onClick={() => onChangeShape(activeShape === 'heart' ? 'love' : 'heart')}
            className="md:hidden px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-200 border border-pink-500/30 text-[11px] flex items-center gap-1"
            title="Switch Shape"
          >
            <Heart className="w-3 h-3 fill-current" />
            <span>{activeShape === 'heart' ? 'Heart ♡' : 'Letters'}</span>
          </button>

          {/* Mobile view language drawer button */}
          <button
            onClick={onOpenLanguages}
            className="md:hidden p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-pink-300 transition-colors"
            title="Browse all 25 languages"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>

          {/* Speed selector */}
          <div className="hidden sm:flex items-center bg-white/5 rounded-lg p-0.5 border border-pink-500/10">
            {[0.75, 1.0, 1.5].map((spd) => (
              <button
                key={spd}
                onClick={() => onChangeSpeed(spd)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  speedMultiplier === spd ? 'bg-pink-500/30 text-white font-bold' : 'text-pink-300/60 hover:text-pink-100'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Reduced Motion Toggle */}
          <button
            onClick={onToggleReducedMotion}
            className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors border ${
              reducedMotion
                ? 'bg-purple-900/40 border-purple-400/40 text-purple-200'
                : 'bg-white/5 border-pink-500/15 text-pink-300/70 hover:text-white'
            }`}
            title="Toggle calm animation mode"
          >
            {reducedMotion ? 'Calm Mode' : 'Cinematic'}
          </button>
        </div>
      </footer>
    </>
  );
};
