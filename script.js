// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Animated counters
const counters = document.querySelectorAll('.counter');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute('data-target');
      let count = 0;
      const step = Math.ceil(target / 60);
      const interval = setInterval(() => {
        count += step;
        if (count >= target) { entry.target.textContent = target + '+'; clearInterval(interval); }
        else entry.target.textContent = count;
      }, 30);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => observer.observe(c));

// Scroll reveal animations
const revealElements = document.querySelectorAll('.service-card, .why-item, .stat-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('successMsg').style.display = 'block';
  this.reset();
  setTimeout(() => document.getElementById('successMsg').style.display = 'none', 5000);
});
