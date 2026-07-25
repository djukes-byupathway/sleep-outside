import ProductData from "./ProductData.mjs";
import { qs } from "./utils.mjs";

// Ids of the tents that have a static product detail page.
const PRODUCT_PAGE_BY_ID = {
  "880RR": "marmot-ajax-3",
  "985PR": "northface-alpine-3",
  "344YJ": "cedar-ridge-rimrock-2",
  "989CG": "northface-talus-4",
};

const dataSource = new ProductData("tents");
const listElement = qs(".product-list");
const titleElement = qs(".product-list__title");

function productCardTemplate(product) {
  const slug = PRODUCT_PAGE_BY_ID[product.Id];
  const brand = product.Brand?.Name ?? "";
  const details = `
    <img src="${product.Image}" alt="${product.Name}" />
    <h3 class="card__brand">${brand}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p>`;

  return `<li class="product-card">
    ${slug ? `<a href="/product_pages/${slug}.html">${details}</a>` : details}
  </li>`;
}

async function renderResults(searchTerm) {
  if (!searchTerm) {
    titleElement.textContent = "Search Results";
    listElement.innerHTML = "<li>Enter a search term above to find products.</li>";
    return;
  }

  titleElement.textContent = `Search Results for "${searchTerm}"`;

  const results = await dataSource.searchProducts(searchTerm);

  if (!results.length) {
    listElement.innerHTML = "<li>No products matched your search.</li>";
    return;
  }

  listElement.innerHTML = results.map(productCardTemplate).join("");
}

const params = new URLSearchParams(window.location.search);
renderResults(params.get("search")?.trim() ?? "");
