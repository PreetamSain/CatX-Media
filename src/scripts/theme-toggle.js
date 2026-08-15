export function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.js-theme-toggle');
  const html = document.documentElement;

  // Saved theme or default dark
  const savedTheme = localStorage.getItem('catx_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  toggleBtns.forEach(btn => {
    btn?.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', nextTheme);
      localStorage.setItem('catx_theme', nextTheme);
    });
  });
}
