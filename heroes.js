// ===========================
// ESPERAR A QUE EL DOM CARGUE
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  inicializarHeroes();
});

function inicializarHeroes() {

/* ===============================
   SELECCIONES
================================ */
const categoryBtns = document.querySelectorAll('.btn-cat');
const cards = document.querySelectorAll('.card-hero');

const allCarousels = document.querySelector('.all-carousels');
const gridHeroes = document.querySelector('.grid-heroes');
const carouselBlocks = document.querySelectorAll('.carousel-block');
let carouselsBuilt = false;

/* ===============================
   FILTRO CATEGORÍA
================================ */
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.category;

    if (cat === 'all') {
      gridHeroes.style.display = 'none';
      allCarousels.classList.remove('hidden');

      if (!carouselsBuilt) {
        buildAllCarousels();
        carouselsBuilt = true;
      }
    } else {
      allCarousels.classList.add('hidden');
      gridHeroes.style.display = 'grid';

      cards.forEach(card => {
        card.style.display =
          card.dataset.category === cat ? 'block' : 'none';
      });
    }
  });
});

/* ===============================
   CONSTRUIR CARRUSELES (ALL)
================================ */
function buildAllCarousels() {
  carouselBlocks.forEach(block => {
    const cat = block.dataset.category;
    const track = block.querySelector('.carousel-track');

    track.innerHTML = '';

    const heroes = [...cards].filter(
      card => card.dataset.category === cat
    );

    heroes.forEach(card => {
      const clone = card.cloneNode(true);
      clone.style.display = 'block';
      track.appendChild(clone);
    });

    startCarousel(track);
  });
}

/* ===============================
   CARRUSEL SEMI-AUTOMÁTICO
================================ */
function startCarousel(track) {
  if (track.dataset.running) return;
  track.dataset.running = 'true';

  let direction = 1;

  setInterval(() => {
    if (track.matches(':hover')) return;

    track.scrollLeft += direction * 0.6;

    if (track.scrollLeft + track.clientWidth >= track.scrollWidth) {
      direction = -1;
    }

    if (track.scrollLeft <= 0) {
      direction = 1;
    }
  }, 16);
}

/* ===============================
   INICIALIZACIÓN - FORZAR ALL
================================ */
const btnAll = document.querySelector('.btn-cat[data-category="all"]');
if (btnAll) btnAll.click();

// ===========================
// FILTRO DE EQUIPAMIENTO
// ===========================

const gridEquip = document.getElementById('gridEquip');
const equipClassColumn = document.getElementById('equipClassColumn');

const equipBtns = document.querySelectorAll('.btn-equip');
const equipCards = document.querySelectorAll('.card-equip');

const exclusiveCarousel = document.querySelector('.equip-exclusive-carousel');
const exclusiveTrack = document.querySelector('.equip-carousel-track');

let exclusiveBuilt = false;

equipBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    equipBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const tier = btn.dataset.tier;

    if (tier === 'all') {
      exclusiveCarousel.classList.remove('hidden');
      equipClassColumn.classList.remove('hidden');
      gridEquip.classList.add('hidden');
      equipCards.forEach(card => { card.style.display = 'none'; });
      buildExclusiveCarousel();
      ['s', 'a', 'b', 'c'].forEach(t => buildEquipClassCarousel(t));
    }
    else if (tier === 'exclusivo') {
      exclusiveCarousel.classList.add('hidden');
      equipClassColumn.classList.add('hidden');
      gridEquip.classList.remove('hidden');
      equipCards.forEach(card => {
        card.style.display = card.dataset.tier === 'exclusivo' ? 'block' : 'none';
      });
    }
    else {
      exclusiveCarousel.classList.add('hidden');
      equipClassColumn.classList.add('hidden');
      gridEquip.classList.remove('hidden');
      equipCards.forEach(card => {
        card.style.display = card.dataset.tier === tier ? 'block' : 'none';
      });
    }
  });
});

/* ===============================
   CARRUSEL EXCLUSIVO (ALL)
================================ */
function buildExclusiveCarousel() {
  if (exclusiveBuilt) return;
  exclusiveTrack.innerHTML = '';
  const exclusivos = [...equipCards].filter(card => card.dataset.tier === 'exclusivo');
  exclusivos.forEach(card => {
    const clone = card.cloneNode(true);
    clone.style.display = 'block';
    exclusiveTrack.appendChild(clone);
  });
  startAutoScroll(exclusiveTrack);
  exclusiveBuilt = true;
}

/* ===============================
   CARRUSELES POR CLASE (S-A-B-C)
================================ */
function buildEquipClassCarousel(tier) {
  const card = document.querySelector(`.equip-class-card[data-tier="${tier}"]`);
  if (!card) return;
  const track = card.querySelector('.equip-class-track');
  if (track.dataset.built === 'true') return;
  track.dataset.built = 'true';
  const items = [...equipCards].filter(equip => equip.dataset.tier === tier);
  items.forEach(equip => {
    const clone = equip.cloneNode(true);
    clone.style.display = 'block';
    track.appendChild(clone);
  });
  startAutoScroll(track);
}

/* ===============================
   AUTO-SCROLL (SEMI-AUTOMÁTICO)
================================ */
function startAutoScroll(track) {
  let direction = 1;
  setInterval(() => {
    if (track.matches(':hover')) return;
    track.scrollLeft += direction * 0.6;
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth) direction = -1;
    if (track.scrollLeft <= 0) direction = 1;
  }, 16);
}

/* ===============================
   INICIALIZACIÓN (LOAD)
================================ */
const btnEquipAll = document.querySelector('.btn-equip[data-tier="all"]');
if (btnEquipAll) btnEquipAll.click();

} // ← CIERRA inicializarHeroes()