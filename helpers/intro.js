/**
 * Intro Animation Controller
 *
 * Sequences the homepage intro animation:
 *   1. Black screen → white dot fades in        (0 – 500ms)
 *   2. Dot morphs & scales into site title text  (500 – 2300ms)
 *   3. Hold for a beat                           (2300 – 2800ms)
 *   4. Overlay fades out, revealing the page     (2800 – 3400ms)
 *
 * Guards:
 *   - Plays once per browser session (sessionStorage)
 *   - Respects prefers-reduced-motion
 */
(() => {
  const STORAGE_KEY = "introPlayed";
  const overlay = document.getElementById("intro-overlay");

  if (!overlay) return;

  // ── Reduced-motion or already played this session → skip ──
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced || sessionStorage.getItem(STORAGE_KEY)) {
    overlay.remove();
    return;
  }

  const el = document.getElementById("intro-element");
  if (!el) {
    overlay.remove();
    return;
  }

  // Prevent page scroll while animation plays
  document.body.style.overflow = "hidden";

  // ── Phase 1: Dot appears ──
  requestAnimationFrame(() => {
    el.classList.add("phase-dot");
  });

  // ── Phase 2: Morph into text ──
  setTimeout(() => {
    el.classList.remove("phase-dot");

    // Force reflow so the new animation triggers cleanly
    void el.offsetWidth;

    el.classList.add("phase-morph");
  }, 550);

  // ── Phase 3: Hold, then fade out overlay ──
  setTimeout(() => {
    overlay.classList.add("is-hidden");
  }, 2800);

  // ── Cleanup after fade-out transition ends ──
  setTimeout(() => {
    overlay.remove();
    document.body.style.overflow = "";
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, 3400);
})();
