// Product Catalog & B2B Interactive Engine - Plásticos Fénix (Grupo Fénix)

// 1. Technical B2B Product Database
const products = [
  {
    id: 1,
    name: "Preforma PET 15g (29/25)",
    category: "Preformas PET",
    gramaje: "15g",
    acabado: "29/25",
    diametro: "29mm",
    capacidad: "250ml",
    industria: "Bebidas",
    badge: "Eco-Fénix",
    shortDesc: "Preforma de peso optimizado recomendada para botellas de agua mineral sin gas.",
    longDesc: "Diseñada específicamente para optimizar el peso en botellas de agua. Su acabado de rosca ligera 29/25 proporciona una excelente estanqueidad y permite un importante ahorro de resina PET virgen en la tapa, contribuyendo directamente a las metas de sostenibilidad de su empresa.",
    image: "assets/preforma_pet.png",
    thumbnails: ["assets/preforma_pet.png", "assets/tapas_plasticas.png", "assets/hero_industrial.png"]
  },
  {
    id: 2,
    name: "Preforma PET 28g (PCO 1881)",
    category: "Preformas PET",
    gramaje: "28g",
    acabado: "PCO 1881",
    diametro: "28mm",
    capacidad: "1L",
    industria: "Bebidas",
    badge: "Estándar",
    shortDesc: "Preforma estándar de rosca corta para botellas de refrescos y bebidas gasificadas.",
    longDesc: "La preforma de 28 gramos con rosca PCO 1881 es el estándar global para envasar bebidas carbonatadas de 500ml a 1 Litro. Su diseño molecular resiste elevadas presiones internas de CO2 sin sufrir deformaciones y preservando una alta cristalinidad y transparencia visual.",
    image: "assets/preforma_pet.png",
    thumbnails: ["assets/preforma_pet.png", "assets/tapas_plasticas.png", "assets/hero_industrial.png"]
  },
  {
    id: 3,
    name: "Preforma PET 42g (PCO 1810)",
    category: "Preformas PET",
    gramaje: "42g",
    acabado: "PCO 1810",
    diametro: "28mm",
    capacidad: "1L",
    industria: "Limpieza",
    badge: "Premium",
    shortDesc: "Preforma de gran espesor recomendada para aceites comestibles, cosméticos y limpiadores.",
    longDesc: "Con una resistencia estructural superior ante la compresión vertical, esta preforma es ideal para envasar aceites vegetales, limpiadores industriales y productos de cuidado personal. El acabado de rosca PCO 1810 asegura compatibilidad universal con dispensadores y tapas de seguridad.",
    image: "assets/preforma_pet.png",
    thumbnails: ["assets/preforma_pet.png", "assets/tapas_plasticas.png", "assets/hero_industrial.png"]
  },
  {
    id: 4,
    name: "Preforma PET 84g (48mm)",
    category: "Preformas PET",
    gramaje: "84g",
    acabado: "48mm",
    diametro: "48mm",
    capacidad: "5L",
    industria: "Alimentos",
    badge: "Boca Ancha",
    shortDesc: "Preforma robusta de boca ancha para galoneras de agua y aceites de gran volumen.",
    longDesc: "Especialmente diseñada para el soplado de bidones y galoneras de 3 a 5 litros. Su boca ancha de 48mm facilita enormemente el llenado a alta velocidad en plantas industriales y permite una dosificación controlada sin derrames en el uso final.",
    image: "assets/preforma_pet.png",
    thumbnails: ["assets/preforma_pet.png", "assets/tapas_plasticas.png", "assets/hero_industrial.png"]
  },
  {
    id: 5,
    name: "Preforma PET 120g (48mm)",
    category: "Preformas PET",
    gramaje: "120g",
    acabado: "48mm",
    diametro: "48mm",
    capacidad: "5L",
    industria: "Limpieza",
    badge: "Industrial Heavy",
    shortDesc: "Preforma de máximo espesor para garrafas de productos químicos y agroquímicos.",
    longDesc: "Fabricada para soportar las condiciones más hostiles de almacenamiento de sustancias químicas e industriales. Cuenta con una pared súper reforzada que evita el colapso por succión de gases o variaciones extremas de temperatura de almacenamiento.",
    image: "assets/preforma_pet.png",
    thumbnails: ["assets/preforma_pet.png", "assets/tapas_plasticas.png", "assets/hero_industrial.png"]
  },
  {
    id: 6,
    name: "Tapa Plástica PCO 1881 Monobloque",
    category: "Tapas y Asas",
    gramaje: "28g", // Maps to 28mm diameter/spec category
    acabado: "PCO 1881",
    diametro: "28mm",
    capacidad: "250ml",
    industria: "Bebidas",
    badge: "Hermeticidad",
    shortDesc: "Tapa plástica monobloque de alta hermeticidad con precinto de seguridad.",
    longDesc: "Tapa fabricada por moldeo de compresión con polietileno de alta densidad (HDPE). Dispone de un sello hermético interno que bloquea las fugas de gases y líquidos. Su precinto de seguridad asegura la inviolabilidad del producto.",
    image: "assets/tapas_plasticas.png",
    thumbnails: ["assets/tapas_plasticas.png", "assets/preforma_pet.png", "assets/hero_industrial.png"]
  },
  {
    id: 7,
    name: "Asa Plástica Reforzada 48mm",
    category: "Tapas y Asas",
    gramaje: "84g", // Maps to larger formats
    acabado: "48mm",
    diametro: "48mm",
    capacidad: "5L",
    industria: "Alimentos",
    badge: "Carga Pesada",
    shortDesc: "Asa ergonómica de PP inyectado de alta tenacidad para cuellos de 48mm.",
    longDesc: "Accesorio de agarre ergonómico ideal para botellones de 3L, 4L y 5L. Sometida a rigurosas pruebas de esfuerzo dinámico y tracción vertical, garantizando soportar de manera estable más de 25 kg de peso neto sin romperse.",
    image: "assets/tapas_plasticas.png",
    thumbnails: ["assets/tapas_plasticas.png", "assets/preforma_pet.png", "assets/hero_industrial.png"]
  },
  {
    id: 8,
    name: "Bandeja Termoformada Farmacéutica",
    category: "Termoformados",
    gramaje: "15g", // Lightweight thermoforms
    acabado: "N/A",
    diametro: "N/A",
    capacidad: "250ml",
    industria: "Farmacéutica",
    badge: "Grado Médico",
    shortDesc: "Bandejas organizadoras de alta precisión para transporte seguro de ampollas y viales.",
    longDesc: "Producidas bajo condiciones de atmósfera limpia con láminas de PET reciclado de alta claridad. Su diseño ergonómico ofrece cavidades de ajuste a presión perfecto que evitan la fricción de vidrio con vidrio en el embalaje logístico de medicamentos.",
    image: "assets/termoformados.png",
    thumbnails: ["assets/termoformados.png", "assets/bolsas_industriales.png", "assets/hero_industrial.png"]
  },
  {
    id: 9,
    name: "Empaque Clamshell de Alimentos Frescos",
    category: "Termoformados",
    gramaje: "15g",
    acabado: "N/A",
    diametro: "N/A",
    capacidad: "500ml",
    industria: "Alimentos",
    badge: "FDA Compliant",
    shortDesc: "Empaque clamshell termoformado transparente con aberturas de ventilación.",
    longDesc: "Contenedor plástico con bisagra y cierre a presión audible diseñado para proteger frutas, repostería y alimentos frescos. Aprobado por la FDA para contacto directo con alimentos, garantizando la inocuidad alimentaria.",
    image: "assets/termoformados.png",
    thumbnails: ["assets/termoformados.png", "assets/bolsas_industriales.png", "assets/hero_industrial.png"]
  },
  {
    id: 10,
    name: "Bolsa Industrial PE de Alta Densidad",
    category: "Bolsas",
    gramaje: "120g", // Heavy format
    acabado: "N/A",
    diametro: "N/A",
    capacidad: "20L",
    industria: "Limpieza",
    badge: "Anti-UV",
    shortDesc: "Sacos de polietileno grueso con protección UV para acopio de químicos secos.",
    longDesc: "Bolsas industriales de gran galga y espesor fabricadas por extrusión de polietileno de baja densidad (LDPE). Formuladas con estabilizadores UV para resistir largos periodos de exposición a la intemperie sin degradación estructural.",
    image: "assets/bolsas_industriales.png",
    thumbnails: ["assets/bolsas_industriales.png", "assets/termoformados.png", "assets/hero_industrial.png"]
  }
];

// 2. DOM Elements Selection
const productsGrid = document.getElementById("products-grid");
const searchInput = document.getElementById("search-input");
const productModal = document.getElementById("product-modal");
const modalOverlay = document.getElementById("modal-overlay");
const sidebarFilter = document.getElementById("sidebar-filter");
const resultsCount = document.getElementById("results-count");
const mobileResultsText = document.getElementById("mobile-results-text");

// Modal detail fields
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

let activeProduct = null;

// 3. Application Entry Point
document.addEventListener("DOMContentLoaded", () => {
  // Expand all B2B filter accordions by default for premium usability
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.parentElement.classList.add('accordion-active');
  });

  // Render initial list
  filterProducts();

  // Set up event listeners for filters & window events
  setupEvents();
});

// 4. Set Up Application Event Listeners
function setupEvents() {
  // Listen to search changes
  searchInput.addEventListener("input", filterProducts);

  // Listen to filter checkboxes selection changes
  document.querySelectorAll(".filter-checkbox").forEach(cb => {
    cb.addEventListener("change", filterProducts);
  });

  // Close modal on triggers
  document.querySelectorAll(".close-modal-trigger").forEach(el => {
    el.addEventListener("click", closeModal);
  });
  modalOverlay.addEventListener("click", closeModal);

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Sticky Navbar background color transition on scroll
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("main-nav");
    if (window.scrollY > 40) {
      nav.classList.add("glass-nav-scrolled");
    } else {
      nav.classList.remove("glass-nav-scrolled");
    }
  });
}

// 5. Dynamic Filtering Logic
function filterProducts() {
  const query = searchInput.value.toLowerCase().trim();

  // Group active filters by type
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

  // Perform filtration (Logical AND across categories, OR within same category)
  const filtered = products.filter(p => {
    // 1. Text Search query
    const matchesSearch = !query ||
      p.name.toLowerCase().includes(query) ||
      p.shortDesc.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.acabado.toLowerCase().includes(query) ||
      p.gramaje.toLowerCase().includes(query) ||
      p.industria.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    // 2. Checkboxes filters
    for (const [key, selectedVals] of Object.entries(activeFilters)) {
      if (selectedVals.length > 0) {
        // If the product property is not in the list of selected values for this group, fail check
        if (!selectedVals.includes(p[key])) {
          return false;
        }
      }
    }

    return true;
  });

  // Update UI and results indicators
  renderProductsList(filtered);
}

// 6. Rendering Product Cards Grid
function renderProductsList(filteredList) {
  productsGrid.innerHTML = "";

  // Update badge quantities
  const countText = `${filteredList.length} ${filteredList.length === 1 ? 'producto' : 'productos'}`;
  resultsCount.textContent = countText;
  if (mobileResultsText) {
    mobileResultsText.textContent = `Mostrando ${countText}`;
  }

  if (filteredList.length === 0) {
    productsGrid.innerHTML = `
      <div class="col-span-full py-16 text-center bg-white rounded border border-zinc-200 shadow-sm p-8">
        <svg class="w-12 h-12 mx-auto text-zinc-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h4 class="text-sm font-bold text-zinc-800 mb-1 uppercase tracking-wider">No se encontraron productos</h4>
        <p class="text-xs text-zinc-400">Intente desmarcando filtros del sidebar o cambiando la búsqueda.</p>
        <button onclick="resetAllFilters()" class="mt-4 inline-flex items-center gap-1 bg-zinc-950 text-white font-bold text-xs px-4 py-2.5 rounded transition-colors hover:bg-zinc-800">
          Reestablecer Filtros
        </button>
      </div>
    `;
    return;
  }

  filteredList.forEach(product => {
    // Generate WhatsApp dynamic URL for B2B direct quotes
    const waText = `Hola Grupo Fénix, deseo solicitar una cotización del siguiente producto industrial:
- Producto: *${product.name}*
- Línea: ${product.category}
- Gramaje: ${product.gramaje !== 'N/A' ? product.gramaje : 'N/A'}
- Rosca/Acabado: ${product.acabado !== 'N/A' ? product.acabado : 'N/A'}
- Capacidad: ${product.capacidad !== 'N/A' ? product.capacidad : 'N/A'}
- Industria: ${product.industria}

Por favor, envíenme costos de fabricación y plazos de entrega mínimos.`;
    const waUrl = `https://wa.me/51900000000?text=${encodeURIComponent(waText)}`;

    // Badges layout
    let badgeHtml = "";
    if (product.badge === "Eco-Fénix") {
      badgeHtml = `<span class="badge-tech-active absolute top-4 left-4 bg-greenCustom text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow z-10">Eco-Sostenible</span>`;
    } else if (product.badge) {
      badgeHtml = `<span class="absolute top-4 left-4 bg-goldCustom text-black text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow z-10">${product.badge}</span>`;
    }

    const card = document.createElement("div");
    card.className = "b2b-product-card rounded relative overflow-hidden flex flex-col justify-between p-4";
    card.innerHTML = `
      ${badgeHtml}
      
      <!-- Photo Area -->
      <div class="relative w-full aspect-square bg-zinc-50 border border-zinc-100 rounded flex items-center justify-center p-4 overflow-hidden group">
        <img src="${product.image}" alt="${product.name}" class="object-contain max-h-full max-w-full transition-transform duration-500 group-hover:scale-105">
      </div>

      <!-- Content Area -->
      <div class="pt-4 flex-grow flex flex-col justify-between">
        <div>
          <span class="text-[10px] uppercase tracking-widest text-greenDark font-black block">${product.category}</span>
          <h3 class="font-heading font-black text-sm text-zinc-950 mt-1 line-clamp-1">${product.name}</h3>
          
          <!-- Technical parameters list -->
          <div class="grid grid-cols-2 gap-x-2 gap-y-1 mt-3 pt-3 border-t border-zinc-100 text-[10px] text-zinc-500 font-mono">
            <div>Gramaje: <span class="text-zinc-900 font-semibold">${product.gramaje}</span></div>
            <div>Rosca: <span class="text-zinc-900 font-semibold">${product.acabado}</span></div>
            <div>Boca: <span class="text-zinc-900 font-semibold">${product.diametro}</span></div>
            <div>Capac.: <span class="text-zinc-900 font-semibold">${product.capacidad}</span></div>
          </div>
        </div>

        <!-- Action CTAs (B2B Conversion Flow) -->
        <div class="mt-5 pt-3 border-t border-zinc-100 space-y-2">
          <!-- Direct WhatsApp Button -->
          <a href="${waUrl}" target="_blank" class="w-full flex items-center justify-center gap-1.5 bg-greenCustom hover:bg-greenDark text-white text-xs font-bold py-3 rounded hover-green-glow transition-all duration-300">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.62.962 3.206 1.493 4.81 1.495 5.516 0 10.007-4.486 10.01-10.002.002-2.673-1.037-5.184-2.93-7.077-1.892-1.893-4.405-2.934-7.079-2.936-5.524 0-10.017 4.482-10.02 9.997-.002 2.01.527 3.975 1.53 5.724L1.12 21.07l4.161-1.094c1.724.94 3.006 1.178 3.366 1.178zM17.91 14.9c-.318-.16-.1.884-.2.88-.13.003-2.18-.76-3.79-2.22-1.37-1.24-2.22-2.73-2.49-3.2-.27-.47-.03-.72.21-.96.22-.21.48-.56.72-.84.24-.28.32-.47.48-.79.16-.32.08-.6-.04-.84s-1.08-2.6-1.48-3.56c-.39-.94-.79-.81-1.08-.83-.28-.01-.6-.01-.92-.01-.32 0-.84.12-1.28.6-.44.48-1.68 1.64-1.68 4s1.72 4.64 1.96 4.96c.24.32 3.38 5.16 8.2 7.24 1.15.5 2.04.8 2.74 1.02 1.15.37 2.2.32 3.03.19.93-.14 2.85-1.16 3.25-2.28.4-.1.4-.48.4-.76s-.16-.52-.48-.68z"/>
            </svg>
            <span>Cotizar por WhatsApp</span>
          </a>
          <!-- Technical Specs Modal Button -->
          <button onclick="openDetailsModal(${product.id})" class="w-full flex items-center justify-center gap-1.5 border border-zinc-200 hover:border-goldCustom hover:text-goldHover text-zinc-700 text-xs font-extrabold py-2.5 rounded transition-all">
            <span>Ver Ficha Técnica</span>
          </button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// 7. Modal Controls
function openDetailsModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  activeProduct = product;

  // Set text labels
  mTitle.textContent = product.name;
  mDesc.textContent = product.longDesc;
  mBadge.textContent = product.category;

  // Set technical attributes inside specs table
  mSpecGramaje.textContent = product.gramaje || "N/A";
  mSpecAcabado.textContent = product.acabado || "N/A";
  mSpecDiametro.textContent = product.diametro || "N/A";
  mSpecCapacidad.textContent = product.capacidad || "N/A";
  mSpecIndustria.textContent = product.industria || "N/A";

  // Set primary gallery image
  mImage.src = product.image;
  mImage.alt = product.name;

  // Build gallery thumbnails
  mThumbnails.innerHTML = "";
  product.thumbnails.forEach((thumbUrl, idx) => {
    const btn = document.createElement("button");
    btn.className = `aspect-square bg-zinc-50 border border-zinc-200 rounded p-1 opacity-70 hover:opacity-100 transition-all ${idx === 0 ? 'thumbnail-active border-goldCustom' : ''}`;
    btn.innerHTML = `<img src="${thumbUrl}" alt="Thumbnail ${idx}" class="w-full h-full object-contain">`;
    btn.addEventListener("click", () => {
      mImage.src = thumbUrl;
      document.querySelectorAll("#modal-thumbnails button").forEach(b => b.classList.remove("thumbnail-active", "border-goldCustom"));
      btn.classList.add("thumbnail-active", "border-goldCustom");
    });
    mThumbnails.appendChild(btn);
  });

  // Configure modal WhatsApp CTA with dynamic message
  const waMsgText = `Hola Grupo Fénix, deseo recibir información adicional de la Ficha Técnica de:
- Producto: *${product.name}*
- Gramaje: ${product.gramaje}
- Acabado: ${product.acabado}
- Capacidad: ${product.capacidad}

Por favor, contactar a un asesor comercial.`;
  btnModalWhatsapp.href = `https://wa.me/51900000000?text=${encodeURIComponent(waMsgText)}`;

  // Show modal container
  productModal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden"); // Block underlying page scroll
  setTimeout(() => {
    productModal.classList.add("modal-active");
  }, 10);
}

function closeModal() {
  productModal.classList.remove("modal-active");
  document.body.classList.remove("overflow-hidden"); // Restore scroll
  setTimeout(() => {
    productModal.classList.add("hidden");
  }, 300);
}

// 8. Mobile Sidebar Controls
function toggleMobileSidebar() {
  sidebarFilter.classList.toggle("active");
}

// 9. Reset and Programmatic Filters Controls
function resetAllFilters() {
  document.querySelectorAll(".filter-checkbox").forEach(cb => {
    cb.checked = false;
  });
  searchInput.value = "";
  filterProducts();
}

// Click filter by category from Lineas de Producto cards
function filterByCategory(catName) {
  resetAllFilters();

  // Find the exact checkbox corresponding to the category
  const checkbox = document.querySelector(`.filter-checkbox[value="${catName}"]`);
  if (checkbox) {
    checkbox.checked = true;
    checkbox.closest('.border-b, .pb-2').classList.add('accordion-active');
  }

  filterProducts();

  // Smooth scroll to catalog
  const catalogSec = document.getElementById("catalogo");
  if (catalogSec) {
    catalogSec.scrollIntoView({ behavior: "smooth" });
  }

  // Close mobile sidebar if it was opened
  if (sidebarFilter.classList.contains("active")) {
    sidebarFilter.classList.remove("active");
  }
}
