// ============================================================
// PAGE TRANSITION + SECTION SWITCHING
// ============================================================

const allSections = ['about', 'skills', 'projects', 'contact'];
const navLinks    = document.querySelector('.nav-links');
const navItems    = document.querySelectorAll('.nav-links a');

// Create page overlay for transition
const overlay = document.createElement('div');
overlay.id = 'page-overlay';
document.body.appendChild(overlay);

// Create particles container that stays always visible
const particlesBg = document.getElementById('particles-js');

// ============================================================
// TRANSITION FUNCTION
// ============================================================
function transitionTo(callback) {
  overlay.classList.add('active');
  setTimeout(() => {
    callback();
    window.scrollTo({ top: 0, behavior: 'instant' });
    overlay.classList.remove('active');
    // Re-trigger AOS animations after switch
    setTimeout(() => {
      AOS.refreshHard();
    }, 100);
  }, 350);
}

// ============================================================
// SHOW ALL SECTIONS
// ============================================================
function showAll() {
  const hero = document.getElementById('home');
  if (hero) hero.style.display = 'flex';
  allSections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  });
  // Move particles to body (always visible)
  document.body.style.setProperty('--particles-visible', '1');
}

// ============================================================
// SHOW ONE SECTION ONLY
// ============================================================
function showOnly(targetId) {
  // Hide hero
  const hero = document.getElementById('home');
  if (hero) hero.style.display = 'none';

  // Show/hide sections
  allSections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = (id === targetId) ? 'block' : 'none';
  });
}

// ============================================================
// NAV CLICK
// ============================================================
navItems.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href').replace('#', '');

    navItems.forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    transitionTo(() => {
      if (target === 'home') {
        showAll();
      } else {
        showOnly(target);
      }
    });

    navLinks.classList.remove('open');
  });
});

// ============================================================
// HAMBURGER
// ============================================================
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ============================================================
// HERO BUTTONS
// ============================================================
document.querySelector('a[href="#projects"].btn-primary')?.addEventListener('click', (e) => {
  e.preventDefault();
  navItems.forEach(a => a.classList.remove('active'));
  document.querySelector('.nav-links a[href="#projects"]')?.classList.add('active');
  transitionTo(() => showOnly('projects'));
});

document.querySelector('a[href="#contact"].btn-secondary')?.addEventListener('click', (e) => {
  e.preventDefault();
  navItems.forEach(a => a.classList.remove('active'));
  document.querySelector('.nav-links a[href="#contact"]')?.classList.add('active');
  transitionTo(() => showOnly('contact'));
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
// AOS — Scroll Animations
// ============================================================
AOS.init({
  duration: 800,
  easing: 'ease-out-cubic',
  once: false,
  offset: 60,
  delay: 0
});

// ============================================================
// TYPED.JS — Typing Animation
// ============================================================
new Typed('#typed-text', {
  strings: [
    'Content Creator',
    '3D Artist',
    'Video Editor',
    'Motion Designer',
    'Web Developer'
  ],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 2000,
  loop: true,
  showCursor: true,
  cursorChar: '|'
});

// ============================================================
// PARTICLES.JS — Fixed background (always visible all pages)
// ============================================================
particlesJS('particles-js', {
  particles: {
    number: { value: 55, density: { enable: true, value_area: 800 } },
    color: { value: '#7c6dfa' },
    shape: { type: 'circle' },
    opacity: { value: 0.35, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#7c6dfa',
      opacity: 0.12,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.5,
      random: true,
      out_mode: 'out'
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' }
    },
    modes: {
      repulse: { distance: 80 },
      push: { particles_nb: 3 }
    }
  }
});

// ============================================================
// VANILLA TILT — 3D Hover on Cards
// ============================================================
VanillaTilt.init(document.querySelectorAll('.skill-card'), {
  max: 12,
  speed: 400,
  glare: true,
  'max-glare': 0.2,
  scale: 1.04
});

VanillaTilt.init(document.querySelectorAll('.stat-card'), {
  max: 8,
  speed: 400,
  glare: true,
  'max-glare': 0.15,
  scale: 1.03
});

// ============================================================
// INIT — Show all on load
// ============================================================
showAll();
document.querySelector('.nav-links a[href="#home"]')?.classList.add('active');
