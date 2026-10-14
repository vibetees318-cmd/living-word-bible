/**
 * Web Speech API Controller with Multilingual TTS & Dynamic Voice Routing
 * Strictly enforces regional BCP-47 language codes and native voice matching
 */

import { LanguageCode } from '../data/bibleData';

export type { LanguageCode };

/**
 * 1. Explicit BCP 47 Language Code Mapping for Web Speech API (window.speechSynthesis)
 */
export const LANGUAGE_TTS_CODES: Record<LanguageCode, string> = {
  Hindi: 'hi-IN',
  Assamese: 'as-IN',
  Bengali: 'bn-IN',
  Tamil: 'ta-IN',
  Telugu: 'te-IN',
  Urdu: 'ur-PK',
  Gujarati: 'gu-IN',
  Marathi: 'mr-IN',
  Kannada: 'kn-IN',
  Malayalam: 'ml-IN',
  English: 'en-US',
  Spanish: 'es-ES',
  Nepali: 'ne-NP',
  Odia: 'or-IN',
  Punjabi: 'pa-IN'
};

/**
 * Script verification helper to prevent sending untranslated English text to regional voices
 */
export function isNativeScript(text: string, language: LanguageCode): boolean {
  if (!text || !text.trim()) return true;
  if (language === 'English') return true;

  switch (language) {
    case 'Hindi':
    case 'Marathi':
    case 'Nepali':
      // Devanagari script: U+0900 to U+097F
      return /[\u0900-\u097F]/.test(text);
    case 'Assamese':
    case 'Bengali':
      // Bengali/Assamese script: U+0980 to U+09FF
      return /[\u0980-\u09FF]/.test(text);
    case 'Tamil':
      // Tamil script: U+0B80 to U+0BFF
      return /[\u0B80-\u0BFF]/.test(text);
    case 'Telugu':
      // Telugu script: U+0C00 to U+0C7F
      return /[\u0C00-\u0C7F]/.test(text);
    case 'Kannada':
      // Kannada script: U+0C80 to U+0CFF
      return /[\u0C80-\u0CFF]/.test(text);
    case 'Malayalam':
      // Malayalam script: U+0D00 to U+0D7F
      return /[\u0D00-\u0D7F]/.test(text);
    case 'Gujarati':
      // Gujarati script: U+0A80 to U+0AFF
      return /[\u0A80-\u0AFF]/.test(text);
    case 'Punjabi':
      // Gurmukhi script: U+0A00 to U+0A7F
      return /[\u0A00-\u0A7F]/.test(text);
    case 'Odia':
      // Odia script: U+0B00 to U+0B7F
      return /[\u0B00-\u0B7F]/.test(text);
    case 'Urdu':
      // Arabic/Persian/Urdu script: U+0600 to U+06FF
      return /[\u0600-\u06FF]/.test(text);
    case 'Spanish':
      return true;
    default:
      return true;
  }
}

export interface SpeechEngineCallbacks {
  onStartVerse?: (verseIndex: number, text: string) => void;
  onEndVerse?: (verseIndex: number) => void;
  onFinishChapter?: () => void;
  onStateChange?: (isPlaying: boolean, isPaused: boolean) => void;
}

export class BibleSpeechController {
  private isSpeaking = false;
  private isPaused = false;
  private currentVerseIndex = 0;
  private versesToSpeak: { index: number; text: string }[] = [];
  private rate = 0.95; // calm, reverent pacing
  private pitch = 0.95; // gentle, warm pastoral tone
  private language: LanguageCode = 'English';
  private callbacks: SpeechEngineCallbacks = {};
  private availableVoices: SpeechSynthesisVoice[] = [];

  constructor(callbacks?: SpeechEngineCallbacks) {
    if (callbacks) this.callbacks = callbacks;
    this.initVoices();
  }

  private initVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const loadVoices = () => {
      this.availableVoices = window.speechSynthesis.getVoices();
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  public setCallbacks(callbacks: SpeechEngineCallbacks) {
    this.callbacks = callbacks;
  }

  public setLanguage(lang: LanguageCode) {
    const prevLang = this.language;
    this.language = lang;
    if (prevLang !== lang && this.isSpeaking) {
      // If language changed while actively reciting, stop immediately to switch voices
      this.stop();
    }
  }

  public getLanguage(): LanguageCode {
    return this.language;
  }

  public getTargetLanguageCode(): string {
    return LANGUAGE_TTS_CODES[this.language] || 'en-US';
  }

  public setRate(newRate: number) {
    this.rate = Math.max(0.6, Math.min(1.5, newRate));
    if (this.isSpeaking && !this.isPaused) {
      const current = this.versesToSpeak[this.currentVerseIndex];
      if (current) {
        window.speechSynthesis.cancel();
        this.speakCurrentVerse();
      }
    }
  }

  public getRate(): number {
    return this.rate;
  }

  public setPitch(newPitch: number) {
    this.pitch = Math.max(0.6, Math.min(1.4, newPitch));
  }

  public getPitch(): number {
    return this.pitch;
  }

  /**
   * 2. Voice Selection Logic:
   * Filter window.speechSynthesis.getVoices() to find matching voice objects that include
   * the selected language code. If an exact regional voice is found, assign utterance.voice = matchingVoice.
   */
  public getVoiceForLanguage(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;

    let voices = this.availableVoices;
    if (!voices || voices.length === 0) {
      voices = window.speechSynthesis.getVoices();
      this.availableVoices = voices;
    }
    if (!voices || voices.length === 0) return null;

    const targetCode = this.getTargetLanguageCode();
    const targetPrefix = targetCode.split('-')[0].toLowerCase();
    const langLower = this.language.toLowerCase();

    // Strategy 1: Exact match on normalized BCP 47 code (e.g. 'hi-in' or 'hi_in')
    const exactVoice = voices.find(v => {
      const vLang = v.lang.replace('_', '-').toLowerCase();
      return vLang === targetCode.toLowerCase();
    });
    if (exactVoice) return exactVoice;

    // Strategy 2: Prefix match on primary language code (e.g. 'hi-', 'as-', 'bn-', 'ta-', 'te-', 'ur-', 'gu-', 'mr-', 'kn-', 'ml-')
    const prefixVoice = voices.find(v => {
      const vLang = v.lang.replace('_', '-').toLowerCase();
      return vLang.startsWith(targetPrefix + '-') || vLang === targetPrefix;
    });
    if (prefixVoice) return prefixVoice;

    // Strategy 3: Name match on voice name (e.g. "Google हिन्दी", "Microsoft Mohan - Telugu", etc.)
    const nameVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      return name.includes(langLower) || name.includes(targetPrefix);
    });
    if (nameVoice) return nameVoice;

    // Strategy 4: Regional Indic fallback when specific voice is not installed in the browser/OS:
    // e.g. Assamese ('as-IN') shares phonetic rules with Bengali ('bn-IN') and Hindi ('hi-IN')
    if (this.language === 'Assamese') {
      const bengaliVoice = voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith('bn'));
      if (bengaliVoice) return bengaliVoice;
      const indicVoice = voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith('hi'));
      if (indicVoice) return indicVoice;
    }

    if (this.language === 'Nepali' || this.language === 'Marathi') {
      const devanagariVoice = voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith('hi'));
      if (devanagariVoice) return devanagariVoice;
    }

    if (this.language === 'Urdu') {
      const urduVoice = voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith('ur'));
      if (urduVoice) return urduVoice;
      const hindiVoice = voices.find(v => v.lang.replace('_', '-').toLowerCase().startsWith('hi'));
      if (hindiVoice) return hindiVoice;
    }

    return null;
  }

  public speakChapter(verses: { verseNumber: number; text: string }[], startIndex = 0) {
    this.stop();
    if (!verses || verses.length === 0) return;

    this.versesToSpeak = verses.map((v, idx) => ({ index: idx, text: v.text }));
    this.currentVerseIndex = Math.max(0, Math.min(startIndex, this.versesToSpeak.length - 1));
    this.isSpeaking = true;
    this.isPaused = false;
    this.notifyState();

    this.speakCurrentVerse();
  }

  public speakSingleVerse(text: string, verseIndex: number) {
    this.stop();
    this.versesToSpeak = [{ index: verseIndex, text }];
    this.currentVerseIndex = 0;
    this.isSpeaking = true;
    this.isPaused = false;
    this.notifyState();

    this.speakCurrentVerse();
  }

  public speakCustomText(text: string, onDone?: () => void) {
    this.stop();
    this.versesToSpeak = [{ index: 0, text }];
    this.currentVerseIndex = 0;
    this.isSpeaking = true;
    this.isPaused = false;
    this.notifyState();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    // Force explicit language code on utterance
    const langCode = this.getTargetLanguageCode();
    utterance.lang = langCode;

    // Assign matching regional voice if found
    const voice = this.getVoiceForLanguage();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      this.callbacks.onStartVerse?.(0, text);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.notifyState();
      this.callbacks.onEndVerse?.(0);
      onDone?.();
    };

    utterance.onerror = (e) => {
      console.warn('Speech custom text error:', e);
      this.isSpeaking = false;
      this.isPaused = false;
      this.notifyState();
      onDone?.();
    };

    window.speechSynthesis.speak(utterance);
  }

  private speakCurrentVerse() {
    if (this.currentVerseIndex >= this.versesToSpeak.length) {
      this.isSpeaking = false;
      this.isPaused = false;
      this.notifyState();
      this.callbacks.onFinishChapter?.();
      return;
    }

    const current = this.versesToSpeak[this.currentVerseIndex];
    if (!current) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(current.text);
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    // 1. Force explicit language code on utterance based on active language
    const langCode = this.getTargetLanguageCode();
    utterance.lang = langCode;

    // 2. Assign matching regional voice if found
    const voice = this.getVoiceForLanguage();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      this.callbacks.onStartVerse?.(current.index, current.text);
    };

    utterance.onend = () => {
      this.callbacks.onEndVerse?.(current.index);
      if (this.isSpeaking && !this.isPaused) {
        this.currentVerseIndex++;
        // Reverent pause between verses
        window.setTimeout(() => {
          if (this.isSpeaking && !this.isPaused) {
            this.speakCurrentVerse();
          }
        }, 550);
      }
    };

    utterance.onerror = (e) => {
      console.warn('Speech error or cancelled:', e);
      if (!this.isSpeaking) return;
      this.currentVerseIndex++;
      this.speakCurrentVerse();
    };

    window.speechSynthesis.speak(utterance);
  }

  public pause() {
    if (this.isSpeaking && !this.isPaused) {
      window.speechSynthesis.pause();
      this.isPaused = true;
      this.notifyState();
    }
  }

  public resume() {
    if (this.isSpeaking && this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      this.notifyState();
    }
  }

  public replay10s() {
    if (this.versesToSpeak.length === 0) return;
    window.speechSynthesis.cancel();
    if (this.currentVerseIndex > 0) {
      this.currentVerseIndex--;
    }
    this.isSpeaking = true;
    this.isPaused = false;
    this.notifyState();
    this.speakCurrentVerse();
  }

  public stop() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
    this.notifyState();
  }

  private notifyState() {
    this.callbacks.onStateChange?.(this.isSpeaking, this.isPaused);
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }
}
