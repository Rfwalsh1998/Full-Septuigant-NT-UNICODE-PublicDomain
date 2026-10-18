(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let saved;
  try { saved = localStorage.getItem('apostolic-bible-theme'); } catch (_) {}
  let chosen = saved === 'light' || saved === 'dark';
  function apply(theme) {
    root.dataset.theme = theme;
    const button = document.getElementById('theme-toggle');
    if (button) {
      const dark = theme === 'dark';
      button.setAttribute('aria-pressed', String(dark));
      button.textContent = dark ? 'Light mode' : 'Dark mode';
    }
  }
  apply(chosen ? saved : preference.matches ? 'dark' : 'light');
  document.addEventListener('DOMContentLoaded', () => {
    apply(root.dataset.theme);
    document.getElementById('theme-toggle').addEventListener('click', () => {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      chosen = true;
      apply(theme);
      try { localStorage.setItem('apostolic-bible-theme', theme); } catch (_) {}
    });
  });
  preference.addEventListener('change', event => {
    if (!chosen) apply(event.matches ? 'dark' : 'light');
  });
})();
