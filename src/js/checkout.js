import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");

checkout.init();

document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

document.querySelector("#checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  checkout.checkout(form);
});