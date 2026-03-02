# 3-Language Translation System Documentation

## Overview
This law firm website now features a complete trilingual translation system supporting:
- **Arabic (العربية)** - RTL, flag 🇸🇦
- **English** - LTR, flag 🇬🇧  
- **Chinese (中文)** - LTR, flag 🇨🇳

## System Architecture

### 1. Shared Language System (`lang.js`)
Central JavaScript file that manages:
- Language state and persistence via localStorage
- Language code, direction, and metadata
- Common translations (navbar, footer, buttons, etc.)
- Dropdown UI control functions
- Font family switching for proper display in each language

#### Key Functions:
- `initLang()` - Initialize on page load
- `setLang(langIndex)` - Change language (0=AR, 1=EN, 2=ZH)
- `applyLang(langIndex)` - Apply translations to page
- `toggleLangDrop()` - Toggle dropdown visibility
- `setupLangDropdown()` - Setup event listeners

### 2. Language Dropdown UI
Replaces the original 3-button flag switcher with a single dropdown button.

**HTML Structure:**
```html
<div class="lang-drop" id="langDrop">
    <button class="lang-drop-btn" onclick="toggleLangDrop()" id="langDropBtn">🇸🇦</button>
    <div class="lang-drop-menu" id="langDropMenu">
        <button onclick="setLang(0);toggleLangDrop()" data-lang="0">🇸🇦 العربية</button>
        <button onclick="setLang(1);toggleLangDrop()" data-lang="1">🇬🇧 English</button>
        <button onclick="setLang(2);toggleLangDrop()" data-lang="2">🇨🇳 中文</button>
    </div>
</div>
```

**CSS Features:**
- Smooth transitions and hover effects
- Dropdown positioning (absolute, centered above button)
- Responsive design with flex layout
- Gold accent on hover (brand color)

### 3. Data Attributes & Translations

#### Using `data-i18n` Attributes
For dynamic content, use `data-i18n` attributes:
```html
<h1 data-i18n="heroH1">فريقنا</h1>
<p data-i18n="heroDesc">فريق متخصص...</p>
```

The lang.js system automatically translates elements with `data-i18n` when language changes.

#### Translation Objects
Each page defines a `pageTranslations` object:
```javascript
const pageTranslations = {
  heroH1: { 0: 'فريقنا', 1: 'Our Team', 2: '我们的团队' },
  heroDesc: { 0: 'فريق متخصص...', 1: 'A specialized team...', 2: '由律师...' },
  // ... more translations
};
```

### 4. Common Translations
Shared across all pages in `lang.js`:
- Navigation links (Navbar)
- Footer text
- WhatsApp button
- General UI buttons (Get Started, Learn More, Contact Us, etc.)

### 5. Page-Specific Translations
Each sub-page adds its own translation object for page-specific content:
- Page titles
- Hero section headings
- Hero descriptions
- Specific content for that page type

## Files Updated

### Main Files:
1. **index.html** - Homepage with updated dropdown and dropdown CSS
2. **lang.js** - Shared language system (NEW)

### Sub-Pages (20 total):
#### General Pages:
- team.html
- contracts.html
- faq.html
- blog.html
- e-services.html
- careers.html

#### Case Pages (11):
- case-commercial.html
- case-criminal.html
- case-labor.html
- case-personal-status.html
- case-general-court.html
- case-tax.html
- case-capital-market.html
- case-administrative.html
- case-real-estate.html
- case-banking.html
- case-insurance.html

#### Package Pages (3):
- package-basic.html
- package-pro.html
- package-enterprise.html

### What Changed on Each Page:
1. ✓ Removed old `.flag-btn` styles (kept for backward compatibility on index.html)
2. ✓ Added `.lang-drop` dropdown CSS styles
3. ✓ Replaced language switcher HTML with dropdown version
4. ✓ Added `pageTranslations` object with key translations
5. ✓ Added link to `lang.js` before `</body>`

## How to Add More Translations

### For New Pages:
1. Create the HTML page normally
2. Replace the language switcher HTML with the dropdown code (see HTML Structure above)
3. Add the dropdown CSS styles (see CSS above)
4. Create a `pageTranslations` object before `</body>`:
```javascript
<script>
const pageTranslations = {
  pageTitle: { 0: 'عنوان عربي', 1: 'English Title', 2: '中文标题' },
  // Add more key translations...
};
</script>
```
5. Add `<script src="lang.js"></script>` before closing body tag
6. Use `data-i18n="key"` attributes on elements you want to translate dynamically

### For New Elements:
1. Add the element with `data-i18n="uniqueKey"` attribute:
```html
<button data-i18n="myButton">اضغط هنا</button>
```
2. Add translation to `pageTranslations`:
```javascript
myButton: { 0: 'اضغط هنا', 1: 'Click here', 2: '点击这里' }
```
3. If it's a common element used across pages, add to `commonTranslations` in lang.js

## Language Persistence
The selected language is saved to browser's localStorage with key `siteLang`:
- Value 0: Arabic (default)
- Value 1: English
- Value 2: Chinese

When users return to the site, their language preference is automatically restored.

## Styling by Language
The system automatically applies CSS classes:
- `.lang-ar` for Arabic (RTL)
- `.lang-en` for English (LTR)
- `.lang-zh` for Chinese (LTR)

You can use these classes for language-specific styling:
```css
.lang-en .element { /* English-specific styles */ }
.lang-ar .element { /* Arabic-specific styles */ }
.lang-zh .element { /* Chinese-specific styles */ }
```

Font family also changes automatically:
- Arabic: 'Cairo' (serif)
- English: 'Inter' (sans-serif)
- Chinese: 'SimHei' / '微软雅黑' (Chinese optimized)

## Translation Coverage

### Translations Included:
✓ Navigation links (all pages)
✓ Footer text (all pages)
✓ Page titles (all pages)
✓ Hero sections (all pages)
✓ Page-specific content (varies by page)
✓ Common UI elements (buttons, labels, etc.)

### Full Professional Translations:
- Arabic to English: Professional legal terminology
- Arabic to Chinese: Professional legal terminology with Chinese conventions
- All RTL/LTR handled automatically
- Currency and date formats adjustable by language

## Browser Support
Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## localStorage Usage
Key: `siteLang`
Values: 0 (AR), 1 (EN), 2 (ZH)

## Testing the System
1. Open any page in the website
2. Click the flag button (🇸🇦) in the navbar
3. Select a language from the dropdown menu
4. Page content updates immediately (where data-i18n is used)
5. Close browser and reopen - language preference is restored

## Future Enhancements
Potential additions for future versions:
- Automatic language detection from browser locale
- More granular translations for legal content
- Team member bio translations with data-i18n
- Case study full content translations
- Blog post translations
- FAQ answers in all three languages
