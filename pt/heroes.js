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
    imgHabilidad: "../img-heroe-oliveira2.webp",
    imgEstrellas: "../img-heroe-oliveira-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Golpe Fatal·Lv 20/20",
        descripcion: `
        Fator de dano de ataque normal aumentado a 1083 (→1103)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Tempestade de Folhas·Lv 20/20",
        descripcion: `
        Coloca un cabeçote cortador giratório en la localização designada,
        causando dano <br> a los enemigos de corto alcance(Fator de Dano:
        1686(->1727) durante 4 segundos <br>
        ⭐ Coeficiente de dano adicional +150<br>
        ⭐⭐ Duração +1seg<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150<br>
        ⭐⭐⭐⭐ Inflige un efeito de sangramento adicional.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +340
      `
      },
      3: {
        titulo: "3.Garota Prodígio·Lv 20/20",
        descripcion:  `
        A velocidade de treinamento do quartel de Assaltantes aumenta em 59.7(->60.7)%.<br>
        ⭐ Velocidade de treinamento +20%<br>
        ⭐⭐ Defesa da unidade de Assalto +10%<br>
        ⭐⭐⭐ Redução de consumo de recursos en el entrenamiento de la unidade de Assalto -5%<br>
        ⭐⭐⭐⭐ Ataque de la unidade de Assalto + 10%<br>
        ⭐⭐⭐⭐⭐ O Efeito de melhoria de Ataque e Defesa se Aplica a todas as unidades.
      `
      },
      4: {
        titulo: "4.Potencial Desencadeado·Lv 1/1",
        descripcion:   `
      Cada 1 héroe del campamento Rosa Sangrenta en el campo de <br>
      batalla aumenta o ataque e defesa de las tropas en +5%.<br>
      Además ao desplegar 5 héroes del Campamento Rosa Sangrenta,<br>
       la capacidade das tropas aumenta um 10% adicional.
      `
      }
    }
  },

  lysia: {
    imgHabilidad: "../img-heroe-lysia.webp",
    imgEstrellas: "../img-heroe-lysia-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Dilaceração de Garras Feroces ·Lv 20/20.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 1734(→1761)<br>
        ⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +150<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      2: {
        titulo: "2.Incursão das Sombras ·Lv 13/30",
        descripcion: `
        Se transforma em uma sombra y aparece atrás do inimigo
        para lançar <br>três ataques com garras, Coeficiente de dano:2262(->2317).<br>
        ⭐ Coeficiente de dano adicional +200.<br>
        ⭐⭐ Número de Golpes de garras +1.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +200.<br>
        ⭐⭐⭐⭐ Número de Golpes de garras +1..<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +400
      `
      },
      3: {
        titulo: "3.Sombra Inseparável ·Lv 20/30",
        descripcion:  `
        Capacidade de tropas aumentada em
         <br>69.3(->71.4)%.<br>
        ⭐ Ataque do herói +2%, defesa +2%.<br>
        ⭐⭐ Ataque do herói +3%, defesa +3%.<br>
        ⭐⭐⭐ Ataque do herói +5%, defesa +5%.<br>
        ⭐⭐⭐⭐ Ataque do herói +5%, defesa +5%.<br>
        ⭐⭐⭐⭐⭐ Ataque do herói +5%, defesa +5%.
      `
      },
      4: {
        titulo: "4.Passo Ilusório Felino ·Lv 1/1",
        descripcion:   `
        Cuando for desdobrado com Bella, las unidades de Assalto del<br> 
        esquadrão reciben un bono de resistência ao dano del 7.5%.<br>
        Ao atingir 5 estrelas,el efecto se aplica a todos los tipos de<br>
        unidad, y ala capacidade do esquadrão aumenta um 7.5%.
      `
      }
    }
  },

  bella: {
    imgHabilidad: "../img-heroe-bella2.webp",
    imgEstrellas: "../img-heroe-bella-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Impacto Letal do Apocalipse·Lv 20/20",
        descripcion: `
        Fator de dano de ataque normal aumentado a 1083 (→1103)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Fúria Pacificadora·Lv 20/20",
        descripcion: `
        Una estampida imparável que esmaga os inimigos y causa daño de ,
        en área,<br> Coeficiente de dano  1686(->1727)<br>
        ⭐ Coeficiente de dano adicional +150<br>
        ⭐⭐ Duração +1seg<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150<br>
        ⭐⭐⭐⭐ Número de pisoteadas +2.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Ordem do Sol Ardente ·Lv 20/20",
        descripcion:  `
        Vida dos assaltantes liderados +11.6(->11.9)%.<br>
        ⭐ Dano da unidadee de assalto +2%<br>
        ⭐⭐ Dano da unidadee de assalto +3%.<br>
        ⭐⭐⭐ Dano da unidadee de assalto +5%.<br>
        ⭐⭐⭐⭐ Dano da unidadee de assalto +5%.<br>
        ⭐⭐⭐⭐⭐ Dano da unidadee de assalto +10%.
      `
      },
      4: {
        titulo: "4.Brilho Sagrado Eterno·Lv 1/1",
        descripcion:   `
      Ao desplegar 5 héroes de Rosa Sangrenta, vida de tropa +10%..
      `
      }
    }
  },

  sofia: {
    imgHabilidad: "../img-heroe-sofia2.webp",
    imgEstrellas: "../img-heroe-sofia-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Caçador do Apocalipse·Lv 20/20",
        descripcion: `
        Fator de dano de ataque normal aumentado a 1083 (→1103)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Loucura Apocalíptica·Lv 20/20",
        descripcion: `
        Llama a las forças móveis para un ataque contundente en la zona
        objetivo,<br> Coeficiente de dano: 1686(->1727)<br>
        ⭐ Coeficiente de dano adicional +150<br>
        ⭐⭐ Quantidade de unidades de apoio +2<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150<br>
        ⭐⭐⭐⭐ Quantidade de unidades de apoio +3.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Presente da Senhorita·Lv 20/20",
        descripcion:  `
        O tempo de construção aumenta em 90 minutos e a velocidade
        de construcción <br> aumenta em 33.1(->33.8)%.<br>
        ⭐ Tempo de Construção Gratuito +15 min<br>
        ⭐⭐ Velocidad de Construcción +10%<br>
        ⭐⭐⭐ Tempo de Construção Gratuito +60 min.<br>
        ⭐⭐⭐⭐ Consumo de recursos para construção -5%.<br>
        ⭐⭐⭐⭐⭐ Consumo de recursos para construção -10%.
      `
      },
      4: {
        titulo: "4.Potencial Desencadeado ·Lv 1/1",
        descripcion:   `
      Ataque próprio +10%, Defesa +10%,<br> Capacidade das tropas +5%
      `
      }
    }
  },

  katrina: {
    imgHabilidad: "../img-heroe-katrina2.webP",
    imgEstrellas: "../img-heroe-katrina-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Bala Explosiva ·Lv 20/20",
        descripcion: `
        Fator de dano de ataque normal aumentado a 1083 (→1103)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Assalto Total ·Lv 20/20",
        descripcion: `
        Ordena a las tropas de elite que disparan a máxima potencia,
        <br> Coeficiente de dano: 1686(->1727), duração de 6 segundos.<br>
        ⭐ Coeficiente de dano adicional +150<br>
        ⭐⭐ Duração +1 segundo<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150<br>
        ⭐⭐⭐⭐ Duração +2 segundo.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Gênio de Exploração ·Lv 20/20",
        descripcion:  `
        La EXP de inatividade en níveis de exploração
         <br> aumenta em 33.1(->33.8)%.<br>
        ⭐ Obtén gratuitamente 100 de combustível cada dia.<br>
        ⭐⭐ EXP AFK de Etapa +5%.<br>
        ⭐⭐⭐ EXP AFK de Etapa +5%<.<br>
        ⭐⭐⭐⭐ Velocidade de Restauração de Combustível +10%.<br>
        ⭐⭐⭐⭐⭐ EXP AFK de Etapa +10%.
      `
      },
      4: {
        titulo: "4.Ativação de potencial ·Lv 1/1",
        descripcion:   `
      Ataque próprio +10%, Defesa +10%,<br> Capacidade das tropas +5%.
      `
      }
    }
  },  

  selena: {
    imgHabilidad: "../img-heroe-selena2.webp",
    imgEstrellas: "../img-heroe-selena-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Ferida Dilacerante ·Lv 20/20",
        descripcion: `
        Fator de dano de ataque normal aumentado a 1083 (→1103)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Invocação Selvagem ·Lv 20/20",
        descripcion: `
        O urso de combate ataca para frente, al encontrarse con
        el enemigo,<br> golpea el suelo causando dano em área
        Coeficiente de dano: 1686(->1727).<br>
        ⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐ Alcance de dano +30%.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐⭐⭐ Número de golpes +2.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Força Natural ·Lv 20/20",
        descripcion:  `
        A defesa das unidades de assalto lideradas 
         <br> aumenta em 34.7(->35.7)%.<br>
        ⭐ Ataque de la unidade de assalto +5%.<br>
        ⭐⭐ Ataque de la unidade de assalto +5%.<br>
        ⭐⭐⭐ Ataque de la unidade de assalto +10%<.<br>
        ⭐⭐⭐⭐ Ataque de la unidade de assalto +10%.<br>
        ⭐⭐⭐⭐⭐ Ataque de la unidade de assalto +15%.
      `
      },
      4: {
        titulo: "4.Despertar de potencial ·Lv 1/1",
        descripcion:   `
      Independentemente de se Selena vai à batalha,<br>
      el dano de todas as tropas de assalto aumenta um 10%.
      `
      }
    }
  },    

  vivian: {
    imgHabilidad: "../img-heroe-vivian2.webp",
    imgEstrellas: "../img-heroe-vivian-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Carta Mágica. ·Lv 30/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 750<br>
        ⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +105
      `
      },
      2: {
        titulo: "2.Arte das Cartas ·Lv 30/30",
        descripcion: `
        Controla suas cartas para atacar inimigos em uma área circular,<br>
        Coeficiente de dano:1280, duração de 3 segundos.<br>
        ⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐⭐ Alcance de dano +30%.<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +200.<br>
        ⭐⭐⭐⭐⭐ Duración 1 segundo.
      `
      },
      3: {
        titulo: "3.Nascido do Fogo ·Lv 30/30",
        descripcion:  `
        Ao combater zumbis no exterior, el daño<br>
        causado por tu tropa aumenta em 30%.<br>
        ⭐ Consumo de combustível -1.<br>
        ⭐⭐ Consumo de combustível -1.<br>
        ⭐⭐⭐ El consumo de combustível al desafiar al zombie.<br>
                gigante se reduce en 2.
        ⭐⭐⭐⭐ Dano causado +10%.<br>
        ⭐⭐⭐⭐⭐ El efecto se aplica a todas as formações,<br>
        independentemente de se vivian participa en la expedición o no.
      `
      },
      4: {
        titulo: "4.Especialização no Exterior ·Lv 1/1",
        descripcion:   `
        Múltiplas unidades podem atacar o mesmo <br>
        zumbi no campo.
      `
      }
    }
  },

  miranda: {
    imgHabilidad: "../img-heroe-miranda2.webp",
    imgEstrellas: "../img-heroe-miranda-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Balas Perfurantes. ·Lv 20/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 646(->656).<br>
        ⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +105
      `
      },
      2: {
        titulo: "2.Disparo Rápido ·Lv 13/30",
        descripcion: `
        Disparo furioso em direção aos inimigos à frente,<br>
        Coeficiente de dano:929(->949), com uma probabilidade.<br>
        de atordoar o objetivo.<br>
        ⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐⭐ Chances de atordoamento aumentadas.<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +200.<br>
        ⭐⭐⭐⭐⭐ Duración de atordoamento +1 segundo.
      `
      },
      3: {
        titulo: "3.Especialista em Defesa ·Lv 30/30",
        descripcion:  `
        Aumenta a defesa própria en 1400.<br>
        ⭐ Defesa +50<br>
        ⭐⭐ Defesa +50.<br>
        ⭐⭐⭐ Defesa +100.<br>
        ⭐⭐⭐⭐ Defesa +200.<br>
        ⭐⭐⭐⭐⭐ Defesa +300.<br>
      `
      },
      4: {
        titulo: "4.Especialização no Exterior ·Lv 1/1",
        descripcion:   `
        DEF de héroe de la facción Rosa Sangrenta +10%.
      `
      }
    }
  },
 
  eva: {
    imgHabilidad: "../img-heroe-eva2.webp",
    imgEstrellas: "../img-heroe-eva-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Reação Química. ·Lv 5/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 491(->501).<br>
        ⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +105
      `
      },
      2: {
        titulo: "2.Reagente Perigoso ·Lv 6/30",
        descripcion: `
        Lanza produtos químicos perigosos na área designada,<br>
        causando um dano masivo a los enmigos (Fator de Dano:803(->824)).<br>
        ⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐⭐ Tem chances de causar adicionalmente.<br>
                dano de veneno.
        ⭐⭐⭐⭐ Coeficiente de dano adicional +200.<br>
        ⭐⭐⭐⭐⭐ Efecto de veneno potencializado.
      `
      },
      3: {
        titulo: "3.Especialista em Ataque ·Lv 17/30",
        descripcion:  `
        Incremento de ataque próprio en 1175.9(->1193.1).<br>
        ⭐ Ataque +50<br>
        ⭐⭐ Ataque +50.<br>
        ⭐⭐⭐ Ataque +100.<br>
        ⭐⭐⭐⭐ Ataque +200.<br>
        ⭐⭐⭐⭐⭐ Ataque +300.<br>
      `
      },
      4: {
        titulo: "4.Ataque da Facção ·Lv 1/1",
        descripcion:   `
        ATQ de héroe de la facción Rosa Sangrenta +10%.
      `
      }
    }
  }, 

  audrey: {
    imgHabilidad: "../img-heroe-audrey2.webp",
    imgEstrellas: "../img-heroe-audrey-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Punho Furioso. ·Lv 30/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 500.<br>
        ⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +40<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +70
      `
      },
      2: {
        titulo: "2.Impacto de Muay Thai ·Lv 20/30",
        descripcion: `
        Saca a arma para atacar os inimigos,<br>
        (Fator de Dano:862(->875)).<br>
        ⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +80.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +140.<br>
      `
      },
      3: {
        titulo: "3.Bem Treinado ·Lv 30/30",
        descripcion:  `
        Velocidade de treinamento de Tropas +30%.<br>
        ⭐ Velocidade de treinamento de Tropas +2%.<br>
        ⭐⭐ Velocidade de treinamento de Tropas +2%.<br>
        ⭐⭐⭐ Velocidade de treinamento de Tropas +3%.<br>Ataque +100.<br>
        ⭐⭐⭐⭐ Velocidade de treinamento de Tropas +3%.<br>
        ⭐⭐⭐⭐⭐ Velocidade de treinamento de Tropas +5%.<br>
      `
      },
      4: {
        titulo: "4.Defesa de Facção ·Lv 1/1",
        descripcion:   `
        DEF de héroe de la facción Rosa Sangrenta +5%.
      `
      }
    }
  },

  giselle: {
    imgHabilidad: "../img-heroe-giselle2.webp",
    imgEstrellas: "../img-heroe-giselle-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Alavanca de Liga. ·Lv 20/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 431(->437).<br>
        ⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +40<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +70.
      `
      },
      2: {
        titulo: "2.Impacto de Alavanca ·Lv 20/30",
        descripcion: `
        Balancea el arma, causando dano a los enmigos en el<br>
        área em forma de leque à frente(Fator de Dano:862(->875)).<br>
        ⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +80.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +140.<br>
      `
      },
      3: {
        titulo: "3.Maestria em Coleta: Madeira ·Lv 30/30",
        descripcion: `
        La velocidade de coleta de madeira aumenta em 45%,<br>
        y la produção de madeira aumenta em 30%.<br>
        ⭐ Velocidade de coleta de madeira +3%<br>
        ⭐⭐ Produção de madeira +15%.<br>
        ⭐⭐⭐ Velocidade de coleta de madeira +6%.<br>
        ⭐⭐⭐⭐ Produção de recursos +20%.<br>
        ⭐⭐⭐⭐⭐ Velocidade de coleta +15%.<br>
      `
      },
      4: {
        titulo: "4.Ataque da Facção ·Lv 1/1",
        descripcion: `
        ATQ de héroe de la facción Rosa Sangrenta +5%.
      `
      }
    }
  },
  /* Alba*/
  nyx: {
    imgHabilidad: "../img-heroe-nyx2.webp",
    imgEstrellas: "../img-heroe-nyx-estrellas.webp",
    habilidades: {
      1: {
        titulo: "Habilidade 1 · Lv 1/20",
        descripcion: "Nyx lança um projétil sombrio que causa dano explosivo."
      },
      2: {
        titulo: "Habilidade 2 · Lv 1/20",
        descripcion: "Aumenta a penetração de armadura contra inimigos blindados."
      },
      3: {
        titulo: "Habilidade 3 · Lv 1/20",
        descripcion: "Aumenta a cadência de disparo durante um curto período."
      },
      4: {
        titulo: "Habilidade 4 · Lv 1/20",
        descripcion: "Concede um aumento geral de ataque à equipe."
      }
    }
  },

  alma: {
    imgHabilidad: "../img-heroe-alma2.webp",
    imgEstrellas: "../img-heroe-alma-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Bala Dourada Letal. ·Lv 15/15.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 859(→880)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Corrupção Dourada ·Lv 15/15",
        descripcion: `
        La Serpente Dourada danza frenéticamente, mordendo os inimigos y
        envenenando <br> a muitos deles Coeficiente de dano:2262(->2317).<br>
        ⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐ Quantidade de Víbora +1.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐⭐⭐ Quantidade de Víbora +1.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Decreto da Escama Púrpura ·Lv 15/15",
        descripcion: `
        Vida dos atiradores liderados +9.8(->10.2)%.<br>
        ⭐ Dano da unidadee de arqueiros +2%.<br>
        ⭐⭐ Dano da unidadee de arqueiros +3%.<br>
        ⭐⭐⭐ Dano da unidadee de arqueiros +5%.<br>
        ⭐⭐⭐⭐ Dano da unidadee de arqueiros +5%.<br>
        ⭐⭐⭐⭐⭐ Dano da unidadee de arqueiros +10%.
      `
      },
      4: {
        titulo: "4.Poder do Ouro Negro ·Lv 1/1",
        descripcion: `
        Ao desplegar 5 héroes de Asas do Amanhecer,<br>
        Vida de tropa+10%.
      `
      }
    }
  },

  scarlett: {
    imgHabilidad: "../img-heroe-scarlett2.webp",
    imgEstrellas: "../img-heroe-scarlett-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Assalto das Sombras. ·Lv 20/20.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 1083(→1103)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Pulso EM ·Lv 20/20",
        descripcion: `
        Carrega a arma com eletricidade, liberando un poderoso pulso de  energía 
        <br> hacia adelante (Fator de dano:1686(->1727).<br>
        ⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐ Divide pulso de energia em 2 partes.<br>
                 reduzindo o dano em 30%.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐⭐⭐ Número de pulsos de energia +1.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Poder de Dominação ·Lv 20/20",
        descripcion: `
        La velocidade de treinamento del Cuartel <br>
        de Tiradores aumenta em 59.7(->60.7)%.<br>
        ⭐ Velocidade de treinamento  +20%.<br>
        ⭐⭐ Defensa de la unidade de arqueiros +10%.<br>
        ⭐⭐⭐ Redução de consumo de recursos en el <br>
                entrenamiento de la unidade de arqueiros -5%.<br>
        ⭐⭐⭐⭐ Ataque de la unidade de arqueiros +10%.<br>
        ⭐⭐⭐⭐⭐ El efecto de mejora de ataque e defesa 
        <br>         se aplican a todas las unidades +10%.
      `
      },
      4: {
        titulo: "4.Potencial Desencadeado ·Lv 1/1",
        descripcion: `
        Cada 1 héroes del Campamento Asas do Amanhecer en el campo de batalla aumenta o ataque <br>
        y defensa de las tropas en +5%.Además, ao desplegar 5 héroes del <br>
        Campamento Asas do Amanhecer,la capacidade das tropas aumenta<br>
        un 10& adicional.+10%.
      `
      }
    }
  },

  laura: {
    imgHabilidad: "../img-heroe-laura2.webP",
    imgEstrellas: "../img-heroe-laura-estrellas.webP",
    habilidades: {
      1: {
        titulo: "1.Instinto de Caçador. ·Lv 10/10.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 666(→686)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Chuva de Flechas Devastadoras ·Lv 20/20",
        descripcion: `
        Después de acumular energía, lanza una grande quantidade de explosivas<br>
        hacia adelante, Coeficiente de dano:1122(->1163), duración: 3 segundos.<br>
        ⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐ Alcance de dano +30%.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐⭐⭐ Explosão de queimadura adicional .<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Presente do Caçador ·Lv 10/10",
        descripcion: `Recebe 10 tarefas de radar grátis por día.<br>
        y aumenta a EXP del radar en un 26.2(->26.9)%.<br>
        ⭐ Missões gratuitas +5.<br>
        ⭐⭐ EXP de radar +10%.<br>
        ⭐⭐⭐ EXP de radar +10%<br>
        ⭐⭐⭐⭐ Missões gratuitas +10.<br>
        ⭐⭐⭐⭐⭐ Al completar missões de radar,obtén una caja de <br>
        exploración adicional (Limite diário 10 unidades)
        
      `
      },
      4: {
        titulo: "4.Potencial Desencadeado ·Lv 1/1",
        descripcion: `
        Ataque próprio +10%,Defesa +10%,<br>
        Capacidade das tropas +5%.
      `
      }
    }
  },

  emilia: {
    imgHabilidad: "../img-heroe-emilia2.webP",
    imgEstrellas: "../img-heroe-emilia-estrellas.webP",
    habilidades: {
      1: {
        titulo: "1.Foco do Assassino. ·Lv 10/10.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 666(→686)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Explosão de Precisão ·Lv 10/10",
        descripcion: `
        Marca 3 objetivos aleatoriamente, causando dano de explosión<br>
        a los objetivos y alos enemigos cercanos (Fator de dano:1122(->1163)).<br>
        ⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐ La explosión inflige un efeito de queimadura adicional.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐⭐⭐ Duplica o número de marcas e reduz o dano em 30.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Cientista ·Lv 10/10",
        descripcion: `
        El tempo de pesquisa gratuito aumenta em 30 minutos.<br>
        y la velocidade de pesquisa aumenta em 26.2(->26.9)%.<br>
        ⭐ Tempo grátis de pesquisa +15 min.<br>
        ⭐⭐ Velocidade de pesquisa +10%.<br>
        ⭐⭐⭐ Tempo grátis de pesquisa +60 min<br>
        ⭐⭐⭐⭐ Consumo de recursos básicos na pesquisa -5%.<br>
        ⭐⭐⭐⭐⭐ Consumo de recursos básicos na pesquisa -10%.
      `
      },
      4: {
        titulo: "4.Potencial Desencadeado ·Lv 1/1",
        descripcion: `
        Ataque próprio +10%,Defesa +10%,<br>
        Capacidade das tropas +5%.
      `
      }
    }
  },

  fiona: {
    imgHabilidad: "../img-heroe-fiona2.webp",
    imgEstrellas: "../img-heroe-fiona-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Reforço de Fogo. ·Lv 10/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 543(->553).<br>
        ⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +105
      `
      },
      2: {
        titulo: "2.Lança-chamas Ardente ·Lv 5/30",
        descripcion: `
        Rocía una gran cantidad de llamas de alta presión en el área<br>
        en forma de abanico al frente (Fator de dano:782(->803)).<br>
        durante 3 segundos.<br>
        ⭐ Coeficiente de dano adicional +100.<br>
        ⭐⭐ Coeficiente de dano adicional +100.<br>
        ⭐⭐⭐ Alcance de dano +30%.<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +200.<br>
        ⭐⭐⭐⭐⭐ Duración 2 segundos.
      `
      },
      3: {
        titulo: "3.Especialista em Ataque ·Lv 30/30",
        descripcion: `
        Incremento de ataque próprio en 1141.4(->1158.6).<br>
        ⭐ Ataque +50.<br>
        ⭐⭐ Ataque +50.<br>
        ⭐⭐⭐ Ataque +100.<br>
        ⭐⭐⭐⭐ Ataque +200.<br>
        ⭐⭐⭐⭐⭐ Ataque +300.
      `
      },
      4: {
        titulo: "4.Ataque de Facção ·Lv 1/1",
        descripcion: `
        ATQ de héroe de la facción Asas do Amanhecer +10%.
      `
      }
    }
  },

  cristina: {
    imgHabilidad: "../img-heroe-cristina2.webp",
    imgEstrellas: "../img-heroe-cristina-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Cavaleiro do Julgamento. ·Lv 6/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 501(->512).<br>
        ⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +105
      `
      },
      2: {
        titulo: "2.Tempestade de Chamas ·Lv 5/30",
        descripcion: `
        Gira su chicote creando un tornado de fogo,<br>
        coeficiente de daño:782(->803)), duração de 2 segundos.<br>
        ⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐⭐ Tem chances de causar adicionalmente<br>
                un efeito de queimadura.<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +200.<br>
        ⭐⭐⭐⭐⭐ Efecto de queimadura potencializado.
      `
      },
      3: {
        titulo: "3.Especialista em Cerco ·Lv 30/30",
        descripcion: `
        Reducción dde 90 segundos en el tempo de demolição al <br>
        atacar cidades neutras <br>
        ⭐ Consumo de combustível -2.<br>
        ⭐⭐ Tempo de demolição -15 segundos.<br>
        ⭐⭐⭐ Consumo de combustível -2.<br>
        ⭐⭐⭐⭐ Tempo de demolição -15 segundos.<br>
        ⭐⭐⭐⭐⭐Tempo de demolição -30 segundos.
      `
      },
      4: {
        titulo: "4.Especialização em cerco ·Lv 1/1",
        descripcion: `
        Independentemente de se Cristina participa da batalha,<br>
        el efeito de especialidade em cerco afecta a toda a formação.
      `
      }
    }
  },

  isabella: {
    imgHabilidad: "../img-heroe-isabella2.webp",
    imgEstrellas: "../img-heroe-isabella-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Bala Reforçada. ·Lv 5/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 491(->501).<br>
        ⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +105
      `
      },
      2: {
        titulo: "2.Tiro com Arma Dupla ·Lv 5/30",
        descripcion: `
        Dispara ambas armas simultáneamente, infligiendo<br>
        un dano massivo aos inimigos(Fator de dano:762(->783)).<br>
        ⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐⭐ Chances de imobilização aumentadas.<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +200.<br>
        ⭐⭐⭐⭐⭐ Duração da imobilização +1 segundo.
      `
      },
      3: {
        titulo: "3.Especialista em Ataque ·Lv 20/30",
        descripcion: `
        Aumenta a defesa própria en 1227.6(->1244.8).<br>
        ⭐ Defesa +50<br>
        ⭐⭐ Defesa +50.<br>
        ⭐⭐⭐ Defesa +100.<br>
        ⭐⭐⭐⭐ Defesa +200.<br>
        ⭐⭐⭐⭐⭐ Defesa +300.
      `
      },
      4: {
        titulo: "4.Defesa da facção ·Lv 1/1",
        descripcion: `
        DEF de héroe de la facción Asas do Amanhecer +10%.<br>
      `
      }
    }
  },

  angelina: {
    imgHabilidad: "../img-heroe-angelina2.webp",
    imgEstrellas: "../img-heroe-angelina-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Injeção de Toxina. ·Lv 20/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 431(->437).<br>
        ⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +40<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +70.
      `
      },
      2: {
        titulo: "2.Granada de soro ·Lv 20/30",
        descripcion: `
        Balancea el arma, causando dano a los enmigos en el<br>
        área em forma de leque à frente(Fator de Dano:862(->875)).<br>
        ⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +80.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +140.<br>
      `
      },
      3: {
        titulo: "3.Bem Treinado ·Lv 30/30",
        descripcion: `
        Velocidade de treinamento de tropas +30%.<br>
        ⭐ Velocidade de treinamento de tropas +2%<br>
        ⭐⭐ Velocidade de treinamento de tropas +2%.<br>
        ⭐⭐⭐ Velocidade de treinamento de tropas +3%.<br>
        ⭐⭐⭐⭐ Velocidade de treinamento de tropas +3%.<br>
        ⭐⭐⭐⭐⭐ Velocidade de treinamento de tropas +5%.<br>
      `
      },
      4: {
        titulo: "4.Defesa da Facção ·Lv 1/1",
        descripcion: `
        DEF de héroe de la facción Asas do Amanhecer +5%.
      `
      }
    }
  },

  natalia: {
    imgHabilidad: "../img-heroe-natalia2.webp",
    imgEstrellas: "../img-heroe-natalia-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Besta Reforçada. ·Lv 12/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 375(->382).<br>
        ⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +40<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +70.
      `
      },
      2: {
        titulo: "2.Tiro com Besta ·Lv 10/30",
        descripcion: `
        Se carga y dispara múltiples flechas de ballesta de alta<br>
        intensidad (Fator de Dano:724(->737)).<br>
        ⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +80.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +140.<br>
      `
      },
      3: {
        titulo: "3.Maestria em Coleta: Comida ·Lv 30/30",
        descripcion: `
        La velocidade de coleta de comida aumenta em 45%,<br>
        y la produção de comida aumenta em 30%.<br>
        ⭐ Velocidade de coleta de comida +3%<br>
        ⭐⭐ Produção de comida +15%.<br>
        ⭐⭐⭐ Velocidade de coleta de comida +6%.<br>
        ⭐⭐⭐⭐ Produção de recursos +20%.<br>
        ⭐⭐⭐⭐⭐ Velocidade de coleta +15%.<br>
      `
      },
      4: {
        titulo: "4.Ataque da Facção ·Lv 1/1",
        descripcion: `
        ATQ de héroe de la facción Asas do Amanhecer +5%.
      `
      }
    }
  },
  /*Guardian*/
  chinatsu: {
    imgHabilidad: "../img-heroe-chinatsu2.webp",
    imgEstrellas: "../img-heroe-chinatsu-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Golpe Rápido ·Lv 20/20",
        descripcion: `
        Fator de dano de ataque normal aumentado a 1083 (→1103)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Onda de Espada Espiral ·Lv 20/20",
        descripcion: `
        Desencadeia uma poderosa tempestade de energia con 
        sua espada,<br> Coeficiente de dano: 1686(->1727).<br>
        ⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐ Alcance de  daño +30%.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐⭐⭐Tornado de energia avança para frente.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Espírito Samurai ·Lv 20/20",
        descripcion: `
        Aumento de pontos de duelo de aliança
         <br>24.6(->24.9)%.<br>
        ⭐ Pontos de duelo de aliança +2%.<br>
        ⭐⭐ Pontos de duelo de aliança +3%.<br>
        ⭐⭐⭐ Pontos de duelo de aliança +3%<.<br>
        ⭐⭐⭐⭐ Pontos de duelo de aliança +5%.<br>
        ⭐⭐⭐⭐⭐ Pontos de duelo de aliança +7%.
      `
      },
      4: {
        titulo: "4.Despertar de potencial ·Lv 1/1",
        descripcion: `
      Ataque próprio +10%, Defesa +10%,<br> 
      Capacidade das tropas +5%.
      `
      }
    }
  },

  mia: {
    imgHabilidad: "../img-heroe-mia2.webp",
    imgEstrellas: "../img-heroe-mia-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Amplificação Elétrica ·Lv 15/15.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 859 (→880)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Ligação Relâmpago  ·Lv 15/15",
        descripcion: `
        Libera um raio que pode quicar entre monstros 
        <br> (Fator de dano: 1479(->1520).<br>
        ⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐ Número de ricochetes aumentado.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐⭐⭐ Número de ricochetes aumentado.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Especialista em modificações ·Lv 15/15",
        descripcion: `
        Recoge gratis 500 planos de modificação al día,la
        <br>experiência obtida por la mjeora del vehículo <br>
        aumenta um 14.8(->15.2)%.<br>
        ⭐ Planos de modificação gratuitos +100.<br>
        ⭐⭐ Experiência de melhoria +5%.<br>
        ⭐⭐⭐ Planos de modificação gratuitos +200<.<br>
        ⭐⭐⭐⭐ Experiência de melhoria +10%.<br>
        ⭐⭐⭐⭐⭐ Dano de habilidades do veículo modificado +200%.
      `
      },
      4: {
        titulo: "4.Estimulação do potencial ·Lv 1/1",
        descripcion: `
      Ataque próprio +10%, Defesa +10%,<br> 
      Capacidade das tropas +5%.
      `
      }
    }
  },

  halina: {
    imgHabilidad: "../img-heroe-halina2.webP",
    imgEstrellas: "../img-heroe-halina-estrellas.webP",
    habilidades: {
      1: {
        titulo: "1.Louvor da Destruição. ·Lv 10/10.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 666(→686)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Esmagamento de Martelo ·Lv 10/10",
        descripcion: `
        Empunha seu gigantesco martelo e golpeia os inimigos,<br>
        causando dano em área con un coeficiente de 1122(->1163)).<br>
        ⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐ Número de golpes de martelo +1.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐⭐⭐ Número de golpes de martelo +2.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Ordem de Batalha de Provocação ·Lv 10/10",
        descripcion: `
        Vida de los motociclista liderados +8.1(->8.4)%.<br>
        ⭐ Dano da unidadee de motociclista +2%.<br>
        ⭐⭐ Dano da unidadee de motociclista +3%.<br>
        ⭐⭐⭐ Dano da unidadee de motociclista +5%.<br>
        ⭐⭐⭐⭐ Dano da unidadee de motociclista +5%.<br>
        ⭐⭐⭐⭐⭐ Dano da unidadee de motociclista +10%.
      `
      },
      4: {
        titulo: "4.Potencial Desencadeado ·Lv 1/1",
        descripcion: `
        Ao desplegar 5 héroes de Guardião da Ordem<br>,
        vida de tropaa +10%.
      `
      }
    }
  },

  evelyn: {
    imgHabilidad: "../img-heroe-evelyn2.webP",
    imgEstrellas: "../img-heroe-evelyn-estrellas.webP",
    habilidades: {
      1: {
        titulo: "1.Soldado Blindado. ·Lv 15/15.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 859(→880)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Supressão de Fogo ·Lv 15/15",
        descripcion: `
        Lanza 6 cohetes, causando dano a los enemigos dentro<br>
        del alcance de explosión (Fator de Dano: 1479(->1520)).
        ⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐ Número de foguetes +3.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐⭐⭐ Número de foguetes +5.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Ordem da Rainha ·Lv 15/15",
        descripcion: `
        La velocidade de treinamento del quartel de .<br>
        motociclista aumenta em 54.5(->55.5)%.<br>
        ⭐ Velocidade de treinamento +20.<br>
        ⭐⭐ Defensa de la unidade de motos +10%.<br>
        ⭐⭐⭐ Redução de consumo de recursos en el 
                entrenamiento  de la unidade de motos -5%.<br>.
        ⭐⭐⭐⭐ Ataque de la unidade de motos +10%.<br>
        ⭐⭐⭐⭐⭐ El efecto de mejora de ataque e defesa se aplica 
                     a todas las unidades.
      `
      },
      4: {
        titulo: "4.Potencial Desencadeado ·Lv 1/1",
        descripcion: `
        Cada 1 héroes del Acampamento Guardião da Ordem en el Campo de <br> 
        batalla aumenta o ataque e defesa de las tropas en +5%.<br>
        Adem+as del Acampamento Guardião da Ordem, la capacidad de <br>
        las tropas aumenta um 10% adicional.<br>
      `
      }
    }
  },

  sakura: {
    imgHabilidad: "../img-heroe-sakura2.webp",
    imgEstrellas: "../img-heroe-sakura-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Modificação Mecânica. ·Lv 1/1.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 300(→320)<br>
        ⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐ Coeficiente de dano adicional +90<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +120<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +210
      `
      },
      2: {
        titulo: "2.Febre de Motos ·Lv 15/15",
        descripcion: `
        Lanza 1 misiles montados en el vehículo,bombardeando<br>
        continuamente al enemigo dobjetivo, con un<br>
        Coeficiente de dano:600(->641).<br>
        ⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐ Quantidade de mísseis +1.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +150.<br>
        ⭐⭐⭐⭐ Quantidade de mísseis +2.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +300
      `
      },
      3: {
        titulo: "3.Velocidade Vertiginosa ·Lv 15/15",
        descripcion: `
        La defensa de las unidades de motocicletas de la <br>
        tropa que lidera aumenta 15(->16)%.<br>
        ⭐ Ataque de la unidade de motos +5%.<br>
        ⭐⭐ Ataque de la unidade de motos +5%.<br>
        ⭐⭐⭐ Ataque de la unidade de motos +10%.<br>
        ⭐⭐⭐⭐ Ataque de la unidade de motos +10%.<br>
        ⭐⭐⭐⭐⭐ Ataque de la unidade de motos +15%.
      `
      },
      4: {
        titulo: "4.Despertar de potencial ·Lv 1/1",
        descripcion: `
        Independentemente de se Sakura vai à batalha,<br>
        el dano de todas as tropas de motocicletas aumenta um 10%.
      `
      }
    }
  },

  maria: {
    imgHabilidad: "../img-heroe-maria2.webp",
    imgEstrellas: "../img-heroe-maria-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Golpe de Martelo. ·Lv 20/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 646(->656).<br>
        ⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +105
      `
      },
      2: {
        titulo: "2.O Julgamento Final ·Lv 20/30",
        descripcion: `
        Golpea el suelo con el martillo pesado que tiene en <br>
        la mano,causando dano a los enemigos dentro del alcance<br>
        (Fator de dano:1093(->1113).<br>
        ⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐⭐ Tem chances de causar adicionalmente un.<br>
                efeito de recuo.
        ⭐⭐⭐⭐ Coeficiente de dano adicional +220.<br>
        ⭐⭐⭐⭐⭐ Efecto de recuo potencializado.
      `
      },
      3: {
        titulo: "3.Especialista em Treinamento ·Lv 30/30",
        descripcion: `
        Aumenta a velocidadee de treinamento de las tropas +50%.<br>
        ⭐ velocidade de treinamento de las tropas<br>
        ⭐⭐ Redução no consumo de recursos para entrenamiento -2%.<br>
        ⭐⭐⭐ velocidade de treinamento de las tropas +10%.<br>
        ⭐⭐⭐⭐ velocidade de treinamento de las tropas +10%.<br>
        ⭐⭐⭐⭐⭐ Redução no consumo de recursos para entrenamiento -3%.<br>
      `
      },
      4: {
        titulo: "4.Comandante de Facção ·Lv 1/1",
        descripcion: `
        Capacidade das tropas + 5%.
      `
      }
    }
  },

  leah: {
    imgHabilidad: "../img-heroe-leah2.webp",
    imgEstrellas: "../img-heroe-leah-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Tiro Certeiro. ·Lv 7/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 512(->522).<br>
        ⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +105
      `
      },
      2: {
        titulo: "2.Flechas do Silêncio ·Lv 5/30",
        descripcion: `
        Dispara flechas continuamente para formar una lluvia de <br>
        flechas, atacando continuamente a los enemigos en el área<br>
        objetivo (Fator de dano:782(->803)).<br>
        ⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐⭐ Duración 1 segundo.<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +220.<br>
        ⭐⭐⭐⭐⭐ Tem chances de causar adicionalmente<br>.
                     un efeito de queimadura.<br>
      `
      },
      3: {
        titulo: "3.Especialista em Ataque ·Lv 1/30",
        descripcion: `
        Incremento de ataque próprio en 900(->917.2).<br>
        ⭐ Ataque +50.<br>
        ⭐⭐ Ataque +50.<br>
        ⭐⭐⭐ Ataque +100.<br>
        ⭐⭐⭐⭐ Ataque +200.<br>
        ⭐⭐⭐⭐⭐ Ataque +300.
      `
      },
      4: {
        titulo: "4.Ataque de Facção ·Lv 1/1",
        descripcion: `
        ATQ de héroe de la facción Guardião da Ordem +10%.
      `
      }
    }
  },

  elizabeth: {
    imgHabilidad: "../img-heroe-elizabeth2.webp",
    imgEstrellas: "../img-heroe-elizabeth-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Presságio de Má Sorte. ·Lv 1/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 450(->460).<br>
        ⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐ Coeficiente de dano adicional +45<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +60<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +105
      `
      },
      2: {
        titulo: "2.Disparo de Dispersão ·Lv 1/30",
        descripcion: `
        Dispara rapidamente nos zumbis que chegam à frente <br>
        (Fator de dano:700(->720)), y tiene<br>
        chances de imobilizar a los objetivos.
        ⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐ Coeficiente de dano adicional +90.<br>
        ⭐⭐⭐ Chances de imobilização aumentadas<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +220.<br>
        ⭐⭐⭐⭐⭐ Duração da imobilização +1 segundos.<br>
      `
      },
      3: {
        titulo: "3.Especialista em Defesa ·Lv 1/30",
        descripcion: `
        Aumenta a defesa própria en 900(->917.2).<br>
        ⭐ Ataque +50.<br>
        ⭐⭐ Ataque +50.<br>
        ⭐⭐⭐ Ataque +100.<br>
        ⭐⭐⭐⭐ Ataque +200.<br>
        ⭐⭐⭐⭐⭐ Ataque +300.
      `
      },
      4: {
        titulo: "4.Defesa da Facção ·Lv 1/1",
        descripcion: `
        DEF de héroe de la facción Guardião da Ordem +10%.
      `
      }
    }
  },

  william: {
    imgHabilidad: "../img-heroe-william2.webp",
    imgEstrellas: "../img-heroe-william-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Bala Reforçada. ·Lv 20/30.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 431(->437).<br>
        ⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +40<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +70.
      `
      },
      2: {
        titulo: "2.Granada Explosiva ·Lv 20/30",
        descripcion: `
        Lanza granadas en la dirección designada, infligiendo<br>
        dano aos inimigos dentro del alcance de explosión<br>
        (Fator de Dano:862(->875)).<br>
        ⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +80.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +140.<br>
      `
      },
      3: {
        titulo: "3.Bem Treinado ·Lv 30/30",
        descripcion: `
        Velocidade de treinamento de tropas +30%<br>
        ⭐  Velocidade de treinamento de tropas +2%<br>
        ⭐⭐ Velocidade de treinamento de tropas +2%.<br>
        ⭐⭐⭐ Velocidade de treinamento de tropas +3%.<br>
        ⭐⭐⭐⭐ Velocidade de treinamento de tropas +3%
        ⭐⭐⭐⭐⭐ Velocidade de treinamento de tropas +5%.<br>
      `
      },
      4: {
        titulo: "4.Defesa da Facção ·Lv 1/1",
        descripcion: `
        DEF de héroe de la facción Guardião da Ordem +5%.
      `
      }
    }
  },

  atenea: {
    imgHabilidad: "../img-heroe-atenea2.webp",
    imgEstrellas: "../img-heroe-atenea-estrellas.webp",
    habilidades: {
      1: {
        titulo: "1.Modificação de Bala. ·Lv 20/20.",
        descripcion: `
        Fator de dano de ataque normal aumentado a 361(->367).<br>
        ⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐⭐ Coeficiente de dano adicional +30<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +40<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +70
      `
      },
      2: {
        titulo: "2.Disparo de Pistola ·Lv 10/20",
        descripcion: `
        Dispara con su pistola, coeficiente de daño:584(->597)).<br>
        ⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐⭐ Coeficiente de dano adicional +60.<br>
        ⭐⭐⭐⭐ Coeficiente de dano adicional +80.<br>
        ⭐⭐⭐⭐⭐ Coeficiente de dano adicional +140.<br>
      `
      },
      3: {
        titulo: "3.Maestria em Coleta: Eletricidade ·Lv 1/30",
        descripcion: `
        La velocidade de coleta de electricidad aumenta<br>
        en un 38.1(->38.8)%, y la produção de eletricidade <br>
        aumenta em 25.2(->25.7)%.<br>
        ⭐ velocidade de coleta de electricidad 3%.<br>
        ⭐⭐ Produção de comida +15%.<br>
        ⭐⭐⭐ velocidade de coleta de electricidad 6%.<br>
        ⭐⭐⭐⭐ Produção de recursos +20%.<br>
        ⭐⭐⭐⭐⭐ Velocidade de Coleta +15%.
      `
      },
      4: {
        titulo: "4.Defesa da Facção ·Lv 1/1",
        descripcion: `
        ATQ de héroe de la facción Guardião da Ordem +10%.
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
    nivelHeroe.textContent = `Nível ${nivel}`;

    imgHabilidad.src = dataHeroe.imgHabilidad;

    imgHabilidad.classList.add('active');

    infoDerecha.innerHTML = `
      <h3>${dataHeroe.habilidades[1].titulo}</h3>
      <p>${dataHeroe.habilidades[1].descripcion}</p>
    `;

    detalle.classList.remove('hidden');
    detalle.scrollIntoView({ behavior: 'smooth' });
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