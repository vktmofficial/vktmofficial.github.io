/* ============================================
   VKTM — NAV & FOOTER INJECTION
   VK1 TMO · LONDON
   ============================================ */

function injectHeader(activePage) {
  const pages = [
    { id: 'home',    label: 'HOME',    href: 'home.html'    },
    { id: 'shop',    label: 'SHOP',    href: 'shop.html'    },
    { id: 'vault',   label: 'VAULT',   href: 'vault.html'   },
    { id: 'about',   label: 'ABOUT',   href: 'about.html'   },
    { id: 'contact', label: 'CONTACT', href: 'contact.html' },
  ];

  const tickerContent = [
    'DROP 001 — COMING SOON',
    'VK1 TMO · LONDON',
    'NO RESTOCK. EVER.',
    'THE ENDS BUILT THIS.',
    'VKTM OFFICIAL',
    'DROP 001 — COMING SOON',
    'VK1 TMO · LONDON',
    'NO RESTOCK. EVER.',
    'THE ENDS BUILT THIS.',
    'VKTM OFFICIAL',
  ];

  const navLinks = pages.map(p =>
    `<a href="${p.href}" class="${p.id === activePage ? 'active' : ''}">${p.label}</a>`
  ).join('');

  const mobileLinks = pages.map(p =>
    `<a href="${p.href}" class="${p.id === activePage ? 'active' : ''}">${p.label}</a>`
  ).join('');

  const tickerSpans = tickerContent.map(t => `<span>${t}</span>`).join('');

  const html = `
    <div class="ticker-wrap">
      <div class="ticker-track">
        ${tickerSpans}
      </div>
    </div>
    <nav class="site-nav">
      <div class="nav-inner">
        <a href="home.html" class="nav-logo">VKTM</a>
        <div class="nav-links">
          ${navLinks}
        </div>
        <button class="nav-hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="nav-mobile-menu" id="mobileMenu">
      ${mobileLinks}
    </div>
  `;

  const el = document.getElementById('site-header');
  if (el) el.innerHTML = html;

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }
}

function injectFooter() {
  const year = new Date().getFullYear();
  const html = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div>
            <img src="vktm-mark.svg" style="width:48px;opacity:0.55;display:block;margin-bottom:10px;" alt="VKTM Mark">
            <div class="footer-logo">VKTM</div>
            <div class="footer-tagline">VK1 TMO · LONDON · EST. ${year}</div>
          </div>
          <div>
            <div class="footer-col-title">NAVIGATE</div>
            <div class="footer-col-links">
              <a href="home.html">Home</a>
              <a href="shop.html">Shop</a>
              <a href="vault.html">Drops &amp; Vault</a>
              <a href="about.html">About</a>
              <a href="contact.html">Contact</a>
            </div>
          </div>
          <div>
            <div class="footer-col-title">FOLLOW</div>
            <div class="footer-col-links">
              <a href="https://instagram.com/vktmofficial" target="_blank" rel="noopener">Instagram</a>
              <a href="https://tiktok.com/@vktmofficial" target="_blank" rel="noopener">TikTok</a>
              <a href="https://youtube.com/@vktmofficial" target="_blank" rel="noopener">YouTube</a>
            </div>
            <div style="margin-top:24px">
              <div class="footer-col-title">LEGAL</div>
              <div class="footer-col-links">
                <a href="legal.html">Privacy Policy</a>
                <a href="legal.html#terms">Terms of Service</a>
                <a href="legal.html#returns">Returns &amp; Refunds</a>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span class="footer-copy">&copy; ${year} VKTM. All rights reserved. Registered in England &amp; Wales.</span>
          <span class="footer-coords">51.5074° N · 0.1278° W · VK1 TMO</span>
        </div>
      </div>
    </footer>
  `;
  const el = document.getElementById('site-footer');
  if (el) el.innerHTML = html;
}
