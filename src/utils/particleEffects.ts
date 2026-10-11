import { ROMANTIC_COLORS } from '../data/languages';

export interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  maxLife: number;
  age: number;
  type: 'star' | 'circle' | 'cross';
}

export interface FloatingHeartParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rotation: number;
  rotSpeed: number;
  wobbleSpeed: number;
  wobblePhase: number;
  maxLife: number;
  age: number;
  scale: number;
}

export interface FloatingTextBurst {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  language: string;
  color: string;
  alpha: number;
  maxLife: number;
  age: number;
  scale: number;
}

export interface BackgroundStar {
  x: number;
  y: number;
  baseRadius: number;
  currentRadius: number;
  alpha: number;
  color: string;
  twinklePhase: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
}

export function createBackgroundStars(count: number, width: number, height: number): BackgroundStar[] {
  const stars: BackgroundStar[] = [];
  const starColors = ['#ffffff', '#ffd166', '#ffb4a2', '#c77dff', '#a2d2ff', '#ffc6ff'];

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      baseRadius: 0.6 + Math.random() * 1.5,
      currentRadius: 1,
      alpha: 0.15 + Math.random() * 0.65,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.5 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.04,
      vy: (Math.random() - 0.5) * 0.04,
    });
  }
  return stars;
}

export function spawnSparkles(x: number, y: number, count: number = 6): SparkleParticle[] {
  const sparkles: SparkleParticle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 2.2;
    sparkles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1.5 + Math.random() * 3.5,
      color: ROMANTIC_COLORS[Math.floor(Math.random() * ROMANTIC_COLORS.length)],
      alpha: 1,
      maxLife: 30 + Math.random() * 40,
      age: 0,
      type: Math.random() > 0.4 ? 'star' : 'circle',
    });
  }
  return sparkles;
}

export function spawnHearts(x: number, y: number, count: number = 8): FloatingHeartParticle[] {
  const hearts: FloatingHeartParticle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6; // bias upward
    const speed = 1.0 + Math.random() * 2.8;
    hearts.push({
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: Math.cos(angle) * speed * 0.8,
      vy: Math.sin(angle) * speed - 0.8, // buoyant upward lift
      size: 10 + Math.random() * 18,
      color: ROMANTIC_COLORS[Math.floor(Math.random() * ROMANTIC_COLORS.length)],
      alpha: 1,
      rotation: (Math.random() - 0.5) * 0.5,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      wobbleSpeed: 2 + Math.random() * 3,
      wobblePhase: Math.random() * Math.PI * 2,
      maxLife: 70 + Math.random() * 60,
      age: 0,
      scale: 0.3 + Math.random() * 0.7,
    });
  }
  return hearts;
}

export function spawnTextBurst(x: number, y: number, phrases: Array<{ text: string; lang: string }>): FloatingTextBurst[] {
  const bursts: FloatingTextBurst[] = [];
  const selected = phrases.slice(0, 3);
  selected.forEach((p, i) => {
    const angle = -Math.PI / 2 + (i - 1) * 0.45 + (Math.random() - 0.5) * 0.2;
    bursts.push({
      x: x + (i - 1) * 30,
      y: y,
      vx: Math.cos(angle) * 1.2,
      vy: Math.sin(angle) * 1.5 - 0.5,
      text: p.text,
      language: p.lang,
      color: ROMANTIC_COLORS[Math.floor(Math.random() * ROMANTIC_COLORS.length)],
      alpha: 1,
      maxLife: 80 + Math.random() * 40,
      age: 0,
      scale: 0.85,
    });
  });
  return bursts;
}

/**
 * Draws a glowing 4-point star sparkle on canvas
 */
export function drawStarSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = size * 2.5;

  ctx.beginPath();
  const spikes = 4;
  const outerRadius = size;
  const innerRadius = size * 0.25;
  let rot = Math.PI / 2 * 3;
  const step = Math.PI / spikes;

  ctx.moveTo(x, y - outerRadius);
  for (let i = 0; i < spikes; i++) {
    let px = x + Math.cos(rot) * outerRadius;
    let py = y + Math.sin(rot) * outerRadius;
    ctx.lineTo(px, py);
    rot += step;

    px = x + Math.cos(rot) * innerRadius;
    py = y + Math.sin(rot) * innerRadius;
    ctx.lineTo(px, py);
    rot += step;
  }
  ctx.lineTo(x, y - outerRadius);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Draws a floating bezier heart on canvas
 */
export function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, rotation: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = size * 0.8;

  const s = size / 30; // normalized scale factor
  ctx.beginPath();
  ctx.moveTo(0, -10 * s);
  ctx.bezierCurveTo(-15 * s, -28 * s, -30 * s, -5 * s, 0, 22 * s);
  ctx.bezierCurveTo(30 * s, -5 * s, 15 * s, -28 * s, 0, -10 * s);
  ctx.closePath();
  ctx.fill();

  // Subtle inner highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.beginPath();
  ctx.arc(-5 * s, -12 * s, 3.5 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
