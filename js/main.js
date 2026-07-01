// ============================================================
// SINGLE PAGE NAVIGATION
// Shows only one section at a time when nav link is clicked
// Home always shows the Hero section
// ============================================================

// All sections that can be toggled (excluding hero which is always home)
const allSections = ['about', 'skills', 'projects', 'contact'];

// Show only the selected section, hide all others
function showSection(targetId) {
  allSections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === targetId) {
      el.style.display = 'block'; // Show the clicked section
    } else {
      el.style.display = 'none';  // Hide all others
    }
  });
}

// Show all sections (Home view)
function showHome() {
  allSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  });
}

// Hide all sections on first load except hero
function initSections() {
  allSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none'; // Start hidden
  });
}

// ============================================================
// NAV CLICK HANDLER
// ============================================================
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Stop default jump scroll

    const href = link.getAttribute('href'); // e.g. "#about"
    const targetId = href.replace('#', ''); // e.g. "about"

    // Update active style on nav links
    navItems.forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    if (targetId === 'home') {
      // Home: scroll to top, show all sections
      showHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Other: show only that section
      showSection(targetId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Close mobile menu if open
    navLinks.classList.remove('open');
  });
});

// ============================================================
// HAMBURGER MENU (mobile)
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ============================================================
// FADE-IN ANIMATION
// Elements animate in when visible
// ============================================================
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

// ============================================================
// CONTACT FORM — Formspree
// ============================================================
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
      const response = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
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

// ============================================================
// INIT — hide all sections on page load, show hero only
// ============================================================
initSections();

// Set Home as active by default
document.querySelector('.nav-links a[href="#home"]')?.classList.add('active');