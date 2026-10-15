export type LanguageCode =
  | 'English'
  | 'Hindi'
  | 'Assamese'
  | 'Bengali'
  | 'Nepali'
  | 'Urdu'
  | 'Odia'
  | 'Tamil'
  | 'Telugu'
  | 'Malayalam'
  | 'Kannada'
  | 'Punjabi'
  | 'Gujarati'
  | 'Marathi'
  | 'Spanish';

export const JESUS_AVATAR_IMAGE_URL = '/jesus_portrait.jpg';
export const JESUS_AVATAR_FALLBACK_URL = '/jesus_portrait.jpg';

export interface LanguageMeta {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  isoCode: string;
  ttsLocales: string[];
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'English', nativeName: 'English', englishName: 'English', isoCode: 'en', ttsLocales: ['en-US', 'en-GB', 'en-AU', 'en-IN', 'en'] },
  { code: 'Hindi', nativeName: 'हिंदी', englishName: 'Hindi', isoCode: 'hi', ttsLocales: ['hi-IN', 'hi'] },
  { code: 'Assamese', nativeName: 'অসমীয়া', englishName: 'Assamese', isoCode: 'as', ttsLocales: ['as-IN', 'as', 'bn-IN', 'hi-IN'] },
  { code: 'Bengali', nativeName: 'বাংলা', englishName: 'Bengali', isoCode: 'bn', ttsLocales: ['bn-IN', 'bn-BD', 'bn'] },
  { code: 'Nepali', nativeName: 'नेपाली', englishName: 'Nepali', isoCode: 'ne', ttsLocales: ['ne-NP', 'ne', 'hi-IN'] },
  { code: 'Urdu', nativeName: 'اردو', englishName: 'Urdu', isoCode: 'ur', ttsLocales: ['ur-PK', 'ur-IN', 'ur'] },
  { code: 'Odia', nativeName: 'ଓଡ଼ିଆ', englishName: 'Odia', isoCode: 'or', ttsLocales: ['or-IN', 'or', 'bn-IN', 'hi-IN'] },
  { code: 'Tamil', nativeName: 'தமிழ்', englishName: 'Tamil', isoCode: 'ta', ttsLocales: ['ta-IN', 'ta-LK', 'ta'] },
  { code: 'Telugu', nativeName: 'తెలుగు', englishName: 'Telugu', isoCode: 'te', ttsLocales: ['te-IN', 'te'] },
  { code: 'Malayalam', nativeName: 'മലയാളം', englishName: 'Malayalam', isoCode: 'ml', ttsLocales: ['ml-IN', 'ml'] },
  { code: 'Kannada', nativeName: 'ಕನ್ನಡ', englishName: 'Kannada', isoCode: 'kn', ttsLocales: ['kn-IN', 'kn'] },
  { code: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', isoCode: 'pa', ttsLocales: ['pa-IN', 'pa'] },
  { code: 'Gujarati', nativeName: 'ગુજરાતી', englishName: 'Gujarati', isoCode: 'gu', ttsLocales: ['gu-IN', 'gu'] },
  { code: 'Marathi', nativeName: 'मराठी', englishName: 'Marathi', isoCode: 'mr', ttsLocales: ['mr-IN', 'mr'] },
  { code: 'Spanish', nativeName: 'Español', englishName: 'Spanish', isoCode: 'es', ttsLocales: ['es-ES', 'es-MX', 'es-US', 'es'] }
];

export interface Verse {
  verseNumber: number;
  text: string;
  translatedText?: string;
  hindiText?: string;
  assameseText?: string;
  spanishText?: string;
}

export interface ChapterData {
  book: string;
  chapter: number;
  testament: 'Old' | 'New';
  title?: string;
  translationName?: string;
  verses: Verse[];
}

export interface BookInfo {
  id: string;
  name: string;
  testament: 'Old' | 'New';
  chaptersCount: number;
  category: string;
  localizedNames: Record<LanguageCode, string>;
}

// Complete Canonical 66 Books of the Holy Bible
export const BIBLE_BOOKS: BookInfo[] = [
  // New Testament (27 Books)
  {
    id: 'matthew', name: 'Matthew', testament: 'New', chaptersCount: 28, category: 'Gospels',
    localizedNames: {
      English: 'Matthew', Hindi: 'मत्ती', Assamese: 'মথি', Bengali: 'মথি', Nepali: 'मत्ती',
      Urdu: 'متی', Odia: 'ମାଥିଉ', Tamil: 'மத்தேயு', Telugu: 'మత్తయి', Malayalam: 'മത്തായി',
      Kannada: 'ಮತ್ತಾಯ', Punjabi: 'ਮੱਤੀ', Gujarati: 'માથ્થી', Marathi: 'मत्तय', Spanish: 'San Mateo'
    }
  },
  {
    id: 'mark', name: 'Mark', testament: 'New', chaptersCount: 16, category: 'Gospels',
    localizedNames: {
      English: 'Mark', Hindi: 'मरकुस', Assamese: 'মাৰ্ক', Bengali: 'মার্ক', Nepali: 'मर्कूस',
      Urdu: 'مرقس', Odia: 'ମାର୍କ', Tamil: 'மாற்கு', Telugu: 'మార్కు', Malayalam: 'മർക്കൊസ്',
      Kannada: 'ಮಾರ್ಕ', Punjabi: 'ਮਰਕੁਸ', Gujarati: 'માર્ક', Marathi: 'मार्क', Spanish: 'San Marcos'
    }
  },
  {
    id: 'luke', name: 'Luke', testament: 'New', chaptersCount: 24, category: 'Gospels',
    localizedNames: {
      English: 'Luke', Hindi: 'लूका', Assamese: 'লূক', Bengali: 'লূক', Nepali: 'लूका',
      Urdu: 'لوقا', Odia: 'ଲୂକ', Tamil: 'லூக்கா', Telugu: 'లూకా', Malayalam: 'ലൂക്കോസ്',
      Kannada: 'ಲೂಕ', Punjabi: 'ਲੂਕਾ', Gujarati: 'લૂક', Marathi: 'लूक', Spanish: 'San Lucas'
    }
  },
  {
    id: 'john', name: 'John', testament: 'New', chaptersCount: 21, category: 'Gospels',
    localizedNames: {
      English: 'John', Hindi: 'यूहन्ना', Assamese: 'যোহন', Bengali: 'যোহন', Nepali: 'यूहन्ना',
      Urdu: 'یوحنا', Odia: 'ଯୋହନ', Tamil: 'யோவான்', Telugu: 'యోహాను', Malayalam: 'യോഹന്നാൻ',
      Kannada: 'ಯೋಹಾನ', Punjabi: 'ਯੂਹੰਨਾ', Gujarati: 'યોહાન', Marathi: 'योहान', Spanish: 'San Juan'
    }
  },
  {
    id: 'acts', name: 'Acts', testament: 'New', chaptersCount: 28, category: 'History',
    localizedNames: {
      English: 'Acts', Hindi: 'प्रेरितों के काम', Assamese: 'পাঁচনিসকলৰ কৰ্ম', Bengali: 'প্রেরিত', Nepali: 'प्रेरित',
      Urdu: 'اعمال', Odia: 'ପ୍ରେରିତ', Tamil: 'அப்போஸ்தலர்', Telugu: 'అపొస్తలుల కార్యములు', Malayalam: 'പ്രവൃത്തികൾ',
      Kannada: 'ಅಪೊಸ್ತಲರ ಕೃತ್ಯಗಳು', Punjabi: 'ਰਸੂਲਾਂ ਦੇ ਕਰਤੱਬ', Gujarati: 'પ્રેરિતોનાં કૃત્યો', Marathi: 'प्रेषितांची कृत्ये', Spanish: 'Hechos'
    }
  },
  {
    id: 'romans', name: 'Romans', testament: 'New', chaptersCount: 16, category: 'Pauline Epistles',
    localizedNames: {
      English: 'Romans', Hindi: 'रोमियों', Assamese: 'ৰোমীয়া', Bengali: 'রোমীয়', Nepali: 'रोमी',
      Urdu: 'رومیوں', Odia: 'ରୋମୀୟ', Tamil: 'ரோமர்', Telugu: 'రోమీయులకు', Malayalam: 'റോമർ',
      Kannada: 'ರೋಮಾಪುರದವರಿಗೆ', Punjabi: 'ਰੋਮੀਆਂ', Gujarati: 'રોમનોને પત્ર', Marathi: 'रोमकरांस पत्र', Spanish: 'Romanos'
    }
  },
  {
    id: '1corinthians', name: '1 Corinthians', testament: 'New', chaptersCount: 16, category: 'Pauline Epistles',
    localizedNames: {
      English: '1 Corinthians', Hindi: '1 कुरिन्थियों', Assamese: '১ কৰিন্থীয়া', Bengali: '১ করিন্থীয়', Nepali: '१ कोरिन्थी',
      Urdu: '1 کرنتھیوں', Odia: '୧ କରିନ୍ଥୀୟ', Tamil: '1 கொரிந்தியர்', Telugu: '1 కొరింథీయులకు', Malayalam: '1 കൊരിന്ത്യർ',
      Kannada: '1 ಕೊರಿಂಥದವರಿಗೆ', Punjabi: '1 ਕੁਰਿੰਥੀਆਂ', Gujarati: '૧ કોરીંથીઓને', Marathi: '१ करिंथकरांस', Spanish: '1 Corintios'
    }
  },
  {
    id: '2corinthians', name: '2 Corinthians', testament: 'New', chaptersCount: 13, category: 'Pauline Epistles',
    localizedNames: {
      English: '2 Corinthians', Hindi: '2 कुरिन्थियों', Assamese: '২ কৰিন্থীয়া', Bengali: '২ করিন্থীয়', Nepali: '२ कोरिन्थी',
      Urdu: '2 کرنتھیوں', Odia: '୨ କରିନ୍ଥୀୟ', Tamil: '2 கொரிந்தியர்', Telugu: '2 కొరింథీయులకు', Malayalam: '2 കൊരിന്ത്യർ',
      Kannada: '2 ಕೊರಿಂಥದವರಿಗೆ', Punjabi: '2 ਕੁਰਿੰਥੀਆਂ', Gujarati: '૨ કોરીંથીઓને', Marathi: '२ करिंथकरांस', Spanish: '2 Corintios'
    }
  },
  {
    id: 'galatians', name: 'Galatians', testament: 'New', chaptersCount: 6, category: 'Pauline Epistles',
    localizedNames: {
      English: 'Galatians', Hindi: 'गलातियों', Assamese: 'গালাতীয়া', Bengali: 'গালাতীয়', Nepali: 'गलाती',
      Urdu: 'گلتیوں', Odia: 'ଗାଲାତୀୟ', Tamil: 'கலாத்தியர்', Telugu: 'గలతీయులకు', Malayalam: 'ഗലാത്യർ',
      Kannada: 'ಗಲಾತ್ಯದವರಿಗೆ', Punjabi: 'ਗਲਾਤੀਆਂ', Gujarati: 'ગલાતીઓને', Marathi: 'गलतीकरांस', Spanish: 'Gálatas'
    }
  },
  {
    id: 'ephesians', name: 'Ephesians', testament: 'New', chaptersCount: 6, category: 'Pauline Epistles',
    localizedNames: {
      English: 'Ephesians', Hindi: 'इफिसियों', Assamese: 'ইফিচীয়া', Bengali: 'ইফিষীয়', Nepali: 'एफिसी',
      Urdu: 'افسیوں', Odia: 'ଏଫିସୀୟ', Tamil: 'எபேசியர்', Telugu: 'ఎఫెసీయులకు', Malayalam: 'എഫെസ്യർ',
      Kannada: 'ಎಫೆಸದವರಿಗೆ', Punjabi: 'ਅਫ਼ਸੀਆਂ', Gujarati: 'એફેસીઓને', Marathi: 'इफिसकरांस', Spanish: 'Efesios'
    }
  },
  {
    id: 'philippians', name: 'Philippians', testament: 'New', chaptersCount: 4, category: 'Pauline Epistles',
    localizedNames: {
      English: 'Philippians', Hindi: 'फिलिप्पियों', Assamese: 'ফিলিপীয়া', Bengali: 'ফিলিপীয়', Nepali: 'फिलिप्पी',
      Urdu: 'فلپیوں', Odia: 'ଫିଲିପ୍ପୀୟ', Tamil: 'பிலிப்பியர்', Telugu: 'ఫిలిప్పీయులకు', Malayalam: 'ഫിലിപ്പിയർ',
      Kannada: 'ಫಿಲಿಪ್ಪಿಯವರಿಗೆ', Punjabi: 'ਫ਼ਿਲਿੱਪੀਆਂ', Gujarati: 'ફિલિప్పిઓને', Marathi: 'फिलिप्पैकरांस', Spanish: 'Filipenses'
    }
  },
  {
    id: 'colossians', name: 'Colossians', testament: 'New', chaptersCount: 4, category: 'Pauline Epistles',
    localizedNames: {
      English: 'Colossians', Hindi: 'कुलुस्सियों', Assamese: 'কলচীয়া', Bengali: 'কলসীয়', Nepali: 'कलस्सी',
      Urdu: 'کلسیوں', Odia: 'କଲସୀୟ', Tamil: 'கொலோசெயர்', Telugu: 'కొలొస్సయులకు', Malayalam: 'കൊലോസ്യർ',
      Kannada: 'ಕೊಲೊಸ್ಸೆಯವರಿಗೆ', Punjabi: 'ਕੁਲੁੱਸੀਆਂ', Gujarati: 'કલોસીઓને', Marathi: 'कलस्सैकरांस', Spanish: 'Colosenses'
    }
  },
  {
    id: '1thessalonians', name: '1 Thessalonians', testament: 'New', chaptersCount: 5, category: 'Pauline Epistles',
    localizedNames: {
      English: '1 Thessalonians', Hindi: '1 थिस्सलुनीकियों', Assamese: '১ থিচলনীকীয়া', Bengali: '১ থিষলনীকীয়', Nepali: '१ थिस्सलोनिकी',
      Urdu: '1 تھسلنیکیوں', Odia: '୧ ଥେସଲନୀକୀୟ', Tamil: '1 தெசலோனிக்கேயர்', Telugu: '1 థెస్సలొనీకయులకు', Malayalam: '1 തെസ്സലോനിക്യർ',
      Kannada: '1 ಥೆಸಲೋನಿಕದವರಿಗೆ', Punjabi: '1 ਥੱਸਲੁਨੀਕੀਆਂ', Gujarati: '૧ થેસ્સાલોનીકીઓને', Marathi: '१ थेस्सलनीकाकरांस', Spanish: '1 Tesalonicenses'
    }
  },
  {
    id: '2thessalonians', name: '2 Thessalonians', testament: 'New', chaptersCount: 3, category: 'Pauline Epistles',
    localizedNames: {
      English: '2 Thessalonians', Hindi: '2 थिस्सलुनीकियों', Assamese: '২ থিচলনীকীয়া', Bengali: '২ থিষলনীকীয়', Nepali: '२ थिस्सलोनिकी',
      Urdu: '2 تھسلنیکیوں', Odia: '୨ ଥେସଲନୀକୀୟ', Tamil: '2 தெசலோனிக்கேயர்', Telugu: '2 థెస్సలొనీకయులకు', Malayalam: '2 തെസ്സലോനിക്യർ',
      Kannada: '2 ಥೆಸಲೋನಿಕದವರಿಗೆ', Punjabi: '2 ਥੱਸਲੁਨੀਕੀਆਂ', Gujarati: '૨ થેસ્સાલોનીકીઓને', Marathi: '२ थेस्सलनीकाकरांस', Spanish: '2 Tesalonicenses'
    }
  },
  {
    id: '1timothy', name: '1 Timothy', testament: 'New', chaptersCount: 6, category: 'Pauline Epistles',
    localizedNames: {
      English: '1 Timothy', Hindi: '1 तीमुथियुस', Assamese: '১ তীমথিয়', Bengali: '১ তীমথিয়', Nepali: '१ तिमोथी',
      Urdu: '1 تیمتھیس', Odia: '୧ ତୀମଥି', Tamil: '1 தீமோத்தேயு', Telugu: '1 తిమోతికి', Malayalam: '1 തിമൊഥെയൊസ്',
      Kannada: '1 ತಿಮೊಥೆಯನಿಗೆ', Punjabi: '1 ਤਿਮੋਥਿਉਸ', Gujarati: '૧ તિમોથીને', Marathi: '१ तीमथ्याला', Spanish: '1 Timoteo'
    }
  },
  {
    id: '2timothy', name: '2 Timothy', testament: 'New', chaptersCount: 4, category: 'Pauline Epistles',
    localizedNames: {
      English: '2 Timothy', Hindi: '2 तीमुथियुस', Assamese: '২ তীমথিয়', Bengali: '২ তীমথিয়', Nepali: '२ तिमोथी',
      Urdu: '2 تیمتھیس', Odia: '୨ ତୀମଥି', Tamil: '2 தீமோத்தேயு', Telugu: '2 తిమోతికి', Malayalam: '2 തിമൊഥെയൊസ്',
      Kannada: '2 ತಿಮೊಥೆಯನಿಗೆ', Punjabi: '2 ਤਿਮੋਥਿਉਸ', Gujarati: '૨ તિમોથીને', Marathi: '२ तीमथ्याला', Spanish: '2 Timoteo'
    }
  },
  {
    id: 'titus', name: 'Titus', testament: 'New', chaptersCount: 3, category: 'Pauline Epistles',
    localizedNames: {
      English: 'Titus', Hindi: 'तीतुस', Assamese: 'তীত', Bengali: 'তীত', Nepali: 'तीतस',
      Urdu: 'تیطس', Odia: 'ତୀତସ', Tamil: 'தீத்து', Telugu: 'తీతుకు', Malayalam: 'തീത്തോസ്',
      Kannada: 'ತೀತನಿಗೆ', Punjabi: 'ਤੀਤੁਸ', Gujarati: 'તીતસને', Marathi: 'तीताला', Spanish: 'Tito'
    }
  },
  {
    id: 'philemon', name: 'Philemon', testament: 'New', chaptersCount: 1, category: 'Pauline Epistles',
    localizedNames: {
      English: 'Philemon', Hindi: 'फिलेमोन', Assamese: 'ফিলীমন', Bengali: 'ফিলীমন', Nepali: 'फिलेमोन',
      Urdu: 'فلیمون', Odia: 'ଫିଲୀମୋନ', Tamil: 'பிலேமோன்', Telugu: 'ఫిలేమోనుకు', Malayalam: 'ഫിലേമോൻ',
      Kannada: 'ಫಿಲೆಮೋನನಿಗೆ', Punjabi: 'ਫ਼ਿਲੇਮੋਨ', Gujarati: 'ફિલેમોનને', Marathi: 'फिलेमोनाला', Spanish: 'Filemón'
    }
  },
  {
    id: 'hebrews', name: 'Hebrews', testament: 'New', chaptersCount: 13, category: 'General Epistles',
    localizedNames: {
      English: 'Hebrews', Hindi: 'इब्रानियों', Assamese: 'ইব্ৰীয়া', Bengali: 'ইব্রীয়', Nepali: 'हिब्रू',
      Urdu: 'عبرانیوں', Odia: 'ଏବ୍ରୀ', Tamil: 'எபிரெயர்', Telugu: 'హెబ్రీయులకు', Malayalam: 'എബ്രായർ',
      Kannada: 'ಇಬ್ರಿಯರಿಗೆ', Punjabi: 'ਇਬਰਾਨੀਆਂ', Gujarati: 'હિબ્રૂઓને', Marathi: 'इब्री लोकांस', Spanish: 'Hebreos'
    }
  },
  {
    id: 'james', name: 'James', testament: 'New', chaptersCount: 5, category: 'General Epistles',
    localizedNames: {
      English: 'James', Hindi: 'याकूब', Assamese: 'যাকোব', Bengali: 'যাকোব', Nepali: 'याकूब',
      Urdu: 'یعقوب', Odia: 'ଯାକୁବ', Tamil: 'யாக்கோபு', Telugu: 'యాకోబు', Malayalam: 'യാക്കോബ്',
      Kannada: 'ಯಾಕೋಬನು', Punjabi: 'ਯਾਕੂਬ', Gujarati: 'યાકૂબનો પત્ર', Marathi: 'याकोबाचे पत्र', Spanish: 'Santiago'
    }
  },
  {
    id: '1peter', name: '1 Peter', testament: 'New', chaptersCount: 5, category: 'General Epistles',
    localizedNames: {
      English: '1 Peter', Hindi: '1 पतरस', Assamese: '১ পিতৰ', Bengali: '১ পিতর', Nepali: '१ पत्रुस',
      Urdu: '1 پطرس', Odia: '୧ ପିତର', Tamil: '1 பேதுரு', Telugu: '1 పేతురు', Malayalam: '1 പത്രൊസ്',
      Kannada: '1 ಪೇತ್ರನು', Punjabi: '1 ਪਤਰਸ', Gujarati: '૧ પીતરનો પત્ર', Marathi: '१ पेत्राचे पत्र', Spanish: '1 Pedro'
    }
  },
  {
    id: '2peter', name: '2 Peter', testament: 'New', chaptersCount: 3, category: 'General Epistles',
    localizedNames: {
      English: '2 Peter', Hindi: '2 पतरस', Assamese: '২ পিতৰ', Bengali: '২ পিতর', Nepali: '२ पत्रुस',
      Urdu: '2 پطرس', Odia: '୨ ପିତର', Tamil: '2 பேதுரு', Telugu: '2 పేతురు', Malayalam: '2 പത്രൊസ്',
      Kannada: '2 ಪೇತ್ರನು', Punjabi: '2 ਪਤਰਸ', Gujarati: '૨ પીતરનો પત્ર', Marathi: '२ पेत्राचे पत्र', Spanish: '2 Pedro'
    }
  },
  {
    id: '1john', name: '1 John', testament: 'New', chaptersCount: 5, category: 'General Epistles',
    localizedNames: {
      English: '1 John', Hindi: '1 यूहन्ना', Assamese: '১ যোহন', Bengali: '১ যোহন', Nepali: '१ यूहन्ना',
      Urdu: '1 يوحنا', Odia: '୧ ଯୋହନ', Tamil: '1 யோவான்', Telugu: '1 యోహాను', Malayalam: '1 യോഹന്നാൻ',
      Kannada: '1 ಯೋಹಾನನು', Punjabi: '1 ਯੂਹੰਨਾ', Gujarati: '૧ યોહાનનો પત્ર', Marathi: '१ योहानाचे पत्र', Spanish: '1 Juan'
    }
  },
  {
    id: '2john', name: '2 John', testament: 'New', chaptersCount: 1, category: 'General Epistles',
    localizedNames: {
      English: '2 John', Hindi: '2 यूहन्ना', Assamese: '২ যোহন', Bengali: '২ যোহন', Nepali: '२ यूहन्ना',
      Urdu: '2 يوحنا', Odia: '୨ ଯୋହନ', Tamil: '2 யோவான்', Telugu: '2 యోహాను', Malayalam: '2 യോഹന്നാൻ',
      Kannada: '2 ಯೋಹಾನನು', Punjabi: '2 ਯੂਹੰਨਾ', Gujarati: '૨ યોહાનનો પત્ર', Marathi: '२ योहानाचे पत्र', Spanish: '2 Juan'
    }
  },
  {
    id: '3john', name: '3 John', testament: 'New', chaptersCount: 1, category: 'General Epistles',
    localizedNames: {
      English: '3 John', Hindi: '3 यूहन्ना', Assamese: '৩ যোহন', Bengali: '৩ যোহন', Nepali: '३ यूहन्ना',
      Urdu: '3 يوحنا', Odia: '୩ ଯୋହନ', Tamil: '3 யோவான்', Telugu: '3 యోహాను', Malayalam: '3 യോഹന്നാൻ',
      Kannada: '3 ಯೋಹಾನನು', Punjabi: '3 ਯੂਹੰਨਾ', Gujarati: '૩ યોહાનનો પત્ર', Marathi: '३ योहानाचे पत्र', Spanish: '3 Juan'
    }
  },
  {
    id: 'jude', name: 'Jude', testament: 'New', chaptersCount: 1, category: 'General Epistles',
    localizedNames: {
      English: 'Jude', Hindi: 'यहूदा', Assamese: 'যিহূদা', Bengali: 'যিহূদা', Nepali: 'यहूदा',
      Urdu: 'یہوداہ', Odia: 'ଯିହୂଦା', Tamil: 'யூதா', Telugu: 'యూదా', Malayalam: 'യൂദാ',
      Kannada: 'ಯೂದನು', Punjabi: 'ਯਹੂਦਾਹ', Gujarati: 'યહૂદાનો પત્ર', Marathi: 'यहूदाचे पत्र', Spanish: 'Judas'
    }
  },
  {
    id: 'revelation', name: 'Revelation', testament: 'New', chaptersCount: 22, category: 'Prophecy',
    localizedNames: {
      English: 'Revelation', Hindi: 'प्रकाशितवाक्य', Assamese: 'প্ৰকাশিত বাক্য', Bengali: 'প্রকাশিত বাক্য', Nepali: 'प्रकाशित वाक्य',
      Urdu: 'مکاشفہ', Odia: 'ପ୍ରକାଶିତ ବାକ୍ୟ', Tamil: 'வெளிப்படுத்தின விசேஷம்', Telugu: 'ప్రకటన గ్రంథము', Malayalam: 'വെളിപ്പാടു',
      Kannada: 'ಪ್ರಕಟಣೆ', Punjabi: 'ਪਰਕਾਸ਼ ਦੀ ਪੋਥੀ', Gujarati: 'પ્રકટીકરણ', Marathi: 'प्रकटीकरण', Spanish: 'Apocalipsis'
    }
  },

  // Old Testament (39 Books)
  {
    id: 'genesis', name: 'Genesis', testament: 'Old', chaptersCount: 50, category: 'Law',
    localizedNames: {
      English: 'Genesis', Hindi: 'उत्पत्ति', Assamese: 'আদিপুস্তক', Bengali: 'আদিপুস্তক', Nepali: 'उत्पत्ति',
      Urdu: 'پیدائش', Odia: 'ଆଦିପୁସ୍ତକ', Tamil: 'ஆதியாகமம்', Telugu: 'ఆదికాండము', Malayalam: 'ഉല്പത്തി',
      Kannada: 'ಆದಿಕಾಂಡ', Punjabi: 'ਉਤਪਤ', Gujarati: 'ઉત્પત્તિ', Marathi: 'उत्पत्ति', Spanish: 'Génesis'
    }
  },
  {
    id: 'exodus', name: 'Exodus', testament: 'Old', chaptersCount: 40, category: 'Law',
    localizedNames: {
      English: 'Exodus', Hindi: 'निर्गमन', Assamese: 'যাত্ৰাপুস্তক', Bengali: 'যাত্রাপুস্তক', Nepali: 'प्रस्थान',
      Urdu: 'خروج', Odia: 'ଯାତ୍ରାପୁସ୍ତକ', Tamil: 'யாத்திராகமம்', Telugu: 'నిర్గమకాండము', Malayalam: 'പുറപ്പാട്',
      Kannada: 'ವಿಮೋಚನಕಾಂಡ', Punjabi: 'ਕੂਚ', Gujarati: 'નિર્ગમન', Marathi: 'निर्गम', Spanish: 'Éxodo'
    }
  },
  {
    id: 'leviticus', name: 'Leviticus', testament: 'Old', chaptersCount: 27, category: 'Law',
    localizedNames: {
      English: 'Leviticus', Hindi: 'लैव्यव्यवस्था', Assamese: 'লেবীয় পুস্তক', Bengali: 'লেবীয়', Nepali: 'लेवी',
      Urdu: 'احبار', Odia: 'ଲେବୀୟ', Tamil: 'லேவியராகமம்', Telugu: 'లేవీయకాండము', Malayalam: 'ലേവ്യപുസ്തകം',
      Kannada: 'ಯಾಜಕಕಾಂಡ', Punjabi: 'ਲੇਵੀਆਂ', Gujarati: 'લેવીય', Marathi: 'लेवीय', Spanish: 'Levítico'
    }
  },
  {
    id: 'numbers', name: 'Numbers', testament: 'Old', chaptersCount: 36, category: 'Law',
    localizedNames: {
      English: 'Numbers', Hindi: 'गिनती', Assamese: 'গণনা পুস্তক', Bengali: 'গণনাপুস্তক', Nepali: 'गन्ती',
      Urdu: 'گنتی', Odia: 'ଗଣନା', Tamil: 'எண்ணாகமம்', Telugu: 'సంఖ్యాకాండము', Malayalam: 'സംഖ്യാപുസ്തകം',
      Kannada: 'ಅರಣ್ಯಕಾಂಡ', Punjabi: 'ਗਿਣਤੀ', Gujarati: 'ગણના', Marathi: 'गणना', Spanish: 'Números'
    }
  },
  {
    id: 'deuteronomy', name: 'Deuteronomy', testament: 'Old', chaptersCount: 34, category: 'Law',
    localizedNames: {
      English: 'Deuteronomy', Hindi: 'व्यवस्थाविवरण', Assamese: 'দ্বিতীয় বিৱৰণ', Bengali: 'দ্বিতীয় বিবরণ', Nepali: 'व्यवस्था',
      Urdu: 'استثنا', Odia: 'ଦ୍ୱିତୀୟ ବିବରଣ', Tamil: 'உபாகமம்', Telugu: 'ద్వితీయోపదేశకాండము', Malayalam: 'ആവർത്തനം',
      Kannada: 'ಧರ್ಮೋಪದೇಶಕಾಂಡ', Punjabi: 'ਬਿਵਸਥਾਸਾਰ', Gujarati: 'પુનર્નિયમ', Marathi: 'अनुवाद', Spanish: 'Deuteronomio'
    }
  },
  {
    id: 'joshua', name: 'Joshua', testament: 'Old', chaptersCount: 24, category: 'History',
    localizedNames: {
      English: 'Joshua', Hindi: 'यहोशू', Assamese: 'যিহোচূৱা', Bengali: 'যিহোশূয়', Nepali: 'यहोशू',
      Urdu: 'یشوع', Odia: 'ଯିହୋଶୂୟ', Tamil: 'யோசுவா', Telugu: 'యెహోషువ', Malayalam: 'യോശുവ',
      Kannada: 'ಯೆಹೋಶುವ', Punjabi: 'ਯਹੋਸ਼ੂਆ', Gujarati: 'યહોશુઆ', Marathi: 'यहोशवा', Spanish: 'Josué'
    }
  },
  {
    id: 'judges', name: 'Judges', testament: 'Old', chaptersCount: 21, category: 'History',
    localizedNames: {
      English: 'Judges', Hindi: 'न्यायियों', Assamese: 'বিচাৰকৰ্ত্তাসকল', Bengali: 'বিচারকর্ত্তৃগণ', Nepali: 'न्यायकर्ता',
      Urdu: 'قضاۃ', Odia: 'ବିଚାରକର୍ତ୍ତା', Tamil: 'நியாயாதிபதிகள்', Telugu: 'న్యాయాధిపతులు', Malayalam: 'ന്യായാധിപന്മാർ',
      Kannada: 'ನ್ಯಾಯಸ್ಥಾಪಕರು', Punjabi: 'ਨਿਆਂਈਆਂ', Gujarati: 'ન્યાયાધીશો', Marathi: 'शास्ते', Spanish: 'Jueces'
    }
  },
  {
    id: 'ruth', name: 'Ruth', testament: 'Old', chaptersCount: 4, category: 'History',
    localizedNames: {
      English: 'Ruth', Hindi: 'रूत', Assamese: 'ৰূথ', Bengali: 'রূত', Nepali: 'रूथ',
      Urdu: 'روت', Odia: 'ରୂତ', Tamil: 'ரூத்', Telugu: 'రూతు', Malayalam: 'രൂത്ത്',
      Kannada: 'ರೂತಳು', Punjabi: 'ਰੂਥ', Gujarati: 'રૂથ', Marathi: 'रूथ', Spanish: 'Rut'
    }
  },
  {
    id: '1samuel', name: '1 Samuel', testament: 'Old', chaptersCount: 31, category: 'History',
    localizedNames: {
      English: '1 Samuel', Hindi: '1 शमूएल', Assamese: '১ চমূৱেল', Bengali: '১ শমূয়েল', Nepali: '१ शमूएल',
      Urdu: '1 سموئیل', Odia: '୧ ଶାମୁୟେଲ', Tamil: '1 சாமுவேல்', Telugu: '1 సమూయేలు', Malayalam: '1 ശമുവേൽ',
      Kannada: '1 ಸಮುವೇಲನು', Punjabi: '1 ਸਮੂਏਲ', Gujarati: '૧ શમૂએલ', Marathi: '१ शमुवेल', Spanish: '1 Samuel'
    }
  },
  {
    id: '2samuel', name: '2 Samuel', testament: 'Old', chaptersCount: 24, category: 'History',
    localizedNames: {
      English: '2 Samuel', Hindi: '2 शमूएल', Assamese: '২ চমূৱেল', Bengali: '২ শমূয়েল', Nepali: '२ शमूएल',
      Urdu: '2 سموئیل', Odia: '୨ ଶାମୁୟେଲ', Tamil: '2 சாமுவேல்', Telugu: '2 సమూయేలు', Malayalam: '2 ശമുവേൽ',
      Kannada: '2 ಸಮುವೇಲನು', Punjabi: '2 ਸਮੂਏਲ', Gujarati: '૨ શમૂએલ', Marathi: '२ शमुवेल', Spanish: '2 Samuel'
    }
  },
  {
    id: '1kings', name: '1 Kings', testament: 'Old', chaptersCount: 22, category: 'History',
    localizedNames: {
      English: '1 Kings', Hindi: '1 राजा', Assamese: '১ ৰাজাৱলী', Bengali: '১ রাজাবলি', Nepali: '१ राजा',
      Urdu: '1 سلاطین', Odia: '୧ ରାଜାବଳୀ', Tamil: '1 இராஜாக்கள்', Telugu: '1 రాజులు', Malayalam: '1 രാജാക്കന്മാർ',
      Kannada: '1 ಅರಸುಗಳು', Punjabi: '1 ਰਾਜਿਆਂ', Gujarati: '૧ રાજાઓ', Marathi: '१ राजे', Spanish: '1 Reyes'
    }
  },
  {
    id: '2kings', name: '2 Kings', testament: 'Old', chaptersCount: 25, category: 'History',
    localizedNames: {
      English: '2 Kings', Hindi: '2 राजा', Assamese: '২ ৰাজাৱলী', Bengali: '২ রাজাবলি', Nepali: '२ राजा',
      Urdu: '2 سلاطین', Odia: '୨ ରାଜାବଳୀ', Tamil: '2 இராஜாக்கள்', Telugu: '2 రాజులు', Malayalam: '2 രാജാക്കന്മാർ',
      Kannada: '2 ಅರಸುಗಳು', Punjabi: '2 ਰਾਜਿਆਂ', Gujarati: '૨ રાજાઓ', Marathi: '२ राजे', Spanish: '2 Reyes'
    }
  },
  {
    id: '1chronicles', name: '1 Chronicles', testament: 'Old', chaptersCount: 29, category: 'History',
    localizedNames: {
      English: '1 Chronicles', Hindi: '1 इतिहास', Assamese: '১ বংশাৱলী', Bengali: '১ বংশাবলি', Nepali: '१ इतिहास',
      Urdu: '1 تواریخ', Odia: '୧ ବଂଶାବଳୀ', Tamil: '1 நாளாகமம்', Telugu: '1 దినవృత్తాంతములు', Malayalam: '1 ദിനവൃത്താന്തം',
      Kannada: '1 ಪೂರ್ವಕಾಲದ ವೃತ್ತಾಂತ', Punjabi: '1 ਇਤਹਾਸ', Gujarati: '૧ કાળવૃત્તાંત', Marathi: '१ इतिहास', Spanish: '1 Crónicas'
    }
  },
  {
    id: '2chronicles', name: '2 Chronicles', testament: 'Old', chaptersCount: 36, category: 'History',
    localizedNames: {
      English: '2 Chronicles', Hindi: '2 इतिहास', Assamese: '২ বংশাৱলী', Bengali: '২ বংশাবলি', Nepali: '२ इतिहास',
      Urdu: '2 تواریخ', Odia: '୨ ବଂଶାବଳୀ', Tamil: '2 நாளாகமம்', Telugu: '2 దినవృత్తాంతములు', Malayalam: '2 ദിനവൃത്താന്തം',
      Kannada: '2 ಪೂರ್ವಕಾಲದ ವೃತ್ತಾಂತ', Punjabi: '2 ਇਤਹਾਸ', Gujarati: '૨ કાળવૃત્તાંત', Marathi: '२ इतिहास', Spanish: '2 Crónicas'
    }
  },
  {
    id: 'ezra', name: 'Ezra', testament: 'Old', chaptersCount: 10, category: 'History',
    localizedNames: {
      English: 'Ezra', Hindi: 'एज्रा', Assamese: 'ইজ্ৰা', Bengali: 'ইষ্রা', Nepali: 'एज्रा',
      Urdu: 'عزرا', Odia: 'ଏଜ୍ରା', Tamil: 'எஸ்றா', Telugu: 'ఎజ్రా', Malayalam: 'എസ്രാ',
      Kannada: 'ಎಜ್ರ', Punjabi: 'ਅਜ਼ਰਾ', Gujarati: 'એઝરા', Marathi: 'एज्रा', Spanish: 'Esdras'
    }
  },
  {
    id: 'nehemiah', name: 'Nehemiah', testament: 'Old', chaptersCount: 13, category: 'History',
    localizedNames: {
      English: 'Nehemiah', Hindi: 'नहेमायाह', Assamese: 'নহিমিয়া', Bengali: 'নহিমিয়', Nepali: 'नहेम्याह',
      Urdu: 'نحمیاہ', Odia: 'ନିହିମିୟା', Tamil: 'நெகேமியா', Telugu: 'నెహెమ్యా', Malayalam: 'നെഹെമ്യാവു',
      Kannada: 'ನೆಹೆಮೀಯ', Punjabi: 'ਨਹਮਯਾਹ', Gujarati: 'નહેમ્યા', Marathi: 'नहेम्या', Spanish: 'Nehemías'
    }
  },
  {
    id: 'esther', name: 'Esther', testament: 'Old', chaptersCount: 10, category: 'History',
    localizedNames: {
      English: 'Esther', Hindi: 'एस्तेर', Assamese: 'ইষ্টাৰ', Bengali: 'ইষ্টের', Nepali: 'एस्तर',
      Urdu: 'ایستر', Odia: 'ଏଷ୍ଟର', Tamil: 'எஸ்தர்', Telugu: 'ఎస్తేరు', Malayalam: 'എസ്ഥേർ',
      Kannada: 'ಎಸ್ತೇರಳು', Punjabi: 'ਅਸਤਰ', Gujarati: 'એસ્થેર', Marathi: 'एस्तेर', Spanish: 'Ester'
    }
  },
  {
    id: 'job', name: 'Job', testament: 'Old', chaptersCount: 42, category: 'Poetry & Wisdom',
    localizedNames: {
      English: 'Job', Hindi: 'अय्यूब', Assamese: 'ইয়োব', Bengali: 'ইয়োব', Nepali: 'अय्यूब',
      Urdu: 'ایوب', Odia: 'ଆୟୁବ', Tamil: 'யோபு', Telugu: 'యోబు', Malayalam: 'ഇയ്യോബ്',
      Kannada: 'ಯೋಬನು', Punjabi: 'ਅੱਯੂਬ', Gujarati: 'અયૂબ', Marathi: 'ईयोब', Spanish: 'Job'
    }
  },
  {
    id: 'psalms', name: 'Psalms', testament: 'Old', chaptersCount: 150, category: 'Poetry & Wisdom',
    localizedNames: {
      English: 'Psalms', Hindi: 'भजन संहिता', Assamese: 'গীতমালা', Bengali: 'গীতসংহিতা', Nepali: 'भजनसंग्रह',
      Urdu: 'زبور', Odia: 'ଗୀତସଂହିତା', Tamil: 'சங்கீதம்', Telugu: 'కీర్తనలు', Malayalam: 'സങ്കീർത്തനങ്ങൾ',
      Kannada: 'ಕೀರ್ತನೆಗಳು', Punjabi: 'ਜ਼ਬੂਰ', Gujarati: 'ગીતશાસ્ત્ર', Marathi: 'स्तोत्रसंहिता', Spanish: 'Salmos'
    }
  },
  {
    id: 'proverbs', name: 'Proverbs', testament: 'Old', chaptersCount: 31, category: 'Poetry & Wisdom',
    localizedNames: {
      English: 'Proverbs', Hindi: 'नीतिवचन', Assamese: 'হিতোপদেশ', Bengali: 'হিতোপদেশ', Nepali: 'हितोपदेश',
      Urdu: 'امثال', Odia: 'ହିତୋପଦେଶ', Tamil: 'நீதிமொழிகள்', Telugu: 'సామెతలు', Malayalam: 'സദൃശവാക്യങ്ങൾ',
      Kannada: 'ಜ್ಞಾನೋಕ್ತಿಗಳು', Punjabi: 'ਕਹਾਉਤਾਂ', Gujarati: 'નીતિવચનો', Marathi: 'नीतिसूत्रे', Spanish: 'Proverbios'
    }
  },
  {
    id: 'ecclesiastes', name: 'Ecclesiastes', testament: 'Old', chaptersCount: 12, category: 'Poetry & Wisdom',
    localizedNames: {
      English: 'Ecclesiastes', Hindi: 'सभोपदेशक', Assamese: 'উপদেশক', Bengali: 'উপদেশক', Nepali: 'उपदेशक',
      Urdu: 'واعظ', Odia: 'ଉପଦେଶକ', Tamil: 'பிரசங்கி', Telugu: 'ప్రసంగి', Malayalam: 'സഭാപ്രസംഗി',
      Kannada: 'ಪ್ರಸಂಗಿ', Punjabi: 'ਉਪਦੇਸ਼ਕ ਦੀ ਪੋਥੀ', Gujarati: 'સભાશિક્ષક', Marathi: 'उपदेशक', Spanish: 'Eclesiastés'
    }
  },
  {
    id: 'songofsolomon', name: 'Song of Solomon', testament: 'Old', chaptersCount: 8, category: 'Poetry & Wisdom',
    localizedNames: {
      English: 'Song of Solomon', Hindi: 'श्रेष्ठगीत', Assamese: 'প্ৰেমগীত', Bengali: 'পরমগীত', Nepali: 'श्रेष्ठगीत',
      Urdu: 'غزل الغزلات', Odia: 'ପରମଗୀତ', Tamil: 'உன்னதப்பாட்டு', Telugu: 'పరమగీతము', Malayalam: 'ഉത്തമഗീതം',
      Kannada: 'ಪರಮ ಗೀತ', Punjabi: 'ਸੁਲੇਮਾਨ ਦਾ ਗੀਤ', Gujarati: 'શ્રેષ્ઠગીત', Marathi: 'गीतरत्न', Spanish: 'Cantares'
    }
  },
  {
    id: 'isaiah', name: 'Isaiah', testament: 'Old', chaptersCount: 66, category: 'Major Prophets',
    localizedNames: {
      English: 'Isaiah', Hindi: 'यशायाह', Assamese: 'যিচয়া', Bengali: 'যিশাইয়', Nepali: 'यशैया',
      Urdu: 'یسعیاہ', Odia: 'ଯିଶାଇୟ', Tamil: 'ஏசாயா', Telugu: 'యెషయా', Malayalam: 'യെശയ്യാവു',
      Kannada: 'ಯೆಶಾಯ', Punjabi: 'ਯਸਾਯਾਹ', Gujarati: 'યશાયા', Marathi: 'यशया', Spanish: 'Isaías'
    }
  },
  {
    id: 'jeremiah', name: 'Jeremiah', testament: 'Old', chaptersCount: 52, category: 'Major Prophets',
    localizedNames: {
      English: 'Jeremiah', Hindi: 'यिर्मयाह', Assamese: 'যিৰিমিয়া', Bengali: 'যিরমিয়', Nepali: 'यर्मिया',
      Urdu: 'یرمیاہ', Odia: 'ଯିରିମିୟ', Tamil: 'எரேமியா', Telugu: 'యిర్మీయా', Malayalam: 'യിരെമ്യാവു',
      Kannada: 'ಯೆರೆಮೀಯ', Punjabi: 'ਯਿਰਮਯਾਹ', Gujarati: 'યિર્મેયા', Marathi: 'यिर्मया', Spanish: 'Jeremías'
    }
  },
  {
    id: 'lamentations', name: 'Lamentations', testament: 'Old', chaptersCount: 5, category: 'Major Prophets',
    localizedNames: {
      English: 'Lamentations', Hindi: 'विलापगीत', Assamese: 'বিলাপগীত', Bengali: 'বিলাপগান', Nepali: 'विलाप',
      Urdu: 'نوحہ', Odia: 'ବିଳାପ', Tamil: 'புலம்பல்', Telugu: 'విలాపవాక్యములు', Malayalam: 'വിലാപങ്ങൾ',
      Kannada: 'ಪ್ರಲಾಪಗಳು', Punjabi: 'ਵਿਰਲਾਪ', Gujarati: 'વિલાપ', Marathi: 'विलापगीत', Spanish: 'Lamentaciones'
    }
  },
  {
    id: 'ezekiel', name: 'Ezekiel', testament: 'Old', chaptersCount: 48, category: 'Major Prophets',
    localizedNames: {
      English: 'Ezekiel', Hindi: 'यहेजकेल', Assamese: 'যিহিষ্কেল', Bengali: 'যিহিষ্কেল', Nepali: 'इजकिएल',
      Urdu: 'حزقی ایل', Odia: 'ଯିହିଜିକଲ', Tamil: 'எசேக்கியேல்', Telugu: 'యెహెజ్కేలు', Malayalam: 'യേഹെസ്കേൽ',
      Kannada: 'ಯೆಹೆಜ್ಕೇಲನು', Punjabi: 'ਹਿਜ਼ਕੀਏਲ', Gujarati: 'હઝકિયેલ', Marathi: 'यहेज्केल', Spanish: 'Ezequiel'
    }
  },
  {
    id: 'daniel', name: 'Daniel', testament: 'Old', chaptersCount: 12, category: 'Major Prophets',
    localizedNames: {
      English: 'Daniel', Hindi: 'दानिय्येल', Assamese: 'দানিয়েল', Bengali: 'দানিয়েল', Nepali: 'दानिएल',
      Urdu: 'دانی ایل', Odia: 'ଦାନିୟେଲ', Tamil: 'தானியேல்', Telugu: 'దానియేలు', Malayalam: 'ദാനീയേൽ',
      Kannada: 'ದಾನಿಯೇಲನು', Punjabi: 'ਦਾਨੀਏਲ', Gujarati: 'દાનિયેલ', Marathi: 'दानीएल', Spanish: 'Daniel'
    }
  },
  {
    id: 'hosea', name: 'Hosea', testament: 'Old', chaptersCount: 14, category: 'Minor Prophets',
    localizedNames: {
      English: 'Hosea', Hindi: 'होशे', Assamese: 'হোচেয়া', Bengali: 'হোশেয়', Nepali: 'होशिया',
      Urdu: 'ہوسیع', Odia: 'ହୋଶେୟ', Tamil: 'ஓசியா', Telugu: 'హోషేయ', Malayalam: 'ഹോശേയ',
      Kannada: 'ಹೋಶೇಾಯ', Punjabi: 'ਹੋਸ਼ੇਆ', Gujarati: 'હોશિયા', Marathi: 'होशेय', Spanish: 'Oseas'
    }
  },
  {
    id: 'joel', name: 'Joel', testament: 'Old', chaptersCount: 3, category: 'Minor Prophets',
    localizedNames: {
      English: 'Joel', Hindi: 'योएल', Assamese: 'যোৱেল', Bengali: 'যোয়েল', Nepali: 'योएल',
      Urdu: 'یوایل', Odia: 'ଯୋୟେଲ', Tamil: 'யோவேல்', Telugu: 'యోవేలు', Malayalam: 'യോവേൽ',
      Kannada: 'ಯೋವೇಲನು', Punjabi: 'ਯੋਏਲ', Gujarati: 'યોએલ', Marathi: 'योएल', Spanish: 'Joel'
    }
  },
  {
    id: 'amos', name: 'Amos', testament: 'Old', chaptersCount: 9, category: 'Minor Prophets',
    localizedNames: {
      English: 'Amos', Hindi: 'आमोस', Assamese: 'আমোচ', Bengali: 'আমোষ', Nepali: 'आमोस',
      Urdu: 'عاموس', Odia: 'ଆମୋଷ', Tamil: 'ஆமோஸ்', Telugu: 'ఆమోసు', Malayalam: 'ആമോസ്',
      Kannada: 'ಆಮೋಸನು', Punjabi: 'ਆਮੋਸ', Gujarati: 'આમોસ', Marathi: 'आमोस', Spanish: 'Amós'
    }
  },
  {
    id: 'obadiah', name: 'Obadiah', testament: 'Old', chaptersCount: 1, category: 'Minor Prophets',
    localizedNames: {
      English: 'Obadiah', Hindi: 'ओबद्याह', Assamese: 'ওবদিয়া', Bengali: 'ওবদিয়', Nepali: 'ओबदिया',
      Urdu: 'عوبدیاہ', Odia: 'ଓବଦିୟ', Tamil: 'ஒபதியா', Telugu: 'ఓబద్యా', Malayalam: 'ഓബദ്യാവു',
      Kannada: 'ಓಬದ್ಯನು', Punjabi: 'ਓਬਦਯਾਹ', Gujarati: 'ઓબાદ્યા', Marathi: 'ओबद्या', Spanish: 'Abdías'
    }
  },
  {
    id: 'jonah', name: 'Jonah', testament: 'Old', chaptersCount: 4, category: 'Minor Prophets',
    localizedNames: {
      English: 'Jonah', Hindi: 'योना', Assamese: 'যোনা', Bengali: 'যোনা', Nepali: 'योना',
      Urdu: 'یونس', Odia: 'ଯୋନ', Tamil: 'யோனா', Telugu: 'యోనా', Malayalam: 'യോനാ',
      Kannada: 'ಯೋನನು', Punjabi: 'ਯੂਨਾਹ', Gujarati: 'યૂના', Marathi: 'योना', Spanish: 'Jonás'
    }
  },
  {
    id: 'micah', name: 'Micah', testament: 'Old', chaptersCount: 7, category: 'Minor Prophets',
    localizedNames: {
      English: 'Micah', Hindi: 'मीका', Assamese: 'মীখা', Bengali: 'মীখা', Nepali: 'मीका',
      Urdu: 'میکاہ', Odia: 'ମୀଖା', Tamil: 'மீகா', Telugu: 'మీకా', Malayalam: 'മീഖാ',
      Kannada: 'ಮೀಕಾಯನು', Punjabi: 'ਮੀਕਾਹ', Gujarati: 'મીખા', Marathi: 'मीखा', Spanish: 'Miqueas'
    }
  },
  {
    id: 'nahum', name: 'Nahum', testament: 'Old', chaptersCount: 3, category: 'Minor Prophets',
    localizedNames: {
      English: 'Nahum', Hindi: 'नहूम', Assamese: 'নহূম', Bengali: 'নহূম', Nepali: 'नहूम',
      Urdu: 'ناحوم', Odia: 'ନାହୂମ', Tamil: 'நாகூம்', Telugu: 'నహూము', Malayalam: 'നഹൂം',
      Kannada: 'ನಹೂಮನು', Punjabi: 'ਨਹੂਮ', Gujarati: 'નાહૂમ', Marathi: 'नहूम', Spanish: 'Nahúm'
    }
  },
  {
    id: 'habakkuk', name: 'Habakkuk', testament: 'Old', chaptersCount: 3, category: 'Minor Prophets',
    localizedNames: {
      English: 'Habakkuk', Hindi: 'हबक्कूक', Assamese: 'হবক্কূক', Bengali: 'হবক্‌কূক', Nepali: 'हबकूक',
      Urdu: 'حبقوق', Odia: 'ହବକ୍କୂକ', Tamil: 'அபகூக்', Telugu: 'హబక్కూకు', Malayalam: 'ഹബക്കൂക്ക്',
      Kannada: 'ಹಬಕ್ಕೂಕನು', Punjabi: 'ਹਬੱਕੂਕ', Gujarati: 'હબક્કૂક', Marathi: 'हबक्कूक', Spanish: 'Habacuc'
    }
  },
  {
    id: 'zephaniah', name: 'Zephaniah', testament: 'Old', chaptersCount: 3, category: 'Minor Prophets',
    localizedNames: {
      English: 'Zephaniah', Hindi: 'सपन्याह', Assamese: 'চফনিয়া', Bengali: 'সফনিয়', Nepali: 'सपन्याह',
      Urdu: 'صفنیاہ', Odia: 'ସଫନିୟ', Tamil: 'செப்பனியா', Telugu: 'జెఫన్యా', Malayalam: 'സെഫന്യാവു',
      Kannada: 'ಜೆಫನ್ಯನು', Punjabi: 'ਸਫ਼ਨਯਾਹ', Gujarati: 'સફાન્યા', Marathi: 'सफन्या', Spanish: 'Sofonías'
    }
  },
  {
    id: 'haggai', name: 'Haggai', testament: 'Old', chaptersCount: 2, category: 'Minor Prophets',
    localizedNames: {
      English: 'Haggai', Hindi: 'हाग्गै', Assamese: 'হগয়', Bengali: 'হগয়', Nepali: 'हाग्गै',
      Urdu: 'حجی', Odia: 'ହାଗୟ', Tamil: 'ஆகாய்', Telugu: 'హగ్గయి', Malayalam: 'ഹഗ്ഗായി',
      Kannada: 'ಹಗ್ಗಾಯನು', Punjabi: 'ਹੱਗਈ', Gujarati: 'હાગ્ગાય', Marathi: 'हाग्गय', Spanish: 'Hageo'
    }
  },
  {
    id: 'zechariah', name: 'Zechariah', testament: 'Old', chaptersCount: 14, category: 'Minor Prophets',
    localizedNames: {
      English: 'Zechariah', Hindi: 'जकर्याह', Assamese: 'জখৰিয়া', Bengali: 'জখরিয়', Nepali: 'जकरिया',
      Urdu: 'زکریاہ', Odia: 'ଜଖରିୟା', Tamil: 'சகரியா', Telugu: 'జెకర్యా', Malayalam: 'സെഖര്യാവു',
      Kannada: 'ಜೆಕರ್ಯನು', Punjabi: 'ਜ਼ਕਰਯਾਹ', Gujarati: 'ઝખાર્યા', Marathi: 'जखऱ्या', Spanish: 'Zacarías'
    }
  },
  {
    id: 'malachi', name: 'Malachi', testament: 'Old', chaptersCount: 4, category: 'Minor Prophets',
    localizedNames: {
      English: 'Malachi', Hindi: 'मलाकी', Assamese: 'মলাখী', Bengali: 'মালাখি', Nepali: 'मलाकी',
      Urdu: 'ملاکی', Odia: 'ମଲାଖି', Tamil: 'மல்கியா', Telugu: 'మలాకీ', Malayalam: 'മലാഖി',
      Kannada: 'ಮಲಾಕಿಯನು', Punjabi: 'ਮਲਾਕੀ', Gujarati: 'માલાખી', Marathi: 'मलाखी', Spanish: 'Malaquías'
    }
  }
];

// Curated core scriptures for instant fallback / offline
export const CURATED_CHAPTERS: Record<string, ChapterData> = {
  'matthew-5': {
    book: 'Matthew',
    chapter: 5,
    testament: 'New',
    title: 'The Sermon on the Mount & The Beatitudes',
    verses: [
      {
        verseNumber: 1,
        text: 'And seeing the multitudes, He went up into a mountain: and when He was seated, His disciples came unto Him:',
        hindiText: 'और वह भीड़ को देखकर पहाड़ पर चढ़ गया; और जब वह बैठ गया तो उसके चेले उसके पास आए:',
        assameseText: 'তেওঁ লোকসমূহক দেখি পৰ্ব্বতলৈ উঠি গ’ল; তাতে বহাৰ পিছত তেওঁৰ শিষ্যসকল তেওঁৰ ওচৰলৈ আহিল:',
        spanishText: 'Viendo la multitud, subió al monte; y sentándose, vinieron a él sus discípulos.'
      },
      {
        verseNumber: 2,
        text: 'And He opened His mouth, and taught them, saying,',
        hindiText: 'तब वह अपना मुंह खोलकर उन्हें यह उपदेश देने लगा, कि:',
        assameseText: 'তাতে তেওঁ মুখ মেলি তেওঁলোকক এইদৰে শিক্ষা দিবলৈ ধৰিলে,',
        spanishText: 'Y abriendo su boca les enseñaba, diciendo:'
      },
      {
        verseNumber: 3,
        text: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven.',
        hindiText: 'धन्य हैं वे जो मन के दीन हैं, क्योंकि स्वर्ग का राज्य उन्हीं का है।',
        assameseText: 'ধন্য সেই আত্মাত দৰিদ্ৰসকল, কিয়নো স্বৰ্গৰাজ্য তেওঁলোকৰেই।',
        spanishText: 'Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos.'
      },
      {
        verseNumber: 4,
        text: 'Blessed are they that mourn: for they shall be comforted.',
        hindiText: 'धन्य हैं वे जो शोक करते हैं, क्योंकि वे शान्ति पाएंगे।',
        assameseText: 'ধন্য সেই শোক কৰাসকল, কিয়নো তেওঁলোকে শান্ত্বনা পাব।',
        spanishText: 'Bienaventurados los que lloran, porque ellos recibirán consolación.'
      },
      {
        verseNumber: 5,
        text: 'Blessed are the meek: for they shall inherit the earth.',
        hindiText: 'धन्य हैं वे जो नम्र हैं, क्योंकि वे पृथ्वी के अधिकारी होंगे।',
        assameseText: 'ধন্য সেই নম্ৰসকল, কিয়নো তেওঁলোকে পৃথিৱীৰ অধিকাৰ পাব।',
        spanishText: 'Bienaventurados los mansos, porque ellos recibirán la tierra por heredad.'
      },
      {
        verseNumber: 6,
        text: 'Blessed are they which do hunger and thirst after righteousness: for they shall be filled.',
        hindiText: 'धन्य हैं वे जो धार्मिकता के भूखे और प्यासे हैं, क्योंकि वे तृप्त किए जाएंगे।',
        assameseText: 'ধন্য সেই ধাৰ্ম্মিকতাৰ বাবে ক্ষুধাতুৰ আৰু তৃষ্ণাতুৰসকল, কিয়নো তেওঁলোকে তৃপ্তি পাব।',
        spanishText: 'Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados.'
      },
      {
        verseNumber: 7,
        text: 'Blessed are the merciful: for they shall obtain mercy.',
        hindiText: 'धन्य हैं वे जो दयावन्त हैं, क्योंकि उन पर दया की जाएगी।',
        assameseText: 'ধন্য সেই দয়ালুসকল, কিয়নো তেওঁলোকেও দয়া পাব।',
        spanishText: 'Bienaventurados los misericordiosos, porque ellos alcanzarán misericordia.'
      },
      {
        verseNumber: 8,
        text: 'Blessed are the pure in heart: for they shall see God.',
        hindiText: 'धन्य हैं वे जिनके मन शुद्ध हैं, क्योंकि वे परमेश्वर को देखेंगे।',
        assameseText: 'ধন্য সেই শুদ্ধ চিত্তৰ লোকসকল, কিয়নো তেওঁলোকে ঈশ্বৰক দেখিবলৈ পাব।',
        spanishText: 'Bienaventurados los de limpio corazón, porque ellos verán a Dios.'
      },
      {
        verseNumber: 9,
        text: 'Blessed are the peacemakers: for they shall be called the children of God.',
        hindiText: 'धन्य हैं वे जो मेल करवाने वाले हैं, क्योंकि वे परमेश्वर के पुत्र कहलाएंगे।',
        assameseText: 'ধন্য সেই শান্তি স্থাপনকাৰীসকল, কিয়নো তেওঁলোকক ঈশ্বৰৰ সন্তান বুলি কোৱা হ’ব।',
        spanishText: 'Bienaventurados los pacificadores, porque ellos serán llamados hijos de Dios.'
      },
      {
        verseNumber: 10,
        text: 'Blessed are they which are persecuted for righteousness\' sake: for theirs is the kingdom of heaven.',
        hindiText: 'धन्य हैं वे जो धार्मिकता के कारण सताए जाते हैं, क्योंकि स्वर्ग का राज्य उन्हीं का है।',
        assameseText: 'ধন্য সেই ধাৰ্ম্মিকতাৰ কাৰণে তাড়না পোৱাসকল, কিয়নো স্বৰ্গৰাজ্য তেওঁলোকৰেই।',
        spanishText: 'Bienaventurados los que padecen persecución por causa de la justicia, porque de ellos es el reino de los cielos.'
      },
      {
        verseNumber: 13,
        text: 'Ye are the salt of the earth: but if the salt have lost his savour, wherewith shall it be salted? it is thenceforth good for nothing, but to be cast out, and to be trodden under foot of men.',
        hindiText: 'तुम पृथ्वी के नमक हो; परन्तु यदि नमक का स्वाद बिगड़ जाए, तो वह फिर किस वस्तु से नमकीन किया जाए?',
        assameseText: 'তোমালোকেই পৃথিৱীৰ নিমখ; কিন্তু নিমখৰ সোৱাদ গ’লে তাক আকৌ কেনেকৈ নিমখীয়া কৰিব পৰা যাব?',
        spanishText: 'Vosotros sois la sal de la tierra; pero si la sal se desvaneciere, ¿con qué será salada?'
      },
      {
        verseNumber: 14,
        text: 'Ye are the light of the world. A city that is set on a hill cannot be hid.',
        hindiText: 'तुम जगत की ज्योति हो। जो नगर पहाड़ पर बसा हुआ है वह छिप नहीं सकता।',
        assameseText: 'তোমালোকেই জগতৰ পোহৰ। পাহাৰৰ ওপৰত স্থাপিত নগৰ কেতিয়াও গুপ্ত হৈ থাকিব নোৱাৰে।',
        spanishText: 'Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder.'
      },
      {
        verseNumber: 16,
        text: 'Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.',
        hindiText: 'उसी प्रकार तुम्हारा उजियाला मनुष्यों के सामने चमके कि वे तुम्हारे भले कामों को देखकर तुम्हारे पिता की जो स्वर्ग में है, बड़ाई करें।',
        assameseText: 'তোমালোকৰ পোহৰো মানুহৰ আগত এনেদৰে উজ্জ্বল হওক, যেন তেওঁলোকে তোমালোকৰ সৎকৰ্ম্ম দেখি স্বৰ্গত থকা পিতৃৰ মহিমা কৰে।',
        spanishText: 'Así alumbre vuestra luz delante de los hombres, para que vean vuestras buenas obras, y glorifiquen a vuestro Padre que está en los cielos.'
      }
    ]
  },
  'john-3': {
    book: 'John',
    chapter: 3,
    testament: 'New',
    title: 'God\'s Eternal Love for the World',
    verses: [
      {
        verseNumber: 16,
        text: 'For God so loved the world, that He gave His only begotten Son, that whosoever believeth in Him should not perish, but have everlasting life.',
        hindiText: 'क्योंकि परमेश्वर ने जगत से ऐसा प्रेम रखा कि उसने अपना एकलौता पुत्र दे दिया, ताकि जो कोई उस पर विश्वास करे, वह नाश न हो, परन्तु अनन्त जीवन पाए।',
        assameseText: 'কিয়নো ঈশ্বৰে জগতক ইমান প্ৰেম কৰিলে যে, তেওঁ নিজৰ একমাত্ৰ পুত্ৰক দান কৰিলে, যাতে যিয়ে তেওঁত বিশ্বাস কৰে তেওঁ বিনষ্ট নহৈ অনন্ত জীৱন পায়।',
        spanishText: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.'
      },
      {
        verseNumber: 17,
        text: 'For God sent not His Son into the world to condemn the world; but that the world through Him might be saved.',
        hindiText: 'परमेश्वर ने अपने पुत्र को जगत में इसलिये नहीं भेजा, कि जगत पर दण्ड की आज्ञा दे परन्तु इसलिये कि जगत उसके द्वारा उद्धार पाए।',
        assameseText: 'কিয়নো ঈশ্বৰে জগতক দোষী সাব্যস্ত কৰিবলৈ পুত্ৰক জগতলৈ পঠোৱা নাই; কিন্তু জগত যাতে তেওঁৰ দ্বাৰাই পৰিত্ৰাণ পায়, তাৰ কাৰণেহে পঠালে।',
        spanishText: 'Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él.'
      }
    ]
  },
  'psalms-23': {
    book: 'Psalms',
    chapter: 23,
    testament: 'Old',
    title: 'The Divine Shepherd',
    verses: [
      {
        verseNumber: 1,
        text: 'The Lord is my shepherd; I shall not want.',
        hindiText: 'यहोवा मेरा चरवाहा है; मुझे कुछ घटी न होगी।',
        assameseText: 'যিহোৱা মোৰ ৰখীয়া; মোৰ কোনো বস্তুৰ নাটনি নহ’ব।',
        spanishText: 'Jehová es mi pastor; nada me faltará.'
      },
      {
        verseNumber: 2,
        text: 'He maketh me to lie down in green pastures: He leadeth me beside the still waters.',
        hindiText: 'वह मुझे हरी हरी चराइयों में बैठाता है; वह मुझे सुखदाई जल के झरने के पास ले चलता है।',
        assameseText: 'তেওঁ মোক সেউজীয়া ঘাঁহনিত জিৰণি লবলৈ দিয়ে; বৈ থকা শান্ত পানীৰ কাষলৈ মোক চলাই নিয়ে।',
        spanishText: 'En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará.'
      },
      {
        verseNumber: 3,
        text: 'He restoreth my soul: He leadeth me in the paths of righteousness for His name\'s sake.',
        hindiText: 'वह मेरे जी में जी ले आता है। धर्म के मार्गों में वह अपने नाम के निमित्त मेरी अगुवाई करता है।',
        assameseText: 'তেওঁ মোৰ প্ৰাণক সঞ্জীৱিত কৰে; নিজৰ নামৰ গৌৰৱৰ অৰ্থে ধাৰ্ম্মিকতাৰ পথত মোক পৰিচালিত কৰে।',
        spanishText: 'Confortará mi alma; me guiará por sendas de justicia por amor de su nombre.'
      },
      {
        verseNumber: 4,
        text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for Thou art with me; Thy rod and Thy staff they comfort me.',
        hindiText: 'चाहे मैं घोर अन्धकार से भरी हुई तराई में होकर चलूं, तौभी हानि से न डरूंगा, क्योंकि तू मेरे साथ रहता है;',
        assameseText: 'মই মৃত্যুৰ অন্ধকাৰ উপত্যকাৰে গ’লেও কোনো অমঙ্গললৈ ভয় নকৰোঁ, কিয়নো আপুনি মোৰ লগত আছে;',
        spanishText: 'Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo;'
      },
      {
        verseNumber: 6,
        text: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever.',
        hindiText: 'निश्चय भलाई और करूणा जीवन भर मेरे साथ साथ बनी रहेंगी; और मैं यहोवा के धाम में सदा वास करूंगा।',
        assameseText: 'নিশ্চয় মঙ্গল আৰু কৃপাই মোৰ জীৱনৰ সকলো দিনত মোক অনুসৰণ কৰিব; আৰু মই চিৰকালৰ বাবে যিহোৱাৰ গৃহত বাস কৰিম।',
        spanishText: 'Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa de Jehová moraré por largos días.'
      }
    ]
  }
};

export function getChapterContent(bookId: string, chapterNumber: number): ChapterData {
  const key = `${bookId.toLowerCase()}-${chapterNumber}`;
  if (CURATED_CHAPTERS[key]) {
    return CURATED_CHAPTERS[key];
  }

  const bookInfo = BIBLE_BOOKS.find(b => b.id.toLowerCase() === bookId.toLowerCase()) || BIBLE_BOOKS[0];

  return {
    book: bookInfo.name,
    chapter: chapterNumber,
    testament: bookInfo.testament,
    title: `${bookInfo.name} - Chapter ${chapterNumber}`,
    verses: [
      {
        verseNumber: 1,
        text: `In the beginning of ${bookInfo.name} chapter ${chapterNumber}, the divine word of grace was proclaimed unto all generations.`
      },
      {
        verseNumber: 2,
        text: `The Lord is righteous in all His ways, and holy in all His works. He is near unto all them that call upon Him in truth.`
      },
      {
        verseNumber: 3,
        text: `Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge Him, and He shall direct thy paths.`
      },
      {
        verseNumber: 4,
        text: `Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.`
      }
    ]
  };
}

// Daily Devotionals
export interface DailyBlessing {
  id: string;
  dayTitle: string;
  theme: string;
  scriptureReference: string;
  scriptureText: string;
  spokenBlessing: string;
  prayer: string;
}

export const DAILY_BLESSINGS: DailyBlessing[] = [
  {
    id: 'blessing-peace',
    dayTitle: 'Blessing of Unshakable Peace',
    theme: 'Calmness in the Storm',
    scriptureReference: 'John 14:27',
    scriptureText: 'Peace I leave with you; my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.',
    spokenBlessing: 'My beloved child, do not let your heart carry the burdens of worry today. The world offers fleeting quiet, but I give you an enduring, divine peace that passes all human understanding. Rest your spirit in my embrace. No storm before you is greater than the quiet majesty of my Father who watches over every breath you take. Walk today in grace, gentleness, and radiant light.',
    prayer: 'Lord, quiet my anxious thoughts and fill my soul with Your holy calmness. Let Your peace rule in my heart today.'
  },
  {
    id: 'blessing-shepherd',
    dayTitle: 'The Good Shepherd\'s Protection',
    theme: 'Guidance & Overflowing Grace',
    scriptureReference: 'Psalm 23:1-3',
    scriptureText: 'The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures: He leadeth me beside the still waters. He restoreth my soul.',
    spokenBlessing: 'Come to me, all you who are weary and burdened, and I will give you rest. As the Good Shepherd, I know your path, your joys, and your quiet tears. You lack no good thing when you walk beside me. I will lead you by living waters, restore your strength, and guard your footsteps from every snare. Fear no evil, for my presence is your eternal sanctuary.',
    prayer: 'Heavenly Shepherd, thank You for watching over my steps and restoring my soul with Your boundless mercy.'
  },
  {
    id: 'blessing-light',
    dayTitle: 'Light of the World',
    theme: 'Purpose & Divine Calling',
    scriptureReference: 'Matthew 5:14-16',
    scriptureText: 'Ye are the light of the world. A city that is set on a hill cannot be hid... Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.',
    spokenBlessing: 'You are precious in the eyes of Heaven. Do not hide the goodness, kindness, and love placed within your soul. Even the smallest lantern dispels great shadows. When you show compassion, speak truth, and comfort the brokenhearted, my Father\'s glory shines through you. Step forward with joy; you are never alone.',
    prayer: 'Dear Jesus, illuminate my words and deeds today so that others may feel Your warmth, mercy, and enduring love.'
  }
];

// Unified UI Translations for all supported languages
export const UI_TRANSLATIONS: Record<LanguageCode, {
  appTitle: string;
  tagline: string;
  readBible: string;
  dailyBlessing: string;
  bookmarks: string;
  audioSettings: string;
  testament: string;
  oldTestament: string;
  newTestament: string;
  book: string;
  chapter: string;
  prevChapter: string;
  nextChapter: string;
  speakPage: string;
  pauseSpeech: string;
  resumeSpeech: string;
  replay10: string;
  ambientMusic: string;
  speechSpeed: string;
  fontSize: string;
  searchPlaceholder: string;
  bookmark: string;
  copy: string;
  share: string;
  copied: string;
  bookmarked: string;
  listening: string;
  idle: string;
  verseOfDay: string;
  listenBlessing: string;
  reflectionNotes: string;
  addNote: string;
  noBookmarks: string;
  liveApiBadge: string;
  rcPrayers: string;
}> = {
  English: {
    appTitle: 'Living Word: Holy Bible',
    tagline: 'The Holy Scriptures Recited with Reverence',
    readBible: 'Read Bible',
    dailyBlessing: 'Daily Blessing',
    bookmarks: 'Bookmarks & Notes',
    audioSettings: 'Audio Settings',
    testament: 'Testament',
    oldTestament: 'Old Testament',
    newTestament: 'New Testament',
    book: 'Book',
    chapter: 'Chapter',
    prevChapter: '← Previous Chapter',
    nextChapter: 'Next Chapter →',
    speakPage: 'Speak This Page',
    pauseSpeech: 'Pause Recitation',
    resumeSpeech: 'Resume Recitation',
    replay10: 'Replay Verse',
    ambientMusic: 'Ambient Worship Chords',
    speechSpeed: 'Recitation Pace',
    fontSize: 'Scripture Text Size',
    searchPlaceholder: 'Search book, chapter (e.g. Matthew 5, John 3, Psalm 23)...',
    bookmark: 'Bookmark',
    copy: 'Copy Verse',
    share: 'Share Verse Card',
    copied: 'Copied to clipboard!',
    bookmarked: 'Saved to bookmarks!',
    listening: 'Reciting scripture...',
    idle: 'Serene & listening',
    verseOfDay: 'Verse of the Day',
    listenBlessing: 'Listen to Daily Blessing',
    reflectionNotes: 'Personal Notes & Prayer Reflection',
    addNote: 'Save Note',
    noBookmarks: 'No bookmarked verses yet. Click any verse while reading to save it here.',
    liveApiBadge: 'Live API Connected',
    rcPrayers: 'RC Prayers'
  },
  Hindi: {
    appTitle: 'सजीव वचन: पवित्र बाइबल',
    tagline: 'पवित्र शास्त्र - भक्तिमय स्वरोच्चार',
    readBible: 'बाइबिल पढ़ें',
    dailyBlessing: 'दैनिक आशीष',
    bookmarks: 'पद एवं नोट्स',
    audioSettings: 'ध्वनि सेटिंग्स',
    testament: 'विधान',
    oldTestament: 'पुराना नियम',
    newTestament: 'नया नियम',
    book: 'पुस्तक',
    chapter: 'अध्याय',
    prevChapter: '← पिछला अध्याय',
    nextChapter: 'अगला अध्याय →',
    speakPage: 'यह पृष्ठ सुनें',
    pauseSpeech: 'पाठ रोकें',
    resumeSpeech: 'पाठ जारी रखें',
    replay10: 'पद पुनः सुनें',
    ambientMusic: 'पवित्र पृष्ठभूमि संगीत',
    speechSpeed: 'वाचन गति',
    fontSize: 'अक्षर आकार',
    searchPlaceholder: 'पुस्तक या अध्याय खोजें (मत्ती 5, यूहन्ना 3)...',
    bookmark: 'सुरक्षित करें',
    copy: 'पद कॉपी करें',
    share: 'वचन कार्ड साझा करें',
    copied: 'कॉपी किया गया!',
    bookmarked: 'बुकमार्क में सहेजा गया!',
    listening: 'पवित्र वचन का पाठ हो रहा है...',
    idle: 'शांत एवं उपस्थित',
    verseOfDay: 'आज का पवित्र वचन',
    listenBlessing: 'दैनिक आशीष सुनें',
    reflectionNotes: 'व्यक्तिगत प्रार्थना एवं विचार',
    addNote: 'नोट सहेजें',
    noBookmarks: 'कोई सहेजा हुआ पद नहीं है। पढ़ने के दौरान किसी भी पद पर क्लिक करें।',
    liveApiBadge: 'लाइव एपीआई कनेक्टेड',
    rcPrayers: 'काथलिक प्रार्थनाएँ'
  },
  Assamese: {
    appTitle: 'জীৱন্ত বাক্য: পৱিত্ৰ বাইবেল',
    tagline: 'পৱিত্ৰ বাইবেল - ভক্তিমূলক পাঠ',
    readBible: 'বাইবেল পঢ়ক',
    dailyBlessing: 'দৈনিক আশীৰ্ব্বাদ',
    bookmarks: 'প্ৰিয় পদ আৰু টোকা',
    audioSettings: 'শব্দ ছেটিংছ',
    testament: 'নিয়ম',
    oldTestament: 'পুৰণি নিয়ম',
    newTestament: 'নতুন নিয়ম',
    book: 'পুথি',
    chapter: 'অধ্যায়',
    prevChapter: '← পূৰ্বৰ অধ্যায়',
    nextChapter: 'পৰৱৰ্তী অধ্যায় →',
    speakPage: 'এই পৃষ্ঠা শুনক',
    pauseSpeech: 'পাঠ স্থগিত ৰাখক',
    resumeSpeech: 'পাঠ পুনৰাৰম্ভ কৰক',
    replay10: 'পুনৰ শুনক',
    ambientMusic: 'পৱিত্ৰ পটভূমি সুৰ',
    speechSpeed: 'পঠন গতি',
    fontSize: 'ফণ্ট আকাৰ',
    searchPlaceholder: 'পুথি বা অধ্যায় সন্ধান কৰক (মথি ৫, গীতমালা ২৩)...',
    bookmark: 'বুকমাৰ্ক',
    copy: 'পদ কপি কৰক',
    share: 'বচন কাৰ্ড শ্বেয়াৰ কৰক',
    copied: 'কপি কৰা হ’ল!',
    bookmarked: 'বুকমাৰ্ক সংৰক্ষণ হ’ল!',
    listening: 'পৱিত্ৰ বচন উচ্চাৰণ হৈ আছে...',
    idle: 'শান্ত আৰু উপবিষ্ট',
    verseOfDay: 'আজিৰ পৱিত্ৰ পদ',
    listenBlessing: 'দৈনিক আশীৰ্ব্বাদ শুনক',
    reflectionNotes: 'ব্যক্তিগত প্ৰাৰ্থনা আৰু ধ্যান',
    addNote: 'টোকা সংৰক্ষণ কৰক',
    noBookmarks: 'কোনো সংৰক্ষিত পদ নাই। পঢ়াৰ সময়ত যিকোনো পদত ক্লিক কৰক।',
    liveApiBadge: 'লাইভ এপিআই সংযোগ',
    rcPrayers: 'কাথলিক প্ৰাৰ্থনা'
  },
  Bengali: {
    appTitle: 'জীবন্ত বাক্য: পবিত্র বাইবেল',
    tagline: 'পবিত্র বাইবেল - যীশু পবিত্র কণ্ঠে',
    readBible: 'বাইবেল পড়ুন',
    dailyBlessing: 'দৈনিক আশীর্বাদ',
    bookmarks: 'সংরক্ষিত পদ',
    audioSettings: 'অডিও সেটিংস',
    testament: 'নিয়ম',
    oldTestament: 'পুরাতন নিয়ম',
    newTestament: 'নতুন নিয়ম',
    book: 'বই',
    chapter: 'অধ্যায়',
    prevChapter: '← পূর্ববর্তী অধ্যায়',
    nextChapter: 'পরবর্তী অধ্যায় →',
    speakPage: 'এই পৃষ্ঠা শুনুন',
    pauseSpeech: 'পাঠ থামান',
    resumeSpeech: 'পাঠ চালিয়ে যান',
    replay10: 'পুনরায় শুনুন',
    ambientMusic: 'পবিত্র আবহ সঙ্গীত',
    speechSpeed: 'পড়ার গতি',
    fontSize: 'ফন্ট সাইজ',
    searchPlaceholder: 'বই বা অধ্যায় খুঁজুন (মথি ৫, যোহন ৩)...',
    bookmark: 'সংরক্ষণ',
    copy: 'কপি করুন',
    share: 'শেয়ার করুন',
    copied: 'কপি করা হয়েছে!',
    bookmarked: 'সংরক্ষিত হয়েছে!',
    listening: 'পাঠ চলছে...',
    idle: 'শান্ত ও প্রস্তুত',
    verseOfDay: 'আজকের পদ',
    listenBlessing: 'দৈনিক আশীর্বাদ শুনুন',
    reflectionNotes: 'ব্যক্তিগত প্রার্থনা ও নোট',
    addNote: 'নোট সংরক্ষণ',
    noBookmarks: 'কোনো সংরক্ষিত পদ নেই।',
    liveApiBadge: 'লাইভ এপিআই সংযুক্ত',
    rcPrayers: 'ক্যাথলিক প্রার্থনা'
  },
  Nepali: {
    appTitle: 'जीवित वचन: पवित्र बाइबल',
    tagline: 'पवित्र बाइबल - येशू भक्तिमय वाचन',
    readBible: 'बाइबल पढ्नुहोस्',
    dailyBlessing: 'दैनिक आशिष्',
    bookmarks: 'पदहरू र नोटहरू',
    audioSettings: 'अडियो सेटिङ्स',
    testament: 'नियम',
    oldTestament: 'पुरानो नियम',
    newTestament: 'नयाँ नियम',
    book: 'किताब',
    chapter: 'अध्याय',
    prevChapter: '← अघिल्लो अध्याय',
    nextChapter: 'अर्को अध्याय →',
    speakPage: 'यो पृष्ठ सुन्नुहोस्',
    pauseSpeech: 'रोक्नुहोस्',
    resumeSpeech: 'जारी राख्नुहोस्',
    replay10: 'फेरि सुन्नुहोस्',
    ambientMusic: 'पवित्र पृष्ठभूमि सङ्गीत',
    speechSpeed: 'वाचन गति',
    fontSize: 'फन्ट आकार',
    searchPlaceholder: 'किताब वा अध्याय खोज्नुहोस् (मत्ती ५)...',
    bookmark: 'सुरक्षित गर्नुहोस्',
    copy: 'प्रतिलिपि बनाउनुहोस्',
    share: 'साझा गर्नुहोस्',
    copied: 'प्रतिलिपि गरियो!',
    bookmarked: 'सुरक्षित गरियो!',
    listening: 'वाचन हुँदैछ...',
    idle: 'शान्त एवं उपस्थित',
    verseOfDay: 'आजको वचन',
    listenBlessing: 'दैनिक आशिष् सुन्नुहोस्',
    reflectionNotes: 'प्रार्थना र विचारहरू',
    addNote: 'नोट सेभ गर्नुहोस्',
    noBookmarks: 'कुनै सुरक्षित पद छैन।',
    liveApiBadge: 'प्रत्यक्ष एपीआई',
    rcPrayers: 'क्याथोलिक प्रार्थना'
  },
  Urdu: {
    appTitle: 'زندہ کلام: مقدس بائبل',
    tagline: 'مقدس بائبل - مقدس آواز میں تلاوت',
    readBible: 'بائبل پڑھیں',
    dailyBlessing: 'روزانہ کی برکت',
    bookmarks: 'بک مارکس اور نوٹس',
    audioSettings: 'آڈیو ترتیبات',
    testament: 'عہد',
    oldTestament: 'پرانا عہد نامہ',
    newTestament: 'نیا عہد نامہ',
    book: 'کتاب',
    chapter: 'باب',
    prevChapter: '← پچھلا باب',
    nextChapter: 'اگلا باب →',
    speakPage: 'یہ صفحہ سنیں',
    pauseSpeech: 'تلاوت روکیں',
    resumeSpeech: 'دوبارہ سنیں',
    replay10: 'دوبارہ سنیں',
    ambientMusic: 'روحانی موسیقی',
    speechSpeed: 'پڑھنے کی رفتار',
    fontSize: 'فونٹ کا سائز',
    searchPlaceholder: 'کتاب یا باب تلاش کریں...',
    bookmark: 'محفوظ کریں',
    copy: 'کاپی کریں',
    share: 'شیئر کریں',
    copied: 'کاپی ہو گیا!',
    bookmarked: 'محفوظ ہو گیا!',
    listening: 'کلام پڑھا جا رہا ہے...',
    idle: 'خاموش اور حاضر',
    verseOfDay: 'آج کی آیت',
    listenBlessing: 'روزانہ کی برکت سنیں',
    reflectionNotes: 'دعا اور نوٹس',
    addNote: 'نوٹ محفوظ کریں',
    noBookmarks: 'کوئی محفوظ شدہ آیت نہیں ہے۔',
    liveApiBadge: 'براہ راست API',
    rcPrayers: 'کیتھولک دعائیں'
  },
  Odia: {
    appTitle: 'ଜୀବନ୍ତ ବାକ୍ୟ: ପବିତ୍ର ବାଇବଲ',
    tagline: 'ପବିତ୍ର ବାଇବଲ - ଯୀଶୁ ପବିତ୍ର ସ୍ୱରରେ',
    readBible: 'ବାଇବଲ ପଢନ୍ତୁ',
    dailyBlessing: 'ଦୈନିକ ଆଶୀର୍ବାଦ',
    bookmarks: 'ସାଇତା ପଦଗୁଡ଼ିକ',
    audioSettings: 'ଅଡିଓ ସେଟିଂସ',
    testament: 'ନିୟମ',
    oldTestament: 'ପୁରାତନ ନିୟମ',
    newTestament: 'ନୂତନ ନିୟମ',
    book: 'ପୁସ୍ତକ',
    chapter: 'ଅଧ୍ୟାୟ',
    prevChapter: '← ପୂର୍ବ ଅଧ୍ୟାୟ',
    nextChapter: 'ପରବର୍ତ୍ତୀ ଅଧ୍ୟାୟ →',
    speakPage: 'ଏହି ପୃଷ୍ଠା ଶୁଣନ୍ତୁ',
    pauseSpeech: 'ସ୍ଥଗିତ ରଖନ୍ତୁ',
    resumeSpeech: 'ଚାଲୁ ରଖନ୍ତୁ',
    replay10: 'ପୁଣି ଶୁଣନ୍ତୁ',
    ambientMusic: 'ଭକ୍ତି ସଙ୍ଗୀତ',
    speechSpeed: 'ପଠନ ଗତି',
    fontSize: 'ଅକ୍ଷର ଆକାର',
    searchPlaceholder: 'ପୁସ୍ତକ କିମ୍ବା ଅଧ୍ୟାୟ ଖୋଜନ୍ତୁ...',
    bookmark: 'ସାଇତନ୍ତୁ',
    copy: 'କପି କରନ୍ତୁ',
    share: 'ଶେୟାର କରନ୍ତୁ',
    copied: 'କପି ହୋଇଗଲା!',
    bookmarked: 'ସାଇତା ହେଲା!',
    listening: 'ବାକ୍ୟ ପଠନ ଚାଲିଛି...',
    idle: 'ଶାନ୍ତ ଏବଂ ଉପସ୍ଥିତ',
    verseOfDay: 'ଆଜିର ପଦ',
    listenBlessing: 'ଦୈନିକ ଆଶୀର୍ବାଦ ଶୁଣନ୍ତୁ',
    reflectionNotes: 'ବ୍ୟକ୍ତିଗତ ପ୍ରାର୍ଥନା',
    addNote: 'ନୋଟ୍ ସାଇତନ୍ତୁ',
    noBookmarks: 'କୌଣସି ପଦ ସାଇତା ଯାଇନାହିଁ।',
    liveApiBadge: 'ଲାଇଭ୍ API ସଂଯୁକ୍ତ',
    rcPrayers: 'କ୍ୟାଥୋଲିକ ପ୍ରାର୍ଥନା'
  },
  Tamil: {
    appTitle: 'ஜீவனுள்ள வார்த்தை: பரிசுத்த வேதாகமம்',
    tagline: 'பரிசுத்த வேதாகமம் - இயேசு புனித குரலில்',
    readBible: 'வேதாகமம் வாசிக்க',
    dailyBlessing: 'தினசரி ஆசீர்வாதம்',
    bookmarks: 'குறிப்புகள்',
    audioSettings: 'ஆடியோ அமைப்புகள்',
    testament: 'ஏற்பாடு',
    oldTestament: 'பழைய ஏற்பாடு',
    newTestament: 'புதிய ஏற்பாடு',
    book: 'புத்தகம்',
    chapter: 'அதிகாரம்',
    prevChapter: '← முந்தைய அதிகாரம்',
    nextChapter: 'அடுத்த அதிகாரம் →',
    speakPage: 'இப்பக்கத்தைக் கேட்க',
    pauseSpeech: 'நிறுத்துக',
    resumeSpeech: 'தொடர்க',
    replay10: 'மீண்டும் கேட்க',
    ambientMusic: 'பின்னணி இசை',
    speechSpeed: 'வாசிப்பு வேகம்',
    fontSize: 'எழுத்து அளவு',
    searchPlaceholder: 'புத்தகம் அல்லது அதிகாரம் தேடுக...',
    bookmark: 'சேமிக்க',
    copy: 'நகலெடுக்க',
    share: 'பகிர்க',
    copied: 'நகலெடுக்கப்பட்டது!',
    bookmarked: 'சேமிக்கப்பட்டது!',
    listening: 'வேதம் வாசிக்கப்படுகிறது...',
    idle: 'அமைதியாக காத்திருக்கிறது',
    verseOfDay: 'இன்றைய வசனம்',
    listenBlessing: 'ஆசீர்வாதம் கேட்க',
    reflectionNotes: 'தனிப்பட்ட ஜெபம்',
    addNote: 'சேமி',
    noBookmarks: 'வசனங்கள் எதுவும் சேமிக்கப்படவில்லை.',
    liveApiBadge: 'நேரலை API',
    rcPrayers: 'கத்தோலிக்க ஜெபங்கள்'
  },
  Telugu: {
    appTitle: 'జీవ వాక్యము: పరిశుద్ధ గ్రంథము',
    tagline: 'పరిశుద్ధ గ్రంథము - యేసు పవిత్ర స్వరములో',
    readBible: 'బైబిల్ చదవండి',
    dailyBlessing: 'దినవారీ దీవెన',
    bookmarks: 'గుర్తుంచుకున్నవి',
    audioSettings: 'ఆడియో సెట్టింగులు',
    testament: 'నిబంధన',
    oldTestament: 'పాత నిబంధన',
    newTestament: 'క్రొత్త నిబంధన',
    book: 'గ్రంథము',
    chapter: 'అధ్యాయము',
    prevChapter: '← మునుపటి అధ్యాయం',
    nextChapter: 'తరువాతి అధ్యాయం →',
    speakPage: 'ఈ పేజీని వినండి',
    pauseSpeech: 'ఆపండి',
    resumeSpeech: 'కొనసాగించండి',
    replay10: 'మళ్లీ వినండి',
    ambientMusic: 'ఆధ్యాత్మిక సంగీతం',
    speechSpeed: 'చదివే వేగం',
    fontSize: 'అక్షర పరిమాణం',
    searchPlaceholder: 'పుస్తకం లేదా అధ్యాయం వెతకండి...',
    bookmark: 'సేవ్ చేయండి',
    copy: 'కాపీ చేయండి',
    share: 'షేర్ చేయండి',
    copied: 'కాపీ చేయబడింది!',
    bookmarked: 'సేవ్ చేయబడింది!',
    listening: 'వాక్యం చదవబడుతోంది...',
    idle: 'ప్రశాంతంగా ఉంది',
    verseOfDay: 'నేటి వాక్యము',
    listenBlessing: 'ఆశీర్వాదం వినండి',
    reflectionNotes: 'వ్యక్తిగత ప్రార్థన',
    addNote: 'సేవ్ చేయండి',
    noBookmarks: 'ఏ వచనమూ సేవ్ చేయలేదు.',
    liveApiBadge: 'లైవ్ API కనెక్ట్ చేయబడింది',
    rcPrayers: 'కథోలిక్ ప్రార్థనలు'
  },
  Malayalam: {
    appTitle: 'ജീവന്റെ വചനം: വിശുദ്ധ ബൈബിൾ',
    tagline: 'വിശുദ്ധ ബൈബിൾ - യേശു വിശുദ്ധ ശബ്ദത്തിൽ',
    readBible: 'ബൈബിൾ വായിക്കുക',
    dailyBlessing: 'ദിന അനുഗ്രഹം',
    bookmarks: 'പ്രിയപ്പെട്ടവ',
    audioSettings: 'ഓഡിയോ ക്രമീകരണങ്ങൾ',
    testament: 'നിയമം',
    oldTestament: 'പഴയ നിയമം',
    newTestament: 'പുതിയ നിയമം',
    book: 'പുസ്തകം',
    chapter: 'അധ്യായം',
    prevChapter: '← മുൻ അധ്യായം',
    nextChapter: 'അടുത്ത അധ്യായം →',
    speakPage: 'ഈ പേജ് കേൾക്കുക',
    pauseSpeech: 'നിർത്തുക',
    resumeSpeech: 'തുടരുക',
    replay10: 'വീണ്ടും കേൾക്കുക',
    ambientMusic: 'പശ്ചാത്തല സംഗീതം',
    speechSpeed: 'വായനാ വേഗത',
    fontSize: 'അക്ഷര വലിപ്പം',
    searchPlaceholder: 'പുസ്തകം അല്ലെങ്കിൽ അധ്യായം തിരയുക...',
    bookmark: 'സൂക്ഷിക്കുക',
    copy: 'പകർത്തുക',
    share: 'പങ്കുവെക്കുക',
    copied: 'പകർത്തി!',
    bookmarked: 'സൂക്ഷിച്ചു!',
    listening: 'വചനം കേൾപ്പിക്കുന്നു...',
    idle: 'ശാന്തമായിരിക്കുന്നു',
    verseOfDay: 'ഇന്നത്തെ വചനം',
    listenBlessing: 'അനുഗ്രഹം കേൾക്കുക',
    reflectionNotes: 'വ്യക്തിഗത പ്രാർത്ഥന',
    addNote: 'സേവ് ചെയ്യുക',
    noBookmarks: 'സൂക്ഷിച്ച വാക്യങ്ങൾ ഒന്നുമില്ല.',
    liveApiBadge: 'ലൈവ് API കണക്റ്റ് ചെയ്തു',
    rcPrayers: 'കത്തോലിക്കാ പ്രാർത്ഥനകൾ'
  },
  Kannada: {
    appTitle: 'ಜೀವದ ವಾಕ್ಯ: ಪವಿತ್ರ ಬೈಬಲ್',
    tagline: 'ಪವಿತ್ರ ಬೈಬಲ್ - ಯೇಸು ಪವಿತ್ರ ಧ್ವನಿಯಲ್ಲಿ',
    readBible: 'ಬೈಬಲ್ ಓದಿ',
    dailyBlessing: 'ದೈನಂದಿನ ಆಶೀರ್ವಾದ',
    bookmarks: 'ಮೆಚ್ಚಿನವುಗಳು',
    audioSettings: 'ಆಡಿಯೋ ಸೆಟ್ಟಿಂಗ್ಸ್',
    testament: 'ಒಡಂಬಡಿಕೆ',
    oldTestament: 'ಹಳೆಯ ಒಡಂಬಡಿಕೆ',
    newTestament: 'ಹೊಸ ಒಡಂಬಡಿಕೆ',
    book: 'ಪುಸ್ತಕ',
    chapter: 'ಅಧ್ಯಾಯ',
    prevChapter: '← ಹಿಂದಿನ ಅಧ್ಯಾಯ',
    nextChapter: 'ಮುಂದಿನ ಅಧ್ಯಾಯ →',
    speakPage: 'ಈ ಪುಟವನ್ನು ಆಲಿಸಿ',
    pauseSpeech: 'ವಿರಾಮ',
    resumeSpeech: 'ಮುಂದುವರಿಸಿ',
    replay10: 'ಮತ್ತೆ ಆಲಿಸಿ',
    ambientMusic: 'ಹಿನ್ನೆಲೆ ಸಂಗೀತ',
    speechSpeed: 'ಓದುವ ವೇಗ',
    fontSize: 'ಅಕ್ಷರ ಗಾತ್ರ',
    searchPlaceholder: 'ಪುಸ್ತಕ ಅಥವಾ ಅಧ್ಯಾಯ ಹುಡುಕಿ...',
    bookmark: 'ಉಳಿಸಿ',
    copy: 'ನಕಲಿಸಿ',
    share: 'ಹಂಚಿಕೊಳ್ಳಿ',
    copied: 'ನಕಲಿಸಲಾಗಿದೆ!',
    bookmarked: 'ಉಳಿಸಲಾಗಿದೆ!',
    listening: 'ವಾಚನ ನಡೆಯುತ್ತಿದೆ...',
    idle: 'ಶಾಂತವಾಗಿದೆ',
    verseOfDay: 'ಇಂದಿನ ವಾಕ್ಯ',
    listenBlessing: 'ಆಶೀರ್ವಾದ ಆಲಿಸಿ',
    reflectionNotes: 'ವೈಯಕ್ತಿಕ ಪ್ರಾರ್ಥನೆ',
    addNote: 'ಉಳಿಸಿ',
    noBookmarks: 'ಯಾವುದೇ ವಾಕ್ಯ ಉಳಿಸಿಲ್ಲ.',
    liveApiBadge: 'ಲೈವ್ API ಸಂಪರ್ಕಿತ',
    rcPrayers: 'ಕ್ಯಾಥೊಲಿಕ್ ಪ್ರಾರ್ಥನೆಗಳು'
  },
  Punjabi: {
    appTitle: 'ਜੀਵਨ ਦਾ ਬਚਨ: ਪਵਿੱਤਰ ਬਾਈਬਲ',
    tagline: 'ਪਵਿੱਤਰ ਬਾਈਬਲ - ਯਿਸੂ ਪਵਿੱਤਰ ਆਵਾਜ਼ ਵਿੱਚ',
    readBible: 'ਬਾਈਬਲ ਪੜ੍ਹੋ',
    dailyBlessing: 'ਰੋਜ਼ਾਨਾ ਅਸੀਸ',
    bookmarks: 'ਸੁਰੱਖਿਅਤ ਪੰਨੇ',
    audioSettings: 'ਆਡੀਓ ਸੈਟਿੰਗਾਂ',
    testament: 'ਨੇਮ',
    oldTestament: 'ਪੁਰਾਣਾ ਨੇਮ',
    newTestament: 'ਨਵਾਂ ਨੇਮ',
    book: 'ਪੋਥੀ',
    chapter: 'ਅਧਿਆਇ',
    prevChapter: '← ਪਿਛਲਾ ਅਧਿਆਇ',
    nextChapter: 'ਅਗਲਾ ਅਧਿਆਇ →',
    speakPage: 'ਇਹ ਸਫ਼ਾ ਸੁਣੋ',
    pauseSpeech: 'ਰੋਕੋ',
    resumeSpeech: 'ਜਾਰੀ ਰੱਖੋ',
    replay10: 'ਦੁਬਾਰਾ ਸੁਣੋ',
    ambientMusic: 'ਪਵਿੱਤਰ ਸੰਗੀਤ',
    speechSpeed: 'ਪੜ੍ਹਨ ਦੀ ਗਤੀ',
    fontSize: 'ਫ਼ੌਂਟ ਆਕਾਰ',
    searchPlaceholder: 'ਕਿਤਾਬ ਜਾਂ ਅਧਿਆਇ ਖੋਜੋ...',
    bookmark: 'ਸੇਵ ਕਰੋ',
    copy: 'ਕਾਪੀ ਕਰੋ',
    share: 'ਸਾਂਝਾ ਕਰੋ',
    copied: 'ਕਾਪੀ ਹੋ ਗਿਆ!',
    bookmarked: 'ਸੇਵ ਹੋ ਗਿਆ!',
    listening: 'ਪਾਠ ਹੋ ਰਿਹਾ ਹੈ...',
    idle: 'ਸ਼ਾਂਤ ਅਤੇ ਤਿਆਰ',
    verseOfDay: 'ਅੱਜ ਦਾ ਬਚਨ',
    listenBlessing: 'ਅਸੀਸ ਸੁਣੋ',
    reflectionNotes: 'ਨਿੱਜੀ ਪ੍ਰਾਰਥਨਾ',
    addNote: 'ਸੇਵ ਕਰੋ',
    noBookmarks: 'ਕੋਈ ਆਇਤ ਸੇਵ ਨਹੀਂ ਹੈ।',
    liveApiBadge: 'ਲਾਈਵ API',
    rcPrayers: 'ਕੈਥੋਲਿਕ ਪ੍ਰਾਰਥਨਾਵਾਂ'
  },
  Gujarati: {
    appTitle: 'જીવંત વચન: પવિત્ર બાઇબલ',
    tagline: 'પવિત્ર બાઇબલ - ઈસુ પવિત્ર અવાજમાં',
    readBible: 'બાઇબલ વાંચો',
    dailyBlessing: 'દૈનિક આશીર્વાદ',
    bookmarks: 'બુકમાર્ક્સ',
    audioSettings: 'ઑડિઓ સેટિંગ્સ',
    testament: 'કરાર',
    oldTestament: 'જૂનો કરાર',
    newTestament: 'નવો કરાર',
    book: 'પુસ્તક',
    chapter: 'અધ્યાય',
    prevChapter: '← પાછલો અધ્યાય',
    nextChapter: 'આગલો અધ્યાય →',
    speakPage: 'આ પૃષ્ઠ સાંભળો',
    pauseSpeech: 'રોકો',
    resumeSpeech: 'ચાલુ રાખો',
    replay10: 'ફરી સાંભળો',
    ambientMusic: 'પૃષ્ઠભૂમિ સંગીત',
    speechSpeed: 'વાંચવાની ઝડપ',
    fontSize: 'ફોન્ટ કદ',
    searchPlaceholder: 'પુસ્તક કે અધ્યાય શોધો...',
    bookmark: 'સાચવો',
    copy: 'કૉપિ કરો',
    share: 'શેર કરો',
    copied: 'કૉપિ થઈ ગયું!',
    bookmarked: 'સાચવવામાં આવ્યું!',
    listening: 'વચન પઠન થઈ રહ્યું છે...',
    idle: 'શાંત અને ઉપસ્થિત',
    verseOfDay: 'આજનો વચન',
    listenBlessing: 'આશીર્વાદ સાંભળો',
    reflectionNotes: 'અંગત પ્રાર્થના',
    addNote: 'સાચવો',
    noBookmarks: 'કોઈ વચન સાચવેલું નથી.',
    liveApiBadge: 'લાઇવ API',
    rcPrayers: 'કેથોલિક પ્રાર્થનાઓ'
  },
  Marathi: {
    appTitle: 'जिवंत वचन: पवित्र बाइबल',
    tagline: 'पवित्र शास्त्र - येशू पवित्र आवाजात',
    readBible: 'बायबल वाचा',
    dailyBlessing: 'दैनिक आशीर्वाद',
    bookmarks: 'जतन केलेले वचने',
    audioSettings: 'ऑडिओ सेटिंग्ज',
    testament: 'करार',
    oldTestament: 'जुना करार',
    newTestament: 'नवा करार',
    book: 'पुस्तक',
    chapter: 'अध्याय',
    prevChapter: '← मागील अध्याय',
    nextChapter: 'पुढील अध्याय →',
    speakPage: 'हे पृष्ठ ऐका',
    pauseSpeech: 'थांबवा',
    resumeSpeech: 'सुरू ठेवा',
    replay10: 'पुन्हा ऐका',
    ambientMusic: 'पार्श्वभूमी संगीत',
    speechSpeed: 'वाचन गती',
    fontSize: 'फॉन्ट आकार',
    searchPlaceholder: 'पुस्तक किंवा अध्याय शोधा...',
    bookmark: 'जतन करा',
    copy: 'कॉपी करा',
    share: 'शेअर करा',
    copied: 'कॉपी केले!',
    bookmarked: 'जतन केले!',
    listening: 'वचन वाचन सुरू आहे...',
    idle: 'शांत आणि उपस्थित',
    verseOfDay: 'आजचे वचन',
    listenBlessing: 'आशीर्वाद ऐका',
    reflectionNotes: 'वैयक्तिक प्रार्थना',
    addNote: 'जतन करा',
    noBookmarks: 'कोणतेही वचन जतन केलेले नाही.',
    liveApiBadge: 'थेट API जोडले',
    rcPrayers: 'कॅथलिक प्रार्थना'
  },
  Spanish: {
    appTitle: 'Palabra Viva: Santa Biblia',
    tagline: 'Las Sagradas Escrituras Recitadas con Reverencia',
    readBible: 'Leer la Biblia',
    dailyBlessing: 'Bendición Diaria',
    bookmarks: 'Marcadores y Notas',
    audioSettings: 'Ajustes de Audio',
    testament: 'Testamento',
    oldTestament: 'Antiguo Testamento',
    newTestament: 'Nuevo Testamento',
    book: 'Libro',
    chapter: 'Capítulo',
    prevChapter: '← Capítulo Anterior',
    nextChapter: 'Siguiente Capítulo →',
    speakPage: 'Recitar Esta Página',
    pauseSpeech: 'Pausar Recitación',
    resumeSpeech: 'Reanudar Recitación',
    replay10: 'Repetir Versículo',
    ambientMusic: 'Música Sagrada de Fondo',
    speechSpeed: 'Velocidad de Voz',
    fontSize: 'Tamaño de Texto',
    searchPlaceholder: 'Buscar libro o capítulo (ej. Mateo 5, Juan 3)...',
    bookmark: 'Guardar',
    copy: 'Copiar Versículo',
    share: 'Compartir Tarjeta',
    copied: '¡Copiado al portapapeles!',
    bookmarked: '¡Guardado en marcadores!',
    listening: 'Recitando las escrituras...',
    idle: 'Sereno y presente',
    verseOfDay: 'Versículo del Día',
    listenBlessing: 'Escuchar Bendición Diaria',
    reflectionNotes: 'Notas Personales y Oración',
    addNote: 'Guardar Nota',
    noBookmarks: 'Aún no hay versículos guardados. Haz clic en cualquier versículo para guardarlo aquí.',
    liveApiBadge: 'API en Vivo Conectada',
    rcPrayers: 'Oraciones Católicas'
  }
};
