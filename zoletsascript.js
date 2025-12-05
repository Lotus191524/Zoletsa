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
const cartCount = document.getElementById("cart-count");

// Add to Cart Buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    // Check if product exists in cart
    let existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name: name, price: price, qty: 1 });
    }

    updateCart();
    alert(`${name} has been added to your cart!`);
  });
});

// Update Cart Counter & Save to LocalStorage
function updateCart() {
  let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalItems;

  localStorage.setItem("cart", JSON.stringify(cart));
}

// ========================
// CART MODAL
// ========================
const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cart-modal");

cartIcon.addEventListener("click", () => {
  renderCart();
  cartModal.style.display = "block";
});

function closeCart() {
  cartModal.style.display = "none";
}

// Render cart items in modal
function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    cartItemsDiv.innerHTML += `
      <div style="margin-bottom:10px;">
        <strong>${item.name}</strong><br>
        Qty: ${item.qty} × R${item.price}
        <button onclick="removeItem('${item.name}')">Remove</button>
      </div>
    `;
  });

  document.getElementById("cart-total").textContent = total;
}

// Remove item from cart
function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
  renderCart();
}

// ========================
// INITIALIZE CART COUNT ON PAGE LOAD
// ========================
updateCart();
