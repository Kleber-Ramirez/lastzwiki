// ads.js — toda la publicidad de lastzwiki.com se administra desde aquí

// 1) BANNERS (enlace de seguimiento obligatorio según el acuerdo con BuffHub, cláusula 3.1)
const ADS = {
  top: [
    {
      desktop: "/ads-buff/1-desktop.webp",
      movil:   "/ads-buff/1-mobile.webp",
      link:    "https://buffhub.com/a/lastzwiki"
    },
    // BANNER 2 DESACTIVADO: dice "up to 30% off" y la página de BuffHub solo muestra ~13%.
    // Para activarlo cuando BuffHub confirme la oferta, quita las barras // de las 5 líneas siguientes.
    // {
    //   desktop: "/ads-buff/2-desktop.webp",
    //   movil:   "/ads-buff/2-mobile.webp",
    //   link:    "https://buffhub.com/a/lastzwiki"
    // },
    {
      desktop: "/ads-buff/3-desktop.webp",
      movil:   "/ads-buff/3-mobile.webp",
      link:    "https://buffhub.com/a/lastzwiki"
    }
  ]
};

// 2) TEXTOS POR IDIOMA (se detecta por la carpeta /en/ o /pt/)
const TEXTOS = {
  es: { etiqueta: "Publicidad · Ad",  alt: "Recarga Last Z en BuffHub" },
  en: { etiqueta: "Ad · Sponsored",   alt: "Top up Last Z on BuffHub" },
  pt: { etiqueta: "Publicidade · Ad", alt: "Recarregue Last Z na BuffHub" }
};

const IDIOMA = location.pathname.startsWith("/en/") || location.pathname === "/en" ? "en"
             : location.pathname.startsWith("/pt/") || location.pathname === "/pt" ? "pt"
             : "es";

// 3) CREAR EL BANNER
function crearBanner(ad, posicion) {
  const t = TEXTOS[IDIOMA];
  const div = document.createElement("div");
  div.className = "ad-banner ad-" + posicion;
  div.innerHTML = `
    <span class="ad-label">${t.etiqueta}</span>
    <a href="${ad.link}" target="_blank" rel="sponsored nofollow noopener">
      <picture>
        <source media="(max-width: 767px)" srcset="${ad.movil}" width="640" height="200">
        <img src="${ad.desktop}" alt="${t.alt}" width="1456" height="180">
      </picture>
    </a>`;
  return div;
}

// 4) INSERTAR EN LA PÁGINA
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".ad-banner")) return; // evita duplicados

  const elegir = lista => lista[Math.floor(Math.random() * lista.length)];
  const slot = document.getElementById("ad-slot");

  // Si el marcador trae data-ad="3", se usa ese banner fijo; si no, uno al azar
  const fijo = slot && parseInt(slot.dataset.ad, 10);
  if (!slot) return; // sin marcador, no hay banner

  const ad = (fijo && ADS.top[fijo - 1]) ? ADS.top[fijo - 1] : elegir(ADS.top);
  const banner = crearBanner(ad, "top");

  // Solo se muestra donde la página tiene el marcador <div id="ad-slot"></div>.
  // Sin marcador no se inserta nada (el acuerdo limita el banner a las 44 páginas pactadas, cláusula 3.3).
  if (slot) slot.replaceWith(banner);
});