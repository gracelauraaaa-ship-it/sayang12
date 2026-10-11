export interface LovePhrase {
  id: string;
  language: string;
  nativeScript: string;
  romanization?: string;
  translation: string;
  culturalNote?: string;
  color: string;
  letter: string;
}

export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  primaryPhrase: string;
  meaning: string;
  pronunciation: string;
}

// Curated palette of romantic starlight colors
export const ROMANTIC_COLORS = [
  '#ff7eb6', // Rose Pink
  '#ff4d6d', // Vibrant Crimson
  '#c77dff', // Dreamy Lavender
  '#9d4edd', // Royal Violet
  '#a2d2ff', // Baby Blue
  '#64dfdf', // Celestial Cyan
  '#80ffdb', // Mint Stardust
  '#ffb4a2', // Peach Blossom
  '#ffd166', // Starlight Gold
  '#ffffff', // Opal White
  '#f72585', // Magenta Heart
  '#e2afff', // Orchid Lilac
  '#bde0fe', // Cloud Blue
  '#ffc6ff', // Soft Fuchsia
];

export const LANGUAGES_DATA: LanguageInfo[] = [
  {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    region: 'Southeast Asia',
    primaryPhrase: 'Aku cinta kamu, Grace Laura',
    meaning: 'I love you Grace Laura with all my soul',
    pronunciation: '/a.ku t͡ʃin.ta ka.mu ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    region: 'Global',
    primaryPhrase: 'I love you, Grace Laura',
    meaning: 'I love you Grace Laura with all my heart',
    pronunciation: '/aɪ lʌv juː ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    region: 'Western Europe',
    primaryPhrase: "Je t'aime Grace Laura",
    meaning: 'I love you Grace Laura',
    pronunciation: '/ʒə tɛm ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    region: 'Ibero-America',
    primaryPhrase: 'Te amo Grace Laura',
    meaning: 'I love you deeply Grace Laura',
    pronunciation: '/te ˈa.mo ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    region: 'Southern Europe',
    primaryPhrase: 'Ti amo Grace Laura',
    meaning: 'I love you passionately Grace Laura',
    pronunciation: '/ti ˈa.mo ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    region: 'South America / Iberia',
    primaryPhrase: 'Eu te amo Grace Laura',
    meaning: 'I love you Grace Laura',
    pronunciation: '/ew tʃi ˈɐ̃.mu ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    region: 'Central Europe',
    primaryPhrase: 'Ich liebe dich, Grace Laura',
    meaning: 'I love you Grace Laura',
    pronunciation: '/ɪç ˈliːbə dɪç ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    region: 'East Asia',
    primaryPhrase: '愛してる Grace Laura',
    meaning: 'Deep lifelong love Grace Laura (Aishiteru Grace Laura)',
    pronunciation: '/a.i.ɕi̥.te.ɾɯ ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    region: 'East Asia',
    primaryPhrase: '사랑해 Grace Laura',
    meaning: 'I love you Grace Laura (Saranghae Grace Laura)',
    pronunciation: '/sa.ɾaŋ.hɛ ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    region: 'East Asia',
    primaryPhrase: '我爱你 Grace Laura',
    meaning: 'I love you Grace Laura (Wǒ ài nǐ Grace Laura)',
    pronunciation: '/wɔ̀ aɪ̂ nì ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    region: 'Middle East & North Africa',
    primaryPhrase: 'أحبك Grace Laura',
    meaning: 'I love you Grace Laura (Uhibbuki Grace Laura)',
    pronunciation: '/u.ħib.bu.ki ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    region: 'South Asia',
    primaryPhrase: 'मैं तुमसे प्यार करता हूँ Grace Laura',
    meaning: 'I love you Grace Laura (Main tumse pyar karta hoon Grace Laura)',
    pronunciation: '/mɛ̃ t̪ʊm.seː pjaːr kər.t̪aː hũː ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    region: 'Eastern Europe / Eurasia',
    primaryPhrase: 'Я тебя люблю, Grace Laura',
    meaning: 'I love you Grace Laura (Ya tebya lyublyu Grace Laura)',
    pronunciation: '/ja tʲɪˈbʲa lʲʊˈblʲu ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'el',
    name: 'Greek',
    nativeName: 'Ελληνικά',
    region: 'Southern Europe',
    primaryPhrase: "Σ' αγαπώ Grace Laura",
    meaning: "I love you Grace Laura (S'agapo Grace Laura)",
    pronunciation: '/sa.ɣaˈpo ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    region: 'Western Europe',
    primaryPhrase: 'Ik hou van jou, Grace Laura',
    meaning: 'I love you Grace Laura',
    pronunciation: '/ɪk ɦɑu vɑn jɑu ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'Svenska',
    region: 'Nordic Europe',
    primaryPhrase: 'Jag älskar dig, Grace Laura',
    meaning: 'I love you Grace Laura',
    pronunciation: '/jɑːɡ ˈɛ̂l.skar dɛj ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    region: 'Central Europe',
    primaryPhrase: 'Kocham cię, Grace Laura',
    meaning: 'I love you Grace Laura',
    pronunciation: '/ˈkɔ.xam t͡ɕɛ̃ ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    region: 'Anatolia & Eurasia',
    primaryPhrase: 'Seni seviyorum Grace Laura',
    meaning: 'I love you Grace Laura',
    pronunciation: '/se.ni se.vi.jo.ɾum ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    region: 'Southeast Asia',
    primaryPhrase: 'Anh yêu em Grace Laura',
    meaning: 'I love you tenderly Grace Laura',
    pronunciation: '/aɲ iew ɛm ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'th',
    name: 'Thai',
    nativeName: 'ไทย',
    region: 'Southeast Asia',
    primaryPhrase: 'ฉันรักเธอ Grace Laura',
    meaning: 'I love you Grace Laura (Chan rak thoe Grace Laura)',
    pronunciation: '/tɕʰan˧.rak̚˦˥.tʰɤː˧ ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'tl',
    name: 'Tagalog',
    nativeName: 'Tagalog',
    region: 'Southeast Asia',
    primaryPhrase: 'Mahal kita Grace Laura',
    meaning: 'I love you Grace Laura with all devotion',
    pronunciation: '/mɐˈhal kiˈta ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    region: 'East Africa',
    primaryPhrase: 'Nakupenda Grace Laura',
    meaning: 'I love you Grace Laura',
    pronunciation: '/na.kuˈpe.nda ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'ga',
    name: 'Irish Gaelic',
    nativeName: 'Gaeilge',
    region: 'Western Europe',
    primaryPhrase: 'Tá grá agam duit Grace Laura',
    meaning: 'I have love for you Grace Laura',
    pronunciation: '/tɑː ɡɾˠɑː ˈaɡəmˠ d̪ɪtʲ ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'cs',
    name: 'Czech',
    nativeName: 'Čeština',
    region: 'Central Europe',
    primaryPhrase: 'Miluji tě Grace Laura',
    meaning: 'I love you Grace Laura',
    pronunciation: '/ˈmɪ.lu.jɪ cɛ ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'he',
    name: 'Hebrew',
    nativeName: 'עברית',
    region: 'Middle East',
    primaryPhrase: 'אני אוהב אותך Grace Laura',
    meaning: 'I love you Grace Laura (Ani ohev otach Grace Laura)',
    pronunciation: '/aˈni oˈhev oˈtax ɡreɪs ˈlɔː.rə/'
  },
  {
    code: 'fa',
    name: 'Persian',
    nativeName: 'فارسی',
    region: 'West Asia',
    primaryPhrase: 'دوستت دارم Grace Laura',
    meaning: 'I love you Grace Laura (Doostat daram Grace Laura)',
    pronunciation: '/duːstæt dɑːræm ɡreɪs ˈlɔː.rə/'
  }
];

// Every phrase specifically carries the name Grace Laura
export interface PhraseSeed {
  text: string;
  lang: string;
  trans: string;
  colorHint?: string;
}

export const LOVE_PHRASES_SEEDS: PhraseSeed[] = [
  // Indonesian - Grace Laura
  { text: 'Aku cinta kamu Grace Laura', lang: 'Indonesian', trans: 'I love you Grace Laura with all my heart' },
  { text: 'Aku sayang Grace Laura', lang: 'Indonesian', trans: 'I cherish Grace Laura tenderly' },
  { text: 'Cinta sejati Grace Laura', lang: 'Indonesian', trans: 'True eternal love for Grace Laura' },
  { text: 'Hatiku milik Grace Laura', lang: 'Indonesian', trans: 'My heart belongs to Grace Laura' },
  { text: 'Grace Laura selamanya', lang: 'Indonesian', trans: 'Grace Laura forever and always' },
  { text: 'Hanya Grace Laura', lang: 'Indonesian', trans: 'Only Grace Laura in my heart' },

  // English - Grace Laura
  { text: 'I love you Grace Laura', lang: 'English', trans: 'I love you Grace Laura' },
  { text: 'Forever yours Grace Laura', lang: 'English', trans: 'Eternally dedicated to Grace Laura' },
  { text: 'Grace Laura my heart', lang: 'English', trans: 'Grace Laura my dearest love' },
  { text: 'Always with Grace Laura', lang: 'English', trans: 'Always by Grace Laura’s side' },
  { text: 'Grace Laura soulmate', lang: 'English', trans: 'Grace Laura my destined soulmate' },
  { text: 'My whole world Grace Laura', lang: 'English', trans: 'Grace Laura is my whole world' },

  // French - Grace Laura
  { text: "Je t'aime Grace Laura", lang: 'French', trans: 'I love you Grace Laura' },
  { text: 'Grace Laura mon amour', lang: 'French', trans: 'Grace Laura my true love' },
  { text: 'Pour toujours Grace Laura', lang: 'French', trans: 'Forever and ever Grace Laura' },
  { text: 'Grace Laura mon cœur', lang: 'French', trans: 'Grace Laura my beating heart' },
  { text: 'Toi et moi Grace Laura', lang: 'French', trans: 'You and me Grace Laura' },

  // Spanish - Grace Laura
  { text: 'Te amo Grace Laura', lang: 'Spanish', trans: 'I love you deeply Grace Laura' },
  { text: 'Grace Laura mi amor', lang: 'Spanish', trans: 'Grace Laura my true love' },
  { text: 'Para siempre Grace Laura', lang: 'Spanish', trans: 'Forever Grace Laura' },
  { text: 'Grace Laura eres mi vida', lang: 'Spanish', trans: 'Grace Laura you are my whole life' },
  { text: 'Grace Laura mi sol', lang: 'Spanish', trans: 'Grace Laura my shining sun' },

  // Italian - Grace Laura
  { text: 'Ti amo Grace Laura', lang: 'Italian', trans: 'I love you Grace Laura' },
  { text: 'Grace Laura amore mio', lang: 'Italian', trans: 'Grace Laura my sweet love' },
  { text: 'Per sempre Grace Laura', lang: 'Italian', trans: 'Forever Grace Laura' },
  { text: 'Grace Laura la mia vita', lang: 'Italian', trans: 'Grace Laura my life' },
  { text: 'Grace Laura tesoro mio', lang: 'Italian', trans: 'Grace Laura my treasure' },

  // Portuguese - Grace Laura
  { text: 'Eu te amo Grace Laura', lang: 'Portuguese', trans: 'I love you Grace Laura' },
  { text: 'Grace Laura meu amor', lang: 'Portuguese', trans: 'Grace Laura my darling' },
  { text: 'Minha vida Grace Laura', lang: 'Portuguese', trans: 'My whole life Grace Laura' },
  { text: 'Paixão por Grace Laura', lang: 'Portuguese', trans: 'Deep passion for Grace Laura' },

  // German - Grace Laura
  { text: 'Ich liebe dich Grace Laura', lang: 'German', trans: 'I love you Grace Laura' },
  { text: 'Meine Liebe Grace Laura', lang: 'German', trans: 'My love Grace Laura' },
  { text: 'Für immer Grace Laura', lang: 'German', trans: 'Forever Grace Laura' },
  { text: 'Grace Laura mein Herz', lang: 'German', trans: 'Grace Laura my heart' },

  // Japanese - Grace Laura
  { text: '愛してる Grace Laura', lang: 'Japanese', trans: 'I love you deeply Grace Laura (Aishiteru)' },
  { text: '大好き Grace Laura', lang: 'Japanese', trans: 'I adore Grace Laura so much' },
  { text: 'ずっと一緒 Grace Laura', lang: 'Japanese', trans: 'Together forever with Grace Laura' },
  { text: '心から Grace Laura', lang: 'Japanese', trans: 'With all my heart for Grace Laura' },

  // Korean - Grace Laura
  { text: '사랑해 Grace Laura', lang: 'Korean', trans: 'I love you Grace Laura (Saranghae)' },
  { text: '영원히 Grace Laura', lang: 'Korean', trans: 'Eternally with Grace Laura' },
  { text: '내 사랑 Grace Laura', lang: 'Korean', trans: 'My beloved Grace Laura' },
  { text: 'Grace Laura와 함께', lang: 'Korean', trans: 'Together with Grace Laura always' },

  // Chinese - Grace Laura
  { text: '我爱你 Grace Laura', lang: 'Chinese', trans: 'I love you Grace Laura (Wǒ ài nǐ)' },
  { text: '一生一世 Grace Laura', lang: 'Chinese', trans: 'One lifetime and eternity with Grace Laura' },
  { text: '心心相印 Grace Laura', lang: 'Chinese', trans: 'Two hearts beating as one Grace Laura' },
  { text: '执子之手 Grace Laura', lang: 'Chinese', trans: 'Holding Grace Laura’s hand forever' },

  // Arabic - Grace Laura
  { text: 'أحبك Grace Laura', lang: 'Arabic', trans: 'I love you Grace Laura (Uhibbuki)' },
  { text: 'يا روحي Grace Laura', lang: 'Arabic', trans: 'O my soul Grace Laura' },
  { text: 'حبيبتي Grace Laura', lang: 'Arabic', trans: 'My beloved Grace Laura' },
  { text: 'إلى الأبد Grace Laura', lang: 'Arabic', trans: 'To eternity Grace Laura' },

  // Hindi - Grace Laura
  { text: 'प्यार करता हूँ Grace Laura', lang: 'Hindi', trans: 'I love you Grace Laura' },
  { text: 'मेरी जान Grace Laura', lang: 'Hindi', trans: 'My soul and life Grace Laura' },
  { text: 'तुम मेरे हो Grace Laura', lang: 'Hindi', trans: 'Grace Laura belongs in my heart' },
  { text: 'सदा के लिए Grace Laura', lang: 'Hindi', trans: 'For all eternity Grace Laura' },

  // Russian - Grace Laura
  { text: 'Я люблю тебя Grace Laura', lang: 'Russian', trans: 'I love you Grace Laura' },
  { text: 'Моя любовь Grace Laura', lang: 'Russian', trans: 'My true love Grace Laura' },
  { text: 'Навсегда Grace Laura', lang: 'Russian', trans: 'Forevermore Grace Laura' },
  { text: 'Душа моя Grace Laura', lang: 'Russian', trans: 'My soul Grace Laura' },

  // Greek - Grace Laura
  { text: "Σ' αγαπώ Grace Laura", lang: 'Greek', trans: 'I love you Grace Laura' },
  { text: 'Αγάπη μου Grace Laura', lang: 'Greek', trans: 'My precious love Grace Laura' },
  { text: 'Για πάντα Grace Laura', lang: 'Greek', trans: 'For always Grace Laura' },

  // Dutch - Grace Laura
  { text: 'Ik hou van jou Grace Laura', lang: 'Dutch', trans: 'I love you Grace Laura' },
  { text: 'Mijn liefste Grace Laura', lang: 'Dutch', trans: 'My dearest Grace Laura' },
  { text: 'Voor altijd Grace Laura', lang: 'Dutch', trans: 'Forever Grace Laura' },

  // Swedish - Grace Laura
  { text: 'Jag älskar dig Grace Laura', lang: 'Swedish', trans: 'I love you Grace Laura' },
  { text: 'Min älskling Grace Laura', lang: 'Swedish', trans: 'My darling Grace Laura' },
  { text: 'För alltid Grace Laura', lang: 'Swedish', trans: 'Forever Grace Laura' },

  // Polish - Grace Laura
  { text: 'Kocham cię Grace Laura', lang: 'Polish', trans: 'I love you Grace Laura' },
  { text: 'Moje kochanie Grace Laura', lang: 'Polish', trans: 'My sweet love Grace Laura' },
  { text: 'Na zawsze Grace Laura', lang: 'Polish', trans: 'Forever Grace Laura' },

  // Turkish - Grace Laura
  { text: 'Seni seviyorum Grace Laura', lang: 'Turkish', trans: 'I love you Grace Laura' },
  { text: 'Aşkım Grace Laura', lang: 'Turkish', trans: 'My love Grace Laura' },
  { text: 'Sonsuza dek Grace Laura', lang: 'Turkish', trans: 'Until eternity Grace Laura' },

  // Vietnamese - Grace Laura
  { text: 'Anh yêu em Grace Laura', lang: 'Vietnamese', trans: 'I love you tenderly Grace Laura' },
  { text: 'Yêu mãi mãi Grace Laura', lang: 'Vietnamese', trans: 'Love you forever Grace Laura' },
  { text: 'Trọn đời Grace Laura', lang: 'Vietnamese', trans: 'A lifetime together Grace Laura' },

  // Thai - Grace Laura
  { text: 'ฉันรักเธอ Grace Laura', lang: 'Thai', trans: 'I love you Grace Laura' },
  { text: 'ดวงใจของฉัน Grace Laura', lang: 'Thai', trans: 'Heart’s light Grace Laura' },
  { text: 'ตลอดไป Grace Laura', lang: 'Thai', trans: 'Forever Grace Laura' },

  // Tagalog - Grace Laura
  { text: 'Mahal kita Grace Laura', lang: 'Tagalog', trans: 'I love you Grace Laura' },
  { text: 'Aking sinta Grace Laura', lang: 'Tagalog', trans: 'My cherished Grace Laura' },
  { text: 'Magpakailanman Grace Laura', lang: 'Tagalog', trans: 'Throughout all eternity Grace Laura' },

  // Swahili - Grace Laura
  { text: 'Nakupenda Grace Laura', lang: 'Swahili', trans: 'I love you Grace Laura' },
  { text: 'Mpenzi wangu Grace Laura', lang: 'Swahili', trans: 'My dearest Grace Laura' },
  { text: 'Milele Grace Laura', lang: 'Swahili', trans: 'Forever Grace Laura' },

  // Irish Gaelic - Grace Laura
  { text: 'Tá grá agam duit Grace Laura', lang: 'Irish Gaelic', trans: 'I have love for you Grace Laura' },
  { text: 'Mo chroí Grace Laura', lang: 'Irish Gaelic', trans: 'My heart Grace Laura' },
  { text: 'Go deo Grace Laura', lang: 'Irish Gaelic', trans: 'Forever Grace Laura' },

  // Czech - Grace Laura
  { text: 'Miluji tě Grace Laura', lang: 'Czech', trans: 'I love you Grace Laura' },
  { text: 'Lásko má Grace Laura', lang: 'Czech', trans: 'My true love Grace Laura' },
  { text: 'Navždy Grace Laura', lang: 'Czech', trans: 'Forever Grace Laura' },

  // Hebrew - Grace Laura
  { text: 'אני אוהב אותך Grace Laura', lang: 'Hebrew', trans: 'I love you Grace Laura' },
  { text: 'אהובתי Grace Laura', lang: 'Hebrew', trans: 'My beloved Grace Laura' },
  { text: 'לתמיד Grace Laura', lang: 'Hebrew', trans: 'For eternity Grace Laura' },

  // Persian - Grace Laura
  { text: 'دوستت دارم Grace Laura', lang: 'Persian', trans: 'I love you Grace Laura' },
  { text: 'عشق من Grace Laura', lang: 'Persian', trans: 'My eternal love Grace Laura' },
  { text: 'تا ابد Grace Laura', lang: 'Persian', trans: 'Until eternity Grace Laura' }
];
