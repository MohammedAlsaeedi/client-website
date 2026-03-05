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
  nav_events: {0: 'فعاليتنا', 1: 'Our Events', 2: '我们的活动'},
  nav_cases_stats: {0: 'القضايا المنجزة', 1: 'Completed Cases', 2: '已完成案件'},
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
  footer_copyright: {0: '© 2026 شركة مشاري بندر بن جلوي للمحاماة والاستشارات القانونية — جميع الحقوق محفوظة', 1: '© 2026 Meshary Bin Bandar Bin Jaloui Law Firm and Legal Consultations — All rights reserved', 2: '© 2026 美沙里·本·班达尔·本·贾卢伊律师事务所和法律咨询——版权所有'},
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

  // Language switch button (always Arabic label)
  lang_btn_ar: {0: '🇸🇦 العربية', 1: '🇸🇦 العربية', 2: '🇸🇦 العربية'},

  // Shared case page headings
  h2_legal_basis: {0: 'الأساس القانوني والأنظمة ذات الصلة', 1: 'Legal Basis & Relevant Regulations', 2: '法律依据与相关法规'},

  // General UI
  whatsapp_button: {0: 'تواصل عبر واتساب', 1: 'Contact via WhatsApp', 2: '通过WhatsApp联系'},

  // Case form labels (shared across all case-*.html pages)
  cf_lbl_name: {0: 'الاسم', 1: 'Name', 2: '姓名'},
  cf_lbl_phone: {0: 'رقم الجوال', 1: 'Phone Number', 2: '电话号码'},
  cf_lbl_email: {0: 'البريد الإلكتروني', 1: 'Email', 2: '电子邮件'},
  cf_lbl_service: {0: 'الخدمة المطلوبة', 1: 'Required Service', 2: '所需服务'},
  cf_lbl_details: {0: 'تفاصيل القضية', 1: 'Case Details', 2: '案件详情'},
  cf_lbl_docs: {0: 'المستندات', 1: 'Documents', 2: '文件'},
  cf_ph_name: {0: 'اسمك الكامل', 1: 'Your full name', 2: '您的全名'},
  cf_ph_details: {0: 'اكتب تفاصيل قضيتك باختصار...', 1: 'Briefly describe your case details...', 2: '请简要描述您的案件详情...'},
  cf_optional: {0: '(اختياري)', 1: '(Optional)', 2: '（可选）'},
  cf_file_hint: {0: 'PDF, Word, أو صورة', 1: 'PDF, Word, or image', 2: 'PDF、Word或图片'},
  cf_submit: {0: 'إرسال الطلب', 1: 'Submit Request', 2: '提交请求'},
  cf_success: {0: '✅ تم إرسال طلبك بنجاح، سنتواصل معك قريباً', 1: '✅ Your request has been submitted successfully, we will contact you soon', 2: '✅ 您的请求已成功提交，我们将尽快与您联系'},
  svc_placeholder: {0: '— اختر الخدمة —', 1: '— Select Service —', 2: '— 选择服务 —'},
  svc_opt_1: {0: 'صلح', 1: 'Settlement', 2: '和解'},
  svc_opt_2: {0: 'حضور جلسة واحدة', 1: 'Attend One Session', 2: '出席一次庭审'},
  svc_opt_3: {0: 'توكيلنا بالدعوى المنظورة', 1: 'Authorize Us for the Pending Case', 2: '委托我们处理待审案件'},
  svc_opt_4: {0: 'صياغة مذكرة للدعوى', 1: 'Draft a Case Memorandum', 2: '起草案件备忘录'},
  svc_opt_5: {0: 'اعتراض على حكم', 1: 'Appeal a Judgment', 2: '对判决提出异议'},
  svc_opt_6: {0: 'صياغة لائحة نقض', 1: 'Draft a Cassation Petition', 2: '起草上诉状'}
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
