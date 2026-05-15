// ===== PARTICLES =====
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.3 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    // draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.05 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('open');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (scrollY >= top && scrollY < top + height) {
        links.forEach(l => l.classList.remove('active'));
        link?.classList.add('active');
      }
    });
  });
}

// ===== TYPING EFFECT =====
function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const texts = ['Data Analyst', 'Data Engineer', 'AI Enthusiast', 'BI Analyst'];
  let textIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = texts[textIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) { isDeleting = false; textIndex = (textIndex + 1) % texts.length; setTimeout(type, 500); return; }
    } else {
      el.textContent = current.substring(0, ++charIndex);
      if (charIndex === current.length) { isDeleting = true; setTimeout(type, 2000); return; }
    }
    setTimeout(type, isDeleting ? 50 : 100);
  }
  type();
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('active'); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => observer.observe(el));
}

// ===== COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll('.achievement-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.target);
        const suffix = entry.target.dataset.suffix || '';
        let current = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(timer); }
          entry.target.textContent = current + suffix;
        }, 30);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ===== SCROLL TO TOP =====
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== FORM =====
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const message = form.querySelector('[name="message"]').value;
    const mailtoLink = `mailto:allvinimmanuvel@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
    window.location.href = mailtoLink;
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initTyping();
  initReveal();
  initCounters();
  initScrollTop();
  initForm();
  initCertLightbox();
});

// ===== CERTIFICATE LIGHTBOX =====
function initCertLightbox() {
  const lightbox   = document.getElementById('cert-lightbox');
  const lbImg      = document.getElementById('cert-lightbox-img');
  const lbCaption  = document.getElementById('cert-lightbox-caption');
  const lbClose    = document.getElementById('cert-lightbox-close');
  const lbBackdrop = document.getElementById('cert-lightbox-backdrop');
  const lbPrev     = document.getElementById('cert-lb-prev');
  const lbNext     = document.getElementById('cert-lb-next');
  if (!lightbox) return;

  // Collect all cert image previews
  const previews = Array.from(document.querySelectorAll('.cert-image-preview img'));
  let current = 0;

  function openAt(index) {
    current = (index + previews.length) % previews.length;
    const img = previews[current];
    lbImg.src = img.src;
    lbCaption.textContent = img.closest('.cert-img-card')
      ?.querySelector('h4')?.textContent || img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 350);
  }

  // Attach click to every preview
  previews.forEach((img, i) => {
    img.closest('.cert-image-preview').addEventListener('click', () => openAt(i));
  });

  lbClose.addEventListener('click', close);
  lbBackdrop.addEventListener('click', close);
  lbPrev.addEventListener('click', () => openAt(current - 1));
  lbNext.addEventListener('click', () => openAt(current + 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   openAt(current - 1);
    if (e.key === 'ArrowRight')  openAt(current + 1);
  });
}

