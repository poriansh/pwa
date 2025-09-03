// 🔁 چرخه‌ی زندگی Service Worker:
// Register → ثبت Service Worker در سایت.

// Install → نصب اولیه (مثلاً کش کردن فایل‌ها).

// Activate → فعال شدن برای کنترل صفحه‌ها.

// Fetch → گوش دادن به درخواست‌ها و پاسخ از کش یا شبکه. 

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('pwa/sw.js')
    .then(reg => console.log('Service Worker registered', reg))
    .catch(err => console.error('Registration failed', err));
}
