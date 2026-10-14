import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Music, Sparkles, Volume2, VolumeX, Mic } from 'lucide-react';
import { ambientSynth } from '../utils/audioSynthesizer';
import { UI_TRANSLATIONS, LanguageCode, JESUS_AVATAR_IMAGE_URL, JESUS_AVATAR_FALLBACK_URL } from '../data/bibleData';

interface JesusAvatarProps {
  avatarImageUrl?: string;
  isSpeaking: boolean;
  isPaused: boolean;
  activeVerseText?: string;
  activeVerseNumber?: number;
  currentBookName: string;
  currentChapter: number;
  language: LanguageCode;
  speed: number;
  setSpeed: (s: number) => void;
  pitch?: number;
  setPitch?: (p: number) => void;
  onSpeakPage: () => void;
  onPauseResume: () => void;
  onReplay10s: () => void;
}

export const JesusAvatar: React.FC<JesusAvatarProps> = ({
  avatarImageUrl,
  isSpeaking,
  isPaused,
  activeVerseText,
  activeVerseNumber,
  currentBookName,
  currentChapter,
  language,
  speed,
  setSpeed,
  pitch = 0.95,
  setPitch,
  onSpeakPage,
  onPauseResume,
  onReplay10s
}) => {
  const [ambientActive, setAmbientActive] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(avatarImageUrl || JESUS_AVATAR_IMAGE_URL);
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.English;

  useEffect(() => {
    if (avatarImageUrl) {
      setImgSrc(avatarImageUrl);
    }
  }, [avatarImageUrl]);

  // Toggle ambient worship synthesizer
  const handleToggleAmbient = () => {
    const newState = ambientSynth.toggle();
    setAmbientActive(newState);
  };

  useEffect(() => {
    setAmbientActive(ambientSynth.getIsPlaying());
  }, []);

  return (
    <section className="relative w-full max-w-4xl mx-auto mb-8 bg-gradient-to-b from-[#F7F2E8] to-[#FDFBF7] rounded-2xl border border-[#E8DEC9] shadow-md p-5 sm:p-7 overflow-hidden transition-all">
      {/* Background Divine Radial Glow */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[550px] h-[350px] pointer-events-none rounded-full blur-3xl transition-opacity duration-1000 ${
          isSpeaking && !isPaused ? 'opacity-70 bg-[#F3D77A]/35' : 'opacity-35 bg-[#E8D497]/25'
        }`}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        {/* Left / Center: Interactive Jesus Christ Avatar with Halo & State Animations */}
        <div className="flex flex-col items-center text-center sm:text-left shrink-0">
          <div className="relative group">
            {/* Ambient Golden Halo Ring */}
            <div
              className={`absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-tr from-[#C5A028]/40 via-[#F5D76E]/60 to-[#E6CA65]/30 blur-md transition-all duration-700 ${
                isSpeaking && !isPaused
                  ? 'animate-speaking-pulse opacity-100 scale-105'
                  : 'animate-divine-halo opacity-75'
              }`}
            />

            {/* Circular Ornate Frame */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-b from-[#E0C16A] via-[#B89635] to-[#8C6D1F] shadow-xl overflow-hidden">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#2C2416]">
                <img
                  src={imgSrc}
                  alt="Face of Jesus Christ"
                  className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                    isSpeaking && !isPaused ? 'scale-105' : 'animate-avatar-breathe'
                  }`}
                  onError={() => {
                    if (imgSrc !== '/jesus_portrait.jpg') {
                      setImgSrc('/jesus_portrait.jpg');
                    }
                  }}
                />

                {/* Animated speaking mouth / luminescence wave overlay when reciting */}
                {isSpeaking && !isPaused && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/25 via-transparent to-transparent pointer-events-none flex items-end justify-center pb-3">
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#F5D76E]/40">
                      <div className="w-1 h-3 bg-[#F5D76E] rounded-full animate-pulse" />
                      <div className="w-1 h-4 bg-[#F5D76E] rounded-full animate-bounce" />
                      <div className="w-1 h-2 bg-[#F5D76E] rounded-full animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right Area: Interactive Narration Control Center & Real-time Scripture Preview */}
        <div className="flex-1 w-full flex flex-col justify-between space-y-4">
          {/* Header Title & Current State Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE3D2] pb-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#8A795D] font-sans-ui font-bold">
                {currentBookName} · Chapter {currentChapter}
              </div>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C1917]">
                Sacred Voice Recitation
              </h2>
            </div>

            {/* Dynamic Status Display */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full ${
                  isSpeaking && !isPaused
                    ? 'bg-[#B8860B] shadow-[0_0_8px_#D4AF37]'
                    : isPaused
                    ? 'bg-[#A39171]'
                    : 'bg-[#C5BAA5]'
                }`}
              />
              <span className="text-xs font-sans-ui font-medium text-[#6B5E4D]">
                {isSpeaking && !isPaused
                  ? activeVerseNumber
                    ? `Reciting Verse ${activeVerseNumber}`
                    : t.listening
                  : isPaused
                  ? t.pauseSpeech
                  : t.idle}
              </span>
            </div>
          </div>

          {/* Current Spoken Scripture Live Card Preview */}
          <div className="bg-[#FAF7F0] rounded-xl border border-[#E5DCB8] p-3.5 min-h-[72px] flex items-center shadow-2xs">
            {activeVerseText ? (
              <p className="font-lora text-sm sm:text-base text-[#2C2416] italic leading-relaxed">
                {activeVerseNumber && (
                  <span className="font-sans-ui not-italic font-bold text-[#8C6D1F] mr-2 text-xs">
                    [{activeVerseNumber}]
                  </span>
                )}
                "{activeVerseText}"
              </p>
            ) : (
              <p className="font-lora text-xs sm:text-sm text-[#7D705C] italic">
                Press "Speak This Page" or click any individual scripture verse below to hear the reverent recitation.
              </p>
            )}
          </div>

          {/* Main Action Bar & Interactive Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Main Narration CTA */}
            <div className="flex items-center gap-2">
              <button
                onClick={onSpeakPage}
                className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C5A028] to-[#B38C1B] text-[#1C1917] font-sans-ui font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                {isSpeaking && !isPaused ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>{t.pauseSpeech}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>{t.speakPage}</span>
                  </>
                )}
              </button>

              {/* Play/Pause Secondary Toggle if in speech mode */}
              {isSpeaking && (
                <button
                  onClick={onPauseResume}
                  title={isPaused ? "Resume Recitation" : "Pause Recitation"}
                  className="p-2.5 rounded-xl bg-[#EBE4D5] hover:bg-[#DDD5C3] text-[#2C2416] border border-[#D6CDBC] transition-colors"
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>
              )}

              {/* Replay 10s / Current Verse */}
              <button
                onClick={onReplay10s}
                title="Replay Current Verse"
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#F4EFEA] hover:bg-[#EAE3D2] text-[#4A3F31] border border-[#D6CDBC] text-xs font-semibold font-sans-ui transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.replay10}</span>
              </button>
            </div>

            {/* Recitation Pace, Pitch Selector & Ambient Music Toggle */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Audio Wave Visualizer when speaking */}
              {isSpeaking && !isPaused && (
                <div className="flex items-center gap-1 bg-[#FAF3DC] px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/40 shadow-xs">
                  <div className="w-1 bg-[#D4AF37] rounded-full animate-[soundWave_0.9s_ease-in-out_infinite]" style={{ height: '14px' }} />
                  <div className="w-1 bg-[#B8860B] rounded-full animate-[soundWave_0.6s_ease-in-out_infinite]" style={{ height: '22px' }} />
                  <div className="w-1 bg-[#D4AF37] rounded-full animate-[soundWave_1.1s_ease-in-out_infinite]" style={{ height: '10px' }} />
                  <div className="w-1 bg-[#B8860B] rounded-full animate-[soundWave_0.75s_ease-in-out_infinite]" style={{ height: '18px' }} />
                  <div className="w-1 bg-[#D4AF37] rounded-full animate-[soundWave_1.0s_ease-in-out_infinite]" style={{ height: '12px' }} />
                </div>
              )}

              {/* Pace Selector: 0.8x, 1.0x, 1.2x */}
              <div className="flex items-center bg-[#EFE9DD] p-1 rounded-lg border border-[#DDD5C5]">
                {[0.8, 1.0, 1.2].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      speed === s
                        ? 'bg-[#FDFBF7] text-[#1C1917] shadow-xs'
                        : 'text-[#6B5E4D] hover:text-[#1C1917]'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              {/* Pitch Selector */}
              {setPitch && (
                <div className="hidden sm:flex items-center bg-[#EFE9DD] p-1 rounded-lg border border-[#DDD5C5] text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#8A795D] px-1.5">Pitch:</span>
                  {[0.85, 0.95, 1.1].map((p, idx) => (
                    <button
                      key={p}
                      onClick={() => setPitch(p)}
                      className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                        Math.abs(pitch - p) < 0.06
                          ? 'bg-[#FDFBF7] text-[#1C1917] shadow-xs'
                          : 'text-[#6B5E4D] hover:text-[#1C1917]'
                      }`}
                    >
                      {idx === 0 ? 'Deep' : idx === 1 ? 'Warm' : 'Bright'}
                    </button>
                  ))}
                </div>
              )}

              {/* Ambient Worship Background Music Toggle */}
              <button
                onClick={handleToggleAmbient}
                title={ambientActive ? "Turn Off Ambient Worship Chords" : "Turn On Ambient Worship Chords"}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold font-sans-ui border transition-all cursor-pointer ${
                  ambientActive
                    ? 'bg-[#EADDB6] text-[#2A2312] border-[#D4AF37] shadow-xs'
                    : 'bg-[#F4EFEA] text-[#6B5E4D] border-[#DDD5C5] hover:bg-[#EAE3D2]'
                }`}
              >
                <Music className={`w-3.5 h-3.5 ${ambientActive ? 'text-[#8C6D1F] animate-pulse' : 'text-[#8A795D]'}`} />
                <span className="hidden sm:inline">Chords</span>
                <span>{ambientActive ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
