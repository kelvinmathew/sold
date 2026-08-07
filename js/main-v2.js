/**
 * SOLD Real Estate Website - Main JavaScript
 * Custom Vanilla JS Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('SOLD Frontend Initialized');

    // FAQ Accordion Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionDiv = item.querySelector('.faq-question');
        if (questionDiv) {
            const toggleFaq = () => {
                const isActive = item.classList.contains('active');
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const q = faqItem.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                });
                // If clicked item wasn't active, open it
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
                // Mobile: toggle open/close, only one open at a time
                const prevTop = item.getBoundingClientRect().top;

                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                } else {
                    serviceItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                }

                // If the layout shift caused the item to move on screen (e.g. card above closed),
                // instantly scroll to perfectly offset the shift. The item stays exactly under the user's finger.
                const newTop = item.getBoundingClientRect().top;
                if (newTop !== prevTop) {
                    window.scrollBy({ top: newTop - prevTop, behavior: 'instant' });
                }
            } else {
                // Desktop: existing behavior
                if (item.classList.contains('active')) return;
                serviceItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });

    // On mobile, remove initial active class so all cards start closed
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
    
    // Close offcanvas when clicking any navigation link
    const offcanvasLinks = document.querySelectorAll('.offcanvas-link');
    offcanvasLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.remove('open');
            }
        });
    });

    // Testimonials Carousel (Web Only)
    const track = document.querySelector('.testimonials-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.carousel-dots-center .dot');
    
    let activeDots = Array.from(dots);
    if (window.innerWidth >= 768) {
        activeDots = activeDots.filter(d => !d.classList.contains('mobile-only-dot'));
    }
    
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

        // Reorder on mobile to show the second card (Ellington) first
        if (window.innerWidth < 768) {
            const firstCard = track.children[0];
            if (firstCard) {
                track.appendChild(firstCard);
            }
        }

        // Fix layout for seamless sliding by preventing auto-centering
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
                // Update dots immediately so they move with the cards
                currentIndex = (currentIndex + 1) % numCards;
                updateDots();

                // Clone the first card and append it to the end
                const clone = cards[0].cloneNode(true);
                track.appendChild(clone);

                // Animate slide left
                track.style.transition = 'transform 0.4s ease';
                track.style.transform = `translateX(-${moveAmount}px)`;

                setTimeout(() => {
                    track.style.transition = 'none';
                    // Remove the original first card
                    track.removeChild(track.firstElementChild);
                    track.style.transform = 'translateX(0)';
                    isAnimating = false;
                }, 400);
            } else {
                // Update dots immediately so they move with the cards
                currentIndex = (currentIndex - 1 + numCards) % numCards;
                updateDots();

                // Clone the last card and prepend it to the start
                const clone = track.lastElementChild.cloneNode(true);
                track.prepend(clone);
                
                // Offset instantly so visual position doesn't change
                track.style.transition = 'none';
                track.style.transform = `translateX(-${moveAmount}px)`;
                
                void track.offsetWidth; // Force reflow

                // Animate slide right back to 0
                track.style.transition = 'transform 0.4s ease';
                track.style.transform = 'translateX(0)';

                setTimeout(() => {
                    track.style.transition = 'none';
                    // Remove the original last card (which is now pushed one spot right)
                    track.removeChild(track.lastElementChild);
                    isAnimating = false;
                }, 400);
            }
        };

        let autoScrollInterval;

        const startAutoScroll = () => {
            // Auto-scroll on all devices
            autoScrollInterval = setInterval(() => {
                slide('next');
            }, 3500); // 3.5 seconds
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

        // Initialize auto-scroll
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
            const gap = 26; // Match CSS gap
            // Calculate which card is currently most visible
            const index = Math.round(scrollLeft / (cardWidth + gap));
            
            insightsDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        // Listen for scroll events to update immediately without delay
        insightsContainer.addEventListener('scroll', updateDotsOnScroll, { passive: true });
        
        // Initial setup
        updateDotsOnScroll();
        
        // Allow clicking dots to scroll to that card
        insightsDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (insightsCards[index]) {
                    insightsContainer.scrollTo({
                        left: insightsCards[index].offsetLeft - insightsContainer.offsetLeft,
                        behavior: 'smooth'
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

    const isServicesPage = document.body.classList.contains('services-page-body');
    const isWhySoldPage = document.body.classList.contains('why-sold-page-body');
    const isClientSuccessPage = document.body.classList.contains('client-success-page-body');
    if (stepsContainer && highlightLine && stepCards.length > 0 && (window.innerWidth >= 768 || isServicesPage || isWhySoldPage || isClientSuccessPage)) {
        // Dynamically calculate circle centers from DOM for responsiveness
        const getPositions = () => {
            const containerRect = stepsContainer.getBoundingClientRect();
            const circleCenters = [];
            stepCircles.forEach(circle => {
                const circleRect = circle.getBoundingClientRect();
                circleCenters.push(circleRect.top - containerRect.top + circleRect.height / 2);
            });
            // Line starts at center of first circle
            const lineStart = circleCenters[0] || 0;
            const lastLine = document.querySelector('.step-line-3');
            let lineEnd = stepsContainer.offsetHeight; // default to container height
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
        // Recalculate on load (after images/fonts render) and resize for responsiveness
        window.addEventListener('load', () => { positions = getPositions(); updateStepsAnimation(); });
        window.addEventListener('resize', () => { positions = getPositions(); updateStepsAnimation(); });

        let ticking = false;

        const updateStepsAnimation = () => {
            const containerRect = stepsContainer.getBoundingClientRect();
            // Use 50% of viewport on desktop and services/why-sold page mobile (same behavior as web)
            // Use 75% on other mobile pages so it triggers earlier
            const triggerY = (window.innerWidth < 768 && !isServicesPage && !isWhySoldPage) ? window.innerHeight * 0.75 : window.innerHeight * 0.5;

            // How far into the container the trigger scanline has reached
            const scrollProgress = triggerY - containerRect.top;

            // --- Yellow highlight line ---
            let lineHeight = scrollProgress - positions.lineStart;
            if (window.innerWidth < 768) {
                lineHeight *= 1.15; // Fill slightly faster on mobile so it completes before page hits bottom
            }
            lineHeight = Math.max(0, Math.min(lineHeight, positions.maxLineHeight));
            highlightLine.style.height = lineHeight + 'px';

            // --- Circles & Cards ---
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
        // Run once on load
        updateStepsAnimation();
    }
});
