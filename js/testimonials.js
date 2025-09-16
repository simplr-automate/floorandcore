document.addEventListener('DOMContentLoaded', () => {
  const testimonialList = document.querySelector('.testimonial-list');
  const cards = Array.from(testimonialList.children);
  const cardsVisible = 3; // Number of cards visible at a time

  // Calculate card height including margin
  const cardHeight = cards[0].offsetHeight + parseInt(getComputedStyle(cards[0]).marginBottom);

  // Set the container height to show only `cardsVisible` cards
  testimonialList.style.height = `${cardHeight * cardsVisible}px`;
  testimonialList.style.overflow = 'hidden';
  testimonialList.style.position = 'relative';

  // Create slider wrapper
  const slider = document.createElement('div');
  slider.style.position = 'absolute';
  slider.style.top = '0';
  slider.style.left = '0';
  slider.style.right = '0';
  slider.style.transition = 'transform 0.4s ease-out';
  slider.style.willChange = 'transform';

  // Move cards into slider
  cards.forEach(card => slider.appendChild(card));
  testimonialList.appendChild(slider);

  let targetIndex = 0;
  let currentTransform = 0;
  let isAnimating = false;

  // Function to slide to target index
  function slideToTarget() {
    isAnimating = true;
    const desiredTransform = -cardHeight * targetIndex;

    function animate() {
      currentTransform += (desiredTransform - currentTransform) * 0.2; // adjust speed
      slider.style.transform = `translateY(${currentTransform}px)`;

      if (Math.abs(currentTransform - desiredTransform) > 0.5) {
        requestAnimationFrame(animate);
      } else {
        slider.style.transform = `translateY(${desiredTransform}px)`;
        currentTransform = desiredTransform;
        isAnimating = false;
      }
    }
    requestAnimationFrame(animate);
  }

  // Desktop scroll support
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isAnimating) return; // ignore while animating

    const delta = Math.sign(e.deltaY);
    targetIndex += delta;
    targetIndex = Math.max(0, Math.min(cards.length - cardsVisible, targetIndex));
    slideToTarget();
  }, { passive: false });

  // Touch support for mobile
  let startY = null;
  testimonialList.addEventListener('touchstart', e => startY = e.touches[0].clientY);
  testimonialList.addEventListener('touchmove', e => {
    if (startY === null || isAnimating) return;
    const diffY = startY - e.touches[0].clientY;
    if (Math.abs(diffY) > 10) { // smaller threshold = more responsive
      const delta = diffY > 0 ? 1 : -1;
      targetIndex += delta;
      targetIndex = Math.max(0, Math.min(cards.length - cardsVisible, targetIndex));
      slideToTarget();
      startY = e.touches[0].clientY;
    }
  });
  testimonialList.addEventListener('touchend', () => startY = null);

  // Optional: allow scrolling to hero/footer when reaching top/bottom
  // If at top or bottom, enable normal page scroll
  slider.addEventListener('transitionend', () => {
    if (targetIndex === 0) testimonialList.style.overflow = 'visible';
    else if (targetIndex === cards.length - cardsVisible) testimonialList.style.overflow = 'visible';
    else testimonialList.style.overflow = 'hidden';
  });
});
