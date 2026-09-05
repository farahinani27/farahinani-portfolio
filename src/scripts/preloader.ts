/**
 * preloader.ts — drives the "Please wait…" loading screen.
 *
 * Sequence:
 *   1. letters stagger up into place
 *   2. each letter rides a slow sine wave (offset by index -> travelling wave)
 *   3. once fonts + window load are done AND a minimum on-screen time has
 *      passed, letters fly up and the whole panel slides away
 *
 * runPreloader() resolves when the panel is gone, so motion.ts can then
 * start the hero intro.
 */
import gsap from "gsap";

const MIN_ON_SCREEN = 1400; // ms — keeps the loader from flashing on fast loads
const HARD_CAP = 6000; // ms — never hold the page hostage

export function runPreloader(): Promise<void> {
  const panel = document.querySelector<HTMLElement>(".preloader");
  const chars = gsap.utils.toArray<HTMLElement>(".preloader__char");

  const cleanup = () => {
    panel?.remove();
    document.documentElement.classList.remove("is-loading");
  };

  if (!panel || chars.length === 0) {
    cleanup();
    return Promise.resolve();
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return new Promise<void>((resolve) => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      cleanup();
      resolve();
    };

    // Ultimate safety net — a plain timer, so it fires even if GSAP's ticker
    // is paused (e.g. the tab was backgrounded during load).
    setTimeout(finish, HARD_CAP);

    if (reduce) {
      gsap.to(panel, { autoAlpha: 0, duration: 0.4, delay: 0.5, onComplete: finish });
      return;
    }

    // 1 + 2 — entrance, then the continuous wave
    const intro = gsap.timeline();
    intro
      .from(chars, {
        yPercent: 120,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.035,
      })
      .add(() => {
        chars.forEach((char, i) => {
          gsap.to(char, {
            y: -7,
            rotation: -2,
            duration: 0.85,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.07,
          });
        });
      });

    // 3 — wait for the page to be ready, then leave
    const pageReady = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((r) => {
        if (document.readyState === "complete") r();
        else window.addEventListener("load", () => r(), { once: true });
      }),
    ]);
    const minTime = new Promise<void>((r) => setTimeout(r, MIN_ON_SCREEN));

    Promise.all([pageReady, minTime]).then(() => {
      gsap.killTweensOf(chars); // stop the wave
      gsap
        .timeline({ onComplete: finish })
        .to(chars, {
          yPercent: -120,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.in",
          stagger: { each: 0.025, from: "end" },
        })
        .to(panel, { yPercent: -100, duration: 0.8, ease: "power3.inOut" }, "-=0.15");
    });
  });
}
