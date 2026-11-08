/* =========================================================
   PHANITH LY — EDIT YOUR CONTENT HERE
   ---------------------------------------------------------
   This is the ONLY file you need to edit to add videos or
   change your contact details. Never touch index.html.
   ========================================================= */


/* ---------- Personal info ---------- */

window.SITE = {

  email: "phanithly607@gmail.com",

  /* Leave "" to hide the phone line */
  phone: "085 663 266",

  /* "Scan to connect" QR codes (up to 4). Empty url = skipped.
     icon names: https://icons.getbootstrap.com  (bi-linkedin, bi-behance …) */
  qr: [
    { label: "FACEBOOK",  icon: "bi-facebook",  url: "https://www.facebook.com/jimmie.bo.9" },
    { label: "INSTAGRAM", icon: "bi-instagram", url: "https://www.instagram.com/jei_7879/" },
    { label: "TIKTOK",    icon: "bi-tiktok",    url: "https://www.tiktok.com/@pnithediter" },
    { label: "TELEGRAM",  icon: "bi-telegram",  url: "https://t.me/Lyhuang0173" }
  ],

  /* Where "View more projects" goes after all cards are shown */
  moreProjectsUrl: "https://www.youtube.com/@LyPhanith-h8b"
};


/* =========================================================
   MY VIDEOS
   ---------------------------------------------------------
   ➜ TO ADD A VIDEO: copy one line, paste it, change the
     link / title / category. That's it.

       { link: "https://youtu.be/XXXXXXXXXXX", title: "My Video", category: "Blender" },

   • link      YouTube, Vimeo, TikTok, or an .mp4 file path
   • title     Name shown under the card
   • category  Groups the filter buttons (e.g. "Blender", "After Effects",
               "Video Editing"). A new word = a new filter button.

   Thumbnails come from YouTube automatically.
   The top 4 show first — put your best video at the top.

   Optional extras you can add inside { }:
     description: "One or two sentences about the project",
     year: "2026",
     tools: ["Blender", "After Effects"],
     thumb: "Image/projects/my-cover.jpg",   // your own cover image
     vertical: true,                          // 9:16 Shorts / TikTok
   ========================================================= */

window.PROJECTS = [

  { link: "https://youtu.be/m80RBbOhum4", title: "Mercedes-AMG GT R", category: "Blender",
    description: "A 3D product film of the 2017 Mercedes-AMG GT R: modeled, lit and animated in Blender with cinematic camera moves." },

  { link: "https://youtu.be/uG6aKIPVue0", title: "BMW Animation", category: "After Effects",
    description: "A fast-paced automotive motion piece with dynamic transitions, typography and sound-driven timing." },

  { link: "https://youtu.be/slbNi5JbeYg", title: "Skincare Product Animation", category: "Blender",
    description: "A clean 3D product animation for a skincare brand, with soft studio lighting and smooth reveals." },

  { link: "https://youtu.be/t95NLtl83ys", title: "ABA Bank Animation", category: "After Effects",
    description: "A brand motion graphics piece for ABA Bank, built around crisp animation and clear messaging." },

  { link: "https://youtu.be/4GqRZMRfe0o", title: "Chinese New Year 2026", category: "After Effects",
    description: "A festive Chinese New Year 2026 animation with rich color, particles and celebratory motion." },

];
