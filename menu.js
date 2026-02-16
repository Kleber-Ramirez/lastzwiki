// menu.js
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.main-nav ul');
  const overlay = document.querySelector('.nav-overlay');
  
  if (!hamburger || !navMenu) {
    console.error('No se encontró el hamburger o el menú');
    return;
  }
  
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
    document.body.classList.toggle('menu-open'); // ✅ USA CLASE
  }
  
  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('menu-open'); // ✅ QUITA CLASE
  }
  
  hamburger.addEventListener('click', toggleMenu);
  
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }
  
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
});