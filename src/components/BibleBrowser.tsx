import React from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { BIBLE_BOOKS, BookInfo, UI_TRANSLATIONS, LanguageCode } from '../data/bibleData';

interface BibleBrowserProps {
  selectedTestament: 'Old' | 'New';
  setSelectedTestament: (t: 'Old' | 'New') => void;
  selectedBookId: string;
  setSelectedBookId: (id: string) => void;
  selectedChapter: number;
  setSelectedChapter: (chap: number) => void;
  language: LanguageCode;
}

export const BibleBrowser: React.FC<BibleBrowserProps> = ({
  selectedTestament,
  setSelectedTestament,
  selectedBookId,
  setSelectedBookId,
  selectedChapter,
  setSelectedChapter,
  language
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.English;

  // Filter books by selected testament
  const booksInTestament = BIBLE_BOOKS.filter(b => b.testament === selectedTestament);

  // Active book object
  const activeBook = BIBLE_BOOKS.find(b => b.id === selectedBookId) || booksInTestament[0] || BIBLE_BOOKS[0];

  // If activeBook testament doesn't match selected testament, pick first book in testament
  React.useEffect(() => {
    if (activeBook.testament !== selectedTestament) {
      const firstInTestament = booksInTestament[0];
      if (firstInTestament) {
        setSelectedBookId(firstInTestament.id);
        setSelectedChapter(1);
      }
    }
  }, [selectedTestament]);

  // Total chapters in current book
  const maxChapters = activeBook.chaptersCount || 1;

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    } else {
      // Navigate to previous book if available
      const currentIdx = booksInTestament.findIndex(b => b.id === activeBook.id);
      if (currentIdx > 0) {
        const prevBook = booksInTestament[currentIdx - 1];
        setSelectedBookId(prevBook.id);
        setSelectedChapter(prevBook.chaptersCount);
      }
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < maxChapters) {
      setSelectedChapter(selectedChapter + 1);
    } else {
      // Navigate to next book if available
      const currentIdx = booksInTestament.findIndex(b => b.id === activeBook.id);
      if (currentIdx < booksInTestament.length - 1) {
        const nextBook = booksInTestament[currentIdx + 1];
        setSelectedBookId(nextBook.id);
        setSelectedChapter(1);
      }
    }
  };

  // Get localized book name
  const getLocalizedBookName = (b: BookInfo) => {
    const loc = b.localizedNames?.[language];
    if (loc && loc !== b.name) {
      return `${loc} (${b.name})`;
    }
    return b.name;
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 bg-[#FDFBF7] rounded-xl border border-[#E3DAC8] shadow-xs p-3.5 sm:p-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Navigation Dropdowns Segment */}
        <div className="grid grid-cols-3 gap-2 flex-1">
          {/* Dropdown 1: Testament Selector */}
          <div className="flex flex-col">
            <label className="text-[10px] font-sans-ui uppercase tracking-wider text-[#8A795D] font-bold mb-1">
              {t.testament}
            </label>
            <select
              value={selectedTestament}
              onChange={(e) => setSelectedTestament(e.target.value as 'Old' | 'New')}
              className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-medium bg-[#F5EFE6] border border-[#DDD4C1] rounded-lg text-[#2A2312] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
            >
              <option value="New">{t.newTestament}</option>
              <option value="Old">{t.oldTestament}</option>
            </select>
          </div>

          {/* Dropdown 2: Book Selector */}
          <div className="flex flex-col">
            <label className="text-[10px] font-sans-ui uppercase tracking-wider text-[#8A795D] font-bold mb-1">
              {t.book}
            </label>
            <select
              value={activeBook.id}
              onChange={(e) => {
                setSelectedBookId(e.target.value);
                setSelectedChapter(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-medium bg-[#F5EFE6] border border-[#DDD4C1] rounded-lg text-[#2A2312] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
            >
              {booksInTestament.map((b) => (
                <option key={b.id} value={b.id}>
                  {getLocalizedBookName(b)}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown 3: Chapter Selector */}
          <div className="flex flex-col">
            <label className="text-[10px] font-sans-ui uppercase tracking-wider text-[#8A795D] font-bold mb-1">
              {t.chapter}
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 text-xs sm:text-sm font-medium bg-[#F5EFE6] border border-[#DDD4C1] rounded-lg text-[#2A2312] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
            >
              {Array.from({ length: maxChapters }, (_, i) => i + 1).map((ch) => (
                <option key={ch} value={ch}>
                  {t.chapter} {ch}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Chapter Navigation Buttons */}
        <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-4 border-t sm:border-t-0 border-[#EAE3D2]">
          <button
            onClick={handlePrevChapter}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#574D3F] hover:text-[#1C1917] bg-[#F5EFE6] hover:bg-[#EAE3D2] border border-[#DDD4C1] rounded-lg transition-colors cursor-pointer"
            title="Go to previous chapter"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="whitespace-nowrap">{t.prevChapter}</span>
          </button>

          <button
            onClick={handleNextChapter}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#574D3F] hover:text-[#1C1917] bg-[#F5EFE6] hover:bg-[#EAE3D2] border border-[#DDD4C1] rounded-lg transition-colors cursor-pointer"
            title="Go to next chapter"
          >
            <span className="whitespace-nowrap">{t.nextChapter}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
