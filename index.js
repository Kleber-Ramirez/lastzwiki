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
startAutoPlay();


// ===========================
// CARRUSELES INTERNOS DE TIPS
// ===========================

document.querySelectorAll('.tip-carousel').forEach(carousel => {
  const imgs = carousel.querySelectorAll('img');
  let idx = 0;
  setInterval(() => {
    imgs[idx].classList.remove('active');
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add('active');
  }, 3000);
});
// ===========================
// MODAL DE TIPS
// ===========================

const tipContent = {

tip1: `
  <h2>🏕️ Mejores Refugiados para Reclutar</h2>
  <img src="img-tip-refugiados-1.jpg" alt="Refugiados">
  
  <h3>🎯 Los 2 Refugiados Más Importantes</h3>
  <p>En Last Z, los refugiados te otorgan <b>habilidades pasivas permanentes</b> que mejoran tu progreso. Sin embargo, <b>NO todos los refugiados son igual de útiles</b>.</p>
  
  <p>Estos son los <b>2 refugiados que DEBES priorizar</b> conseguir:</p>

  <h3>🏗️ #1 - Mayordomo</h3>
  
  <div class="refugiado-box" style="background: rgba(196, 30, 58, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
    <p><b>Habilidad Principal:</b> Velocidad de Construcción</p>
    <p><b>Bonificación Extra:</b> Tiempo de aceleración gratuita</p>
  </div>
  
  <p><b>¿Por qué es el mejor?</b></p>
  <ul>
    <li><b>Reduce drásticamente</b> el tiempo de construcción de edificios</li>
    <li>La construcción es el <b>mayor cuello de botella</b> del juego</li>
    <li>Te da tiempo de <b>aceleración gratuita</b> adicional al construir</li>
    <li>Útil durante <b>toda tu progresión</b>, desde nivel 1 hasta endgame</li>
    <li>Ahorra <b>días o semanas</b> de espera acumulada</li>
  </ul>

  <img src="img-tip-refugiados-2.jpg" alt="Mayordomo">

  <h3>🤝 #2 - Diplomático</h3>
  
  <div class="refugiado-box" style="background: rgba(88, 137, 232, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
    <p><b>Habilidad Principal:</b> Límite de Ayuda de Alianza</p>
    <p><b>Bonificación Extra:</b> Tiempo que reduce cada ayuda</p>
  </div>
  
  <p><b>¿Por qué es el mejor?</b></p>
  <ul>
    <li>Aumenta <b>cuántas ayudas puedes recibir</b> de tu alianza</li>
    <li>Cada ayuda <b>reduce más tiempo</b> en construcciones/investigaciones</li>
    <li>Combina perfectamente con el <b>Mayordomo</b></li>
    <li>En alianzas activas, puedes <b>completar construcciones casi instantáneamente</b></li>
    <li>Funciona para <b>edificios, investigaciones y curaciones</b></li>
  </ul>

  <h3>💡 ¿Por qué estos 2 son los mejores?</h3>
  
  <p>La combinación de <b>Mayordomo + Diplomático</b> crea una sinergia poderosa:</p>
  
  <ol>
    <li><b>Mayordomo</b> reduce el tiempo base de construcción</li>
    <li><b>Diplomático</b> te permite recibir más ayudas</li>
    <li>Cada ayuda reduce <b>aún más tiempo</b> gracias al Diplomático</li>
    <li>Resultado: Construcciones que tomarían días se completan en <b>horas o minutos</b></li>
  </ol>

  <h3>🌟 Sobre las Rarezas</h3>
  
  <p>Tanto Mayordomo como Diplomático vienen en <b>diferentes rarezas</b>:</p>
  
  <ul>
    <li>🟢 <b>Verde</b> (Común) - Bonificaciones básicas</li>
    <li>🔵 <b>Azul</b> (Raro) - Bonificaciones mejoradas</li>
    <li>🟣 <b>Morado</b> (Épico) - Bonificaciones altas</li>
    <li>🟠 <b>Naranja</b> (Legendario) - Bonificaciones máximas</li>
  </ul>
  
  <p><b>Importante:</b> Incluso un Mayordomo o Diplomático <b>verde</b> es mejor que otros refugiados de rareza superior. Prioriza <b>el tipo de refugiado</b> sobre la rareza.</p>

  <h3>⚠️ Otros Refugiados</h3>
  
  <p>Existen muchos otros refugiados en el juego, pero la mayoría tienen habilidades <b>mucho menos impactantes</b>:</p>
  
  <ul>
    <li>Bonos a producción de recursos (obtienes recursos fácilmente de otras formas)</li>
    <li>Bonos a entrenamiento de tropas (útil pero no crítico)</li>
    <li>Bonos a ataque/defensa (marginales comparado con héroes y equipo)</li>
  </ul>
  
  <p>Ninguno de estos se compara al <b>impacto masivo</b> que tienen Mayordomo y Diplomático en tu velocidad de progreso.</p>

  <h3>🎯 Estrategia de Reclutamiento</h3>
  
  <p><b>Prioridad 1:</b> Consigue un <b>Mayordomo</b> lo antes posible.</p>
  <p><b>Prioridad 2:</b> Consigue un <b>Diplomático</b> después.</p>
  <p><b>Prioridad 3:</b> Mejora la rareza de ambos cuando puedas.</p>
  
  <div class="club-tip destacado" style="background: rgba(196, 30, 58, 0.15); padding: 1rem; border-left: 4px solid var(--acento); margin: 1.5rem 0; border-radius: 4px;">
    <p>💎 <strong>Consejo F2P:</strong> Vale la pena gastar diamantes o cupones en conseguir estos 2 refugiados. Son una de las <b>mejores inversiones</b> que puedes hacer en el juego, superando incluso a muchos héroes.</p>
  </div>

  <h3>🏢 ¿Cómo Conseguir Refugiados?</h3>
  
  <p>Los refugiados se reclutan en el <a href="edificios.html#club-refugiados" class="edificio-link" style="color: var(--acento); background: rgba(196, 30, 58, 0.1); padding: 0.3rem 0.8rem; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">🏢 Club</a> usando <b>Cupones de Refugiado</b> o <b>Diamantes</b>.</p>
  
  <p><b>Costos de reclutamiento:</b></p>
  <ul>
    <li>1er Refugiado: 500 cupones/diamantes</li>
    <li>2do Refugiado: 2,000 cupones/diamantes</li>
    <li>3er Refugiado: 5,000 cupones/diamantes</li>
  </ul>
  
  <p>Los refugiados disponibles <b>cambian cada 12 horas</b>, y puedes usar una <b>actualización gratuita</b> después de cada reclutamiento para cambiar las opciones disponibles.</p>
  
  <p>📖 <b>Para más detalles sobre el sistema de reclutamiento, costos y estrategias óptimas, visita la sección de</b> <a href="edificios.html#club-refugiados" class="edificio-link" style="color: var(--acento); background: rgba(196, 30, 58, 0.1); padding: 0.3rem 0.8rem; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">🏢 Club - Refugiados</a>.</p>

  <h3>🔥 Conclusión</h3>
  
  <p><b>Mayordomo y Diplomático</b> son los refugiados más importantes del juego. Su impacto en tu velocidad de progreso es <b>insuperable</b>. Consíguelos lo antes posible y notarás una diferencia enorme en qué tan rápido avanzas. 🚀</p>
`,  
  
tip2: `
  <h2>⚔️ Mejora el ataque de tus formaciones</h2>
  <img src="img-tip-ataque1.jpg" alt="Formaciones">
  
  <p>En Last Z hay <b>3 facciones de héroes</b>: <span style="color:#ff4757">🔴 Rosa Sangrienta</span>, <span style="color:#5889e8">🔵 Alas del Alba</span> y <span style="color:#f1c40f">🟡 Guardián</span>.</p>
  
  <p>El máximo de héroes por formación es <b>5</b>. Al alinear <b>5 héroes de la misma facción</b>, obtienes <b>ATQ de Tropa +115%</b>.</p>

  <h3>🎯 Orden Recomendado de Formaciones</h3>
  
  <p><b>1ª Formación: Rosa Sangrienta (Rojo)</b><br>
  Esta debe ser tu <b>formación principal</b> porque:</p>
  <ul>
    <li>Consigues héroes de esta facción <b>más fácilmente</b> al inicio del juego.</li>
    <li>Tiene el edificio <b>Jardín de Niebla Tóxica</b> que mejora directamente el ATQ de esta tropa.</li>
  </ul>

  <p><b>2ª Formación: Alas del Alba (Azul)</b><br>
  Tu segunda tropa más fuerte:</p>
  <ul>
    <li>Mejora esta formación con el edificio <b>Torre del Amanecer</b>.</li>
  </ul>

  <p><b>3ª Formación: Guardián (Amarillo)</b><br>
  Tu tercera tropa:</p>
  <ul>
    <li>Mejora esta formación con el edificio <b>Fábrica de Acero</b>.</li>
  </ul>

  <h3>🏗️ Edificios de Facción - Mejora tu ATQ</h3>
  
  <p>Cada facción tiene un <b>edificio exclusivo</b> que potencia directamente esa formación. <b>Mejora estos edificios en el orden de tus formaciones</b>:</p>
  
  <p><b>1. Jardín de Niebla Tóxica</b> (Rosa Sangrienta) → <span style="color:#4cd137">Prioridad ALTA</span><br>
  Mejora el ATQ de tu <b>1ª formación</b>. Pon énfasis en subir este edificio primero.</p>

  <p><b>2. Torre del Amanecer</b> (Alas del Alba) → <span style="color:#fbc531">Prioridad MEDIA</span><br>
  Mejora el poder de tu <b>2ª formación</b>.</p>

  <p><b>3. Fábrica de Acero</b> (Guardián) → <span style="color:#fbc531">Prioridad MEDIA</span><br>
  Mejora el poder de tu <b>3ª formación</b>.</p>

  <h3>💡 Estrategia Correcta</h3>
  
  <p><b>✅ SÍ hacer:</b></p>
  <ul>
    <li>Concentra recursos en <b>5 héroes de Rosa Sangrienta</b> para tu 1ª formación.</li>
    <li>Mejora el <b>Jardín de Niebla Tóxica</b> primero para potenciar tu tropa principal.</li>
    <li>Mantén formaciones <b>puras</b> (5 héroes de la misma facción).</li>
  </ul>

  <p><b>❌ NO hacer:</b></p>
  <ul>
    <li><b>Evita combinar héroes de diferentes facciones</b> en una misma tropa (pierdes el buff +115%).</li>
    <li>No mejores los 3 edificios al mismo tiempo - prioriza según el orden de tus formaciones.</li>
    <li>No inviertas en una 4ª formación hasta tener las 3 primeras completas.</li>
  </ul>

  <h3>📈 Progresión Recomendada</h3>
  
  <p><b>Fase 1:</b> Completa tu <b>1ª formación Rosa Sangrienta</b> + mejora Jardín de Niebla Tóxica.<br>
  <b>Fase 2:</b> Completa tu <b>2ª formación Alas del Alba</b> + mejora Torre del Amanecer.<br>
  <b>Fase 3:</b> Completa tu <b>3ª formación Guardián</b> + mejora Fábrica de Acero.</p>

  <p><b>Consejo F2P:</b> Esta estrategia maximiza tu poder de ataque sin gastar dinero. El buff +115% es <b>enorme</b> y marca la diferencia en PvP y eventos.</p>
`,
  
tip3: `
  <h2>🎯 Rotación de Armaduras en Caravana</h2>
  <img src="img-tip-caravana-1.jpg" alt="Caravana">
  
  <h3>🏛️ ¿Qué es la Caravana?</h3>
  <p>La <b>Caravana</b> es un edificio donde enfrentas oleadas de zombies en <b>3 campos de batalla separados</b>:</p>
  <ul>
    <li>🔴 <b>Campo de Batalla - Rosa de Sangre</b></li>
    <li>🔵 <b>Campo de Batalla - Alas del Alba</b></li>
    <li>🟡 <b>Campo de Batalla - Guardián del Orden</b></li>
  </ul>
  
  <p>Cada campo tiene <b>oleadas progresivas de zombies</b> que se vuelven más fuertes. Avanzas hasta que tu formación ya no pueda más.</p>

  <h3>⚙️ Estrategia de Rotación de Armaduras</h3>
  
  <p>Normalmente, tus <b>mejores armaduras</b> (rango S y A mejoradas) están equipadas en tu <b>1ª formación (Rosa Sangrienta)</b>. Aquí está cómo maximizar tus recompensas:</p>

  <p><b>Paso 1: Campo Rosa de Sangre</b><br>
  Entra con tu 1ª formación con las mejores armaduras. Avanza hasta donde puedas y sal del campo.</p>

  <p><b>Paso 2: Transferir Armaduras a 2ª Formación</b><br>
  Quita las armaduras S/A de tu 1ª formación y equípalas en tu 2ª formación (Alas del Alba). Esto aumenta temporalmente su poder.</p>

  <p><b>Paso 3: Campo Alas del Alba</b><br>
  Entra con tu 2ª formación ahora potenciada y avanza lo máximo posible.</p>

  <p><b>Paso 4: Transferir Armaduras a 3ª Formación</b><br>
  Repite el proceso: quita armaduras de la 2ª formación y equípalas en tu 3ª formación (Guardián).</p>

  <p><b>Paso 5: Campo Guardián del Orden</b><br>
  Entra con tu 3ª formación potenciada y avanza lo máximo posible.</p>

  <p><b>Paso 6: Restaurar Armaduras</b><br>
  Una vez terminada la Caravana, devuelve las armaduras a tu 1ª formación. Vuelve todo a la normalidad.</p>

  <h3>💡 ¿Por qué funciona esta estrategia?</h3>
  
  <ul>
    <li>Tus 2ª y 3ª formaciones normalmente son más débiles.</li>
    <li>Al transferir armaduras S/A mejoradas, aumentas su poder temporalmente.</li>
    <li>Esto te permite <b>avanzar más rondas</b> en cada campo = <b>mejores recompensas</b>.</li>
    <li>Es una estrategia <b>solo para Caravana</b> - luego restauras todo.</li>
  </ul>

  <h3>✅ Ventajas y Consideraciones</h3>
  
  <p><b>Ventajas:</b></p>
  <ul>
    <li>Maximizas recompensas en los 3 campos.</li>
    <li>No necesitas gastar recursos mejorando armaduras adicionales.</li>
    <li>Estrategia 100% F2P friendly.</li>
  </ul>

  <p><b>Desventajas:</b></p>
  <ul>
    <li>Toma tiempo transferir armaduras manualmente.</li>
    <li>Debes recordar restaurar las armaduras después.</li>
    <li>No funciona si estás en medio de un evento PvP.</li>
  </ul>

  <h3>🎯 Consejo Extra</h3>
  
  <p>Si tu 1ª formación tiene <b>armadura S+10</b> y tu 2ª tiene <b>armadura B+5</b>, el cambio temporal hará una <b>diferencia ENORME</b> en cuántas rondas puedes avanzar.</p>

  <p><b>Mejor momento:</b> Cuando la Caravana se reinicia (usualmente semanal) y tienes tiempo para dedicarle.</p>

  <p><b>No olvides:</b> Al terminar, vuelve las armaduras a tu 1ª formación para que esté lista para combates normales, eventos y PvP.</p>
`,

tip4: `
  <h2>🎮 Crear Cuentas Secundarias (Farms)</h2>
  <img src="img-tip-farm-1.jpg" alt="Cuenta Farm">
  
  <h3>¿Qué son las Cuentas Farm?</h3>
  <p>Personajes adicionales que usas para <b>generar recursos extra</b> y enviarlos a tu cuenta principal mediante comercio o donaciones de alianza.</p>

  <h3>📱 Método 1: Dual Space (Recomendado)</h3>
  <p><b>Paso a paso:</b></p>
  <ol>
    <li>Descarga la app <b>Dual Space</b> (Android/iOS)</li>
    <li>Instala una segunda copia del juego dentro de Dual Space</li>
    <li>Completa el tutorial inicial</li>
    <li>Ve a <b>Perfil → Cuenta → Gestión de Personaje</b></li>
    <li>Click en <b>"Crear Nuevo Personaje"</b></li>
    <li>Selecciona tu <b>zona de guerra/servidor actual</b></li>
  </ol>
  <img src="img-tip-farm-2.jpg" alt="Dual Space">

  <h3>🚀 Método 2: Teletransporte Gratuito</h3>
  <p><b>Aprovecha eventos con TP gratis (sábados):</b></p>
  <ol>
    <li>En <b>Guerra de Servidores</b> o <b>Versus de Alianza</b>, teletranspórtate a otra zona</li>
    <li>Ve a <b>Perfil → Cuenta → Gestión de Personaje</b></li>
    <li>Click en <b>"Crear Nuevo Personaje"</b></li>
    <li>Selecciona tu <b>servidor original</b></li>
  </ol>
  <p><b>Ventaja:</b> No necesitas apps externas, usas el TP gratuito del evento.</p>

  <h3>💡 Consejos para Farms Eficientes</h3>
  <ul>
    <li><b>Únete a tu propia alianza</b> para facilitar donaciones</li>
    <li><b>Enfoca en producción:</b> mejora granjas, aserraderos y minas primero</li>
    <li><b>No desarrolles militarmente</b> (solo recursos)</li>
    <li><b>Usa escudos baratos</b> para proteger de ataques</li>
    <li><b>Mantén poder bajo</b> para evitar ser objetivo</li>
  </ul>

  <h3>⚠️ Importante</h3>
  <p>Verifica las reglas del juego sobre multi-cuentas. <b>Evita usar farms para manipular rankings</b> o violar términos de servicio.</p>
`,

tip5: `
  <h2>💰 Optimizar Cajas de Recursos</h2>
  <img src="img-tip-cajas-1.jpg" alt="Cajas de recursos">
  
  <h3>📦 Tipos de Cajas de Recursos</h3>
  <p>Al completar misiones y eventos, recibes <b>cajas de recursos</b> de diferentes calidades:</p>
  
  <ul>
    <li>🟦 <b>Caja Azul</b> → Recursos básicos</li>
    <li>🟪 <b>Caja Morada</b> → Recursos medios</li>
    <li>🟨 <b>Caja Dorada/Amarilla</b> → Recursos altos</li>
  </ul>

  <h3>🔑 Secreto: Las Cajas Escalan con tu Nivel</h3>
  
  <p><b>Lo que pocos saben:</b> La cantidad de recursos que obtienes de cada caja <b>aumenta según tu nivel de Sede</b>.</p>

  <p>Ejemplo:</p>
  <ul>
    <li>Una caja dorada en <b>nivel 15</b> puede darte <b>50,000 de alimento</b>.</li>
    <li>La <b>misma caja</b> en <b>nivel 27</b> puede darte <b>500,000 de alimento</b>.</li>
  </ul>

  <p>Esto significa que <b>guardar cajas y usarlas en niveles altos</b> te da <b>mucho más valor</b>.</p>

  <h3>📈 Estrategia Recomendada</h3>

  <p><b>Cajas Azules:</b><br>
  • Úsalas cuando las necesites.<br>
  • No vale mucho la pena guardarlas (valor bajo).</p>

  <p><b>Cajas Moradas:</b><br>
  • Guárdalas hasta <b>nivel 20-23</b>.<br>
  • Úsalas cuando necesites recursos para una mejora importante.</p>

  <p><b>Cajas Doradas/Amarillas:</b><br>
  • <b>¡GUÁRDALAS!</b> No las uses al inicio.<br>
  • Espera hasta <b>nivel 27+</b> (algunos esperan hasta nivel 30+).<br>
  • En estos niveles, los recursos que dan son <b>MUCHO mayores</b>.</p>

  <h3>💡 ¿Por qué funciona?</h3>

  <ul>
    <li>En niveles bajos (1-20), las mejoras requieren pocos recursos.</li>
    <li>En niveles altos (27+), las mejoras requieren <b>billones de recursos</b>.</li>
    <li>Si usas las cajas doradas en nivel bajo, <b>desperdicias su potencial</b>.</li>
    <li>Si las guardas para nivel alto, <b>obtienes 10x-20x más valor</b>.</li>
  </ul>

  <h3>🎯 Consejo Práctico</h3>

  <p><b>Niveles 1-15:</b><br>
  • Usa solo cajas azules.<br>
  • Guarda TODAS las moradas y doradas.</p>

  <p><b>Niveles 16-23:</b><br>
  • Usa cajas azules libremente.<br>
  • Usa cajas moradas solo si es necesario.<br>
  • NO toques las doradas.</p>

  <p><b>Niveles 24-26:</b><br>
  • Usa cajas azules y moradas según necesites.<br>
  • Sigue guardando las doradas.</p>

  <p><b>Nivel 27+:</b><br>
  • ¡Ahora sí! Usa las cajas doradas que guardaste.<br>
  • Verás una <b>diferencia ENORME</b> en la cantidad de recursos.</p>

  <h3>⚠️ Errores Comunes</h3>

  <p><b>❌ NO hacer:</b></p>
  <ul>
    <li>Usar cajas doradas en nivel 10-15 "porque necesito recursos ahora".</li>
    <li>Abrir todas las cajas apenas las recibes.</li>
    <li>No tener paciencia para guardarlas.</li>
  </ul>

  <p><b>✅ SÍ hacer:</b></p>
  <ul>
    <li>Acumular cajas doradas en tu inventario.</li>
    <li>Administrar recursos con cajas de menor calidad.</li>
    <li>Ser paciente - la recompensa vale la pena.</li>
  </ul>

  <h3>🔥 Consejo F2P</h3>

  <p>Esta estrategia es <b>CLAVE para jugadores F2P</b>. En niveles altos, los recursos son el mayor cuello de botella. Tener un <b>banco de cajas doradas guardadas</b> te permite hacer mejoras críticas sin gastar dinero real.</p>

  <p><b>Ejemplo real:</b> Un jugador que guardó 50 cajas doradas desde nivel 10 hasta nivel 28, al abrirlas todas obtuvo <b>más de 20 billones de recursos</b> - suficiente para varias mejoras importantes.</p>

  <p><b>Recuerda:</b> La paciencia en este juego se recompensa. ¡Guarda esas cajas doradas! 💎</p>
`,

tip6: `
  <h2>🏛️ Cargos Oficiales del Servidor: Buffs Gratis para Todo Jugador</h2>

  <h3>📍 ¿Cómo Llegar al Gobierno de tu Servidor?</h3>
  <p>Sigue estos pasos para acceder a la interfaz de gobierno:</p>
  <ol>
    <li>Haz clic en <b>tu perfil</b> (tu foto o nombre en pantalla).</li>
    <li>Debajo del nombre de tu alianza verás tu <b>Zona de Batalla</b> — haz clic en ese número.</li>
    <li>Esto te lleva directamente a la <b>interfaz de gobierno del servidor</b>.</li>
    <li>Busca el cargo que te interese según el buff que necesites.</li>
    <li>Si está disponible o tiene cola libre, presiona <b>"Solicitar"</b>. ¡Listo!</li>
  </ol>

  <h3>⚠️ Requisitos para Solicitar</h3>
  <ul>
    <li>Tu <b>Sede debe ser nivel 26 o superior</b> (varía según el Presidente actual).</li>
    <li>Solo puedes ocupar <b>un cargo a la vez</b>.</li>
    <li>El Presidente define <b>qué cargos están disponibles</b> para solicitar y sus requisitos.</li>
  </ul>

  <h3>⏱️ ¿Cuánto Dura el Cargo?</h3>
  <ul>
    <li>Al solicitar, recibes el cargo por <b>mínimo 10 minutos</b>.</li>
    <li>Si <b>nadie más lo solicita</b>, lo conservas indefinidamente.</li>
    <li>Si hay fila de espera, al cumplirse tu tiempo pasa al siguiente.</li>
    <li>El Presidente puede <b>retirarte el cargo</b> en cualquier momento.</li>
    <li>Hay una <b>cola de hasta 50 solicitudes</b> por cargo.</li>
  </ul>

  <h3>👑 Jerarquía y Buffs de Cada Cargo</h3>
  <p>Elige el cargo según tu estilo de juego:</p>

  <p><b>👑 Presidente</b><br>
  • ATQ de Tropa <b>+15%</b><br>
  • DEF de Tropa <b>+15%</b><br>
  • Vida de Tropa <b>+5%</b><br>
  → <i>Solo lo designa la alianza que conquista la capital. No es solicitble.</i></p>

  <p><b>👸 Primera Dama</b><br>
  • Producción de Recursos <b>+10%</b><br>
  • Vel. de Recolección <b>+20%</b><br>
  → <i>Ideal para farmers y jugadores enfocados en economía.</i></p>

  <p><b>🤝 Vicepresidente</b><br>
  • Vel. de Construcción <b>+5%</b><br>
  • Vel. de Investigación <b>+5%</b><br>
  → <i>Bueno si estás activo mejorando edificios e investigaciones. Además puede enviar correos a todo el servidor.</i></p>

  <p><b>⚔️ Comandante General de la Guerra</b><br>
  • ATQ de Tropa <b>+10%</b><br>
  • DEF de Tropa <b>+10%</b><br>
  → <i>Perfecto para jugadores enfocados en combate general.</i></p>

  <p><b>🎖️ General Supremo</b><br>
  • ATQ de Tropa <b>+10%</b><br>
  • ATQ de Tropa en Asedio <b>+10%</b><br>
  → <i>Ideal si participas en ataques a edificios o eventos de asedio.</i></p>

  <p><b>🏗️ Ministro de Construcción</b><br>
  • Vel. de Construcción <b>+15%</b><br>
  • Tiempo gratuito para construir <b>+3,600 segundos</b><br>
  → <i>Excelente para cuando estás subiendo edificios de nivel.</i></p>

  <p><b>🌾 Ministro de Agricultura</b><br>
  • Vel. de Recolección <b>+35%</b><br>
  • Producción de Recursos <b>+20%</b><br>
  → <i>El mejor cargo para farmers. Máximo beneficio de recursos.</i></p>

  <p><b>🔬 Ministro de Investigación</b><br>
  • Vel. de Investigación <b>+15%</b><br>
  • Reducir tiempo de investigación <b>+3,600 segundos</b><br>
  → <i>Perfecto para cuando estás activo investigando en el Laboratorio.</i></p>

  <p><b>🛡️ Ministro de Defensa</b><br>
  • ATQ de Tropa en Defensas de Asedio <b>+10%</b><br>
  • DEF de Tropa en Defensas de Asedio <b>+10%</b><br>
  → <i>Útil para defender tu base durante eventos de guerra.</i></p>

  <h3>🎯 ¿Cuál Cargo Pedir Según tu Situación?</h3>
  <ul>
    <li>¿Subiendo edificios? → <b>Ministro de Construcción</b></li>
    <li>¿Investigando en el Lab? → <b>Ministro de Investigación</b></li>
    <li>¿Recolectando recursos? → <b>Ministro de Agricultura</b></li>
    <li>¿En guerra o evento de combate? → <b>Comandante General o General Supremo</b></li>
    <li>¿Defendiendo tu base? → <b>Ministro de Defensa</b></li>
  </ul>

  <h3>💡 Consejos Clave</h3>
  <ul>
    <li>Solicita el cargo <b>justo antes</b> de construir, investigar o atacar para aprovechar el buff.</li>
    <li>Si el cargo está ocupado, <b>entra en la cola</b> — tienes hasta 50 lugares disponibles.</li>
    <li>Los cargos son <b>gratuitos</b> — no cuestan recursos ni gemas. ¡Úsalos siempre!</li>
    <li>Si eres F2P, el <b>Ministro de Agricultura</b> es el más valioso a largo plazo.</li>
    <li>Algunos presidentes ponen <b>requisitos altos</b> — si no cumples, espera al siguiente gobierno.</li>
  </ul>
`,

tip7: `
  <h2>💵 Mejores Compras para Principiantes</h2>
  <img src="img-tip-compras-1.jpg" alt="Sophia">
  
  <p>Si decides <b>gastar dinero real</b> en Last Z, estas son las <b>mejores inversiones</b> para la fase inicial del juego (niveles 1-20).</p>

  <h3>🎯 Compra #1: Sophia - Héroe Constructor ($1 USD)</h3>
  
  <p><b>¿Por qué es la mejor compra?</b></p>
  <ul>
    <li>Cuesta solo <b>$1 dólar</b> (muy accesible).</li>
    <li>Es un <b>héroe Rango S</b> - excelente calidad.</li>
    <li>Su <b>habilidad especial</b>: Reduce el tiempo de construcción de edificios.</li>
    <li>Te ahorra <b>días o semanas</b> de espera en mejoras.</li>
    <li>Útil durante <b>toda tu progresión</b>, no solo al inicio.</li>
  </ul>

  <p><b>Cuándo comprarla:</b> Lo antes posible. Su utilidad comienza desde nivel 1.</p>

  <h3>🔨 Compra #2: Segundo Constructor ($2 USD)</h3>
  <img src="img-tip-compras-1.jpg" alt="Sophia">
  <p><b>¿Por qué es esencial?</b></p>
  <ul>
    <li>Cuesta aproximadamente <b>$2 dólares</b>.</li>
    <li>Te permite <b>mejorar 2 edificios simultáneamente</b>.</li>
    <li>Duplica tu velocidad de progreso al inicio.</li>
    <li>Fundamental para <b>no quedarte estancado</b> esperando que un edificio termine.</li>
    <li>Es una inversión que <b>acelera todo tu juego</b>.</li>
  </ul>

  <p><b>Cuándo comprarlo:</b> Idealmente en la primera semana de juego.</p>

  <h3>💡 ¿Por qué estas 2 compras primero?</h3>
  
  <p>Con solo <b>$3 dólares</b> ($1 Sophia + $2 Constructor), obtienes:</p>
  <ul>
    <li>Un <b>héroe Rango S útil</b> que acelera construcción.</li>
    <li>La capacidad de <b>construir 2 edificios a la vez</b>.</li>
    <li>Una <b>ventaja ENORME</b> sobre jugadores 100% F2P en los primeros niveles.</li>
  </ul>

  <p>Estas compras te dan el <b>mejor valor por dólar</b> en todo el juego.</p>

  <h3>📊 Comparación: F2P vs $3 USD</h3>
  
  <table style="width:100%; border-collapse:collapse; margin:1rem 0;">
    <tr style="background:#1a1a1a; border-bottom:2px solid var(--acento);">
      <th style="padding:0.8rem; text-align:left; color:var(--acento);">Aspecto</th>
      <th style="padding:0.8rem; text-align:left; color:var(--acento);">F2P</th>
      <th style="padding:0.8rem; text-align:left; color:var(--acento);">Con $3</th>
    </tr>
    <tr style="border-bottom:1px solid #333;">
      <td style="padding:0.8rem;">Velocidad de construcción</td>
      <td style="padding:0.8rem; color:#ff4757;">Normal</td>
      <td style="padding:0.8rem; color:#4cd137;">Reducida (Sophia)</td>
    </tr>
    <tr style="border-bottom:1px solid #333;">
      <td style="padding:0.8rem;">Constructores</td>
      <td style="padding:0.8rem; color:#ff4757;">1 edificio a la vez</td>
      <td style="padding:0.8rem; color:#4cd137;">2 edificios simultáneos</td>
    </tr>
    <tr>
      <td style="padding:0.8rem;">Tiempo para llegar a nivel 20</td>
      <td style="padding:0.8rem; color:#ff4757;">~3-4 semanas</td>
      <td style="padding:0.8rem; color:#4cd137;">~1.5-2 semanas</td>
    </tr>
  </table>

  <h3>⚠️ Otras Compras - NO Recomendadas al Inicio</h3>
  
  <p><b>Evita gastar en:</b></p>
  <ul>
    <li><b>Paquetes de recursos</b> - Los recursos son fáciles de conseguir gratis.</li>
    <li><b>Aceleradores</b> - Los consigues en eventos.</li>
    <li><b>Diamantes directos</b> - Mejor valor con paquetes específicos.</li>
    <li><b>Héroes aleatorios</b> - Muy RNG (suerte), puede salir basura.</li>
  </ul>

  <p>Prioriza <b>Sophia + Constructor</b> antes que cualquier otra cosa.</p>

  <h3>🎯 Estrategia Post-Compra</h3>
  
  <p>Una vez tengas Sophia y el 2º constructor:</p>
  <ul>
    <li>Usa a <b>Sophia en todas tus construcciones importantes</b> (Sede, Laboratorio).</li>
    <li>Mantén <b>ambos constructores ocupados</b> todo el tiempo.</li>
    <li>Planifica qué construir con cada constructor (ej: Constructor 1 = Sede, Constructor 2 = Recursos).</li>
  </ul>

  <h3>💰 ¿Vale la pena para F2P?</h3>
  
  <p>Si tu presupuesto es <b>$0</b>, está bien. Puedes progresar sin gastar. Pero si puedes permitirte <b>$3 dólares una sola vez</b>, estas compras te darán el <b>mayor impacto</b> en tu experiencia de juego.</p>

  <p><b>Inversión única:</b> Son compras que haces <b>una sola vez</b> y te benefician <b>para siempre</b>. No son suscripciones ni gastos recurrentes.</p>

  <p><b>Conclusión:</b> Si vas a gastar dinero en este juego, que sea en Sophia ($1) y el 2º Constructor ($2). Todo lo demás puede esperar o conseguirse gratis. 💎</p>
`,  

tip8: `
  <h2>🔍 Localizar Bases Reconocidas</h2>
  <img src="img-tip-reconocimiento-1.jpg" alt="Informe de reconocimiento">
  
  <h3>❌ El Problema</h3>
  <p>Recibes o ves un <b>informe de reconocimiento compartido</b> en el chat de tu alianza. Puedes ver los recursos y tropas del enemigo, pero... <b>¿dónde está esa base en el mapa?</b></p>
  
  <p>Muchos jugadores pierden tiempo buscando manualmente en el mapa o preguntando "¿dónde queda X:324 Y:772?".</p>

  <h3>✅ La Solución (El Truco)</h3>
  
  <p><b>Paso 1:</b> Abre el informe de reconocimiento (desde tu correo o desde el chat compartido).</p>
  
  <p><b>Paso 2:</b> Debajo del nombre del jugador reconocido, verás las <b>coordenadas</b> (ejemplo: <b>X:324 Y:772</b>).</p>
  
  <p><b>Paso 3:</b> Haz <b>click directamente en esas coordenadas</b>.</p>
  
  <p><b>Resultado:</b> El mapa se moverá automáticamente y te llevará <b>directo a la ubicación exacta</b> de esa base. ¡No más búsquedas manuales!</p>

  <h3>💡 ¿Por qué es útil?</h3>
  
  <ul>
    <li><b>Coordinar ataques en alianza:</b> Todos pueden llegar rápido al objetivo.</li>
    <li><b>Verificar distancia:</b> Saber si te conviene atacar según qué tan lejos esté.</li>
    <li><b>Encontrar carnadas fáciles:</b> Localizar bases débiles rápidamente.</li>
    <li><b>Ahorrar tiempo:</b> No perder minutos buscando coordenadas en el mapa.</li>
  </ul>

  <h3>🎯 Consejo Extra</h3>
  
  <p>Si tu alianza comparte informes de reconocimiento frecuentemente, este truco te hará la vida <b>mucho más fácil</b>. Simplemente:</p>
  
  <ul>
    <li>Abre el informe compartido en el chat</li>
    <li>Click en las coordenadas</li>
    <li>Evalúa si vale la pena atacar</li>
  </ul>

  <p><b>Recuerda:</b> Las coordenadas son clickeables en cualquier informe de reconocimiento, ya sea del correo o compartido en chats. ¡Úsalo siempre!</p>
`,

tip9: `
  <h2>⚕️ Curación Eficiente con Ayuda de Alianza</h2>
  <img src="img-tip-curacion-1.jpg" alt="Hospital">
  
  <h3>❌ Error Común</h3>
  <p>Después de un combate o evento, muchos jugadores tienen tropas heridas en el Hospital y hacen esto:</p>
  
  <ul>
    <li>Seleccionan <b>"Curar todo"</b> (todas las tropas heridas a la vez)</li>
    <li>El tiempo de curación es <b>muy largo</b></li>
    <li>Terminan gastando <b>aceleradores</b> para terminar rápido</li>
  </ul>

  <p>Esto desperdicia aceleradores que podrías usar en situacciones de emergencias.</p>

  <h3>✅ La Estrategia Correcta: Curar por Lotes</h3>
  
  <p><b>Paso 1:</b> En el Hospital, <b>NO selecciones "Curar todo"</b>.</p>
  
  <p><b>Paso 2:</b> Verifica <b>cuántos miembros de tu alianza están activos</b> (en línea).</p>
  
  <p><b>Paso 3:</b> Selecciona un <b>lote pequeño de tropas heridas</b>. La cantidad depende de cuántos miembros activos hay en tu alianza:
  <ul>
    <li>Muchos miembros activos = puedes seleccionar un lote más grande</li>
    <li>Pocos miembros activos = selecciona un lote más pequeño</li>
  </ul>
  </p>
  
  <p><b>Paso 4:</b> Dale a <b>"Curar"</b>.</p>
  
  <p><b>Paso 5:</b> <b>Espera que tu alianza te ayude</b>. Cada ayuda reduce el tiempo de curación. Si el lote seleccionado es adecuado, la alianza puede ayudarte a <b>curar TODO ese lote completo</b>.</p>
  
  <p><b>Paso 6:</b> Observa qué tan rápido se cura:</p>
  <ul>
    <li><b>Si se cura rápido</b> (muchos miembros ayudando) → puedes curar un poco más en el siguiente lote</li>
    <li><b>Si se demora en curar</b> → reduce la cantidad de soldados</li>
  </ul>
  
  <p><b>Paso 7:</b> <b>Repite el proceso</b> hasta completar y curar todos tus heridos.</p>

  <h3>💡 ¿Por qué funciona?</h3>
  
  <p>Cuando curas <b>pequeños lotes</b>, el tiempo de curación es corto. Tu alianza puede ayudarte y <b>reducir ese tiempo considerablemente</b>. Esto te permite:</p>
  
  <ul>
    <li>Curar tropas <b>sin gastar aceleradores</b></li>
    <li>Aprovechar la <b>ayuda de tu alianza</b> al máximo</li>
    <li>Tener tus tropas listas más rápido sin gastar recursos valiosos</li>
  </ul>

  <h3>🎯 Mejor Momento para Usar Esta Estrategia</h3>
  
  <p><b>Después de eventos como "El Tirano":</b></p>
  <ul>
    <li>Muchos miembros de tu alianza están <b>conectados y activos</b></li>
    <li>Pueden ayudarte <b>inmediatamente</b></li>
    <li>Puedes curar todas tus tropas más rápido sin gastar nada</li>
  </ul>

  <img src="img-tip-curacion-2.jpg" alt="Miembros en línea">

  <h3>🔑 Factor Clave: Miembros Activos</h3>
  
  <p>El tamaño del lote que puedes curar eficientemente depende directamente de <b>cuántos miembros de tu alianza están activos</b> en ese momento.</p>
  
  <p><b>Más miembros en línea</b> = Más ayudas = Puedes curar lotes más grandes</p>
  <p><b>Menos miembros en línea</b> = Menos ayudas = Cura lotes más pequeños</p>

  <h3>⚠️ Consejos Importantes</h3>
  
  <p><b>✅ SÍ hacer:</b></p>
  <ul>
    <li>Curar después de eventos cuando hay muchos miembros activos</li>
    <li>Ajustar la cantidad según qué tan rápido recibes ayuda</li>
    <li>Ser paciente - ahorrarás muchos aceleradores a largo plazo</li>
    <li>Verificar la lista de miembros "En línea" antes de empezar</li>
  </ul>

  <p><b>❌ NO hacer:</b></p>
  <ul>
    <li>Curar todo de golpe si no tienes prisa</li>
    <li>Usar aceleradores si puedes esperar</li>
    <li>Ignorar la ayuda de tu alianza - ¡está ahí para algo!</li>
    <li>Seleccionar lotes muy grandes cuando hay pocos miembros activos</li>
  </ul>

  <h3>📝 Nota Importante</h3>
  
  <p>El tiempo de curación y la cantidad de tropas que puedes curar eficientemente también dependen de:</p>
  <ul>
    <li>Las <b>investigaciones de tu alianza</b></li>
    <li>Tus <b>refugiados</b></li>
    <li>Otros factores del juego</li>
  </ul>
  
  <p>Por eso es importante <b>ajustar dinámicamente</b> el tamaño de los lotes según veas qué tan rápido se curan.</p>

  <h3>🔥 Consejo Final</h3>
  
  <p>Los aceleradores son valiosos. Úsalos solo cuando realmente los necesites . Para curaciones, la ayuda de tu alianza es suficiente si tienes paciencia y seleccionas lotes adecuados. 💚</p>
`,

tip10: `
  <h2>🤝 Donación Rápida en Tecnologías de Alianza</h2>
  <img src="img-tip-donacion-1.jpg" alt="Tecnologías de alianza">
  
  <h3>❌ Lo que Muchos Hacen</h3>
  <p>Al donar en las <b>Tecnologías de Alianza</b>, la mayoría de jugadores hace clicks repetidamente en el botón "Donar", donando de <b>uno en uno</b>. Esto es lento e ineficiente.</p>

  <h3>✅ El Truco: Mantén Presionado</h3>
  
  <p>En lugar de hacer clicks individuales, <b>mantén presionado el botón de donar</b>. Esto activará <b>multiplicadores automáticos</b>:</p>
  <ul>
    <li>🔥 <b>x2</b> - Donas el doble</li>
    <li>🔥 <b>x5</b> - Donas 5 veces más</li>
    <li>🔥 <b>x10</b> - Donas 10 veces más</li>
  </ul>

  <img src="img-tip-donacion-2.jpg" alt="Multiplicadores activados">

  <h3>💡 Por Qué Funciona</h3>
  
  <ul>
    <li><b>Ahorras tiempo:</b> No necesitas hacer cientos de clicks.</li>
    <li><b>Tu alianza avanza más rápido:</b> Más donaciones completan tecnologías antes.</li>
    <li><b>Obtienes más puntos:</b> Acumulas puntos de contribución para comprar items en la Tienda de Alianza.</li>
    <li><b>Aprovechas mejor tus intentos:</b> Los intentos son limitados, los multiplicadores los hacen valer más.</li>
  </ul>
  
  <p><b>Consejo F2P:</b> Usa la donación con monedas y mantén presionado igual para activar los multiplicadores.</p>

  <h3>⚠️ Consejos</h3>
  
  <p><b>✅ SÍ hacer:</b></p>
  <ul>
    <li>Mantener presionado para activar multiplicadores</li>
    <li>Donar diariamente antes de que se reinicien los intentos</li>
    <li>Priorizar tecnologías que beneficien a toda la alianza</li>
  </ul>

  <p><b>❌ NO hacer:</b></p>
  <ul>
    <li>Hacer clicks individuales desperdiciando tiempo</li>
    <li>Olvidar donar - pierdes puntos valiosos para la Tienda de Alianza</li>
  </ul>

  <h3>🔥 Consejo Extra</h3>
  
  <p>Los puntos de contribución que ganas se usan en la <b>Tienda de Alianza</b> para comprar aceleradores, recursos, fragmentos de héroes y más. ¡Cuanto más dones, más puedes comprar!</p>

  <p><b>Recuerda:</b> Mantén presionado = Multiplicadores activados = Más eficiencia para ti y tu alianza. 🚀</p>
`,

tip11: `
  <h2>⚔️ Regreso Automático de Tropas</h2>
  <img src="img-tip-regreso-1.png" alt="Opciones de ataque">
  
  <h3>❌ Problema Común</h3>
  <p>Muchos jugadores atacan objetivos <b>(sedes, etc.)</b> y después de ganar, sus tropas <b>se quedan en el objetivo</b>. Esto significa que tienes que:</p>
  
  <ul>
    <li>Recordar que tus tropas están afuera</li>
    <li>Ir al mapa y buscar dónde quedaron</li>
    <li>Regresar las tropas <b>manualmente</b> cada vez</li>
  </ul>

  <p>Esto es tedioso y fácil de olvidar, especialmente si atacas múltiples objetivos.</p>

  <h3>✅ La Solución: Regreso Automático</h3>
  
  <p>Existe una opción que hace que tus tropas <b>regresen automáticamente</b> después de completar el ataque. Aquí está cómo activarla:</p>

  <p><b>Paso 1:</b> Haz click en el objetivo que quieres atacar (sede enemiga, zombie, etc.).</p>
  
  <p><b>Paso 2:</b> Te aparecerán 3 opciones:</p>
  <ul>
    <li>🔍 <b>Reconocer</b></li>
    <li>👥 <b>Equipo</b></li>
    <li>⚔️ <b>Ataque</b></li>
  </ul>
  
  <p><b>Paso 3:</b> Haz click en <b>"Ataque"</b>.</p>
  
  <p><b>Paso 4:</b> En el panel de ataque, <b>busca abajo</b> el casillero que dice <b>"Regreso automático"</b>.</p>
  
  <p><b>Paso 5:</b> <b>Asegúrate de que esté marcado</b> (con un ✓ check verde).</p>

  <img src="img-tip-regreso-2.png" alt="Regreso automático activado">
  
  <p><b>Paso 6:</b> Dale <b>"Marchar"</b> para enviar tu ataque.</p>

  <h3>💡 ¿Qué Pasa Ahora?</h3>
  
  <p>Una vez que actives el regreso automático:</p>
  
  <ul>
    <li>Tus tropas irán al objetivo</li>
    <li>Completarán el combate</li>
    <li><b>Regresarán automáticamente</b> a tu sede sin que tengas que hacer nada</li>
  </ul>
  
  <p>Verás un mensaje que dice: <b>"Regreso automático habilitado. Las tropas regresarán automáticamente a la sede después de completar el comando actual."</b></p>

  <h3>🎯 Ventajas</h3>
  
  <ul>
    <li><b>Ahorra tiempo:</b> No tienes que regresar tropas manualmente</li>
    <li><b>Evita olvidos:</b> No te quedan tropas abandonadas en el mapa</li>
    <li><b>Más eficiente:</b> Ideal cuando farmeas múltiples objetivos seguidos</li>
    <li><b>Tropas seguras:</b> Regresan inmediatamente, reduciendo riesgo de ser atacadas afuera</li>
  </ul>

  <h3>⚠️ Consejos Importantes</h3>
  
  <p><b>✅ SÍ hacer:</b></p>
  <ul>
    <li>Activar regreso automático <b>SIEMPRE</b> que ataques objetivos</li>
    <li>Verificar que el checkbox esté marcado antes de dar "Marchar"</li>
    <li>Usar esta opción especialmente cuando farmeas recursos</li>
  </ul>

  <p><b>❌ NO hacer:</b></p>
  <ul>
    <li>Olvidar activar el regreso automático - tus tropas se quedarán afuera</li>
    <li>Asumir que está activado por defecto - siempre verifica</li>
  </ul>

  <h3>🔥 Consejo Extra</h3>
  
  <p>Si estás farmeando múltiples objetivos, el regreso automático es <b>esencial</b>. Así puedes enviar ataques uno tras otro sin preocuparte de regresar tropas manualmente entre cada uno.</p>

  <p><b>Recuerda:</b> Revisa el checkbox "Regreso automático" antes de cada ataque. Este simple paso te ahorrará mucho tiempo y dolores de cabeza. ⚔️</p>
`,

tip12: `
    <h2>⚡ Refuerzo Rápido</h2>
    <img src="img-tip-refuerzo-1.jpg" alt="Refuerzo">
    <p>Si hay un <b>tesoro de tu alianza</b> que está un poco lejos, puedes llegar de forma más rápida <b>reforzando ciudad o bases</b> aliadas.</p>
    <p><b>¿Cómo funciona?</b></p>
    <ul>
      <li>Solo funciona <b>dentro de tu territorio de alianza</b>.</li>
      <li>La velocidad de refuerzo es <b>3x más rápida</b> que el movimiento normal.</li>
      <li>Ideal para llegar rápido a <b>eventos de alianza</b> o <b>puntos de reunión</b>.</li>
    </ul>
    <p><b>Consejo:</b> Usa esta mecánica para llegar primero a tesoros y obtener mejores recompensas.</p>
  `,

};

function openTipModal(tipId) {
  document.getElementById('tipModal').style.display = 'block';
  document.getElementById('tipModalBody').innerHTML = tipContent[tipId] || '<p>Contenido no disponible</p>';
  document.body.style.overflow = 'hidden';
}

function closeTipModal() {
  document.getElementById('tipModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
  const modal = document.getElementById('tipModal');
  if (event.target == modal) {
    closeTipModal();
  }
}

// Cerrar con tecla ESC
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeTipModal();
  }
});