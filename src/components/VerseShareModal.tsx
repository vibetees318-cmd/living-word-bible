import React, { useState } from 'react';
import { X, Copy, Check, Sparkles } from 'lucide-react';
import { Verse, JESUS_AVATAR_IMAGE_URL } from '../data/bibleData';

interface VerseShareModalProps {
  verse: Verse;
  book: string;
  chapter: number;
  onClose: () => void;
}

export const VerseShareModal: React.FC<VerseShareModalProps> = ({
  verse,
  book,
  chapter,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  const formattedCardText = `📖 "${verse.text}"\n— ${book} ${chapter}:${verse.verseNumber}\n\nLiving Word: Holy Bible`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedCardText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FDFBF7] rounded-2xl border border-[#D4AF37] shadow-2xl overflow-hidden p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#8A795D] hover:text-[#1C1917] hover:bg-[#F4EFEA] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF3DC] text-[#8C6D1F] text-xs font-bold font-sans-ui border border-[#D4AF37]/50 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Living Word Scripture Card</span>
          </div>
          <h3 className="font-cinzel text-xl font-bold text-[#1C1917]">
            Share Sacred Verse
          </h3>
        </div>

        {/* The Visual Card Container */}
        <div className="relative rounded-xl bg-gradient-to-b from-[#F9F5EC] to-[#F3ECD9] border-2 border-[#D4AF37]/70 p-6 sm:p-8 text-center shadow-inner space-y-4">
          {/* Subtle watermark / halo motif */}
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#D4AF37] to-[#F5D76E] shadow-sm">
              <img
                src={JESUS_AVATAR_IMAGE_URL}
                alt="Jesus Christ Portrait"
                className="w-full h-full object-cover object-center rounded-full"
              />
            </div>
          </div>

          {/* Scripture Verse Quote */}
          <p className="font-cormorant text-xl sm:text-2xl text-[#1C1917] italic leading-relaxed">
            "{verse.text}"
          </p>

          {/* Citation */}
          <div className="pt-2 border-t border-[#D4AF37]/30 flex flex-col items-center">
            <span className="font-cinzel text-sm sm:text-base font-bold text-[#7A5F19]">
              {book} {chapter}:{verse.verseNumber}
            </span>
            <span className="text-[10px] font-sans-ui uppercase tracking-widest text-[#8A795D] mt-0.5">
              Holy Scripture · Living Word
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#574D3F] hover:bg-[#F4EFEA] rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#1C1917] font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-900" />
                <span>Card Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Scripture Card</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
