import "./styles.css";

const header = document.querySelector("[data-header]");
const nav = document.querySelector("#primary-nav");
const navToggle = document.querySelector("[data-nav-toggle]");
const navBackdrop = document.querySelector("[data-nav-backdrop]");

// Mark the current page in the navigation.

function normalizePage(value) {
  const clean = value.split("#")[0].replace(/\/+$/, "").replace(/\.html$/, "");
  return (clean || "index").toLowerCase();
}

const currentPage = normalizePage(
  window.location.pathname.replace(/\/+$/, "").split("/").pop() || "index",
);
document.querySelectorAll(".nav a[href]").forEach((link) => {
  if (link.closest(".nav__submenu")) return;
  const href = link.getAttribute("href") || "";
  if (normalizePage(href) === currentPage) link.setAttribute("aria-current", "page");
});

// Mobile menu drawer.

function setNav(open) {
  if (!nav || !navToggle) return;
  nav.classList.toggle("is-open", open);
  navBackdrop?.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Stäng menyn" : "Öppna menyn");

  if (open) {
    window.setTimeout(() => {
      const first = nav.querySelector("a");
      first?.focus();
    }, 80);
  }
}

navToggle?.addEventListener("click", () => {
  setNav(navToggle.getAttribute("aria-expanded") !== "true");
});

navBackdrop?.addEventListener("click", () => setNav(false));

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNav(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav?.classList.contains("is-open")) {
    setNav(false);
    navToggle?.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) setNav(false);
});

// Sticky header shadow.

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Contact form.

const form = document.querySelector("[data-form]");
const success = document.querySelector("[data-form-success]");
const reset = document.querySelector("[data-form-reset]");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  form.hidden = true;
  if (success) {
    success.hidden = false;
    success.setAttribute("tabindex", "-1");
    success.focus({ preventScroll: true });
  }
});

reset?.addEventListener("click", () => {
  form?.reset();
  if (success) success.hidden = true;
  if (form) {
    form.hidden = false;
    form.querySelector("input")?.focus();
  }
});
