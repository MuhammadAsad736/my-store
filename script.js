let selectedProduct = null;

// Load cart data from localStorage or start fresh
let cart = JSON.parse(localStorage.getItem("cart")) || {};
updateCartDisplay();

// Add to cart logic
const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    event.stopPropagation(); // 🛑 Stops the click from reaching the parent
    const product = button.getAttribute("data-product");
    cart[product] = (cart[product] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  });
});


function updateCartDisplay() {
  const cartCountSpan = document.getElementById("cart-count");
  let totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  cartCountSpan.textContent = totalItems;
}
function clearCart() {
  cart = {};
  localStorage.removeItem("cart");
  updateCartDisplay();
}
function showDetails(title, description, price) {
  selectedProduct = title;

  const imageName = title.toLowerCase().includes("mouse") ? "mouse.jpg" :
                    title.toLowerCase().includes("keyboard") ? "keyboard.jpg" :
                    title.toLowerCase().includes("monitor") ? "monitor.jpg" :
                    title.toLowerCase().includes("motherboard") ? "motherboard.jpg" :
                    "";

  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-desc").textContent = description;
  document.getElementById("modal-price").textContent = price;
  document.getElementById("modal-image").src = imageName;
  document.getElementById("modal-image").alt = title;

  // hide thank-you message every time modal opens
  document.getElementById("thank-you-msg").style.display = "none";

  document.getElementById("product-modal").style.display = "block";
}


function closeDetails() {
  document.getElementById("product-modal").style.display = "none";
}
document.getElementById("buy-now-button").addEventListener("click", function () {
  document.getElementById("thank-you-msg").style.display = "block";
});
