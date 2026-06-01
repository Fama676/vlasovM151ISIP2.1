// theme.js
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return; // Защита: если кнопки нет на странице, скрипт не сломается

  const htmlEl = document.documentElement;

  // 1️⃣ Определяем начальную тему
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  // 2️⃣ Применяем тему сразу
  applyTheme(currentTheme);

  // 3️⃣ Обработка клика по кнопке
  toggleBtn.addEventListener('click', () => {
    const newTheme = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // 4️⃣ Функция применения темы
  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    toggleBtn.textContent = theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая';
    toggleBtn.setAttribute('aria-label', theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему');
  }

  // 5️⃣ Реакция на смену системной темы (если пользователь не выбирал тему вручную)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
});