/**
 * Intro Animation Controller
 *
 * Sequences the homepage intro animation:
 *   1. Black screen → text scales up from tiny   (0 – 5000ms)
 *   2. Hold for a beat                           (5000 – 5500ms)
 *   3. Overlay fades out, revealing the page     (5500 – 6100ms)
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

  // ── Start text scale-up ──
  requestAnimationFrame(() => {
    el.classList.add("phase-scale");
  });

  // ── Hold, then fade out overlay ──
  setTimeout(() => {
    overlay.classList.add("is-hidden");
  }, 5500);

  // ── Cleanup after fade-out transition ends ──
  setTimeout(() => {
    overlay.remove();
    document.body.style.overflow = "";
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, 6100);
})();
