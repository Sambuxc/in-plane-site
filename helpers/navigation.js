const updateHeaderNavigation = () => {
  const headerHosts = document.querySelectorAll("[data-header-variant]");

  headerHosts.forEach((host) => {
    const variant = host.dataset.headerVariant || "home";
    const isContact = variant === "contact";

    const contentNav = host.querySelector('[data-nav="content-links"]');
    const returnHomeNav = host.querySelector('[data-nav="return-home"]');

    if (isContact) {
      contentNav?.remove();
      returnHomeNav?.classList.remove("hidden");
      return;
    }

    // default: Index page
    returnHomeNav?.remove();
    contentNav?.classList.remove("hidden");
  });
};

const initializeHeaderNavigation = () => {
  // Includes are async; run now and one tick later as a safe fallback.
  updateHeaderNavigation();
  window.setTimeout(updateHeaderNavigation, 0);
};

document.addEventListener("includes:loaded", updateHeaderNavigation);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeHeaderNavigation);
} else {
  initializeHeaderNavigation();
}
