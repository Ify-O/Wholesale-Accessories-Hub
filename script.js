document.addEventListener("DOMContentLoaded", function () {
  // NAV SCROLL
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (navbar) {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  // REVEAL ANIMATION
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        reveals[i].classList.add("active");
      }
    }
  }

  window.addEventListener("scroll", revealOnScroll);

  // PHONE INPUT
  const phoneInput = document.querySelector("#phone");

  let iti;

  if (phoneInput && window.intlTelInput) {
    iti = window.intlTelInput(phoneInput, {
      initialCountry: "auto",
      separateDialCode: true,
      preferredCountries: ["ng", "gb", "us", "es", "cm", "gh"],
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
    });
  }

  // PHONE VALIDATION (NOW INSIDE CORRECT SCOPE)
  if (phoneInput && iti) {
    phoneInput.addEventListener("blur", function () {
      if (iti.isValidNumber()) {
        phoneInput.classList.add("phone-valid");
        phoneInput.classList.remove("phone-invalid");
      } else {
        phoneInput.classList.add("phone-invalid");
        phoneInput.classList.remove("phone-valid");
      }
    });

    phoneInput.addEventListener("input", function () {
      phoneInput.classList.remove("phone-valid", "phone-invalid");
    });
  }

  // FORM
  const form = document.querySelector("form");

  if (form && phoneInput && iti) {
    form.addEventListener("submit", function () {
      const fullNumber = iti.getNumber();

      phoneInput.value = fullNumber;

      localStorage.setItem("phone", fullNumber);
    });
  }

  // WHATSAPP BUTTON
  const whatsappLink = document.getElementById("whatsapp-link");
  const storedPhone = localStorage.getItem("phone");

  if (whatsappLink && storedPhone) {
    whatsappLink.href = `https://wa.me/${storedPhone.replace("+", "")}`;
  }
});
