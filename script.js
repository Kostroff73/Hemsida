document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.nav-burger');
  const menuLinks = document.querySelectorAll('.menu a');

  if (burger) {
    burger.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Scroll Reveal Logic
  const observerOptions = {
    threshold: 0,
    rootMargin: '0px 0px 100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Interactive Tilt & Glow Effect
  const effectConfigs = [
    { container: '.hero', target: '.cover-stage', glow: '.mouse-glow', tilt: 12 },
    { container: '#boken', target: '.book-panel', glow: '.mouse-glow', tilt: 20 },
    { container: '#boken', target: '.book-panel img', glow: '.mouse-glow', tilt: 20 },
    { container: '#store', target: '.store-grid', glow: '.mouse-glow', tilt: 4 },
    { container: '#bjorn', target: '.bjorn-photo img', glow: '.mouse-glow', tilt: 15 },
    { container: '#forelasningar', target: '.lect-grid', glow: '.mouse-glow', tilt: 4 },
    { container: '#sagt', target: '.sagt-grid', glow: '.mouse-glow', tilt: 4 },
    { container: '#kontakt', target: '.contact-inner', glow: '.mouse-glow', tilt: 4 }
  ];

  effectConfigs.forEach(config => {
    const container = document.querySelector(config.container);
    const target = container?.querySelector(config.target);
    const glow = container?.querySelector(config.glow);

    if (container && target) {
      container.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5; // -0.5 till 0.5
      const y = (clientY - top) / height - 0.5;

      // Uppdatera koordinater för partikel-parallax
      container.style.setProperty('--mx', x);
      container.style.setProperty('--my', y);

      target.style.transition = 'none';
      target.style.transform = `perspective(1000px) rotateY(${x * config.tilt}deg) rotateX(${-y * config.tilt}deg)`;
      
      if (glow) {
        glow.style.opacity = '1';
        glow.style.left = `${clientX - left}px`;
        glow.style.top = `${clientY - top}px`;
      }
      });

      container.addEventListener('mouseleave', () => {
        target.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        target.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
        container.style.setProperty('--mx', 0);
        container.style.setProperty('--my', 0);
        if (glow) glow.style.opacity = '0';
      });
    }
  });

  // Hero Book Parallax
  const heroArt = document.querySelector('.hero-art');
  if (heroArt) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroArt.style.transform = `translateY(${scrolled * 0.12}px)`;
      }
    });
  }

  // Golden Particles Logic (Point 6) - Applied to Hero and Marquee
  ['.hero', '.marq'].forEach(selector => {
    const container = document.querySelector(selector);
    if (container) {
      const particleContainer = document.createElement('div');
      particleContainer.className = selector.replace(/[.#]/g, '') + '-particles';
      container.appendChild(particleContainer);

      const isMarq = selector === '.marq';
      const particleCount = isMarq ? 30 : 50; 

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 20 + 20;
        const delay = Math.random() * -40;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        particle.style.setProperty('--moveX', `${(Math.random() - 0.5) * 200}px`);
        particle.style.setProperty('--moveY', `${(Math.random() - 0.5) * 200}px`);
        particle.style.setProperty('--depth', Math.random() * 2 + 1);
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particleContainer.appendChild(particle);
      }
    }
  });
});

function closeNav() {
  document.body.classList.remove('nav-open');
}