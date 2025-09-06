// Mobile menu toggle
const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const dropdown = document.querySelector(".dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Mobile dropdown toggle for Services
dropdownToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent closing menu when clicking dropdown
  dropdown.classList.toggle("active");
});
