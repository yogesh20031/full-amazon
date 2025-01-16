import {
  cart,
  deleteProductFromCart,
  reduceCartCount,
  updateCheckOut,
  updateDeliveryOption,
  uptadeCartCount,
} from "../../data/cart.js";
import { getProductId, products } from "../../data/products.js";
import { moneyFormate } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOptionId,
} from "../../data/delevary-option.js";
import { randerPayment } from "./right-payment-summary.js";
import { deliveryDateFormat } from "../utils/delivery-date.js";
export function randerOrderSummary() {
  let cartHtml = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct = getProductId(productId);
    const deliveryOptionId = cartItem.deliveryOptionsId;
    let deliveryOption = getDeliveryOptionId(deliveryOptionId);
    const dateString = deliveryDateFormat(deliveryOption.deliveryDate);

    cartHtml += `<div class="cart-item-container js-cart-item-container${productId}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${matchingProduct.getPrice()}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label quantity-label-${productId}">${
      cartItem.quantity
    }</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link update-quantity-link-${productId}" data-product-id="${productId}"
                    data-product-quantity="${cartItem.quantity}">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${productId}>
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>`;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = ``;
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = deliveryDateFormat(deliveryOption.deliveryDate);
      let priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${moneyFormate(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;
      html += `
        <div class="delivery-option js-delivery-option" 
         data-product-id="${matchingProduct.id}"
         data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" 
                    ${isChecked ? "checked" : ""}
                     class="delivery-option-input"
                      name="delivery-option-for-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                       ${priceString} Shipping
                      </div>
                    </div>
                  </div>
        
        `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartHtml;
  updateCheckOut();

  //update the cart item
  document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const productQuantity = link.dataset.productQuantity;
      if (link.querySelector("input")) return;
      link.innerHTML = `<input type="number" class="input-update-cart-${productId}"
      value="${productQuantity}" 
      style="width: 50px;
      min="1" >
      <span class="cart-quantity-save-${productId}" >save</span>`;
      document.querySelector(`.quantity-label-${productId}`).innerHTML = ``;
      document
        .querySelector(`.cart-quantity-save-${productId}`)
        .addEventListener("click", () => {
          saveInputCartItem(
            document.querySelector(`.input-update-cart-${productId}`).value,
            productId,
            productQuantity
          );
        });
    });
  });

  //save the update value
  function saveInputCartItem(newCatrQuantity, productId, oldCartQuantity) {
    newCatrQuantity = parseInt(newCatrQuantity);
    const updateLink = document.querySelector(
      `.update-quantity-link-${productId}`
    );
   
    document.querySelector(
      `.quantity-label-${productId}`
    ).innerHTML = `${newCatrQuantity}`;
    if (newCatrQuantity < 0) alert("not valid number");
    else if (newCatrQuantity === 0) deleteTheItem(productId);
    else {
    
      if (updateLink) {
        updateLink.innerHTML = `Update`;
        updateLink.dataset.productQuantity = newCatrQuantity;
        console.log("true");
      }
      cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.quantity = newCatrQuantity;
        }
      });
      uptadeCartCount(oldCartQuantity, newCatrQuantity);
    }
  }

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      deleteTheItem(productId);
    });
  });

  function deleteTheItem(productId) {
    reduceCartCount(productId);
    deleteProductFromCart(productId);
    updateCheckOut();
    document.querySelector(`.js-cart-item-container${productId}`).remove();
    randerPayment();
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      randerOrderSummary();
      randerPayment();
    });
  });
  // document.querySelectorAll(".js-update-quantity-link").forEach((update) => {
  //   update.addEventListener("click", () => {
  //     const {productId,productQuantity}= update.dataset;
  //     update.innerHTML = `<input type="number" class="update-quantity-input" >`;
  //   });
  // });
}
