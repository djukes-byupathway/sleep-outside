import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";

// Create the data source
const dataSource = new ProductData("tents");

// Find the element where the products will be displayed
const listElement = document.querySelector(".product-list");

// Create the ProductList
const productList = new ProductList("tents", dataSource, listElement);

// Load and display the products
productList.init();

// Load and display any announcement alerts
const alert = new Alert();
alert.render();
