document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.getElementById('slides');
  const slides = document.querySelectorAll('.slide');
  const navButtons = document.querySelectorAll('.nav-button');
  const totalSlides = slides.length;

  let currentIndex = 0;
  let autoSlideInterval;
  let resumeTimeout;
  const autoSlideDelay = 10000; // 10 seconds

  /* ============================= */
  /* Slide Navigation Function */
  /* ============================= */
  function goToSlide(index) {
    currentIndex = index;
    slidesContainer.style.transform = `translateX(-${100 * index}%)`;
    updateNavButtons();
  }

  function updateNavButtons() {
    navButtons.forEach((btn, i) => {
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

  /* ============================= */
  /* Auto Slide */
  /* ============================= */
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      goToSlide((currentIndex + 1) % totalSlides);
    }, autoSlideDelay);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    clearTimeout(resumeTimeout);
  }

  function pauseAndResumeAutoSlide() {
    stopAutoSlide();
    resumeTimeout = setTimeout(() => startAutoSlide(), autoSlideDelay);
  }

  /* ============================= */
  /* Nav Buttons Click */
  /* ============================= */
  navButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      goToSlide(index);
      pauseAndResumeAutoSlide();
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % totalSlides;
        buttonsFocusAndSlide(nextIndex);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        buttonsFocusAndSlide(prevIndex);
      }
    });
  });

  function buttonsFocusAndSlide(index) {
    navButtons[index].focus();
    goToSlide(index);
    pauseAndResumeAutoSlide();
  }

  /* ============================= */
  /* Touch/Swipe Support */
  /* ============================= */
  let startX = 0;
  let isDragging = false;

  slidesContainer.addEventListener('touchstart', (e) => {
    stopAutoSlide();
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slidesContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    slidesContainer.style.transform = `translateX(${-100 * currentIndex + (deltaX / slidesContainer.offsetWidth) * 100}%)`;
  });

  slidesContainer.addEventListener('touchend', (e) => {
    isDragging = false;
    const deltaX = e.changedTouches[0].clientX - startX;

    if (deltaX < -50) {
      goToSlide((currentIndex + 1) % totalSlides);
    } else if (deltaX > 50) {
      goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    } else {
      goToSlide(currentIndex);
    }

    pauseAndResumeAutoSlide();
  });

  /* ============================= */
  /* Keyboard Focus Pause */
  /* ============================= */
  slidesContainer.addEventListener('focusin', pauseAndResumeAutoSlide);

  /* ============================= */
  /* Initialize Slider */
  /* ============================= */
  goToSlide(0);
  startAutoSlide();
});
