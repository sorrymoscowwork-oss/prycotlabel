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
  const currentPath = window.location.pathname.toLowerCase();
  const routeFileName = currentPath.split('/').pop();
  const isAccountPage = routeFileName === 'account.html';
  const publicPagePaths = new Set([
    '/', '/index.html', '/404.html', '/about.html', '/blog.html',
    '/blog-prycot-is-not-just-distribution.html',
    '/blog-stolicabolgarii-dorogobuzh-grime.html',
    '/blog-stolicabolgarii-dorogobuzh-grime-ru.html',
    '/contact.html', '/donate.html', '/how-to-release.html',
    '/label-services.html', '/prices.html', '/prycotlink-guide.html',
    '/side-projects.html', '/telegram-bot.html', '/terms.html',
    '/user-agreement.html', '/white-paper.html'
  ]);
  const isPublicPage = publicPagePaths.has(currentPath) || publicPagePaths.has('/' + routeFileName);
  const isDesktopUnifiedHeaderPage = isPublicPage || routeFileName === 'dashboard-guide.html';
  const isPublicReleaseRoute = routeFileName === 'prycotlink.html' ||
    (currentPath !== '/' && !isPublicPage && !routeFileName.endsWith('.html'));
  const isPrivateUtilityPage = ['account.html', 'admin.html', 'prycotlink-analytics.html'].includes(routeFileName);
  if (isPublicReleaseRoute || isPrivateUtilityPage) return;
  document.body.classList.toggle('site-home', isHome);
  document.body.classList.toggle('site-public-header', isPublicPage);
  document.body.classList.toggle('site-desktop-unified-header', isDesktopUnifiedHeaderPage);
  document.body.classList.add('site-mobile-standard-header');
  document.body.classList.toggle('site-account-mobile-home-header', isAccountPage);

  if (!document.getElementById('prycot-global-navigation-style')) {
    const style = document.createElement('style');
    style.id = 'prycot-global-navigation-style';
    style.textContent = [
      'html { scrollbar-gutter: stable; }',
      '.site-mobile-sections { display: none !important; }',
      '@media (max-width: 700px) { body.site-mobile-standard-header nav.site-mobile-sections > button.site-mobile-sections-toggle { box-sizing: border-box !important; display: flex !important; align-items: center !important; justify-content: space-between !important; width: 100% !important; height: 36px !important; min-height: 36px !important; max-height: 36px !important; margin: 0 !important; padding: 0 12px !important; border: 1px solid #353535 !important; border-radius: 999px !important; background: rgba(10,10,10,.96) !important; color: #f4f4f2 !important; font: 500 10px/1 Helvetica, Arial, sans-serif !important; letter-spacing: .10em !important; text-align: left !important; text-transform: uppercase !important; box-shadow: none !important; } }',
      '@media (max-width: 700px) { body .site-mobile-sections { position: fixed !important; top: calc(23.62vw + 14px) !important; left: 20px !important; right: 20px !important; z-index: 10002 !important; display: block !important; width: auto !important; margin: 0 !important; color: #f4f4f2 !important; font-family: Helvetica, Arial, sans-serif !important; } body .site-mobile-sections-toggle { box-sizing: border-box !important; display: flex !important; align-items: center !important; justify-content: space-between !important; width: 100% !important; height: 36px !important; min-height: 36px !important; max-height: 36px !important; margin: 0 !important; padding: 0 12px !important; border: 1px solid #353535 !important; border-radius: 999px !important; background: rgba(10,10,10,.96) !important; color: #f4f4f2 !important; font: 500 10px/1 Helvetica, Arial, sans-serif !important; letter-spacing: .10em !important; text-align: left !important; text-transform: uppercase !important; cursor: pointer !important; } body .site-mobile-sections-toggle-icon { display: block !important; width: 18px !important; margin-left: 12px !important; color: #f4f4f2 !important; font: 400 17px/1 Helvetica, Arial, sans-serif !important; text-align: center !important; } body .site-mobile-sections-panel { display: none !important; grid-template-columns: repeat(2,minmax(0,1fr)) !important; gap: 0 16px !important; max-height: min(58vh,420px) !important; max-height: min(58svh,420px) !important; margin-top: 8px !important; padding: 12px 14px !important; overflow-y: auto !important; overscroll-behavior: contain !important; border: 1px solid #353535 !important; border-radius: 14px !important; background: rgba(10,10,10,.98) !important; box-shadow: 0 12px 28px rgba(0,0,0,.38) !important; } body .site-mobile-sections.is-open .site-mobile-sections-panel { display: grid !important; } body .site-mobile-sections-column { display: flex !important; flex-direction: column !important; align-items: stretch !important; gap: 0 !important; min-width: 0 !important; } body .site-mobile-sections-group { min-width: 0 !important; padding: 8px 0 10px !important; border-bottom: 1px solid #292929 !important; } body .site-mobile-sections-group-title { display: block !important; margin: 0 0 8px !important; color: #777 !important; font: 500 8px/1.2 Helvetica, Arial, sans-serif !important; letter-spacing: .12em !important; text-transform: uppercase !important; } body .site-mobile-sections-panel a { display: block !important; width: 100% !important; min-width: 0 !important; margin: 0 !important; padding: 7px 0 !important; border: 0 !important; background: transparent !important; color: #a7a7a4 !important; font: 500 10px/1.25 Helvetica, Arial, sans-serif !important; letter-spacing: .035em !important; text-align: left !important; text-decoration: none !important; text-transform: uppercase !important; overflow-wrap: anywhere !important; } body .site-mobile-sections-panel a[aria-current=page] { color: #f4f4f2 !important; } body.site-mobile-header-scrolled .site-mobile-sections:not(.is-open) { opacity: 0 !important; pointer-events: none !important; transform: translateY(-8px) !important; } body.site-home.site-public-header .hero { padding-top: calc(11vh + 35px) !important; } }',
      '@media (max-width: 700px) { body.site-public-header:not(.site-home) .tagline { display: none !important; } }',
      '@media (max-width: 700px) { body.site-home.site-public-header .hero { padding-top: clamp(55px, calc(6vh + 15px), 70px) !important; } }',
      '@media (max-width: 700px) { body.site-home.site-public-header .hero { padding-top: 10px !important; } }',
      '@media (max-width: 700px) { body.site-mobile-standard-header .brand, body.site-mobile-standard-header nav.site-mobile-sections { transition: opacity .56s ease, filter .56s ease, transform .56s ease !important; will-change: opacity, filter, transform !important; } body.site-mobile-standard-header.site-mobile-header-scrolled .brand, body.site-mobile-standard-header.site-mobile-header-scrolled nav.site-mobile-sections:not(.is-open) { opacity: 0 !important; filter: blur(14px) !important; transform: translateY(-7px) !important; pointer-events: none !important; } }',
      '@media (max-width: 700px) { body.site-pages-open .page.contact-page { display: block !important; } body.site-pages-open .page.contact-page > .content.contact-minimal { margin: 0 !important; transform: none !important; } }',
      '@media (min-width: 701px) { body.site-home .brand, body.site-home nav.site-mobile-sections { transition: opacity 1.05s ease, filter 1.05s ease, transform 1.05s ease !important; will-change: opacity, filter, transform !important; } body.site-home.site-home-desktop-header-scrolled .brand, body.site-home.site-home-desktop-header-scrolled nav.site-mobile-sections:not(.is-open) { opacity: 0 !important; filter: blur(14px) !important; transform: translateY(-7px) !important; pointer-events: none !important; } }',
      '@media (min-width: 701px) { body.site-home nav.site-global-nav { display: none !important; } body.site-home nav.site-mobile-sections { position: fixed !important; top: calc(21.648vw + 35px) !important; left: 34px !important; right: 34px !important; z-index: 10002 !important; display: block !important; width: auto !important; margin: 0 !important; color: #f4f4f2 !important; font-family: Helvetica, Arial, sans-serif !important; } body.site-home .site-mobile-sections-panel { display: none !important; grid-template-columns: repeat(2,minmax(0,1fr)) !important; gap: 0 32px !important; max-height: min(58vh,520px) !important; max-height: min(58svh,520px) !important; margin-top: 10px !important; padding: 18px 22px !important; overflow-y: auto !important; border: 1px solid #353535 !important; border-radius: 16px !important; background: rgba(10,10,10,.98) !important; box-shadow: 0 14px 32px rgba(0,0,0,.38) !important; } body.site-home nav.site-mobile-sections.is-open .site-mobile-sections-panel { display: grid !important; } body.site-home .site-mobile-sections-column { display: flex !important; flex-direction: column !important; align-items: stretch !important; gap: 0 !important; min-width: 0 !important; } body.site-home .site-mobile-sections-group { min-width: 0 !important; padding: 12px 0 14px !important; border-bottom: 1px solid #292929 !important; } body.site-home .site-mobile-sections-group-title { display: block !important; margin: 0 0 10px !important; color: #777 !important; font: 500 11px/1.2 Helvetica, Arial, sans-serif !important; letter-spacing: .12em !important; text-transform: uppercase !important; } body.site-home .site-mobile-sections-panel a { display: block !important; margin: 0 !important; padding: 10px 0 !important; color: #a7a7a4 !important; font: 500 clamp(12px, .95vw, 15px)/1.25 Helvetica, Arial, sans-serif !important; letter-spacing: .035em !important; text-align: left !important; text-decoration: none !important; text-transform: uppercase !important; } body.site-home .site-mobile-sections-panel a[aria-current=page] { color: #f4f4f2 !important; } }',
      '@media (min-width: 701px) { body.site-mobile-standard-header nav.site-global-nav { display: none !important; } body.site-mobile-standard-header nav.site-mobile-sections { position: fixed !important; top: calc(21.648vw + 35px) !important; left: 34px !important; right: 34px !important; z-index: 10002 !important; display: block !important; width: auto !important; margin: 0 !important; color: #f4f4f2 !important; font-family: Helvetica, Arial, sans-serif !important; } body:not(.site-public-header) nav.site-mobile-sections { top: 110px !important; } body.site-mobile-standard-header .site-mobile-sections-panel { display: none !important; grid-template-columns: repeat(2,minmax(0,1fr)) !important; gap: 0 32px !important; max-height: min(58vh,520px) !important; max-height: min(58svh,520px) !important; margin-top: 10px !important; padding: 18px 22px !important; overflow-y: auto !important; border: 1px solid #353535 !important; border-radius: 16px !important; background: rgba(10,10,10,.98) !important; box-shadow: 0 14px 32px rgba(0,0,0,.38) !important; } body.site-mobile-standard-header nav.site-mobile-sections.is-open .site-mobile-sections-panel { display: grid !important; } body.site-mobile-standard-header .site-mobile-sections-column { display: flex !important; flex-direction: column !important; align-items: stretch !important; gap: 0 !important; min-width: 0 !important; } body.site-mobile-standard-header .site-mobile-sections-group { min-width: 0 !important; padding: 12px 0 14px !important; border-bottom: 1px solid #292929 !important; } body.site-mobile-standard-header .site-mobile-sections-group-title { display: block !important; margin: 0 0 10px !important; color: #777 !important; font: 500 11px/1.2 Helvetica, Arial, sans-serif !important; letter-spacing: .12em !important; text-transform: uppercase !important; } body.site-mobile-standard-header .site-mobile-sections-panel a { display: block !important; width: 100% !important; margin: 0 !important; padding: 10px 0 !important; color: #a7a7a4 !important; font: 500 clamp(12px, .95vw, 15px)/1.25 Helvetica, Arial, sans-serif !important; letter-spacing: .035em !important; text-align: left !important; text-decoration: none !important; text-transform: uppercase !important; } body.site-mobile-standard-header .site-mobile-sections-panel a[aria-current=page] { color: #f4f4f2 !important; } }',
      '@media (max-width: 700px) { body.site-mobile-standard-header nav.site-mobile-sections.is-open { position: absolute !important; } }',
      '@media (min-width: 701px) { body.site-mobile-standard-header nav.site-mobile-sections.is-open { position: absolute !important; } }',
      '@media (min-width: 701px) { body.site-header-scrolled:not(.site-home) nav.site-mobile-sections:not(.is-open), body.site-logo-scrolled nav.site-mobile-sections:not(.is-open) { opacity: 0 !important; filter: blur(14px) !important; transform: translateY(-7px) !important; pointer-events: none !important; } body.site-desktop-header-scrolled:not(.site-public-header) nav.site-mobile-sections:not(.is-open) { opacity: 0 !important; filter: blur(14px) !important; transform: translateY(-7px) !important; pointer-events: none !important; } }',
      '@media (min-width: 701px) { body.site-mobile-standard-header .brand, body.site-mobile-standard-header .header-brand, body.site-mobile-standard-header .release-brand, body.site-mobile-standard-header nav.site-mobile-sections { transition: opacity 1.05s ease, filter 1.05s ease, transform 1.05s ease !important; will-change: opacity, filter, transform !important; } body.site-desktop-header-scrolled:not(.site-public-header) .brand, body.site-desktop-header-scrolled:not(.site-public-header) .header-brand, body.site-desktop-header-scrolled:not(.site-public-header) .release-brand { opacity: 0 !important; filter: blur(14px) !important; transform: translateY(-7px) !important; pointer-events: none !important; } }',
      'body:not(.site-home) .platform-footer { display: none !important; visibility: hidden !important; height: 0 !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; }',
      'body:not(.site-home) footer, body:not(.site-home) .site-footer { box-sizing: border-box !important; display: flex !important; flex-direction: row !important; flex-wrap: nowrap !important; align-items: center !important; justify-content: center !important; gap: clamp(8px, 1.5vw, 18px) !important; width: 100% !important; max-width: none !important; margin: 48px auto 0 !important; padding: 18px 12px 20px !important; border-top: 1px solid #292929 !important; text-align: center !important; white-space: nowrap !important; color: #9b9b98 !important; font: 400 9px/1.4 Helvetica, Arial, sans-serif !important; letter-spacing: .10em !important; text-transform: uppercase !important; }',
      'body:not(.site-home) footer > span, body:not(.site-home) .site-footer > span { display: inline-block !important; flex: 0 0 auto !important; margin: 0 !important; padding: 0 !important; color: inherit !important; font: inherit !important; letter-spacing: inherit !important; white-space: nowrap !important; }',
      'body:not(.site-home) footer > :nth-child(n+3), body:not(.site-home) .site-footer > :nth-child(n+3) { display: none !important; }',
      '@media (max-width: 700px) { body:not(.site-home) footer, body:not(.site-home) .site-footer { gap: 8px !important; margin-top: 36px !important; padding: 16px 8px 20px !important; font-size: 7px !important; letter-spacing: .035em !important; } }',
      '@media (max-width: 999px) {',
      '}',
      'nav.site-global-nav { display: none; }',
      '@media (min-width: 701px) {',
      'nav.site-global-nav { position: fixed !important; top: 30px !important; left: 50vw !important; right: auto !important; width: max-content !important; max-width: calc(100vw - 40px) !important; transform: translateX(-50%) translateY(0) !important; z-index: 10002 !important; display: flex !important; flex-flow: row nowrap !important; align-items: center !important; justify-content: center !important; gap: clamp(5px, .55vw, 9px) !important; height: 46px !important; margin: 0 !important; padding: 0 !important; border: 0 !important; background: transparent !important; overflow: visible !important; white-space: nowrap !important; opacity: 1; filter: blur(0); pointer-events: auto; transition: opacity 1.05s ease, filter 1.05s ease, transform 1.05s ease !important; }',
      'body.site-public-header nav.site-global-nav { top: calc(21.648vw + 35px) !important; left: 34px !important; right: 34px !important; width: auto !important; max-width: none !important; transform: translateY(0) !important; justify-content: space-between !important; gap: 0 !important; }',
      'body.site-public-header.site-header-scrolled:not(.site-home) .brand, body.site-public-header.site-header-scrolled:not(.site-home) nav.site-global-nav { opacity: 0 !important; filter: blur(14px) !important; transform: translateY(-7px) !important; pointer-events: none !important; }',
      'body.site-logo-scrolled nav.site-global-nav { opacity: 0 !important; filter: blur(14px) !important; transform: translateY(-7px) !important; pointer-events: none !important; }',
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
      '}',
      '@media (max-width: 700px) { body.site-mobile-standard-header .brand, body.site-mobile-standard-header .header-brand, body.site-mobile-standard-header .release-brand { position: fixed !important; top: 22px !important; right: auto !important; bottom: auto !important; left: 20px !important; z-index: 10001 !important; display: block !important; width: max-content !important; max-width: none !important; align-items: flex-start !important; overflow: visible !important; } body.site-mobile-standard-header .brand .brand-logo, body.site-mobile-standard-header .header-brand .brand-logo { display: block !important; width: max-content !important; max-width: none !important; text-align: left !important; } body.site-mobile-standard-header .brand .logo, body.site-mobile-standard-header .header-brand .logo, body.site-mobile-standard-header .release-brand .logo { position: static !important; left: auto !important; display: block !important; width: max-content !important; max-width: none !important; margin: 0 !important; line-height: .82 !important; text-align: left !important; white-space: nowrap !important; overflow: visible !important; } body.site-mobile-standard-header .brand .page-label, body.site-mobile-standard-header .brand .account-label { display: none !important; } body.site-mobile-standard-header nav.site-mobile-sections:not(.is-open) { position: fixed !important; top: calc(28.2px + 2.639vw + clamp(40px, 7vw, 140px)) !important; left: 20px !important; right: 20px !important; width: auto !important; } body.site-mobile-standard-header nav.site-mobile-sections.is-open { position: absolute !important; top: calc(28.2px + 2.639vw + clamp(40px, 7vw, 140px)) !important; left: 20px !important; right: 20px !important; width: auto !important; } }',
      '@media (max-width: 700px) { html body.site-mobile-standard-header .brand { top: 22px !important; left: 20px !important; right: auto !important; width: max-content !important; max-width: none !important; } html body.site-mobile-standard-header .brand .logo, html body.site-mobile-standard-header .header-brand .logo, html body.site-mobile-standard-header .release-brand .logo { width: max-content !important; max-width: none !important; font-size: clamp(7.335px, calc(4.8vw - 3.335px), 25.835px) !important; text-align: left !important; } html body.site-mobile-standard-header nav.site-mobile-sections { top: calc(28.2px + 2.639vw + clamp(40px, 7vw, 140px)) !important; left: 20px !important; right: 20px !important; width: auto !important; } }',
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

    function setDropdownOpen(opening) {
      if (opening) {
        nav.querySelectorAll('.site-nav-dropdown.is-open').forEach(function (openMenu) {
          if (openMenu === wrapper) return;
          openMenu.classList.remove('is-open');
          const openTrigger = openMenu.querySelector('.site-nav-dropdown-trigger');
          if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
        });
      }
      wrapper.classList.toggle('is-open', opening);
      trigger.setAttribute('aria-expanded', String(opening));
    }

    wrapper.addEventListener('mouseenter', function () {
      setDropdownOpen(true);
    });
    wrapper.addEventListener('mouseleave', function () {
      setDropdownOpen(false);
    });
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      setDropdownOpen(wrapper.matches(':hover') || !wrapper.classList.contains('is-open'));
    });

    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);
    nav.appendChild(wrapper);
  }

  function buildMobileSections() {
    if (document.querySelector('.site-mobile-sections')) return;
    const sections = document.createElement('nav');
    sections.className = 'site-mobile-sections';
    sections.setAttribute('aria-label', 'Page sections');
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'site-mobile-sections-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span>PAGES</span><span class="site-mobile-sections-toggle-icon" aria-hidden="true">+</span>';
    const toggleIcon = toggle.querySelector('.site-mobile-sections-toggle-icon');
    [['box-sizing','border-box'],['display','flex'],['align-items','center'],['justify-content','space-between'],['width','100%'],['height','36px'],['min-height','36px'],['max-height','36px'],['margin','0'],['padding','0 12px'],['border','1px solid #353535'],['border-radius','999px'],['background','rgba(10,10,10,.96)'],['color','#f4f4f2'],['font','500 10px/1 Helvetica, Arial, sans-serif'],['letter-spacing','.10em'],['text-align','left'],['text-transform','uppercase'],['box-shadow','none'],['cursor','pointer'],['transition','background-color .2s ease, border-color .2s ease, color .2s ease, opacity .56s ease, filter .56s ease, transform .56s ease']].forEach(function (entry) {
      toggle.style.setProperty(entry[0], entry[1], 'important');
    });
    [['display','block'],['width','18px'],['margin-left','12px'],['color','#f4f4f2'],['font','400 17px/1 Helvetica, Arial, sans-serif'],['text-align','center']].forEach(function (entry) {
      toggleIcon.style.setProperty(entry[0], entry[1], 'important');
    });
    function setDesktopHover(highlighted) {
      if (window.innerWidth <= 700) return;
      const active = highlighted || document.activeElement === toggle;
      toggle.style.setProperty('background', active ? '#777777' : 'rgba(10,10,10,.96)', 'important');
      toggle.style.setProperty('border-color', active ? '#777777' : '#353535', 'important');
      toggle.style.setProperty('color', active ? '#0a0a0a' : '#f4f4f2', 'important');
      toggleIcon.style.setProperty('color', active ? '#0a0a0a' : '#f4f4f2', 'important');
    }
    toggle.addEventListener('mouseenter', function () { setDesktopHover(true); });
    toggle.addEventListener('mouseleave', function () { setDesktopHover(false); });
    toggle.addEventListener('focus', function () { setDesktopHover(true); });
    toggle.addEventListener('blur', function () { setDesktopHover(false); });
    const panel = document.createElement('div');
    panel.className = 'site-mobile-sections-panel';
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    const normalizedCurrent = currentPath === '/index.html' ? '/' : currentPath;

    function addLink(group, label, href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      const targetPath = new URL(href, window.location.origin).pathname.replace(/\/+$/, '') || '/';
      const normalizedTarget = targetPath === '/index.html' ? '/' : targetPath;
      if (normalizedCurrent === normalizedTarget || (normalizedCurrent.indexOf('/blog-') === 0 && normalizedTarget === '/blog.html')) {
        link.setAttribute('aria-current', 'page');
      }
      group.appendChild(link);
    }

    const columns = [document.createElement('div'), document.createElement('div')];
    columns.forEach(function (column) {
      column.className = 'site-mobile-sections-column';
      panel.appendChild(column);
    });

    function addGroup(column, title, entries) {
      const group = document.createElement('section');
      group.className = 'site-mobile-sections-group';
      const heading = document.createElement('span');
      heading.className = 'site-mobile-sections-group-title';
      heading.textContent = title;
      group.appendChild(heading);
      entries.forEach(function (entry) { addLink(group, entry.label, entry.href); });
      column.appendChild(group);
    }

    addGroup(columns[0], 'MAIN', [{label:'HOME',href:'/'},{label:'ACCOUNT',href:'/account.html'},{label:'ABOUT PRYCOT.',href:'/about.html'},{label:'PRICES',href:'/prices.html'},{label:'LABEL SERVICES',href:'/label-services.html'},{label:'CONTACT',href:'/contact.html'},{label:'BLOG',href:'/blog.html'},{label:'SIDE PROJECTS',href:'/side-projects.html'},{label:'DONATE',href:'/donate.html'}]);
    addGroup(columns[1], 'RELEASE', [{label:'RELEASE TERMS',href:'/terms.html'},{label:'HOW TO RELEASE',href:'/how-to-release.html'},{label:'TELEGRAM BOT GUIDE',href:'/telegram-bot.html'}]);
    addGroup(columns[1], 'DOCUMENTS', [{label:'WHITE PAPER',href:'/white-paper.html'},{label:'USER AGREEMENT',href:'/user-agreement.html'}]);
    addGroup(columns[1], 'PRYCOTLINK', [{label:'PRYCOTLINK GUIDE',href:'/prycotlink-guide.html'}]);

    const pageRoot = document.querySelector('.page') || document.body;
    const contentTargets = Array.from(pageRoot.querySelectorAll(':scope > .content, :scope > main.content, :scope > .hero, :scope > .pl-intro'));
    if (!contentTargets.length) {
      const firstFlowChild = Array.from(pageRoot.children).find(function (child) {
        return !child.matches('header, .brand, nav, footer, script, style');
      });
      if (firstFlowChild) contentTargets.push(firstFlowChild);
    }
    function reserveCollapsedHeaderSpace() {
      if (isAccountPage || sections.classList.contains('is-open') || window.scrollY > 1) return;
      const firstContent = contentTargets[0];
      if (!firstContent) return;
      const logo = document.querySelector('.brand');
      const logoBottom = logo ? logo.getBoundingClientRect().bottom : 0;
      const headerBottom = Math.max(toggle.getBoundingClientRect().bottom, logoBottom);
      const clearance = Math.max(0, headerBottom + 14 - firstContent.getBoundingClientRect().top);
      if (!clearance) return;
      const currentPadding = parseFloat(getComputedStyle(pageRoot).paddingTop) || 0;
      pageRoot.style.setProperty('padding-top', (currentPadding + clearance) + 'px', 'important');
    }
    let originalPaddingTop = '';
    let originalPaddingPriority = '';
    let originalTranslations = [];
    let pagePaddingWasChanged = false;
    toggle.addEventListener('click', function () {
      const opening = !sections.classList.contains('is-open');
      sections.classList.toggle('is-open', opening);
      document.body.classList.toggle('site-pages-open', opening);
      toggle.setAttribute('aria-expanded', String(opening));
      if (toggleIcon) toggleIcon.textContent = opening ? '−' : '+';
      if (opening) {
        originalPaddingTop = pageRoot.style.getPropertyValue('padding-top');
        originalPaddingPriority = pageRoot.style.getPropertyPriority('padding-top');
        originalTranslations = contentTargets.map(function (content) {
          return [content, content.style.getPropertyValue('translate'), content.style.getPropertyPriority('translate')];
        });
        pagePaddingWasChanged = true;
        requestAnimationFrame(function () {
          const accountTop = isAccountPage ? document.querySelector('#cabinetView:not(.hidden) .account-top') : null;
          if (accountTop) {
            const panelBottom = sections.getBoundingClientRect().bottom;
            const clearance = Math.max(0, panelBottom + 14 - accountTop.getBoundingClientRect().top);
            if (clearance) {
              const currentPadding = parseFloat(getComputedStyle(pageRoot).paddingTop) || 0;
              pageRoot.style.setProperty('padding-top', (currentPadding + clearance) + 'px', 'important');
            }
            return;
          }
          if (window.innerWidth <= 700) {
            const firstContent = contentTargets[0];
            if (!firstContent) return;
            const panelBottom = sections.getBoundingClientRect().bottom;
            const clearance = Math.max(0, panelBottom + 14 - firstContent.getBoundingClientRect().top);
            if (clearance) {
              const currentPadding = parseFloat(getComputedStyle(pageRoot).paddingTop) || 0;
              pageRoot.style.setProperty('padding-top', (currentPadding + clearance) + 'px', 'important');
            }
            return;
          }
          const panelHeight = panel.getBoundingClientRect().height;
          const extra = Math.max(0, panelHeight + 8);
          const currentPadding = parseFloat(getComputedStyle(pageRoot).paddingTop) || 0;
          pageRoot.style.setProperty('padding-top', (currentPadding + extra) + 'px', 'important');
          requestAnimationFrame(function () {
            const panelBottom = sections.getBoundingClientRect().bottom;
            const firstContent = contentTargets[0];
            if (!firstContent) return;
            const baseTranslate = getComputedStyle(firstContent).translate.split(/\s+/).map(parseFloat)[1] || 0;
            const clearance = Math.max(0, panelBottom + 14 - firstContent.getBoundingClientRect().top);
            if (clearance) firstContent.style.setProperty('translate', '0 ' + (baseTranslate + clearance) + 'px', 'important');
          });
        });
      } else if (pagePaddingWasChanged) {
        if (originalPaddingTop) pageRoot.style.setProperty('padding-top', originalPaddingTop, originalPaddingPriority);
        else pageRoot.style.removeProperty('padding-top');
        if (isAccountPage) pageRoot.style.removeProperty('padding-top');
        originalTranslations.forEach(function (state) {
          if (state[1]) state[0].style.setProperty('translate', state[1], state[2]);
          else state[0].style.removeProperty('translate');
        });
        pagePaddingWasChanged = false;
      }
    });
    window.addEventListener('scroll', function () {
      if (isAccountPage && !sections.classList.contains('is-open')) pageRoot.style.removeProperty('padding-top');
    }, { passive: true });
    panel.addEventListener('wheel', function (event) {
      if (window.innerWidth <= 700 || !sections.classList.contains('is-open') || !event.deltaY) return;
      window.scrollBy(0, event.deltaY);
      event.preventDefault();
    }, { passive: false });
    sections.append(toggle, panel);
    document.body.appendChild(sections);
    requestAnimationFrame(reserveCollapsedHeaderSpace);
    window.addEventListener('resize', function () { requestAnimationFrame(reserveCollapsedHeaderSpace); });
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
  buildMobileSections();

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
    document.body.classList.toggle('site-desktop-header-scrolled', window.innerWidth > 700 && window.scrollY > 80);
    document.body.classList.toggle('site-home-desktop-header-scrolled', isHome && window.innerWidth > 700 && window.scrollY > 80);
    if (window.innerWidth <= 700) {
      document.body.classList.toggle('site-mobile-header-scrolled', window.scrollY > 80);
    } else {
      document.body.classList.remove('site-mobile-header-scrolled');
    }
    if (isPublicPage && !isHome) {
      document.body.classList.toggle('site-header-scrolled', window.scrollY > 80);
    }
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

/* PRYCOT site-wide analytics: anonymous unique visits and outbound link clicks. */
(function(){
  const API="https://misty-rain-65f3prycot-release-bot.sorrymoscowwork.workers.dev/site/analytics";
  const path=(location.pathname||"/").split("?")[0].split("#")[0].replace(/\/+$/,"")||"/";
  if(/^\/(admin|account|prycotlink-analytics)(\.html)?$/i.test(path))return;
  if(/^\/[^/]+$/.test(path)&&! /\.html$/i.test(path)&&path!=="/")return;
  let visitorId="";
  try{
    visitorId=localStorage.getItem("prycot_site_visitor_id")||"";
    if(!/^[A-Za-z0-9_-]{16,80}$/.test(visitorId)){
      visitorId=(crypto.randomUUID?crypto.randomUUID():String(Date.now())+"_"+Math.random().toString(36).slice(2)).replace(/[^A-Za-z0-9_-]/g,"");
      localStorage.setItem("prycot_site_visitor_id",visitorId);
    }
  }catch(_){visitorId=(crypto.randomUUID?crypto.randomUUID():String(Date.now())+"_"+Math.random().toString(36).slice(2)).replace(/[^A-Za-z0-9_-]/g,"");}
  const send=(payload)=>fetch(API,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(Object.assign({visitorId,pageKey:path},payload)),keepalive:true}).catch(()=>{});
  send({action:"visit"});
  const streamingHosts=["spotify.","music.apple","music.youtube","youtu.be","youtube.com","deezer.","tidal.","soundcloud.","bandcamp.","yandex.ru/music","yandex.com/music","zvuk.com","music.amazon","music.163.com"];
  const socialHosts=["instagram.","tiktok.","telegram.","t.me","facebook.","x.com","twitter.","threads.","vk.com","discord.gg","wa.me"];
  document.addEventListener("click",function(event){
    const a=event.target&&event.target.closest?event.target.closest("a[href]"):null;
    if(!a)return;
    let u;try{u=new URL(a.href,location.href)}catch(_){return}
    if(u.origin===location.origin)return;
    const host=u.hostname.toLowerCase();
    let category="";
    if(streamingHosts.some(x=>host.includes(x)))category="streaming";
    else if(socialHosts.some(x=>host===x||host.endsWith("."+x))||u.protocol==="mailto:"||u.protocol==="tel:")category="social";
    else return;
    send({action:"click",category,linkKey:u.href,linkLabel:(a.textContent||a.getAttribute("aria-label")||host).trim().slice(0,180)});
  },true);
})();
