/* =========================================================
   PHANITH LY — PORTFOLIO JAVASCRIPT
   ========================================================= */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* =========================================================
   PAGE LOADER  →  adds .is-loaded (starts hero animation)
   ========================================================= */

(function loader() {
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    document.body.classList.add("is-loaded");
  };

  if (document.readyState === "complete") {
    setTimeout(finish, 250);
  } else {
    window.addEventListener("load", () => setTimeout(finish, 250));
  }

  /* never keep visitors waiting on a slow font / CDN */
  setTimeout(finish, 2500);
})();


/* =========================================================
   AOS (optional — only if the library is loaded)
   ========================================================= */

if (window.AOS) {
  AOS.init({ duration: 800, easing: "ease-out-cubic", once: true, offset: 80 });
}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(open));
});


/* =========================================================
   SMOOTH NAVIGATION (nav, hire button, back to top)
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const href = link.getAttribute("href");

    if (!href || href === "#" || link.id === "viewAll") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();

    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    } else {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }

    history.replaceState(null, "", href);

    navLinks?.classList.remove("open");
    hamburger?.setAttribute("aria-expanded", "false");
  });

});


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const navItems = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (!entry.isIntersecting) return;

    const id = entry.target.id;

    navItems.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  });

}, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });

["home", "work", "process", "about", "contact"].forEach(id => {
  const el = document.getElementById(id);
  if (el) navObserver.observe(el);
});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);
  });

}, { rootMargin: "0px 0px -8% 0px", threshold: .08 });

function observeReveal(root = document) {
  root.querySelectorAll("[data-reveal]:not(.is-visible)").forEach(el => revealObserver.observe(el));
}

observeReveal();


/* =========================================================
   HERO PARALLAX (light — only transforms, only in view)
   ========================================================= */

(function parallax() {

  if (reduceMotion) return;

  const hero = document.querySelector(".hero");
  const inner = document.querySelector(".hero-inner");
  if (!hero || !inner) return;

  let ticking = false;

  const update = () => {
    ticking = false;

    const y = window.scrollY;
    if (y > hero.offsetHeight) return;

    inner.style.setProperty("--title-y", `${y * 0.18}px`);
    inner.style.setProperty("--circle-y", `${y * 0.10}px`);
    inner.style.setProperty("--photo-y", `${y * -0.04}px`);
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
})();


/* =========================================================
   FEATURED WORK — built from js/projects.js
   ========================================================= */

const PROJECTS = window.PROJECTS || [];
const SITE = window.SITE || {};
const VISIBLE = 4;

const workGrid = document.getElementById("workGrid");
const viewAll = document.getElementById("viewAll");

const TYPE_LABEL = {
  mp4: "VIDEO", youtube: "VIDEO", vimeo: "VIDEO", tiktok: "SHORT",
  image: "IMAGE", link: "WEB"
};

const escapeHTML = str =>
  String(str ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function posterHTML(project, index) {
  return `
    <div class="poster poster--${(index % 4) + 1}">
      <strong>${escapeHTML(project.headline || project.title)}</strong>
      <small>${escapeHTML((project.category || "").split("/")[0].trim().toUpperCase() || "PROJECT")}</small>
    </div>`;
}

function renderProjects() {

  if (!workGrid) return;

  workGrid.innerHTML = PROJECTS.map((p, i) => {

    const isVideo = ["mp4", "youtube", "vimeo", "tiktok"].includes(p.type);
    const icon = p.type === "link" ? "bi-box-arrow-up-right" : isVideo ? "bi-play-fill" : "bi-arrows-fullscreen";

    return `
      <button class="work-card" type="button" data-index="${i}" data-reveal style="--d:${i % VISIBLE}" ${i >= VISIBLE ? "hidden" : ""}
              aria-label="Open project: ${escapeHTML(p.title)}">
        <div class="work-thumb">
          ${p.thumb
            ? `<img src="${escapeHTML(p.thumb)}" alt="" loading="lazy" decoding="async">`
            : posterHTML(p, i)}
          <span class="work-type">${TYPE_LABEL[p.type] || "PROJECT"}</span>
          <span class="work-play"><i class="bi ${icon}"></i></span>
        </div>
        <h4>${escapeHTML(p.title)}</h4>
        <span class="work-cat">${escapeHTML(p.category)}</span>
      </button>`;
  }).join("");

  workGrid.querySelectorAll(".work-card").forEach(card => {

    const p = PROJECTS[Number(card.dataset.index)];

    card.addEventListener("click", () => openViewer(Number(card.dataset.index)));

    /* Hover preview: the small mp4 loads only when hovered */
    if (p.preview && !reduceMotion) {

      const thumb = card.querySelector(".work-thumb");
      let video;

      card.addEventListener("mouseenter", () => {
        video = document.createElement("video");
        Object.assign(video, { src: p.preview, muted: true, loop: true, playsInline: true, autoplay: true });
        video.setAttribute("aria-hidden", "true");
        thumb.appendChild(video);
        video.play().catch(() => {});
      });

      card.addEventListener("mouseleave", () => {
        video?.remove();
        video = null;
      });
    }
  });

  observeReveal(workGrid);

  /* View more: expand hidden cards, or go to the external profile */
  viewAll?.addEventListener("click", event => {

    const hidden = workGrid.querySelectorAll(".work-card[hidden]");

    if (hidden.length) {
      event.preventDefault();
      hidden.forEach(card => card.hidden = false);
      observeReveal(workGrid);
      viewAll.innerHTML = 'Show less <i class="bi bi-arrow-up"></i>';
      viewAll.dataset.expanded = "1";
      return;
    }

    if (viewAll.dataset.expanded) {
      event.preventDefault();
      workGrid.querySelectorAll(".work-card").forEach((card, i) => card.hidden = i >= VISIBLE);
      viewAll.innerHTML = 'View more projects <i class="bi bi-arrow-right"></i>';
      delete viewAll.dataset.expanded;
      document.getElementById("work").scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (SITE.moreProjectsUrl) {
      event.preventDefault();
      window.open(SITE.moreProjectsUrl, "_blank", "noopener");
    }
  });
}

renderProjects();


/* =========================================================
   PROJECT / VIDEO VIEWER
   Video files / iframes are created only when opened,
   and destroyed when closed (nothing loads in advance).
   ========================================================= */

const viewer = document.getElementById("viewer");
const viewerMedia = document.getElementById("viewerMedia");
let current = 0;

function youtubeId(src) {
  const m = String(src).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : String(src).trim();
}

function vimeoId(src) {
  const m = String(src).match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : String(src).trim();
}

function tiktokId(src) {
  const m = String(src).match(/video\/(\d+)/);
  return m ? m[1] : String(src).trim();
}

function mediaHTML(p, index) {

  const src = (p.src || "").trim();
  const iframe = url =>
    `<iframe src="${url}" title="${escapeHTML(p.title)}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe>`;

  if (!src) {
    return `${p.thumb ? `<img src="${escapeHTML(p.thumb)}" alt="">` : posterHTML(p, index)}
      <div class="viewer-empty"><i class="bi bi-camera-reels"></i>Video coming soon</div>`;
  }

  switch (p.type) {
    case "mp4":
      return `<video src="${escapeHTML(src)}" ${p.thumb ? `poster="${escapeHTML(p.thumb)}"` : ""} controls autoplay playsinline preload="metadata"></video>`;
    case "youtube":
      return iframe(`https://www.youtube-nocookie.com/embed/${youtubeId(src)}?autoplay=1&rel=0&modestbranding=1`);
    case "vimeo":
      return iframe(`https://player.vimeo.com/video/${vimeoId(src)}?autoplay=1&title=0&byline=0`);
    case "tiktok":
      return iframe(`https://www.tiktok.com/embed/v2/${tiktokId(src)}`);
    case "image":
      return `<img src="${escapeHTML(src)}" alt="${escapeHTML(p.title)}">`;
    default:
      return `${p.thumb ? `<img src="${escapeHTML(p.thumb)}" alt="">` : posterHTML(p, index)}
        <div class="viewer-empty"><i class="bi bi-box-arrow-up-right"></i>
        <a href="${escapeHTML(src)}" target="_blank" rel="noopener">Open project ↗</a></div>`;
  }
}

function fillViewer(index) {

  const p = PROJECTS[index];
  if (!p) return;

  current = index;

  viewerMedia.classList.toggle("is-vertical", !!p.vertical && !!p.src);
  viewerMedia.innerHTML = mediaHTML(p, index);

  document.getElementById("viewerCat").textContent = p.category || "";
  document.getElementById("viewerTitle").textContent = p.title || "";
  document.getElementById("viewerDesc").textContent = p.description || "";
  document.getElementById("viewerMeta").innerHTML =
    [p.year, ...(p.tools || [])].filter(Boolean).map(t => `<li>${escapeHTML(t)}</li>`).join("");
}

function openViewer(index) {

  const p = PROJECTS[index];
  if (!p) return;

  if (p.type === "link" && p.src) {
    window.open(p.src, "_blank", "noopener");
    return;
  }

  fillViewer(index);

  if (typeof viewer.showModal === "function") {
    viewer.showModal();
    document.body.classList.add("viewer-open");
  }
}

function closeViewer() {
  viewer.close();
}

viewer?.addEventListener("close", () => {
  viewerMedia.innerHTML = "";          /* stops video / iframe */
  document.body.classList.remove("viewer-open");
});

document.getElementById("viewerClose")?.addEventListener("click", closeViewer);

/* click on the dark backdrop closes */
viewer?.addEventListener("click", event => {
  if (event.target === viewer) closeViewer();
});

const step = dir => fillViewer((current + dir + PROJECTS.length) % PROJECTS.length);

document.getElementById("viewerPrev")?.addEventListener("click", () => step(-1));
document.getElementById("viewerNext")?.addEventListener("click", () => step(1));

viewer?.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") step(-1);
  if (event.key === "ArrowRight") step(1);
});


/* =========================================================
   CONTACT — phone + QR codes from js/projects.js
   ========================================================= */

(function contact() {

  if (SITE.phone) {
    const list = document.getElementById("contactList");
    const li = document.createElement("li");
    li.innerHTML = `<span class="c-icon"><i class="bi bi-telephone"></i></span>
      <a href="tel:${SITE.phone.replace(/[^\d+]/g, "")}">${escapeHTML(SITE.phone)}</a>`;
    list?.children[0]?.after(li);
  }

  const row = document.getElementById("qrRow");
  if (!row) return;

  const primary = (SITE.qr || []).filter(q => q.url);
  const fallback = (SITE.qrFallback || []).filter(q => q.url);
  const codes = [...primary, ...fallback].slice(0, 2);

  const draw = () => {

    row.innerHTML = codes.map(q => {

      let svg = "";

      if (window.qrcode) {
        const qr = window.qrcode(0, "H");     /* H = still readable with the logo on top */
        qr.addData(q.url);
        qr.make();
        svg = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
      }

      return `
        <a class="qr" href="${escapeHTML(q.url)}" target="_blank" rel="noopener" aria-label="${escapeHTML(q.label)}">
          <span class="qr-code">${svg}<i class="bi ${escapeHTML(q.icon || "bi-link-45deg")}"></i></span>
          <span>${escapeHTML(q.label)}</span>
        </a>`;
    }).join("");
  };

  if (window.qrcode) {
    draw();
  } else {
    draw();                                   /* labels/links first */
    window.addEventListener("load", draw);    /* redraw when the QR library arrives */
  }
})();


/* =========================================================
   CONTACT FORM (kept — works if a #contact-form is added)
   ========================================================= */

const form = document.getElementById("contact-form");

if (form) {

  const btnText = document.getElementById("btn-text");
  const btnLoading = document.getElementById("btn-loading");
  const successMessage = document.getElementById("form-success");
  const errorMessage = document.getElementById("form-error");

  const show = (el, on, display = "block") => { if (el) el.style.display = on ? display : "none"; };

  form.addEventListener("submit", async event => {

    event.preventDefault();

    show(btnText, false);
    show(btnLoading, true, "inline");
    show(successMessage, false);
    show(errorMessage, false);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        form.reset();
        show(successMessage, true);
      } else {
        show(errorMessage, true);
      }
    } catch {
      show(errorMessage, true);
    } finally {
      show(btnText, true, "inline");
      show(btnLoading, false);
    }
  });
}


/* =========================================================
   SCROLL IMAGE SEQUENCE
   Put frames in Image/sequence/ezgif-frame-001.png …
   If frame 1 is missing the section is removed.
   ========================================================= */

const sequenceSection = document.getElementById("sequence");
const sequenceCanvas = document.getElementById("sequenceCanvas");

if (sequenceSection && sequenceCanvas) {

  const ctx = sequenceCanvas.getContext("2d");
  const frameCount = 240;
  const framePath = i => `Image/sequence/ezgif-frame-${String(i).padStart(3, "0")}.png`;
  const images = [];

  const drawFrame = index => {
    const img = images[index];
    if (!img || !img.complete || !img.naturalWidth) return;
    ctx.clearRect(0, 0, sequenceCanvas.width, sequenceCanvas.height);
    ctx.drawImage(img, 0, 0, sequenceCanvas.width, sequenceCanvas.height);
  };

  const updateSequenceFrame = () => {
    const rect = sequenceSection.getBoundingClientRect();
    const range = sequenceSection.offsetHeight - window.innerHeight;
    if (range <= 0) return;
    const progress = Math.min(Math.max(-rect.top / range, 0), 1);
    drawFrame(Math.min(frameCount - 1, Math.floor(progress * frameCount)));
  };

  const first = new Image();

  first.onerror = () => sequenceSection.remove();

  first.onload = () => {
    sequenceSection.classList.add("is-ready");
    sequenceCanvas.width = first.naturalWidth;
    sequenceCanvas.height = first.naturalHeight;
    images.push(first);

    for (let i = 2; i <= frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      images.push(img);
    }

    drawFrame(0);
    window.addEventListener("scroll", updateSequenceFrame, { passive: true });
    window.addEventListener("resize", updateSequenceFrame);
  };

  first.src = framePath(1);
}


/* =========================================================
   FOOTER YEAR
   ========================================================= */

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

console.log("Phanith Ly Portfolio — Ready.");
