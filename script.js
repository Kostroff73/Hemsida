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
        observer.unobserve(entry.target); // Animera bara en gång
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Interactive Tilt & Glow Effect
  const effectConfigs = [
    { container: '.hero', target: '.cover-stage', glow: '.mouse-glow', tilt: 12 },
    { container: '#boken', target: '.book-panel', glow: '.mouse-glow', tilt: 20 },
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
        if (glow) glow.style.opacity = '0';
      });
    }
  });
});

function closeNav() {
  document.body.classList.remove('nav-open');
}