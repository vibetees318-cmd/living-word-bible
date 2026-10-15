import React from 'react';
import { BookOpen, Sparkles, Tv } from 'lucide-react';
import { UI_TRANSLATIONS, LanguageCode } from '../data/bibleData';

interface BottomNavProps {
  currentTab: 'reader' | 'videos' | 'blessing' | 'prayers' | 'bookmarks' | 'settings';
  setCurrentTab: (tab: 'reader' | 'videos' | 'blessing' | 'prayers' | 'bookmarks' | 'settings') => void;
  language: LanguageCode;
  bookmarksCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  setCurrentTab,
  language
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.English;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#EAE3D2] px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
        {/* Tab 1: 📖 Read Bible */}
        <button
          onClick={() => setCurrentTab('reader')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'reader'
              ? 'text-[#1C1917] font-bold bg-[#F4EFEA] shadow-2xs'
              : 'text-[#7D705C] hover:text-[#1C1917]'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${currentTab === 'reader' ? 'text-[#C5A028]' : ''}`} />
          <span className="text-[10px] font-sans-ui font-medium mt-1 truncate w-full text-center">
            {t.readBible}
          </span>
        </button>

        {/* Tab 2: 📺 Videos */}
        <button
          onClick={() => setCurrentTab('videos')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'videos'
              ? 'text-[#1C1917] font-bold bg-[#F4EFEA] shadow-2xs'
              : 'text-[#7D705C] hover:text-[#1C1917]'
          }`}
        >
          <div className="relative">
            <Tv className={`w-5 h-5 ${currentTab === 'videos' ? 'text-[#C5A028]' : ''}`} />
          </div>
          <span className="text-[10px] font-sans-ui font-medium mt-1 truncate w-full text-center">
            Videos
          </span>
        </button>

        {/* Tab 3: ✝️ RC Prayers */}
        <button
          onClick={() => setCurrentTab('prayers')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'prayers'
              ? 'text-[#1C1917] font-bold bg-[#F4EFEA] shadow-2xs'
              : 'text-[#7D705C] hover:text-[#1C1917]'
          }`}
        >
          <span className="text-base leading-none">✝️</span>
          <span className="text-[10px] font-sans-ui font-medium mt-1 truncate w-full text-center">
            {t.rcPrayers || 'RC Prayers'}
          </span>
        </button>

        {/* Tab 4: ✨ Daily Blessing */}
        <button
          onClick={() => setCurrentTab('blessing')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'blessing'
              ? 'text-[#1C1917] font-bold bg-[#F4EFEA] shadow-2xs'
              : 'text-[#7D705C] hover:text-[#1C1917]'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${currentTab === 'blessing' ? 'text-[#C5A028]' : ''}`} />
          <span className="text-[10px] font-sans-ui font-medium mt-1 truncate w-full text-center">
            {t.dailyBlessing}
          </span>
        </button>
      </div>
    </nav>
  );
};

