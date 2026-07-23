import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  try {
    let cartItems = getLocalStorage("so-cart");

    if (!Array.isArray(cartItems)) {
      // display a warning message if the cart is empty
      console.warn("so-cart is not an array or is missing. Initializing empty cart.");
      cartItems = [];
    }

    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } catch (error) {
    console.error("Critical error in renderCartContents():", error);

    // Fallback: clear the container or show error message
    const productList = document.querySelector(".product-list");
    if (productList) {
      productList.innerHTML = "<p>Error loading cart. Please refresh the page.</p>";
    }
  }
  
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
