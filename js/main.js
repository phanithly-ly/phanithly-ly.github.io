const allSections = ['about', 'skills', 'projects', 'contact'];
const navLinks    = document.querySelector('.nav-links');
const navItems    = document.querySelectorAll('.nav-links a');

// Show ALL sections + show hero
function showAll() {
  // Show hero
  const hero = document.getElementById('home');
  if (hero) hero.style.display = 'flex';

  // Show all sections
  allSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  });
}

// Show ONE section + hide hero
function showOnly(targetId) {
  // Hide hero when viewing a specific section
  const hero = document.getElementById('home');
  if (hero) hero.style.display = 'none';

  // Show only target section
  allSections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = (id === targetId) ? 'block' : 'none';
  });

  // Animate cards in the visible section
  const target = document.getElementById(targetId);
  if (target) {
    target.querySelectorAll('.skill-card, .stat-card, .project-item, .contact-form-wrap').forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      setTimeout(() => {
        card.style.opacity   = '1';
        card.style.transform = 'translateY(0)';
      }, i * 80); // Stagger each card
    });
  }
}

// ============================================================
// NAV CLICK
// ============================================================
navItems.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const target = link.getAttribute('href').replace('#', '');

    // Update active nav style
    navItems.forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    // Scroll to very top first
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (target === 'home') {
      showAll();
    } else {
      showOnly(target);
    }
  });
});

// ============================================================
// HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ============================================================
// HERO BUTTONS
// "View My Work" → Projects only
// "Get In Touch" → Contact only
// ============================================================
document.querySelector('a[href="#projects"].btn-primary')?.addEventListener('click', (e) => {
  e.preventDefault();
  navItems.forEach(a => a.classList.remove('active'));
  document.querySelector('.nav-links a[href="#projects"]')?.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
  showOnly('projects');
});

document.querySelector('a[href="#contact"].btn-secondary')?.addEventListener('click', (e) => {
  e.preventDefault();
  navItems.forEach(a => a.classList.remove('active'));
  document.querySelector('.nav-links a[href="#contact"]')?.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
  showOnly('contact');
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

// ============================================================
// INIT — show all on first load
// ============================================================
showAll();
document.querySelector('.nav-links a[href="#home"]')?.classList.add('active');
