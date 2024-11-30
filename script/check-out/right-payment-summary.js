import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { moneyFormate } from "../utils/money.js";
export function randerPayment() {
    
  let randerPaymentHtml = ``;
  let totalBeforeTax;
  let shippingCharge=400;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const cartQuantity = cartItem.quantity;
    let matchingProduct;
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
        let price = (matchingProduct.priceCents * cartQuantity)+shippingCharge;
        if (!totalBeforeTax) totalBeforeTax = price;
        else totalBeforeTax += price;
      }
    });
  });
  let cartCount = JSON.parse(localStorage.getItem("cartCount"));
  randerPaymentHtml += ` <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${cartCount}):</div>
            <div class="payment-summary-money">$42.75</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${moneyFormate(
              totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
  document.querySelector(".payment-summary").innerHTML = randerPaymentHtml;
}
