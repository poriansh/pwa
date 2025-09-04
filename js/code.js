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

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


const getPushSubscription = async () => {
  if ("serviceWorker" in navigator) {
    const serviceWorker = await navigator.serviceWorker.ready;
    const publicKey =
      "BJGdVGgPBJAWcRxOTZnJMHg2khEQ89xZPwrse0tbOummDe6L3_DHdBGlm44zLvhxZvZjSaAxWDVgHZNR1DFG3i4";
    const subscription = await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
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
