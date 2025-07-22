// install service worker
self.addEventListener("install", () => {
  console.log("insta ser worker");
  self.skipWaiting(); // update automatically service worker
  
});

// activate service worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated!");
});
// fetch data source project
self.addEventListener("fetch", (e) => {
  e.respondWith(null); //  از کش بخون 
  e.respondWith(fetch(e.request)); // یا از شبکه بخون
});
