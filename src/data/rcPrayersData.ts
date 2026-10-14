import { LanguageCode } from './bibleData';

export interface CatholicPrayer {
  id: string;
  category: 'daily' | 'rosary' | 'devotions';
  title: string;
  latinSubtitle?: string;
  traditionalTitles: Partial<Record<LanguageCode, string>>;
  text: string;
  translations: Partial<Record<LanguageCode, string>>;
  significance: string;
}

export interface RosaryMystery {
  id: string;
  type: 'joyful' | 'luminous' | 'sorrowful' | 'glorious';
  name: string;
  hindiName: string;
  assameseName: string;
  spanishName: string;
  dayRecommended: string;
  decadeList: {
    decadeNumber: number;
    title: string;
    hindiTitle: string;
    assameseTitle: string;
    spanishTitle: string;
    scriptureReference: string;
    meditation: string;
    fruit: string;
  }[];
}

export const CATHOLIC_PRAYERS: CatholicPrayer[] = [
  // --- A. Daily & Basic Prayers ---
  {
    id: 'our-father',
    category: 'daily',
    title: 'Our Father (The Lord\'s Prayer)',
    latinSubtitle: 'Pater Noster',
    traditionalTitles: {
      English: 'Our Father (The Lord\'s Prayer)',
      Hindi: 'हे हमारे पिता (प्रभु की प्रार्थना)',
      Assamese: 'হে আমাৰ স্বৰ্গত থকা পিতৃ',
      Bengali: 'হে আমাদের স্বর্গস্থ পিতা',
      Spanish: 'Padre Nuestro',
      Tamil: 'பரலோகத்தில் இருக்கிற எங்கள் பிதாவே',
      Telugu: 'పరలోకమందున్న మా తండ్రీ',
      Malayalam: 'സ്വർഗ്ഗസ്ഥനായ ഞങ്ങളുടെ പിതാവേ'
    },
    text: `Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.`,
    translations: {
      Hindi: `हे हमारे पिता, जो स्वर्ग में हैं, तेरा नाम पवित्र माना जाए, तेरा राज्य आए, तेरी इच्छा जैसे स्वर्ग में पूरी होती है वैसे पृथ्वी पर भी पूरी हो। हमारा प्रतिदिन का आहार आज हमें दे, और हमारे अपराध हमें क्षमा कर जैसे हम भी अपने अपराधियों को क्षमा करते हैं, और हमें परीक्षा में न डाल, परन्तु बुराई से बचा। आमीन।`,
      Assamese: `হে আমাৰ স্বৰ্গত থকা পিতৃ, আপোনাৰ নাম পূজ্য হওক; আপোনাৰ ৰাজ্য আহক; যেনেকৈ স্বৰ্গত, তেনেকৈ পৃথিৱীতো আপোনাৰ ইচ্ছা পূৰ্ণ হওক। আমাৰ দৈনিক আহাৰ আজি আমাক দিয়ক; আৰু যেনেকৈ আমি আমাৰ অপৰাধীসকলক ক্ষমা কৰিছোঁ, তেনেকৈ আমাৰ অপৰাধবোৰো ক্ষমা কৰক; আৰু আমাক পৰীক্ষালৈ নিনিব, কিন্তু মন্দৰ পৰা আমাক ৰক্ষা কৰক। আমেন।`,
      Spanish: `Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.`,
      Bengali: `হে আমাদের স্বর্গস্থ পিতা, তোমার নাম পবিত্র বলিয়া মান্য হউক; তোমার রাজ্য আইসুক; তোমার ইচ্ছা যেমন স্বর্গে তেমনি পৃথিবীতেও পূর্ণ হউক। আমাদের দৈনিক আহার আজ আমাদিগকে দেও; এবং আমরা যেমন আপন অপরাধীদিগকে ক্ষমা করিয়াছি, তেমনি তুমিও আমাদের অপরাধ ক্ষমা কর; এবং আমাদিগকে পরীক্ষায় আনিও না, কিন্তু মন্দ হইতে রক্ষা কর। আমেন।`
    },
    significance: 'The model prayer taught directly by Jesus Christ to His apostles (Matthew 6:9-13).'
  },
  {
    id: 'hail-mary',
    category: 'daily',
    title: 'Hail Mary',
    latinSubtitle: 'Ave Maria',
    traditionalTitles: {
      English: 'Hail Mary',
      Hindi: 'प्रणाम मरिया',
      Assamese: 'প্ৰণাম মৰিয়ম',
      Bengali: 'প্রণাম মরিয়ম',
      Spanish: 'Ave María',
      Tamil: 'அருள் நிறைந்த மரியே',
      Telugu: 'దైవమాత మేరీ',
      Malayalam: 'നന്മനിറഞ്ഞ മറിയമേ'
    },
    text: `Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.`,
    translations: {
      Hindi: `प्रणाम मरिया, कृपा से पूर्ण, प्रभु तेरे साथ है, धन्य है तू स्त्रियों में और धन्य है तेरे गर्भ का फल यीशु। हे पवित्र मरिया, परमेश्वर की माँ, हम पापियों के लिए प्रार्थना कर, अब और हमारे मरने के समय। आमीन।`,
      Assamese: `প্ৰণাম মৰিয়ম, কৃপাৰে পূৰ্ণ, প্ৰভু তোমাৰ লগত আছে; নাৰীসকলৰ মাজত তুমি ধন্যা, আৰু ধন্য তোমাৰ গৰ্ভৰ ফল যীচু। হে পৱিত্ৰ মৰিয়ম, ঈশ্বৰৰ মাতৃ, আমাৰ পাপীবিলাকৰ কাৰণে প্ৰাৰ্থনা কৰা, এতিয়া আৰু আমাৰ মৃত্যুৰ সময়ত। আমেন।`,
      Spanish: `Dios te salve, María, llena eres de gracia, el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.`,
      Bengali: `প্রণাম মরিয়ম, কৃপাপূর্ণা, প্রভু তোমার সঙ্গে আছেন। নারীদের মধ্যে তুমি ধন্যা, এবং ধন্য তোমার গর্ভের ফল যীশু। হে পবিত্রা মরিয়ম, ঈশ্বরের মা, আমাদের পাপীদের জন্য প্রার্থনা কর, এখন ও আমাদের মৃত্যুর সময়। আমেন।`
    },
    significance: 'Biblical salutation combining the Angel Gabriel\'s Annunciation and Elizabeth\'s greeting (Luke 1:28, 42).'
  },
  {
    id: 'glory-be',
    category: 'daily',
    title: 'Glory Be to the Father',
    latinSubtitle: 'Gloria Patri',
    traditionalTitles: {
      English: 'Glory Be (Doxology)',
      Hindi: 'पिता और पुत्र और पवित्र आत्मा की महिमा',
      Assamese: 'পিতৃ, পুত্ৰ আৰু পৱিত্ৰ আত্মাৰ মহিমা',
      Bengali: 'পিতা, পুত্র ও পবিত্র আত্মার মহিমা',
      Spanish: 'Gloria al Padre'
    },
    text: `Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.`,
    translations: {
      Hindi: `पिता और पुत्र और पवित्र आत्मा की महिमा हो, जैसे वह आदि में थी, अब है और अनन्त काल तक रहेगी। आमीन।`,
      Assamese: `পিতৃ, পুত্ৰ আৰু পৱিত্ৰ আত্মাৰ মহিমা হওক; যেনেকৈ আদিতে আছিল, এতিয়াও আছে, আৰু চিৰকাললৈকে হ’ব। আমেন।`,
      Spanish: `Gloria al Padre y al Hijo y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.`,
      Bengali: `পিতা, পুত্র ও পবিত্র আত্মার মহিমা হউক, যেমন আদিতে ছিল, এখনও আছে এবং অনন্তকাল থাকিবে। আমেন।`
    },
    significance: 'Traditional Trinitarian doxology praising the eternal Godhead.'
  },
  {
    id: 'apostles-creed',
    category: 'daily',
    title: 'Apostles\' Creed',
    latinSubtitle: 'Credo',
    traditionalTitles: {
      English: 'Apostles\' Creed',
      Hindi: 'प्रेरितों का धर्मसार (विश्वास का अंगीकार)',
      Assamese: 'পাঁচনিসকলৰ বিশ্বাসৰ স্বীকাৰোক্তি',
      Bengali: 'প্রেরিতদের ধর্মবিশ্বাস',
      Spanish: 'Credo de los Apóstoles'
    },
    text: `I believe in God, the Father Almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.`,
    translations: {
      Hindi: `मैं सर्वशक्तिमान पिता परमेश्वर, स्वर्ग और पृथ्वी के सृष्टिकर्ता पर विश्वास करता हूँ। और उसके एकलौते पुत्र, हमारे प्रभु यीशु मसीह पर, जो पवित्र आत्मा के द्वारा गर्भ में आए, कुँवारी मरिया से जन्मे, पुन्तियुस पिलातुस के समय दुःख उठाया, क्रूस पर चढ़ाए गए, मर गए, और गाड़े गए; वे अधोलोक में उतरे, तीसरे दिन मरे हुओं में से जी उठे; वे स्वर्ग पर चढ़ गए, और सर्वशक्तिमान पिता परमेश्वर के दाहिने हाथ बैठे हैं; जहाँ से वे जीवतों और मृतकों का न्याय करने फिर आएँगे। मैं पवित्र आत्मा पर विश्वास करता हूँ, पवित्र काथलिक कलीसिया पर, संतों की सहभागिता पर, पापों की क्षमा पर, देह के पुनरुत्थान पर, और अनन्त जीवन पर। आमीन।`,
      Assamese: `মই সৰ্ব্বশক্তিমান পিতৃ ঈশ্বৰ, স্বৰ্গ আৰু পৃথিৱীৰ স্ৰষ্টাক বিশ্বাস কৰোঁ। আৰু তেওঁৰ একমাত্ৰ পুত্ৰ, আমাৰ প্ৰভু যীচু খ্ৰীষ্টক বিশ্বাস কৰোঁ, যি পৱিত্ৰ আত্মাৰ দ্বাৰা গৰ্ভস্থ হৈ কুমাৰী মৰিয়মৰ পৰা জন্ম গ্ৰহণ কৰিলে, পন্তীয় পীলাতৰ দিনত দুখ ভোগ কৰিলে, ক্ৰুচত অৰ্পিত হ’ল, মৃত্যু পালে আৰু সমাধিস্থ হ’ল; তেওঁ পাতাললৈ নামি গ’ল, তৃতীয় দিনা মৃতসকলৰ মাজৰ পৰা পুনৰুত্থিত হ’ল; স্বৰ্গলৈ আৰোহণ কৰিলে, আৰু সৰ্ব্বশক্তিমান পিতৃ ঈশ্বৰৰ সোঁহাতে বহিল; তাৰ পৰা তেওঁ জীৱিত আৰু মৃতসকলৰ বিচাৰ কৰিবলৈ আহিব। মই পৱিত্ৰ আত্মা, পৱিত্ৰ কাথলিক মণ্ডলী, সাধুসকলৰ সহভাগিতা, পাপৰ ক্ষমা, শৰীৰৰ পুনৰুত্থান আৰু অনন্ত জীৱনত বিশ্বাস কৰোঁ। আমেন।`,
      Spanish: `Creo en Dios, Padre Todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, Nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.`
    },
    significance: 'Ancient summary of the core Christian doctrines handed down from the Twelve Apostles.'
  },
  {
    id: 'hail-holy-queen',
    category: 'daily',
    title: 'Hail, Holy Queen',
    latinSubtitle: 'Salve Regina',
    traditionalTitles: {
      English: 'Hail, Holy Queen (Salve Regina)',
      Hindi: 'हे पवित्र रानी (साल्वे रेजिना)',
      Assamese: 'হে পৱিত্ৰ ৰাণী',
      Spanish: 'La Salve (Salve Regina)'
    },
    text: `Hail, Holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O Holy Mother of God, that we may be made worthy of the promises of Christ. Amen.`,
    translations: {
      Hindi: `हे पवित्र रानी, दया की माँ, हमारा जीवन, हमारी मधुरता और हमारी आशा, तुझे प्रणाम। हम हव्वा की निर्वासित संतान तुझे पुकारते हैं; इस आँसुओं की तराई में विलाप और रोते हुए हम तेरी ओर आहें भरते हैं। इसलिए हे हमारी कृपालु मध्यस्थ, अपनी दया की आँखें हमारी ओर फेर, और इस निर्वासन के बाद अपने गर्भ का धन्य फल यीशु हमें दिखा। हे दयालु, हे प्रेममयी, हे मधुर कुँवारी मरिया। हे ईश्वर की पवित्र माँ, हमारे लिए प्रार्थना कर, ताकि हम मसीह की प्रतिज्ञाओं के योग्य बन सकें। आमीन।`,
      Assamese: `হে পৱিত্ৰ ৰাণী, দয়াৰ মাতৃ, আমাৰ জীৱন, আমাৰ মধুৰতা আৰু আমাৰ আশা, তোমাক প্ৰণাম। আমি হৱাৰ নিৰ্বাসিত সন্তানসকলে তোমাক আহ্বান কৰোঁ; এই চকুপানীৰ উপত্যকাত কান্দি তোমালৈ কাতৰ প্ৰাৰ্থনা জনাওঁ। এতেকে হে আমাৰ পৰম কৃপাময়ী মধ্যস্থকাৰিণী, তোমাৰ দয়াৰ দৃষ্টি আমালৈ ঘূৰোৱা, আৰু এই নিৰ্বাসনৰ পিছত তোমাৰ গৰ্ভৰ ধন্য ফল যীচুক আমাক দেখুওৱা। হে কৃপালু, হে স্নেহময়ী, হে মধুৰ কুমাৰী মৰিয়ম। আমেন।`,
      Spanish: `Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando, en este valle de lágrimas. Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clementísima, oh piadosa, oh dulce Virgen María! Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo. Amén.`
    },
    significance: 'Traditional Catholic Marian antiphon prayed at the end of the Rosary and Compline.'
  },
  {
    id: 'guardian-angel',
    category: 'daily',
    title: 'Guardian Angel Prayer',
    latinSubtitle: 'Angele Dei',
    traditionalTitles: {
      English: 'Prayer to Guardian Angel',
      Hindi: 'संरक्षक दूत की प्रार्थना',
      Assamese: 'অভিভাৱক দূতৰ প্ৰাৰ্থনা',
      Spanish: 'Oración al Ángel de la Guarda'
    },
    text: `Angel of God, my guardian dear, to whom God's love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen.`,
    translations: {
      Hindi: `हे ईश्वर के दूत, मेरे प्रिय संरक्षक, जिसे ईश्वर का प्रेम मेरी रखवाली के लिए सौंपता है, आज के दिन सदा मेरे साथ रह, मुझको ज्योति दे और मेरी रक्षा कर, मुझ पर शासन कर और मेरा मार्गदर्शन कर। आमीन।`,
      Assamese: `হে ঈশ্বৰৰ দূত, মোৰ প্ৰিয় ৰক্ষক, যাক ঈশ্বৰৰ প্ৰেমে মোৰ পহৰাদাৰ হিচাপে নিযুক্ত কৰিলে, আজিৰ দিনটোত সদায় মোৰ লগত থাকা; মোক পোহৰ দিয়া, ৰক্ষা কৰা, পৰিচালনা কৰা আৰু পথ দেখুওৱা। আমেন।`,
      Spanish: `Ángel de Dios, mi custodio y dulce compañía, a quien el amor divino me confía, en este día no me desampares, ilumíname, guárdame, rígeme y gobiérname. Amén.`
    },
    significance: 'Ancient Catholic invocation seeking protection and spiritual guidance from one\'s personal guardian angel.'
  },

  // --- C. Daily Catholic Devotions ---
  {
    id: 'the-angelus',
    category: 'devotions',
    title: 'The Angelus (Angelus Domini)',
    latinSubtitle: 'Angelus Domini',
    traditionalTitles: {
      English: 'The Angelus',
      Hindi: 'दूतसंवाद प्रार्थना (एंजेलुस)',
      Assamese: 'দূতসংবাদ প্ৰাৰ্থনা',
      Spanish: 'El Ángelus'
    },
    text: `V. The Angel of the Lord declared unto Mary.
R. And she conceived of the Holy Spirit.
(Hail Mary...)

V. Behold the handmaid of the Lord.
R. Be it done unto me according to Thy word.
(Hail Mary...)

V. And the Word was made flesh.
R. And dwelt among us.
(Hail Mary...)

V. Pray for us, O Holy Mother of God.
R. That we may be made worthy of the promises of Christ.

Let us pray: Pour forth, we beseech Thee, O Lord, Thy grace into our hearts, that we to whom the Incarnation of Christ Thy Son was made known by the message of an Angel, may by His Passion and Cross be brought to the glory of His Resurrection; through the same Christ our Lord. Amen.`,
    translations: {
      Hindi: `पद: प्रभु के दूत ने मरिया को सन्देश दिया।
उत्तर: और वह पवित्र आत्मा से गर्भवती हुई।
(प्रणाम मरिया...)

पद: देख, मैं प्रभु की दासी हूँ।
उत्तर: तेरे वचन के अनुसार मुझ में हो।
(प्रणाम मरिया...)

पद: और वचन देहधारी हुआ।
उत्तर: और हमारे बीच में रहा।
(प्रणाम मरिया...)

पद: हे ईश्वर की पवित्र माँ, हमारे लिए प्रार्थना कर।
उत्तर: कि हम मसीह की प्रतिज्ञाओं के योग्य बनें।

हम प्रार्थना करें: हे प्रभु, हम विनती करते हैं, अपने अनुग्रह को हमारे हृदयों में उंडेल, ताकि जिस मसीह के अवतार को हमने दूत के सन्देश द्वारा जाना, उसके दुःख और क्रूस के द्वारा हम उसके पुनरुत्थान की महिमा तक पहुँच सकें; हमारे प्रभु मसीह के द्वारा। आमीन।`,
      Spanish: `V. El Ángel del Señor anunció a María.
R. Y concibió por obra y gracia del Espíritu Santo.
(Dios te salve María...)

V. He aquí la esclava del Señor.
R. Hágase en mí según tu palabra.
(Dios te salve María...)

V. Y el Verbo se hizo carne.
R. Y habitó entre nosotros.
(Dios te salve María...)

V. Ruega por nosotros, Santa Madre de Dios.
R. Para que seamos dignos de alcanzar las promesas de Cristo.

Oremos: Te suplicamos, Señor, que derrames tu gracia en nuestras almas para que los que, por el anuncio del Ángel, hemos conocido la encarnación de tu Hijo Jesucristo, por su pasión y cruz lleguemos a la gloria de su resurrección. Por Jesucristo Nuestro Señor. Amén.`
    },
    significance: 'Traditional Catholic prayer recited three times daily (morning at 6 AM, noon at 12 PM, and evening at 6 PM) commemorating the Incarnation.'
  },
  {
    id: 'divine-mercy-chaplet',
    category: 'devotions',
    title: 'The Chaplet of the Divine Mercy',
    latinSubtitle: 'Corona Divinae Misericordiae',
    traditionalTitles: {
      English: 'Chaplet of the Divine Mercy',
      Hindi: 'ईश्वरीय करुणा की माला',
      Assamese: 'ঐশ্বৰিক দয়াৰ মালা',
      Spanish: 'Coronilla de la Divina Misericordia'
    },
    text: `Opening Prayer (at 3 o'clock hour):
"You expired, Jesus, but the source of life gushed forth for souls, and the ocean of mercy opened up for the whole world. O Fount of Life, unfathomable Divine Mercy, envelop the whole world and empty Yourself out upon us."

On the Large Beads (Our Father bead):
"Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world."

On the 10 Small Beads (Hail Mary beads):
"For the sake of His sorrowful Passion, have mercy on us and on the whole world."

Concluding Doxology (repeated 3 times):
"Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world." Amen.`,
    translations: {
      Hindi: `आरंभिक प्रार्थना (दोपहर 3 बजे का स्मरण):
"हे यीशु, तूने प्राण त्याग दिए, परन्तु आत्माओं के लिए जीवन का सोता फूट निकला, और सारी दुनिया के लिए करुणा का महासागर खुल गया। हे जीवन के सोते, अगाध ईश्वरीय करुणा, सम्पूर्ण संसार को अपने आगोश में ले ले और स्वयं को हम पर उंडेल दे।"

बड़ी मणियों पर:
"हे अनन्त पिता, मैं अपने और सारे संसार के पापों के प्रायश्चित के लिए, आपके अति प्रिय पुत्र, हमारे प्रभु यीशु मसीह के शरीर और रक्त, आत्मा और ईश्वरत्व को आपको अर्पित करता हूँ।"

छोटी 10 मणियों पर:
"उनके दुःखद क्रूस-भोग के कारण, हम पर और सारे संसार पर दया कर।"

समापन त्रिवार स्तुति (3 बार):
"पवित्र परमेश्वर, पवित्र सर्वशक्तिमान, पवित्र अमरेश्वर, हम पर और सारे संसार पर दया कर।" आमीन।`,
      Spanish: `Padre Eterno, te ofrezco el Cuerpo y la Sangre, el Alma y la Divinidad de tu amadísimo Hijo, Nuestro Señor Jesucristo, como propiciación por nuestros pecados y los del mundo entero. Por su dolorosa Pasión, ten misericordia de nosotros y del mundo entero. Santo Dios, Santo Fuerte, Santo Inmortal, ten piedad de nosotros y del mundo entero.`
    },
    significance: 'Revealed to St. Faustina Kowalska by Jesus Christ as a powerful intercession for divine mercy and conversion.'
  },
  {
    id: 'act-of-contrition',
    category: 'devotions',
    title: 'Act of Contrition',
    latinSubtitle: 'Actus Contritionis',
    traditionalTitles: {
      English: 'Act of Contrition (Confession Prayer)',
      Hindi: 'पश्चाताप की प्रार्थना (कन्फेशन)',
      Assamese: 'অনুতাপৰ প্ৰাৰ্থনা',
      Spanish: 'Acto de Contrición'
    },
    text: `O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of thy just punishments, but most of all because they offend Thee, my God, who art all good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasion of sin. Amen.`,
    translations: {
      Hindi: `हे मेरे परमेश्वर, मैं अपने सारे हृदय से दुःखी हूँ कि मैंने तेरा अपमान किया है। मैं अपने सब पापों से घृणा करता हूँ, क्योंकि वे तुझे नाराज़ करते हैं, जो सब से उत्तम और मेरे सम्पूर्ण प्रेम के योग्य है। मैं तेरी कृपा की सहायता से दृढ़ प्रतिज्ञा करता हूँ कि फिर कभी पाप न करूँगा, और पाप के अवसरों से दूर रहूँगा। आमीन।`,
      Assamese: `হে মোৰ ঈশ্বৰ, মই সমস্ত অন্তৰেৰে দুখিত যে মই আপোনাৰ বিৰুদ্ধে পাপ কৰিলোঁ। মই মোৰ সকলো পাপক ঘৃণা কৰোঁ, কিয়নো আপুনি পৰম মঙ্গলময় আৰু মোৰ সমস্ত প্ৰেমৰ যোগ্য। আপোনাৰ কৃপাৰ সহায়ত মই দৃঢ় প্ৰতিজ্ঞা কৰোঁ যে মই পুনৰ পাপ নকৰিম আৰু পাপৰ সকলো পৰিবেশৰ পৰা আঁতৰি থাকিম। আমেন।`,
      Spanish: `Señor mío Jesucristo, Dios y Hombre verdadero, Creador, Padre y Redentor mío; por ser Vos quien sois, Bondad infinita, y porque os amo sobre todas las cosas, me pesa de todo corazón haberos ofendido. Propongo firmemente nunca más pecar, apartarme de todas las ocasiones de ofenderos, confesarme y cumplir la penitencia que me fuere impuesta. Amén.`
    },
    significance: 'Essential Catholic prayer recited during the Sacrament of Penance and Reconciliation (Confession).'
  },
  {
    id: 'communion-prayers',
    category: 'devotions',
    title: 'Prayers Before & After Holy Communion',
    latinSubtitle: 'Orationes ad Sanctam Communionem',
    traditionalTitles: {
      English: 'Prayers Before & After Holy Communion',
      Hindi: 'परमप्रसाद ग्रहण से पहले और बाद की प्रार्थना',
      Assamese: 'পৱিত্ৰ পৰমপ্ৰসাদ গ্ৰহণৰ পূৰ্বৰ আৰু পিছৰ প্ৰাৰ্থনা',
      Spanish: 'Oraciones para la Sagrada Comunión'
    },
    text: `Before Holy Communion:
"Lord Jesus Christ, King of glory, I believe that You are truly present in the Most Blessed Sacrament of the Altar. I love You above all things, and I desire to receive You into my soul. Since I cannot now receive You sacramentally, come at least spiritually into my heart. Lord, I am not worthy that You should enter under my roof, but only say the word and my soul shall be healed."

After Holy Communion (Anima Christi):
"Soul of Christ, sanctify me. Body of Christ, save me. Blood of Christ, inebriate me. Water from the side of Christ, wash me. Passion of Christ, strengthen me. O good Jesus, hear me. Within Thy wounds hide me. Suffer me not to be separated from Thee. From the malicious enemy defend me. In the hour of my death call me, and bid me come unto Thee, that with Thy saints I may praise Thee forever and ever. Amen."`,
    translations: {
      Hindi: `परमप्रसाद ग्रहण से पहले:
"हे प्रभु यीशु मसीह, महिमा के राजा, मैं विश्वास करता हूँ कि आप वेदी के परमपवित्र संस्कार में साक्षात् उपस्थित हैं। मैं आपसे सब से बढ़कर प्रेम करता हूँ। हे प्रभु, मैं इस योग्य नहीं कि आप मेरी छत के नीचे आएँ, परन्तु केवल एक शब्द कह दीजिए और मेरी आत्मा चंगी हो जाएगी।"

परमप्रसाद ग्रहण के बाद (अनिमा क्रिस्टी):
"मसीह की आत्मा, मुझे पवित्र कर। मसीह का शरीर, मेरा उद्धार कर। मसीह का रक्त, मुझे तृप्त कर। मसीह की पसली का जल, मुझे धो दे। हे भले यीशु, मेरी सुन। अपने घावों में मुझे छिपा ले। मुझे अपने से कभी अलग न होने दे। दुष्ट शत्रु से मेरी रक्षा कर। मेरी मृत्यु के समय मुझे बुला, ताकि मैं तेरे संतों के साथ सदा तेरी स्तुति करूँ। आमीन।"`,
      Spanish: `Alma de Cristo, santifícame. Cuerpo de Cristo, sálvame. Sangre de Cristo, embriágame. Agua del costado de Cristo, lávame. Pasión de Cristo, confórtame. ¡Oh, buen Jesús!, óyeme. Dentro de tus llagas, escóndeme. No permitas que me aparte de ti. Del maligno enemigo, defiéndeme. En la hora de mi muerte, llámame y mándame ir a ti, para que con tus santos te alabe por los siglos de los siglos. Amén.`
    },
    significance: 'Spiritual preparation and devout Thanksgiving (Anima Christi) for receiving the true Body and Blood of Jesus in the Eucharist.'
  },
  {
    id: 'stations-of-the-cross',
    category: 'devotions',
    title: 'The 14 Stations of the Cross (Summary)',
    latinSubtitle: 'Via Crucis',
    traditionalTitles: {
      English: '14 Stations of the Cross (Via Crucis)',
      Hindi: 'क्रूस का रास्ता (14 मुकाम)',
      Assamese: 'ক্ৰুচৰ পথ (১৪ টা স্থান)',
      Spanish: 'Las 14 Estaciones del Vía Crucis'
    },
    text: `Opening Prayer: "We adore Thee, O Christ, and we praise Thee. Because by Thy Holy Cross, Thou hast redeemed the world."

1. Jesus is condemned to death by Pilate.
2. Jesus carries His heavy cross.
3. Jesus falls the first time.
4. Jesus meets His afflicted Mother Mary.
5. Simon of Cyrene helps Jesus carry the cross.
6. Veronica wipes the sacred face of Jesus.
7. Jesus falls the second time.
8. Jesus meets the weeping women of Jerusalem.
9. Jesus falls the third time.
10. Jesus is stripped of His garments.
11. Jesus is nailed to the cross.
12. Jesus dies on the cross for our salvation.
13. Jesus is taken down from the cross and placed in Mary's arms.
14. Jesus is laid in the holy sepulchre.

Closing Prayer: "Lord Jesus, by Your passion and glorious resurrection, grant us the grace to take up our cross daily and follow You into eternal life. Amen."`,
    translations: {
      Hindi: `प्रारंभ: "हे मसीह, हम तेरी आराधना करते हैं और तेरी स्तुति करते हैं; क्योंकि तूने अपने पवित्र क्रूस के द्वारा दुनिया को बचाया है।"
1. यीशु को मृत्यु-दण्ड दिया जाता है।
2. यीशु अपने कन्धों पर क्रूस उठाते हैं।
3. यीशु पहली बार क्रूस के नीचे गिरते हैं।
4. यीशु अपनी दुःखित माता से मिलते हैं।
5. कुरेनी का सिमोन यीशु का क्रूस उठाने में सहायता करता है।
6. वेरोनिका यीशु का पवित्र मुख पोंछती है।
7. यीशु दूसरी बार गिरते हैं।
8. यीशु यरूशलेम की रोती हुई स्त्रियों को सम्भाषण देते हैं।
9. यीशु तीसरी बार गिरते हैं।
10. यीशु के वस्त्र उतारे जाते हैं।
11. यीशु क्रूस पर ठोके जाते हैं।
12. यीशु क्रूस पर प्राण त्याग देते हैं।
13. यीशु क्रूस से उतारे जाकर अपनी माता की गोद में रखे जाते हैं।
14. यीशु को कब्र में रखा जाता है।
समापन: "हे प्रभु, अपने दुःखभोग और पुनरुत्थान के द्वारा हमें प्रतिदिन अपना क्रूस उठाकर तेरे पीछे चलने की कृपा दे। आमीन।"`,
      Spanish: `Te adoramos, oh Cristo, y te bendecimos, que por tu santa cruz redimiste al mundo. 1. Jesús es condenado a muerte. 2. Jesús carga la cruz. 3. Jesús cae por primera vez. 4. Jesús encuentra a su Madre. 5. Simón de Cirene ayuda a llevar la cruz. 6. La Verónica limpia el rostro de Jesús. 7. Jesús cae por segunda vez. 8. Jesús consuela a las mujeres de Jerusalén. 9. Jesús cae por tercera vez. 10. Jesús es despojado de sus vestiduras. 11. Jesús es clavado en la cruz. 12. Jesús muere en la cruz. 13. Jesús es bajado de la cruz y puesto en brazos de su Madre. 14. Jesús es colocado en el sepulcro.`
    },
    significance: 'Traditional Catholic meditation walking alongside Christ along the Via Dolorosa to Calvary.'
  }
];

// --- B. The Holy Rosary Mysteries ---
export const ROSARY_MYSTERIES: RosaryMystery[] = [
  {
    id: 'joyful',
    type: 'joyful',
    name: 'The Joyful Mysteries',
    hindiName: 'आनंद के भेद',
    assameseName: 'আনন্দৰ ভেদ',
    spanishName: 'Misterios Gozosos',
    dayRecommended: 'Mondays and Saturdays',
    decadeList: [
      {
        decadeNumber: 1,
        title: 'The Annunciation of the Lord',
        hindiTitle: 'दूतसंवाद (कुँवारी मरिया को सन्देश)',
        assameseTitle: 'কুমাৰী মৰিয়মলৈ দূতৰ শুভবাৰ্ত্তা',
        spanishTitle: 'La Anunciación del Ángel a María',
        scriptureReference: 'Luke 1:26-38',
        meditation: 'The Angel Gabriel announces to the Virgin Mary that she will conceive the Son of the Most High by the Holy Spirit.',
        fruit: 'Humility'
      },
      {
        decadeNumber: 2,
        title: 'The Visitation to Elizabeth',
        hindiTitle: 'एलिजाबेथ से भेंट',
        assameseTitle: 'ইলীচাবেতৰ ওচৰলৈ যাত্ৰা',
        spanishTitle: 'La Visitación de María a su prima Isabel',
        scriptureReference: 'Luke 1:39-56',
        meditation: 'Mary visits her cousin Elizabeth, carrying Jesus in her womb, and Elizabeth is filled with the Holy Spirit.',
        fruit: 'Love of Neighbor & Charity'
      },
      {
        decadeNumber: 3,
        title: 'The Nativity of Our Lord',
        hindiTitle: 'प्रभु यीशु का जन्म (बेथलहम)',
        assameseTitle: 'প্ৰভু যীচুৰ জন্ম',
        spanishTitle: 'El Nacimiento de Jesús en Belén',
        scriptureReference: 'Luke 2:1-20',
        meditation: 'The Savior of the world is born in the humble stable of Bethlehem and placed in a manger.',
        fruit: 'Poverty of Spirit & Detachment'
      },
      {
        decadeNumber: 4,
        title: 'The Presentation in the Temple',
        hindiTitle: 'मंदिर में प्रभु का समर्पण',
        assameseTitle: 'মন্দিৰত প্ৰভুৰ সমৰ্পণ',
        spanishTitle: 'La Presentación del Niño Jesús en el Templo',
        scriptureReference: 'Luke 2:22-38',
        meditation: 'Mary and Joseph present the infant Jesus in the Temple according to the law of the Lord.',
        fruit: 'Purity & Obedience'
      },
      {
        decadeNumber: 5,
        title: 'The Finding of Jesus in the Temple',
        hindiTitle: 'मंदिर में बालक यीशु का मिलना',
        assameseTitle: 'মন্দিৰত বালক যীচুৰ আৱিষ্কাৰ',
        spanishTitle: 'El Niño Jesús perdido y hallado en el Templo',
        scriptureReference: 'Luke 2:41-52',
        meditation: 'After three anxious days, Mary and Joseph find the young Jesus among the teachers, asking questions and listening.',
        fruit: 'Piety & Joy in Finding Jesus'
      }
    ]
  },
  {
    id: 'luminous',
    type: 'luminous',
    name: 'The Luminous Mysteries (Mysteries of Light)',
    hindiName: 'प्रकाश के भेद',
    assameseName: 'পোহৰৰ ভেদ',
    spanishName: 'Misterios Luminosos',
    dayRecommended: 'Thursdays',
    decadeList: [
      {
        decadeNumber: 1,
        title: 'The Baptism of Jesus in the Jordan',
        hindiTitle: 'यरदन नदी में यीशु का बपतिस्मा',
        assameseTitle: 'যৰ্দ্দন নৈত যীচুৰ বাপ্তিস্মা',
        spanishTitle: 'El Bautismo de Jesús en el Jordán',
        scriptureReference: 'Matthew 3:13-17',
        meditation: 'The heavens open and the Father proclaims: "This is my beloved Son, with whom I am well pleased."',
        fruit: 'Openness to the Holy Spirit'
      },
      {
        decadeNumber: 2,
        title: 'The Wedding Feast at Cana',
        hindiTitle: 'काना का विवाह (पहला चमत्कार)',
        assameseTitle: 'কানা গাঁৱৰ বিবাহ ভোজ',
        spanishTitle: 'El Milagro en las Bodas de Caná',
        scriptureReference: 'John 2:1-11',
        meditation: 'At the request of His Mother, Jesus turns water into wine, revealing His glory.',
        fruit: 'To Jesus through Mary'
      },
      {
        decadeNumber: 3,
        title: 'The Proclamation of the Kingdom of God',
        hindiTitle: 'परमेश्वर के राज्य का प्रचार और पश्चाताप का आह्वान',
        assameseTitle: 'ঈশ্বৰৰ ৰাজ্যৰ প্ৰচাৰ',
        spanishTitle: 'El Anuncio del Reino de Dios y la llamada a la conversión',
        scriptureReference: 'Mark 1:14-15',
        meditation: 'Jesus preaches the Good News, heals the sick, and invites all souls to repentance and faith.',
        fruit: 'Repentance & Trust in God'
      },
      {
        decadeNumber: 4,
        title: 'The Transfiguration of Our Lord',
        hindiTitle: 'प्रभु का रूपान्तरण (ताबीर पहाड़)',
        assameseTitle: 'প্ৰভুৰ ৰূপান্তৰণ',
        spanishTitle: 'La Transfiguración de Jesús en el Monte Tabor',
        scriptureReference: 'Matthew 17:1-8',
        meditation: 'Jesus shines with heavenly glory before Peter, James, and John as a foretaste of His resurrection.',
        fruit: 'Desire for Holiness'
      },
      {
        decadeNumber: 5,
        title: 'The Institution of the Holy Eucharist',
        hindiTitle: 'परमप्रसाद (यूखरिस्त) की स्थापना',
        assameseTitle: 'পৱিত্ৰ পৰমপ্ৰসাদৰ স্থাপন',
        spanishTitle: 'La Institución de la Eucaristía en la Última Cena',
        scriptureReference: 'Matthew 26:26-29',
        meditation: 'At the Last Supper, Jesus gives us His own Body and Blood as the eternal food of salvation.',
        fruit: 'Eucharistic Adoration'
      }
    ]
  },
  {
    id: 'sorrowful',
    type: 'sorrowful',
    name: 'The Sorrowful Mysteries',
    hindiName: 'दुख के भेद',
    assameseName: 'দুখৰ ভেদ',
    spanishName: 'Misterios Dolorosos',
    dayRecommended: 'Tuesdays and Fridays',
    decadeList: [
      {
        decadeNumber: 1,
        title: 'The Agony in the Garden of Gethsemane',
        hindiTitle: 'गेतसमनी की बाड़ी में व्याकुलता',
        assameseTitle: 'গেৎচিমনিৰ বাৰীত যীচুৰ প্ৰাৰ্থনা',
        spanishTitle: 'La Oración de Jesús en el Huerto de Getsemaní',
        scriptureReference: 'Luke 22:39-46',
        meditation: 'Jesus prays in intense agony, sweating drops of blood as He submits to the Father\'s will.',
        fruit: 'Sorrow for Sin & Conformity to God\'s Will'
      },
      {
        decadeNumber: 2,
        title: 'The Scourging at the Pillar',
        hindiTitle: 'खम्भे से बाँधकर कोड़े लगाना',
        assameseTitle: 'স্তম্ভত বান্ধি কোবোৱা',
        spanishTitle: 'La Flagelación de Nuestro Señor atado a la columna',
        scriptureReference: 'Matthew 27:26',
        meditation: 'Jesus is brutally scourged by Roman soldiers, bearing stripes for our transgressions.',
        fruit: 'Mortification & Purity'
      },
      {
        decadeNumber: 3,
        title: 'The Crowning with Thorns',
        hindiTitle: 'काँटों का मुकुट पहनाया जाना',
        assameseTitle: 'কাঁইটীয়া কিৰীটি পিন্ধোৱা',
        spanishTitle: 'La Coronación de Espinas',
        scriptureReference: 'Matthew 27:27-31',
        meditation: 'Soldiers twist a crown of thorns and place it on Jesus\' sacred head, mocking Him as King.',
        fruit: 'Moral Courage & Humility'
      },
      {
        decadeNumber: 4,
        title: 'The Carrying of the Cross',
        hindiTitle: 'क्रूस उठाकर कलवारी जाना',
        assameseTitle: 'ক্ৰুচ কঢ়িয়াই নিয়া',
        spanishTitle: 'Jesús con la Cruz a cuestas camino del Calvario',
        scriptureReference: 'John 19:16-17',
        meditation: 'Exhausted and bleeding, Jesus carries the heavy wood of the cross to Calvary.',
        fruit: 'Patience in Suffering'
      },
      {
        decadeNumber: 5,
        title: 'The Crucifixion and Death of Our Lord',
        hindiTitle: 'क्रूस पर मृत्यु',
        assameseTitle: 'ক্ৰুচত আত্মোৎসৰ্গ আৰু মৃত্যু',
        spanishTitle: 'La Crucifixión y Muerte de Nuestro Señor Jesucristo',
        scriptureReference: 'Luke 23:33-46',
        meditation: 'Jesus is nailed to the cross and gives His life for the salvation of mankind, crying "Father, into Your hands I commend my spirit."',
        fruit: 'Self-Sacrifice & Forgiveness'
      }
    ]
  },
  {
    id: 'glorious',
    type: 'glorious',
    name: 'The Glorious Mysteries',
    hindiName: 'महिमा के भेद',
    assameseName: 'মহিমাৰ ভেদ',
    spanishName: 'Misterios Gloriosos',
    dayRecommended: 'Wednesdays and Sundays',
    decadeList: [
      {
        decadeNumber: 1,
        title: 'The Resurrection of Jesus Christ',
        hindiTitle: 'यीशु का जी उठना',
        assameseTitle: 'যীচুৰ পুনৰুত্থান',
        spanishTitle: 'La Resurrección de Jesucristo',
        scriptureReference: 'Matthew 28:1-10',
        meditation: 'On the third day, Jesus triumphs over sin and death, rising gloriously from the tomb.',
        fruit: 'Faith'
      },
      {
        decadeNumber: 2,
        title: 'The Ascension into Heaven',
        hindiTitle: 'स्वर्गारोहण',
        assameseTitle: 'স্বৰ্গলৈ আৰোহণ',
        spanishTitle: 'La Ascensión de Jesús al Cielo',
        scriptureReference: 'Acts 1:6-11',
        meditation: 'Forty days after His resurrection, Jesus ascends into heaven to prepare a place for us.',
        fruit: 'Hope & Longing for Heaven'
      },
      {
        decadeNumber: 3,
        title: 'The Descent of the Holy Spirit (Pentecost)',
        hindiTitle: 'पवित्र आत्मा का उतरना (पेंतेकोस्त)',
        assameseTitle: 'পৱিত্ৰ আত্মাৰ আগমন (পেন্তেকোষ্ট)',
        spanishTitle: 'La Venida del Espíritu Santo en Pentecostés',
        scriptureReference: 'Acts 2:1-4',
        meditation: 'The Holy Spirit descends as tongues of fire upon Mary and the Apostles gathered in prayer.',
        fruit: 'Love of God & Zeal'
      },
      {
        decadeNumber: 4,
        title: 'The Assumption of the Virgin Mary',
        hindiTitle: 'माता मरिया का स्वर्ग में उद्ग्रहण',
        assameseTitle: 'মাতা মৰিয়মৰ স্বৰ্গলৈ উত্তৰণ',
        spanishTitle: 'La Asunción de la Virgen María en cuerpo y alma',
        scriptureReference: 'Revelation 12:1',
        meditation: 'At the end of her earthly life, Mary is taken up body and soul into heavenly glory.',
        fruit: 'Grace of a Happy Death'
      },
      {
        decadeNumber: 5,
        title: 'The Coronation of Mary as Queen of Heaven',
        hindiTitle: 'स्वर्ग की रानी के रूप में मुकुट पहनाना',
        assameseTitle: 'স্বৰ্গৰ ৰাণী হিচাপে মুকুট অৰ্পণ',
        spanishTitle: 'La Coronación de María como Reina de Cielos y Tierra',
        scriptureReference: 'Revelation 12:1',
        meditation: 'Mary is crowned by her Divine Son as Queen of Heaven and Earth, Queen of the Universe.',
        fruit: 'Trust in Mary\'s Intercession'
      }
    ]
  }
];
