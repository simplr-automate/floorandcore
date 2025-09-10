document.addEventListener('DOMContentLoaded', () => {
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const answer = document.getElementById(button.getAttribute('aria-controls'));
      const expanded = button.getAttribute('aria-expanded') === 'true';

      // Close all others
      document.querySelectorAll('.faq-answer').forEach(a => {
        if (a !== answer) {
          a.style.maxHeight = null;
          a.classList.remove('open');
          const btn = a.previousElementSibling;
          btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked answer
      button.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) {
        answer.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.classList.remove('open');
        answer.style.maxHeight = null;
      }
    });
  });

  // Adjust max-height on window resize
  window.addEventListener('resize', () => {
    document.querySelectorAll('.faq-answer.open').forEach(answer => {
      answer.style.maxHeight = answer.scrollHeight + "px";
    });
  });
});
