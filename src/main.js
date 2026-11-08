import "./styles.css";

const zones = {
  z1: {
    code: "Z01",
    title: "Restaurang & kök",
    text: "Automatisk släckning av huva och kanal, manuell utlösning vid utgången och temperaturvakt som bryter gasen vid brand.",
    tags: ["Våt kemisk släckning", "Huv & kanal", "Manuell utlösning"],
  },
  z2: {
    code: "Z02",
    title: "Källare & teknik",
    text: "Brandlarmets central och detektion i teknikutrymmen. Övervakad förbindelse till larmcentral och utrymningslarm i hela byggnaden.",
    tags: ["Adresserbart brandlarm", "Larmcentral", "Teknikutrymmen"],
  },
  z3: {
    code: "Z03",
    title: "Kontor, plan 2",
    text: "Talad utrymningssignal, optiska larmdon och nödbelysning längs flyktvägarna. Utrymningsplaner som är lätta att följa även i rök.",
    tags: ["Utrymningslarm", "Nödbelysning", "Utrymningsplan"],
  },
  z4: {
    code: "Z04",
    title: "Fläktrum",
    text: "Kanaldetektorer som stoppar fläktar och stänger brandspjäll innan rök sprids vidare i ventilationssystemet.",
    tags: ["Kanaldetektion", "Brandspjäll", "Fläktstyrning"],
  },
  z5: {
    code: "Z05",
    title: "Entré & utrymning",
    text: "Handbrandsläckare, brandfilt och markerade flyktvägar. Nödbelysning som tål strömavbrott och skyltar som syns i dålig sikt.",
    tags: ["Brandsläckare", "Nödbelysning", "Flyktvägar"],
  },
};

const detail = document.querySelector("[data-zone-detail]");
const zoneEls = Array.from(document.querySelectorAll(".zone"));

function renderZone(id) {
  const zone = zones[id];
  if (!zone || !detail) return;

  const head = document.createElement("div");
  head.className = "panel__detail-head";

  const code = document.createElement("span");
  code.className = "panel__code";
  code.textContent = zone.code;

  const title = document.createElement("h2");
  title.textContent = zone.title;

  head.append(code, title);

  const text = document.createElement("p");
  text.textContent = zone.text;

  const chips = document.createElement("ul");
  chips.className = "chips";
  zone.tags.forEach((tag) => {
    const item = document.createElement("li");
    item.textContent = tag;
    chips.append(item);
  });

  detail.replaceChildren(head, text, chips);
}

function activateZone(id) {
  zoneEls.forEach((el) => {
    const isActive = el.dataset.zone === id;
    el.classList.toggle("is-active", isActive);
    el.setAttribute("aria-pressed", String(isActive));
  });
  renderZone(id);
}

zoneEls.forEach((el) => {
  el.addEventListener("click", () => activateZone(el.dataset.zone));
  el.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateZone(el.dataset.zone);
    }
  });
});

activateZone("z1");

// Header state and mobile navigation

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
  if (window.innerWidth > 960) setNav(false);
});

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// Services accordion

document.querySelectorAll(".service").forEach((service) => {
  const button = service.querySelector(".service__head");
  if (!button) return;

  if (button.getAttribute("aria-expanded") === "true") {
    service.classList.add("is-open");
  }

  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    service.classList.toggle("is-open", open);
  });
});

// Contact form

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
