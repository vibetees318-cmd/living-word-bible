import React, { useState } from 'react';
import { Play, Pause, Sparkles, Volume2, Heart, Share2, Copy, Check } from 'lucide-react';
import { DAILY_BLESSINGS, DailyBlessing, UI_TRANSLATIONS, LanguageCode, JESUS_AVATAR_IMAGE_URL } from '../data/bibleData';
import { BibleSpeechController } from '../utils/speechEngine';

interface DailyBlessingViewProps {
  speechController: BibleSpeechController;
  language: LanguageCode;
  onReadInBible: (book: string, chapter: number) => void;
}

export const DailyBlessingView: React.FC<DailyBlessingViewProps> = ({
  speechController,
  language,
  onReadInBible
}) => {
  const [selectedBlessingIdx, setSelectedBlessingIdx] = useState(0);
  const [isPlayingBlessing, setIsPlayingBlessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.English;
  const currentBlessing = DAILY_BLESSINGS[selectedBlessingIdx] || DAILY_BLESSINGS[0];

  const handlePlayBlessing = () => {
    if (isPlayingBlessing) {
      speechController.stop();
      setIsPlayingBlessing(false);
    } else {
      setIsPlayingBlessing(true);
      const textToSpeak = `${currentBlessing.dayTitle}. ${currentBlessing.scriptureText}. ${currentBlessing.spokenBlessing}`;
      speechController.speakCustomText(textToSpeak, () => {
        setIsPlayingBlessing(false);
      });
    }
  };

  const handleCopyBlessing = () => {
    const text = `"${currentBlessing.scriptureText}" (${currentBlessing.scriptureReference})\n\nDaily Blessing: ${currentBlessing.spokenBlessing}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-12">
      {/* Featured Cinematic Marquee with Mount Serenity */}
      <div className="relative rounded-2xl overflow-hidden border border-[#E3DAC8] shadow-md bg-[#2C2416]">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src="/src/assets/images/sacred_mount_serenity_1791979044274.jpg"
            alt="Sea of Galilee and Mount of Beatitudes"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-95"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200';
            }}
          />
          {/* Measured Scrim for High Contrast Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 flex flex-col justify-end p-6 sm:p-8 text-white">
            <div className="flex items-center gap-2 text-xs font-sans-ui uppercase tracking-widest text-[#F5D76E] font-bold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{t.verseOfDay}</span>
            </div>
            <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FAF7F0] max-w-2xl text-balance">
              {currentBlessing.dayTitle}
            </h1>
            <p className="text-sm font-sans-ui text-[#D6CEBE] mt-1">
              {currentBlessing.theme} · {currentBlessing.scriptureReference}
            </p>
          </div>
        </div>
      </div>

      {/* Main Devotional Scripture & Spoken Blessing Card */}
      <div className="bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] shadow-sm p-6 sm:p-9 space-y-8">
        {/* Scripture Quote */}
        <div className="border-l-2 border-[#D4AF37] pl-5 sm:pl-6 py-2">
          <p className="font-cormorant text-xl sm:text-2xl text-[#1C1917] italic leading-relaxed">
            "{currentBlessing.scriptureText}"
          </p>
          <div className="mt-2 text-xs font-sans-ui font-bold text-[#8C6D1F] tracking-wider uppercase">
            — {currentBlessing.scriptureReference}
          </div>
        </div>

        {/* Listen to Daily Blessing Video/Player Preview */}
        <div className="bg-gradient-to-r from-[#FAF3DC] to-[#F5EFE0] rounded-xl border border-[#D4AF37]/50 p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            {/* Ornate Mini Avatar Frame */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-b from-[#E0C16A] to-[#B89635] shadow-md shrink-0">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src={JESUS_AVATAR_IMAGE_URL}
                  alt="Jesus Christ Portrait"
                  className={`w-full h-full object-cover object-center ${
                    isPlayingBlessing ? 'animate-avatar-breathe' : ''
                  }`}
                />
                {isPlayingBlessing && (
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#F5D76E] rounded-full animate-ping" />
                  </div>
                )}
              </div>
            </div>

            {/* Blessing Audio Preview Content */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-sans-ui uppercase tracking-wider text-[#8A795D] font-bold">
                <Volume2 className="w-4 h-4 text-[#C5A028]" />
                <span>Spoken Sacred Grace (30-second reflection)</span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#1C1917]">
                {t.listenBlessing}
              </h3>
              <p className="font-lora text-sm sm:text-base text-[#4A3F31] leading-relaxed">
                "{currentBlessing.spokenBlessing}"
              </p>
            </div>

            {/* Play Button */}
            <div className="shrink-0">
              <button
                onClick={handlePlayBlessing}
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5D76E] text-[#1C1917] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                title={isPlayingBlessing ? "Pause Blessing" : "Play Spoken Blessing"}
              >
                {isPlayingBlessing ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Daily Prayer of Grace */}
        <div className="bg-[#FAF7F0] rounded-xl border border-[#EAE3D2] p-5 sm:p-6 space-y-2">
          <div className="text-xs uppercase tracking-widest text-[#8A795D] font-sans-ui font-bold">
            Daily Prayer of Faith
          </div>
          <p className="font-cormorant text-base sm:text-lg text-[#2C2416] italic leading-relaxed">
            "{currentBlessing.prayer}"
          </p>
        </div>

        {/* Action strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EAE3D2]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyBlessing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#574D3F] hover:text-[#1C1917] bg-[#F4EFEA] hover:bg-[#EAE3D2] border border-[#DDD4C1] rounded-lg transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-700" />
                  <span className="text-green-700">{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Blessing</span>
                </>
              )}
            </button>
          </div>

          {/* Quick links to other daily blessings */}
          <div className="flex items-center gap-1.5">
            {DAILY_BLESSINGS.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => {
                  setSelectedBlessingIdx(idx);
                  if (isPlayingBlessing) {
                    speechController.stop();
                    setIsPlayingBlessing(false);
                  }
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedBlessingIdx === idx
                    ? 'bg-[#EBDDB6] text-[#1C1917] border border-[#D4AF37]'
                    : 'bg-[#F4EFEA] text-[#6B5E4D] border border-[#DDD5C5] hover:bg-[#EAE3D2]'
                }`}
              >
                Day {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
