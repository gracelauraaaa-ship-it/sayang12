/**
 * Web Audio API ambient chime and romantic harp synthesizer
 * Provides ethereal crystalline tones for sparkles, phrase gatherings, and heart bursts.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private pentatonicScale = [277.18, 311.13, 369.99, 415.30, 466.16, 554.37, 622.25, 739.99, 830.61, 932.33]; // C# / Db celestial pentatonic

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted() {
    return this.isMuted;
  }

  /**
   * Plays a delicate crystalline chime
   */
  public playChime(freqIndex?: number, volumeMultiplier: number = 1.0) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const idx = freqIndex !== undefined 
        ? Math.abs(freqIndex) % this.pentatonicScale.length 
        : Math.floor(Math.random() * this.pentatonicScale.length);
      const baseFreq = this.pentatonicScale[idx];

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      // Subtle pitch bend upwards like stardust
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.015, now + 0.3);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04 * volumeMultiplier, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.25);
    } catch {
      // Audio context silently ignored if unavailable
    }
  }

  /**
   * Plays an ethereal gathering chord transition
   */
  public playGatherChord() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const chord = [277.18, 369.99, 466.16, 554.37];
      chord.forEach((freq, i) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + i * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.025, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.6);
      });
    } catch {
      // Ignored
    }
  }

  /**
   * Warm romantic resonance chord on completed LOVE formation
   */
  public playRevealResonance() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const chord = [138.59, 277.18, 369.99, 415.30, 554.37, 739.99];
      chord.forEach((freq, i) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + i * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.045 / (1 + i * 0.3), now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 3.6);
      });
    } catch {
      // Ignored
    }
  }

  /**
   * Gentle pop sound when a heart or phrase is clicked
   */
  public playHeartPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freq = this.pentatonicScale[Math.floor(Math.random() * 5) + 3];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.15);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Ignored
    }
  }
}

export const soundFx = new AudioEngine();
