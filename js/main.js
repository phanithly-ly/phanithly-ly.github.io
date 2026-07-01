// All sections except hero
const allSections = ['about', 'skills', 'projects', 'contact'];

// Show only one section
function showSection(targetId) {
  allSections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = (id === targetId) ? 'block' : 'none';
  });
}

// Show ALL sections (Home view)
function showHome() {
  allSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  });
}

// Hide all sections on first load
function initSections() {
  allSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// Nav click handler
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const href  = link.getAttribute('href');
    const target = href.replace('#', '');

    // Update active nav style
    navItems.forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    if (target === 'home') {
      // Home: show ALL sections + scroll to top
      showHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Other: show only that section + scroll to top
      showSection(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Close mobile menu
    navLinks.classList.remove('open');
  });
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fade-in animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .stat-card, .project-item, .contact-form-wrap').forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Contact form — Formspree
const form       = document.getElementById('contact-form');
const btnText    = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');
const msgSuccess = document.getElementById('form-success');
const msgError   = document.getElementById('form-error');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btnText.style.display    = 'none';
    btnLoading.style.display = 'inline';
    msgSuccess.style.display = 'none';
    msgError.style.display   = 'none';

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        msgSuccess.style.display = 'block';
        form.reset();
      } else {
        msgError.style.display = 'block';
      }
    } catch {
      msgError.style.display = 'block';
    } finally {
      btnText.style.display    = 'inline';
      btnLoading.style.display = 'none';
    }
  });
}

// Init — hide all sections, show hero only
initSections();

// Set Home active by default
document.querySelector('.nav-links a[href="#home"]')?.classList.add('active');
