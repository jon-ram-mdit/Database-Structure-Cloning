import { FullPricingUnits } from "../../constant/constant";
import { budgetRangeType } from "../../modules/products/schemas/type";

export function validatePricing(
  price: number,
  pricingUnit: string,
  typeInterval?: boolean
) {
  let pricingName = typeInterval ? "interval price range" : "price";
  switch (pricingUnit) {
    case FullPricingUnits.rs:
      if (!(price >= 1 && price <= 99999)) {
        throw new Error(
          `The ${pricingName} for the pricing type of the Rs. should be within the range of the price of Rs 1 to Rs. 99,999.99`
        );
      }
      break;

    case FullPricingUnits.crore:
    case FullPricingUnits.lakh:
      if (!(price >= 1 && price <= 99)) {
        throw new Error(
          `The ${pricingName} for the pricing type of the ${pricingUnit} should be within the range of the price of Rs 1 ${pricingUnit} to Rs. 99 ${pricingUnit}`
        );
      }
      break;
  }
  return true;
}

function getDecimalAmount(num: number) {
  const numStr = String(num);
  // String Contains Decimal
  if (numStr.includes(".")) {
    let numStrSplitted = numStr.split(".");
    let noOfDecimal = numStrSplitted[1].length;
    if (noOfDecimal > 2) {
      return parseFloat(
        `${numStrSplitted[0]}.${numStrSplitted[1].slice(0, 2)}`
      );
    }
    return parseFloat(
      `${numStrSplitted[0]}.${numStrSplitted[1].slice(0, noOfDecimal + 1)}`
    );
  }
  return num;
}

export function getAmountFromInterval(interval: budgetRangeType) {
  switch (interval.unit) {
    case "Rs":
      return interval.amount;

    case "Lakhs":
      return interval.amount * 100000;

    case "Crore":
      return interval.amount * 10000000;
  }
}

export function convertPriceToFullPricingUnit(amount: number) {
  if (amount >= 1 && amount <= 99999.99) {
    return {
      amount: amount,
      unit: FullPricingUnits.rs,
    };
  } else if (amount >= 100000 && amount <= 9999999.99) {
    return {
      amount: getDecimalAmount(amount / 100000),
      unit: FullPricingUnits.lakh,
    };
  } else if (amount >= 10000000 && amount <= Infinity) {
    return {
      amount: getDecimalAmount(amount / 10000000),
      unit: FullPricingUnits.crore,
    };
  }
}
