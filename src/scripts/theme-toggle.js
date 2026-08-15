export function initThemeToggle() {
  const darkBtn = document.querySelector('#theme-btn-dark');
  const lightBtn = document.querySelector('#theme-btn-light');
  const switchPill = document.querySelector('.theme-switch__pill');
  const mobileToggleBtns = document.querySelectorAll('.js-theme-toggle');
  const html = document.documentElement;

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('catx_theme', theme);

    if (theme === 'light') {
      lightBtn?.classList.add('is-active');
      darkBtn?.classList.remove('is-active');
      if (switchPill) switchPill.style.transform = 'translate(calc(100% + 4px))';
    } else {
      darkBtn?.classList.add('is-active');
      lightBtn?.classList.remove('is-active');
      if (switchPill) switchPill.style.transform = 'translate(0)';
    }
  }

  const savedTheme = localStorage.getItem('catx_theme') || 'dark';
  applyTheme(savedTheme);

  darkBtn?.addEventListener('click', () => applyTheme('dark'));
  lightBtn?.addEventListener('click', () => applyTheme('light'));

  mobileToggleBtns.forEach(btn => {
    btn?.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });
}
