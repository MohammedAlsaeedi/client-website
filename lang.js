// ─────────────────────────────────────────────────────────────
// SHARED LANGUAGE SYSTEM - lang.js
// ─────────────────────────────────────────────────────────────

// Global language state
let currentLang = 0; // 0=AR, 1=EN, 2=ZH

// Language metadata
const langCodes = ['ar', 'en', 'zh'];
const langDirs = ['rtl', 'ltr', 'ltr'];
const langNames = ['العربية', 'English', '中文'];
const langFlags = ['🇸🇦', '🇬🇧', '🇨🇳'];

// Common translations (shared across all pages)
const commonTranslations = {
  // Navbar links
  navHome: { ar: 'الرئيسية', en: 'Home', zh: '主页' },
  navServices: { ar: 'الخدمات', en: 'Services', zh: '服务' },
  navTeam: { ar: 'فريقنا', en: 'Our Team', zh: '我们的团队' },
  navPackages: { ar: 'الخطط', en: 'Packages', zh: '套餐' },
  navContracts: { ar: 'العقود', en: 'Contracts', zh: '合同' },
  navFAQ: { ar: 'الأسئلة الشائعة', en: 'FAQ', zh: '常见问题' },
  navBlog: { ar: 'المدونة', en: 'Blog', zh: '博客' },
  navEServices: { ar: 'الخدمات الإلكترونية', en: 'E-Services', zh: '电子服务' },
  navCareers: { ar: 'الوظائف', en: 'Careers', zh: '招聘' },
  navContact: { ar: 'تواصل معنا', en: 'Contact Us', zh: '联系我们' },

  // Footer
  footerCopyright: { ar: '© 2025 شركة مشاري بندر بن جلوي للمحاماة والاستشارات القانونية — جميع الحقوق محفوظة', en: '© 2025 Almashary Law Firm — All rights reserved', zh: '© 2025 阿尔玛沙里律师事务所 — 版权所有' },
  footerHome: { ar: 'الرئيسية', en: 'Home', zh: '主页' },
  footerDescription: { ar: 'شركة متخصصة في الاستشارات القانونية والتوثيق', en: 'Specialized in legal consultations and documentation', zh: '专业从事法律咨询和文件认证' },

  // WhatsApp button
  whatsappButton: { ar: 'تواصل عبر واتساب', en: 'Contact via WhatsApp', zh: '通过WhatsApp联系' },

  // General UI
  readMore: { ar: 'اقرأ المزيد', en: 'Read More', zh: '阅读更多' },
  learnMore: { ar: 'تعرّف على المزيد', en: 'Learn More', zh: '了解更多' },
  getStarted: { ar: 'ابدأ الآن', en: 'Get Started', zh: '现在开始' },
  contactUs: { ar: 'تواصل معنا', en: 'Contact Us', zh: '联系我们' },
  backToHome: { ar: 'العودة للرئيسية', en: 'Back to Home', zh: '返回主页' },
};

/**
 * Initialize language system
 * Call this on page load
 */
function initLang() {
  const saved = parseInt(localStorage.getItem('siteLang') || '0');
  currentLang = saved;
  applyLang(saved);
}

/**
 * Set language and save to localStorage
 * @param {number} langIndex - 0=AR, 1=EN, 2=ZH
 */
function setLang(langIndex) {
  if (langIndex < 0 || langIndex > 2) return;
  
  currentLang = langIndex;
  localStorage.setItem('siteLang', langIndex);
  
  // Apply to document
  applyLang(langIndex);
  
  // Update dropdown button text
  updateLangDropButton(langIndex);
  
  // Close dropdown
  closeLangDrop();
}

/**
 * Apply language changes to page
 * @param {number} langIndex
 */
function applyLang(langIndex) {
  const html = document.documentElement;
  html.lang = langCodes[langIndex];
  html.dir = langDirs[langIndex];
  
  // Update body class
  document.body.className = document.body.className.replace(/lang-\w+/, '');
  document.body.classList.add('lang-' + langCodes[langIndex]);
  
  // Font family for English/Chinese
  if (langIndex === 1) {
    document.body.style.fontFamily = "'Inter', sans-serif";
  } else if (langIndex === 2) {
    document.body.style.fontFamily = "'SimHei', '微软雅黑', sans-serif";
  } else {
    document.body.style.fontFamily = "'Cairo', sans-serif";
  }
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    let text = null;
    
    // Try page-specific translations first
    if (typeof pageTranslations !== 'undefined' && pageTranslations[key]) {
      text = pageTranslations[key][langIndex];
    }
    // Fall back to common translations
    else if (commonTranslations[key]) {
      text = commonTranslations[key][langIndex];
    }
    
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (el.tagName === 'IMG' || el.tagName === 'A' && el.href && el.dataset.i18n === 'navHome') {
        el.alt = text;
      } else {
        el.textContent = text;
      }
    }
  });
  
  // Update dropdown button display
  updateLangDropButton(langIndex);
}

/**
 * Update the dropdown button to show current language flag
 */
function updateLangDropButton(langIndex) {
  const btn = document.getElementById('langDropBtn');
  if (btn) {
    btn.textContent = langFlags[langIndex];
    btn.title = langNames[langIndex];
  }
}

/**
 * Toggle language dropdown visibility
 */
function toggleLangDrop() {
  const menu = document.getElementById('langDropMenu');
  if (menu) {
    menu.classList.toggle('open');
  }
}

/**
 * Close language dropdown
 */
function closeLangDrop() {
  const menu = document.getElementById('langDropMenu');
  if (menu) {
    menu.classList.remove('open');
  }
}

/**
 * Setup language dropdown event listeners
 * Call this after page load
 */
function setupLangDropdown() {
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    const langDrop = document.getElementById('langDrop');
    if (langDrop && !langDrop.contains(e.target)) {
      closeLangDrop();
    }
  });
  
  // Initialize dropdown button text
  updateLangDropButton(currentLang);
}

// Auto-initialize on DOMContentLoaded if document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initLang();
    setupLangDropdown();
  });
} else {
  initLang();
  setupLangDropdown();
}
