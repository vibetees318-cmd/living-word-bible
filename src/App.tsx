/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Header } from './components/Header';
import { JesusAvatar } from './components/JesusAvatar';
import { BibleBrowser } from './components/BibleBrowser';
import { BibleReader } from './components/BibleReader';
import { DailyBlessingView } from './components/DailyBlessingView';
import { CatholicPrayersView } from './components/CatholicPrayersView';
import { BookmarksView, SavedBookmark } from './components/BookmarksView';
import { AudioSettingsView } from './components/AudioSettingsView';
import { BibleVideosView } from './components/BibleVideosView';
import { VerseShareModal } from './components/VerseShareModal';
import { AboutDeveloperModal } from './components/AboutDeveloperModal';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { BIBLE_BOOKS, getChapterContent, Verse, ChapterData, LanguageCode, JESUS_AVATAR_IMAGE_URL } from './data/bibleData';
import { BibleSpeechController, isNativeScript } from './utils/speechEngine';
import { fetchLiveChapter, translateChapterVerses, translateSingleText, getVerseNativeText } from './services/bibleApi';
import jesusPortrait from './assets/images/jesus_portrait.jpg';

// High-definition public portrait image URL of Jesus Christ
export { JESUS_AVATAR_IMAGE_URL };

// Initial preloaded sacred bookmarks
const INITIAL_BOOKMARKS: SavedBookmark[] = [
  {
    key: 'Matthew-5-3',
    book: 'Matthew',
    chapter: 5,
    verse: {
      verseNumber: 3,
      text: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven.',
      hindiText: 'धन्य हैं वे जो मन के दीन हैं, क्योंकि स्वर्ग का राज्य उन्हीं का है।',
      assameseText: 'ধন্য সেই আত্মাত দৰিদ্ৰসকল, কিয়নো স্বৰ্গৰাজ্য তেওঁলোকৰেই।',
      spanishText: 'Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos.'
    },
    note: 'The opening beatitude of grace and humility.',
    savedAt: 'Devotional Selection'
  },
  {
    key: 'John-3-16',
    book: 'John',
    chapter: 3,
    verse: {
      verseNumber: 16,
      text: 'For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life.',
      hindiText: 'क्योंकि परमेश्वर ने जगत से ऐसा प्रेम रखा कि उसने अपना एकलौता पुत्र दे दिया...',
      assameseText: 'কিয়নো ঈশ্বৰে জগতক ইমান প্ৰেম কৰিলে যে, তেওঁ নিজৰ একমাত্ৰ পুত্ৰক দান কৰিলে...',
      spanishText: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito...'
    },
    note: 'The core declaration of God\'s boundless eternal love.',
    savedAt: 'Core Scripture'
  }
];

export default function App() {
  // Navigation & Tab State
  const [currentTab, setCurrentTab] = useState<'reader' | 'videos' | 'blessing' | 'prayers' | 'bookmarks' | 'settings'>('reader');

  // Jesus Christ Sacred Portrait State (reverent portrait of Jesus Christ)
  const [avatarImageUrl, setAvatarImageUrl] = useState<string>(jesusPortrait || JESUS_AVATAR_IMAGE_URL);

  // Scripture Navigation State
  const [selectedTestament, setSelectedTestament] = useState<'Old' | 'New'>('New');
  const [selectedBookId, setSelectedBookId] = useState<string>('matthew');
  const [selectedChapter, setSelectedChapter] = useState<number>(5);

  // Appearance & Audio Preference State
  const [language, setLanguage] = useState<LanguageCode>('English');
  const [speed, setSpeed] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(0.95);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('medium');
  const [fontFamily, setFontFamily] = useState<'cormorant' | 'lora'>('cormorant');
  const [theme, setTheme] = useState<'parchment' | 'alabaster' | 'night'>('parchment');

  // Speech & Narration Engine State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeVerseIndex, setActiveVerseIndex] = useState<number | null>(null);
  const [activeVerseText, setActiveVerseText] = useState<string>('');

  // Live Chapter Data State & Loading State
  const [chapterData, setChapterData] = useState<ChapterData>(() => getChapterContent(selectedBookId, selectedChapter));
  const [isLoadingChapter, setIsLoadingChapter] = useState(false);

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<SavedBookmark[]>(() => {
    try {
      const saved = localStorage.getItem('living_word_bookmarks');
      return saved ? JSON.parse(saved) : INITIAL_BOOKMARKS;
    } catch {
      return INITIAL_BOOKMARKS;
    }
  });

  // Share Modal State
  const [shareModalVerse, setShareModalVerse] = useState<{ verse: Verse; book: string; chapter: number } | null>(null);

  // About Developer Modal State
  const [aboutDeveloperOpen, setAboutDeveloperOpen] = useState(false);

  // Initialize Speech Engine Controller
  const speechControllerRef = useRef<BibleSpeechController | null>(null);
  if (!speechControllerRef.current) {
    speechControllerRef.current = new BibleSpeechController();
  }
  const speechController = speechControllerRef.current;

  // Active Book Info
  const currentBookInfo = useMemo(() => {
    return BIBLE_BOOKS.find(b => b.id.toLowerCase() === selectedBookId.toLowerCase()) || BIBLE_BOOKS[0];
  }, [selectedBookId]);

  // Localized active book name
  const localizedBookName = useMemo(() => {
    return currentBookInfo.localizedNames?.[language] || currentBookInfo.name;
  }, [currentBookInfo, language]);

  // Load Scripture from Live Bible API (bible-api.com) & Translate
  useEffect(() => {
    let isCancelled = false;

    async function loadLiveScripture() {
      setIsLoadingChapter(true);
      try {
        // Step 1: Fetch live scripture from open API
        const rawChapter = await fetchLiveChapter(selectedBookId, selectedChapter);
        if (isCancelled) return;

        // Step 2: Translate verses into target language
        const translatedVerses = await translateChapterVerses(
          selectedBookId,
          selectedChapter,
          rawChapter.verses,
          language
        );
        if (isCancelled) return;

        setChapterData({
          ...rawChapter,
          verses: translatedVerses
        });
      } catch (err) {
        console.warn('Error fetching or translating live chapter:', err);
        // Fallback to local chapter
        if (!isCancelled) {
          setChapterData(getChapterContent(selectedBookId, selectedChapter));
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingChapter(false);
        }
      }
    }

    loadLiveScripture();

    return () => {
      isCancelled = true;
    };
  }, [selectedBookId, selectedChapter, language]);

  // Save Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('living_word_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [bookmarks]);

  // Sync Speech Engine with callbacks and settings
  useEffect(() => {
    speechController.setLanguage(language);
    speechController.setRate(speed);
    speechController.setPitch(pitch);

    speechController.setCallbacks({
      onStartVerse: (idx, text) => {
        setActiveVerseIndex(idx);
        setActiveVerseText(text);
      },
      onEndVerse: () => {
        // verse ended
      },
      onFinishChapter: () => {
        setActiveVerseIndex(null);
        setActiveVerseText('');
        setIsSpeaking(false);
        setIsPaused(false);
      },
      onStateChange: (speaking, paused) => {
        setIsSpeaking(speaking);
        setIsPaused(paused);
        if (!speaking) {
          setActiveVerseIndex(null);
        }
      }
    });
  }, [language, speed, pitch, speechController]);

  // Stop speech when navigating away from reader
  useEffect(() => {
    if (currentTab !== 'reader') {
      speechController.stop();
      setIsSpeaking(false);
      setActiveVerseIndex(null);
    }
  }, [currentTab]);

  // Stop speech and scroll to top when chapter changes
  useEffect(() => {
    speechController.stop();
    setIsSpeaking(false);
    setActiveVerseIndex(null);
    setActiveVerseText('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedBookId, selectedChapter]);

  // Handle "Speak This Page" Action with native language text
  const handleSpeakPage = async () => {
    if (isSpeaking && !isPaused) {
      speechController.pause();
    } else if (isSpeaking && isPaused) {
      speechController.resume();
    } else {
      let currentVerses = chapterData.verses;

      // 3. Dynamic Scripture Translation: Ensure scripture text string is in the selected native script
      if (language !== 'English') {
        const needsTranslation = currentVerses.some(v => {
          const native = getVerseNativeText(v, language);
          return !native || !isNativeScript(native, language);
        });

        if (needsTranslation) {
          setIsLoadingChapter(true);
          try {
            currentVerses = await translateChapterVerses(
              selectedBookId,
              selectedChapter,
              currentVerses,
              language
            );
            setChapterData(prev => ({
              ...prev,
              verses: currentVerses
            }));
          } catch (err) {
            console.warn('Could not complete chapter translation before speech:', err);
          } finally {
            setIsLoadingChapter(false);
          }
        }
      }

      // Build verses list with verified native script text (Devanagari, Assamese, Bengali, Tamil, etc.)
      const localizedVerses = currentVerses.map((v) => ({
        verseNumber: v.verseNumber,
        text: getVerseNativeText(v, language)
      }));

      speechController.speakChapter(localizedVerses, 0);
    }
  };

  const handlePauseResume = () => {
    if (isPaused) {
      speechController.resume();
    } else {
      speechController.pause();
    }
  };

  const handleReplay10s = () => {
    speechController.replay10s();
  };

  // Click on individual verse to recite immediately in active language
  const handleSelectVerse = async (verseIndex: number, textToSpeak: string) => {
    setActiveVerseIndex(verseIndex);

    let nativeText = textToSpeak;
    // Ensure the scripture text string is in the selected native script before triggering speech
    if (language !== 'English') {
      const verse = chapterData.verses[verseIndex];
      const existing = verse ? getVerseNativeText(verse, language) : textToSpeak;

      if (existing && isNativeScript(existing, language)) {
        nativeText = existing;
      } else {
        // Dynamically translate on-the-fly to native script instead of passing English text to a regional voice
        nativeText = await translateSingleText(textToSpeak, language);
        if (verse) {
          verse.translatedText = nativeText;
          setChapterData(prev => ({ ...prev }));
        }
      }
    }

    setActiveVerseText(nativeText);
    speechController.speakSingleVerse(nativeText, verseIndex);
  };

  // Toggle Bookmark
  const handleToggleBookmark = (verse: Verse, book: string, chapter: number) => {
    const key = `${book}-${chapter}-${verse.verseNumber}`;
    setBookmarks(prev => {
      const exists = prev.some(b => b.key === key);
      if (exists) {
        return prev.filter(b => b.key !== key);
      } else {
        return [
          {
            key,
            book,
            chapter,
            verse,
            savedAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
          },
          ...prev
        ];
      }
    });
  };

  const handleRemoveBookmark = (key: string) => {
    setBookmarks(prev => prev.filter(b => b.key !== key));
  };

  const handleUpdateNote = (key: string, note: string) => {
    setBookmarks(prev => prev.map(b => b.key === key ? { ...b, note } : b));
  };

  const handleShareVerse = (verse: Verse, book: string, chapter: number) => {
    setShareModalVerse({ verse, book, chapter });
  };

  const handleSelectBookAndChapter = (bookId: string, chapter: number) => {
    const book = BIBLE_BOOKS.find(b => b.id.toLowerCase() === bookId.toLowerCase());
    if (book) {
      setSelectedTestament(book.testament);
      setSelectedBookId(book.id);
      setSelectedChapter(chapter);
      setCurrentTab('reader');
    }
  };

  // Set of bookmarked keys for rapid lookup
  const bookmarkedKeys = useMemo(() => {
    return new Set(bookmarks.map(b => b.key));
  }, [bookmarks]);

  // Dynamic Theme Wrapper Classes
  const themeClasses = {
    parchment: 'bg-[#FDFBF7] text-[#2C2C2C]',
    alabaster: 'bg-[#FBFBFA] text-[#1E1E1E]',
    night: 'bg-[#181614] text-[#E5DCB8]'
  }[theme];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 font-sans-ui ${themeClasses}`}>
      {/* Top Header / App Bar with Language Selector & Scripture Search */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        onSelectBookAndChapter={handleSelectBookAndChapter}
        onOpenAboutDeveloper={() => setAboutDeveloperOpen(true)}
      />

      {/* Main Responsive Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-12">
        {currentTab === 'reader' && (
          <>
            {/* HERO SECTION — INTERACTIVE SACRED SCRIPTURE PLAYER */}
            <JesusAvatar
              avatarImageUrl={avatarImageUrl}
              isSpeaking={isSpeaking}
              isPaused={isPaused}
              activeVerseText={activeVerseText}
              activeVerseNumber={activeVerseIndex !== null ? chapterData.verses[activeVerseIndex]?.verseNumber : undefined}
              currentBookName={localizedBookName}
              currentChapter={selectedChapter}
              language={language}
              speed={speed}
              setSpeed={setSpeed}
              pitch={pitch}
              setPitch={setPitch}
              onSpeakPage={handleSpeakPage}
              onPauseResume={handlePauseResume}
              onReplay10s={handleReplay10s}
            />

            {/* BIBLE BROWSER & NAVIGATION BAR (All 66 Books) */}
            <BibleBrowser
              selectedTestament={selectedTestament}
              setSelectedTestament={setSelectedTestament}
              selectedBookId={selectedBookId}
              setSelectedBookId={setSelectedBookId}
              selectedChapter={selectedChapter}
              setSelectedChapter={setSelectedChapter}
              language={language}
            />

            {/* DYNAMIC BIBLE READER (Live API + Skeleton Loading + Multilingual) */}
            <BibleReader
              chapterData={chapterData}
              activeVerseIndex={activeVerseIndex}
              language={language}
              fontSize={fontSize}
              fontFamily={fontFamily}
              bookmarkedVerseKeys={bookmarkedKeys}
              isLoading={isLoadingChapter}
              onSelectVerse={handleSelectVerse}
              onToggleBookmark={handleToggleBookmark}
              onShareVerse={handleShareVerse}
            />
          </>
        )}

        {currentTab === 'videos' && (
          <BibleVideosView
            language={language}
            onReadInBible={handleSelectBookAndChapter}
          />
        )}

        {currentTab === 'prayers' && (
          <CatholicPrayersView
            speechController={speechController}
            language={language}
          />
        )}

        {currentTab === 'blessing' && (
          <DailyBlessingView
            speechController={speechController}
            language={language}
            onReadInBible={handleSelectBookAndChapter}
          />
        )}

        {currentTab === 'bookmarks' && (
          <BookmarksView
            bookmarks={bookmarks}
            language={language}
            onRemoveBookmark={handleRemoveBookmark}
            onUpdateNote={handleUpdateNote}
            onSpeakVerse={(text) => speechController.speakCustomText(text)}
            onNavigateToChapter={(bookName, chapter) => {
              const book = BIBLE_BOOKS.find(b => b.name.toLowerCase() === bookName.toLowerCase());
              if (book) {
                handleSelectBookAndChapter(book.id, chapter);
              }
            }}
          />
        )}

        {currentTab === 'settings' && (
          <AudioSettingsView
            language={language}
            setLanguage={setLanguage}
            speed={speed}
            setSpeed={setSpeed}
            pitch={pitch}
            setPitch={setPitch}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            theme={theme}
            setTheme={setTheme}
          />
        )}
      </main>

      {/* Sacred App Footer with Developer Credits & Vibe Tees Branding */}
      <Footer
        onOpenAboutDeveloper={() => setAboutDeveloperOpen(true)}
        onNavigateTab={setCurrentTab}
      />

      {/* Share Verse Modal Dialog */}
      {shareModalVerse && (
        <VerseShareModal
          verse={shareModalVerse.verse}
          book={shareModalVerse.book}
          chapter={shareModalVerse.chapter}
          onClose={() => setShareModalVerse(null)}
        />
      )}

      {/* About Developer Modal Dialog */}
      <AboutDeveloperModal
        isOpen={aboutDeveloperOpen}
        onClose={() => setAboutDeveloperOpen(false)}
      />

      {/* Responsive Bottom Navigation Bar for Mobile */}
      <BottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        bookmarksCount={bookmarks.length}
      />
    </div>
  );
}
