/* ==========================================================================
   CRABPREK INTERACTIVE JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Navbar Scroll Effect & Height Transition
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.height = '72px';
      navbar.style.background = 'rgba(11, 2, 2, 0.92)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.height = '84px';
      navbar.style.background = 'rgba(11, 2, 2, 0.75)';
      navbar.style.boxShadow = 'none';
    }
  });

  // 2. Interactive 3D Parallax Tilt pada Gambar Hero
  const heroStage = document.querySelector('.hero-visual-stage');
  const heroImg = document.querySelector('.hero-main-img');

  if (heroStage && heroImg) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Derajat rotasi 3D berdasarkan posisi kursor
      const tiltX = (y / (rect.height / 2)) * -12;
      const tiltY = (x / (rect.width / 2)) * 12;

      heroImg.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.04)`;
      heroImg.style.transition = 'transform 0.1s ease-out';
    });

    // Reset posisi gambar saat kursor keluar dari area
    heroStage.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      heroImg.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });
  }

  // 3. Counter Animasi Angka Stat Hero (Trigger saat di-scroll)
  const metrics = document.querySelectorAll('.metric-item strong');
  let hasAnimated = false;

  const animateCounters = () => {
    metrics.forEach((metric) => {
      const text = metric.innerText.trim();
      
      // Animasi khusus angka K+ (misal 15K+)
      if (text.includes('K+')) {
        let count = 0;
        const target = parseInt(text);
        const timer = setInterval(() => {
          count++;
          metric.innerText = `${count}K+`;
          if (count >= target) clearInterval(timer);
        }, 60);
      }
    });
  };

  // Intersection Observer untuk mendeteksi kapan elemen masuk ke layar
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        animateCounters();
        hasAnimated = true;
      }
    });
  }, { threshold: 0.6 });

  const metricsContainer = document.querySelector('.hero-metrics');
  if (metricsContainer) observer.observe(metricsContainer);

  // 4. Smooth Scroll untuk Navigasi Internal
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 5. Card Hover Sound / Ripple Visual Effect
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
    });
  });

});