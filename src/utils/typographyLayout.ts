import { LOVE_PHRASES_SEEDS, ROMANTIC_COLORS, PhraseSeed } from '../data/languages';

export type FormationShape = 'heart' | 'love';

export interface WordParticle {
  id: string;
  text: string;
  language: string;
  translation: string;
  letter: string; // '♡' or letter tag
  
  // Phase 1: Scattered star position (normalized 0..1)
  scatterX: number;
  scatterY: number;
  scatterAngle: number;
  scatterScale: number;
  scatterOpacity: number;
  driftVx: number;
  driftVy: number;
  driftAngularV: number;
  
  // Phase 2/3: Target position inside shape (normalized inside bounds 0..1)
  targetNormX: number;
  targetNormY: number;
  targetAngle: number; // in radians (0 for strictly horizontal neat paragraph)
  targetScale: number;
  
  // Alternative targets for switching between Heart and LOVE
  heartTargetNormX: number;
  heartTargetNormY: number;
  heartTargetAngle: number;
  heartTargetScale: number;

  loveTargetNormX: number;
  loveTargetNormY: number;
  loveTargetAngle: number;
  loveTargetScale: number;

  // Dynamic animated state in pixels
  currentX: number;
  currentY: number;
  currentAngle: number;
  currentScale: number;
  currentOpacity: number;
  
  // Trail history for magical glowing particle trails
  trail: Array<{ x: number; y: number; alpha: number }>;
  
  // Stagger & aesthetics
  gatherDelay: number;
  gatherDuration: number;
  curveOffset: number;
  color: string;
  glowColor: string;
  baseFontSize: number;
  twinklePhase: number;
  twinkleSpeed: number;
  isSparkling: boolean;
  sparkleTimer: number;
  isHovered: boolean;
}

interface SlotDef {
  letter: string;
  relX: number;
  relY: number;
  angle: number;
  sizeRank: number;
}

/**
 * Generates an impeccably structured, neat paragraph-calligram Heart shape.
 * Every phrase is strictly horizontal (angle = 0, no miring/slanted text),
 * arranged row by row into a crisp, unmistakable symmetrical Heart!
 */
export function generateHeartSlots(): SlotDef[] {
  const slots: SlotDef[] = [];

  // 15 symmetrical horizontal paragraph rows forming a perfect Heart silhouette
  const rows: Array<{ y: number; xCoords: number[]; rank?: number }> = [
    // Top crest of the two lobes
    { y: 0.08, xCoords: [0.30, 0.70], rank: 2 },
    // Upper curve of both lobes
    { y: 0.14, xCoords: [0.22, 0.36, 0.64, 0.78], rank: 2 },
    // Expanding lobes
    { y: 0.20, xCoords: [0.16, 0.28, 0.40, 0.60, 0.72, 0.84], rank: 2 },
    // Merging lobes above center dip
    { y: 0.26, xCoords: [0.13, 0.27, 0.41, 0.59, 0.73, 0.87], rank: 2 },
    // Widest upper body of the heart
    { y: 0.32, xCoords: [0.11, 0.25, 0.39, 0.50, 0.61, 0.75, 0.89], rank: 1 },
    // Full heart width
    { y: 0.38, xCoords: [0.10, 0.24, 0.38, 0.50, 0.62, 0.76, 0.90], rank: 1 },
    // Middle fullness
    { y: 0.44, xCoords: [0.12, 0.26, 0.41, 0.59, 0.74, 0.88], rank: 1 },
    // Tapering starts
    { y: 0.50, xCoords: [0.15, 0.31, 0.50, 0.69, 0.85], rank: 2 },
    // Tapering row 2
    { y: 0.56, xCoords: [0.19, 0.34, 0.50, 0.66, 0.81], rank: 2 },
    // Tapering row 3
    { y: 0.62, xCoords: [0.24, 0.40, 0.60, 0.76], rank: 2 },
    // Tapering row 4
    { y: 0.68, xCoords: [0.29, 0.43, 0.57, 0.71], rank: 2 },
    // Narrowing lower triangle
    { y: 0.74, xCoords: [0.35, 0.50, 0.65], rank: 2 },
    // Approaching tip
    { y: 0.80, xCoords: [0.40, 0.50, 0.60], rank: 1 },
    // Just above apex
    { y: 0.85, xCoords: [0.45, 0.55], rank: 2 },
    // Heart bottom apex tip (Centerpiece)
    { y: 0.90, xCoords: [0.50], rank: 1 }
  ];

  rows.forEach((row) => {
    row.xCoords.forEach((x) => {
      slots.push({
        letter: '♡',
        relX: x,
        relY: row.y,
        angle: 0, // STRICTLY 0: perfectly horizontal, zero tilt, neat paragraph!
        sizeRank: row.rank || 2
      });
    });
  });

  return slots;
}

/**
 * Letter slots for alternative 'L-O-V-E' mode (also strictly horizontal!)
 */
export function generateLetterSlots(): SlotDef[] {
  const slots: SlotDef[] = [];

  // L: Stem (y: 0.10 to 0.88, x: 0.08), Base (x: 0.12 to 0.24, y: 0.88)
  for (let y = 0.12; y <= 0.88; y += 0.08) {
    slots.push({ letter: 'L', relX: 0.07, relY: y, angle: 0, sizeRank: 2 });
    slots.push({ letter: 'L', relX: 0.13, relY: y, angle: 0, sizeRank: 2 });
  }
  for (let x = 0.18; x <= 0.26; x += 0.05) {
    slots.push({ letter: 'L', relX: x, relY: 0.88, angle: 0, sizeRank: 2 });
  }

  // O: Circle rows (y: 0.12 to 0.88, centered around x: 0.38)
  const oRows = [
    { y: 0.14, xs: [0.34, 0.42] },
    { y: 0.24, xs: [0.30, 0.46] },
    { y: 0.36, xs: [0.28, 0.48] },
    { y: 0.50, xs: [0.27, 0.49] },
    { y: 0.64, xs: [0.28, 0.48] },
    { y: 0.76, xs: [0.30, 0.46] },
    { y: 0.86, xs: [0.34, 0.42] },
  ];
  oRows.forEach(r => {
    r.xs.forEach(x => {
      slots.push({ letter: 'O', relX: x, relY: r.y, angle: 0, sizeRank: 2 });
    });
  });

  // V: Descending arms down to apex at (0.63, 0.88)
  for (let i = 0; i < 8; i++) {
    const t = i / 7;
    const leftX = 0.52 + t * (0.63 - 0.52);
    const rightX = 0.74 - t * (0.74 - 0.63);
    const y = 0.14 + t * (0.88 - 0.14);
    slots.push({ letter: 'V', relX: leftX, relY: y, angle: 0, sizeRank: 2 });
    if (i < 7) {
      slots.push({ letter: 'V', relX: rightX, relY: y, angle: 0, sizeRank: 2 });
    }
  }

  // E: Backbone at x: 0.80, and 3 horizontal bars
  for (let y = 0.14; y <= 0.88; y += 0.08) {
    slots.push({ letter: 'E', relX: 0.79, relY: y, angle: 0, sizeRank: 2 });
  }
  // Top bar
  slots.push({ letter: 'E', relX: 0.86, relY: 0.14, angle: 0, sizeRank: 2 });
  slots.push({ letter: 'E', relX: 0.93, relY: 0.14, angle: 0, sizeRank: 2 });
  // Middle bar
  slots.push({ letter: 'E', relX: 0.85, relY: 0.50, angle: 0, sizeRank: 2 });
  slots.push({ letter: 'E', relX: 0.91, relY: 0.50, angle: 0, sizeRank: 2 });
  // Bottom bar
  slots.push({ letter: 'E', relX: 0.86, relY: 0.88, angle: 0, sizeRank: 2 });
  slots.push({ letter: 'E', relX: 0.93, relY: 0.88, angle: 0, sizeRank: 2 });

  return slots;
}

/**
 * Initializes WordParticle objects with both scattered positions (Phase 1)
 * and target shape positions (Phase 2 & 3). Defaults to Heart Love!
 */
export function initializeParticles(
  width: number,
  height: number,
  activeShape: FormationShape = 'heart'
): WordParticle[] {
  const heartSlots = generateHeartSlots();
  const loveSlots = generateLetterSlots();
  const count = Math.max(heartSlots.length, loveSlots.length);

  const particles: WordParticle[] = [];

  // Prioritize primary romantic declarations at key positions
  const shuffledSeeds = [...LOVE_PHRASES_SEEDS];
  // Put Indonesian & most heartfelt phrases first
  shuffledSeeds.sort((a, b) => {
    if (a.lang === 'Indonesian') return -1;
    if (b.lang === 'Indonesian') return 1;
    return 0;
  });

  for (let index = 0; index < count; index++) {
    const seed: PhraseSeed = shuffledSeeds[index % shuffledSeeds.length];
    const hSlot = heartSlots[index % heartSlots.length];
    const lSlot = loveSlots[index % loveSlots.length];

    const chosenSlot = activeShape === 'heart' ? hSlot : lSlot;
    const color = seed.colorHint || ROMANTIC_COLORS[index % ROMANTIC_COLORS.length];

    const margin = 0.08;
    const randNormX = margin + Math.random() * (1 - 2 * margin);
    const randNormY = margin + Math.random() * (1 - 2 * margin);

    // Phase 1 drift
    const scatterAngle = (Math.random() - 0.5) * 0.15; // gentle starry tilt during drift
    const scatterScale = 0.85 + Math.random() * 0.35;
    const scatterOpacity = 0.4 + Math.random() * 0.6;

    const driftSpeed = 0.12 + Math.random() * 0.28;
    const driftAngle = Math.random() * Math.PI * 2;
    const driftVx = Math.cos(driftAngle) * driftSpeed;
    const driftVy = Math.sin(driftAngle) * driftSpeed;
    const driftAngularV = (Math.random() - 0.5) * 0.001;

    // Clear, readable font sizing for neat paragraph lines
    const targetScale = chosenSlot.sizeRank === 1 ? 1.05 : 0.92;
    const baseFontSize = chosenSlot.sizeRank === 1 ? 14.5 : 13.0;

    const curveOffset = (Math.random() - 0.5) * 120;
    const gatherDelay = Math.random() * 0.65;
    const gatherDuration = 0.55 + Math.random() * 0.45;

    particles.push({
      id: `word-${index}-${seed.lang}-${seed.text}`,
      text: seed.text,
      language: seed.lang,
      translation: seed.trans,
      letter: chosenSlot.letter,

      scatterX: randNormX * width,
      scatterY: randNormY * height,
      scatterAngle,
      scatterScale,
      scatterOpacity,
      driftVx,
      driftVy,
      driftAngularV,

      targetNormX: chosenSlot.relX,
      targetNormY: chosenSlot.relY,
      targetAngle: 0, // STRICTLY 0! No slanting!
      targetScale,

      heartTargetNormX: hSlot.relX,
      heartTargetNormY: hSlot.relY,
      heartTargetAngle: 0, // STRICTLY 0!
      heartTargetScale: hSlot.sizeRank === 1 ? 1.05 : 0.92,

      loveTargetNormX: lSlot.relX,
      loveTargetNormY: lSlot.relY,
      loveTargetAngle: 0, // STRICTLY 0!
      loveTargetScale: lSlot.sizeRank === 1 ? 1.05 : 0.92,

      currentX: randNormX * width,
      currentY: randNormY * height,
      currentAngle: scatterAngle,
      currentScale: scatterScale,
      currentOpacity: scatterOpacity,

      trail: [],

      gatherDelay,
      gatherDuration,
      curveOffset,
      color,
      glowColor: color,
      baseFontSize,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.8 + Math.random() * 1.5,
      isSparkling: false,
      sparkleTimer: 0,
      isHovered: false
    });
  }

  return particles;
}

/**
 * Calculates responsive bounding box for Heart Love or LOVE typography
 */
export function getShapeBoundingBox(
  width: number,
  height: number,
  shape: FormationShape = 'heart'
): { x: number; y: number; width: number; height: number } {
  const isMobile = width < 768;

  if (shape === 'heart') {
    // Symmetrical Heart box aspect ratio: 1.15 : 1
    const aspect = 1.18;
    let boxH = height * (isMobile ? 0.72 : 0.74);
    let boxW = boxH * aspect;

    if (boxW > width * (isMobile ? 0.96 : 0.84)) {
      boxW = width * (isMobile ? 0.96 : 0.84);
      boxH = boxW / aspect;
    }

    const boxX = (width - boxW) / 2;
    const boxY = (height - boxH) / 2 - (isMobile ? 12 : 18);
    return { x: boxX, y: boxY, width: boxW, height: boxH };
  } else {
    const targetAspect = 2.4;
    let boxW = width * (isMobile ? 0.94 : 0.82);
    let boxH = boxW / targetAspect;

    const maxH = height * (isMobile ? 0.55 : 0.65);
    if (boxH > maxH) {
      boxH = maxH;
      boxW = boxH * targetAspect;
    }

    const boxX = (width - boxW) / 2;
    const boxY = (height - boxH) / 2 - (isMobile ? 10 : 15);
    return { x: boxX, y: boxY, width: boxW, height: boxH };
  }
}
