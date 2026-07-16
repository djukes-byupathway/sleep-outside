//ProductList.mjs

import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        
        const list = await this.dataSource.getData();
        
        this.renderList(list);
    }

    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

        // apply use new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list);

    }

        const list = await this.dataSource.getData();
        this.renderList();
    }

    renderList() {
        //         const htmlStrings = list.map(productCardTemplate);
        //         this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
        // }
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
}
function productCardTemplate(product) {
    return ` <li class="product-card">
        <a href="product_pages/?product=">
            <img src="" alt="Image of"/>
            <h2 class="card__brand"></h2>
            <h3 class="card__name"></h3>
            <p class="product-card__price"></p>
        </a>
    </li>`
}