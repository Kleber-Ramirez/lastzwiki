// ===========================
// WAIT FOR DOM TO LOAD
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  inicializarHeroes();
});

function inicializarHeroes() {

/* ===============================
   SELECTIONS
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
   CATEGORY FILTER
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
      if (!carouselsBuilt) { buildAllCarousels(); carouselsBuilt = true; }
    } else {
      allCarousels.classList.add('hidden');
      gridHeroes.style.display = 'grid';
      cards.forEach(card => {
        card.style.display = card.dataset.category === cat ? 'block' : 'none';
      });
    }
  });
});

/* ===============================
   BUILD CAROUSELS (ALL)
================================ */
function buildAllCarousels() {
  carouselBlocks.forEach(block => {
    const cat = block.dataset.category;
    const track = block.querySelector('.carousel-track');
    track.innerHTML = '';
    const heroes = [...cards].filter(card => card.dataset.category === cat);
    heroes.forEach(card => {
      const clone = card.cloneNode(true);
      clone.style.display = 'block';
      clone.addEventListener('click', () => { card.click(); });
      track.appendChild(clone);
    });
    startCarousel(track);
  });
}

/* ===============================
   SEMI-AUTOMATIC CAROUSEL
================================ */
function startCarousel(track) {
  if (track.dataset.running) return;
  track.dataset.running = 'true';
  let direction = 1;
  setInterval(() => {
    if (track.matches(':hover')) return;
    track.scrollLeft += direction * 0.6;
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth) direction = -1;
    if (track.scrollLeft <= 0) direction = 1;
  }, 16);
}

/* ===============================
   INITIALIZATION - FORCE ALL
================================ */
const btnAll = document.querySelector('.btn-cat[data-category="all"]');
if (btnAll) btnAll.click();

/* ===============================
   HERO DATA (ENGLISH)
================================ */

const heroesData = {

/* ── BLOOD ROSE ─────────────────────────────── */
  oliveira: {
    imgHabilidad: "../img-heroe-oliveira2.webp",
    habilidades: {
      1: { titulo: "1. Fatal Strike · Lv 20/20", descripcion: `Normal attack damage factor increased to 1083 (→1103)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Leaf Storm · Lv 20/20", descripcion: `Places a spinning cutting blade at the designated location, dealing damage to nearby enemies (Damage Factor: 1686→1727) for 4 seconds.<br>⭐ Additional damage coefficient +150<br>⭐⭐ Duration +1 sec<br>⭐⭐⭐ Additional damage coefficient +150<br>⭐⭐⭐⭐ Inflicts an additional bleeding effect.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +340` },
      3: { titulo: "3. Prodigy Girl · Lv 20/20", descripcion: `Assault Barracks training speed increased by 59.7(→60.7)%.<br>⭐ Training speed +20%<br>⭐⭐ Assault unit defense +10%<br>⭐⭐⭐ Assault unit training resource consumption -5%<br>⭐⭐⭐⭐ Assault unit attack +10%<br>⭐⭐⭐⭐⭐ Attack and defense buff also applies to all units.` },
      4: { titulo: "4. Unleashed Potential · Lv 1/1", descripcion: `Each Blood Rose hero on the battlefield increases troop attack and defense by +5%.<br>Deploying 5 Blood Rose heroes increases troop capacity by an extra 10%.` }
    }
  },

  lysia: {
    imgHabilidad: "../img-heroe-lysia.webp",
    habilidades: {
      1: { titulo: "1. Fierce Claw Slash · Lv 20/20", descripcion: `Normal attack damage factor increased to 1734(→1761)<br>⭐ Additional damage coefficient +120<br>⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐ Additional damage coefficient +150<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      2: { titulo: "2. Shadow Raid · Lv 13/30", descripcion: `Transforms into a shadow and appears behind the enemy to launch three claw attacks, Damage Coefficient: 2262(→2317).<br>⭐ Additional damage coefficient +200.<br>⭐⭐ Number of claw strikes +1.<br>⭐⭐⭐ Additional damage coefficient +200.<br>⭐⭐⭐⭐ Number of claw strikes +1.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +400` },
      3: { titulo: "3. Inseparable Shadow · Lv 20/30", descripcion: `Troop capacity increased by 69.3(→71.4)%.<br>⭐ Hero attack +2%, defense +2%.<br>⭐⭐ Hero attack +3%, defense +3%.<br>⭐⭐⭐ Hero attack +5%, defense +5%.<br>⭐⭐⭐⭐ Hero attack +5%, defense +5%.<br>⭐⭐⭐⭐⭐ Hero attack +5%, defense +5%.` },
      4: { titulo: "4. Feline Illusory Step · Lv 1/1", descripcion: `When deployed with Bella, Assault units gain 7.5% damage resistance.<br>At 5 stars, the effect applies to all unit types, and squad capacity increases by 7.5%.` }
    }
  },

  bella: {
    imgHabilidad: "../img-heroe-bella2.webp",
    habilidades: {
      1: { titulo: "1. Apocalypse Lethal Impact · Lv 20/20", descripcion: `Normal attack damage factor increased to 1083 (→1103)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Pacifying Fury · Lv 20/20", descripcion: `An unstoppable stampede that crushes enemies and causes AoE damage, Damage Coefficient 1686(→1727)<br>⭐ Additional damage coefficient +150<br>⭐⭐ Duration +1 sec<br>⭐⭐⭐ Additional damage coefficient +150<br>⭐⭐⭐⭐ Number of stomps +2.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Blazing Sun Order · Lv 20/20", descripcion: `Led Assault units' HP +11.6(→11.9)%.<br>⭐ Assault unit damage +2%<br>⭐⭐ Assault unit damage +3%.<br>⭐⭐⭐ Assault unit damage +5%.<br>⭐⭐⭐⭐ Assault unit damage +5%.<br>⭐⭐⭐⭐⭐ Assault unit damage +10%.` },
      4: { titulo: "4. Eternal Sacred Light · Lv 1/1", descripcion: `When deploying 5 Blood Rose heroes, troop HP +10%.` }
    }
  },

  sofia: {
    imgHabilidad: "../img-heroe-sofia2.webp",
    habilidades: {
      1: { titulo: "1. Apocalypse Hunter · Lv 20/20", descripcion: `Normal attack damage factor increased to 1083 (→1103)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Apocalyptic Madness · Lv 20/20", descripcion: `Calls mobile forces for a powerful strike in the target zone, Damage Coefficient: 1686(→1727)<br>⭐ Additional damage coefficient +150<br>⭐⭐ Number of support units +2<br>⭐⭐⭐ Additional damage coefficient +150<br>⭐⭐⭐⭐ Number of support units +3.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Lady's Gift · Lv 20/20", descripcion: `Construction time +90 min and construction speed increased by 33.1(→33.8)%.<br>⭐ Free Construction Time +15 min<br>⭐⭐ Construction Speed +10%<br>⭐⭐⭐ Free Construction Time +60 min.<br>⭐⭐⭐⭐ Construction resource consumption -5%.<br>⭐⭐⭐⭐⭐ Construction resource consumption -10%.` },
      4: { titulo: "4. Unleashed Potential · Lv 1/1", descripcion: `Own attack +10%, Defense +10%,<br>Troop capacity +5%.` }
    }
  },

  katrina: {
    imgHabilidad: "../img-heroe-katrina2.webp",
    habilidades: {
      1: { titulo: "1. Explosive Bullet · Lv 20/20", descripcion: `Normal attack damage factor increased to 1083 (→1103)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Full Assault · Lv 20/20", descripcion: `Orders elite troops to fire at maximum power, Damage Coefficient: 1686(→1727), lasting 6 seconds.<br>⭐ Additional damage coefficient +150<br>⭐⭐ Duration +1 second<br>⭐⭐⭐ Additional damage coefficient +150<br>⭐⭐⭐⭐ Duration +2 seconds.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Exploration Genius · Lv 20/20", descripcion: `AFK EXP in exploration stages increased by 33.1(→33.8)%.<br>⭐ Receive 100 free fuel every day.<br>⭐⭐ Stage AFK EXP +5%.<br>⭐⭐⭐ Stage AFK EXP +5%.<br>⭐⭐⭐⭐ Fuel Restoration Speed +10%.<br>⭐⭐⭐⭐⭐ Stage AFK EXP +10%.` },
      4: { titulo: "4. Potential Activation · Lv 1/1", descripcion: `Own attack +10%, Defense +10%,<br>Troop capacity +5%.` }
    }
  },

  selena: {
    imgHabilidad: "../img-heroe-selena2.webp",
    habilidades: {
      1: { titulo: "1. Tearing Wound · Lv 20/20", descripcion: `Normal attack damage factor increased to 1083 (→1103)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Wild Summon · Lv 20/20", descripcion: `The combat bear charges forward; upon encountering an enemy, slams the ground causing AoE damage, Damage Coefficient: 1686(→1727).<br>⭐ Additional damage coefficient +150.<br>⭐⭐ Damage range +30%.<br>⭐⭐⭐ Additional damage coefficient +150.<br>⭐⭐⭐⭐ Number of hits +2.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Natural Strength · Lv 20/20", descripcion: `Led Assault units' defense increased by 34.7(→35.7)%.<br>⭐ Assault unit attack +5%.<br>⭐⭐ Assault unit attack +5%.<br>⭐⭐⭐ Assault unit attack +10%.<br>⭐⭐⭐⭐ Assault unit attack +10%.<br>⭐⭐⭐⭐⭐ Assault unit attack +15%.` },
      4: { titulo: "4. Potential Awakening · Lv 1/1", descripcion: `Regardless of whether Selena goes into battle,<br>all Assault troop damage increases by 10%.` }
    }
  },

  vivian: {
    imgHabilidad: "../img-heroe-vivian2.webp",
    habilidades: {
      1: { titulo: "1. Magic Card · Lv 30/30", descripcion: `Normal attack damage factor increased to 750<br>⭐ Additional damage coefficient +45<br>⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐⭐ Additional damage coefficient +60<br>⭐⭐⭐⭐⭐ Additional damage coefficient +105` },
      2: { titulo: "2. Card Art · Lv 30/30", descripcion: `Controls cards to attack enemies in a circular area, Damage Coefficient: 1280, lasting 3 seconds.<br>⭐ Additional damage coefficient +90.<br>⭐⭐ Additional damage coefficient +90.<br>⭐⭐⭐ Damage range +30%.<br>⭐⭐⭐⭐ Additional damage coefficient +200.<br>⭐⭐⭐⭐⭐ Duration +1 second.` },
      3: { titulo: "3. Born of Fire · Lv 30/30", descripcion: `When fighting zombies outdoors, damage dealt by your troop increases by 30%.<br>⭐ Fuel consumption -1.<br>⭐⭐ Fuel consumption -1.<br>⭐⭐⭐ Fuel consumption when challenging the giant zombie reduced by 2.<br>⭐⭐⭐⭐ Damage dealt +10%.<br>⭐⭐⭐⭐⭐ Effect applies to all formations regardless of whether Vivian participates.` },
      4: { titulo: "4. Outdoor Specialization · Lv 1/1", descripcion: `Multiple units can attack the same zombie in the field.` }
    }
  },

  miranda: {
    imgHabilidad: "../img-heroe-miranda2.webp",
    habilidades: {
      1: { titulo: "1. Piercing Bullets · Lv 20/30", descripcion: `Normal attack damage factor increased to 646(→656).<br>⭐ Additional damage coefficient +45<br>⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐⭐ Additional damage coefficient +60<br>⭐⭐⭐⭐⭐ Additional damage coefficient +105` },
      2: { titulo: "2. Rapid Fire · Lv 13/30", descripcion: `Furious shooting at enemies ahead, Damage Coefficient: 929(→949), with a chance to stun the target.<br>⭐ Additional damage coefficient +90.<br>⭐⭐ Additional damage coefficient +90.<br>⭐⭐⭐ Stun chance increased.<br>⭐⭐⭐⭐ Additional damage coefficient +200.<br>⭐⭐⭐⭐⭐ Stun duration +1 second.` },
      3: { titulo: "3. Defense Expert · Lv 30/30", descripcion: `Increases own defense by 1400.<br>⭐ Defense +50<br>⭐⭐ Defense +50.<br>⭐⭐⭐ Defense +100.<br>⭐⭐⭐⭐ Defense +200.<br>⭐⭐⭐⭐⭐ Defense +300.` },
      4: { titulo: "4. Outdoor Specialization · Lv 1/1", descripcion: `Blood Rose faction hero DEF +10%.` }
    }
  },

  eva: {
    imgHabilidad: "../img-heroe-eva2.webp",
    habilidades: {
      1: { titulo: "1. Chemical Reaction · Lv 5/30", descripcion: `Normal attack damage factor increased to 491(→501).<br>⭐ Additional damage coefficient +45<br>⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐⭐ Additional damage coefficient +60<br>⭐⭐⭐⭐⭐ Additional damage coefficient +105` },
      2: { titulo: "2. Dangerous Reagent · Lv 6/30", descripcion: `Throws hazardous chemicals into the designated area, inflicting massive damage to enemies (Damage Factor: 803→824).<br>⭐ Additional damage coefficient +90.<br>⭐⭐ Additional damage coefficient +90.<br>⭐⭐⭐ Chance to additionally inflict poison damage.<br>⭐⭐⭐⭐ Additional damage coefficient +200.<br>⭐⭐⭐⭐⭐ Poison effect enhanced.` },
      3: { titulo: "3. Attack Expert · Lv 17/30", descripcion: `Own attack increased by 1175.9(→1193.1).<br>⭐ Attack +50<br>⭐⭐ Attack +50.<br>⭐⭐⭐ Attack +100.<br>⭐⭐⭐⭐ Attack +200.<br>⭐⭐⭐⭐⭐ Attack +300.` },
      4: { titulo: "4. Faction Attack · Lv 1/1", descripcion: `Blood Rose faction hero ATK +10%.` }
    }
  },

  audrey: {
    imgHabilidad: "../img-heroe-audrey2.webp",
    habilidades: {
      1: { titulo: "1. Furious Fist · Lv 30/30", descripcion: `Normal attack damage factor increased to 500.<br>⭐ Additional damage coefficient +30<br>⭐⭐ Additional damage coefficient +30<br>⭐⭐⭐ Additional damage coefficient +30<br>⭐⭐⭐⭐ Additional damage coefficient +40<br>⭐⭐⭐⭐⭐ Additional damage coefficient +70` },
      2: { titulo: "2. Muay Thai Impact · Lv 20/30", descripcion: `Draws weapon to attack enemies (Damage Factor: 862→875).<br>⭐ Additional damage coefficient +60.<br>⭐⭐ Additional damage coefficient +60.<br>⭐⭐⭐ Additional damage coefficient +60.<br>⭐⭐⭐⭐ Additional damage coefficient +80.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +140.` },
      3: { titulo: "3. Well Trained · Lv 30/30", descripcion: `Troop training speed +30%.<br>⭐ Troop training speed +2%.<br>⭐⭐ Troop training speed +2%.<br>⭐⭐⭐ Troop training speed +3%. Attack +100.<br>⭐⭐⭐⭐ Troop training speed +3%.<br>⭐⭐⭐⭐⭐ Troop training speed +5%.` },
      4: { titulo: "4. Faction Defense · Lv 1/1", descripcion: `Blood Rose faction hero DEF +5%.` }
    }
  },

  giselle: {
    imgHabilidad: "../img-heroe-giselle2.webp",
    habilidades: {
      1: { titulo: "1. Alloy Lever · Lv 20/30", descripcion: `Normal attack damage factor increased to 431(→437).<br>⭐ Additional damage coefficient +30<br>⭐⭐ Additional damage coefficient +30<br>⭐⭐⭐ Additional damage coefficient +30<br>⭐⭐⭐⭐ Additional damage coefficient +40<br>⭐⭐⭐⭐⭐ Additional damage coefficient +70.` },
      2: { titulo: "2. Lever Strike · Lv 20/30", descripcion: `Swings weapon, dealing damage to enemies in a fan-shaped area ahead (Damage Factor: 862→875).<br>⭐ Additional damage coefficient +60.<br>⭐⭐ Additional damage coefficient +60.<br>⭐⭐⭐ Additional damage coefficient +60.<br>⭐⭐⭐⭐ Additional damage coefficient +80.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +140.` },
      3: { titulo: "3. Wood Gathering Mastery · Lv 30/30", descripcion: `Wood gathering speed increased by 45%, and wood production increased by 30%.<br>⭐ Wood gathering speed +3%<br>⭐⭐ Wood production +15%.<br>⭐⭐⭐ Wood gathering speed +6%.<br>⭐⭐⭐⭐ Resource production +20%.<br>⭐⭐⭐⭐⭐ Gathering speed +15%.` },
      4: { titulo: "4. Faction Attack · Lv 1/1", descripcion: `Blood Rose faction hero ATK +5%.` }
    }
  },

/* ── WINGS OF DAWN ───────────────────────────── */
  nyx: {
    imgHabilidad: "../img-heroe-nyx2.webp",
    habilidades: {
      1: { titulo: "Skill 1 · Lv 1/20", descripcion: "Nyx fires a dark projectile that causes explosive damage." },
      2: { titulo: "Skill 2 · Lv 1/20", descripcion: "Increases armor penetration against armored enemies." },
      3: { titulo: "Skill 3 · Lv 1/20", descripcion: "Increases fire rate for a short period." },
      4: { titulo: "Skill 4 · Lv 1/20", descripcion: "Grants a general attack boost to the squad." }
    }
  },

  alma: {
    imgHabilidad: "../img-heroe-alma2.webp",
    habilidades: {
      1: { titulo: "1. Lethal Golden Bullet · Lv 15/15", descripcion: `Normal attack damage factor increased to 859(→880)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Golden Corruption · Lv 15/15", descripcion: `The Golden Serpent dances frantically, biting and poisoning many enemies. Damage Coefficient: 2262(→2317).<br>⭐ Additional damage coefficient +150.<br>⭐⭐ Number of Vipers +1.<br>⭐⭐⭐ Additional damage coefficient +150.<br>⭐⭐⭐⭐ Number of Vipers +1.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Purple Scale Decree · Lv 15/15", descripcion: `Led Shooter units' HP +9.8(→10.2)%.<br>⭐ Archer unit damage +2%.<br>⭐⭐ Archer unit damage +3%.<br>⭐⭐⭐ Archer unit damage +5%.<br>⭐⭐⭐⭐ Archer unit damage +5%.<br>⭐⭐⭐⭐⭐ Archer unit damage +10%.` },
      4: { titulo: "4. Black Gold Power · Lv 1/1", descripcion: `When deploying 5 Wings of Dawn heroes, Troop HP +10%.` }
    }
  },

  scarlett: {
    imgHabilidad: "../img-heroe-scarlett2.webp",
    habilidades: {
      1: { titulo: "1. Shadow Assault · Lv 20/20", descripcion: `Normal attack damage factor increased to 1083(→1103)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. EM Pulse · Lv 20/20", descripcion: `Charges weapon with electricity, releasing a powerful energy pulse forward (Damage Factor: 1686→1727).<br>⭐ Additional damage coefficient +150.<br>⭐⭐ Splits energy pulse into 2 parts, reducing damage by 30%.<br>⭐⭐⭐ Additional damage coefficient +150.<br>⭐⭐⭐⭐ Number of energy pulses +1.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Domination Power · Lv 20/20", descripcion: `Shooter Barracks training speed increased by 59.7(→60.7)%.<br>⭐ Training speed +20%.<br>⭐⭐ Archer unit defense +10%.<br>⭐⭐⭐ Archer unit training resource consumption -5%.<br>⭐⭐⭐⭐ Archer unit attack +10%.<br>⭐⭐⭐⭐⭐ Attack and defense buff also applies to all units +10%.` },
      4: { titulo: "4. Unleashed Potential · Lv 1/1", descripcion: `Each Wings of Dawn hero on the battlefield increases troop attack and defense by +5%.<br>Deploying 5 Wings of Dawn heroes increases troop capacity by an extra 10%.` }
    }
  },

  laura: {
    imgHabilidad: "../img-heroe-laura2.webp",
    habilidades: {
      1: { titulo: "1. Hunter's Instinct · Lv 10/10", descripcion: `Normal attack damage factor increased to 666(→686)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Devastating Arrow Rain · Lv 20/20", descripcion: `After gathering energy, launches a large number of explosives forward, Damage Coefficient: 1122(→1163), duration: 3 seconds.<br>⭐ Additional damage coefficient +150.<br>⭐⭐ Damage range +30%.<br>⭐⭐⭐ Additional damage coefficient +150.<br>⭐⭐⭐⭐ Additional burn explosion effect.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Hunter's Gift · Lv 10/10", descripcion: `Receive 10 free radar missions per day, and radar EXP increased by 26.2(→26.9)%.<br>⭐ Free missions +5.<br>⭐⭐ Radar EXP +10%.<br>⭐⭐⭐ Radar EXP +10%<br>⭐⭐⭐⭐ Free missions +10.<br>⭐⭐⭐⭐⭐ Upon completing radar missions, receive an additional exploration box (Daily limit: 10 units).` },
      4: { titulo: "4. Unleashed Potential · Lv 1/1", descripcion: `Own attack +10%, Defense +10%,<br>Troop capacity +5%.` }
    }
  },

  emilia: {
    imgHabilidad: "../img-heroe-emilia2.webp",
    habilidades: {
      1: { titulo: "1. Assassin's Focus · Lv 10/10", descripcion: `Normal attack damage factor increased to 666(→686)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Precision Explosion · Lv 10/10", descripcion: `Marks 3 random targets, inflicting explosion damage to targets and nearby enemies (Damage Factor: 1122→1163).<br>⭐ Additional damage coefficient +150.<br>⭐⭐ Explosion inflicts an additional burn effect.<br>⭐⭐⭐ Additional damage coefficient +150.<br>⭐⭐⭐⭐ Doubles the number of marks and reduces damage by 30.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Scientist · Lv 10/10", descripcion: `Free research time increased by 30 minutes, and research speed increased by 26.2(→26.9)%.<br>⭐ Free research time +15 min.<br>⭐⭐ Research speed +10%.<br>⭐⭐⭐ Free research time +60 min.<br>⭐⭐⭐⭐ Basic research resource consumption -5%.<br>⭐⭐⭐⭐⭐ Basic research resource consumption -10%.` },
      4: { titulo: "4. Unleashed Potential · Lv 1/1", descripcion: `Own attack +10%, Defense +10%,<br>Troop capacity +5%.` }
    }
  },

  fiona: {
    imgHabilidad: "../img-heroe-fiona2.webp",
    habilidades: {
      1: { titulo: "1. Fire Reinforcement · Lv 10/30", descripcion: `Normal attack damage factor increased to 543(→553).<br>⭐ Additional damage coefficient +45<br>⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐⭐ Additional damage coefficient +60<br>⭐⭐⭐⭐⭐ Additional damage coefficient +105` },
      2: { titulo: "2. Blazing Flamethrower · Lv 5/30", descripcion: `Sprays high-pressure flames in a fan-shaped area ahead (Damage Factor: 782→803), lasting 3 seconds.<br>⭐ Additional damage coefficient +100.<br>⭐⭐ Additional damage coefficient +100.<br>⭐⭐⭐ Damage range +30%.<br>⭐⭐⭐⭐ Additional damage coefficient +200.<br>⭐⭐⭐⭐⭐ Duration +2 seconds.` },
      3: { titulo: "3. Attack Expert · Lv 30/30", descripcion: `Own attack increased by 1141.4(→1158.6).<br>⭐ Attack +50.<br>⭐⭐ Attack +50.<br>⭐⭐⭐ Attack +100.<br>⭐⭐⭐⭐ Attack +200.<br>⭐⭐⭐⭐⭐ Attack +300.` },
      4: { titulo: "4. Faction Attack · Lv 1/1", descripcion: `Wings of Dawn faction hero ATK +10%.` }
    }
  },

  cristina: {
    imgHabilidad: "../img-heroe-cristina2.webp",
    habilidades: {
      1: { titulo: "1. Knight of Judgment · Lv 6/30", descripcion: `Normal attack damage factor increased to 501(→512).<br>⭐ Additional damage coefficient +45<br>⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐⭐ Additional damage coefficient +60<br>⭐⭐⭐⭐⭐ Additional damage coefficient +105` },
      2: { titulo: "2. Flame Storm · Lv 5/30", descripcion: `Spins whip creating a fire tornado, Damage Coefficient: 782(→803)), lasting 2 seconds.<br>⭐ Additional damage coefficient +90.<br>⭐⭐ Additional damage coefficient +90.<br>⭐⭐⭐ Chance to additionally inflict a burn effect.<br>⭐⭐⭐⭐ Additional damage coefficient +200.<br>⭐⭐⭐⭐⭐ Burn effect enhanced.` },
      3: { titulo: "3. Siege Expert · Lv 30/30", descripcion: `Demolition time reduced by 90 seconds when attacking neutral cities.<br>⭐ Fuel consumption -2.<br>⭐⭐ Demolition time -15 seconds.<br>⭐⭐⭐ Fuel consumption -2.<br>⭐⭐⭐⭐ Demolition time -15 seconds.<br>⭐⭐⭐⭐⭐ Demolition time -30 seconds.` },
      4: { titulo: "4. Siege Specialization · Lv 1/1", descripcion: `Regardless of whether Cristina participates in battle,<br>the siege specialty effect applies to the entire formation.` }
    }
  },

  isabella: {
    imgHabilidad: "../img-heroe-isabella2.webp",
    habilidades: {
      1: { titulo: "1. Reinforced Bullet · Lv 5/30", descripcion: `Normal attack damage factor increased to 491(→501).<br>⭐ Additional damage coefficient +45<br>⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐⭐ Additional damage coefficient +60<br>⭐⭐⭐⭐⭐ Additional damage coefficient +105` },
      2: { titulo: "2. Dual Weapon Shot · Lv 5/30", descripcion: `Fires both weapons simultaneously, inflicting massive damage to enemies (Damage Factor: 762→783).<br>⭐ Additional damage coefficient +90.<br>⭐⭐ Additional damage coefficient +90.<br>⭐⭐⭐ Immobilization chance increased.<br>⭐⭐⭐⭐ Additional damage coefficient +200.<br>⭐⭐⭐⭐⭐ Immobilization duration +1 second.` },
      3: { titulo: "3. Attack Expert · Lv 20/30", descripcion: `Own defense increased by 1227.6(→1244.8).<br>⭐ Defense +50<br>⭐⭐ Defense +50.<br>⭐⭐⭐ Defense +100.<br>⭐⭐⭐⭐ Defense +200.<br>⭐⭐⭐⭐⭐ Defense +300.` },
      4: { titulo: "4. Faction Defense · Lv 1/1", descripcion: `Wings of Dawn faction hero DEF +10%.` }
    }
  },

  angelina: {
    imgHabilidad: "../img-heroe-angelina2.webp",
    habilidades: {
      1: { titulo: "1. Toxin Injection · Lv 20/30", descripcion: `Normal attack damage factor increased to 431(→437).<br>⭐ Additional damage coefficient +30<br>⭐⭐ Additional damage coefficient +30<br>⭐⭐⭐ Additional damage coefficient +30<br>⭐⭐⭐⭐ Additional damage coefficient +40<br>⭐⭐⭐⭐⭐ Additional damage coefficient +70.` },
      2: { titulo: "2. Serum Grenade · Lv 20/30", descripcion: `Swings weapon, dealing damage to enemies in a fan-shaped area ahead (Damage Factor: 862→875).<br>⭐ Additional damage coefficient +60.<br>⭐⭐ Additional damage coefficient +60.<br>⭐⭐⭐ Additional damage coefficient +60.<br>⭐⭐⭐⭐ Additional damage coefficient +80.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +140.` },
      3: { titulo: "3. Well Trained · Lv 30/30", descripcion: `Troop training speed +30%.<br>⭐ Troop training speed +2%<br>⭐⭐ Troop training speed +2%.<br>⭐⭐⭐ Troop training speed +3%.<br>⭐⭐⭐⭐ Troop training speed +3%.<br>⭐⭐⭐⭐⭐ Troop training speed +5%.` },
      4: { titulo: "4. Faction Defense · Lv 1/1", descripcion: `Wings of Dawn faction hero DEF +5%.` }
    }
  },

  natalia: {
    imgHabilidad: "../img-heroe-natalia2.webp",
    habilidades: {
      1: { titulo: "1. Reinforced Crossbow · Lv 12/30", descripcion: `Normal attack damage factor increased to 375(→382).<br>⭐ Additional damage coefficient +30<br>⭐⭐ Additional damage coefficient +30<br>⭐⭐⭐ Additional damage coefficient +30<br>⭐⭐⭐⭐ Additional damage coefficient +40<br>⭐⭐⭐⭐⭐ Additional damage coefficient +70.` },
      2: { titulo: "2. Crossbow Shot · Lv 10/30", descripcion: `Charges and fires multiple high-intensity crossbow bolts (Damage Factor: 724→737).<br>⭐ Additional damage coefficient +60.<br>⭐⭐ Additional damage coefficient +60.<br>⭐⭐⭐ Additional damage coefficient +60.<br>⭐⭐⭐⭐ Additional damage coefficient +80.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +140.` },
      3: { titulo: "3. Food Gathering Mastery · Lv 30/30", descripcion: `Food gathering speed increased by 45%, and food production increased by 30%.<br>⭐ Food gathering speed +3%<br>⭐⭐ Food production +15%.<br>⭐⭐⭐ Food gathering speed +6%.<br>⭐⭐⭐⭐ Resource production +20%.<br>⭐⭐⭐⭐⭐ Gathering speed +15%.` },
      4: { titulo: "4. Faction Attack · Lv 1/1", descripcion: `Wings of Dawn faction hero ATK +5%.` }
    }
  },

/* ── ORDER GUARD ─────────────────────────────── */
  chinatsu: {
    imgHabilidad: "../img-heroe-chinatsu2.webp",
    habilidades: {
      1: { titulo: "1. Quick Slash · Lv 20/20", descripcion: `Normal attack damage factor increased to 1083 (→1103)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Spiral Sword Wave · Lv 20/20", descripcion: `Unleashes a powerful energy storm with the sword, Damage Coefficient: 1686(→1727).<br>⭐ Additional damage coefficient +150.<br>⭐⭐ Damage range +30%.<br>⭐⭐⭐ Additional damage coefficient +150.<br>⭐⭐⭐⭐ Energy tornado advances forward.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Samurai Spirit · Lv 20/20", descripcion: `Alliance duel points increased by 24.6(→24.9)%.<br>⭐ Alliance duel points +2%.<br>⭐⭐ Alliance duel points +3%.<br>⭐⭐⭐ Alliance duel points +3%.<br>⭐⭐⭐⭐ Alliance duel points +5%.<br>⭐⭐⭐⭐⭐ Alliance duel points +7%.` },
      4: { titulo: "4. Potential Awakening · Lv 1/1", descripcion: `Own attack +10%, Defense +10%,<br>Troop capacity +5%.` }
    }
  },

  mia: {
    imgHabilidad: "../img-heroe-mia2.webp",
    habilidades: {
      1: { titulo: "1. Electric Amplification · Lv 15/15", descripcion: `Normal attack damage factor increased to 859 (→880)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Lightning Link · Lv 15/15", descripcion: `Releases a bolt of lightning that can bounce between monsters (Damage Factor: 1479→1520).<br>⭐ Additional damage coefficient +150.<br>⭐⭐ Number of bounces increased.<br>⭐⭐⭐ Additional damage coefficient +150.<br>⭐⭐⭐⭐ Number of bounces increased.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Modification Expert · Lv 15/15", descripcion: `Receive 500 free modification blueprints per day, vehicle upgrade EXP increased by 14.8(→15.2)%.<br>⭐ Free modification blueprints +100.<br>⭐⭐ Upgrade EXP +5%.<br>⭐⭐⭐ Free modification blueprints +200.<br>⭐⭐⭐⭐ Upgrade EXP +10%.<br>⭐⭐⭐⭐⭐ Modified vehicle skill damage +200%.` },
      4: { titulo: "4. Potential Stimulation · Lv 1/1", descripcion: `Own attack +10%, Defense +10%,<br>Troop capacity +5%.` }
    }
  },

  halina: {
    imgHabilidad: "../img-heroe-halina2.webp",
    habilidades: {
      1: { titulo: "1. Praise of Destruction · Lv 10/10", descripcion: `Normal attack damage factor increased to 666(→686)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Hammer Crush · Lv 10/10", descripcion: `Wields a giant hammer and strikes enemies, causing AoE damage with a coefficient of 1122(→1163)).<br>⭐ Additional damage coefficient +150.<br>⭐⭐ Number of hammer hits +1.<br>⭐⭐⭐ Additional damage coefficient +150.<br>⭐⭐⭐⭐ Number of hammer hits +2.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Taunt Battle Order · Lv 10/10", descripcion: `Led motorcycle units' HP +8.1(→8.4)%.<br>⭐ Motorcyclist unit damage +2%.<br>⭐⭐ Motorcyclist unit damage +3%.<br>⭐⭐⭐ Motorcyclist unit damage +5%.<br>⭐⭐⭐⭐ Motorcyclist unit damage +5%.<br>⭐⭐⭐⭐⭐ Motorcyclist unit damage +10%.` },
      4: { titulo: "4. Unleashed Potential · Lv 1/1", descripcion: `When deploying 5 Order Guard heroes, Troop HP +10%.` }
    }
  },

  evelyn: {
    imgHabilidad: "../img-heroe-evelyn2.webp",
    habilidades: {
      1: { titulo: "1. Armored Soldier · Lv 15/15", descripcion: `Normal attack damage factor increased to 859(→880)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Fire Suppression · Lv 15/15", descripcion: `Launches 6 rockets, inflicting damage to enemies within the explosion range (Damage Factor: 1479→1520).<br>⭐ Additional damage coefficient +150.<br>⭐⭐ Number of rockets +3.<br>⭐⭐⭐ Additional damage coefficient +150.<br>⭐⭐⭐⭐ Number of rockets +5.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Queen's Order · Lv 15/15", descripcion: `Motorcycle Barracks training speed increased by 54.5(→55.5)%.<br>⭐ Training speed +20.<br>⭐⭐ Motorcycle unit defense +10%.<br>⭐⭐⭐ Motorcycle unit training resource consumption -5%.<br>⭐⭐⭐⭐ Motorcycle unit attack +10%.<br>⭐⭐⭐⭐⭐ Attack and defense buff applies to all units.` },
      4: { titulo: "4. Unleashed Potential · Lv 1/1", descripcion: `Each Order Guard hero on the battlefield increases troop attack and defense by +5%.<br>Deploying 5 Order Guard heroes increases troop capacity by an extra 10%.` }
    }
  },

  sakura: {
    imgHabilidad: "../img-heroe-sakura2.webp",
    habilidades: {
      1: { titulo: "1. Mechanical Modification · Lv 1/1", descripcion: `Normal attack damage factor increased to 300(→320)<br>⭐ Additional damage coefficient +90<br>⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐ Additional damage coefficient +90<br>⭐⭐⭐⭐ Additional damage coefficient +120<br>⭐⭐⭐⭐⭐ Additional damage coefficient +210` },
      2: { titulo: "2. Moto Fever · Lv 15/15", descripcion: `Launches 1 vehicle-mounted missile, continuously bombarding the target enemy, Damage Coefficient: 600(→641).<br>⭐ Additional damage coefficient +150.<br>⭐⭐ Number of missiles +1.<br>⭐⭐⭐ Additional damage coefficient +150.<br>⭐⭐⭐⭐ Number of missiles +2.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +300` },
      3: { titulo: "3. Vertiginous Speed · Lv 15/15", descripcion: `Led motorcycle units' defense increased by 15(→16)%.<br>⭐ Motorcycle unit attack +5%.<br>⭐⭐ Motorcycle unit attack +5%.<br>⭐⭐⭐ Motorcycle unit attack +10%.<br>⭐⭐⭐⭐ Motorcycle unit attack +10%.<br>⭐⭐⭐⭐⭐ Motorcycle unit attack +15%.` },
      4: { titulo: "4. Potential Awakening · Lv 1/1", descripcion: `Regardless of whether Sakura goes into battle,<br>all motorcycle troop damage increases by 10%.` }
    }
  },

  maria: {
    imgHabilidad: "../img-heroe-maria2.webp",
    habilidades: {
      1: { titulo: "1. Hammer Strike · Lv 20/30", descripcion: `Normal attack damage factor increased to 646(→656).<br>⭐ Additional damage coefficient +45<br>⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐⭐ Additional damage coefficient +60<br>⭐⭐⭐⭐⭐ Additional damage coefficient +105` },
      2: { titulo: "2. The Final Judgment · Lv 20/30", descripcion: `Slams the ground with the heavy hammer, inflicting damage to enemies within range (Damage Factor: 1093→1113).<br>⭐ Additional damage coefficient +90.<br>⭐⭐ Additional damage coefficient +90.<br>⭐⭐⭐ Chance to additionally cause a knockback effect.<br>⭐⭐⭐⭐ Additional damage coefficient +220.<br>⭐⭐⭐⭐⭐ Knockback effect enhanced.` },
      3: { titulo: "3. Training Expert · Lv 30/30", descripcion: `Troop training speed increased by +50%.<br>⭐ Troop training speed +5%<br>⭐⭐ Training resource consumption -2%.<br>⭐⭐⭐ Troop training speed +10%.<br>⭐⭐⭐⭐ Troop training speed +10%.<br>⭐⭐⭐⭐⭐ Training resource consumption -3%.` },
      4: { titulo: "4. Faction Commander · Lv 1/1", descripcion: `Troop capacity +5%.` }
    }
  },

  leah: {
    imgHabilidad: "../img-heroe-leah2.webp",
    habilidades: {
      1: { titulo: "1. Crack Shot · Lv 7/30", descripcion: `Normal attack damage factor increased to 512(→522).<br>⭐ Additional damage coefficient +45<br>⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐⭐ Additional damage coefficient +60<br>⭐⭐⭐⭐⭐ Additional damage coefficient +105` },
      2: { titulo: "2. Silence Arrows · Lv 5/30", descripcion: `Continuously fires arrows forming an arrow rain, continuously attacking enemies in the target area (Damage Factor: 782→803).<br>⭐ Additional damage coefficient +90.<br>⭐⭐ Additional damage coefficient +90.<br>⭐⭐⭐ Duration +1 second.<br>⭐⭐⭐⭐ Additional damage coefficient +220.<br>⭐⭐⭐⭐⭐ Chance to additionally cause a burn effect.` },
      3: { titulo: "3. Attack Expert · Lv 1/30", descripcion: `Own attack increased by 900(→917.2).<br>⭐ Attack +50.<br>⭐⭐ Attack +50.<br>⭐⭐⭐ Attack +100.<br>⭐⭐⭐⭐ Attack +200.<br>⭐⭐⭐⭐⭐ Attack +300.` },
      4: { titulo: "4. Faction Attack · Lv 1/1", descripcion: `Order Guard faction hero ATK +10%.` }
    }
  },

  elizabeth: {
    imgHabilidad: "../img-heroe-elizabeth2.webp",
    habilidades: {
      1: { titulo: "1. Bad Luck Omen · Lv 1/30", descripcion: `Normal attack damage factor increased to 450(→460).<br>⭐ Additional damage coefficient +45<br>⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐ Additional damage coefficient +45<br>⭐⭐⭐⭐ Additional damage coefficient +60<br>⭐⭐⭐⭐⭐ Additional damage coefficient +105` },
      2: { titulo: "2. Scatter Shot · Lv 1/30", descripcion: `Quickly fires at incoming zombies ahead (Damage Factor: 700→720), with a chance to immobilize targets.<br>⭐ Additional damage coefficient +90.<br>⭐⭐ Additional damage coefficient +90.<br>⭐⭐⭐ Immobilization chance increased.<br>⭐⭐⭐⭐ Additional damage coefficient +220.<br>⭐⭐⭐⭐⭐ Immobilization duration +1 second.` },
      3: { titulo: "3. Defense Expert · Lv 1/30", descripcion: `Own defense increased by 900(→917.2).<br>⭐ Attack +50.<br>⭐⭐ Attack +50.<br>⭐⭐⭐ Attack +100.<br>⭐⭐⭐⭐ Attack +200.<br>⭐⭐⭐⭐⭐ Attack +300.` },
      4: { titulo: "4. Faction Defense · Lv 1/1", descripcion: `Order Guard faction hero DEF +10%.` }
    }
  },

  william: {
    imgHabilidad: "../img-heroe-william2.webp",
    habilidades: {
      1: { titulo: "1. Reinforced Bullet · Lv 20/30", descripcion: `Normal attack damage factor increased to 431(→437).<br>⭐ Additional damage coefficient +30<br>⭐⭐ Additional damage coefficient +30<br>⭐⭐⭐ Additional damage coefficient +30<br>⭐⭐⭐⭐ Additional damage coefficient +40<br>⭐⭐⭐⭐⭐ Additional damage coefficient +70.` },
      2: { titulo: "2. Explosive Grenade · Lv 20/30", descripcion: `Throws grenades in the designated direction, inflicting damage to enemies within the explosion range (Damage Factor: 862→875).<br>⭐ Additional damage coefficient +60.<br>⭐⭐ Additional damage coefficient +60.<br>⭐⭐⭐ Additional damage coefficient +60.<br>⭐⭐⭐⭐ Additional damage coefficient +80.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +140.` },
      3: { titulo: "3. Well Trained · Lv 30/30", descripcion: `Troop training speed +30%<br>⭐ Troop training speed +2%<br>⭐⭐ Troop training speed +2%.<br>⭐⭐⭐ Troop training speed +3%.<br>⭐⭐⭐⭐ Troop training speed +3%<br>⭐⭐⭐⭐⭐ Troop training speed +5%.` },
      4: { titulo: "4. Faction Defense · Lv 1/1", descripcion: `Order Guard faction hero DEF +5%.` }
    }
  },

  atenea: {
    imgHabilidad: "../img-heroe-atenea2.webp",
    habilidades: {
      1: { titulo: "1. Bullet Modification · Lv 20/20", descripcion: `Normal attack damage factor increased to 361(→367).<br>⭐ Additional damage coefficient +30<br>⭐⭐ Additional damage coefficient +30<br>⭐⭐⭐ Additional damage coefficient +30<br>⭐⭐⭐⭐ Additional damage coefficient +40<br>⭐⭐⭐⭐⭐ Additional damage coefficient +70` },
      2: { titulo: "2. Pistol Shot · Lv 10/20", descripcion: `Fires with pistol, Damage Coefficient: 584(→597)).<br>⭐ Additional damage coefficient +60.<br>⭐⭐ Additional damage coefficient +60.<br>⭐⭐⭐ Additional damage coefficient +60.<br>⭐⭐⭐⭐ Additional damage coefficient +80.<br>⭐⭐⭐⭐⭐ Additional damage coefficient +140.` },
      3: { titulo: "3. Electricity Gathering Mastery · Lv 1/30", descripcion: `Electricity gathering speed increased by 38.1(→38.8)%, and electricity production increased by 25.2(→25.7)%.<br>⭐ Electricity gathering speed +3%.<br>⭐⭐ Food production +15%.<br>⭐⭐⭐ Electricity gathering speed +6%.<br>⭐⭐⭐⭐ Resource production +20%.<br>⭐⭐⭐⭐⭐ Gathering speed +15%.` },
      4: { titulo: "4. Faction Defense · Lv 1/1", descripcion: `Order Guard faction hero ATK +10%.` }
    }
  },
  // 👉 Add more heroes here without touching the JS
};


/* ===============================
   STATE
================================ */
let heroeActual = null;

/* ===============================
   OPEN HERO
================================ */
cards.forEach(card => {
  card.addEventListener('click', () => {
    const nombre = card.dataset.nombre;
    const nivel = card.dataset.nivel;
    const dataHeroe = heroesData[nombre];
    if (!dataHeroe) return;

    heroeActual = dataHeroe;
    nombreHeroe.textContent = nombre;
    nivelHeroe.textContent = `Level ${nivel}`;
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
   SKILLS (PER HERO)
================================ */
document.querySelectorAll('.skill-hotspots button').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!heroeActual) return;
    document.querySelectorAll('.skill-hotspots button').forEach(b => b.classList.remove('active'));
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
// EQUIPMENT FILTER
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
    if (tier === 'all') {
      exclusiveCarousel.classList.remove('hidden');
      equipClassColumn.classList.remove('hidden');
      gridEquip.classList.add('hidden');
      equipCards.forEach(card => { card.style.display = 'none'; });
      buildExclusiveCarousel();
      ['s', 'a', 'b', 'c'].forEach(t => buildEquipClassCarousel(t));
    } else if (tier === 'exclusivo') {
      exclusiveCarousel.classList.add('hidden');
      equipClassColumn.classList.add('hidden');
      gridEquip.classList.remove('hidden');
      equipCards.forEach(card => { card.style.display = card.dataset.tier === 'exclusivo' ? 'block' : 'none'; });
    } else {
      exclusiveCarousel.classList.add('hidden');
      equipClassColumn.classList.add('hidden');
      gridEquip.classList.remove('hidden');
      equipCards.forEach(card => { card.style.display = card.dataset.tier === tier ? 'block' : 'none'; });
    }
  });
});

function buildExclusiveCarousel() {
  if (exclusiveBuilt) return;
  exclusiveTrack.innerHTML = '';
  [...equipCards].filter(c => c.dataset.tier === 'exclusivo').forEach(card => {
    const clone = card.cloneNode(true);
    clone.style.display = 'block';
    exclusiveTrack.appendChild(clone);
  });
  startAutoScroll(exclusiveTrack);
  exclusiveBuilt = true;
}

function buildEquipClassCarousel(tier) {
  const card = document.querySelector(`.equip-class-card[data-tier="${tier}"]`);
  if (!card) return;
  const track = card.querySelector('.equip-class-track');
  if (track.dataset.built === 'true') return;
  track.dataset.built = 'true';
  [...equipCards].filter(e => e.dataset.tier === tier).forEach(equip => {
    const clone = equip.cloneNode(true);
    clone.style.display = 'block';
    track.appendChild(clone);
  });
  startAutoScroll(track);
}

function startAutoScroll(track) {
  let direction = 1;
  setInterval(() => {
    if (track.matches(':hover')) return;
    track.scrollLeft += direction * 0.6;
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth) direction = -1;
    if (track.scrollLeft <= 0) direction = 1;
  }, 16);
}

const btnEquipAll = document.querySelector('.btn-equip[data-tier="all"]');
if (btnEquipAll) btnEquipAll.click();

} // ← CLOSES inicializarHeroes()