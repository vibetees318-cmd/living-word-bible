/**
 * Live Bible API & Real-time Multilingual Translation Service
 * Connects to public open-source Bible API: https://bible-api.com/
 * Features graceful caching, parallel batch translation, and instant native script fallback.
 */

import { ChapterData, Verse, LanguageCode, SUPPORTED_LANGUAGES, getChapterContent, BIBLE_BOOKS } from '../data/bibleData';

interface RawBibleApiResponse {
  reference: string;
  verses: Array<{
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }>;
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note?: string;
}

// In-memory cache for fetched chapters
const chapterCache = new Map<string, ChapterData>();
// In-memory cache for translated verses: `${book}-${chapter}-${langCode}`
const translationCache = new Map<string, Verse[]>();
// In-memory cache for single text translations
const singleTextCache = new Map<string, string>();

/**
 * Helper to get the native text of a verse for a given language
 */
export function getVerseNativeText(verse: Verse, language: LanguageCode): string {
  if (language === 'English') return verse.text;
  if (language === 'Hindi' && verse.hindiText) return verse.hindiText;
  if (language === 'Assamese' && verse.assameseText) return verse.assameseText;
  if (language === 'Spanish' && verse.spanishText) return verse.spanishText;
  if (verse.translatedText && verse.translatedText.trim()) return verse.translatedText;
  return verse.text;
}

/**
 * Fetch chapter from live Bible API (https://bible-api.com/)
 */
export async function fetchLiveChapter(bookId: string, chapterNumber: number): Promise<ChapterData> {
  const cacheKey = `${bookId.toLowerCase()}-${chapterNumber}`;
  if (chapterCache.has(cacheKey)) {
    return chapterCache.get(cacheKey)!;
  }

  const bookInfo = BIBLE_BOOKS.find(b => b.id.toLowerCase() === bookId.toLowerCase()) || BIBLE_BOOKS[0];
  const queryName = bookInfo.name.replace(/\s+/g, '+');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500); // 6.5s timeout

    const url = `https://bible-api.com/${queryName}+${chapterNumber}?translation=web`;
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Bible API responded with HTTP ${response.status}`);
    }

    const data: RawBibleApiResponse = await response.json();

    if (data.verses && data.verses.length > 0) {
      const parsedVerses: Verse[] = data.verses.map(v => ({
        verseNumber: v.verse,
        text: v.text.trim().replace(/\n+/g, ' ')
      }));

      const result: ChapterData = {
        book: bookInfo.name,
        chapter: chapterNumber,
        testament: bookInfo.testament,
        title: `${bookInfo.name} - Chapter ${chapterNumber}`,
        translationName: data.translation_name || 'World English Bible',
        verses: parsedVerses
      };

      chapterCache.set(cacheKey, result);
      return result;
    }
  } catch (error) {
    console.warn('Live Bible API fetch failed or timed out, using canonical fallback:', error);
  }

  // Graceful fallback to rich canonical content
  const fallback = getChapterContent(bookId, chapterNumber);
  chapterCache.set(cacheKey, fallback);
  return fallback;
}

/**
 * Translate a single text string into the native script of targetLanguage
 */
export async function translateSingleText(
  text: string,
  targetLanguage: LanguageCode
): Promise<string> {
  if (targetLanguage === 'English' || !text || !text.trim()) {
    return text;
  }

  const cacheKey = `${targetLanguage}:${text.trim()}`;
  if (singleTextCache.has(cacheKey)) {
    return singleTextCache.get(cacheKey)!;
  }

  const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === targetLanguage);
  if (!langMeta) return text;

  try {
    const translateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${langMeta.isoCode}&dt=t&q=${encodeURIComponent(text.trim())}`;
    const res = await fetch(translateUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.json();
    if (Array.isArray(raw) && Array.isArray(raw[0])) {
      const translated = raw[0].map((chunk: unknown[]) => chunk[0]).join('').trim();
      if (translated) {
        singleTextCache.set(cacheKey, translated);
        return translated;
      }
    }
  } catch (err) {
    console.warn('Single text translation error:', err);
  }

  return text;
}

/**
 * Translate array of verses into target language using parallel batches
 */
export async function translateChapterVerses(
  bookId: string,
  chapterNumber: number,
  verses: Verse[],
  targetLanguage: LanguageCode
): Promise<Verse[]> {
  if (targetLanguage === 'English') {
    return verses;
  }

  const cacheKey = `${bookId.toLowerCase()}-${chapterNumber}-${targetLanguage}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === targetLanguage);
  if (!langMeta) {
    return verses;
  }

  // Check if verses already have curated native translations
  const allCurated = verses.every(v => {
    if (targetLanguage === 'Hindi') return !!v.hindiText;
    if (targetLanguage === 'Assamese') return !!v.assameseText;
    if (targetLanguage === 'Spanish') return !!v.spanishText;
    return false;
  });

  if (allCurated) {
    const curatedVerses = verses.map(v => ({
      ...v,
      translatedText: targetLanguage === 'Hindi' ? v.hindiText : targetLanguage === 'Assamese' ? v.assameseText : v.spanishText
    }));
    translationCache.set(cacheKey, curatedVerses);
    return curatedVerses;
  }

  try {
    const batchSize = 8;
    const batches: Verse[][] = [];
    for (let i = 0; i < verses.length; i += batchSize) {
      batches.push(verses.slice(i, i + batchSize));
    }

    // Run batch translations concurrently
    const batchPromises = batches.map(async (slice) => {
      // First check if all items in slice have curated text
      const sliceMapped: Verse[] = slice.map(v => {
        let curated: string | undefined = undefined;
        if (targetLanguage === 'Hindi' && v.hindiText) curated = v.hindiText;
        if (targetLanguage === 'Assamese' && v.assameseText) curated = v.assameseText;
        if (targetLanguage === 'Spanish' && v.spanishText) curated = v.spanishText;
        return {
          ...v,
          translatedText: curated
        };
      });

      const needsFetch = sliceMapped.some(v => !v.translatedText);
      if (!needsFetch) {
        return sliceMapped;
      }

      const combinedText = slice.map(v => v.text).join('\n~~~~\n');
      const translateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${langMeta.isoCode}&dt=t&q=${encodeURIComponent(combinedText)}`;

      const res = await fetch(translateUrl);
      if (!res.ok) throw new Error('Translation API request failed');

      const raw = await res.json();
      let translatedCombined = '';
      if (Array.isArray(raw) && Array.isArray(raw[0])) {
        translatedCombined = raw[0].map((chunk: unknown[]) => chunk[0]).join('');
      }

      const translatedParts = translatedCombined.split(/~~~~|~ ~ ~ ~/g).map(s => s.trim());

      return sliceMapped.map((v, subIdx) => {
        if (v.translatedText) return v;
        const trans = translatedParts[subIdx] || v.text;
        return {
          ...v,
          translatedText: trans
        };
      });
    });

    const resultsBatches = await Promise.all(batchPromises);
    const translatedResults = resultsBatches.flat();

    translationCache.set(cacheKey, translatedResults);
    return translatedResults;
  } catch (err) {
    console.warn('Real-time translation error, using available native text:', err);
    return verses.map(v => ({
      ...v,
      translatedText: v.hindiText || v.assameseText || v.spanishText || v.text
    }));
  }
}
