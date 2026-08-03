import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  try {
    let cartItems = getLocalStorage("so-cart");

    if (!Array.isArray(cartItems)) {
      // display a warning message if the cart is empty
      console.warn(
        "so-cart is not an array or is missing. Initializing empty cart.",
      );
      cartItems = [];
    }

    const htmlItems = cartItems.map((item) => cartItemTemplate(item));

    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    const cartFooter = document.querySelector(".cart-footer");

    if (cartFooter) {
      if (cartItems.length > 0) {
        cartFooter.classList.remove("hide");

        const total = cartItems.reduce(
          (sum, item) => sum + Number(item.FinalPrice),
          0
        );

        document.querySelector(".cart-total").textContent =
          `Total: $${total.toFixed(2)}`;
      } else {
        cartFooter.classList.add("hide");
      }
    }

    // need to add cart total calc and display
    //($${total})
  } catch (error) {
    console.error("Critical error in renderCartContents():", error);

    // Fallback: clear the container or show error message
    const productList = document.querySelector(".product-list");
    if (productList) {
      productList.innerHTML =
        "<p>Error loading cart. Please refresh the page.</p>";
    }
  }
}

function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice),
    0,
  );

  document.querySelector("#cartTotal").textContent = `$${total.toFixed(2)}`;
}

/* function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
} */

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images?.PrimaryMedium || item.Image?.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0]?.ColorName || "No color"}</p>
  <p class="cart-card__quantity">Qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="cart-card__remove" data-id="${item.Id}">X</span>
</li>`;

  return newItem;
}

function removeItemFromCart(id) {
  const cartItems = getLocalStorage("so-cart") || [];
  const updatedCart = cartItems.filter((item) => item.Id !== id);
  setLocalStorage("so-cart", updatedCart);
  renderCartContents();
  calculateCartTotal();
}

function cartRemoveHandler(e) {
  if (!e.target.matches(".cart-card__remove")) {
    return;
  }
  removeItemFromCart(e.target.dataset.id);
}

document
  .querySelector(".product-list")
  .addEventListener("click", cartRemoveHandler);

renderCartContents();
calculateCartTotal();
