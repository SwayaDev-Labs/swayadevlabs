// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Counters
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

// Scroll reveal
const revealElements = document.querySelectorAll('.service-card, .why-item, .stat-item, .founder-card');
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

// ROI Calculator
function calcROI() {
  const emp = +document.getElementById('empCount').value;
  const salary = +document.getElementById('salary').value;
  const hours = +document.getElementById('hours').value;
  const errors = +document.getElementById('errors').value;
  const errorCost = +document.getElementById('errorCost').value;

  document.getElementById('empCountVal').textContent = emp;
  document.getElementById('salaryVal').textContent = '₹' + salary.toLocaleString('en-IN');
  document.getElementById('hoursVal').textContent = hours + ' hrs';
  document.getElementById('errorsVal').textContent = errors;
  document.getElementById('errorCostVal').textContent = '₹' + errorCost.toLocaleString('en-IN');

  const workingDays = 26;
  const hourlyRate = salary / (workingDays * 8);
  const laborSaved = Math.round(emp * hourlyRate * hours * workingDays * 0.80);
  const errorSaved = Math.round(errors * errorCost * 0.90);
  const monthlySaved = laborSaved + errorSaved;
  const yearlySaved = monthlySaved * 12;
  const totalHours = Math.round(emp * hours * workingDays * 0.80);
  const productivityGain = Math.round((hours / 8) * 80);

  document.getElementById('monthlySaved').textContent = '₹' + monthlySaved.toLocaleString('en-IN');
  document.getElementById('yearlySaved').textContent = '₹' + yearlySaved.toLocaleString('en-IN');
  document.getElementById('hoursSaved').textContent = totalHours.toLocaleString('en-IN') + ' hrs';
  document.getElementById('productivity').textContent = productivityGain + '%';
  document.getElementById('errorSaved').textContent = '₹' + errorSaved.toLocaleString('en-IN');
  document.getElementById('laborSaved').textContent = '₹' + laborSaved.toLocaleString('en-IN');
}

calcROI();
