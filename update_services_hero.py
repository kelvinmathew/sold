import re

# 1. Read services.html
with open('services.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 2. Replace the hero section completely
new_hero = """    <section id="services-hero" class="hero-section services-hero">
      <picture>
        <source media="(max-width: 1199px)" srcset="assets/images/mobile-hero-bg.png" />
        <img src="assets/images/bannersold.png" alt="Hero Background" class="hero-bg-img" />
      </picture>
      <div class="hero-overlay"></div>
      
      <div class="services-hero-content">
        <!-- Title Container (Left) -->
        <div class="services-hero-title-container">
          <h1 class="services-hero-title-top">Get the Real Estate</h1>
          <h2 class="services-hero-title-bottom"><span class="orange-italic">Experts</span> <span class="white-bold">on Your Team</span></h2>
        </div>
        
        <!-- Text and Button Container (Right) -->
        <div class="services-hero-text-block">
          <p>20+ years founding and scaling Real Estate businesses in MENA, Asia & Europe generating millions of dollars in property sales for clients every year.</p>
          
          <a href="#" class="btn-get-started">
            <span class="icon-circle">
              <img class="d-lg-none" src="assets/images/Frame%206.svg" alt="Arrow Mobile" style="width: 100%; height: 100%; object-fit: contain; border-radius: 24px;">
              <img class="d-none d-lg-block" src="assets/images/get_started_arrow.png" alt="Arrow" style="width: 42px; height: 45px; object-fit: contain; border-radius: 24px;">
            </span>
            GET STARTED NOW
          </a>
        </div>
        
        <!-- Breadcrumb (Bottom Left) -->
        <div class="services-hero-breadcrumb d-none d-md-flex">
          <a href="index.html">Home</a>
          <span class="separator"><img src="assets/images/Frame 6.svg" alt=">>" style="width:16px;"></span>
          <span class="current">Services</span>
        </div>
      </div>
    </section>"""

html = re.sub(r'<section id="hero" class="hero-section">.*?</section>', new_hero, html, flags=re.DOTALL)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 3. Append CSS to style.css
css_append = """
/* ==========================================================================
   Services Page Hero Section
   ========================================================================== */
.services-hero {
  position: relative;
  width: 100%;
  height: 825px; /* Hero height based on Figma */
  background: #FFFFFF;
  overflow: hidden;
}

@media (min-width: 1200px) {
  .services-hero {
    height: 825px;
  }
}

.services-hero-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 1440px; /* Constrain content width */
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: 3;
}

/* --- Title Container (Left) --- */
.services-hero-title-container {
  position: absolute;
  top: 239px;
  left: 64px;
  width: 785px;
  height: 132px;
  display: flex;
  flex-direction: column;
}

.services-hero-title-top {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 700;
  font-size: 67px;
  line-height: 30px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  margin: 0;
  height: 58px;
  display: flex;
  align-items: center;
}

.services-hero-title-bottom {
  font-family: 'Mona Sans', sans-serif;
  margin: 0;
  height: 74px;
  display: flex;
  align-items: center;
}

.services-hero-title-bottom .orange-italic {
  font-weight: 700;
  font-style: italic;
  font-size: 69px;
  line-height: 30px;
  letter-spacing: -0.03em;
  color: #FFA726;
  margin-right: 15px; /* Space between words */
}

.services-hero-title-bottom .white-bold {
  font-weight: 700;
  font-size: 69px;
  line-height: 30px;
  letter-spacing: -0.03em;
  color: #FFFFFF;
}

/* --- Text and Button Block (Right) --- */
.services-hero-text-block {
  position: absolute;
  top: 511px; /* Approximation based on image layout */
  right: 64px; /* Align to right */
  width: 480px;
  display: flex;
  flex-direction: column;
  gap: 56px; /* Gap between text and button */
}

.services-hero-text-block p {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 400;
  font-size: 23px;
  line-height: 29px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  margin: 0;
}

/* Breadcrumb (Bottom Left) */
.services-hero-breadcrumb {
  position: absolute;
  top: 709px;
  left: 104px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.services-hero-breadcrumb a, .services-hero-breadcrumb .current {
  font-family: 'Mona Sans', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 29px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  text-decoration: none;
}

/* Responsive Overrides */
@media (max-width: 991px) {
  .services-hero {
    height: auto;
    min-height: 100vh;
  }
  .services-hero-content {
    position: relative;
    transform: none;
    left: 0;
    padding: 100px 20px 50px 20px;
    height: auto;
  }
  .services-hero-title-container {
    position: relative;
    top: auto;
    left: auto;
    width: 100%;
    height: auto;
    margin-bottom: 40px;
  }
  .services-hero-title-top {
    font-size: 40px;
    height: auto;
    line-height: 1.2;
  }
  .services-hero-title-bottom {
    height: auto;
    flex-wrap: wrap;
  }
  .services-hero-title-bottom .orange-italic,
  .services-hero-title-bottom .white-bold {
    font-size: 42px;
    line-height: 1.2;
  }
  .services-hero-text-block {
    position: relative;
    top: auto;
    right: auto;
    left: auto;
    width: 100%;
    gap: 30px;
  }
}
"""

with open('css/style.css', 'a', encoding='utf-8') as f:
    f.write(css_append)

print("Services hero updated!")
