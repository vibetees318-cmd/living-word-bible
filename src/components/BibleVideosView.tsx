import React, { useState, useMemo, useEffect } from 'react';
import { Play, Search, Filter, BookOpen, Clock, Tag, X, Sparkles, ExternalLink, Share2, Check } from 'lucide-react';
import { BIBLE_VIDEOS, BIBLE_VIDEO_CATEGORIES, BibleVideo } from '../data/bibleVideosData';
import { LanguageCode } from '../data/bibleData';

interface BibleVideosViewProps {
  onReadInBible?: (bookId: string, chapter: number) => void;
  language?: LanguageCode;
}

export const BibleVideosView: React.FC<BibleVideosViewProps> = ({
  onReadInBible,
  language = 'English'
}) => {
  const [selectedTestament, setSelectedTestament] = useState<'All' | 'Old' | 'New'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Stories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalVideo, setActiveModalVideo] = useState<BibleVideo | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeModalVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModalVideo]);

  // Filtered videos based on search, testament, and category
  const filteredVideos = useMemo(() => {
    return BIBLE_VIDEOS.filter((video) => {
      // Filter by testament
      if (selectedTestament !== 'All' && video.testament !== selectedTestament) {
        return false;
      }

      // Filter by category
      if (selectedCategory !== 'All Stories' && video.category !== selectedCategory) {
        return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = video.title.toLowerCase().includes(q);
        const inHindiTitle = video.hindiTitle ? video.hindiTitle.toLowerCase().includes(q) : false;
        const inBook = video.bookName.toLowerCase().includes(q);
        const inRef = video.scriptureReference.toLowerCase().includes(q);
        const inCategory = video.category.toLowerCase().includes(q);
        const inDesc = video.description.toLowerCase().includes(q);
        const inTheme = video.theologicalTheme.toLowerCase().includes(q);
        const inTags = video.tags.some((tag) => tag.toLowerCase().includes(q));

        if (!inTitle && !inHindiTitle && !inBook && !inRef && !inCategory && !inDesc && !inTheme && !inTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedTestament, selectedCategory, searchQuery]);

  // Featured video for top spotlight
  const featuredVideo = useMemo(() => {
    return BIBLE_VIDEOS.find((v) => v.isFeatured && (selectedTestament === 'All' || v.testament === selectedTestament)) || BIBLE_VIDEOS[0];
  }, [selectedTestament]);

  // Handle share / copy link
  const handleCopyLink = (video: BibleVideo) => {
    const url = `https://www.youtube.com/watch?v=${video.youtubeId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(video.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  const handleOpenScripture = (bookId: string, chapter: number) => {
    if (activeModalVideo) {
      setActiveModalVideo(null);
    }
    if (onReadInBible) {
      onReadInBible(bookId, chapter);
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300 pb-16">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2A231C] via-[#1E1914] to-[#120F0D] text-white p-6 sm:p-8 border border-[#4A3E2D]/50 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#D4AF37]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-radial from-[#C5A028]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D3325] border border-[#C5A028]/40 text-[#F5D76E] text-xs font-semibold uppercase tracking-wider">
              <span>📺</span>
              <span>Visual Scripture Gallery</span>
              <span className="text-[#A8987E]">·</span>
              <span>{BIBLE_VIDEOS.length} Curated Stories</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-cinzel font-bold text-[#F7F2E7] tracking-tight">
              Holy Bible Videos & Stories
            </h1>
            <p className="font-lora text-sm sm:text-base text-[#D4C8B5] leading-relaxed">
              Explore timeless Old and New Testament narratives brought to life through reverent animated visual journeys, biblical teachings, and sacred scripture dramatizations.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-3 shrink-0 bg-[#161310]/80 border border-[#3E3426] p-3 rounded-xl">
            <div className="text-center px-3 border-r border-[#3E3426]">
              <div className="text-xl sm:text-2xl font-bold font-cinzel text-[#F5D76E]">
                {BIBLE_VIDEOS.filter((v) => v.testament === 'Old').length}
              </div>
              <div className="text-[10px] font-sans-ui uppercase tracking-wider text-[#A8987E]">
                Old Testament
              </div>
            </div>
            <div className="text-center px-3 border-r border-[#3E3426]">
              <div className="text-xl sm:text-2xl font-bold font-cinzel text-[#F5D76E]">
                {BIBLE_VIDEOS.filter((v) => v.testament === 'New').length}
              </div>
              <div className="text-[10px] font-sans-ui uppercase tracking-wider text-[#A8987E]">
                New Testament
              </div>
            </div>
            <div className="text-center px-3">
              <div className="text-xl sm:text-2xl font-bold font-cinzel text-[#E6C667]">
                100%
              </div>
              <div className="text-[10px] font-sans-ui uppercase tracking-wider text-[#A8987E]">
                HD Embed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Spotlight Video Banner (Featured) */}
      {featuredVideo && !searchQuery && selectedCategory === 'All Stories' && (
        <div className="relative rounded-2xl overflow-hidden bg-[#FAF6EE] border border-[#E3DAC7] p-5 sm:p-7 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Thumbnail with Glowing Play Overlay */}
            <div
              onClick={() => setActiveModalVideo(featuredVideo)}
              className="relative w-full lg:w-5/12 aspect-video rounded-xl overflow-hidden bg-black cursor-pointer group shadow-lg shrink-0 border border-[#C5A028]/30"
            >
              <img
                src={featuredVideo.thumbnailUrl}
                alt={featuredVideo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to high resolution or default image if youtube thumb is blocked
                  (e.target as HTMLImageElement).src = '/jesus_portrait.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity group-hover:opacity-90 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/90 text-[#1C1917] flex items-center justify-center shadow-xl shadow-black/50 transform group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 text-[#F5D76E] text-xs font-mono font-bold flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
                <span>{featuredVideo.duration}</span>
              </div>
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#1C1917]/85 border border-[#C5A028]/50 text-[#F5D76E] text-[10px] font-semibold uppercase tracking-wider">
                ★ Featured Story
              </div>
            </div>

            {/* Video Details */}
            <div className="flex-1 space-y-3 w-full">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EDE4D0] text-[#7A6020] text-xs font-semibold">
                  {featuredVideo.testament === 'Old' ? '📜 Old Testament' : '✝ New Testament'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EAE2D2] text-[#4A4237] text-xs font-medium">
                  {featuredVideo.category}
                </span>
                <span className="text-xs text-[#8A795D] font-mono">
                  📖 {featuredVideo.scriptureReference}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#1C1917] group-hover:text-[#9A7B20] transition-colors">
                  {featuredVideo.title}
                </h3>
                {featuredVideo.hindiTitle && (
                  <p className="text-xs text-[#7A6A55] font-medium mt-0.5">
                    {featuredVideo.hindiTitle}
                  </p>
                )}
              </div>

              <p className="font-lora text-sm text-[#4A4237] leading-relaxed line-clamp-3">
                {featuredVideo.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveModalVideo(featuredVideo)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A028] via-[#D4AF37] to-[#E5C158] hover:from-[#B38F20] hover:to-[#D4AF37] text-[#1A1813] font-sans-ui text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch Video ({featuredVideo.duration})</span>
                </button>

                {onReadInBible && (
                  <button
                    onClick={() => handleOpenScripture(featuredVideo.bookId, featuredVideo.chapter)}
                    className="px-4 py-2.5 rounded-xl bg-[#F4EFEA] hover:bg-[#EBE3D3] text-[#4A4237] border border-[#DDD3C0] font-sans-ui text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#8A795D]" />
                    <span>Read in Bible Reader</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Filter & Search Dashboard */}
      <div className="bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#E3DAC7] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Testament Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EBE3D3] rounded-xl self-start sm:self-auto shrink-0">
            <button
              onClick={() => setSelectedTestament('All')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedTestament === 'All'
                  ? 'bg-[#FDFBF7] text-[#1C1917] shadow-xs'
                  : 'text-[#6B5E4B] hover:text-[#1C1917]'
              }`}
            >
              All Stories ({BIBLE_VIDEOS.length})
            </button>
            <button
              onClick={() => setSelectedTestament('Old')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedTestament === 'Old'
                  ? 'bg-[#FDFBF7] text-[#1C1917] shadow-xs'
                  : 'text-[#6B5E4B] hover:text-[#1C1917]'
              }`}
            >
              📜 Old Testament ({BIBLE_VIDEOS.filter((v) => v.testament === 'Old').length})
            </button>
            <button
              onClick={() => setSelectedTestament('New')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedTestament === 'New'
                  ? 'bg-[#FDFBF7] text-[#1C1917] shadow-xs'
                  : 'text-[#6B5E4B] hover:text-[#1C1917]'
              }`}
            >
              ✝ New Testament ({BIBLE_VIDEOS.filter((v) => v.testament === 'New').length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8A795D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by story, book, Moses, Jesus, Noah, Genesis..."
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-[#FDFBF7] border border-[#DDD3C0] rounded-xl text-[#1C1917] placeholder-[#8A795D] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8A795D] hover:text-[#1C1917] rounded-md transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
          <div className="flex items-center gap-1.5 text-[#8A795D] font-medium shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>

          {BIBLE_VIDEO_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#1C1917] text-[#F5D76E] shadow-xs'
                    : 'bg-[#EAE2D2] text-[#574D3F] hover:bg-[#DDD3BF] hover:text-[#1C1917]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-[#8A795D] px-1 font-sans-ui">
        <div>
          Showing <span className="font-bold text-[#1C1917]">{filteredVideos.length}</span>{' '}
          {filteredVideos.length === 1 ? 'video story' : 'video stories'}
          {selectedCategory !== 'All Stories' && (
            <span> in <span className="text-[#C5A028] font-semibold">"{selectedCategory}"</span></span>
          )}
          {searchQuery && (
            <span> matching <span className="text-[#1C1917] font-semibold">"{searchQuery}"</span></span>
          )}
        </div>

        {(selectedTestament !== 'All' || selectedCategory !== 'All Stories' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedTestament('All');
              setSelectedCategory('All Stories');
              setSearchQuery('');
            }}
            className="text-[#9A7B20] hover:text-[#7A6015] font-semibold underline underline-offset-2 cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* 5. Visual Grid/Card Gallery */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group flex flex-col bg-[#FDFBF7] rounded-2xl overflow-hidden border border-[#E3DAC7] shadow-sm hover:shadow-xl hover:border-[#C5A028]/60 transition-all duration-300"
            >
              {/* Card Thumbnail Container (16:9) with Play Action */}
              <div
                onClick={() => setActiveModalVideo(video)}
                className="relative aspect-video w-full bg-black overflow-hidden cursor-pointer"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/jesus_portrait.jpg';
                  }}
                />

                {/* Dark Vignette & Play Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/90 text-[#1C1917] flex items-center justify-center shadow-lg transform group-hover:scale-115 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 text-[#F5D76E] text-[11px] font-mono font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  <span>{video.duration}</span>
                </div>

                {/* Testament Tag */}
                <div
                  className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                    video.testament === 'Old'
                      ? 'bg-[#3A2C18]/90 text-[#F5D76E] border border-[#C5A028]/40'
                      : 'bg-[#2A162B]/90 text-[#E7C6FF] border border-[#A855F7]/40'
                  }`}
                >
                  {video.testament === 'Old' ? 'Old Testament' : 'New Testament'}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#8A795D]">
                    <span className="font-semibold text-[#A87920] truncate max-w-[190px]">
                      {video.category}
                    </span>
                    <span className="font-mono text-[11px] bg-[#EFE9DD] px-2 py-0.5 rounded text-[#4A4237]">
                      {video.scriptureReference}
                    </span>
                  </div>

                  <h3
                    onClick={() => setActiveModalVideo(video)}
                    className="font-cinzel text-base sm:text-lg font-bold text-[#1C1917] group-hover:text-[#9A7B20] transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {video.title}
                  </h3>

                  {video.hindiTitle && (
                    <p className="text-xs text-[#7A6A55] font-medium -mt-1 line-clamp-1">
                      {video.hindiTitle}
                    </p>
                  )}

                  <p className="font-lora text-xs sm:text-sm text-[#574D3F] line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3 border-t border-[#EAE3D2] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalVideo(video)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#F4EFEA] hover:bg-[#EAE2D2] text-[#1C1917] font-sans-ui text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#DDD3C0]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-[#C5A028]" />
                    <span>Watch Story</span>
                  </button>

                  {onReadInBible && (
                    <button
                      onClick={() => handleOpenScripture(video.bookId, video.chapter)}
                      title={`Read ${video.bookName} chapter ${video.chapter} in Bible Reader`}
                      className="py-2 px-3 rounded-xl bg-transparent hover:bg-[#EAE2D2] text-[#574D3F] hover:text-[#1C1917] font-sans-ui text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer border border-transparent hover:border-[#DDD3C0]"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#8A795D]" />
                      <span className="hidden sm:inline">Read Passage</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleCopyLink(video)}
                    title="Copy Video YouTube Link"
                    className="p-2 rounded-xl text-[#8A795D] hover:text-[#1C1917] hover:bg-[#EAE2D2] transition-colors"
                  >
                    {copiedId === video.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-[#FAF7F0] rounded-2xl border border-[#E3DAC7] space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#EAE2D2] text-[#8A795D] flex items-center justify-center text-2xl">
            🔍
          </div>
          <h3 className="font-cinzel text-lg font-bold text-[#1C1917]">
            No matching Bible videos found
          </h3>
          <p className="font-lora text-sm text-[#7D705C] max-w-md mx-auto">
            We couldn't find any video stories matching "{searchQuery}". Try searching for "Creation", "Moses", "Jesus", "Noah", or clear your category filter.
          </p>
          <button
            onClick={() => {
              setSelectedTestament('All');
              setSelectedCategory('All Stories');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#1C1917] font-sans-ui text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            Show All {BIBLE_VIDEOS.length} Videos
          </button>
        </div>
      )}

      {/* 6. Integrated Responsive HTML5 YouTube Video Player Modal */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-4xl bg-[#1C1917] text-white rounded-2xl border border-[#4A3E2D] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#3E3426] flex items-center justify-between gap-4 bg-[#231F1C]">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#3D3325] text-[#F5D76E] border border-[#C5A028]/40">
                    {activeModalVideo.testament === 'Old' ? 'Old Testament' : 'New Testament'}
                  </span>
                  <span className="text-xs text-[#A8987E] truncate">
                    {activeModalVideo.category} · {activeModalVideo.scriptureReference}
                  </span>
                </div>
                <h2 className="font-cinzel text-base sm:text-xl font-bold text-[#F7F2E7] truncate">
                  {activeModalVideo.title}
                </h2>
              </div>

              {/* Modal Actions (Open on YouTube & Close) */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://www.youtube.com/watch?v=${activeModalVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#2D2620] hover:bg-[#3D3325] text-[#F5D76E] border border-[#4A3E2D] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Open video on YouTube"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">YouTube</span>
                </a>
                <button
                  onClick={() => setActiveModalVideo(null)}
                  className="p-2 text-[#A8987E] hover:text-white hover:bg-[#332B24] rounded-xl transition-colors cursor-pointer shrink-0"
                  aria-label="Close video player"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Video Container (16:9 Aspect Ratio) */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeModalVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeModalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Details & Related Navigation */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#191614]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#332B24]">
                <div>
                  <div className="text-xs text-[#A8987E] font-sans-ui">Scripture Focus</div>
                  <div className="font-serif text-sm sm:text-base text-[#F5D76E] font-semibold">
                    📖 {activeModalVideo.scriptureReference} ({activeModalVideo.bookName})
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {onReadInBible && (
                    <button
                      onClick={() => handleOpenScripture(activeModalVideo.bookId, activeModalVideo.chapter)}
                      className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-[#1C1917] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Read Chapter in Bible Reader</span>
                    </button>
                  )}

                  <a
                    href={`https://www.youtube.com/watch?v=${activeModalVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-[#2A231C] hover:bg-[#3D3325] text-[#D4C8B5] text-xs font-medium border border-[#4A3E2D] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#E6C667]" />
                    <span className="hidden sm:inline">Watch on YouTube</span>
                  </a>

                  <button
                    onClick={() => handleCopyLink(activeModalVideo)}
                    className="px-3 py-2 rounded-xl bg-[#2A231C] hover:bg-[#3D3325] text-[#D4C8B5] text-xs font-medium border border-[#4A3E2D] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === activeModalVideo.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied Link</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share Video</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Description & Theological Theme */}
              <div className="space-y-2">
                <p className="font-lora text-sm sm:text-base text-[#D4C8B5] leading-relaxed">
                  {activeModalVideo.description}
                </p>
                <div className="p-3 rounded-xl bg-[#231E19] border border-[#3E3426] text-xs font-sans-ui text-[#C5B396]">
                  <strong className="text-[#F5D76E]">Spiritual Reflection:</strong>{' '}
                  {activeModalVideo.theologicalTheme}
                </div>
              </div>

              {/* Up Next / Related Videos row inside modal */}
              <div className="pt-2">
                <div className="text-xs uppercase tracking-wider text-[#A8987E] font-semibold mb-2">
                  Up Next in Biblical Stories
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BIBLE_VIDEOS.filter((v) => v.id !== activeModalVideo.id)
                    .slice(0, 3)
                    .map((otherVideo) => (
                      <div
                        key={otherVideo.id}
                        onClick={() => setActiveModalVideo(otherVideo)}
                        className="group flex flex-col bg-[#231F1C] hover:bg-[#2F2925] p-2 rounded-xl border border-[#3E3426] cursor-pointer transition-colors"
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-black mb-1.5">
                          <img
                            src={otherVideo.thumbnailUrl}
                            alt={otherVideo.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/80 text-[10px] text-[#F5D76E] font-mono">
                            {otherVideo.duration}
                          </div>
                        </div>
                        <div className="text-xs font-medium text-[#F7F2E7] group-hover:text-[#F5D76E] transition-colors line-clamp-1 font-cinzel">
                          {otherVideo.title}
                        </div>
                        <div className="text-[10px] text-[#A8987E]">
                          {otherVideo.scriptureReference}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
