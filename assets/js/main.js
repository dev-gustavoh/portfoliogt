/**
 * main.js
 * Ponto de entrada da aplicação.
 * Importa e inicializa todos os módulos após o DOM estar pronto.
 */

import { initCursor }    from './cursor.js';
import { initNavbar }    from './navbar.js';
import { initAnimations } from './animations.js';
import { loadGitHub }    from './github-api.js';

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavbar();
  initAnimations();
  loadGitHub();
});
