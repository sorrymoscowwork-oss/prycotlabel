(() => {
  const pages = [
    ["Home", "index.html", "Overview"],
    ["About PRYCOT.", "about.html", "Overview"],
    ["Blog", "blog.html", "Overview"],
    ["Side projects", "side-projects.html", "Overview"],
    ["Contact", "contact.html", "Overview"],
    ["Prices", "prices.html", "Artist services"],
    ["Label services", "label-services.html", "Artist services"],
    ["How to release music", "how-to-release.html", "Artist services"],
    ["Release terms", "terms.html", "Artist services"],
    ["Account", "account.html", "Artist services"],
    ["Dashboard guide", "dashboard-guide.html", "Artist services"],
    ["Telegram bot guide", "telegram-bot.html", "Artist services"],
    ["PRYCOTLINK guide", "prycotlink-guide.html", "PRYCOTLINK"],
    ["Support the project", "donate.html", "PRYCOTLINK"],
    ["White paper", "white-paper.html", "Information"],
    ["User agreement", "user-agreement.html", "Information"],
  ];

  function buildHeader() {
    const sourceLogo = document.querySelector(".page .brand .logo, body > .brand .logo, .prycotlink-header .logo");
    const sourceTitle = document.querySelector(".page-label, .account-label");
    const brand = document.createElement("a");
    brand.className = "v3-brand";
    brand.href = "index.html";
    brand.setAttribute("aria-label", "PRYCOT. — Home");
    const logo = document.createElement("span");
    logo.className = "v3-logo";
    logo.textContent = sourceLogo?.textContent?.trim() || "PRYCOT.";
    brand.append(logo);

    const pageName = sourceTitle?.textContent?.trim() || "";
    if (pageName && !/^home$|^prycot\.?$/i.test(pageName)) {
      const title = document.createElement("span");
      title.className = "v3-title";
      title.textContent = pageName;
      brand.append(title);
    }

    const header = document.createElement("header");
    header.className = "v3-header";
    header.setAttribute("aria-label", "PRYCOT. site navigation");
    header.append(brand);

    const toggle = document.createElement("button");
    toggle.className = "v3-menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "v3-menu");
    toggle.innerHTML = '<span>PAGES</span><span class="v3-menu-symbol" aria-hidden="true">+</span>';
    const pinStyle = (element, values) => Object.entries(values).forEach(([property, value]) => element.style.setProperty(property.replace(/[A-Z]/g, letter => "-" + letter.toLowerCase()), value, "important"));
    pinStyle(toggle, {
      position: "absolute", top: "50%", right: "var(--gutter)", bottom: "auto", left: "auto",
      display: "block", width: "160px", minWidth: "160px", maxWidth: "160px",
      height: "48px", minHeight: "48px", maxHeight: "48px", margin: "0", padding: "0",
      transform: "translateY(-50%)", textAlign: "center", fontSize: "12px", lineHeight: "1",
      fontWeight: "700", letterSpacing: ".08em", whiteSpace: "nowrap"
    });
    const label = toggle.querySelector("span:first-child");
    const symbol = toggle.querySelector(".v3-menu-symbol");
    if (label) pinStyle(label, {
      position: "absolute", top: "50%", left: "50%", right: "auto",
      transform: "translate(-50%,-50%)", whiteSpace: "nowrap"
    });
    if (symbol) pinStyle(symbol, {
      position: "absolute", top: "50%", right: "18px", left: "auto",
      width: "18px", transform: "translateY(-50%)"
    });
    header.append(toggle);

    const overlay = document.createElement("nav");
    overlay.className = "v3-overlay";
    overlay.id = "v3-menu";
    overlay.setAttribute("aria-label", "Site pages");
    overlay.setAttribute("aria-hidden", "true");
    const inner = document.createElement("div");
    inner.className = "v3-overlay-inner";
    const kicker = document.createElement("p");
    kicker.className = "v3-menu-kicker";
    kicker.textContent = "PRYCOT. / Pages";
    inner.append(kicker);
    const groups = ["Overview", "Artist services", "PRYCOTLINK", "Information"];
    for (const groupName of groups) {
      const entries = pages.filter(([, , group]) => group === groupName);
      const section = document.createElement("section");
      section.className = "v3-menu-group";
      const heading = document.createElement("h2");
      heading.textContent = groupName;
      section.append(heading);
      for (const [label, href] of entries) {
        const link = document.createElement("a");
        link.className = "v3-menu-link";
        link.href = href;
        link.textContent = label;
        const currentPage = location.pathname.split("/").filter(Boolean).pop() || "index.html";
        if (currentPage === href) {
          link.classList.add("is-current");
          link.setAttribute("aria-current", "page");
        }
        section.append(link);
      }
      inner.append(section);
    }
    overlay.append(inner);
    document.body.prepend(overlay);
    document.body.prepend(header);
    return { header, overlay, toggle };
  }

  function initializeMenu({ overlay, toggle }) {
    let previousFocus = null;
    const links = () => [...overlay.querySelectorAll("a[href]")];
    const close = () => {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("v3-menu-open");
      previousFocus?.focus?.();
    };
    const open = () => {
      previousFocus = document.activeElement;
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("v3-menu-open");
      requestAnimationFrame(() => links()[0]?.focus());
    };
    toggle.addEventListener("click", () => toggle.getAttribute("aria-expanded") === "true" ? close() : open());
    overlay.addEventListener("click", event => { if (event.target === overlay) close(); });
    overlay.addEventListener("click", event => { if (event.target.closest("a")) close(); });
    document.addEventListener("keydown", event => {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (event.key === "Escape") { event.preventDefault(); close(); return; }
      if (event.key !== "Tab") return;
      const items = links();
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 760 && toggle.getAttribute("aria-expanded") === "true") close(); });
  }

  const header = buildHeader();
  const animatedButtonSelectors = [
    'button:not(.v3-menu-toggle)', 'input[type="submit"]', '.order-button', '.site-button', '.release-cta a',
    '.release-button', '.label-button', '.label-services-cta a', '.download-doc', '.telegram-cta span', '.cta a',
    '.search-button', '.guide-cta a', '.pl-remove-platform', '.pl-auth-prompt a',
    '.pl-live-release .release-wallet-copy', '.pl-live-release .release-donation-trigger',
    '.pl-live-release .release-donation-close', '.pl-live-release .release-qr-wrap'
  ].join(',');
  const buttonMotion = document.createElement('style');
  buttonMotion.id = 'v3-button-motion';
  buttonMotion.textContent = `
    html body :is(${animatedButtonSelectors}) {
      border: 0 !important;
      background-image: var(--button-gradient) !important;
      background-size: 200% 100% !important;
      animation: button-gradient-loop 8s linear infinite !important;
    }
    @media (hover: hover) and (pointer: fine) {
      html body :is(${animatedButtonSelectors}):hover {
        background-color: var(--blue-dark) !important;
        background-image: none !important;
        border: 0 !important;
        color: white !important;
        filter: none !important;
        animation: none !important;
      }
    }
    html body .periods button.active {
      background-color: var(--blue-dark) !important;
      background-image: none !important;
      animation: none !important;
    }
    html body :is(.release-disabled, #submitReleaseButton[aria-disabled="true"]) {
      background-color: #242424 !important;
      background-image: none !important;
      color: #777 !important;
      animation: none !important;
    }
  `;
  document.body.append(buttonMotion);
  document.querySelectorAll('.about-block, .step, .term, .request').forEach(block => {
    const marker = block.matches('.about-block') ? '.about-number' : block.matches('.step') ? '.step-number' : block.matches('.term') ? '.term-number' : '.request-number';
    if (!block.querySelector(`:scope > ${marker}`)) block.classList.add('v3-no-number');
  });
  initializeMenu(header);
  document.documentElement.classList.add("v3-ready");
})();
