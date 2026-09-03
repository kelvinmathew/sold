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
    const DESKTOP_BREAKPOINT = 992;

    const triggers = document.querySelectorAll('[data-contact-trigger]');
    if (!triggers.length) return; // this page has no contact trigger, nothing to do

    let contactModal = null;
    let modalReady = false;
    let savedScrollY = 0;

    // Lock the background page via position:fixed rather than overflow:hidden -
    // toggling overflow alone resets window.scrollY to 0 on close in most browsers,
    // which would break "return to the exact position" requirement.
    const openContactModal = () => {
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
        const contactClose = contactModal.querySelector('.contact-modal-close');
        if (contactClose) {
            contactClose.addEventListener('click', (e) => {
                e.preventDefault();
                closeContactModal();
            });
        }

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

        // Service interest checkboxes (same behavior as the standalone contact page)
        contactModal.querySelectorAll('.service-checkbox').forEach(box => {
            box.addEventListener('click', function () {
                this.classList.toggle('selected');
            });
        });

        modalReady = true;
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Mobile has no Contact popup UI, so the button must do nothing at
            // all - no popup, and no falling through to contact.html either.
            if (window.innerWidth < DESKTOP_BREAKPOINT) {
                e.preventDefault();
                return;
            }
            // If the fetch below hasn't resolved yet, fall through to the
            // normal navigation rather than swallowing the click.
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
