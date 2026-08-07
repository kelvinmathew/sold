document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.ws-about-section');
  const stackContainer = document.getElementById('ws-cards-stack');
  
  if (!section || !stackContainer) return;

  let currentPhase = 0;
  let isLocked = false;
  let isAnimating = false;

  // Initialize phase 0 on load
  stackContainer.classList.add('scroll-phase-0');

  function setPhase(phase) {
    stackContainer.classList.remove('scroll-phase-0', 'scroll-phase-1', 'scroll-phase-2');
    stackContainer.classList.add(`scroll-phase-${phase}`);
    currentPhase = phase;
  }

  function handleWheel(e) {
    if (window.innerWidth < 992) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (isLocked) {
      if (e.preventDefault) e.preventDefault(); // Stop native scrolling
      
      if (isAnimating) return; // Wait for CSS transition to complete

      if (e.deltaY > 0) {
        // Scrolling Down
        if (currentPhase < 2) {
          isAnimating = true;
          setPhase(currentPhase + 1);
          setTimeout(() => { isAnimating = false; }, 1100); // 600ms transition + buffer
        } else {
          // Animation finished, unlock and allow natural scroll
          isLocked = false;
          // Add a small delay so we don't immediately relock from momentum
          isAnimating = true;
          setTimeout(() => { isAnimating = false; }, 500);
        }
      } else if (e.deltaY < 0) {
        // Scrolling Up
        if (currentPhase > 0) {
          isAnimating = true;
          setPhase(currentPhase - 1);
          setTimeout(() => { isAnimating = false; }, 1100);
        } else {
          // Animation finished in reverse, unlock and allow natural scroll
          isLocked = false;
          isAnimating = true;
          setTimeout(() => { isAnimating = false; }, 500);
        }
      }
    } else {
      // If we are NOT locked, check if we SHOULD lock
      
      // Scrolling down and entering section
      if (e.deltaY > 0 && rect.top <= 100 && rect.bottom > 100 && currentPhase === 0) {
        if (!isAnimating) {
          isLocked = true;
          if (e.preventDefault) e.preventDefault();
          window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
        }
      }
      
      // Scrolling up and entering section from below
      if (e.deltaY < 0 && rect.bottom >= windowHeight - 100 && rect.top < windowHeight - 100 && currentPhase === 2) {
        if (!isAnimating) {
          isLocked = true;
          if (e.preventDefault) e.preventDefault();
          window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
        }
      }
    }
  }

  window.addEventListener('wheel', handleWheel, { passive: false });

  // Touch support mapping to handleWheel
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (window.innerWidth < 992) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    
    // Only trigger when drag is significant
    if (Math.abs(deltaY) > 10) {
      // If locked, we MUST prevent default here strictly to stop scroll
      if (isLocked && e.cancelable) {
        e.preventDefault();
      }
      
      handleWheel({
        deltaY: deltaY,
        preventDefault: () => {
          if (e.cancelable) e.preventDefault();
        }
      });
      // Don't update touchStartY continuously if locked, so delta builds up?
      // Actually update it so we don't trigger 100 times.
      touchStartY = touchY;
    }
  }, { passive: false });

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
    const loopIndices = window.innerWidth >= 992 ? fullCircleIndices : mobileIndices;
    
    loopIndices.forEach((origIndex, i) => {
      // Clone original DOM node
      const clone = originalLogos[origIndex].cloneNode(true);
      
      // Calculate circular position
      const angleMultiplier = window.innerWidth >= 992 ? 20 : 30; // Mobile exactly 30 degrees apart (12 logos = 360 deg)
      const startAngleMobile = -150; // i=2 (Center) will be at -150 + 60 = -90 degrees (top dead center)
      const angleDeg = (window.innerWidth >= 992 ? startAngle : startAngleMobile) + (i * angleMultiplier);
      const angleRad = angleDeg * (Math.PI / 180);
      
      if (window.innerWidth >= 992) {
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
    
    const updateRotation = () => {
      currentRotation += (targetRotation - currentRotation) * 0.08;
      
      // Hardware accelerated group rotation for both web and mobile
      arcContainer.style.transform = `rotate(${currentRotation}deg)`;
      
      activeLogos.forEach(logo => {
        logo.style.transform = `rotate(${-currentRotation}deg)`;
      });
      
      if (Math.abs(targetRotation - currentRotation) > 0.05) {
        requestAnimationFrame(updateRotation);
      } else {
        currentRotation = targetRotation;
        arcContainer.style.transform = `rotate(${currentRotation}deg)`;
        
        activeLogos.forEach(logo => {
          logo.style.transform = `rotate(${-currentRotation}deg)`;
        });
        
        isRequestingAnimation = false;
      }
    };
    
    const handleScrollRotate = () => {
      const rect = clientsSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalScrollDistance = windowHeight + rect.height;
        const scrolledDistance = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolledDistance / totalScrollDistance));
        const isMobile = window.innerWidth < 992;
        const rotationRange = isMobile ? 160 : 120; // 4 logo positions on mobile (40° each)
        const rotationOffset = isMobile ? 20 : 15;
        targetRotation = -(progress * rotationRange) + rotationOffset;
        
        if (!isRequestingAnimation) {
          isRequestingAnimation = true;
          requestAnimationFrame(updateRotation);
        }
      }
    };
    
    window.addEventListener('scroll', handleScrollRotate, { passive: true });
    handleScrollRotate();
  }
});
