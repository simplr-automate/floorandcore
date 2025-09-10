const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

// Toggle hamburger + nav
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);

  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';

  // Close dropdowns when closing menu
  if (!isOpen) {
    dropdownToggles.forEach(toggle => {
      toggle.parentElement.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
});

// Mobile dropdown toggle
dropdownToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    const dropdown = toggle.parentElement;
    const isActive = dropdown.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isActive);

    // Close other dropdowns
    dropdownToggles.forEach(other => {
      if (other !== toggle) {
        other.parentElement.classList.remove('active');
        other.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
