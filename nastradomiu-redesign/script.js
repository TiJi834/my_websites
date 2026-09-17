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

// ===== Toast helper (also covers "not yet implemented" cases) =====
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

// ===== Gallery: carousel + lightbox =====
const GALLERY_IMAGES = [
  '01','02','03','04','05','06','07','08','09','11','12','13','14',
  '15','16','17','18','19','20','21','22','23','24','25','26','27'
];
const track = document.getElementById('galleryTrack');
const viewport = document.getElementById('carouselViewport');
const dotsWrap = document.getElementById('carouselDots');
const indexLabel = document.getElementById('galleryIndex');
const totalLabel = document.getElementById('galleryTotal');
const prevBtn = document.getElementById('galleryPrev');
const nextBtn = document.getElementById('galleryNext');

let current = 0;
const dots = [];

GALLERY_IMAGES.forEach((n, i) => {
  const img = document.createElement('img');
  img.src = `assets/images/enhanced/nastradomiu-${n}.jpg`;
  img.alt = `Wnętrze restauracji Na Stradomiu — zdjęcie ${i + 1}`;
  img.loading = i === 0 ? 'eager' : 'lazy';
  track.appendChild(img);

  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Przejdź do zdjęcia ${i + 1}`);
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);
  dots.push(dot);
});
totalLabel.textContent = GALLERY_IMAGES.length;

function goTo(i) {
  current = (i + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, di) => d.classList.toggle('active', di === current));
  indexLabel.textContent = current + 1;
}
goTo(0);

prevBtn.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
nextBtn.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

viewport.addEventListener('click', () => {
  lightboxImg.src = track.children[current].src;
  lightboxImg.alt = track.children[current].alt;
  lightbox.classList.add('open');
});

// swipe support
let touchStartX = null;
viewport.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
viewport.addEventListener('touchend', e => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
  touchStartX = null;
  resetAutoplay();
});

// gentle autoplay, pauses on hover/focus and respects reduced motion
let autoplayTimer;
const reduceMotionGallery = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function startAutoplay() {
  if (reduceMotionGallery) return;
  autoplayTimer = setInterval(() => goTo(current + 1), 5000);
}
function resetAutoplay() { clearInterval(autoplayTimer); startAutoplay(); }
startAutoplay();
viewport.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
viewport.addEventListener('mouseleave', startAutoplay);

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowRight') { goTo(current + 1); lightboxImg.src = track.children[current].src; }
  if (e.key === 'ArrowLeft') { goTo(current - 1); lightboxImg.src = track.children[current].src; }
});

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `<button class="lightbox-close" aria-label="Zamknij">&times;</button><img src="" alt="">`;
document.body.appendChild(lightbox);
const lightboxImg = lightbox.querySelector('img');

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('open'); });

// ===== Contact form (no backend on this static preview — real deploy wires it to email/API) =====
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    formStatus.textContent = 'Uzupełnij wymagane pola (e-mail i wiadomość).';
    formStatus.style.color = '#B5482A';
    return;
  }
  formStatus.style.color = '';
  formStatus.textContent = 'Wiadomość wysłana. Odezwiemy się najszybciej jak to możliwe!';
  showToast('Dziękujemy! Wiadomość została wysłana.');
  form.reset();
});

// ===== GSAP: reveals + parallax =====
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    gsap.from('.hero-lede, .hero-actions, .eyebrow', { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.3 });
    gsap.from('.hero-photo', { opacity: 0, scale: 0.96, duration: 1.1, ease: 'power3.out', delay: 0.15 });

    const heroPhoto = document.querySelector('[data-parallax]');
    if (heroPhoto) {
      gsap.to(heroPhoto, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }

    gsap.utils.toArray('.gallery-track img').forEach((img, i) => {
      gsap.from(img, {
        opacity: 0, y: 24, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: img, start: 'left 95%', containerAnimation: undefined }
      });
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  }
} else {
  document.querySelectorAll('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
}

// ===== three.js: gentle rising "steam" particles behind hero =====
(function initSteam() {
  const canvas = document.getElementById('steamCanvas');
  if (!canvas || !window.THREE) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 900) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 10;

  function resize() {
    const w = canvas.clientWidth || canvas.parentElement.clientWidth;
    const h = canvas.clientHeight || canvas.parentElement.clientHeight;
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  const COUNT = 160;
  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    speeds[i] = 0.004 + Math.random() * 0.008;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xD9A441,
    size: 0.09,
    transparent: true,
    opacity: 0.4,
    depthWrite: false
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  resize();
  window.addEventListener('resize', resize);

  let raf;
  function animate() {
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += speeds[i];
      pos[i * 3] += Math.sin(pos[i * 3 + 1] * 0.5 + i) * 0.001;
      if (pos[i * 3 + 1] > 6) pos[i * 3 + 1] = -6;
    }
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  }
  animate();

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) { cancelAnimationFrame(raf); }
      else if (!raf) { animate(); }
    });
  }, { threshold: 0 });
  io.observe(canvas);
})();
