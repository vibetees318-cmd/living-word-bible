import React, { useState, useRef, useEffect } from 'react';
import { X, Copy, Check, Sparkles, Download, Share2, Palette, MessageCircle } from 'lucide-react';
import { Verse, JESUS_AVATAR_IMAGE_URL } from '../data/bibleData';

interface VerseShareModalProps {
  verse: Verse;
  book: string;
  chapter: number;
  onClose: () => void;
}

type CardStyle = 'parchment' | 'midnight' | 'burgundy' | 'alabaster';

export const VerseShareModal: React.FC<VerseShareModalProps> = ({
  verse,
  book,
  chapter,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [shared, setShared] = useState(false);
  const [cardStyle, setCardStyle] = useState<CardStyle>('parchment');
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const citation = `${book} ${chapter}:${verse.verseNumber}`;
  const formattedCardText = `✝️ "${verse.text}"\n— ${citation}\n\n✨ Shared via Living Word Holy Bible (Version 1.0.0)\n🕊️ Designed by Pranjit Baghwar`;

  // Draw on HTML5 canvas whenever verse or cardStyle changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High definition 1080x1080 canvas for WhatsApp Status & Instagram Story
    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    // Style configs
    const configs = {
      parchment: {
        bgStart: '#FAF6ED',
        bgEnd: '#EFE7D3',
        border: '#D4AF37',
        text: '#1C1917',
        subtext: '#8C6D1F',
        quoteColor: '#7A5E1C',
        haloFill: 'rgba(212, 175, 55, 0.15)'
      },
      midnight: {
        bgStart: '#1B1714',
        bgEnd: '#0D0B0A',
        border: '#E3C363',
        text: '#F5EFEB',
        subtext: '#F5D76E',
        quoteColor: '#D4AF37',
        haloFill: 'rgba(245, 215, 110, 0.12)'
      },
      burgundy: {
        bgStart: '#3D1418',
        bgEnd: '#240A0D',
        border: '#E3C363',
        text: '#FDF7F4',
        subtext: '#F5D76E',
        quoteColor: '#E6C466',
        haloFill: 'rgba(243, 229, 171, 0.12)'
      },
      alabaster: {
        bgStart: '#FFFFFF',
        bgEnd: '#F4F4F2',
        border: '#C5A028',
        text: '#111111',
        subtext: '#7A601E',
        quoteColor: '#5C4A19',
        haloFill: 'rgba(197, 160, 40, 0.1)'
      }
    }[cardStyle];

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, configs.bgStart);
    grad.addColorStop(1, configs.bgEnd);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Borders
    ctx.strokeStyle = configs.border;
    ctx.lineWidth = 14;
    ctx.strokeRect(50, 50, width - 100, height - 100);

    ctx.lineWidth = 3;
    ctx.strokeRect(70, 70, width - 140, height - 140);

    // Corner Ornaments
    const drawCorner = (x: number, y: number) => {
      ctx.fillStyle = configs.border;
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCorner(70, 70);
    drawCorner(width - 70, 70);
    drawCorner(70, height - 70);
    drawCorner(width - 70, height - 70);

    // Sacred Catholic Cross Emblem
    ctx.fillStyle = configs.subtext;
    ctx.strokeStyle = configs.subtext;
    ctx.lineWidth = 4;
    // Cross
    ctx.beginPath();
    ctx.moveTo(width / 2, 140);
    ctx.lineTo(width / 2, 220);
    ctx.moveTo(width / 2 - 30, 165);
    ctx.lineTo(width / 2 + 30, 165);
    ctx.stroke();

    // Halo around cross
    ctx.beginPath();
    ctx.arc(width / 2, 165, 24, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.stroke();

    // Top Header: "LIVING WORD HOLY BIBLE"
    ctx.font = 'bold 26px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = configs.subtext;
    ctx.letterSpacing = '6px';
    ctx.fillText('LIVING WORD · HOLY SCRIPTURE', width / 2, 275);

    // Scripture Verse (Word Wrapped in Cormorant Garamond font)
    ctx.font = 'italic 46px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = configs.text;
    ctx.letterSpacing = '0px';

    const textToWrap = `“${verse.text}”`;
    const maxWidth = width - 240;
    const lineHeight = 66;
    const words = textToWrap.split(' ');
    let line = '';
    const lines: string[] = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    // Center the verse vertically
    const startY = (height / 2) - ((lines.length - 1) * lineHeight) / 2 + 20;
    lines.forEach((l, i) => {
      ctx.fillText(l, width / 2, startY + (i * lineHeight));
    });

    // Divider Line
    ctx.strokeStyle = configs.border;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 120, height - 250);
    ctx.lineTo(width / 2 + 120, height - 250);
    ctx.stroke();

    // Diamond in center of divider
    ctx.fillStyle = configs.border;
    ctx.beginPath();
    ctx.moveTo(width / 2, height - 258);
    ctx.lineTo(width / 2 + 8, height - 250);
    ctx.lineTo(width / 2, height - 242);
    ctx.lineTo(width / 2 - 8, height - 250);
    ctx.fill();

    // Citation
    ctx.font = 'bold 36px "Cinzel", Georgia, serif';
    ctx.fillStyle = configs.subtext;
    ctx.fillText(citation.toUpperCase(), width / 2, height - 195);

    // Subtitle / Developer Attribution
    ctx.font = '20px sans-serif';
    ctx.fillStyle = configs.text;
    ctx.globalAlpha = 0.7;
    ctx.fillText('Living Word Bible Companion · Version 1.0.0 · Pranjit Baghwar', width / 2, height - 135);
    ctx.globalAlpha = 1.0;
  }, [verse, book, chapter, cardStyle, citation]);

  // Download Quote Card as PNG
  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloading(true);

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `LivingWord-${book}-${chapter}-${verse.verseNumber}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error exporting quote image:', err);
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  // Native Web Share with generated Image File
  const handleNativeShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setShared(true);

    try {
      if (navigator.share && canvas.toBlob) {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            fallbackTextShare();
            return;
          }
          const file = new File([blob], `LivingWord-${book}-${chapter}-${verse.verseNumber}.png`, { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: `${citation} - Living Word Holy Bible`,
              text: `📖 "${verse.text}" — ${citation}`,
              files: [file]
            });
          } else {
            await navigator.share({
              title: `${citation} - Living Word Holy Bible`,
              text: formattedCardText
            });
          }
        }, 'image/png');
      } else {
        fallbackTextShare();
      }
    } catch {
      fallbackTextShare();
    } finally {
      setTimeout(() => setShared(false), 2000);
    }
  };

  const fallbackTextShare = () => {
    navigator.clipboard.writeText(formattedCardText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Direct WhatsApp Share link
  const handleWhatsAppShare = () => {
    const textEncoded = encodeURIComponent(formattedCardText);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${textEncoded}`;
    window.open(whatsappUrl, '_blank');
  };

  // Card theme styling for live HTML preview
  const previewStyles = {
    parchment: 'bg-gradient-to-b from-[#FAF6ED] to-[#EFE7D3] text-[#1C1917] border-[#D4AF37]',
    midnight: 'bg-gradient-to-b from-[#1C1714] to-[#0E0C0B] text-[#F5EFEB] border-[#E3C363]',
    burgundy: 'bg-gradient-to-b from-[#3D1418] to-[#240A0D] text-[#FDF7F4] border-[#E3C363]',
    alabaster: 'bg-gradient-to-b from-[#FFFFFF] to-[#F5F5F3] text-[#111111] border-[#C5A028]'
  }[cardStyle];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#FDFBF7] rounded-2xl border border-[#D4AF37]/60 shadow-2xl overflow-hidden p-5 sm:p-7 relative max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#8A795D] hover:text-[#1C1917] hover:bg-[#F4EFEA] transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF3DC] text-[#8C6D1F] text-xs font-bold font-sans-ui border border-[#D4AF37]/50 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Image Quote Card · WhatsApp & Social</span>
          </div>
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#1C1917]">
            Share Sacred Scripture Card
          </h3>
        </div>

        {/* Theme Palette Selector */}
        <div className="flex items-center justify-center gap-2 mb-4 shrink-0">
          <span className="text-xs font-semibold text-[#8A795D] flex items-center gap-1">
            <Palette className="w-3.5 h-3.5 text-[#C5A028]" />
            <span>Theme:</span>
          </span>
          <div className="flex items-center gap-1.5">
            {(['parchment', 'midnight', 'burgundy', 'alabaster'] as CardStyle[]).map((st) => (
              <button
                key={st}
                onClick={() => setCardStyle(st)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                  cardStyle === st
                    ? 'bg-[#2A231C] text-[#F5D76E] shadow-xs'
                    : 'bg-[#F0EAE0] text-[#6A5E4D] hover:bg-[#E5DECة]'
                }`}
              >
                {st === 'parchment' && 'Parchment'}
                {st === 'midnight' && 'Midnight'}
                {st === 'burgundy' && 'Burgundy'}
                {st === 'alabaster' && 'Alabaster'}
              </button>
            ))}
          </div>
        </div>

        {/* Card Preview Container */}
        <div className="overflow-y-auto flex-1 flex flex-col items-center justify-center p-2">
          <div
            ref={cardRef}
            className={`w-full max-w-md rounded-2xl border-2 p-6 sm:p-8 text-center shadow-xl space-y-4 transition-all duration-300 relative ${previewStyles}`}
          >
            {/* Sacred Emblem */}
            <div className="flex justify-center">
              <div className="w-11 h-11 rounded-full border border-current/30 flex items-center justify-center">
                <span className="text-base font-cinzel font-bold text-[#C5A028]">✝</span>
              </div>
            </div>

            {/* Scripture Quote */}
            <p className="font-cormorant text-xl sm:text-2xl italic leading-relaxed px-2">
              "{verse.text}"
            </p>

            {/* Citation & Badge */}
            <div className="pt-3 border-t border-current/20 flex flex-col items-center">
              <span className="font-cinzel text-base sm:text-lg font-bold tracking-wider">
                {citation}
              </span>
              <span className="text-[10px] uppercase tracking-widest opacity-75 mt-1 font-sans-ui">
                Living Word Holy Bible · Version 1.0.0
              </span>
            </div>
          </div>

          {/* Hidden Canvas used for high-res PNG image export */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Social Sharing & Action Buttons */}
        <div className="mt-4 pt-3 border-t border-[#EAE3D2] flex flex-wrap items-center justify-between gap-2 shrink-0">
          {/* Quick WhatsApp Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BE5B] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            title="Share direct to WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </button>

          {/* Download Image Card PNG Button */}
          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF3DC] hover:bg-[#F3E7C4] text-[#7A5F19] border border-[#D4AF37]/50 text-xs font-bold shadow-xs transition-all cursor-pointer"
            title="Download high-resolution image card"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloading ? 'Exporting...' : 'Save Image (.png)'}</span>
          </button>

          {/* Native Mobile Share / Social Share */}
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#1C1917] font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            {shared ? (
              <>
                <Check className="w-4 h-4 text-green-950" />
                <span>Card Shared!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Card</span>
              </>
            )}
          </button>

          {/* Copy Plain Text */}
          <button
            onClick={fallbackTextShare}
            className="p-2 text-[#7D705C] hover:text-[#1C1917] hover:bg-[#F4EFEA] rounded-lg transition-colors cursor-pointer"
            title="Copy verse text to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
