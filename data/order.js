let orders = [];

function saveOrderToLocal() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
export function addOrder(order) {
  orders.unshift(order);
  saveOrderToLocal();
}
