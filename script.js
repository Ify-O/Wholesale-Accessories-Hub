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

  // TOAST
  const toast = document.getElementById("toast");

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

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

    phoneInput.addEventListener("blur", function () {
      if (iti.isValidNumber()) {
        phoneInput.classList.add("phone-valid");
        phoneInput.classList.remove("phone-invalid");
      } else {
        phoneInput.classList.add("phone-invalid");
        phoneInput.classList.remove("phone-valid");
      }
    });
    if (iti && phoneInput && !iti.isValidNumber()) {
      e.preventDefault();
      showToast("Please enter a valid phone number");
      return;
    }
    phoneInput.addEventListener("input", function () {
      phoneInput.classList.remove("phone-valid", "phone-invalid");
    });
  }

  // FORM (FIXED - DECLARED PROPERLY)
  const form = document.querySelector(".contact-form");

  if (!form) return;
  form.addEventListener("submit", function (e) {
    const requiredFields = form.querySelectorAll("[required]");
    let missingFields = [];

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        missingFields.push(field.name || field.placeholder || "field");
      }
    });

    if (missingFields.length > 0) {
      e.preventDefault();
      showToast("Please fill in: " + missingFields.join(", "));
      return;
    }

    // ✅ PHONE VALIDATION (FIXED)
    if (iti && phoneInput && !iti.isValidNumber()) {
      e.preventDefault();
      showToast("Please enter a valid phone number");
      return;
    }

    // PHONE FINAL FORMAT
    if (iti && phoneInput) {
      const fullNumber = iti.getNumber();
      phoneInput.value = fullNumber;
      localStorage.setItem("phone", fullNumber);
    }
  });

  // WHATSAPP BUTTON (ONLY ON THANK YOU PAGE)
  const whatsappLink = document.getElementById("whatsapp-link");

  if (whatsappLink) {
    let phone = localStorage.getItem("phone");

    if (!phone) {
      phone = "2348102950853"; // fallback always safe
    }

    const cleaned = phone.replace("+", "");
    whatsappLink.href = `https://wa.me/${cleaned}`;
  }
});

// script.js

// ===== Auto-update footer year =====
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
