// install service worker
const cachversion = 8
const activeCach = {
  assetscache : `cach-${cachversion}`
} 
self.addEventListener("install", (e) => {
  self.skipWaiting(); // update automatically service worker
  e.waitUntil( // اول کش بشه بعد بره به ایونت های دیگ 
    caches.open(activeCach["assetscache"]).then((Cache) => {
      //Cache.add("style/index.css"); //  add chach file
      //Cache.add("/app.js"); //  add chach file
      Cache.addAll(["/", "style/index.css", "/app.js"]);
    })
  );
});

// activate service worker
self.addEventListener("activate", (event) => {});

// fetch data source project
self.addEventListener("fetch", (e) => {
  // e.respondWith(null);   از کش بخون
  //e.respondWith(fetch(e.request)); // یا از شبکه بخون
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      } else {
        return fetch(e.request);
      }
    })
  );
});
