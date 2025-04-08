import { getAllCarBulkStoreData } from "../db/carPreYearBulkUploadStore";
import { getVehicleTypeById } from "../db/vehicleType";
import { createVariantYearValues } from "../db/yearBulkValues";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

// replace with your car vehicle type id
export const carVehicleTypeId = "49008929-d060-49ea-9924-4c4601399de2";
export let carVehicleType: ProductTypes;

export async function bulkUploadCarData() {
  carVehicleType = await getVehicleTypeById(carVehicleTypeId);
  if (carVehicleType) {
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
        variantDetail?.yearColors ?? [],
        variantDetail.categoricalImages ?? []
      );
    }
    console.log("***** completed uploading all the variants year data *****");
  } else {
    console.log(
      "car vehicle type not found please insert valid id for car vehicle type"
    );
  }
}
