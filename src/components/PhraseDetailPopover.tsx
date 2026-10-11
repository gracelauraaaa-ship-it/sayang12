import React from 'react';
import { Heart, Sparkles, X } from 'lucide-react';
import { WordParticle } from '../utils/typographyLayout';

interface PhraseDetailPopoverProps {
  particle: WordParticle | null;
  onClose: () => void;
  onExplode: () => void;
}

export const PhraseDetailPopover: React.FC<PhraseDetailPopoverProps> = ({
  particle,
  onClose,
  onExplode,
}) => {
  if (!particle) return null;

  return (
    <div
      className="fixed z-40 max-w-xs sm:max-w-sm p-4 rounded-2xl bg-[#16061d]/90 backdrop-blur-xl border border-pink-400/30 text-[#fbebf2] shadow-[0_10px_35px_rgba(244,63,94,0.3)] transition-all animate-in fade-in zoom-in-95 pointer-events-auto"
      style={{
        left: Math.min(window.innerWidth - 320, Math.max(16, particle.currentX - 140)),
        top: Math.max(70, Math.min(window.innerHeight - 180, particle.currentY - 110)),
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-pink-300/80 font-medium tracking-wide">
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          <span>{particle.language}</span>
          <span className="text-pink-400/40">·</span>
          <span className="text-[11px] px-1.5 py-0.2 rounded bg-pink-500/15 text-pink-200">
            Part of Letter '{particle.letter}'
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 -mr-1 -mt-1 text-pink-300/60 hover:text-white rounded-md hover:bg-white/10 transition-colors"
          aria-label="Close details"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-2 mb-1">
        <h4 className="font-display text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-100">
          {particle.text}
        </h4>
        <p className="text-xs text-pink-200/80 italic mt-0.5 font-sans-main">
          "{particle.translation}"
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-pink-500/15 flex items-center justify-between text-[11px]">
        <span className="text-pink-300/50">Click word to unleash heart burst</span>
        <button
          onClick={onExplode}
          className="px-2.5 py-1 rounded-full bg-pink-500/25 hover:bg-pink-500/40 text-pink-100 flex items-center gap-1 transition-all cursor-pointer font-medium"
        >
          <Sparkles className="w-3 h-3 text-pink-300" />
          <span>Send Sparkles</span>
        </button>
      </div>
    </div>
  );
};
