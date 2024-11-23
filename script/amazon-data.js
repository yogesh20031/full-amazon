import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
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
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
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

function addToCartFun(productId) {
  let cartCountValue = parseInt(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );
  cartCount += cartCountValue;
  document.querySelector(".cart-quantity").innerHTML = cartCount;

  let checkItemPresence = false;
  cart.forEach((item) => {
    if (item.productId === productId) {
      item.quantity += cartCountValue;
      checkItemPresence = true;
    }
  });
  if (!checkItemPresence) {
    cart.push({
      productId: productId,
      quantity: cartCountValue,
    });
  }
}

document.querySelector(".products-grid").innerHTML = `${productHtml}`;
let cartCount = 0;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    popUpAddedMessage(button);
    const productId = button.dataset.productId;
    addToCartFun(productId);
  });
});
