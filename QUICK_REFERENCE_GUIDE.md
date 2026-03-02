# Translation System Quick Reference Guide

## System Overview
The website now supports **3 languages:** Arabic (AR), English (EN), Chinese (ZH)

### Language Codes
- **0** = Arabic (العربية)
- **1** = English
- **2** = Chinese (中文)

---

## How Language Switching Works

### 1. User Clicks Language Button
```html
<button onclick="setLang(0);">🇸🇦 العربية</button>
<button onclick="setLang(1);">🇬🇧 English</button>
<button onclick="setLang(2);">🇨🇳 中文</button>
```

### 2. JavaScript Function Activates
```javascript
setLang(langIndex) {
  // 1. Save to localStorage
  // 2. Call applyLang(langIndex)
  // 3. Update HTML lang and dir attributes
  // 4. Change fonts if needed
}
```

### 3. Translation Applied to Page
```javascript
applyLang(langIndex) {
  // For each element with data-i18n attribute:
  // Find the key from data-i18n
  // Get translation from pageTranslations[key][langIndex]
  // Update element.textContent
}
```

### 4. Preference Saved
```javascript
localStorage.setItem('siteLang', langIndex)
// Persists across page visits
```

---

## File Structure

### Core Translation System
```
📁 website root
├── lang.js                 ← Main translation engine
├── index.html              ← Homepage (custom T object)
└── Sub-pages:
    ├── team.html
    ├── case-*.html        (11 case pages)
    ├── package-*.html     (3 package pages)
    ├── contracts.html
    ├── faq.html
    ├── blog.html
    ├── e-services.html
    └── careers.html
```

### Sub-page Translation Pattern
Each sub-page contains:
```html
<script>
const pageTranslations = {
  key1: {0: 'عربي', 1: 'English', 2: '中文'},
  key2: {0: 'عربي', 1: 'English', 2: '中文'},
  // ... more keys
};
</script>
<script src="lang.js"></script>
```

---

## Key Concepts

### 1. pageTranslations Object
**Purpose:** Store all translatable text for a page
**Format:** `{key: {0: 'AR', 1: 'EN', 2: 'ZH'}}`

```javascript
const pageTranslations = {
  hero_title: {
    0: 'فريقنا',
    1: 'Our Team',
    2: '我们的团队'
  },
  nav_services: {
    0: 'خدماتنا',
    1: 'Our Services',
    2: '我们的服务'
  }
};
```

### 2. data-i18n Attribute
**Purpose:** Mark HTML elements for translation
**Usage:** `<element data-i18n="key_name">Default Arabic text</element>`

```html
<!-- Example 1: Simple text -->
<h1 data-i18n="hero_title">فريقنا</h1>

<!-- Example 2: Navigation link -->
<a href="team.html" data-i18n="nav_team">فريقنا</a>

<!-- Example 3: Span in paragraph -->
<p>Contact <span data-i18n="nav_contact">تواصل معنا</span> today</p>
```

### 3. commonTranslations in lang.js
**Purpose:** Shared translations across ALL pages

```javascript
const commonTranslations = {
  navHome: {ar: 'الرئيسية', en: 'Home', zh: '主页'},
  navServices: {ar: 'الخدمات', en: 'Services', zh: '服务'},
  // ...
};
```

**Note:** sub-pages use `pageTranslations` (with lang code keys 0,1,2)
**Note:** These override if both exist

---

## How to Add New Translatable Content

### Step 1: Add data-i18n to HTML
```html
<p data-i18n="my_new_key">Original Arabic text here</p>
```

### Step 2: Add Translation to pageTranslations
```javascript
const pageTranslations = {
  // ... existing translations ...
  my_new_key: {
    0: 'النص العربي الأصلي هنا',
    1: 'Original Arabic text here',
    2: '原始阿拉伯文本在这里'
  }
};
```

### Step 3: Done!
The lang.js file automatically handles the rest.

---

## Key Functions in lang.js

### initLang()
- Runs on page load
- Reads saved language from localStorage
- Applies saved language to page

```javascript
function initLang() {
  const saved = parseInt(localStorage.getItem('siteLang') || '0');
  currentLang = saved;
  applyLang(saved);
}
```

### setLang(langIndex)
- Called when user clicks language button
- Saves choice to localStorage
- Calls applyLang()

```javascript
function setLang(langIndex) {
  currentLang = langIndex;
  localStorage.setItem('siteLang', langIndex);
  applyLang(langIndex);
}
```

### applyLang(langIndex)
- Core translation function
- Updates all data-i18n elements
- Changes lang, dir, font attributes
- Updates page layout

```javascript
function applyLang(langIndex) {
  document.documentElement.lang = langCodes[langIndex];
  document.documentElement.dir = langDirs[langIndex];
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    let text = commonTranslations[key] || 
               pageTranslations[key];
    if (text) el.textContent = text[langIndex];
  });
}
```

---

## Language-Specific Settings

### Font Families
```javascript
if (langIndex === 1) {
  document.body.style.fontFamily = "'Inter', sans-serif";
} else if (langIndex === 2) {
  document.body.style.fontFamily = "'SimHei', '微软雅黑', sans-serif";
} else {
  document.body.style.fontFamily = "'Cairo', sans-serif";
}
```

### Text Direction
```javascript
const langDirs = ['rtl', 'ltr', 'ltr'];
// 0=RTL (Arabic), 1=LTR (English), 2=LTR (Chinese)

html.dir = langDirs[langIndex];
```

### Language Codes
```javascript
const langCodes = ['ar', 'en', 'zh'];

html.lang = langCodes[langIndex];
```

---

## Translation Coverage by Page

### team.html
- 1 Director + 10 Team Members
- Each with: Name, Title, Description, Badges
- Total: 86 keys, 91 data-i18n attributes

### Case Pages (case-*.html)
- 11 pages for different case types
- Hero section + description
- Section headings and content
- Total per page: 21 keys, 20 data-i18n attributes

### Package Pages (package-*.html)
- Basic, Professional, Enterprise
- Package names and descriptions
- Total per page: 19 keys, 12 data-i18n attributes

### Other Pages
- contracts.html: 16 keys, 21 data-i18n
- faq.html: 16 keys, 20 data-i18n
- blog.html: 16 keys, 20 data-i18n
- e-services.html: 16 keys, 20 data-i18n
- careers.html: 16 keys, 20 data-i18n

---

## Common Shared Translations

### Navigation Links
```javascript
nav_services: {0: 'خدماتنا', 1: 'Our Services', 2: '我们的服务'},
nav_contracts: {0: 'عقود الشركات', 1: 'Company Contracts', 2: '公司合同'},
nav_faq: {0: 'الأسئلة الشائعة', 1: 'FAQ', 2: '常见问题'},
nav_team: {0: 'فريقنا', 1: 'Our Team', 2: '我们的团队'},
nav_blog: {0: 'المدونة', 1: 'Blog', 2: '博客'},
nav_eservices: {0: 'الخدمات الإلكترونية', 1: 'E-Services', 2: '电子服务'},
nav_careers: {0: 'التوظيف', 1: 'Careers', 2: '招聘'},
nav_contact: {0: 'تواصل معنا', 1: 'Contact Us', 2: '联系我们'},
```

### Breadcrumb & Footer
```javascript
breadcrumb_home: {0: 'الرئيسية', 1: 'Home', 2: '主页'},
footer_copyright: {0: '© 2025 شركة...', 1: '© 2025 Mashary...', 2: '© 2025 玛沙里...'},
footer_home: {0: 'الرئيسية', 1: 'Home', 2: '主页'},
```

### Special Elements
```javascript
whatsapp_button: {0: 'تواصل عبر واتساب', 1: 'Contact via WhatsApp', 2: '通过WhatsApp联系'},
cta_button: {0: 'تواصل معنا', 1: 'Contact Us', 2: '联系我们'},
```

---

## Browser LocalStorage

### Storage Details
```javascript
Key: 'siteLang'
Values: '0' (Arabic) | '1' (English) | '2' (Chinese)
Expires: Never (persists across sessions)
```

### View in Browser
1. Open DevTools (F12)
2. Go to Application → Local Storage
3. Find entry with key 'siteLang'
4. Value shows current language (0, 1, or 2)

---

## Troubleshooting

### Translation Not Appearing
1. Check data-i18n attribute exists on element
2. Verify key exists in pageTranslations
3. Check browser console for errors
4. Ensure lang.js is loaded after pageTranslations

### Language Not Persisting
1. Check localStorage is enabled in browser
2. Check browser privacy/incognito mode isn't blocking it
3. Clear localStorage and reload page

### Wrong Direction (RTL/LTR)
1. Check lang.js is properly linked
2. Verify langDirs array has correct values
3. Hard refresh browser (Ctrl+Shift+R)

### Font Not Changing
1. Verify font family CSS includes Google Fonts links
2. Check lang.js is updating font-family
3. Ensure fonts are loaded from CDN

---

## Testing Checklist

- [ ] Language dropdown appears on all pages
- [ ] All 3 languages available in dropdown
- [ ] Clicking language changes page content
- [ ] Language choice saves across page navigation
- [ ] Text direction changes (RTL for Arabic, LTR for English/Chinese)
- [ ] Fonts update correctly for each language
- [ ] All navigation links translate
- [ ] All footer text translates
- [ ] Page-specific content translates
- [ ] Browser back/forward maintains language choice

---

## Statistics

| Metric | Value |
|--------|-------|
| Total Sub-pages | 20 |
| Translation Keys (total) | 454 |
| data-i18n Attributes | 448 |
| Languages Supported | 3 (AR, EN, ZH) |
| Total Translation Strings | 1,362 |
| Pages with 100% Coverage | 20/20 |

---

## Quick Links

- **Main Translation Engine:** `/lang.js`
- **Implementation Details:** `TRANSLATION_IMPLEMENTATION_COMPLETE.md`
- **Current Status:** ✓ LIVE AND FULLY FUNCTIONAL

---

**Last Updated:** March 2, 2026
**Status:** Production Ready
