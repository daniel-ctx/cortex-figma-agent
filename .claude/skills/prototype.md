# Skill: prototype

Lê um design ou fluxo no Figma e gera um protótipo HTML navegável com Tailwind CSS,
mapeando os componentes conhecidos do Claude System para classes semânticas Cortex.

**Acionar quando:** o usuário pedir "gera o protótipo", "prototipa isso", "exporta para HTML",
"faz o HTML desse fluxo" ou fornecer um link Figma com pedido de protótipo.

---

## Entradas aceitas

- Link de frame único: `https://figma.com/design/:fileKey/...?node-id=X-Y`
- Link de página inteira: `https://figma.com/design/:fileKey/...` (sem node-id)
- File ID + descrição: `"usa o arquivo X, página Login"`

---

## Pipeline obrigatório

### 1. Identificar arquivo e escopo

Extrair `fileKey` e, se presente, `nodeId` do link fornecido.
Identificar a oferta pelo contexto (nome do arquivo, projeto ou fala do usuário).

### 2. Inspecionar o arquivo Figma

```
a. Listar páginas: get_design_context com fileKey (sem nodeId) — ou use_figma para
   figma.root.children.map(p => ({ name: p.name, id: p.id }))
b. Identificar a página alvo
c. Listar os frames raiz da página alvo
d. Confirmar quais frames compõem o fluxo a prototipá-los
```

Se o usuário não especificou quais frames, use todos os frames raiz da página.

### 3. Para cada frame: extrair estrutura

```
get_design_context(fileKey, nodeId=<frame-id>, clientLanguages="html,css", clientFrameworks="tailwindcss")
```

Do resultado, extrair:
- Nome do frame (usado como título da tela no HTML)
- Árvore de nós: tipo, nome, fills, texto, children
- Componentes identificados pelo campo `name` ou `componentProperties`

### 4. Mapear componentes → HTML+Tailwind

Para cada nó na árvore:

**Se o nome ou tipo do nó corresponde a uma entrada em `design-system/html-bridge.json`:**
- Usar o snippet HTML da entrada correspondente
- Substituir placeholders `{label}`, `{placeholder}`, etc. com o conteúdo real do nó
- Aplicar variante correta se `variantProperties` indicar (ex: `Type=Secondary` → `btn-secondary`)

**Se o nó não tem correspondente no bridge:**
- Para textos: `<p class="text-sm font-body text-dark-gray">{texto}</p>` ou heading equivalente
- Para retângulos/frames: `<div class="...">` com dimensões aproximadas em Tailwind
- Para ícones sem mapeamento: `<span class="w-5 h-5 inline-block bg-neutral-300 rounded-sm"></span>`
- Para imagens/ilustrações: `<div class="skeleton w-full h-40 rounded-md"></div>` com comentário `<!-- imagem: {nome-do-nó} -->`

**Fallback visual (screenshot):**
Chamar `get_screenshot` no frame quando a fidelidade estrutural for insuficiente
(ex: componentes complexos sem mapeamento, mapas, gráficos, visualizações).
Usar a imagem como referência para gerar HTML aproximado mais fiel visualmente.

### 5. Compor o HTML final

Gerar um único arquivo `index.html` self-contained:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{oferta} — {descrição} — Protótipo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=REM:wght@400;500;600&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      /* Conteúdo de design-system/cortex-tailwind-config.js (objeto module.exports) */
    }
  </script>
  <style type="text/tailwindcss">
    /* Conteúdo de design-system/cortex-components.css */
  </style>
</head>
<body class="bg-neutral-50">

  <!-- Barra de navegação do protótipo -->
  <div id="proto-nav" class="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between px-4 py-2 bg-primary-500/95 text-white text-xs font-body shadow">
    <span id="proto-label">Tela <span id="proto-current">1</span> de <span id="proto-total">N</span></span>
    <div class="flex items-center gap-3">
      <button id="proto-prev" class="px-2 py-1 rounded bg-white/20 hover:bg-white/30">← Anterior</button>
      <button id="proto-next" class="px-2 py-1 rounded bg-white/20 hover:bg-white/30">Próxima →</button>
    </div>
  </div>

  <!-- Telas do fluxo -->
  <div class="pt-9"> <!-- padding para a nav bar -->

    <section data-screen="1" data-title="{nome-frame-1}" class="screen-container">
      <!-- HTML da tela 1 -->
    </section>

    <section data-screen="2" data-title="{nome-frame-2}" class="screen-container hidden">
      <!-- HTML da tela 2 -->
    </section>

    <!-- ... demais telas ... -->

  </div>

  <script>
    const screens = Array.from(document.querySelectorAll('[data-screen]'));
    let current = 0;
    const label = document.getElementById('proto-current');
    const total = document.getElementById('proto-total');
    total.textContent = screens.length;

    function goTo(index) {
      screens[current].classList.add('hidden');
      current = (index + screens.length) % screens.length;
      screens[current].classList.remove('hidden');
      label.textContent = current + 1;
      // Atualiza título da aba
      const title = screens[current].dataset.title;
      if (title) document.title = title + ' — Protótipo';
      window.scrollTo(0, 0);
    }

    document.getElementById('proto-next').addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });
    document.getElementById('proto-prev').addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });

    // Teclas de atalho
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1);
    });
  </script>
</body>
</html>
```

**Regras do HTML gerado:**
- Cada tela é um `<section data-screen="N" data-title="Nome do Frame">`
- A primeira tela não tem `hidden`; as demais sim
- Todos os textos reais do design devem aparecer no HTML (não placeholders genéricos)
- Usar as classes semânticas de `cortex-components.css` — não utilitárias soltas para componentes catalogados
- Para layout geral (posicionamento de sidebar, header, content) usar utilitárias Tailwind direto (`flex`, `grid`, `w-60`, etc.)

### 6. Salvar o arquivo

Determinar nome e path de saída:

```
Convenção: prototypes/{oferta-kebab}-{descricao-kebab}-{dd-mm-aaaa}/index.html
Exemplo:   prototypes/growth-login-16-04-2026/index.html
```

Criar o diretório e salvar `index.html`.

### 7. Reportar ao usuário

```
✅ Protótipo gerado: prototypes/{pasta}/index.html
   {N} telas · navegação: setas ← → ou botões na barra superior

Para abrir:
   open prototypes/{pasta}/index.html

Para compartilhar:
   Enviar o arquivo index.html diretamente — abre sem servidor.
   Para URL: npx serve prototypes/{pasta}
```

---

## Comportamento esperado para elementos sem mapeamento

| Nó Figma | HTML gerado |
|----------|-------------|
| Texto solto | `<p>` ou `<span>` com classe tipográfica adequada |
| Retângulo com fill sólido | `<div>` com `bg-[hex]` inline ou neutro aproximado |
| Imagem / frame com imagem | `<div class="skeleton ...">` + comentário com nome |
| Mapa (geo) | `<div class="bg-neutral-200 rounded-md flex items-center justify-center h-64 text-neutral-400 text-sm">Mapa</div>` |
| Gráfico / chart | `<div class="bg-neutral-100 rounded-md h-48 flex items-center justify-center text-neutral-400 text-sm">Gráfico</div>` |
| Ícone não mapeado | `<span class="inline-block w-5 h-5 rounded-sm bg-neutral-300" title="{nome}"></span>` |

---

## Atualização do bridge

Ao encontrar um componente Figma não presente em `html-bridge.json` que possa ser catalogado
(componente estrutural reutilizável, não ilustração ou background), adicionar a entrada ao
`design-system/html-bridge.json` após gerar o protótipo, para que sessões futuras o reconheçam.
