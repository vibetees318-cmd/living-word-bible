import React, { useState } from 'react';
import { X, Star, Heart, Sparkles, Send, CheckCircle2, MessageSquare, Shirt } from 'lucide-react';

interface RateAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RateAppModal: React.FC<RateAppModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Keep state clear after short delay
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FDFBF7] rounded-2xl border border-[#D4AF37]/60 shadow-2xl overflow-hidden p-6 sm:p-7 relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#8A795D] hover:text-[#1C1917] hover:bg-[#F4EFEA] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <h3 className="font-cinzel text-xl font-bold text-[#1C1917]">
                May God Bless You!
              </h3>
              <p className="font-lora text-xs sm:text-sm text-[#635543] max-w-xs mx-auto">
                Thank you for supporting <strong>Living Word Holy Bible</strong>. Your review helps Christians worldwide discover scripture and prayer.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-[#1C1917] font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Return to Reading
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Header */}
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#FAF3DC] text-[#8C6D1F] text-[11px] font-bold border border-[#D4AF37]/50">
                <Heart className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                <span>Play Store Support · v1.0.0</span>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-[#1C1917]">
                Rate Living Word Bible
              </h3>
              <p className="font-lora text-xs text-[#7A6C59]">
                Designed with reverent devotion by Pranjit Baghwar
              </p>
            </div>

            {/* Star Rating Selector */}
            <div className="flex flex-col items-center py-2">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoverRating !== null ? hoverRating : rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          active
                            ? 'text-[#D4AF37] fill-[#D4AF37] drop-shadow-xs'
                            : 'text-[#DDD3C2]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-semibold text-[#8C6D1F] mt-2">
                {rating === 5 && '★★★★★ An Inspiring Sacred Blessing!'}
                {rating === 4 && '★★★★☆ Great Holy Companion!'}
                {rating === 3 && '★★★☆☆ Helpful Bible App'}
                {rating < 3 && 'We welcome your suggestions for improvement'}
              </span>
            </div>

            {/* Optional Feedback Note */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#685B48] mb-1">
                  Share Your Thoughts or Prayer Request (Optional):
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you love about the Catholic prayers, audio narration, or scripture reading..."
                  rows={3}
                  className="w-full p-3 rounded-xl bg-[#FAF6EE] border border-[#DDD5C5] text-xs font-lora text-[#1C1917] placeholder-[#9E907B] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#E0C16A] hover:to-[#D4AF37] text-[#1C1917] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit 5-Star Rating & Review</span>
                </button>

                <a
                  href="mailto:pranjitbaghwar45@gmail.com?subject=Living%20Word%20Bible%20Feedback"
                  className="w-full py-2 px-3 rounded-xl bg-[#F0EAE0] hover:bg-[#E8E0D2] text-[#473B2C] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Email Suggestions to Developer</span>
                </a>
              </div>
            </form>

            {/* Partner Note */}
            <div className="pt-2 border-t border-[#EAE3D2] flex items-center justify-between text-[11px] text-[#8A795D]">
              <span className="truncate">Developer: Pranjit Baghwar</span>
              <div className="flex items-center gap-1 text-[#665744]">
                <Shirt className="w-3 h-3 text-[#B8860B]" />
                <span className="font-semibold">Vibe Tees</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
