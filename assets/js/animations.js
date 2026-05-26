/**
 * animations.js
 * Controla animações baseadas em scroll usando IntersectionObserver.
 *  - Elementos com classe .r ficam invisíveis até entrar na viewport
 *  - Classe .vis é adicionada para disparar a transição CSS
 *  - Elementos no hero são revelados imediatamente no carregamento
 */

export function initAnimations() {
  const revealElements = document.querySelectorAll('.r');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
          // Desconecta após revelar — sem necessidade de re-observar
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));

  // Revela elementos do hero imediatamente (estão fora da viewport inicialmente)
  setTimeout(() => {
    document.querySelectorAll('#hero .r').forEach((el) => {
      el.classList.add('vis');
      observer.unobserve(el);
    });
  }, 80);
}
