/* ================================
   SLIDER
================================= */

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

// Show slide
function showSlide(n) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[n].classList.add("active");
}

// Buttons
function changeSlide(n) {
  slideIndex = (slideIndex + n + slides.length) % slides.length;
  showSlide(slideIndex);
}

// Auto slide every 5 sec
setInterval(() => {
  changeSlide(1);
}, 5000);

// Initialize slider
showSlide(slideIndex);


/* ================================
   SEARCH BAR
================================= */

function searchProducts() {
  let input = document.getElementById("productSearch").value.toLowerCase();
  let items = document.querySelectorAll(".product");

  items.forEach(product => {
    const text = product.innerText.toLowerCase();
    product.style.display = text.includes(input) ? "block" : "none";
  });
}
