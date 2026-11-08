/* =========================================================
   PHANITH LY — EDIT YOUR CONTENT HERE
   ---------------------------------------------------------
   You never need to touch index.html to add a project.
   Just add / edit an object in the PROJECTS list below.
   ========================================================= */


/* ---------- Personal info used on the page ---------- */

window.SITE = {

  email: "phanithly607@gmail.com",

  /* Leave "" to hide the phone line. Example: "+855 12 345 678" */
  phone: "",

  /* QR codes in "Scan to connect".
     Put your LinkedIn / Behance links in `url`.
     If a url is "", that QR is skipped and the fallback is used. */
  qr: [
    { label: "LINKEDIN", icon: "bi-linkedin", url: "" },
    { label: "BEHANCE",  icon: "bi-behance",  url: "" }
  ],

  /* Used when the QR links above are empty */
  qrFallback: [
    { label: "TELEGRAM", icon: "bi-telegram", url: "https://t.me/Lyhuang0173" },
    { label: "TIKTOK",   icon: "bi-tiktok",   url: "https://www.tiktok.com/@pnithediter" }
  ],

  /* Where "View more projects" goes when there are 4 projects or fewer */
  moreProjectsUrl: "https://www.tiktok.com/@pnithediter"
};


/* ---------- Projects ----------
   type:
     "mp4"     → your own video file, e.g. src: "Video/brand-promo.mp4"
     "youtube" → src: full YouTube link or video id
     "vimeo"   → src: full Vimeo link or video id
     "tiktok"  → src: full TikTok video link (…/video/1234567890)
     "image"   → src: a big image (e.g. a 3D render)
     "link"    → src: any website (opens in a new tab)

   thumb:   cover image (16:9, ~1280x720 .jpg/.webp, under ~250 KB)
            e.g. "Image/projects/brand-promo.jpg"
            Leave "" and a styled poster is drawn automatically.
   preview: optional short muted .mp4 (3–6 s, under ~2 MB) that
            plays when the mouse hovers the card.
   vertical: true for 9:16 videos (TikTok / Reels / Shorts).

   The first 4 projects show on the page; the rest appear
   when visitors click "View more projects".
------------------------------------------------- */

window.PROJECTS = [
  {
    title: "3D Character Animation",
    category: "3D / Animation",
    type: "mp4",
    src: "",
    thumb: "",
    preview: "",
    headline: "Bring Ideas To Life",
    description: "Character modeling, rigging and animation created in Blender, finished with cinematic lighting and compositing.",
    tools: ["Blender", "After Effects"],
    year: "2026"
  },
  {
    title: "Short Film Editing",
    category: "Video / Editing",
    type: "youtube",
    src: "",
    thumb: "",
    preview: "",
    headline: "Every Frame Tells A Story",
    description: "Story-driven edit with pacing, sound design and color grading to build emotion from the first shot to the last.",
    tools: ["Premiere Pro", "After Effects"],
    year: "2026"
  },
  {
    title: "Motion Graphics Reel",
    category: "Motion / Design",
    type: "mp4",
    src: "",
    thumb: "",
    preview: "",
    headline: "Motion That Moves",
    description: "Kinetic typography, logo reveals and animated transitions for social media and brand campaigns.",
    tools: ["After Effects", "Illustrator"],
    year: "2025"
  },
  {
    title: "Brand Promo Video",
    category: "Video / Content",
    type: "tiktok",
    src: "",
    thumb: "",
    preview: "",
    vertical: true,
    headline: "Brands In Motion",
    description: "Short-form promotional content designed for TikTok and Instagram Reels, built to stop the scroll.",
    tools: ["Premiere Pro", "Photoshop"],
    year: "2025"
  }
];
