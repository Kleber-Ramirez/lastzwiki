// ===========================
// SISTEMA DE EVENTOS MEJORADO
// ===========================

// Función para manejar carruseles
function inicializarCarruseles() {
  document.querySelectorAll(".carrusel").forEach(carrusel => {
    const imgs = carrusel.querySelectorAll(".imagenes img");
    const prev = carrusel.querySelector(".btn-carrusel.prev");
    const next = carrusel.querySelector(".btn-carrusel.next");
    let index = 0;

    function mostrarImagen(i) {
      imgs.forEach(img => img.classList.remove("activo"));
      imgs[i].classList.add("activo");
    }

    next.addEventListener("click", () => {
      index = (index + 1) % imgs.length;
      mostrarImagen(index);
    });

    prev.addEventListener("click", () => {
      index = (index - 1 + imgs.length) % imgs.length;
      mostrarImagen(index);
    });
  });
}

// Función para cambiar entre eventos
function inicializarBotones() {
  // Para cada sección (Eventos y Eventos Populares)
  document.querySelectorAll(".seccion-eventos, .seccion-eventos-populares").forEach(seccion => {
    const botones = seccion.querySelectorAll(".botones-img button");
    const contenidos = seccion.querySelectorAll(".contenido-eventos");

    botones.forEach(boton => {
      boton.addEventListener("click", () => {
        const targetId = boton.getAttribute("data-target");

        // Remover clase activa de todos los botones de esta sección
        botones.forEach(btn => btn.classList.remove("activo"));
        
        // Agregar clase activa al botón clickeado
        boton.classList.add("activo");

        // Ocultar todos los contenidos de esta sección
        contenidos.forEach(contenido => contenido.classList.remove("activo"));
        
        // Mostrar el contenido seleccionado
        const targetContenido = document.getElementById(targetId);
        if (targetContenido) {
          targetContenido.classList.add("activo");
        }
      });
    });
  });
}

// Inicializar todo cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
  inicializarCarruseles();
  inicializarBotones();
  
  // Activar automáticamente el primer evento de Eventos Populares
  const primerBotonPopular = document.querySelector(".seccion-eventos-populares .botones-img button.activo");
  if (primerBotonPopular) {
    const targetId = primerBotonPopular.getAttribute("data-target");
    const primerEvento = document.getElementById(targetId);
    if (primerEvento) {
      primerEvento.classList.add("activo");
    }
  }
  
  console.log("✅ Sistema de eventos cargado correctamente");
});