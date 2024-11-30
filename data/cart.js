// import {deliveryOptions } from "./delevary-option";

export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionsId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionsId: "2",
    },
  ];
}

export function saveCartItemInLocal() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
let cartCount;
export function reduceCartCount(productId) {
  cartCount = JSON.parse(localStorage.getItem("cartCount"));
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartCount -= cartItem.quantity;
      if (cartCount < 0) cartCount = 0;
      localStorage.setItem("cartCount", JSON.stringify(cartCount));
    }
  });
}


export function deleteProductFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId != productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveCartItemInLocal();
}
export function updateCheckOut() {
  cartCount = JSON.parse(localStorage.getItem("cartCount"));
  document.querySelector(".js-return-to-home-link").innerHTML = cartCount;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingProduct;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
  });
  matchingProduct.deliveryOptionsId = deliveryOptionId;
  saveCartItemInLocal();
}

// export function updateDeliveryOption(productId, deliveryOptionId) {
//   const cartItem = cart.find((item) => item.productId === productId);
//   if (cartItem) {
//     cartItem.deliveryOptionsId = deliveryOptionId;
//     saveCartItemInLocal();
//   } else {
//     console.error(`No cart item found for productId: ${productId}`);
//   }
// }