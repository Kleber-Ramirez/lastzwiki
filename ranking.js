/* =============================================
   RANKING — Last Z Wiki
   Conectado a Google Sheets via CSV público

   SHEET SERVIDORES columnas:
   A=servidor, B=estrellas, C=alianza1, D=poder1,
   E=alianza2, F=poder2, G=alianza3, H=poder3,
   I=alianza4, J=poder4, K=alianza5, L=poder5,
   M=alianza6, N=poder6, O=alianza7, P=poder7,
   Q=alianza8, R=poder8, S=poder_total,
   T=alianza_lider, U=estado

   SHEET JUGADORES columnas:
   A=jugador, B=servidor, C=alianza,
   D=poder_personal, E=poder_heroes, F=estado
   ============================================= */

const SHEET_SERVIDORES = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT0VlmfLgmTn3VfXLkK8Ua7Rw4mjrX6empGVLs9QsvuLqCy-bVo06iGC1HmovE7A_SpYH1svTP-aqb-/pub?gid=0&single=true&output=csv";
const SHEET_JUGADORES  = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT0VlmfLgmTn3VfXLkK8Ua7Rw4mjrX6empGVLs9QsvuLqCy-bVo06iGC1HmovE7A_SpYH1svTP-aqb-/pub?gid=257510325&single=true&output=csv";
const FORM_URL         = "https://docs.google.com/forms/d/e/1FAIpQLSdo22OPL4L-9EjGeVJ1Dzv8FF4aAQmGxJ7C_WNoPVyWMMWJRA/viewform";
const FORM_URL_JUGADORES = "https://docs.google.com/forms/d/e/1FAIpQLSfGQo4_yv8S7XwaBJO9JHVGPxAwMaRsSzulglzjRfsnBgQmtQ/viewform";

/* ---- Datos de ejemplo (usados si Sheets falla o está vacío) ---- */

const EJEMPLO_SERVIDORES = [
  { servidor:"S45",  estrellas:5, poder_total:98500000, alianza_lider:"OMEGA" },
  { servidor:"S12",  estrellas:5, poder_total:87300000, alianza_lider:"NEXUS" },
  { servidor:"S160", estrellas:3, poder_total:76400000, alianza_lider:"ALPHA" },
  { servidor:"S88",  estrellas:3, poder_total:71200000, alianza_lider:"TITAN" },
  { servidor:"S203", estrellas:2, poder_total:65800000, alianza_lider:"VENOM" },
  { servidor:"S7",   estrellas:2, poder_total:60100000, alianza_lider:"STORM" },
  { servidor:"S321", estrellas:1, poder_total:54300000, alianza_lider:"BLAZE" },
  { servidor:"S99",  estrellas:1, poder_total:48700000, alianza_lider:"GHOST" },
];

const EJEMPLO_JUGADORES = [
  { jugador:"DarkLord99",  servidor:"S45",  alianza:"OMEGA", poder_personal:12500000, poder_heroes:8200000 },
  { jugador:"XxHyperxX",   servidor:"S12",  alianza:"NEXUS", poder_personal:11800000, poder_heroes:9100000 },
  { jugador:"ZombieKing",  servidor:"S160", alianza:"ALPHA", poder_personal:10900000, poder_heroes:7800000 },
  { jugador:"ShadowBlade", servidor:"S88",  alianza:"TITAN", poder_personal:10200000, poder_heroes:8900000 },
  { jugador:"IronWolf",    servidor:"S203", alianza:"VENOM", poder_personal:9800000,  poder_heroes:7200000 },
  { jugador:"CrimsonAce",  servidor:"S7",   alianza:"STORM", poder_personal:9300000,  poder_heroes:8100000 },
  { jugador:"NightFury",   servidor:"S321", alianza:"BLAZE", poder_personal:8700000,  poder_heroes:6500000 },
  { jugador:"PhantomX",    servidor:"S99",  alianza:"GHOST", poder_personal:8100000,  poder_heroes:7700000 },
  { jugador:"TitanSlayer", servidor:"S112", alianza:"NOVA",  poder_personal:7600000,  poder_heroes:6900000 },
  { jugador:"VenomStrike", servidor:"S55",  alianza:"RAZOR", poder_personal:7200000,  poder_heroes:5800000 },
];

/* ---- Utilidades ---- */

function formatPoder(n) {
  return Number(n).toLocaleString("es-ES");
}

function numServidor(s) {
  return parseInt(String(s).replace(/\D/g, "")) || 0;
}

function parsearCSV(csv) {
  const lineas = csv.trim().split("\n").slice(1);
  return lineas
    .map(l => l.split(",").map(c => c.trim().replace(/^"|"$/g, "")))
    .filter(c => c.length > 1 && c[0] !== "");
}

function estrellas(n) {
  const num = parseInt(n) || 0;
  return num > 0 ? "⭐".repeat(Math.min(num, 10)) : "—";
}

/* ============================================
   SERVIDORES
   ============================================ */

let todosServidores = [];
let filtroServidores = "global";

function renderServidores(datos) {
  // Ordenar: primero estrellas desc, luego poder_total desc
  datos.sort((a, b) => {
    if (b.estrellas !== a.estrellas) return b.estrellas - a.estrellas;
    return b.poder_total - a.poder_total;
  });
  todosServidores = datos;
  aplicarFiltroServidores(filtroServidores);
}

function aplicarFiltroServidores(rango) {
  filtroServidores = rango;
  const tbody = document.getElementById("tbody-servidores");
  tbody.innerHTML = "";

  let filtrados;
  if (rango === "global") {
    filtrados = todosServidores;
  } else {
    const [min, max] = rango.split("-").map(Number);
    filtrados = todosServidores.filter(s => {
      const n = numServidor(s.servidor);
      return n >= min && n <= max;
    });
  }

  if (!filtrados.length) {
    document.getElementById("sin-datos-servidores").classList.remove("hidden");
    return;
  }
  document.getElementById("sin-datos-servidores").classList.add("hidden");

  filtrados.forEach((row, i) => {
    const tr = document.createElement("tr");
    tr.classList.add("animate");
    tr.innerHTML = `
      <td class="pos">${i + 1}</td>
      <td>${row.servidor}</td>
      <td class="estrellas-col">${estrellas(row.estrellas)}</td>
      <td>${formatPoder(row.poder_total)}</td>
      <td>${row.alianza_lider}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ============================================
   JUGADORES
   ============================================ */

let todosJugadores    = [];
let filtroJugadores   = "global";
let subFiltroJugador  = "personal"; // "personal" o "heroes"

function renderJugadores(datos) {
  todosJugadores = datos;
  aplicarFiltroJugadores(filtroJugadores, subFiltroJugador);
}

function aplicarFiltroJugadores(rango, subfiltro) {
  filtroJugadores  = rango;
  subFiltroJugador = subfiltro;

  // Ordenar según subfiltro
  const campo = subfiltro === "heroes" ? "poder_heroes" : "poder_personal";
  const sorted = [...todosJugadores].sort((a, b) => b[campo] - a[campo]);

  // Filtrar por rango de servidor
  let filtrados;
  if (rango === "global") {
    filtrados = sorted;
  } else {
    const [min, max] = rango.split("-").map(Number);
    filtrados = sorted.filter(j => {
      const n = numServidor(j.servidor);
      return n >= min && n <= max;
    });
  }

  const tbody = document.getElementById("tbody-jugadores");
  tbody.innerHTML = "";

  if (!filtrados.length) {
    document.getElementById("sin-datos-jugadores").classList.remove("hidden");
    return;
  }
  document.getElementById("sin-datos-jugadores").classList.add("hidden");

  // Cabecera dinámica según subfiltro
  const thPoder = document.getElementById("th-poder-jugador");
  thPoder.textContent = subfiltro === "heroes" ? "Poder Héroes" : "Poder Personal";

  filtrados.forEach((row, i) => {
    const poder = subfiltro === "heroes" ? row.poder_heroes : row.poder_personal;
    const tr = document.createElement("tr");
    tr.classList.add("animate");
    tr.innerHTML = `
      <td class="pos">${i + 1}</td>
      <td>${row.jugador}</td>
      <td>${row.servidor}</td>
      <td>${row.alianza}</td>
      <td>${formatPoder(poder)}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ============================================
   FILTROS DE RANGO (reutilizable)
   ============================================ */

function crearFiltrosRango(contenedorId, onSelect) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";

  const btnGlobal = document.createElement("button");
  btnGlobal.textContent = "Global";
  btnGlobal.classList.add("active");
  btnGlobal.addEventListener("click", () => {
    contenedor.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btnGlobal.classList.add("active");
    onSelect("global");
  });
  contenedor.appendChild(btnGlobal);

  for (let i = 1; i <= 800; i += 100) {
    const max = Math.min(i + 99, 800);
    const btn = document.createElement("button");
    btn.textContent = `S${i}–S${max}`;
    btn.dataset.rango = `${i}-${max}`;
    btn.addEventListener("click", () => {
      contenedor.querySelectorAll("button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      onSelect(btn.dataset.rango);
    });
    contenedor.appendChild(btn);
  }
}

/* ============================================
   CARGA DE DATOS DESDE SHEETS
   ============================================ */

async function cargarDatos() {
  try {
    // Servidores
    const resS = await fetch(SHEET_SERVIDORES);
    const csvS = await resS.text();
    const filasS = parsearCSV(csvS)
      .filter(c => c[19] && c[19].toLowerCase().trim() === "aprobado")
      .map(c => ({
        servidor:      c[0],
        estrellas:     parseInt(c[1]) || 0,
        alianza_lider: c[2],  // alianza1 = columna C = índice 2
        poder_total:   parseInt(String(c[18]).replace(/\D/g, "")) || 0
      }));

    if (filasS.length > 0) {
      renderServidores(filasS);
    } else {
      renderServidores(EJEMPLO_SERVIDORES);
    }

    // Jugadores
    const resJ = await fetch(SHEET_JUGADORES);
    const csvJ = await resJ.text();
    const filasJ = parsearCSV(csvJ)
      .filter(c => c[5] && c[5].toLowerCase().trim() === "aprobado")
      .map(c => ({
        jugador:        c[0],
        servidor:       c[1],
        alianza:        c[2],
        poder_personal: parseInt(String(c[3]).replace(/\D/g, "")) || 0,
        poder_heroes:   parseInt(String(c[4]).replace(/\D/g, "")) || 0,
      }));

    if (filasJ.length > 0) {
      renderJugadores(filasJ);
    } else {
      renderJugadores(EJEMPLO_JUGADORES);
    }

  } catch (e) {
    console.error("Error cargando Sheets, usando datos de ejemplo:", e);
    renderServidores(EJEMPLO_SERVIDORES);
    renderJugadores(EJEMPLO_JUGADORES);
  }
}

/* ============================================
   TABS PRINCIPALES
   ============================================ */

document.querySelectorAll(".ranking-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".ranking-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    document.querySelectorAll(".tab-content").forEach(s => s.classList.add("hidden"));
    document.getElementById("tab-" + tab.dataset.tab).classList.remove("hidden");
  });
});

/* ============================================
   SUB-FILTRO JUGADORES (Personal / Héroes)
   ============================================ */

document.querySelectorAll(".subfiltro-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".subfiltro-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    aplicarFiltroJugadores(filtroJugadores, btn.dataset.subfiltro);
  });
});

/* ============================================
   LINK FORMULARIO
   ============================================ */

document.querySelectorAll(".btn-reportar").forEach(btn => {
  if (btn.closest("#tab-jugadores")) {
    btn.href = FORM_URL_JUGADORES;
  } else {
    btn.href = FORM_URL;
  }
});

/* ============================================
   INIT
   ============================================ */

crearFiltrosRango("filtros-servidores", (rango) => aplicarFiltroServidores(rango));
crearFiltrosRango("filtros-jugadores",  (rango) => aplicarFiltroJugadores(rango, subFiltroJugador));
cargarDatos();