import {
  cart,
  saveCartItemInLocal,
  saveCartCountInLocal,
  addToCartFun,
  renderCartCountInCartIcon,
} from "../data/cart.js";
import { deliveryOptions } from "../data/delevary-option.js";
import { products } from "../data/products.js";
import { moneyFormate } from "./utils/money.js";

let productHtml = "";
products.forEach((product) => {
  productHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarURL()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>`;
});

function popUpAddedMessage(button) {
  let setTime = clearTimeout();
  const productContainer = button.closest(".product-container");
  const addedToCartElement = productContainer.querySelector(".added-to-cart");
  addedToCartElement.classList.add("added-to-cart-opacity");
  setTime = setTimeout(() => {
    addedToCartElement.classList.remove("added-to-cart-opacity");
  }, 2000);
}

document.querySelector(".products-grid").innerHTML = `${productHtml}`;
let cartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;
if (cartCount === 0) {
  document.querySelector(".js-cart-quantity").innerHTML = ``;
} else {
  renderCartCountInCartIcon(cartCount);
}
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    popUpAddedMessage(button);
    const productId = button.dataset.productId;
    addToCartFun(productId);
    cartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;
    renderCartCountInCartIcon(cartCount);
  });
});
