// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav =====
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
navToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', false);
}));

// ===== Toast helper =====
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

// ===== Contact form (static preview — real deploy wires it to email/API) =====
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      formStatus.textContent = 'Uzupełnij wymagane pola (kontakt i wiadomość).';
      formStatus.style.color = '#FF6A1A';
      return;
    }
    formStatus.style.color = '';
    formStatus.textContent = 'Wiadomość wysłana. Oddzwonimy lub odpiszemy najszybciej jak to możliwe!';
    showToast('Dziękujemy! Wiadomość została wysłana.');
    form.reset();
  });
}

// ===== GSAP: reveals + hero line-art draw =====
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  if (!reduceMotion) {
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, ease: 'power3.out', delay: 0.1 });
    gsap.from('.hero-lede, .hero-actions, .eyebrow, .hero-badges', { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.3 });

    gsap.utils.toArray('.trust-num').forEach(el => {
      const target = el.textContent.trim();
      const m = target.match(/^(\D*)(\d+)(.*)$/);
      if (m) {
        const prefix = m[1];
        const num = parseInt(m[2], 10);
        const suffix = m[3];
        gsap.to({ val: 0 }, {
          val: num,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: function () { el.textContent = prefix + Math.round(this.targets()[0].val) + suffix; }
        });
      }
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  }
} else {
  document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
}

// ===== Hero video: plays once on page load =====
(function initHeroVideoAutoplay() {
  const video = document.getElementById('heroVideo');
  if (!video) return;
  video.loop = false;

  const tryPlay = () => video.play().catch(() => {});
  tryPlay();

  const events = ['scroll', 'click', 'touchstart', 'keydown'];
  function playOnFirstInteraction() {
    if (video.paused) tryPlay();
    events.forEach(e => window.removeEventListener(e, playOnFirstInteraction));
  }
  events.forEach(e => window.addEventListener(e, playOnFirstInteraction, { once: true, passive: true }));
})();

// ===== Hero line-art: car silhouette draws itself on load, subtle drift on scroll =====
(function initLineArt() {
  const path = document.getElementById('carPath');
  if (!path || reduceMotion) return;

  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  if (window.gsap) {
    gsap.to(path, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', delay: 0.3 });
    if (window.ScrollTrigger) {
      gsap.to('#lineArt', {
        yPercent: -12,
        xPercent: 4,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }
  } else {
    path.style.transition = 'stroke-dashoffset 2s ease';
    requestAnimationFrame(() => { path.style.strokeDashoffset = 0; });
  }
})();
