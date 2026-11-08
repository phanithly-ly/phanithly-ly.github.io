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

const SITE = window.SITE || {};

/* Turn the simple { link, title, category } entries into full projects:
   detect the video type from the link and grab the YouTube thumbnail. */
function detectType(src) {
  if (/youtu\.?be/.test(src)) return "youtube";
  if (/vimeo\.com/.test(src)) return "vimeo";
  if (/tiktok\.com/.test(src)) return "tiktok";
  if (/\.(mp4|webm|mov)(\?|$)/i.test(src)) return "mp4";
  if (/\.(jpe?g|png|webp|gif)(\?|$)/i.test(src)) return "image";
  return src ? "link" : "mp4";
}

const PROJECTS = (window.PROJECTS || []).map(raw => {
  const p = { ...raw };
  p.src = String(p.src || p.link || "").trim();
  p.type = p.type || detectType(p.src);
  p.category = p.category || "Project";
  if (/shorts\//.test(p.src)) p.vertical = true;
  if (!p.thumb && p.type === "youtube" && p.src) {
    p.thumb = `https://i.ytimg.com/vi/${youtubeId(p.src)}/maxresdefault.jpg`;
    p.thumbFallback = `https://i.ytimg.com/vi/${youtubeId(p.src)}/hqdefault.jpg`;
  }
  if (!p.tools) p.tools = [p.category];
  return p;
});
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
    const fallback = p.thumbFallback ? ` onerror="this.onerror=null;this.src='${escapeHTML(p.thumbFallback)}'"` : "";

    return `
      <button class="work-card" type="button" data-index="${i}" data-cat="${escapeHTML(p.category)}" data-reveal
              aria-label="Play: ${escapeHTML(p.title)}">
        <div class="work-thumb">
          ${p.thumb
            ? `<img src="${escapeHTML(p.thumb)}" alt="" loading="lazy" decoding="async"${fallback}>`
            : posterHTML(p, i)}
          <span class="work-type">${escapeHTML(p.category)}</span>
          <span class="work-play"><i class="bi ${icon}"></i></span>
        </div>
        <h4>${escapeHTML(p.title)}</h4>
        <span class="work-cat">${escapeHTML(p.year || TYPE_LABEL[p.type] || "PROJECT")}</span>
      </button>`;
  }).join("");

  const cards = [...workGrid.querySelectorAll(".work-card")];

  cards.forEach(card => {

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

  /* ---- Filter buttons (one per category) + "view more" ---- */

  const filtersEl = document.getElementById("workFilters");
  const categories = ["All", ...new Set(PROJECTS.map(p => p.category))];
  let filter = "All";
  let expanded = false;

  if (filtersEl && categories.length > 2) {
    filtersEl.innerHTML = categories.map(c => {
      const count = c === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === c).length;
      return `<button type="button" class="chip${c === "All" ? " is-active" : ""}" data-filter="${escapeHTML(c)}">${escapeHTML(c)} <sup>${count}</sup></button>`;
    }).join("");

    filtersEl.addEventListener("click", event => {
      const chip = event.target.closest(".chip");
      if (!chip) return;
      filter = chip.dataset.filter;
      expanded = false;
      filtersEl.querySelectorAll(".chip").forEach(c => c.classList.toggle("is-active", c === chip));
      applyView();
    });
  }

  function applyView() {
    let rank = 0;
    cards.forEach(card => {
      const match = filter === "All" || card.dataset.cat === filter;
      const show = match && (filter !== "All" || expanded || rank < VISIBLE);
      if (match) rank++;
      card.hidden = !show;
      card.style.setProperty("--d", show ? rank % VISIBLE : 0);
    });

    if (!viewAll) return;
    if (filter === "All" && PROJECTS.length > VISIBLE) {
      viewAll.innerHTML = expanded
        ? 'Show less <i class="bi bi-arrow-up"></i>'
        : `View all ${PROJECTS.length} projects <i class="bi bi-arrow-right"></i>`;
      viewAll.dataset.mode = "toggle";
    } else {
      viewAll.innerHTML = 'More on YouTube <i class="bi bi-arrow-up-right"></i>';
      viewAll.dataset.mode = "external";
    }
    observeReveal(workGrid);
  }

  viewAll?.addEventListener("click", event => {
    event.preventDefault();

    if (viewAll.dataset.mode === "toggle") {
      expanded = !expanded;
      applyView();
      if (!expanded) document.getElementById("work").scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (SITE.moreProjectsUrl) window.open(SITE.moreProjectsUrl, "_blank", "noopener");
  });

  applyView();
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
  const codes = [...primary, ...fallback].slice(0, 4);

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
