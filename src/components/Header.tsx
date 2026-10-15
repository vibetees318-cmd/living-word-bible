import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, Volume2, Globe, X } from 'lucide-react';
import { BIBLE_BOOKS, CURATED_CHAPTERS, UI_TRANSLATIONS, SUPPORTED_LANGUAGES, LanguageCode } from '../data/bibleData';

interface HeaderProps {
  currentTab: 'reader' | 'videos' | 'blessing' | 'prayers' | 'bookmarks' | 'settings';
  setCurrentTab: (tab: 'reader' | 'videos' | 'blessing' | 'prayers' | 'bookmarks' | 'settings') => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  onSelectBookAndChapter: (bookId: string, chapter: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onSelectBookAndChapter
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.English;

  // Search results
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase().trim();

    const results: { bookId: string; bookName: string; chapter: number; verseNum?: number; preview: string }[] = [];

    // Search book names across English and localized names
    BIBLE_BOOKS.forEach(b => {
      const matchLocalized = Object.values(b.localizedNames).some(name => name.toLowerCase().includes(q));
      if (b.name.toLowerCase().includes(q) || matchLocalized) {
        const localized = b.localizedNames[language] || b.name;
        results.push({
          bookId: b.id,
          bookName: localized,
          chapter: 1,
          preview: `${localized} (${b.name}) · ${b.testament} Testament`
        });
      }
    });

    // Check curated chapter text matches
    Object.entries(CURATED_CHAPTERS).forEach(([key, chap]) => {
      const bookObj = BIBLE_BOOKS.find(b => b.name.toLowerCase() === chap.book.toLowerCase());
      const bookId = bookObj?.id || chap.book.toLowerCase();

      chap.verses.forEach(v => {
        if (
          v.text.toLowerCase().includes(q) ||
          (v.hindiText && v.hindiText.includes(q)) ||
          (v.spanishText && v.spanishText.toLowerCase().includes(q))
        ) {
          results.push({
            bookId,
            bookName: chap.book,
            chapter: chap.chapter,
            verseNum: v.verseNumber,
            preview: v.text.length > 85 ? v.text.substring(0, 85) + '...' : v.text
          });
        }
      });
    });

    return results.slice(0, 7);
  }, [searchQuery]);

  const handleSelectResult = (bookId: string, chapter: number) => {
    onSelectBookAndChapter(bookId, chapter);
    setSearchOpen(false);
    setSearchQuery('');
    setCurrentTab('reader');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE3D2] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand Wordmark with radiant golden dove / halo symbol */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentTab('reader')}
              className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg"
            >
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#E3C363] via-[#D4AF37] to-[#F3E5AB] flex items-center justify-center shadow-sm shadow-[#D4AF37]/30 transition-transform group-hover:scale-105">
                <svg className="w-6 h-6 text-[#1A1813]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {/* Radiant dove & halo icon */}
                  <circle cx="12" cy="12" r="9" strokeOpacity="0.4" strokeDasharray="2 2" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeOpacity="0.6" />
                  <path d="M16 12a4 4 0 0 0-8 0c0 3 4 7 4 7s4-4 4-7z" fill="currentColor" fillOpacity="0.15" />
                  <path d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-lg md:text-xl font-bold tracking-tight text-[#1C1917] whitespace-nowrap">
                  Living Word
                </span>
                <span className="text-[11px] font-sans-ui uppercase tracking-wider text-[#8A795D] font-medium -mt-0.5">
                  Holy Bible Companion
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (single line, clean text, desktop) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-[#574D3F]">
            <button
              onClick={() => setCurrentTab('reader')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 cursor-pointer ${
                currentTab === 'reader'
                  ? 'text-[#1C1917] font-semibold border-[#D4AF37]'
                  : 'border-transparent hover:text-[#1C1917]'
              }`}
            >
              {t.readBible}
            </button>

            {/* 📺 Bible Videos tab */}
            <button
              onClick={() => setCurrentTab('videos')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'videos'
                  ? 'text-[#1C1917] font-semibold border-[#D4AF37]'
                  : 'border-transparent hover:text-[#1C1917]'
              }`}
            >
              <span>📺</span>
              <span>Bible Videos</span>
            </button>

            <button
              onClick={() => setCurrentTab('prayers')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'prayers'
                  ? 'text-[#1C1917] font-semibold border-[#D4AF37]'
                  : 'border-transparent hover:text-[#1C1917]'
              }`}
            >
              <span>📿</span>
              <span>{t.rcPrayers}</span>
            </button>
            <button
              onClick={() => setCurrentTab('blessing')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 cursor-pointer ${
                currentTab === 'blessing'
                  ? 'text-[#1C1917] font-semibold border-[#D4AF37]'
                  : 'border-transparent hover:text-[#1C1917]'
              }`}
            >
              {t.dailyBlessing}
            </button>
            <button
              onClick={() => setCurrentTab('bookmarks')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 cursor-pointer ${
                currentTab === 'bookmarks'
                  ? 'text-[#1C1917] font-semibold border-[#D4AF37]'
                  : 'border-transparent hover:text-[#1C1917]'
              }`}
            >
              {t.bookmarks}
            </button>
            <button
              onClick={() => setCurrentTab('settings')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 cursor-pointer ${
                currentTab === 'settings'
                  ? 'text-[#1C1917] font-semibold border-[#D4AF37]'
                  : 'border-transparent hover:text-[#1C1917]'
              }`}
            >
              {t.audioSettings}
            </button>
          </nav>

          {/* Zone 3: Primary Action & Utilities (Language Selector & Quick Search) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search scripture"
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#574D3F] bg-[#F4EFEA] hover:bg-[#EBE4D8] border border-[#DDD5C5] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs"
            >
              <Search className="w-4 h-4 text-[#8A795D]" />
              <span className="hidden sm:inline">Search Scripture...</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative flex items-center">
              <Globe className="w-4 h-4 absolute left-2.5 text-[#8A795D] pointer-events-none" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="pl-8 pr-3 py-1.5 text-xs font-semibold text-[#2C2C2C] bg-[#F4EFEA] border border-[#DDD5C5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer hover:bg-[#EBE4D8] transition-colors appearance-none max-w-[155px] sm:max-w-none truncate"
                aria-label="Select recitation language"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.code === 'English' ? 'English' : `${lang.nativeName} (${lang.englishName})`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal Flyout */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#FDFBF7] rounded-xl border border-[#D6CEBE] shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#EAE3D2] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#8A795D]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent text-sm sm:text-base font-serif text-[#1C1917] placeholder-[#8A795D] focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-[#8A795D] hover:text-[#1C1917] rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Suggestions / Results */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#EAE3D2]/60">
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectResult(item.bookId, item.chapter)}
                    className="w-full text-left p-3 hover:bg-[#F4EFEA] rounded-lg transition-colors group flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between text-xs text-[#8A795D] font-sans-ui">
                      <span className="font-semibold text-[#1C1917] group-hover:text-[#9A7B20] transition-colors">
                        {item.bookName} {item.chapter}{item.verseNum ? `:${item.verseNum}` : ''}
                      </span>
                      <span>Read chapter →</span>
                    </div>
                    <p className="font-lora text-sm text-[#4A4237] line-clamp-2 italic">
                      "{item.preview}"
                    </p>
                  </button>
                ))
              ) : searchQuery.trim().length >= 2 ? (
                <div className="p-6 text-center text-sm font-lora text-[#8A795D]">
                  No matching scriptures found for "{searchQuery}". Try "Matthew 5", "John 14", "Peace", or "Love".
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  <div className="text-xs uppercase tracking-wider text-[#8A795D] font-semibold">
                    Popular Biblical Passages
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-sans-ui">
                    <button
                      onClick={() => handleSelectResult('matthew', 5)}
                      className="text-left p-2 bg-[#F4EFEA] hover:bg-[#EAE3D2] rounded border border-[#DDD5C5] transition-colors"
                    >
                      <div className="font-semibold text-[#1C1917]">Matthew 5</div>
                      <div className="text-[#8A795D] truncate">The Beatitudes</div>
                    </button>
                    <button
                      onClick={() => handleSelectResult('matthew', 6)}
                      className="text-left p-2 bg-[#F4EFEA] hover:bg-[#EAE3D2] rounded border border-[#DDD5C5] transition-colors"
                    >
                      <div className="font-semibold text-[#1C1917]">Matthew 6</div>
                      <div className="text-[#8A795D] truncate">The Lord's Prayer</div>
                    </button>
                    <button
                      onClick={() => handleSelectResult('john', 3)}
                      className="text-left p-2 bg-[#F4EFEA] hover:bg-[#EAE3D2] rounded border border-[#DDD5C5] transition-colors"
                    >
                      <div className="font-semibold text-[#1C1917]">John 3</div>
                      <div className="text-[#8A795D] truncate">For God So Loved the World</div>
                    </button>
                    <button
                      onClick={() => handleSelectResult('psalms', 23)}
                      className="text-left p-2 bg-[#F4EFEA] hover:bg-[#EAE3D2] rounded border border-[#DDD5C5] transition-colors"
                    >
                      <div className="font-semibold text-[#1C1917]">Psalm 23</div>
                      <div className="text-[#8A795D] truncate">The Lord is My Shepherd</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
