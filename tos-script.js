document.addEventListener('DOMContentLoaded', () => {
  const modeToggle = document.getElementById('mode-toggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const icon = modeToggle.querySelector('img');
      if (document.body.classList.contains('light-mode')) {
        icon.src = 'icons/sun.svg';
      } else {
        icon.src = 'icons/moon.svg';
      }
    });
  }
});