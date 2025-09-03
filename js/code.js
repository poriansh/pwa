const productContainer = document.getElementById('products');

async function fetchProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();

    productContainer.innerHTML = data.slice(0, 5).map(product => `
      <div class="card">
        <img src="${product.image}" alt="${product.title}" />
        <h2>${product.title}</h2>
        <p class="price">$${product.price}</p>
        <p class="rating">⭐ ${product.rating.rate} (${product.rating.count})</p>
      </div>
    `).join('');
  } catch (err) {
    console.error("Error fetching products:", err);
    productContainer.innerHTML = `<p>⚠️ Failed to load products.</p>`;
  }
}

fetchProducts();
