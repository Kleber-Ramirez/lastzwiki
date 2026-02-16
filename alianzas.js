const contenido = document.getElementById("contenido");
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    cargarTab(tab.dataset.tab);
  });
});

function cargarTab(tab){
  if(tab === "alianza") cargarAlianza();
  if(tab === "miembros") cargarMiembros();
  if(tab === "gestion") cargarGestion();
}

/* ================= ALIANZA ================= */

function cargarAlianza(){
  contenido.innerHTML = `
    <div class="menu-grid">
      <button onclick="info('Inteligencia de Alianza','Información de ataques y reuniones de la alianza. Visualiza reuniones activas de aliados, identifica quién ha atacado recientemente a la alianza y marca automáticamente la ubicación del atacante en el mapa para coordinar contraataques.')">📘 Inteligencia</button>
      <button onclick="info('Ayuda de Alianza','Visualiza qué miembros de tu alianza necesitan ayuda actualmente y ofréceles asistencia con un click para reducir sus tiempos de construcción, investigación o curación.')">🤝 Ayuda</button>
      <button onclick="info('Tecnología de Alianza','Visualiza todas las tecnologías completadas y en desarrollo de tu alianza. Dona recursos a las tecnologías activas para acelerarlas y obtener puntos de contribución canjeables en la Tienda de Alianza.')">🔬 Tecnología</button>
      <button onclick="info('Regalos de Alianza','Recompensas por actividad y eventos.')">🎁 Regalos</button>
      <button onclick="info('Tienda de Alianza','Compra objetos con monedas de alianza.')">🛒 Tienda</button>
      <button onclick="info('Edificio de Alianza','Centro principal de la alianza.')">🏛 Edificio</button>
      <button onclick="info('Ranking','Clasificación de alianzas.')">🏆 Ranking</button>
      <button onclick="info('Registro','Historial de acciones.')">📜 Registro</button>
      <button onclick="info('Habilidad de Alianza','Habilidades especiales.')">🚀 Habilidad</button>
    </div>
    <div class="info-panel" id="panel">
      <p>Selecciona una opción para ver su explicación.</p>
    </div>
  `;
}

/* ================= MIEMBROS ================= */

function cargarMiembros(){
  contenido.innerHTML = `
    <div class="menu-grid">
      <button onclick="info('Lista de Miembros','Muestra todos los integrantes y su rango.')">👥 Miembros</button>
      <button onclick="info('Rangos','Sistema R5 a R1 dentro de la alianza.')">🎖 Rangos</button>
      <button onclick="info('Actividad','Última conexión y participación.')">📊 Actividad</button>
      <button onclick="info('Promociones','Ascensos y degradaciones.')">⬆⬇</button>
    </div>
    <div class="info-panel" id="panel">
      <p>Consulta cómo funciona la sección de miembros.</p>
    </div>
  `;
}

/* ================= GESTIÓN ================= */

function cargarGestion(){
  contenido.innerHTML = `
    <div class="menu-grid">
      <button onclick="info('Configuración','Ajustes generales de la alianza.')">⚙️ Configuración</button>
      <button onclick="info('Solicitantes','Gestión de nuevas solicitudes.')">➕ Solicitantes</button>
      <button onclick="info('Correo de Alianza','Mensajes internos.')">✉️ Correo</button>
      <button onclick="info('Administrar Beneficios','Reparto de recompensas.')">🎁 Beneficios</button>
      <button onclick="info('Anuncios','Comunicados importantes.')">📢 Anuncios</button>
      <button onclick="info('Salir de la Alianza','Abandonar la alianza.')">🚪 Salir</button>
    </div>
    <div class="info-panel" id="panel">
      <p>Opciones administrativas y de control.</p>
    </div>
  `;
}

/* PANEL INFO */
function info(titulo, texto){
  document.getElementById("panel").innerHTML = `
    <h3>${titulo}</h3>
    <p>${texto}</p>
  `;
}

/* CARGA INICIAL */
cargarAlianza();
