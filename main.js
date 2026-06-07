/* ============================================
   VKTM — SHARED JS
   VK1 TMO · LONDON
   ============================================ */

// ---- PASSWORD GATE ----
function checkAuth() {
  if (window.location.pathname.endsWith('index.html') ||
      window.location.pathname === '/' ||
      window.location.pathname === '') return;
  if (!localStorage.getItem('vktm_unlocked')) {
    window.location.href = 'index.html';
  }
}
checkAuth();

// ---- SCROLL REVEAL ----
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

// ---- NOTIFY MODAL ----
function initNotifyModal() {
  const overlay = document.getElementById('notifyModal');
  if (!overlay) return;
  const closeBtn = overlay.querySelector('.modal-close');
  if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
  document.querySelectorAll('[data-notify]').forEach(btn => {
    btn.addEventListener('click', () => overlay.classList.add('open'));
  });

  // Handle form submit
  const form = document.getElementById('notifyForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    try {
      const res = await fetch('https://formspree.io/f/xqeopeve', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        form.style.display = 'none';
        const success = overlay.querySelector('.form-success');
        if (success) success.style.display = 'block';
      } else {
        submitBtn.textContent = 'TRY AGAIN';
        submitBtn.disabled = false;
      }
    } catch {
      submitBtn.textContent = 'TRY AGAIN';
      submitBtn.disabled = false;
    }
  });
}

// ---- ORDER MODAL ----
function initOrderModal() {
  const overlay = document.getElementById('orderModal');
  if (!overlay) return;
  const closeBtn = overlay.querySelector('.modal-close');
  if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

  document.querySelectorAll('[data-order]').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      if (!card) return;
      const name  = card.dataset.name  || '';
      const price = card.dataset.price || '';
      const cat   = card.dataset.cat   || '';
      overlay.querySelector('#orderProductName').textContent  = name;
      overlay.querySelector('#orderProductPrice').textContent = price;
      overlay.querySelector('#orderProductCat').textContent   = cat;
      overlay.querySelector('input[name="product"]').value    = name;
      overlay.querySelector('input[name="price"]').value      = price;
      overlay.classList.add('open');
    });
  });

  const form = document.getElementById('orderForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'PLACING ORDER...';
    btn.disabled = true;
    try {
      const res = await fetch('https://formspree.io/f/xqeopeve', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        form.style.display = 'none';
        const success = overlay.querySelector('.form-success');
        if (success) success.style.display = 'block';
      } else {
        btn.textContent = 'TRY AGAIN';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'TRY AGAIN';
      btn.disabled = false;
    }
  });
}

// ---- ACCORDION ----
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// ---- SHOP CATEGORY TABS ----
function initShopTabs() {
  const tabs = document.querySelectorAll('.shop-tab');
  const cards = document.querySelectorAll('.product-card');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      cards.forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// ---- NEWSLETTER (standalone) ----
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = '...';
      try {
        const res = await fetch('https://formspree.io/f/xqeopeve', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });
        if (res.ok) {
          btn.textContent = 'JOINED';
          form.querySelector('input').value = '';
          btn.style.background = 'var(--brown-warm)';
        } else {
          btn.textContent = 'RETRY';
        }
      } catch {
        btn.textContent = 'RETRY';
      }
    });
  });
}

// ---- INIT ALL ----
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNotifyModal();
  initOrderModal();
  initAccordion();
  initShopTabs();
  initNewsletter();
});
