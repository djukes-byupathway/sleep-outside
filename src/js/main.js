import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import '../css/style.css';

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();
