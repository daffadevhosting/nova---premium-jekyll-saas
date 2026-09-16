/**
 * Theme Manager Module
 * Manages Light, Dark, and System modes with local storage persistence
 * designed to minimize visual flash on initial page paint.
 */
(function () {
  'use strict';

  const themeToggleBtn = document.getElementById('theme-toggle');
  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
  const sunIcon = document.getElementById('theme-toggle-light-icon');
  const moonIcon = document.getElementById('theme-toggle-dark-icon');

  function getThemePreference() {
    return localStorage.getItem('theme_mode') || 'system';
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (sunIcon) sunIcon.classList.remove('hidden');
      if (moonIcon) moonIcon.classList.add('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      if (sunIcon) sunIcon.classList.add('hidden');
      if (moonIcon) moonIcon.classList.remove('hidden');
    }
  }

  function setTheme(theme) {
    localStorage.setItem('theme_mode', theme);
    applyTheme(theme);
  }

  function init() {
    const currentTheme = getThemePreference();
    applyTheme(currentTheme);

    // Desktop Toggle Handler
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function () {
        const activeTheme = getThemePreference();
        if (activeTheme === 'dark') {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      });
    }

    // Mobile Toggle Handler
    if (mobileThemeToggleBtn) {
      mobileThemeToggleBtn.addEventListener('click', function () {
        const activeTheme = getThemePreference();
        if (activeTheme === 'dark') {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      });
    }

    // Listen for OS system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (getThemePreference() === 'system') {
        applyTheme('system');
      }
    });
  }

  // Bind to window to allow external access if needed
  window.ThemeManager = {
    init,
    setTheme,
    getThemePreference
  };

  document.addEventListener('DOMContentLoaded', init);
})();
