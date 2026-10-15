import React from 'react';
import { BookOpen, Sparkles, Bookmark, Settings, Tv } from 'lucide-react';
import { UI_TRANSLATIONS, LanguageCode } from '../data/bibleData';

interface BottomNavProps {
  currentTab: 'reader' | 'videos' | 'blessing' | 'prayers' | 'bookmarks' | 'settings';
  setCurrentTab: (tab: 'reader' | 'videos' | 'blessing' | 'prayers' | 'bookmarks' | 'settings') => void;
  language: LanguageCode;
  bookmarksCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  setCurrentTab,
  language,
  bookmarksCount
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.English;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#EAE3D2] px-1 py-1.5 shadow-lg">
      <div className="grid grid-cols-6 gap-0.5 max-w-lg mx-auto">
        {/* Tab 1: Read Bible */}
        <button
          onClick={() => setCurrentTab('reader')}
          className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'reader'
              ? 'text-[#1C1917] font-bold bg-[#F4EFEA]'
              : 'text-[#7D705C] hover:text-[#1C1917]'
          }`}
        >
          <BookOpen className={`w-4 h-4 ${currentTab === 'reader' ? 'text-[#C5A028]' : ''}`} />
          <span className="text-[9px] font-sans-ui mt-0.5 truncate w-full text-center">
            {t.readBible}
          </span>
        </button>

        {/* Tab 2: 📺 Bible Videos */}
        <button
          onClick={() => setCurrentTab('videos')}
          className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'videos'
              ? 'text-[#1C1917] font-bold bg-[#F4EFEA]'
              : 'text-[#7D705C] hover:text-[#1C1917]'
          }`}
        >
          <span className="text-sm leading-none">📺</span>
          <span className="text-[9px] font-sans-ui mt-0.5 truncate w-full text-center">
            Videos
          </span>
        </button>

        {/* Tab 2: RC Prayers (📿 Catholic Prayers) */}
        <button
          onClick={() => setCurrentTab('prayers')}
          className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'prayers'
              ? 'text-[#1C1917] font-bold bg-[#F4EFEA]'
              : 'text-[#7D705C] hover:text-[#1C1917]'
          }`}
        >
          <span className="text-base leading-none">📿</span>
          <span className="text-[9px] font-sans-ui mt-0.5 truncate w-full text-center">
            {t.rcPrayers || 'RC Prayers'}
          </span>
        </button>

        {/* Tab 3: Daily Blessing */}
        <button
          onClick={() => setCurrentTab('blessing')}
          className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'blessing'
              ? 'text-[#1C1917] font-bold bg-[#F4EFEA]'
              : 'text-[#7D705C] hover:text-[#1C1917]'
          }`}
        >
          <Sparkles className={`w-4.5 h-4.5 ${currentTab === 'blessing' ? 'text-[#C5A028]' : ''}`} />
          <span className="text-[9px] font-sans-ui mt-0.5 truncate w-full text-center">
            {t.dailyBlessing}
          </span>
        </button>

        {/* Tab 4: Bookmarks & Notes */}
        <button
          onClick={() => setCurrentTab('bookmarks')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'bookmarks'
              ? 'text-[#1C1917] font-bold bg-[#F4EFEA]'
              : 'text-[#7D705C] hover:text-[#1C1917]'
          }`}
        >
          <Bookmark className={`w-4.5 h-4.5 ${currentTab === 'bookmarks' ? 'text-[#C5A028] fill-[#D4AF37]/30' : ''}`} />
          <span className="text-[9px] font-sans-ui mt-0.5 truncate w-full text-center">
            {t.bookmarks}
          </span>
          {bookmarksCount > 0 && (
            <span className="absolute top-0.5 right-2 w-3.5 h-3.5 rounded-full bg-[#D4AF37] text-[#1C1917] text-[8px] font-bold flex items-center justify-center">
              {bookmarksCount}
            </span>
          )}
        </button>

        {/* Tab 5: Audio Settings */}
        <button
          onClick={() => setCurrentTab('settings')}
          className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'settings'
              ? 'text-[#1C1917] font-bold bg-[#F4EFEA]'
              : 'text-[#7D705C] hover:text-[#1C1917]'
          }`}
        >
          <Settings className={`w-4.5 h-4.5 ${currentTab === 'settings' ? 'text-[#C5A028]' : ''}`} />
          <span className="text-[9px] font-sans-ui mt-0.5 truncate w-full text-center">
            {t.audioSettings}
          </span>
        </button>
      </div>
    </nav>
  );
};
