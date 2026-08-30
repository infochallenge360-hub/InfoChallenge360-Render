// "Guess the Language by Script/Alphabet" — 70 real scripts/writing systems.
// text = a short verified sample (mostly greetings; some ancient scripts use a
// single attested logogram/word) shown as the on-screen clue. name = the
// language/script answer, spoken at reveal. googleFontFamily = the Noto Fonts
// family (Google Fonts) that correctly shapes this script; rendering is done
// via a real headless Chromium (scripts/gen-languages90.mjs), not opentype.js,
// since several of these scripts need contextual shaping opentype.js cannot do.
//
// IMPORTANT: items MUST stay grouped contiguously by level (all easy, then all
// medium, then all hard, then all impossible) — the engine (quizv2.jsx build())
// inserts a level-transition splash screen every time an item's level differs
// from the previous item's, so a single item stranded out of its tier block
// creates a spurious extra splash and visibly regresses the difficulty on
// screen (caught by GATE2 on the first E90 render after an in-place tier
// reassignment changed two items' level field without moving their array
// position).
export const LANGUAGES_E90 = [
  { slug: "mandarin-chinese", name: "Chinese", script: "Han (Simplified)", text: "你好", googleFontFamily: "Noto Sans SC", level: "easy" },
  { slug: "japanese", name: "Japanese", script: "Japanese (Kanji + Hiragana)", text: "こんにちは世界", googleFontFamily: "Noto Sans JP", level: "easy" },
  { slug: "korean-hangul", name: "Korean", script: "Hangul", text: "안녕하세요", googleFontFamily: "Noto Sans KR", level: "easy" },
  { slug: "russian-cyrillic", name: "Russian", script: "Cyrillic", text: "Привет", googleFontFamily: "Noto Sans", level: "easy" },
  { slug: "arabic", name: "Arabic", script: "Arabic", text: "مرحبا", googleFontFamily: "Noto Sans Arabic", level: "easy" },
  { slug: "hebrew", name: "Hebrew", script: "Hebrew", text: "שלום", googleFontFamily: "Noto Sans Hebrew", level: "easy" },
  { slug: "greek", name: "Greek", script: "Greek", text: "Γειά σου", googleFontFamily: "Noto Sans", level: "easy" },
  { slug: "hindi-devanagari", name: "Hindi", script: "Devanagari", text: "नमस्ते", googleFontFamily: "Noto Sans Devanagari", level: "easy" },
  { slug: "thai", name: "Thai", script: "Thai", text: "สวัสดี", googleFontFamily: "Noto Sans Thai", level: "easy" },
  { slug: "armenian", name: "Armenian", script: "Armenian", text: "Բարեւ", googleFontFamily: "Noto Sans Armenian", level: "easy" },
  { slug: "georgian", name: "Georgian", script: "Georgian", text: "გამარჯობა", googleFontFamily: "Noto Sans Georgian", level: "easy" },
  { slug: "amharic-ethiopic", name: "Amharic", script: "Ethiopic (Ge'ez)", text: "ሰላም", googleFontFamily: "Noto Sans Ethiopic", level: "easy" },
  { slug: "bengali", name: "Bengali", script: "Bengali", text: "নমস্কার", googleFontFamily: "Noto Sans Bengali", level: "easy" },
  { slug: "tamil", name: "Tamil", script: "Tamil", text: "வணக்கம்", googleFontFamily: "Noto Sans Tamil", level: "easy" },
  { slug: "punjabi-gurmukhi", name: "Punjabi", script: "Gurmukhi", text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", googleFontFamily: "Noto Sans Gurmukhi", level: "easy" },
  { slug: "khmer", name: "Khmer", script: "Khmer", text: "សួស្តី", googleFontFamily: "Noto Sans Khmer", level: "easy" },
  { slug: "mongolian-traditional", name: "Mongolian", script: "Mongolian (traditional)", text: "ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ", googleFontFamily: "Noto Sans Mongolian", level: "easy" },
  { slug: "vietnamese-diacritics", name: "Vietnamese", script: "Latin (Vietnamese diacritics)", text: "Xin chào", googleFontFamily: "Noto Sans", level: "easy" },
  { slug: "urdu-nastaliq", name: "Urdu", script: "Arabic (Nastaliq)", text: "کیا حال ہے", googleFontFamily: "Noto Nastaliq Urdu", level: "medium" },
  { slug: "telugu", name: "Telugu", script: "Telugu", text: "నమస్కారం", googleFontFamily: "Noto Sans Telugu", level: "medium" },
  { slug: "kannada", name: "Kannada", script: "Kannada", text: "ನಮಸ್ಕಾರ", googleFontFamily: "Noto Sans Kannada", level: "medium" },
  { slug: "malayalam", name: "Malayalam", script: "Malayalam", text: "നമസ്കാരം", googleFontFamily: "Noto Sans Malayalam", level: "medium" },
  { slug: "gujarati", name: "Gujarati", script: "Gujarati", text: "નમસ્તે", googleFontFamily: "Noto Sans Gujarati", level: "medium" },
  { slug: "sinhala", name: "Sinhala", script: "Sinhala", text: "ආයුබෝවන්", googleFontFamily: "Noto Sans Sinhala", level: "medium" },
  { slug: "myanmar-burmese", name: "Burmese", script: "Myanmar", text: "မင်္ဂလာပါ", googleFontFamily: "Noto Sans Myanmar", level: "medium" },
  { slug: "lao", name: "Lao", script: "Lao", text: "ສະບາຍດີ", googleFontFamily: "Noto Sans Lao", level: "medium" },
  { slug: "tibetan", name: "Tibetan", script: "Tibetan", text: "བཀྲ་ཤིས་བདེ་ལེགས", googleFontFamily: "Noto Serif Tibetan", level: "medium" },
  { slug: "cherokee", name: "Cherokee", script: "Cherokee", text: "ᎣᏏᏲ", googleFontFamily: "Noto Sans Cherokee", level: "medium" },
  { slug: "canadian-aboriginal-syllabics", name: "Inuktitut", script: "Canadian Aboriginal Syllabics", text: "ᐊᐃᓐᖓᐃ", googleFontFamily: "Noto Sans Canadian Aboriginal", level: "medium" },
  { slug: "nko", name: "N'Ko", script: "N'Ko", text: "ߒߞߏ", googleFontFamily: "Noto Sans NKo", level: "medium" },
  { slug: "tifinagh", name: "Tifinagh (Berber/Tamazight)", script: "Tifinagh", text: "ⴰⵣⵓⵍ", googleFontFamily: "Noto Sans Tifinagh", level: "medium" },
  { slug: "syriac", name: "Syriac (Aramaic)", script: "Syriac", text: "ܫܠܡܐ", googleFontFamily: "Noto Sans Syriac", level: "medium" },
  { slug: "coptic", name: "Coptic", script: "Coptic", text: "ⲟⲩϫⲁⲓ", googleFontFamily: "Noto Sans Coptic", level: "medium" },
  { slug: "thaana", name: "Dhivehi (Maldivian)", script: "Thaana", text: "މަރުޙަބާ", googleFontFamily: "Noto Sans Thaana", level: "medium" },
  { slug: "javanese", name: "Javanese", script: "Javanese", text: "ꦲꦤꦕꦫꦏ", googleFontFamily: "Noto Sans Javanese", level: "medium" },
  { slug: "balinese", name: "Balinese", script: "Balinese", text: "ᬲᬫᬶᬫᬦᬸᬲᬦᬾᬲᬦᬾᬜ᭄ᬭᬸᬯᬤᬶᬯᬦ᭄ᬢᬄ", googleFontFamily: "Noto Sans Balinese", level: "medium" },
  { slug: "adlam", name: "Adlam", script: "Adlam", text: "𞤀𞤣𞤤𞤢𞤥", googleFontFamily: "Noto Sans Adlam", level: "hard" },
  { slug: "vai", name: "Vai", script: "Vai", text: "ꕙꔤ", googleFontFamily: "Noto Sans Vai", level: "hard" },
  { slug: "wancho", name: "Wancho", script: "Wancho", text: "𞋙𞋞𞋩𞋛𞋔", googleFontFamily: "Noto Sans Wancho", level: "hard" },
  { slug: "yi-nuosu", name: "Yi (Nuosu)", script: "Yi", text: "ꆈꌠꁱꂷ", googleFontFamily: "Noto Sans Yi", level: "hard" },
  { slug: "batak", name: "Batak", script: "Batak", text: "ᯘᯮᯒᯖ᯲ᯅᯖᯂ᯲", googleFontFamily: "Noto Sans Batak", level: "hard" },
  { slug: "baybayin", name: "Baybayin (Tagalog)", script: "Baybayin (Tagalog)", text: "ᜊᜌ᜔ᜊᜌᜒᜈ᜔", googleFontFamily: "Noto Sans Tagalog", level: "hard" },
  { slug: "ogham", name: "Ogham", script: "Ogham", text: "ᚋᚐᚊᚔ", googleFontFamily: "Noto Sans Ogham", level: "hard" },
  { slug: "elder-futhark", name: "Elder Futhark Runes", script: "Runic", text: "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ", googleFontFamily: "Noto Sans Runic", level: "hard" },
  { slug: "glagolitic", name: "Glagolitic", script: "Glagolitic", text: "ⰳⰾⰰⰳⱁⰾⰻⱌⰰ", googleFontFamily: "Noto Sans Glagolitic", level: "hard" },
  { slug: "gothic", name: "Gothic", script: "Gothic", text: "𐌼𐌰𐌽𐌽𐌰", googleFontFamily: "Noto Sans Gothic", level: "hard" },
  { slug: "old-italic-etruscan", name: "Old Italic (Etruscan)", script: "Old Italic", text: "𐌀𐌁𐌂𐌃𐌄𐌅𐌆𐌇", googleFontFamily: "Noto Sans Old Italic", level: "hard" },
  { slug: "osmanya", name: "Osmanya (Somali)", script: "Osmanya", text: "𐒋𐒘𐒈𐒑𐒛𐒒𐒕𐒖", googleFontFamily: "Noto Sans Osmanya", level: "hard" },
  { slug: "samaritan", name: "Samaritan", script: "Samaritan", text: "ࠔࠌࠓࠉࠌ", googleFontFamily: "Noto Sans Samaritan", level: "hard" },
  { slug: "avestan", name: "Avestan", script: "Avestan", text: "𐬀𐬵𐬎𐬭𐬀 𐬨𐬀𐬰𐬛𐬁", googleFontFamily: "Noto Sans Avestan", level: "hard" },
  { slug: "deseret", name: "Deseret", script: "Deseret", text: "𐐔𐐯𐑅𐐨𐑉𐐯𐐻", googleFontFamily: "Noto Sans Deseret", level: "hard" },
  { slug: "shavian", name: "Shavian", script: "Shavian", text: "𐑖𐑱𐑝𐑾𐑯", googleFontFamily: "Noto Sans Shavian", level: "hard" },
  { slug: "egyptian-hieroglyphs", name: "Ancient Egyptian", script: "Egyptian Hieroglyphs", text: "𓋹", googleFontFamily: "Noto Sans Egyptian Hieroglyphs", level: "impossible" },
  { slug: "cuneiform", name: "Cuneiform (Sumerian/Akkadian)", script: "Cuneiform", text: "𒀭", googleFontFamily: "Noto Sans Cuneiform", level: "impossible" },
  { slug: "old-persian-cuneiform", name: "Old Persian Cuneiform", script: "Old Persian", text: "𐏋", googleFontFamily: "Noto Sans Old Persian", level: "impossible" },
  { slug: "linear-b", name: "Linear B (Mycenaean Greek)", script: "Linear B", text: "𐀷𐀝𐀀𐀐𐀺", googleFontFamily: "Noto Sans Linear B", level: "impossible" },
  { slug: "phoenician", name: "Phoenician", script: "Phoenician", text: "𐤀𐤁𐤂𐤃", googleFontFamily: "Noto Sans Phoenician", level: "impossible" },
  { slug: "cypriot-syllabary", name: "Cypriot Syllabary", script: "Cypriot Syllabary", text: "𐠀𐠰𐠦𐠡𐠩", googleFontFamily: "Noto Sans Cypriot", level: "impossible" },
  { slug: "ugaritic", name: "Ugaritic", script: "Ugaritic", text: "𐎁𐎓𐎍", googleFontFamily: "Noto Sans Ugaritic", level: "impossible" },
  { slug: "old-hungarian", name: "Old Hungarian / Rovas", script: "Old Hungarian", text: "𐲢𐳛𐳮𐳀𐳤", googleFontFamily: "Noto Sans Old Hungarian", level: "impossible" },
  { slug: "kharoshthi", name: "Kharoshthi", script: "Kharoshthi", text: "𐨑𐨪𐨆𐨮𐨿𐨛𐨁𐨌", googleFontFamily: "Noto Sans Kharoshthi", level: "impossible" },
  { slug: "bassa-vah", name: "Bassa Vah", script: "Bassa Vah", text: "𖫔𖫧𖫴", googleFontFamily: "Noto Sans Bassa Vah", level: "impossible" },
  { slug: "osage", name: "Osage", script: "Osage", text: "𐓏𐓘𐓻𐓘𐓻𐓟", googleFontFamily: "Noto Sans Osage", level: "impossible" },
  { slug: "old-turkic-gokturk", name: "Old Turkic (Göktürk)", script: "Old Turkic", text: "𐰚𐰇𐰠𐱅𐰃𐰏𐰤", googleFontFamily: "Noto Sans Old Turkic", level: "impossible" },
  { slug: "lepcha", name: "Lepcha", script: "Lepcha", text: "ᰛᰩᰵᰛᰧᰵᰶ", googleFontFamily: "Noto Sans Lepcha", level: "impossible" },
  { slug: "limbu", name: "Limbu", script: "Limbu", text: "ᤕᤠᤰᤌᤢᤱ ᤐᤠᤴ", googleFontFamily: "Noto Sans Limbu", level: "impossible" },
  { slug: "meetei-mayek", name: "Meetei Mayek", script: "Meetei Mayek", text: "ꯃꯩꯇꯩ ꯃꯌꯦꯛ", googleFontFamily: "Noto Sans Meetei Mayek", level: "impossible" },
  { slug: "chakma", name: "Chakma", script: "Chakma", text: "𑄌𑄋𑄴𑄟𑄳𑄦", googleFontFamily: "Noto Sans Chakma", level: "impossible" },
  { slug: "sora-sompeng", name: "Sora Sompeng", script: "Sora Sompeng", text: "𑃐𑃦𑃝𑃗 𑃐𑃦𑃖𑃛𑃣𑃗", googleFontFamily: "Noto Sans Sora Sompeng", level: "impossible" },
  { slug: "warang-citi", name: "Warang Citi", script: "Warang Citi", text: "𑢹𑣗𑣁𑣜𑣊 𑣏𑣂𑣕𑣂", googleFontFamily: "Noto Sans Warang Citi", level: "impossible" },
];

export default LANGUAGES_E90;
