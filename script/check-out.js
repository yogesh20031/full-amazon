import { randerOrderSummary } from "./check-out/left-order-summary.js";
import { randerPayment } from "./check-out/right-payment-summary.js";

// import "../data/backend.js";
import { loadProducts,loadProductsFetch} from "../data/products.js";

loadProductsFetch().then(() => {
  randerOrderSummary();
  randerPayment();
});
/*
loadProducts(() => {
  randerOrderSummary();
  randerPayment();
});
*/
