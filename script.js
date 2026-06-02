const topbar = document.getElementById('topbar');
window.addEventListener('scroll', () => {
  if (topbar) topbar.classList.toggle('scrolled', window.scrollY > 20);
});

const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('swayadev-theme');

if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
}

if (themeToggle) {
  themeToggle.innerHTML = document.body.classList.contains('light-mode')
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('swayadev-theme', isLight ? 'light' : 'dark');
    themeToggle.innerHTML = isLight
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
  });
}

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.getAttribute('data-target');
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 50));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + '+';
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, 35);

    counterObserver.unobserve(el);
  });
}, { threshold: 0.35 });

counters.forEach(counter => counterObserver.observe(counter));

const animatedEls = document.querySelectorAll('.reveal, .reveal-left, .zoom-reveal, .stagger-up');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;

    if (el.classList.contains('stagger-up') && el.parentElement) {
      const siblings = [...el.parentElement.querySelectorAll('.stagger-up')];
      siblings.forEach((item, index) => {
        setTimeout(() => item.classList.add('visible'), index * 120);
      });
    } else {
      el.classList.add('visible');
    }

    revealObserver.unobserve(el);
  });
}, { threshold: 0.14 });

animatedEls.forEach(el => revealObserver.observe(el));

const heroParallax = document.querySelector('.hero-parallax');
window.addEventListener('scroll', () => {
  if (!heroParallax) return;
  const y = window.scrollY * 0.08;
  heroParallax.style.transform = `translateY(${y}px)`;
});

document.querySelectorAll('[data-slider]').forEach(slider => {
  const track = slider.querySelector('.testimonial-track');
  const dots = slider.querySelectorAll('.slider-dot');
  let index = 0;

  function updateSlider(i) {
    if (!track) return;
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === i));
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      index = idx;
      updateSlider(index);
    });
  });

  if (dots.length > 1) {
    setInterval(() => {
      index = (index + 1) % dots.length;
      updateSlider(index);
    }, 3500);
  }

  updateSlider(index);
});
