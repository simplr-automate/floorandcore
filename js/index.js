// index.js

// =============================
// Load nav and footer
// =============================
$(function () {
  $("#nav-placeholder").load("/nav.html");
  $("#footer-placeholder").load("/footer.html");
});

// =============================
// Modal + Form Handling
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('chatModal');
  const openBtn = document.querySelector('.cta-button');
  const closeBtn = document.getElementById('closeModal');
  const form = document.getElementById('chatForm');

  if (!openBtn || !closeBtn || !form) {
    console.error("Required elements not found");
    return;
  }

  // Open modal
  openBtn.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default anchor action
    modal.style.display = 'flex';
    modal.focus();
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'email', 'phone', 'story'];
    for (const fieldName of requiredFields) {
      const field = form.elements[fieldName];
      if (!field.value.trim()) {
        alert(`Please fill out the ${fieldName} field.`);
        field.focus();
        return;
      }
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await fetch('/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      modal.style.display = 'none';
      setTimeout(() => {
        alert(`Thank you, ${data.name}! Your message has been received. We'll reach out to you shortly.`);
      }, 300);
      form.reset();
    } catch (err) {
      console.error('Form submission failed:', err);
      alert('There was an error sending your message. Please try again later.');
    }
  });
});

// =============================
// Photo Gallery Auto-Rotation
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.gallery-slide');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 4000); // 4s per slide
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Indicator click
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      stopSlideshow();
      startSlideshow();
    });
  });

  // Pause on hover
  const gallery = document.querySelector('.photo-gallery');
  if (gallery) {
    gallery.addEventListener('mouseenter', stopSlideshow);
    gallery.addEventListener('mouseleave', startSlideshow);
  }

  // Start auto slideshow
  startSlideshow();
});
