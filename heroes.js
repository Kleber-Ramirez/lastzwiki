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

const detalle = document.getElementById('detalleHeroe');
const nombreHeroe = document.getElementById('nombre-heroe');
const nivelHeroe = document.getElementById('nivel-heroe');

const imgHabilidad = document.getElementById('img-habilidad');
const imgEstrellas = document.getElementById('img-estrellas');

const switchBtns = document.querySelectorAll('.btn-switch');
const infoDerecha = document.getElementById('infoHabilidad');

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
    detalle.classList.add('hidden');

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

      clone.addEventListener('click', () => {
        card.click();
      });

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
// ✅ ESTO YA ESTÁ DENTRO DE inicializarHeroes(), no necesita otro DOMContentLoaded
const btnAll = document.querySelector('.btn-cat[data-category="all"]');
if (btnAll) btnAll.click();

/* ===============================
   DATA DE HEROES
================================ */

const heroesData = {

/* Rosa*/
  oliveira: {
    imgHabilidad: "img-heroe-oliveira2.webp",
    imgEstrellas: "img-heroe-oliveira-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Golpe Fatal·Lv 20/20",
        descripcion: `
        Factor de daño de ataque normal aumentado a 1083 (→1103)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Tormenta de Hojas·Lv 20/20",
        descripcion: `
        Coloca un cabezal cortador giratorio en la ubicación designada,
        infligiendo daño <br> a los enemigos de corto alcance(Factor de Daño:
        1686(->1727) durante 4 segundos <br>
        ⭐ Coeficiente de daño adicional +150<br>
        ⭐⭐ Duración +1seg<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150<br>
        ⭐⭐⭐⭐ Inflige un efecto de sangrado adicional.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +340
      `
      },
      3: {
        titulo: "3.Chica Prodigio·Lv 20/20",
        descripcion:  `
        La velocidad de entrenamiento del cuartel de Asaltantes aumenta en un 59.7(->60.7)%.<br>
        ⭐ Velocidad de entrenamiento +20%<br>
        ⭐⭐ Defensa de la unidad de Asalto +10%<br>
        ⭐⭐⭐ Reducción de consumo de recursos en el entrenamiento de la unidad de Asalto -5%<br>
        ⭐⭐⭐⭐ Ataque de la unidad de Asalto + 10%<br>
        ⭐⭐⭐⭐⭐ El Efecto de mejora de Ataque y Defensa se Aplica a todas las unidades.
      `
      },
      4: {
        titulo: "4.Potencial Desatado·Lv 1/1",
        descripcion:   `
      Cada 1 héroe del campamento Rosa Sangrienta en el campo de <br>
      batalla aumenta el ataque y defensa de las tropas en +5%.<br>
      Además al desplegar 5 héroes del Campamento Rosa Sangrienta,<br>
       la capacidad de las tropas aumenta un 10% adicional.
      `
      }
    }
  },

  lysia: {
    imgHabilidad: "img-heroe-lysia2.webp",
    imgEstrellas: "img-heroe-lysia-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Desgarro de Garras Feroces ·Lv 20/20.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 1734(→1761)<br>
        ⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +150<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      2: {
        titulo: "2.Incursión de Sombras ·Lv 13/30",
        descripcion: `
        Se tranforma en una sombra y aparece detrás del enemigo
        para lanzar <br>tres ataques con garras, Coeficiente de daño:2262(->2317).<br>
        ⭐ Coeficiente de daño adicional +200.<br>
        ⭐⭐ Número de Golpes de garras +1.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +200.<br>
        ⭐⭐⭐⭐ Número de Golpes de garras +1..<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +400
      `
      },
      3: {
        titulo: "3.Sombra Inseparable ·Lv 20/30",
        descripcion:  `
        Capacidad de tropas aumentada en
         <br>69.3(->71.4)%.<br>
        ⭐ Ataque del héroe +2%, defensa +2%.<br>
        ⭐⭐ Ataque del héroe +3%, defensa +3%.<br>
        ⭐⭐⭐ Ataque del héroe +5%, defensa +5%.<br>
        ⭐⭐⭐⭐ Ataque del héroe +5%, defensa +5%.<br>
        ⭐⭐⭐⭐⭐ Ataque del héroe +5%, defensa +5%.
      `
      },
      4: {
        titulo: "4.Paso llusorio Felino ·Lv 1/1",
        descripcion:   `
        Cuando se despliega con Bella, las unidades de Asalto del<br> 
        escuadrón reciben un bono de resistencia al daño del 7.5%.<br>
        Al alcanzar 5 estrellas,el efecto se aplica a todos los tipos de<br>
        unidad, y ala capacidad del escuadrón aumenta un 7.5%.
      `
      }
    }
  },

  bella: {
    imgHabilidad: "img-heroe-bella2.webp",
    imgEstrellas: "img-heroe-bella-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Impacto Letal del Apocalipsis·Lv 20/20",
        descripcion: `
        Factor de daño de ataque normal aumentado a 1083 (→1103)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Furia Pacificadora·Lv 20/20",
        descripcion: `
        Una estampida imparable que aplasta a los enemigos y causa daño de ,
        en área,<br> Coeficiente de daño  1686(->1727)<br>
        ⭐ Coeficiente de daño adicional +150<br>
        ⭐⭐ Duración +1seg<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150<br>
        ⭐⭐⭐⭐ Número de pisoteos +2.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Orden del Sol Ardiente ·Lv 20/20",
        descripcion:  `
        Vida de los asaltantes liderados +11.6(->11.9)%.<br>
        ⭐ Daño de la unidad de asalto +2%<br>
        ⭐⭐ Daño de la unidad de asalto +3%.<br>
        ⭐⭐⭐ Daño de la unidad de asalto +5%.<br>
        ⭐⭐⭐⭐ Daño de la unidad de asalto +5%.<br>
        ⭐⭐⭐⭐⭐ Daño de la unidad de asalto +10%.
      `
      },
      4: {
        titulo: "4.Brillo Sagrado Eterno·Lv 1/1",
        descripcion:   `
      Al desplegar 5 héroes de Rosa Sangrienta, vida de trop +10%..
      `
      }
    }
  },

  sofia: {
    imgHabilidad: "img-heroe-sofia2.webp",
    imgEstrellas: "img-heroe-sofia-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Cazador del Apocalipsis·Lv 20/20",
        descripcion: `
        Factor de daño de ataque normal aumentado a 1083 (→1103)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Locura Apocalíptica·Lv 20/20",
        descripcion: `
        Llama a las fuerzas móviles para un ataque contundente en la zona
        objetivo,<br> Coeficiente de daño: 1686(->1727)<br>
        ⭐ Coeficiente de daño adicional +150<br>
        ⭐⭐ Cantidad de unidades de apoyo +2<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150<br>
        ⭐⭐⭐⭐ Cantidad de unidades de apoyo +3.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Regalo de Señorita·Lv 20/20",
        descripcion:  `
        El tiempo de construción aumenta en 90 minutos y la velocidad
        de construcción <br> aumenta en un 33.1(->33.8)%.<br>
        ⭐ Tiempo de Construcción Gratuito +15 min<br>
        ⭐⭐ Velocidad de Construcción +10%<br>
        ⭐⭐⭐ Tiempo de Construcción Gratuito +60 min.<br>
        ⭐⭐⭐⭐ Consumo de recursos para construcción -5%.<br>
        ⭐⭐⭐⭐⭐ Consumo de recursos para construcción -10%.
      `
      },
      4: {
        titulo: "4.Potencial Desatado ·Lv 1/1",
        descripcion:   `
      Ataque propio +10%, Defensa +10%,<br> Capacidad de las tropas +5%
      `
      }
    }
  },

  katrina: {
    imgHabilidad: "img-heroe-katrina2.webP",
    imgEstrellas: "img-heroe-katrina-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Bala Explosiva ·Lv 20/20",
        descripcion: `
        Factor de daño de ataque normal aumentado a 1083 (→1103)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Asalto Total ·Lv 20/20",
        descripcion: `
        Ordena a las tropas élite que disparan a máxima potencia,
        <br> Coeficiente de daño: 1686(->1727), duración de 6 segundos.<br>
        ⭐ Coeficiente de daño adicional +150<br>
        ⭐⭐ Duración +1 segundo<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150<br>
        ⭐⭐⭐⭐ Duración +2 segundo.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Genio de Exploración ·Lv 20/20",
        descripcion:  `
        La EXP de inactividad en niveles de exploración
         <br> aumenta en un 33.1(->33.8)%.<br>
        ⭐ Obtén gratuitamente 100 de combustible cada dia.<br>
        ⭐⭐ EXP AFK de Etapa +5%.<br>
        ⭐⭐⭐ EXP AFK de Etapa +5%<.<br>
        ⭐⭐⭐⭐ Velocidad de Resturación de Combustible +10%.<br>
        ⭐⭐⭐⭐⭐ EXP AFK de Etapa +10%.
      `
      },
      4: {
        titulo: "4.Activación de potencial ·Lv 1/1",
        descripcion:   `
      Ataque propio +10%, Defensa +10%,<br> Capacidad de las tropas +5%.
      `
      }
    }
  },  

  selena: {
    imgHabilidad: "img-heroe-selena2.webp",
    imgEstrellas: "img-heroe-selena-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Herida Desgarradora ·Lv 20/20",
        descripcion: `
        Factor de daño de ataque normal aumentado a 1083 (→1103)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Invocación Salvaje ·Lv 20/20",
        descripcion: `
        El oso de combate ataca hacia adelante, al encontrarse con
        el enemigo,<br> golpea el suelo causando daño en área
        Coeficiente de daño: 1686(->1727).<br>
        ⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐ Rango de daño +30%.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐⭐⭐ Número de golpes +2.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Fuerza Natural ·Lv 20/20",
        descripcion:  `
        La defensa de las unidades de asalto lideradas 
         <br> aumenta en un 34.7(->35.7)%.<br>
        ⭐ Ataque de la unidad de asalto +5%.<br>
        ⭐⭐ Ataque de la unidad de asalto +5%.<br>
        ⭐⭐⭐ Ataque de la unidad de asalto +10%<.<br>
        ⭐⭐⭐⭐ Ataque de la unidad de asalto +10%.<br>
        ⭐⭐⭐⭐⭐ Ataque de la unidad de asalto +15%.
      `
      },
      4: {
        titulo: "4.Despertar de potencial ·Lv 1/1",
        descripcion:   `
      Independientemente de si Selena va a la batalla,<br>
      el daño de todas las tropas de asalto aumenta un 10%.
      `
      }
    }
  },    

  vivian: {
    imgHabilidad: "img-heroe-vivian2.webp",
    imgEstrellas: "img-heroe-vivian-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Carta Mágica. ·Lv 30/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 750<br>
        ⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +105
      `
      },
      2: {
        titulo: "2.Arte de las Cartas ·Lv 30/30",
        descripcion: `
        Controla sus cartas para atacar enemigos en un área circular,<br>
        Coeficiente de daño:1280, duración de 3 segundos.<br>
        ⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐⭐ Rango de daño +30%.<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +200.<br>
        ⭐⭐⭐⭐⭐ Duración 1 segundo.
      `
      },
      3: {
        titulo: "3.Nacido del Fuego ·Lv 30/30",
        descripcion:  `
        Al combatir zombis en el exterior, el daño<br>
        causado por tu tropa aumenta en un 30%.<br>
        ⭐ Consumo de combustible -1.<br>
        ⭐⭐ Consumo de combustible -1.<br>
        ⭐⭐⭐ El consumo de combustible al desafiar al zombie.<br>
                gigante se reduce en 2.
        ⭐⭐⭐⭐ Daño infligido +10%.<br>
        ⭐⭐⭐⭐⭐ El efecto se aplica a todas las formaciones,<br>
        independientemente de si vivian participa en la expedición o no.
      `
      },
      4: {
        titulo: "4.Especialización en el Exterior ·Lv 1/1",
        descripcion:   `
        Múltiples unidades pueden atacar al mismo <br>
        zombi en el campo.
      `
      }
    }
  },

  miranda: {
    imgHabilidad: "img-heroe-miranda2.webp",
    imgEstrellas: "img-heroe-miranda-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Balas Perforantes. ·Lv 20/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 646(->656).<br>
        ⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +105
      `
      },
      2: {
        titulo: "2.Disparo Rápido ·Lv 13/30",
        descripcion: `
        Disparo furioso hacia los enemigos al frente,<br>
        Coeficiente de daño:929(->949), con una probabilidad.<br>
        de aturdir al objetivo.<br>
        ⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐⭐ Posibilidades de aturdimiento aumentadas.<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +200.<br>
        ⭐⭐⭐⭐⭐ Duración de aturdimiento +1 segundo.
      `
      },
      3: {
        titulo: "3.Experto en Defensa ·Lv 30/30",
        descripcion:  `
        Aumenta la defensa propia en 1400.<br>
        ⭐ Defensa +50<br>
        ⭐⭐ Defensa +50.<br>
        ⭐⭐⭐ Defensa +100.<br>
        ⭐⭐⭐⭐ Defensa +200.<br>
        ⭐⭐⭐⭐⭐ Defensa +300.<br>
      `
      },
      4: {
        titulo: "4.Especialización en el Exterior ·Lv 1/1",
        descripcion:   `
        DEF de héroe de la facción Rosa de Sangre +10%.
      `
      }
    }
  },
 
  eva: {
    imgHabilidad: "img-heroe-eva2.webp",
    imgEstrellas: "img-heroe-eva-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Reacción Química. ·Lv 5/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 491(->501).<br>
        ⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +105
      `
      },
      2: {
        titulo: "2.Reactivo Peligroso ·Lv 6/30",
        descripcion: `
        Lanza productos químicos peligrosos al área designada,<br>
        infligiendo un daño masivo a los enmigos (Factor de Daño:803(->824)).<br>
        ⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐⭐ Tiene posibilidades de causar adicionalmente.<br>
                daño de veneno.
        ⭐⭐⭐⭐ Coeficiente de daño adicional +200.<br>
        ⭐⭐⭐⭐⭐ Efecto de veneno potenciado.
      `
      },
      3: {
        titulo: "3.Experto en Ataque ·Lv 17/30",
        descripcion:  `
        Incremento de ataque porpio en 1175.9(->1193.1).<br>
        ⭐ Ataque +50<br>
        ⭐⭐ Ataque +50.<br>
        ⭐⭐⭐ Ataque +100.<br>
        ⭐⭐⭐⭐ Ataque +200.<br>
        ⭐⭐⭐⭐⭐ Ataque +300.<br>
      `
      },
      4: {
        titulo: "4.Ataque de la Facción ·Lv 1/1",
        descripcion:   `
        ATQ de héroe de la facción Rosa de Sangre +10%.
      `
      }
    }
  }, 

  audrey: {
    imgHabilidad: "img-heroe-audrey2.webp",
    imgEstrellas: "img-heroe-audrey-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Puño Furioso. ·Lv 30/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 500.<br>
        ⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +40<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +70
      `
      },
      2: {
        titulo: "2.Impacto de Muay Thai ·Lv 20/30",
        descripcion: `
        Saca el arma para atacar a los enemigos,<br>
        (Factor de Daño:862(->875)).<br>
        ⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +80.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +140.<br>
      `
      },
      3: {
        titulo: "3.Bien Entrenado ·Lv 30/30",
        descripcion:  `
        Velocidad de entrenamiento de Tropas +30%.<br>
        ⭐ Velocidad de entrenamiento de Tropas +2%.<br>
        ⭐⭐ Velocidad de entrenamiento de Tropas +2%.<br>
        ⭐⭐⭐ Velocidad de entrenamiento de Tropas +3%.<br>Ataque +100.<br>
        ⭐⭐⭐⭐ Velocidad de entrenamiento de Tropas +3%.<br>
        ⭐⭐⭐⭐⭐ Velocidad de entrenamiento de Tropas +5%.<br>
      `
      },
      4: {
        titulo: "4.Defensa de Facción ·Lv 1/1",
        descripcion:   `
        DEF de héroe de la facción Rosa de Sangre +5%.
      `
      }
    }
  },

  giselle: {
    imgHabilidad: "img-heroe-giselle2.webp",
    imgEstrellas: "img-heroe-giselle-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Palanca de Aleación. ·Lv 20/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 431(->437).<br>
        ⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +40<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +70.
      `
      },
      2: {
        titulo: "2.Impacto de Palanca ·Lv 20/30",
        descripcion: `
        Balancea el arma, infligiendo daño a los enmigos en el<br>
        área en forma de abanico al frente(Factor de Daño:862(->875)).<br>
        ⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +80.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +140.<br>
      `
      },
      3: {
        titulo: "3.Maestría en Recolección:Madera ·Lv 30/30",
        descripcion: `
        La velocidad de recolección de madera aumenta en un 45%,<br>
        y la producción de madera aumenta en un 30%.<br>
        ⭐ Velocidad de recolección de madera +3%<br>
        ⭐⭐ Producción de madera +15%.<br>
        ⭐⭐⭐ Velocidad de recolección de madera +6%.<br>
        ⭐⭐⭐⭐ Producción de recursos +20%.<br>
        ⭐⭐⭐⭐⭐ Velocidad de recolección +15%.<br>
      `
      },
      4: {
        titulo: "4.Ataque de la Facción ·Lv 1/1",
        descripcion: `
        ATQ de héroe de la facción Rosa de Sangre +5%.
      `
      }
    }
  },
  /* Alba*/
  nyx: {
    imgHabilidad: "img-heroe-nyx2.webp",
    imgEstrellas: "img-heroe-nyx-estrellas.webp",
    habilidades: {
      1: {
        titulo: "Habilidad 1 · Lv 1/20",
        descripcion: "Nyx lanza un proyectil oscuro que causa daño explosivo."
      },
      2: {
        titulo: "Habilidad 2 · Lv 1/20",
        descripcion: "Incrementa la penetración de armadura contra enemigos blindados."
      },
      3: {
        titulo: "Habilidad 3 · Lv 1/20",
        descripcion: "Aumenta la cadencia de disparo durante un corto periodo."
      },
      4: {
        titulo: "Habilidad 4 · Lv 1/20",
        descripcion: "Otorga un aumento general de ataque al equipo."
      }
    }
  },

  alma: {
    imgHabilidad: "img-heroe-alma2.webp",
    imgEstrellas: "img-heroe-alma-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Bala Dorada Letal. ·Lv 15/15.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 859(→880)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Corrupción Dorada ·Lv 15/15",
        descripcion: `
        La Serpiente Dorada danza frenéticamente, mordiendo a los enemigos y
        envenenando <br> a muchos de ellos Coeficiente de daño:2262(->2317).<br>
        ⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐ Cantidad de Víbora +1.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐⭐⭐ Cantidad de Víbora +1.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Decreto de la Escama Púrpura ·Lv 15/15",
        descripcion: `
        Vida de los tiradores liderados +9.8(->10.2)%.<br>
        ⭐ Daño de la unidad de arqueros +2%.<br>
        ⭐⭐ Daño de la unidad de arqueros +3%.<br>
        ⭐⭐⭐ Daño de la unidad de arqueros +5%.<br>
        ⭐⭐⭐⭐ Daño de la unidad de arqueros +5%.<br>
        ⭐⭐⭐⭐⭐ Daño de la unidad de arqueros +10%.
      `
      },
      4: {
        titulo: "4.Poder del Oro Negro ·Lv 1/1",
        descripcion: `
        Al desplegar 5 héroes de Alas del Alba,<br>
        Vida de tropa+10%.
      `
      }
    }
  },

  scarlett: {
    imgHabilidad: "img-heroe-scarlett2.webp",
    imgEstrellas: "img-heroe-scarlett-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Asalto de Sombras. ·Lv 20/20.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 1083(→1103)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Pulso EM ·Lv 20/20",
        descripcion: `
        Carga el arma con electricidad,liberando un poderoso pulso de  energía 
        <br> hacia adelante (Factor de daño:1686(->1727).<br>
        ⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐ Divide pulso de energía en 2 partes.<br>
                 reduciendo el daño en un 30%.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐⭐⭐ Número de pulsos de energía +1.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Poder de Dominación ·Lv 20/20",
        descripcion: `
        La velocidad de entrenamiento del Cuartel <br>
        de Tiradores aumenta en un 59.7(->60.7)%.<br>
        ⭐ Velocidad de entrenamiento  +20%.<br>
        ⭐⭐ Defensa de la unidad de arqueros +10%.<br>
        ⭐⭐⭐ Reducción de consumo de recursos en el <br>
                entrenamiento de la unidad de arqueros -5%.<br>
        ⭐⭐⭐⭐ Ataque de la unidad de arqueros +10%.<br>
        ⭐⭐⭐⭐⭐ El efecto de mejora de ataque y defensa 
        <br>         se aplican a todas las unidades +10%.
      `
      },
      4: {
        titulo: "4.Potencial Desatado ·Lv 1/1",
        descripcion: `
        Cada 1 héroes del Campamento Alas del Alba en el campo de batalla aumenta el ataque <br>
        y defensa de las tropas en +5%.Además, al desplegar 5 héroes del <br>
        Campamento Alas del Alba,la capacidad de las tropas aumenta<br>
        un 10& adicional.+10%.
      `
      }
    }
  },

  laura: {
    imgHabilidad: "img-heroe-laura2.webP",
    imgEstrellas: "img-heroe-laura-estrellas.webP",
    habilidades: {
      1: {
        titulo: "1.Instinto de Cazador. ·Lv 10/10.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 666(→686)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Lluvia de Flechas Devastadoras ·Lv 20/20",
        descripcion: `
        Después de acumular energía, lanza una gran cantidad de explosivas<br>
        hacia adelante, Coeficiente de daño:1122(->1163), duración: 3 segundos.<br>
        ⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐ Rango de daño +30%.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐⭐⭐ Explosión de quemadura adicional .<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Regalo del Cazador ·Lv 10/10",
        descripcion: `Recibe 10 tareas de radar gratis por día.<br>
        y aumenta la EXP del radar en un 26.2(->26.9)%.<br>
        ⭐ Misiones gratuitas +5.<br>
        ⭐⭐ EXP de radar +10%.<br>
        ⭐⭐⭐ EXP de radar +10%<br>
        ⭐⭐⭐⭐ Misiones gratuitas +10.<br>
        ⭐⭐⭐⭐⭐ Al completar misiones de radar,obtén una caja de <br>
        exploración adicional (Limite diario 10 unidades)
        
      `
      },
      4: {
        titulo: "4.Potencial Desatado ·Lv 1/1",
        descripcion: `
        Ataque propio +10%,Defensa +10%,<br>
        Capacidad de las tropas +5%.
      `
      }
    }
  },

  emilia: {
    imgHabilidad: "img-heroe-emilia2.webP",
    imgEstrellas: "img-heroe-emilia-estrellas.webP",
    habilidades: {
      1: {
        titulo: "1.Enfoque del Asesino. ·Lv 10/10.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 666(→686)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Explosión de Precisión ·Lv 10/10",
        descripcion: `
        Marca 3 objetivos aleatoriamente, infligiendo daño de explosión<br>
        a los objetivos y alos enemigos cercanos (Factor de daño:1122(->1163)).<br>
        ⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐ La explosión inflige un efecto de quema adicional.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐⭐⭐ Duplica el número de marcas y reduce el daño en 30.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Cientifíco ·Lv 10/10",
        descripcion: `
        El tiempo de investigación gratuito aumenta en 30 minutos.<br>
        y la velocidad de investigación aumenta en un 26.2(->26.9)%.<br>
        ⭐ Tiempo gratis de investigación +15 min.<br>
        ⭐⭐ Velocidad de investigación +10%.<br>
        ⭐⭐⭐ Tiempo gratis de investigación +60 min<br>
        ⭐⭐⭐⭐ Consumo de recursos básicos en la investigación -5%.<br>
        ⭐⭐⭐⭐⭐ Consumo de recursos básicos en la investigación -10%.
      `
      },
      4: {
        titulo: "4.Potencial Desatado ·Lv 1/1",
        descripcion: `
        Ataque propio +10%,Defensa +10%,<br>
        Capacidad de las tropas +5%.
      `
      }
    }
  },

  fiona: {
    imgHabilidad: "img-heroe-fiona2.webp",
    imgEstrellas: "img-heroe-fiona-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Refuerzo de Fuego. ·Lv 10/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 543(->553).<br>
        ⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +105
      `
      },
      2: {
        titulo: "2.Lanzallamas Ardiente ·Lv 5/30",
        descripcion: `
        Rocía una gran cantidad de llamas de alta presión en el área<br>
        en forma de abanico al frente (Factor de daño:782(->803)).<br>
        durante 3 segundos.<br>
        ⭐ Coeficiente de daño adicional +100.<br>
        ⭐⭐ Coeficiente de daño adicional +100.<br>
        ⭐⭐⭐ Rango de daño +30%.<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +200.<br>
        ⭐⭐⭐⭐⭐ Duración 2 segundos.
      `
      },
      3: {
        titulo: "3.Experto en Ataque ·Lv 30/30",
        descripcion: `
        Incremento de ataque propio en 1141.4(->1158.6).<br>
        ⭐ Ataque +50.<br>
        ⭐⭐ Ataque +50.<br>
        ⭐⭐⭐ Ataque +100.<br>
        ⭐⭐⭐⭐ Ataque +200.<br>
        ⭐⭐⭐⭐⭐ Ataque +300.
      `
      },
      4: {
        titulo: "4.Ataque de Facción ·Lv 1/1",
        descripcion: `
        ATQ de héroe de la facción Alas del Alba +10%.
      `
      }
    }
  },

  cristina: {
    imgHabilidad: "img-heroe-cristina2.webp",
    imgEstrellas: "img-heroe-cristina-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Caballero del Juicio. ·Lv 6/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 501(->512).<br>
        ⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +105
      `
      },
      2: {
        titulo: "2.Tormenta de Llamas ·Lv 5/30",
        descripcion: `
        Gira su látigo creando un tornado de fuego,<br>
        coeficiente de daño:782(->803)), duración de 2 segundos.<br>
        ⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐⭐ Tiene posibilidades de causar adicionalmente<br>
                un efecto de quema.<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +200.<br>
        ⭐⭐⭐⭐⭐ Efecto de quema potenciado.
      `
      },
      3: {
        titulo: "3.Experto en Asedio ·Lv 30/30",
        descripcion: `
        Reducción dde 90 segundos en el tiempo de demolición al <br>
        atacar ciudades neutrales <br>
        ⭐ Consumo de combustible -2.<br>
        ⭐⭐ Tiempo de demolición -15 segundos.<br>
        ⭐⭐⭐ Consumo de combustible -2.<br>
        ⭐⭐⭐⭐ Tiempo de demolición -15 segundos.<br>
        ⭐⭐⭐⭐⭐Tiempo de demolición -30 segundos.
      `
      },
      4: {
        titulo: "4.Especialización en asedio ·Lv 1/1",
        descripcion: `
        Independientemente de si Cristina participa en la batalla,<br>
        el efecto de especialidad en asedio afecta a toda la formación.
      `
      }
    }
  },

  isabella: {
    imgHabilidad: "img-heroe-isabella2.webp",
    imgEstrellas: "img-heroe-isabella-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Bala Reforzada. ·Lv 5/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 491(->501).<br>
        ⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +105
      `
      },
      2: {
        titulo: "2.Tiro con Doble Arma ·Lv 5/30",
        descripcion: `
        Dispara ambas armas simultáneamente, infligiendo<br>
        un daño masivo a los enemigos(Factor de daño:762(->783)).<br>
        ⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐⭐ Posibilidades de inmovilización aumentadas.<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +200.<br>
        ⭐⭐⭐⭐⭐ Duración de la inmovilización +1 segundo.
      `
      },
      3: {
        titulo: "3.Experto en Ataque ·Lv 20/30",
        descripcion: `
        Aumenta la defensa propia en 1227.6(->1244.8).<br>
        ⭐ Defensa +50<br>
        ⭐⭐ Defensa +50.<br>
        ⭐⭐⭐ Defensa +100.<br>
        ⭐⭐⭐⭐ Defensa +200.<br>
        ⭐⭐⭐⭐⭐ Defensa +300.
      `
      },
      4: {
        titulo: "4.Defensa de la facción ·Lv 1/1",
        descripcion: `
        DEF de héroe de la facción Alas del Alba +10%.<br>
      `
      }
    }
  },

  angelina: {
    imgHabilidad: "img-heroe-angelina2.webp",
    imgEstrellas: "img-heroe-angelina-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Inyección de Toxina. ·Lv 20/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 431(->437).<br>
        ⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +40<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +70.
      `
      },
      2: {
        titulo: "2.Granda de suero ·Lv 20/30",
        descripcion: `
        Balancea el arma, infligiendo daño a los enmigos en el<br>
        área en forma de abanico al frente(Factor de Daño:862(->875)).<br>
        ⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +80.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +140.<br>
      `
      },
      3: {
        titulo: "3.Bien Entrenado ·Lv 30/30",
        descripcion: `
        Velocidad de entrenamiento de tropas +30%.<br>
        ⭐ Velocidad de entrenamiento de tropas +2%<br>
        ⭐⭐ Velocidad de entrenamiento de tropas +2%.<br>
        ⭐⭐⭐ Velocidad de entrenamiento de tropas +3%.<br>
        ⭐⭐⭐⭐ Velocidad de entrenamiento de tropas +3%.<br>
        ⭐⭐⭐⭐⭐ Velocidad de entrenamiento de tropas +5%.<br>
      `
      },
      4: {
        titulo: "4.Defensa de la Facción ·Lv 1/1",
        descripcion: `
        DEF de héroe de la facción Alas del Alba +5%.
      `
      }
    }
  },

  natalia: {
    imgHabilidad: "img-heroe-natalia2.webp",
    imgEstrellas: "img-heroe-natalia-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Ballesta Reforzada. ·Lv 12/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 375(->382).<br>
        ⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +40<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +70.
      `
      },
      2: {
        titulo: "2.Tiro con Ballesta ·Lv 10/30",
        descripcion: `
        Se carga y dispara múltiples flechas de ballesta de alta<br>
        intensidad (Factor de Daño:724(->737)).<br>
        ⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +80.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +140.<br>
      `
      },
      3: {
        titulo: "3.Maestría en Recolección:Comida ·Lv 30/30",
        descripcion: `
        La velocidad de recolección de comida aumenta en un 45%,<br>
        y la producción de comida aumenta en un 30%.<br>
        ⭐ Velocidad de recolección de comida +3%<br>
        ⭐⭐ Producción de comida +15%.<br>
        ⭐⭐⭐ Velocidad de recolección de comida +6%.<br>
        ⭐⭐⭐⭐ Producción de recursos +20%.<br>
        ⭐⭐⭐⭐⭐ Velocidad de recolección +15%.<br>
      `
      },
      4: {
        titulo: "4.Ataque de la Facción ·Lv 1/1",
        descripcion: `
        ATQ de héroe de la facción Alas del Alba +5%.
      `
      }
    }
  },
  /*Guardian*/
  chinatsu: {
    imgHabilidad: "img-heroe-chinatsu2.webp",
    imgEstrellas: "img-heroe-chinatsu-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Tajo rápido ·Lv 20/20",
        descripcion: `
        Factor de daño de ataque normal aumentado a 1083 (→1103)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Onda de Espada Espiral ·Lv 20/20",
        descripcion: `
        Desata una poderosa tormenta de energía con 
        su espada,<br> Coeficiente de daño: 1686(->1727).<br>
        ⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐ Rango de  daño +30%.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐⭐⭐Tornado de energía avanza hacia adelante.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Espíritu Samurái ·Lv 20/20",
        descripcion: `
        Aumento de puntos de duelo de alianza
         <br>24.6(->24.9)%.<br>
        ⭐ Puntos de duelo de alianza +2%.<br>
        ⭐⭐ Puntos de duelo de alianza +3%.<br>
        ⭐⭐⭐ Puntos de duelo de alianza +3%<.<br>
        ⭐⭐⭐⭐ Puntos de duelo de alianza +5%.<br>
        ⭐⭐⭐⭐⭐ Puntos de duelo de alianza +7%.
      `
      },
      4: {
        titulo: "4.Despertar de potencial ·Lv 1/1",
        descripcion: `
      Ataque propio +10%, Defensa +10%,<br> 
      Capacidad de las tropas +5%.
      `
      }
    }
  },

  mia: {
    imgHabilidad: "img-heroe-mia2.webp",
    imgEstrellas: "img-heroe-mia-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Amplificación Eléctrica ·Lv 15/15.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 859 (→880)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Enlace Relámpago  ·Lv 15/15",
        descripcion: `
        Libera un rayo que puede rebotar entre monstruos 
        <br> (Factor de daño: 1479(->1520).<br>
        ⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐ Número de rebotes aumentado.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐⭐⭐ Número de rebotes aumentado.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Experto en modificaciones ·Lv 15/15",
        descripcion: `
        Recoge gratis 500 planos de modificación al día,la
        <br>experiencia obtenida por la mjeora del vehículo <br>
        aumenta un 14.8(->15.2)%.<br>
        ⭐ Planos de modificación gratuitos +100.<br>
        ⭐⭐ Experiencia de mejora +5%.<br>
        ⭐⭐⭐ Planos de modificación gratuitos +200<.<br>
        ⭐⭐⭐⭐ Experiencia de mejora +10%.<br>
        ⭐⭐⭐⭐⭐ Daño de habilidades del vehículo modificado +200%.
      `
      },
      4: {
        titulo: "4.Estimulación del potencial ·Lv 1/1",
        descripcion: `
      Ataque propio +10%, Defensa +10%,<br> 
      Capacidad de las tropas +5%.
      `
      }
    }
  },

  halina: {
    imgHabilidad: "img-heroe-halina2.webP",
    imgEstrellas: "img-heroe-halina-estrellas.webP",
    habilidades: {
      1: {
        titulo: "1.Alabanza de la Destrucción. ·Lv 10/10.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 666(→686)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Aplastamiento de Martillo ·Lv 10/10",
        descripcion: `
        Empuña su gigantesco martillo y golpea a los enemigos,<br>
        causando daño en área con un coeficiente de 1122(->1163)).<br>
        ⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐ Número de golpes de martillo +1.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐⭐⭐ Número de golpes de martillo +2.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Orden de Batalla de Burla ·Lv 10/10",
        descripcion: `
        Vida de los motorista liderados +8.1(->8.4)%.<br>
        ⭐ Daño de la unidad de motociclista +2%.<br>
        ⭐⭐ Daño de la unidad de motociclista +3%.<br>
        ⭐⭐⭐ Daño de la unidad de motociclista +5%.<br>
        ⭐⭐⭐⭐ Daño de la unidad de motociclista +5%.<br>
        ⭐⭐⭐⭐⭐ Daño de la unidad de motociclista +10%.
      `
      },
      4: {
        titulo: "4.Potencial Desatado ·Lv 1/1",
        descripcion: `
        Al desplegar 5 héroes de Guardian del Orden<br>,
        vida de tropa +10%.
      `
      }
    }
  },

  evelyn: {
    imgHabilidad: "img-heroe-evelyn2.webP",
    imgEstrellas: "img-heroe-evelyn-estrellas.webP",
    habilidades: {
      1: {
        titulo: "1.Soldado Blindado. ·Lv 15/15.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 859(→880)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Supresión de Fuego ·Lv 15/15",
        descripcion: `
        Lanza 6 cohetes, infligiendo daño a los enemigos dentro<br>
        del rango de explosión (Factor de Daño: 1479(->1520)).
        ⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐ Número de cohetes +3.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐⭐⭐ Número de cohetes +5.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Orden de la Reina ·Lv 15/15",
        descripcion: `
        La velocidad de entrenamiento del cuartel de .<br>
        motorista aumenta en un 54.5(->55.5)%.<br>
        ⭐ Velocidad de entrenamiento +20.<br>
        ⭐⭐ Defensa de la unidad de motos +10%.<br>
        ⭐⭐⭐ Reducción de consumo de recursos en el 
                entrenamiento  de la unidad de motos -5%.<br>.
        ⭐⭐⭐⭐ Ataque de la unidad de motos +10%.<br>
        ⭐⭐⭐⭐⭐ El efecto de mejora de ataque y defensa se aplica 
                     a todas las unidades.
      `
      },
      4: {
        titulo: "4.Potencial Desatado ·Lv 1/1",
        descripcion: `
        Cada 1 héroes del Campamento Guardia del Orden en el Campo de <br> 
        batalla aumenta el ataque y defensa de las tropas en +5%.<br>
        Adem+as del Campamento Guardia del Orden, la capacidad de <br>
        las tropas aumenta un 10% adicional.<br>
      `
      }
    }
  },

  sakura: {
    imgHabilidad: "img-heroe-sakura2.webp",
    imgEstrellas: "img-heroe-sakura-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Modificación Mecánica. ·Lv 1/1.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 300(→320)<br>
        ⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐ Coeficiente de daño adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +210
      `
      },
      2: {
        titulo: "2.Fiebre de Motos ·Lv 15/15",
        descripcion: `
        Lanza 1 misiles montados en el vehículo,bombardeando<br>
        continuamente al enemigo dobjetivo, con un<br>
        Coeficiente de daño:600(->641).<br>
        ⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐ Cantidad de misiles +1.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +150.<br>
        ⭐⭐⭐⭐ Cantidad de misiles +2.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +300
      `
      },
      3: {
        titulo: "3.Velocidad Vertiginosa ·Lv 15/15",
        descripcion: `
        La defensa de las unidades de motocicletas de la <br>
        tropa que lidera aumenta 15(->16)%.<br>
        ⭐ Ataque de la unidad de motos +5%.<br>
        ⭐⭐ Ataque de la unidad de motos +5%.<br>
        ⭐⭐⭐ Ataque de la unidad de motos +10%.<br>
        ⭐⭐⭐⭐ Ataque de la unidad de motos +10%.<br>
        ⭐⭐⭐⭐⭐ Ataque de la unidad de motos +15%.
      `
      },
      4: {
        titulo: "4.Despertar de potencial ·Lv 1/1",
        descripcion: `
        Independientemente de si Sakura va a la batalla,<br>
        el daño de todas las tropas de motocicletas aumenta un 10%.
      `
      }
    }
  },

  maria: {
    imgHabilidad: "img-heroe-maria2.webp",
    imgEstrellas: "img-heroe-maria-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Golpe de Martillo. ·Lv 20/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 646(->656).<br>
        ⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +105
      `
      },
      2: {
        titulo: "2.El Juicio Final ·Lv 20/30",
        descripcion: `
        Golpea el suelo con el martillo pesado que tiene en <br>
        la mano,infligiendo daño a los enemigos dentro del alcance<br>
        (Factor de daño:1093(->1113).<br>
        ⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐⭐ Tiene posibilidades de causar adicionalmente un.<br>
                efecto de retroceso.
        ⭐⭐⭐⭐ Coeficiente de daño adicional +220.<br>
        ⭐⭐⭐⭐⭐ Efecto de retroceso potenciado.
      `
      },
      3: {
        titulo: "3.Experto en Entrenamiento ·Lv 30/30",
        descripcion: `
        Aumenta de la velocidad de entrenamiento de las tropas +50%.<br>
        ⭐ velocidad de entrenamiento de las tropas<br>
        ⭐⭐ Reducción en el consumo de recursos para entrenamiento -2%.<br>
        ⭐⭐⭐ velocidad de entrenamiento de las tropas +10%.<br>
        ⭐⭐⭐⭐ velocidad de entrenamiento de las tropas +10%.<br>
        ⭐⭐⭐⭐⭐ Reducción en el consumo de recursos para entrenamiento -3%.<br>
      `
      },
      4: {
        titulo: "4.Comandante de Facción ·Lv 1/1",
        descripcion: `
        Capacidad de las tropas + 5%.
      `
      }
    }
  },

  leah: {
    imgHabilidad: "img-heroe-leah2.webp",
    imgEstrellas: "img-heroe-leah-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Tiro Crack. ·Lv 7/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 512(->522).<br>
        ⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +105
      `
      },
      2: {
        titulo: "2.Flechas de Silencio ·Lv 5/30",
        descripcion: `
        Dispara flechas continuamente para formar una lluvia de <br>
        flechas, atacando continuamente a los enemigos en el área<br>
        objetivo (Factor de daño:782(->803)).<br>
        ⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐⭐ Duración 1 segundo.<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +220.<br>
        ⭐⭐⭐⭐⭐ Tiene posibilidades de causar adicionalmente<br>.
                     un efecto de quema.<br>
      `
      },
      3: {
        titulo: "3.Experto en Ataque ·Lv 1/30",
        descripcion: `
        Incremento de ataque propio en 900(->917.2).<br>
        ⭐ Ataque +50.<br>
        ⭐⭐ Ataque +50.<br>
        ⭐⭐⭐ Ataque +100.<br>
        ⭐⭐⭐⭐ Ataque +200.<br>
        ⭐⭐⭐⭐⭐ Ataque +300.
      `
      },
      4: {
        titulo: "4.Ataque de Facción ·Lv 1/1",
        descripcion: `
        ATQ de héroe de la facción Guardian del Orden +10%.
      `
      }
    }
  },

  elizabeth: {
    imgHabilidad: "img-heroe-elizabeth2.webp",
    imgEstrellas: "img-heroe-elizabeth-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Presagio de Mala Suerte. ·Lv 1/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 450(->460).<br>
        ⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐ Coeficiente de daño adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +105
      `
      },
      2: {
        titulo: "2.Disparo de Dispersión ·Lv 1/30",
        descripcion: `
        Dispara rápidamente a los zombis que llegan al frente <br>
        (Factor de daño:700(->720)), y tiene<br>
        posibilidades de inmovilizar a los objetivos.
        ⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐ Coeficiente de daño adicional +90.<br>
        ⭐⭐⭐ Posibilidades de inmovilización aumentadas<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +220.<br>
        ⭐⭐⭐⭐⭐ Duración de la inmovilización +1 segundos.<br>
      `
      },
      3: {
        titulo: "3.Experto en Defensa ·Lv 1/30",
        descripcion: `
        Aumenta la defensa propia en 900(->917.2).<br>
        ⭐ Ataque +50.<br>
        ⭐⭐ Ataque +50.<br>
        ⭐⭐⭐ Ataque +100.<br>
        ⭐⭐⭐⭐ Ataque +200.<br>
        ⭐⭐⭐⭐⭐ Ataque +300.
      `
      },
      4: {
        titulo: "4.Defensa de la Facción ·Lv 1/1",
        descripcion: `
        DEF de héroe de la facción Guardian del Orden +10%.
      `
      }
    }
  },

  william: {
    imgHabilidad: "img-heroe-william2.webp",
    imgEstrellas: "img-heroe-william-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Bala Reforzada. ·Lv 20/30.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 431(->437).<br>
        ⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +40<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +70.
      `
      },
      2: {
        titulo: "2.Granda Explosiva ·Lv 20/30",
        descripcion: `
        Lanza granadas en la dirección designada, infligiendo<br>
        daño a los enemigos dentro del rango de explosión<br>
        (Factor de Daño:862(->875)).<br>
        ⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +80.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +140.<br>
      `
      },
      3: {
        titulo: "3.Bien Entrenado ·Lv 30/30",
        descripcion: `
        Velocidad de entrenamiento de tropas +30%<br>
        ⭐  Velocidad de entrenamiento de tropas +2%<br>
        ⭐⭐ Velocidad de entrenamiento de tropas +2%.<br>
        ⭐⭐⭐ Velocidad de entrenamiento de tropas +3%.<br>
        ⭐⭐⭐⭐ Velocidad de entrenamiento de tropas +3%
        ⭐⭐⭐⭐⭐ Velocidad de entrenamiento de tropas +5%.<br>
      `
      },
      4: {
        titulo: "4.Defensa de la Facción ·Lv 1/1",
        descripcion: `
        DEF de héroe de la facción Guardian del Orden +5%.
      `
      }
    }
  },

  atenea: {
    imgHabilidad: "img-heroe-atenea2.webp",
    imgEstrellas: "img-heroe-atenea-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Modificación de Bala. ·Lv 20/20.",
        descripcion: `
        Factor de daño de ataque normal aumentado a 361(->367).<br>
        ⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐⭐ Coeficiente de daño adicional +30<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +40<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +70
      `
      },
      2: {
        titulo: "2.Disparo de Pistola ·Lv 10/20",
        descripcion: `
        Dispara con su pistola, coeficiente de daño:584(->597)).<br>
        ⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐⭐ Coeficiente de daño adicional +60.<br>
        ⭐⭐⭐⭐ Coeficiente de daño adicional +80.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de daño adicional +140.<br>
      `
      },
      3: {
        titulo: "3.Maestría en Recolección:Electricidad ·Lv 1/30",
        descripcion: `
        La velocidad de recolección de electricidad aumenta<br>
        en un 38.1(->38.8)%, y la producción de electricidad <br>
        aumenta en un 25.2(->25.7)%.<br>
        ⭐ velocidad de recolección de electricidad 3%.<br>
        ⭐⭐ Producción de comida +15%.<br>
        ⭐⭐⭐ velocidad de recolección de electricidad 6%.<br>
        ⭐⭐⭐⭐ Producción de recursos +20%.<br>
        ⭐⭐⭐⭐⭐ Velocidad de Recolección +15%.
      `
      },
      4: {
        titulo: "4.Defensa de la Facción ·Lv 1/1",
        descripcion: `
        ATQ de héroe de la facción Guardian del Orden +10%.
      `
      }
    }
  },
  // 👉 Aquí agregas más héroes sin tocar el JS
};


/* ===============================
   ESTADO
================================ */

let heroeActual = null;

/* ===============================
   ABRIR HEROE
================================ */

cards.forEach(card => {
  card.addEventListener('click', () => {

    const nombre = card.dataset.nombre;
    const nivel = card.dataset.nivel;

    const dataHeroe = heroesData[nombre];
    if (!dataHeroe) return;

    heroeActual = dataHeroe;

    nombreHeroe.textContent = nombre;
    nivelHeroe.textContent = `Nivel ${nivel}`;

    imgHabilidad.src = dataHeroe.imgHabilidad;
    imgEstrellas.src = dataHeroe.imgEstrellas;

    imgHabilidad.classList.add('active');
    imgEstrellas.classList.remove('active');

    switchBtns.forEach(b => b.classList.remove('active'));
    switchBtns[0].classList.add('active');

    infoDerecha.innerHTML = `
      <h3>${dataHeroe.habilidades[1].titulo}</h3>
      <p>${dataHeroe.habilidades[1].descripcion}</p>
    `;

    detalle.classList.remove('hidden');
    detalle.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ===============================
   SWITCH IMAGEN
================================ */

switchBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    switchBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (btn.dataset.img === 'habilidad') {
      imgHabilidad.classList.add('active');
      imgEstrellas.classList.remove('active');
      infoDerecha.style.display = 'block';
    } else {
      imgEstrellas.classList.add('active');
      imgHabilidad.classList.remove('active');
      infoDerecha.style.display = 'none';
    }
  });
});

/* ===============================
   SKILLS (POR HEROE)
================================ */

document.querySelectorAll('.skill-hotspots button').forEach(btn => {
  btn.addEventListener('click', () => {

    if (!heroeActual) return;

    // 🔴 quitar estado activo de todos
    document.querySelectorAll('.skill-hotspots button')
      .forEach(b => b.classList.remove('active'));

    // 🟢 activar el botón clickeado
    btn.classList.add('active');

    const skill = btn.dataset.skill;
    const dataSkill = heroeActual.habilidades[skill];

    if (!dataSkill) return;

    infoDerecha.innerHTML = `
      <h3>${dataSkill.titulo}</h3>
      <p>${dataSkill.descripcion}</p>
    `;
  });
});



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

    // =====================
    // ALL
    // =====================
    if (tier === 'all') {

      exclusiveCarousel.classList.remove('hidden');
      equipClassColumn.classList.remove('hidden');
      gridEquip.classList.add('hidden');

      equipCards.forEach(card => {
        card.style.display = 'none';
      });

      buildExclusiveCarousel();
      ['s', 'a', 'b', 'c'].forEach(t => buildEquipClassCarousel(t));

    }

    // =====================
    // EXCLUSIVO
    // =====================
    else if (tier === 'exclusivo') {

      exclusiveCarousel.classList.add('hidden');
      equipClassColumn.classList.add('hidden');
      gridEquip.classList.remove('hidden');

      equipCards.forEach(card => {
        card.style.display =
          card.dataset.tier === 'exclusivo' ? 'block' : 'none';
      });

    }

    // =====================
    // S / A / B / C
    // =====================
    else {

      exclusiveCarousel.classList.add('hidden');
      equipClassColumn.classList.add('hidden');
      gridEquip.classList.remove('hidden');

      equipCards.forEach(card => {
        card.style.display =
          card.dataset.tier === tier ? 'block' : 'none';
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

  const exclusivos = [...equipCards].filter(
    card => card.dataset.tier === 'exclusivo'
  );

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

  const card = document.querySelector(
    `.equip-class-card[data-tier="${tier}"]`
  );

  if (!card) return;

  const track = card.querySelector('.equip-class-track');

  // evitar reconstruir
  if (track.dataset.built === 'true') return;
  track.dataset.built = 'true';

  const items = [...equipCards].filter(
    equip => equip.dataset.tier === tier
  );

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

    if (track.scrollLeft + track.clientWidth >= track.scrollWidth) {
      direction = -1;
    }

    if (track.scrollLeft <= 0) {
      direction = 1;
    }
  }, 16);
}

/* ===============================
   INICIALIZACIÓN (LOAD)
================================ */
// ✅ Ya NO necesita DOMContentLoaded porque ya estamos dentro de inicializarHeroes()
const btnEquipAll = document.querySelector('.btn-equip[data-tier="all"]');
if (btnEquipAll) btnEquipAll.click();

} // ← CIERRA inicializarHeroes() AL FINAL DE TODO




