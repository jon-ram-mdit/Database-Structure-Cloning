import {
  VariantsYears,
  YearValuesType,
} from "../../modules/products/entities/end-product/year";
import { yearRepo } from "../../modules/products/services/admin/end-product/endYear/year";
import { OuterSpecWithValue } from "../../modules/products/services/responseClasses/outerSpec";

export function extractHomeScreenOuterSpecs({
  yearOuterDecimalSpecValues,
  yearOuterIntSpecValues,
  yearOuterTextSpecValues,
}: VariantsYears) {
  let allOuterIntSpecs: OuterSpecWithValue[] = [];
  let allOuterDecSpecs: OuterSpecWithValue[] = [];
  let allOuterTextSpecs: OuterSpecWithValue[] = [];

  yearOuterDecimalSpecValues?.forEach(({ value, value_type, outerDecSpec }) => {
    if (outerDecSpec && value_type && value_type === YearValuesType.ND) {
      const { decimalSpec, image_url, for_home_screen } = outerDecSpec;
      if (decimalSpec) {
        for_home_screen &&
          allOuterDecSpecs.push(
            new OuterSpecWithValue({
              id: decimalSpec.product_decimal_spec_id,
              name: decimalSpec.name,
              imgUrl: image_url,
              unit: decimalSpec.unit?.name,
              value: value,
            })
          );
      }
    }
  });

  yearOuterIntSpecValues?.forEach(({ value, value_type, outerIntSpec }) => {
    if (outerIntSpec && value_type && value_type === YearValuesType.ND) {
      const { intSpec, image_url, for_home_screen } = outerIntSpec;
      if (intSpec) {
        for_home_screen &&
          allOuterIntSpecs.push(
            new OuterSpecWithValue({
              id: intSpec.product_int_spec_id,
              name: intSpec.name,
              imgUrl: image_url,
              unit: intSpec.unit?.name,
              value: value,
            })
          );
      }
    }
  });

  yearOuterTextSpecValues?.forEach(({ value, value_type, outerTextSpec }) => {
    if (outerTextSpec && value_type && value_type === YearValuesType.ND) {
      const { textSpec, image_url, for_home_screen } = outerTextSpec;
      if (textSpec && value) {
        for_home_screen &&
          allOuterTextSpecs.push(
            new OuterSpecWithValue({
              id: textSpec.product_text_spec_id,
              name: textSpec.name,
              imgUrl: image_url,
              value: value.value,
            })
          );
      }
    }
  });

  return { allOuterTextSpecs, allOuterIntSpecs, allOuterDecSpecs };
}

export async function getHomeScreenOuterSpecs(yearId: string) {
  try {
    const yearWithOuterSpecValues = await yearRepo.findOne({
      where: {
        variant_year_id: yearId,
      },
      relations: {
        yearOuterDecimalSpecValues: {
          outerDecSpec: {
            decimalSpec: true,
          },
        },
        yearOuterIntSpecValues: {
          outerIntSpec: {
            intSpec: true,
          },
        },
        yearOuterTextSpecValues: {
          value: true,
          outerTextSpec: {
            textSpec: true,
          },
        },
      },
    });

    if (!yearWithOuterSpecValues) {
      throw new Error(`No Year Outer Specs for Year ID ${yearId} was found`);
    }

    return extractHomeScreenOuterSpecs(yearWithOuterSpecValues);
  } catch (error) {
    throw error;
  }
}
