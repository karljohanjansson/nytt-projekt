import "./styles.css";

const header = document.querySelector("[data-header]");
const nav = document.querySelector("#primary-nav");
const navToggle = document.querySelector("[data-nav-toggle]");
const navBackdrop = document.querySelector("[data-nav-backdrop]");
const navSubToggle = document.querySelector("[data-nav-sub-toggle]");
const navSubmenuItem = navSubToggle?.closest(".nav__item--has-sub");

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

function setSubmenu(open) {
  if (!navSubToggle || !navSubmenuItem) return;
  navSubmenuItem.classList.toggle("is-open", open);
  navSubToggle.setAttribute("aria-expanded", String(open));
  navSubToggle.setAttribute("aria-label", open ? "Dölj tjänster" : "Visa tjänster");
}

function setNav(open) {
  if (!nav || !navToggle) return;
  if (open && window.matchMedia("(max-width: 980px)").matches) setSubmenu(true);
  if (!open) setSubmenu(false);

  // Lock body scroll without breaking sticky header (position:fixed technique).
  if (open) {
    const scrollY = window.scrollY;
    document.body.dataset.scrollY = String(scrollY);
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  } else {
    const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    delete document.body.dataset.scrollY;
    window.scrollTo({ top: scrollY, behavior: "instant" });
  }

  nav.classList.toggle("is-open", open);
  navBackdrop?.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Stäng menyn" : "Öppna menyn");

  if (open) {
    window.setTimeout(() => {
      const first = nav.querySelector("a");
      first?.focus({ preventScroll: true });
    }, 80);
  }
}

navToggle?.addEventListener("click", () => {
  setNav(navToggle.getAttribute("aria-expanded") !== "true");
});

navBackdrop?.addEventListener("click", () => setNav(false));

navSubToggle?.addEventListener("click", () => {
  setSubmenu(navSubToggle.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("click", (event) => {
  if (!navSubmenuItem) return;
  if (navSubmenuItem.contains(event.target)) return;
  if (navToggle?.contains(event.target)) return;
  setSubmenu(false);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setNav(false);
    setSubmenu(false);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (navSubmenuItem?.classList.contains("is-open")) {
    setSubmenu(false);
    navSubToggle?.focus();
    return;
  }
  if (nav?.classList.contains("is-open")) {
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
