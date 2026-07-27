// Tiles Up — small enhancements, no dependencies.
// Setup is idempotent and re-runs a few times after load so it also works
// on hosts that re-render the DOM once after the first paint.

(function () {
  // header shadow once the page scrolls
  window.addEventListener('scroll', function () {
    var header = document.querySelector('.site-header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  // mobile menu via delegation, so it survives DOM replacement
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest ? e.target.closest('#navToggle') : null;
    var nav = document.getElementById('siteNav');
    if (toggle && nav) {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }
    if (nav && nav.classList.contains('open') && e.target.closest && e.target.closest('#siteNav a')) {
      nav.classList.remove('open');
      var btn = document.getElementById('navToggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });

  var io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  }

  function setup() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      if (el.classList.contains('in') || el.dataset.revealBound) return;
      el.dataset.revealBound = '1';
      if (io) {
        io.observe(el);
      } else {
        el.classList.add('in');
      }
    });

    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  setup();
  document.addEventListener('DOMContentLoaded', setup);
  window.addEventListener('load', function () {
    setup();
    // one more pass after any post-load client re-render settles
    setTimeout(setup, 1200);
    setTimeout(setup, 3000);
  });
})();
