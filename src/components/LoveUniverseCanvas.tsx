import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  WordParticle,
  initializeParticles,
  getShapeBoundingBox,
  FormationShape,
} from '../utils/typographyLayout';
import {
  BackgroundStar,
  createBackgroundStars,
  SparkleParticle,
  spawnSparkles,
  FloatingHeartParticle,
  spawnHearts,
  FloatingTextBurst,
  spawnTextBurst,
  drawStarSparkle,
  drawHeart,
} from '../utils/particleEffects';
import { soundFx } from '../utils/audio';
import { PhraseDetailPopover } from './PhraseDetailPopover';

export type AnimationPhase = 'phase1' | 'phase2' | 'phase3';

interface LoveUniverseCanvasProps {
  reducedMotion: boolean;
  onPhaseChange?: (phase: AnimationPhase, elapsedSec: number) => void;
  speedMultiplier?: number;
  highlightLanguage?: string | null;
  onSelectWord?: (particle: WordParticle) => void;
  activeShape?: FormationShape;
}

export const LoveUniverseCanvas: React.FC<LoveUniverseCanvasProps> = ({
  reducedMotion,
  onPhaseChange,
  speedMultiplier = 1.0,
  highlightLanguage = null,
  onSelectWord,
  activeShape = 'heart',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation timeline state
  const animTimeRef = useRef<number>(0);
  const phaseRef = useRef<AnimationPhase>('phase1');
  const [currentPhase, setCurrentPhase] = useState<AnimationPhase>('phase1');

  // Particles & Objects
  const particlesRef = useRef<WordParticle[]>([]);
  const bgStarsRef = useRef<BackgroundStar[]>([]);
  const sparklesRef = useRef<SparkleParticle[]>([]);
  const heartsRef = useRef<FloatingHeartParticle[]>([]);
  const textBurstsRef = useRef<FloatingTextBurst[]>([]);

  // Interactive Hover state
  const hoveredParticleRef = useRef<WordParticle | null>(null);
  const [selectedParticle, setSelectedParticle] = useState<WordParticle | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const isPointerDownRef = useRef<boolean>(false);

  // Sound triggers state
  const hasTriggeredGatherChord = useRef<boolean>(false);
  const hasTriggeredRevealResonance = useRef<boolean>(false);

  // Timing thresholds (in seconds)
  const PHASE1_DURATION = 3.5;
  const PHASE2_END = 8.0;

  // Initialize canvas objects
  const initObjects = useCallback((w: number, h: number) => {
    particlesRef.current = initializeParticles(w, h, activeShape);
    bgStarsRef.current = createBackgroundStars(120, w, h);
    sparklesRef.current = [];
    heartsRef.current = [];
    textBurstsRef.current = [];
  }, [activeShape]);

  // Reset / Replay sequence
  const restartAnimation = useCallback(() => {
    if (!canvasRef.current) return;
    const { width, height } = canvasRef.current;
    initObjects(width, height);
    animTimeRef.current = 0;
    phaseRef.current = 'phase1';
    setCurrentPhase('phase1');
    hasTriggeredGatherChord.current = false;
    hasTriggeredRevealResonance.current = false;
    setSelectedParticle(null);
  }, [initObjects]);

  // Jump to specific phase
  const setPhaseDirectly = useCallback((phase: AnimationPhase) => {
    phaseRef.current = phase;
    setCurrentPhase(phase);
    if (phase === 'phase1') {
      animTimeRef.current = 0.5;
    } else if (phase === 'phase2') {
      animTimeRef.current = PHASE1_DURATION + 0.1;
      if (!hasTriggeredGatherChord.current) {
        soundFx.playGatherChord();
        hasTriggeredGatherChord.current = true;
      }
    } else if (phase === 'phase3') {
      animTimeRef.current = PHASE2_END + 0.5;
      if (!hasTriggeredRevealResonance.current) {
        soundFx.playRevealResonance();
        hasTriggeredRevealResonance.current = true;
      }
    }
  }, [PHASE1_DURATION, PHASE2_END]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      if (particlesRef.current.length === 0) {
        initObjects(w, h);
      } else {
        particlesRef.current.forEach((p) => {
          p.scatterX = Math.min(w * 0.95, Math.max(w * 0.05, p.scatterX));
          p.scatterY = Math.min(h * 0.95, Math.max(h * 0.05, p.scatterY));
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initObjects]);

  // Main Animation Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number = performance.now();

    const render = (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rawDelta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;
      const delta = Math.min(rawDelta, 0.1) * (reducedMotion ? 0.8 : speedMultiplier);

      animTimeRef.current += delta;
      const animSec = animTimeRef.current;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const shapeBox = getShapeBoundingBox(w, h, activeShape);

      // Determine current Phase
      let activePhase: AnimationPhase = 'phase1';
      if (animSec < PHASE1_DURATION) {
        activePhase = 'phase1';
      } else if (animSec < PHASE2_END) {
        activePhase = 'phase2';
      } else {
        activePhase = 'phase3';
      }

      if (phaseRef.current !== activePhase) {
        phaseRef.current = activePhase;
        setCurrentPhase(activePhase);
        if (onPhaseChange) {
          onPhaseChange(activePhase, animSec);
        }

        if (activePhase === 'phase2' && !hasTriggeredGatherChord.current) {
          soundFx.playGatherChord();
          hasTriggeredGatherChord.current = true;
        } else if (activePhase === 'phase3' && !hasTriggeredRevealResonance.current) {
          soundFx.playRevealResonance();
          hasTriggeredRevealResonance.current = true;
        }
      }

      // 1. Cosmic Background Gradient
      ctx.save();
      const bgGrad = ctx.createRadialGradient(
        w / 2, h / 2, Math.min(w, h) * 0.1,
        w / 2, h / 2, Math.max(w, h) * 0.85
      );
      bgGrad.addColorStop(0, '#1c0524');
      bgGrad.addColorStop(0.45, '#110316');
      bgGrad.addColorStop(0.8, '#08020b');
      bgGrad.addColorStop(1, '#030105');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // 2. Twinkling Background Stars
      ctx.save();
      bgStarsRef.current.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed * delta;
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = w;
        if (star.x > w) star.x = 0;
        if (star.y < 0) star.y = h;
        if (star.y > h) star.y = 0;

        const starAlpha = Math.max(0.08, star.alpha * (0.6 + 0.4 * Math.sin(star.twinklePhase)));
        ctx.fillStyle = star.color;
        ctx.globalAlpha = starAlpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.baseRadius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 3. Heartbeat Pulsation Scale
      let heartbeatScale = 1.0;
      if (activePhase === 'phase3' && !reducedMotion) {
        const heartCycle = (animSec % 1.25) / 1.25;
        if (heartCycle < 0.22) {
          heartbeatScale = 1.0 + 0.03 * Math.sin((heartCycle / 0.22) * Math.PI);
        } else if (heartCycle >= 0.26 && heartCycle < 0.44) {
          heartbeatScale = 1.0 + 0.018 * Math.sin(((heartCycle - 0.26) / 0.18) * Math.PI);
        }
      }

      // 4. Heart Love Aura & Delicate Silhouette Outline (Phase 3 & Phase 2)
      if (activePhase === 'phase3' || activePhase === 'phase2') {
        const shapeCenterX = shapeBox.x + shapeBox.width * 0.5;
        const shapeCenterY = shapeBox.y + shapeBox.height * (activeShape === 'heart' ? 0.46 : 0.5);
        const glowPulse = 0.5 + 0.5 * Math.sin(animSec * 2.2);

        // Faint radial aura behind the heart paragraph
        ctx.save();
        const auraGrad = ctx.createRadialGradient(
          shapeCenterX, shapeCenterY, 10,
          shapeCenterX, shapeCenterY, shapeBox.height * 0.52
        );
        auraGrad.addColorStop(0, `rgba(255, 77, 109, ${0.12 + glowPulse * 0.06})`);
        auraGrad.addColorStop(0.35, `rgba(255, 126, 182, ${0.07 + glowPulse * 0.04})`);
        auraGrad.addColorStop(0.68, `rgba(199, 125, 255, ${0.03 + glowPulse * 0.02})`);
        auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(shapeCenterX, shapeCenterY, shapeBox.height * 0.52, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Delicate glowing heart outline framing the neat text paragraph
        if (activeShape === 'heart' && activePhase === 'phase3') {
          ctx.save();
          const hbScale = heartbeatScale;
          const hBoxW = shapeBox.width * 0.96 * hbScale;
          const hBoxH = shapeBox.height * 0.94 * hbScale;
          const hBoxX = shapeCenterX - hBoxW / 2;
          const hBoxY = shapeCenterY - hBoxH / 2;

          ctx.strokeStyle = `rgba(255, 126, 182, ${0.22 + glowPulse * 0.12})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = '#ff4d6d';
          ctx.shadowBlur = 14;

          const topCurveHeight = hBoxH * 0.28;
          ctx.beginPath();
          ctx.moveTo(hBoxX + hBoxW / 2, hBoxY + topCurveHeight);
          // top left lobe
          ctx.bezierCurveTo(
            hBoxX + hBoxW / 2, hBoxY,
            hBoxX, hBoxY,
            hBoxX, hBoxY + topCurveHeight
          );
          // bottom left slope
          ctx.bezierCurveTo(
            hBoxX, hBoxY + (hBoxH + topCurveHeight) / 2,
            hBoxX + hBoxW / 2, hBoxY + (hBoxH + topCurveHeight) / 2,
            hBoxX + hBoxW / 2, hBoxY + hBoxH
          );
          // bottom right slope
          ctx.bezierCurveTo(
            hBoxX + hBoxW / 2, hBoxY + (hBoxH + topCurveHeight) / 2,
            hBoxX + hBoxW, hBoxY + (hBoxH + topCurveHeight) / 2,
            hBoxX + hBoxW, hBoxY + topCurveHeight
          );
          // top right lobe
          ctx.bezierCurveTo(
            hBoxX + hBoxW, hBoxY,
            hBoxX + hBoxW / 2, hBoxY,
            hBoxX + hBoxW / 2, hBoxY + topCurveHeight
          );
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
      }

      // Light wave sweep from left to right
      const wavePeriod = 4.5;
      const waveProgress = (animSec % wavePeriod) / wavePeriod;
      const waveX = shapeBox.x - shapeBox.width * 0.2 + waveProgress * (shapeBox.width * 1.4);
      const waveWidth = shapeBox.width * 0.24;

      // 5. Update and Draw Word Particles
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;
      let closestParticle: WordParticle | null = null;
      let closestDist = 50;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const particles = particlesRef.current;
      const totalCount = particles.length;

      const shapeCenterX = shapeBox.x + shapeBox.width * 0.5;
      const shapeCenterY = shapeBox.y + shapeBox.height * (activeShape === 'heart' ? 0.46 : 0.5);

      for (let i = 0; i < totalCount; i++) {
        const p = particles[i];

        // Choose target based on activeShape
        const targetNormX = activeShape === 'heart' ? p.heartTargetNormX : p.loveTargetNormX;
        const targetNormY = activeShape === 'heart' ? p.heartTargetNormY : p.loveTargetNormY;
        const targetAngle = activeShape === 'heart' ? p.heartTargetAngle : p.loveTargetAngle;
        const targetScale = activeShape === 'heart' ? p.heartTargetScale : p.loveTargetScale;

        const targetAbsX = shapeBox.x + targetNormX * shapeBox.width;
        const targetAbsY = shapeBox.y + targetNormY * shapeBox.height;

        const scaledTargetX = shapeCenterX + (targetAbsX - shapeCenterX) * heartbeatScale;
        const scaledTargetY = shapeCenterY + (targetAbsY - shapeCenterY) * heartbeatScale;

        if (activePhase === 'phase1') {
          p.scatterX += p.driftVx * (reducedMotion ? 0.3 : 1.0);
          p.scatterY += p.driftVy * (reducedMotion ? 0.3 : 1.0);
          p.scatterAngle += p.driftAngularV * (reducedMotion ? 0.2 : 1.0);

          const margin = 20;
          if (p.scatterX < -margin) p.scatterX = w + margin;
          if (p.scatterX > w + margin) p.scatterX = -margin;
          if (p.scatterY < -margin) p.scatterY = h + margin;
          if (p.scatterY > h + margin) p.scatterY = -margin;

          p.currentX = p.scatterX;
          p.currentY = p.scatterY;
          p.currentAngle = p.scatterAngle;
          p.currentScale = p.scatterScale;

          p.twinklePhase += p.twinkleSpeed * delta;
          const introFade = Math.min(1.0, animSec / 1.4);
          p.currentOpacity = introFade * (0.35 + 0.45 * (0.5 + 0.5 * Math.sin(p.twinklePhase)));
          p.trail = [];
        } else if (activePhase === 'phase2') {
          const gatherElapsed = animSec - PHASE1_DURATION;
          const gatherTotalSpan = PHASE2_END - PHASE1_DURATION;
          const startDelay = p.gatherDelay * 1.8;
          const particleDur = Math.max(1.8, gatherTotalSpan - startDelay);
          const rawT = Math.max(0, Math.min(1, (gatherElapsed - startDelay) / particleDur));

          const easeT = rawT < 0.5
            ? 4 * rawT * rawT * rawT
            : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

          const p0x = p.scatterX;
          const p0y = p.scatterY;
          const p2x = scaledTargetX;
          const p2y = scaledTargetY;

          const midX = (p0x + p2x) / 2;
          const midY = (p0y + p2y) / 2;
          const dx = p2x - p0x;
          const dy = p2y - p0y;
          const len = Math.hypot(dx, dy) || 1;
          const normalX = -dy / len;
          const normalY = dx / len;
          const p1x = midX + normalX * p.curveOffset * (1 - easeT);
          const p1y = midY + normalY * p.curveOffset * (1 - easeT);

          const invT = 1 - easeT;
          const currX = invT * invT * p0x + 2 * invT * easeT * p1x + easeT * easeT * p2x;
          const currY = invT * invT * p0y + 2 * invT * easeT * p1y + easeT * easeT * p2y;

          p.currentX = currX;
          p.currentY = currY;
          p.currentAngle = p.scatterAngle * (1 - easeT) + targetAngle * easeT;
          p.currentScale = p.scatterScale * (1 - easeT) + targetScale * easeT;
          p.currentOpacity = 0.5 + 0.45 * easeT;

          if (rawT > 0.05 && rawT < 0.95 && Math.random() < 0.35) {
            p.trail.push({ x: currX, y: currY, alpha: 0.7 });
            if (p.trail.length > 5) p.trail.shift();
          }

          if (rawT > 0.1 && rawT < 0.9 && Math.random() < 0.02) {
            sparklesRef.current.push(...spawnSparkles(currX, currY, 2));
          }
        } else {
          p.currentX = scaledTargetX;
          p.currentY = scaledTargetY;
          p.currentAngle = targetAngle;
          p.currentScale = targetScale * heartbeatScale;
          p.trail = [];

          p.twinklePhase += p.twinkleSpeed * delta;
          p.currentOpacity = 0.65 + 0.35 * Math.sin(p.twinklePhase);
        }

        const distToMouse = Math.hypot(p.currentX - mx, p.currentY - my);
        const isNear = distToMouse < closestDist;
        if (isNear && (!closestParticle || distToMouse < Math.hypot(closestParticle.currentX - mx, closestParticle.currentY - my))) {
          closestParticle = p;
        }

        const isHighlightedLang = highlightLanguage && p.language.toLowerCase() === highlightLanguage.toLowerCase();

        let waveBoost = 0;
        if (activePhase === 'phase3') {
          const distToWave = Math.abs(p.currentX - waveX);
          if (distToWave < waveWidth) {
            waveBoost = (1 - distToWave / waveWidth) * 0.65;
          }
        }

        // Draw Trails
        if (p.trail.length > 0) {
          ctx.save();
          p.trail.forEach((tPoint) => {
            tPoint.alpha *= 0.88;
            ctx.fillStyle = p.glowColor;
            ctx.globalAlpha = Math.max(0, tPoint.alpha * 0.5);
            ctx.beginPath();
            ctx.arc(tPoint.x, tPoint.y, 2, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.restore();
        }

        // Draw Text
        ctx.save();
        ctx.translate(p.currentX, p.currentY);
        ctx.rotate(p.currentAngle);

        const scaleFactor = shapeBox.width / 800;
        const fontSize = Math.max(10, p.baseFontSize * p.currentScale * scaleFactor);
        ctx.font = `500 ${Math.round(fontSize)}px "Plus Jakarta Sans", system-ui, sans-serif`;

        let finalOpacity = Math.max(0.18, Math.min(1.0, p.currentOpacity + waveBoost));
        let shadowBlurVal = 4;
        let shadowColorVal = p.glowColor;

        if (isNear) {
          finalOpacity = 1.0;
          shadowBlurVal = 18;
          shadowColorVal = '#ffffff';
          ctx.font = `600 ${Math.round(fontSize * 1.15)}px "Plus Jakarta Sans", system-ui, sans-serif`;
        } else if (isHighlightedLang) {
          finalOpacity = 1.0;
          shadowBlurVal = 22;
          shadowColorVal = '#ffdf70';
          ctx.font = `700 ${Math.round(fontSize * 1.2)}px "Plus Jakarta Sans", system-ui, sans-serif`;
        } else if (waveBoost > 0) {
          shadowBlurVal = 10 + waveBoost * 12;
        }

        ctx.globalAlpha = finalOpacity;
        ctx.shadowColor = shadowColorVal;
        ctx.shadowBlur = shadowBlurVal;
        ctx.fillStyle = isNear || isHighlightedLang ? '#ffffff' : p.color;

        ctx.fillText(p.text, 0, 0);

        if ((isHighlightedLang || waveBoost > 0.45) && Math.random() < 0.15) {
          drawStarSparkle(ctx, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, 3, '#ffffff', 0.8);
        }

        ctx.restore();
      }

      hoveredParticleRef.current = closestParticle;

      // 6. Sparkles
      const sparkles = sparklesRef.current;
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.age += 1;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.96;
        sp.vy *= 0.96;
        const progress = sp.age / sp.maxLife;
        sp.alpha = Math.max(0, 1 - progress);

        if (progress >= 1) {
          sparkles.splice(i, 1);
          continue;
        }

        if (sp.type === 'star') {
          drawStarSparkle(ctx, sp.x, sp.y, sp.size, sp.color, sp.alpha);
        } else {
          ctx.save();
          ctx.globalAlpha = sp.alpha;
          ctx.fillStyle = sp.color;
          ctx.shadowColor = sp.color;
          ctx.shadowBlur = sp.size * 2;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Floating Hearts
      const hearts = heartsRef.current;
      for (let i = hearts.length - 1; i >= 0; i--) {
        const hrt = hearts[i];
        hrt.age += 1;
        hrt.wobblePhase += hrt.wobbleSpeed * delta;
        hrt.x += hrt.vx + Math.sin(hrt.wobblePhase) * 0.4;
        hrt.y += hrt.vy;
        hrt.rotation += hrt.rotSpeed;
        const progress = hrt.age / hrt.maxLife;
        hrt.alpha = Math.max(0, 1 - progress);

        if (progress >= 1) {
          hearts.splice(i, 1);
          continue;
        }

        drawHeart(
          ctx,
          hrt.x,
          hrt.y,
          hrt.size * hrt.scale,
          hrt.color,
          hrt.alpha,
          hrt.rotation
        );
      }

      // Floating Text Bursts
      const textBursts = textBurstsRef.current;
      for (let i = textBursts.length - 1; i >= 0; i--) {
        const tb = textBursts[i];
        tb.age += 1;
        tb.x += tb.vx;
        tb.y += tb.vy;
        const progress = tb.age / tb.maxLife;
        tb.alpha = Math.max(0, 1 - progress);

        if (progress >= 1) {
          textBursts.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = tb.alpha;
        ctx.font = `600 13px "Plus Jakarta Sans", system-ui, sans-serif`;
        ctx.fillStyle = tb.color;
        ctx.shadowColor = tb.color;
        ctx.shadowBlur = 8;
        ctx.fillText(tb.text, tb.x, tb.y);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [speedMultiplier, reducedMotion, onPhaseChange, highlightLanguage, activeShape, PHASE1_DURATION, PHASE2_END]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };

    if (Math.random() < 0.28) {
      sparklesRef.current.push(...spawnSparkles(x, y, 2));
    }
  };

  const handlePointerLeave = () => {
    mousePosRef.current = { x: -1000, y: -1000 };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isPointerDownRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedParticle = hoveredParticleRef.current;

    heartsRef.current.push(...spawnHearts(x, y, 10));
    sparklesRef.current.push(...spawnSparkles(x, y, 12));

    if (clickedParticle) {
      textBurstsRef.current.push(
        ...spawnTextBurst(x, y, [
          { text: clickedParticle.text, lang: clickedParticle.language },
          { text: '♡', lang: 'Universal' },
          { text: clickedParticle.translation, lang: 'Meaning' },
        ])
      );
      setSelectedParticle(clickedParticle);
      if (onSelectWord) {
        onSelectWord(clickedParticle);
      }
    } else {
      textBurstsRef.current.push(
        ...spawnTextBurst(x, y, [
          { text: 'Aku cinta kamu Grace Laura', lang: 'Indonesian' },
          { text: 'I love you Grace Laura', lang: 'English' },
          { text: 'Te amo Grace Laura', lang: 'Spanish' },
          { text: 'Je t\'aime Grace Laura', lang: 'French' },
          { text: '愛してる Grace Laura', lang: 'Japanese' },
        ])
      );
    }

    soundFx.playHeartPop();
  };

  const handlePopExplode = () => {
    if (selectedParticle) {
      heartsRef.current.push(...spawnHearts(selectedParticle.currentX, selectedParticle.currentY, 14));
      sparklesRef.current.push(...spawnSparkles(selectedParticle.currentX, selectedParticle.currentY, 16));
      soundFx.playHeartPop();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-[#07020a]">
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        className="block w-full h-full cursor-crosshair touch-none"
      />

      {selectedParticle && (
        <PhraseDetailPopover
          particle={selectedParticle}
          onClose={() => setSelectedParticle(null)}
          onExplode={handlePopExplode}
        />
      )}

      <input
        type="hidden"
        data-testid="restart-anim"
        onClick={() => restartAnimation()}
      />
      <input
        type="hidden"
        data-testid="set-phase-p1"
        onClick={() => setPhaseDirectly('phase1')}
      />
      <input
        type="hidden"
        data-testid="set-phase-p2"
        onClick={() => setPhaseDirectly('phase2')}
      />
      <input
        type="hidden"
        data-testid="set-phase-p3"
        onClick={() => setPhaseDirectly('phase3')}
      />
    </div>
  );
};

