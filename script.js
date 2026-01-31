(function () {
  'use strict';

  // Set footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll-triggered animations
  var animated = new Set();
  var observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 };

  function observeElements() {
    var elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (animated.has(el)) return;
        animated.add(el);
        el.classList.add('animated');
      });
    }, observerOptions);

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Hero: animate on load (no need to scroll)
  function initHeroAnimations() {
    var hero = document.getElementById('hero');
    if (!hero) return;
    var labels = hero.querySelectorAll('[data-animate]');
    var delay = 100;
    labels.forEach(function (el) {
      setTimeout(function () {
        el.classList.add('animated');
      }, delay);
      delay += 120;
    });
  }

  // Calendly placeholder: replace href when you have the link
  function initCalendly() {
    var link = document.getElementById('calendly-link');
    if (!link) return;
    // When you have your Calendly URL, set it here or in HTML:
    // link.href = 'https://calendly.com/your-link';
    link.addEventListener('click', function (e) {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
        // Optional: open a placeholder message or modal
        return;
      }
    });
  }

  // Mobile menu toggle
  function initMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('.nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
      document.body.classList.toggle('menu-open', nav.classList.contains('open'));
    });
  }

  // FAQ accordion
  function initFaq() {
    var items = document.querySelectorAll('.faq-item[data-faq]');
    items.forEach(function (item) {
      var btn = item.querySelector('.faq-question');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        items.forEach(function (other) {
          other.classList.remove('is-open');
          other.querySelector('.faq-question') && other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // Lucide icons (run after DOM + Lucide script loaded)
  function initIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  initHeroAnimations();
  observeElements();
  initCalendly();
  initMenu();
  initFaq();
  initIcons();
})();
