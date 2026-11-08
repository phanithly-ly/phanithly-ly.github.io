# របៀប​បន្ថែម​វីដេអូ YouTube ទៅ Portfolio

អ្នក​កែ​តែ​ឯកសារ​មួយ​ប៉ុណ្ណោះ៖ **`js/projects.js`**។ មិន​ចាំបាច់​ប៉ះ `index.html` ទេ។

## ជំហាន​ទី 1 — យក link ពី YouTube
នៅ​ក្រោម​វីដេអូ​លើ YouTube ចុច **Share → Copy**។ អ្នក​នឹង​ទទួល​បាន link ដូច​នេះ៖
```
https://youtu.be/m80RBbOhum4
```

## ជំហាន​ទី 2 — បិទ​ភ្ជាប់​ក្នុង `js/projects.js`
ស្វែងរក `window.PROJECTS = [` ហើយ​បន្ថែម​មួយ​បន្ទាត់៖
```js
{ link: "https://youtu.be/XXXXXXXXXXX", title: "ឈ្មោះ​វីដេអូ", category: "Blender" },
```
- **link** — link YouTube (ក៏​អាច​ជា Vimeo, TikTok ឬ​ឯកសារ .mp4)
- **title** — ឈ្មោះ​ដែល​បង្ហាញ​នៅ​ក្រោម​កាត
- **category** — ក្រុម​របស់​វីដេអូ ដូចជា `"Blender"`, `"After Effects"`, `"Video Editing"`។ បើ​អ្នក​វាយ​ពាក្យ​ថ្មី នោះ​នឹង​មាន​ប៊ូតុង filter ថ្មី​មួយ​ទៀត​ដោយ​ស្វ័យប្រវត្តិ។

⚠️ សូម​ពិនិត្យ​ថា​បន្ទាត់​នីមួយៗ​បញ្ចប់​ដោយ​សញ្ញា **`},`** (ក្បៀស) ហើយ​ប្រើ​សញ្ញា​សម្រង់ `"` ជានិច្ច។

រូប thumbnail យក​មក​ពី YouTube ដោយ​ស្វ័យប្រវត្តិ។ វីដេអូ 4 ដំបូង​នឹង​បង្ហាញ​មុន ដូច្នេះ​ដាក់​វីដេអូ​ល្អ​បំផុត​នៅ​ខាង​លើ។

## ព័ត៌មាន​បន្ថែម (មិន​ចាំបាច់)
```js
{ link: "https://youtu.be/XXXXXXXXXXX", title: "BMW Animation", category: "After Effects",
  description: "ការ​ពិពណ៌នា​ខ្លី​អំពី​គម្រោង",
  year: "2026",
  tools: ["After Effects", "Premiere Pro"],
  vertical: true },   // សម្រាប់ YouTube Shorts / TikTok (9:16)
```

## ជំហាន​ទី 3 — Upload ទៅ GitHub
1. បើក https://github.com/phanithly-ly/phanithly-ly.github.io
2. ចូល folder `js` → ចុច `projects.js` → ចុច​រូប​ខ្មៅដៃ ✏️ (Edit)
3. បិទ​ភ្ជាប់​បន្ទាត់​ថ្មី → ចុច **Commit changes**
4. រង់ចាំ​ប្រហែល 1 នាទី ហើយ​បើក https://phanithly-ly.github.io ឡើង​វិញ (Ctrl + F5)

ធ្វើ​បែប​នេះ​នៅ​លើ GitHub ផ្ទាល់​គឺ​ងាយ​ជាង​គេ ព្រោះ​មិន​ចាំបាច់​ដំឡើង​កម្មវិធី​អ្វី​ទាំងអស់។

## ប្តូរ​ព័ត៌មាន​ទំនាក់ទំនង
ក្នុង `window.SITE` នៅ​ខាង​លើ​ឯកសារ​ដដែល៖
- `phone` — លេខ​ទូរស័ព្ទ
- `qr` — QR code (អតិបរមា 4)។ ពេល​អ្នក​មាន LinkedIn សូម​ប្តូរ​បន្ទាត់​មួយ​ទៅ៖
  `{ label: "LINKEDIN", icon: "bi-linkedin", url: "https://www.linkedin.com/in/..." },`
