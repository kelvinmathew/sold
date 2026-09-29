/**
 * SOLD Real Estate Website - Main JavaScript (Home page)
 * Custom Vanilla JS Interactions
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('SOLD Frontend Initialized');

    // Header: the tall header is position:absolute and simply scrolls away
    // with the page like any other content - no JS needed for that part.
    // Once the user has scrolled well past it, swap in a separate, shorter
    // "is-compact" fixed bar instead of leaving nothing pinned at the top.
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        const COMPACT_THRESHOLD = 200; // px - clears the 144px tall header, then a bit more
        const updateHeaderCompact = () => {
            siteHeader.classList.toggle('is-compact', window.scrollY > COMPACT_THRESHOLD);
        };
        updateHeaderCompact();
        window.addEventListener('scroll', updateHeaderCompact, { passive: true });
    }

    // FAQ Accordion Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionDiv = item.querySelector('.faq-question');
        if (questionDiv) {
            const toggleFaq = () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const q = faqItem.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                });
                if (!isActive) {
                    item.classList.add('active');
                    questionDiv.setAttribute('aria-expanded', 'true');
                }
            };
            questionDiv.addEventListener('click', toggleFaq);
            questionDiv.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFaq();
                }
            });
        }
    });

    // Services Accordion Interaction
    const serviceItems = document.querySelectorAll('.service-list-item');

    serviceItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const isMobile = window.innerWidth < 768;

            if (isMobile) {
                const prevTop = item.getBoundingClientRect().top;

                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                } else {
                    serviceItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                }

                const newTop = item.getBoundingClientRect().top;
                if (newTop !== prevTop) {
                    window.scrollBy({ top: newTop - prevTop, behavior: 'instant' });
                }
            } else {
                if (item.classList.contains('active')) return;
                serviceItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    if (window.innerWidth < 768) {
        serviceItems.forEach(i => i.classList.remove('active'));
    }

    // Mobile Offcanvas Drawer Toggle (Move in Right Ease out 300ms)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.add('open');
        });
    }
    if (closeMobileMenu && mobileMenu) {
        closeMobileMenu.addEventListener('click', (e) => {
            e.preventDefault();
            mobileMenu.classList.remove('open');
        });
    }

    // Close offcanvas when clicking any navigation link (the Services
    // trigger is excluded - it only opens the dropdown, it never navigates)
    const offcanvasLinks = document.querySelectorAll('.offcanvas-link');
    offcanvasLinks.forEach(link => {
        if (link.hasAttribute('data-nav-dropdown-toggle')) return;
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.remove('open');
            }
        });
    });

    // Services Nav Dropdown (Desktop) - hovering (CSS :hover) or clicking
    // either the "Services" label or the arrow only reveals the dropdown;
    // the label itself never navigates to services.html (use "All Services"
    // inside the dropdown for that).
    document.querySelectorAll('.nav-item-dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        const label = dropdown.querySelector('[data-nav-dropdown-toggle]');
        if (!toggle) return;
        const toggleDropdown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        };
        toggle.addEventListener('click', toggleDropdown);
        if (label) label.addEventListener('click', toggleDropdown);
    });

    document.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-item-dropdown.open').forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
                const toggle = dropdown.querySelector('.nav-dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.nav-item-dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
                const toggle = dropdown.querySelector('.nav-dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Services Offcanvas Dropdown (Mobile) - tapping the "Services" label or
    // the arrow only expands the submenu, it never navigates.
    document.querySelectorAll('.offcanvas-item-dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.offcanvas-dropdown-toggle');
        const label = dropdown.querySelector('[data-nav-dropdown-toggle]');
        if (!toggle) return;
        const toggleDropdown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        };
        toggle.addEventListener('click', toggleDropdown);
        if (label) label.addEventListener('click', toggleDropdown);
    });

    // Contact Popup Modal (Web Only) - handled by js/contact-modal.js, which
    // fetches the modal markup from contact.html so it only needs to be
    // edited in one place.

    // Testimonials Carousel (Web Only)
    const track = document.querySelector('.testimonials-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.carousel-dots-center .dot');

    let activeDots = Array.from(dots).filter(d => !d.classList.contains('mobile-only-dot'));

    if (track && prevBtn && nextBtn) {
        let isAnimating = false;
        let currentIndex = 0;
        const numCards = activeDots.length;

        const updateDots = () => {
            if (!activeDots.length) return;
            activeDots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        if (window.innerWidth < 768) {
            const firstCard = track.children[0];
            if (firstCard) {
                track.appendChild(firstCard);
            }
        }

        track.style.justifyContent = 'flex-start';

        const slide = (direction) => {
            if (isAnimating) return;
            isAnimating = true;

            const cards = Array.from(track.children);
            if (cards.length === 0) {
                isAnimating = false;
                return;
            }

            const style = window.getComputedStyle(track);
            const gapVal = parseFloat(style.gap);
            const gap = isNaN(gapVal) ? 16 : gapVal;
            const moveAmount = cards[0].offsetWidth + gap;

            if (direction === 'next') {
                currentIndex = (currentIndex + 1) % numCards;
                updateDots();

                const clone = cards[0].cloneNode(true);
                track.appendChild(clone);

                track.style.transition = 'transform 0.4s ease';
                track.style.transform = `translateX(-${moveAmount}px)`;

                setTimeout(() => {
                    track.style.transition = 'none';
                    track.removeChild(track.firstElementChild);
                    track.style.transform = 'translateX(0)';
                    isAnimating = false;
                }, 400);
            } else {
                currentIndex = (currentIndex - 1 + numCards) % numCards;
                updateDots();

                const clone = track.lastElementChild.cloneNode(true);
                track.prepend(clone);

                track.style.transition = 'none';
                track.style.transform = `translateX(-${moveAmount}px)`;

                void track.offsetWidth; // Force reflow

                track.style.transition = 'transform 0.4s ease';
                track.style.transform = 'translateX(0)';

                setTimeout(() => {
                    track.style.transition = 'none';
                    track.removeChild(track.lastElementChild);
                    isAnimating = false;
                }, 400);
            }
        };

        let autoScrollInterval;

        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                slide('next');
            }, 3500);
        };

        const resetAutoScroll = () => {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        };

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            slide('next');
            resetAutoScroll();
        });

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            slide('prev');
            resetAutoScroll();
        });

        let touchStartX = 0;
        let touchStartY = 0;
        const SWIPE_THRESHOLD = 40;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            const deltaX = e.changedTouches[0].clientX - touchStartX;
            const deltaY = e.changedTouches[0].clientY - touchStartY;

            if (Math.abs(deltaX) < Math.abs(deltaY)) return;
            if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

            slide(deltaX < 0 ? 'next' : 'prev');
            resetAutoScroll();
        }, { passive: true });

        // Two-finger trackpad swipe (web only). Replaces the previous
        // click-and-drag interaction - a trackpad two-finger swipe fires
        // "wheel" events with a horizontal deltaX (this never happens from a
        // touchscreen finger swipe, which fires touch events instead - see
        // the touchstart/touchend block above, untouched), so this is
        // naturally web/desktop-only without needing a width check.
        //
        // One physical swipe gesture fires many small wheel events in quick
        // succession, not a single clean one - deltaX is accumulated across
        // the gesture (reset after a brief pause with no wheel events) and
        // only acted on once the total crosses the threshold, then a short
        // cooldown swallows the rest of that same gesture's leftover events
        // so it can't fire two slides for one swipe.
        const WHEEL_SWIPE_THRESHOLD = 50;
        const WHEEL_GESTURE_IDLE_MS = 150;
        const WHEEL_COOLDOWN_MS = 500;
        let wheelAccumX = 0;
        let wheelIdleTimer = null;
        let wheelCooldown = false;

        track.addEventListener('wheel', (e) => {
            // A mostly-vertical gesture is the user scrolling the page, not
            // swiping the carousel - leave it (and the page's own scroll)
            // alone entirely.
            if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;

            e.preventDefault();
            if (wheelCooldown) return;

            wheelAccumX += e.deltaX;
            clearTimeout(wheelIdleTimer);
            wheelIdleTimer = setTimeout(() => { wheelAccumX = 0; }, WHEEL_GESTURE_IDLE_MS);

            if (Math.abs(wheelAccumX) < WHEEL_SWIPE_THRESHOLD) return;

            slide(wheelAccumX > 0 ? 'next' : 'prev');
            resetAutoScroll();
            wheelAccumX = 0;
            wheelCooldown = true;
            setTimeout(() => { wheelCooldown = false; }, WHEEL_COOLDOWN_MS);
        }, { passive: false });

        startAutoScroll();
    }

    // Mobile Insights Carousel Pagination
    const insightsCards = document.querySelectorAll('.insights-cards-container > div');
    const insightsDots = document.querySelectorAll('.insight-dot');
    const insightsContainer = document.querySelector('.insights-cards-container');

    if (insightsCards.length > 0 && insightsDots.length > 0 && insightsContainer) {
        const updateDotsOnScroll = () => {
            const scrollLeft = insightsContainer.scrollLeft;
            const cardWidth = insightsCards[0].offsetWidth;
            const gap = 26;
            const index = Math.round(scrollLeft / (cardWidth + gap));

            insightsDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        insightsContainer.addEventListener('scroll', updateDotsOnScroll, { passive: true });
        updateDotsOnScroll();

        insightsDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (insightsCards[index]) {
                    insightsContainer.scrollTo({
                        left: insightsCards[index].offsetLeft - insightsContainer.offsetLeft,
                        behavior: 'smooth',
                    });
                }
            });
        });
    }

    // Steps Timeline Animation on Scroll (Web Only)
    const stepsContainer = document.querySelector('.steps-container');
    const highlightLine = document.querySelector('.step-highlight-line');
    const stepCards = document.querySelectorAll('.step-card');
    const stepCircles = document.querySelectorAll('.step-circle');

    if (stepsContainer && highlightLine && stepCards.length > 0 && window.innerWidth >= 768) {
        const getPositions = () => {
            const containerRect = stepsContainer.getBoundingClientRect();
            const circleCenters = [];
            stepCircles.forEach(circle => {
                const circleRect = circle.getBoundingClientRect();
                circleCenters.push(circleRect.top - containerRect.top + circleRect.height / 2);
            });
            const lineStart = circleCenters[0] || 0;
            const lastLine = document.querySelector('.step-line-3');
            let lineEnd = stepsContainer.offsetHeight;
            if (lastLine && lastLine.offsetHeight > 0) {
                const lastLineRect = lastLine.getBoundingClientRect();
                lineEnd = lastLineRect.top - containerRect.top + lastLineRect.height;
            } else {
                const firstLine = document.querySelector('.step-line-1');
                if (firstLine && firstLine.offsetHeight > 0) {
                    const firstLineRect = firstLine.getBoundingClientRect();
                    lineEnd = firstLineRect.top - containerRect.top + firstLineRect.height;
                }
            }
            const maxLineHeight = Math.max(10, lineEnd - lineStart);
            return { circleCenters, lineStart, lineEnd, maxLineHeight };
        };

        let positions = getPositions();
        window.addEventListener('load', () => { positions = getPositions(); updateStepsAnimation(); });
        window.addEventListener('resize', () => { positions = getPositions(); updateStepsAnimation(); });

        let ticking = false;

        const updateStepsAnimation = () => {
            const containerRect = stepsContainer.getBoundingClientRect();
            const triggerY = window.innerHeight * 0.5;

            const scrollProgress = triggerY - containerRect.top;

            let lineHeight = scrollProgress - positions.lineStart;
            if (window.innerWidth < 768) {
                lineHeight *= 1.15;
            }
            lineHeight = Math.max(0, Math.min(lineHeight, positions.maxLineHeight));
            highlightLine.style.height = lineHeight + 'px';

            for (let i = 0; i < stepCards.length; i++) {
                const threshold = positions.circleCenters[i];
                if (scrollProgress >= threshold) {
                    stepCircles[i].classList.add('filled');
                    stepCards[i].classList.add('visible');
                } else {
                    stepCircles[i].classList.remove('filled');
                    stepCards[i].classList.remove('visible');
                }
            }

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateStepsAnimation);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        updateStepsAnimation();
    }
});
