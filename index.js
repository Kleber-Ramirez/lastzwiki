// ===========================
// CARRUSEL PRINCIPAL
// ===========================

const carrusel      = document.querySelector('.carrusel-container');
const btnPrev       = document.querySelector('.carrusel-prev');
const btnNext       = document.querySelector('.carrusel-next');
const dotsContainer = document.getElementById('carruselDots');

let items         = document.querySelectorAll('.carrusel-item');
let index         = 0;
let originalCount = 0;
let autoPlay;
let userPaused    = false;
let resumeTimer;

// Touch tracking
let touchStartX   = 0;
const SWIPE_THRESHOLD = 50;

function getVisibleItems() {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  return 3;
}

// ── Setup ────────────────────────────────────────────
function setupCarrusel() {
  document.querySelectorAll('.carrusel-item.clone').forEach(c => c.remove());

  items         = document.querySelectorAll('.carrusel-item');
  originalCount = items.length;
  const vis     = getVisibleItems();

  for (let i = 0; i < vis; i++) {
    const clone = items[i].cloneNode(true);
    clone.classList.add('clone');
    carrusel.appendChild(clone);
  }

  index = 0;
  carrusel.style.transition = 'none';
  carrusel.style.transform  = 'translateX(0)';

  document.querySelectorAll('.carrusel-item').forEach(item => {
    item.style.flex = `0 0 ${100 / vis}%`;
  });

  buildDots();
  updateDots();
}

// ── Dots ─────────────────────────────────────────────
function buildDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  for (let i = 0; i < originalCount; i++) {
    const dot = document.createElement('button');
    dot.className = 'carrusel-dot';
    dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
    dot.addEventListener('click', () => { goToSlide(i); onUserInteraction(); });
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll('.carrusel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === (index % originalCount));
  });
}

// ── Ir a slide específico ────────────────────────────
function goToSlide(i) {
  const vis = getVisibleItems();
  index = Math.max(0, Math.min(i, originalCount - 1));
  carrusel.style.transition = 'transform 0.5s ease';
  carrusel.style.transform  = `translateX(-${index * (100 / vis)}%)`;
  updateDots();
}

// ── Mover adelante / atrás ───────────────────────────
function moveCarrusel(direction) {
  const vis   = getVisibleItems();
  const total = document.querySelectorAll('.carrusel-item').length;

  if (direction === -1) {
    if (index > 0) {
      index--;
    } else {
      index = originalCount - 1;
    }
    carrusel.style.transition = 'transform 0.5s ease';
    carrusel.style.transform  = `translateX(-${index * (100 / vis)}%)`;
    updateDots();
    return;
  }

  index++;
  carrusel.style.transition = 'transform 0.5s ease';
  carrusel.style.transform  = `translateX(-${index * (100 / vis)}%)`;
  updateDots();

  if (index >= total - vis) {
    setTimeout(() => {
      carrusel.style.transition = 'none';
      index = 0;
      carrusel.style.transform  = 'translateX(0)';
      updateDots();
    }, 500);
  }
}

// ── Autoplay ─────────────────────────────────────────
function startAutoPlay() {
  clearInterval(autoPlay);
  if (!userPaused) {
    autoPlay = setInterval(() => moveCarrusel(1), 3000);
  }
}

// Pausa 5s al interactuar manualmente, luego reanuda
function onUserInteraction() {
  userPaused = true;
  clearInterval(autoPlay);
  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(() => {
    userPaused = false;
    startAutoPlay();
  }, 5000);
}

// ── Botones ← → ──────────────────────────────────────
btnPrev?.addEventListener('click', () => { moveCarrusel(-1); onUserInteraction(); });
btnNext?.addEventListener('click', () => { moveCarrusel(1);  onUserInteraction(); });

// ── Swipe táctil ─────────────────────────────────────
carrusel.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

carrusel.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > SWIPE_THRESHOLD) {
    moveCarrusel(diff > 0 ? 1 : -1);
    onUserInteraction();
  }
}, { passive: true });

// ── Resize ───────────────────────────────────────────
window.addEventListener('resize', () => {
  setupCarrusel();
  userPaused = false;
  startAutoPlay();
});

// ── Arrancar ─────────────────────────────────────────
setupCarrusel();
window.addEventListener('load', () => {
  startAutoPlay();
});


// ===========================
// CARRUSELES INTERNOS DE TIPS
// ===========================

document.querySelectorAll('.tip-carousel').forEach(carousel => {
  const imgs = carousel.querySelectorAll('img');
  if (imgs.length < 2) return;
  let idx = 0;
  setInterval(() => {
    imgs[idx].classList.remove('active');
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add('active');
  }, 3000);
});