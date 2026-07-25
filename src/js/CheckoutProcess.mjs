import { getLocalStorage } from "./utils.mjs";

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

    subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;

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

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    total.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}