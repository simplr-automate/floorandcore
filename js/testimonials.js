// Testimonial slider logic
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.getElementById('slides');
  const buttons = document.querySelectorAll('.nav-button');
  let currentIndex = 0;
  const totalSlides = buttons.length;
  const slideWidth = 100; // percent width per slide
  let autoSlideInterval;
  let resumeTimeout;

  function goToSlide(index) {
    currentIndex = index;
    slides.style.transform = `translateX(-${slideWidth * index}%)`;
    updateButtons();
  }

  function updateButtons() {
    buttons.forEach((btn, i) => {
      if (i === currentIndex) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        btn.setAttribute('tabindex', '0');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
      }
    });
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % totalSlides;
      goToSlide(nextIndex);
    }, 10000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    clearTimeout(resumeTimeout);
  }

  function pauseAndResumeAutoSlide() {
    stopAutoSlide();
    resumeTimeout = setTimeout(() => {
      startAutoSlide();
    }, 10000);
  }

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      goToSlide(index);
      pauseAndResumeAutoSlide();
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        let nextIndex = (currentIndex + 1) % totalSlides;
        buttons[nextIndex].focus();
        goToSlide(nextIndex);
        pauseAndResumeAutoSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        buttons[prevIndex].focus();
        goToSlide(prevIndex);
        pauseAndResumeAutoSlide();
      }
    });
  });

  slides.addEventListener('focusin', () => pauseAndResumeAutoSlide());

  // Initialize
  goToSlide(0);
  startAutoSlide();
});