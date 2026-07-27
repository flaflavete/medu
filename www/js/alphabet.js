/* Medu — Latin → hieroglyph mapping for the keypad.
   Each Latin letter maps to the closest genuine Egyptian uniliteral
   (single-consonant sign). Egyptian wrote consonants, not vowels, and
   genuinely collapsed some sounds (C→k, O/U→w, V→f), so the output is an
   honest phonetic approximation — the way tourist cartouches are made —
   not an attested ancient spelling of the name. That caveat is shown in
   the UI so the product stays credible.

   Fields: glyph(s), Gardiner id, transliteration value, plain-English sign name. */
window.MEDU_ALPHABET = {
  a: [{ g: '𓄿', id: 'G1',  t: 'ꜣ', name: 'Egyptian vulture' }],
  b: [{ g: '𓃀', id: 'D58', t: 'b', name: 'foot' }],
  c: [{ g: '𓎡', id: 'V31', t: 'k', name: 'basket with handle' }],
  d: [{ g: '𓂧', id: 'D46', t: 'd', name: 'hand' }],
  e: [{ g: '𓇋', id: 'M17', t: 'ỉ', name: 'reed' }],
  f: [{ g: '𓆑', id: 'I9',  t: 'f', name: 'horned viper' }],
  g: [{ g: '𓎼', id: 'W11', t: 'g', name: 'jar stand' }],
  h: [{ g: '𓎛', id: 'V28', t: 'ḥ', name: 'twisted wick' }],
  i: [{ g: '𓇋', id: 'M17', t: 'ỉ', name: 'reed' }],
  j: [{ g: '𓆓', id: 'I10', t: 'ḏ', name: 'cobra' }],
  k: [{ g: '𓎡', id: 'V31', t: 'k', name: 'basket with handle' }],
  l: [{ g: '𓃭', id: 'E23', t: 'l', name: 'recumbent lion' }],
  m: [{ g: '𓅓', id: 'G17', t: 'm', name: 'owl' }],
  n: [{ g: '𓈖', id: 'N35', t: 'n', name: 'ripple of water' }],
  o: [{ g: '𓅱', id: 'G43', t: 'w', name: 'quail chick' }],
  p: [{ g: '𓊪', id: 'Q3',  t: 'p', name: 'stool' }],
  q: [{ g: '𓈎', id: 'N29', t: 'ḳ', name: 'hill slope' }],
  r: [{ g: '𓂋', id: 'D21', t: 'r', name: 'mouth' }],
  s: [{ g: '𓋴', id: 'S29', t: 's', name: 'folded cloth' }],
  t: [{ g: '𓏏', id: 'X1',  t: 't', name: 'bread loaf' }],
  u: [{ g: '𓅱', id: 'G43', t: 'w', name: 'quail chick' }],
  v: [{ g: '𓆑', id: 'I9',  t: 'f', name: 'horned viper' }],
  w: [{ g: '𓅱', id: 'G43', t: 'w', name: 'quail chick' }],
  x: [{ g: '𓎡', id: 'V31', t: 'k', name: 'basket with handle' },
      { g: '𓋴', id: 'S29', t: 's', name: 'folded cloth' }],
  y: [{ g: '𓇌', id: 'Z4',  t: 'y', name: 'double reed' }],
  z: [{ g: '𓊃', id: 'O34', t: 'z', name: 'door bolt' }],
};

/* Convert a name/word to an ordered array of sign objects.
   Non-letters (spaces, punctuation, digits) are ignored. */
window.meduTranslate = function (text) {
  var out = [];
  var s = (text || '').toLowerCase();
  for (var i = 0; i < s.length; i++) {
    var signs = window.MEDU_ALPHABET[s[i]];
    if (signs) { for (var j = 0; j < signs.length; j++) out.push(signs[j]); }
  }
  return out;
};
