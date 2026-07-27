/* Medu — bilingual (PT / EN) engine.
   The lesson content in data/licoes.js is already written in both languages;
   this module translates the app "chrome" (buttons, headings, toasts) and
   lets the user switch language. It stores the choice under 'medu-lang' and,
   on first run, defaults to Portuguese for Brazilian/Portuguese devices.

   Public API (window.MeduLang):
     get()          -> 'pt' | 'en'
     set(lang)      -> switch language, persist, re-render
     t(key)         -> translated chrome string for the current language
     pick({pt,en})  -> pick a value by current language (for dynamic strings)
     onChange(fn)   -> register a callback fired whenever the language changes
*/
(function () {
  'use strict';

  var KEY = 'medu-lang';
  var SUPPORTED = { pt: 1, en: 1 };

  function detect() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved && SUPPORTED[saved]) return saved;
    } catch (e) {}
    var navs = (navigator.languages && navigator.languages.length)
      ? navigator.languages : [navigator.language || 'en'];
    for (var i = 0; i < navs.length; i++) {
      var code = (navs[i] || '').slice(0, 2).toLowerCase();
      if (code === 'pt') return 'pt';
      if (SUPPORTED[code]) return code;
    }
    return 'en';
  }

  var lang = detect();
  var listeners = [];

  /* ---- chrome dictionary ---- */
  var DICT = {
    'doc.title': {
      en: 'Medu — Write your name in hieroglyphs & learn to read them',
      pt: 'Medu — Escreva seu nome em hieróglifos e aprenda a lê-los'
    },
    'brand.tag':   { en: 'words of the gods', pt: 'as palavras dos deuses' },

    'tab.type':    { en: 'Type',  pt: 'Escrever' },
    'tab.learn':   { en: 'Learn', pt: 'Aprender' },
    'tab.train':   { en: 'Train', pt: 'Treinar' },
    'tab.plus':    { en: 'Medu+', pt: 'Medu+' },

    'type.kicker': { en: 'Your name, 3,000 years ago', pt: 'Seu nome, há 3.000 anos' },
    'type.h1':     { en: 'Write your name in <em>hieroglyphs</em>.', pt: 'Escreva seu nome em <em>hieróglifos</em>.' },
    'type.lead':   {
      en: 'Type anything and watch it appear in real ancient Egyptian signs — the same script carved on temple walls along the Nile. Then save it, share it, or start learning to read.',
      pt: 'Digite qualquer coisa e veja aparecer em sinais egípcios de verdade — a mesma escrita gravada nas paredes dos templos às margens do Nilo. Depois é só salvar, compartilhar ou começar a aprender a ler.'
    },
    'type.ph':     { en: 'Type a name…', pt: 'Digite um nome…' },
    'type.stacked':{ en: 'Stacked',  pt: 'Empilhado' },
    'type.row':    { en: 'In a row', pt: 'Em linha' },
    'type.copy':   { en: '⧉ Copy',       pt: '⧉ Copiar' },
    'type.save':   { en: '↓ Save image', pt: '↓ Salvar imagem' },
    'type.share':  { en: '↗ Share',      pt: '↗ Compartilhar' },
    'type.honest': {
      en: '<strong>A phonetic approximation.</strong> Egyptian wrote consonants, not vowels, and some of our letters share one sign (C→K, O/U→W, V→F). So this spells your name by sound — the way souvenir cartouches do — not as an ancient scribe would have recorded it. Want the real rules? <a href="#learn" data-go="learn">Start the lessons →</a>',
      pt: '<strong>Uma aproximação fonética.</strong> O egípcio escrevia consoantes, não vogais, e algumas das nossas letras dividem o mesmo sinal (C→K, O/U→W, V→F). Então isto escreve seu nome pelo som — como fazem os cartuchos de souvenir — e não como um escriba antigo teria registrado. Quer as regras de verdade? <a href="#learn" data-go="learn">Começar as lições →</a>'
    },

    'feat.learn.h': { en: 'Learn', pt: 'Aprender' },
    'feat.learn.p': {
      en: 'Six short lessons: how the writing works, the 24 sounds, cartouches, and reading a real formula.',
      pt: 'Seis lições curtas: como a escrita funciona, os 24 sons, os cartuchos e a leitura de uma fórmula de verdade.'
    },
    'feat.train.h': { en: 'Train', pt: 'Treinar' },
    'feat.train.p': {
      en: 'Flip-card drills on the phonetic signs. Build a streak and make them stick.',
      pt: 'Cartões de revisão dos sinais fonéticos. Faça uma sequência e fixe de vez.'
    },
    'feat.plus.h':  { en: 'Medu+', pt: 'Medu+' },
    'feat.plus.p':  {
      en: 'Go further: the full sign dictionary, real texts, and more. <span class="plus-badge">Soon</span>',
      pt: 'Vá além: o dicionário completo de sinais, textos reais e muito mais. <span class="plus-badge">Em breve</span>'
    },

    'train.h2':   { en: 'Train the signs', pt: 'Treine os sinais' },
    'train.lead': {
      en: 'The 24 single-sound signs plus common two- and three-sound signs. Look at the sign, guess its sound, then flip to check.',
      pt: 'Os 24 sinais de um som mais os sinais comuns de dois e três sons. Olhe o sinal, adivinhe o som e vire para conferir.'
    },
    'train.lvl.uni':   { en: '1-sound', pt: '1 som' },
    'train.lvl.unibi': { en: 'Up to 2', pt: 'Até 2' },
    'train.lvl.all':   { en: 'All',     pt: 'Todos' },
    'train.streak': { en: 'Streak', pt: 'Sequência' },
    'train.best':   { en: 'Best',   pt: 'Recorde' },
    'train.seen':   { en: 'Seen',   pt: 'Vistos' },
    'train.reveal': { en: 'tap to reveal', pt: 'toque para revelar' },
    'train.flip':   { en: 'Flip ↺',  pt: 'Virar ↺' },
    'train.miss':   { en: '✗ Missed', pt: '✗ Errei' },
    'train.got':    { en: '✓ Got it', pt: '✓ Acertei' },

    'plus.badge': { en: 'Coming soon', pt: 'Em breve' },
    'plus.intro': {
      en: "You've written your name and learned the basics. Medu+ is where you go deeper — the full toolkit for reading real ancient Egyptian.",
      pt: 'Você já escreveu seu nome e aprendeu o básico. O Medu+ é onde você se aprofunda — o kit completo para ler o egípcio antigo de verdade.'
    },
    'plus.item.dict': {
      en: '<strong>The full sign dictionary</strong> — all ~900 Gardiner signs, searchable, with a free word builder.',
      pt: '<strong>O dicionário completo de sinais</strong> — todos os ~900 sinais de Gardiner, com busca e um construtor de palavras.'
    },
    'plus.item.cart': {
      en: '<strong>Royal cartouches</strong> — spell true Egyptian words and royal names, not just phonetic approximations.',
      pt: '<strong>Cartuchos reais</strong> — escreva palavras egípcias e nomes de reis de verdade, não só aproximações fonéticas.'
    },
    'plus.item.prog': {
      en: "<strong>Progress that travels</strong> — certificates and a collection to show what you've learned.",
      pt: '<strong>Progresso que fica</strong> — certificados e uma coleção para mostrar o que você aprendeu.'
    },
    'plus.cta': { en: '← Keep exploring for now', pt: '← Continuar explorando por enquanto' },
    'plus.foot': {
      en: 'Every lesson and sign in Medu is grounded in real Egyptology — the standard Gardiner sign list and attested Middle Egyptian vocabulary — so what you learn here is the real thing.',
      pt: 'Cada lição e cada sinal do Medu se baseia em egiptologia de verdade — a lista padrão de sinais de Gardiner e o vocabulário atestado do egípcio médio — então o que você aprende aqui é a coisa real.'
    },

    'foot.text': {
      en: '<strong>Medu</strong> — learn to read the words of the gods. Content and design © @corpasflavia. Hieroglyph font: <a href="https://fonts.google.com/noto/specimen/Noto+Sans+Egyptian+Hieroglyphs" target="_blank" rel="noopener">Noto Sans Egyptian Hieroglyphs</a>.',
      pt: '<strong>Medu</strong> — aprenda a ler as palavras dos deuses. Conteúdo e design © @corpasflavia. Fonte de hieróglifos: <a href="https://fonts.google.com/noto/specimen/Noto+Sans+Egyptian+Hieroglyphs" target="_blank" rel="noopener">Noto Sans Egyptian Hieroglyphs</a>.'
    },
    'lang.aria': { en: 'Language', pt: 'Idioma' },

    /* ---- Learn tab (rendered by learn.js) ---- */
    'learn.head': { en: 'Learn to read hieroglyphs', pt: 'Aprenda a ler hieróglifos' },
    'learn.lead': {
      en: 'Six short lessons, from how the writing works to reading a real offering formula. No prior knowledge needed.',
      pt: 'Seis lições curtas, de como a escrita funciona até ler uma fórmula de oferenda de verdade. Não é preciso conhecimento prévio.'
    },
    'learn.allLessons':  { en: '← All lessons', pt: '← Todas as lições' },
    'learn.comingSoon':  { en: 'Coming soon', pt: 'Em breve' },
    'learn.finish':      { en: 'Finish lesson ✓', pt: 'Concluir lição ✓' },
    'learn.next':        { en: 'Next question →', pt: 'Próxima pergunta →' },
    'learn.complete':    { en: 'Lesson complete ✓', pt: 'Lição concluída ✓' },
    'learn.markDone':    { en: 'Mark as complete ✓', pt: 'Marcar como concluída ✓' },

    /* ---- Type tab toasts / share (keypad.js) ---- */
    'kp.copied':   { en: 'Hieroglyphs copied ✓', pt: 'Hieróglifos copiados ✓' },
    'kp.saved':    { en: 'Saved your cartouche ✓', pt: 'Cartucho salvo ✓' },
    'kp.shareText':{ en: 'My name in hieroglyphs: ', pt: 'Meu nome em hieróglifos: ' },
    'kp.madeWith': { en: 'made with Medu', pt: 'feito com o Medu' },
    'kp.pasted':   { en: 'Copied — paste it anywhere ✓', pt: 'Copiado — cole onde quiser ✓' }
  };

  function t(key) {
    var e = DICT[key];
    if (!e) return key;
    return e[lang] != null ? e[lang] : (e.en != null ? e.en : key);
  }
  function pick(o) { return o ? (o[lang] != null ? o[lang] : o.en) : ''; }

  /* Apply chrome translations to the static DOM. */
  function applyStatic(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n'));
    });
    root.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
    });
    root.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    document.title = t('doc.title');
    document.documentElement.setAttribute('lang', lang);
  }

  function markSwitch() {
    document.querySelectorAll('#lang-switch [data-lang]').forEach(function (s) {
      s.setAttribute('aria-pressed', String(s.getAttribute('data-lang') === lang));
    });
  }

  function set(next) {
    if (!SUPPORTED[next] || next === lang) return;
    lang = next;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    applyStatic();
    markSwitch();
    listeners.forEach(function (fn) { try { fn(lang); } catch (e) {} });
    document.dispatchEvent(new CustomEvent('medu:lang', { detail: lang }));
  }

  window.MeduLang = {
    get: function () { return lang; },
    set: set,
    t: t,
    pick: pick,
    onChange: function (fn) { if (typeof fn === 'function') listeners.push(fn); }
  };

  document.addEventListener('DOMContentLoaded', function () {
    applyStatic();
    markSwitch();
    var sw = document.getElementById('lang-switch');
    if (sw) {
      sw.addEventListener('click', function (e) {
        var s = e.target.closest('[data-lang]');
        if (s) set(s.getAttribute('data-lang'));
        else set(lang === 'pt' ? 'en' : 'pt');
      });
    }
  });
})();
