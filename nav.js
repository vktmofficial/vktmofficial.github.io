/* ============================================================
   VKTM — NAV + FOOTER v3
   ============================================================ */

function injectHeader(active) {
  const msgs = [
    'DROP 001 — COMING SUMMER 2026',
    'NO RESTOCK — EVER',
    'LONDON',
    'VK1 TMO',
    'ORIGIN',
    'LIMITED RUN',
    'DROP 001 — COMING SUMMER 2026',
    'NO RESTOCK — EVER',
    'LONDON',
    'VK1 TMO',
    'ORIGIN',
    'LIMITED RUN',
  ];

  const links = [
    { href: 'home.html',    label: 'Home'    },
    { href: 'shop.html',    label: 'Shop'    },
    { href: 'vault.html',   label: 'Vault'   },
    { href: 'about.html',   label: 'About'   },
    { href: 'contact.html', label: 'Contact' },
  ];

  const linkItems = links.map(l =>
    `<a href="${l.href}"${active === l.href ? ' class="active"' : ''}>${l.label}</a>`
  ).join('');

  const mobItems = links.map(l =>
    `<a href="${l.href}"${active === l.href ? ' class="active"' : ''}>${l.label}</a>`
  ).join('');

  const tickerSpans = msgs.map(m => `<span>${m}</span>`).join('');

  const el = document.createElement('div');
  el.innerHTML = `
    <div class="ticker">
      <div class="ticker-track">${tickerSpans}</div>
    </div>
    <nav class="nav">
      <div class="nav-inner">
        <a href="home.html" class="nav-logo">VKTM</a>
        <div class="nav-links">${linkItems}</div>
        <button class="nav-ham" id="nav-ham" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="nav-mob" id="nav-mob">${mobItems}</div>
  `;

  document.body.prepend(...el.childNodes);

  const ham = document.getElementById('nav-ham');
  const mob = document.getElementById('nav-mob');

  ham.addEventListener('click', () => {
    const open = mob.classList.toggle('open');
    ham.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mob.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mob.classList.remove('open');
      ham.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function injectFooter() {
  const f = document.createElement('footer');
  f.className = 'footer';
  f.innerHTML = `
    <div class="footer-top">
      <div>
        <div class="f-brand">VKTM</div>
        <div class="f-tagline">London · Built from nothing</div>
      </div>
      <div class="f-col">
        <h5>Navigate</h5>
        <a href="home.html">Home</a>
        <a href="shop.html">Shop</a>
        <a href="vault.html">Vault</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="f-col">
        <h5>Orders</h5>
        <a href="track.html">Track Order</a>
        <a href="legal.html#returns">Returns</a>
        <a href="legal.html#shipping">Shipping</a>
        <a href="legal.html">Legal</a>
        <a href="mailto:vktmofficial@gmail.com">Email Us</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 VKTM. All rights reserved.</span>
      <span>@vktmofficial · vktmofficial@gmail.com</span>
    </div>
  `;
  document.body.appendChild(f);
}
