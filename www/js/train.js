/* Medu — Train tab. Flip-flashcards drawn from the Gardiner phonograms
   (window.GARDINER_DATA_EN). Front: the sign. Back: its sound, name and id.
   Self-graded ("Got it" / "Missed") with a session streak. */
(function () {
  'use strict';

  var ALPHA = ['ꜣ','ỉ','y','ꜥ','w','b','p','f','m','n','r','h','ḥ','ḫ','ẖ','s','š','ḳ','k','g','t','ṯ','d','ḏ'];
  var ASET = {}; ALPHA.forEach(function (c) { ASET[c] = 1; });

  var st = { level: 'uni', pool: [], card: null, flipped: false, hits: 0, seen: 0, streak: 0, best: 0 };

  function spellable(p) { for (var i = 0; i < p.length; i++) if (!ASET[p[i]]) return false; return true; }

  function fullPool() {
    return (window.GARDINER_DATA_EN || []).filter(function (r) {
      var phon = r[2];
      return r[4] && r[4].indexOf('P') >= 0 && phon && phon.indexOf('|') < 0 && spellable(phon);
    });
  }
  function levelPool() {
    var p = fullPool();
    if (st.level === 'uni')   return p.filter(function (r) { return r[2].length === 1; });
    if (st.level === 'unibi') return p.filter(function (r) { return r[2].length <= 2; });
    return p.filter(function (r) { return r[2].length <= 3; });
  }

  function next() {
    if (!st.pool.length) st.pool = levelPool().slice();
    if (!st.pool.length) return;
    var i = Math.floor(Math.random() * st.pool.length);
    st.card = st.pool.splice(i, 1)[0];
    st.flipped = false;
    draw();
  }

  function draw() {
    var r = st.card; if (!r) return;
    document.getElementById('fc-front-g').textContent = r[1];
    document.getElementById('fc-phon').textContent = r[2];
    document.getElementById('fc-name').textContent = r[3];
    document.getElementById('fc-id').textContent = 'Gardiner ' + r[0];
    document.getElementById('flashcard').classList.toggle('flipped', st.flipped);
    document.getElementById('fc-hint').style.visibility = st.flipped ? 'hidden' : 'visible';
    document.getElementById('fc-grade').style.display = st.flipped ? 'flex' : 'none';
    document.getElementById('fc-flipbtn').style.display = st.flipped ? 'none' : 'inline-flex';
    scores();
  }

  function scores() {
    document.getElementById('sc-streak').textContent = st.streak;
    document.getElementById('sc-best').textContent = st.best;
    document.getElementById('sc-seen').textContent = st.seen;
  }

  function grade(ok) {
    st.seen++;
    if (ok) { st.hits++; st.streak++; if (st.streak > st.best) st.best = st.streak; }
    else { st.streak = 0; }
    next();
  }

  window.meduTrainInit = function () {
    var stage = document.getElementById('flashcard'); if (!stage) return;

    stage.addEventListener('click', function () { st.flipped = !st.flipped; draw(); });
    document.getElementById('fc-flipbtn').addEventListener('click', function (e) {
      e.stopPropagation(); st.flipped = true; draw();
    });
    document.getElementById('fc-got').addEventListener('click', function (e) { e.stopPropagation(); grade(true); });
    document.getElementById('fc-miss').addEventListener('click', function (e) { e.stopPropagation(); grade(false); });

    document.querySelectorAll('#train-level button').forEach(function (b) {
      b.addEventListener('click', function () {
        st.level = b.dataset.level; st.pool = []; st.streak = 0; st.seen = 0; st.hits = 0; st.best = 0;
        document.querySelectorAll('#train-level button').forEach(function (x) {
          x.setAttribute('aria-pressed', String(x === b));
        });
        next();
      });
    });

    next();
  };
})();
