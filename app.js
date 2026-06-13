/**
 * ============================================================
 * BRISARIA — Apps Script Web App
 * ============================================================
 *
 * COMO CONFIGURAR (faça UMA VEZ):
 *
 * 1. Abra o Google Sheets da Brisaria
 * 2. Extensões → Apps Script → cole este arquivo inteiro
 * 3. Salve (Ctrl+S)
 * 4. No menu de funções, selecione "setup" e clique ▶ Executar
 *    → Isso cria as abas necessárias na planilha
 * 5. Selecione "popularProdutos" e clique ▶ Executar
 *    → Isso preenche a aba PRODUTOS com o catálogo completo
 * 6. Publicar como Web App:
 *    Implantar → Nova implantação → Tipo: Web App
 *    Executar como: Eu (sua conta Google)
 *    Quem tem acesso: Qualquer pessoa
 *    → Copie a URL gerada (formato: https://script.google.com/macros/s/.../exec)
 * 7. Cole essa URL em:
 *    - APP/app.js  → CONFIG.scriptUrl
 *    - SITE/app.js → CONFIG.scriptUrl
 *
 * ============================================================
 */


// ── NOMES DAS ABAS ───────────────────────────────────────────
var ABA_PRODUTOS = 'PRODUTOS';
var ABA_VENDAS   = 'Vendas';
var ABA_COMPRAS  = 'Compras';
var ABA_SAIDAS   = 'Saidas';
var ABA_CLUBE    = 'Clube';


// ============================================================
// SETUP — executa uma vez para criar as abas
// ============================================================
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  _criarAbaSeNaoExistir(ss, ABA_PRODUTOS, [
    'id','nome','categoria','preco_venda','preco_custo','estoque_minimo',
    'estoque_inicial','imagem','disponivel','destaque','descricao'
  ]);
  _criarAbaSeNaoExistir(ss, ABA_VENDAS, [
    'id','data','produto','quantidade','valor','pagamento','cliente','clienteWpp','timestamp'
  ]);
  _criarAbaSeNaoExistir(ss, ABA_COMPRAS, [
    'id','data','fornecedor','produto','quantidade','custo_unit','custo_total','obs','timestamp'
  ]);
  _criarAbaSeNaoExistir(ss, ABA_SAIDAS, [
    'id','data','descricao','valor','timestamp'
  ]);
  _criarAbaSeNaoExistir(ss, ABA_CLUBE, [
    'id','nome','whatsapp','email','nascimento','pontos_ganhos','pontos_resgatados','data_cadastro'
  ]);

  SpreadsheetApp.getUi().alert(
    'Setup concluído!\n\nAgora execute a função "popularProdutos" e depois publique como Web App.'
  );
}


// ============================================================
// POPULAR PRODUTOS — executa uma vez para preencher o catálogo
// ============================================================
function popularProdutos() {
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var aba = ss.getSheetByName(ABA_PRODUTOS);

  if (!aba) {
    SpreadsheetApp.getUi().alert('Execute "setup" primeiro!');
    return;
  }

  if (aba.getLastRow() > 1) {
    aba.deleteRows(2, aba.getLastRow() - 1);
  }

  var produtos = [
    ['P001','Tabaco Amsterdam 25g',     'Tabaco',    18, 0, 5, 0, 'images/catalogo2/p07.jpg',    'TRUE',  'TRUE',  'Blend suave e aromático, ideal para quem curte um cigarro levinho. 25g.'],
    ['P002','Tabaco Acrema 20g',        'Tabaco',    18, 0, 5, 0, 'images/catalogo/tabacos.jpg', 'FALSE', 'FALSE', 'Tabaco nacional com sabor único e encorpado. 20g.'],
    ['P003','Hi Tabaco 25g',            'Tabaco',    28, 0, 3, 0, 'images/catalogo/tabacos.jpg', 'FALSE', 'FALSE', 'Blend especial com aroma diferenciado e fumaça suave. 25g.'],
    ['P004','Tabaco Solto (dose)',       'Tabaco',     5, 0, 0, 0, '',                            'TRUE',  'FALSE', 'Dose avulsa de tabaco.'],
    ['P005','Seda Bem Bolado Brown Slim','Seda',       5, 0,10, 0, 'images/catalogo2/p02.jpg',    'TRUE',  'TRUE',  'Brown slim ultrafina da Bem Bolado. Top de linha. 3 por R$12.'],
    ['P006','Seda Bem Bolado Brown Large','Seda',      5, 0,10, 0, 'images/catalogo2/p02.jpg',    'TRUE',  'FALSE', 'Brown large da Bem Bolado. 3 por R$12.'],
    ['P007','Seda Guru Spirit Slim',    'Seda',        4, 0,10, 0, '',                            'TRUE',  'FALSE', 'Sedinha Guru Spirit slim. Fácil de rolar. 3 por R$10.'],
    ['P008','Seda Guru Spirit Brown Longa','Seda',     5, 0,10, 0, '',                            'TRUE',  'FALSE', 'Guru Spirit Brown Longa. 3 por R$12.'],
    ['P009','Seda Papelito Brown Slim', 'Seda',        5, 0,10, 0, '',                            'TRUE',  'FALSE', 'Papelito Brown Slim. 3 por R$12.'],
    ['P010','Seda Smoking KS Brown',    'Seda',        5, 0,10, 0, 'images/produtos/seda_smoking.jpeg', 'TRUE','FALSE','King size brown Smoking, ícone das sedas artesanais. 3 por R$15.'],
    ['P011','Piteira Tonabê Large',     'Piteira',     7, 0, 5, 0, 'images/produtos/a_piteira_1.jpeg',  'TRUE','FALSE','Madeira Tonabê versão longa. Artesanal e resistente.'],
    ['P012','Piteira Mega Large Tonabê','Piteira',     7, 0, 5, 0, 'images/produtos/a_piteira.jpeg',    'TRUE','TRUE', 'Artesanal de madeira Tonabê mega longa. Filtra e esfria com elegância.'],
    ['P013','Piteira Sadhu Large',      'Piteira',     5, 0, 5, 0, 'images/produtos/piteira_tonabe.jpeg','TRUE','FALSE','Bambu natural Sadhu large, 35 tips. Leve, resistente e sustentável.'],
    ['P014','Piteira de Vidro',         'Piteira',     8, 0, 3, 0, 'images/catalogo/acessorios.jpg',    'TRUE','FALSE','Vidro transparente, fácil de limpar e muito estilosa.'],
    ['P015','Cuia Tonabê Colorida',     'Cuia',       16, 0, 3, 0, 'images/catalogo2/p22.jpg',    'TRUE',  'FALSE', 'Cuia colorida Tonabê. Cores variadas — consulte disponibilidade.'],
    ['P016','Cuia Spa Abduzido',        'Cuia',       20, 0, 3, 0, 'images/produtos/cuia_spa_abduzido.jpeg','TRUE','TRUE','Cuia spa da Abduzido. Design exclusivo em cores vibrantes.'],
    ['P017','Kit Tabas',               'Kit',         30, 0, 3, 0, 'images/produtos/kit_tabas.jpeg','TRUE', 'TRUE',  '1 tabaco + 1 filtro Aleda + 2 sedinhas Sadhu. Tudo que você precisa.'],
    ['P018','Kit Tabas Premium',       'Kit',         45, 0, 3, 0, 'images/produtos/kit_tabas_premium.jpeg','TRUE','FALSE','Kit premium Brisaria. Perfeito para presentear.'],
    ['P019','Kit Completo',            'Kit',         45, 0, 2, 0, 'images/produtos/kit_completo.png','TRUE','FALSE','1 tabaco + 2 sedinhas + 1 filtro Aleda + 1 piteira Sadhu + 3 sedinhas.'],
    ['P020','Kit Tabas 2.0',           'Kit',         60, 0, 2, 0, 'images/catalogo2/p12.jpg',    'TRUE',  'FALSE', '2 tabacos + 2 filtros Aleda + 6 sedinhas Guru Spirit Slim ou Large.'],
    ['P021','Kit Tabas 4.0',           'Kit',        110, 0, 1, 0, 'images/catalogo2/p13.jpg',    'TRUE',  'TRUE',  '4 tabacos + 4 filtros Aleda + 12 sedinhas Guru Spirit. O kit definitivo.'],
    ['P022','Kitzinho',                'Kit',         12, 0, 3, 0, 'images/catalogo/kit_kitzinho.jpg','TRUE','FALSE','Mini kit Brisaria para experimentar. 2 sedinhas Bem Bolado + piteira Sadhu large.'],
    ['P023','Filtro Aleda Extra Longo','Filtro',       8, 0, 5, 0, 'images/catalogo2/p04.jpg',    'TRUE',  'FALSE', 'Filtro extra longo Aleda Slim 22mm. 150 unidades. Filtração superior.'],
    ['P024','Clipper',                 'Isqueiro',    10, 0, 5, 0, 'images/produtos/clipper.jpeg', 'TRUE',  'FALSE', 'Isqueiro Clipper recarregável. Cores sortidas.'],
    ['P025','Bic',                     'Isqueiro',    10, 0, 5, 0, 'images/produtos/bic.png',      'TRUE',  'FALSE', 'Isqueiro Bic clássico. Cores sortidas.'],
    ['P026','Tesoura Passarinho',      'Tesoura',     16, 0, 3, 0, 'images/catalogo2/p17.jpg',    'TRUE',  'FALSE', 'Tesoura passarinho. Rosa/dourado ou furta-cor. Corte preciso.'],
    ['P027','Tesoura Dobrável Tonabê', 'Tesoura',     16, 0, 3, 0, 'images/catalogo2/p18.jpg',    'TRUE',  'FALSE', 'Tesoura dobrável Tonabê. Cores variadas. Prática e compacta.'],
    ['P028','Slick Tonabê 5ml',        'Slick',       16, 0, 3, 0, 'images/catalogo2/p20.jpg',    'TRUE',  'FALSE', 'Slick de silicone Tonabê, 5ml. Ideal para guardar sua brisa.'],
    ['P029','Slick Lego 26ml',         'Slick',       25, 0, 2, 0, 'images/catalogo2/p21.jpg',    'TRUE',  'FALSE', 'Slick com tampa no estilo Lego, 26ml. Divertido e funcional.'],
    ['P030','Dichavador Sadhu Peq.',   'Dichavador',  20, 0, 3, 0, 'images/produtos/dichavas_colmeia.jpeg','TRUE','FALSE','Sadhu plástico pequeno flor. Leve e prático para o dia a dia.'],
    ['P031','Dichavador Lion Rolling', 'Dichavador',  40, 0, 2, 0, 'images/catalogo2/p25.jpg',    'TRUE',  'FALSE', 'Lion Rolling Circus. Design exclusivo, resistente e compacto.'],
    ['P032','Dichavador Metal 4 Partes','Dichavador', 30, 0, 2, 0, 'images/catalogo2/p26.jpg',    'TRUE',  'FALSE', 'Metal compacto, 4 partes. Estampas variadas. Ótimo para levar na bolsa.'],
    ['P033','Dichavador Colmeia Peq.', 'Dichavador',  30, 0, 2, 0, 'images/produtos/dich_colmeia.jpeg','TRUE','FALSE','Colmeia plástico pequeno. Custo-benefício imbatível.'],
    ['P034','Dichavador Colmeia Grande','Dichavador', 40, 0, 2, 0, 'images/produtos/dicha_colme.jpeg','TRUE','FALSE','Colmeia grande. Corte preciso e durável.'],
    ['P035','Dichavador Colmeia Metal','Dichavador',  120,0, 1, 0, 'images/catalogo2/p27.jpg',    'TRUE',  'FALSE', 'Alien Dawg — metal premium colmeia, 4 partes com coador. Edição especial.'],
    ['P036','Pilão Folha Chaveiro',    'Acessório',   16, 0, 3, 0, 'images/catalogo2/p30.jpg',    'TRUE',  'FALSE', 'Mini pilão chaveiro com detalhe de folha. Compacto e estiloso.'],
    ['P037','Tubeck',                  'Acessório',   10, 0, 3, 0, 'images/catalogo2/p31.jpg',    'TRUE',  'FALSE', 'Tubeck porta-cigarro. Prático para levar sem amassar.'],
    ['P038','Múltiplos Produtos (combo)','Combo',      0, 0, 0, 0, '',                            'FALSE', 'FALSE', 'Combo de múltiplos produtos.'],
  ];

  aba.getRange(2, 1, produtos.length, 11).setValues(produtos);

  SpreadsheetApp.getUi().alert(
    'Produtos cadastrados com sucesso!\n\n' +
    'Agora ajuste a coluna "estoque_inicial" (coluna G) com a quantidade atual de cada produto.\n' +
    'Depois publique o script como Web App.'
  );
}


// ============================================================
// WEB APP — doGet (leituras do site e do app)
// ============================================================
function doGet(e) {
  var p      = e.parameter || {};
  var action = p.action   || 'catalogo';

  try {
    var result;
    if      (action === 'catalogo')  result = getCatalogo();
    else if (action === 'pontos')    result = getPontos(p.w || '');
    else if (action === 'perfil')    result = getPerfilCliente(p.w || '');
    else if (action === 'dashboard') result = getDashboard();
    else if (action === 'historico') result = getHistorico();
    else if (action === 'estoque')   result = getEstoque();
    else                             result = { erro: 'Ação inválida' };
    return _json(result);
  } catch (err) {
    return _json({ erro: err.toString() });
  }
}


// ============================================================
// WEB APP — doPost (gravações do app)
// ============================================================
function doPost(e) {
  try {
    var data   = JSON.parse(e.postData.contents);
    var action = data.action || '';
    var result;

    if      (action === 'venda')          result = registrarVenda(data);
    else if (action === 'compra')         result = registrarCompra(data);
    else if (action === 'saida')          result = registrarSaida(data);
    else if (action === 'cadastro_clube') result = cadastrarClube(data);
    else if (action === 'deletar')        result = deletarRegistro(data);
    else                                  result = { erro: 'Ação inválida' };

    return _json(result);
  } catch (err) {
    return _json({ erro: err.toString() });
  }
}


// ============================================================
// GRAVAÇÕES
// ============================================================

function registrarVenda(d) {
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var aba = ss.getSheetByName(ABA_VENDAS);
  var id  = Date.now();

  aba.appendRow([
    id,
    d.data        || _hoje(),
    d.produto     || '',
    parseInt(d.quantidade) || 1,
    parseFloat(d.valor)    || 0,
    d.pagamento   || 'Pix',
    d.cliente     || '',
    d.clienteWpp  || '',
    new Date(),
  ]);

  if (d.clienteWpp) {
    _adicionarPontos(d.clienteWpp, Math.floor(parseFloat(d.valor) || 0));
  } else if (d.cliente) {
    _adicionarPontos(d.cliente, Math.floor(parseFloat(d.valor) || 0));
  }

  return { ok: true, id: id };
}

function registrarCompra(d) {
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var aba = ss.getSheetByName(ABA_COMPRAS);
  var id  = Date.now();

  aba.appendRow([
    id,
    d.data         || _hoje(),
    d.fornecedor   || '',
    d.produto      || '',
    parseInt(d.quantidade)  || 1,
    parseFloat(d.custoUnit) || 0,
    parseFloat(d.custoTotal)|| 0,
    d.obs          || '',
    new Date(),
  ]);

  return { ok: true, id: id };
}

function registrarSaida(d) {
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var aba = ss.getSheetByName(ABA_SAIDAS);
  var id  = Date.now();

  aba.appendRow([
    id,
    d.data      || _hoje(),
    d.descricao || '',
    parseFloat(d.valor) || 0,
    new Date(),
  ]);

  return { ok: true, id: id };
}

function deletarRegistro(d) {
  var tipo = String(d.tipo || '');
  var id   = String(d.id   || '');
  var nomeAba = tipo === 'venda'  ? ABA_VENDAS  :
                tipo === 'compra' ? ABA_COMPRAS : ABA_SAIDAS;

  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var aba = ss.getSheetByName(nomeAba);
  if (!aba) return { erro: 'Aba não encontrada' };

  var dados = aba.getDataRange().getValues();
  for (var i = 1; i < dados.length; i++) {
    if (String(dados[i][0]) === id) {
      aba.deleteRow(i + 1);
      return { ok: true };
    }
  }
  return { erro: 'Registro não encontrado' };
}

function cadastrarClube(d) {
  var ss   = SpreadsheetApp.getActiveSpreadsheet();
  var aba  = ss.getSheetByName(ABA_CLUBE);
  var dados = aba.getDataRange().getValues();
  var wNum = _normWpp(d.whatsapp);

  for (var i = 1; i < dados.length; i++) {
    if (_normWpp(String(dados[i][2])) === wNum) {
      return { ok: true, ja_cadastrado: true };
    }
  }

  var id = Date.now();
  aba.appendRow([
    id,
    d.nome       || '',
    d.whatsapp   || '',
    d.email      || '',
    d.nascimento || '',
    0,
    0,
    new Date(),
  ]);

  return { ok: true, ja_cadastrado: false };
}


// ============================================================
// LEITURAS
// ============================================================

function getCatalogo() {
  var ss      = SpreadsheetApp.getActiveSpreadsheet();
  var aba     = ss.getSheetByName(ABA_PRODUTOS);
  if (!aba || aba.getLastRow() < 2) return [];

  var dados   = aba.getDataRange().getValues();
  var cab     = dados[0].map(function(c) { return String(c).toLowerCase().trim(); });
  var vendas  = _todasLinhas(ABA_VENDAS);
  var compras = _todasLinhas(ABA_COMPRAS);

  return dados.slice(1)
    .filter(function(row) { return row[1]; })
    .map(function(row) {
      var get = function(campo) {
        var idx = cab.indexOf(campo);
        return idx >= 0 ? row[idx] : '';
      };

      var nome        = String(get('nome'));
      var estoqueIni  = parseInt(get('estoque_inicial')) || 0;
      var disponivel  = String(get('disponivel')).toUpperCase() !== 'FALSE';

      var comprado = compras
        .filter(function(c) { return String(c[3]) === nome; })
        .reduce(function(s, c) { return s + (parseInt(c[4]) || 0); }, 0);

      var vendido = vendas
        .filter(function(v) { return String(v[2]) === nome; })
        .reduce(function(s, v) { return s + (parseInt(v[3]) || 0); }, 0);

      var estoqueAtual = estoqueIni + comprado - vendido;

      return {
        id:         String(get('id')),
        nome:       nome,
        categoria:  String(get('categoria')),
        preco:      parseFloat(get('preco_venda'))  || 0,
        descricao:  String(get('descricao')),
        imagem:     String(get('imagem')),
        disponivel: disponivel && estoqueAtual > 0,
        destaque:   String(get('destaque')).toUpperCase() === 'TRUE',
        estoque:    estoqueAtual,
      };
    });
}

function getEstoque() {
  var ss      = SpreadsheetApp.getActiveSpreadsheet();
  var aba     = ss.getSheetByName(ABA_PRODUTOS);
  if (!aba || aba.getLastRow() < 2) return [];

  var dados   = aba.getDataRange().getValues();
  var vendas  = _todasLinhas(ABA_VENDAS);
  var compras = _todasLinhas(ABA_COMPRAS);

  return dados.slice(1)
    .filter(function(row) { return row[1]; })
    .map(function(row) {
      var nome       = String(row[1]);
      var estoqueIni = parseInt(row[6]) || 0;
      var minimo     = parseInt(row[5]) || 0;

      var comprado = compras
        .filter(function(c) { return String(c[3]) === nome; })
        .reduce(function(s, c) { return s + (parseInt(c[4]) || 0); }, 0);

      var vendido = vendas
        .filter(function(v) { return String(v[2]) === nome; })
        .reduce(function(s, v) { return s + (parseInt(v[3]) || 0); }, 0);

      var atual = estoqueIni + comprado - vendido;

      return {
        nome:            nome,
        categoria:       String(row[2]),
        atual:           atual,
        minimo:          minimo,
        estoqueInicial:  estoqueIni,
      };
    });
}

function getDashboard() {
  var vendas  = _todasLinhas(ABA_VENDAS);
  var compras = _todasLinhas(ABA_COMPRAS);
  var saidas  = _todasLinhas(ABA_SAIDAS);

  var hoje    = new Date();
  var mesAtual = hoje.getFullYear() + '-' + _pad(hoje.getMonth() + 1);

  function mesKey(v) {
    var d = String(v || '');
    return d.substring(0, 7);
  }

  var receitaMes   = vendas .filter(function(v) { return mesKey(v[1]) === mesAtual; }).reduce(function(s, v) { return s + (parseFloat(v[4]) || 0); }, 0);
  var comprasMes   = compras.filter(function(c) { return mesKey(c[1]) === mesAtual; }).reduce(function(s, c) { return s + (parseFloat(c[6]) || 0); }, 0);
  var receitaTotal = vendas .reduce(function(s, v)  { return s + (parseFloat(v[4]) || 0); }, 0);
  var comprasTotal = compras.reduce(function(s, c)  { return s + (parseFloat(c[6]) || 0); }, 0);
  var saidasTotal  = saidas .reduce(function(s, sd) { return s + (parseFloat(sd[3])|| 0); }, 0);

  var ultimasVendas = vendas
    .slice().sort(function(a, b) { return Number(b[0]) - Number(a[0]); })
    .slice(0, 8)
    .map(function(v) {
      return {
        id: v[0], data: v[1], produto: v[2],
        quantidade: v[3], valor: v[4], pagamento: v[5], cliente: v[6],
      };
    });

  return {
    receitaMes:    receitaMes,
    comprasMes:    comprasMes,
    resultadoMes:  receitaMes - comprasMes,
    saldo:         receitaTotal - comprasTotal - saidasTotal,
    ultimasVendas: ultimasVendas,
  };
}

function getHistorico() {
  var vendas  = _todasLinhas(ABA_VENDAS).map(function(v) {
    return { id: v[0], data: v[1], _tipo: 'Venda',  _desc: v[2], quantidade: v[3], _valor: v[4], pagamento: v[5], cliente: v[6], _cor: 'green' };
  });
  var compras = _todasLinhas(ABA_COMPRAS).map(function(c) {
    return { id: c[0], data: c[1], _tipo: 'Compra', _desc: c[3], quantidade: c[4], _valor: c[6], fornecedor: c[2], _cor: 'red' };
  });
  var saidas  = _todasLinhas(ABA_SAIDAS).map(function(s) {
    return { id: s[0], data: s[1], _tipo: 'Saída',  _desc: s[2], _valor: s[3], _cor: 'red' };
  });

  return vendas.concat(compras).concat(saidas)
    .sort(function(a, b) { return Number(b.id) - Number(a.id); });
}

function getPontos(w) {
  if (!w) return { erro: 'WhatsApp não informado' };

  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var aba   = ss.getSheetByName(ABA_CLUBE);
  if (!aba || aba.getLastRow() < 2) return { erro: 'Clube não encontrado' };

  var dados = aba.getDataRange().getValues();
  var wNum  = _normWpp(w);

  for (var i = 1; i < dados.length; i++) {
    var row = dados[i];
    if (_normWpp(String(row[2])) === wNum) {
      var ganhos     = parseInt(row[5]) || 0;
      var resgatados = parseInt(row[6]) || 0;
      var saldo      = ganhos - resgatados;

      var resgates = [];
      if (saldo >= 100) resgates.push({ pontos: 100, descricao: '1 seda grátis' });
      if (saldo >= 200) resgates.push({ pontos: 200, descricao: '1 piteira grátis' });
      if (saldo >= 500) resgates.push({ pontos: 500, descricao: 'R$ 15 de desconto' });

      return {
        nome:                String(row[1]),
        saldo:               saldo,
        pontos_ganhos:       ganhos,
        pontos_resgatados:   resgatados,
        resgates_disponiveis: resgates,
      };
    }
  }

  return { erro: 'WhatsApp não encontrado no Clube da Brisa. Cadastre-se primeiro!' };
}


// ============================================================
// PERFIL DO CLIENTE (login + histórico de compras)
// ============================================================

function getPerfilCliente(w) {
  if (!w) return { erro: 'WhatsApp não informado' };

  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var clube = ss.getSheetByName(ABA_CLUBE);
  if (!clube || clube.getLastRow() < 2) return { erro: 'Clube não encontrado' };

  var dados = clube.getDataRange().getValues();
  var wNum  = _normWpp(w);

  var membroRow = null;
  for (var i = 1; i < dados.length; i++) {
    if (_normWpp(String(dados[i][2])) === wNum) {
      membroRow = dados[i];
      break;
    }
  }

  if (!membroRow) {
    return { erro: 'WhatsApp não encontrado. Cadastre-se no Clube da Brisa primeiro!' };
  }

  var ganhos     = parseInt(membroRow[5]) || 0;
  var resgatados = parseInt(membroRow[6]) || 0;
  var saldo      = ganhos - resgatados;

  var vendas = _todasLinhas(ABA_VENDAS);
  var historico = vendas
    .filter(function(v) {
      return _normWpp(String(v[7] || '')) === wNum;
    })
    .sort(function(a, b) { return Number(b[0]) - Number(a[0]); })
    .map(function(v) {
      return {
        id:         v[0],
        data:       v[1],
        produto:    v[2],
        quantidade: v[3],
        valor:      v[4],
        pagamento:  v[5],
      };
    });

  var resgates = [];
  if (saldo >= 5)  resgates.push({ pontos: 5,  descricao: 'Sedinha ou filtro grátis' });
  if (saldo >= 7)  resgates.push({ pontos: 7,  descricao: 'Kitzinho grátis' });
  if (saldo >= 10) resgates.push({ pontos: 10, descricao: 'Kit Tabas grátis' });
  if (saldo >= 15) resgates.push({ pontos: 15, descricao: 'Kit Completo grátis' });

  return {
    nome:                String(membroRow[1]),
    saldo:               saldo,
    pontos_ganhos:       ganhos,
    pontos_resgatados:   resgatados,
    resgates_disponiveis: resgates,
    historico:           historico,
  };
}


// ============================================================
// UTILIDADES INTERNAS
// ============================================================

function _normWpp(v) {
  var n = String(v || '').replace(/\D/g, '');
  if (!n) return '';
  if (n.indexOf('55') !== 0) n = '55' + n;
  return n;
}

function _adicionarPontos(clienteWpp, pontos) {
  if (!pontos || pontos <= 0) return;
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var aba = ss.getSheetByName(ABA_CLUBE);
  if (!aba || aba.getLastRow() < 2) return;

  var dados = aba.getDataRange().getValues();
  var busca = _normWpp(clienteWpp);

  for (var i = 1; i < dados.length; i++) {
    if (_normWpp(String(dados[i][2])) === busca) {
      var atual = parseInt(dados[i][5]) || 0;
      aba.getRange(i + 1, 6).setValue(atual + pontos);
      return;
    }
  }
}

function _todasLinhas(nomeAba) {
  var ss  = SpreadsheetApp.getActiveSpreadsheet();
  var aba = ss.getSheetByName(nomeAba);
  if (!aba || aba.getLastRow() < 2) return [];
  return aba.getRange(2, 1, aba.getLastRow() - 1, aba.getLastColumn()).getValues();
}

function _criarAbaSeNaoExistir(ss, nome, cabecalhos) {
  var aba = ss.getSheetByName(nome);
  if (!aba) {
    aba = ss.insertSheet(nome);
    aba.getRange(1, 1, 1, cabecalhos.length).setValues([cabecalhos]);
    aba.setFrozenRows(1);
  }
  return aba;
}

function _json(data) {
  var output = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

function _hoje() {
  var d = new Date();
  return d.getFullYear() + '-' + _pad(d.getMonth() + 1) + '-' + _pad(d.getDate());
}

function _pad(n) {
  return n < 10 ? '0' + n : String(n);
}
