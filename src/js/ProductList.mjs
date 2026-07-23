// ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
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
    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}



