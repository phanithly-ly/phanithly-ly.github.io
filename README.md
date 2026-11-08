# Phanith Ly — Creative Portfolio

Live site: **https://phanithly-ly.github.io**

Static site (HTML / CSS / JS), hosted on GitHub Pages. No build step.

## Structure

```
index.html        page layout
CSS/style.css     all styles + animations
js/projects.js    ← EDIT THIS: projects, videos, phone, QR links
js/main.js        interactions, video viewer, animations
Image/            images and icons
```

## Add a video project

Open `js/projects.js` and add an object to `PROJECTS`:

```js
{
  title: "Brand Promo Video",
  category: "Video / Editing",
  type: "youtube",                 // mp4 | youtube | vimeo | tiktok | image | link
  src: "https://youtu.be/XXXXXXXXXXX",
  thumb: "Image/projects/brand-promo.jpg",   // 16:9, ~1280x720, < 250 KB
  preview: "",                     // optional 3–6 s muted mp4 for hover
  vertical: false,                 // true for 9:16 TikTok / Reels
  description: "Short description.",
  tools: ["Premiere Pro", "After Effects"],
  year: "2026"
}
```

- **Long videos** → upload to YouTube or Vimeo and use `type: "youtube"` / `"vimeo"` (fast, free, does not slow the site).
- **Short clips (< ~20 MB)** → put the `.mp4` in a `Video/` folder and use `type: "mp4"`.
- Videos load only when a visitor clicks the card, so the page stays fast.

The first 4 projects show on the page; extra projects appear with “View more projects”.
