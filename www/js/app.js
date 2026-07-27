/* Medu — app shell: tab routing, toast, and boot.
   English-only product (the commercial angle). Progress in localStorage
   under the 'medu-' namespace. */
(function () {
  'use strict';

  var STORE = 'medu-progress';
  window.Medu = {
    load: function () { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; } },
    save: function (o) { try { localStorage.setItem(STORE, JSON.stringify(o)); } catch (e) {} },
    toast: function (msg) {
      var t = document.getElementById('toast');
      t.textContent = msg; t.classList.add('show');
      clearTimeout(window.__meduToast);
      window.__meduToast = setTimeout(function () { t.classList.remove('show'); }, 2200);
    },
  };

  function showTab(name) {
    document.querySelectorAll('.tabpane').forEach(function (p) {
      p.classList.toggle('active', p.dataset.tab === name);
    });
    document.querySelectorAll('nav.tabs button').forEach(function (b) {
      b.setAttribute('aria-selected', String(b.dataset.go === name));
    });
    if (location.hash !== '#' + name) history.replaceState(null, '', '#' + name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // let panes react (e.g. Learn refreshes progress)
    document.dispatchEvent(new CustomEvent('medu:tab', { detail: name }));
  }
  window.meduGoTab = showTab;

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-go]');
    if (b) { e.preventDefault(); showTab(b.dataset.go); }
  });

  document.addEventListener('DOMContentLoaded', function () {
    var initial = (location.hash || '#type').slice(1);
    if (!document.querySelector('.tabpane[data-tab="' + initial + '"]')) initial = 'type';
    showTab(initial);
    if (window.meduKeypadInit) window.meduKeypadInit();
    if (window.meduLearnInit) window.meduLearnInit();
    if (window.meduTrainInit) window.meduTrainInit();
  });
})();
