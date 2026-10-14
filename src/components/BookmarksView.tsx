import React, { useState } from 'react';
import { Bookmark, Trash2, Volume2, Edit3, Check, Copy, BookOpen } from 'lucide-react';
import { Verse, UI_TRANSLATIONS, LanguageCode } from '../data/bibleData';

export interface SavedBookmark {
  key: string;
  book: string;
  chapter: number;
  verse: Verse;
  note?: string;
  savedAt: string;
}

interface BookmarksViewProps {
  bookmarks: SavedBookmark[];
  language: LanguageCode;
  onRemoveBookmark: (key: string) => void;
  onUpdateNote: (key: string, note: string) => void;
  onSpeakVerse: (text: string) => void;
  onNavigateToChapter: (book: string, chapter: number) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarks,
  language,
  onRemoveBookmark,
  onUpdateNote,
  onSpeakVerse,
  onNavigateToChapter
}) => {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.English;

  const handleStartEditNote = (bookmark: SavedBookmark) => {
    setEditingKey(bookmark.key);
    setNoteText(bookmark.note || '');
  };

  const handleSaveNote = (key: string) => {
    onUpdateNote(key, noteText);
    setEditingKey(null);
  };

  const handleCopy = (bookmark: SavedBookmark) => {
    const text = `"${bookmark.verse.text}" — ${bookmark.book} ${bookmark.chapter}:${bookmark.verse.verseNumber}`;
    navigator.clipboard.writeText(text);
    setCopiedKey(bookmark.key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-12">
      {/* Title Header */}
      <div className="bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] shadow-xs p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-[#FAF3DC] text-[#9A7B20] border border-[#D4AF37]/50">
            <Bookmark className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C1917]">
              {t.bookmarks}
            </h1>
            <p className="font-sans-ui text-xs sm:text-sm text-[#7D705C] mt-0.5">
              Saved scriptures & personal reflections for spiritual meditation
            </p>
          </div>
        </div>
      </div>

      {/* Bookmarks List */}
      {bookmarks.length === 0 ? (
        <div className="bg-[#FDFBF7] rounded-2xl border border-[#E3DAC8] p-10 text-center space-y-4">
          <Bookmark className="w-10 h-10 text-[#C5A028] mx-auto opacity-50" />
          <h3 className="font-cinzel text-lg font-bold text-[#1C1917]">No Bookmarks Yet</h3>
          <p className="font-lora text-sm text-[#7D705C] max-w-md mx-auto">
            {t.noBookmarks}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((b) => (
            <div
              key={b.key}
              className="bg-[#FDFBF7] rounded-xl border border-[#E3DAC8] p-5 sm:p-6 shadow-xs hover:border-[#D4AF37]/70 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-sm sm:text-base font-bold text-[#1C1917]">
                    {b.book} {b.chapter}:{b.verse.verseNumber}
                  </span>
                  <span className="text-[11px] font-sans-ui text-[#8A795D]">
                    · {b.savedAt}
                  </span>
                </div>

                {/* Top Action Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSpeakVerse(b.verse.text)}
                    title="Listen to Recitation"
                    className="p-1.5 rounded-md hover:bg-[#F4EFEA] text-[#8C6D1F] transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopy(b)}
                    title="Copy Verse"
                    className="p-1.5 rounded-md hover:bg-[#F4EFEA] text-[#574D3F] transition-colors"
                  >
                    {copiedKey === b.key ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => onNavigateToChapter(b.book, b.chapter)}
                    title="Read in Bible"
                    className="p-1.5 rounded-md hover:bg-[#F4EFEA] text-[#574D3F] transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(b.key)}
                    title="Delete Bookmark"
                    className="p-1.5 rounded-md hover:bg-rose-50 text-rose-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scripture text */}
              <p className="font-lora text-base sm:text-lg text-[#2C2416] italic leading-relaxed">
                "{b.verse.text}"
              </p>

              {/* Personal Reflection Note */}
              <div className="pt-2 border-t border-[#EAE3D2]">
                {editingKey === b.key ? (
                  <div className="space-y-2 mt-1">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Write your personal prayer or devotional meditation..."
                      className="w-full text-xs sm:text-sm font-sans-ui p-2.5 rounded-lg border border-[#DDD5C5] bg-[#FAF7F0] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      rows={2}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveNote(b.key)}
                        className="px-3 py-1 bg-[#D4AF37] text-[#1C1917] rounded-md text-xs font-semibold hover:brightness-105"
                      >
                        {t.addNote}
                      </button>
                      <button
                        onClick={() => setEditingKey(null)}
                        className="px-3 py-1 bg-[#F4EFEA] text-[#574D3F] rounded-md text-xs font-semibold hover:bg-[#EAE3D2]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs font-sans-ui text-[#7D705C] mt-1">
                    <p className="italic">
                      {b.note ? `Note: "${b.note}"` : 'No personal note added.'}
                    </p>
                    <button
                      onClick={() => handleStartEditNote(b)}
                      className="flex items-center gap-1 text-[#8C6D1F] hover:underline"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{b.note ? 'Edit Note' : 'Add Note'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
