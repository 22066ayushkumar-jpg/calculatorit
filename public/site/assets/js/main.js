/* CalculateIt — small vanilla JS layer
   - Mobile nav toggle
   - Current year in footer
   - Contact form: mailto fallback + light validation
   - Hub page search filter
*/
(function () {
  'use strict';

  // ---- Mobile nav --------------------------------------------------
  const toggle = document.querySelector('[data-nav-toggle]');
  const panel = document.querySelector('[data-nav-mobile]');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      const open = panel.getAttribute('data-open') === 'true';
      panel.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }

  // ---- Current year -----------------------------------------------
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // ---- Mark current page nav link ---------------------------------
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav] a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === here) a.setAttribute('aria-current', 'page');
  });

  // ---- Contact form (mailto fallback) -----------------------------
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const msg = form.querySelector('#message').value.trim();
      const status = form.querySelector('[data-form-status]');

      if (!name || !email || !msg) {
        status.textContent = 'Please fill in every field before sending.';
        status.style.color = 'var(--burnt-sienna)';
        return;
      }
      const subject = encodeURIComponent('CalculateIt enquiry from ' + name);
      const body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:ashusuyavanshi@gmail.com?subject=' + subject + '&body=' + body;
      status.textContent = 'Opening your email client…';
      status.style.color = 'var(--moss)';
    });
  }

  // ---- Hub search filter ------------------------------------------
  const search = document.querySelector('[data-hub-search]');
  if (search) {
    const cards = document.querySelectorAll('[data-state-card]');
    search.addEventListener('input', function () {
      const q = search.value.trim().toLowerCase();
      cards.forEach(function (c) {
        const name = (c.getAttribute('data-name') || '').toLowerCase();
        c.style.display = !q || name.includes(q) ? '' : 'none';
      });
    });
  }
})();
