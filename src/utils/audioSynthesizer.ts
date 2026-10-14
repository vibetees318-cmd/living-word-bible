/**
 * Generative Ambient Worship Audio Synthesizer
 * Uses Web Audio API to create serene, reverent choral/organ chord progressions.
 * 100% self-contained and browser-native without relying on external media files.
 */

class AmbientWorshipSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private volume = 0.25;

  private chordProgressions = [
    // Serene pastoral chords: Cmaj9, Am9, Fmaj7, Gsus4
    [130.81, 164.81, 196.00, 246.94, 293.66], // C3, E3, G3, B3, D4
    [110.00, 164.81, 196.00, 220.00, 261.63], // A2, E3, G3, A3, C4
    [87.31, 130.81, 174.61, 220.00, 261.63],  // F2, C3, F3, A3, C4
    [98.00, 146.83, 196.00, 220.00, 293.66],  // G2, D3, G3, A3, D4
  ];
  private currentChordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.1);
    }
  }

  public play() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.scheduleNextChord();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private scheduleNextChord() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const chord = this.chordProgressions[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgressions.length;

    const chordDuration = 7.5; // seconds per chord
    const now = this.ctx.currentTime;

    // Restore master volume smoothly
    this.masterGain.gain.setTargetAtTime(this.volume, now, 0.5);

    // Create gentle warm oscillators for this chord
    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft warm harmonic
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for soft ethereal warmth (removes harsh buzzing)
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + idx * 80, now);
      filter.Q.setValueAtTime(1.2, now);

      // Gentle attack and slow decay envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), now + 2.5);
      gain.gain.setValueAtTime(0.08 / (idx + 1), now + chordDuration - 1.5);
      gain.gain.linearRampToValueAtTime(0, now + chordDuration + 1.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + chordDuration + 1.2);
    });

    this.timerId = window.setTimeout(() => {
      this.scheduleNextChord();
    }, (chordDuration - 1.2) * 1000);
  }
}

export const ambientSynth = new AmbientWorshipSynth();
