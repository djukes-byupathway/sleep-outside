import { getLocalStorage, setLocalStorage, getDiscount, getDiscountedPrice } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails();

        document.getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart(product) {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector('h3').textContent = product.NameWithoutBrand;
    document.querySelector('h2').textContent = product.Brand.Name;
    
    const productImage = document.querySelector("#productImage");
    productImage.src = product.Images.PrimaryExtraLarge;
    productImage.alt = product.NameWithoutBrand;

        // product.NameWithoutBrand;


    const price = product.FinalPrice;

    const discount = getDiscount(price);
    const discountedPrice = getDiscountedPrice(price);



    document.getElementById('productPrice').textContent = `Price: ${product.FinalPrice}`;
    document.getElementById("discountedPrice").textContent =
        `Discounted Price: ${discountedPrice.toFixed(2)}`;
    document.getElementById("productDiscount").textContent =
        `${discount}% OFF`;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}