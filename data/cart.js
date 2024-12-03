// import {deliveryOptions } from "./delevary-option";

export let cart;
lodeTheCartFromLocalStorage();
export function lodeTheCartFromLocalStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));
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
}

export function renderCartCountInCartIcon(cartCount) {
  document.querySelector(".js-cart-quantity").innerHTML = cartCount;
}

export function getCartCountFromInput(productId) {
  let cartCountValue = parseInt(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );
  return cartCountValue;
}
export function addToCartFun(productId) {
  let cartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;
  let cartCountValue = getCartCountFromInput(productId);
  cartCount += cartCountValue;
  let checkItemPresence = false;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity += cartCountValue;
      checkItemPresence = true;
    }
  });
  if (!checkItemPresence) {
    cart.push({
      productId: productId,
      quantity: cartCountValue,
      deliveryOptionsId: "1",
    });
  }
  saveCartItemInLocal();
  saveCartCountInLocal(cartCount);
}

export function saveCartCountInLocal(cartCount) {
  localStorage.setItem("cartCount", JSON.stringify(cartCount));
}

export function saveCartItemInLocal() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function reduceCartCount(productId) {
  let cartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;
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
  let cartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;
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
