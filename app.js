/* ================================================
   BRISARIA — app.js
   ================================================ */

/* ─────────────────────────────────────────────
   CONFIGURAÇÕES — edite aqui antes de publicar
   ───────────────────────────────────────────── */
const CONFIG = {

  /* Número WhatsApp (código do país + DDD + número, sem + ou espaços) */
  whatsappNumber: '5511930637619',

  /* Google Sheets como catálogo:
     1. Publique a planilha em Arquivo → Publicar na Web
     2. Cole o ID da planilha abaixo (parte da URL entre /d/ e /edit)
     3. Mude useSampleData para false */
  sheetsId: 'YOUR_GOOGLE_SHEETS_ID',
  sheetsName: 'Produtos',   // nome da aba
  useSampleData: true,      // true = usa dados de exemplo; false = usa Google Sheets

  /* Clube da Brisa — Google Forms (opcional):
     Se não configurar, o cadastro é enviado pelo WhatsApp automaticamente */
  formId: '1FAIpQLSc2W68JOQ0fBGMwYmCF-FfgrhwuPWUuA5ddFWxie7E5SivK9g',
  formFields: {
    nome:       'entry.1702694103',
    whatsapp:   'entry.1422279347',
    email:      'entry.1869073504',
    nascimento: 'entry.806306353',
  },
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
  { id: '9',  nome: 'Seda King Size',            categoria: 'Seda',       descricao: 'King size brown, papel fino e queima uniforme. 3 por R$10.',                           preco: 4.00,   imagem: 'images/produtos/seda_king.jpeg',       disponivel: true,  destaque: false },
  { id: '10', nome: 'Seda Bem Bolado',           categoria: 'Seda',       descricao: 'Brown slim ultrafina da Bem Bolado. Top de linha. 3 por R$12.',                        preco: 5.00,   imagem: 'images/catalogo2/p02.jpg',            disponivel: true,  destaque: true  },
  { id: '11', nome: 'Seda Smoking',              categoria: 'Seda',       descricao: 'King size brown Smoking, ícone das sedas artesanais. 3 por R$15.',                     preco: 6.00,   imagem: 'images/produtos/seda_smoking.jpeg',    disponivel: true,  destaque: false },
  { id: '12', nome: 'Seda Sadhu Ultra Longa',    categoria: 'Seda',       descricao: 'Ultra longa Sadhu, queima lenta e saborosa. 3 por R$12.',                              preco: 5.00,   imagem: 'images/catalogo2/p14.jpg',            disponivel: true,  destaque: false },
  { id: '13', nome: 'Sedinha Sadhu',             categoria: 'Seda',       descricao: 'Sedinha Sadhu slim ultrafina. Fácil de rolar. 3 por R$10.',                            preco: 4.00,   imagem: 'images/catalogo2/p15.jpg',            disponivel: true,  destaque: false },
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

/* ─────────────────────────────────────────────
   INICIALIZAÇÃO
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setupHeader();
  setupEventListeners();
  setupLoyaltyForm();
  updateFooterLinks();
  loadCatalog();
  renderCart();
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

  loading.classList.remove('hidden');
  error.classList.add('hidden');

  try {
    if (CONFIG.useSampleData || !CONFIG.sheetsId || CONFIG.sheetsId === 'YOUR_GOOGLE_SHEETS_ID') {
      allProducts = SAMPLE_PRODUCTS;
    } else {
      allProducts = await fetchFromSheets();
    }
  } catch (err) {
    console.warn('Erro ao carregar planilha, usando dados de exemplo:', err);
    allProducts = SAMPLE_PRODUCTS;
  }

  loading.classList.add('hidden');
  renderFeatured();
  renderFilters();
  applyFilters();
}

async function fetchFromSheets() {
  const url = `https://docs.google.com/spreadsheets/d/${CONFIG.sheetsId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(CONFIG.sheetsName)}`;
  const res  = await fetch(url);
  const text = await res.text();

  /* Remove o wrapper JSONP do Google */
  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*?)\);?\s*$/);
  if (!match) throw new Error('Resposta inesperada da planilha');
  const json = JSON.parse(match[1]);
  if (!json.table || !json.table.rows) return [];

  const cols = json.table.cols.map(c => (c.label || '').toLowerCase().trim());

  const get = (row, field) => {
    const idx  = cols.indexOf(field);
    if (idx === -1) return '';
    const cell = row.c[idx];
    return cell ? String(cell.f ?? cell.v ?? '').trim() : '';
  };

  return json.table.rows
    .map((row, i) => ({
      id:         String(get(row, 'id') || i + 1),
      nome:       get(row, 'nome'),
      categoria:  get(row, 'categoria'),
      descricao:  get(row, 'descricao'),
      preco:      parseFloat(get(row, 'preco').replace(',', '.')) || 0,
      imagem:     get(row, 'imagem'),
      disponivel: get(row, 'disponivel').toLowerCase() !== 'false',
      destaque:   get(row, 'destaque').toLowerCase() === 'true',
    }))
    .filter(p => p.nome && p.disponivel);
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
    <div class="product-card" data-id="${escHtml(p.id)}">
      <div class="product-img-wrap">
        ${imgTag}${placeholder}
      </div>
      <div class="product-body">
        <p class="product-category">${escHtml(p.categoria)}</p>
        <h3 class="product-name">${escHtml(p.nome)}</h3>
        <div class="product-footer">
          <span class="product-price">R$&nbsp;${formatPrice(p.preco)}</span>
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
    <div class="product-card" data-id="${escHtml(p.id)}">
      <div class="product-img-wrap">
        ${imgTag}${placeholder}${badge}
      </div>
      <div class="product-body">
        <p class="product-category">${escHtml(p.categoria)}</p>
        <h3 class="product-name">${escHtml(p.nome)}</h3>
        ${p.descricao ? `<p class="product-desc">${escHtml(p.descricao)}</p>` : ''}
        <div class="product-footer">
          <span class="product-price">R$&nbsp;${formatPrice(p.preco)}</span>
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

function saveCart() {
  localStorage.setItem('brisaria_cart', JSON.stringify(cart));
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const badge   = document.getElementById('cartBadge');
  const footer  = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalVal = cart.reduce((s, i) => s + i.preco * i.qty, 0);

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
        <span class="cart-item-subtotal">R$&nbsp;${formatPrice(item.preco * item.qty)}</span>
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

  const lines = cart.map(i =>
    `▪ ${i.nome} (x${i.qty}) — R$ ${formatPrice(i.preco * i.qty)}`
  );
  const total = cart.reduce((s, i) => s + i.preco * i.qty, 0);

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
      const formConfigured = CONFIG.formId && CONFIG.formId !== 'YOUR_GOOGLE_FORM_ID';

      if (formConfigured) {
        /* Envio direto ao Google Forms via no-cors (sem precisar de API key) */
        const body = new URLSearchParams();
        body.append(CONFIG.formFields.nome,       nome);
        body.append(CONFIG.formFields.whatsapp,   whatsapp);
        body.append(CONFIG.formFields.email,      email);
        body.append(CONFIG.formFields.nascimento, nasc);

        await fetch(`https://docs.google.com/forms/d/e/${CONFIG.formId}/formResponse`, {
          method: 'POST',
          mode:   'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body:   body.toString(),
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
   EVENT LISTENERS
   ───────────────────────────────────────────── */
function setupEventListeners() {
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('checkoutBtn').addEventListener('click', checkoutWhatsApp);

  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value.trim();
    applyFilters();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCart();
  });
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
   HELPERS
   ───────────────────────────────────────────── */
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
