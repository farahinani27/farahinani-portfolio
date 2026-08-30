/* =========================================================================
   farahinani.com — main script
   Plain JS, no build step. Loaded with `defer` after the vendored GSAP files.
   Progressive enhancement: the page works without it.
   Neutral scaffold — extend for the new design.
   ========================================================================= */
(function () {
  "use strict";

  /* ----- Footer year ------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ----- Mobile navigation toggle --------------------------------- */
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (header && toggle && nav) {
    var setNav = function (open) {
      header.classList.toggle("is-nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", function () {
      setNav(!header.classList.contains("is-nav-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
  }

  /* ----- Scroll reveals (GSAP + ScrollTrigger) ------------------- */
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", function () {
    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      gsap.from(el, {
        opacity: 0, y: 16, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true }
      });
    });
  });
})();
