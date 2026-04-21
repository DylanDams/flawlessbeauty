document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     Custom Cursor (desktop only)
     ============================================================ */
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    document.addEventListener('mouseleave', () => ring.classList.add('is-hidden'));
    document.addEventListener('mouseenter', () => ring.classList.remove('is-hidden'));

    const hoverSel = 'a, button, .treatment-title, .sg-dot, .contact-button, .hamburger-menu';
    document.querySelectorAll(hoverSel).forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('is-hovering'));
    });

    (function followRing() {
      ringX += (mouseX - ringX) * 0.11;
      ringY += (mouseY - ringY) * 0.11;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(followRing);
    })();
  }

  /* ============================================================
     Scroll Reveal
     ============================================================ */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10 });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ============================================================
     Scroll Parallax on [data-parallax] images
     ============================================================ */
  const parallaxEls = document.querySelectorAll('[data-parallax]');

  if (parallaxEls.length && !window.matchMedia('(max-width: 640px)').matches) {
    let ticking = false;
    const strengthFor = el => parseFloat(el.dataset.parallax) || 0.15;
    parallaxEls.forEach(el => { el.style.transition = 'none'; el.style.willChange = 'transform'; });

    function updateParallax() {
      const vh = window.innerHeight;
      parallaxEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const mid = rect.top + rect.height / 2;
        const offset = (mid - vh / 2) * strengthFor(el) * -1;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.12)`;
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  /* ============================================================
     Scroll Indicator fade-out
     ============================================================ */
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', function hide() {
      if (window.scrollY > 80) {
        scrollIndicator.style.opacity = '0';
        window.removeEventListener('scroll', hide);
      }
    }, { passive: true });
  }


});
