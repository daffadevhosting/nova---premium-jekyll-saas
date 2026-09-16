/**
 * Main Orchestrator File
 * Coordinates all module loaders and listens for reduced-motion updates.
 */
(function () {
  'use strict';

  function checkReducedMotion() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      document.documentElement.classList.add('prefers-reduced-motion');
      console.log('Reduced motion preferred by client OS — disabling intensive visual transitions.');
    } else {
      document.documentElement.classList.remove('prefers-reduced-motion');
    }
  }

  function init() {
    checkReducedMotion();
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', checkReducedMotion);

    console.log('NOVA Premium SaaS template initialization complete.');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
