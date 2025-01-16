import { cart } from "../../data/cart.js";
import { getDeliveryOptionId } from "../../data/delevary-option.js";
import { getProductId, products } from "../../data/products.js";
import { moneyFormate } from "../utils/money.js";
import { addOrder } from "../../data/order.js";
export function randerPayment() {
  let paymentSummaryHtml = ``;
  let totalBeforeTax = 0;
  let shippingCharge = 0;
  let itemPrice = 0;
  let totalPrice = 0;
  let tax = 0;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const cartQuantity = cartItem.quantity;
    let deliveryOptionId = cartItem.deliveryOptionsId;
    let matchingProduct = getProductId(productId);
    const deliveryOption = getDeliveryOptionId(deliveryOptionId);
    let deliveryCharge = deliveryOption.priceCents;
    shippingCharge += deliveryCharge;
    itemPrice += matchingProduct.priceCents * cartQuantity;
    totalBeforeTax = itemPrice + shippingCharge;
    tax = totalBeforeTax / 10;
    totalPrice = totalBeforeTax + tax;
  });
  let cartCount = JSON.parse(localStorage.getItem("cartCount"));
  paymentSummaryHtml += ` <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${cartCount}):</div>
            <div class="payment-summary-money">$${moneyFormate(itemPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${moneyFormate(
              shippingCharge
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${moneyFormate(
              totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${moneyFormate(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${moneyFormate(
              totalPrice
            )}</div>
          </div>

          <button class="place-order-button button-primary
          js-place-order-button">
            Place your order
          </button>`;
  document.querySelector(".payment-summary").innerHTML = paymentSummaryHtml;
  document
    .querySelector(".js-place-order-button")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log(`${error}.Please try again!`);
      }

      window.location.href = "orders.html";
    });
}
