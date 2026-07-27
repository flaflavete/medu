/* Medu — the hieroglyph keypad (flagship tool).
   Type any name or word → see it in genuine uniliteral signs, inside a
   cartouche. Copy, download as PNG, or share. */
(function () {
  'use strict';

  var els = {};
  var state = { signs: [], layout: 'vertical' }; // vertical | horizontal

  function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  function render() {
    var line = els.line;
    if (!state.signs.length) {
      line.innerHTML = '<span class="output-placeholder">𓂋 𓈖 𓅱</span>';
      els.translit.textContent = '';
      els.copyBtn.disabled = els.pngBtn.disabled = els.shareBtn.disabled = true;
      return;
    }
    els.copyBtn.disabled = els.pngBtn.disabled = els.shareBtn.disabled = false;
    line.innerHTML = state.signs.map(function (s) {
      var tip = s.t + ' · ' + esc(s.name) + ' (' + s.id + ')';
      return '<span class="gsign" data-tip="' + tip + '">' + s.g + '</span>';
    }).join('');
    els.translit.textContent = state.signs.map(function (s) { return s.t; }).join('');
    els.cart.classList.toggle('horizontal', state.layout === 'horizontal');
  }

  function update() {
    state.signs = window.meduTranslate(els.input.value);
    render();
  }

  function glyphString() { return state.signs.map(function (s) { return s.g; }).join(''); }

  function ui(key) { return window.MeduLang ? window.MeduLang.t(key) : key; }

  function copy() {
    var txt = glyphString();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(txt).then(function () { window.Medu.toast(ui('kp.copied')); });
    } else {
      var ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta);
      ta.select(); document.execCommand('copy'); ta.remove(); window.Medu.toast(ui('kp.copied'));
    }
  }

  /* Render the cartouche to a PNG on a canvas and trigger download. */
  function downloadPNG() {
    var name = (els.input.value.trim() || 'medu').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    var horizontal = state.layout === 'horizontal';
    var glyphs = state.signs.map(function (s) { return s.g; });

    var scale = 2; // retina
    var pad = 60, gsize = 96, gap = 10;
    var W, H, positions = [];
    if (horizontal) {
      W = pad * 2 + glyphs.length * gsize + (glyphs.length - 1) * gap;
      H = pad * 2 + gsize;
      glyphs.forEach(function (_, i) { positions.push([pad + i * (gsize + gap) + gsize / 2, H / 2]); });
    } else {
      W = pad * 2 + gsize;
      H = pad * 2 + glyphs.length * gsize + (glyphs.length - 1) * gap;
      glyphs.forEach(function (_, i) { positions.push([W / 2, pad + i * (gsize + gap) + gsize / 2]); });
    }

    var cv = document.createElement('canvas');
    cv.width = W * scale; cv.height = H * scale;
    var ctx = cv.getContext('2d');
    ctx.scale(scale, scale);

    function paint() {
      // papyrus background
      ctx.fillStyle = '#FBF3E2'; ctx.fillRect(0, 0, W, H);
      // cartouche outline (rounded)
      var r = Math.min(W, H) / 2 - 8;
      ctx.strokeStyle = '#2C5F63'; ctx.lineWidth = 8; ctx.fillStyle = '#FFFDF7';
      roundRect(ctx, 12, 12, W - 24, H - 24, Math.min((W - 24), (H - 24)) / 2 > 44 ? 44 : (Math.min(W - 24, H - 24) / 2));
      ctx.fill(); ctx.stroke();
      // glyphs
      ctx.fillStyle = '#3B2A1A';
      ctx.font = gsize + 'px "NotoGlyph","Noto Sans Egyptian Hieroglyphs",serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      glyphs.forEach(function (g, i) { ctx.fillText(g, positions[i][0], positions[i][1]); });
      // signature
      ctx.fillStyle = '#6A5540'; ctx.font = '16px Nunito,sans-serif';
      ctx.textAlign = 'right'; ctx.fillText(ui('kp.madeWith'), W - 16, H - 14);

      var url = cv.toDataURL('image/png');
      var a = document.createElement('a'); a.href = url; a.download = 'medu-' + name + '.png';
      document.body.appendChild(a); a.click(); a.remove();
      window.Medu.toast(ui('kp.saved'));
    }

    if (document.fonts && document.fonts.load) {
      document.fonts.load(gsize + 'px "NotoGlyph"').then(paint, paint);
    } else { paint(); }
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function share() {
    var txt = ui('kp.shareText') + glyphString() + ' — ' + ui('kp.madeWith');
    if (navigator.share) {
      navigator.share({ title: 'Medu', text: txt }).catch(function () {});
    } else { copy(); window.Medu.toast(ui('kp.pasted')); }
  }

  function buildKeys() {
    var order = 'abcdefghijklmnopqrstuvwxyz'.split('');
    els.keys.innerHTML = order.map(function (c) {
      var s = window.MEDU_ALPHABET[c][0];
      return '<button data-char="' + c + '" title="' + s.t + ' · ' + esc(s.name) + '">' +
        '<span class="k-glyph">' + s.g + '</span><span class="k-letter">' + c.toUpperCase() + '</span></button>';
    }).join('');
    els.keys.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-char]'); if (!b) return;
      els.input.value += b.dataset.char; update(); els.input.focus();
    });
  }

  window.meduKeypadInit = function () {
    els.input   = document.getElementById('kp-input');
    els.line    = document.getElementById('kp-line');
    els.cart    = document.getElementById('kp-cartouche');
    els.translit= document.getElementById('kp-translit');
    els.copyBtn = document.getElementById('kp-copy');
    els.pngBtn  = document.getElementById('kp-png');
    els.shareBtn= document.getElementById('kp-share');
    els.keys    = document.getElementById('kp-keys');
    if (!els.input) return;

    els.input.addEventListener('input', update);
    els.copyBtn.addEventListener('click', copy);
    els.pngBtn.addEventListener('click', downloadPNG);
    els.shareBtn.addEventListener('click', share);

    document.querySelectorAll('#kp-layout button').forEach(function (b) {
      b.addEventListener('click', function () {
        state.layout = b.dataset.layout;
        document.querySelectorAll('#kp-layout button').forEach(function (x) {
          x.setAttribute('aria-pressed', String(x === b));
        });
        render();
      });
    });

    buildKeys();
    update();
  };
})();
