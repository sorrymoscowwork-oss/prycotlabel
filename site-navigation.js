(function () {
  'use strict';

  const navItems = [
    { label: 'ACCOUNT', href: '/account.html' },
    { label: 'ABOUT PRYCOT.', href: '/about.html' },
    {
      label: 'RELEASE',
      children: [
        ['RELEASE TERMS', '/terms.html'],
        ['HOW TO RELEASE', '/how-to-release.html'],
        ['TELEGRAM BOT GUIDE', '/telegram-bot.html']
      ]
    },
    { label: 'PRICES', href: '/prices.html' },
    { label: 'LABEL SERVICES', href: '/label-services.html' },
    { label: 'CONTACT', href: '/contact.html' },
    { label: 'BLOG', href: '/blog.html' },
    { label: 'SIDE PROJECTS', href: '/side-projects.html' },
    {
      label: 'DOCUMENTS',
      children: [
        ['WHITE PAPER', '/white-paper.html'],
        ['USER AGREEMENT', '/user-agreement.html']
      ]
    }
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
      'nav.site-global-nav { position: fixed !important; top: 0 !important; left: clamp(270px, 20vw, 288px) !important; right: 24px !important; z-index: 10000 !important; display: flex !important; flex-flow: row nowrap !important; align-items: center !important; justify-content: flex-start !important; gap: clamp(10px, 1.1vw, 16px) !important; height: 84px !important; margin: 0 !important; padding: 0 !important; border: 0 !important; background: transparent !important; overflow: visible !important; white-space: nowrap !important; }',
      'nav.site-global-nav > a, nav.site-global-nav .site-nav-dropdown-trigger { display: inline-flex !important; flex: 0 0 auto !important; align-items: center !important; justify-content: center !important; gap: 5px !important; margin: 0 !important; padding: 8px 0 !important; border: 0 !important; border-radius: 0 !important; background: transparent !important; color: #f4f4f2 !important; font: 500 clamp(7px, .58vw, 8.5px)/1 Helvetica, Arial, sans-serif !important; letter-spacing: .035em !important; text-align: center !important; text-decoration: none !important; text-transform: uppercase !important; white-space: nowrap !important; cursor: pointer !important; transition: color .2s ease, opacity .2s ease !important; }',
      'nav.site-global-nav > a:hover, nav.site-global-nav .site-nav-dropdown-trigger:hover, nav.site-global-nav .site-nav-dropdown-trigger:focus-visible { color: #FF7F50 !important; text-decoration: none !important; outline: none; }',
      'nav.site-global-nav .site-nav-dropdown { position: relative !important; display: inline-flex !important; flex: 0 0 auto !important; align-items: center !important; height: 84px !important; }',
      'nav.site-global-nav .site-nav-chevron { display: inline-block !important; width: 5px !important; height: 5px !important; border-right: 1px solid currentColor !important; border-bottom: 1px solid currentColor !important; transform: rotate(45deg) translateY(-2px) !important; transition: transform .18s ease !important; }',
      'nav.site-global-nav .site-nav-dropdown.is-open .site-nav-chevron { transform: rotate(225deg) translate(-1px, -1px) !important; }',
      'nav.site-global-nav .site-nav-dropdown-menu { position: absolute !important; top: 61px !important; left: -14px !important; z-index: 10002 !important; display: none !important; flex-direction: column !important; align-items: stretch !important; gap: 0 !important; min-width: 174px !important; margin: 0 !important; padding: 8px 0 !important; border: 1px solid #292929 !important; background: #0a0a0a !important; box-shadow: 0 12px 28px rgba(0,0,0,.35) !important; white-space: nowrap !important; }',
      'nav.site-global-nav .site-nav-dropdown.is-open .site-nav-dropdown-menu, nav.site-global-nav .site-nav-dropdown:hover .site-nav-dropdown-menu, nav.site-global-nav .site-nav-dropdown:focus-within .site-nav-dropdown-menu { display: flex !important; }',
      'nav.site-global-nav .site-nav-dropdown-menu a { display: block !important; margin: 0 !important; padding: 11px 14px !important; border: 0 !important; background: transparent !important; color: #f4f4f2 !important; font: 500 8px/1.35 Helvetica, Arial, sans-serif !important; letter-spacing: .035em !important; text-align: left !important; text-decoration: none !important; text-transform: uppercase !important; }',
      'nav.site-global-nav .site-nav-dropdown-menu a:hover, nav.site-global-nav .site-nav-dropdown-menu a:focus-visible { color: #FF7F50 !important; background: #151515 !important; outline: none; }',
      'body:not(.site-home) .page-label, body:not(.site-home) .account-label { display: none !important; }',
      'body.site-home .brand { position: fixed !important; top: 30px !important; left: 34px !important; z-index: 10001 !important; opacity: 1; filter: blur(0); transform: translateY(0); transition: opacity 1.05s ease, filter 1.05s ease, transform 1.05s ease !important; pointer-events: auto; }',
      'body.site-home.site-logo-scrolled .brand { opacity: 0 !important; filter: blur(14px) !important; transform: translateY(-7px) !important; pointer-events: none !important; }',
      'body .menu-button { display: none !important; }',
      'body .menu { display: none !important; visibility: hidden !important; pointer-events: none !important; }',
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

  function addDropdown(item) {
    const wrapper = document.createElement('div');
    wrapper.className = 'site-nav-dropdown';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'site-nav-dropdown-trigger';
    trigger.textContent = item.label;
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    const chevron = document.createElement('span');
    chevron.className = 'site-nav-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    trigger.appendChild(chevron);

    const menu = document.createElement('div');
    menu.className = 'site-nav-dropdown-menu';
    menu.setAttribute('role', 'group');
    menu.setAttribute('aria-label', item.label);

    item.children.forEach(function (child) {
      const link = document.createElement('a');
      link.href = child[1];
      link.textContent = child[0];
      menu.appendChild(link);
    });

    trigger.addEventListener('click', function (event) {
      event.stopPropagation();
      const opening = !wrapper.classList.contains('is-open');
      nav.querySelectorAll('.site-nav-dropdown.is-open').forEach(function (openMenu) {
        openMenu.classList.remove('is-open');
        const openTrigger = openMenu.querySelector('.site-nav-dropdown-trigger');
        if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
      });
      if (opening) {
        wrapper.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);
    nav.appendChild(wrapper);
  }

  navItems.forEach(function (item) {
    if (item.children) {
      addDropdown(item);
      return;
    }
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    nav.appendChild(link);
  });

  document.addEventListener('click', function (event) {
    if (nav.contains(event.target)) return;
    nav.querySelectorAll('.site-nav-dropdown.is-open').forEach(function (wrapper) {
      wrapper.classList.remove('is-open');
      const trigger = wrapper.querySelector('.site-nav-dropdown-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      nav.querySelectorAll('.site-nav-dropdown.is-open').forEach(function (wrapper) {
        wrapper.classList.remove('is-open');
        const trigger = wrapper.querySelector('.site-nav-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });

  function updateHomeLogo() {
    if (!isHome || window.innerWidth < 1000) {
      document.body.classList.remove('site-logo-scrolled');
      return;
    }
    document.body.classList.toggle('site-logo-scrolled', window.scrollY > 80);
  }

  function updatePageLabels() {
    document.querySelectorAll('.page-label, .account-label').forEach(function (label) {
      if (!isHome && window.innerWidth >= 1000) {
        label.style.setProperty('display', 'none', 'important');
      } else {
        label.style.removeProperty('display');
      }
    });
  }

  window.addEventListener('scroll', updateHomeLogo, { passive: true });
  window.addEventListener('resize', function () {
    updateHomeLogo();
    updatePageLabels();
  });
  updateHomeLogo();
  updatePageLabels();
})();