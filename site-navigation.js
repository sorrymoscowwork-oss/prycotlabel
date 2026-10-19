(function () {
  'use strict';

  const navItems = [
    ['HOME', '/'],
    ['ACCOUNT', '/account.html'],
    ['ABOUT PRYCOT.', '/about.html'],
    ['RELEASE TERMS', '/terms.html'],
    ['HOW TO RELEASE', '/how-to-release.html'],
    ['TELEGRAM BOT GUIDE', '/telegram-bot.html'],
    ['PRICES', '/prices.html'],
    ['LABEL SERVICES', '/label-services.html'],
    ['CONTACT', '/contact.html'],
    ['BLOG', '/blog.html'],
    ['SIDE PROJECTS', '/side-projects.html'],
    ['WHITE PAPER', '/white-paper.html'],
    ['USER AGREEMENT', '/user-agreement.html'],
    ['PRYCOTLINK GUIDE', '/prycotlink-guide.html']
  ];

  const isHome = window.location.pathname === '/' ||
    window.location.pathname.endsWith('/index.html');
  document.body.classList.toggle('site-home', isHome);

  if (!document.getElementById('prycot-global-navigation-style')) {
    const style = document.createElement('style');
    style.id = 'prycot-global-navigation-style';
    style.textContent = [
      'nav.site-global-nav { display: none; }',
      '@media (min-width: 1000px) {',
      'nav.site-global-nav { position: fixed !important; top: 0 !important; left: clamp(230px, 20vw, 288px) !important; right: 64px !important; z-index: 10000 !important; display: flex !important; flex-flow: row nowrap !important; align-items: center !important; justify-content: space-between !important; gap: clamp(4px, .65vw, 10px) !important; height: 84px !important; margin: 0 !important; padding: 0 !important; border: 0 !important; background: transparent !important; overflow: visible !important; white-space: nowrap !important; }',
      'nav.site-global-nav a { display: inline-block !important; flex: 0 0 auto !important; margin: 0 !important; padding: 8px 0 !important; border: 0 !important; background: transparent !important; color: #f4f4f2 !important; font: 500 clamp(6.8px, .58vw, 8.5px)/1 Helvetica, Arial, sans-serif !important; letter-spacing: .035em !important; text-align: center !important; text-decoration: none !important; text-transform: uppercase !important; white-space: nowrap !important; transition: color .2s ease, opacity .2s ease !important; }',
      'nav.site-global-nav a:hover { color: #FF7F50 !important; opacity: 1 !important; text-decoration: none !important; }',
      'body.site-home nav.site-global-nav { right: 24px !important; }',
      'body:not(.site-home) .page-label, body:not(.site-home) .account-label { display: none !important; }',
      'body.site-home .brand { position: fixed !important; top: 30px !important; left: 34px !important; z-index: 10001 !important; opacity: 1; filter: blur(0); transform: translateY(0); transition: opacity 1.05s ease, filter 1.05s ease, transform 1.05s ease !important; pointer-events: auto; }',
      'body.site-home.site-logo-scrolled .brand { opacity: 0 !important; filter: blur(14px) !important; transform: translateY(-7px) !important; pointer-events: none !important; }',
      'body.site-home .menu-button { display: none !important; }',
      '}'
    ].join(' ');
    document.head.appendChild(style);
  }

  let nav = document.querySelector('nav.desktop-nav, nav.site-global-nav');
  if (!nav) {
    nav = document.createElement('nav');
    document.body.appendChild(nav);
  }

  nav.className = 'site-global-nav';
  nav.setAttribute('aria-label', 'Main navigation');
  nav.replaceChildren();

  navItems.forEach(function (item) {
    const link = document.createElement('a');
    link.href = item[1];
    link.textContent = item[0];
    nav.appendChild(link);
  });

  function updateHomeLogo() {
    if (!isHome || window.innerWidth < 1000) {
      document.body.classList.remove('site-logo-scrolled');
      return;
    }
    document.body.classList.toggle('site-logo-scrolled', window.scrollY > 80);
  }

  window.addEventListener('scroll', updateHomeLogo, { passive: true });
  window.addEventListener('resize', updateHomeLogo);
  updateHomeLogo();
})();