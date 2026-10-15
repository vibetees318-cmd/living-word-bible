import React from 'react';
import { X, Sparkles, Shirt, Mail, Code2, Heart, ExternalLink, ShieldCheck, Award } from 'lucide-react';

interface AboutDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutDeveloperModal: React.FC<AboutDeveloperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-developer-title"
    >
      <div
        className="relative w-full max-w-xl bg-gradient-to-b from-[#FDFBF7] to-[#F5EFE6] rounded-2xl border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Divine Golden Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A028]" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-[#E8DEC9] flex items-center justify-between bg-[#FBF8F2]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5D76E] flex items-center justify-center shadow-md shadow-[#D4AF37]/25 text-[#1C1917]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 id="about-developer-title" className="font-cinzel text-lg sm:text-xl font-bold text-[#1C1917]">
                About the Developer
              </h2>
              <p className="text-xs font-sans-ui text-[#8A795D]">
                Craftsmanship, Devotion & Creative Vision
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8A795D] hover:text-[#1C1917] hover:bg-[#EFE8DC] rounded-xl transition-colors cursor-pointer"
            aria-label="Close about modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto font-sans-ui">
          {/* Developer Spotlight Card */}
          <div className="relative p-5 rounded-xl bg-white border border-[#E3D7C3] shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              {/* Monogram / Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2A231C] to-[#161310] border-2 border-[#D4AF37] flex items-center justify-center shadow-md shrink-0">
                <span className="font-cinzel text-xl font-bold text-[#F5D76E] tracking-wider">
                  PB
                </span>
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF4E6] border border-[#D4AF37]/40 text-[#8C6D1F] text-[11px] font-semibold uppercase tracking-wider">
                    <Award className="w-3 h-3" />
                    <span>Lead Creator & Software Engineer</span>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#2A231C] text-[#F5D76E] border border-[#D4AF37]/50 text-[11px] font-semibold tracking-wide shadow-xs">
                    Version 1.0.0
                  </span>
                </div>
                <div className="pt-0.5 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  <h3 className="text-xl font-cinzel font-bold text-[#1C1917]">
                    Pranjit Baghwar
                  </h3>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EFE8DC] text-[#63533E] border border-[#DCD1BF]">
                    v1.0.0
                  </span>
                </div>
                <p className="text-xs font-medium text-[#7C6C58]">
                  Designed & Developed by Pranjit Baghwar · <span className="font-semibold text-[#8C6D1F]">Version 1.0.0</span>
                </p>
                <p className="font-lora text-xs sm:text-sm text-[#4A4237] leading-relaxed pt-1">
                  Dedicated to building sacred, human-centered digital experiences that make Holy Scripture, Catholic prayer traditions, and visual faith education accessible to believers across diverse languages worldwide.
                </p>

                {/* Email Contact Chip */}
                <div className="pt-2 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  <a
                    href="mailto:pranjitbaghwar45@gmail.com"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7F2E8] hover:bg-[#EFE7D8] text-[#2C2416] text-xs font-medium border border-[#DDD3BF] transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C5A028]" />
                    <span>pranjitbaghwar45@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Vibe Tees Brand Showcase */}
          <div className="relative p-5 rounded-xl bg-gradient-to-br from-[#1E1914] via-[#2A231C] to-[#171411] text-white border border-[#4A3E2D] shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-radial from-[#D4AF37]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#3D3325] border border-[#C5A028]/50 flex items-center justify-center text-[#F5D76E]">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans-ui uppercase tracking-wider text-[#C5B396]">
                      Brand Partner & Studio
                    </span>
                    <h4 className="font-cinzel text-lg font-bold text-[#F5D76E] tracking-wide">
                      Vibe Tees
                    </h4>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#D4AF37]/20 text-[#F5D76E] border border-[#D4AF37]/30">
                  Featured Partner
                </span>
              </div>

              <p className="font-lora text-xs sm:text-sm text-[#D8CDC0] leading-relaxed">
                <strong className="text-[#F5D76E]">Vibe Tees</strong> crafts premium custom apparel, distinctive faith-inspired designs, and contemporary streetwear that empowers individuals to wear their values with pride, elegance, and authenticity.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href="https://vibetees.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#E0C16A] hover:to-[#D4AF37] text-[#1A160F] text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explore Vibe Tees</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <span className="text-xs text-[#A8987E]">
                  Custom Apparel · Faith & Culture Wear
                </span>
              </div>
            </div>
          </div>

          {/* Living Word Mission & Technology */}
          <div className="p-4 rounded-xl bg-[#F7F2E8] border border-[#E3D7C3] space-y-2 text-xs text-[#574D3F]">
            <div className="flex items-center gap-1.5 font-semibold text-[#1C1917] font-cinzel">
              <ShieldCheck className="w-4 h-4 text-[#C5A028]" />
              <span>Living Word Sacred App Architecture</span>
            </div>
            <p className="font-lora leading-relaxed text-[#5A5042]">
              Engineered with devotion for Catholic prayer, scripture study, and liturgical meditation. Built with React, TypeScript, responsive Tailwind styling, offline audio capabilities, and reverent sacred art.
            </p>
            <div className="text-[11px] text-[#8A795D] italic pt-1">
              Ad Majorem Dei Gloriam — For the Greater Glory of God
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E8DEC9] bg-[#FAF6EE] flex items-center justify-between text-xs text-[#8A795D]">
          <div className="flex items-center gap-1.5 font-medium">
            <span>Living Word Holy Bible</span>
            <span>·</span>
            <span className="font-bold text-[#8C6D1F] bg-[#FAF4E6] px-2 py-0.5 rounded border border-[#D4AF37]/30">Version 1.0.0</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#2A231C] hover:bg-[#3D3325] text-white font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
