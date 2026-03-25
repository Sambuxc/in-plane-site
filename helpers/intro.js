/**
 * Intro Animation Controller
 *
 * Sequences the homepage intro animation:
 *   1. Black screen → text scales up             (0 – 5000ms)
 *   2. Text rapidly expands, screen goes white   (5000 – 5400ms)
 *   3. White screen fades out to reveal site     (5400 – 5900ms)
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

  // ── Phase 1: Text scales up ──
  requestAnimationFrame(() => {
    el.classList.add("phase-scale");
  });

  // ── Phase 2: Text expands rapidly, overlay goes white ──
  setTimeout(() => {
    el.classList.remove("phase-scale");
    void el.offsetWidth; // force reflow
    el.classList.add("phase-expand");
    overlay.classList.add("is-white");
  }, 5000);

  // ── Phase 3: Fade out the white screen ──
  setTimeout(() => {
    overlay.classList.add("is-hidden");
  }, 5500);

  // ── Cleanup ──
  setTimeout(() => {
    overlay.remove();
    document.body.style.overflow = "";
  }, 6100);
})();
