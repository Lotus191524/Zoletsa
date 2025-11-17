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
let cartCount = 0;

function addToCart() {
  cartCount++;
  document.querySelector(".cart-count").textContent = cartCount;
}

// Example usage: Call addToCart() when a product is clicked
// <button onclick="addToCart()">Add to Cart</button>
