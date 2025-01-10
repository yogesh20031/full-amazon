class Cart {
  cartItem;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.lodeTheCartFromLocalStorage(); 
  }

  lodeTheCartFromLocalStorage() {
    this.cartItem = JSON.parse(localStorage.getItem(this.localStorageKey));
    if (!this.cartItem) {
      this.cartItem = [
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

  saveCartItemInLocal() {
    localStorage.setItem("opp-cart", JSON.stringify(this.cartItem));
  }

  renderCartCountInCartIcon(cartCount) {
    document.querySelector(".js-cart-quantity").innerHTML = cartCount;
  }

  renderCartCountInCartIcon(cartCount) {
    document.querySelector(".js-cart-quantity").innerHTML = cartCount;
  }

  getCartCountFromInput(productId) {
    let cartCountValue = parseInt(
      document.querySelector(`.js-quantity-selector-${productId}`).value
    );
    return cartCountValue;
  }

  saveCartCountInLocal(cartCount) {
    localStorage.setItem("oop-cartCount", JSON.stringify(cartCount));
  }

  addToCartFun(productId) {
    let cartCount = JSON.parse(localStorage.getItem("oop-cartCount")) || 0;
    let cartCountValue = getCartCountFromInput(productId);
    cartCount += cartCountValue;
    let checkItemPresence = false;
    this.cartItem.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity += cartCountValue;
        checkItemPresence = true;
      }
    });
    if (!checkItemPresence) {
      this.cartItem.push({
        productId: productId,
        quantity: cartCountValue,
        deliveryOptionsId: "1",
      });
    }
    this.saveCartItemInLocal();
    this.saveCartCountInLocal(cartCount);
  }
  reduceCartCount(productId) {
    let cartCount = JSON.parse(localStorage.getItem("oop-cartCount")) || 0;
    cart.cartItem.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartCount -= cartItem.quantity;
        if (cartCount < 0) cartCount = 0;
        localStorage.setItem("oop-cartCount", JSON.stringify(cartCount));
      }
    });
  }
  deleteProductFromCart(productId) {
    let newCart = [];
    this.cartItem.forEach((cartItem) => {
      if (cartItem.productId != productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItem = newCart;
    this.saveCartItemInLocal();
  }
  updateCheckOut() {
    let cartCount = JSON.parse(localStorage.getItem("oop-cartCount")) || 0;
    document.querySelector(".js-return-to-home-link").innerHTML = cartCount;
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingProduct;
    this.cartItem.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingProduct = cartItem;
      }
    });
    matchingProduct.deliveryOptionsId = deliveryOptionId;
    this.saveCartItemInLocal();
  }
}
