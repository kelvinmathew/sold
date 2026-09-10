/**
 * Contact form: service-checkbox toggling + validation (static/local preview).
 *
 * This is the static-repo counterpart of the WordPress theme's
 * js/contact-form.js - same validation, tooltip and result-popup behavior,
 * but with no server to submit to, so a "submission" just simulates a short
 * delay and always succeeds. Shared between the standalone Contact page
 * (form present at initial page load) and the injected popup on every other
 * page (js/contact-modal.js injects the same markup later and calls
 * window.soldInitContactForm() again on the injected root).
 *
 * Feedback never grows the form: per-field validation shows a floating
 * tooltip anchored to that field (see .field-error in css/contact.css), and
 * the result opens a small centered popup instead of an inline banner. A
 * visually-hidden live region mirrors both for screen readers.
 */
(function () {
    function initContactForm(root) {
        root = root || document;
        const form = root.querySelector('#sold-contact-form');
        if (!form || form.dataset.soldInit === '1') return;
        form.dataset.soldInit = '1';

        // Service interest checkboxes
        form.querySelectorAll('.service-checkbox').forEach(box => {
            box.addEventListener('click', function () {
                this.classList.toggle('selected');
            });
        });

        const submitBtn = form.querySelector('.btn-send-message');
        const submitBtnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
        const submitBtnDefaultLabel = submitBtnText ? submitBtnText.textContent : '';
        const srStatus = form.querySelector('.sold-sr-status');

        const announce = (message) => {
            if (srStatus) srStatus.textContent = message;
        };

        const setSubmitting = (isSubmitting) => {
            if (!submitBtn) return;
            submitBtn.disabled = isSubmitting;
            if (submitBtnText) {
                submitBtnText.textContent = isSubmitting ? 'SENDING...' : submitBtnDefaultLabel;
            }
        };

        // ---- Result popup (success) --------------------------------------
        const popup = root.querySelector('#contactResultPopup');
        if (popup && popup.dataset.soldInit !== '1') {
            popup.dataset.soldInit = '1';
            const hidePopup = () => popup.classList.remove('active');
            const closeBtn = popup.querySelector('.contact-result-popup-close');
            if (closeBtn) closeBtn.addEventListener('click', hidePopup);
            popup.addEventListener('click', (e) => {
                if (e.target === popup) hidePopup();
            });
        }

        const showResultPopup = (type, message) => {
            if (!popup) return;
            popup.classList.remove('is-success', 'is-error');
            popup.classList.add(type === 'success' ? 'is-success' : 'is-error');
            const iconEl = popup.querySelector('.contact-result-icon');
            if (iconEl) iconEl.textContent = type === 'success' ? '✓' : '!';
            const msgEl = popup.querySelector('.contact-result-message');
            if (msgEl) msgEl.textContent = message;
            popup.classList.add('active');
        };

        // ---- Per-field validation (floating tooltips, no layout shift) --
        const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Lenient on purpose (international formats vary a lot): just require
        // enough digits that it could plausibly be a real phone number.
        const PHONE_DIGITS_RE = /\d/g;

        const fieldError = (field) => form.querySelector('.field-error[data-error-for="' + field.name + '"]');

        const clearFieldError = (field) => {
            field.closest('.form-group').classList.remove('has-error');
            const errorEl = fieldError(field);
            if (errorEl) errorEl.textContent = '';
        };

        const showFieldError = (field, message) => {
            field.closest('.form-group').classList.add('has-error');
            const errorEl = fieldError(field);
            if (errorEl) errorEl.textContent = message;
        };

        // Clear a field's error the moment it becomes valid again, so fixing
        // one field doesn't require re-submitting to see it clear.
        form.querySelectorAll('[required]').forEach((field) => {
            field.addEventListener('input', () => {
                if (!fieldError(field)) return;
                if (field.type === 'email' && field.value.trim() && !EMAIL_RE.test(field.value.trim())) return;
                if (field.name === 'phone' && field.value.trim() && (field.value.match(PHONE_DIGITS_RE) || []).length < 7) return;
                if (!field.value.trim()) return;
                clearFieldError(field);
            });
        });

        const validate = () => {
            let firstInvalid = null;
            form.querySelectorAll('[required]').forEach((field) => {
                clearFieldError(field);
                const value = field.value.trim();
                let message = '';
                if (!value) {
                    message = 'This field is required.';
                } else if (field.type === 'email' && !EMAIL_RE.test(value)) {
                    message = 'Please enter a valid email address.';
                } else if (field.name === 'phone' && (value.match(PHONE_DIGITS_RE) || []).length < 7) {
                    message = 'Please enter a valid phone number.';
                }
                if (message) {
                    showFieldError(field, message);
                    if (!firstInvalid) firstInvalid = field;
                }
            });
            return firstInvalid;
        };

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const firstInvalid = validate();
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                announce('Please fix the highlighted fields.');
                return;
            }

            setSubmitting(true);
            announce('Sending...');

            // No backend in this static preview - simulate the round trip and
            // always succeed, so the confirmation UX can be reviewed locally.
            setTimeout(() => {
                const message = 'Thank you! We will be in touch shortly.';
                form.reset();
                form.querySelectorAll('.service-checkbox.selected').forEach(el => el.classList.remove('selected'));
                form.querySelectorAll('[required]').forEach(clearFieldError);
                setSubmitting(false);
                announce(message);
                showResultPopup('success', message);
            }, 500);
        });
    }

    window.soldInitContactForm = initContactForm;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initContactForm(document));
    } else {
        initContactForm(document);
    }
})();
