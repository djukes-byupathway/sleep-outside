import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
//import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
//const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();