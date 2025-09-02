// install service worker
// وقتی که سرویس‌ورکر برای اولین بار نصب میشه یا آپدیت میشه
const cachversion = 1;
const activeCach = {
  static: `Static-${cachversion}`,
  dynamic: `dynamic-${cachversion}`,
};

self.addEventListener("install", (e) => { 
  self.skipWaiting(); // activate automatically service worker
  // e.waitUntil(
    // اول کش بشه بعد بره به ایونت های دیگ
    // caches.open(activeCach["static"]).then((Cache) => {
      //Cache.add("style/index.css"); //  add chach file
      //Cache.add("/app.js"); //  add chach file
      // Cache.addAll(["/", "/app.js", "/fallback.html"]);
    // })
  // );
});

// activate service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    // پاک کردن کش های قدیمی
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // حذف همه کش‌ها به‌جز کش فعلی
          if (cacheName !== activeCach.static) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// fetch data source project
self.addEventListener("fetch", (e) => {
  // e.respondWith(caches.match(e.request));   از کش بخون
  //e.respondWith(fetch(e.request)); // یا از شبکه بخون
  // first cache -  second network
  // e.respondWith(
  //   caches.match(e.request).then((res) => {
  //     if (res) {
  //       return res;
  //     } else {
  //       return fetch(e.request)
  //         .then((serverRes) => {
  //           return caches.open(activeCach["dynamic"]).then((cache) => {
  //             cache.put(e.request, serverRes.clone());
  //             return serverRes;
  //           });
  //         })
  //         .catch((err) => {
  //           اگر fetch از اینترنت هم شکست خورد (مثلاً آفلاین بود)
  //           return caches.match("/fallback.html");
  //         });
  //     }
  //   })
  // );

  // first network -  second cache
  return e.respondWith(
    fetch(e.request)
      .then((res) => {
        return caches.open(activeCach["dynamic"]).then((cache) => {
          cache.put(e.request, res.clone());
          return res;
        });
      })
      .catch(() => {
        return caches.match(e.request).then((res) => {
          if (res) {
            return res;
          } else {
            return caches.match("/fallback.html");
          }
        });
      })
  );
});
