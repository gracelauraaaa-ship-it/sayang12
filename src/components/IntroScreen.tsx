import React from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';

interface IntroScreenProps {
  onStartUniverse: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onStartUniverse,
  isMuted,
  onToggleMute,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-radial from-[#1e0722] via-[#0d0312] to-[#050107] text-[#fbebf2] px-6 select-none">
      {/* Background ambient cosmic glow rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-pink-600/10 blur-[130px]" />
        <div className="absolute bottom-[-15%] left-[20%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] rounded-full bg-rose-500/10 blur-[110px]" />
      </div>

      {/* Floating starry ambient hints */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-[18%] left-[12%] text-xs text-pink-300/40 tracking-widest font-serif animate-pulse">
          Je t'aime Grace Laura · French
        </span>
        <span className="absolute top-[25%] right-[15%] text-xs text-purple-300/40 tracking-widest font-serif animate-pulse" style={{ animationDelay: '1s' }}>
          愛してる Grace Laura · Japanese
        </span>
        <span className="absolute bottom-[28%] left-[18%] text-xs text-amber-200/40 tracking-widest font-serif animate-pulse" style={{ animationDelay: '2s' }}>
          Aku cinta kamu Grace Laura · Indonesian
        </span>
        <span className="absolute bottom-[22%] right-[20%] text-xs text-cyan-200/40 tracking-widest font-serif animate-pulse" style={{ animationDelay: '1.5s' }}>
          사랑해 Grace Laura · Korean
        </span>
        <span className="absolute top-[38%] left-[8%] text-xs text-emerald-200/30 tracking-widest font-serif animate-pulse" style={{ animationDelay: '2.5s' }}>
          Te amo Grace Laura · Spanish
        </span>
      </div>

      {/* Main Hero Card Container */}
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center flex flex-col items-center">
        {/* Soft Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-medium tracking-widest uppercase mb-6 backdrop-blur-md">
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/60 animate-pulse" />
          <span>25 Languages · Dedicated to Grace Laura ♡</span>
        </div>

        {/* Primary Poetic Title */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-pink-300/80 mb-6 drop-shadow-sm">
          A Universe of Love for Grace Laura
        </h1>

        <p className="font-sans-main text-base sm:text-lg text-pink-100/75 max-w-xl mx-auto font-light leading-relaxed mb-10">
          Every single phrase from 25 world languages carries the name of Grace Laura, drifting like celestial stars and gathering into one radiant, beating Heart of Love ♡.
        </p>

        {/* Primary CTA Button requested in prompt */}
        <button
          onClick={onStartUniverse}
          className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full text-base sm:text-lg font-medium text-white tracking-wide transition-all duration-300 shadow-[0_0_40px_rgba(244,63,94,0.35)] hover:shadow-[0_0_60px_rgba(244,63,94,0.6)] active:scale-95 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 hover:from-pink-500 hover:via-rose-400 hover:to-purple-500 cursor-pointer overflow-hidden border border-pink-300/30"
          aria-label="Open Your Little Universe"
        >
          {/* Subtle button shimmer sheen */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent ease-out" />
          
          <Sparkles className="w-5 h-5 text-pink-200 transition-transform group-hover:rotate-12 duration-300" />
          <span className="relative font-medium tracking-wide">Open Your Little Universe ♡</span>
        </button>

        {/* Quick Preferences Bar below button */}
        <div className="mt-8 flex items-center justify-center gap-5 text-xs text-pink-200/60">
          <button
            onClick={onToggleMute}
            className="flex items-center gap-1.5 hover:text-pink-100 transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-white/5"
            title={isMuted ? 'Turn on sound' : 'Mute sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-pink-400" /> : <Volume2 className="w-3.5 h-3.5 text-pink-300" />}
            <span>{isMuted ? 'Sound muted' : 'Ambient chimes on'}</span>
          </button>

          <span className="text-pink-400/30">·</span>

          <button
            onClick={onToggleReducedMotion}
            className="flex items-center gap-1.5 hover:text-pink-100 transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-white/5"
            title="Toggle gentler motion speed"
          >
            <span>{reducedMotion ? 'Gentle motion mode' : 'Cinematic motion'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Subtle Caption */}
      <footer className="absolute bottom-6 text-center text-xs text-pink-200/40 tracking-wider">
        <span>Arabic · Chinese · English · French · Hindi · Japanese · Spanish · & 18 more</span>
      </footer>
    </div>
  );
};
