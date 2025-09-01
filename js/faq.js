document.addEventListener('DOMContentLoaded', () => {
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const answer = document.getElementById(button.getAttribute('aria-controls'));
      const expanded = button.getAttribute('aria-expanded') === 'true';

      // Close all other answers
      document.querySelectorAll('.faq-answer').forEach(a => {
        if (a !== answer) {
          a.classList.remove('open');
          a.previousElementSibling.setAttribute('aria-expanded', 'false');
          const arrow = a.previousElementSibling.querySelector('.arrow');
          if (arrow) arrow.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle clicked answer
      button.setAttribute('aria-expanded', String(!expanded));
      answer.classList.toggle('open', !expanded);
      const arrow = button.querySelector('.arrow');
      if (arrow) arrow.style.transform = !expanded ? 'rotate(90deg)' : 'rotate(0deg)';
    });
  });
});
