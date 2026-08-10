// js/app.js

// 1. Configuración de Rutas y Estado de Paginación
const JSON_LOCAL_URL = "./json/productos.json";
let products = [];
let filteredProductsList = [];
let currentPage = 1;
const itemsPerPage = 12; // 4 filas x 3 columnas

// 2. Selección de Elementos del DOM
const productsGrid = document.getElementById("products-grid");
const paginationContainer = document.getElementById("pagination-container");
const searchInput = document.getElementById("search-input");
const productModal = document.getElementById("product-modal");
const modalOverlay = document.getElementById("modal-overlay");
const sidebarFilter = document.getElementById("sidebar-filter");
const resultsCount = document.getElementById("results-count");
const mobileResultsText = document.getElementById("mobile-results-text");

// Campos del Modal Ficha Técnica
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
const mSpecColores = document.getElementById("spec-colores");
const btnModalWhatsapp = document.getElementById("btn-modal-whatsapp");

// 3. Orquestador de Arranque de la Aplicación
async function inicializarCatalogo() {
  try {
    const response = await fetch(JSON_LOCAL_URL);
    products = await response.json();

    document.querySelectorAll('.accordion-header').forEach(header => {
      header.parentElement.classList.add('accordion-active');
    });

    setupEvents();
    filterProducts();

  } catch (error) {
    console.error("Error crítico al inicializar el catálogo industrial:", error);
  }
}

document.addEventListener("DOMContentLoaded", inicializarCatalogo);

// 4. Configuración de Listeners
function setupEvents() {
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentPage = 1;
      filterProducts();
    });
  }

  document.querySelectorAll(".filter-checkbox").forEach(cb => {
    cb.addEventListener("change", () => {
      currentPage = 1;
      filterProducts();
    });
  });

  document.querySelectorAll(".close-modal-trigger").forEach(el => {
    el.addEventListener("click", closeModal);
  });
  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

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

// 5. Lógica de Filtrado Dinámico
function filterProducts() {
  if (!Array.isArray(products) || products.length === 0) return;

  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const selectedCategories = Array.from(
    document.querySelectorAll('.filter-checkbox[data-filter="category"]:checked')
  ).map((cb) => cb.value.toLowerCase().trim());

  const selectedBadges = Array.from(
    document.querySelectorAll('.filter-checkbox[data-filter="badge"]:checked')
  ).map((cb) => cb.value.toLowerCase().trim());

  filteredProductsList = products.filter((product) => {
    const nameMatch = product.name ? product.name.toLowerCase() : "";
    const descMatch = product.shortDesc ? product.shortDesc.toLowerCase() : "";
    const matchesSearch = !searchTerm || nameMatch.includes(searchTerm) || descMatch.includes(searchTerm);

    const prodCategory = product.category ? product.category.toLowerCase().trim() : "";
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(prodCategory);

    const prodBadge = product.badge ? product.badge.toLowerCase().trim() : "";
    const matchesBadge = selectedBadges.length === 0 || selectedBadges.includes(prodBadge);

    return matchesSearch && matchesCategory && matchesBadge;
  });

  renderPaginatedView();
}

// 6. Manejador de Paginación y Renderizado
function renderPaginatedView() {
  const countText = `${filteredProductsList.length} ${filteredProductsList.length === 1 ? 'producto' : 'productos'}`;
  if (resultsCount) resultsCount.textContent = countText;
  if (mobileResultsText) mobileResultsText.textContent = `Mostrando ${countText}`;

  const totalPages = Math.ceil(filteredProductsList.length / itemsPerPage);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProductsList.slice(startIndex, endIndex);

  renderProductsList(currentProducts);
  renderPaginationControls(totalPages);
}

// 7. Renderizado de Tarjetas (12 Ítems)
function renderProductsList(productsSlice) {
  if (!productsGrid) return;
  productsGrid.innerHTML = "";

  if (filteredProductsList.length === 0) {
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

  productsSlice.forEach(product => {
    const waText = `Hola Grupo Fénix, deseo solicitar una cotización del siguiente producto industrial:\n- Producto: *${product.name}*\n- Línea: ${product.category}\n- Gramaje: ${product.gramaje !== 'N/A' ? product.gramaje : 'N/A'}\n- Acabado: ${product.acabado !== 'N/A' ? product.acabado : 'N/A'}\n- Capacidad: ${product.capacidad !== 'N/A' ? product.capacidad : 'N/A'}\n- Industria: ${product.industria}\n\nPor favor, envíenme costos de fabricación y plazos de entrega mínimos.`;
    const waUrl = `https://wa.me/51970572564?text=${encodeURIComponent(waText)}`;

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
            <div>Acabado: <span class="text-white font-medium">${product.acabado}</span></div>
            <div>Boca: <span class="text-white font-medium">${product.diametro}</span></div>
            <div>Capac.: <span class="text-white font-medium">${product.capacidad}</span></div>
            <div class="col-span-2 mt-1 pt-1 border-t border-white/[0.01]">Colores: <span class="text-[#D4AF37] font-semibold">${product.colores || "N/A"}</span></div>
          </div>
        </div>

        <div class="mt-5 pt-3 border-t border-white/[0.03] space-y-2">
          <a href="${waUrl}" target="_blank" class="w-full flex items-center justify-center gap-1.5 bg-[#10B981] hover:bg-[#10B981]/90 text-black text-xs font-bold py-3 rounded-full transition-all duration-300 uppercase tracking-wider text-[10px]">
            <span>Cotizar por WhatsApp</span>
          </a>
          <a href="producto-detalle.html?id=${product.id}" class="w-full flex items-center justify-center gap-1.5 border border-white/10 hover:border-[#D4AF37] text-white text-xs font-medium py-2.5 rounded-full transition-all text-[10px] uppercase tracking-wider bg-white/[0.01] hover:bg-white/[0.03]">
            <span>Ver Producto</span>
          </a>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// 8. Paginación Dinámica
function renderPaginationControls(totalPages) {
  if (!paginationContainer) return;
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) return;

  // Botón Anterior
  const prevBtn = document.createElement("button");
  prevBtn.disabled = currentPage === 1;
  prevBtn.className = `px-3 py-2 rounded-sm border text-xs font-medium transition-all ${currentPage === 1
    ? 'border-white/5 text-zinc-600 cursor-not-allowed'
    : 'border-white/10 text-zinc-300 hover:border-[#D4AF37] hover:text-[#D4AF37]'
    }`;
  prevBtn.innerHTML = `&laquo; Ant`;
  prevBtn.addEventListener("click", () => changePage(currentPage - 1));
  paginationContainer.appendChild(prevBtn);

  // Botones Números
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `w-9 h-9 flex items-center justify-center rounded-sm border text-xs font-semibold transition-all ${i === currentPage
      ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg'
      : 'border-white/10 text-zinc-400 hover:border-[#D4AF37] hover:text-white'
      }`;
    pageBtn.textContent = i;
    pageBtn.addEventListener("click", () => changePage(i));
    paginationContainer.appendChild(pageBtn);
  }

  // Botón Siguiente
  const nextBtn = document.createElement("button");
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.className = `px-3 py-2 rounded-sm border text-xs font-medium transition-all ${currentPage === totalPages
    ? 'border-white/5 text-zinc-600 cursor-not-allowed'
    : 'border-white/10 text-zinc-300 hover:border-[#D4AF37] hover:text-[#D4AF37]'
    }`;
  nextBtn.innerHTML = `Sig &raquo;`;
  nextBtn.addEventListener("click", () => changePage(currentPage + 1));
  paginationContainer.appendChild(nextBtn);
}

function changePage(newPage) {
  currentPage = newPage;
  renderPaginatedView();

  const catalogSec = document.getElementById("catalogo");
  if (catalogSec) {
    catalogSec.scrollIntoView({ behavior: "smooth" });
  }
}

// 9. Modales de Ficha Técnica
function openDetailsModal(id) {
  const product = products.find(p => p.id === id);
  if (!product || !productModal) return;

  if (mTitle) mTitle.textContent = product.name;
  if (mDesc) mDesc.textContent = product.longDesc;
  if (mBadge) mBadge.textContent = product.category;

  if (mSpecGramaje) mSpecGramaje.textContent = product.gramaje || "N/A";
  if (mSpecAcabado) mSpecAcabado.textContent = product.acabado || "N/A";
  if (mSpecDiametro) mSpecDiametro.textContent = product.diametro || "N/A";
  if (mSpecCapacidad) mSpecCapacidad.textContent = product.capacidad || "N/A";
  if (mSpecIndustria) mSpecIndustria.textContent = product.industria || "N/A";
  if (mSpecColores) mSpecColores.textContent = product.colores || "N/A";

  if (mImage) {
    mImage.src = product.image;
    mImage.alt = product.name;
  }

  if (mThumbnails) {
    mThumbnails.innerHTML = "";
    const todasLasFotos = [product.image, ...(product.thumbnails || [])];
    const fotosUnicas = [...new Set(todasLasFotos)];

    fotosUnicas.forEach((thumbUrl, idx) => {
      const btn = document.createElement("button");
      btn.className = `aspect-square bg-[#0F0F11] border border-white/10 rounded p-1 opacity-60 hover:opacity-100 transition-all ${idx === 0 ? 'thumbnail-active border-[#D4AF37]' : ''}`;
      btn.innerHTML = `<img src="${thumbUrl}" alt="Thumbnail ${idx}" class="w-full h-full object-contain">`;
      btn.addEventListener("click", () => {
        if (mImage) mImage.src = thumbUrl;
        document.querySelectorAll("#modal-thumbnails button").forEach(b => b.classList.remove("thumbnail-active", "border-[#D4AF37]"));
        btn.classList.add("thumbnail-active", "border-[#D4AF37]");
      });
      mThumbnails.appendChild(btn);
    });
  }

  const waMsgText = `Hola Grupo Fénix, deseo recibir información adicional de la Ficha Técnica de:\n- Producto: *${product.name}*\n- Gramaje: ${product.gramaje}\n- Acabado: ${product.acabado}\n- Capacidad: ${product.capacidad}\n\nPor favor, contactar a un asesor comercial.`;
  if (btnModalWhatsapp) btnModalWhatsapp.href = `https://wa.me/51970572564?text=${encodeURIComponent(waMsgText)}`;

  productModal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
  setTimeout(() => {
    productModal.classList.add("modal-active");
  }, 10);
}

function closeModal() {
  if (!productModal) return;
  productModal.classList.remove("modal-active");
  document.body.classList.remove("overflow-hidden");
  setTimeout(() => {
    productModal.classList.add("hidden");
  }, 300);
}

// 10. Sidebar Móvil y Limpieza
function toggleMobileSidebar() {
  if (sidebarFilter) sidebarFilter.classList.toggle("active");
}

function resetAllFilters() {
  document.querySelectorAll(".filter-checkbox").forEach(cb => {
    cb.checked = false;
  });
  if (searchInput) searchInput.value = "";
  currentPage = 1;
  filterProducts();
}

function filterByCategory(catName) {
  resetAllFilters();

  const checkbox = document.querySelector(`.filter-checkbox[value="${catName}"]`);
  if (checkbox) {
    checkbox.checked = true;
    checkbox.closest('.border-b, .pb-2')?.classList.add('accordion-active');
  }

  currentPage = 1;
  filterProducts();

  const catalogSec = document.getElementById("catalogo");
  if (catalogSec) {
    catalogSec.scrollIntoView({ behavior: "smooth" });
  }

  if (sidebarFilter && sidebarFilter.classList.contains("active")) {
    sidebarFilter.classList.remove("active");
  }
}