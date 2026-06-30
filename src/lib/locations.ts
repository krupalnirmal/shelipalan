// Maharashtra's 36 districts (current names, grouped by revenue division).
export const MAHARASHTRA_DISTRICTS = [
  "मुंबई शहर", "मुंबई उपनगर", "ठाणे", "पालघर", "रायगड", "रत्नागिरी", "सिंधुदुर्ग",
  "नाशिक", "धुळे", "नंदुरबार", "जळगाव", "अहिल्यानगर",
  "पुणे", "सातारा", "सांगली", "सोलापूर", "कोल्हापूर",
  "छत्रपती संभाजीनगर", "जालना", "परभणी", "हिंगोली", "बीड", "नांदेड", "धाराशिव", "लातूर",
  "अमरावती", "बुलढाणा", "अकोला", "वाशिम", "यवतमाळ",
  "नागपूर", "वर्धा", "गोंदिया", "भंडारा", "चंद्रपूर", "गडचिरोली",
];

// Taluka data is currently complete only for अहिल्यानगर (the district this app
// is actually used in). Other districts can be added once we have real data.
export const TALUKAS_BY_DISTRICT: Record<string, string[]> = {
  "अहिल्यानगर": [
    "राहाता", "श्रीरामपूर", "कोपरगाव", "संगमनेर", "अकोले", "राहुरी",
    "नेवासा", "नगर", "पारनेर", "श्रीगोंदा", "कर्जत", "जामखेड", "पाथर्डी", "शेवगाव",
  ],
};

// Roman search keys for village autocomplete — user can type in English and get Marathi suggestions.
// Format: [marathi_name, ...roman_search_keys]
export const VILLAGE_ROMAN_INDEX: [string, string][] = [
  ["आडगाव बु.", "adgaon bu aadgaon buduruk"],
  ["आडगाव खु.", "adgaon khu aadgaon khurd"],
  ["आस्तगाव", "astagaon astgaon"],
  ["बाभळेश्वर", "babhuleshwar babhuleshvar babhul"],
  ["भगवतीपूर", "bhagwatipur bhagvatipur"],
  ["चांदापूर", "chandapur chandapoor"],
  ["चितळी", "chitali chitli chital"],
  ["दाढ बु.", "dadh bu dadh buduruk"],
  ["धनगरवाडी", "dhangarwadi dhangar wadi"],
  ["दोरहळे", "dorhale dorhal"],
  ["दुर्गापूर", "durgapur durgapoor"],
  ["दहिगाव कोऱ्हाळे", "dahigaon korhale dahigav"],
  ["एकरुखे", "ekrukhe ekrukha"],
  ["गोगलगाव", "gogalgaon gogal gaon"],
  ["हनमंतगाव", "hanmantgaon hanumantgaon"],
  ["हसनापूर", "hasanapur hasanpur hasan"],
  ["जळगाव", "jalgaon jalgav"],
  ["खडकेवाके", "khadkewake khadke wake"],
  ["कानकुरी", "kankuri kaankuri"],
  ["केळवड", "kelvad kaelvad kelwad"],
  ["कोऱ्हाळे", "korhale korhal korhala"],
  ["कोल्हार बुद्रुक", "kolhar budruk kolhar buduruk"],
  ["लोहगाव", "lohgaon lohgav"],
  ["लोणी बु.", "loni bu loni buduruk"],
  ["लोणी खु.", "loni khu loni khurd"],
  ["मामदापूर", "mamdapur mamadapur mamda"],
  ["नांदुर बु.", "nandur bu naandur"],
  ["नांदुरखी बु.", "nandurki bu nandurkhdi"],
  ["नांदुरखी खु.", "nandurki khu nandurkhdi khu"],
  ["निघोज", "nighoj nighoja"],
  ["निमगाव कोऱ्हाळे", "nimgaon korhale nimgav"],
  ["पाथरे बुद्रुक", "pathre budruk pathare"],
  ["पिंपळस", "pimpalas pimplas"],
  ["पिंप्री लोकाई", "pimpri lokai pimpree lokai"],
  ["पिंप्री निर्मळ", "pimpri nirmal pimpree nirmal"],
  ["पिंपळवाडी", "pimpalwadi pimpal wadi"],
  ["पुणतांबे", "puntambe puntambe"],
  ["राजुरी", "rajuri raajuri"],
  ["रामपूरवाडी", "rampurwadi rampur wadi rampoor"],
  ["रांजणगाव खुर्द", "ranjangaon khurd ranjangav"],
  ["रांजणखोळ", "ranjankhol ranjankhole"],
  ["रुई", "rui ruyi"],
  ["साकुरी", "sakuri saakuri"],
  ["सावळवीहीर बु.", "savlvihir bu savalvihir"],
  ["सावळवीहीर खु.", "savlvihir khu savalvihir khu"],
  ["शिंगवे", "shingave shingwe"],
  ["शिर्डी", "shirdi shirdhi shirdhee"],
  ["तिसगाव", "tisgaon tisgav"],
  ["वाकडी", "wakdi vakdi"],
  ["वाळकी", "walki valki"],
];

// Village data is currently complete only for राहाता taluka.
export const VILLAGES_BY_TALUKA: Record<string, string[]> = {
  "राहाता": [
    "आडगाव बु.", "आडगाव खु.", "आस्तगाव", "बाभळेश्वर", "भगवतीपूर",
    "चांदापूर", "चितळी", "दाढ बु.", "धनगरवाडी", "दोरहळे",
    "दुर्गापूर", "दहिगाव कोऱ्हाळे", "एकरुखे", "गोगलगाव", "हनमंतगाव",
    "हसनापूर", "जळगाव", "खडकेवाके", "कानकुरी", "केळवड",
    "कोऱ्हाळे", "कोल्हार बुद्रुक", "लोहगाव", "लोणी बु.", "लोणी खु.",
    "मामदापूर", "नांदुर बु.", "नांदुरखी बु.", "नांदुरखी खु.", "निघोज",
    "निमगाव कोऱ्हाळे", "पाथरे बुद्रुक", "पिंपळस", "पिंप्री लोकाई",
    "पिंप्री निर्मळ", "पिंपळवाडी", "पुणतांबे", "राजुरी", "रामपूरवाडी",
    "रांजणगाव खुर्द", "रांजणखोळ", "रुई", "साकुरी", "सावळवीहीर बु.",
    "सावळवीहीर खु.", "शिंगवे", "शिर्डी", "तिसगाव", "वाकडी", "वाळकी",
  ],
};
