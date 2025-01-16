import { randerOrderSummary } from "./check-out/left-order-summary.js";
import { randerPayment } from "./check-out/right-payment-summary.js";

// import "../data/backend.js";
import { loadProducts } from "../data/products.js";

new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  randerOrderSummary();
  randerPayment();
});
/*
loadProducts(() => {
  randerOrderSummary();
  randerPayment();
});
*/
