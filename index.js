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