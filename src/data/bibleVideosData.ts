export interface BibleVideo {
  id: string;
  title: string;
  hindiTitle?: string;
  subtitle: string;
  testament: 'Old' | 'New';
  category:
    | 'Creation & Early World'
    | 'Patriarchs & Exodus'
    | 'Kings & Heroes'
    | 'Nativity & Early Life of Jesus'
    | 'Ministry & Miracles'
    | 'Parables of Jesus'
    | 'Crucifixion & Resurrection'
    | 'Acts & Early Church';
  bookId: string;
  bookName: string;
  chapter: number;
  scriptureReference: string;
  youtubeId: string;
  duration: string;
  thumbnailUrl: string;
  description: string;
  theologicalTheme: string;
  tags: string[];
  isFeatured?: boolean;
}

export const BIBLE_VIDEO_CATEGORIES = [
  'All Stories',
  'Creation & Early World',
  'Patriarchs & Exodus',
  'Kings & Heroes',
  'Nativity & Early Life of Jesus',
  'Ministry & Miracles',
  'Parables of Jesus',
  'Crucifixion & Resurrection',
  'Acts & Early Church'
] as const;

export const BIBLE_VIDEOS: BibleVideo[] = [
  // -------------------------------------------------------------
  // OLD TESTAMENT STORIES (Verified Publicly Embeddable YouTube IDs)
  // -------------------------------------------------------------
  {
    id: 'creation-genesis',
    title: 'Creation of the World & Genesis (Duniya Kaise Bani)',
    hindiTitle: 'सृष्टि की रचना और उत्पत्ति (दुनिया कैसे बनी)',
    subtitle: 'Genesis 1:1 - 2:3 · In the Beginning God Created the Heavens and the Earth',
    testament: 'Old',
    category: 'Creation & Early World',
    bookId: 'genesis',
    bookName: 'Genesis',
    chapter: 1,
    scriptureReference: 'Genesis 1:1 - 2:3',
    youtubeId: 'yZ1Fd_SPC18', // Saddleback Kids: Creation (Genesis 1-2)
    duration: '3:45',
    thumbnailUrl: 'https://img.youtube.com/vi/yZ1Fd_SPC18/hqdefault.jpg',
    description: 'Witness the majesty of God’s creation: from darkness to radiant light, dividing sky and waters, flourishing land, sun, moon, stars, living creatures, and mankind created in His holy image.',
    theologicalTheme: 'God\'s Sovereign Creation, Divine Order & The Sanctity of Life',
    tags: ['Creation', 'Genesis', 'Duniya Kaise Bani', 'Beginning', 'Light', 'Eden'],
    isFeatured: true
  },
  {
    id: 'adam-eve-eden',
    title: 'Adam & Eve and the Garden of Eden',
    hindiTitle: 'आदम और हव्वा और अदन की वाटिका',
    subtitle: 'Genesis 2:4 - 3:24 · Life in Paradise, The Temptation & The Promise of Redemption',
    testament: 'Old',
    category: 'Creation & Early World',
    bookId: 'genesis',
    bookName: 'Genesis',
    chapter: 3,
    scriptureReference: 'Genesis 2:15 - 3:24',
    youtubeId: 'VG3D9EOwSyc', // Saddleback Kids: Adam and Eve (Genesis 2-3)
    duration: '3:50',
    thumbnailUrl: 'https://img.youtube.com/vi/VG3D9EOwSyc/hqdefault.jpg',
    description: 'Explore the blessed fellowship of Adam and Eve in Paradise, the deceptive temptation of the serpent, the sorrowful Fall of Man, and God’s eternal covenant of grace and redemption.',
    theologicalTheme: 'Free Will, Human Frailty & God’s Enduring Promise of Grace',
    tags: ['Adam & Eve', 'Eden', 'Fall of Man', 'Tree of Life', 'Original Sin']
  },
  {
    id: 'noahs-ark-flood',
    title: 'Noah’s Ark & The Great Flood',
    hindiTitle: 'नूह की नाव और महान जलप्रलय',
    subtitle: 'Genesis 6:9 - 9:17 · Faith in God, The Great Ark of Safety & The Rainbow Covenant',
    testament: 'Old',
    category: 'Creation & Early World',
    bookId: 'genesis',
    bookName: 'Genesis',
    chapter: 6,
    scriptureReference: 'Genesis 6:9 - 9:17',
    youtubeId: 'iuO1DLKnGC4', // Saddleback Kids: Noah's Ark (Genesis 7-9)
    duration: '4:15',
    thumbnailUrl: 'https://img.youtube.com/vi/iuO1DLKnGC4/hqdefault.jpg',
    description: 'Follow Noah’s obedience in building the mighty Ark amidst a wicked generation, the survival of the animals and family through the floodwaters, and God’s everlasting Rainbow Covenant with humanity.',
    theologicalTheme: 'Faithful Obedience, Divine Mercy & The Everlasting Covenant',
    tags: ['Noah', 'Ark', 'Flood', 'Covenant', 'Rainbow', 'Salvation'],
    isFeatured: true
  },
  {
    id: 'moses-exodus-commandments',
    title: 'Moses, The Ten Commandments & The Exodus',
    hindiTitle: 'मूसा, दस आज्ञाएं और मिस्र से निर्गमन',
    subtitle: 'Exodus 3:1 - 20:21 · The Burning Bush, Deliverance & The Holy Law at Mount Sinai',
    testament: 'Old',
    category: 'Patriarchs & Exodus',
    bookId: 'exodus',
    bookName: 'Exodus',
    chapter: 20,
    scriptureReference: 'Exodus 3:1 - 20:21',
    youtubeId: '2Kb1_v98As0', // Saddleback Kids: The Ten Commandments | Stories of the Bible
    duration: '3:35',
    thumbnailUrl: 'https://img.youtube.com/vi/2Kb1_v98As0/hqdefault.jpg',
    description: 'Behold God’s call to Moses through the burning bush, delivering His people through the Red Sea into the wilderness, and giving the sacred Ten Commandments on Mount Sinai.',
    theologicalTheme: 'Deliverance, God\'s Holiness & The Holy Law of Love',
    tags: ['Moses', 'Exodus', 'Ten Commandments', 'Red Sea', 'Mount Sinai', 'Deliverance'],
    isFeatured: true
  },
  {
    id: 'david-and-goliath',
    title: 'David & Goliath: Faith Over Fear',
    hindiTitle: 'दाऊद और गोलियत: विश्वास की विजय',
    subtitle: '1 Samuel 17:1-58 · A Shepherd Boy, Five Smooth Stones & The Battle Belonging to the Lord',
    testament: 'Old',
    category: 'Kings & Heroes',
    bookId: '1samuel',
    bookName: '1 Samuel',
    chapter: 17,
    scriptureReference: '1 Samuel 17:1-58',
    youtubeId: 'FPlcgbNrS_M', // Saddleback Kids: David and Goliath (1 Samuel 17:1-58)
    duration: '3:50',
    thumbnailUrl: 'https://img.youtube.com/vi/FPlcgbNrS_M/hqdefault.jpg',
    description: 'When the giant Goliath mocked the living God and terrified Israel’s army, the humble shepherd boy David stepped forward with a sling, smooth stones, and boundless faith in the Lord.',
    theologicalTheme: 'Courage, Faith in God\'s Name & Victory over Spiritual Giants',
    tags: ['David', 'Goliath', 'Faith', '1 Samuel 17', 'Victory', 'Courage']
  },
  {
    id: 'daniel-lions-den',
    title: 'Daniel in the Lions’ Den',
    hindiTitle: 'दानिय्येल शेरों की मांद में',
    subtitle: 'Daniel 6:1-28 · Uncompromised Prayer & God’s Angel Shutting the Lions’ Mouths',
    testament: 'Old',
    category: 'Kings & Heroes',
    bookId: 'daniel',
    bookName: 'Daniel',
    chapter: 6,
    scriptureReference: 'Daniel 6:1-28',
    youtubeId: 'HIjo966ZrVQ', // Teaching Kids about Jesus: Daniel in the Lions Den
    duration: '3:50',
    thumbnailUrl: 'https://img.youtube.com/vi/HIjo966ZrVQ/hqdefault.jpg',
    description: 'Despite royal decree and fierce jealousy, Daniel opened his windows toward Jerusalem in daily prayer, trusting the Living God who sent His holy angel to shut the lions’ hungry mouths.',
    theologicalTheme: 'Unwavering Prayer, Devotion & Divine Protection',
    tags: ['Daniel', 'Lions Den', 'Faithful Prayer', 'Babylon', 'Miracle']
  },

  // -------------------------------------------------------------
  // NEW TESTAMENT STORIES (Verified Publicly Embeddable YouTube IDs)
  // -------------------------------------------------------------
  {
    id: 'birth-of-jesus-nativity',
    title: 'The Birth of Jesus Christ (The Holy Nativity)',
    hindiTitle: 'प्रभु यीशु मसीह का पवित्र जन्म (क्रिसमस)',
    subtitle: 'Luke 2:1-20 & Matthew 1:18-25 · The Incarnation, Bethlehem Manger, Angels & Shepherds',
    testament: 'New',
    category: 'Nativity & Early Life of Jesus',
    bookId: 'luke',
    bookName: 'Luke',
    chapter: 2,
    scriptureReference: 'Luke 2:1-20',
    youtubeId: 'v3656G6tWuI', // Saddleback Kids: The Story of Christmas (Jesus is Born)
    duration: '4:20',
    thumbnailUrl: 'https://img.youtube.com/vi/v3656G6tWuI/hqdefault.jpg',
    description: 'Rejoice in the dawn of our salvation: the journey to Bethlehem, the humble manger, the angelic choir singing Gloria in Excelsis Deo, and the shepherds glorifying the newborn Savior.',
    theologicalTheme: 'The Incarnation, Humility & Good Tidings of Great Joy',
    tags: ['Nativity', 'Birth of Jesus', 'Bethlehem', 'Luke 2', 'Incarnation', 'Mary & Joseph'],
    isFeatured: true
  },
  {
    id: 'life-ministry-miracles-jesus',
    title: 'The Life, Ministry & Miracles of Jesus',
    hindiTitle: 'यीशु मसीह का जीवन, सेवकाई और चमत्कार',
    subtitle: 'John 9:1-41 & Matthew 4:23-25 · Healing the Sick, Opening Blind Eyes & Compassion',
    testament: 'New',
    category: 'Ministry & Miracles',
    bookId: 'john',
    bookName: 'John',
    chapter: 9,
    scriptureReference: 'John 9:1-41 & Matthew 4:23-25',
    youtubeId: 'X4qZ2KSbdxI', // Saddleback Kids: Jesus Heals a Man Born Blind
    duration: '3:30',
    thumbnailUrl: 'https://img.youtube.com/vi/X4qZ2KSbdxI/hqdefault.jpg',
    description: 'Experience Jesus preaching the Good News of the Kingdom of Heaven, giving sight to the man born blind, healing afflictions, and revealing the boundless light and compassion of God.',
    theologicalTheme: 'Divine Compassion, Spiritual Sight & Authority of Christ',
    tags: ['Ministry of Jesus', 'Miracles', 'Healing', 'Light of the World', 'Compassion']
  },
  {
    id: 'parables-of-jesus',
    title: 'The Parables of Jesus: The Good Samaritan',
    hindiTitle: 'यीशु के दृष्टान्त: भला सामरी (दया और पड़ोसी प्रेम)',
    subtitle: 'Luke 10:25-37 · Love Your Neighbor as Yourself & The Boundless Compassion of God',
    testament: 'New',
    category: 'Parables of Jesus',
    bookId: 'luke',
    bookName: 'Luke',
    chapter: 10,
    scriptureReference: 'Luke 10:25-37',
    youtubeId: 'osfQg4yKtq8', // Saddleback Kids: The Good Samaritan (Luke 10:25-37)
    duration: '4:15',
    thumbnailUrl: 'https://img.youtube.com/vi/osfQg4yKtq8/hqdefault.jpg',
    description: 'Delve into Jesus’s beloved parable answering "Who is my neighbor?": when a traveler was beaten by thieves, a compassionate Samaritan stopped, bandaged his wounds, and showed true selfless love.',
    theologicalTheme: 'Boundless Mercy, Neighborly Love & Active Faith',
    tags: ['Parables', 'Good Samaritan', 'Mercy', 'Forgiveness', 'Neighbor']
  },
  {
    id: 'last-supper-crucifixion-resurrection',
    title: 'The Last Supper, Crucifixion & Glorious Resurrection',
    hindiTitle: 'अन्तिम भोज, क्रूस बलिदान और पुनरुत्थान',
    subtitle: 'Matthew 26-28 & Luke 22-24 · The Easter Sacrifice, Calvary & The Triumphant Empty Tomb',
    testament: 'New',
    category: 'Crucifixion & Resurrection',
    bookId: 'matthew',
    bookName: 'Matthew',
    chapter: 28,
    scriptureReference: 'Matthew 26:17 - 28:20',
    youtubeId: 'HL8R158Ujp4', // Saddleback Kids: The Story of Easter (Jesus' Sacrifice)
    duration: '5:45',
    thumbnailUrl: 'https://img.youtube.com/vi/HL8R158Ujp4/hqdefault.jpg',
    description: 'Walk the sacred path through the Last Supper, Gethsemane, and Mount Calvary, where Christ gave His life for our sins, culminating in the triumphant dawn of the Empty Tomb: Christ is Risen!',
    theologicalTheme: 'Atoning Sacrifice, Redemption & Victorious Eternal Life',
    tags: ['Last Supper', 'Crucifixion', 'Resurrection', 'Empty Tomb', 'Easter', 'Salvation'],
    isFeatured: true
  },
  {
    id: 'acts-early-church',
    title: 'Acts of the Apostles & The Early Church (Pentecost)',
    hindiTitle: 'प्रेरितों के काम और आरंभिक कलीसिया (पवित्र आत्मा का आगमन)',
    subtitle: 'Acts 1:1 - 4:37 · The Ascension, Day of Pentecost, Holy Spirit & Bold Witness',
    testament: 'New',
    category: 'Acts & Early Church',
    bookId: 'acts',
    bookName: 'Acts',
    chapter: 2,
    scriptureReference: 'Acts 1:1 - 4:37',
    youtubeId: 'KwJJJoSGw84', // ShareFaith Kids: Pentecost for Kids - Acts 2 Bible Story
    duration: '4:50',
    thumbnailUrl: 'https://img.youtube.com/vi/KwJJJoSGw84/hqdefault.jpg',
    description: 'Celebrate the descent of the Holy Spirit on Pentecost as tongues of fire, Peter’s bold preaching leading thousands of believers to faith, and the loving fellowship of the early Church.',
    theologicalTheme: 'Power of the Holy Spirit, Fellowship & Bold Evangelization',
    tags: ['Acts of the Apostles', 'Pentecost', 'Holy Spirit', 'Peter', 'Early Church', 'Communion']
  },
  {
    id: 'sermon-on-the-mount',
    title: 'The Sermon on the Mount & The Beatitudes',
    hindiTitle: 'पहाड़ी उपदेश और चिंता न करने की शिक्षा',
    subtitle: 'Matthew 5:1 - 6:34 · Trusting the Heavenly Father, Birds of the Air & Lilies of the Field',
    testament: 'New',
    category: 'Ministry & Miracles',
    bookId: 'matthew',
    bookName: 'Matthew',
    chapter: 6,
    scriptureReference: 'Matthew 6:25-34',
    youtubeId: 'PG1LjFO99dA', // Saddleback Kids: Don't Worry (Matthew 6:25-34)
    duration: '3:30',
    thumbnailUrl: 'https://img.youtube.com/vi/PG1LjFO99dA/hqdefault.jpg',
    description: 'Listen to Jesus’ comforting words from the Sermon on the Mount: seeking first the Kingdom of God and His righteousness, knowing our Heavenly Father cares for us more than the birds and lilies.',
    theologicalTheme: 'Peace of Heart, Trust in Divine Providence & Kingdom Priority',
    tags: ['Sermon on the Mount', 'Beatitudes', 'Matthew 6', 'Trust', 'Providence']
  }
];
