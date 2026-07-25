import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    let totalItems = 0;

    this.itemTotal = this.list.reduce((sum, item) => {
      totalItems += item.quantity;
      return sum + item.FinalPrice * item.quantity;
    }, 0);

    const subtotal = document.querySelector(
      `${this.outputSelector} #subtotal`
    );

    if (subtotal) {
      subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
    }

    const items = document.querySelector(
      `${this.outputSelector} #itemCount`
    );

    if (items) {
      items.innerText = totalItems;
    }
  }

  calculateOrderTotal() {
    let totalItems = 0;

    this.list.forEach((item) => {
      totalItems += item.quantity;
    });

    this.tax = this.itemTotal * 0.06;

    this.shipping = totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const total = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (tax) {
      tax.innerText = `$${this.tax.toFixed(2)}`;
    }

    if (shipping) {
      shipping.innerText = `$${this.shipping.toFixed(2)}`;
    }

    if (total) {
      total.innerText = `$${this.orderTotal.toFixed(2)}`;
    }
  }

  async checkout(form) {
    const formData = new FormData(form);

    const order = Object.fromEntries(formData.entries());

    order.orderDate = new Date().toISOString();

    order.items = packageItems(this.list);

    order.tax = this.tax.toFixed(2);

    order.shipping = this.shipping;

    order.orderTotal = this.orderTotal.toFixed(2);

    const services = new ExternalServices();

    try {
      const result = await services.checkout(order);

      console.log(result);

      alert("Order submitted successfully!");

      localStorage.removeItem(this.key);

      window.location.href = "/";
    } catch (err) {
      console.error(err);

      alert("There was a problem submitting your order.");
    }
  }
}