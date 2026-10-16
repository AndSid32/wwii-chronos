/* Optional first-party GA4 bootstrap. Disabled while measurementId is empty. */
(function () {
  'use strict';
  var cfg = window.WWII_CHRONOS_ANALYTICS || {};
  var id = String(cfg.measurementId || '').trim();
  if (!/^G-[A-Z0-9]+$/i.test(id)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id);
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(s);
})();
