import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export function deliveryDateFormat(deliveryDate) {
  const today = dayjs();
  let actualdeliveryDate = today.add(deliveryDate, "days");
  let checkWeekend = actualdeliveryDate.format("dddd");
  if (checkWeekend === "Sunday") {
    actualdeliveryDate = actualdeliveryDate.add(1, "days");
  }
  if (checkWeekend === "Saturday") {
    actualdeliveryDate = actualdeliveryDate.add(2, "days");
  }
  const dateString = actualdeliveryDate.format("dddd , MMMM D");
  return dateString;
}
