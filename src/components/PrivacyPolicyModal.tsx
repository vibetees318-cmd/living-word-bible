import React from 'react';
import { X, ShieldCheck, Lock, Database, Volume2, BookOpen, Mail, ExternalLink, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[85vh] bg-[#FDFBF7] rounded-2xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DEC9] bg-gradient-to-r from-[#FAF5EC] via-[#F5EEE0] to-[#FAF5EC] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F5D76E] flex items-center justify-center text-[#1C1917] shadow-sm shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#1C1917]">
                  Privacy Policy & Terms
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FAF4E6] text-[#8C6D1F] border border-[#D4AF37]/40">
                  Version 1.0.0
                </span>
              </div>
              <p className="text-xs font-sans-ui text-[#8A795D]">
                Google Play Store Compliance & Data Transparency
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#8A795D] hover:text-[#1C1917] hover:bg-[#EAE3D2] rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 font-sans-ui text-sm text-[#4A4033] leading-relaxed">
          {/* Quick Summary Banner */}
          <div className="p-4 rounded-xl bg-[#F4EFE5] border border-[#DDD3BF] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-[#524637] space-y-1">
              <strong className="text-[#1C1917] font-semibold block text-sm">
                100% Private, Secure & Sacred Devotion
              </strong>
              <span>
                Living Word Holy Bible does not collect, sell, or transmit any personally identifiable information. Your prayers, bookmarks, and reflections remain solely on your device.
              </span>
            </div>
          </div>

          {/* Policy Sections */}
          <section className="space-y-2">
            <div className="flex items-center gap-2 font-cinzel font-bold text-[#1C1917] text-base">
              <Lock className="w-4 h-4 text-[#C5A028]" />
              <h4>1. Information Collection & Zero-Tracking</h4>
            </div>
            <p className="font-lora text-xs sm:text-sm text-[#574D3F]">
              We respect the sacred sanctity of your spiritual life. The Living Word application does not track your location, does not access device contacts or photos, and operates without intrusive third-party analytical cookies or ad networks.
            </p>
          </section>

          <section className="space-y-2">
            <div className="flex items-center gap-2 font-cinzel font-bold text-[#1C1917] text-base">
              <Database className="w-4 h-4 text-[#C5A028]" />
              <h4>2. Offline Local Storage & User Data</h4>
            </div>
            <p className="font-lora text-xs sm:text-sm text-[#574D3F]">
              Bookmarks, personalized scripture notes, and reading preferences (such as recitation rate, font size, and visual themes) are stored locally within your device's private browser/application storage (<code className="text-[#8C6D1F] bg-[#FAF3DC] px-1 rounded">localStorage</code>). You retain full authority to clear or export this data at any time.
            </p>
          </section>

          <section className="space-y-2">
            <div className="flex items-center gap-2 font-cinzel font-bold text-[#1C1917] text-base">
              <BookOpen className="w-4 h-4 text-[#C5A028]" />
              <h4>3. Scripture & Catholic Devotional Attributions</h4>
            </div>
            <p className="font-lora text-xs sm:text-sm text-[#574D3F]">
              The Holy Scripture provided in this application utilizes public domain biblical texts including the World English Bible (WEB), traditional Catholic prayers, Rosary meditations, and public theological resources. All materials are assembled with utmost reverent accuracy.
            </p>
          </section>

          <section className="space-y-2">
            <div className="flex items-center gap-2 font-cinzel font-bold text-[#1C1917] text-base">
              <Volume2 className="w-4 h-4 text-[#C5A028]" />
              <h4>4. Audio Narration & Speech Processing</h4>
            </div>
            <p className="font-lora text-xs sm:text-sm text-[#574D3F]">
              Bible speech recitation operates through your operating system's native Web Speech synthesis engine. Audio is rendered locally in real-time; no spoken audio or microphone recordings are ever generated, saved, or uploaded.
            </p>
          </section>

          <section className="space-y-2">
            <div className="flex items-center gap-2 font-cinzel font-bold text-[#1C1917] text-base">
              <ShieldCheck className="w-4 h-4 text-[#C5A028]" />
              <h4>5. Developer & Brand Partnership</h4>
            </div>
            <p className="font-lora text-xs sm:text-sm text-[#574D3F]">
              Living Word Holy Bible was designed and developed by <strong>Pranjit Baghwar</strong> in partnership with <strong>Vibe Tees</strong>. All brand assets, sacred emblems, and original user interface designs are copyright © {new Date().getFullYear()} Living Word.
            </p>
          </section>

          {/* Contact Developer Card */}
          <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E3D9C7] space-y-2">
            <div className="font-semibold text-[#1C1917] text-xs uppercase tracking-wider">
              Developer Inquiries & Support
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="text-xs text-[#6B5E4B]">
                <div>Developer: <strong>Pranjit Baghwar</strong></div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#8A795D]" />
                  <span>pranjitbaghwar45@gmail.com</span>
                </div>
              </div>
              <a
                href="mailto:pranjitbaghwar45@gmail.com?subject=Living%20Word%20Bible%20Support%20-%20v1.0.0"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A231C] text-[#F5D76E] text-xs font-bold hover:bg-[#3D3325] transition-colors self-start sm:self-auto cursor-pointer"
              >
                <span>Contact Developer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8DEC9] bg-[#FAF6EE] flex items-center justify-between shrink-0">
          <div className="text-xs text-[#8A795D]">
            <span>Last Updated: Version 1.0.0 Release · AMDG</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-[#1C1917] font-bold text-xs transition-colors cursor-pointer shadow-xs"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
};
