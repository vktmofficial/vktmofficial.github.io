/* ============================================================
   VKTM — NAV & FOOTER INJECTION v2
   VK1 TMO · LONDON
   ============================================================ */

function injectHeader(activePage) {
  const tickerItems = [
    'DROP 001 — COMING SOON',
    'NO RESTOCK — EVER',
    'LONDON',
    'VK1 TMO',
    'LIMITED',
    'ORIGIN',
    'DROP 001 — COMING SOON',
    'NO RESTOCK — EVER',
    'LONDON',
    'VK1 TMO',
    'LIMITED',
    'ORIGIN',
  ];

  const tickerHTML = tickerItems.map(t => `<span>${t}</span>`).join('');

  const links = [
    { href: 'home.html',  label: 'Home' },
    { href: 'shop.html',  label: 'Shop' },
    { href: 'vault.html', label: 'Vault' },
    { href: 'about.html', label: 'About' },
    { href: 'contact.html', label: 'Contact' },
  ];

  const linkHTML = links.map(l => {
    const active = activePage === l.href ? ' class="active"' : '';
    return `<a href="${l.href}"${active}>${l.label}</a>`;
  }).join('');

  const mobileLinkHTML = links.map(l => {
    const active = activePage === l.href ? ' class="active"' : '';
    return `<a href="${l.href}"${active}>${l.label}</a>`;
  }).join('');

  const header = document.createElement('div');
  header.innerHTML = `
    <div class="grain"></div>

    <div class="ticker-wrap">
      <div class="ticker-track">${tickerHTML}</div>
    </div>

    <nav class="site-nav">
      <div class="nav-inner">
        <a href="home.html" class="nav-logo">VKTM</a>
        <div class="nav-links">${linkHTML}</div>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <div class="nav-mobile-menu" id="nav-mobile-menu">
      ${mobileLinkHTML}
    </div>
  `;

  document.body.prepend(...header.childNodes);

  // Hamburger toggle
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

function injectFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-top">
        <div>
          <div class="footer-logo">VKTM</div>
          <div class="footer-tagline">London · Built from nothing</div>
        </div>
        <div>
          <div class="footer-col-title">Navigate</div>
          <div class="footer-col-links">
            <a href="home.html">Home</a>
            <a href="shop.html">Shop</a>
            <a href="vault.html">Vault</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
          </div>
        </div>
        <div>
          <div class="footer-col-title">Orders</div>
          <div class="footer-col-links">
            <a href="track.html">Track Order</a>
            <a href="legal.html#returns">Returns</a>
            <a href="legal.html#shipping">Shipping</a>
            <a href="legal.html">Legal</a>
            <a href="mailto:vktmofficial@gmail.com">Contact Us</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">© 2025 VKTM. All rights reserved.</span>
        <span class="footer-coords">@vktmofficial · vktmofficial@gmail.com</span>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}
