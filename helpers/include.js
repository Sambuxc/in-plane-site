const includeCache = new Map();

const fetchInclude = async (path) => {
  if (includeCache.has(path)) {
    return includeCache.get(path);
  }

  const response = await fetch(path);
  if (!response.ok) {
    return null;
  }

  const markup = await response.text();
  includeCache.set(path, markup);
  return markup;
};

const includeFragments = async (root = document) => {
  const includeTargets = root.querySelectorAll("[data-include]");

  await Promise.all(
    Array.from(includeTargets).map(async (target) => {
      const path = target.getAttribute("data-include");
      if (!path) {
        return;
      }

      const markup = await fetchInclude(path);
      if (!markup) {
        target.textContent = `Failed to load ${path}`;
        return;
      }

      target.innerHTML = markup;
      await includeFragments(target);
    })
  );
};

const loadIncludes = async () => {
  await includeFragments();
  document.dispatchEvent(new CustomEvent("includes:loaded"));
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadIncludes);
} else {
  loadIncludes();
}
