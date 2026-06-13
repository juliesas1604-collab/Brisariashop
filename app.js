/* ================================================
   BRISARIA — app.js
   ================================================ */

/* ─────────────────────────────────────────────
   CONFIGURAÇÕES — edite aqui antes de publicar
   ───────────────────────────────────────────── */
const CONFIG = {

  /* Número WhatsApp (código do país + DDD + número, sem + ou espaços) */
  whatsappNumber: '5511930637619',

  /* URL do Apps Script Web App (mesmo URL para catálogo + pontos do Clube).
     Depois de publicar como Web App, cole a URL aqui.
     Formato: https://script.google.com/macros/s/SEU_ID/exec
     Enquanto não configurar, o site usa os dados de exemplo abaixo. */
  scriptUrl: 'https://script.google.com/macros/s/AKfycbzhzXhDHNeHeY1tYTelrLF59ADNy_9BZd7GrQv8vtnMO7X5sCn74yzaAAxVziNqnR0/exec',
};

/* ─────────────────────────────────────────────
   DADOS DE EXEMPLO (usados quando useSampleData = true)
   ───────────────────────────────────────────── */
const SAMPLE_PRODUCTS = [
  // ── KIT ──
  { id: '1',  nome: 'Kitzinho',                  categoria: 'Kit',        descricao: 'Mini kit Brisaria para experimentar. 2 sedinhas Bem Bolado + piteira Sadhu large.',    preco: 12.00,  imagem: 'images/catalogo/kit_kitzinho.jpg',   disponivel: true,  destaque: false },
  { id: '2',  nome: 'Kit Tabas',                 categoria: 'Kit',        descricao: '1 tabaco + 1 filtro Aleda + 2 sedinhas Sadhu. Tudo que você precisa.',                  preco: 30.00,  imagem: 'images/produtos/kit_tabas.jpeg',       disponivel: true,  destaque: true  },
  { id: '3',  nome: 'Kit Completo',              categoria: 'Kit',        descricao: '1 tabaco + 2 sedinhas Bem Bolado + 1 filtro Aleda + 1 piteira Sadhu + 3 sedinhas.',    preco: 45.00,  imagem: 'images/produtos/kit_completo.png',   disponivel: true,  destaque: false },
  { id: '37', nome: 'Kit Premium',              categoria: 'Kit',        descricao: 'Kit premium Brisaria. Perfeito para presentear.',                                         preco: 45.00,  imagem: 'images/produtos/kit_tabas_premium.jpeg', disponivel: true,  destaque: false },
  { id: '4',  nome: 'Kit Tabas 2.0',             categoria: 'Kit',        descricao: '2 tabacos + 2 filtros Aleda + 6 sedinhas Guru Spirit Slim ou Large.',              preco: 60.00,  imagem: 'images/catalogo2/p12.jpg',            disponivel: true,  destaque: false },
  { id: '5',  nome: 'Kit Tabas 4.0',             categoria: 'Kit',        descricao: '4 tabacos + 4 filtros Aleda + 12 sedinhas Guru Spirit. O kit definitivo.',             preco: 110.00, imagem: 'images/catalogo2/p13.jpg',            disponivel: true,  destaque: true  },
  // ── TABACO ──
  { id: '6',  nome: 'Hi Tabaco 25g',             categoria: 'Tabaco',     descricao: 'Blend especial com aroma diferenciado e fumaça suave. 25g.',                           preco: 28.00,  imagem: 'images/catalogo/tabacos.jpg',         disponivel: false, destaque: false },
  { id: '7',  nome: 'Tabaco Amsterdam 25g',      categoria: 'Tabaco',     descricao: 'Blend suave e aromático, ideal para quem curte um cigarro levinho. 25g.',              preco: 18.00,  imagem: 'images/catalogo2/p07.jpg',            disponivel: true,  destaque: true  },
  { id: '8',  nome: 'Tabaco Acrema 20g',         categoria: 'Tabaco',     descricao: 'Tabaco nacional com sabor único e encorpado. 20g.',                                    preco: 18.00,  imagem: 'images/catalogo/tabacos.jpg',         disponivel: false, destaque: false },
  // ── SEDA ──
  { id: '9',  nome: 'Seda King Size',            categoria: 'Seda',       descricao: 'King size brown, papel fino e queima uniforme.',                                       preco: 4.00,  precoCombo: 10.00, qtdCombo: 3, imagem: 'images/produtos/seda_king.jpeg',       disponivel: true,  destaque: false },
  { id: '10', nome: 'Seda Bem Bolado',           categoria: 'Seda',       descricao: 'Brown slim ultrafina da Bem Bolado. Top de linha.',                                    preco: 5.00,  precoCombo: 12.00, qtdCombo: 3, imagem: 'images/catalogo2/p02.jpg',            disponivel: true,  destaque: true  },
  { id: '11', nome: 'Seda Smoking',              categoria: 'Seda',       descricao: 'King size brown Smoking, ícone das sedas artesanais.',                                 preco: 6.00,  precoCombo: 15.00, qtdCombo: 3, imagem: 'images/produtos/seda_smoking.jpeg',    disponivel: true,  destaque: false },
  { id: '12', nome: 'Seda Sadhu Ultra Longa',    categoria: 'Seda',       descricao: 'Ultra longa Sadhu, queima lenta e saborosa.',                                          preco: 5.00,  precoCombo: 12.00, qtdCombo: 3, imagem: 'images/catalogo2/p14.jpg',            disponivel: true,  destaque: false },
  { id: '13', nome: 'Sedinha Sadhu',             categoria: 'Seda',       descricao: 'Sedinha Sadhu slim ultrafina. Fácil de rolar.',                                        preco: 4.00,  precoCombo: 10.00, qtdCombo: 3, imagem: 'images/catalogo2/p15.jpg',            disponivel: true,  destaque: false },
  // ── FILTRO ──
  { id: '14', nome: 'Filtro Aleda Extra Longo',  categoria: 'Filtro',     descricao: 'Filtro extra longo Aleda Slim 22mm. 150 unidades. Filtração superior.',                preco: 8.00,   imagem: 'images/catalogo2/p04.jpg',            disponivel: true,  destaque: false },
  // ── PITEIRA ──
  { id: '15', nome: 'Piteira Tonabê Mega Longa', categoria: 'Piteira',    descricao: 'Artesanal de madeira Tonabê mega longa. Filtra e esfria com elegância.',               preco: 7.00,   imagem: 'images/produtos/a_piteira.jpeg',       disponivel: true,  destaque: true  },
  { id: '16', nome: 'Piteira Tonabê Longa',      categoria: 'Piteira',    descricao: 'Madeira Tonabê versão longa. Artesanal e resistente.',                                 preco: 6.00,   imagem: 'images/produtos/a_piteira_1.jpeg',     disponivel: true,  destaque: false },
  { id: '17', nome: 'Piteira Sadhu Large',       categoria: 'Piteira',    descricao: 'Bambu natural Sadhu large, 35 tips. Leve, resistente e sustentável.',                  preco: 5.00,   imagem: 'images/produtos/piteira_tonabe.jpeg',  disponivel: true,  destaque: false },
  { id: '18', nome: 'Piteira de Vidro',          categoria: 'Piteira',    descricao: 'Vidro transparente, fácil de limpar e muito estilosa.',                                preco: 8.00,   imagem: 'images/catalogo/acessorios.jpg',      disponivel: true,  destaque: false },
  // ── CUIA ──
  { id: '19', nome: 'Cuia Colorida',             categoria: 'Cuia',       descricao: 'Cuia colorida Tonabê. Cores variadas — consulte disponibilidade.',                     preco: 16.00,  imagem: 'images/catalogo2/p22.jpg',            disponivel: true,  destaque: false },
  { id: '20', nome: 'Cuia Spa Abduzido',         categoria: 'Cuia',       descricao: 'Cuia spa da Abduzido. Design exclusivo em cores vibrantes.',                           preco: 20.00,  imagem: 'images/produtos/cuia_spa_abduzido.jpeg', disponivel: true,  destaque: true  },
  // ── TESOURA ──
  { id: '21', nome: 'Tesoura Passarinho',        categoria: 'Tesoura',    descricao: 'Tesoura passarinho. Rosa/dourado ou furta-cor. Corte preciso.',                        preco: 16.00,  imagem: 'images/catalogo2/p17.jpg',            disponivel: true,  destaque: false },
  { id: '22', nome: 'Tesoura Dobrável Tonabê',   categoria: 'Tesoura',    descricao: 'Tesoura dobrável Tonabê. Cores variadas. Prática e compacta.',                         preco: 16.00,  imagem: 'images/catalogo2/p18.jpg',            disponivel: true,  destaque: false },
  // ── SLICK ──
  { id: '23', nome: 'Slick Tonabê 5ml',          categoria: 'Slick',      descricao: 'Slick de silicone Tonabê, 5ml. Ideal para guardar sua brisa.',                        preco: 16.00,  imagem: 'images/catalogo2/p20.jpg',            disponivel: true,  destaque: false },
  { id: '24', nome: 'Slick Lego 26ml',           categoria: 'Slick',      descricao: 'Slick com tampa no estilo Lego, 26ml. Divertido e funcional.',                         preco: 25.00,  imagem: 'images/catalogo2/p21.jpg',            disponivel: true,  destaque: false },
  // ── DICHAVADOR ──
  { id: '25', nome: 'Dichavador Sadhu Peq.',     categoria: 'Dichavador', descricao: 'Sadhu plástico pequeno flor. Leve e prático para o dia a dia.',                       preco: 20.00,  imagem: 'images/produtos/dichavas_colmeia.jpeg', disponivel: true,  destaque: false },
  { id: '26', nome: 'Dichavador Lion Rolling',   categoria: 'Dichavador', descricao: 'Lion Rolling Circus. Design exclusivo, resistente e compacto.',                        preco: 40.00,  imagem: 'images/catalogo2/p25.jpg',            disponivel: true,  destaque: false },
  { id: '27', nome: 'Dichavador Metal 4 Partes', categoria: 'Dichavador', descricao: 'Metal compacto, 4 partes. Estampas variadas. Ótimo para levar na bolsa.',              preco: 30.00,  imagem: 'images/catalogo2/p26.jpg',            disponivel: true,  destaque: false },
  { id: '28', nome: 'Dichavador Colmeia Peq.',   categoria: 'Dichavador', descricao: 'Colmeia plástico pequeno. Custo-benefício imbatível.',                                 preco: 30.00,  imagem: 'images/produtos/dich_colmeia.jpeg',    disponivel: true,  destaque: false },
  { id: '29', nome: 'Dichavador Colmeia Grande', categoria: 'Dichavador', descricao: 'Colmeia grande. Corte preciso e durável.',                                             preco: 40.00,  imagem: 'images/produtos/dicha_colme.jpeg',    disponivel: true,  destaque: false },
  { id: '30', nome: 'Dichavador Colmeia Metal',  categoria: 'Dichavador', descricao: 'Alien Dawg — metal premium colmeia, 4 partes com coador. Edição especial.',            preco: 120.00, imagem: 'images/catalogo2/p27.jpg',            disponivel: true,  destaque: false },
  { id: '31', nome: 'Case Colmeia',              categoria: 'Dichavador', descricao: 'Case estofado para dichavador colmeia. Proteção e estilo. Esgotado.',                  preco: 30.00,  imagem: 'images/catalogo/case_colmeia.jpg',    disponivel: false, destaque: false },
  // ── ISQUEIRO ──
  { id: '32', nome: 'Clipper',                   categoria: 'Isqueiro',   descricao: 'Isqueiro Clipper recarregável. Cores sortidas.',                                       preco: 10.00,  imagem: 'images/produtos/clipper.jpeg',         disponivel: true,  destaque: false },
  { id: '36', nome: 'Bic',                       categoria: 'Isqueiro',   descricao: 'Isqueiro Bic clássico. Cores sortidas.',                                               preco: 10.00,  imagem: 'images/produtos/bic.png',            disponivel: true,  destaque: false },
  // ── BANDEJA ──
  { id: '33', nome: 'Bandeja Sadhu',             categoria: 'Bandeja',    descricao: 'Bandeja Sadhu com arte exclusiva. Perfeita para organizar o ritual.',                  preco: 35.00,  imagem: 'images/catalogo/bandeja_sadhu.jpg',   disponivel: false, destaque: false },
  // ── ACESSÓRIO ──
  { id: '34', nome: 'Pilão Folha Chaveiro',      categoria: 'Acessório',  descricao: 'Mini pilão chaveiro com detalhe de folha. Compacto e estiloso.',                      preco: 16.00,  imagem: 'images/catalogo2/p30.jpg',            disponivel: true,  destaque: false },
  { id: '35', nome: 'Tubeck',                    categoria: 'Acessório',  descricao: 'Tubeck porta-cigarro. Prático para levar sem amassar.',                               preco: 10.00,  imagem: 'images/catalogo2/p31.jpg',            disponivel: true,  destaque: false },
  { id: '38', nome: 'Porta Bic Brisaria',        categoria: 'Acessório',  descricao: 'Capa para isqueiro Bic com logo Brisaria. Produzida em impressão 3D. Verde menta com logo verde.',  preco: 15.00,  imagem: 'images/produtos/porta_bic_1.jpeg',  imagens: ['images/produtos/porta_bic_1.jpeg','images/produtos/porta_bic_2.jpeg','images/produtos/porta_bic_3.jpeg'],  disponivel: true,  destaque: true  },
];

/* ─────────────────────────────────────────────
   EMOJIS POR CATEGORIA
   ───────────────────────────────────────────── */
const CAT_EMOJI = {
  Tabaco:     '🌿',
  Seda:       '📄',
  Piteira:    '🎋',
  Cuia:       '🥃',
  Kit:        '🎁',
  Filtro:     '🚬',
  Slick:      '🧴',
  Dichavador: '⚙️',
  Isqueiro:   '🔥',
  Bandeja:    '🎨',
  Tesoura:    '✂️',
  Acessório:  '🛠️',
};

/* ─────────────────────────────────────────────
   ESTADO
   ───────────────────────────────────────────── */
let allProducts    = [];
let activeCategory = 'todos';
let searchQuery    = '';
let cart           = JSON.parse(localStorage.getItem('brisaria_cart') || '[]');
let clienteLogado  = JSON.parse(localStorage.getItem('brisaria_cliente') || 'null');

/* ─────────────────────────────────────────────
   INICIALIZAÇÃO
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setupHeader();
  setupEventListeners();
  setupLoyaltyForm();
  setupPontosConsulta();
  updateFooterLinks();
  loadCatalog();
  renderCart();
  renderAccountBtn();
});

/* ─────────────────────────────────────────────
   HEADER — efeito de scroll
   ───────────────────────────────────────────── */
function setupHeader() {
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ─────────────────────────────────────────────
   FOOTER LINKS
   ───────────────────────────────────────────── */
function updateFooterLinks() {
  const el = document.getElementById('footerWhatsapp');
  if (el) el.href = `https://wa.me/${CONFIG.whatsappNumber}`;
}

/* ─────────────────────────────────────────────
   CATÁLOGO — carregamento
   ───────────────────────────────────────────── */
async function loadCatalog() {
  const loading = document.getElementById('loadingState');
  const error   = document.getElementById('errorState');

  // Mostra os dados de exemplo imediatamente — site nunca fica travado
  allProducts = SAMPLE_PRODUCTS;
  loading.classList.add('hidden');
  error.classList.add('hidden');
  renderFeatured();
  renderFilters();
  applyFilters();

  // Tenta buscar dados ao vivo em segundo plano
  if (!CONFIG.scriptUrl) return;
  try {
    const live = await fetchFromScript();
    if (live && live.length) {
      allProducts = live;
      renderFeatured();
      renderFilters();
      applyFilters();
    }
  } catch (err) {
    console.warn('Catálogo ao vivo indisponível, usando dados de exemplo:', err);
  }
}

async function fetchFromScript() {
  const controller = new AbortController();
  const timeout    = setTimeout(() => controller.abort(), 15000);

  try {
    const res  = await fetch(`${CONFIG.scriptUrl}?action=catalogo`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const text = await res.text();
    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error('Resposta inesperada');
    return data.filter(p => p.nome && p.disponivel);
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

/* ─────────────────────────────────────────────
   VITRINE — Mais pedidos
   ───────────────────────────────────────────── */
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  const destaques = allProducts.filter(p => p.disponivel && p.destaque);
  if (!destaques.length) {
    const section = grid.closest('.featured-section');
    if (section) section.style.display = 'none';
    return;
  }

  grid.innerHTML = destaques.map(p => {
    const inCart = cart.some(i => i.id === p.id);
    const emoji  = CAT_EMOJI[p.categoria] || '📦';
    const imgTag = p.imagem
      ? `<img src="${escHtml(p.imagem)}" alt="${escHtml(p.nome)}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : '';
    const placeholder = `<div class="product-img-placeholder" style="display:${p.imagem ? 'none' : 'flex'}">${emoji}</div>`;

    return `
    <div class="product-card" data-id="${escHtml(p.id)}" onclick="openProductModal('${escHtml(p.id)}')">
      <div class="product-img-wrap">
        ${imgTag}${placeholder}
      </div>
      <div class="product-body">
        <p class="product-category">${escHtml(p.categoria)}</p>
        <h3 class="product-name">${escHtml(p.nome)}</h3>
        <div class="product-footer">
          <div>
            <span class="product-price">R$&nbsp;${formatPrice(p.preco)}</span>
            ${p.precoCombo ? `<span class="product-combo-tag">3 por R$&nbsp;${formatPrice(p.precoCombo)}</span>` : ''}
          </div>
          <button class="btn-add ${inCart ? 'added' : ''}"
                  onclick="event.stopPropagation(); addToCart('${escHtml(p.id)}')"
                  title="Adicionar à sacola"
                  aria-label="Adicionar ${escHtml(p.nome)} à sacola">
            ${inCart ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ─────────────────────────────────────────────
   FILTROS DE CATEGORIA
   ───────────────────────────────────────────── */
function renderFilters() {
  const container = document.getElementById('categoryFilters');
  const categories = [...new Set(allProducts.map(p => p.categoria))].filter(Boolean);

  container.innerHTML = `<button class="filter-chip active" data-category="todos">Todos</button>`;
  categories.forEach(cat => {
    const emoji = CAT_EMOJI[cat] || '•';
    container.insertAdjacentHTML('beforeend',
      `<button class="filter-chip" data-category="${escHtml(cat)}">${emoji} ${escHtml(cat)}</button>`
    );
  });

  container.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      container.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });
}

/* ─────────────────────────────────────────────
   FILTRO + BUSCA
   ───────────────────────────────────────────── */
function applyFilters() {
  let list = allProducts.filter(p => p.disponivel);

  if (activeCategory !== 'todos') {
    list = list.filter(p => p.categoria === activeCategory);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p =>
      p.nome.toLowerCase().includes(q) ||
      (p.categoria || '').toLowerCase().includes(q) ||
      (p.descricao || '').toLowerCase().includes(q)
    );
  }

  renderProducts(list);
}

/* ─────────────────────────────────────────────
   RENDER PRODUTOS
   ───────────────────────────────────────────── */
function renderProducts(products) {
  const grid  = document.getElementById('productsGrid');
  const empty = document.getElementById('emptyState');

  if (!products.length) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  grid.innerHTML = products.map(p => {
    const inCart = cart.some(i => i.id === p.id);
    const emoji  = CAT_EMOJI[p.categoria] || '📦';

    const imgTag = p.imagem
      ? `<img src="${escHtml(p.imagem)}" alt="${escHtml(p.nome)}" loading="lazy"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : '';
    const placeholder = `<div class="product-img-placeholder" style="display:${p.imagem ? 'none' : 'flex'}">${emoji}</div>`;
    const badge = p.destaque ? `<span class="product-badge">⭐ Destaque</span>` : '';

    return `
    <div class="product-card" data-id="${escHtml(p.id)}" onclick="openProductModal('${escHtml(p.id)}')">
      <div class="product-img-wrap">
        ${imgTag}${placeholder}${badge}
      </div>
      <div class="product-body">
        <p class="product-category">${escHtml(p.categoria)}</p>
        <h3 class="product-name">${escHtml(p.nome)}</h3>
        ${p.descricao ? `<p class="product-desc">${escHtml(p.descricao)}</p>` : ''}
        <div class="product-footer">
          <div>
            <span class="product-price">R$&nbsp;${formatPrice(p.preco)}</span>
            ${p.precoCombo ? `<span class="product-combo-tag">3 por R$&nbsp;${formatPrice(p.precoCombo)}</span>` : ''}
          </div>
          <button class="btn-add ${inCart ? 'added' : ''}"
                  onclick="addToCart('${escHtml(p.id)}')"
                  title="Adicionar à sacola"
                  aria-label="Adicionar ${escHtml(p.nome)} à sacola">
            ${inCart ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ─────────────────────────────────────────────
   CARRINHO
   ───────────────────────────────────────────── */
function addToCart(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  renderCart();
  syncCartButtons();
  openCart();
  showToast(`✓ ${product.nome} adicionado`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
  syncCartButtons();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(0, item.qty + delta);
  if (item.qty === 0) removeFromCart(id);
  else { saveCart(); renderCart(); }
}

function calcItemTotal(item) {
  if (!item.precoCombo || !item.qtdCombo) return item.preco * item.qty;
  const combos   = Math.floor(item.qty / item.qtdCombo);
  const avulsos  = item.qty % item.qtdCombo;
  return combos * item.precoCombo + avulsos * item.preco;
}

function saveCart() {
  localStorage.setItem('brisaria_cart', JSON.stringify(cart));
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const badge   = document.getElementById('cartBadge');
  const footer  = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalVal = cart.reduce((s, i) => s + calcItemTotal(i), 0);

  if (totalQty > 0) {
    badge.textContent = totalQty;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }

  if (!cart.length) {
    footer.style.display = 'none';
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <p>Sua sacola está vazia 🛍️</p>
        <button class="btn btn-outline-dark btn-sm" onclick="closeCart()">Ver catálogo</button>
      </div>`;
    return;
  }

  footer.style.display = 'block';
  totalEl.textContent  = `R$ ${formatPrice(totalVal)}`;

  itemsEl.innerHTML = cart.map(item => {
    const emoji  = CAT_EMOJI[item.categoria] || '📦';
    const thumb  = item.imagem
      ? `<img src="${escHtml(item.imagem)}" alt="${escHtml(item.nome)}"
             onerror="this.outerHTML='${emoji}'">`
      : emoji;

    return `
    <div class="cart-item">
      <div class="cart-item-thumb">${thumb}</div>
      <div class="cart-item-info">
        <p class="cart-item-name">${escHtml(item.nome)}</p>
        <p class="cart-item-unit">R$&nbsp;${formatPrice(item.preco)} cada</p>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQty('${escHtml(item.id)}', -1)" aria-label="Diminuir">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${escHtml(item.id)}', 1)" aria-label="Aumentar">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-subtotal">R$&nbsp;${formatPrice(calcItemTotal(item))}</span>
        <button class="cart-item-remove" onclick="removeFromCart('${escHtml(item.id)}')" aria-label="Remover ${escHtml(item.nome)}">🗑</button>
      </div>
    </div>`;
  }).join('');
}

function syncCartButtons() {
  document.querySelectorAll('.product-card[data-id]').forEach(card => {
    const id     = card.dataset.id;
    const btn    = card.querySelector('.btn-add');
    const inCart = cart.some(i => i.id === id);
    if (btn) {
      btn.textContent = inCart ? '✓' : '+';
      btn.classList.toggle('added', inCart);
    }
  });
}

/* ─────────────────────────────────────────────
   CARRINHO SIDEBAR — abrir / fechar
   ───────────────────────────────────────────── */
function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('visible');
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────────
   CHECKOUT — WhatsApp
   ───────────────────────────────────────────── */
function checkoutWhatsApp() {
  if (!cart.length) return;

  const lines = cart.map(i => {
    const sub    = calcItemTotal(i);
    const combos = i.precoCombo && i.qtdCombo ? Math.floor(i.qty / i.qtdCombo) : 0;
    const extra  = combos > 0 ? ` (${combos} combo${combos > 1 ? 's' : ''})` : '';
    return `▪ ${i.nome} (x${i.qty})${extra} — R$ ${formatPrice(sub)}`;
  });
  const total = cart.reduce((s, i) => s + calcItemTotal(i), 0);

  const msg = [
    '🌿 *Olá! Gostaria de fazer um pedido na Brisaria:*',
    '',
    ...lines,
    '',
    `💰 *Total: R$ ${formatPrice(total)}*`,
    '',
    'Pode confirmar disponibilidade e forma de entrega? 😊',
  ].join('\n');

  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ─────────────────────────────────────────────
   CLUBE DA BRISA — formulário
   ───────────────────────────────────────────── */
function setupLoyaltyForm() {
  const form = document.getElementById('loyaltyForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome      = document.getElementById('loyaltyName').value.trim();
    const whatsapp  = document.getElementById('loyaltyPhone').value.trim();
    const email     = document.getElementById('loyaltyEmail').value.trim();
    const nasc      = document.getElementById('loyaltyBirth').value;
    const submitBtn = document.getElementById('loyaltySubmitBtn');

    /* Validação básica */
    let valid = true;
    [
      { el: document.getElementById('loyaltyName'),  val: nome },
      { el: document.getElementById('loyaltyPhone'), val: whatsapp },
    ].forEach(({ el, val }) => {
      if (!val) { el.classList.add('error'); valid = false; }
      else el.classList.remove('error');
    });
    if (!valid) return;

    submitBtn.textContent = 'Cadastrando...';
    submitBtn.disabled    = true;

    try {
      if (CONFIG.scriptUrl) {
        /* Envia cadastro ao Apps Script */
        await fetch(CONFIG.scriptUrl, {
          method: 'POST',
          body: JSON.stringify({
            action:      'cadastro_clube',
            nome,
            whatsapp,
            email,
            nascimento:  nasc,
          }),
        });
      } else {
        /* Fallback: envia cadastro pelo WhatsApp */
        const msg = [
          '🌿 *Cadastro — Clube da Brisa*',
          '',
          `Nome: ${nome}`,
          `WhatsApp: ${whatsapp}`,
          email ? `Email: ${email}` : null,
          nasc  ? `Nascimento: ${formatDate(nasc)}` : null,
        ].filter(Boolean).join('\n');

        window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
      }

      /* Sucesso */
      form.classList.add('hidden');
      document.getElementById('loyaltySuccess').classList.remove('hidden');

    } catch (err) {
      console.error('Erro no cadastro:', err);
      submitBtn.textContent = 'Cadastrar no Clube';
      submitBtn.disabled    = false;
      showToast('⚠️ Erro ao cadastrar. Tente novamente.');
    }
  });
}

/* ─────────────────────────────────────────────
   CLUBE DA BRISA — consulta de pontos
   ───────────────────────────────────────────── */
function setupPontosConsulta() {
  const section = document.getElementById('pontosConsultaSection');
  if (!section) return;

  /* Só mostra a seção se o Apps Script estiver configurado */
  if (!CONFIG.scriptUrl) {
    section.style.display = 'none';
    return;
  }
  section.style.display = '';
}

async function consultarPontos() {
  const input  = document.getElementById('pontosWhatsApp');
  const btn    = document.getElementById('pontosConsultarBtn');
  const result = document.getElementById('pontosResult');
  const wNum   = normalizarWpp(input.value);

  if (!wNum) {
    input.classList.add('error');
    return;
  }
  input.classList.remove('error');

  btn.textContent = 'Consultando...';
  btn.disabled    = true;
  result.classList.add('hidden');
  result.innerHTML = '';

  try {
    const res  = await fetch(`${CONFIG.scriptUrl}?action=pontos&w=${wNum}`);
    const data = await res.json();

    if (data.erro) {
      result.innerHTML = `<p class="pontos-erro">⚠️ ${escHtml(data.erro)}</p>`;
    } else {
      const resgatesHtml = (data.resgates_disponiveis && data.resgates_disponiveis.length)
        ? `<ul class="resgates-list">${data.resgates_disponiveis.map(r =>
            `<li><span class="benefit-icon">✦</span>${r.pontos} pts → <strong>${escHtml(r.descricao)}</strong></li>`
          ).join('')}</ul>`
        : `<p class="resgates-empty">Continue comprando para chegar lá 🌿</p>`;

      result.innerHTML = `
        <p class="pontos-nome">Olá, <strong>${escHtml(data.nome)}</strong>! 🌿</p>
        <div class="pontos-saldo-box">
          <span class="pontos-saldo-num">${data.saldo}</span>
          <span class="pontos-saldo-label">pontos</span>
        </div>
        <p class="pontos-detalhe">Ganhos: ${data.pontos_ganhos} · Resgatados: ${data.pontos_resgatados}</p>
        ${data.saldo > 0
          ? `<div class="pontos-resgates"><p class="resgates-title">Disponível para resgatar:</p>${resgatesHtml}</div>`
          : resgatesHtml}
        <p class="pontos-rodape">Para resgatar, fale com a gente no WhatsApp 💬</p>`;
    }
  } catch (err) {
    result.innerHTML = `<p class="pontos-erro">⚠️ Erro de conexão. Tente novamente.</p>`;
  }

  result.classList.remove('hidden');
  btn.textContent = 'Consultar pontos';
  btn.disabled    = false;
}

/* ─────────────────────────────────────────────
   EVENT LISTENERS
   ───────────────────────────────────────────── */
function setupEventListeners() {
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('checkoutBtn').addEventListener('click', checkoutWhatsApp);

  document.getElementById('accountBtn').addEventListener('click', openAccount);
  document.getElementById('closeAccount').addEventListener('click', closeAccount);
  document.getElementById('accountOverlay').addEventListener('click', closeAccount);

  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value.trim();
    applyFilters();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeCart(); closeAccount(); }
  });
}

/* ─────────────────────────────────────────────
   MINHA CONTA — abrir / fechar
   ───────────────────────────────────────────── */
function openAccount() {
  renderAccountPanel();
  document.getElementById('accountSidebar').classList.add('open');
  document.getElementById('accountOverlay').classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeAccount() {
  document.getElementById('accountSidebar').classList.remove('open');
  document.getElementById('accountOverlay').classList.remove('visible');
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────────
   MINHA CONTA — render do painel
   ───────────────────────────────────────────── */
function renderAccountBtn() {
  const dot = document.getElementById('accountDot');
  if (dot) dot.classList.toggle('hidden', !clienteLogado);
}

function renderAccountPanel() {
  const loginEl  = document.getElementById('accountLogin');
  const perfilEl = document.getElementById('accountPerfil');

  if (!clienteLogado) {
    loginEl.classList.remove('hidden');
    perfilEl.classList.add('hidden');
    document.getElementById('accountPanelTitle').textContent = 'Minha conta 🌿';
    return;
  }

  loginEl.classList.add('hidden');
  perfilEl.classList.remove('hidden');
  document.getElementById('accountPanelTitle').textContent = 'Olá, ' + clienteLogado.nome.split(' ')[0] + ' 🌿';
  document.getElementById('perfilNome').textContent  = clienteLogado.nome;
  document.getElementById('perfilWpp').textContent   = clienteLogado.wpp;
  document.getElementById('perfilPontos').textContent = clienteLogado.saldo ?? 0;
  renderHistorico(clienteLogado.historico || []);
}

function renderHistorico(historico) {
  const el = document.getElementById('perfilHistorico');
  if (!historico.length) {
    el.innerHTML = '<p class="hist-empty">Nenhuma compra registrada ainda.</p>';
    return;
  }
  el.innerHTML = historico.map(h => `
    <div class="hist-item">
      <div class="hist-item-top">
        <span class="hist-produto">${escHtml(h.produto || h._desc || '')}</span>
        <span class="hist-valor">R$&nbsp;${formatPrice(h.valor || h._valor || 0)}</span>
      </div>
      <div class="hist-item-sub">
        ${formatDate(h.data)}
        ${h.quantidade ? ` · ${h.quantidade}x` : ''}
        ${h.pagamento  ? ` · ${escHtml(h.pagamento)}` : ''}
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   MINHA CONTA — login / logout
   ───────────────────────────────────────────── */
async function fazerLogin() {
  const input = document.getElementById('loginWhatsApp');
  const erroEl = document.getElementById('loginErro');
  const wNum = normalizarWpp(input.value);

  erroEl.classList.add('hidden');

  if (!wNum) {
    input.classList.add('error');
    return;
  }
  input.classList.remove('error');

  if (!CONFIG.scriptUrl) {
    erroEl.textContent = 'Sistema de contas ainda não configurado. Fale com a Brisaria!';
    erroEl.classList.remove('hidden');
    return;
  }

  const btn = document.querySelector('#accountLogin .btn');
  btn.textContent = 'Buscando...';
  btn.disabled = true;

  try {
    const res  = await fetch(`${CONFIG.scriptUrl}?action=perfil&w=${wNum}`);
    const data = await res.json();

    if (data.erro) {
      erroEl.textContent = data.erro;
      erroEl.classList.remove('hidden');
    } else {
      clienteLogado = { ...data, wpp: input.value.trim() };
      localStorage.setItem('brisaria_cliente', JSON.stringify(clienteLogado));
      renderAccountBtn();
      renderAccountPanel();
      showToast('Bem-vinda de volta, ' + clienteLogado.nome.split(' ')[0] + '!');
    }
  } catch {
    erroEl.textContent = 'Erro de conexão. Tente novamente.';
    erroEl.classList.remove('hidden');
  }

  btn.textContent = 'Entrar';
  btn.disabled = false;
}

function fazerLogout() {
  clienteLogado = null;
  localStorage.removeItem('brisaria_cliente');
  renderAccountBtn();
  renderAccountPanel();
  showToast('Até logo! 🌿');
}

/* ─────────────────────────────────────────────
   TOAST NOTIFICATION
   ───────────────────────────────────────────── */
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ─────────────────────────────────────────────
   MODAL DE PRODUTO + CARROSSEL
   ───────────────────────────────────────────── */
let _modalProductId = null;
let _carouselIdx    = 0;
let _carouselImgs   = [];

function openProductModal(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  _modalProductId = id;

  // Monta lista de imagens (suporte a campo 'imagens' array ou 'imagem' único)
  _carouselImgs = Array.isArray(p.imagens) && p.imagens.length
    ? p.imagens
    : p.imagem ? [p.imagem] : [];
  _carouselIdx = 0;

  // Preenche info
  document.getElementById('modalCat').textContent   = p.categoria;
  document.getElementById('modalName').textContent  = p.nome;
  document.getElementById('modalDesc').textContent  = p.descricao || '';
  document.getElementById('modalPrice').textContent = `R$ ${formatPrice(p.preco)}`;

  const comboEl = document.getElementById('modalCombo');
  if (p.precoCombo) {
    comboEl.textContent = `${p.qtdCombo} por R$ ${formatPrice(p.precoCombo)}`;
    comboEl.classList.remove('hidden');
  } else {
    comboEl.classList.add('hidden');
  }

  const addBtn = document.getElementById('modalAddBtn');
  const inCart = cart.some(i => i.id === id);
  addBtn.textContent = inCart ? '✓' : '+';
  addBtn.className = 'btn-add' + (inCart ? ' added' : '');

  // Carrossel
  const track = document.getElementById('carouselTrack');
  track.innerHTML = _carouselImgs.map(src =>
    `<img src="${escHtml(src)}" alt="${escHtml(p.nome)}" loading="lazy">`
  ).join('');
  track.style.transform = 'translateX(0)';

  // Dots
  const dots = document.getElementById('carouselDots');
  dots.innerHTML = _carouselImgs.length > 1
    ? _carouselImgs.map((_, i) =>
        `<button class="carousel-dot${i === 0 ? ' active' : ''}" onclick="carouselGoTo(${i})"></button>`
      ).join('')
    : '';

  // Esconde setas se só 1 imagem
  const showArrows = _carouselImgs.length > 1;
  document.getElementById('carouselPrev').style.display = showArrows ? '' : 'none';
  document.getElementById('carouselNext').style.display = showArrows ? '' : 'none';
  _updateCarouselBtns();

  document.getElementById('productModalOverlay').classList.remove('hidden');
  document.getElementById('productModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productModalOverlay').classList.add('hidden');
  document.getElementById('productModal').classList.add('hidden');
  document.body.style.overflow = '';
}

function carouselNav(dir) {
  _carouselIdx = Math.max(0, Math.min(_carouselImgs.length - 1, _carouselIdx + dir));
  _applyCarousel();
}

function carouselGoTo(i) {
  _carouselIdx = i;
  _applyCarousel();
}

function _applyCarousel() {
  document.getElementById('carouselTrack').style.transform = `translateX(-${_carouselIdx * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((d, i) =>
    d.classList.toggle('active', i === _carouselIdx)
  );
  _updateCarouselBtns();
}

function _updateCarouselBtns() {
  document.getElementById('carouselPrev').disabled = _carouselIdx === 0;
  document.getElementById('carouselNext').disabled = _carouselIdx === _carouselImgs.length - 1;
}

function modalAddToCart() {
  if (!_modalProductId) return;
  addToCart(_modalProductId);
  const btn = document.getElementById('modalAddBtn');
  btn.textContent = '✓';
  btn.classList.add('added');
}

/* ─────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────── */
function normalizarWpp(valor) {
  let n = (valor || '').replace(/\D/g, '');
  if (!n || n.length < 8) return '';
  if (!n.startsWith('55')) n = '55' + n;
  return n;
}

function formatPrice(value) {
  return Number(value).toFixed(2).replace('.', ',');
}

function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
