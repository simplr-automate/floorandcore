const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav.nav-links');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

// Hamburger open/close
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Mobile dropdown open/close
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const dropdown = toggle.parentElement;
        dropdown.classList.toggle('active');
    });
});
