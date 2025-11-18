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

// =====================
// ADD TO CART FUNCTION
// =====================

// Select all Add to Cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.querySelector(".cart-count");

// Initialize cart counter
let cartItems = 0;

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    cartItems++;
    cartCount.textContent = cartItems;

    // Optional: alert showing which product was added
    const productName = button.getAttribute("data-name");
    alert(`${productName} has been added to your cart!`);
  });
});


// Example usage: Call addToCart() when a product is clicked
// <button onclick="addToCart()">Add to Cart</button>
