// install service worker
self.addEventListener("install", () => {
  console.log("insta ser worker");
  self.skipWaiting(); // update automatically service worker
  caches.open("style cache").then((Cache) => {
    Cache.add("style/index.css"); //  add chach file
    Cache.add("/app.js"); //  add chach file
    Cache.addAll(["style/index.css", "/app.js"]);
  });
});

// activate service worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated!");
});
// fetch data source project
self.addEventListener("fetch", (e) => {
  // e.respondWith(null);   از کش بخون
  e.respondWith(fetch(e.request)); // یا از شبکه بخون
  e.respondWith
});
