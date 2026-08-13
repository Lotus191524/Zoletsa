// ========================
// SLIDER / HERO FUNCTIONALITY
// ========================
let slideIndex = 0;
showSlides(slideIndex);

function changeSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("slide");
  
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  slides[slideIndex].classList.add("active");
}

// ========================
// SEARCH FUNCTION (OPTIONAL)
// ========================
function searchProducts() {
  const input = document.getElementById("productSearch").value.toLowerCase();
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const title = product.querySelector("h3").textContent.toLowerCase();
    if (title.includes(input)) {
      product.parentElement.style.display = "block"; // parent is the <a> wrapper
    } else {
      product.parentElement.style.display = "none";
    }
  });
}

// ========================
// CART FUNCTIONALITY
// ========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCountElem = document.getElementById("cart-count") || document.querySelector(".cart-count");

function parsePrice(attr) {
  if (!attr) return 0;
  let s = attr.toString().replace(/[^0-9.]/g, '');
  return parseFloat(s) || 0;
}

// Add to Cart Buttons (safe: may not exist on all pages)
const addToCartButtons = document.querySelectorAll(".add-to-cart") || [];
addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name") || 'Item';
    const price = parsePrice(button.getAttribute("data-price"));

    let existing = cart.find(item => item.name === name);
    if (existing) existing.qty += 1;
    else cart.push({ name: name, price: price, qty: 1 });

    updateCart();
    alert(`${name} has been added to your cart!`);
  });
});

// Update Cart Counter & Save to LocalStorage
function updateCart() {
  let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartCountElem) cartCountElem.textContent = totalItems;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ========================
// CART MODAL
// ========================
const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cart-modal");

if (cartIcon && cartModal) {
  cartIcon.addEventListener("click", () => {
    renderCart();
    cartModal.style.display = "block";
  });
}

function closeCart() {
  if (cartModal) cartModal.style.display = "none";
}

// Render cart items in modal (if modal exists)
function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  if (!cartItemsDiv) return renderCartPage();
  cartItemsDiv.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">Qty: ${item.qty} × R${item.price.toFixed(2)}</div>
        <div class="cart-item-actions"><button onclick="removeItem('${item.name}')">Remove</button></div>
      </div>
    `;
  });

  const totalEl = document.getElementById("cart-total");
  if (totalEl) totalEl.textContent = `R${total.toFixed(2)}`;

  // Add quick link to full cart page
  if (cartItemsDiv && !document.getElementById('cart-view-link')) {
    cartItemsDiv.insertAdjacentHTML('beforeend', `<div style="margin-top:10px;"><a id="cart-view-link" href="cart.html">View full cart</a></div>`);
  }
}

// Remove item from cart
function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
  renderCart();
  renderCartPage();
}

// Change quantity (used on cart page)
function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) item.qty = 1;
  updateCart();
  renderCartPage();
}

// Render a dedicated cart page (if present)
function renderCartPage() {
  const pageEl = document.getElementById('cart-page');
  if (!pageEl) return;
  pageEl.innerHTML = '';

  if (!cart.length) {
    pageEl.innerHTML = `<p>Your cart is empty. <a href="index.html">Continue shopping</a></p>`;
    return;
  }

  let total = 0;
  const list = document.createElement('div');
  list.className = 'cart-list';

  cart.forEach(item => {
    total += item.price * item.qty;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item-page';
    itemDiv.innerHTML = `
      <div class="cart-item-name">${item.name}</div>
      <div class="cart-item-controls">
        <button onclick="changeQty('${item.name}', -1)">-</button>
        <span class="qty">${item.qty}</span>
        <button onclick="changeQty('${item.name}', 1)">+</button>
      </div>
      <div class="cart-item-price">R${(item.price * item.qty).toFixed(2)}</div>
      <div><button onclick="removeItem('${item.name}')">Remove</button></div>
    `;
    list.appendChild(itemDiv);
  });

  const totalDiv = document.createElement('div');
  totalDiv.className = 'cart-total-page';
  totalDiv.innerHTML = `<strong>Total: R${total.toFixed(2)}</strong> <button id="checkout-btn">Checkout</button>`;

  pageEl.appendChild(list);
  pageEl.appendChild(totalDiv);

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
    alert('Checkout is a demo — clearing cart.');
    cart = [];
    updateCart();
    renderCartPage();
  });
}

// ========================
// INITIALIZE CART COUNT ON PAGE LOAD
// ========================
updateCart();
