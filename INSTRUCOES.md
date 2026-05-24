# Instruções — Site Brisaria

## Estrutura dos arquivos

```
SITE/
├── index.html           ← página principal
├── style.css            ← visual do site
├── app.js               ← lógica (catálogo, carrinho, checkout, fidelidade)
├── images/              ← fotos dos produtos
│   ├── clipper.jpeg
│   ├── cuia.jpeg
│   ├── dichavador.jpeg
│   ├── kit.jpeg
│   ├── kit_premium.jpeg
│   ├── piteira.jpeg
│   ├── piteira_tonabe.jpeg
│   ├── seda_kin.jpeg
│   └── seda_smoking.jpeg
├── catalogo_modelo.csv  ← modelo para preencher no Google Sheets
├── .nojekyll            ← necessário para GitHub Pages
└── INSTRUCOES.md        ← este arquivo
```

---

## 1. Configurar o número do WhatsApp

Abra `app.js` e encontre a seção `CONFIG` no topo do arquivo:

```javascript
whatsappNumber: '5511999999999',
```

Substitua pelo seu número **com DDI (55) + DDD + número**, sem espaços ou símbolos.

Exemplo: `'5511987654321'`

---

## 2. Configurar o catálogo via Google Sheets

### Passo 1 — Criar a planilha

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma nova planilha
2. Renomeie a primeira aba para **Produtos**
3. Na linha 1, adicione exatamente estes cabeçalhos (em minúsculas):

| A  | B    | C         | D        | E      | F       | G          | H        |
|----|------|-----------|----------|--------|---------|------------|----------|
| id | nome | categoria | descricao | preco | imagem  | disponivel | destaque |

4. Use o arquivo `catalogo_modelo.csv` como base — ele já tem todos os produtos preenchidos
   - No Google Sheets: **Arquivo → Importar → Fazer upload → catalogo_modelo.csv**

### Passo 2 — Publicar a planilha

1. Clique em **Arquivo → Compartilhar → Publicar na Web**
2. Selecione a aba **Produtos** e o formato **Valores separados por vírgula (.csv)**
3. Clique em **Publicar** e confirme

### Passo 3 — Pegar o ID da planilha

Na URL da planilha:
```
https://docs.google.com/spreadsheets/d/ESTE_É_O_ID/edit
```
Copie a parte entre `/d/` e `/edit`.

### Passo 4 — Configurar no site

No arquivo `app.js`, na seção `CONFIG`:

```javascript
sheetsId: 'COLE_SEU_ID_AQUI',
sheetsName: 'Produtos',
useSampleData: false,   // ← mude de true para false
```

### Atualizar produtos depois

Basta editar a planilha no Google Sheets! O site atualiza automaticamente quando recarregado.

**Dicas para a coluna `imagem`:**
- Deixe vazio para usar o emoji da categoria como placeholder
- Coloque `images/nome_do_arquivo.jpeg` para usar uma foto local
- Coloque uma URL completa do Google Drive (veja seção 4 abaixo)

**Coluna `disponivel`:** `TRUE` = aparece no site · `FALSE` = oculto

**Coluna `destaque`:** `TRUE` = aparece com o badge ⭐ Destaque

---

## 3. Configurar o Clube da Brisa (Google Forms)

Se não configurar, o cadastro é enviado automaticamente pelo WhatsApp.

### Criar o formulário

1. Acesse [forms.google.com](https://forms.google.com) e crie um novo formulário
2. Adicione as perguntas:
   - **Nome completo** (resposta curta, obrigatório)
   - **WhatsApp** (resposta curta, obrigatório)
   - **Email** (resposta curta, opcional)
   - **Data de nascimento** (resposta curta, opcional)
3. Em **Respostas → Vincular a uma planilha**, salve automaticamente no Google Sheets

### Pegar os IDs dos campos

1. Abra o formulário no navegador (modo de visualização)
2. Clique com o botão direito → **Inspecionar elemento** (F12)
3. Procure por `entry.` nos inputs do formulário
4. Cada campo tem um `name="entry.XXXXXXXXX"` — copie esses números

### Configurar no site

No arquivo `app.js`, na seção `CONFIG`:

```javascript
formId: 'SEU_FORM_ID_AQUI',
formFields: {
  nome:       'entry.XXXXXXXXX',   // substitua pelos números reais
  whatsapp:   'entry.XXXXXXXXX',
  email:      'entry.XXXXXXXXX',
  nascimento: 'entry.XXXXXXXXX',
},
```

O ID do formulário está na URL:
```
https://docs.google.com/forms/d/ESTE_É_O_ID/viewform
```

---

## 4. Adicionar fotos dos produtos

### Opção A — Foto local (mais simples)

1. Copie a foto para a pasta `images/` dentro do site
2. Na planilha (coluna `imagem`), coloque: `images/nome_da_foto.jpeg`

### Opção B — Google Drive (recomendado para gerenciar de qualquer lugar)

1. Faça upload da foto no Google Drive
2. Clique com o botão direito → **Compartilhar**
3. Mude para **Qualquer pessoa com o link pode visualizar**
4. Copie o link
5. Transforme o link para o formato de imagem direta:
   - **Link original:** `https://drive.google.com/file/d/ARQUIVO_ID/view`
   - **Link da imagem:** `https://lh3.googleusercontent.com/d/ARQUIVO_ID`
6. Cole esse link transformado na coluna `imagem` da planilha

---

## 5. Colocar o site no ar — GitHub Pages (gratuito)

1. Crie uma conta em [github.com](https://github.com)
2. Clique em **New repository** → nome: `brisaria-site`
3. Marque como **Public**
4. Clique em **uploading an existing file**
5. Arraste todos os arquivos da pasta `SITE/` para a tela (incluindo a pasta `images/`)
6. Clique em **Commit changes**
7. Vá em **Settings → Pages**
8. Em *Source*, selecione: **Deploy from a branch** → `main` → `/ (root)`
9. Clique em **Save**

Após alguns minutos o site estará disponível em:
```
https://SEU_USUARIO.github.io/brisaria-site/
```

---

## 6. Testar localmente (antes de publicar)

Para testar no computador sem precisar de internet:

1. Instale a extensão **Live Server** no VS Code, ou
2. Use o Python (se instalado): abra o terminal na pasta `SITE/` e rode:
   ```
   python -m http.server 8000
   ```
   Acesse: `http://localhost:8000`

> ⚠️ Não abra o `index.html` direto no navegador (com duplo clique) —
> o Google Sheets não vai carregar por restrições de segurança do browser.
> Sempre use um servidor local ou publique no GitHub Pages.
