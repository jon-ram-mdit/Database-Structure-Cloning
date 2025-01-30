import { ValueTransformer } from "typeorm";
import { imageUrlPrefix } from "../../constant/constant";

export class ImageUrlPrefixTransformer implements ValueTransformer {
  // No transformation when saving data to the database
  to(value: string): string {
    return value; // Return the original value (no transformation)
  }

  // Add the prefix when retrieving data from the database
  from(value: string): string {
    if (
      value &&
      (value?.includes("cardekho") ||
        value?.includes("bikedekho") ||
        value?.includes("svgrepo"))
    ) {
      return value;
    } else {
      return `${imageUrlPrefix}${value}`;
    }
  }
}
