/**
 * cursor.js
 * Cursor customizado animado — apenas em dispositivos com mouse (pointer: fine).
 * O dot segue o ponteiro imediatamente; o ring tem lag suavizado via rAF.
 */

export function initCursor() {
  const dot  = document.getElementById('js-cursor');
  const ring = document.getElementById('js-cursor-ring');

  if (!dot || !ring) return;

  // Não inicializa em touch / dispositivos sem ponteiro preciso
  if (!window.matchMedia('(pointer: fine)').matches) {
    dot.style.display  = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  // Atualiza posição do dot sincronamente com o mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX - 3.5}px`;
    dot.style.top  = `${mouseY - 3.5}px`;
  });

  // Ring com interpolação suave via requestAnimationFrame
  function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = `${ringX - 15}px`;
    ring.style.top  = `${ringY - 15}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expande o ring sobre elementos interativos
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.style.width       = '46px';
      ring.style.height      = '46px';
      ring.style.borderColor = 'rgba(4, 225, 129, 0.7)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width       = '30px';
      ring.style.height      = '30px';
      ring.style.borderColor = 'rgba(4, 225, 129, 0.35)';
    });
  });
}
