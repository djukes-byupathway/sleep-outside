import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.mjs";


loadHeaderFooter();

const alerts = new Alert();
alerts.init();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();
