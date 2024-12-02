import { moneyFormate } from "../../script/utils/money.js";

describe("test suite :formate currency", () => {
  it("convert 2095 cents in doller", () => {
    expect(moneyFormate(2095)).toEqual("20.95");
  });
  it("convert 0 cents in doller", () => {
    expect(moneyFormate(0)).toEqual("0.00");
  });
  it("convert 2000.5 cents in doller", () => {
    expect(moneyFormate(2000.5)).toEqual("20.01");
  });
});
