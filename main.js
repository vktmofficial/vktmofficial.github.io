/* ============================================================
   VKTM — SHARED JS v2
   VK1 TMO · LONDON
   ============================================================ */

// ---- SCROLL REVEAL ----
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  // Run after DOM is fully built (nav + footer injected)
  requestAnimationFrame(() => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  });
})();
