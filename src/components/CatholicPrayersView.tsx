import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Cross,
  Sun,
  Flame,
  HeartHandshake
} from 'lucide-react';
import { CatholicPrayer, CATHOLIC_PRAYERS, RosaryMystery, ROSARY_MYSTERIES } from '../data/rcPrayersData';
import { LanguageCode, UI_TRANSLATIONS, JESUS_AVATAR_IMAGE_URL } from '../data/bibleData';
import { BibleSpeechController } from '../utils/speechEngine';

interface CatholicPrayersViewProps {
  speechController: BibleSpeechController;
  language: LanguageCode;
}

export const CatholicPrayersView: React.FC<CatholicPrayersViewProps> = ({
  speechController,
  language
}) => {
  // Navigation tabs within RC Prayers: 'daily' | 'rosary' | 'devotions'
  const [activeCategory, setActiveCategory] = useState<'daily' | 'rosary' | 'devotions'>('daily');
  // Filter for favorites
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  // Selected prayer for detailed view / recitation
  const [selectedPrayerId, setSelectedPrayerId] = useState<string>('our-father');
  // Copied feedback key
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  // Recitation playing state
  const [activeRecitingPrayerId, setActiveRecitingPrayerId] = useState<string | null>(null);

  // Bookmarked / Favorite Catholic Prayers
  const [bookmarkedPrayerIds, setBookmarkedPrayerIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('living_word_rc_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set(['our-father', 'hail-mary']);
    } catch {
      return new Set(['our-father', 'hail-mary']);
    }
  });

  // --- Interactive Rosary State ---
  const [selectedMysteryType, setSelectedMysteryType] = useState<'joyful' | 'luminous' | 'sorrowful' | 'glorious'>('joyful');
  const [activeDecadeIndex, setActiveDecadeIndex] = useState<number>(0); // 0 to 4 (5 decades)
  // Current bead in decade:
  // 0: Our Father, 1-10: Hail Mary (1 to 10), 11: Glory Be
  const [activeBeadIndex, setActiveBeadIndex] = useState<number>(1);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.English;

  // Save bookmarks
  const toggleBookmark = (id: string) => {
    setBookmarkedPrayerIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('living_word_rc_bookmarks', JSON.stringify(Array.from(next)));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  // Active mystery object
  const activeMystery = useMemo(() => {
    return ROSARY_MYSTERIES.find((m) => m.type === selectedMysteryType) || ROSARY_MYSTERIES[0];
  }, [selectedMysteryType]);

  // Current decade details
  const currentDecade = activeMystery.decadeList[activeDecadeIndex] || activeMystery.decadeList[0];

  // Filtered prayers list
  const filteredPrayers = useMemo(() => {
    return CATHOLIC_PRAYERS.filter((p) => {
      const categoryMatch = activeCategory === 'daily' ? p.category === 'daily' : p.category === 'devotions';
      if (showOnlyFavorites) {
        return categoryMatch && bookmarkedPrayerIds.has(p.id);
      }
      return categoryMatch;
    });
  }, [activeCategory, showOnlyFavorites, bookmarkedPrayerIds]);

  // Active selected prayer object
  const activePrayer = useMemo(() => {
    return CATHOLIC_PRAYERS.find((p) => p.id === selectedPrayerId) || CATHOLIC_PRAYERS[0];
  }, [selectedPrayerId]);

  // Get localized text for prayer
  const getPrayerText = (prayer: CatholicPrayer) => {
    if (language === 'English') return prayer.text;
    if (prayer.translations[language]) return prayer.translations[language]!;
    // Fallback if not specifically pre-translated
    return prayer.text;
  };

  // Get localized title for prayer
  const getPrayerTitle = (prayer: CatholicPrayer) => {
    if (prayer.traditionalTitles[language]) return prayer.traditionalTitles[language]!;
    return prayer.title;
  };

  // Handle Reciting a Prayer with Speech Engine
  const handleRecitePrayer = (prayer: CatholicPrayer) => {
    if (activeRecitingPrayerId === prayer.id) {
      speechController.stop();
      setActiveRecitingPrayerId(null);
    } else {
      setActiveRecitingPrayerId(prayer.id);
      const textToRecite = `${getPrayerTitle(prayer)}. ${getPrayerText(prayer)}`;
      speechController.speakCustomText(textToRecite, () => {
        setActiveRecitingPrayerId(null);
      });
    }
  };

  // Copy prayer text
  const handleCopyPrayer = (prayer: CatholicPrayer) => {
    const textToCopy = `${getPrayerTitle(prayer)}\n\n${getPrayerText(prayer)}\n\n— Roman Catholic Traditional Prayer · Living Word`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedKey(prayer.id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Recite current Rosary Bead Prayer
  const handleReciteBeadPrayer = () => {
    let beadTitle = '';
    let beadText = '';

    if (activeBeadIndex === 0) {
      const p = CATHOLIC_PRAYERS.find((p) => p.id === 'our-father');
      beadTitle = p ? getPrayerTitle(p) : 'Our Father';
      beadText = p ? getPrayerText(p) : '';
    } else if (activeBeadIndex >= 1 && activeBeadIndex <= 10) {
      const p = CATHOLIC_PRAYERS.find((p) => p.id === 'hail-mary');
      beadTitle = p ? `${getPrayerTitle(p)} (${activeBeadIndex}/10)` : `Hail Mary (Bead ${activeBeadIndex} of 10)`;
      beadText = p ? getPrayerText(p) : '';
    } else {
      const p = CATHOLIC_PRAYERS.find((p) => p.id === 'glory-be');
      beadTitle = p ? getPrayerTitle(p) : 'Glory Be to the Father';
      beadText = p ? getPrayerText(p) : '';
    }

    const fullSpoken = `${beadTitle}. ${beadText}`;
    speechController.speakCustomText(fullSpoken);
  };

  // Rosary Bead Next / Prev
  const handleNextBead = () => {
    if (activeBeadIndex < 11) {
      setActiveBeadIndex(activeBeadIndex + 1);
    } else {
      // Advance to next decade if available
      if (activeDecadeIndex < 4) {
        setActiveDecadeIndex(activeDecadeIndex + 1);
        setActiveBeadIndex(0);
      } else {
        // Complete Rosary looped
        setActiveDecadeIndex(0);
        setActiveBeadIndex(0);
      }
    }
  };

  const handlePrevBead = () => {
    if (activeBeadIndex > 0) {
      setActiveBeadIndex(activeBeadIndex - 1);
    } else if (activeDecadeIndex > 0) {
      setActiveDecadeIndex(activeDecadeIndex - 1);
      setActiveBeadIndex(11);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-7 pb-16">
      {/* Page Header Banner */}
      <div className="bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] shadow-xs p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5D76E] text-[#1C1917] flex items-center justify-center shadow-md shrink-0">
              {/* Rosary Cross Icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M11 2h2v6h6v2h-6v12h-2V10H5V8h6V2z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-sans-ui uppercase tracking-widest text-[#8A795D] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A028]" />
                <span>Catholic Liturgical & Devotional Tradition</span>
              </div>
              <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
                Roman Catholic Prayers & Holy Rosary
              </h1>
            </div>
          </div>

          {/* Favorites Filter Switch */}
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold font-sans-ui border transition-colors cursor-pointer self-start sm:self-auto ${
              showOnlyFavorites
                ? 'bg-[#EBDDB6] text-[#1C1917] border-[#D4AF37] shadow-xs'
                : 'bg-[#F4EFEA] text-[#6B5E4D] border-[#DDD5C5] hover:bg-[#EAE3D2]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-current text-[#8C6D1F]' : ''}`} />
            <span>{showOnlyFavorites ? 'Showing Favorites' : 'Filter Favorites'}</span>
          </button>
        </div>

        {/* Top Categorized Navigation Segmented Tabs */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-[#EAE3D2]">
          <button
            onClick={() => setActiveCategory('daily')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-sans-ui transition-all text-center cursor-pointer ${
              activeCategory === 'daily'
                ? 'bg-[#D4AF37] text-[#1C1917] shadow-sm'
                : 'bg-[#F5EFE6] text-[#574D3F] hover:bg-[#EAE3D2]'
            }`}
          >
            Daily & Basic Prayers
          </button>

          <button
            onClick={() => setActiveCategory('rosary')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-sans-ui transition-all text-center cursor-pointer ${
              activeCategory === 'rosary'
                ? 'bg-[#D4AF37] text-[#1C1917] shadow-sm'
                : 'bg-[#F5EFE6] text-[#574D3F] hover:bg-[#EAE3D2]'
            }`}
          >
            📿 Holy Rosary & Counter
          </button>

          <button
            onClick={() => setActiveCategory('devotions')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-sans-ui transition-all text-center cursor-pointer ${
              activeCategory === 'devotions'
                ? 'bg-[#D4AF37] text-[#1C1917] shadow-sm'
                : 'bg-[#F5EFE6] text-[#574D3F] hover:bg-[#EAE3D2]'
            }`}
          >
            Catholic Devotions
          </button>
        </div>
      </div>

      {/* --- VIEW 1 & 3: DAILY PRAYERS & DEVOTIONS (2-Column Curatorial Layout) --- */}
      {activeCategory !== 'rosary' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Prayers Index List (5 Cols) */}
          <div className="md:col-span-5 bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] shadow-xs p-4 space-y-2">
            <div className="px-3 py-2 text-xs font-sans-ui font-bold uppercase tracking-wider text-[#8A795D] border-b border-[#EAE3D2]">
              {activeCategory === 'daily' ? 'Traditional Catholic Prayers' : 'Sacred Catholic Devotions'}
            </div>

            {filteredPrayers.length === 0 ? (
              <div className="p-6 text-center text-xs font-lora text-[#8A795D]">
                No bookmarked prayers found in this category. Click the bookmark icon on any prayer to save it.
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[560px] overflow-y-auto pr-1">
                {filteredPrayers.map((prayer) => {
                  const isSelected = selectedPrayerId === prayer.id;
                  const isBookmarked = bookmarkedPrayerIds.has(prayer.id);
                  const isReciting = activeRecitingPrayerId === prayer.id;

                  return (
                    <div
                      key={prayer.id}
                      onClick={() => setSelectedPrayerId(prayer.id)}
                      className={`group p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                        isSelected
                          ? 'bg-[#FAF3DC] border-[#D4AF37] shadow-2xs'
                          : 'bg-[#FAF7F0] hover:bg-[#F4EFEA] border-transparent'
                      }`}
                    >
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="font-cinzel text-xs sm:text-sm font-bold text-[#1C1917] truncate">
                          {getPrayerTitle(prayer)}
                        </div>
                        {prayer.latinSubtitle && (
                          <div className="text-[11px] font-lora italic text-[#8A795D] truncate">
                            {prayer.latinSubtitle}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleBookmark(prayer.id)}
                          className="p-1.5 rounded-md hover:bg-[#EAE3D2] text-[#8A795D] transition-colors"
                          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Prayer'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-[#8C6D1F]' : ''}`} />
                        </button>

                        <button
                          onClick={() => handleRecitePrayer(prayer)}
                          className={`p-1.5 rounded-md transition-colors ${
                            isReciting
                              ? 'bg-[#D4AF37] text-[#1C1917]'
                              : 'hover:bg-[#EAE3D2] text-[#8C6D1F]'
                          }`}
                          title="Listen to Recitation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Detailed Prayer Reader & Spoken Card (7 Cols) */}
          <div className="md:col-span-7 bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] shadow-xs p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div className="border-b border-[#EAE3D2] pb-4 flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-sans-ui uppercase tracking-widest text-[#8A795D] font-bold">
                  {activePrayer.latinSubtitle || 'Roman Catholic Rite'}
                </div>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C1917] mt-1">
                  {getPrayerTitle(activePrayer)}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(activePrayer.id)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    bookmarkedPrayerIds.has(activePrayer.id)
                      ? 'bg-[#EBDDB6] text-[#785E1A] border-[#D4AF37]'
                      : 'bg-[#F4EFEA] hover:bg-[#EAE3D2] text-[#5A4E3E] border-[#DDD5C5]'
                  }`}
                  title="Bookmark Prayer"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedPrayerIds.has(activePrayer.id) ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={() => handleCopyPrayer(activePrayer)}
                  className="p-2 rounded-xl bg-[#F4EFEA] hover:bg-[#EAE3D2] text-[#5A4E3E] border border-[#DDD5C5] transition-colors cursor-pointer"
                  title="Copy Prayer Text"
                >
                  {copiedKey === activePrayer.id ? (
                    <Check className="w-4 h-4 text-green-700" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Main Spoken CTA */}
            <div className="bg-gradient-to-r from-[#FAF3DC] to-[#F5EFE0] rounded-xl border border-[#D4AF37]/50 p-4 sm:p-5 flex items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#D4AF37] to-[#F5D76E] shadow-sm shrink-0">
                  <img
                    src={JESUS_AVATAR_IMAGE_URL}
                    alt="Jesus Christ Portrait"
                    className={`w-full h-full object-cover object-center rounded-full ${
                      activeRecitingPrayerId === activePrayer.id ? 'animate-avatar-breathe' : ''
                    }`}
                  />
                </div>
                <div>
                  <div className="text-xs font-bold font-sans-ui text-[#1C1917]">
                    Sacred Audio Recitation
                  </div>
                  <div className="text-[11px] font-sans-ui text-[#7D705C]">
                    {activeRecitingPrayerId === activePrayer.id
                      ? 'Reciting prayer aloud in selected language...'
                      : 'Listen to this sacred prayer out loud'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRecitePrayer(activePrayer)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#1C1917] font-sans-ui font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                {activeRecitingPrayerId === activePrayer.id ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Stop Recitation</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 fill-current" />
                    <span>Recite Prayer</span>
                  </>
                )}
              </button>
            </div>

            {/* Sacred Prayer Body Text */}
            <div className="bg-[#FAF7F0] rounded-xl border border-[#EAE3D2] p-5 sm:p-6 shadow-inner">
              <p className="font-lora text-base sm:text-lg text-[#2C2416] leading-relaxed whitespace-pre-line selection:bg-[#EBDDB6]">
                {getPrayerText(activePrayer)}
              </p>

              {/* Subdued English text if viewing in other languages */}
              {language !== 'English' && activePrayer.translations[language] && (
                <div className="mt-4 pt-4 border-t border-[#EAE3D2]/70 text-xs sm:text-sm font-lora italic text-[#7D705C] leading-relaxed whitespace-pre-line">
                  {activePrayer.text}
                </div>
              )}
            </div>

            {/* Catholic Significance Note */}
            <div className="text-xs font-sans-ui text-[#7D705C] bg-[#F5EFE6] p-3.5 rounded-lg border border-[#DDD4C1] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A028] shrink-0 mt-0.5" />
              <span>
                <strong>Spiritual Significance:</strong> {activePrayer.significance}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* --- VIEW 2: HOLY ROSARY (Interactive 4 Mysteries & Bead Counter) --- */}
      {activeCategory === 'rosary' && (
        <div className="space-y-6">
          {/* Mystery Selector Tabs (Joyful, Luminous, Sorrowful, Glorious) */}
          <div className="bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] shadow-xs p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE3D2] pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8A795D] font-bold font-sans-ui">
                  The Most Holy Rosary of the Blessed Virgin Mary
                </span>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C1917] mt-0.5">
                  {language === 'Hindi'
                    ? activeMystery.hindiName
                    : language === 'Assamese'
                    ? activeMystery.assameseName
                    : language === 'Spanish'
                    ? activeMystery.spanishName
                    : activeMystery.name}
                </h2>
              </div>
              <div className="text-xs font-sans-ui text-[#7D705C] bg-[#F4EFEA] px-3 py-1.5 rounded-lg border border-[#DDD4C1] self-start sm:self-auto">
                Recommended: <strong>{activeMystery.dayRecommended}</strong>
              </div>
            </div>

            {/* 4 Mystery Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              {ROSARY_MYSTERIES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMysteryType(m.type);
                    setActiveDecadeIndex(0);
                    setActiveBeadIndex(1);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMysteryType === m.type
                      ? 'bg-[#FAF3DC] border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-xs'
                      : 'bg-[#FAF7F0] hover:bg-[#F4EFEA] border-[#DDD5C5]'
                  }`}
                >
                  <div className="text-xs font-bold font-cinzel text-[#1C1917]">
                    {language === 'Hindi'
                      ? m.hindiName
                      : language === 'Assamese'
                      ? m.assameseName
                      : language === 'Spanish'
                      ? m.spanishName
                      : m.name}
                  </div>
                  <div className="text-[10px] font-sans-ui text-[#8A795D] mt-0.5">
                    {m.dayRecommended}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Rosary Bead Counter Card */}
          <div className="bg-[#FDFBF7] rounded-2xl border-2 border-[#D4AF37]/70 shadow-md p-6 sm:p-8 space-y-6">
            {/* Decade Selector Strip (Decades 1 to 5) */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAE3D2] pb-4">
              <span className="text-xs font-sans-ui font-bold uppercase tracking-wider text-[#8A795D]">
                Select Decade (1–5)
              </span>

              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveDecadeIndex(idx);
                      setActiveBeadIndex(1);
                    }}
                    className={`w-9 h-9 rounded-lg text-xs font-bold font-sans-ui transition-all cursor-pointer ${
                      activeDecadeIndex === idx
                        ? 'bg-[#D4AF37] text-[#1C1917] shadow-sm'
                        : 'bg-[#F5EFE6] text-[#6B5E4D] hover:bg-[#EAE3D2]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Decade Scripture Meditation Banner */}
            <div className="bg-[#FAF7F0] rounded-xl border border-[#EAE3D2] p-5 sm:p-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-sans-ui">
                <span className="font-bold text-[#8C6D1F] uppercase tracking-wider">
                  Decade {currentDecade.decadeNumber} of 5 · {currentDecade.scriptureReference}
                </span>
                <span className="text-[#8A795D] italic">
                  Fruit of the Mystery: <strong>{currentDecade.fruit}</strong>
                </span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#1C1917]">
                {language === 'Hindi'
                  ? currentDecade.hindiTitle
                  : language === 'Assamese'
                  ? currentDecade.assameseTitle
                  : language === 'Spanish'
                  ? currentDecade.spanishTitle
                  : currentDecade.title}
              </h3>
              <p className="font-lora text-sm sm:text-base text-[#4A3F31] italic leading-relaxed">
                "{currentDecade.meditation}"
              </p>
            </div>

            {/* Visual Interactive Rosary Bead Counter */}
            <div className="bg-[#F8F4EA] rounded-2xl p-6 sm:p-8 border border-[#E5DCB8] text-center space-y-6">
              <div className="text-xs font-sans-ui uppercase tracking-widest text-[#8A795D] font-bold">
                Decade {currentDecade.decadeNumber} Bead Counter
              </div>

              {/* Rosary Beads Display */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3">
                {/* 1. Large Bead: Our Father (Bead Index 0) */}
                <button
                  onClick={() => setActiveBeadIndex(0)}
                  title="Large Bead: Our Father (Pater Noster)"
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 flex flex-col items-center justify-center text-xs font-bold transition-all cursor-pointer shadow-sm ${
                    activeBeadIndex === 0
                      ? 'bg-[#D4AF37] border-[#8C6D1F] text-[#1C1917] scale-110 ring-4 ring-[#D4AF37]/30'
                      : 'bg-[#EBDDB6] border-[#C5A028] text-[#5A4E3E] hover:scale-105'
                  }`}
                >
                  <Cross className="w-3.5 h-3.5" />
                  <span className="text-[9px] -mt-0.5">OF</span>
                </button>

                <div className="w-2 h-[2px] bg-[#D4AF37]/50" />

                {/* 2. 10 Small Beads: Hail Mary (Bead Index 1 to 10) */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bNum) => (
                  <button
                    key={bNum}
                    onClick={() => setActiveBeadIndex(bNum)}
                    title={`Bead ${bNum} of 10: Hail Mary`}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                      activeBeadIndex === bNum
                        ? 'bg-[#D4AF37] border-[#8C6D1F] text-[#1C1917] scale-115 ring-4 ring-[#D4AF37]/40'
                        : activeBeadIndex > bNum
                        ? 'bg-[#C5A028] border-[#A38018] text-[#FAF7F0]'
                        : 'bg-[#FAF7F0] border-[#DDD4C1] text-[#7D705C] hover:bg-[#EAE3D2]'
                    }`}
                  >
                    {bNum}
                  </button>
                ))}

                <div className="w-2 h-[2px] bg-[#D4AF37]/50" />

                {/* 3. Closing Bead: Glory Be / Fatima Prayer (Bead Index 11) */}
                <button
                  onClick={() => setActiveBeadIndex(11)}
                  title="Glory Be to the Father & Fatima Prayer"
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 flex flex-col items-center justify-center text-xs font-bold transition-all cursor-pointer shadow-sm ${
                    activeBeadIndex === 11
                      ? 'bg-[#D4AF37] border-[#8C6D1F] text-[#1C1917] scale-110 ring-4 ring-[#D4AF37]/30'
                      : 'bg-[#EBDDB6] border-[#C5A028] text-[#5A4E3E] hover:scale-105'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[9px] -mt-0.5">GB</span>
                </button>
              </div>

              {/* Active Bead Prayer Description */}
              <div className="bg-[#FDFBF7] rounded-xl p-4 border border-[#E3DAC8] max-w-md mx-auto shadow-2xs">
                <div className="font-cinzel text-base font-bold text-[#1C1917]">
                  {activeBeadIndex === 0
                    ? 'Our Father (Pater Noster)'
                    : activeBeadIndex >= 1 && activeBeadIndex <= 10
                    ? `Hail Mary — Bead ${activeBeadIndex} of 10`
                    : 'Glory Be to the Father & Fatima Prayer'}
                </div>
                <p className="font-lora text-xs sm:text-sm text-[#7D705C] italic mt-1">
                  {activeBeadIndex === 0
                    ? '"Our Father, who art in heaven, hallowed be thy name..."'
                    : activeBeadIndex >= 1 && activeBeadIndex <= 10
                    ? '"Hail Mary, full of grace, the Lord is with thee..."'
                    : '"Glory be to the Father, and to the Son, and to the Holy Spirit..."'}
                </p>
              </div>

              {/* Bead Step Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handlePrevBead}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#F4EFEA] hover:bg-[#EAE3D2] border border-[#DDD5C5] rounded-xl text-xs font-semibold text-[#574D3F] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Bead</span>
                </button>

                <button
                  onClick={handleReciteBeadPrayer}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#1C1917] font-sans-ui font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Recite Bead Prayer</span>
                </button>

                <button
                  onClick={handleNextBead}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#F4EFEA] hover:bg-[#EAE3D2] border border-[#DDD5C5] rounded-xl text-xs font-semibold text-[#574D3F] transition-colors cursor-pointer"
                >
                  <span>Next Bead</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List of All 5 Decades for Reference */}
            <div className="space-y-3 pt-4 border-t border-[#EAE3D2]">
              <div className="text-xs font-sans-ui font-bold uppercase tracking-wider text-[#8A795D]">
                All 5 Decades of {activeMystery.name}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeMystery.decadeList.map((dec, idx) => (
                  <button
                    key={dec.decadeNumber}
                    onClick={() => {
                      setActiveDecadeIndex(idx);
                      setActiveBeadIndex(1);
                    }}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer flex items-start gap-2.5 ${
                      activeDecadeIndex === idx
                        ? 'bg-[#FAF3DC] border-[#D4AF37] shadow-2xs'
                        : 'bg-[#FAF7F0] hover:bg-[#F4EFEA] border-[#DDD5C5]'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-[#EBDDB6] text-[#1C1917] text-xs font-bold flex items-center justify-center shrink-0">
                      {dec.decadeNumber}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-cinzel text-xs font-bold text-[#1C1917] truncate">
                        {language === 'Hindi'
                          ? dec.hindiTitle
                          : language === 'Assamese'
                          ? dec.assameseTitle
                          : language === 'Spanish'
                          ? dec.spanishTitle
                          : dec.title}
                      </div>
                      <div className="text-[11px] font-sans-ui text-[#8A795D]">
                        {dec.scriptureReference} · Fruit: {dec.fruit}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
