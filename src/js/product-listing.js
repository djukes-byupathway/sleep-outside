import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const categoryTitle = document.querySelector("#categoryTitle");
const categoryName = category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

title.textContent = `Top Products: ${categoryName}`;

const category = getParam("category");
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();

