const initializeMobileMenu = (header) => {
  const toggle = header.querySelector("[data-mobile-menu-toggle]");
  const panel = header.querySelector("[data-mobile-menu]");
  const linksContainer = header.querySelector("[data-mobile-menu-links]");

  if (!toggle || !panel || !linksContainer) {
    return;
  }

  if (header.dataset.mobileLinksBuilt !== "true") {
    const navSources = header.querySelectorAll(
      '[data-nav="content-links"], [data-nav="return-home"], [data-nav="utility-links"]'
    );
    const seenLinks = new Set();

    linksContainer.innerHTML = "";

    navSources.forEach((nav) => {
      nav.querySelectorAll("a").forEach((link) => {
        const href = link.getAttribute("href") || "#";
        const label = link.textContent.trim();
        const dedupeKey = `${href}|${label}`;

        if (seenLinks.has(dedupeKey)) {
          return;
        }
        seenLinks.add(dedupeKey);

        const mobileLink = document.createElement("a");
        mobileLink.href = href;
        mobileLink.className = "mobile-menu__link";
        mobileLink.innerHTML = link.innerHTML;
        linksContainer.appendChild(mobileLink);
      });
    });

    header.dataset.mobileLinksBuilt = "true";
  }

  const setOpenState = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    panel.setAttribute("aria-hidden", String(!isOpen));
    panel.classList.toggle("is-open", isOpen);
    panel.style.maxHeight = isOpen ? `${panel.scrollHeight}px` : "0px";
  };

  setOpenState(false);

  if (header.dataset.mobileMenuBound === "true") {
    return;
  }

  toggle.addEventListener("click", () => {
    const currentlyOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpenState(!currentlyOpen);
  });

  linksContainer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpenState(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      setOpenState(false);
    }
  });

  header.dataset.mobileMenuBound = "true";
};

const updateHeaderNavigation = () => {
  const headerHosts = document.querySelectorAll("[data-header-variant]");

  headerHosts.forEach((host) => {
    const variant = host.dataset.headerVariant || "home";
    const isContact = variant === "contact";
    const header = host.querySelector("header");

    if (!header) {
      return;
    }

    const contentNav = header.querySelector('[data-nav="content-links"]');
    const returnHomeNav = header.querySelector('[data-nav="return-home"]');

    if (isContact) {
      contentNav?.remove();
      returnHomeNav?.classList.remove("hidden");
    } else {
      returnHomeNav?.remove();
      contentNav?.classList.remove("hidden");
    }

    initializeMobileMenu(header);
  });
};

const initializeHeaderNavigation = () => {
  updateHeaderNavigation();
  window.setTimeout(updateHeaderNavigation, 0);
};

document.addEventListener("includes:loaded", updateHeaderNavigation);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeHeaderNavigation);
} else {
  initializeHeaderNavigation();
}
