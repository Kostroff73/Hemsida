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
    threshold: 0.15
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

  // Interactive Tilt Effect för bokomslaget
  const hero = document.querySelector('.hero');
  const cover = document.querySelector('.cover-stage');
  const glow = document.querySelector('.hero-glow');

  if (hero && cover) {
    hero.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = hero.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5; // -0.5 till 0.5
      const y = (clientY - top) / height - 0.5;

      cover.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translateY(${y * -10}px)`;
      
      if (glow) {
        glow.style.opacity = '1';
        glow.style.left = `${clientX - left}px`;
        glow.style.top = `${clientY - top}px`;
      }
    });

    hero.addEventListener('mouseleave', () => {
      cover.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)`;
      if (glow) glow.style.opacity = '0';
    });
  }
});

function closeNav() {
  document.body.classList.remove('nav-open');
}