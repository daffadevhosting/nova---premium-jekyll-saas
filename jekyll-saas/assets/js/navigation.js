/**
 * Navigation Module
 * Handles sticky headers, responsive mobile drawer menu, outside-clicks,
 * escape keys, and accessibility keyboard triggers.
 */
(function () {
  'use strict';

  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mainHeader = document.getElementById('main-header');

  let isOpen = false;

  function toggleMenu(forceState) {
    isOpen = typeof forceState === 'boolean' ? forceState : !isOpen;

    if (isOpen) {
      mobileDrawer.style.display = 'flex';
      // Trigger browser reflow for animations to work
      mobileDrawer.offsetHeight;
      mobileDrawer.classList.remove('translate-x-full');
      menuToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden'); // Disable scrolling behind drawer
    } else {
      mobileDrawer.classList.add('translate-x-full');
      menuToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
      
      // Delay display:none until transition finishes
      setTimeout(() => {
        if (!isOpen) {
          mobileDrawer.style.display = 'none';
        }
      }, 300);
    }
  }

  function init() {
    if (!menuToggleBtn || !mobileDrawer) return;

    // Toggle button handler
    menuToggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close on clicking outside the drawer
    document.addEventListener('click', function (e) {
      if (isOpen && !mobileDrawer.contains(e.target) && !menuToggleBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on ESC keypress
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        toggleMenu(false);
        menuToggleBtn.focus();
      }
    });

    // Sticky Header Scroll observer (Adds extra shadow/depth as scroll descends)
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        mainHeader.classList.add('shadow-md', 'bg-white/95', 'dark:bg-slate-900/95');
        mainHeader.classList.remove('bg-white/80', 'dark:bg-slate-900/80');
      } else {
        mainHeader.classList.remove('shadow-md', 'bg-white/95', 'dark:bg-slate-900/95');
        mainHeader.classList.add('bg-white/80', 'dark:bg-slate-900/80');
      }
    });
  }

  window.NavigationManager = {
    init,
    toggleMenu
  };

  document.addEventListener('DOMContentLoaded', init);
})();
