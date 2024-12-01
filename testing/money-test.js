import { moneyFormate } from "../script/utils/money.js";

console.log("for money format");
console.log("for 2095");
if (moneyFormate(2095) === "20.95") console.log("pased");
else console.log("failed");
console.log("for 0");
if (moneyFormate(0) === "0.00") console.log("pased");
else console.log("failed");
console.log("for 2000.5");
if (moneyFormate(2000.5) === "20.01") console.log("pased");
else console.log("failed");

