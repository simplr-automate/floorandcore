// Mobile hamburger toggle
const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Mobile dropdown toggle
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(drop => {
  const toggle = drop.querySelector(".dropdown-toggle");
  toggle.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent menu close
    drop.classList.toggle("active");
  });
});
