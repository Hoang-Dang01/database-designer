/**
 * i18n.js — Hệ thống chuyển đổi ngôn ngữ tự động
 * Cách dùng: gắn data-vi="Tiếng Việt" data-en="English" vào bất kỳ element nào
 * Khi data-lang thay đổi, hệ thống sẽ tự động dịch toàn bộ trang.
 */
function applyLang() {
    const lang = document.documentElement.getAttribute('data-lang') || 'vi';
    document.querySelectorAll('[data-vi][data-en]').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text !== null) el.textContent = text;
    });
}

// Tự động theo dõi khi data-lang thay đổi (không cần sửa logic toggle)
const langObserver = new MutationObserver(() => applyLang());
langObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });

// Áp dụng ngay khi trang load xong
document.addEventListener('DOMContentLoaded', applyLang);
