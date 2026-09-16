/**
 * Announcement Bar Module
 * Manages closing the announcement bar and persisting
 * this state in localStorage.
 */
(function () {
  'use strict';

  const announcementBar = document.getElementById('announcement-bar');
  const closeBtn = document.getElementById('close-announcement');

  function init() {
    if (!announcementBar || !closeBtn) return;

    // Check localStorage status
    const isClosed = localStorage.getItem('announcement_closed') === 'true';

    if (isClosed) {
      announcementBar.style.display = 'none';
    } else {
      announcementBar.style.display = 'flex';
    }

    // Close handler
    closeBtn.addEventListener('click', function () {
      announcementBar.style.opacity = '0';
      announcementBar.style.transform = 'translateY(-100%)';
      localStorage.setItem('announcement_closed', 'true');

      // Remove from layout after animation completes
      setTimeout(() => {
        announcementBar.style.display = 'none';
      }, 300);
    });
  }

  window.AnnouncementManager = {
    init
  };

  document.addEventListener('DOMContentLoaded', init);
})();
