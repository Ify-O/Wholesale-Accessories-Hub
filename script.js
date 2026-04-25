window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);

const phoneInput = document.querySelector("#phone");

const iti = window.intlTelInput(phoneInput, {
  initialCountry: "auto",
  separateDialCode: true,
  preferredCountries: ["ng", "gb", "us", "es", "cm", "gh"],
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
});

// OPTIONAL: ensure full international format is submitted
const form = document.querySelector("form");

form.addEventListener("submit", function () {
  const fullNumber = iti.getNumber(); // e.g. +2348012345678
  phoneInput.value = fullNumber;
});

form.addEventListener("submit", function () {
  const fullNumber = iti.getNumber();

  // store for later use (optional)
  localStorage.setItem("phone", fullNumber);
});

const phone = localStorage.getItem("phone");

if (phone) {
  document.getElementById("whatsapp-link").href =
    `https://wa.me/${phone.replace("+", "")}`;
}