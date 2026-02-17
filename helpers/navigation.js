const initializeMobileMenu = (header) => {
  const toggle = header.querySelector("[data-mobile-menu-toggle]");
  const drawer = header.querySelector("[data-mobile-drawer]");

  if (!toggle || !drawer) {
    return;
  }

  const setOpenState = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    drawer.setAttribute("aria-hidden", String(!isOpen));
    header.classList.toggle("is-open", isOpen);

    if (window.innerWidth >= 1024) {
      drawer.style.maxHeight = "none";
      return;
    }

    drawer.style.maxHeight = isOpen ? `${drawer.scrollHeight}px` : "0px";
  };

  setOpenState(false);

  if (header.dataset.mobileMenuBound === "true") {
    return;
  }

  toggle.addEventListener("click", () => {
    const currentlyOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpenState(!currentlyOpen);
  });

  drawer.querySelectorAll("a").forEach((link) => {
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
