import React from 'react';
import { Shirt, Sparkles, ExternalLink, Heart, Shield, BookOpen, Code2 } from 'lucide-react';

interface FooterProps {
  onOpenAboutDeveloper: () => void;
  onNavigateTab?: (tab: 'reader' | 'videos' | 'blessing' | 'prayers' | 'bookmarks' | 'settings') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAboutDeveloper, onNavigateTab }) => {
  return (
    <footer className="w-full mt-16 border-t border-[#EAE3D2] bg-gradient-to-b from-[#FAF7F0] to-[#F3ECE0] text-[#574D3F] pt-12 pb-24 md:pb-10 font-sans-ui transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-[#E3D9C6]">
          {/* Column 1: Brand & Sacred Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#E3C363] via-[#D4AF37] to-[#F3E5AB] flex items-center justify-center shadow-sm text-[#1A1813]">
                <svg className="w-5 h-5 text-[#1A1813]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" strokeOpacity="0.4" strokeDasharray="2 2" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeOpacity="0.6" />
                  <path d="M16 12a4 4 0 0 0-8 0c0 3 4 7 4 7s4-4 4-7z" fill="currentColor" fillOpacity="0.15" />
                  <path d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </div>
              <span className="font-cinzel text-lg font-bold tracking-tight text-[#1C1917]">
                Living Word Bible
              </span>
            </div>
            <p className="font-lora text-xs sm:text-sm text-[#665B4C] leading-relaxed max-w-sm">
              A sacred Catholic scripture companion designed for reverent recitation, prayerful reflection, and multi-lingual spiritual nourishment.
            </p>
            <div className="text-[11px] font-serif text-[#8A795D] italic">
              Ad Majorem Dei Gloriam (AMDG) · To the Greater Glory of God
            </div>
          </div>

          {/* Column 2: Quick Sacred Navigation */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#1C1917]">
              Scripture & Prayer
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigateTab && onNavigateTab('reader')}
                className="text-left text-[#665B4C] hover:text-[#1C1917] hover:underline transition-colors cursor-pointer"
              >
                📖 Read Bible
              </button>
              <button
                onClick={() => onNavigateTab && onNavigateTab('videos')}
                className="text-left text-[#665B4C] hover:text-[#1C1917] hover:underline transition-colors cursor-pointer"
              >
                📺 Bible Videos
              </button>
              <button
                onClick={() => onNavigateTab && onNavigateTab('prayers')}
                className="text-left text-[#665B4C] hover:text-[#1C1917] hover:underline transition-colors cursor-pointer"
              >
                📿 Catholic Prayers
              </button>
              <button
                onClick={() => onNavigateTab && onNavigateTab('blessing')}
                className="text-left text-[#665B4C] hover:text-[#1C1917] hover:underline transition-colors cursor-pointer"
              >
                🕊️ Daily Blessing
              </button>
              <button
                onClick={() => onNavigateTab && onNavigateTab('bookmarks')}
                className="text-left text-[#665B4C] hover:text-[#1C1917] hover:underline transition-colors cursor-pointer"
              >
                🔖 Bookmarks
              </button>
              <button
                onClick={() => onNavigateTab && onNavigateTab('settings')}
                className="text-left text-[#665B4C] hover:text-[#1C1917] hover:underline transition-colors cursor-pointer"
              >
                ⚙️ Audio Settings
              </button>
            </div>
          </div>

          {/* Column 3: Vibe Tees Brand Partner Card */}
          <div className="space-y-3 bg-[#F4EDE0] p-4 rounded-xl border border-[#DFD4BF]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#2A231C] text-[#F5D76E] flex items-center justify-center">
                  <Shirt className="w-3.5 h-3.5" />
                </div>
                <span className="font-cinzel text-sm font-bold text-[#1C1917]">
                  Vibe Tees
                </span>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8C6D1F] px-2 py-0.5 rounded bg-[#EADDC2]">
                Apparel Partner
              </span>
            </div>
            <p className="font-lora text-xs text-[#5D5243] leading-relaxed">
              Premium custom apparel, faith merchandise, and bespoke fashion. Empowering your creative expression.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://vibetees.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C6D1F] hover:text-[#6E5414] hover:underline"
              >
                <span>Visit Vibe Tees</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-[#8A795D]">·</span>
              <button
                onClick={onOpenAboutDeveloper}
                className="text-xs font-semibold text-[#1C1917] hover:underline cursor-pointer"
              >
                Brand Info
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Developer Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Primary Developer Credit Line with Version 1.0.0 */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={onOpenAboutDeveloper}
              className="inline-flex items-center gap-2 group cursor-pointer text-left"
            >
              <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#8C6D1F] group-hover:scale-110 transition-transform">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#1C1917] group-hover:text-[#8C6D1F] transition-colors">
                Designed & Developed by Pranjit Baghwar
              </span>
            </button>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#FAF4E6] text-[#8C6D1F] border border-[#D4AF37]/50 text-[11px] font-bold tracking-wide shadow-2xs">
              Version 1.0.0
            </span>
            <span className="hidden sm:inline text-[#A8987E]">|</span>
            <span className="text-xs text-[#7A6C59]">
              In Partnership with <strong className="text-[#1C1917] font-semibold">Vibe Tees</strong>
            </span>
          </div>

          {/* Action to open Developer modal & Version */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAboutDeveloper}
              className="px-3.5 py-1.5 rounded-lg bg-[#EFE6D5] hover:bg-[#E5DBC7] text-[#2C2416] text-xs font-semibold border border-[#D5C9B3] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A028]" />
              <span>About Developer</span>
            </button>
            <div className="text-xs text-[#8A795D] flex items-center gap-1.5">
              <span className="font-semibold text-[#5A5042]">v1.0.0</span>
              <span>·</span>
              <span>© {new Date().getFullYear()} Living Word Holy Bible</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
