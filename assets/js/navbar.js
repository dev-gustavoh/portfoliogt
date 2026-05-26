/**
 * navbar.js
 * Gerencia três comportamentos da barra de navegação:
 *  1. Estado "scrolled" ao rolar a página
 *  2. Menu hamburger para mobile
 *  3. Destaque do link ativo conforme seção visível
 *  4. Smooth scroll nos links internos
 */

export function initNavbar() {
  const nav     = document.getElementById('nav');
  const burger  = document.getElementById('nav-burger');
  const navList = document.getElementById('nav-list');

  if (!nav || !burger || !navList) return;

  // --- 1. Estado scrolled ---
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // --- 2. Menu hamburger ---
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    navList.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu ao clicar em qualquer link
  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navList.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // --- 3. Link ativo por seção visível ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach((section) => sectionObserver.observe(section));

  // --- 4. Smooth scroll nos âncoras internos ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
