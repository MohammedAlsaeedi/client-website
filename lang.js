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
  // Navbar links (matching data-i18n values in HTML)
  nav_services: {0: 'خدماتنا', 1: 'Services', 2: '服务'},
  nav_contracts: {0: 'عقود الشركات', 1: 'Corporate Contracts', 2: '公司合同'},
  nav_faq: {0: 'الأسئلة الشائعة', 1: 'FAQ', 2: '常见问题'},
  nav_team: {0: 'فريقنا', 1: 'Our Team', 2: '我们的团队'},
  nav_blog: {0: 'المدونة', 1: 'Blog', 2: '博客'},
  nav_eservices: {0: 'الخدمات الإلكترونية', 1: 'E-Services', 2: '电子服务'},
  nav_careers: {0: 'التوظيف', 1: 'Careers', 2: '招聘'},
  nav_contact: {0: 'تواصل معنا', 1: 'Contact Us', 2: '联系我们'},
  nav_cta: {0: 'احجز استشارة', 1: 'Book Consultation', 2: '预约咨询'},

  // Company identity
  firm_name: {0: 'شركة مشاري بندر بن جلوي', 1: 'Meshary Bin Bandar Bin Jaloui', 2: '美沙里·本·班达尔·本·贾卢伊'},
  firm_sub: {0: 'للمحاماة والاستشارات القانونية', 1: 'Law Firm & Legal Consultations', 2: '律师事务所与法律咨询'},

  // Breadcrumb common
  breadcrumb_home: {0: 'الرئيسية', 1: 'Home', 2: '主页'},
  breadcrumb_legal: {0: 'القضايا القانونية', 1: 'Legal Cases', 2: '法律案件'},
  breadcrumb_packages: {0: 'باقات الخدمات', 1: 'Service Packages', 2: '服务套餐'},

  // Footer
  footer_copyright: {0: '© 2025 شركة مشاري بندر بن جلوي للمحاماة والاستشارات القانونية — جميع الحقوق محفوظة', 1: '© 2025 Meshary Bin Bandar Bin Jaloui Law Firm and Legal Consultations — All rights reserved', 2: '© 2025 美沙里·本·班达尔·本·贾卢伊律师事务所和法律咨询——版权所有'},
  footer_home: {0: 'الرئيسية', 1: 'Home', 2: '主页'},


  // Section tags (shared)
  faq_tag: {0: 'مركز المعرفة القانونية', 1: 'Legal Knowledge Center', 2: '法律知识中心'},
  blog_tag: {0: 'آخر المقالات', 1: 'Latest Articles', 2: '最新文章'},
  eservices_tag: {0: 'الخدمات الرقمية', 1: 'Digital Services', 2: '数字服务'},
  eservices_coming_soon: {0: 'قريباً', 1: 'Coming Soon', 2: '即将推出'},
  careers_tag: {0: 'لماذا تنضم إلينا؟', 1: 'Why Join Us?', 2: '为什么加入我们？'},
  contracts_tag: {0: 'عقودنا القانونية', 1: 'Our Legal Contracts', 2: '我们的法律合同'},
  contracts_why_tag: {0: 'لماذا نحن؟', 1: 'Why Us?', 2: '为什么选择我们？'},
  pkg_tag: {0: 'ما تشمله الباقة', 1: "What's Included", 2: '套餐包含内容'},

  // Shared case page headings
  h2_legal_basis: {0: 'الأساس القانوني والأنظمة ذات الصلة', 1: 'Legal Basis & Relevant Regulations', 2: '法律依据与相关法规'},
  // General UI
  whatsapp_button: {0: 'تواصل عبر واتساب', 1: 'Contact via WhatsApp', 2: '通过WhatsApp联系'},,
  auto_1000: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1001: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1002: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1003: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1004: {0: 'رغد علي الرشيد — أنثى', 1: 'Raghad Ali Al-Rasheed — female', 2: '拉格德·阿里·阿尔-拉希德 — 女'},
  auto_1005: {0: 'المها يوسف الطحيني — أنثى', 1: 'Al Maha Youssef Al-Tahini - female', 2: 'Al Maha Youssef Al-Tahini - 女'},
  auto_1006: {0: 'خالد إبراهيم السبيعي — ذكر', 1: 'Khaled Ibrahim Al-Subaie — male', 2: 'Khaled Ibrahim Al-Subaie — 男'},
  auto_1007: {0: 'سلطان فهد العنزي — ذكر', 1: 'Sultan Fahd Al-Anazi — male', 2: '苏丹法赫德·阿纳齐 — 男'},
  auto_1008: {0: 'نورة عبدالعزيز المطيري — أنثى', 1: 'Noura Abdulaziz Al-Mutairi — female', 2: '努拉·阿卜杜勒阿齐兹·穆泰里 — 女'},
  auto_1009: {0: 'فيصل محمد الدوسري — ذكر', 1: 'Faisal Mohammed Al-Dossary — male', 2: '费萨尔·穆罕默德·阿尔·多萨里 — 男'},
  auto_1010: {0: 'لمى عبدالرحمن الحربي — أنثى', 1: 'Lama Abdul Rahman Al-Harbi — female', 2: '喇嘛阿卜杜勒·拉赫曼·哈比 — 女'},
  auto_1011: {0: 'عبدالله ناصر الشمري — ذكر', 1: 'Abdullah Nasser Al-Shammari — male', 2: '阿卜杜拉·纳赛尔·沙马里 — 男'},
  auto_1012: {0: 'ريم سعد القحطاني — أنثى', 1: 'Reem Saad Al-Qahtani — female', 2: 'Reem Saad Al-Qahtani — 女'},
  auto_1013: {0: 'وليد عمر الغامدي — ذكر', 1: 'Walid Omar Al-Ghamdi - male', 2: '瓦利德·奥马尔·阿尔-加姆迪 - 男'},
  auto_1014: {0: 'استكشف', 1: 'explore', 2: '探索'},
  auto_1015: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1016: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1017: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1018: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1019: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1020: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1021: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1022: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1023: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1024: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1025: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1026: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1027: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1028: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1029: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'},
  auto_1030: {0: '🇸🇦 العربية', 1: '🇸🇦 Arabic', 2: '🇸🇦 阿拉伯语'}
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
