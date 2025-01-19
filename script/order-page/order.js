import { orders } from "../../data/order-data.js";
import { cart, renderCartCountInCartIcon } from "../../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { moneyFormate } from "../utils/money.js";
import { products, loadProductsFetch } from "../../data/products.js";
import { deliveryDateFormat } from "../utils/delivery-date.js";
import { getDeliveryOptionId } from "../../data/delevary-option.js";
console.log(orders);

//updating the cart count in the cart icon
let cartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;
if (cartCount === 0) {
  document.querySelector(".js-cart-quantity").innerHTML = ``;
} else {
  renderCartCountInCartIcon(cartCount);
}



//creating the html of orders


let orderHTML = ``;
await loadProductsFetch();
orders.forEach((order) => {
  const orderDate = dayjs(order.orderTime).format("MMMM D");
  const totalPriceOfTheDay = moneyFormate(order.totalCostCents);
  const orderId = order.id;
  orderHTML += `
     <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${totalPriceOfTheDay}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>

          <div class="order-details-grid">`;
  order.products.forEach((product) => {
    const productId = product.productId;

    let matchingItem = products.find(
      (productDetail) => productDetail.id === productId
    );
    if (matchingItem) {
      const productName = matchingItem.name;
      
      const matchingCartItem = cart.find(
        (cartItem) => cartItem.productId === productId
      );
      const productImage = matchingItem.image;
      const deliveryOptionId = matchingCartItem.deliveryOptionsId;
      const deliveryOption = getDeliveryOptionId(deliveryOptionId);
      const arrivingDate = deliveryDateFormat(deliveryOption.deliveryDate);
      orderHTML += `
            <div class="product-image-container">
              <img src="${productImage}">
            </div>

            <div class="product-details">
              <div class="product-name">
               ${productName}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${arrivingDate}
              </div>
              <div class="product-quantity">
                Quantity: 2
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
            `;
    }
  });
  orderHTML += `</div>
        </div>`;
});

//putting the js code of order summary  in the HTML
document.querySelector(".js-orders-grid").innerHTML = orderHTML;

