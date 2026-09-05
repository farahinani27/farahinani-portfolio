/**
 * motion.ts — page motion, sequenced after the preloader.
 *
 * - runPreloader() owns the "Please wait…" screen and resolves when it's gone.
 * - Then the hero intro plays and the scroll reveals are wired up.
 *
 * Reduced-motion users get no animation — the markup is fully visible without
 * JS, and the preloader fades quickly instead of dancing.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { runPreloader } from "./preloader";

gsap.registerPlugin(ScrollTrigger);

/* JS is running, so drop the CSS "pre-hide" safety net (see global.css). */
document.documentElement.classList.remove("anim-ready");

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const FADE_UP = [".hero__eyebrow", ".hero__intro", ".hero__role", ".hero__actions"];
const NAME_LINES = ".hero__name .line > span";

/* Lock in the hero's start state now, while the preloader still covers it,
   so there's no flash between preloader-out and hero-in. */
if (!reduce) {
  gsap.set(FADE_UP, { autoAlpha: 0, y: 22 });
  gsap.set(NAME_LINES, { autoAlpha: 0, yPercent: 115 });
}

function playHeroIntro() {
  if (reduce) return;

  gsap
    .timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
    .to(".hero__eyebrow", { autoAlpha: 1, y: 0 })
    .to(".hero__intro", { autoAlpha: 1, y: 0 }, "-=0.6")
    .to(NAME_LINES, { autoAlpha: 1, yPercent: 0, duration: 1.1, stagger: 0.12 }, "-=0.35")
    .to(".hero__role", { autoAlpha: 1, y: 0 }, "-=0.75")
    .to(".hero__actions", { autoAlpha: 1, y: 0 }, "-=0.75");
}

function initScrollReveals() {
  if (reduce) return;

  gsap.from(".intro__statement .line > span", {
    yPercent: 115,
    duration: 1,
    ease: "power3.out",
    stagger: 0.1,
    scrollTrigger: { trigger: ".intro__statement", start: "top 80%" },
  });

  gsap.from(".intro__ticker", {
    autoAlpha: 0,
    y: 24,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: { trigger: ".intro__ticker", start: "top 85%" },
  });
}

runPreloader().then(() => {
  playHeroIntro();
  initScrollReveals();
  ScrollTrigger.refresh(); // layout is final now the preloader is gone
});
