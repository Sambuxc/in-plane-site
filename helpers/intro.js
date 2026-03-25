/**
 * Intro Animation Controller
 *
 * Sequences the homepage intro animation:
 *   1. Black screen → text scales up from tiny   (0 – 5000ms)
 *   2. Hold for a beat                           (5000 – 5500ms)
 *   3. Overlay fades out, revealing the page     (5500 – 6100ms)
 *
 * Guards:
 *   - Plays on 1st visit, then every 3rd visit (localStorage)
 *   - Respects prefers-reduced-motion
 */
(() => {
  const STORAGE_KEY = "introVisitCount";
  const PLAY_EVERY = 3;
  const overlay = document.getElementById("intro-overlay");

  if (!overlay) return;

  // ── Increment visit count ──
  const count = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10) + 1;
  localStorage.setItem(STORAGE_KEY, String(count));

  // ── Determine if we should play ──
  // Play on first visit (count === 1), then every 3rd visit after that
  const shouldPlay = count === 1 || count % PLAY_EVERY === 0;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced || !shouldPlay) {
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
  }, 6100);
})();
