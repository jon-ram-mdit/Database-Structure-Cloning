import { getBikeDekhoPreBulkUploadData } from "../db/bikeDekhoPreBulkUploadStore";
import { getVehicleTypeById } from "../db/vehicleType";
import { createVariantYearValues } from "../db/yearBulkValues";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

export async function bulkUploadBikeDekhoData() {
  try {
    // ** replace with your bike / scooter vehicle type id

    // const scooterVehicleTypeId = "9cf4567c-d111-4164-b7a9-d9705187e522";
    const bikeVehicleTypeId = "717c38bb-bdf4-4673-b84c-cc1014dfc6b5";

    const vehicleTypeId = bikeVehicleTypeId;

    let bikeDekhoVehicleType: ProductTypes;

    bikeDekhoVehicleType = await getVehicleTypeById(vehicleTypeId);

    if (bikeDekhoVehicleType) {
      const bikeDekhoPreBulkUploadData = await getBikeDekhoPreBulkUploadData(
        bikeDekhoVehicleType
      );

      console.log(
        "total data to bulk upload: ",
        bikeDekhoPreBulkUploadData.length
      );
      for (let i = 0; i < bikeDekhoPreBulkUploadData.length; i++) {
        const variantDetail = bikeDekhoPreBulkUploadData[i];
        console.log(
          "started uploading variant: ",
          i + 1,
          variantDetail.dbVariant.variant_name,
          "remaining to scrape: ",
          bikeDekhoPreBulkUploadData.length - 1 - i
        );
        await createVariantYearValues(
          variantDetail.dbVariant,
          bikeDekhoVehicleType,
          variantDetail.scrappedVariant,
          variantDetail.subType,
          variantDetail.yearColors,
          variantDetail.categoricalImages
        );
      }

      console.log(
        `***** completed uploading all the variants of ${bikeDekhoVehicleType.product_type_name} *****`
      );
    }
  } catch (error) {
    throw error;
  }
}
