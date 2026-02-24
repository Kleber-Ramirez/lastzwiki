// ===========================
// MODAL GENERAL (para todos los edificios)
// ===========================

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.ver').forEach(btn => {
  btn.addEventListener('click', () => {
    modalTitle.textContent = btn.dataset.title;
    modalImg.src = btn.dataset.img;
    modalImg.alt = btn.dataset.title;

    if (btn.dataset.template) {
      const template = document.querySelector(btn.dataset.template);
      modalDesc.innerHTML = template.innerHTML;
      
      if (btn.dataset.template === '#tabla-laboratorio') {
        initLabTabs(modalDesc);
      }
      
      if (btn.dataset.template === '#tabla-club') {
        initClubTabs(modalDesc);
      }

        // 🔥 AÑADIR AQUÍ (después del club)
      if (btn.dataset.template === '#tabla-caravana') {
        initCaravanaTabs(modalDesc);
      }
      // Si es el taller, inicializar los tabs del taller
      if (btn.dataset.template === '#tabla-taller') {
        initTallerTabs(modalDesc);
      }
    } else {
      modalDesc.textContent = btn.dataset.desc;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    if (typeof closeSedeModal !== 'undefined') closeSedeModal();
  }
});

// ===========================
// LABORATORIO - Expandir/Colapsar investigaciones
// ===========================

function toggleResearch(header) {
  const item = header.parentElement;
  const isActive = item.classList.contains('active');
  
  document.querySelectorAll('.lab-research-item').forEach(research => {
    research.classList.remove('active');
    const toggle = research.querySelector('.lab-toggle');
    if (toggle) toggle.textContent = '▼';
  });
  
  if (!isActive) {
    item.classList.add('active');
    const toggle = header.querySelector('.lab-toggle');
    if (toggle) toggle.textContent = '▲';
  }
}

// ===========================
// LABORATORIO - Inicializar Tabs
// ===========================

function initLabTabs(container) {
  const tabs = container.querySelectorAll('.lab-tab');
  const panels = container.querySelectorAll('.lab-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      this.classList.add('active');
      const targetPanel = container.querySelector(`.lab-panel[data-category="${category}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// ===========================
// CLUB - Inicializar Tabs
// ===========================

function initClubTabs(container) {
  const tabs = container.querySelectorAll('.club-tab');
  const panels = container.querySelectorAll('.club-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      this.classList.add('active');
      const targetPanel = container.querySelector(`.club-panel[data-category="${category}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// ===========================
// CARAVANA - Inicializar Tabs
// ===========================

function initCaravanaTabs(container) {
  const tabs = container.querySelectorAll('.caravana-tab');
  const panels = container.querySelectorAll('.caravana-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      this.classList.add('active');
      const targetPanel = container.querySelector(`.caravana-panel[data-category="${category}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// ===========================
// CARAVANA - Expandir/Colapsar Facciones
// ===========================

function toggleFaccion(header) {
  const item = header.parentElement;
  const isActive = item.classList.contains('active');
  
  // Cerrar todas las demás
  document.querySelectorAll('.faccion-item').forEach(faccion => {
    faccion.classList.remove('active');
    const toggle = faccion.querySelector('.faccion-toggle');
    if (toggle) toggle.textContent = '▼';
  });
  
  // Si no estaba activo, abrirlo
  if (!isActive) {
    item.classList.add('active');
    const toggle = header.querySelector('.faccion-toggle');
    if (toggle) toggle.textContent = '▲';
  }
}

// ===========================
// TALLER - Inicializar Tabs
// ===========================

function initTallerTabs(container) {
  const tabs = container.querySelectorAll('.taller-tab');
  const panels = container.querySelectorAll('.taller-panel');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      this.classList.add('active');
      const targetPanel = container.querySelector(`.taller-panel[data-category="${category}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// ===========================
// MODAL DE SEDE CENTRAL
// ===========================

function openSedeModal() {
  const sedeModal = document.getElementById('sedeModal');
  if (sedeModal) {
    sedeModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeSedeModal() {
  const sedeModal = document.getElementById('sedeModal');
  if (sedeModal) {
    sedeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

window.onclick = function(event) {
  const sedeModal = document.getElementById('sedeModal');
  if (sedeModal && event.target == sedeModal) {
    closeSedeModal();
  }
}

// ===========================
// SISTEMA DE TABS (Sede Central)
// ===========================

function openSedeTab(tabName) {
  const panels = document.querySelectorAll('.sede-tab-panel');
  panels.forEach(panel => {
    panel.classList.remove('active');
  });

  const tabs = document.querySelectorAll('.sede-tab');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });

  const targetPanel = document.getElementById(tabName);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }
  
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// ===========================
// FILTROS DE REQUISITOS (Sede Central)
// ===========================

function filterSedeNivel(range) {
  const items = document.querySelectorAll('.sede-req-item');
  const buttons = document.querySelectorAll('.sede-filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  if (event && event.target) {
    event.target.classList.add('active');
  }

  items.forEach(item => {
    if (range === 'all') {
      item.style.display = 'block';
    } else {
      if (item.dataset.range === range) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    }
  });
}

// ===========================
// FILTROS DE EDIFICIOS (Separados: Generales vs Temporadas)
// ===========================

let currentCategory = 'all';
let currentSeason = 'all';

// Aplicar filtros de forma INDEPENDIENTE
function applyFilters() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    const cardSeason = card.getAttribute('data-season');
    
    let shouldShow = false;
    
    // LÓGICA PARA EDIFICIOS DE TEMPORADA (s2, s3, s4, s5)
    if (cardSeason && cardSeason !== 'general') {
      // Solo mostrar si se seleccionó temporada específica (NO en "all")
      shouldShow = (currentSeason !== 'all' && cardSeason === currentSeason);
    } 
    // LÓGICA PARA EDIFICIOS GENERALES
    else if (cardSeason === 'general') {
      // Solo mostrar si NO hay temporada activa (o está en "all")
      if (currentSeason === 'all') {
        if (currentCategory === 'all') {
          shouldShow = true;
        } else {
          shouldShow = cardCategory === currentCategory;
        }
      }
    }
    
    card.style.display = shouldShow ? 'block' : 'none';
  });
}

// ===========================
// COMERCIO INTERURBANO - TABS
// ===========================

function openComercioTab(evt, tabName) {
  // Ocultar todos los contenidos
  const tabContents = document.querySelectorAll('.comercio-tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
  });

  // Desactivar todos los botones
  const tabs = document.querySelectorAll('.comercio-tab');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });

  // Mostrar el tab seleccionado
  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Activar el botón clickeado
  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add('active');
  }
}

// ===========================
// INICIALIZACIÓN
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🔍 Iniciando sistema de filtros...');
  
  // Filtro de categorías (SOLO para edificios generales)
  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('✅ Click en categoría:', this.getAttribute('data-filter'));
      
      document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.getAttribute('data-filter');
      
      // Reset temporadas a ALL
      currentSeason = 'all';
      document.querySelectorAll('.season-btn').forEach(b => b.classList.remove('active'));
      const allSeasonBtn = document.querySelector('.season-btn[data-season="all"]');
      if (allSeasonBtn) allSeasonBtn.classList.add('active');
      
      applyFilters();
    });
  });

  // Filtro de temporadas (SOLO para edificios de temporada)
  document.querySelectorAll('.season-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('✅ Click en temporada:', this.getAttribute('data-season'));
      
      document.querySelectorAll('.season-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentSeason = this.getAttribute('data-season');
      
      // Reset categorías a Todos
      currentCategory = 'all';
      document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
      const allCategoryBtn = document.querySelector('.filtro-btn[data-filter="all"]');
      if (allCategoryBtn) allCategoryBtn.classList.add('active');
      
      applyFilters();
    });
  });

  // ============================================
// NAVEGACIÓN DIRECTA A SECCIÓN DE REFUGIADOS
// ============================================
window.addEventListener('load', function() {
  const hash = window.location.hash;
  
  if (hash === '#club-refugiados') {
    
    // 1. Buscar el botón "Ver más" del Club
    const clubButton = document.querySelector('button[data-template="#tabla-club"]');
    
    if (clubButton) {
      // 2. Simular click para abrir el modal
      clubButton.click();
      
      // 3. Esperar a que el modal se abra y el template se cargue
      setTimeout(() => {
        
        // 4. El contenido se carga en modalDesc (según tu código)
        const modalDesc = document.getElementById('modal-desc');
        
        if (modalDesc) {
          // 5. Buscar el tab de refugiados dentro del modal
          const tabRefugiados = modalDesc.querySelector('.club-tab[data-category="refugiados"]');
          
          if (tabRefugiados) {
            // 6. Simular click en el tab de refugiados
            tabRefugiados.click();
            
            // 7. Scroll suave al panel de refugiados (opcional)
            setTimeout(() => {
              const refugiadosPanel = modalDesc.querySelector('#club-refugiados');
              if (refugiadosPanel) {
                refugiadosPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 200);
          }
        }
        
      }, 500); // Dar tiempo para que el modal se abra completamente
    }
  }
});
  
  // Aplicar filtros iniciales
  applyFilters();
  
  console.log('✅ Modal de Sede Central cargado correctamente');
  console.log('✅ Modal general, laboratorio y club cargados correctamente');
  console.log('✅ Filtros de edificios cargados correctamente');
});