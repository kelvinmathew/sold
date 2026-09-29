/**
 * Hides the full-screen page loader once the page has actually finished
 * loading (window 'load' - all images/fonts/etc., not just DOMContentLoaded,
 * so it never disappears while content is still visibly popping in).
 *
 * Deliberately vanilla JS, no dependency on jQuery or main.js - this file
 * is tiny and needs to run reliably on every single page regardless of
 * what else is or isn't loaded yet.
 *
 * Safety net: also force-hides after a fixed timeout, in case 'load' never
 * fires for some reason (a stalled third-party request, etc.) - the loader
 * must never be able to permanently block the page.
 */
(function () {
	var LOADER_ID = 'sold-page-loader';
	var SAFETY_TIMEOUT_MS = 4000;

	function hideLoader() {
		var el = document.getElementById(LOADER_ID);
		if (!el || el.classList.contains('sold-page-loader--hidden')) {
			return;
		}
		el.classList.add('sold-page-loader--hidden');
		// Fully remove after the CSS fade finishes, so it's not sitting in
		// the DOM (or reachable by assistive tech / tab order) at all once
		// it's no longer visible.
		window.setTimeout(function () {
			if (el && el.parentNode) {
				el.parentNode.removeChild(el);
			}
		}, 400);
	}

	if (document.readyState === 'complete') {
		// Script loaded after the page already finished (e.g. a very fast
		// cached load) - nothing left to wait for.
		hideLoader();
	} else {
		window.addEventListener('load', hideLoader);
	}

	window.setTimeout(hideLoader, SAFETY_TIMEOUT_MS);
})();
