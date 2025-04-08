import { AppDataSource } from "../config/database";
import { VariantsYears } from "../modules/products/entities/end-product/year";
import { YearColors } from "../modules/products/entities/end-product/yearColors";

const yearColorRepo = AppDataSource.getRepository(YearColors);

async function insertYearColor(
  year: VariantsYears,
  yearColor: {
    name: string;
    color1: string;
    color2?: string;
    url: string;
  }
) {
  try {
    const newYearColor = new YearColors();
    newYearColor.color_code = yearColor.color1;
    yearColor.color2 && (newYearColor.seconday_color_code = yearColor.color2);
    newYearColor.color_name = yearColor.name;
    newYearColor.vehicle_color_image_url = yearColor.url;
    newYearColor.variantYear = year;
    return await yearColorRepo.save(newYearColor);
  } catch (error) {
    console.log("error on insert year color is: ", error);
    throw error;
  }
}

export async function insertBulkYearColors(
  year: VariantsYears,
  yearColors: {
    name: string;
    color1: string;
    color2?: string;
    url: string;
  }[]
) {
  try {
    const isYearColorInserted = await yearColorRepo.findOne({
      where: {
        variantYear: {
          variant_year_id: year.variant_year_id,
        },
      },
    });

    if (!isYearColorInserted) {
      return yearColors.map((yearColor) => insertYearColor(year, yearColor));
    }
  } catch (error) {
    console.log("error on insert bulk year colors is: ", error);
    throw error;
  }
}
