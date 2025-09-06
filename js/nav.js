// Select elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

// Hamburger open/close
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');

  // Close all dropdowns when menu closes
  if (!navLinks.classList.contains('open')) {
    dropdownToggles.forEach(toggle => {
      toggle.parentElement.classList.remove('active');
    });
  }
});

// Mobile dropdown open/close
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault(); // stop unwanted navigation if toggle is inside <a>

    const dropdown = toggle.parentElement;

    // Close all other dropdowns first
    dropdownToggles.forEach(t => {
      if (t !== toggle) {
        t.parentElement.classList.remove('active');
      }
    });

    // Toggle the clicked dropdown
    dropdown.classList.toggle('active');
  });
});
