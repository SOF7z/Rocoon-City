/* ===================================
   RACCOON CITY — MAIN.JS
   =================================== */

// ─── PRELOADER ─────────────────────
window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hidden");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 700);
    }
  }, 2200);
});

// ─── NAVBAR SCROLL ─────────────────
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 60) navbar?.classList.add("scrolled");
    else navbar?.classList.remove("scrolled");
  },
  { passive: true },
);

// ─── MOBILE NAV TOGGLE ─────────────
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const spans = navToggle.querySelectorAll("span");
    spans.forEach(
      (s) =>
        (s.style.background = navLinks.classList.contains("open")
          ? "#c0392b"
          : ""),
    );
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// ─── PARALLAX HERO ─────────────────
const heroBg = document.getElementById("heroBg");
if (heroBg) {
  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;
      heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
    },
    { passive: true },
  );
}

// ─── PARTICLES ─────────────────────
const particlesContainer = document.getElementById("heroParticles");
if (particlesContainer) {
  for (let i = 0; i < 60; i++) {
    const p = document.createElement("div");
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const delay = Math.random() * 8;
    const dur = Math.random() * 6 + 6;
    Object.assign(p.style, {
      position: "absolute",
      left: x + "%",
      bottom: "-10px",
      width: size + "px",
      height: size + "px",
      borderRadius: "50%",
      background:
        Math.random() > 0.7 ? "rgba(192,57,43,0.6)" : "rgba(255,255,255,0.15)",
      animation: `rise ${dur}s ${delay}s linear infinite`,
      pointerEvents: "none",
    });
    particlesContainer.appendChild(p);
  }
  // Inject keyframe
  const style = document.createElement("style");
  style.textContent = `@keyframes rise { 0% { transform: translateY(0) scale(1); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 0.5; } 100% { transform: translateY(-100vh) scale(0); opacity: 0; } }`;
  document.head.appendChild(style);
}

// ─── COUNTER ANIMATION ─────────────
const counters = document.querySelectorAll(".stat-number[data-target]");
let countersStarted = false;
function animateCounters() {
  if (countersStarted) return;
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const rect = hero.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    countersStarted = true;
    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target);
      const dur = 2000;
      const step = target / (dur / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current).toLocaleString("id-ID");
      }, 16);
    });
  }
}
window.addEventListener("scroll", animateCounters, { passive: true });
animateCounters(); // Run on load too

// ─── SCROLL ANIMATIONS ─────────────
function checkAnimations() {
  const elements = document.querySelectorAll("[data-aos]");
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("animated");
    }
  });
}
window.addEventListener("scroll", checkAnimations, { passive: true });
window.addEventListener("load", checkAnimations);
checkAnimations();

// ─── TICKER DUPLICATE ──────────────
const ticker = document.querySelector(".ticker");
if (ticker) {
  ticker.innerHTML += ticker.innerHTML; // Seamless loop
}

// ─── GLITCH TEXT EFFECT ────────────
function addGlitch(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  setInterval(() => {
    if (Math.random() > 0.93) {
      el.style.textShadow = `${Math.random() * 6 - 3}px 0 #e74c3c, ${Math.random() * -6 + 3}px 0 #3498db`;
      setTimeout(() => {
        el.style.textShadow = "";
      }, 80);
    }
  }, 300);
}
addGlitch(".hero-title");
addGlitch(".page-header h1");

// ─── ACTIVE NAV LINK ───────────────
const currentPath = window.location.pathname;
document.querySelectorAll(".nav-links a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href && currentPath.endsWith(href.replace("../", "").replace("./", ""))) {
    document
      .querySelectorAll(".nav-links a")
      .forEach((a) => a.classList.remove("active"));
    link.classList.add("active");
  }
});

// ─── SMOOTH REVEAL ON LOAD ─────────
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.4s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
