/**
 * FAQ Accordion Module
 * Controls expanding and collapsing FAQ accordion panels
 * with ARIA states and smooth height transitions.
 */
(function () {
  'use strict';

  const faqTriggers = document.querySelectorAll('.faq-trigger');

  function toggleFaqPanel(trigger) {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    const panelId = trigger.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    const iconWrapper = trigger.querySelector('.faq-icon-wrapper svg');

    // Close all other panels for clean UX
    faqTriggers.forEach(otherTrigger => {
      if (otherTrigger !== trigger) {
        otherTrigger.setAttribute('aria-expanded', 'false');
        const otherPanelId = otherTrigger.getAttribute('aria-controls');
        const otherPanel = document.getElementById(otherPanelId);
        if (otherPanel) {
          otherPanel.style.maxHeight = null;
        }
        const otherIcon = otherTrigger.querySelector('.faq-icon-wrapper svg');
        if (otherIcon) {
          otherIcon.classList.remove('rotate-180');
        }
      }
    });

    if (isExpanded) {
      trigger.setAttribute('aria-expanded', 'false');
      if (panel) {
        panel.style.maxHeight = null;
      }
      if (iconWrapper) {
        iconWrapper.classList.remove('rotate-180');
      }
    } else {
      trigger.setAttribute('aria-expanded', 'true');
      if (panel) {
        // Expand to natural content scroll height
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
      if (iconWrapper) {
        iconWrapper.classList.add('rotate-180');
      }
    }
  }

  function init() {
    faqTriggers.forEach(trigger => {
      trigger.addEventListener('click', function () {
        toggleFaqPanel(trigger);
      });
    });
  }

  window.FaqManager = {
    init,
    toggleFaqPanel
  };

  document.addEventListener('DOMContentLoaded', init);
})();
