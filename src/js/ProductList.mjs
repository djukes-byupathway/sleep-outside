// ProductList.mjs

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // Store the product category (ex: "tents")
    this.category = category;

    // Store the data source object
    this.dataSource = dataSource;

    // Store the HTML element where the products will be displayed
    this.listElement = listElement;

    // Array that will hold the products after they are loaded
    this.products = [];
  }

  // Load the products from the data source
  async init() {
    this.products = await this.dataSource.getData(this.category);

    // Later this will display the products
    this.renderList();
  }

  // This method will be completed later
  renderList() {
    console.log(this.products);
  }
}