import { getAllCarBulkStoreData } from "../db/carPreYearBulkUploadStore";
import { getVehicleTypeById } from "../db/vehicleType";
import { createVariantYearValues } from "../db/yearBulkValues";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

// replace with your car vehicle type id
export const carVehicleTypeId = "c950a14a-571c-4508-8316-955ddc3e728e";
export let carVehicleType: ProductTypes;

export async function bulkUploadCarData() {
  carVehicleType = await getVehicleTypeById(carVehicleTypeId);
  const allCarPreYearBulkData = await getAllCarBulkStoreData();
  console.log("total data to bulk upload: ", allCarPreYearBulkData.length);
  for (let i = 0; i < allCarPreYearBulkData.length; i++) {
    const variantDetail = allCarPreYearBulkData[i];
    console.log(
      "started uploading variant: ",
      i + 1,
      variantDetail.dbVariant.variant_name,
      ": Remaining: ",
      allCarPreYearBulkData.length - 1 - i
    );
    await createVariantYearValues(
      variantDetail.dbVariant,
      carVehicleType,
      variantDetail.scrappedVariant,
      variantDetail.subType,
      variantDetail.yearColors
    );
  }
  console.log("***** completed uploading all the variants year data *****");
}
