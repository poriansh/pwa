// install service worker
// وقتی که سرویس‌ورکر برای اولین بار نصب میشه یا آپدیت

const limitInCache = (key, size) => {
  caches.open(key).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitInCache(key, size));
      }
    });
  });
};
const cachversion = 6;
const activeCach = {
  static: `Static-${cachversion}`,
  dynamic: `dynamic-${cachversion}`,
};
///
self.addEventListener("install", (e) => {
  self.skipWaiting(); // activate automatically service worker
  e.waitUntil(
    // اول کش بشه بعد بره به ایونت های دیگر
    caches.open(activeCach["static"]).then((Cache) => {
      //Cache.add("style/index.css"); //  add chach file
      //Cache.add("/app.js"); //  add chach file
      Cache.add("fallback.html");
    })
  );
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

  const apiBase = "https://fakestoreapi.com";
  if (e.request.url.startsWith(apiBase)) {
    return e.respondWith(fetch(e.request)).then((res) => {
      return res;
    });
  } else {
    e.respondWith(
      caches.match(e.request).then((res) => {
        if (res) {
          return res;
        } else {
          return fetch(e.request)
            .then((serverRes) => {
              return caches.open(activeCach["dynamic"]).then((cache) => {
                cache.put(e.request, serverRes.clone());
                return serverRes;
              });
            })
            .catch((err) => {
              //اگر fetch از اینترنت هم شکست خورد (مثلاً آفلاین بود)
              return caches.match("/fallback.html");
            });
        }
      })
    );
  }

  // first network -  second cache
  //https://fakestoreapi.com/products

  // return e.respondWith(
  //   fetch(e.request)
  //     .then((res) => {
  //       return caches.open(activeCach["dynamic"]).then((cache) => {
  //         cache.put(e.request, res.clone());
  //         limitInCache(activeCach["dynamic"], 10);
  //         return res;
  //       });
  //     })
  //     .catch(() => {
  //       return caches.match(e.request).then((res) => {
  //         if (res) {
  //           return res;
  //         } else {
  //           return caches.match("fallback.html");
  //         }
  //       });
  //     })
  // );
});
