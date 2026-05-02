// =========================
// NAVBAR SCROLL EFFECT
// =========================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// =========================
// SIMPLE SELECT DROPDOWN NAV
// =========================
const catalogSelect = document.querySelector(".navbar select");

if (catalogSelect) {
  catalogSelect.addEventListener("change", (e) => {
    if (e.target.value) {
      window.location.href = e.target.value;
    }
  });
}
//==========================
// PHONE MENU TOGGLE
//==========================
const phoneInput = document.querySelector("#phone");

const iti = window.intlTelInput(phoneInput, {
  initialCountry: "auto",
  separateDialCode: true,
  preferredCountries: ["ng", "gb", "us", "es"],
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
});

// =========================
// SCROLL REVEAL
// =========================
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1 },
);

reveals.forEach((el) => observer.observe(el));

// =========================
// TESTIMONIAL SLIDER (SAFE VERSION)
// =========================
const track = document.querySelector(".testimonial-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;

function updateSlider() {
  if (!track) return;
  const card = document.querySelector(".testimonial");
  if (!card) return;

  const width = card.offsetWidth + 15;
  track.style.transform = `translateX(-${index * width}px)`;
}

if (nextBtn && prevBtn && track) {
  nextBtn.addEventListener("click", () => {
    const total = document.querySelectorAll(".testimonial").length;
    if (index < total - 1) index++;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) index--;
    updateSlider();
  });
}
