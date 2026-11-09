import "./styles.css";

const header = document.querySelector("[data-header]");
const nav = document.querySelector("#primary-nav");
const navToggle = document.querySelector("[data-nav-toggle]");

function setNav(open) {
  if (!nav || !navToggle) return;
  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  const label = navToggle.querySelector(".nav-toggle__label");
  if (label) label.textContent = open ? "Stäng" : "Meny";
}

navToggle?.addEventListener("click", () => {
  setNav(navToggle.getAttribute("aria-expanded") !== "true");
});

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

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

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
