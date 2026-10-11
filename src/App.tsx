/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { LoveUniverseCanvas, AnimationPhase } from './components/LoveUniverseCanvas';
import { CosmicHud } from './components/CosmicHud';
import { LanguageExplorerModal } from './components/LanguageExplorerModal';
import { FormationShape } from './utils/typographyLayout';
import { soundFx } from './utils/audio';

export default function App() {
  const [hasOpenedUniverse, setHasOpenedUniverse] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [isLanguagesModalOpen, setIsLanguagesModalOpen] = useState<boolean>(false);
  const [highlightLanguage, setHighlightLanguage] = useState<string | null>(null);
  const [currentPhase, setCurrentPhase] = useState<AnimationPhase>('phase1');
  const [activeShape, setActiveShape] = useState<FormationShape>('heart'); // Default: Heart Love ♡

  // Universe canvas key to trigger fresh re-mount or replay
  const [canvasKey, setCanvasKey] = useState<number>(0);

  const handleStartUniverse = () => {
    setHasOpenedUniverse(true);
    soundFx.playChime(2, 1.2);
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundFx.setMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playChime(4, 0.8);
    }
  };

  const handleToggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  const handleReplay = useCallback(() => {
    setCanvasKey((k) => k + 1);
    setCurrentPhase('phase1');
    soundFx.playChime(1, 1.0);
  }, []);

  const handleChangeShape = (shape: FormationShape) => {
    setActiveShape(shape);
    soundFx.playChime(3, 1.1);
  };

  const handleJumpToPhase = useCallback((phase: AnimationPhase) => {
    if (phase === 'phase1') {
      const el = document.querySelector('[data-testid="set-phase-p1"]') as HTMLElement | null;
      el?.click();
    } else if (phase === 'phase2') {
      const el = document.querySelector('[data-testid="set-phase-p2"]') as HTMLElement | null;
      el?.click();
    } else if (phase === 'phase3') {
      const el = document.querySelector('[data-testid="set-phase-p3"]') as HTMLElement | null;
      el?.click();
    }
    setCurrentPhase(phase);
  }, []);

  const handleHighlightLanguage = (langName: string) => {
    setHighlightLanguage(langName);
    setIsLanguagesModalOpen(false);
    setTimeout(() => {
      setHighlightLanguage((curr) => (curr === langName ? null : curr));
    }, 8000);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#07020a]">
      {!hasOpenedUniverse ? (
        <IntroScreen
          onStartUniverse={handleStartUniverse}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={handleToggleReducedMotion}
        />
      ) : (
        <main className="relative w-full h-full">
          {/* Top & Bottom Cinematic HUD */}
          <CosmicHud
            currentPhase={currentPhase}
            onJumpToPhase={handleJumpToPhase}
            onReplay={handleReplay}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            reducedMotion={reducedMotion}
            onToggleReducedMotion={handleToggleReducedMotion}
            onOpenLanguages={() => setIsLanguagesModalOpen(true)}
            onReturnIntro={() => setHasOpenedUniverse(false)}
            speedMultiplier={speedMultiplier}
            onChangeSpeed={(spd) => setSpeedMultiplier(spd)}
            activeShape={activeShape}
            onChangeShape={handleChangeShape}
          />

          {/* Master Cinematic Animation Canvas */}
          <LoveUniverseCanvas
            key={canvasKey}
            reducedMotion={reducedMotion}
            speedMultiplier={speedMultiplier}
            highlightLanguage={highlightLanguage}
            onPhaseChange={(phase) => setCurrentPhase(phase)}
            activeShape={activeShape}
          />

          {/* 25 Languages Explorer Modal */}
          <LanguageExplorerModal
            isOpen={isLanguagesModalOpen}
            onClose={() => setIsLanguagesModalOpen(false)}
            onHighlightLanguage={handleHighlightLanguage}
          />
        </main>
      )}
    </div>
  );
}
