/* ============================================================
   VKTM — SHARED JS v3
   ============================================================ */

// Scroll reveal
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

  requestAnimationFrame(() => {
    document.querySelectorAll('.rev').forEach(el => io.observe(el));
  });
})();
