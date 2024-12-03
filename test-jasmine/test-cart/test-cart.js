import { addToCartFun, lodeTheCartFromLocalStorage } from "../../data/cart.js";
describe("test suits: addToCart function", () => {
  it("adds an existing products", () => {});
  it("add new products", () => {
    spyOn(localStorage, "setItem").and.callFake(() => {});
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    lodeTheCartFromLocalStorage();
    addToCartFun("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
