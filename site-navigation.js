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
      'html { scrollbar-gutter: stable; }',
      '.site-mobile-menu { display: none !important; }',
      'body:not(.site-home) .platform-footer { display: none !important; visibility: hidden !important; height: 0 !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; }',
      'body:not(.site-home) footer, body:not(.site-home) .site-footer { box-sizing: border-box !important; display: flex !important; flex-direction: row !important; flex-wrap: nowrap !important; align-items: center !important; justify-content: center !important; gap: clamp(8px, 1.5vw, 18px) !important; width: 100% !important; max-width: none !important; margin: 48px auto 0 !important; padding: 18px 12px 20px !important; border-top: 1px solid #292929 !important; text-align: center !important; white-space: nowrap !important; color: #9b9b98 !important; font: 400 9px/1.4 Helvetica, Arial, sans-serif !important; letter-spacing: .10em !important; text-transform: uppercase !important; }',
      'body:not(.site-home) footer > span, body:not(.site-home) .site-footer > span { display: inline-block !important; flex: 0 0 auto !important; margin: 0 !important; padding: 0 !important; color: inherit !important; font: inherit !important; letter-spacing: inherit !important; white-space: nowrap !important; }',
      'body:not(.site-home) footer > :nth-child(n+3), body:not(.site-home) .site-footer > :nth-child(n+3) { display: none !important; }',
      '@media (max-width: 700px) { body:not(.site-home) footer, body:not(.site-home) .site-footer { gap: 8px !important; margin-top: 36px !important; padding: 16px 8px 20px !important; font-size: 7px !important; letter-spacing: .035em !important; } }',
      '@media (max-width: 999px) {',
      'body .menu-button { position: fixed !important; top: 22px !important; right: 20px !important; z-index: 10003 !important; display: block !important; visibility: visible !important; opacity: 1 !important; width: 30px !important; height: 30px !important; padding: 0 !important; margin: 0 !important; border: 0 !important; background: transparent !important; cursor: pointer !important; }',
      'body .menu-button span, body .menu-button span::before, body .menu-button span::after { width: 25px !important; left: 2px !important; transition: transform .24s ease, top .24s ease, opacity .18s ease !important; }',
      'body.site-mobile-menu-open .menu-button span { display: none !important; }',
      'body.site-mobile-menu-open .menu-button::before { content: "×" !important; position: absolute !important; inset: 0 !important; display: block !important; color: #f4f4f2 !important; font: 300 30px/28px Helvetica, Arial, sans-serif !important; text-align: center !important; }',
      'body .menu, body .menu.open { display: none !important; visibility: hidden !important; pointer-events: none !important; }',
      '.site-mobile-menu { position: fixed !important; top: 0 !important; right: 0 !important; bottom: 0 !important; left: auto !important; z-index: 10000 !important; display: none !important; flex-direction: column !important; width: min(82vw, 390px) !important; max-width: 50vw !important; box-sizing: border-box !important; overflow-x: hidden !important; overflow-y: auto !important; overscroll-behavior: contain !important; padding: 112px 22px 34px !important; border-left: 1px solid #292929 !important; background: #0a0a0a !important; color: #f4f4f2 !important; opacity: 0 !important; transform: translateX(16px) !important; transition: opacity .24s ease, transform .24s ease !important; -webkit-overflow-scrolling: touch !important; }',
      'body.site-mobile-menu-open::before { content: "" !important; position: fixed !important; inset: 0 !important; z-index: 9998 !important; background: rgba(0,0,0,.30) !important; -webkit-backdrop-filter: blur(4px) !important; backdrop-filter: blur(4px) !important; }',
      'body.site-mobile-menu-open .site-mobile-menu { display: flex !important; opacity: 1 !important; transform: translateX(0) !important; }',
      '.site-mobile-menu a { color: #f4f4f2 !important; text-decoration: none !important; text-transform: uppercase !important; font-family: Helvetica, Arial, sans-serif !important; }',
      '.site-mobile-menu .mobile-nav-link { display: flex !important; align-items: center !important; justify-content: space-between !important; min-height: 49px !important; padding: 12px 0 !important; border-bottom: 1px solid #292929 !important; font-size: 15px !important; line-height: 1.15 !important; letter-spacing: .015em !important; font-weight: 500 !important; }',
      '.site-mobile-menu .mobile-nav-link:active, .site-mobile-menu .mobile-nav-sub-link:active { color: #B8B8B8 !important; }',
      '.site-mobile-menu .mobile-nav-group { border-bottom: 1px solid #292929 !important; }',
      '.site-mobile-menu .mobile-nav-group > button { display: flex !important; align-items: center !important; justify-content: space-between !important; width: 100% !important; min-height: 49px !important; padding: 12px 0 !important; border: 0 !important; border-radius: 0 !important; background: transparent !important; color: #f4f4f2 !important; font: 500 15px/1.15 Helvetica, Arial, sans-serif !important; letter-spacing: .015em !important; text-align: left !important; text-transform: uppercase !important; cursor: pointer !important; }',
      '.site-mobile-menu .mobile-nav-group > button > span.mobile-nav-label { display: block !important; flex: 1 1 auto !important; min-width: 0 !important; width: auto !important; height: auto !important; margin: 0 !important; border: 0 !important; transform: none !important; text-align: left !important; }',
      '.site-mobile-menu .mobile-nav-group > button > span:not(.mobile-nav-label) { display: inline-block !important; flex: 0 0 7px !important; width: 7px !important; height: 7px !important; margin-right: 3px !important; border-right: 1px solid currentColor !important; border-bottom: 1px solid currentColor !important; transform: rotate(45deg) translateY(-2px) !important; transition: transform .2s ease !important; }',
      '.site-mobile-menu .mobile-nav-group.is-open > button > span:not(.mobile-nav-label) { transform: rotate(225deg) !important; }',
      '.site-mobile-menu .mobile-nav-submenu { display: none !important; flex-direction: column !important; padding: 0 0 10px 13px !important; }',
      '.site-mobile-menu .mobile-nav-group.is-open .mobile-nav-submenu { display: flex !important; }',
      '.site-mobile-menu .mobile-nav-sub-link { display: block !important; padding: 10px 0 !important; color: #a7a7a4 !important; font-size: 12px !important; line-height: 1.3 !important; letter-spacing: .04em !important; }',
      '.site-mobile-menu .mobile-nav-sub-link:hover { color: #B8B8B8 !important; }',
      'body:not(.site-home) .site-mobile-menu .mobile-nav-group { display: block !important; width: 100% !important; margin: 0 !important; padding: 0 !important; border: 0 !important; border-bottom: 1px solid #292929 !important; box-sizing: border-box !important; }',
            'body:not(.site-home) .site-mobile-menu .mobile-nav-group > button { position: relative !important; display: flex !important; flex-direction: row !important; flex-wrap: nowrap !important; align-items: center !important; justify-content: space-between !important; gap: 12px !important; width: 100% !important; min-width: 0 !important; min-height: 49px !important; height: auto !important; margin: 0 !important; padding: 12px 0 !important; border: 0 !important; border-radius: 0 !important; background: transparent !important; box-shadow: none !important; transform: none !important; color: #f4f4f2 !important; font: 500 15px/1.15 Helvetica, Arial, sans-serif !important; letter-spacing: .015em !important; text-align: left !important; text-indent: 0 !important; text-transform: uppercase !important; white-space: normal !important; }',
            'body:not(.site-home) .site-mobile-menu .mobile-nav-group > button > span.mobile-nav-label { display: block !important; flex: 1 1 auto !important; min-width: 0 !important; width: auto !important; height: auto !important; margin: 0 !important; padding: 0 !important; border: 0 !important; background: transparent !important; box-shadow: none !important; transform: none !important; text-align: left !important; letter-spacing: .015em !important; font: inherit !important; }',
            'body:not(.site-home) .site-mobile-menu .mobile-nav-group > button > span:not(.mobile-nav-label) { position: static !important; display: inline-block !important; flex: 0 0 7px !important; width: 7px !important; min-width: 7px !important; height: 7px !important; margin: 0 3px 0 0 !important; padding: 0 !important; border: 0 !important; border-right: 1px solid currentColor !important; border-bottom: 1px solid currentColor !important; border-radius: 0 !important; background: transparent !important; box-shadow: none !important; transform: rotate(45deg) translateY(-2px) !important; }',
            'body:not(.site-home) .site-mobile-menu .mobile-nav-group.is-open > button > span:not(.mobile-nav-label) { transform: rotate(225deg) translate(-1px, -1px) !important; }',
            'body:not(.site-home) .site-mobile-menu .mobile-nav-submenu { display: none !important; flex-direction: column !important; align-items: stretch !important; gap: 0 !important; width: 100% !important; margin: 0 !important; padding: 0 0 10px 13px !important; border: 0 !important; box-sizing: border-box !important; }',
            'body:not(.site-home) .site-mobile-menu .mobile-nav-group.is-open .mobile-nav-submenu { display: flex !important; }',
            'body:not(.site-home) .site-mobile-menu .mobile-nav-sub-link { display: block !important; width: 100% !important; margin: 0 !important; padding: 10px 0 !important; border: 0 !important; background: transparent !important; color: #a7a7a4 !important; font: 400 12px/1.3 Helvetica, Arial, sans-serif !important; letter-spacing: .04em !important; text-align: left !important; text-decoration: none !important; text-transform: uppercase !important; white-space: normal !important; }',
      '.site-mobile-menu .mobile-nav-footer { margin-top: 20px !important; padding-top: 14px !important; border-top: 1px solid #292929 !important; }',
      '.site-mobile-menu .mobile-nav-kicker { margin: 0 0 8px !important; color: #777777 !important; font: 500 9px/1.2 Helvetica, Arial, sans-serif !important; letter-spacing: .13em !important; text-transform: uppercase !important; }',
      'body.site-mobile-menu-open { overflow: hidden !important; }',
      'body.site-mobile-menu-open > :not(.site-mobile-menu):not(.menu-button) { filter: blur(2px) !important; transition: filter .24s ease !important; }',
      'body.site-mobile-menu-open .brand, body.site-mobile-menu-open .header-brand, body.site-mobile-menu-open .tagline { z-index: 10002 !important; opacity: 1 !important; filter: blur(0) !important; transform: none !important; }',
      'body.site-mobile-menu-open .page.mobile-brand-hidden .brand, body.site-mobile-menu-open .page.mobile-brand-hidden .tagline { opacity: 1 !important; filter: blur(0) !important; transform: none !important; }',
      '}',
      'nav.site-global-nav { display: none; }',
      '@media (min-width: 701px) {',
      'nav.site-global-nav { position: fixed !important; top: 30px !important; left: 50vw !important; right: auto !important; width: max-content !important; max-width: calc(100vw - 40px) !important; transform: translateX(-50%) translateY(0) !important; z-index: 10000 !important; display: flex !important; flex-flow: row nowrap !important; align-items: center !important; justify-content: center !important; gap: clamp(5px, .55vw, 9px) !important; height: 46px !important; margin: 0 !important; padding: 0 !important; border: 0 !important; background: transparent !important; overflow: visible !important; white-space: nowrap !important; opacity: 1; filter: blur(0); pointer-events: auto; transition: opacity 1.05s ease, filter 1.05s ease, transform 1.05s ease !important; }',
      'body.site-logo-scrolled nav.site-global-nav { opacity: 0 !important; filter: blur(14px) !important; transform: translateX(-50%) translateY(-7px) !important; pointer-events: none !important; }',
      'nav.site-global-nav > a, nav.site-global-nav .site-nav-dropdown-trigger { display: inline-flex !important; flex: 0 1 auto !important; align-items: center !important; justify-content: center !important; gap: 7px !important; margin: 0 !important; padding: 12px 0 !important; border: 0 !important; border-radius: 0 !important; background: transparent !important; color: #f4f4f2 !important; font: 500 clamp(10px, .78vw, 15px)/1 Helvetica, Arial, sans-serif !important; letter-spacing: .035em !important; text-align: center !important; text-decoration: none !important; text-transform: uppercase !important; white-space: nowrap !important; cursor: pointer !important; transition: color .2s ease, opacity .2s ease !important; }',

      'body:not(.site-home) nav.site-global-nav .site-nav-dropdown-trigger { font: 500 clamp(10px, .78vw, 15px)/1 Helvetica, Arial, sans-serif !important; letter-spacing: .035em !important; line-height: 1 !important; padding: 12px 0 !important; min-height: 0 !important; height: auto !important; border: 0 !important; border-radius: 0 !important; background: transparent !important; text-transform: uppercase !important; box-shadow: none !important; }',
      'nav.site-global-nav > a:hover, nav.site-global-nav .site-nav-dropdown-trigger:hover, nav.site-global-nav .site-nav-dropdown-trigger:focus-visible { color: #B8B8B8 !important; text-decoration: none !important; outline: none; }',
      'nav.site-global-nav .site-nav-dropdown { position: relative !important; display: inline-flex !important; flex: 0 0 auto !important; align-items: center !important; height: 84px !important; }',
      'nav.site-global-nav .site-nav-chevron { display: inline-block !important; width: 5px !important; height: 5px !important; border-right: 1px solid currentColor !important; border-bottom: 1px solid currentColor !important; transform: rotate(45deg) translateY(-2px) !important; transition: transform .18s ease !important; }',
      'nav.site-global-nav .site-nav-dropdown.is-open .site-nav-chevron { transform: rotate(225deg) translate(-1px, -1px) !important; }',
      'nav.site-global-nav .site-nav-dropdown-menu { position: absolute !important; top: 61px !important; left: -14px !important; z-index: 10002 !important; display: none !important; flex-direction: column !important; align-items: stretch !important; gap: 0 !important; min-width: 174px !important; margin: 0 !important; padding: 8px 0 !important; border: 1px solid #292929 !important; background: #0a0a0a !important; box-shadow: 0 12px 28px rgba(0,0,0,.35) !important; white-space: nowrap !important; }',
      'nav.site-global-nav .site-nav-dropdown.is-open .site-nav-dropdown-menu, nav.site-global-nav .site-nav-dropdown:hover .site-nav-dropdown-menu, nav.site-global-nav .site-nav-dropdown:focus-within .site-nav-dropdown-menu { display: flex !important; }',
      'nav.site-global-nav .site-nav-dropdown-menu a { display: block !important; margin: 0 !important; padding: 12px 14px !important; border: 0 !important; background: transparent !important; color: #f4f4f2 !important; font: 500 clamp(10px, .78vw, 15px)/1 Helvetica, Arial, sans-serif !important; letter-spacing: .035em !important; text-align: left !important; text-decoration: none !important; text-transform: uppercase !important; }',
      'nav.site-global-nav .site-nav-dropdown-menu a:hover, nav.site-global-nav .site-nav-dropdown-menu a:focus-visible { color: #B8B8B8 !important; background: #151515 !important; outline: none; }',
      'body:not(.site-home) .page-label, body:not(.site-home) .account-label { display: none !important; }',
      'body.site-home .brand { position: fixed !important; top: 30px !important; left: 34px !important; z-index: 10001 !important; opacity: 1; filter: blur(0); transform: translateY(0); transition: opacity 1.05s ease, filter 1.05s ease, transform 1.05s ease !important; pointer-events: auto; }',
      'body.site-home.site-logo-scrolled .brand { opacity: 0 !important; filter: blur(14px) !important; transform: translateY(-7px) !important; pointer-events: none !important; }',
      'body .menu-button { display: none !important; }',
      'body .menu, body .menu.open { display: none !important; visibility: hidden !important; pointer-events: none !important; }',
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

  function buildMobileMenu() {
    if (document.querySelector('.site-mobile-menu')) return;

    const panel = document.createElement('nav');
    panel.className = 'site-mobile-menu';
    panel.setAttribute('aria-label', 'Mobile navigation');
    panel.setAttribute('aria-hidden', 'true');

    function addMobileLink(label, href) {
      const link = document.createElement('a');
      link.className = 'mobile-nav-link';
      link.href = href;
      link.textContent = label;
      panel.appendChild(link);
    }

    function addMobileGroup(item) {
      const group = document.createElement('section');
      group.className = 'mobile-nav-group';

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.setAttribute('aria-expanded', 'false');
      const label = document.createElement('span');
      label.className = 'mobile-nav-label';
      label.textContent = item.label;
      trigger.appendChild(label);
      const chevron = document.createElement('span');
      chevron.setAttribute('aria-hidden', 'true');
      trigger.appendChild(chevron);

      const submenu = document.createElement('div');
      submenu.className = 'mobile-nav-submenu';
      item.children.forEach(function (child) {
        const link = document.createElement('a');
        link.className = 'mobile-nav-sub-link';
        link.href = child[1];
        link.textContent = child[0];
        submenu.appendChild(link);
      });

      trigger.addEventListener('click', function () {
        const opening = !group.classList.contains('is-open');
        group.classList.toggle('is-open', opening);
        trigger.setAttribute('aria-expanded', String(opening));
      });

      group.appendChild(trigger);
      group.appendChild(submenu);
      panel.appendChild(group);
    }

    navItems.forEach(function (item) {
      if (item.children) addMobileGroup(item);
      else addMobileLink(item.label, item.href);
    });

    const footer = document.createElement('div');
    footer.className = 'mobile-nav-footer';
    const kicker = document.createElement('p');
    kicker.className = 'mobile-nav-kicker';
    kicker.textContent = 'MORE';
    footer.appendChild(kicker);
    const guide = document.createElement('a');
    guide.className = 'mobile-nav-link';
    guide.href = '/prycotlink-guide.html';
    guide.textContent = 'PRYCOTLINK GUIDE';
    footer.appendChild(guide);
    panel.appendChild(footer);

    document.body.appendChild(panel);
  }

  let mobileMenuButton = null;
  function syncMobileMenuButton() {
    if (window.innerWidth <= 700) {
      if (!mobileMenuButton || !mobileMenuButton.isConnected) {
        mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'menu-button';
        mobileMenuButton.id = 'menuButton';
        mobileMenuButton.type = 'button';
        mobileMenuButton.setAttribute('aria-label', 'Open menu');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.innerHTML = '<span></span>';
        document.body.appendChild(mobileMenuButton);
      }
    } else {
      if (mobileMenuButton && mobileMenuButton.isConnected) mobileMenuButton.remove();
      mobileMenuButton = null;
      document.body.classList.remove('site-mobile-menu-open');
      const panel = document.querySelector('.site-mobile-menu');
      if (panel) panel.setAttribute('aria-hidden', 'true');
    }
  }
  syncMobileMenuButton();
  window.addEventListener('resize', syncMobileMenuButton);
  buildMobileMenu();

  function setMobileMenu(open) {
    document.body.classList.toggle('site-mobile-menu-open', open);
    const panel = document.querySelector('.site-mobile-menu');
    const button = document.querySelector('.menu-button');
    if (panel) panel.setAttribute('aria-hidden', String(!open));
    if (button) {
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }

  window.addEventListener('click', function (event) {
    const button = event.target.closest && event.target.closest('.menu-button');
    if (button && window.innerWidth < 1000) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      setMobileMenu(!document.body.classList.contains('site-mobile-menu-open'));
    }
  }, true);

  document.addEventListener('click', function (event) {
    if (event.target.closest && event.target.closest('.site-mobile-menu a')) {
      setMobileMenu(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && document.body.classList.contains('site-mobile-menu-open')) {
      setMobileMenu(false);
    }
  });

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
    if (window.innerWidth < 1000) {
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