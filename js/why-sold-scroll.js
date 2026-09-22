document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // Our Team - Mobile Auto-Scroll Carousel
  // Same infinite-loop clone/slide technique as the testimonials carousel
  // (js/main.js / js/main-v2.js), scoped to its own selectors so it doesn't
  // touch or depend on that carousel.
  // ==========================================
  (function initTeamMobileCarousel() {
    const track = document.querySelector('.ws-team-mobile-track');
    const prevBtn = document.querySelector('.ws-team-prev-btn');
    const nextBtn = document.querySelector('.ws-team-next-btn');
    const dots = document.querySelectorAll('.ws-team-dots .dot');

    if (!track || !prevBtn || !nextBtn || !dots.length) return;

    let isAnimating = false;
    let currentIndex = 0;
    const numCards = dots.length;

    const updateDots = () => {
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

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
      const gap = isNaN(gapVal) ? 0 : gapVal;
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

    // Swipe support (mobile/touch) - same approach as the testimonials
    // carousel fix (js/main.js / js/main-v2.js): reuses the existing slide()
    // transition so a swipe animates identically to the buttons/auto-scroll
    // instead of running its own separate drag animation.
    let touchStartX = 0;
    let touchStartY = 0;
    const SWIPE_THRESHOLD = 40; // px - minimum horizontal distance to count as a swipe

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;

      // A mostly-vertical gesture is the user scrolling the page, not
      // swiping the carousel - leave it alone.
      if (Math.abs(deltaX) < Math.abs(deltaY)) return;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

      slide(deltaX < 0 ? 'next' : 'prev');
      resetAutoScroll();
    }, { passive: true });

    startAutoScroll();
  })();

  // ==========================================
  // Client Arc Rotation and Interaction Logic
  // ==========================================
  const clientsSection = document.querySelector('.ws-clients-section');
  const arcContainer = document.querySelector('.ws-clients-arc-container');
  const originalLogos = Array.from(document.querySelectorAll('.ws-client-logo'));

  if (clientsSection && arcContainer && originalLogos.length > 0) {
    // Clear container to rebuild dynamically
    arcContainer.innerHTML = '';

    // The original DOM order is 1 to 9.
    // Visually clockwise from left to right they are: 5, 4, 3, 2, 1, 6, 7, 8, 9
    // Original indices (0-based): 4, 3, 2, 1, 0, 5, 6, 7, 8
    const clockwiseIndices = [4, 3, 2, 1, 0, 5, 6, 7, 8];
    // Duplicate to complete 360 degrees (18 logos * 20 degrees = 360)
    const fullCircleIndices = [...clockwiseIndices, ...clockwiseIndices];

    const activeLogos = [];
    const radius = 530;
    const centerX = 612; // 1224 / 2
    const centerY = 600; // Match CSS transform-origin
    const startAngle = -170; // Degrees for the left-most logo (Logo 5)

    const positionMobileLogo = (logo, i) => {
      const radiusVw = 51.1;
      const centerXVw = 60.38;
      const centerYVw = 68.14;
      const halfWidthVw = 9.16;

      const initialAngle = -150 + (i * 30);
      const angleRad = initialAngle * (Math.PI / 180);
      const xVw = centerXVw + radiusVw * Math.cos(angleRad) - halfWidthVw;
      const yVw = centerYVw + radiusVw * Math.sin(angleRad) - halfWidthVw;

      logo.style.left = `${xVw}vw`;
      logo.style.top = `${yVw}vw`;
      // transform will be handled in updateRotation
    };

    // Width at which the arc switches from the mobile masked wheel to the wide
    // web arc. This MUST track the mobile/web split in css/why-sold.css (767/768),
    // because the two layouts use different coordinate systems - the web rules
    // size the container and its transform-origin in cqi while the mobile ones
    // position the logos in vw. When this sat at 992 the 768-991px range got web
    // CSS with mobile logo positions, and the wheel did not form an arc at all.
    const ARC_WEB_MIN_WIDTH = 768;
    const isWebArc = () => window.innerWidth >= ARC_WEB_MIN_WIDTH;

    const testimonialText = document.querySelector('.ws-testimonial-text');


    const testimonials = [
      "Over the last 2 decades, we’ve helped developers worldwide build brands, sell out projects, and enter new markets. We treat every launch as if it were our own.",
      "Our partnership with Banyan Group has redefined luxury living, establishing new standards in the global real estate market.",
      "AYAT relies on our expertise to consistently deliver high-yield investment properties and secure the best deals in the region.",
      "Collaborating with Regus allowed us to optimize commercial spaces for modern businesses across key international hubs.",
      "Betterhomes trusts our targeted demand generation strategies to keep their sales pipeline full all year round.",
      "SOBHA’s iconic projects are powered by our innovative marketing campaigns, leading to record-breaking launch sales.",
      "Mashriq Elite chose us to elevate their brand presence, resulting in unmatched visibility among high-net-worth investors.",
      "Knight Frank’s global reach combined with our local market insights creates a powerful synergy for property marketing.",
      "Cushman & Wakefield leverages our SEO and PR services to dominate the commercial real estate discourse."
    ];

    // For mobile, we use 12 logos spaced by exactly 30 degrees to create a perfect circle with 30px uniform gaps
    const mobileIndices = [...clockwiseIndices, clockwiseIndices[0], clockwiseIndices[1], clockwiseIndices[2]];
    const loopIndices = isWebArc() ? fullCircleIndices : mobileIndices;

    loopIndices.forEach((origIndex, i) => {
      // Clone original DOM node
      const clone = originalLogos[origIndex].cloneNode(true);

      // Calculate circular position
      const angleMultiplier = isWebArc() ? 20 : 30; // Mobile exactly 30 degrees apart (12 logos = 360 deg)
      const startAngleMobile = -150; // i=2 (Center) will be at -150 + 60 = -90 degrees (top dead center)
      const angleDeg = (isWebArc() ? startAngle : startAngleMobile) + (i * angleMultiplier);
      const angleRad = angleDeg * (Math.PI / 180);

      if (isWebArc()) {
        // Web: Calculate in CQI to match container scaling flawlessly
        const radiusCqi = 36.8056; // 530 / 1440 * 100
        const centerXCqi = 42.5;   // 612 / 1440 * 100
        const centerYCqi = 41.6667; // 600 / 1440 * 100
        const halfWidthCqi = 4.9306; // 71 / 1440 * 100

        const xCqi = centerXCqi + radiusCqi * Math.cos(angleRad) - halfWidthCqi;
        const yCqi = centerYCqi + radiusCqi * Math.sin(angleRad) - halfWidthCqi;

        clone.style.left = `${xCqi}cqi`;
        clone.style.top = `${yCqi}cqi`;
      } else {
        positionMobileLogo(clone, i);
      }

      arcContainer.appendChild(clone);
      activeLogos.push(clone);

      // Click interaction
      clone.addEventListener('click', () => {
        // Swallow the click the browser fires at the end of a finger-drag, so
        // spinning the wheel does not also switch the testimonial underneath.
        // (dragMoved is owned by the manual-rotation block further down.)
        if (dragMoved) return;

        activeLogos.forEach(l => l.classList.remove('active'));
        clone.classList.add('active');

        const testimonialBlock = document.querySelector('.ws-client-testimonial');

        if (testimonialText && testimonials[origIndex] && testimonialBlock) {
          // Remove class to reset animation
          testimonialBlock.classList.remove('animating');

          // Force DOM reflow to restart animation
          void testimonialBlock.offsetWidth;

          // Update text (it is invisible instantly due to .animating class)
          testimonialText.innerText = testimonials[origIndex];

          // Trigger the animation sequence
          testimonialBlock.classList.add('animating');
        }
      });
    });

    let currentRotation = 0;
    let targetRotation = 0;
    let isRequestingAnimation = false;

    // ------------------------------------------------------------------
    // Manual rotation by finger - mobile + tablet only
    // ------------------------------------------------------------------
    // Below 992px - i.e. every touch-sized viewport, phone and tablet alike -
    // the wheel can be grabbed and spun. Deliberately NOT the same number as
    // ARC_WEB_MIN_WIDTH above: that one picks which arc *layout* to draw (tablet
    // uses the web arc), this one picks which viewports get *touch* dragging
    // (tablet does). While a finger is driving it the
    // scroll-linked rotation is suspended, and whatever the user turns it by
    // is kept as an offset - so on release the wheel carries on from where
    // they left it instead of snapping back to the scroll position.
    const MANUAL_MAX_WIDTH = 992;
    const DRAG_COMMIT_PX = 6;    // movement before we decide rotate-vs-page-scroll

    let isDragging = false;      // finger down AND committed to rotating
    let dragCommitted = null;    // null | 'rotate' | 'scroll'
    let dragMoved = false;       // read by the logo click handler above
    let manualOffset = 0;        // degrees contributed by the user so far
    let dragStartOffset = 0;
    let dragStartRotation = 0;
    let dragStartAngle = 0;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragCentre = { x: 0, y: 0 };

    const isManualWidth = () => window.innerWidth < MANUAL_MAX_WIDTH;

    const applyRotation = (deg) => {
      // Hardware accelerated group rotation for both web and mobile
      arcContainer.style.transform = `rotate(${deg}deg)`;

      activeLogos.forEach(logo => {
        logo.style.transform = `rotate(${-deg}deg)`;
      });
    };

    // The transform-origin is the one point that does NOT move while the arc
    // is rotated, but getBoundingClientRect() reports the rotated bounding
    // box - so read the box with the transform momentarily off to locate that
    // point exactly. Nothing paints in between, so there is no flicker.
    const getRotationCentre = () => {
      const previous = arcContainer.style.transform;
      arcContainer.style.transform = 'none';
      const rect = arcContainer.getBoundingClientRect();
      const origin = window.getComputedStyle(arcContainer).transformOrigin.split(' ');
      arcContainer.style.transform = previous;

      return {
        x: rect.left + parseFloat(origin[0]),
        y: rect.top + parseFloat(origin[1])
      };
    };

    const angleFromPoint = (x, y) =>
      Math.atan2(y - dragCentre.y, x - dragCentre.x) * (180 / Math.PI);

    // ------------------------------------------------------------------
    // Hover pause - web/desktop only, independent of dragging. Hovering just
    // freezes handleScrollRotate() from moving the target angle any further;
    // it does not need to touch updateRotation()'s own easing loop, which
    // naturally settles once the target stops changing.
    // ------------------------------------------------------------------
    let isHovering = false;

    arcContainer.addEventListener('mouseenter', () => {
      isHovering = true;
    });

    arcContainer.addEventListener('mouseleave', () => {
      isHovering = false;
      // Resume immediately from the current scroll position rather than
      // waiting for the next scroll event.
      handleScrollRotate();
    });

    const updateRotation = () => {
      // A finger/mouse owns the rotation while it is down - drop the eased loop.
      if (isDragging) {
        isRequestingAnimation = false;
        return;
      }

      currentRotation += (targetRotation - currentRotation) * 0.08;
      applyRotation(currentRotation);

      if (Math.abs(targetRotation - currentRotation) > 0.05) {
        requestAnimationFrame(updateRotation);
      } else {
        currentRotation = targetRotation;
        applyRotation(currentRotation);

        isRequestingAnimation = false;
      }
    };

    const handleScrollRotate = () => {
      // Automatic (scroll-linked) rotation is paused while the user drags,
      // and also while the mouse is hovering the wheel (web/desktop).
      if (isDragging || isHovering) return;

      const rect = clientsSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalScrollDistance = windowHeight + rect.height;
        const scrolledDistance = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolledDistance / totalScrollDistance));
        // Matches the arc geometry in use, so tablet gets the web sweep too.
        const isMobileArc = !isWebArc();
        const rotationRange = isMobileArc ? 160 : 120; // 4 logo positions on mobile (40 deg each)
        const rotationOffset = isMobileArc ? 20 : 15;
        targetRotation = -(progress * rotationRange) + rotationOffset + manualOffset;

        if (!isRequestingAnimation) {
          isRequestingAnimation = true;
          requestAnimationFrame(updateRotation);
        }
      }
    };

    // Shared start/move logic for both finger (touch) and mouse (web/desktop)
    // dragging - takes plain coordinates so either input type can drive it.
    const startDrag = (x, y) => {
      dragCommitted = null;
      dragMoved = false;
      dragStartX = x;
      dragStartY = y;
      dragCentre = getRotationCentre();
      dragStartAngle = angleFromPoint(x, y);
      dragStartOffset = manualOffset;
      dragStartRotation = targetRotation;
    };

    // Returns true if the move should be treated as rotating the wheel (so
    // the caller knows whether to preventDefault the page scroll/selection).
    const moveDrag = (x, y) => {
      if (dragCommitted === null) {
        const dx = x - dragStartX;
        const dy = y - dragStartY;

        if (Math.abs(dx) < DRAG_COMMIT_PX && Math.abs(dy) < DRAG_COMMIT_PX) return false;

        // A mostly-vertical gesture is the user scrolling the page, not
        // spinning the wheel - the same rule the carousels in this file use.
        // Hand it straight back to the browser and leave the arc alone.
        dragCommitted = Math.abs(dx) >= Math.abs(dy) ? 'rotate' : 'scroll';
        if (dragCommitted === 'rotate') isDragging = true;
      }

      if (dragCommitted !== 'rotate') return false;

      let delta = angleFromPoint(x, y) - dragStartAngle;

      // atan2 wraps at +-180 - keep the delta on the short way round so
      // crossing that seam does not fling the wheel a whole turn.
      while (delta > 180) delta -= 360;
      while (delta < -180) delta += 360;

      if (Math.abs(delta) > 0.5) dragMoved = true;

      manualOffset = dragStartOffset + delta;
      targetRotation = dragStartRotation + delta;

      // Follow the finger/cursor 1:1 - no easing lag while dragging.
      currentRotation = targetRotation;
      applyRotation(currentRotation);
      return true;
    };

    const endDrag = () => {
      if (isDragging) {
        isDragging = false;

        // Resume the automatic rotation from wherever the user left it.
        if (!isRequestingAnimation) {
          isRequestingAnimation = true;
          requestAnimationFrame(updateRotation);
        }
      }

      dragCommitted = null;
    };

    // ---- Touch (finger) - mobile + tablet only, per isManualWidth() -------
    arcContainer.addEventListener('touchstart', (e) => {
      if (!isManualWidth() || e.touches.length !== 1) return;
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    }, { passive: true });

    arcContainer.addEventListener('touchmove', (e) => {
      if (!isManualWidth() || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const rotating = moveDrag(touch.clientX, touch.clientY);
      // Keep the page still while the wheel is being spun.
      if (rotating) e.preventDefault();
    }, { passive: false });

    arcContainer.addEventListener('touchend', endDrag, { passive: true });
    arcContainer.addEventListener('touchcancel', endDrag, { passive: true });

    // ---- Mouse (web/desktop) - client asked for manual rotate/swipe here
    // too, in addition to the hover-pause above. Window-level move/up so a
    // fast drag that leaves the wheel's own bounds still resolves correctly,
    // the same reason the touch version isn't scoped to isManualWidth() any
    // narrower than it already is. ----
    const onMouseMove = (e) => {
      const rotating = moveDrag(e.clientX, e.clientY);
      if (rotating) e.preventDefault();
    };

    const onMouseUp = () => {
      endDrag();
      arcContainer.style.cursor = 'grab';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    arcContainer.addEventListener('mousedown', (e) => {
      // Only the primary button starts a drag.
      if (e.button !== 0) return;
      startDrag(e.clientX, e.clientY);
      arcContainer.style.cursor = 'grabbing';
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    arcContainer.style.cursor = 'grab';

    window.addEventListener('scroll', handleScrollRotate, { passive: true });
    handleScrollRotate();
  }
});
