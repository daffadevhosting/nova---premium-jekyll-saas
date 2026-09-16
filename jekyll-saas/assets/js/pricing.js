/**
 * Pricing Toggle Module
 * Manages toggling prices from monthly to yearly options
 * with real-time DOM manipulations.
 */
(function () {
  'use strict';

  const billingToggleBtn = document.getElementById('billing-toggle');
  const toggleKnob = document.getElementById('billing-toggle-knob');
  const priceVals = document.querySelectorAll('.price-val');
  const billingPeriods = document.querySelectorAll('.billing-period');

  let isYearly = false;

  function setBillingPeriod(yearlyState) {
    isYearly = yearlyState;

    if (billingToggleBtn && toggleKnob) {
      billingToggleBtn.setAttribute('aria-checked', isYearly ? 'true' : 'false');
      if (isYearly) {
        toggleKnob.classList.add('translate-x-5');
        toggleKnob.classList.remove('translate-x-0');
      } else {
        toggleKnob.classList.add('translate-x-0');
        toggleKnob.classList.remove('translate-x-5');
      }
    }

    // Dynamic price updates
    priceVals.forEach(val => {
      const monthlyPrice = val.getAttribute('data-monthly');
      const yearlyPrice = val.getAttribute('data-yearly');

      if (isYearly) {
        val.textContent = yearlyPrice;
      } else {
        val.textContent = monthlyPrice;
      }
    });

    // Dynamic period tag updates
    billingPeriods.forEach(period => {
      period.textContent = isYearly ? '/ month, billed yearly' : '/ month';
    });
  }

  function init() {
    if (!billingToggleBtn) return;

    billingToggleBtn.addEventListener('click', function () {
      setBillingPeriod(!isYearly);
    });
  }

  window.PricingManager = {
    init,
    setBillingPeriod
  };

  document.addEventListener('DOMContentLoaded', init);
})();
