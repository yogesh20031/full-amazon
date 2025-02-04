import { randerOrderSummary } from "./check-out/left-order-summary.js";
import { randerPayment } from "./check-out/right-payment-summary.js";

// import "../data/backend.js";
import { /*oadProducts*/ loadProductsFetch } from "../data/products.js";

/*loadProductsFetch().then(() => {
  randerOrderSummary();
  randerPayment();
});*/
async function loadCheck() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log(`${error}.Please try again!`);
  }
  randerOrderSummary();
  randerPayment();
}
loadCheck();
/*
loadProducts(() => {
  randerOrderSummary();
  randerPayment();
});
*/
