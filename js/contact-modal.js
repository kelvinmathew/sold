/**
 * Contact Popup Modal (Web Only)
 *
 * Single source of truth: the modal markup lives only in contact.html
 * (#contactModal). This script fetches that page, pulls the modal out of it,
 * and injects it into the current page - so every page that wants the popup
 * gets it without duplicating the HTML. Editing the contact form/content only
 * ever needs to happen in contact.html.
 *
 * Opens over the current page instead of navigating away, so closing it
 * returns to the same page/scroll position.
 */
(function () {
    const triggers = document.querySelectorAll('[data-contact-trigger]');
    if (!triggers.length) return; // this page has no contact trigger, nothing to do

    let contactModal = null;
    let modalReady = false;
    let savedScrollY = 0;

    // Lock the background page via position:fixed rather than overflow:hidden -
    // toggling overflow alone resets window.scrollY to 0 on close in most browsers,
    // which would break "return to the exact position" requirement.
    const openContactModal = () => {
        // The mobile drawer is position:fixed and sits above the page, so it
        // has to be closed before the popup opens or it covers it.
        const drawer = document.getElementById('mobileMenu');
        if (drawer) {
            drawer.classList.remove('open');
        }
        savedScrollY = window.scrollY || window.pageYOffset || 0;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        contactModal.classList.add('active');
    };

    const closeContactModal = () => {
        contactModal.classList.remove('active');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        window.scrollTo(0, savedScrollY);
    };

    const wireUpModal = () => {
        const contactCloseBtns = contactModal.querySelectorAll('.contact-modal-close, .contact-modal-close-mobile');
        contactCloseBtns.forEach((contactClose) => {
            contactClose.addEventListener('click', (e) => {
                e.preventDefault();
                closeContactModal();
            });
        });

        // Click on the dimmed backdrop (outside the modal card) closes it
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) closeContactModal();
        });

        // Escape key closes it
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactModal.classList.contains('active')) {
                closeContactModal();
            }
        });

        // Wire the form (checkboxes, validation tooltips, result popup) on
        // the injected instance - see js/contact-form-local.js.
        if (typeof window.soldInitContactForm === 'function') {
            window.soldInitContactForm(contactModal);
        }

        modalReady = true;
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // The popup now opens at every width, including from the mobile
            // drawer. If the fetch below hasn't resolved yet, fall through to
            // normal navigation to contact.html rather than swallowing the
            // click and leaving the user with nothing.
            if (!modalReady) return;
            e.preventDefault();
            openContactModal();
        });
    });

    fetch('contact.html')
        .then(res => res.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const modal = doc.getElementById('contactModal');
            if (!modal) return;
            modal.classList.remove('active');
            document.body.appendChild(modal);
            contactModal = modal;
            wireUpModal();
        })
        .catch(err => console.error('Contact modal failed to load:', err));
})();
