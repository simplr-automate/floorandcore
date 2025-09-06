const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Mobile menu open/close
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Mobile dropdown toggle
document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default button behavior
    const dropdown = toggle.parentElement;
    dropdown.classList.toggle("active");
  });
});
