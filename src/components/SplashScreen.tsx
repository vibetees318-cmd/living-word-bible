import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // 1.5 seconds splash display, then 400ms graceful fade-out
    const timer = setTimeout(() => {
      setFading(true);
      const hideTimer = setTimeout(() => {
        setHidden(true);
        if (onFinish) onFinish();
      }, 450);
      return () => clearTimeout(hideTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (hidden) return null;

  return (
    <div
      onClick={() => {
        setFading(true);
        setTimeout(() => {
          setHidden(true);
          if (onFinish) onFinish();
        }, 300);
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 bg-gradient-to-b from-[#1C1712] via-[#120F0D] to-[#0A0807] text-[#FAF6EE] select-none cursor-pointer transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Living Word Holy Bible Splash Screen"
    >
      {/* Top Subtle Latin Inscription */}
      <div className="text-center pt-4">
        <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.25em] text-[#D4AF37]/75 uppercase">
          Ad Majorem Dei Gloriam
        </span>
      </div>

      {/* Center Sacred Emblem & Wordmark */}
      <div className="flex flex-col items-center text-center space-y-6 max-w-sm">
        {/* Radiant Catholic Gold Halo & Cross Emblem */}
        <div className="relative">
          {/* Pulsing outer aura */}
          <div className="absolute -inset-4 rounded-full bg-[#D4AF37]/20 blur-xl animate-pulse" />
          
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-[#E3C363] via-[#D4AF37] to-[#FBF0B9] p-1 shadow-2xl shadow-[#D4AF37]/40 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#241E18] to-[#120F0C] border border-[#F3E5AB]/40 flex items-center justify-center">
              <svg
                className="w-14 h-14 text-[#F5D76E]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Radiant Halo Rays */}
                <circle cx="12" cy="12" r="9" strokeOpacity="0.4" strokeDasharray="2 3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeOpacity="0.6" strokeWidth="1.2" />
                
                {/* Holy Cross */}
                <path d="M12 5v14M8 9h8" stroke="#F5D76E" strokeWidth="2" strokeLinecap="square" />
                
                {/* Dove / Spirit of Grace */}
                <path d="M12 11c-2 2-3 4-3 5a3 3 0 0 0 6 0c0-1-1-3-3-5z" fill="#D4AF37" fillOpacity="0.35" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sacred Typography Wordmark */}
        <div className="space-y-1.5">
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#F5D76E] via-[#F3E5AB] to-[#D4AF37]">
            Living Word
          </h1>
          <p className="font-sans-ui text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C9BAA3] font-medium">
            Holy Bible Companion
          </p>
        </div>

        {/* Play Store Ready Version Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A231C] border border-[#D4AF37]/40 shadow-sm text-xs">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="font-cinzel font-bold text-[#F5D76E]">Version 1.0.0</span>
          <span className="text-[#8C7B65]">·</span>
          <span className="text-[11px] text-[#C0B39F]">Official Release</span>
        </div>

        {/* Scripture Motto */}
        <p className="font-cormorant italic text-sm text-[#BDB09B] max-w-xs leading-relaxed">
          "Thy word is a lamp unto my feet, and a light unto my path."
        </p>
      </div>

      {/* Bottom Loading Progress & Creator Credit */}
      <div className="w-full max-w-xs space-y-3 text-center">
        {/* Smooth 1.5s Golden Progress Bar */}
        <div className="w-full h-1 bg-[#26201A] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#C5A028] via-[#F5D76E] to-[#D4AF37] animate-[shimmer_1.5s_ease-out_forwards] w-full" />
        </div>

        <div className="text-[11px] text-[#8C7D68] font-sans-ui flex items-center justify-center gap-1.5">
          <span>Designed & Developed by</span>
          <strong className="text-[#E0D0B8] font-semibold">Pranjit Baghwar</strong>
        </div>
      </div>
    </div>
  );
};
