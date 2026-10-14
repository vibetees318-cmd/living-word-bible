import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, Copy, Share2, Volume2, Sparkles, Check, Wifi, Globe2 } from 'lucide-react';
import { ChapterData, Verse, UI_TRANSLATIONS, BIBLE_BOOKS, LanguageCode } from '../data/bibleData';
import { getVerseNativeText } from '../services/bibleApi';

interface BibleReaderProps {
  chapterData: ChapterData;
  activeVerseIndex: number | null;
  language: LanguageCode;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  fontFamily: 'cormorant' | 'lora';
  bookmarkedVerseKeys: Set<string>;
  isLoading?: boolean;
  onSelectVerse: (verseIndex: number, textToSpeak: string) => void;
  onToggleBookmark: (verse: Verse, book: string, chapter: number) => void;
  onShareVerse: (verse: Verse, book: string, chapter: number) => void;
}

export const BibleReader: React.FC<BibleReaderProps> = ({
  chapterData,
  activeVerseIndex,
  language,
  fontSize,
  fontFamily,
  bookmarkedVerseKeys,
  isLoading = false,
  onSelectVerse,
  onToggleBookmark,
  onShareVerse
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedVerseKey, setSelectedVerseKey] = useState<string | null>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.English;

  // Font size classes
  const fontSizes = {
    small: 'text-base sm:text-lg leading-relaxed',
    medium: 'text-lg sm:text-xl leading-relaxed',
    large: 'text-xl sm:text-2xl leading-relaxed',
    xlarge: 'text-2xl sm:text-3xl leading-loose'
  };

  // Font family class
  const fontFamClass = fontFamily === 'cormorant' ? 'font-cormorant' : 'font-lora';

  // Get active text based on selected language in native script
  const getVerseText = (verse: Verse) => {
    return getVerseNativeText(verse, language);
  };

  const handleCopyVerse = (verse: Verse, key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `"${getVerseText(verse)}" — ${chapterData.book} ${chapterData.chapter}:${verse.verseNumber}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleVerseClick = (verse: Verse, index: number) => {
    const key = `${chapterData.book}-${chapterData.chapter}-${verse.verseNumber}`;
    setSelectedVerseKey(key);
    const spokenText = getVerseText(verse);
    onSelectVerse(index, spokenText);
  };

  // Find book title in active language
  const bookInfo = BIBLE_BOOKS.find(b => b.name.toLowerCase() === chapterData.book.toLowerCase());
  const localizedBookName = bookInfo?.localizedNames?.[language] || chapterData.book;
  const formalBookTitle = bookInfo?.category === 'Gospels' && language === 'English'
    ? `The Holy Gospel According to St. ${chapterData.book}`
    : `${localizedBookName}`;

  // Skeleton UI when loading live API data
  if (isLoading) {
    return (
      <article className="w-full max-w-4xl mx-auto bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] shadow-sm p-6 sm:p-10 animate-pulse">
        <div className="text-center pb-8 mb-8 border-b border-[#EAE3D2] space-y-3">
          <div className="h-4 w-40 bg-[#E8DEC9] rounded mx-auto" />
          <div className="h-8 w-64 bg-[#E2D6BE] rounded mx-auto" />
          <div className="h-4 w-32 bg-[#EFE9DD] rounded mx-auto" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex gap-4 p-3">
              <div className="w-6 h-6 bg-[#E8DEC9] rounded shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-[#EAE3D2] rounded w-full" />
                <div className="h-4 bg-[#F2EDE2] rounded w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </article>
    );
  }

  return (
    <article className="w-full max-w-4xl mx-auto bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] shadow-sm p-6 sm:p-10 transition-all">
      {/* Chapter Title Banner with Curatorial Editorial Header */}
      <div className="text-center pb-8 mb-8 border-b border-[#EAE3D2] relative">
        <div className="flex items-center justify-center gap-2 mb-2 text-xs font-sans-ui uppercase tracking-widest text-[#8A795D] font-bold">
          <span>{chapterData.testament === 'Old' ? t.oldTestament : t.newTestament}</span>
          <span>·</span>
          <span>{t.chapter} {chapterData.chapter}</span>
        </div>

        <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1917] tracking-tight">
          {formalBookTitle}
        </h1>

        {/* Translation & Live API Connected Badge */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF3DC] text-[#7A5F19] text-[11px] font-sans-ui font-semibold border border-[#D4AF37]/40">
            <Wifi className="w-3 h-3 text-[#B8860B]" />
            <span>{t.liveApiBadge}</span>
            <span className="opacity-50">·</span>
            <span>{chapterData.translationName || 'World English Bible'}</span>
          </span>
        </div>

        {/* Small divine cross ornament */}
        <div className="flex items-center justify-center gap-3 mt-4 text-[#C5A028]">
          <span className="w-12 h-[1px] bg-[#D4AF37]/40" />
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M11 2h2v6h6v2h-6v12h-2V10H5V8h6V2z" />
          </svg>
          <span className="w-12 h-[1px] bg-[#D4AF37]/40" />
        </div>
      </div>

      {/* Verse-by-Verse Interactive Display */}
      <div className="space-y-4">
        {chapterData.verses.map((verse, index) => {
          const verseKey = `${chapterData.book}-${chapterData.chapter}-${verse.verseNumber}`;
          const isActivelyRecited = activeVerseIndex === index;
          const isSelected = selectedVerseKey === verseKey;
          const isBookmarked = bookmarkedVerseKeys.has(verseKey);
          const verseText = getVerseText(verse);

          return (
            <div
              key={verse.verseNumber}
              onClick={() => handleVerseClick(verse, index)}
              className={`group relative p-3.5 sm:p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                isActivelyRecited
                  ? 'bg-[#FAF3DC] border border-[#D4AF37] shadow-sm ring-1 ring-[#D4AF37]/40'
                  : isSelected
                  ? 'bg-[#F7F2E6] border border-[#DDD3BF]'
                  : 'hover:bg-[#FAF7F0] border border-transparent'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Verse Number in Tabular Figures */}
                <span className="font-sans-ui text-xs sm:text-sm font-bold text-[#8C6D1F] select-none tabular-nums pt-1 shrink-0 w-6 sm:w-7 text-right">
                  {verse.verseNumber}
                </span>

                {/* Main Scripture Verse Content */}
                <div className="flex-1">
                  <p className={`${fontFamClass} ${fontSizes[fontSize]} text-[#2C2416] tracking-normal selection:bg-[#EBDDB6]`}>
                    {verseText}
                  </p>

                  {/* Secondary English subtitle if viewing in other languages */}
                  {language !== 'English' && verse.text !== verseText && (
                    <p className="font-lora text-xs sm:text-sm text-[#7D705C] italic mt-1.5 leading-relaxed">
                      "{verse.text}"
                    </p>
                  )}
                </div>

                {/* Recitation Indicator Icon */}
                {isActivelyRecited && (
                  <div className="shrink-0 self-center text-[#B8860B] animate-pulse" title="Reciting now">
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}
              </div>

              {/* Verse Action Palette */}
              <div className="mt-3 pt-2.5 border-t border-[#EAE3D2]/70 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-[11px] font-sans-ui text-[#8A795D]">
                  Tap to listen to verse recitation
                </span>

                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleBookmark(verse, chapterData.book, chapterData.chapter)}
                    title={isBookmarked ? "Remove Bookmark" : "Save Verse"}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                      isBookmarked
                        ? 'bg-[#EBDDB6] text-[#785E1A]'
                        : 'bg-[#F2ECE1] hover:bg-[#EAE1D2] text-[#5A4E3E]'
                    }`}
                  >
                    {isBookmarked ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5 fill-current" />
                        <span className="hidden sm:inline">Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{t.bookmark}</span>
                      </>
                    )}
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={(e) => handleCopyVerse(verse, verseKey, e)}
                    title="Copy Verse Text"
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#F2ECE1] hover:bg-[#EAE1D2] text-[#5A4E3E] text-xs font-medium transition-colors cursor-pointer"
                  >
                    {copiedKey === verseKey ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-700" />
                        <span className="text-green-700">{t.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{t.copy}</span>
                      </>
                    )}
                  </button>

                  {/* Share Card Button */}
                  <button
                    onClick={() => onShareVerse(verse, chapterData.book, chapterData.chapter)}
                    title="Create Shareable Verse Card"
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#F2ECE1] hover:bg-[#EAE1D2] text-[#5A4E3E] text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t.share}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reader Bottom Footer Note */}
      <div className="mt-12 pt-6 border-t border-[#EAE3D2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A795D] font-sans-ui gap-3">
        <span>Powered by Public Bible API (bible-api.com)</span>
        <span>Living Word · Recited with Reverence</span>
      </div>
    </article>
  );
};
