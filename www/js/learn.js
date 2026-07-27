/* Medu — Learn tab. Renders the lesson data (window.CURSO_LICOES) in
   English, with a light progress track. */
(function () {
  'use strict';

  var L = 'en';
  var gard = {}; // id -> row  (from GARDINER_DATA_EN)

  function t(o) { return o ? (o[L] != null ? o[L] : o) : ''; }
  function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function buildGard() {
    (window.GARDINER_DATA_EN || []).forEach(function (r) { gard[r[0]] = r; });
  }

  /* ---- progress ---- */
  function done() { return (window.Medu.load().lessons) || {}; }
  function markDone(id) {
    var p = window.Medu.load(); p.lessons = p.lessons || {}; p.lessons[id] = true; window.Medu.save(p);
  }

  /* ---- block renderers ---- */
  function block(b) {
    switch (b.kind) {
      case 'p':       return '<p>' + t(b.html) + '</p>';
      case 'callout': return '<div class="callout ' + (b.variant === 'azul' ? 'azul' : 'gold') + '">' + t(b.html) + '</div>';
      case 'signtypes':
        return '<div class="signtypes">' + b.cards.map(function (c) {
          return '<div class="st"><div class="stg">' + c.glyph + '</div><h4>' + t(c.title) + '</h4><p>' + t(c.desc) + '</p></div>';
        }).join('') + '</div>';
      case 'siggrid':
        return '<div class="siggrid">' + b.ids.map(function (id) {
          var r = gard[id]; if (!r) return '';
          var tip = (r[2] ? r[2] + ' · ' : '') + esc(r[3]) + ' (' + id + ')';
          return '<div class="sg" title="' + tip + '"><span class="sgg">' + r[1] + '</span><span class="sgp">' + (r[2] || id) + '</span></div>';
        }).join('') + '</div>';
      case 'word':
        var signs = b.signs.map(function (s) {
          var tip = t(s.tip) || (s.phon + ' — ' + s.id);
          return '<span data-tip="' + esc(tip) + '" title="' + esc(tip) + '">' + s.glyph + '</span>';
        }).join('');
        return '<div class="word-demo">' +
          (b.label ? '<div class="wlabel">' + t(b.label) + '</div>' : '') +
          '<div class="wsigns">' + signs + '</div>' +
          (b.result ? '<div class="wresult">= ' + b.result + '</div>' : '') +
          (b.note ? '<div class="wnote">' + t(b.note) + '</div>' : '') + '</div>';
      case 'direction':
        return '<div class="direction-rows">' + b.rows.map(function (r) {
          return '<div class="dr' + (r.rtl ? ' rtl' : '') + '"><span class="dg">' + r.glyphs + '</span><span class="dl">' + t(r.label) + '</span></div>';
        }).join('') + '</div>';
      case 'foto':
        // shared data points at ../assets/photos/…; use the bundled copy
        var fsrc = (b.src || '').replace('../assets/photos/', 'photos/');
        return '<figure class="les-foto"><img src="' + fsrc + '" alt="' + esc(t(b.alt)) + '" loading="lazy">' +
          '<figcaption>' + t(b.caption) + (b.credit ? ' <span class="credit">' + t(b.credit) + '</span>' : '') + '</figcaption></figure>';
      case 'builder':
        // shown here as a worked-example showcase
        var ch = (b.challenges || []).map(function (c) {
          var g = (c.answer || []).map(function (id) { return gard[id] ? gard[id][1] : ''; }).join('');
          return '<div class="word-demo"><div class="wlabel">' + esc(t(c.meaning)) + ' · <i>' + esc(c.translit) + '</i></div><div class="wsigns">' + g + '</div></div>';
        }).join('');
        return ch;
      default: return '';
    }
  }

  function section(sec) {
    return '<div class="les-section"><h3>' + t(sec.title) + '</h3>' +
      sec.blocks.map(block).join('') + '</div>';
  }

  /* ---- quiz ---- */
  function quiz(les, mount) {
    var qs = Array.isArray(les.quiz) ? les.quiz : (les.quiz ? [les.quiz] : []);
    if (!qs.length) { finishBtn(les, mount); return; }
    var i = 0;
    function draw() {
      var q = qs[i];
      var opts = q.options.map(function (o, k) {
        return '<button data-k="' + k + '" data-ok="' + (o.correct ? 1 : 0) + '">' + t(o.label) + '</button>';
      }).join('');
      mount.innerHTML =
        '<div class="quiz"><div class="qg">' + (q.glyph || '𓋴𓈎𓂋') + '</div>' +
        '<div class="qq">Question ' + (i + 1) + ' / ' + qs.length + '<br>' + t(q.question) + '</div>' +
        '<div class="qopts">' + opts + '</div>' +
        '<div class="qfb"></div>' +
        '<div class="qnav"></div></div>';
      var opEl = mount.querySelector('.qopts');
      var fb = mount.querySelector('.qfb');
      var nav = mount.querySelector('.qnav');
      opEl.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b || opEl.dataset.locked) return;
        opEl.dataset.locked = '1';
        var ok = b.dataset.ok === '1';
        opEl.querySelectorAll('button').forEach(function (x) {
          if (x.dataset.ok === '1') x.classList.add('correct');
          else if (x === b) x.classList.add('wrong');
        });
        fb.className = 'qfb ' + (ok ? 'ok' : 'err');
        fb.innerHTML = ok ? t(q.feedbackOk) : t(q.feedbackErr);
        var last = i === qs.length - 1;
        nav.innerHTML = '<button class="btn btn-primary" data-next>' + (last ? 'Finish lesson ✓' : 'Next question →') + '</button>';
        nav.querySelector('[data-next]').addEventListener('click', function () {
          if (last) { markDone(les.id); window.Medu.toast('Lesson complete ✓'); openList(); }
          else { i++; draw(); }
        });
      });
    }
    draw();
  }

  function finishBtn(les, mount) {
    mount.innerHTML = '<div class="quiz"><div class="qnav"><button class="btn btn-primary" data-fin>Mark as complete ✓</button></div></div>';
    mount.querySelector('[data-fin]').addEventListener('click', function () {
      markDone(les.id); window.Medu.toast('Lesson complete ✓'); openList();
    });
  }

  /* ---- lesson reader ---- */
  function openLesson(les) {
    var root = document.getElementById('learn-root');
    root.innerHTML =
      '<div class="reader-head"><button class="back" data-list>← All lessons</button></div>' +
      '<div class="reader-hero"><div class="rg">' + les.glyph + '</div>' +
      '<div class="kicker">' + t(les.kicker) + '</div>' +
      '<h2>' + t(les.title) + '</h2>' +
      '<p class="intro">' + t(les.intro || les.desc) + '</p></div>' +
      (les.sections || []).map(section).join('') +
      '<div id="quiz-mount"></div>';
    root.querySelector('[data-list]').addEventListener('click', openList);
    quiz(les, document.getElementById('quiz-mount'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---- lesson list ---- */
  function openList() {
    var root = document.getElementById('learn-root');
    var lessons = window.CURSO_LICOES || [];
    var d = done();
    var completed = lessons.filter(function (l) { return d[l.id]; }).length;
    var pct = lessons.length ? Math.round(completed / lessons.length * 100) : 0;

    var trail = lessons.map(function (les) {
      var isDone = !!d[les.id];
      var locked = les.ready === false;
      return '<div class="lesson' + (isDone ? ' done' : '') + '"' +
        (locked ? ' aria-disabled="true"' : ' data-open="' + les.id + '"') + '>' +
        '<div class="lnum">' + (isDone ? '✓' : les.glyph) + '</div>' +
        '<div class="lbody"><div class="lkicker">' + t(les.kicker) + '</div>' +
        '<h3>' + t(les.title) + '</h3><p>' + t(les.desc) + '</p>' +
        '<div class="lmeta">' + t(les.type) + ' · ' + t(les.dur) + (locked ? ' · Coming soon' : '') + '</div></div>' +
        (isDone ? '<div class="lcheck">𓋹</div>' : '') + '</div>';
    }).join('');

    root.innerHTML =
      '<div class="section-head"><h2>Learn to read hieroglyphs</h2></div>' +
      '<p class="lead">Six short lessons, from how the writing works to reading a real offering formula. No prior knowledge needed.</p>' +
      '<div class="progress-bar"><span style="width:' + pct + '%"></span></div>' +
      '<div class="progress-label">' + completed + ' of ' + lessons.length + ' lessons complete</div>' +
      '<div class="trail">' + trail + '</div>';

    root.querySelectorAll('[data-open]').forEach(function (el) {
      el.addEventListener('click', function () {
        var les = lessons.find(function (x) { return x.id === el.dataset.open; });
        if (les) openLesson(les);
      });
    });
  }

  window.meduLearnInit = function () {
    if (!document.getElementById('learn-root')) return;
    buildGard();
    openList();
  };
})();
