# Portfólio — Gustavo Amaral

Portfólio pessoal com design **Neo Brutalist** moderno. Construído com HTML5 semântico, CSS modularizado e JavaScript vanilla organizado em ES Modules — sem frameworks, sem dependências de build.

---

## Sobre o projeto

Single-page application que consome a GitHub REST API para exibir dados dinâmicos com fallback estático. O design segue princípios de tipografia editorial, hierarquia visual rígida e paleta monocromática com accent verde.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Markup | HTML5 semântico |
| Estilos | CSS3 com custom properties (design tokens) |
| Scripts | JavaScript ES2022+ (ES Modules) |
| Tipografia | Google Fonts — Syne, Inter, JetBrains Mono |
| Dados externos | GitHub REST API v3 |

---

## Estrutura de pastas

```
portfolio/
│
├── index.html                 # HTML limpo — sem CSS/JS inline
│
├── assets/
│   ├── css/
│   │   ├── variables.css      # Design tokens (:root) — fonte única de verdade
│   │   ├── main.css           # Reset, base, tipografia e utilitários globais
│   │   ├── components.css     # Todos os componentes (nav, hero, projetos, etc.)
│   │   ├── animations.css     # Keyframes e classes de scroll reveal
│   │   └── responsive.css     # Media queries centralizadas por breakpoint
│   │
│   ├── js/
│   │   ├── main.js            # Bootstrap — importa e inicializa todos os módulos
│   │   ├── cursor.js          # Cursor customizado com lag ring animado
│   │   ├── navbar.js          # Scroll state, menu mobile, link ativo, smooth scroll
│   │   ├── animations.js      # Intersection Observer para scroll reveal
│   │   └── github-api.js      # Fetch da API, renderização e fallback
│   │
│   ├── images/                # Imagens do projeto
│   ├── icons/                 # Ícones customizados
│   └── fonts/                 # Fontes auto-hospedadas (opcional)
│
├── data/
│   ├── projects.json          # Dados dos projetos (fonte de verdade)
│   ├── stack.json             # Categorias e itens da tech stack
│   └── experience.json        # Eventos da timeline de trajetória
│
└── README.md
```

---

## Como executar

O projeto usa ES Modules (`type="module"`), que requerem um servidor HTTP — não funciona via protocolo `file://` diretamente pelo sistema operacional.

**Com Python (sem instalação adicional):**
```bash
python -m http.server 3000
# Acesse: http://localhost:3000
```

**Com Node.js:**
```bash
npx serve .
# Acesse: http://localhost:3000
```

**Com VS Code:**
Instale a extensão **Live Server** e clique em `Go Live` na barra de status.

---

## Deploy

O `index.html` é o único arquivo de entrada. Qualquer plataforma de hosting estático funciona:

**GitHub Pages**
```
Settings → Pages → Deploy from branch → selecione a branch
```

**Vercel**
```bash
npx vercel --prod
```

**Netlify**
Arraste a pasta raiz para o dashboard em netlify.com/drop.

**Cloudflare Pages**
Conecte o repositório GitHub e configure `index.html` como arquivo de saída.

---

## Customização

### Paleta de cores

Todos os tokens estão em `assets/css/variables.css`. Altere aqui e as mudanças propagam para toda a aplicação:

```css
:root {
  --color-accent:      #04E181;  /* verde principal */
  --color-accent-dark: #048C54;  /* hover do accent */
  --color-bg:          #1A1A1A;  /* fundo principal */
  --color-bg-alt:      #111111;  /* fundo alternativo */
  --color-text:        #DDE4DE;  /* texto principal */
  --color-text-muted:  #6C9E89;  /* texto secundário */
}
```

### Projetos

Edite `data/projects.json` para adicionar, remover ou atualizar projetos. A estrutura de cada projeto:

```json
{
  "id": "nome-do-projeto",
  "number": "01",
  "name": "Nome do Projeto",
  "type": "Tipo · Categoria",
  "status": "live",
  "statusLabel": "Em desenvolvimento",
  "description": "Descrição completa...",
  "problem": "Problema que o projeto resolve.",
  "stack": ["Tech 1", "Tech 2"],
  "github": "https://github.com/...",
  "live": null
}
```

### Stack

Edite `data/stack.json` para atualizar as categorias e tecnologias exibidas na seção Stack.

### Trajetória

Edite `data/experience.json` para atualizar os eventos da timeline de evolução técnica.

---

## Arquitetura CSS

O CSS segue uma hierarquia estrita de importação no `index.html`:

```
variables.css  →  Tokens globais (:root)
     ↓
main.css       →  Reset + base + utilitários
     ↓
components.css →  Componentes (consome variáveis)
     ↓
animations.css →  Keyframes + reveal classes
     ↓
responsive.css →  Media queries (sobrescrevem o layout)
```

Nenhum valor hardcoded fora de `variables.css`. Todo componente consome `var(--token)`.

---

## Arquitetura JS

```
main.js
├── import initCursor()     → cursor.js
├── import initNavbar()     → navbar.js
├── import initAnimations() → animations.js
└── import loadGitHub()     → github-api.js
```

Cada módulo é autônomo, exporta uma única função `init*` e não polui o escopo global. O `main.js` apenas orquestra a inicialização no evento `DOMContentLoaded`.

---

## Acessibilidade

- `role` semântico em `<nav>`, `<footer>`, listas e seções
- `aria-label` em todos os elementos interativos
- `aria-hidden="true"` em elementos decorativos (ícones SVG, divisores)
- `aria-expanded` no botão hamburger (atualizado via JS)
- `:focus-visible` com outline verde em todos os elementos focáveis
- Uso de `<article>`, `<blockquote>`, `<dl>`, `<dt>`, `<dd>` onde semanticamente correto

---

## Contato

**Gustavo Amaral** — Desenvolvedor Full Stack · Brasília, DF

- GitHub: [github.com/dev-gustavoh](https://github.com/dev-gustavoh)
- LinkedIn: [linkedin.com/in/gustavohas](https://linkedin.com/in/gustavohas/)
- E-mail: gustavoh.amaral072@gmail.com
