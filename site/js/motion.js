// Sleepdienst De Tak — animaties met GSAP + ScrollTrigger
// Rustig en strak: korte bewegingen met motion blur, geen gekke effecten.
(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!window.gsap || !window.ScrollTrigger || reduce) {
    root.classList.add("no-motion");
    window.__motionReady = true;
    return;
  }

  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);
  window.__motionReady = true;

  var EASE = "expo.out";

  // Horizontale motion blur via een SVG-filter: de blur loopt alleen in de bewegingsrichting
  function blurFilter(id) {
    return document.querySelector("#" + id + " feGaussianBlur");
  }

  // ---------- Intro ----------
  var intro = gsap.timeline({ defaults: { ease: EASE } });

  // Pagina's zonder grote foto (privacy, 404) hebben geen intro nodig
  gsap.config({ nullTargetWarn: false });
  if (document.querySelector(".hero-bg")) intro.fromTo(".hero-bg", { scale: 1.18 }, { scale: 1, duration: 2.4 }, 0);

  [1, 2].forEach(function (n, i) {
    var line = document.querySelector('[data-mblur="' + n + '"]');
    var blur = blurFilter("mblur-" + n);
    if (!line) return;
    intro.fromTo(line, { xPercent: -45, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.1 }, 0.25 + i * 0.12);
    if (blur) {
      intro.fromTo(blur, { attr: { stdDeviation: "22 0" } }, { attr: { stdDeviation: "0 0" }, duration: 0.9, ease: "power3.out" }, 0.25 + i * 0.12);
    }
  });

  if (document.querySelector("[data-hero]")) intro.fromTo("[data-hero]",
    { y: 22, opacity: 0, filter: "blur(8px)" },
    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.08, clearProps: "filter" },
    0.55);

  // Parallax op de hero-foto (homepage en subpagina's)
  gsap.utils.toArray(".hero, .page-hero").forEach(function (hero) {
    var media = hero.querySelector(".hero-media");
    var content = hero.querySelector(".hero-grid, .page-hero-content");
    if (media) {
      gsap.to(media, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
      });
    }
    if (content) {
      gsap.to(content, {
        y: -60, opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "center center", end: "bottom top", scrub: true }
      });
    }
  });

  // ---------- Elementen die binnenkomen bij scrollen ----------
  gsap.utils.toArray("[data-reveal]").forEach(function (el) {
    gsap.from(el, {
      y: 34, opacity: 0, filter: "blur(10px)",
      duration: 1, ease: EASE, clearProps: "filter,transform",
      scrollTrigger: { trigger: el, start: "top 90%", once: true }
    });
  });

  gsap.utils.toArray("[data-stagger]").forEach(function (group) {
    gsap.from(group.children, {
      y: 40, opacity: 0, filter: "blur(10px)",
      duration: 1, ease: EASE, stagger: 0.07, clearProps: "filter,transform",
      scrollTrigger: { trigger: group, start: "top 88%", once: true }
    });
  });

  // Foto's: openschuiven van onder naar boven
  gsap.utils.toArray("[data-wipe]").forEach(function (fig, i) {
    var img = fig.querySelector("img");
    var tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 88%", once: true } });
    tl.fromTo(fig, { clipPath: "inset(100% 0% 0% 0% round 16px)" },
      { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 1.3, ease: "expo.inOut", delay: (i % 3) * 0.08 });
    if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.6, ease: EASE, clearProps: "transform" }, "<");
  });

  // Galerij: verticale motion blur die meebeweegt met de scrollsnelheid
  var gallery = document.querySelector(".gallery");
  var vBlur = blurFilter("mblur-3");
  if (gallery && vBlur) {
    gallery.querySelectorAll("img").forEach(function (img) { img.style.filter = "url(#mblur-3)"; });
    var amount = { v: 0 };
    var setBlur = function () { vBlur.setAttribute("stdDeviation", "0 " + amount.v.toFixed(2)); };
    window.ScrollTrigger.create({
      trigger: gallery,
      start: "top bottom",
      end: "bottom top",
      onUpdate: function (self) {
        var v = Math.min(Math.abs(self.getVelocity()) / 400, 7);
        gsap.to(amount, { v: v, duration: 0.15, overwrite: true, onUpdate: setBlur, onComplete: function () {
          gsap.to(amount, { v: 0, duration: 0.4, ease: "power2.out", onUpdate: setBlur });
        } });
      }
    });
  }

  // ---------- Formulier ----------
  document.addEventListener("detak:tab", function () {
    var visible = document.querySelectorAll("#aanvraag-form [data-show]:not([hidden])");
    gsap.fromTo(visible, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: "power3.out", clearProps: "transform,opacity" });
  });

  document.addEventListener("detak:vehicle", function (e) {
    if (e.detail === "loading") return;
    gsap.fromTo("#vehicle", { y: 8, opacity: 0, filter: "blur(6px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out", clearProps: "filter,transform" });
  });

  // Afbeeldingen die later laden veranderen de hoogte van de pagina
  window.addEventListener("load", function () { window.ScrollTrigger.refresh(); });
})();
