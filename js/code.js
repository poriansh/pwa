const productContainer = document.getElementById("products");
const notificationButton = document.getElementById("notification");
async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    productContainer.innerHTML = data
      .slice(0, 5)
      .map(
        (product) => `
      <div class="card">
        <img src="${product.image}" alt="${product.title}" />
        <h2>${product.title}</h2>
        <p class="price">$${product.price}</p>
        <p class="rating">⭐ ${product.rating.rate} (${product.rating.count})</p>
      </div>
    `
      )
      .join("");
  } catch (err) {
    console.error("Error fetching products:", err);
    productContainer.innerHTML = `<p>⚠️ Failed to load products.</p>`;
  }
}
fetchProducts();

const showNotification = async () => {
  if ("serviceWorker" in navigator) {
    const sw = await navigator.serviceWorker.ready;
    sw.showNotification(" sw دسترسی داده شد", {
      body: "دسترسی داده شد",
      dir: "rtl",
      vibrate: [100, 50, 100],
      icon: "assets/icon-192.png",
      badge: "assets/icon-512.png",
      image: "assets/icon-512.png",
      tag: "sw test notification",
      actions: [
        {
          action: "confirm",
          title: "accept",
        },
        {
          action: "reject",
          title: "reject",
        },
      ],
    });
  }
};

const getPushSubscription = async () => {
  if ("serviceWorker" in navigator) {
    const serviceWorker = await navigator.serviceWorker.ready;
    const subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: "BGoKbJXGtVw927e14mB2tL8iJgI_Lp4_WxMj75QxU3",
    });
    console.log("subscription", subscription);
  } else {
  }
};

function getNotifications() {
  // روش اول
  // Notification.requestPermission().then((permission)=>{
  //   if(permission === "granted"){
  //     new Notification("دسترسی داده شد");
  //   }
  // });
  // روش دوم
  // if(Notification.permission === "granted"){
  //   console.log("دسترسی داده شد");
  // }
  // روش سوم noti فقط در service worker باشه
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      getPushSubscription();
      showNotification();
    }
  });
}
notificationButton.addEventListener("click", getNotifications);
