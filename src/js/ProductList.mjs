// ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // Store the product category (ex: "tents")
    this.category = category;

    // Store the data source object
    this.dataSource = dataSource;

    // Store the HTML element where the products will be displayed
    this.listElement = listElement;
  }

  // Load the products from the data source
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList();
    document.querySelector("#categoryTitle").textContent = this.category;
  }

  renderList() {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}



