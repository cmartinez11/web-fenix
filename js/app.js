// js/app.js

// 1. Configuración de Rutas Asíncronas (Fácil cambio a Hosting en el futuro)
const JSON_LOCAL_URL = "./json/productos.json";
let products = [];
let activeProduct = null;

// 2. Selección de Elementos del DOM
const productsGrid = document.getElementById("products-grid");
const searchInput = document.getElementById("search-input");
const productModal = document.getElementById("product-modal");
const modalOverlay = document.getElementById("modal-overlay");
const sidebarFilter = document.getElementById("sidebar-filter");
const resultsCount = document.getElementById("results-count");
const mobileResultsText = document.getElementById("mobile-results-text");

// Campos de detalle del Modal
const mImage = document.getElementById("modal-main-image");
const mThumbnails = document.getElementById("modal-thumbnails");
const mTitle = document.getElementById("modal-title");
const mDesc = document.getElementById("modal-desc");
const mBadge = document.getElementById("modal-badge");
const mSpecGramaje = document.getElementById("spec-gramaje");
const mSpecAcabado = document.getElementById("spec-acabado");
const mSpecDiametro = document.getElementById("spec-diametro");
const mSpecCapacidad = document.getElementById("spec-capacidad");
const mSpecIndustria = document.getElementById("spec-industria");
const btnModalWhatsapp = document.getElementById("btn-modal-whatsapp");

// 3. Orquestador de Arranque de la Aplicación (Ciclo de vida corregido)
async function inicializarCatalogo() {
  try {
    // A. Descarga los datos desde el JSON en Vercel
    const response = await fetch(JSON_LOCAL_URL);
    products = await response.json();

    // B. Expande los acordeones B2B por defecto en la interfaz
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.parentElement.classList.add('accordion-active');
    });

    // C. Levanta todos los listeners de eventos (Inputs, Scroll, Keydown)
    setupEvents();

    // D. Renderiza la lista inicial con los datos ya cargados
    filterProducts();

  } catch (error) {
    console.error("Error crítico al inicializar el catálogo industrial:", error);
  }
}

// Escucha única para arrancar el flujo de forma segura
document.addEventListener("DOMContentLoaded", inicializarCatalogo);

// 4. Configuración de Escuchadores de Eventos
function setupEvents() {
  // Búsqueda por texto en tiempo real
  searchInput.addEventListener("input", filterProducts);

  // Filtros laterales (Checkboxes)
  document.querySelectorAll(".filter-checkbox").forEach(cb => {
    cb.addEventListener("change", filterProducts);
  });

  // Disparadores para cerrar el modal
  document.querySelectorAll(".close-modal-trigger").forEach(el => {
    el.addEventListener("click", closeModal);
  });
  modalOverlay.addEventListener("click", closeModal);

  // Cerrar modal usando la tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Transición de fondo de la barra de navegación al hacer scroll
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("main-nav");
    if (nav) {
      if (window.scrollY > 40) {
        nav.classList.add("glass-nav-scrolled");
      } else {
        nav.classList.remove("glass-nav-scrolled");
      }
    }
  });
}

// 5. Lógica de Filtrado Dinámico (AND Inter-categoría, OR Intra-categoría)
function filterProducts() {
  const query = searchInput.value.toLowerCase().trim();

  // Agrupar los filtros activos según su tipología de atributo
  const activeFilters = {
    category: [],
    gramaje: [],
    acabado: [],
    diametro: [],
    capacidad: [],
    industria: []
  };

  document.querySelectorAll(".filter-checkbox:checked").forEach(cb => {
    const filterType = cb.getAttribute("data-filter");
    const val = cb.value;
    if (activeFilters[filterType]) {
      activeFilters[filterType].push(val);
    }
  });

  // Ejecución de la matriz de filtrado sobre el array en memoria
  const filtered = products.filter(p => {
    // Filtro A: Consulta por texto de búsqueda
    const matchesSearch = !query ||
      p.name.toLowerCase().includes(query) ||
      p.shortDesc.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.acabado.toLowerCase().includes(query) ||
      p.gramaje.toLowerCase().includes(query) ||
      p.industria.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    // Filtro B: Validación de Checkboxes multiselección
    for (const [key, selectedVals] of Object.entries(activeFilters)) {
      if (selectedVals.length > 0) {
        if (!selectedVals.includes(p[key])) {
          return false;
        }
      }
    }

    return true;
  });

  // Actualiza la grilla con los resultados procesados
  renderProductsList(filtered);
}

// 6. Renderizado de Tarjetas de Productos en la Grilla
function renderProductsList(filteredList) {
  if (!productsGrid) return;
  productsGrid.innerHTML = "";

  // Actualización cuantitativa de los indicadores de control
  const countText = `${filteredList.length} ${filteredList.length === 1 ? 'producto' : 'productos'}`;
  if (resultsCount) resultsCount.textContent = countText;
  if (mobileResultsText) mobileResultsText.textContent = `Mostrando ${countText}`;

  // Estado vacío: Cuando ningún elemento coincide con la búsqueda
  if (filteredList.length === 0) {
    productsGrid.innerHTML = `
      <div class="col-span-full py-16 text-center bg-[#131316] rounded border border-white/5 p-8">
        <svg class="w-12 h-12 mx-auto text-zinc-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h4 class="text-sm font-bold text-white mb-1 uppercase tracking-wider">No se encontraron productos</h4>
        <p class="text-xs text-zinc-400">Intente desmarcando filtros del sidebar o cambiando la búsqueda.</p>
        <button onclick="resetAllFilters()" class="mt-4 inline-flex items-center gap-1 bg-[#D4AF37] text-black font-bold text-xs px-4 py-2.5 rounded-full transition-transform hover:scale-105">
          Restablecer Filtros
        </button>
      </div>
    `;
    return;
  }

  // Bucle de renderizado para las tarjetas activas
  filteredList.forEach(product => {
    // Generación de payload de texto para link directo de WhatsApp comercial
    const waText = `Hola Grupo Fénix, deseo solicitar una cotización del siguiente producto industrial:\n- Producto: *${product.name}*\n- Línea: ${product.category}\n- Gramaje: ${product.gramaje !== 'N/A' ? product.gramaje : 'N/A'}\n- Rosca/Acabado: ${product.acabado !== 'N/A' ? product.acabado : 'N/A'}\n- Capacidad: ${product.capacidad !== 'N/A' ? product.capacidad : 'N/A'}\n- Industria: ${product.industria}\n\nPor favor, envíenme costos de fabricación y plazos de entrega mínimos.`;
    const waUrl = `https://wa.me/51970572564?text=${encodeURIComponent(waText)}`;

    // Renderizado condicional de tags de marca
    let badgeHtml = "";
    if (product.badge === "Eco-Fénix") {
      badgeHtml = `<span class="absolute top-4 left-4 bg-[#10B981] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-md z-10">Eco-Sostenible</span>`;
    } else if (product.badge) {
      badgeHtml = `<span class="absolute top-4 left-4 bg-[#D4AF37] text-black text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-md z-10">${product.badge}</span>`;
    }

    const card = document.createElement("div");
    card.className = "group relative bg-[#131316] border border-white/[0.03] p-4 rounded-sm flex flex-col justify-between transition-all duration-300 hover:border-[#D4AF37]/30";
    card.innerHTML = `
      ${badgeHtml}
      
      <div class="relative w-full aspect-square bg-[#0F0F11] border border-white/[0.02] rounded-sm flex items-center justify-center p-4 overflow-hidden">
        <img src="${product.image}" alt="${product.name}" class="object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-105">
      </div>

      <div class="pt-4 flex-grow flex flex-col justify-between">
        <div>
          <span class="text-[9px] uppercase tracking-widest text-[#10B981] font-bold block">${product.category}</span>
          <h3 class="font-medium text-sm text-white mt-1 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">${product.name}</h3>
          
          <div class="grid grid-cols-2 gap-x-2 gap-y-1 mt-3 pt-3 border-t border-white/[0.03] text-[10px] text-zinc-400 font-mono">
            <div>Gramaje: <span class="text-white font-medium">${product.gramaje}</span></div>
            <div>Rosca: <span class="text-white font-medium">${product.acabado}</span></div>
            <div>Boca: <span class="text-white font-medium">${product.diametro}</span></div>
            <div>Capac.: <span class="text-white font-medium">${product.capacidad}</span></div>
          </div>
        </div>

        <div class="mt-5 pt-3 border-t border-white/[0.03] space-y-2">
          <a href="${waUrl}" target="_blank" class="w-full flex items-center justify-center gap-1.5 bg-[#10B981] hover:bg-[#10B981]/90 text-black text-xs font-bold py-3 rounded-full transition-all duration-300 uppercase tracking-wider text-[10px]">
            <span>Cotizar por WhatsApp</span>
          </a>
          <button onclick="openDetailsModal(${product.id})" class="w-full flex items-center justify-center gap-1.5 border border-white/10 hover:border-[#D4AF37] text-white text-xs font-medium py-2.5 rounded-full transition-all text-[10px] uppercase tracking-wider bg-white/[0.01] hover:bg-white/[0.03]">
            <span>Ver Ficha Técnica</span>
          </button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// 7. Control de Modales de Ficha Técnica Expandida
function openDetailsModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  activeProduct = product;

  mTitle.textContent = product.name;
  mDesc.textContent = product.longDesc;
  mBadge.textContent = product.category;

  mSpecGramaje.textContent = product.gramaje || "N/A";
  mSpecAcabado.textContent = product.acabado || "N/A";
  mSpecDiametro.textContent = product.diametro || "N/A";
  mSpecCapacidad.textContent = product.capacidad || "N/A";
  mSpecIndustria.textContent = product.industria || "N/A";

  mImage.src = product.image;
  mImage.alt = product.name;

  mThumbnails.innerHTML = "";
  product.thumbnails.forEach((thumbUrl, idx) => {
    const btn = document.createElement("button");
    btn.className = `aspect-square bg-[#0F0F11] border border-white/10 rounded p-1 opacity-60 hover:opacity-100 transition-all ${idx === 0 ? 'thumbnail-active border-[#D4AF37]' : ''}`;
    btn.innerHTML = `<img src="${thumbUrl}" alt="Thumbnail ${idx}" class="w-full h-full object-contain">`;
    btn.addEventListener("click", () => {
      mImage.src = thumbUrl;
      document.querySelectorAll("#modal-thumbnails button").forEach(b => b.classList.remove("thumbnail-active", "border-[#D4AF37]"));
      btn.classList.add("thumbnail-active", "border-[#D4AF37]");
    });
    mThumbnails.appendChild(btn);
  });

  const waMsgText = `Hola Grupo Fénix, deseo recibir información adicional de la Ficha Técnica de:\n- Producto: *${product.name}*\n- Gramaje: ${product.gramaje}\n- Acabado: ${product.acabado}\n- Capacidad: ${product.capacidad}\n\nPor favor, contactar a un asesor comercial.`;
  btnModalWhatsapp.href = `https://wa.me/51900000000?text=${encodeURIComponent(waMsgText)}`;

  productModal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
  setTimeout(() => {
    productModal.classList.add("modal-active");
  }, 10);
}

function closeModal() {
  productModal.classList.remove("modal-active");
  document.body.classList.remove("overflow-hidden");
  setTimeout(() => {
    productModal.classList.add("hidden");
  }, 300);
}

// 8. Control del Sidebar Móvil
function toggleMobileSidebar() {
  sidebarFilter.classList.toggle("active");
}

// 9. Restablecimiento Total de Filtros
function resetAllFilters() {
  document.querySelectorAll(".filter-checkbox").forEach(cb => {
    cb.checked = false;
  });
  searchInput.value = "";
  filterProducts();
}

// Enrutador de clics desde las categorías de la Página de Inicio
function filterByCategory(catName) {
  resetAllFilters();

  const checkbox = document.querySelector(`.filter-checkbox[value="${catName}"]`);
  if (checkbox) {
    checkbox.checked = true;
    checkbox.closest('.border-b, .pb-2').classList.add('accordion-active');
  }

  filterProducts();

  const catalogSec = document.getElementById("catalogo");
  if (catalogSec) {
    catalogSec.scrollIntoView({ behavior: "smooth" });
  }

  if (sidebarFilter.classList.contains("active")) {
    sidebarFilter.classList.remove("active");
  }
}