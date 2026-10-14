import React, { useState } from 'react';
import { Volume2, Sliders, Type, Music, Palette, Check, Sparkles } from 'lucide-react';
import { LanguageCode, SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/bibleData';
import { ambientSynth } from '../utils/audioSynthesizer';

interface AudioSettingsViewProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  speed: number;
  setSpeed: (s: number) => void;
  pitch?: number;
  setPitch?: (p: number) => void;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  setFontSize: (fs: 'small' | 'medium' | 'large' | 'xlarge') => void;
  fontFamily: 'cormorant' | 'lora';
  setFontFamily: (ff: 'cormorant' | 'lora') => void;
  theme: 'parchment' | 'alabaster' | 'night';
  setTheme: (th: 'parchment' | 'alabaster' | 'night') => void;
}

export const AudioSettingsView: React.FC<AudioSettingsViewProps> = ({
  language,
  setLanguage,
  speed,
  setSpeed,
  pitch = 0.95,
  setPitch,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  theme,
  setTheme
}) => {
  const [ambientVolume, setAmbientVolume] = useState(0.25);
  const [isAmbientOn, setIsAmbientOn] = useState(ambientSynth.getIsPlaying());

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.English;

  const handleToggleAmbient = () => {
    const active = ambientSynth.toggle();
    setIsAmbientOn(active);
  };

  const handleVolumeChange = (val: number) => {
    setAmbientVolume(val);
    ambientSynth.setVolume(val);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-12">
      {/* Title Header */}
      <div className="bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-[#FAF3DC] text-[#9A7B20] border border-[#D4AF37]/50">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C1917]">
              {t.audioSettings}
            </h1>
            <p className="font-sans-ui text-xs sm:text-sm text-[#7D705C] mt-0.5">
              Personalize speech pacing, 15+ world languages, vocal pitch, ambient chords, and scripture typography
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Speech & Language Configuration */}
        <div className="bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-[#EAE3D2] pb-3">
            <Volume2 className="w-4 h-4 text-[#C5A028]" />
            <h2 className="font-cinzel text-base font-bold text-[#1C1917]">
              Voice & Language (15 Languages)
            </h2>
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <label className="text-xs font-sans-ui uppercase tracking-wider text-[#8A795D] font-bold">
              Select Translation & Narration Language
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`p-2 text-xs font-semibold rounded-lg border text-left transition-colors flex items-center justify-between cursor-pointer ${
                    language === lang.code
                      ? 'bg-[#EBDDB6] text-[#1C1917] border-[#D4AF37]'
                      : 'bg-[#F5EFE6] text-[#574D3F] border-[#DDD4C1] hover:bg-[#EAE3D2]'
                  }`}
                >
                  <span className="truncate">{lang.nativeName}</span>
                  {language === lang.code && <Check className="w-3.5 h-3.5 text-[#8C6D1F] shrink-0 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          {/* Speech Rate Controls */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-sans-ui">
              <span className="uppercase tracking-wider text-[#8A795D] font-bold">
                {t.speechSpeed}
              </span>
              <span className="font-semibold text-[#1C1917]">{speed}x (Reverent Pace)</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0.8, 1.0, 1.2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                    speed === s
                      ? 'bg-[#D4AF37] text-[#1C1917] border-[#B38C1B] shadow-2xs'
                      : 'bg-[#F5EFE6] text-[#574D3F] border-[#DDD4C1] hover:bg-[#EAE3D2]'
                  }`}
                >
                  {s === 0.8 ? '0.8x (Meditative)' : s === 1.0 ? '1.0x (Standard)' : '1.2x (Fluent)'}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Pitch Controls */}
          {setPitch && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-sans-ui">
                <span className="uppercase tracking-wider text-[#8A795D] font-bold">
                  Voice Tone & Pitch
                </span>
                <span className="font-semibold text-[#1C1917]">
                  {pitch <= 0.88 ? 'Deep Pastoral' : pitch <= 1.0 ? 'Warm Reverent' : 'Bright Melodic'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[0.85, 0.95, 1.1].map((p, idx) => (
                  <button
                    key={p}
                    onClick={() => setPitch(p)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                      Math.abs(pitch - p) < 0.06
                        ? 'bg-[#D4AF37] text-[#1C1917] border-[#B38C1B] shadow-2xs'
                        : 'bg-[#F5EFE6] text-[#574D3F] border-[#DDD4C1] hover:bg-[#EAE3D2]'
                    }`}
                  >
                    {idx === 0 ? 'Deep' : idx === 1 ? 'Warm' : 'Bright'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Card 2: Ambient Worship Background Harmonics */}
        <div className="bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-[#EAE3D2] pb-3">
            <Music className="w-4 h-4 text-[#C5A028]" />
            <h2 className="font-cinzel text-base font-bold text-[#1C1917]">
              {t.ambientMusic}
            </h2>
          </div>

          <p className="font-lora text-xs sm:text-sm text-[#7D705C] leading-relaxed">
            Generative, ethereal synthesizer playing peaceful choral chords (C major 9, A minor 9) to foster reverent reflection during recitation.
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-sans-ui font-semibold text-[#1C1917]">
              Worship Harmonics Sound
            </span>
            <button
              onClick={handleToggleAmbient}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isAmbientOn
                  ? 'bg-[#D4AF37] text-[#1C1917] shadow-xs'
                  : 'bg-[#EAE3D2] text-[#6B5E4D] hover:bg-[#DDD4C1]'
              }`}
            >
              {isAmbientOn ? 'Active (ON)' : 'Muted (OFF)'}
            </button>
          </div>

          {/* Volume slider */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs text-[#8A795D] font-sans-ui">
              <span>Chords Volume</span>
              <span>{Math.round(ambientVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={ambientVolume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
          </div>
        </div>

        {/* Card 3: Scripture Typography & Scaling */}
        <div className="bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-[#EAE3D2] pb-3">
            <Type className="w-4 h-4 text-[#C5A028]" />
            <h2 className="font-cinzel text-base font-bold text-[#1C1917]">
              {t.fontSize}
            </h2>
          </div>

          {/* Font size picker */}
          <div className="space-y-2">
            <label className="text-xs font-sans-ui uppercase tracking-wider text-[#8A795D] font-bold">
              Verse Text Scale
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['small', 'medium', 'large', 'xlarge'] as const).map((fs) => (
                <button
                  key={fs}
                  onClick={() => setFontSize(fs)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                    fontSize === fs
                      ? 'bg-[#EBDDB6] text-[#1C1917] border-[#D4AF37]'
                      : 'bg-[#F5EFE6] text-[#574D3F] border-[#DDD4C1] hover:bg-[#EAE3D2]'
                  }`}
                >
                  {fs === 'small' ? 'A (Small)' : fs === 'medium' ? 'A+ (Regular)' : fs === 'large' ? 'A++ (Large)' : 'A+++ (Max)'}
                </button>
              ))}
            </div>
          </div>

          {/* Font family selection */}
          <div className="space-y-2">
            <label className="text-xs font-sans-ui uppercase tracking-wider text-[#8A795D] font-bold">
              Sacred Serif Typeface
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFontFamily('cormorant')}
                className={`p-2.5 text-left rounded-lg border transition-colors cursor-pointer ${
                  fontFamily === 'cormorant'
                    ? 'bg-[#EBDDB6] text-[#1C1917] border-[#D4AF37]'
                    : 'bg-[#F5EFE6] text-[#574D3F] border-[#DDD4C1] hover:bg-[#EAE3D2]'
                }`}
              >
                <div className="font-cormorant font-bold text-sm">Cormorant Garamond</div>
                <div className="text-[11px] text-[#7D705C] font-sans-ui">Classical Latinate Serif</div>
              </button>
              <button
                onClick={() => setFontFamily('lora')}
                className={`p-2.5 text-left rounded-lg border transition-colors cursor-pointer ${
                  fontFamily === 'lora'
                    ? 'bg-[#EBDDB6] text-[#1C1917] border-[#D4AF37]'
                    : 'bg-[#F5EFE6] text-[#574D3F] border-[#DDD4C1] hover:bg-[#EAE3D2]'
                }`}
              >
                <div className="font-lora font-bold text-sm">Lora</div>
                <div className="text-[11px] text-[#7D705C] font-sans-ui">Contemporary Book Serif</div>
              </button>
            </div>
          </div>
        </div>

        {/* Card 4: Reading Surface Theme */}
        <div className="bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-[#EAE3D2] pb-3">
            <Palette className="w-4 h-4 text-[#C5A028]" />
            <h2 className="font-cinzel text-base font-bold text-[#1C1917]">
              Reading Tone & Atmosphere
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setTheme('parchment')}
              className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                theme === 'parchment'
                  ? 'border-[#D4AF37] ring-1 ring-[#D4AF37] bg-[#FDFBF7]'
                  : 'border-[#DDD4C1] bg-[#F4EFEA]'
              }`}
            >
              <div className="w-6 h-6 rounded bg-[#FDFBF7] border border-[#DDD5C5] mb-2" />
              <div className="text-xs font-bold text-[#1C1917]">Warm Parchment</div>
              <div className="text-[10px] text-[#8A795D]">Canonical soft gold</div>
            </button>

            <button
              onClick={() => setTheme('alabaster')}
              className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                theme === 'alabaster'
                  ? 'border-[#D4AF37] ring-1 ring-[#D4AF37] bg-[#F9F9F8]'
                  : 'border-[#DDD4C1] bg-[#F4EFEA]'
              }`}
            >
              <div className="w-6 h-6 rounded bg-[#FBFBFA] border border-[#DDD5C5] mb-2" />
              <div className="text-xs font-bold text-[#1C1917]">Soft Alabaster</div>
              <div className="text-[10px] text-[#8A795D]">Crisp museum white</div>
            </button>

            <button
              onClick={() => setTheme('night')}
              className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                theme === 'night'
                  ? 'border-[#D4AF37] ring-1 ring-[#D4AF37] bg-[#231F1A] text-white'
                  : 'border-[#DDD4C1] bg-[#2A241E] text-white'
              }`}
            >
              <div className="w-6 h-6 rounded bg-[#1C1917] border border-[#524430] mb-2" />
              <div className="text-xs font-bold">Night Vigil</div>
              <div className="text-[10px] text-[#A6977F]">Nocturnal prayer</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
