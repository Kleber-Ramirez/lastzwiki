/* =============================================
   ALIANZAS — Solo controla visibilidad.
   Todo el contenido vive en el HTML.
   ============================================= */

function activarBoton(btn) {
  const tabSection = btn.closest(".tab-content");

  // Desactivar otros botones del mismo tab
  tabSection.querySelectorAll(".menu-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  // Ocultar placeholder y todos los paneles del tab actual
  tabSection.querySelectorAll(".panel-placeholder, .panel-item").forEach(p => p.classList.add("hidden"));

  // Mostrar el panel seleccionado con animación
  const panel = document.getElementById(btn.dataset.panel);
  if (panel) {
    panel.classList.remove("hidden");
    panel.classList.add("animate");
    panel.addEventListener("animationend", () => panel.classList.remove("animate"), { once: true });
  }
}

/* ---- Botones del menú interior ---- */
document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.addEventListener("click", () => activarBoton(btn));
});

/* ---- Tabs principales ---- */
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    // Activar tab
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // Mostrar sección correspondiente, ocultar el resto
    document.querySelectorAll(".tab-content").forEach(s => s.classList.add("hidden"));
    const section = document.getElementById("tab-" + tab.dataset.tab);
    section.classList.remove("hidden");

    // Activar primer botón del tab por defecto
    const primerBtn = section.querySelector(".menu-btn");
    if (primerBtn) activarBoton(primerBtn);
  });
});

/* ---- Carga inicial: activar primer botón del tab activo ---- */
const tabInicial = document.querySelector(".tab-content:not(.hidden)");
if (tabInicial) {
  const primerBtn = tabInicial.querySelector(".menu-btn");
  if (primerBtn) activarBoton(primerBtn);
}