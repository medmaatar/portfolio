/* ============================================================
   Mohamed Maatar — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---- Theme (persisted, respects OS preference) ---- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initial = stored || (prefersLight ? "light" : "dark");
  root.setAttribute("data-theme", initial);

  themeToggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---- Mobile nav ---- */
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  const menu = document.getElementById("navMenu");
  burger.addEventListener("click", function () {
    nav.classList.toggle("is-open");
    burger.setAttribute("aria-label", nav.classList.contains("is-open") ? "Close menu" : "Open menu");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) nav.classList.remove("is-open");
  });

  /* ---- Nav shadow + scroll progress ---- */
  const progress = document.getElementById("scrollProgress");
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 8);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Active section in nav ---- */
  const links = Array.from(document.querySelectorAll(".nav__link"));
  const sections = links
    .map(function (l) { return document.querySelector(l.getAttribute("href")); })
    .filter(Boolean);

  const spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = "#" + entry.target.id;
        links.forEach(function (l) {
          l.classList.toggle("is-active", l.getAttribute("href") === id);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (s) { spy.observe(s); });

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObs = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        const el = entry.target;
        setTimeout(function () { el.classList.add("is-visible"); }, (i % 4) * 70);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach(function (el) { revealObs.observe(el); });

  /* ---- Typing effect in hero ---- */
  const typedEl = document.getElementById("typed");
  const roles = [
    "Data Scientist",
    "AI / RL Engineer",
    "Deep Learning Researcher",
    "Computer Vision Engineer",
    "NLP & LLM Specialist",
  ];
  let r = 0, c = 0, deleting = false;
  function type() {
    const word = roles[r];
    typedEl.textContent = word.slice(0, c);
    if (!deleting && c < word.length) {
      c++; setTimeout(type, 75);
    } else if (!deleting && c === word.length) {
      deleting = true; setTimeout(type, 1600);
    } else if (deleting && c > 0) {
      c--; setTimeout(type, 38);
    } else {
      deleting = false; r = (r + 1) % roles.length; setTimeout(type, 350);
    }
  }
  type();

  /* ---- Count-up stats ---- */
  const counters = document.querySelectorAll(".stat__num[data-count]");
  const countObs = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const dur = 1300; const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(function (el) { countObs.observe(el); });

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
