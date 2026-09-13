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

/* the display lines ("Welcome to the", "workshop", "Farah Inani") rise up
   inside their clip windows; the "of ( … )" row and the role just fade up */
const CLIP_RISE = ".hero__lead .r, .hero__name .r";

/* Lock in the hero's start state now, while the preloader still covers it,
   so there's no flash between preloader-out and hero-in. */
if (!reduce) {
  gsap.set(CLIP_RISE, { yPercent: 115 });
  gsap.set([".hero__mid", ".hero__role"], { autoAlpha: 0, y: 32 });
  gsap.set(".hero__watermark", { autoAlpha: 0, y: 40 });
  gsap.set(".hero__doodle", { autoAlpha: 0, scale: 0.55, transformOrigin: "50% 50%" });
}

function playHeroIntro() {
  if (reduce) return;

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .to(".hero__watermark", { autoAlpha: 1, y: 0, duration: 1.2 })
    .to(".hero__lead .r", { yPercent: 0, duration: 1.1, stagger: 0.12 }, "-=1")
    .to(".hero__mid", { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.55")
    .to(".hero__name .r", { yPercent: 0, duration: 1.1 }, "-=0.7")
    .to(".hero__role", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.7")
    .to(
      ".hero__doodle",
      { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: "back.out(1.7)" },
      "-=0.5",
    )
    .add(() => {
      // the badge keeps drifting gently while the page is idle
      gsap.to(".hero__doodle--badge", {
        y: -9,
        rotation: 5,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
}

function initHeroParallax() {
  if (reduce) return;

  // As you scroll through the hero, the whole headline/role/intro layer
  // lifts up and away while the pale watermark stays nearly anchored — so
  // "Code" appears to rise into view behind the name.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  tl.to(".hero__lift", { yPercent: -34, ease: "none" }, 0)
    .to(".hero__doodles", { yPercent: -22, ease: "none" }, 0)
    .to(".hero__watermark", { yPercent: 9, ease: "none" }, 0);
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
  initHeroParallax();
  initScrollReveals();
  ScrollTrigger.refresh(); // layout is final now the preloader is gone
});
