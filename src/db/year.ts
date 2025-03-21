import { AppDataSource } from "..";
import { subTypeLocalMap } from "..";
import { ModelsVariants } from "../modules/products/entities/end-product/variants";
import { VariantsYears } from "../modules/products/entities/end-product/year";
import { ProductSubTypes } from "../modules/products/entities/sub-type/subType";

const yearRepo = AppDataSource.getRepository(VariantsYears);

function getRandomDateIn2024() {
  // Define start and end dates
  const startDate = new Date(2024, 0, 1); // January 1, 2024
  const endDate = new Date(2024, 11, 31); // December 31, 2024

  // Calculate the time difference in milliseconds
  const timeDifference = endDate.getTime() - startDate.getTime();

  // Generate a random time offset
  const randomOffset = Math.floor(Math.random() * timeDifference);

  // Create and return a random date within the range
  return new Date(startDate.getTime() + randomOffset);
}

export async function getOrCreateLatestYear(
  variant: ModelsVariants,
  subType: ProductSubTypes,
  price: number,
  imgUrl: string
) {
  try {
    const latestYear = await yearRepo.findOne({
      where: {
        year: 2024,
        yearVariant: {
          model_variant_id: variant.model_variant_id,
        },
      },
      relations: {
        yearIntSpecValues: {
          propCatIntSpec: {
            intSpec: true,
          },
        },
        yearDecimalSpecValues: {
          propCatDecimalSpec: {
            decimalSpec: true,
          },
        },
        yearTextSpecValues: {
          propCatTextSpec: {
            textSpec: true,
          },
        },
        yearFeaturesValues: {
          propCatFeature: {
            feature: true,
          },
        },
        yearOuterIntSpecValues: {
          outerIntSpec: {
            intSpec: true,
          },
        },
        yearOuterDecimalSpecValues: {
          outerDecSpec: {
            decimalSpec: true,
          },
        },
        yearOuterTextSpecValues: {
          outerTextSpec: {
            textSpec: true,
          },
        },
      },
    });

    if (latestYear) {
      return latestYear;
    } else {
      const newYear = new VariantsYears();
      newYear.year = 2024;
      newYear.year_release_date = getRandomDateIn2024();
      newYear.actual_price = price;
      newYear.year_image_url = imgUrl;
      newYear.subType = subType;
      newYear.yearVariant = variant;
      return await yearRepo.save(newYear);
    }
  } catch (error) {
    console.log("error on get or create latest year is: ", error);
    throw error;
  }
}

export async function getAllYearsUsingSubType({
  subTypeId,
  propCatHash,
}: {
  subTypeId: string;
  propCatHash: string;
}) {
  try {
    const localCacheSubTypeMap = subTypeLocalMap.get(propCatHash);
    if (localCacheSubTypeMap && localCacheSubTypeMap.years) {
      return localCacheSubTypeMap.years;
    } else {
      return await yearRepo.find({
        where: {
          subType: {
            product_sub_type_id: subTypeId,
          },
        },
      });
    }
  } catch (error) {
    console.log("error on getting all years using sub type is: ", error);
    throw error;
  }
}

