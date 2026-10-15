import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, Volume2, Globe, X, Menu, Code2, Shirt, Tv, Bookmark, Settings, Sliders, ShieldCheck, Star, Heart } from 'lucide-react';
import { BIBLE_BOOKS, CURATED_CHAPTERS, UI_TRANSLATIONS, SUPPORTED_LANGUAGES, LanguageCode } from '../data/bibleData';

interface KeywordScripture {
  keywords: string[];
  bookId: string;
  bookName: string;
  chapter: number;
  verseNum: number;
  text: string;
}

const TOPICAL_KEYWORD_VERSES: KeywordScripture[] = [
  // Love
  {
    keywords: ['love', 'charity', 'affection', 'amor', 'prem', 'pyar'],
    bookId: '1corinthians',
    bookName: '1 Corinthians',
    chapter: 13,
    verseNum: 4,
    text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.'
  },
  {
    keywords: ['love', 'life', 'eternal', 'salvation', 'god', 'amor'],
    bookId: 'john',
    bookName: 'John',
    chapter: 3,
    verseNum: 16,
    text: 'For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life.'
  },
  {
    keywords: ['love', 'heart', 'soul', 'commandment'],
    bookId: 'matthew',
    bookName: 'Matthew',
    chapter: 22,
    verseNum: 37,
    text: 'Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind.'
  },
  {
    keywords: ['love', 'fear', 'perfect'],
    bookId: '1john',
    bookName: '1 John',
    chapter: 4,
    verseNum: 18,
    text: 'There is no fear in love; but perfect love casteth out fear.'
  },
  // Peace
  {
    keywords: ['peace', 'anxious', 'prayer', 'heart', 'paz', 'shanti'],
    bookId: 'philippians',
    bookName: 'Philippians',
    chapter: 4,
    verseNum: 7,
    text: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.'
  },
  {
    keywords: ['peace', 'troubled', 'comfort', 'heart', 'paz'],
    bookId: 'john',
    bookName: 'John',
    chapter: 14,
    verseNum: 27,
    text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.'
  },
  {
    keywords: ['peace', 'peacemakers', 'blessed'],
    bookId: 'matthew',
    bookName: 'Matthew',
    chapter: 5,
    verseNum: 9,
    text: 'Blessed are the peacemakers: for they shall be called the children of God.'
  },
  // Faith
  {
    keywords: ['faith', 'hope', 'substance', 'evidence', 'vishwas', 'fe'],
    bookId: 'hebrews',
    bookName: 'Hebrews',
    chapter: 11,
    verseNum: 1,
    text: 'Now faith is the substance of things hoped for, the evidence of things not seen.'
  },
  {
    keywords: ['faith', 'walk', 'sight'],
    bookId: '2corinthians',
    bookName: '2 Corinthians',
    chapter: 5,
    verseNum: 7,
    text: 'For we walk by faith, not by sight.'
  },
  {
    keywords: ['faith', 'trust', 'heart', 'understanding'],
    bookId: 'proverbs',
    bookName: 'Proverbs',
    chapter: 3,
    verseNum: 5,
    text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.'
  },
  // Hope
  {
    keywords: ['hope', 'thoughts', 'peace', 'future', 'ashaa'],
    bookId: 'jeremiah',
    bookName: 'Jeremiah',
    chapter: 29,
    verseNum: 11,
    text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.'
  },
  {
    keywords: ['hope', 'joy', 'peace', 'believing'],
    bookId: 'romans',
    bookName: 'Romans',
    chapter: 15,
    verseNum: 13,
    text: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope.'
  },
  // Strength
  {
    keywords: ['strength', 'power', 'christ', 'shakti', 'fuerza'],
    bookId: 'philippians',
    bookName: 'Philippians',
    chapter: 4,
    verseNum: 13,
    text: 'I can do all things through Christ which strengtheneth me.'
  },
  {
    keywords: ['strength', 'refuge', 'help', 'trouble'],
    bookId: 'psalms',
    bookName: 'Psalms',
    chapter: 46,
    verseNum: 1,
    text: 'God is our refuge and strength, a very present help in trouble.'
  },
  {
    keywords: ['strength', 'fear', 'dismayed', 'uphold'],
    bookId: 'isaiah',
    bookName: 'Isaiah',
    chapter: 41,
    verseNum: 10,
    text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee.'
  },
  // Comfort & Healing
  {
    keywords: ['comfort', 'shepherd', 'shadow', 'valley', 'rest', 'healing'],
    bookId: 'psalms',
    bookName: 'Psalms',
    chapter: 23,
    verseNum: 1,
    text: 'The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures.'
  },
  {
    keywords: ['comfort', 'heavy', 'laden', 'rest', 'peace', 'healing'],
    bookId: 'matthew',
    bookName: 'Matthew',
    chapter: 11,
    verseNum: 28,
    text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.'
  },
  // Forgiveness & Mercy
  {
    keywords: ['forgiveness', 'confess', 'sins', 'cleanse', 'mercy', 'kshama'],
    bookId: '1john',
    bookName: '1 John',
    chapter: 1,
    verseNum: 9,
    text: 'If we confess our sins, He is faithful and just to forgive us our sins, and to cleanse us.'
  },
  {
    keywords: ['forgiveness', 'trespasses', 'father', 'mercy'],
    bookId: 'matthew',
    bookName: 'Matthew',
    chapter: 6,
    verseNum: 14,
    text: 'For if ye forgive men their trespasses, your heavenly Father will also forgive you.'
  },
  // Prayer
  {
    keywords: ['prayer', 'ask', 'seek', 'knock', 'prathana'],
    bookId: 'matthew',
    bookName: 'Matthew',
    chapter: 7,
    verseNum: 7,
    text: 'Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.'
  },
  {
    keywords: ['prayer', 'rejoice', 'thanksgiving'],
    bookId: '1thessalonians',
    bookName: '1 Thessalonians',
    chapter: 5,
    verseNum: 17,
    text: 'Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus.'
  }
];

interface HeaderProps {
  currentTab: 'reader' | 'videos' | 'blessing' | 'prayers' | 'bookmarks' | 'settings';
  setCurrentTab: (tab: 'reader' | 'videos' | 'blessing' | 'prayers' | 'bookmarks' | 'settings') => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  onSelectBookAndChapter: (bookId: string, chapter: number) => void;
  onOpenAboutDeveloper?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenRateApp?: () => void;
  bookmarksCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onSelectBookAndChapter,
  onOpenAboutDeveloper,
  onOpenPrivacyPolicy,
  onOpenRateApp,
  bookmarksCount = 0
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.English;

  // Search results
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase().trim();

    const results: { bookId: string; bookName: string; chapter: number; verseNum?: number; preview: string; matchType?: string }[] = [];

    // 1. Search Topical Keyword Verses first (highest thematic relevance for keywords like love, peace, faith, etc.)
    TOPICAL_KEYWORD_VERSES.forEach(tv => {
      const keywordMatch = tv.keywords.some(k => k.includes(q) || q.includes(k));
      const textMatch = tv.text.toLowerCase().includes(q);
      if (keywordMatch || textMatch) {
        results.push({
          bookId: tv.bookId,
          bookName: tv.bookName,
          chapter: tv.chapter,
          verseNum: tv.verseNum,
          preview: tv.text,
          matchType: 'Topical Scripture'
        });
      }
    });

    // 2. Search book names across English and localized names
    BIBLE_BOOKS.forEach(b => {
      const matchLocalized = Object.values(b.localizedNames).some(name => name.toLowerCase().includes(q));
      if (b.name.toLowerCase().includes(q) || matchLocalized) {
        const localized = b.localizedNames[language] || b.name;
        results.push({
          bookId: b.id,
          bookName: localized,
          chapter: 1,
          preview: `${localized} (${b.name}) · ${b.testament} Testament`,
          matchType: 'Holy Book'
        });
      }
    });

    // 3. Check curated chapter text matches
    Object.entries(CURATED_CHAPTERS).forEach(([key, chap]) => {
      const bookObj = BIBLE_BOOKS.find(b => b.name.toLowerCase() === chap.book.toLowerCase());
      const bookId = bookObj?.id || chap.book.toLowerCase();

      chap.verses.forEach(v => {
        if (
          v.text.toLowerCase().includes(q) ||
          (v.hindiText && v.hindiText.includes(q)) ||
          (v.spanishText && v.spanishText.toLowerCase().includes(q))
        ) {
          // Avoid duplicate entry
          if (!results.some(r => r.bookId === bookId && r.chapter === chap.chapter && r.verseNum === v.verseNumber)) {
            results.push({
              bookId,
              bookName: chap.book,
              chapter: chap.chapter,
              verseNum: v.verseNumber,
              preview: v.text.length > 85 ? v.text.substring(0, 85) + '...' : v.text,
              matchType: 'Chapter Verse'
            });
          }
        }
      });
    });

    return results.slice(0, 8);
  }, [searchQuery, language]);

  const handleSelectResult = (bookId: string, chapter: number) => {
    onSelectBookAndChapter(bookId, chapter);
    setSearchOpen(false);
    setSearchQuery('');
    setCurrentTab('reader');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EAE3D2] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3 md:gap-8">
          {/* Zone 1: Top-Left 3-Line Menu Drawer Button + Brand Wordmark */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Top-Left 3-Line Menu Drawer Trigger */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation drawer menu"
              title="Navigation Menu (Bookmarks, Audio Settings & Developer)"
              className="p-2 text-[#574D3F] hover:text-[#1C1917] hover:bg-[#EBE4D8] border border-[#DDD5C5] rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-2xs group"
            >
              <Menu className="w-5 h-5 text-[#8A795D] group-hover:text-[#1C1917] transition-colors" />
            </button>

            {/* Brand Wordmark with radiant golden dove / halo symbol */}
            <button
              onClick={() => setCurrentTab('reader')}
              className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#E3C363] via-[#D4AF37] to-[#F3E5AB] flex items-center justify-center shadow-sm shadow-[#D4AF37]/30 transition-transform group-hover:scale-105">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A1813]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {/* Radiant dove & halo icon */}
                  <circle cx="12" cy="12" r="9" strokeOpacity="0.4" strokeDasharray="2 2" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeOpacity="0.6" />
                  <path d="M16 12a4 4 0 0 0-8 0c0 3 4 7 4 7s4-4 4-7z" fill="currentColor" fillOpacity="0.15" />
                  <path d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#1C1917] whitespace-nowrap">
                  Living Word
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans-ui uppercase tracking-wider text-[#8A795D] font-medium -mt-0.5">
                  Holy Bible Companion
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (desktop) */}
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
              <span>✝️</span>
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
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'bookmarks'
                  ? 'text-[#1C1917] font-semibold border-[#D4AF37]'
                  : 'border-transparent hover:text-[#1C1917]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-[#C5A028]" />
              <span>{t.bookmarks}</span>
              {bookmarksCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-[#1C1917] text-[9px] font-bold flex items-center justify-center">
                  {bookmarksCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentTab('settings')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'settings'
                  ? 'text-[#1C1917] font-semibold border-[#D4AF37]'
                  : 'border-transparent hover:text-[#1C1917]'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 text-[#C5A028]" />
              <span>{t.audioSettings}</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action & Utilities (Quick Search & Language Selector) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search scripture"
              className="flex items-center gap-2 px-2.5 sm:px-3 py-2 text-xs font-medium text-[#574D3F] bg-[#F4EFEA] hover:bg-[#EBE4D8] border border-[#DDD5C5] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
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
                className="pl-8 pr-3 py-1.5 text-xs font-semibold text-[#2C2C2C] bg-[#F4EFEA] border border-[#DDD5C5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer hover:bg-[#EBE4D8] transition-colors appearance-none max-w-[125px] sm:max-w-none truncate"
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

      {/* Slide-out Navigation Drawer (Slides in from Top-Left) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Left-Side Drawer Container Panel */}
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
            <div className="w-84 sm:w-96 max-w-full bg-[#FDFBF7] border-r border-[#EAE3D2] shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-300">
              {/* Drawer Top Header */}
              <div className="p-4 sm:p-5 border-b border-[#EAE3D2] flex items-center justify-between bg-[#F8F4EC]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#E3C363] via-[#D4AF37] to-[#F3E5AB] flex items-center justify-center shadow-xs text-[#1A1813]">
                    <svg className="w-5 h-5 text-[#1A1813]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" strokeOpacity="0.4" strokeDasharray="2 2" />
                      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeOpacity="0.6" />
                      <path d="M16 12a4 4 0 0 0-8 0c0 3 4 7 4 7s4-4 4-7z" fill="currentColor" fillOpacity="0.15" />
                      <path d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-[#1C1917]">
                      Living Word
                    </h3>
                    <p className="text-[11px] font-sans-ui uppercase tracking-wider text-[#8A795D]">
                      Holy Bible Companion
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 text-[#8A795D] hover:text-[#1C1917] hover:bg-[#EAE3D2] rounded-lg transition-colors cursor-pointer"
                  aria-label="Close navigation drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-4 space-y-5 overflow-y-auto flex-1 font-sans-ui">
                {/* Section 1: Scripture & Worship */}
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8A795D] font-bold px-3 mb-2 flex items-center justify-between">
                    <span>Scripture & Devotion</span>
                    <span className="text-[#C5A028]">✦</span>
                  </div>
                  <nav className="space-y-1">
                    <button
                      onClick={() => {
                        setCurrentTab('reader');
                        setDrawerOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                        currentTab === 'reader'
                          ? 'bg-[#EFE8DA] text-[#1C1917] font-semibold border border-[#D5C9B3]'
                          : 'text-[#574D3F] hover:bg-[#F4EFEA]'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 text-[#C5A028]" />
                      <span>{t.readBible}</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentTab('videos');
                        setDrawerOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                        currentTab === 'videos'
                          ? 'bg-[#EFE8DA] text-[#1C1917] font-semibold border border-[#D5C9B3]'
                          : 'text-[#574D3F] hover:bg-[#F4EFEA]'
                      }`}
                    >
                      <Tv className="w-4 h-4 text-[#C5A028]" />
                      <span>📺 Bible Videos & Stories</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentTab('prayers');
                        setDrawerOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                        currentTab === 'prayers'
                          ? 'bg-[#EFE8DA] text-[#1C1917] font-semibold border border-[#D5C9B3]'
                          : 'text-[#574D3F] hover:bg-[#F4EFEA]'
                      }`}
                    >
                      <span>✝️</span>
                      <span>{t.rcPrayers} (Rosary & Litanies)</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentTab('blessing');
                        setDrawerOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                        currentTab === 'blessing'
                          ? 'bg-[#EFE8DA] text-[#1C1917] font-semibold border border-[#D5C9B3]'
                          : 'text-[#574D3F] hover:bg-[#F4EFEA]'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-[#C5A028]" />
                      <span>{t.dailyBlessing}</span>
                    </button>
                  </nav>
                </div>

                {/* Section 2: Study Tools & Offline Storage */}
                <div className="pt-2 border-t border-[#EAE3D2]">
                  <div className="text-[11px] uppercase tracking-wider text-[#8A795D] font-bold px-3 mb-2 flex items-center justify-between">
                    <span>Study & Offline Access</span>
                    <span className="text-[#C5A028]">✦</span>
                  </div>
                  <nav className="space-y-1.5">
                    {/* Offline Saved Verses Item */}
                    <button
                      onClick={() => {
                        setCurrentTab('bookmarks');
                        setDrawerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                        currentTab === 'bookmarks'
                          ? 'bg-[#EFE8DA] text-[#1C1917] font-bold border border-[#D5C9B3] shadow-xs'
                          : 'text-[#574D3F] hover:bg-[#F4EFEA] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FAF4E6] border border-[#D4AF37]/40 flex items-center justify-center text-[#8C6D1F]">
                          <Bookmark className="w-4 h-4 text-[#C5A028] fill-[#D4AF37]/30" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-[#1C1917]">
                            Offline Saved Verses
                          </div>
                          <div className="text-[10px] text-[#8A795D]">
                            Saved scriptures & personal reflections
                          </div>
                        </div>
                      </div>
                      {bookmarksCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#1C1917] text-xs font-bold">
                          {bookmarksCount}
                        </span>
                      )}
                    </button>

                    {/* Audio Settings & Controls Item */}
                    <button
                      onClick={() => {
                        setCurrentTab('settings');
                        setDrawerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm transition-all cursor-pointer ${
                        currentTab === 'settings'
                          ? 'bg-[#EFE8DA] text-[#1C1917] font-bold border border-[#D5C9B3] shadow-xs'
                          : 'text-[#574D3F] hover:bg-[#F4EFEA] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FAF4E6] border border-[#D4AF37]/40 flex items-center justify-center text-[#8C6D1F]">
                          <Sliders className="w-4 h-4 text-[#C5A028]" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-[#1C1917]">
                            Audio Settings & Controls
                          </div>
                          <div className="text-[10px] text-[#8A795D]">
                            Voice speed, pitch, reading theme & fonts
                          </div>
                        </div>
                      </div>
                      <Volume2 className="w-4 h-4 text-[#8A795D]" />
                    </button>
                  </nav>
                </div>

                {/* Section 3: Play Store Compliance & App Support */}
                <div className="pt-2 border-t border-[#EAE3D2]">
                  <div className="text-[11px] uppercase tracking-wider text-[#8A795D] font-bold px-3 mb-2 flex items-center justify-between">
                    <span>Compliance & Support</span>
                    <span className="text-[#C5A028]">✦</span>
                  </div>
                  <nav className="space-y-1.5">
                    {/* Privacy Policy & Terms */}
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        if (onOpenPrivacyPolicy) onOpenPrivacyPolicy();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm text-[#574D3F] hover:bg-[#F4EFEA] border border-transparent transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FAF4E6] border border-[#D4AF37]/40 flex items-center justify-center text-[#8C6D1F]">
                          <ShieldCheck className="w-4 h-4 text-[#C5A028]" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-[#1C1917]">
                            Privacy Policy & Terms
                          </div>
                          <div className="text-[10px] text-[#8A795D]">
                            Play Store guidelines & data safety
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-[#8A795D]">→</span>
                    </button>

                    {/* Rate & Support App */}
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        if (onOpenRateApp) onOpenRateApp();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm text-[#574D3F] hover:bg-[#F4EFEA] border border-transparent transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FAF4E6] border border-[#D4AF37]/40 flex items-center justify-center text-[#8C6D1F]">
                          <Star className="w-4 h-4 text-[#C5A028] fill-[#D4AF37]/40" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-[#1C1917]">
                            Rate & Support App
                          </div>
                          <div className="text-[10px] text-[#8A795D]">
                            5-star review & prayer feedback
                          </div>
                        </div>
                      </div>
                      <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </button>
                  </nav>
                </div>

                {/* Section 4: Dedicated About Developer & Brand Partner */}
                <div className="pt-2 border-t border-[#EAE3D2]">
                  <div className="text-[11px] uppercase tracking-wider text-[#8A795D] font-bold px-3 mb-2 flex items-center justify-between">
                    <span>Creator & Brand Partner</span>
                    <span className="text-[#C5A028]">✦</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#FAF5EC] to-[#F3EBE0] border border-[#DDD3BF] shadow-xs space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2A231C] to-[#161310] border border-[#D4AF37] flex items-center justify-center text-[#F5D76E] font-cinzel font-bold text-sm shadow-sm shrink-0">
                        PB
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-cinzel text-xs sm:text-sm font-bold text-[#1C1917] truncate">
                            Pranjit Baghwar
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FAF4E6] text-[#8C6D1F] border border-[#D4AF37]/40 shrink-0">
                            Version 1.0.0
                          </span>
                        </div>
                        <div className="text-[11px] text-[#7A6C59] font-medium leading-tight mt-0.5">
                          Designed & Developed by Pranjit Baghwar
                        </div>
                      </div>
                    </div>

                    {/* Vibe Tees Branding Chip */}
                    <div className="p-2.5 rounded-lg bg-[#2A231C] text-white border border-[#4A3E2D] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shirt className="w-3.5 h-3.5 text-[#F5D76E]" />
                        <span className="text-xs font-cinzel font-bold text-[#F5D76E]">
                          Vibe Tees
                        </span>
                      </div>
                      <a
                        href="https://vibetees.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-[#D4AF37] hover:underline font-semibold"
                      >
                        Visit Studio ↗
                      </a>
                    </div>

                    {/* Button to open About Developer Modal */}
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        if (onOpenAboutDeveloper) {
                          onOpenAboutDeveloper();
                        }
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-[#D4AF37] hover:bg-[#C5A028] text-[#1C1917] text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>About Developer & Vibe Tees</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Footer with Developer Credit Line */}
              <div className="p-4 border-t border-[#EAE3D2] bg-[#F8F4EC] text-center text-xs text-[#8A795D]">
                <div className="flex items-center justify-center gap-1.5 font-cinzel font-semibold text-[#5A5042] text-[11px]">
                  <span>Living Word Holy Bible</span>
                  <span>·</span>
                  <span className="font-bold text-[#8C6D1F] bg-[#FAF4E6] px-2 py-0.5 rounded border border-[#D4AF37]/40 shadow-2xs">
                    Version 1.0.0
                  </span>
                </div>
                <div className="text-[10.5px] text-[#5A4F3E] mt-1 font-semibold leading-relaxed">
                  Designed & Developed by Pranjit Baghwar | Version 1.0.0 | Vibe Tees
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instant Search Modal Flyout with Keyword Searching */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#FDFBF7] rounded-2xl border border-[#D4AF37]/60 shadow-2xl overflow-hidden flex flex-col">
            {/* Search Input Bar */}
            <div className="p-4 border-b border-[#EAE3D2] flex items-center gap-3 bg-[#FAF5EB]">
              <Search className="w-5 h-5 text-[#8A795D]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword: Love, Peace, Faith, Hope, Matthew 5..."
                className="w-full bg-transparent text-sm sm:text-base font-serif text-[#1C1917] placeholder-[#8A795D] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-[#8A795D] hover:text-[#1C1917] text-xs font-semibold"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-[#8A795D] hover:text-[#1C1917] hover:bg-[#EAE3D2] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Keyword Search Filter Chips */}
            <div className="px-4 py-2.5 bg-[#F6EFE2] border-b border-[#E5DAC6] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
              <span className="text-[11px] font-bold text-[#8A795D] uppercase tracking-wider shrink-0 mr-1">
                Themes:
              </span>
              {[
                { label: '💛 Love', query: 'love' },
                { label: '🕊️ Peace', query: 'peace' },
                { label: '✝️ Faith', query: 'faith' },
                { label: '🌟 Hope', query: 'hope' },
                { label: '🛡️ Strength', query: 'strength' },
                { label: '🌿 Comfort', query: 'comfort' },
                { label: '💧 Forgiveness', query: 'forgiveness' },
                { label: '🙏 Prayer', query: 'prayer' }
              ].map((chip) => (
                <button
                  key={chip.query}
                  onClick={() => setSearchQuery(chip.query)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    searchQuery.toLowerCase() === chip.query
                      ? 'bg-[#D4AF37] text-[#1C1917] font-bold shadow-2xs'
                      : 'bg-[#FAF6EE] text-[#5A4D3B] hover:bg-[#EDE3CF] border border-[#DDD3BF]'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Quick Suggestions / Results */}
            <div className="max-h-88 overflow-y-auto p-2 divide-y divide-[#EAE3D2]/70">
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectResult(item.bookId, item.chapter)}
                    className="w-full text-left p-3.5 hover:bg-[#F4EFEA] rounded-xl transition-colors group flex flex-col gap-1.5 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs text-[#8A795D] font-sans-ui">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1C1917] group-hover:text-[#9A7B20] transition-colors font-cinzel text-sm">
                          {item.bookName} {item.chapter}{item.verseNum ? `:${item.verseNum}` : ''}
                        </span>
                        {item.matchType && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FAF4E6] text-[#8C6D1F] border border-[#D4AF37]/30">
                            {item.matchType}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#B8860B] font-medium group-hover:underline">
                        Read Scripture →
                      </span>
                    </div>
                    <p className="font-lora text-xs sm:text-sm text-[#4A4237] line-clamp-2 italic leading-relaxed">
                      "{item.preview}"
                    </p>
                  </button>
                ))
              ) : searchQuery.trim().length >= 2 ? (
                <div className="p-8 text-center text-sm font-lora text-[#8A795D] space-y-1">
                  <div>No matching scriptures found for "<strong>{searchQuery}</strong>".</div>
                  <div className="text-xs text-[#A8987E]">Try tapping one of the keyword chips above like Love, Peace, or Faith.</div>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <div className="text-xs uppercase tracking-wider text-[#8A795D] font-bold">
                    Popular Biblical Passages
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-sans-ui">
                    <button
                      onClick={() => handleSelectResult('matthew', 5)}
                      className="text-left p-2.5 bg-[#FAF6EE] hover:bg-[#F0E8D8] rounded-xl border border-[#DDD5C5] transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-[#1C1917] font-cinzel">Matthew 5</div>
                      <div className="text-[#8A795D] truncate text-[11px]">The Beatitudes</div>
                    </button>
                    <button
                      onClick={() => handleSelectResult('matthew', 6)}
                      className="text-left p-2.5 bg-[#FAF6EE] hover:bg-[#F0E8D8] rounded-xl border border-[#DDD5C5] transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-[#1C1917] font-cinzel">Matthew 6</div>
                      <div className="text-[#8A795D] truncate text-[11px]">The Lord's Prayer</div>
                    </button>
                    <button
                      onClick={() => handleSelectResult('john', 3)}
                      className="text-left p-2.5 bg-[#FAF6EE] hover:bg-[#F0E8D8] rounded-xl border border-[#DDD5C5] transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-[#1C1917] font-cinzel">John 3</div>
                      <div className="text-[#8A795D] truncate text-[11px]">God So Loved the World</div>
                    </button>
                    <button
                      onClick={() => handleSelectResult('psalms', 23)}
                      className="text-left p-2.5 bg-[#FAF6EE] hover:bg-[#F0E8D8] rounded-xl border border-[#DDD5C5] transition-colors cursor-pointer"
                    >
                      <div className="font-semibold text-[#1C1917] font-cinzel">Psalm 23</div>
                      <div className="text-[#8A795D] truncate text-[11px]">The Lord is My Shepherd</div>
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
