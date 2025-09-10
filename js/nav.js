const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

// Hamburger toggle
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);

  // Prevent body scroll
  document.body.style.overflow = isOpen ? 'hidden' : '';

  // Close all dropdowns when nav closes
  if (!isOpen) {
    dropdownToggles.forEach(toggle => {
      toggle.parentElement.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
});

// Dropdown toggle on mobile
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
