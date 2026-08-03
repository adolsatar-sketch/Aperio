(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- entrance ---------- */
  document.documentElement.classList.add('js');
  requestAnimationFrame(() => document.body.classList.add('is-ready'));

  /* ---------- nav shrink on scroll ---------- */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- active nav link ---------- */
  const page = document.body.getAttribute('data-page');
  if (page) {
    document.querySelectorAll(`a[data-nav="${page}"]`).forEach(a => a.classList.add('active'));
  }

  /* ---------- mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    const closeMenu = () => {
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };
    menuToggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- reveal on scroll ---------- */
  const targets = document.querySelectorAll('.reveal');
  if (reduced) {
    targets.forEach(t => t.classList.add('in'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    targets.forEach(t => io.observe(t));
  } else {
    targets.forEach(t => t.classList.add('in'));
  }

  document.querySelectorAll('.reveal-stagger').forEach(group => {
    Array.from(group.children).forEach((child, i) => child.style.setProperty('--stagger-i', i));
  });

  /* ---------- hero mark entrance + cursor-follow focus dot ---------- */
  const stage = document.getElementById('markStage');
  const dot = document.getElementById('focusDot');
  if (stage) {
    requestAnimationFrame(() => stage.classList.add('in'));
  }
  if (stage && dot && !reduced && window.matchMedia('(pointer: fine)').matches) {
    let raf = null;
    stage.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();
      const cx = r.width / 2, cy = r.height / 2;
      const dx = (e.clientX - r.left - cx) / cx;
      const dy = (e.clientY - r.top - cy) / cy;
      const range = 3.2;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        dot.style.left = (59.5 + dx * range) + '%';
        dot.style.top = (50 + dy * range) + '%';
      });
    });
    stage.addEventListener('mouseleave', () => {
      dot.style.left = '59.5%';
      dot.style.top = '50%';
    });
  }

  /* ---------- portfolio filter ---------- */
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    const chips = filterBar.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.case-card');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.getAttribute('data-filter');
        cards.forEach(card => {
          const match = filter === 'all' || card.getAttribute('data-category') === filter;
          card.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- elegant page transitions (cross-fade, per brand motion spec) ---------- */
  if (!reduced) {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (link.target && link.target !== '' && link.target !== '_self') return;
      if (link.hasAttribute('download')) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      let url;
      try { url = new URL(href, window.location.href); } catch (err) { return; }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;

      e.preventDefault();
      document.body.classList.remove('is-ready');
      document.body.classList.add('is-leaving');
      window.setTimeout(() => { window.location.href = url.href; }, 380);
    });
  }

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      document.body.classList.remove('is-leaving');
      document.body.classList.add('is-ready');
    }
  });
})();
